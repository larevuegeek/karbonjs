import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface ToastProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  variant?: 'default' | 'filled' | 'bordered'
  color?: ButtonColor
  title?: string
  message?: string
  duration?: number
  dismissible?: boolean
  showProgress?: boolean
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'
  icon?: ReactNode | false
  action?: ReactNode
  className?: string
  classes?: { root?: string; icon?: string; close?: string; progress?: string }
  onclose?: () => void
  children?: ReactNode
}

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  success: { bg: 'var(--karbon-emerald-500)', text: 'var(--karbon-emerald-400)', border: 'var(--karbon-emerald-500)' },
  error:   { bg: 'var(--karbon-red-500)', text: 'var(--karbon-red-400)', border: 'var(--karbon-red-500)' },
  warning: { bg: 'var(--karbon-amber-500)', text: 'var(--karbon-amber-400)', border: 'var(--karbon-amber-500)' },
  info:    { bg: 'var(--karbon-blue-500)', text: 'var(--karbon-blue-400)', border: 'var(--karbon-blue-500)' },
}

const typeIcons: Record<string, ReactNode> = {
  success: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></>,
  error: <><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></>,
  warning: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></>,
  info: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></>,
}

const posStyles: Record<string, React.CSSProperties> = {
  'top-right': { top: '1rem', right: '1rem' },
  'top-left': { top: '1rem', left: '1rem' },
  'top-center': { top: '1rem', left: '50%', transform: 'translateX(-50%)' },
  'bottom-right': { bottom: '1rem', right: '1rem' },
  'bottom-left': { bottom: '1rem', left: '1rem' },
  'bottom-center': { bottom: '1rem', left: '50%', transform: 'translateX(-50%)' },
}

export function Toast({
  type = 'info',
  variant = 'default',
  color,
  title = '',
  message = '',
  duration = 5000,
  dismissible = true,
  showProgress = true,
  position = 'top-right',
  icon,
  action,
  className = '',
  classes = {},
  onclose,
  children,
}: ToastProps) {
  const [visible, setVisible] = useState(false)
  const [alive, setAlive] = useState(true)
  const [progress, setProgress] = useState(100)
  const pausedRef = useRef(false)

  const tc = useMemo(() => {
    if (color) return { bg: `var(--karbon-${color}-500)`, text: `var(--karbon-${color}-400)`, border: `var(--karbon-${color}-500)` }
    return typeColors[type]
  }, [color, type])

  const isTop = position.startsWith('top')
  const slideFrom = isTop ? '-20px' : '20px'

  const toastStyle = useMemo((): React.CSSProperties => {
    switch (variant) {
      case 'filled':
        return { background: tc.bg, color: 'white', border: 'none' }
      case 'bordered':
        return { background: 'var(--karbon-bg-card)', color: 'var(--karbon-text)', borderLeft: `3px solid ${tc.border}`, borderTop: '1px solid var(--karbon-border)', borderRight: '1px solid var(--karbon-border)', borderBottom: '1px solid var(--karbon-border)' }
      default:
        return { background: 'var(--karbon-bg-card)', color: 'var(--karbon-text)', border: '1px solid var(--karbon-border)' }
    }
  }, [variant, tc])

  const iconColor = variant === 'filled' ? 'white' : tc.text

  const dismiss = useCallback(() => {
    setVisible(false)
    setTimeout(() => {
      setAlive(false)
      onclose?.()
    }, 200)
  }, [onclose])

  // Animation + countdown
  useEffect(() => {
    if (!alive) return
    requestAnimationFrame(() => setVisible(true))

    if (duration > 0) {
      const interval = 30
      const step = (100 / duration) * interval
      const timer = setInterval(() => {
        if (!pausedRef.current) {
          setProgress(prev => {
            const next = prev - step
            if (next <= 0) {
              clearInterval(timer)
              // Use setTimeout to avoid setState during render
              setTimeout(() => dismiss(), 0)
              return 0
            }
            return next
          })
        }
      }, interval)
      return () => clearInterval(timer)
    }
  }, [alive, duration, dismiss])

  if (!alive) return null

  return (
    <div
      className="fixed z-[60] w-full max-w-sm pointer-events-auto"
      style={posStyles[position]}
      role="alert"
      aria-live="assertive"
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      <div
        className={`rounded-xl shadow-xl overflow-hidden ${classes?.root ?? className}`}
        style={{
          ...toastStyle,
          opacity: visible ? 1 : 0,
          transform: `translateY(${visible ? '0' : slideFrom})`,
          transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1),opacity 0.2s ease',
        }}
      >
        <div className="flex items-start gap-3 px-4 py-3">
          {/* Icon */}
          {icon !== false && (
            <div className={`shrink-0 mt-0.5 ${classes?.icon ?? ''}`}>
              {icon || (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {typeIcons[type] || typeIcons.info}
                </svg>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <p className={`text-sm font-semibold ${message || children ? 'mb-0.5' : ''}`} style={{ color: 'white' }}>{title}</p>
            )}
            {children ? (
              <div className="text-[13px]" style={{ color: 'rgba(255,255,255,0.75)' }}>{children}</div>
            ) : message ? (
              <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.75)' }}>{message}</p>
            ) : null}
            {action && <div className="mt-2">{action}</div>}
          </div>

          {/* Close */}
          {dismissible && (
            <button
              onClick={dismiss}
              aria-label="Fermer"
              className={`shrink-0 rounded-md p-0.5 transition-opacity opacity-50 hover:opacity-100 cursor-pointer ${classes?.close ?? ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          )}
        </div>

        {/* Progress bar */}
        {showProgress && duration > 0 && (
          <div className={`h-[2px] w-full ${classes?.progress ?? ''}`} style={{ background: `color-mix(in srgb,${tc.bg} 15%,transparent)` }}>
            <div
              className="h-full"
              style={{ width: `${progress}%`, background: variant === 'filled' ? 'rgba(255,255,255,0.4)' : tc.bg, transition: 'none' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
