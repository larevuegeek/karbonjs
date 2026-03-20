import { useMemo } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface ProgressProps {
  value: number
  max?: number
  color?: ButtonColor
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'striped' | 'gradient' | 'glow'
  shape?: 'rounded' | 'square' | 'pill'
  label?: boolean | 'inside' | 'outside' | 'top'
  labelFormat?: (value: number, max: number) => string
  indeterminate?: boolean
  animated?: boolean
  segments?: { value: number; color?: ButtonColor; label?: string }[]
  className?: string
  classes?: { root?: string; track?: string; bar?: string; label?: string }
  children?: ReactNode
}

const sizeMap = {
  xs: { track: 2, fontSize: '9px', showInside: false },
  sm: { track: 4, fontSize: '10px', showInside: false },
  md: { track: 8, fontSize: '11px', showInside: false },
  lg: { track: 12, fontSize: '11px', showInside: true },
  xl: { track: 20, fontSize: '12px', showInside: true },
}

const shapeMap: Record<string, string> = { rounded: '9999px', square: '0', pill: '9999px' }

// Inject keyframes once
const STYLE_ID = 'karbon-progress-styles'
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    @keyframes karbon-progress-indeterminate { 0% { left: -40%; } 100% { left: 100%; } }
    @keyframes karbon-progress-stripe { 0% { background-position: 30px 0; } 100% { background-position: 0 0; } }
  `
  document.head.appendChild(style)
}

export function Progress({
  value = 0,
  max = 100,
  color,
  size = 'md',
  variant = 'default',
  shape = 'rounded',
  label = false,
  labelFormat,
  indeterminate = false,
  animated = false,
  segments,
  className = '',
  classes = {},
  children
}: ProgressProps) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100)
  const accent = color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)'
  const accentLight = color ? `var(--karbon-${color}-400)` : 'var(--karbon-primary)'
  const s = sizeMap[size]
  const radius = shapeMap[shape]

  const showLabel = label === true || label === 'outside' || label === 'top' || label === 'inside'
  const labelPos = label === 'inside' ? 'inside' : label === 'top' ? 'top' : 'outside'

  function formatLabel(v: number, m: number): string {
    if (labelFormat) return labelFormat(v, m)
    return `${Math.round((v / m) * 100)}%`
  }

  function barStyle(clr?: string): CSSProperties {
    const bg = clr ? `var(--karbon-${clr}-500)` : accent
    const bgLight = clr ? `var(--karbon-${clr}-400)` : accentLight
    switch (variant) {
      case 'striped':
        return { background: `repeating-linear-gradient(45deg,${bg},${bg} 10px,color-mix(in srgb,${bg} 70%,transparent) 10px,color-mix(in srgb,${bg} 70%,transparent) 20px)` }
      case 'gradient':
        return { background: `linear-gradient(90deg,color-mix(in srgb,${bg} 60%,transparent),${bg},${bgLight})` }
      case 'glow':
        return { background: bg, boxShadow: `0 0 8px color-mix(in srgb,${bg} 50%,transparent),0 0 20px color-mix(in srgb,${bg} 20%,transparent)` }
      default:
        return { background: bg }
    }
  }

  return (
    <div className={classes?.root ?? className}>
      {/* Top label */}
      {showLabel && labelPos === 'top' && (
        <div className="flex items-center justify-between mb-1.5">
          {children ? (
            <span className={`text-xs font-medium ${classes?.label ?? ''}`} style={{ color: 'var(--karbon-text-2)' }}>{children}</span>
          ) : <span />}
          <span className={`text-xs font-semibold ${classes?.label ?? ''}`} style={{ color: accent }}>{formatLabel(value, max)}</span>
        </div>
      )}

      {/* Track */}
      <div
        className={`w-full overflow-hidden relative ${classes?.track ?? ''}`}
        style={{ height: s.track, borderRadius: radius, background: 'var(--karbon-border,rgba(255,255,255,0.08))' }}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemax={max}
      >
        {indeterminate ? (
          <div
            className={classes?.bar ?? ''}
            style={{ ...barStyle(), borderRadius: radius, position: 'absolute', height: '100%', width: '40%', animation: 'karbon-progress-indeterminate 1.5s ease-in-out infinite' }}
          />
        ) : segments && segments.length > 0 ? (
          <div className="flex h-full">
            {segments.map((seg, i) => {
              const segPercent = Math.min(Math.max((seg.value / max) * 100, 0), 100)
              return (
                <div
                  key={i}
                  className={`h-full transition-all duration-500 ease-out ${classes?.bar ?? ''}`}
                  style={{ width: `${segPercent}%`, ...barStyle(seg.color) }}
                  title={seg.label || `${Math.round(segPercent)}%`}
                />
              )
            })}
          </div>
        ) : (
          <>
            <div
              className={`h-full transition-all duration-500 ease-out ${classes?.bar ?? ''}`}
              style={{
                width: `${percent}%`,
                borderRadius: radius,
                ...barStyle(),
                ...(animated ? { backgroundSize: '30px 30px', animation: 'karbon-progress-stripe 1s linear infinite' } : {})
              }}
            />
            {/* Inside label */}
            {showLabel && labelPos === 'inside' && s.showInside && percent > 10 && (
              <span
                className={`absolute right-2 top-1/2 -translate-y-1/2 font-bold ${classes?.label ?? ''}`}
                style={{ fontSize: s.fontSize, color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
              >{formatLabel(value, max)}</span>
            )}
          </>
        )}
      </div>

      {/* Outside label */}
      {showLabel && labelPos === 'outside' && (
        <div className="flex items-center justify-between mt-1.5">
          {children ? (
            <span className={`text-xs ${classes?.label ?? ''}`} style={{ color: 'var(--karbon-text-3)' }}>{children}</span>
          ) : <span />}
          <span className={`text-xs font-semibold ${classes?.label ?? ''}`} style={{ color: accent }}>{formatLabel(value, max)}</span>
        </div>
      )}
    </div>
  )
}
