import type { ApiCallOptions, ApiResult } from '@karbonjs/types'

/**
 * Server-side API client (for SSR / SvelteKit load functions / Next.js getServerSideProps).
 */
export function createServerApi(baseUrl: string, defaultTimeout = 15_000) {
  return async function callApi<T extends ApiResult = ApiResult>(
    endpoint: string,
    options: ApiCallOptions = {},
  ): Promise<T> {
    const { method = 'GET', body, token, headers: extraHeaders, timeout } = options

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...extraHeaders,
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const controller = new AbortController()
    const ms = timeout ?? defaultTimeout
    const timer = setTimeout(() => controller.abort(), ms)

    let res: Response
    try {
      res = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      })
    } catch (err) {
      const message = err instanceof DOMException && err.name === 'AbortError'
        ? 'Request timeout'
        : 'Service temporarily unavailable'
      return { ok: false, status: 503, message } as T
    } finally {
      clearTimeout(timer)
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
  }
}
