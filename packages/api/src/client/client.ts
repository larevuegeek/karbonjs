import type { ApiCallOptions, ApiResult } from '@karbonjs/types'

export interface ClientApiConfig {
  baseUrl: string
  /** Return current auth token */
  getToken: () => string | null
  /** Called to refresh an expired token. Return new token or null. */
  refreshToken?: () => Promise<string | null>
  /** Called when refresh fails (user should be logged out) */
  onAuthFailure?: () => void
  /** Default timeout in ms (default: 15000) */
  timeout?: number
  /** Default headers sent with every request */
  defaultHeaders?: Record<string, string>
}

/**
 * Client-side API helper with automatic token refresh on 401.
 */
export function createClientApi(config: ClientApiConfig) {
  let refreshPromise: Promise<string | null> | null = null

  return async function api<T extends ApiResult = ApiResult>(
    endpoint: string,
    options: ApiCallOptions = {},
  ): Promise<T> {
    const { method = 'GET', body, headers: extraHeaders, timeout } = options

    const token = options.token ?? config.getToken()

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...config.defaultHeaders,
      ...extraHeaders,
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const doFetch = async (authToken?: string | null): Promise<Response> => {
      const h = { ...headers }
      if (authToken) h['Authorization'] = `Bearer ${authToken}`

      const controller = new AbortController()
      const ms = timeout ?? config.timeout ?? 15_000
      const timer = setTimeout(() => controller.abort(), ms)
      try {
        return await fetch(`${config.baseUrl}${endpoint}`, {
          method,
          headers: h,
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        })
      } finally {
        clearTimeout(timer)
      }
    }

    try {
      let res = await doFetch(token)

      // Auto-refresh on 401
      if (res.status === 401 && config.refreshToken) {
        if (!refreshPromise) {
          refreshPromise = Promise.race([
            config.refreshToken(),
            new Promise<null>((resolve) => setTimeout(() => resolve(null), 10_000)),
          ]).finally(() => { refreshPromise = null })
        }

        const newToken = await refreshPromise
        if (newToken) {
          res = await doFetch(newToken)
        } else {
          config.onAuthFailure?.()
          return { ok: false, status: 401, message: 'Authentication failed' } as T
        }
      }

      if (!res.ok) {
        const text = await res.text()
        let message: string
        try {
          const parsed = JSON.parse(text)
          message = typeof parsed.message === 'string' ? parsed.message.slice(0, 500) : text.slice(0, 500)
        } catch {
          message = text.slice(0, 500)
        }
        return { ok: false, status: res.status, message } as T
      }

      if (res.status === 204) return { ok: true } as T
      const data = await res.json()
      return { ...data, ok: true } as T
    } catch (err) {
      const message = err instanceof DOMException && err.name === 'AbortError'
        ? 'Request timeout'
        : 'Network error'
      return { ok: false, status: 0, message } as T
    }
  }
}
