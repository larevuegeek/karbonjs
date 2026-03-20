import { useMemo } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface DividerProps {
  direction?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient'
  color?: ButtonColor
  thickness?: number
  label?: string
  labelPosition?: 'left' | 'center' | 'right'
  icon?: ReactNode
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  classes?: { root?: string; line?: string; label?: string }
}

const spacingMap: Record<string, string> = { none: '0', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2.5rem' }

export function Divider({
  direction = 'horizontal',
  variant = 'solid',
  color,
  thickness = 1,
  label = '',
  labelPosition = 'center',
  icon,
  spacing = 'md',
  className = '',
  classes = {}
}: DividerProps) {
  const lineColor = color ? `var(--karbon-${color}-500)` : 'var(--karbon-border)'
  const labelColor = color ? `var(--karbon-${color}-400)` : 'var(--karbon-text-4)'
  const pad = spacingMap[spacing]
  const hasLabel = !!label || !!icon
  const isSolidOrGradient = variant === 'solid' || variant === 'gradient'

  const lineStyle = useMemo((): CSSProperties => {
    const base: CSSProperties = {}
    switch (variant) {
      case 'solid': base.background = lineColor; break
      case 'dashed': base.background = 'transparent'; base.borderTopStyle = 'dashed'; base.borderTopWidth = thickness; base.borderTopColor = lineColor; base.height = 0; break
      case 'dotted': base.background = 'transparent'; base.borderTopStyle = 'dotted'; base.borderTopWidth = thickness; base.borderTopColor = lineColor; base.height = 0; break
      case 'gradient': base.background = `linear-gradient(90deg,transparent,${lineColor},transparent)`; break
    }
    return base
  }, [variant, lineColor, thickness])

  const verticalLineStyle = useMemo((): CSSProperties => {
    const base: CSSProperties = {}
    switch (variant) {
      case 'solid': base.background = lineColor; break
      case 'dashed': base.background = 'transparent'; base.borderLeftStyle = 'dashed'; base.borderLeftWidth = thickness; base.borderLeftColor = lineColor; base.width = 0; break
      case 'dotted': base.background = 'transparent'; base.borderLeftStyle = 'dotted'; base.borderLeftWidth = thickness; base.borderLeftColor = lineColor; base.width = 0; break
      case 'gradient': base.background = `linear-gradient(180deg,transparent,${lineColor},transparent)`; break
    }
    return base
  }, [variant, lineColor, thickness])

  // Vertical
  if (direction === 'vertical') {
    return (
      <div
        className={`inline-flex self-stretch items-center ${classes?.root ?? className}`}
        style={{ padding: `0 ${pad}` }}
      >
        {hasLabel ? (
          <div className="flex flex-col items-center gap-2 h-full">
            <div className="flex-1" style={{ ...verticalLineStyle, width: isSolidOrGradient ? thickness : 0, minHeight: 8 }} />
            {icon ? (
              <span className="shrink-0" style={{ color: labelColor }}>{icon}</span>
            ) : (
              <span className={`text-[10px] font-medium shrink-0 [writing-mode:vertical-lr] ${classes?.label ?? ''}`} style={{ color: labelColor }}>{label}</span>
            )}
            <div className="flex-1" style={{ ...verticalLineStyle, width: isSolidOrGradient ? thickness : 0, minHeight: 8 }} />
          </div>
        ) : (
          <div style={{ ...verticalLineStyle, width: isSolidOrGradient ? thickness : 0, height: '100%' }} />
        )}
      </div>
    )
  }

  // Horizontal with label
  if (hasLabel) {
    return (
      <div
        className={`flex items-center gap-3 ${classes?.root ?? className}`}
        style={{ padding: `${pad} 0` }}
      >
        <div
          className={`${labelPosition === 'left' ? 'w-8' : 'flex-1'} ${classes?.line ?? ''}`}
          style={{ ...lineStyle, height: isSolidOrGradient ? thickness : 0, minWidth: 8 }}
        />
        <div className="flex items-center gap-2 shrink-0">
          {icon && <span style={{ color: labelColor }}>{icon}</span>}
          {label && <span className={`text-xs font-medium ${classes?.label ?? ''}`} style={{ color: labelColor }}>{label}</span>}
        </div>
        <div
          className={`${labelPosition === 'right' ? 'w-8' : 'flex-1'} ${classes?.line ?? ''}`}
          style={{ ...lineStyle, height: isSolidOrGradient ? thickness : 0, minWidth: 8 }}
        />
      </div>
    )
  }

  // Horizontal simple
  return (
    <div
      className={`w-full ${classes?.root ?? className}`}
      style={{ ...lineStyle, height: isSolidOrGradient ? thickness : 0, margin: `${pad} 0` }}
    />
  )
}
