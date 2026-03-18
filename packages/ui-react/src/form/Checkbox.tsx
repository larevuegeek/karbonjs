import { useRef, useEffect } from 'react'

export interface CheckboxProps {
  name: string
  checked?: boolean
  indeterminate?: boolean
  label?: string
  description?: string
  disabled?: boolean
  className?: string
  onChange?: (checked: boolean) => void
}

export function Checkbox({
  name,
  checked = false,
  indeterminate = false,
  label,
  description,
  disabled = false,
  className = '',
  onChange
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <label className={`inline-flex items-start gap-3 ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <input
        ref={inputRef}
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--karbon-border-input,rgba(255,255,255,0.10))] bg-[var(--karbon-bg-input,rgba(255,255,255,0.06))] text-[var(--karbon-primary)] focus:ring-2 focus:ring-[var(--karbon-primary)]/20 focus:ring-offset-0 transition-colors cursor-pointer disabled:cursor-not-allowed"
      />
      {(label || description) && (
        <div className="select-none">
          {label && <span className="text-sm font-medium text-[var(--karbon-text,#1a1635)]">{label}</span>}
          {description && <p className="text-xs text-[var(--karbon-text-3,#8e8aae)] mt-0.5">{description}</p>}
        </div>
      )}
    </label>
  )
}
