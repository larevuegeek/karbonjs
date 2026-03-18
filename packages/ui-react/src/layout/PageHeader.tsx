import type { ComponentType, SVGProps } from 'react'

export interface PageHeaderProps {
  title: string
  description?: string
  icon?: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>
  iconColor?: string
}

export function PageHeader({ title, description, icon: Icon, iconColor = 'var(--karbon-primary, #cc1a1a)' }: PageHeaderProps) {
  return (
    <div className="flex items-start gap-3 pb-4 border-b border-[var(--karbon-border,rgba(0,0,0,0.07))] mb-1">
      {Icon && <Icon width={20} height={20} className="shrink-0" style={{ color: iconColor }} />}
      <div>
        <h1 className="text-[var(--karbon-text,#1a1635)] text-[1.1rem] font-bold m-0">
          {title}
        </h1>
        {description && (
          <p className="text-[var(--karbon-text-3,#8e8aae)] text-[0.8rem] mt-0.5">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
