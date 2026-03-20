import { useMemo, useCallback } from 'react'
import type { CSSProperties } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface PaginationProps {
  page: number
  total: number
  perPage?: number
  /** If set, renders <a> links instead of buttons */
  baseUrl?: string
  color?: ButtonColor
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'flat' | 'minimal'
  showTotal?: boolean
  showFirstLast?: boolean
  showInfo?: boolean
  siblings?: number
  className?: string
  classes?: { root?: string; button?: string; active?: string; info?: string }
  onchange?: (page: number) => void
}

const sizeMap = {
  sm: { btn: 'w-7 h-7 text-xs', arrow: 'w-7 h-7', icon: 14, gap: 'gap-0.5' },
  md: { btn: 'w-8 h-8 text-sm', arrow: 'w-8 h-8', icon: 16, gap: 'gap-1' },
  lg: { btn: 'w-10 h-10 text-base', arrow: 'w-10 h-10', icon: 18, gap: 'gap-1.5' },
}

/** Parse a CSS text string into a CSSProperties-compatible object */
function cssText(str: string): CSSProperties {
  const style: Record<string, string> = {}
  for (const part of str.split(';')) {
    const idx = part.indexOf(':')
    if (idx < 0) continue
    const prop = part.slice(0, idx).trim()
    const val = part.slice(idx + 1).trim()
    if (!prop || !val) continue
    const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    style[camel] = val
  }
  return style as CSSProperties
}

