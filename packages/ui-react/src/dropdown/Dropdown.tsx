import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import type { DropdownEntry, DropdownAlign } from '@karbonjs/ui-core'

export interface DropdownProps {
  items: DropdownEntry[]
  align?: DropdownAlign
  className?: string
  trigger: ReactNode
  onSelect?: (value: string) => void
}

export function Dropdown({ items, align = 'left', className = '', trigger, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [])

  function handleSelect(item: DropdownEntry) {
    if ('divider' in item) return
    if (item.disabled) return
    onSelect?.(item.value ?? item.label)
    setOpen(false)
  }

  return (
    <div className={`relative inline-block ${className}`} ref={ref}>
      <div onClick={() => setOpen(!open)} className="cursor-pointer">{trigger}</div>

      {open && (
        <div className={`absolute z-50 mt-1 min-w-[12rem] rounded-xl border border-[var(--karbon-border,rgba(0,0,0,0.07))] bg-[var(--karbon-bg-card,#fff)] shadow-xl py-1 ${align === 'right' ? 'right-0' : 'left-0'}`}>
          {items.map((item, i) =>
            'divider' in item ? (
              <div key={i} className="my-1 border-t border-[var(--karbon-border,rgba(0,0,0,0.07))]" />
            ) : (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(item)}
                disabled={item.disabled}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${item.danger ? 'text-red-400 hover:bg-red-500/8' : 'text-[var(--karbon-text,#1a1635)] hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))]'} disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer`}
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}
