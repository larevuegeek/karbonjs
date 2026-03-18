const IS_BROWSER = typeof document !== 'undefined'
const IS_SECURE = IS_BROWSER && window.location.protocol === 'https:'

export interface CookieOptions {
  days?: number
  path?: string
  sameSite?: 'Strict' | 'Lax' | 'None'
  secure?: boolean
}

function buildFlags(opts: CookieOptions = {}): string {
  const path = opts.path ?? '/'
  const sameSite = opts.sameSite ?? 'Strict'
  const secure = opts.secure ?? (sameSite === 'None' ? true : IS_SECURE)
  return `path=${path}; SameSite=${sameSite}${secure ? '; Secure' : ''}`
}

/**
 * Escape special regex characters in a string.
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Set a client-side cookie.
 */
export function setCookie(name: string, value: string, opts: CookieOptions = {}): void {
  if (!IS_BROWSER) return
  const days = opts.days ?? 30
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; ${buildFlags(opts)}`
}

/**
 * Get a client-side cookie value.
 */
export function getCookie(name: string): string | null {
  if (!IS_BROWSER) return null
  const escaped = escapeRegex(name)
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`))
  if (!match) return null
  try {
    return decodeURIComponent(match[1])
  } catch {
    return null
  }
}

/**
 * Delete a client-side cookie.
 */
export function deleteCookie(name: string, opts: CookieOptions = {}): void {
  if (!IS_BROWSER) return
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; ${buildFlags(opts)}`
}
