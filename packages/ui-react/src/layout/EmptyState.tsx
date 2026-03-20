import { useMemo } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  color?: ButtonColor
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'bordered' | 'filled' | 'minimal'
  actions?: ReactNode
  illustration?: ReactNode
  className?: string
  classes?: { root?: string; icon?: string; title?: string; description?: string; actions?: string }
}

const sizeMap = {
  sm: { py: 'py-8', title: 'text-sm', desc: 'text-xs', iconBox: 40, iconSize: 20, maxW: '18rem', gap: 'gap-2' },
  md: { py: 'py-12', title: 'text-base', desc: 'text-sm', iconBox: 52, iconSize: 24, maxW: '22rem', gap: 'gap-3' },
  lg: { py: 'py-16', title: 'text-lg', desc: 'text-base', iconBox: 64, iconSize: 28, maxW: '26rem', gap: 'gap-4' },
}

export function EmptyState({
  title,
  description = '',
  icon,
  color,
  size = 'md',
  variant = 'default',
  actions,
  illustration,
  className = '',
  classes = {}
}: EmptyStateProps) {
  const accent = color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)'
  const accentLight = color ? `var(--karbon-${color}-400)` : 'var(--karbon-text-4)'
  const s = sizeMap[size]

  const rootStyle = useMemo((): CSSProperties => {
    switch (variant) {
      case 'bordered': return { border: '1px solid var(--karbon-border)', borderRadius: '0.75rem', background: 'var(--karbon-bg-card)' }
      case 'filled': return { borderRadius: '0.75rem', background: `color-mix(in srgb,${accent} 5%,transparent)`, border: `1px solid color-mix(in srgb,${accent} 10%,transparent)` }
      case 'minimal': return {}
      default: return {}
    }
  }, [variant, accent])

  return (
    <div className={`text-center ${s.py} px-6 ${classes?.root ?? className}`} style={rootStyle}>
      {/* Illustration */}
      {illustration ? (
        <div className="mb-4 flex justify-center">
          {illustration}
        </div>
      ) : icon ? (
        <div
          className={`mx-auto mb-4 rounded-2xl flex items-center justify-center ${classes?.icon ?? ''}`}
          style={{ width: s.iconBox, height: s.iconBox, background: `color-mix(in srgb,${accent} 10%,transparent)`, color: accentLight }}
        >
          {icon}
        </div>
      ) : (
        <div
          className={`mx-auto mb-4 rounded-2xl flex items-center justify-center ${classes?.icon ?? ''}`}
          style={{ width: s.iconBox, height: s.iconBox, background: 'var(--karbon-nav-hover-bg)', color: 'var(--karbon-text-4)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={s.iconSize} height={s.iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
        </div>
      )}

      {/* Title */}
      <p className={`${s.title} font-semibold ${classes?.title ?? ''}`} style={{ color: 'var(--karbon-text)', margin: 0 }}>{title}</p>

      {/* Description */}
      {description && (
        <p className={`${s.desc} mt-1.5 mx-auto ${classes?.description ?? ''}`} style={{ color: 'var(--karbon-text-3)', marginTop: '0.375rem', maxWidth: s.maxW }}>{description}</p>
      )}

      {/* Actions */}
      {actions && (
        <div className={`mt-5 flex items-center justify-center ${s.gap} ${classes?.actions ?? ''}`}>
          {actions}
        </div>
      )}
    </div>
  )
}
