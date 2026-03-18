import { useState } from 'react'
import type { ReactNode, InputHTMLAttributes } from 'react'
import type { FormVariant } from '@karbonjs/ui-core'

export interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  name: string
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
  value?: string
  label?: string
  error?: string
  clearable?: boolean
  icon?: ReactNode
  variant?: FormVariant
  inputClassName?: string
  labelClassName?: string
  wrapperClassName?: string
  onValueChange?: (value: string) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const themes = {
  dark: {
    label: 'text-[11px] font-medium text-gray-500 uppercase tracking-wider',
    input: 'border-white/8 bg-white/3 text-white placeholder-gray-700 focus:border-[var(--karbon-primary)]/50 focus:bg-white/5 focus:ring-[3px] focus:ring-[var(--karbon-primary)]/8',
    action: 'text-gray-600 hover:text-gray-400',
    error: 'text-red-400'
  },
  light: {
    label: 'text-sm font-medium text-gray-700',
    input: 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-[var(--karbon-primary)] focus:ring-2 focus:ring-[var(--karbon-primary)]/20',
    action: 'text-gray-400 hover:text-gray-600',
    error: 'text-[var(--karbon-danger)]'
  }
} as const

export function FormInput({
  name,
  type = 'text',
  value = '',
  placeholder = '',
  label = '',
  error = '',
  required = false,
  disabled = false,
  readOnly = false,
  autoComplete = '',
  clearable = false,
  icon,
  variant = 'dark',
  className = '',
  inputClassName = '',
  labelClassName = '',
  wrapperClassName = '',
  onValueChange,
  onChange,
  ...rest
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const hasRightAction = isPassword || (clearable && value)
  const hasIcon = !!icon
  const theme = themes[variant]

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e)
    onValueChange?.(e.target.value)
  }

  function handleClear() {
    onValueChange?.('')
  }

  return (
    <div className={wrapperClassName || 'space-y-1.5'}>
      {label && (
        <label htmlFor={name} className={`${theme.label} block mb-1.5 ${labelClassName}`}>
          {label}
        </label>
      )}

      <div className={`relative ${className}`}>
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors text-gray-500">
            {icon}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          onChange={handleChange}
          className={`w-full rounded-lg border ${hasIcon ? 'pl-9' : 'pl-3'} ${hasRightAction ? 'pr-10' : 'pr-3'} py-2.5 md:py-3 text-[13px] md:text-sm focus:outline-none transition-all ${theme.input} ${error ? 'border-red-500/50' : ''} ${inputClassName}`}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme.action} transition-colors cursor-pointer z-10`}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        )}

        {!isPassword && clearable && value && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme.action} transition-colors cursor-pointer z-10`}
            tabIndex={-1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        )}
      </div>

      {error && <p className={`text-xs ${theme.error}`}>{error}</p>}
    </div>
  )
}
