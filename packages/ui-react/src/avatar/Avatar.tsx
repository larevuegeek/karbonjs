import { useState, useMemo } from 'react'
import type { CSSProperties } from 'react'
import type { AvatarSize } from '@karbonjs/ui-core'

export interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  color?: string
  classes?: { root?: string }
  className?: string
}

const sizeClasses: Record<string, string> = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl'
}

export function Avatar({ src, alt = '', name = '', size = 'md', color, classes = {}, className = '' }: AvatarProps) {
  const [errored, setErrored] = useState(false)
  const initials = (name || alt || 'A').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const showImage = src && !errored

  const colorStyle = useMemo((): CSSProperties | undefined => {
    if (!color) return undefined
    return {
      background: `color-mix(in srgb,var(--karbon-${color}-500) 15%,transparent)`,
      color: `var(--karbon-${color}-400)`
    }
  }, [color])

  const defaultBgClass = color ? '' : 'bg-[var(--karbon-bg-2,#e8e6f0)] text-[var(--karbon-text-2,#5a567e)]'

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden font-semibold ${defaultBgClass} ${sizeClasses[size]} ${classes?.root ?? className}`}
      style={colorStyle}
    >
      {showImage ? (
        <img src={src} alt={alt || name} onError={() => setErrored(true)} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}
