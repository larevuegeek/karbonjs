export interface KbdProps {
  keys: string[]
  className?: string
}

export function Kbd({ keys, className = '' }: KbdProps) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {keys.map((key, i) => (
        <span key={i} className="contents">
          {i > 0 && <span className="text-[var(--karbon-text-4,#b5b2cc)] text-xs">+</span>}
          <kbd className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-md border border-[var(--karbon-border,rgba(0,0,0,0.07))] bg-[var(--karbon-bg-2,#e8e6f0)] text-[var(--karbon-text-2,#5a567e)] text-[11px] font-mono font-medium shadow-sm">
            {key}
          </kbd>
        </span>
      ))}
    </span>
  )
}
