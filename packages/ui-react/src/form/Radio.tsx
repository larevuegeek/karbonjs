import { useMemo, useCallback, useRef, useEffect } from 'react'
import type { RadioOption, RadioDirection, ButtonColor, RadioClasses } from '@karbonjs/ui-core'

export interface RadioProps {
  name: string
  options: RadioOption[]
  value?: string
  label?: string
  direction?: RadioDirection
  disabled?: boolean
  color?: ButtonColor
  size?: 'sm' | 'md' | 'lg'
  variant?: 'filled' | 'outlined' | 'ghost' | 'elegant'
  classes?: RadioClasses
  className?: string
  onChange?: (value: string) => void
}

const sizeMap = {
  sm: { box: 16, dot: 8, text: 'text-xs', desc: 'text-[11px]', gap: 'gap-2' },
  md: { box: 20, dot: 11, text: 'text-sm', desc: 'text-xs', gap: 'gap-2.5' },
  lg: { box: 24, dot: 13, text: 'text-base', desc: 'text-sm', gap: 'gap-3' },
}

/** Internal component for a single radio circle that manages its own style via ref */
function RadioCircle({
  selected,
  variant,
  accentColor,
  boxSize,
  dotSize,
  dotColor,
  ghostDot,
}: {
  selected: boolean
  variant: 'filled' | 'outlined' | 'ghost' | 'elegant'
  accentColor: string
  boxSize: number
  dotSize: number
  dotColor: string
  ghostDot: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  const cssText = useMemo(() => {
    const base = `width:${boxSize}px;height:${boxSize}px;display:grid;place-items:center;box-sizing:border-box;`
    switch (variant) {
      case 'filled':
        return base + `background:${selected ? accentColor : 'var(--karbon-bg-input,rgba(255,255,255,0.06))'};border:${selected ? 'none' : '1.5px solid var(--karbon-border-input,rgba(255,255,255,0.12))'};box-shadow:${selected ? `0 0 0 2px color-mix(in srgb,${accentColor} 20%,transparent)` : 'none'};`
      case 'outlined':
        return base + `background:transparent;border:2px solid ${selected ? accentColor : 'var(--karbon-border-input,rgba(255,255,255,0.12))'};`
      case 'ghost':
        return base + `background:transparent;border:none;`
      case 'elegant':
        return base + `background:${selected ? `color-mix(in srgb,${accentColor} 12%,transparent)` : 'transparent'};border:1.5px solid ${selected ? accentColor : 'var(--karbon-border-input,rgba(255,255,255,0.12))'};box-shadow:${selected ? `0 0 8px color-mix(in srgb,${accentColor} 15%,transparent)` : 'none'};`
      default: return base
    }
  }, [variant, selected, accentColor, boxSize])

  useEffect(() => {
    if (ref.current) ref.current.style.cssText = cssText
  }, [cssText])

  return (
    <div ref={ref} className="shrink-0 rounded-full transition-all duration-150">
      {selected ? (
        <div className="rounded-full" style={{ width: `${dotSize}px`, height: `${dotSize}px`, background: dotColor }} />
      ) : ghostDot ? (
        <div className="rounded-full" style={{ width: `${dotSize}px`, height: `${dotSize}px`, background: 'var(--karbon-border-input,rgba(255,255,255,0.12))' }} />
      ) : null}
    </div>
  )
}

export function Radio({
  name,
  options,
  value = '',
  label = '',
  direction = 'column',
  disabled = false,
  color,
  size = 'md',
  variant = 'filled',
  classes,
  className = '',
  onChange
}: RadioProps) {
  const accentColor = useMemo(() => color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)', [color])
  const s = sizeMap[size]

  const getDotColor = useCallback((selected: boolean): string => {
    switch (variant) {
      case 'filled': return 'white'
      case 'outlined': return accentColor
      case 'ghost': return selected ? accentColor : 'var(--karbon-text-4)'
      case 'elegant': return accentColor
      default: return 'white'
    }
  }, [variant, accentColor])

  const select = useCallback((val: string) => {
    if (disabled) return
    onChange?.(val)
  }, [disabled, onChange])

  return (
    <fieldset className={`${classes?.root ?? ''} ${className}`} disabled={disabled}>
      {label && (
        <legend className={`${s.text} font-medium text-[var(--karbon-text)] mb-2 ${classes?.legend ?? ''}`}>{label}</legend>
      )}

      <div className={direction === 'row' ? 'flex flex-wrap items-center gap-4' : 'flex flex-col gap-2.5'}>
        {options.map(opt => {
          const selected = value === opt.value
          const isDisabled = opt.disabled || disabled

          return (
            <div
              key={opt.value}
              className={`inline-flex items-center ${s.gap} ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => { if (!isDisabled) select(opt.value) }}
              onKeyDown={(e) => { if (!isDisabled && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); select(opt.value) } }}
              role="radio"
              aria-checked={selected}
              aria-disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
            >
              <RadioCircle
                selected={selected}
                variant={variant}
                accentColor={accentColor}
                boxSize={s.box}
                dotSize={s.dot}
                dotColor={getDotColor(selected)}
                ghostDot={variant === 'ghost'}
              />

              {/* Label + description */}
              <div className="select-none min-w-0">
                <span className={`${s.text} font-medium text-[var(--karbon-text)] ${classes?.label ?? ''}`}>{opt.label}</span>
                {opt.description && (
                  <p className={`${s.desc} text-[var(--karbon-text-3)] mt-0.5 leading-relaxed ${classes?.description ?? ''}`}>{opt.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}
