import type { BreadcrumbItem } from '@karbonjs/ui-core'

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: string
  className?: string
}

export function Breadcrumb({ items, separator = '/', className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1.5 text-sm">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-[var(--karbon-text-4,#b5b2cc)] select-none" aria-hidden="true">{separator}</span>}
            {item.href && i < items.length - 1 ? (
              <a href={item.href} className="text-[var(--karbon-text-3,#8e8aae)] hover:text-[var(--karbon-text,#1a1635)] transition-colors">
                {item.label}
              </a>
            ) : (
              <span className="text-[var(--karbon-text,#1a1635)] font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
