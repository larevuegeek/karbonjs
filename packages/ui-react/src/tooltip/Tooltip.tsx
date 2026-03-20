import { useState, useRef, useCallback } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface TooltipProps {
  text?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  color?: ButtonColor
  variant?: 'dark' | 'light' | 'colored'
  size?: 'sm' | 'md' | 'lg'
  delay?: number
  arrow?: boolean
  maxWidth?: string
  nowrap?: boolean
  content?: ReactNode
  className?: string
  classes?: { root?: string; content?: string }
  children: ReactNode
}

const sizeMap = {
  sm: { px: '6px 10px', text: '11px', arrow: 4 },
  md: { px: '8px 12px', text: '12px', arrow: 5 },
  lg: { px: '10px 14px', text: '13px', arrow: 6 },
}

const posStyle: Record<string, CSSProperties> = {
  top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8 },
  bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 8 },
  left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 8 },
  right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 },
}

const arrowPosStyle: Record<string, CSSProperties> = {
  top: { top: '100%', left: '50%', transform: 'translateX(-50%)' },
  bottom: { bottom: '100%', left: '50%', transform: 'translateX(-50%) rotate(180deg)' },
  left: { left: '100%', top: '50%', transform: 'translateY(-50%) rotate(-90deg)' },
  right: { right: '100%', top: '50%', transform: 'translateY(-50%) rotate(90deg)' },
}

// Inject animation once
const STYLE_ID = 'karbon-tooltip-styles'
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    @keyframes karbon-tooltip-in {
      from { opacity: 0; transform: translateX(-50%) translateY(4px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
  `
  document.head.appendChild(style)
}

export function Tooltip({
  text = '',
  position = 'top',
  color,
  variant = 'dark',
  size = 'md',
  delay = 200,
  arrow: showArrow = true,
  maxWidth = '250px',
  nowrap = false,
  content: richContent,
  className = '',
  classes = {},
  children
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const s = sizeMap[size]
  const accent = color ? `var(--karbon-${color}-500)` : ''

  const bgColor = (() => {
    switch (variant) {
      case 'dark': return 'rgba(15,10,30,0.95)'
      case 'light': return 'rgba(255,255,255,0.97)'
      case 'colored': return accent || 'var(--karbon-primary)'
      default: return 'rgba(15,10,30,0.95)'
    }
  })()

  const textColor = (() => {
    switch (variant) {
      case 'dark': return 'rgba(255,255,255,0.92)'
      case 'light': return 'rgba(15,10,30,0.85)'
      case 'colored': return 'white'
      default: return 'rgba(255,255,255,0.92)'
    }
  })()

  const show = useCallback(() => {
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => setVisible(true), delay)
    } else {
      setVisible(true)
    }
  }, [delay])

  const hide = useCallback(() => {
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null }
    setVisible(false)
  }, [])

  const hasContent = !!text || !!richContent

  return (
    <div
      className={`relative inline-flex ${classes?.root ?? className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {visible && hasContent && (
        <div
          className={`absolute z-50 pointer-events-none ${classes?.content ?? ''}`}
          style={{ ...posStyle[position], animation: 'karbon-tooltip-in 0.15s ease' }}
          role="tooltip"
        >
          <div
            className={`relative rounded-lg font-medium ${nowrap ? 'whitespace-nowrap' : 'whitespace-normal'}`}
            style={{ padding: s.px, fontSize: s.text, background: bgColor, color: textColor, maxWidth, boxShadow: '0 4px 14px rgba(0,0,0,0.25)', backdropFilter: 'blur(8px)' }}
          >
            {richContent || text}

            {showArrow && (
              <div
                className="absolute"
                style={{
                  ...arrowPosStyle[position],
                  width: 0, height: 0,
                  borderLeft: `${s.arrow}px solid transparent`,
                  borderRight: `${s.arrow}px solid transparent`,
                  borderTop: `${s.arrow}px solid ${bgColor}`
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
