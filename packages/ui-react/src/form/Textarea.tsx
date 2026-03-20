import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import type { FormVariant, FormInputVariant, ButtonColor, TextareaClasses } from '@karbonjs/ui-core'

export interface TextareaProps {
  name: string
  value?: string
  placeholder?: string
  label?: string
  error?: string
  errorIcon?: boolean
  rows?: number
  maxLength?: number
  showCount?: boolean
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  variant?: FormVariant
  inputVariant?: FormInputVariant
  color?: ButtonColor
  classes?: TextareaClasses
  className?: string
  onInput?: (e: React.FormEvent<HTMLTextAreaElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onValueChange?: (value: string) => void
}

const themes = {
  dark: {
    label: 'text-[11px] font-medium text-gray-500 uppercase tracking-wider',
    base: 'text-white placeholder-gray-700',
    error: 'text-red-400',
    count: 'text-gray-600',
    variants: {
      outlined: 'border border-white/8 bg-white/3',
      filled: 'border-0 bg-white/8',
      underline: 'rounded-none bg-transparent'
    }
  },
  light: {
    label: 'text-sm font-medium text-gray-700',
    base: 'text-gray-900 placeholder-gray-400',
    error: 'text-[var(--karbon-danger)]',
    count: 'text-gray-400',
    variants: {
      outlined: 'border border-gray-300 bg-white',
      filled: 'border-0 bg-gray-100',
      underline: 'rounded-none bg-transparent'
    }
  }
} as const

export function Textarea({
  name,
  value = '',
  placeholder = '',
  label = '',
  error = '',
  errorIcon = true,
  rows = 4,
  maxLength,
  showCount = false,
  required = false,
  disabled = false,
  readOnly = false,
  variant = 'dark',
  inputVariant = 'outlined',
  color,
  classes,
  className = '',
  onInput,
  onChange,
  onValueChange
}: TextareaProps) {
  const [focused, setFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const focusColor = useMemo(() => color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)', [color])

  const theme = themes[variant]
  const variantClass = theme.variants[inputVariant]
  const charCount = value.length

  const cssText = useMemo(() => {
    let s = ''
    if (inputVariant === 'underline') {
      const bc = focused ? focusColor : error ? 'var(--karbon-danger)' : 'var(--karbon-border-input)'
      s += `border:none;border-bottom:1px solid ${bc};border-radius:0;`
      if (focused) s += 'box-shadow:none;'
    } else if (focused) {
      s += `border-color:${focusColor};box-shadow:0 0 0 3px color-mix(in srgb,${focusColor} 12%,transparent);`
    }
    return s
  }, [inputVariant, focused, focusColor, error])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.cssText = cssText
    }
  }, [cssText])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e)
    onValueChange?.(e.target.value)
  }, [onChange, onValueChange])

  return (
    <div className={`space-y-1.5 ${classes?.root ?? ''} ${className}`}>
      {label && (
        <label htmlFor={name} className={`${theme.label} block mb-1.5 ${classes?.label ?? ''}`}>{label}</label>
      )}

      <textarea
        ref={textareaRef}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onInput={onInput}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full ${inputVariant !== 'underline' ? 'rounded-lg' : ''} px-3 py-2.5 text-[13px] md:text-sm focus:outline-none transition-all resize-y ${theme.base} ${variantClass} ${error ? 'border-red-500/50' : ''} ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''} ${classes?.textarea ?? ''}`}
      />

      <div className="flex items-center justify-between">
        {error ? (
          <p className={`flex items-center gap-1.5 text-xs ${theme.error} ${classes?.error ?? ''}`}>
            {errorIcon && (
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            )}
            <span>{error}</span>
          </p>
        ) : (
          <span />
        )}
        {showCount && maxLength && (
          <span className={`text-xs ${theme.count} ${classes?.count ?? ''}`}>{charCount}/{maxLength}</span>
        )}
      </div>
    </div>
  )
}
