export interface TokenPair {
  token: string
  refreshToken: string
  sessionId?: number
}

export interface TokenManagerConfig {
  /** API endpoint for token refresh (e.g. "/auth/refresh") */
  refreshEndpoint: string
  /** Base API URL */
  apiUrl: string
  /** Timeout in ms for refresh request (default: 10000) */
  timeout?: number
  /** Called with new tokens after successful refresh */
  onRefresh?: (tokens: TokenPair) => void
  /** Called when refresh fails */
  onExpired?: () => void
}

function isValidJwt(token: string): boolean {
  const parts = token.split('.')
  return parts.length === 3 && parts.every(p => p.length > 0)
}

/**
 * Server-side token refresh manager.
 * Handles refresh token exchange and deduplication.
 */
export function createTokenManager(config: TokenManagerConfig) {
  let pending: Promise<TokenPair | null> | null = null

  async function doRefresh(refreshToken: string, sessionId?: number): Promise<TokenPair | null> {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), config.timeout ?? 10_000)

    try {
      const res = await fetch(`${config.apiUrl}${config.refreshEndpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refresh_token: refreshToken,
          session_id: sessionId,
        }),
        signal: controller.signal,
      })

      if (!res.ok) {
        config.onExpired?.()
        return null
      }

      const data = await res.json()
      if (!data.token || !data.refresh_token || !isValidJwt(data.token)) {
        config.onExpired?.()
        return null
      }

      const tokens: TokenPair = {
        token: data.token,
        refreshToken: data.refresh_token,
        sessionId: data.session_id,
      }

      config.onRefresh?.(tokens)
      return tokens
    } catch {
      config.onExpired?.()
      return null
    } finally {
      clearTimeout(timer)
    }
  }

  return {
    /** Refresh tokens. Deduplicates concurrent calls. */
    async refresh(refreshToken: string, sessionId?: number): Promise<TokenPair | null> {
      if (!pending) {
        pending = doRefresh(refreshToken, sessionId).finally(() => { pending = null })
      }
      return pending
    },
  }
}
