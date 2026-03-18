import type { ReactNode } from 'react'
import type { TabItem } from '@karbonjs/ui-core'

export interface TabsProps {
  tabs: TabItem[]
  active?: string
  className?: string
  onChange?: (id: string) => void
  renderPanel?: (tab: TabItem) => ReactNode
}

export function Tabs({ tabs, active = tabs[0]?.id ?? '', className = '', onChange, renderPanel }: TabsProps) {
  return (
    <div className={className}>
      <div className="flex border-b border-[var(--karbon-border,rgba(0,0,0,0.07))]" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => { if (!tab.disabled) onChange?.(tab.id) }}
            disabled={tab.disabled}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${active === tab.id ? 'text-[var(--karbon-primary)]' : 'text-[var(--karbon-text-3,#8e8aae)] hover:text-[var(--karbon-text,#1a1635)]'}`}
          >
            {tab.label}
            {active === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--karbon-primary)]" />}
          </button>
        ))}
      </div>

      {renderPanel && tabs.map((tab) =>
        active === tab.id ? (
          <div key={tab.id} className="pt-4" role="tabpanel">
            {renderPanel(tab)}
          </div>
        ) : null
      )}
    </div>
  )
}
