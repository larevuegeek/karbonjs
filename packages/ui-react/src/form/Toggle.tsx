import type { ToggleSize } from '@karbonjs/ui-core'

export interface ToggleProps {
  name: string
  checked?: boolean
  label?: string
  size?: ToggleSize
  disabled?: boolean
  className?: string
  onChange?: (checked: boolean) => void
}

const sizes = {
  sm: { track: 'w-8 h-[18px]', dot: 'h-3.5 w-3.5', translate: 'translate-x-3.5' },
  md: { track: 'w-10 h-[22px]', dot: 'h-4.5 w-4.5', translate: 'translate-x-4.5' }
} as const

export function Toggle({
  name,
  checked = false,
  label,
  size = 'md',
  disabled = false,
  className = '',
  onChange
}: ToggleProps) {
  const s = sizes[size]

  return (
    <label className={`inline-flex items-center gap-2.5 ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only"
      />
      <div
        role="switch"
        aria-checked={checked}
        className={`relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200 ${s.track} ${checked ? 'bg-[var(--karbon-primary)]' : 'bg-[var(--karbon-border,rgba(0,0,0,0.07))]'}`}
      >
        <span className={`inline-block rounded-full bg-white shadow-sm transition-transform duration-200 ${s.dot} ${checked ? s.translate : 'translate-x-0.5'}`} />
      </div>
      {label && <span className="text-sm font-medium text-[var(--karbon-text,#1a1635)] select-none">{label}</span>}
    </label>
  )
}
