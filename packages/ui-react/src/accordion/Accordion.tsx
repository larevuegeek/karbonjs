import { useState, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface AccordionItem {
  id: string
  title: string
  content?: string
  description?: string
  icon?: string
  disabled?: boolean
  defaultOpen?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  multiple?: boolean
  variant?: 'default' | 'bordered' | 'separated' | 'ghost' | 'filled' | 'colored'
  color?: ButtonColor
  size?: 'sm' | 'md' | 'lg'
  bg?: boolean | string
  border?: boolean | string
  highlightActive?: boolean
  arrow?: 'chevron' | 'plus' | 'arrow' | 'dot' | 'none'
  arrowPosition?: 'left' | 'right'
  className?: string
  classes?: { root?: string; item?: string; trigger?: string; content?: string; arrow?: string }
  onchange?: (openIds: string[]) => void
  children?: (ctx: { item: AccordionItem; index: number }) => ReactNode
}

const sizeMap = {
  sm: { px: 'px-3', py: 'py-2.5', text: 'text-xs', content: 'text-xs', icon: 14, arrowBox: 20 },
  md: { px: 'px-4', py: 'py-3.5', text: 'text-sm', content: 'text-sm', icon: 16, arrowBox: 24 },
  lg: { px: 'px-5', py: 'py-4', text: 'text-base', content: 'text-base', icon: 18, arrowBox: 28 },
}

const arrows: Record<string, { open: string; closed: string }> = {
  chevron: { closed: '<path d="m6 9 6 6 6-6"/>', open: '<path d="m6 9 6 6 6-6"/>' },
  plus: { closed: '<path d="M12 5v14"/><path d="M5 12h14"/>', open: '<path d="M5 12h14"/>' },
  arrow: { closed: '<path d="m9 18 6-6-6-6"/>', open: '<path d="m9 18 6-6-6-6"/>' },
  dot: { closed: '<circle cx="12" cy="12" r="4"/>', open: '<circle cx="12" cy="12" r="4"/>' },
}

function sanitizeSvg(html: string): string {
  return html.replace(/on\w+\s*=/gi, '').replace(/<script/gi, '&lt;script')
}

export function Accordion({
  items,
  multiple = false,
  variant = 'default',
  bg = false,
  border = false,
  highlightActive = true,
  color,
  size = 'md',
  arrow = 'chevron',
  arrowPosition = 'right',
  className = '',
  classes = {},
  onchange,
  children,
}: AccordionProps) {
  const accent = color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)'
  const accentBg = accent
  const s = sizeMap[size]

  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(items.filter(i => i.defaultOpen).map(i => i.id)))

  const toggle = useCallback((id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else { if (!multiple) next.clear(); next.add(id) }
      onchange?.([...next])
      return next
    })
  }, [multiple, onchange])

  function arrowRotation(isOpen: boolean): string {
    if (arrow === 'plus' || arrow === 'dot') return ''
    if (arrow === 'arrow') return isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
    return isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
  }

  const rootStyle = useMemo((): React.CSSProperties => {
    const bc = border ? (typeof border === 'string' ? border : 'var(--karbon-border)') : 'var(--karbon-border)'
    switch (variant) {
      case 'default':
      case 'bordered':
        return { borderRadius: '0.75rem', border: `1px solid ${bc}`, overflow: 'hidden' }
      case 'separated':
      case 'ghost':
        return {}
      case 'filled':
      case 'colored':
        return { borderRadius: '0.75rem', overflow: 'hidden' }
      default: return {}
    }
  }, [variant, border])

  function itemStyle(isOpen: boolean, isLast: boolean): React.CSSProperties {
    const bc = border ? (typeof border === 'string' ? border : 'var(--karbon-border)') : undefined
    switch (variant) {
      case 'separated': {
        const b = bc ?? (isOpen ? accent : 'var(--karbon-border)')
        return {
          borderRadius: '0.75rem', border: `1px solid ${b}`, overflow: 'hidden', marginBottom: '0.5rem',
          ...(isOpen ? { boxShadow: `0 0 0 1px color-mix(in srgb,${accent} 15%,transparent),0 2px 8px color-mix(in srgb,${accent} 8%,transparent)` } : {}),
        }
      }
      case 'filled': {
        const b = bc ?? (isOpen ? `color-mix(in srgb,${accent} 15%,transparent)` : 'var(--karbon-border)')
        return {
          background: isOpen ? `color-mix(in srgb,${accentBg} 6%,transparent)` : 'transparent',
          ...(!isLast ? { borderBottom: `1px solid ${b}` } : {}),
        }
      }
      case 'colored': {
        const b = bc ?? (isOpen ? `color-mix(in srgb,${accent} 20%,transparent)` : 'var(--karbon-border)')
        return {
          background: isOpen ? `color-mix(in srgb,${accentBg} 12%,transparent)` : 'var(--karbon-bg-2)',
          ...(!isLast ? { borderBottom: `1px solid ${b}` } : {}),
          ...(isOpen ? { boxShadow: `inset 3px 0 0 ${accent}` } : {}),
          transition: 'all 0.2s ease',
        }
      }
      case 'ghost': {
        const b = bc ?? 'var(--karbon-border)'
        return !isLast ? { borderBottom: `1px solid ${b}` } : {}
      }
      default: {
        const b = bc ?? 'var(--karbon-border)'
        return !isLast ? { borderBottom: `1px solid ${b}` } : {}
      }
    }
  }

  function triggerStyle(isOpen: boolean): string {
    if (!highlightActive) return 'color:var(--karbon-text);'
    if (variant === 'bordered' && isOpen) return `background:color-mix(in srgb,${accent} 6%,transparent);color:${accent};`
    if (variant === 'colored' && isOpen) return `color:${accent};`
    return `color:${isOpen ? accent : 'var(--karbon-text)'};`
  }

  function arrowStyleStr(isOpen: boolean): React.CSSProperties {
    const base: React.CSSProperties = {
      width: s.arrowBox, height: s.arrowBox, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 6, transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)', flexShrink: 0,
    }
    if (isOpen) {
      return { ...base, background: `color-mix(in srgb,${accent} 15%,transparent)`, color: accent, transform: arrowRotation(true) }
    }
    return { ...base, background: 'transparent', color: 'var(--karbon-text-4)', transform: arrowRotation(false) }
  }

  function parseCssText(str: string): React.CSSProperties {
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
    return style as React.CSSProperties
  }

  const bgStyle: React.CSSProperties = bg === true ? { background: 'var(--karbon-bg-card)' } : typeof bg === 'string' ? { background: bg } : {}

  const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
    <span style={arrowStyleStr(isOpen)} className={classes?.arrow ?? ''}>
      <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill={arrow === 'dot' ? 'currentColor' : 'none'} stroke={arrow === 'dot' ? 'none' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: isOpen ? arrows[arrow].open : arrows[arrow].closed }} />
    </span>
  )

  return (
    <div className={classes?.root ?? className} style={{ ...rootStyle, ...bgStyle }}>
      {items.map((item, index) => {
        const isOpen = openIds.has(item.id)
        const isLast = index === items.length - 1
        return (
          <div key={item.id} className={classes?.item ?? ''} style={itemStyle(isOpen, isLast)}>
            {/* Trigger */}
            <button
              type="button"
              onClick={() => { if (!item.disabled) toggle(item.id) }}
              disabled={item.disabled}
              className={`w-full flex items-center gap-3 ${s.px} ${s.py} ${s.text} font-medium text-left transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${classes?.trigger ?? ''}`}
              style={parseCssText(triggerStyle(isOpen))}
              onMouseEnter={(e) => { if (!item.disabled && !isOpen) (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.cssText = triggerStyle(isOpen) }}
            >
              {/* Left arrow */}
              {arrowPosition === 'left' && arrow !== 'none' && <ArrowIcon isOpen={isOpen} />}

              {/* Item icon */}
              {item.icon && <span className="shrink-0 opacity-60" dangerouslySetInnerHTML={{ __html: sanitizeSvg(item.icon) }} />}

              {/* Title + description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span>{item.title}</span>
                  {item.description && !isOpen && (
                    <span className="font-normal truncate hidden sm:inline" style={{ color: 'var(--karbon-text-4)', fontSize: '0.85em' }}>&mdash; {item.description}</span>
                  )}
                </div>
                {item.description && isOpen && (
                  <p className="font-normal mt-0.5" style={{ color: 'var(--karbon-text-3)', fontSize: '0.85em' }}>{item.description}</p>
                )}
              </div>

              {/* Right arrow */}
              {arrowPosition === 'right' && arrow !== 'none' && <ArrowIcon isOpen={isOpen} />}
            </button>

            {/* Content */}
            {isOpen && (
              <div className={`${s.px} pb-4 ${s.content} ${classes?.content ?? ''}`} style={{ color: 'var(--karbon-text-2)' }}>
                {children ? children({ item, index }) : item.content && <p className="leading-relaxed">{item.content}</p>}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
