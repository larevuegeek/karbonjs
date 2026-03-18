import { describe, it, expect } from 'vitest'
import { formatDate, formatDateTime, timeAgo, formatMonthYear, isToday, isPast } from './date'

describe('formatDate', () => {
  it('formats date in French by default', () => {
    const result = formatDate('2026-03-14')
    expect(result).toMatch(/14/)
    expect(result).toMatch(/2026/)
  })
  it('accepts locale override', () => {
    const result = formatDate('2026-03-14', { locale: 'en-US' })
    expect(result).toMatch(/14/)
    expect(result).toMatch(/2026/)
  })
})

describe('formatDateTime', () => {
  it('includes time', () => {
    const result = formatDateTime('2026-03-14T15:30:00')
    expect(result).toMatch(/15/)
    expect(result).toMatch(/30/)
  })
})

describe('timeAgo', () => {
  it('returns "À l\'instant" for recent dates in French', () => {
    expect(timeAgo(new Date().toISOString())).toBe("À l'instant")
  })
  it('returns "Just now" for English locale', () => {
    expect(timeAgo(new Date().toISOString(), { locale: 'en-US' })).toBe('Just now')
  })
})

describe('formatMonthYear', () => {
  it('formats month and year in French', () => {
    const result = formatMonthYear('2026-03-14')
    expect(result).toMatch(/2026/)
  })
})

describe('isToday', () => {
  it('returns true for today', () => {
    expect(isToday(new Date())).toBe(true)
  })
  it('returns false for yesterday', () => {
    const yesterday = new Date(Date.now() - 86_400_000)
    expect(isToday(yesterday)).toBe(false)
  })
})

describe('isPast', () => {
  it('returns true for past date', () => {
    expect(isPast('2020-01-01')).toBe(true)
  })
  it('returns false for future date', () => {
    expect(isPast('2099-01-01')).toBe(false)
  })
})
