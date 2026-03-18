/**
 * Truncate text to `len` characters with "..."
 */
export function truncate(text: string, len: number, suffix = '...'): string {
  return text.length > len ? text.slice(0, len) + suffix : text
}

/**
 * Generate a URL-safe slug from text.
 * "Mon Super Article !" → "mon-super-article"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Capitalize first letter.
 */
export function capitalize(text: string): string {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Simple pluralization.
 * pluralize(3, "article") → "3 articles"
 * pluralize(1, "article") → "1 article"
 */
export function pluralize(count: number, word: string, plural?: string): string {
  const form = count > 1 ? (plural ?? word + 's') : word
  return `${count} ${form}`
}

/**
 * Strip HTML tags from a string.
 * For untrusted HTML, prefer a proper sanitizer (DOMPurify).
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*?>/g, '').replace(/</g, '&lt;')
}

/**
 * Get initials from a name (first 2 letters, uppercased).
 */
export function initials(name: string): string {
  return (name ?? 'A').slice(0, 2).toUpperCase()
}

/**
 * Deterministic hash-based color index from a string.
 * Same string always returns the same index.
 * Use with your own color palette.
 */
export function hashColorIndex(name: string, paletteSize: number): number {
  if (paletteSize <= 0) return 0
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return Math.abs(hash) % paletteSize
}

/**
 * Escape HTML entities to prevent XSS.
 */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Convert a string to camelCase.
 * "my-variable-name" → "myVariableName"
 */
export function camelCase(str: string): string {
  return str.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 * Convert a string to kebab-case.
 * "myVariableName" → "my-variable-name"
 */
export function kebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase()
}

const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg', 'bmp', 'ico'])

/**
 * Check if a filename or URL points to an image.
 * isImage("photo.jpg") → true
 * isImage("doc.pdf") → false
 */
export function isImage(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  return IMAGE_EXTENSIONS.has(ext)
}
