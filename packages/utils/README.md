# @karbonjs/utils

Lightweight utility functions for date, string, number formatting and more. Pure TypeScript, zero dependencies, works with any framework.

## Install

```bash
npm install @karbonjs/utils
```

## Date

```typescript
import { formatDate, formatDateTime, timeAgo, formatMonthYear, isToday, isPast } from '@karbonjs/utils'

formatDate('2026-03-15')                    // "15 mars 2026"
formatDateTime('2026-03-15T14:30:00')       // "15 mars 2026 à 14:30"
timeAgo('2026-03-15T10:00:00')             // "Il y a 5h"
formatMonthYear('2026-03-15')              // "mars 2026"

// English locale
formatDate('2026-03-15', { locale: 'en-US' })  // "Mar 15, 2026"
timeAgo('2026-03-15', { locale: 'en' })        // "5h ago"
```

## String

```typescript
import { truncate, slugify, capitalize, pluralize, stripHtml, initials, escapeHtml, camelCase, kebabCase } from '@karbonjs/utils'

truncate('Long text here...', 10)           // "Long text ..."
slugify('Mon Super Article !')              // "mon-super-article"
capitalize('hello')                         // "Hello"
pluralize(3, 'article')                     // "3 articles"
pluralize(1, 'article')                     // "1 article"
stripHtml('<p>Hello <b>world</b></p>')      // "Hello world"
initials('John Doe')                        // "JO"
escapeHtml('<script>alert("xss")</script>') // "&lt;script&gt;..."
camelCase('my-variable')                    // "myVariable"
kebabCase('myVariable')                     // "my-variable"
```

## Number

```typescript
import { formatSize, formatCount, clamp, formatPercent, formatPrice, randomInt } from '@karbonjs/utils'

formatSize(2_500_000)          // "2.4 Mo"
formatSize(2_500_000, 'en')    // "2.4 MB"
formatCount(12345)             // "12 345"
clamp(150, 0, 100)            // 100
formatPercent(0.856)           // "85.6%"
formatPrice(29.99)             // "29,99 €"
formatPrice(29.99, 'USD', 'en-US')  // "$29.99"
randomInt(1, 10)               // 7
```

## Timing

```typescript
import { debounce, throttle } from '@karbonjs/utils'

const search = debounce(() => fetchResults(), 400)
const scroll = throttle(() => handleScroll(), 200)
```

## Cookies

```typescript
import { setCookie, getCookie, deleteCookie } from '@karbonjs/utils'

setCookie('theme', 'dark', { days: 365 })
getCookie('theme')              // "dark"
deleteCookie('theme')
```

## License

MIT
