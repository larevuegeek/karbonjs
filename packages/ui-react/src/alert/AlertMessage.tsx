import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { AlertType, ButtonColor } from '@karbonjs/ui-core'

interface Props {
  type?: AlertType
  variant?: 'soft' | 'filled' | 'outline' | 'bordered'
  color?: ButtonColor
  title?: string
  message?: string
  dismissible?: boolean
  icon?: ReactNode | false
  actions?: ReactNode
  className?: string
  classes?: { root?: string; icon?: string; title?: string; text?: string; close?: string }
  onDismiss?: () => void
  children?: ReactNode
}

const typeColors: Record<string, string> = {
  error: 'var(--karbon-red-500, #ef4444)',
  success: 'var(--karbon-emerald-500, #10b981)',
  warning: 'var(--karbon-amber-500, #f59e0b)',
  info: 'var(--karbon-blue-500, #3b82f6)',
}

const typeColorsLight: Record<string, string> = {
  error: 'var(--karbon-red-400, #f87171)',
  success: 'var(--karbon-emerald-400, #34d399)',
  warning: 'var(--karbon-amber-400, #fbbf24)',
  info: 'var(--karbon-blue-400, #60a5fa)',
}

const typeIcons: Record<string, string> = {
  error: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  success: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  warning: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
}

function parseInlineStyle(raw: string): React.CSSProperties {
  const style: Record<string, string> = {}
  for (const pair of raw.split(';')) {
    const idx = pair.indexOf(':')
    if (idx < 0) continue
    const prop = pair.slice(0, idx).trim()
    const val = pair.slice(idx + 1).trim()
    if (!prop || !val) continue
    const camel = prop.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase())
    style[camel] = val
  }
  return style as React.CSSProperties
}

export function AlertMessage({
  type = 'info',
  variant = 'soft',
  color,
  title = '',
  message = '',
  dismissible = false,
  icon,
  actions,
  className = '',
  classes = {},
  onDismiss,
  children,
}: Props) {
  const [visible, setVisible] = useState(true)

  const baseColor = color ? `var(--karbon-${color}-500)` : typeColors[type]
  const lightColor = color ? `var(--karbon-${color}-400)` : typeColorsLight[type]

  const style = useMemo((): React.CSSProperties => {
    let raw: string
    switch (variant) {
      case 'soft':
        raw = `background:color-mix(in srgb,${baseColor} 10%,transparent);color:${lightColor};border:1px solid color-mix(in srgb,${baseColor} 15%,transparent);`
        break
      case 'filled':
        raw = `background:${baseColor};color:white;border:none;`
        break
      case 'outline':
        raw = `background:transparent;color:${lightColor};border:1px solid color-mix(in srgb,${baseColor} 30%,transparent);`
        break
      case 'bordered':
        raw = `background:color-mix(in srgb,${baseColor} 6%,transparent);color:${lightColor};border:none;border-left:3px solid ${baseColor};`
        break
      default:
        raw = ''
    }
    return { ...parseInlineStyle(raw), animation: 'karbon-alert-in 0.25s ease' }
  }, [variant, baseColor, lightColor])

  function dismiss() {
    setVisible(false)
    onDismiss?.()
  }

  if (!visible || (!message && !children && !title)) return null

  const strokeColor = variant === 'filled' ? 'white' : 'currentColor'

  return (
    <div
      className={`flex gap-3 rounded-xl px-4 py-3 text-sm ${classes?.root ?? className}`}
      style={style}
      role="alert"
    >
      {/* Icon */}
      {icon !== false && (
        <div className={`shrink-0 mt-0.5 ${classes?.icon ?? ''}`}>
          {icon ? (
            icon
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              dangerouslySetInnerHTML={{ __html: typeIcons[type] || typeIcons.info }}
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p
            className={`font-semibold ${message || children ? 'mb-1' : ''} ${classes?.title ?? ''}`}
            style={variant === 'filled' ? { color: 'white' } : undefined}
          >
            {title}
          </p>
        )}
        {children ? (
          <div className={`opacity-90 ${classes?.text ?? ''}`}>{children}</div>
        ) : message ? (
          <p className={`opacity-90 ${classes?.text ?? ''}`}>{message}</p>
        ) : null}
        {actions && (
          <div className="mt-2.5 flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          type="button"
          onClick={dismiss}
          className={`shrink-0 mt-0.5 rounded-lg p-1 transition-opacity opacity-50 hover:opacity-100 cursor-pointer ${classes?.close ?? ''}`}
          aria-label="Fermer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>
      )}
    </div>
  )
}
