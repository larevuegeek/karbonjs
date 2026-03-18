import { describe, it, expect } from 'vitest'
import { truncate, slugify, capitalize, pluralize, stripHtml, initials, hashColorIndex, escapeHtml, camelCase, kebabCase, isImage } from './string'

describe('truncate', () => {
  it('returns short text unchanged', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })
  it('truncates long text with suffix', () => {
    expect(truncate('hello world', 5)).toBe('hello...')
  })
  it('supports custom suffix', () => {
    expect(truncate('hello world', 5, '…')).toBe('hello…')
  })
})

describe('slugify', () => {
  it('converts text to slug', () => {
    expect(slugify('Mon Super Article !')).toBe('mon-super-article')
  })
  it('handles accents', () => {
    expect(slugify('Éléphant à la crème')).toBe('elephant-a-la-creme')
  })
  it('handles empty string', () => {
    expect(slugify('')).toBe('')
  })
})

describe('capitalize', () => {
  it('capitalizes first letter', () => {
    expect(capitalize('hello')).toBe('Hello')
  })
  it('handles empty string', () => {
    expect(capitalize('')).toBe('')
  })
})

describe('pluralize', () => {
  it('returns singular for 1', () => {
    expect(pluralize(1, 'article')).toBe('1 article')
  })
  it('returns plural for > 1', () => {
    expect(pluralize(3, 'article')).toBe('3 articles')
  })
  it('supports custom plural', () => {
    expect(pluralize(2, 'child', 'children')).toBe('2 children')
  })
})

describe('stripHtml', () => {
  it('removes HTML tags', () => {
    expect(stripHtml('<p>Hello <b>world</b></p>')).toBe('Hello world')
  })
})

describe('initials', () => {
  it('returns first 2 letters uppercase', () => {
    expect(initials('david')).toBe('DA')
  })
})

describe('hashColorIndex', () => {
  it('returns consistent index', () => {
    const idx = hashColorIndex('test', 10)
    expect(hashColorIndex('test', 10)).toBe(idx)
  })
  it('returns index within palette size', () => {
    expect(hashColorIndex('anything', 5)).toBeLessThan(5)
    expect(hashColorIndex('anything', 5)).toBeGreaterThanOrEqual(0)
  })
})

describe('escapeHtml', () => {
  it('escapes HTML entities', () => {
    expect(escapeHtml('<script>"a" & \'b\'</script>')).toBe('&lt;script&gt;&quot;a&quot; &amp; &#039;b&#039;&lt;/script&gt;')
  })
})

describe('camelCase', () => {
  it('converts kebab to camel', () => {
    expect(camelCase('my-variable-name')).toBe('myVariableName')
  })
  it('converts snake to camel', () => {
    expect(camelCase('my_variable_name')).toBe('myVariableName')
  })
})

describe('kebabCase', () => {
  it('converts camelCase to kebab', () => {
    expect(kebabCase('myVariableName')).toBe('my-variable-name')
  })
})

describe('isImage', () => {
  it('detects image extensions', () => {
    expect(isImage('photo.jpg')).toBe(true)
    expect(isImage('photo.jpeg')).toBe(true)
    expect(isImage('photo.png')).toBe(true)
    expect(isImage('photo.gif')).toBe(true)
    expect(isImage('photo.webp')).toBe(true)
    expect(isImage('photo.avif')).toBe(true)
    expect(isImage('photo.svg')).toBe(true)
  })
  it('rejects non-image extensions', () => {
    expect(isImage('doc.pdf')).toBe(false)
    expect(isImage('file.txt')).toBe(false)
    expect(isImage('archive.zip')).toBe(false)
  })
  it('is case-insensitive', () => {
    expect(isImage('photo.JPG')).toBe(true)
    expect(isImage('photo.PNG')).toBe(true)
  })
})
