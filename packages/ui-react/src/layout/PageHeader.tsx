import { useMemo } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface PageHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
  color?: ButtonColor
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'bordered' | 'filled' | 'clean'
  backHref?: string
  backLabel?: string
  badge?: string
  breadcrumbs?: { label: string; href?: string }[]
  actions?: ReactNode
  className?: string
  classes?: { root?: string; title?: string; description?: string; icon?: string; actions?: string; breadcrumb?: string }
}

const sizeMap = {
  sm: { title: 'text-lg', desc: 'text-xs', iconBox: 32, iconSize: 16, gap: 'gap-2.5' },
  md: { title: 'text-xl', desc: 'text-sm', iconBox: 40, iconSize: 20, gap: 'gap-3' },
  lg: { title: 'text-2xl', desc: 'text-base', iconBox: 48, iconSize: 24, gap: 'gap-4' },
}

export function PageHeader({
  title,
  description = '',
  icon,
  color,
  size = 'md',
  variant = 'default',
  backHref,
  backLabel = 'Retour',
  badge,
  breadcrumbs,
  actions,
  className = '',
  classes = {}
}: PageHeaderProps) {
  const accent = color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)'
  const accentLight = color ? `var(--karbon-${color}-400)` : 'var(--karbon-primary)'
  const s = sizeMap[size]

  const rootStyle = useMemo((): CSSProperties => {
    switch (variant) {
      case 'default': return { paddingBottom: size === 'sm' ? '0.75rem' : size === 'lg' ? '1.25rem' : '1rem', borderBottom: '1px solid var(--karbon-border)', marginBottom: '0.25rem' }
      case 'bordered': return { padding: size === 'sm' ? '0.75rem' : size === 'lg' ? '1.25rem' : '1rem', border: '1px solid var(--karbon-border)', borderRadius: '0.75rem', background: 'var(--karbon-bg-card)' }
      case 'filled': return { padding: size === 'sm' ? '0.75rem' : size === 'lg' ? '1.5rem' : '1rem', borderRadius: '0.75rem', background: `color-mix(in srgb,${accent} 8%,transparent)`, border: `1px solid color-mix(in srgb,${accent} 15%,transparent)` }
      case 'clean': return {}
      default: return {}
    }
  }, [variant, size, accent])

  return (
    <div className={classes?.root ?? className} style={rootStyle}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className={`flex items-center gap-1.5 mb-2 ${classes?.breadcrumb ?? ''}`} aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--karbon-text-4)' }}><path d="m9 18 6-6-6-6"/></svg>
              )}
              {crumb.href && i < breadcrumbs.length - 1 ? (
                <a
                  href={crumb.href}
                  className="text-xs transition-colors"
                  style={{ color: 'var(--karbon-text-3)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = accent }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-3)' }}
                >{crumb.label}</a>
              ) : (
                <span className="text-xs font-medium" style={{ color: 'var(--karbon-text-2)' }}>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Back button */}
      {backHref && (
        <a
          href={backHref}
          className="inline-flex items-center gap-1.5 text-xs font-medium mb-2 transition-colors"
          style={{ color: 'var(--karbon-text-3)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = accent }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-3)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          {backLabel}
        </a>
      )}

      {/* Main row */}
      <div className={`flex items-start ${s.gap}`}>
        {/* Icon */}
        {icon && (
          <div
            className={`shrink-0 rounded-xl flex items-center justify-center ${classes?.icon ?? ''}`}
            style={{ width: s.iconBox, height: s.iconBox, background: `color-mix(in srgb,${accent} 12%,transparent)`, color: accentLight }}
          >
            {icon}
          </div>
        )}

        {/* Title + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className={`${s.title} font-bold ${classes?.title ?? ''}`} style={{ color: 'var(--karbon-text)', margin: 0 }}>{title}</h1>
            {badge && (
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{ background: `color-mix(in srgb,${accent} 15%,transparent)`, color: accentLight }}
              >{badge}</span>
            )}
          </div>
          {description && (
            <p className={`${s.desc} mt-1 ${classes?.description ?? ''}`} style={{ color: 'var(--karbon-text-3)', margin: 0 }}>{description}</p>
          )}
        </div>

        {/* Actions */}
        {actions && (
          <div className={`shrink-0 flex items-center gap-2 ${classes?.actions ?? ''}`}>
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
