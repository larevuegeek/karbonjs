import { useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface ModalProps {
  open: boolean
  title?: string
  description?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  position?: 'center' | 'top' | 'right' | 'bottom'
  backdrop?: 'blur' | 'dark' | 'light' | 'transparent'
  closable?: boolean
  closeOnOverlay?: boolean
  color?: ButtonColor
  className?: string
  classes?: { overlay?: string; content?: string; header?: string; body?: string; footer?: string }
  onclose: () => void
  icon?: ReactNode
  children: ReactNode
  footer?: ReactNode
}

const sizeMap: Record<string, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
}

const backdropStyles: Record<string, string> = {
  blur: 'background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);',
  dark: 'background:rgba(0,0,0,0.6);',
  light: 'background:rgba(255,255,255,0.4);backdrop-filter:blur(4px);',
  transparent: 'background:transparent;',
}

const positionClasses: Record<string, string> = {
  center: 'items-center justify-center',
  top: 'items-start justify-center pt-16',
  right: 'items-stretch justify-end',
  bottom: 'items-end justify-center pb-4',
}

const contentPosition: Record<string, string> = {
  center: 'rounded-xl',
  top: 'rounded-xl',
  right: 'rounded-l-xl rounded-r-none min-h-full',
  bottom: 'rounded-t-xl rounded-b-none',
}

function parseCssText(str: string): React.CSSProperties {
  const style: Record<string, string> = {}
  for (const part of str.split(';')) {
    const idx = part.indexOf(':')
    if (idx < 0) continue
    const prop = part.slice(0, idx).trim()
    const val = part.slice(idx + 1).trim()
    if (!prop || !val) continue
    const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    style[camel] = val
  }
  return style as React.CSSProperties
}

export function Modal({
  open,
  title = '',
  description = '',
  size = 'md',
  position = 'center',
  backdrop = 'blur',
  closable = true,
  closeOnOverlay = true,
  color,
  className = '',
  classes = {},
  onclose,
  icon,
  children,
  footer,
}: ModalProps) {
  const [visible, setVisible] = useState(false)
  const accent = color ? `var(--karbon-${color}-500)` : ''

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true))
      document.body.style.overflow = 'hidden'
    } else {
      setVisible(false)
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = useCallback(() => {
    if (!closable) return
    setVisible(false)
    setTimeout(() => onclose(), 150)
  }, [closable, onclose])

  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlay) close()
  }, [closeOnOverlay, close])

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closable && open) close()
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [closable, open, close])

  if (!open) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex p-4 ${positionClasses[position]}`}
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.15s ease' }}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 ${classes?.overlay ?? ''}`}
        style={{ ...parseCssText(backdropStyles[backdrop]), transition: 'opacity 0.15s ease', opacity: visible ? 1 : 0 }}
        onClick={handleOverlayClick}
      />

      {/* Content */}
      <div
        className={`relative z-10 w-full ${sizeMap[size]} ${contentPosition[position]} flex flex-col ${classes?.content ?? className}`}
        style={{
          background: 'var(--karbon-bg-card)',
          boxShadow: '0 25px 60px -12px rgba(0,0,0,0.4)',
          border: '1px solid var(--karbon-border)',
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(8px)',
          transition: 'transform 0.2s cubic-bezier(0.16,1,0.3,1),opacity 0.15s ease',
          opacity: visible ? 1 : 0,
        }}
        role="dialog"
        aria-modal="true"
        aria-label={title || undefined}
      >
        {/* Header */}
        {(title || closable || icon || description) && (
          <div className={`flex gap-4 px-6 pt-6 pb-2 ${classes?.header ?? ''}`}>
            {icon && (
              <div className="shrink-0 mt-0.5">
                {color ? (
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `color-mix(in srgb,${accent} 12%,transparent)`, color: accent }}>
                    {icon}
                  </div>
                ) : icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              {title && <h3 className="text-lg font-semibold" style={{ color: 'var(--karbon-text)' }}>{title}</h3>}
              {description && <p className="text-sm mt-0.5" style={{ color: 'var(--karbon-text-3)' }}>{description}</p>}
            </div>
            {closable && (
              <button
                onClick={close}
                aria-label="Fermer"
                className="shrink-0 rounded-lg p-1.5 transition-colors cursor-pointer"
                style={{ color: 'var(--karbon-text-4)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)'; (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-2)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-4)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={`px-6 py-4 flex-1 overflow-y-auto text-sm ${classes?.body ?? ''}`} style={{ color: 'var(--karbon-text-2)' }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className={`px-6 py-4 flex items-center justify-end gap-2 ${classes?.footer ?? ''}`} style={{ borderTop: '1px solid var(--karbon-border)' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
