import { describe, it, expect } from 'vitest'
import { formatSize, formatCount, clamp, formatPercent, formatPrice, randomInt } from './number'

describe('formatSize', () => {
  it('formats bytes in French', () => {
    expect(formatSize(500)).toBe('500 o')
    expect(formatSize(1536)).toBe('1.5 Ko')
  })
  it('formats bytes in English', () => {
    expect(formatSize(500, 'en')).toBe('500 B')
    expect(formatSize(1536, 'en')).toBe('1.5 KB')
  })
  it('handles large sizes', () => {
    expect(formatSize(1_073_741_824)).toBe('1.0 Go')
  })
})

describe('formatCount', () => {
  it('formats with French separators by default', () => {
    const result = formatCount(12345)
    // French uses non-breaking space or narrow no-break space
    expect(result.replace(/\s/g, ' ')).toContain('12')
    expect(result.replace(/\s/g, ' ')).toContain('345')
  })
})

describe('clamp', () => {
  it('clamps value between min and max', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(15, 0, 10)).toBe(10)
  })
})

describe('formatPercent', () => {
  it('formats ratio as percentage', () => {
    expect(formatPercent(0.856)).toBe('85.6%')
    expect(formatPercent(1)).toBe('100.0%')
  })
  it('supports custom decimals', () => {
    expect(formatPercent(0.856, 0)).toBe('86%')
  })
})

describe('formatPrice', () => {
  it('formats in French EUR by default', () => {
    const result = formatPrice(29.99)
    expect(result).toContain('29')
    expect(result).toContain('99')
  })
})

describe('randomInt', () => {
  it('returns value within range', () => {
    for (let i = 0; i < 100; i++) {
      const val = randomInt(1, 10)
      expect(val).toBeGreaterThanOrEqual(1)
      expect(val).toBeLessThanOrEqual(10)
    }
  })
})
