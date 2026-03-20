import { useState, useMemo } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: 'chevron' | 'slash' | 'dot' | 'arrow' | 'dash' | string
  variant?: 'default' | 'pills' | 'bordered'
  color?: ButtonColor
  size?: 'sm' | 'md' | 'lg'
  collapse?: number
  className?: string
  classes?: { root?: string; item?: string; separator?: string; active?: string; link?: string }
}

const sizeMap = {
  sm: { text: 'text-xs', gap: 'gap-1', icon: 12, sepSize: 10, px: 'px-1.5 py-0.5' },
  md: { text: 'text-sm', gap: 'gap-1.5', icon: 14, sepSize: 12, px: 'px-2 py-0.5' },
  lg: { text: 'text-base', gap: 'gap-2', icon: 16, sepSize: 14, px: 'px-2.5 py-1' },
}

const separators: Record<string, string> = {
  chevron: '<path d="m9 18 6-6-6-6"/>',
  slash: '<line x1="16" y1="4" x2="8" y2="20"/>',
  dot: '<circle cx="12" cy="12" r="3"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  dash: '<line x1="5" y1="12" x2="19" y2="12"/>',
}

function sanitizeSvg(html: string): string {
  return html.replace(/on\w+\s*=/gi, '').replace(/<script/gi, '&lt;script')
}

export function Breadcrumb({
  items,
  separator = 'chevron',
  variant = 'default',
  color,
  size = 'md',
  collapse = 0,
  className = '',
  classes = {},
}: BreadcrumbProps) {
  const accent = color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)'
  const s = sizeMap[size]
  const [expanded, setExpanded] = useState(false)

  const displayItems = useMemo(() => {
    if (collapse <= 0 || items.length <= collapse + 2) return items
    return [
      items[0],
      { label: '...', href: undefined, icon: undefined } as BreadcrumbItem,
      ...items.slice(-collapse),
    ]
  }, [items, collapse])

  const finalItems = expanded ? items : displayItems

  const SeparatorEl = () => {
    if (separators[separator]) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={s.sepSize} height={s.sepSize} viewBox="0 0 24 24" fill={separator === 'dot' ? 'currentColor' : 'none'} stroke={separator === 'dot' ? 'none' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: separators[separator] }} />
      )
    }
    return <span>{separator}</span>
  }

  return (
    <nav aria-label="Breadcrumb" className={classes?.root ?? className}>
      <ol className={`flex flex-wrap items-center ${s.gap} ${s.text}`}>
        {finalItems.map((item, i) => {
          const isLast = i === finalItems.length - 1
          const isEllipsis = item.label === '...'

          return (
            <li key={i} className={classes?.item ?? ''}>
              {/* Separator */}
              {i > 0 && (
                <span className={`inline-flex items-center select-none ${s.gap} ${classes?.separator ?? ''}`} aria-hidden="true" style={{ color: 'var(--karbon-text-4)' }}>
                  <SeparatorEl />
                </span>
              )}

              {isEllipsis ? (
                <button
                  onClick={() => setExpanded(true)}
                  className={`rounded-md transition-colors cursor-pointer ${s.px}`}
                  style={{ color: 'var(--karbon-text-3)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                  aria-label="Afficher le chemin complet"
                >&middot;&middot;&middot;</button>
              ) : isLast ? (
                // Active (last) item
                variant === 'pills' ? (
                  <span className={`inline-flex items-center ${s.gap} rounded-full font-medium ${s.px}`} style={{ background: `color-mix(in srgb,${accent} 15%,transparent)`, color: accent }}>
                    {item.icon && <span className="shrink-0" dangerouslySetInnerHTML={{ __html: sanitizeSvg(item.icon) }} />}
                    {item.label}
                  </span>
                ) : variant === 'bordered' ? (
                  <span className={`inline-flex items-center ${s.gap} rounded-md font-medium ${s.px}`} style={{ border: `1px solid ${accent}`, color: accent }}>
                    {item.icon && <span className="shrink-0" dangerouslySetInnerHTML={{ __html: sanitizeSvg(item.icon) }} />}
                    {item.label}
                  </span>
                ) : (
                  <span className={`inline-flex items-center ${s.gap} font-semibold ${classes?.active ?? ''}`} style={{ color: color ? accent : 'var(--karbon-text)' }}>
                    {item.icon && <span className="shrink-0" dangerouslySetInnerHTML={{ __html: sanitizeSvg(item.icon) }} />}
                    {item.label}
                  </span>
                )
              ) : (
                // Link item
                <a
                  href={item.href || '#'}
                  className={`inline-flex items-center ${s.gap} transition-colors ${classes?.link ?? ''} ${variant === 'pills' ? `rounded-full ${s.px}` : ''} ${variant === 'bordered' ? `rounded-md ${s.px}` : ''}`}
                  style={{ color: 'var(--karbon-text-3)' }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = color ? accent : 'var(--karbon-text)'
                    if (variant === 'pills' || variant === 'bordered') el.style.background = 'var(--karbon-nav-hover-bg)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--karbon-text-3)'
                    el.style.background = 'transparent'
                  }}
                >
                  {item.icon && <span className="shrink-0" dangerouslySetInnerHTML={{ __html: sanitizeSvg(item.icon) }} />}
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
