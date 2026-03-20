import { useState, useEffect, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface DialogProps {
  open: boolean
  title: string
  message?: string
  variant?: 'info' | 'warning' | 'danger' | 'success'
  backdrop?: 'blur' | 'dark' | 'transparent'
  color?: ButtonColor
  confirmLabel?: string
  cancelLabel?: string
  confirmInput?: string
  confirmInputLabel?: string
  confirmInputPlaceholder?: string
  loading?: boolean
  className?: string
  classes?: { overlay?: string; content?: string }
  onconfirm: () => void
  oncancel: () => void
  icon?: ReactNode
  children?: ReactNode
}

const variantColors: Record<string, { bg: string; text: string; btn: string; btnHover: string }> = {
  info:    { bg: 'var(--karbon-blue-500)', text: 'var(--karbon-blue-400)', btn: 'var(--karbon-blue-500)', btnHover: 'var(--karbon-blue-600)' },
  warning: { bg: 'var(--karbon-amber-500)', text: 'var(--karbon-amber-400)', btn: 'var(--karbon-amber-500)', btnHover: 'var(--karbon-amber-600)' },
  danger:  { bg: 'var(--karbon-red-500)', text: 'var(--karbon-red-400)', btn: 'var(--karbon-red-500)', btnHover: 'var(--karbon-red-600)' },
  success: { bg: 'var(--karbon-emerald-500)', text: 'var(--karbon-emerald-400)', btn: 'var(--karbon-emerald-500)', btnHover: 'var(--karbon-emerald-600)' },
}

const variantIcons: Record<string, ReactNode> = {
  info: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></>,
  warning: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></>,
  danger: <><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></>,
  success: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></>,
}

const backdropStyles: Record<string, React.CSSProperties> = {
  blur: { background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' },
  dark: { background: 'rgba(0,0,0,0.6)' },
  transparent: { background: 'transparent' },
}

export function Dialog({
  open,
  title,
  message = '',
  variant = 'info',
  backdrop = 'blur',
  color,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  confirmInput,
  confirmInputLabel,
  confirmInputPlaceholder,
  loading = false,
  className = '',
  classes = {},
  onconfirm,
  oncancel,
  icon,
  children,
}: DialogProps) {
  const [visible, setVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [btnHovered, setBtnHovered] = useState(false)

  const vc = useMemo(() => {
    if (color) return { bg: `var(--karbon-${color}-500)`, text: `var(--karbon-${color}-400)`, btn: `var(--karbon-${color}-500)`, btnHover: `var(--karbon-${color}-600)` }
    return variantColors[variant]
  }, [color, variant])

  const confirmInputLabelText = confirmInputLabel ?? `Tapez "${confirmInput}" pour confirmer`
  const isConfirmDisabled = loading || (confirmInput ? inputValue !== confirmInput : false)

  useEffect(() => {
    if (open) {
      setInputValue('')
      requestAnimationFrame(() => setVisible(true))
      document.body.style.overflow = 'hidden'
    } else {
      setVisible(false)
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const cancel = useCallback(() => {
    setVisible(false)
    setTimeout(() => oncancel(), 150)
  }, [oncancel])

  const confirm = useCallback(() => {
    if (isConfirmDisabled) return
    onconfirm()
  }, [isConfirmDisabled, onconfirm])

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') cancel()
      if (e.key === 'Enter' && !isConfirmDisabled) confirm()
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [open, cancel, confirm, isConfirmDisabled])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.15s ease' }}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 ${classes?.overlay ?? ''}`}
        style={{ ...backdropStyles[backdrop], transition: 'opacity 0.15s ease', opacity: visible ? 1 : 0 }}
        onClick={cancel}
      />

      {/* Content */}
      <div
        className={`relative z-10 w-full max-w-md rounded-2xl p-6 ${classes?.content ?? className}`}
        style={{
          background: 'var(--karbon-bg-card)',
          border: '1px solid var(--karbon-border)',
          boxShadow: '0 25px 60px -12px rgba(0,0,0,0.4)',
          transform: visible ? 'scale(1)' : 'scale(0.95)',
          transition: 'transform 0.2s cubic-bezier(0.16,1,0.3,1)',
          opacity: visible ? 1 : 0,
        }}
        role="alertdialog"
        aria-modal="true"
      >
        {/* Icon + Title */}
        <div className="flex flex-col items-center text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: `color-mix(in srgb,${vc.bg} 12%,transparent)` }}
          >
            {icon ? (
              <span style={{ color: vc.text }}>{icon}</span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={vc.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {variantIcons[variant] || variantIcons.info}
              </svg>
            )}
          </div>

          <h3 className="text-lg font-semibold" style={{ color: 'var(--karbon-text)' }}>{title}</h3>

          {message && (
            <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--karbon-text-3)' }}>{message}</p>
          )}
        </div>

        {/* Custom children */}
        {children && <div className="mt-4">{children}</div>}

        {/* Confirm input */}
        {confirmInput && (
          <div className="mt-5 text-left">
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--karbon-text-2)' }}>
              {confirmInputLabelText}
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={confirmInputPlaceholder ?? confirmInput}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-colors"
              style={{ background: 'var(--karbon-bg-input)', border: `1px solid ${inputValue === confirmInput ? vc.bg : 'var(--karbon-border-input)'}`, color: 'var(--karbon-text)' }}
              onFocus={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 3px color-mix(in srgb, ${vc.bg} 15%, transparent)` }}
              onBlur={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            />
            {confirmInput && inputValue && inputValue !== confirmInput && (
              <p className="mt-1 text-[11px]" style={{ color: 'var(--karbon-red-400)' }}>Le texte ne correspond pas</p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={cancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: 'var(--karbon-text-2)', border: '1px solid var(--karbon-border)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={confirm}
            disabled={isConfirmDisabled}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            style={{ background: btnHovered && !isConfirmDisabled ? vc.btnHover : vc.btn }}
          >
            {loading && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
            )}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
