/**
 * ImgResizer URL builder — generates resize URLs for the Karbon ImgResizer service.
 *
 * @example
 * ```ts
 * img('/files/uploads/photo.jpg', { w: 320, h: 180 })
 * // → "/files/r/320x180/uploads/photo.jpg"
 *
 * img('/files/uploads/photo.jpg', { w: 640 })
 * // → "/files/r/640x0/uploads/photo.jpg"
 *
 * img('/files/uploads/photo.jpg', { w: 320, h: 180, mode: 'cover', format: 'webp' })
 * // → "/files/r/320x180_cover.webp/uploads/photo.jpg"
 *
 * img('/files/uploads/photo.jpg', { w: 400, h: 400, mode: 'cover', quality: 75, grayscale: true })
 * // → "/files/r/400x400_cover_q75_gray/uploads/photo.jpg"
 * ```
 */
export interface ImgOptions {
	/** Target width in pixels (0 = auto from height) */
	w?: number
	/** Target height in pixels (0 = auto from width) */
	h?: number
	/** Resize mode */
	mode?: 'fit' | 'cover' | 'stretch'
	/** Output format (overrides original) */
	format?: 'webp' | 'jpeg' | 'png' | 'gif'
	/** JPEG quality 1-100 */
	quality?: number
	/** Apply grayscale filter */
	grayscale?: boolean
	/** Apply blur (sigma value) */
	blur?: number
	/** Crop anchor for cover mode */
	anchor?: 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'
}

/**
 * Base path prefix for files (default "/files")
 */
const DEFAULT_PREFIX = '/files'

/**
 * Build an ImgResizer URL from an image path and options.
 *
 * If no options are provided or no dimensions specified, returns the original path.
 */
export function img(src: string | null | undefined, opts?: ImgOptions): string {
	if (!src) return ''
	if (!opts || (!opts.w && !opts.h)) return src

	const w = opts.w ?? 0
	const h = opts.h ?? 0

	// Build spec: "320x180", "320x180_cover", "320x180_cover_q75_gray.webp"
	let spec = `${w}x${h}`

	// Mode (only if not default "fit")
	if (opts.mode && opts.mode !== 'fit') {
		spec += `_${opts.mode}`
	}

	// Quality
	if (opts.quality) {
		spec += `_q${Math.round(opts.quality)}`
	}

	// Grayscale
	if (opts.grayscale) {
		spec += '_gray'
	}

	// Blur
	if (opts.blur) {
		spec += `_blur${Math.round(opts.blur)}`
	}

	// Format extension
	if (opts.format) {
		spec += `.${opts.format}`
	}

	// Build URL: remove prefix, insert /r/spec/
	// Input:  "/files/uploads/2026/photo.jpg"
	// Output: "/files/r/320x180/uploads/2026/photo.jpg"
	let path = src
	let prefix = DEFAULT_PREFIX

	if (path.startsWith(prefix + '/')) {
		path = path.slice(prefix.length + 1) // "uploads/2026/photo.jpg"
	} else if (path.startsWith('/')) {
		// Custom prefix — find the first segment
		const segments = path.split('/')
		prefix = '/' + segments[1] // "/files" or "/storage" etc.
		path = segments.slice(2).join('/') // rest
	}

	// Query params (anchor)
	let query = ''
	if (opts.anchor) {
		query = `?anchor=${opts.anchor}`
	}

	return `${prefix}/r/${spec}/${path}${query}`
}
