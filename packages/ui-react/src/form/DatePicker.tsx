import { useState, useEffect, useRef } from 'react'
import type { FormVariant } from '@karbonjs/ui-core'

export interface DatePickerProps {
  name: string
  value?: string
  label?: string
  error?: string
  placeholder?: string
  min?: string
  max?: string
  required?: boolean
  disabled?: boolean
  variant?: FormVariant
  className?: string
  onChange?: (value: string) => void
}

const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const dayNames = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']

const themes = {
  dark: {
    label: 'text-[11px] font-medium text-gray-500 uppercase tracking-wider',
    input: 'border-white/8 bg-white/3 text-white focus:border-[var(--karbon-primary)]/50 focus:bg-white/5',
    error: 'text-red-400',
    calendar: 'bg-[var(--karbon-bg-card,#0a0820)] border-white/10 text-white',
    dayHover: 'hover:bg-white/10',
    dayOther: 'text-gray-600'
  },
  light: {
    label: 'text-sm font-medium text-gray-700',
    input: 'border-gray-300 bg-white text-gray-900 focus:border-[var(--karbon-primary)]',
    error: 'text-[var(--karbon-danger)]',
    calendar: 'bg-white border-gray-200 text-gray-900',
    dayHover: 'hover:bg-gray-100',
    dayOther: 'text-gray-300'
  }
} as const

function formatDisplay(val: string): string {
  if (!val) return ''
  const d = new Date(val + 'T00:00:00')
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

function getCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0).getDate()
  let startDay = first.getDay() - 1
  if (startDay < 0) startDay = 6

  const days: { date: number; month: number; year: number; current: boolean }[] = []

  const prevLastDay = new Date(year, month, 0).getDate()
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({ date: prevLastDay - i, month: month - 1, year, current: false })
  }
  for (let i = 1; i <= lastDay; i++) {
    days.push({ date: i, month, year, current: true })
  }
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: i, month: month + 1, year, current: false })
  }
  return days
}

export function DatePicker({
  name,
  value = '',
  label,
  error,
  placeholder = 'Sélectionner une date',
  disabled = false,
  required = false,
  variant = 'dark',
  className = '',
  onChange
}: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false)
  const selectedDate = value ? new Date(value + 'T00:00:00') : null
  const [viewYear, setViewYear] = useState(selectedDate?.getFullYear() ?? new Date().getFullYear())
  const [viewMonth, setViewMonth] = useState(selectedDate?.getMonth() ?? new Date().getMonth())
  const ref = useRef<HTMLDivElement>(null)
  const theme = themes[variant]

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowCalendar(false)
    }
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [])

  const days = getCalendarDays(viewYear, viewMonth)

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1) }
    else setViewMonth(viewMonth - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1) }
    else setViewMonth(viewMonth + 1)
  }

  function selectDay(day: { date: number; month: number; year: number }) {
    const m = day.month < 0 ? 11 : day.month > 11 ? 0 : day.month
    const y = day.month < 0 ? day.year - 1 : day.month > 11 ? day.year + 1 : day.year
    const val = `${y}-${String(m + 1).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`
    onChange?.(val)
    setShowCalendar(false)
  }

  function isSelected(day: { date: number; month: number; year: number }) {
    if (!selectedDate) return false
    const m = day.month < 0 ? 11 : day.month > 11 ? 0 : day.month
    return selectedDate.getDate() === day.date && selectedDate.getMonth() === m && selectedDate.getFullYear() === day.year
  }

  function isToday(day: { date: number; month: number; year: number; current: boolean }) {
    if (!day.current) return false
    const now = new Date()
    return day.date === now.getDate() && viewMonth === now.getMonth() && viewYear === now.getFullYear()
  }

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label htmlFor={name} className={`${theme.label} block mb-1.5`}>{label}</label>}

      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => { if (!disabled) setShowCalendar(!showCalendar) }}
          disabled={disabled}
          className={`w-full rounded-lg border px-3 py-2.5 md:py-3 text-[13px] md:text-sm text-left focus:outline-none transition-all ${theme.input} ${error ? 'border-red-500/50' : ''} ${!value ? 'text-gray-500' : ''} cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {value ? formatDisplay(value) : placeholder}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
        </button>

        <input type="hidden" name={name} value={value} required={required} />

        {showCalendar && (
          <div className={`absolute z-50 mt-1 w-72 rounded-xl border shadow-xl p-3 ${theme.calendar}`}>
            <div className="flex items-center justify-between mb-3">
              <button type="button" onClick={prevMonth} aria-label="Mois précédent" className={`p-1 rounded-lg ${theme.dayHover} cursor-pointer`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <span className="text-sm font-semibold">{monthNames[viewMonth]} {viewYear}</span>
              <button type="button" onClick={nextMonth} aria-label="Mois suivant" className={`p-1 rounded-lg ${theme.dayHover} cursor-pointer`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>

            <div className="grid grid-cols-7 mb-1">
              {dayNames.map((d) => (
                <div key={d} className="text-center text-[10px] font-medium text-[var(--karbon-text-4,#b5b2cc)] py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {days.map((day, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectDay(day)}
                  className={`h-8 w-full rounded-lg text-xs font-medium transition-colors cursor-pointer
                    ${isSelected(day) ? 'bg-[var(--karbon-primary)] text-white' : ''}
                    ${isToday(day) && !isSelected(day) ? 'ring-1 ring-[var(--karbon-primary)]' : ''}
                    ${!day.current ? theme.dayOther : ''}
                    ${!isSelected(day) ? theme.dayHover : ''}`}
                >
                  {day.date}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && <p className={`text-xs ${theme.error}`}>{error}</p>}
    </div>
  )
}
