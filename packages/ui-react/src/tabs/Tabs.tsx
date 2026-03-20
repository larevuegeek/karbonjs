import { useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface TabItem {
  id: string
  label: string
  icon?: string
  badge?: string | number
  disabled?: boolean
}

export interface TabsProps {
  tabs: TabItem[]
  active?: string
  variant?: 'underline' | 'pills' | 'bordered' | 'segment'
  color?: ButtonColor
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  vertical?: boolean
  className?: string
  classes?: { root?: string; list?: string; tab?: string; panel?: string; indicator?: string }
  onchange?: (id: string) => void
  panel?: (activeId: string) => ReactNode
}

function sanitizeSvg(html: string): string {
  return html.replace(/on\w+\s*=/gi, '').replace(/<script/gi, '&lt;script')
}

const sizeMap = {
  sm: { px: 'px-3', py: 'py-1.5', text: 'text-xs', badge: 'text-[9px] px-1 py-px', gap: 'gap-1.5' },
  md: { px: 'px-4', py: 'py-2.5', text: 'text-sm', badge: 'text-[10px] px-1.5 py-px', gap: 'gap-2' },
  lg: { px: 'px-5', py: 'py-3', text: 'text-base', badge: 'text-xs px-1.5 py-0.5', gap: 'gap-2' },
}

export function Tabs({
  tabs,
  active: activeProp,
  variant = 'underline',
  color,
  size = 'md',
  fullWidth = false,
  vertical = false,
  className = '',
  classes = {},
  onchange,
  panel,
}: TabsProps) {
  const active = activeProp ?? tabs[0]?.id ?? ''
  const accent = color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)'
  const s = sizeMap[size]

  const select = useCallback((id: string) => {
    onchange?.(id)
  }, [onchange])

  const tabStyle = useCallback((isActive: boolean): string => {
    switch (variant) {
      case 'underline':
        return isActive ? `color:${accent};` : 'color:var(--karbon-text-3);'
      case 'pills':
        return isActive ? `background:${accent};color:white;` : 'color:var(--karbon-text-3);background:transparent;'
      case 'bordered':
        return isActive
          ? `background:var(--karbon-bg-card);color:${accent};border-color:var(--karbon-border);border-bottom-color:var(--karbon-bg-card);`
          : 'color:var(--karbon-text-3);border-color:transparent;'
      case 'segment':
        return isActive
          ? `background:var(--karbon-bg-card);color:${accent};box-shadow:0 1px 3px rgba(0,0,0,0.1);`
          : 'color:var(--karbon-text-3);background:transparent;'
      default: return ''
    }
  }, [variant, accent])

  const listStyle = useMemo((): React.CSSProperties => {
    switch (variant) {
      case 'underline': return { borderBottom: '1px solid var(--karbon-border)' }
      case 'pills': return {}
      case 'bordered': return { borderBottom: '1px solid var(--karbon-border)' }
      case 'segment': return { background: 'var(--karbon-bg-2)', padding: 3, borderRadius: '0.625rem' }
      default: return {}
    }
  }, [variant])

  const tabShapeClass = useMemo((): string => {
    switch (variant) {
      case 'pills': return 'rounded-lg'
      case 'bordered': return 'rounded-t-lg border border-b-0'
      case 'segment': return 'rounded-lg'
      default: return ''
    }
  }, [variant])

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

  return (
    <div className={`${vertical ? 'flex gap-4' : ''} ${classes?.root ?? className}`}>
      {/* Tab list */}
      <div
        className={`${vertical ? 'flex flex-col shrink-0' : 'flex'} ${fullWidth && !vertical ? '[&>*]:flex-1' : ''} ${s.gap} ${classes?.list ?? ''}`}
        style={listStyle}
        role="tablist"
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
      >
        {tabs.map(tab => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => { if (!tab.disabled) select(tab.id) }}
              disabled={tab.disabled}
              className={`relative ${s.px} ${s.py} ${s.text} font-medium transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${tabShapeClass} ${fullWidth ? 'text-center' : ''} inline-flex items-center ${s.gap} whitespace-nowrap ${classes?.tab ?? ''}`}
              style={parseCssText(tabStyle(isActive))}
              onMouseEnter={(e) => { if (!isActive && !tab.disabled) (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-2)' }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.cssText = tabStyle(isActive) }}
            >
              {tab.icon && <span className="shrink-0" dangerouslySetInnerHTML={{ __html: sanitizeSvg(tab.icon) }} />}
              <span>{tab.label}</span>
              {tab.badge != null && (
                <span
                  className={`rounded-full font-semibold ${s.badge}`}
                  style={{ background: isActive ? `color-mix(in srgb,${accent} 20%,transparent)` : 'var(--karbon-bg-2)', color: isActive ? accent : 'var(--karbon-text-3)' }}
                >{tab.badge}</span>
              )}

              {/* Underline indicator */}
              {variant === 'underline' && isActive && (
                <span
                  className={`absolute ${vertical ? 'right-0 top-0 bottom-0 w-0.5' : 'bottom-0 left-0 right-0 h-0.5'} ${classes?.indicator ?? ''}`}
                  style={{ background: accent, borderRadius: 1 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Panel */}
      {panel && (
        <div className={`${vertical ? 'flex-1' : 'mt-4'} ${classes?.panel ?? ''}`} role="tabpanel">
          {panel(active)}
        </div>
      )}
    </div>
  )
}
