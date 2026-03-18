import { useState } from 'react'
import type { ReactNode } from 'react'
import type { AccordionItem } from '@karbonjs/ui-core'

export interface AccordionProps {
  items: AccordionItem[]
  multiple?: boolean
  className?: string
  renderContent?: (item: AccordionItem, index: number) => ReactNode
}

export function Accordion({ items, multiple = false, className = '', renderContent }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) }
      else { if (!multiple) next.clear(); next.add(id) }
      return next
    })
  }

  return (
    <div className={`rounded-xl border border-[var(--karbon-border,rgba(0,0,0,0.07))] overflow-hidden divide-y divide-[var(--karbon-border,rgba(0,0,0,0.07))] ${className}`}>
      {items.map((item, index) => (
        <div key={item.id}>
          <button
            type="button"
            onClick={() => { if (!item.disabled) toggle(item.id) }}
            disabled={item.disabled}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-left transition-colors text-[var(--karbon-text,#1a1635)] hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>{item.title}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 text-[var(--karbon-text-4,#b5b2cc)] transition-transform duration-200 ${openIds.has(item.id) ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
          </button>
          {openIds.has(item.id) && (
            <div className="px-4 pb-3 text-sm text-[var(--karbon-text-2,#5a567e)]">
              {renderContent ? renderContent(item, index) : item.content && <p>{item.content}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
