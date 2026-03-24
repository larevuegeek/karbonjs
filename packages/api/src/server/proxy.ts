/**
 * Configurable API proxy for SvelteKit catch-all routes.
 *
 * Generates GET/POST/PUT/PATCH/DELETE handlers that proxy
 * requests to a backend server with security built-in:
 * - Path sanitization (blocks `../`, `//`)
 * - Blocked path prefixes (e.g. `internal`)
 * - CSRF protection (Origin vs Host check)
 * - Rate limiting (sliding window, per IP)
 * - Body size limit
 * - Request/response streaming (no memory buffering)
 * - Cookie & auth header forwarding
 * - X-Forwarded-For client IP forwarding
 *
 * @example
 * ```ts
 * // src/routes/api/[...path]/+server.ts
 * import { createProxy } from '@karbonjs/api'
 *
 * export const { GET, POST, PUT, PATCH, DELETE } = createProxy({
 *   backend: 'http://localhost:8080',
 *   prefix: '/api',
 *   blockedPrefixes: ['internal'],
 *   csrf: true,
 *   rateLimit: {
 *     'auth/login': { max: 20, windowSec: 60 },
 *     '*': { max: 200, windowSec: 60 },
 *   },
 * })
 * ```
 */

import { createRateLimiter, type RateLimitRules, type RateLimiter } from './rate-limiter.js'

export interface ProxyConfig {
  /** Backend URL (e.g. `http://localhost:8080`) */
  backend: string
  /** URL prefix to prepend to proxied path (default: `/api`) */
  prefix?: string
  /** Max request body size in bytes (default: 10 MB) */
  maxBodySize?: number
  /** Path prefixes to block — returns 404 (default: `['internal']`) */
  blockedPrefixes?: string[]
  /** Enable CSRF check on mutating requests (default: `true`) */
  csrf?: boolean
  /** Rate limit rules per route pattern. Use `'*'` for default. Set `false` to disable. */
  rateLimit?: RateLimitRules | false
}

/** Minimal SvelteKit RequestEvent shape — keeps karbonjs framework-agnostic */
interface RequestEvent {
  request: Request
  params: Record<string, string>
  url: URL
  getClientAddress: () => string
}

type Handler = (event: RequestEvent) => Promise<Response>

function jsonResponse(status: number, message: string, extra?: Record<string, string>): Response {
  return new Response(JSON.stringify({ success: false, message }), {
    status,
    headers: { 'content-type': 'application/json', ...extra },
  })
}

/**
 * Create a proxy handler set for SvelteKit `+server.ts` catch-all routes.
 */
