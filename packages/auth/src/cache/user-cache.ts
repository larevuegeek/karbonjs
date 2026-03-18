import type { AuthUser } from '@karbonjs/types'

export interface UserCacheOptions {
  /** Max entries in cache (default: 500) */
  maxSize?: number
  /** TTL in milliseconds (default: 2 minutes) */
  ttl?: number
}

interface CacheEntry {
  user: AuthUser
  timestamp: number
}

/**
 * In-memory user cache for SSR hooks.
 * Prevents hammering the /profile endpoint on every request.
 */
export function createUserCache(opts: UserCacheOptions = {}) {
  const maxSize = opts.maxSize ?? 500
  const ttl = opts.ttl ?? 120_000
  const store = new Map<string, CacheEntry>()

  function purgeExpired(): void {
    const now = Date.now()
    for (const [key, entry] of store) {
      if (now - entry.timestamp > ttl) store.delete(key)
    }
  }

  return {
    get(token: string): AuthUser | null {
      const entry = store.get(token)
      if (!entry) return null
      if (Date.now() - entry.timestamp > ttl) {
        store.delete(token)
        return null
      }
      return entry.user
    },

    set(token: string, user: AuthUser): void {
      if (store.size >= maxSize) {
        purgeExpired()
      }
      if (store.size >= maxSize) {
        const oldest = store.keys().next().value
        if (oldest) store.delete(oldest)
      }
      store.set(token, { user, timestamp: Date.now() })
    },

    invalidate(token: string): void {
      store.delete(token)
    },

    clear(): void {
      store.clear()
    },

    get size(): number {
      return store.size
    },
  }
}
