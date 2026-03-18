import type { DividerDirection } from '@karbonjs/ui-core'

export interface DividerProps {
  direction?: DividerDirection
  label?: string
  className?: string
}

export function Divider({ direction = 'horizontal', label, className = '' }: DividerProps) {
  if (direction === 'vertical') {
    return <div className={`inline-block w-px self-stretch bg-[var(--karbon-border,rgba(0,0,0,0.07))] ${className}`} />
  }

  if (label) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="flex-1 h-px bg-[var(--karbon-border,rgba(0,0,0,0.07))]" />
        <span className="text-xs text-[var(--karbon-text-4,#b5b2cc)] font-medium shrink-0">{label}</span>
        <div className="flex-1 h-px bg-[var(--karbon-border,rgba(0,0,0,0.07))]" />
      </div>
    )
  }

  return <div className={`w-full h-px bg-[var(--karbon-border,rgba(0,0,0,0.07))] ${className}`} />
}
