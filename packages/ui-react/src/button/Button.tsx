import { useMemo, useState } from 'react'
import type { ButtonVariant, ButtonSize, ButtonColor, ButtonShape } from '@karbonjs/ui-core'
import type { ReactNode } from 'react'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: ButtonColor
  shape?: ButtonShape
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  arrow?: boolean
  fullWidth?: boolean
  className?: string
  classes?: { root?: string }
  onClick?: () => void
  children: ReactNode
}

const sizeClasses: Record<string, string> = {
  '2xs': 'px-1.5 py-0.5 text-[10px] rounded-sm',
  xs: 'px-2.5 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
  xl: 'px-6 py-3 text-base',
  '2xl': 'px-8 py-3.5 text-lg',
  '3xl': 'px-10 py-4 text-xl',
}

const circleSizeClasses: Record<string, string> = {
  '2xs': 'w-5 h-5 text-[10px]',
  xs: 'w-7 h-7 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-14 h-14 text-base',
  '2xl': 'w-16 h-16 text-lg',
  '3xl': 'w-20 h-20 text-xl',
}

const shapeClasses: Record<string, string> = {
  sharp: 'rounded-none',
  soft: 'rounded-md',
  rounded: 'rounded-lg',
  pill: 'rounded-full',
  circle: 'rounded-full',
}

function c(color: string, shade: number): string {
  return `var(--karbon-${color}-${shade})`
}

function buildCssVars(variant: ButtonVariant, color?: ButtonColor): string {
  const pri = color ? c(color, 500) : 'var(--karbon-primary)'
  const priHover = color ? c(color, 600) : 'var(--karbon-primary-hover)'
  const priLight = color ? c(color, 400) : 'var(--karbon-primary)'
  const priFg = color ? 'white' : 'var(--karbon-primary-foreground, white)'

  switch (variant) {
    case 'solid':
      return `--kb-bg:${pri};--kb-bg-h:${priHover};--kb-c:${priFg};--kb-c-h:${priFg};--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none`
    case 'flat':
      return `--kb-bg:color-mix(in srgb,${pri} 15%,transparent);--kb-bg-h:color-mix(in srgb,${pri} 25%,transparent);--kb-c:${priLight};--kb-c-h:${priLight};--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none`
    case 'bordered':
      return `--kb-bg:transparent;--kb-bg-h:color-mix(in srgb,${pri} 8%,transparent);--kb-c:${priLight};--kb-c-h:${priLight};--kb-b:2px solid ${priLight};--kb-b-h:2px solid ${pri};--kb-sh:none;--kb-sh-h:none`
    case 'light':
      return `--kb-bg:transparent;--kb-bg-h:color-mix(in srgb,${pri} 10%,transparent);--kb-c:${priLight};--kb-c-h:${pri};--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none`
    case 'outline':
      return `--kb-bg:transparent;--kb-bg-h:color-mix(in srgb,${pri} 6%,transparent);--kb-c:${priLight};--kb-c-h:${priLight};--kb-b:1px solid color-mix(in srgb,${priLight} 35%,transparent);--kb-b-h:1px solid ${priLight};--kb-sh:none;--kb-sh-h:none`
    case 'ghost':
      return color
        ? `--kb-bg:transparent;--kb-bg-h:color-mix(in srgb,${pri} 10%,transparent);--kb-c:${priLight};--kb-c-h:${priLight};--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none`
        : `--kb-bg:transparent;--kb-bg-h:var(--karbon-nav-hover-bg,rgba(255,255,255,0.05));--kb-c:var(--karbon-text-3);--kb-c-h:var(--karbon-text-2);--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none`
    case 'shadow':
      return `--kb-bg:${pri};--kb-bg-h:${priHover};--kb-c:${priFg};--kb-c-h:${priFg};--kb-b:none;--kb-b-h:none;--kb-sh:0 4px 14px 0 color-mix(in srgb,${pri} 40%,transparent);--kb-sh-h:0 6px 20px 0 color-mix(in srgb,${pri} 55%,transparent)`
    default:
      return ''
  }
}

function parseCssVars(raw: string): Record<string, string> {
  const result: Record<string, string> = {}
  if (!raw) return result
  for (const pair of raw.split(';')) {
    const idx = pair.indexOf(':')
    if (idx < 0) continue
    result[pair.slice(0, idx).trim()] = pair.slice(idx + 1).trim()
  }
  return result
}

const btnBaseStyle: React.CSSProperties = {
  background: 'var(--kb-bg)',
  color: 'var(--kb-c)',
  border: 'var(--kb-b)',
  boxShadow: 'var(--kb-sh)',
}

const btnHoverStyle: React.CSSProperties = {
  background: 'var(--kb-bg-h)',
  color: 'var(--kb-c-h)',
  border: 'var(--kb-b-h)',
  boxShadow: 'var(--kb-sh-h)',
}

const btnActiveStyle: React.CSSProperties = {
  ...btnHoverStyle,
  transform: 'scale(0.97)',
}

const Spinner = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
)

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
)

export function Button({
  variant = 'solid',
  size = 'md',
  color,
  shape = 'rounded',
  type = 'button',
  disabled = false,
  loading = false,
  loadingText = '',
  arrow = false,
  fullWidth = false,
  className = '',
  classes = {},
  onClick,
  children,
}: Props) {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  const isDisabled = disabled || loading

  const cssVarsRaw = useMemo(() => buildCssVars(variant, color), [variant, color])
  const cssVars = useMemo(() => parseCssVars(cssVarsRaw), [cssVarsRaw])

  const inlineStyle = useMemo((): React.CSSProperties => {
    const base: React.CSSProperties = { ...cssVars as any }
    if (isDisabled) {
      return { ...base, ...btnBaseStyle }
    }
    if (active) {
      return { ...base, ...btnActiveStyle }
    }
    if (hovered) {
      return { ...base, ...btnHoverStyle }
    }
    return { ...base, ...btnBaseStyle }
  }, [cssVars, hovered, active, isDisabled])

  const sizeClass = arrow
    ? 'relative overflow-hidden py-3 md:py-3.5 px-8 text-[0.8125rem] md:text-sm'
    : fullWidth
      ? `w-full ${sizeClasses[size]}`
      : shape === 'circle'
        ? circleSizeClasses[size]
        : sizeClasses[size]

  const cls = [
    'karbon-btn',
    'inline-flex items-center justify-center gap-2 font-semibold',
    shapeClasses[shape],
    'transition-all duration-200 ease-out',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    sizeClass,
    arrow ? 'group' : '',
    classes?.root ?? className,
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      style={inlineStyle}
      className={cls}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false) }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      {arrow ? (
        <>
          <span className={`flex items-center gap-2 transition-transform duration-300 ${hovered && !isDisabled ? '-translate-x-3' : ''}`}>
            {loading ? (
              <>
                <Spinner />
                {loadingText && <span>{loadingText}</span>}
              </>
            ) : (
              children
            )}
          </span>
          {!loading && (
            <span className={`absolute right-5 flex items-center transition-all duration-300 ${hovered && !isDisabled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-1'}`}>
              <ArrowIcon />
            </span>
          )}
        </>
      ) : (
        <>
          {loading ? (
            <>
              <Spinner />
              {loadingText ? <span>{loadingText}</span> : children}
            </>
          ) : (
            children
          )}
        </>
      )}
    </button>
  )
}
