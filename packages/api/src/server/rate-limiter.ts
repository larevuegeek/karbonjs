/**
 * In-memory sliding window rate limiter.
 *
 * Tracks request timestamps per IP + route pattern.
 * Auto-purges expired entries every 5 minutes.
 *
 * @example
 * ```ts
 * const limiter = createRateLimiter({
 *   'auth/login': { max: 20, windowSec: 60 },
 *   '*': { max: 200, windowSec: 60 },
 * })
 *
 * const result = limiter.check('192.168.1.1', '/api/auth/login')
 * if (!result.allowed) // return 429
 * ```
 */

export interface RateLimitRule {
  max: number
  windowSec: number
}

export type RateLimitRules = Record<string, RateLimitRule>

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  limit: number
  retryAfterSec?: number
}

interface RateLimitEntry {
  timestamps: number[]
}

const DEFAULT_RULES: RateLimitRules = {
  '*': { max: 200, windowSec: 60 },
}

export interface RateLimiter {
  /** Check if request is allowed. Records the timestamp if allowed. */
  check(ip: string, path: string): RateLimitResult
  /** Reset all entries (useful for testing) */
  reset(): void
  /** Stop the cleanup interval */
  destroy(): void
}

/**
 * Create a rate limiter with custom rules.
 * Rules are matched by path prefix (after stripping `/api/`).
 * Use `'*'` as the fallback rule.
 */
export function createRateLimiter(rules: RateLimitRules = DEFAULT_RULES): RateLimiter {
  const mergedRules: RateLimitRules = { ...DEFAULT_RULES, ...rules }
  const store = new Map<string, Map<string, RateLimitEntry>>()

  // Cleanup expired entries every 5 min
  const cleanupTimer = setInterval(() => {
    const now = Date.now()
    for (const [ip, routes] of store) {
      for (const [route, entry] of routes) {
        const rule = getRule(route)
        entry.timestamps = entry.timestamps.filter(t => now - t < rule.windowSec * 1000)
        if (entry.timestamps.length === 0) routes.delete(route)
      }
      if (routes.size === 0) store.delete(ip)
    }
  }, 5 * 60 * 1000)

  // Don't block process exit
  if (cleanupTimer && typeof cleanupTimer === 'object' && 'unref' in cleanupTimer) {
    (cleanupTimer as unknown as { unref: () => void }).unref()
  }

  function matchRoute(path: string): string {
    const route = path.replace(/^\/api\//, '')
    for (const pattern of Object.keys(mergedRules)) {
      if (pattern === '*') continue
      if (route.startsWith(pattern)) return pattern
    }
    return '*'
  }

  function getRule(routeKey: string): RateLimitRule {
    return mergedRules[routeKey] ?? mergedRules['*'] ?? DEFAULT_RULES['*']
  }

  function check(ip: string, path: string): RateLimitResult {
    const routeKey = matchRoute(path)
    const rule = getRule(routeKey)
    const now = Date.now()
    const windowMs = rule.windowSec * 1000

    if (!store.has(ip)) store.set(ip, new Map())
    const ipMap = store.get(ip)!
    if (!ipMap.has(routeKey)) ipMap.set(routeKey, { timestamps: [] })
    const entry = ipMap.get(routeKey)!

    // Sliding window
    entry.timestamps = entry.timestamps.filter(t => now - t < windowMs)

    if (entry.timestamps.length >= rule.max) {
      const oldest = entry.timestamps[0]
      const retryAfterSec = Math.ceil((oldest + windowMs - now) / 1000)
      return { allowed: false, remaining: 0, limit: rule.max, retryAfterSec }
    }

    entry.timestamps.push(now)
    return { allowed: true, remaining: rule.max - entry.timestamps.length, limit: rule.max }
  }

  function reset() {
    store.clear()
  }

  function destroy() {
    clearInterval(cleanupTimer)
    store.clear()
  }

  return { check, reset, destroy }
}
