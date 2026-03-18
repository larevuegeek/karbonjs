import { useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { ModalSize, OverlayBackdrop } from '@karbonjs/ui-core'

export interface ModalProps {
  open: boolean
  title?: string
  size?: ModalSize
  backdrop?: OverlayBackdrop
  closable?: boolean
  closeOnOverlay?: boolean
  className?: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
}

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]'
}

export function Modal({
  open,
  title = '',
  size = 'md',
  backdrop = 'none',
  closable = true,
  closeOnOverlay = true,
  className = '',
  onClose,
  children,
  footer
}: ModalProps) {
  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && closable) onClose()
  }, [closable, onClose])

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
          onClick={closeOnOverlay ? onClose : undefined}
        />
      )}
      <div
        className={`relative z-10 w-full ${sizeClasses[size]} rounded-xl shadow-xl bg-[var(--karbon-bg-card,#fff)] flex flex-col ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title || undefined}
      >
        {(title || closable) && (
          <div className={`flex items-center justify-between px-6 pt-6 ${title ? 'mb-4' : ''}`}>
            {title && (
              <h3 className="text-lg font-semibold text-[var(--karbon-text,#1a1635)]">{title}</h3>
            )}
            {closable && (
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="rounded-lg p-1 ml-auto text-[var(--karbon-text-4,#b5b2cc)] transition-colors duration-150 hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))] hover:text-[var(--karbon-text-2,#5a567e)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            )}
          </div>
        )}

        <div className={`px-6 ${footer ? 'pb-4' : 'pb-6'} ${!title && !closable ? 'pt-6' : ''} overflow-y-auto`}>
          {children}
        </div>

        {footer && (
          <div className="px-6 pb-6 pt-2 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
