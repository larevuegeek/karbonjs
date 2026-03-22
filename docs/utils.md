# @karbonjs/utils

Utility functions for date, string, number formatting and more. Pure TypeScript, zero dependencies.

```bash
pnpm add @karbonjs/utils
```

## Date

All date functions accept `string | Date` and an optional `{ locale }` (default: `fr-FR`).

### `formatDate(d, opts?)`

```ts
formatDate('2026-03-14')                    // "14 mars 2026"
formatDate('2026-03-14', { locale: 'en-US' }) // "Mar 14, 2026"
```

### `formatDateTime(d, opts?)`

```ts
formatDateTime('2026-03-14T15:30:00') // "14 mars 2026 à 15:30"
```

### `timeAgo(d, opts?)`

```ts
timeAgo('2026-03-14T10:00:00') // "Il y a 5 min", "Il y a 3j", "Il y a 2 mois"
timeAgo(date, { locale: 'en' }) // "5m ago", "3d ago", "2mo ago"
```

### `formatMonthYear(d, opts?)`

```ts
formatMonthYear('2026-03-14') // "mars 2026"
```

### `isToday(d)` / `isPast(d)`

```ts
isToday(new Date())           // true
isPast('2020-01-01')          // true
```

## String

### `slugify(text)`

```ts
slugify('Mon Super Article !') // "mon-super-article"
slugify('Éléphant à la crème') // "elephant-a-la-creme"
```

### `truncate(text, len, suffix?)`

```ts
truncate('Hello world', 5)      // "Hello..."
truncate('Hello world', 5, '…') // "Hello…"
```

### `capitalize(text)` / `pluralize(count, word, plural?)`

```ts
capitalize('hello')            // "Hello"
pluralize(3, 'article')        // "3 articles"
pluralize(2, 'child', 'children') // "2 children"
```

### `escapeHtml(text)` / `stripHtml(html)`

```ts
escapeHtml('<script>alert("xss")</script>') // "&lt;script&gt;..."
stripHtml('<p>Hello <b>world</b></p>')      // "Hello world"
```

### `initials(name)` / `hashColorIndex(name, paletteSize)`

```ts
initials('David Martin')         // "DA"
hashColorIndex('David', 10)      // 7 (deterministic)
```

### `camelCase(str)` / `kebabCase(str)`

```ts
camelCase('my-variable-name')  // "myVariableName"
kebabCase('myVariableName')    // "my-variable-name"
```

### `isImage(filename)`

```ts
isImage('photo.jpg')  // true
isImage('doc.pdf')    // false
```

## Number

### `formatPrice(amount, currency?, locale?)`

```ts
formatPrice(29.99)                     // "29,99 €"
formatPrice(29.99, 'USD', 'en-US')     // "$29.99"
```

### `formatCount(n, locale?)` / `formatPercent(ratio, decimals?)`

```ts
formatCount(12345)       // "12 345"
formatPercent(0.856)     // "85.6%"
formatPercent(0.856, 0)  // "86%"
```

### `clamp(value, min, max)` / `randomInt(min, max)`

Auto-swaps if `min > max`.

```ts
clamp(15, 0, 10)   // 10
clamp(5, 10, 0)    // 5 (auto-swapped to min=0, max=10)
randomInt(1, 100)   // random number 1-100
```

### `formatSize(bytes, locale?)`

Returns `"0 o"` / `"0 B"` for negative or non-finite values.

```ts
formatSize(1536)       // "1.5 Ko"
formatSize(-1)         // "0 o"
formatSize(NaN)        // "0 o"
```

## Debounce & Throttle

Both return a function with `.cancel()` for cleanup.

```ts
const search = debounce(() => loadItems(), 400)
input.addEventListener('input', search)

// Cleanup (component unmount)
search.cancel()
```

```ts
const scroll = throttle(() => updatePosition(), 200)
window.addEventListener('scroll', scroll)
scroll.cancel()
```

## Cookie

```ts
setCookie('theme', 'dark', { days: 365 })
getCookie('theme')     // "dark"
deleteCookie('theme')
```

Options: `days`, `path`, `sameSite` ('Strict' | 'Lax' | 'None'), `secure`.

> `SameSite=None` automatically forces `secure=true`.
