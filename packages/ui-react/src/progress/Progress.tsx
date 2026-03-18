import type { ProgressVariant, ProgressSize } from '@karbonjs/ui-core'

export interface ProgressProps {
  value: number
  max?: number
  variant?: ProgressVariant
  size?: ProgressSize
  showLabel?: boolean
  className?: string
}

const variantClasses: Record<string, string> = {
  primary: 'bg-[var(--karbon-primary)]',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500'
}

const sizeClasses: Record<string, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
}

export function Progress({ value, max = 100, variant = 'primary', size = 'md', showLabel = false, className = '' }: ProgressProps) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-[var(--karbon-text-2,#5a567e)]">{Math.round(percent)}%</span>
        </div>
      )}
      <div className={`w-full rounded-full bg-[var(--karbon-border,rgba(0,0,0,0.07))] overflow-hidden ${sizeClasses[size]}`} role="progressbar" aria-valuenow={value} aria-valuemax={max}>
        <div className={`h-full rounded-full transition-all duration-300 ease-out ${variantClasses[variant]}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
