export interface SliderProps {
  name: string
  value?: number
  min?: number
  max?: number
  step?: number
  label?: string
  showValue?: boolean
  disabled?: boolean
  className?: string
  onChange?: (value: number) => void
}

export function Slider({
  name,
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  disabled = false,
  className = '',
  onChange
}: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100

  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <label htmlFor={name} className="text-sm font-medium text-[var(--karbon-text,#1a1635)]">{label}</label>}
          {showValue && <span className="text-sm font-semibold text-[var(--karbon-primary)] tabular-nums">{value}</span>}
        </div>
      )}

      <input
        id={name}
        name={name}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--karbon-primary)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--karbon-primary)] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
        style={{ background: `linear-gradient(to right, var(--karbon-primary) ${percent}%, var(--karbon-border, rgba(0,0,0,0.07)) ${percent}%)` }}
      />
    </div>
  )
}
