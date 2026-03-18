# KarbonJS — Project Instructions

## Project Overview

KarbonJS is a **monorepo** of TypeScript packages providing utilities, API helpers, auth tools, and **30 UI components** for full-stack web applications. Frontend companion to [Karbon Framework](https://crates.io/crates/karbon-framework) (Rust backend).

## Architecture

```
karbonjs/
├── packages/
│   ├── utils/       → @karbonjs/utils      (TS pur, 0 deps)
│   ├── types/       → @karbonjs/types      (TS pur, 0 deps, split: api.ts + auth.ts)
│   ├── api/         → @karbonjs/api        (split: client/ + server/)
│   ├── auth/        → @karbonjs/auth       (split: roles/ + token/ + cache/)
│   ├── ui-core/     → @karbonjs/ui-core    (CSS + types/, 1 file par type)
│   ├── ui-svelte/   → @karbonjs/ui-svelte  (30 Svelte 5 components, Tailwind)
│   └── ui-react/    → @karbonjs/ui-react   (30 React components, Tailwind)
├── docs/            → Documentation (utils, api, auth, components, theming)
├── .github/workflows/ci.yml
├── vitest.config.ts
└── tsconfig.base.json
```

### UI Component Structure (ui-svelte & ui-react)

Each component or component family in its own folder:

```
src/
├── accordion/    → Accordion
├── alert/        → AlertMessage
├── avatar/       → Avatar
├── badge/        → Badge
├── breadcrumb/   → Breadcrumb
├── button/       → Button
├── carousel/     → Carousel
├── data/         → DataTable, Pagination
├── divider/      → Divider
├── dropdown/     → Dropdown
├── form/         → FormInput, Select, Checkbox, Toggle, Textarea, Radio, Slider, DatePicker, ColorPicker
├── image/        → Image, ImgZoom
├── kbd/          → Kbd
├── layout/       → Card, PageHeader, EmptyState
├── overlay/      → Modal, Dialog, Toast, ImgBox
├── progress/     → Progress
├── skeleton/     → Skeleton
├── tabs/         → Tabs
├── tooltip/      → Tooltip
└── index.ts      → barrel exports
```

### ui-core Type Structure

```
ui-core/src/types/
├── accordion.ts, alert.ts, avatar.ts, badge.ts, breadcrumb.ts, button.ts
├── card.ts, carousel.ts, data.ts, divider.ts, dropdown.ts, form.ts
├── image.ts, kbd.ts, layout.ts, overlay.ts, progress.ts, skeleton.ts
├── tabs.ts, tooltip.ts
└── index.ts → barrel re-export
```

## Key Design Decisions

- **Framework-agnostic core**: utils, types, api, auth are pure TypeScript
- **Monorepo with pnpm workspaces**: all packages share TypeScript config
- **Tailwind CSS only**: NO `<style>` blocks, NO inline styles — exclusively Tailwind + `[var(--karbon-*)]` arbitrary values
- **No icon dependency**: SVG icons inlined in components
- **Locale support**: default `fr-FR`, always configurable
- **SSR + Client API**: auto token refresh with timeout and deduplication
- **1 folder = 1 component** (standalone) or 1 family (form/, overlay/, etc.)

## npm Organization

Published under `@karbonjs` scope on npm.

## Related Projects

- **Karbon Framework** (Rust): `J:\wamp\www\__rust\karbon\`
- **LaRevueGeek** (app using Karbon): `J:\wamp\www\__rust\larevuegeek.com\`

## Development Commands

```bash
pnpm install          # Install all deps
pnpm run build        # Build all packages
pnpm run test         # Run tests (68 tests, vitest)
pnpm run test:watch   # Watch mode
pnpm run publish:all  # Publish to npm
```

## What's Done

- [x] @karbonjs/utils — date, string, number, debounce (with cancel), cookie, isImage
- [x] @karbonjs/types — api.ts (ApiList, ApiResult, ApiError, ApiCallOptions, PaginationParams) + auth.ts (AuthUser)
- [x] @karbonjs/api — createServerApi + createClientApi (timeout, refresh dedup, error truncation)
- [x] @karbonjs/auth — roles (hasRole, isAdmin, highestRole), tokenManager (with AbortController), userCache (with purgeExpired)
- [x] @karbonjs/ui-core — design tokens CSS (colors, spacing, shadows, dark/light), 20 type files
- [x] @karbonjs/ui-svelte — 30 Svelte 5 components, Tailwind only, a11y labels
- [x] @karbonjs/ui-react — 30 React components, same set
- [x] Testing — 68 tests (vitest) across utils, auth, api
- [x] CI/CD — GitHub Actions (test Node 18/20/22, publish on main)
- [x] Security audit — ReDoS fix, timer cleanup, token validation, error truncation, SameSite enforcement
- [x] Documentation — docs/ (utils, api, auth, components, theming)

## What's Missing / TODO

- Add more tests for new components
- Add Storybook or component playground
- Consider `@karbonjs/hooks` (React: useAuth, useApi)
- Consider `@karbonjs/stores` (Svelte: auth, theme stores)

## Code Style

- No semicolons in TypeScript
- 2-space indentation
- Use `export function` not `export const fn =`
- JSDoc comments on all public functions
- Locale parameters default to `fr-FR` but always accept override
- CSS custom properties prefixed with `--karbon-`
- Tailwind only in components — no `<style>` blocks, no inline `style={}`
- `aria-label` on all icon-only buttons/links