export function Pagination({
  page,
  total,
  perPage = 20,
  baseUrl,
  color,
  size = 'md',
  variant = 'default',
  showTotal = true,
  showFirstLast = true,
  showInfo = true,
  siblings = 1,
  className = '',
  classes = {},
  onchange,
}: PaginationProps) {
  const accent = color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)'
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const s = sizeMap[size]

  const pages = useMemo(() => {
    const items: (number | '...')[] = []
    const left = Math.max(2, page - siblings)
    const right = Math.min(totalPages - 1, page + siblings)
    items.push(1)
    if (left > 2) items.push('...')
    for (let i = left; i <= right; i++) items.push(i)
    if (right < totalPages - 1) items.push('...')
    if (totalPages > 1) items.push(totalPages)
    return items
  }, [page, totalPages, siblings])

  const go = useCallback((p: number) => {
    if (p < 1 || p > totalPages || p === page) return
    onchange?.(p)
  }, [page, totalPages, onchange])

  const btnStyle = useCallback((p: number): string => {
    const isActive = p === page
    switch (variant) {
      case 'default':
        return isActive ? `background:${accent};color:white;` : 'background:transparent;color:var(--karbon-text-3);'
      case 'outline':
        return isActive ? `background:transparent;color:${accent};border:1.5px solid ${accent};` : 'background:transparent;color:var(--karbon-text-3);border:1.5px solid transparent;'
      case 'flat':
        return isActive ? `background:color-mix(in srgb,${accent} 15%,transparent);color:${accent};` : 'background:transparent;color:var(--karbon-text-3);'
      case 'minimal':
        return isActive ? `background:transparent;color:${accent};font-weight:700;` : 'background:transparent;color:var(--karbon-text-3);'
      default: return ''
    }
  }, [page, variant, accent])

  const arrowStyle = useCallback((enabled: boolean): CSSProperties => {
    return enabled
      ? { color: 'var(--karbon-text-2)', cursor: 'pointer' }
      : { color: 'var(--karbon-text-4)', opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' }
  }, [])

  const startItem = (page - 1) * perPage + 1
  const endItem = Math.min(page * perPage, total)

  if (totalPages <= 1 && !showInfo) return null

  return (
    <nav className={`flex items-center justify-between flex-wrap gap-3 ${classes?.root ?? className}`}>
      {showInfo && (
        <span className="text-xs" style={{ color: 'var(--karbon-text-4)' }}>
          {startItem}&ndash;{endItem} sur {total}
        </span>
      )}

      <div className={`flex items-center ${s.gap}`}>
        {/* First */}
        {showFirstLast && (
          baseUrl ? (
            <a href={`${baseUrl}?page=1`} className={`inline-flex items-center justify-center rounded-lg transition-colors ${s.arrow} ${classes?.button ?? ''}`} style={arrowStyle(page > 1)} aria-label="Premiere page">
              <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17-5-5 5-5" /><path d="m18 17-5-5 5-5" /></svg>
            </a>
          ) : (
            <button onClick={() => go(1)} disabled={page <= 1} className={`inline-flex items-center justify-center rounded-lg transition-colors ${s.arrow} ${classes?.button ?? ''}`} style={arrowStyle(page > 1)} aria-label="Premiere page">
              <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17-5-5 5-5" /><path d="m18 17-5-5 5-5" /></svg>
            </button>
          )
        )}

        {/* Prev */}
        {baseUrl ? (
          <a href={`${baseUrl}?page=${Math.max(1, page - 1)}`} className={`inline-flex items-center justify-center rounded-lg transition-colors ${s.arrow} ${classes?.button ?? ''}`} style={arrowStyle(page > 1)} aria-label="Page precedente">
            <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </a>
        ) : (
          <button onClick={() => go(page - 1)} disabled={page <= 1} className={`inline-flex items-center justify-center rounded-lg transition-colors ${s.arrow} ${classes?.button ?? ''}`} style={arrowStyle(page > 1)} aria-label="Page precedente">
            <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
        )}

        {/* Pages */}
        {pages.map((p, idx) => {
          if (p === '...') {
            return <span key={`ellipsis-${idx}`} className={`${s.btn} inline-flex items-center justify-center`} style={{ color: 'var(--karbon-text-4)' }}>&hellip;</span>
          }
          if (baseUrl) {
            return (
              <a
                key={p}
                href={`${baseUrl}?page=${p}`}
                className={`inline-flex items-center justify-center rounded-lg font-medium transition-all ${s.btn} ${p === page ? classes?.active ?? '' : classes?.button ?? ''}`}
                style={cssText(btnStyle(p))}
                onMouseEnter={(e) => { if (p !== page) (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.cssText = btnStyle(p) }}
              >{p}</a>
            )
          }
          return (
            <button
              key={p}
              onClick={() => go(p)}
              className={`inline-flex items-center justify-center rounded-lg font-medium transition-all cursor-pointer ${s.btn} ${p === page ? classes?.active ?? '' : classes?.button ?? ''}`}
              style={cssText(btnStyle(p))}
              onMouseEnter={(e) => { if (p !== page) (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.cssText = btnStyle(p) }}
            >{p}</button>
          )
        })}

        {/* Next */}
        {baseUrl ? (
          <a href={`${baseUrl}?page=${Math.min(totalPages, page + 1)}`} className={`inline-flex items-center justify-center rounded-lg transition-colors ${s.arrow} ${classes?.button ?? ''}`} style={arrowStyle(page < totalPages)} aria-label="Page suivante">
            <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </a>
        ) : (
          <button onClick={() => go(page + 1)} disabled={page >= totalPages} className={`inline-flex items-center justify-center rounded-lg transition-colors ${s.arrow} ${classes?.button ?? ''}`} style={arrowStyle(page < totalPages)} aria-label="Page suivante">
            <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        )}

        {/* Last */}
        {showFirstLast && (
          baseUrl ? (
            <a href={`${baseUrl}?page=${totalPages}`} className={`inline-flex items-center justify-center rounded-lg transition-colors ${s.arrow} ${classes?.button ?? ''}`} style={arrowStyle(page < totalPages)} aria-label="Derniere page">
              <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 17 5-5-5-5" /><path d="m6 17 5-5-5-5" /></svg>
            </a>
          ) : (
            <button onClick={() => go(totalPages)} disabled={page >= totalPages} className={`inline-flex items-center justify-center rounded-lg transition-colors ${s.arrow} ${classes?.button ?? ''}`} style={arrowStyle(page < totalPages)} aria-label="Derniere page">
              <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 17 5-5-5-5" /><path d="m6 17 5-5-5-5" /></svg>
            </button>
          )
        )}
      </div>
    </nav>
  )
}
