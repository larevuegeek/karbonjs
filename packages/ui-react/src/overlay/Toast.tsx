import { useEffect, useCallback } from 'react'
import type { ToastVariant, ToastPosition } from '@karbonjs/ui-core'

export interface ToastProps {
  message: string
  variant?: ToastVariant
  duration?: number
  dismissible?: boolean
  position?: ToastPosition
  visible: boolean
  className?: string
  onDismiss: () => void
}

const variantClasses: Record<string, string> = {
  success: 'border-emerald-500/20 text-emerald-400',
  error: 'border-red-500/20 text-red-400',
  warning: 'border-amber-500/20 text-amber-300',
  info: 'border-blue-500/20 text-blue-400'
}

const positionClasses: Record<string, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
}

function ToastIcon({ variant }: { variant: ToastVariant }) {
  switch (variant) {
    case 'success':
      return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
    case 'error':
      return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
    case 'warning':
      return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    default:
      return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  }
}

export function Toast({
  message,
  variant = 'info',
  duration = 4000,
  dismissible = true,
  position = 'top-right',
  visible,
  className = '',
  onDismiss
}: ToastProps) {
  const dismiss = useCallback(() => {
    onDismiss()
  }, [onDismiss])

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(dismiss, duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, dismiss])

  if (!visible) return null

  return (
    <div
      className={`fixed z-[60] ${positionClasses[position]} w-full max-w-sm`}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg bg-[var(--karbon-bg-card,#fff)] ${variantClasses[variant]} ${className}`}
      >
        <ToastIcon variant={variant} />

        <span className="flex-1 text-sm font-medium text-[var(--karbon-text,#1a1635)]">{message}</span>

        {dismissible && (
          <button
            onClick={dismiss}
            aria-label="Fermer"
            className="shrink-0 rounded-lg p-0.5 text-[var(--karbon-text-4,#b5b2cc)] transition-colors duration-150 hover:text-[var(--karbon-text-2,#5a567e)] cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        )}
      </div>
    </div>
  )
}
