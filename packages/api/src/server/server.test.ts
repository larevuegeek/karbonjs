import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createServerApi } from './server.js'

describe('createServerApi', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('makes GET request with correct URL', async () => {
    const mockResponse = { ok: true, status: 200, json: () => Promise.resolve({ data: [] }), text: () => Promise.resolve('') }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse))

    const api = createServerApi('http://localhost:3005/api/v1')
    const result = await api('/articles')

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3005/api/v1/articles',
      expect.objectContaining({ method: 'GET' })
    )
    expect(result.ok).toBe(true)
  })

  it('sends Authorization header when token provided', async () => {
    const mockResponse = { ok: true, status: 200, json: () => Promise.resolve({}), text: () => Promise.resolve('') }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse))

    const api = createServerApi('http://localhost:3005/api/v1')
    await api('/protected', { token: 'abc123' })

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer abc123' })
      })
    )
  })

  it('handles 204 No Content', async () => {
    const mockResponse = { ok: true, status: 204 }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse))

    const api = createServerApi('http://localhost:3005/api/v1')
    const result = await api('/delete-something', { method: 'DELETE' })

    expect(result.ok).toBe(true)
  })

  it('returns 503 on network error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('ECONNREFUSED')))

    const api = createServerApi('http://localhost:3005/api/v1')
    const result = await api('/articles')

    expect(result.ok).toBe(false)
    expect(result.status).toBe(503)
  })

  it('handles error responses with JSON body', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      text: () => Promise.resolve(JSON.stringify({ message: 'Not found' }))
    }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse))

    const api = createServerApi('http://localhost:3005/api/v1')
    const result = await api('/missing')

    expect(result.ok).toBe(false)
    expect(result.status).toBe(404)
    expect(result.message).toBe('Not found')
  })

  it('sends POST body as JSON', async () => {
    const mockResponse = { ok: true, status: 200, json: () => Promise.resolve({ id: 1 }) }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse))

    const api = createServerApi('http://localhost:3005/api/v1')
    await api('/articles', { method: 'POST', body: { title: 'Test' } })

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ title: 'Test' })
      })
    )
  })
})
