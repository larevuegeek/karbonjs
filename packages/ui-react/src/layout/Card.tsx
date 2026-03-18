import type { ReactNode } from 'react'
import type { CardVariant, CardPadding } from '@karbonjs/ui-core'

export interface CardProps {
  variant?: CardVariant
  padding?: CardPadding
  hoverable?: boolean
  title?: string
  icon?: React.ComponentType<{ className?: string }>
  className?: string
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

const variantClasses: Record<string, string> = {
  default: 'bg-[var(--karbon-bg-card,#fff)] border border-[var(--karbon-border,rgba(0,0,0,0.07))]',
  elevated: 'bg-[var(--karbon-bg-card,#fff)] shadow-lg',
  outlined: 'border-2 border-[var(--karbon-border,rgba(0,0,0,0.07))]',
  ghost: 'bg-transparent'
}

const paddingClasses: Record<string, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8'
}

export function Card({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  title,
  icon: Icon,
  className = '',
  children,
  header,
  footer
}: CardProps) {
  return (
    <div className={`rounded-xl overflow-hidden ${variantClasses[variant]} ${hoverable ? 'transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5' : ''} ${className}`}>
      {header ? (
        <div className="px-5 py-3.5 border-b border-[var(--karbon-border,rgba(0,0,0,0.07))]">
          {header}
        </div>
      ) : title ? (
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--karbon-border,rgba(0,0,0,0.07))] text-[var(--karbon-text-2,#5a567e)] text-[0.825rem] font-semibold">
          {Icon && <Icon className="w-4 h-4" />}
          <span>{title}</span>
        </div>
      ) : null}

      <div className={paddingClasses[padding]}>
        {children}
      </div>

      {footer && (
        <div className="px-5 py-3.5 border-t border-[var(--karbon-border,rgba(0,0,0,0.07))]">
          {footer}
        </div>
      )}
    </div>
  )
}
