import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { FormVariant, FormInputVariant, ButtonColor, FormInputClasses } from '@karbonjs/ui-core'

export interface InputProps {
  name: string
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
  value?: string
  placeholder?: string
  label?: string
  error?: string
  errorIcon?: boolean
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  autoComplete?: string
  clearable?: boolean
  icon?: ReactNode
  variant?: FormVariant
  inputVariant?: FormInputVariant
  color?: ButtonColor
  classes?: FormInputClasses
  className?: string
  inputClassName?: string
  labelClassName?: string
  wrapperClassName?: string
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onValueChange?: (value: string) => void
}

const themes = {
  dark: {
    label: 'text-[11px] font-medium text-gray-500 uppercase tracking-wider',
    icon: 'text-gray-600',
    action: 'text-gray-600 hover:text-gray-400',
    error: 'text-red-400',
    glow: true,
    base: 'text-white placeholder-gray-700',
    variants: {
      outlined: 'border border-white/8 bg-white/3',
      filled: 'border-0 bg-white/8',
      underline: 'rounded-none bg-transparent'
    }
  },
  light: {
    label: 'text-sm font-medium text-gray-700',
    icon: 'text-gray-400',
    action: 'text-gray-400 hover:text-gray-600',
    error: 'text-[var(--karbon-danger)]',
    glow: false,
    base: 'text-gray-900 placeholder-gray-400',
    variants: {
      outlined: 'border border-gray-300 bg-white',
      filled: 'border-0 bg-gray-100',
      underline: 'rounded-none bg-transparent'
    }
  }
} as const

export function Input({
  name,
  type = 'text',
  value = '',
  placeholder = '',
  label = '',
  error = '',
  errorIcon = true,
  required = false,
  disabled = false,
  readOnly = false,
  autoComplete = '',
  clearable = false,
  icon,
  variant = 'dark',
  inputVariant = 'outlined',
  color,
  classes,
  className = '',
  inputClassName = '',
  labelClassName = '',
  wrapperClassName = '',
  onInput,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onValueChange
}: InputProps) {
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const hasRightAction = isPassword || (clearable && value)
  const hasIcon = !!icon

  const focusColor = useMemo(() => color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)', [color])
  const focusRingColor = useMemo(() => color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)', [color])

  const theme = themes[variant]
  const variantClass = theme.variants[inputVariant]

  // Apply complex inline styles via ref (cssText supports color-mix, etc.)
  const inputCssText = useMemo(() => {
    if (inputVariant === 'underline') {
      const bc = focused ? focusColor : error ? 'var(--karbon-danger)' : 'var(--karbon-border-input)'
      return `border:none;border-bottom:1px solid ${bc};border-radius:0;${focused ? 'box-shadow:none;' : ''}`
    } else if (focused) {
      return `border-color:${focusColor};box-shadow:0 0 0 3px color-mix(in srgb,${focusRingColor} 12%,transparent);`
    }
    return ''
  }, [inputVariant, focused, focusColor, focusRingColor, error])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.cssText = inputCssText
    }
  }, [inputCssText])

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true)
    onFocus?.(e)
  }, [onFocus])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false)
    onBlur?.(e)
  }, [onBlur])

  const handleClear = useCallback(() => {
    onValueChange?.('')
  }, [onValueChange])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onValueChange?.(e.target.value)
  }, [onChange, onValueChange])

  const iconInlineStyle = useMemo(() => {
    return focused ? { color: focusColor } : undefined
  }, [focused, focusColor])

  const glowStyle = useMemo(() => ({
    background: `linear-gradient(135deg, color-mix(in srgb, ${focusColor} 10%, transparent), transparent 50%)`
  }), [focusColor])

  return (
    <div className={`${classes?.root ?? ''} ${wrapperClassName || 'space-y-1.5'}`}>
      {label && (
        <label htmlFor={name} className={`${theme.label} block mb-1.5 ${classes?.label ?? ''} ${labelClassName}`}>
          {label}
        </label>
      )}

      <div className={`relative ${className}`}>
        {icon && (
          <div
            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${classes?.icon ?? ''} ${focused ? '' : theme.icon} ${variant === 'dark' ? 'z-10' : ''}`}
            style={iconInlineStyle}
          >
            {icon}
          </div>
        )}

        <input
          ref={inputRef}
          id={name}
          name={name}
          type={inputType}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          onInput={onInput}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full ${inputVariant !== 'underline' ? 'rounded-lg' : ''} ${hasIcon ? 'pl-9' : 'pl-3'} ${hasRightAction ? 'pr-10' : 'pr-3'} py-2.5 md:py-3 text-[13px] md:text-sm focus:outline-none transition-all ${theme.base} ${variantClass} ${error ? 'border-red-500/50' : ''} ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''} ${variant === 'dark' ? 'relative z-[1]' : ''} ${classes?.input ?? ''} ${inputClassName}`}
        />

        {variant === 'dark' && theme.glow && inputVariant === 'outlined' && (
          <div
            className={`absolute -inset-px rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none ${focused ? 'opacity-100' : ''}`}
            style={glowStyle}
          />
        )}

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme.action} transition-colors cursor-pointer z-10`}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        ) : clearable && value ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Effacer"
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme.action} transition-colors cursor-pointer z-10`}
            tabIndex={-1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        ) : null}
      </div>

      {error && (
        <p className={`flex items-center gap-1.5 text-xs ${theme.error} ${classes?.error ?? ''}`}>
          {errorIcon && (
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          )}
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
