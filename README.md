# KarbonJS

Modern full-stack TypeScript toolkit — utilities, API helpers, auth tools, **31 UI components** + WYSIWYG editor for Svelte 5 & React.

Frontend companion to [Karbon Framework](https://crates.io/crates/karbon-framework) (Rust backend).

## Packages

| Package | Description | Install |
|---|---|---|
| `@karbonjs/utils` | Date, string, number formatters, debounce, cookies | `pnpm add @karbonjs/utils` |
| `@karbonjs/types` | Shared TypeScript types (API, Auth) | `pnpm add @karbonjs/types` |
| `@karbonjs/api` | Type-safe API client, SSR + client, auto token refresh | `pnpm add @karbonjs/api` |
| `@karbonjs/auth` | Token manager, user cache, role hierarchy | `pnpm add @karbonjs/auth` |
| `@karbonjs/ui-core` | Design tokens CSS + shared prop types | `pnpm add @karbonjs/ui-core` |
| `@karbonjs/ui-svelte` | 31 Svelte 5 UI components + WYSIWYG editor (Tailwind) | `pnpm add @karbonjs/ui-svelte` |
| `@karbonjs/ui-react` | 30 React UI components (Tailwind) | `pnpm add @karbonjs/ui-react` |

## Quick Start

```bash
pnpm add @karbonjs/utils @karbonjs/ui-svelte
```

```svelte
<script>
  import { Button, Card, Modal } from '@karbonjs/ui-svelte'
  import { formatDate, timeAgo } from '@karbonjs/utils'
</script>

<Card title="Article" hoverable>
  <p>Publié {timeAgo('2026-03-14')}</p>
  <Button variant="primary" arrow>Lire la suite</Button>
</Card>
```

## UI Components (31)

### Editor
`RichTextEditor` — full WYSIWYG editor with toolbar, source mode, tables, embeds, media explorer (via `MediaProvider`)

### Form (9)
`FormInput` · `Select` · `Checkbox` · `Toggle` · `Radio` · `Textarea` · `Slider` · `DatePicker` · `ColorPicker`

### Button
`Button` — variants (primary, secondary, danger, ghost, outline), sizes, loading state, arrow animation, fullWidth

### Layout
`Card` · `PageHeader` · `EmptyState`

### Overlay
`Modal` · `Dialog` · `Toast` · `ImgBox`

### Image & Media
`Image` · `ImgZoom` · `Carousel`

### Navigation
`Dropdown` · `Accordion` · `Tabs` · `Breadcrumb`

### Feedback
`Tooltip` · `Avatar` · `Progress` · `Skeleton`

### Data
`DataTable` · `Pagination`

### Utility
`Badge` · `AlertMessage` · `Divider` · `Kbd`

## Theming

Components use CSS custom properties (`--karbon-*`) + Tailwind. Import design tokens:

```ts
import '@karbonjs/ui-core/css'
```

Dark/light theme support:

```html
<body data-theme="dark"> <!-- or class="karbon-dark" -->
```

See [docs/theming.md](docs/theming.md) for all available tokens.

## Documentation

- [Utils](docs/utils.md) — all utility functions with examples
- [API Client](docs/api.md) — SSR + client setup, token refresh
- [Auth](docs/auth.md) — roles, token manager, user cache
- [Components](docs/components.md) — all 31 components with props
- [Theming](docs/theming.md) — design tokens, dark/light mode

## Development

```bash
pnpm install          # Install deps
pnpm run build        # Build all packages
pnpm run test         # Run tests (68 tests, vitest)
pnpm run test:watch   # Watch mode
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
│   ├── ui-core/      → @karbonjs/ui-core    (0 deps)
│   ├── ui-svelte/    → @karbonjs/ui-svelte  (depends on ui-core, peer: svelte 5)
│   └── ui-react/     → @karbonjs/ui-react   (depends on ui-core, peer: react 18/19)
├── .github/workflows/ci.yml
├── vitest.config.ts
└── tsconfig.base.json
```

## Related

- [Karbon Framework](https://crates.io/crates/karbon-framework) — Rust backend (Axum + SQLx)

## License

MIT
