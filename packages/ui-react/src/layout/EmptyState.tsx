import type { ComponentType, SVGProps } from 'react'

export interface EmptyStateProps {
  title: string
  description?: string
  icon?: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>
}

export function EmptyState({ title, description, icon: Icon }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-6">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))] text-[var(--karbon-text-4,#b5b2cc)] flex items-center justify-center mx-auto mb-4">
          <Icon width={32} height={32} />
        </div>
      )}
      <p className="text-[var(--karbon-text-2,#5a567e)] font-semibold text-[0.95rem] m-0">
        {title}
      </p>
      {description && (
        <p className="text-[var(--karbon-text-3,#8e8aae)] text-[0.8rem] mt-1.5 mx-auto max-w-[22rem]">
          {description}
        </p>
      )}
    </div>
  )
}
