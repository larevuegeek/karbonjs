# KarbonJS

Modern full-stack TypeScript toolkit — utilities, API helpers, auth tools, **35 UI components** + WYSIWYG editor for Svelte 5 & React.

Frontend companion to [Karbon Framework](https://crates.io/crates/karbon-framework) (Rust backend).

## Packages

| Package | Description | Install |
|---|---|---|
| `@karbonjs/utils` | Date, string, number formatters, debounce, cookies | `pnpm add @karbonjs/utils` |
| `@karbonjs/types` | Shared TypeScript types (API, Auth) | `pnpm add @karbonjs/types` |
| `@karbonjs/api` | API client (SSR + client), SvelteKit proxy, rate limiter | `pnpm add @karbonjs/api` |
| `@karbonjs/auth` | Token manager, user cache, role hierarchy | `pnpm add @karbonjs/auth` |
| `@karbonjs/ui-core` | Design tokens, 12 color palettes, 10 themes | `pnpm add @karbonjs/ui-core` |
| `@karbonjs/ui-svelte` | 35 Svelte 5 components + WYSIWYG editor | `pnpm add @karbonjs/ui-svelte` |
| `@karbonjs/ui-react` | 35 React components | `pnpm add @karbonjs/ui-react` |

## Quick Start

```bash
pnpm add @karbonjs/utils @karbonjs/ui-svelte @karbonjs/ui-core
```

```css
/* app.css */
@import 'tailwindcss';
@source "../node_modules/@karbonjs/ui-svelte/src";
@import '../node_modules/@karbonjs/ui-core/src/styles.css';
@import '../node_modules/@karbonjs/ui-core/src/themes/midnight.css';
```

```svelte
<script>
  import { Button, Card, Badge, Input } from '@karbonjs/ui-svelte'
  import { timeAgo } from '@karbonjs/utils'
</script>

<Card title="Article" hoverable>
  <p>Published {timeAgo('2026-03-20')}</p>
  <Button variant="solid" color="emerald" shape="pill" arrow>Read more</Button>
</Card>
```

## Design System

### 12 Color Palettes (132 CSS variables)
red, orange, amber, yellow, lime, emerald, cyan, blue, violet, pink, slate, zinc — each with 11 shades (50-950).

### 10 Themes
`default` · `midnight` · `aurora` · `minimal` · `corporate` · `sunset` · `ocean` · `forest` · `neon` · `rose`

```html
<html data-theme="dark" data-karbon-theme="midnight">
```

### 3-Level Customization
1. **Theme** — global design tokens via CSS
2. **Props** — `color`, `variant`, `shape`, `size` per component
3. **Classes** — `classes={{ root, header, body }}` for targeted overrides

## UI Components (35)

### Button
`Button` — 7 variants (solid, flat, bordered, outline, light, ghost, shadow), 8 sizes (2xs-3xl), 5 shapes, arrow effect, loading
`ButtonBrand` — 30+ brand buttons (Google, Facebook, GitHub, Discord, etc.) with Simple Icons

### Form (9)
`Input` · `Select` (custom dropdown, multi-select, chips, searchable) · `Checkbox` (4 variants, 7 icons) · `Toggle` (icons, sizes) · `Radio` (4 variants) · `Textarea` · `Slider` · `DatePicker` · `ColorPicker`

### Data
`DataTable` — declarative columns, sort, search, filter, select, pagination, CSV export, loading skeleton
`Pagination` — 4 variants, ellipsis, first/last, SSR links

### Layout
`Card` · `PageHeader` (breadcrumb, back button, actions) · `EmptyState` (illustration, actions)

### Overlay
`Modal` (6 sizes, 4 positions, scroll lock) · `Dialog` (confirmInput, loading) · `Toast` (countdown, pause on hover) · `ImgBox` (lightbox, thumbnails, zoom, transitions)

### Image & Media
`Image` · `ImgZoom` (3 modes: overlay, lens, side) · `ImageCompare` (before/after slider) · `Carousel` (slide/fade, multi-slides, drag/swipe)

### Navigation
`Tabs` (4 variants, vertical, badges) · `Accordion` (5 variants, 5 arrow styles, bg/border custom) · `Breadcrumb` (5 separators, collapse) · `Dropdown` (groups, badges, search, keyboard nav)

### Feedback
`Badge` (5 variants, closable, dot) · `AlertMessage` (4 variants, title, actions, dismissible) · `Progress` (striped, gradient, glow, multi-segments) · `Tooltip` (3 variants, rich content) · `Avatar` · `Skeleton`

### Code & Editor
`CodeBlock` — syntax highlighting (15+ languages), copy, line numbers, line copy, highlight lines
`RichTextEditor` — WYSIWYG, toolbar presets (minimal/standard/full), floating toolbar, block tokens (Elementor-style), media explorer

### Utility
`Divider` (4 variants, icon, vertical) · `Kbd`

## API Proxy (SvelteKit)

```ts
// src/routes/api/[...path]/+server.ts
import { createProxy } from '@karbonjs/api/server'

export const { GET, POST, PUT, PATCH, DELETE } = createProxy({
  backend: 'http://localhost:8080',
  prefix: '/api',
  csrf: true,
  rateLimit: {
    'auth/login':    { max: 20, windowSec: 60 },
    '*':             { max: 200, windowSec: 60 },
  },
})
```

**Security:** path sanitization (encoded traversal blocked), CSRF (Origin required on mutations), sliding window rate limiter, body size limit, cookie forwarding, `X-Forwarded-For`.

## Playground

```bash
cd playground && pnpm dev  # http://localhost:3333
```

Interactive demo of all 35 components with theme switcher, color palettes, and copy-pasteable code examples.

## Development

```bash
pnpm install          # Install deps
pnpm run build        # Build all packages
pnpm run test         # Run tests
cd playground && pnpm dev  # Start playground
pnpm run publish:all  # Publish to npm
```

## Architecture

```
karbonjs/
├── packages/
│   ├── utils/        → @karbonjs/utils      (0 deps)
│   ├── types/        → @karbonjs/types      (0 deps)
│   ├── api/          → @karbonjs/api        (depends on types)
│   ├── auth/         → @karbonjs/auth       (depends on types)
│   ├── ui-core/      → @karbonjs/ui-core    (0 deps, CSS + types)
│   ├── ui-svelte/    → @karbonjs/ui-svelte  (depends on ui-core)
│   └── ui-react/     → @karbonjs/ui-react   (depends on ui-core)
├── playground/       → Interactive demo (SvelteKit, not published)
├── docs/             → Documentation
└── vitest.config.ts
```

## Related

- [Karbon Framework](https://crates.io/crates/karbon-framework) — Rust backend (Axum + SQLx + Tera templates)
- [Karbon CLI](https://crates.io/crates/karbon-cli) — `karbon dev`, `karbon build`, `karbon new`

## License

MIT
