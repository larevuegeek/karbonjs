import type { RadioOption, RadioDirection } from '@karbonjs/ui-core'

export interface RadioProps {
  name: string
  options: RadioOption[]
  value?: string
  label?: string
  direction?: RadioDirection
  disabled?: boolean
  className?: string
  onChange?: (value: string) => void
}

export function Radio({
  name,
  options,
  value = '',
  label,
  direction = 'column',
  disabled = false,
  className = '',
  onChange
}: RadioProps) {
  return (
    <fieldset className={className} disabled={disabled}>
      {label && <legend className="text-sm font-medium text-[var(--karbon-text,#1a1635)] mb-2">{label}</legend>}

      <div className={direction === 'row' ? 'flex flex-wrap items-center gap-4' : 'flex flex-col gap-2.5'}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`inline-flex items-start gap-2.5 ${opt.disabled || disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              disabled={opt.disabled || disabled}
              onChange={() => onChange?.(opt.value)}
              className="mt-0.5 h-4 w-4 shrink-0 border-[var(--karbon-border-input,rgba(255,255,255,0.10))] bg-[var(--karbon-bg-input,rgba(255,255,255,0.06))] text-[var(--karbon-primary)] focus:ring-2 focus:ring-[var(--karbon-primary)]/20 focus:ring-offset-0 transition-colors cursor-pointer disabled:cursor-not-allowed"
            />
            <div className="select-none">
              <span className="text-sm font-medium text-[var(--karbon-text,#1a1635)]">{opt.label}</span>
              {opt.description && <p className="text-xs text-[var(--karbon-text-3,#8e8aae)] mt-0.5">{opt.description}</p>}
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
