import { useState, useEffect, useRef } from 'react'

export interface ColorPickerProps {
  name: string
  value?: string
  label?: string
  presets?: string[]
  disabled?: boolean
  className?: string
  onChange?: (value: string) => void
}

const defaultPresets = [
  '#cc1a1a', '#ef4444', '#f59e0b', '#22c55e', '#10b981',
  '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899',
  '#f43f5e', '#14b8a6', '#000000', '#6b7280', '#ffffff'
]

export function ColorPicker({
  name,
  value = '#cc1a1a',
  label,
  presets = defaultPresets,
  disabled = false,
  className = '',
  onChange
}: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowPicker(false)
    }
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [])

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label htmlFor={name} className="text-sm font-medium text-[var(--karbon-text,#1a1635)] block mb-1.5">{label}</label>}

      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => { if (!disabled) setShowPicker(!showPicker) }}
          disabled={disabled}
          className="flex items-center gap-2.5 rounded-lg border border-[var(--karbon-border,rgba(0,0,0,0.07))] px-3 py-2 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))]"
        >
          <span
            className="w-6 h-6 rounded-md border border-[var(--karbon-border,rgba(0,0,0,0.07))] shrink-0"
            style={{ background: value }}
          />
          <span className="text-sm font-mono text-[var(--karbon-text-2,#5a567e)]">{value}</span>
        </button>

        <input type="hidden" name={name} value={value} />

        {showPicker && (
          <div className="absolute z-50 mt-1 w-64 rounded-xl border border-[var(--karbon-border,rgba(0,0,0,0.07))] shadow-xl p-4 bg-[var(--karbon-bg-card,#fff)]">
            <div className="mb-3">
              <input
                type="color"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer border-0 p-0"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={value}
                maxLength={7}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-full rounded-lg border border-[var(--karbon-border,rgba(0,0,0,0.07))] px-3 py-1.5 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-[var(--karbon-primary)]/20 bg-[var(--karbon-bg-input,rgba(255,255,255,0.06))] text-[var(--karbon-text,#1a1635)]"
              />
            </div>

            {presets.length > 0 && (
              <div className="grid grid-cols-5 gap-1.5">
                {presets.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => onChange?.(color)}
                    className={`w-full aspect-square rounded-lg border transition-transform cursor-pointer hover:scale-110 ${value === color ? 'border-[var(--karbon-primary)] ring-2 ring-[var(--karbon-primary)]/20 scale-110' : 'border-[var(--karbon-border,rgba(0,0,0,0.07))]'}`}
                    style={{ background: color }}
                    aria-label={color}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
