import { useMemo, useCallback, useRef, useEffect } from 'react'
import type { ButtonColor, CheckboxClasses } from '@karbonjs/ui-core'

export interface CheckboxProps {
  name: string
  checked?: boolean
  indeterminate?: boolean
  label?: string
  description?: string
  disabled?: boolean
  color?: ButtonColor
  size?: 'sm' | 'md' | 'lg'
  shape?: 'square' | 'rounded' | 'circle'
  icon?: 'check' | 'cross' | 'dash' | 'heart' | 'star' | 'circle' | 'eye'
  variant?: 'filled' | 'outlined' | 'ghost' | 'elegant'
  classes?: CheckboxClasses
  className?: string
  onChange?: (checked: boolean) => void
}

const sizeMap = {
  sm: { box: 'w-3.5 h-3.5', icon: 10, text: 'text-xs', desc: 'text-[11px]', gap: 'gap-2' },
  md: { box: 'w-4.5 h-4.5', icon: 13, text: 'text-sm', desc: 'text-xs', gap: 'gap-2.5' },
  lg: { box: 'w-5.5 h-5.5', icon: 16, text: 'text-base', desc: 'text-sm', gap: 'gap-3' },
}

const shapeMap = { square: 'rounded-none', rounded: 'rounded', circle: 'rounded-full' }

function CheckIcon({ size, color }: { size: number; color: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
}

function CrossIcon({ size, color }: { size: number; color: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
}

function DashIcon({ size, color }: { size: number; color: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
}

function HeartIcon({ size, color }: { size: number; color: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
}

function StarIcon({ size, color }: { size: number; color: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
}

function CircleIcon({ size, color }: { size: number; color: string }) {
  const r = Math.round(size * 0.6)
  return <svg xmlns="http://www.w3.org/2000/svg" width={r} height={r} viewBox="0 0 24 24" fill={color} stroke="none"><circle cx="12" cy="12" r="12"/></svg>
}

function EyeIcon({ size, color }: { size: number; color: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
}

const iconComponents = {
  check: CheckIcon,
  cross: CrossIcon,
  dash: DashIcon,
  heart: HeartIcon,
  star: StarIcon,
  circle: CircleIcon,
  eye: EyeIcon,
}

export function Checkbox({
  name,
  checked = false,
  indeterminate = false,
  label = '',
  description = '',
  disabled = false,
  color,
  size = 'md',
  shape = 'rounded',
  icon = 'check',
  variant = 'filled',
  classes,
  className = '',
  onChange
}: CheckboxProps) {
  const boxRef = useRef<HTMLDivElement>(null)

  const accentColor = useMemo(() => color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)', [color])

  const s = sizeMap[size]
  const shapeClass = shapeMap[shape]
  const isActive = checked || indeterminate

  const boxCssText = useMemo(() => {
    switch (variant) {
      case 'filled':
        return `background:${isActive ? accentColor : 'var(--karbon-bg-input,rgba(255,255,255,0.06))'};border:${isActive ? 'none' : '1.5px solid var(--karbon-border-input,rgba(255,255,255,0.12))'};box-shadow:${isActive ? `0 0 0 2px color-mix(in srgb,${accentColor} 20%,transparent)` : 'none'};`
      case 'outlined':
        return `background:transparent;border:2px solid ${isActive ? accentColor : 'var(--karbon-border-input,rgba(255,255,255,0.12))'};box-shadow:none;`
      case 'ghost':
        return `background:transparent;border:none;box-shadow:none;`
      case 'elegant':
        return `background:${isActive ? `color-mix(in srgb,${accentColor} 12%,transparent)` : 'transparent'};border:1.5px solid ${isActive ? accentColor : 'var(--karbon-border-input,rgba(255,255,255,0.12))'};box-shadow:${isActive ? `0 0 8px color-mix(in srgb,${accentColor} 15%,transparent)` : 'none'};`
      default: return ''
    }
  }, [variant, isActive, accentColor])

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.cssText = boxCssText
    }
  }, [boxCssText])

  const iconColor = useMemo(() => {
    switch (variant) {
      case 'filled': return 'white'
      case 'outlined': return accentColor
      case 'ghost': return isActive ? accentColor : 'var(--karbon-text-4)'
      case 'elegant': return accentColor
      default: return 'white'
    }
  }, [variant, isActive, accentColor])

  const toggle = useCallback(() => {
    if (disabled) return
    onChange?.(!checked)
  }, [disabled, checked, onChange])

  const handleKeydown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      toggle()
    }
  }, [toggle])

  const IconComponent = iconComponents[icon]

  return (
    <>
      {/* Hidden real input for form submission */}
      <input type="hidden" name={name} value={checked ? 'on' : ''} />

      <div
        className={`inline-flex items-start ${s.gap} ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${classes?.root ?? ''} ${className}`}
        onClick={toggle}
        onKeyDown={handleKeydown}
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        {/* Custom checkbox box */}
        <div
          ref={boxRef}
          className={`shrink-0 ${s.box} ${shapeClass} flex items-center justify-center transition-all duration-150 mt-0.5`}
        >
          {indeterminate ? (
            <DashIcon size={s.icon} color={iconColor} />
          ) : checked ? (
            <IconComponent size={s.icon} color={iconColor} />
          ) : null}
        </div>

        {/* Label + description */}
        {(label || description) && (
          <div className="select-none min-w-0">
            {label && (
              <span className={`${s.text} font-medium text-[var(--karbon-text)] ${classes?.label ?? ''}`}>{label}</span>
            )}
            {description && (
              <p className={`${s.desc} text-[var(--karbon-text-3)] mt-0.5 leading-relaxed ${classes?.description ?? ''}`}>{description}</p>
            )}
          </div>
        )}
      </div>
    </>
  )
}
