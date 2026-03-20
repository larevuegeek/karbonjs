import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import type { FormVariant, FormInputVariant, SelectOption, ButtonColor, SelectClasses } from '@karbonjs/ui-core'

export interface SelectProps {
  name: string
  options: SelectOption[]
  value?: string
  values?: string[]
  placeholder?: string
  label?: string
  error?: string
  errorIcon?: boolean
  required?: boolean
  disabled?: boolean
  multiple?: boolean
  searchable?: boolean
  clearable?: boolean
  variant?: FormVariant
  inputVariant?: FormInputVariant
  color?: ButtonColor
  classes?: SelectClasses
  className?: string
  onChange?: (value: string | string[]) => void
}

export function Select({
  name,
  options,
  value = '',
  values = [],
  placeholder = 'Selectionner...',
  label = '',
  error = '',
  errorIcon = true,
  required = false,
  disabled = false,
  multiple = false,
  searchable = false,
  clearable = false,
  variant = 'dark',
  inputVariant = 'outlined',
  color,
  classes,
  className = '',
  onChange
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [search, setSearch] = useState('')
  const triggerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const focusColor = useMemo(() => color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)', [color])
  const isDark = variant === 'dark'

  const filteredOptions = useMemo(() => {
    if (searchable && search) {
      return options.filter(o => !o.disabled && o.label.toLowerCase().includes(search.toLowerCase()))
    }
    return options
  }, [options, searchable, search])

  const selectedLabel = useMemo(() => {
    if (multiple) {
      return values.length ? `${values.length} selectionne${values.length > 1 ? 's' : ''}` : ''
    }
    const opt = options.find(o => o.value === value)
    return opt?.label || ''
  }, [multiple, values, options, value])

  const selectedOptions = useMemo(() => {
    return multiple ? options.filter(o => values.includes(o.value)) : []
  }, [multiple, options, values])

  const toggle = useCallback(() => {
    if (disabled) return
    setOpen(prev => {
      if (!prev) {
        setSearch('')
        setFocused(true)
      }
      return !prev
    })
  }, [disabled])

  const selectOption = useCallback((opt: SelectOption) => {
    if (opt.disabled) return
    if (multiple) {
      const newValues = values.includes(opt.value)
        ? values.filter(v => v !== opt.value)
        : [...values, opt.value]
      onChange?.(newValues)
    } else {
      setOpen(false)
      onChange?.(opt.value)
    }
  }, [multiple, values, onChange])

  const removeChip = useCallback((val: string) => {
    const newValues = values.filter(v => v !== val)
    onChange?.(newValues)
  }, [values, onChange])

  const clearAll = useCallback(() => {
    if (multiple) {
      onChange?.([])
    } else {
      onChange?.('')
    }
  }, [multiple, onChange])

  // Click outside + Escape handler
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
        setFocused(false)
      }
    }
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        setFocused(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  const variantClasses = useMemo(() => {
    if (inputVariant === 'underline') return 'rounded-none bg-transparent'
    if (inputVariant === 'filled') return isDark ? 'rounded-lg bg-white/8' : 'rounded-lg bg-gray-100'
    return isDark ? 'rounded-lg border border-white/8 bg-white/3' : 'rounded-lg border border-gray-300 bg-white'
  }, [inputVariant, isDark])

  const triggerCssText = useMemo(() => {
    if (inputVariant === 'underline') {
      const bc = focused ? focusColor : error ? 'var(--karbon-danger)' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)'
      return `border:none;border-bottom:1px solid ${bc};border-radius:0;`
    } else if (focused) {
      return `border-color:${focusColor};box-shadow:0 0 0 3px color-mix(in srgb,${focusColor} 12%,transparent);`
    }
    return ''
  }, [inputVariant, focused, focusColor, error, isDark])

  useEffect(() => {
    if (triggerRef.current) {
      triggerRef.current.style.cssText = triggerCssText
    }
  }, [triggerCssText])

  return (
    <div className={`space-y-1.5 ${classes?.root ?? ''} ${className}`}>
      {label && (
        <span className={`${isDark ? 'text-[11px] font-medium text-gray-500 uppercase tracking-wider' : 'text-sm font-medium text-gray-700'} block mb-1.5 ${classes?.label ?? ''}`}>
          {label}
        </span>
      )}

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={multiple ? values.join(',') : value} />

      <div className="relative">
        {/* Trigger */}
        <div
          ref={triggerRef}
          onClick={toggle}
          className={`relative w-full min-h-[42px] md:min-h-[46px] flex items-center gap-2 px-3 py-2 text-[13px] md:text-sm cursor-pointer transition-all ${variantClasses} ${error ? 'border-red-500/50' : ''} ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''} ${classes?.select ?? ''}`}
        >
          {/* Content */}
          <div className="flex-1 flex flex-wrap items-center gap-1.5 min-w-0">
            {multiple && selectedOptions.length > 0 ? (
              selectedOptions.map(opt => (
                <span
                  key={opt.value}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium transition-colors"
                  style={{ background: `color-mix(in srgb, ${focusColor} 15%, transparent)`, color: focusColor }}
                >
                  {opt.label}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeChip(opt.value) }}
                    className="hover:opacity-70 cursor-pointer"
                    aria-label={`Retirer ${opt.label}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </span>
              ))
            ) : !multiple && selectedLabel ? (
              <span className={isDark ? 'text-white' : 'text-gray-900'}>{selectedLabel}</span>
            ) : (
              <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>{placeholder}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            {clearable && (value || values.length > 0) && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); clearAll() }}
                className={`${isDark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors cursor-pointer`}
                aria-label="Tout effacer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className={`${isDark ? 'text-gray-600' : 'text-gray-400'} transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            ><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>

        {/* Dropdown */}
        {open && (
          <div
            ref={dropdownRef}
            className="absolute z-50 mt-1 w-full rounded-lg shadow-xl overflow-hidden"
            style={{
              background: isDark ? 'var(--karbon-bg-card, #1a1a2e)' : '#fff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
            }}
          >
            {searchable && (
              <div className="p-2" style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full px-2.5 py-1.5 text-xs rounded-md outline-none"
                  style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6', color: isDark ? 'white' : '#111' }}
                />
              </div>
            )}

            <div className="max-h-60 overflow-y-auto py-1">
              {filteredOptions.length === 0 ? (
                <div className={`px-3 py-4 text-center text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                  Aucun resultat
                </div>
              ) : (
                filteredOptions.map(opt => {
                  const isSelected = multiple ? values.includes(opt.value) : value === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => selectOption(opt)}
                      disabled={opt.disabled}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors cursor-pointer ${opt.disabled ? 'opacity-30 cursor-not-allowed' : ''} ${isSelected && !isDark ? 'bg-gray-50 font-medium' : ''} ${isSelected && isDark ? 'font-medium' : ''}`}
                      style={{
                        color: isDark ? (isSelected ? focusColor : 'rgba(255,255,255,0.8)') : (isSelected ? focusColor : '#374151'),
                        background: isSelected ? `color-mix(in srgb, ${focusColor} 8%, transparent)` : 'transparent'
                      }}
                      onMouseEnter={(e) => { if (!opt.disabled) (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.05)' : '#f9fafb' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isSelected ? `color-mix(in srgb, ${focusColor} 8%, transparent)` : 'transparent' }}
                    >
                      {multiple && (
                        <div
                          className="w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-colors"
                          style={{
                            borderColor: isSelected ? focusColor : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                            background: isSelected ? focusColor : 'transparent'
                          }}
                        >
                          {isSelected && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          )}
                        </div>
                      )}
                      <span className="flex-1 truncate">{opt.label}</span>
                      {!multiple && isSelected && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      )}
                    </button>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-red-400' : 'text-[var(--karbon-danger)]'} ${classes?.error ?? ''}`}>
          {errorIcon && (
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          )}
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
