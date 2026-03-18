import type { AlertType } from '@karbonjs/ui-core'
import type { ReactNode } from 'react'

export interface AlertMessageProps {
  type?: AlertType
  message?: string
  className?: string
  children?: ReactNode
}

const variantClasses: Record<string, string> = {
  error: 'bg-red-500/8 border border-red-500/20 text-red-400',
  success: 'bg-green-500/8 border border-green-500/20 text-green-400',
  warning: 'bg-amber-500/8 border border-amber-500/20 text-amber-300',
  info: 'bg-blue-500/8 border border-blue-500/20 text-blue-400'
}

function AlertIcon({ type }: { type: AlertType }) {
  switch (type) {
    case 'error':
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
    case 'success':
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
    case 'warning':
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    case 'info':
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  }
}

export function AlertMessage({ type = 'error', message = '', className = '', children }: AlertMessageProps) {
  if (!message && !children) return null

  return (
    <div className={`flex items-center gap-2.5 px-4 py-3 rounded-[0.625rem] text-[0.825rem] font-medium ${variantClasses[type]} ${className}`}>
      <AlertIcon type={type} />
      {children ?? <span>{message}</span>}
    </div>
  )
}
