import type { SkeletonVariant } from '@karbonjs/ui-core'

export interface SkeletonProps {
  variant?: SkeletonVariant
  width?: string
  height?: string
  lines?: number
  classes?: { root?: string }
  className?: string
}

const baseClass = 'animate-pulse bg-[var(--karbon-border,rgba(0,0,0,0.07))]'

const variantDefaults: Record<string, { h: string; rounded: string }> = {
  text: { h: '0.875rem', rounded: 'rounded' },
  circle: { h: '3rem', rounded: 'rounded-full' },
  rect: { h: '8rem', rounded: 'rounded-lg' }
}

export function Skeleton({ variant = 'text', width = '100%', height, lines = 1, classes = {}, className = '' }: SkeletonProps) {
  const v = variantDefaults[variant]

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${classes?.root ?? className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className={`${baseClass} ${v.rounded}`} style={{ width: i === lines - 1 ? '66%' : width, height: height ?? v.h }} />
        ))}
      </div>
    )
  }

  if (variant === 'circle') {
    return <div className={`${baseClass} ${v.rounded} aspect-square ${classes?.root ?? className}`} style={{ width: width === '100%' ? height ?? v.h : width, height: height ?? v.h }} />
  }

  return <div className={`${baseClass} ${v.rounded} ${classes?.root ?? className}`} style={{ width, height: height ?? v.h }} />
}
