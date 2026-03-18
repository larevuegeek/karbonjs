import type { FormVariant, SelectOption } from '@karbonjs/ui-core'

export interface SelectProps {
  name: string
  options: SelectOption[]
  value?: string
  placeholder?: string
  label?: string
  error?: string
  required?: boolean
  disabled?: boolean
  variant?: FormVariant
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onValueChange?: (value: string) => void
}

const themes = {
  dark: {
    label: 'text-[11px] font-medium text-gray-500 uppercase tracking-wider',
    select: 'border-white/8 bg-white/3 text-white focus:border-[var(--karbon-primary)]/50 focus:bg-white/5 focus:ring-[3px] focus:ring-[var(--karbon-primary)]/8',
    error: 'text-red-400'
  },
  light: {
    label: 'text-sm font-medium text-gray-700',
    select: 'border-gray-300 bg-white text-gray-900 focus:border-[var(--karbon-primary)] focus:ring-2 focus:ring-[var(--karbon-primary)]/20',
    error: 'text-[var(--karbon-danger)]'
  }
} as const

export function Select({
  name,
  options,
  value = '',
  placeholder,
  label,
  error,
  required = false,
  disabled = false,
  variant = 'dark',
  className = '',
  onChange,
  onValueChange
}: SelectProps) {
  const theme = themes[variant]

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange?.(e)
    onValueChange?.(e.target.value)
  }

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className={`${theme.label} block mb-1.5`}>{label}</label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        className={`w-full rounded-lg border px-3 py-2.5 md:py-3 text-[13px] md:text-sm focus:outline-none transition-all appearance-none bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%239ca3af%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] ${theme.select} ${error ? 'border-red-500/50' : ''}`}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
        ))}
      </select>

      {error && <p className={`text-xs ${theme.error}`}>{error}</p>}
    </div>
  )
}