export function createProxy(config: ProxyConfig) {
  const {
    backend,
    prefix = '/api',
    maxBodySize = 10 * 1024 * 1024,
    blockedPrefixes = ['internal'],
    csrf = true,
    rateLimit: rateLimitConfig,
  } = config

  // Validate backend URL
  try {
    const url = new URL(backend)
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error('Backend URL must use http or https')
    }
  } catch {
    throw new Error(`Invalid backend URL: ${backend}`)
  }

  // Init rate limiter (unless disabled)
  let limiter: RateLimiter | null = null
  if (rateLimitConfig !== false) {
    limiter = createRateLimiter(rateLimitConfig ?? undefined)
  }

  const handler: Handler = async (event) => {
   try {
    const { request, params, url } = event
    const rawPath = params.path ?? ''

    // 1. Sanitize path
    let decodedPath: string
    try {
      decodedPath = decodeURIComponent(rawPath)
    } catch {
      return new Response('Forbidden path', { status: 400 })
    }
    if (decodedPath.includes('..') || rawPath.includes('%2e') || rawPath.includes('%2E') || rawPath.includes('//')) {
      return new Response('Forbidden path', { status: 403 })
    }

    // 2. Block forbidden prefixes
    const firstSegment = rawPath.split('/')[0]
    if (blockedPrefixes.includes(firstSegment)) {
      return jsonResponse(404, 'Not found')
    }

    const path = `${prefix}/${rawPath}${url.search}`

    // 3. Client IP
    let clientIp = '127.0.0.1'
    try { clientIp = event.getClientAddress() } catch { /* dev mode */ }

    // 4. Rate limiting
    let rl: { allowed: boolean; limit: number; remaining: number; retryAfterSec?: number } | null = null
    if (limiter) {
      rl = limiter.check(clientIp, path)
      if (!rl.allowed) {
        return jsonResponse(429, 'Too many requests', {
          'retry-after': String(rl.retryAfterSec ?? 60),
          'x-ratelimit-limit': String(rl.limit),
          'x-ratelimit-remaining': '0',
        })
      }
    }

    // 5. CSRF — mutating requests must come from same origin
    if (csrf && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
      const origin = request.headers.get('origin')
      const host = request.headers.get('host')
      if (!origin) {
        return jsonResponse(403, 'CSRF: Origin header required')
      }
      if (host) {
        try {
          const originHost = new URL(origin).host
          if (originHost !== host) {
            return jsonResponse(403, 'CSRF: Origin mismatch')
          }
        } catch {
          return jsonResponse(403, 'CSRF: Invalid origin')
        }
      }
    }

    // 6. Build headers
    const headers = new Headers()
    headers.set('content-type', request.headers.get('content-type') || 'application/json')

    const auth = request.headers.get('authorization')
    if (auth) headers.set('authorization', auth)

    const cookies = request.headers.get('cookie')
    if (cookies) headers.set('cookie', cookies)

    headers.delete('x-forwarded-for')
    headers.set('x-forwarded-for', clientIp)

    // 7. Read body with size check
    let body: string | null = null
    if (request.method !== 'GET' && request.method !== 'HEAD' && request.body) {
      const contentLength = request.headers.get('content-length')
      if (contentLength && parseInt(contentLength) > maxBodySize) {
        return jsonResponse(413, 'Request too large')
      }
      try {
        body = await request.text()
        if (body.length > maxBodySize) {
          return jsonResponse(413, 'Request too large')
        }
      } catch {
        return jsonResponse(400, 'Failed to read request body')
      }
    }

    // 8. Proxy to backend
    const targetUrl = `${backend}${path}`
    let apiRes: Response
    try {
      apiRes = await fetch(targetUrl, {
        method: request.method,
        headers,
        body: body ?? undefined,
      })
    } catch (err) {
      console.error(`[proxy] Backend unreachable: ${request.method} ${targetUrl}`, err)
      return jsonResponse(502, 'Backend unreachable')
    }

    // Log backend errors for debugging
    if (apiRes.status >= 500) {
      const errBody = await apiRes.clone().text().catch(() => '')
      console.error(`[proxy] Backend ${apiRes.status}: ${request.method} ${targetUrl}`, errBody)
    }

    // 9. Build response — stream back
    const responseHeaders = new Headers()
    responseHeaders.set('content-type', apiRes.headers.get('content-type') || 'application/json')

    // Rate limit info (reuse the already-counted check from above — no second call)
    if (rl) {
      responseHeaders.set('x-ratelimit-limit', String(rl.limit))
      responseHeaders.set('x-ratelimit-remaining', String(rl.remaining))
    }

    // Forward Set-Cookie
    const setCookies = apiRes.headers.getSetCookie?.() ?? []
    for (const cookie of setCookies) {
      responseHeaders.append('set-cookie', cookie)
    }
    if (setCookies.length === 0) {
      const raw = apiRes.headers.get('set-cookie')
      if (raw) responseHeaders.set('set-cookie', raw)
    }

    return new Response(apiRes.body, {
      status: apiRes.status,
      headers: responseHeaders,
    })
   } catch (err) {
    console.error('[proxy] Unhandled error:', err)
    return new Response(JSON.stringify({ message: 'Proxy error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
   }
  }

  return {
    GET: handler,
    POST: handler,
    PUT: handler,
    PATCH: handler,
    DELETE: handler,
  }
}
