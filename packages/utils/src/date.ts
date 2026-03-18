export interface DateFormatOptions {
  locale?: string
}

const DEFAULT_LOCALE = 'fr-FR'

function toDate(d: string | Date): Date {
  const date = new Date(d)
  if (isNaN(date.getTime())) return new Date()
  return date
}

/**
 * Format a date as "14 mars 2026"
 */
export function formatDate(d: string | Date, opts?: DateFormatOptions): string {
  return toDate(d).toLocaleDateString(opts?.locale ?? DEFAULT_LOCALE, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Format a date+time as "14 mars 2026 à 15:30"
 */
export function formatDateTime(d: string | Date, opts?: DateFormatOptions): string {
  const locale = opts?.locale ?? DEFAULT_LOCALE
  const date = toDate(d)
  return `${formatDate(date, opts)} à ${date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}`
}

/**
 * Relative time: "Il y a 5 min", "Il y a 3j", "Il y a 2 mois"
 * Supports French (default) and English.
 */
export function timeAgo(dateStr: string | Date, opts?: DateFormatOptions): string {
  const locale = opts?.locale ?? DEFAULT_LOCALE
  const fr = locale.startsWith('fr')

  const date = toDate(dateStr)
  const diff = Date.now() - date.getTime()

  // Future date
  if (diff < 0) return fr ? "À l'instant" : 'Just now'

  const minutes = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days = Math.floor(diff / 86_400_000)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (fr) {
    if (minutes < 1) return "À l'instant"
    if (minutes < 60) return `Il y a ${minutes} min`
    if (hours < 24) return `Il y a ${hours}h`
    if (days < 30) return `Il y a ${days}j`
    if (months < 12) return `Il y a ${months} mois`
    return `Il y a ${years} an${years > 1 ? 's' : ''}`
  }

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 30) return `${days}d ago`
  if (months < 12) return `${months}mo ago`
  return `${years}y ago`
}

/**
 * Format as "mars 2026" — useful for "Member since..."
 */
export function formatMonthYear(d: string | Date, opts?: DateFormatOptions): string {
  return toDate(d).toLocaleDateString(opts?.locale ?? DEFAULT_LOCALE, { month: 'long', year: 'numeric' })
}

/**
 * Check if a date is today
 */
export function isToday(d: string | Date): boolean {
  const date = toDate(d)
  const now = new Date()
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()
}

/**
 * Check if a date is in the past
 */
export function isPast(d: string | Date): boolean {
  return toDate(d).getTime() < Date.now()
}
