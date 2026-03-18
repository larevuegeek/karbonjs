import type { ButtonVariant, ButtonSize } from '@karbonjs/ui-core'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: 'button' | 'submit'
  loading?: boolean
  loadingText?: string
  arrow?: boolean
  fullWidth?: boolean
  children: ReactNode
}

const variantClasses: Record<string, string> = {
  primary: 'bg-[var(--karbon-primary)] text-white hover:bg-[var(--karbon-primary-hover)] focus:ring-[var(--karbon-primary)]',
  secondary: 'bg-[var(--karbon-bg-2)] text-[var(--karbon-text-2)] hover:bg-[var(--karbon-border)] focus:ring-[var(--karbon-primary)]',
  danger: 'bg-[var(--karbon-danger)] text-white hover:bg-red-600 focus:ring-[var(--karbon-danger)]',
  ghost: 'text-[var(--karbon-text-3)] hover:bg-[var(--karbon-nav-hover-bg)] focus:ring-[var(--karbon-primary)]',
  outline: 'border border-[var(--karbon-border)] text-[var(--karbon-text-2)] hover:bg-[var(--karbon-nav-hover-bg)] focus:ring-[var(--karbon-primary)]'
}

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  loadingText = '',
  arrow = false,
  fullWidth = false,
  className = '',
  children,
  ...rest
}: ButtonProps & { className?: string }) {
  const isDisabled = disabled || loading

  const spinner = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  )

  if (arrow || fullWidth) {
    return (
      <button
        type={type}
        disabled={isDisabled}
        className={`
          group relative inline-flex items-center justify-center
          font-semibold rounded-lg overflow-hidden
          transition-all duration-300 ease-out
          py-3 md:py-3.5 px-4 text-[0.8125rem] md:text-sm
          ${variantClasses[variant]}
          ${fullWidth ? 'w-full' : ''}
          disabled:opacity-40 disabled:cursor-not-allowed
          active:enabled:scale-[0.97]
          focus:outline-none focus:ring-2 focus:ring-offset-0
          cursor-pointer
          ${className}
        `}
        {...rest}
      >
        <span className="flex items-center gap-2 transition-transform duration-300 group-hover:enabled:-translate-x-2.5">
          {loading ? (
            <>
              {spinner}
              {loadingText && <span>{loadingText}</span>}
            </>
          ) : (
            children
          )}
        </span>
        {arrow && !loading && (
          <span className="absolute right-4 flex items-center opacity-0 -translate-x-2 transition-all duration-300 group-hover:enabled:opacity-100 group-hover:enabled:translate-x-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        )}
      </button>
    )
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center font-semibold rounded-lg
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-offset-0
        cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
        active:enabled:scale-[0.97]
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}
      `}
      {...rest}
    >
      {loading ? (
        <>
          <span className="mr-2">{spinner}</span>
          {loadingText ? <span>{loadingText}</span> : children}
        </>
      ) : (
        children
      )}
    </button>
  )
}
