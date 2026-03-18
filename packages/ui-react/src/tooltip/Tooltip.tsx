import { useState } from 'react'
import type { ReactNode } from 'react'
import type { TooltipPosition } from '@karbonjs/ui-core'

export interface TooltipProps {
  text: string
  position?: TooltipPosition
  className?: string
  children: ReactNode
}

const posClasses: Record<string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2'
}

export function Tooltip({ text, position = 'top', className = '', children }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-50 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none bg-[var(--karbon-text,#1a1635)] text-white shadow-lg ${posClasses[position]}`}
          role="tooltip"
        >
          {text}
        </div>
      )}
    </div>
  )
}
