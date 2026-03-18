/**
 * Format bytes to human-readable size.
 * formatSize(1536) → "1.5 Ko" (fr) or "1.5 KB" (en)
 */
export function formatSize(bytes: number, locale = 'fr'): string {
  const fr = locale.startsWith('fr')
  const units = fr ? ['o', 'Ko', 'Mo', 'Go', 'To'] : ['B', 'KB', 'MB', 'GB', 'TB']

  if (bytes < 1024) return `${bytes} ${units[0]}`
  if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(1)} ${units[1]}`
  if (bytes < 1_073_741_824) return `${(bytes / 1_048_576).toFixed(1)} ${units[2]}`
  if (bytes < 1_099_511_627_776) return `${(bytes / 1_073_741_824).toFixed(1)} ${units[3]}`
  return `${(bytes / 1_099_511_627_776).toFixed(1)} ${units[4]}`
}

/**
 * Format a number with locale separators.
 * formatCount(12345) → "12 345" (fr) or "12,345" (en)
 */
export function formatCount(n: number, locale = 'fr-FR'): string {
  return n.toLocaleString(locale)
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Format a ratio as percentage.
 * formatPercent(0.856) → "85.6%"
 */
export function formatPercent(ratio: number, decimals = 1): string {
  const d = Math.max(0, Math.min(decimals, 20))
  return `${(ratio * 100).toFixed(d)}%`
}

/**
 * Format a price with currency.
 * formatPrice(29.99) → "29,99 €" (fr) or "$29.99" (en)
 */
export function formatPrice(amount: number, currency = 'EUR', locale = 'fr-FR'): string {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
  } catch {
    return `${amount.toFixed(2)} ${currency}`
  }
}

/**
 * Generate a random integer between min and max (inclusive).
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
