import { useMemo } from 'react'
import type { ReactNode } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface BadgeProps {
  variant?: 'soft' | 'solid' | 'outline' | 'dot' | 'flat'
  color?: ButtonColor
  size?: 'xs' | 'sm' | 'md' | 'lg'
  shape?: 'pill' | 'rounded' | 'square'
  closable?: boolean
  dot?: boolean
  icon?: ReactNode
  className?: string
  classes?: { root?: string; dot?: string; icon?: string; close?: string }
  onClose?: () => void
  children: ReactNode
}

function c(color: string, shade: number): string {
  return `var(--karbon-${color}-${shade})`
}

const presetStyles: Record<string, string> = {
  soft: 'background:var(--karbon-bg-2);color:var(--karbon-text-2);',
  solid: 'background:var(--karbon-primary);color:white;',
  outline: 'background:transparent;color:var(--karbon-text-2);border:1px solid var(--karbon-border);',
  dot: 'background:var(--karbon-bg-2);color:var(--karbon-text-2);',
  flat: 'background:transparent;color:var(--karbon-text-2);',
}

function parseInlineStyle(raw: string): React.CSSProperties {
  const style: Record<string, string> = {}
  for (const pair of raw.split(';')) {
    const idx = pair.indexOf(':')
    if (idx < 0) continue
    const prop = pair.slice(0, idx).trim()
    const val = pair.slice(idx + 1).trim()
    if (!prop || !val) continue
    // Convert CSS property names to camelCase
    const camel = prop.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase())
    style[camel] = val
  }
  return style as React.CSSProperties
}

const sizeClasses: Record<string, string> = {
  xs: 'px-1.5 py-px text-[10px] gap-1',
  sm: 'px-2 py-0.5 text-[11px] gap-1',
  md: 'px-2.5 py-0.5 text-xs gap-1.5',
  lg: 'px-3 py-1 text-sm gap-1.5',
}

const dotSizes: Record<string, string> = {
  xs: 'w-1 h-1',
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2 h-2',
}

const iconSizes: Record<string, number> = { xs: 8, sm: 10, md: 12, lg: 14 }

const shapeClasses: Record<string, string> = {
  pill: 'rounded-full',
  rounded: 'rounded-md',
  square: 'rounded-none',
}

export function Badge({
  variant = 'soft',
  color,
  size = 'sm',
  shape = 'pill',
  closable = false,
  dot = false,
  icon,
  className = '',
  classes = {},
  onClose,
  children,
}: BadgeProps) {
  const accent = color ? c(color, 500) : 'var(--karbon-primary)'
  const accentLight = color ? c(color, 400) : 'var(--karbon-primary)'

  const colorStyle = useMemo((): React.CSSProperties => {
    if (!color) return parseInlineStyle(presetStyles[variant] || presetStyles.soft)
    switch (variant) {
      case 'soft': return parseInlineStyle(`background:color-mix(in srgb,${accent} 15%,transparent);color:${accentLight};`)
      case 'solid': return parseInlineStyle(`background:${accent};color:white;`)
      case 'outline': return parseInlineStyle(`background:transparent;color:${accentLight};border:1px solid color-mix(in srgb,${accentLight} 40%,transparent);`)
      case 'dot': return parseInlineStyle(`background:color-mix(in srgb,${accent} 10%,transparent);color:${accentLight};`)
      case 'flat': return parseInlineStyle(`background:transparent;color:${accentLight};`)
      default: return parseInlineStyle(`background:color-mix(in srgb,${accent} 15%,transparent);color:${accentLight};`)
    }
  }, [variant, color, accent, accentLight])

  const showDot = (variant === 'dot' || dot) && !icon

  const cls = [
    'inline-flex items-center font-medium',
    sizeClasses[size],
    shapeClasses[shape],
    classes?.root ?? className,
  ].filter(Boolean).join(' ')

  return (
    <span className={cls} style={colorStyle}>
      {showDot && (
        <span
          className={`rounded-full shrink-0 ${dotSizes[size]} ${classes?.dot ?? ''}`}
          style={{ background: color ? accentLight : 'currentColor' }}
        />
      )}

      {icon && (
        <span className={`shrink-0 ${classes?.icon ?? ''}`}>
          {icon}
        </span>
      )}

      {children}

      {closable && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose?.() }}
          className={`shrink-0 ml-0.5 rounded-full transition-opacity opacity-60 hover:opacity-100 cursor-pointer ${classes?.close ?? ''}`}
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={iconSizes[size]} height={iconSizes[size]} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      )}
    </span>
  )
}
