import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createUserCache } from './user-cache.js'

const mockUser = { id: 1, username: 'david', email: 'david@test.com', roles: ['ROLE_USER'] }

describe('createUserCache', () => {
  it('stores and retrieves users', () => {
    const cache = createUserCache()
    cache.set('token123', mockUser)
    expect(cache.get('token123')).toEqual(mockUser)
  })

  it('returns null for missing token', () => {
    const cache = createUserCache()
    expect(cache.get('nonexistent')).toBeNull()
  })

  it('invalidates entries', () => {
    const cache = createUserCache()
    cache.set('token123', mockUser)
    cache.invalidate('token123')
    expect(cache.get('token123')).toBeNull()
  })

  it('clears all entries', () => {
    const cache = createUserCache()
    cache.set('a', mockUser)
    cache.set('b', mockUser)
    cache.clear()
    expect(cache.size).toBe(0)
  })

  it('respects TTL', () => {
    vi.useFakeTimers()
    const cache = createUserCache({ ttl: 1000 })
    cache.set('token123', mockUser)
    expect(cache.get('token123')).toEqual(mockUser)

    vi.advanceTimersByTime(1001)
    expect(cache.get('token123')).toBeNull()

    vi.useRealTimers()
  })

  it('evicts oldest when maxSize reached', () => {
    const cache = createUserCache({ maxSize: 2 })
    cache.set('a', mockUser)
    cache.set('b', mockUser)
    cache.set('c', mockUser)
    expect(cache.size).toBe(2)
    expect(cache.get('a')).toBeNull()
    expect(cache.get('b')).toEqual(mockUser)
  })
})
