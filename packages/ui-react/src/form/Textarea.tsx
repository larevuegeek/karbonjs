import type { FormVariant } from '@karbonjs/ui-core'

export interface TextareaProps {
  name: string
  value?: string
  placeholder?: string
  label?: string
  error?: string
  rows?: number
  maxLength?: number
  showCount?: boolean
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  variant?: FormVariant
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onValueChange?: (value: string) => void
}

const themes = {
  dark: {
    label: 'text-[11px] font-medium text-gray-500 uppercase tracking-wider',
    input: 'border-white/8 bg-white/3 text-white placeholder-gray-700 focus:border-[var(--karbon-primary)]/50 focus:bg-white/5 focus:ring-[3px] focus:ring-[var(--karbon-primary)]/8',
    error: 'text-red-400',
    count: 'text-gray-600'
  },
  light: {
    label: 'text-sm font-medium text-gray-700',
    input: 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-[var(--karbon-primary)] focus:ring-2 focus:ring-[var(--karbon-primary)]/20',
    error: 'text-[var(--karbon-danger)]',
    count: 'text-gray-400'
  }
} as const

export function Textarea({
  name,
  value = '',
  placeholder = '',
  label,
  error,
  rows = 4,
  maxLength,
  showCount = false,
  required = false,
  disabled = false,
  readOnly = false,
  variant = 'dark',
  className = '',
  onChange,
  onValueChange
}: TextareaProps) {
  const theme = themes[variant]

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange?.(e)
    onValueChange?.(e.target.value)
  }

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label htmlFor={name} className={`${theme.label} block mb-1.5`}>{label}</label>}

      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        className={`w-full rounded-lg border px-3 py-2.5 text-[13px] md:text-sm focus:outline-none transition-all resize-y ${theme.input} ${error ? 'border-red-500/50' : ''}`}
      />

      <div className="flex items-center justify-between">
        {error ? <p className={`text-xs ${theme.error}`}>{error}</p> : <span />}
        {showCount && maxLength && (
          <span className={`text-xs ${theme.count}`}>{value.length}/{maxLength}</span>
        )}
      </div>
    </div>
  )
}
