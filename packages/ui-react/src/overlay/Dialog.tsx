import { useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { DialogVariant, OverlayBackdrop } from '@karbonjs/ui-core'

export interface DialogProps {
  open: boolean
  title: string
  description?: string
  variant?: DialogVariant
  backdrop?: OverlayBackdrop
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
  className?: string
  icon?: ReactNode
  onConfirm: () => void
  onCancel: () => void
}

const variantIcon: Record<string, string> = {
  info: 'bg-blue-500/10 text-blue-500',
  warning: 'bg-amber-500/10 text-amber-500',
  danger: 'bg-red-500/10 text-red-500',
  success: 'bg-emerald-500/10 text-emerald-500'
}

const confirmClasses: Record<string, string> = {
  info: 'bg-[var(--karbon-primary)] hover:bg-[var(--karbon-primary-hover)]',
  warning: 'bg-amber-500 hover:bg-amber-600',
  danger: 'bg-red-500 hover:bg-red-600',
  success: 'bg-emerald-500 hover:bg-emerald-600'
}

function DefaultIcon({ variant }: { variant: DialogVariant }) {
  switch (variant) {
    case 'danger':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    case 'warning':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
    case 'success':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
    default:
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  }
}

export function Dialog({
  open,
  title,
  description,
  variant = 'info',
  backdrop = 'none',
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  loading = false,
  className = '',
  icon,
  onConfirm,
  onCancel
}: DialogProps) {
  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onCancel()
  }, [onCancel])

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKeydown)
      return () => window.removeEventListener('keydown', handleKeydown)
    }
  }, [open, handleKeydown])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {backdrop !== 'none' && (
        <div
          className={`fixed inset-0 ${backdrop === 'blur' ? 'bg-black/30 backdrop-blur-sm' : backdrop === 'dark' ? 'bg-black/50' : 'bg-transparent'}`}
          onClick={onCancel}
        />
      )}
      <div
        className={`relative z-10 w-full max-w-md rounded-xl shadow-xl bg-[var(--karbon-bg-card,#fff)] p-6 ${className}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="karbon-dialog-title"
        aria-describedby={description ? 'karbon-dialog-desc' : undefined}
      >
        <div className="flex flex-col items-center text-center">
          <div className={`w-12 h-12 rounded-full ${variantIcon[variant]} flex items-center justify-center mb-4`}>
            {icon ?? <DefaultIcon variant={variant} />}
          </div>

          <h3 id="karbon-dialog-title" className="text-lg font-semibold text-[var(--karbon-text,#1a1635)]">
            {title}
          </h3>

          {description && (
            <p id="karbon-dialog-desc" className="mt-2 text-sm text-[var(--karbon-text-3,#8e8aae)]">
              {description}
            </p>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border border-[var(--karbon-border,rgba(0,0,0,0.07))] text-[var(--karbon-text-2,#5a567e)] hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors ${confirmClasses[variant]} disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer inline-flex items-center justify-center gap-2`}
          >
            {loading && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            )}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
