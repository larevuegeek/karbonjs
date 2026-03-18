# Theming

KarbonJS components use CSS custom properties (`--karbon-*`) for theming, combined with Tailwind CSS utility classes.

## Setup

Import the design tokens in your app's entry point:

```ts
import '@karbonjs/ui-core/css'
```

## Dark / Light Mode

Activate with `data-theme` attribute or class:

```html
<!-- Attribute -->
<body data-theme="dark">

<!-- Or class -->
<body class="karbon-dark">
<body class="karbon-light">
```

## CSS Variables

### Colors

| Variable | Dark | Light | Usage |
|---|---|---|---|
| `--karbon-primary` | `#cc1a1a` | `#cc1a1a` | Primary actions, active states |
| `--karbon-primary-hover` | `#a81515` | `#a81515` | Primary hover |
| `--karbon-secondary` | `#0ea5e9` | `#0ea5e9` | Secondary actions |
| `--karbon-danger` | `#ef4444` | `#ef4444` | Destructive actions |
| `--karbon-success` | `#22c55e` | `#22c55e` | Success states |
| `--karbon-warning` | `#f59e0b` | `#f59e0b` | Warning states |
| `--karbon-info` | `#3b82f6` | `#3b82f6` | Info states |

### Backgrounds

| Variable | Dark | Light |
|---|---|---|
| `--karbon-bg` | `#060412` | `#f2f0fa` |
| `--karbon-bg-2` | `#080515` | `#e8e6f0` |
| `--karbon-bg-card` | `#0a0820` | `#ffffff` |
| `--karbon-bg-input` | `rgba(255,255,255,0.06)` | `#ffffff` |
| `--karbon-nav-hover-bg` | `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.04)` |

### Text

| Variable | Dark | Light |
|---|---|---|
| `--karbon-text` | `rgba(255,255,255,0.90)` | `#1a1635` |
| `--karbon-text-2` | `rgba(255,255,255,0.50)` | `#5a567e` |
| `--karbon-text-3` | `rgba(255,255,255,0.30)` | `#8e8aae` |
| `--karbon-text-4` | `rgba(255,255,255,0.18)` | `#b5b2cc` |

### Borders

| Variable | Dark | Light |
|---|---|---|
| `--karbon-border` | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.07)` |
| `--karbon-border-input` | `rgba(255,255,255,0.10)` | `rgba(0,0,0,0.12)` |
| `--karbon-border-input-focus` | `rgba(204,26,26,0.5)` | `rgba(204,26,26,0.5)` |

### Spacing

| Variable | Value |
|---|---|
| `--karbon-space-xs` | `0.25rem` |
| `--karbon-space-sm` | `0.5rem` |
| `--karbon-space-md` | `1rem` |
| `--karbon-space-lg` | `1.5rem` |
| `--karbon-space-xl` | `2rem` |

### Radius

| Variable | Value |
|---|---|
| `--karbon-radius-sm` | `0.25rem` |
| `--karbon-radius-md` | `0.5rem` |
| `--karbon-radius-lg` | `0.75rem` |
| `--karbon-radius-xl` | `1rem` |
| `--karbon-radius-full` | `9999px` |

### Shadows

| Variable | Value |
|---|---|
| `--karbon-shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` |
| `--karbon-shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` |
| `--karbon-shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` |
| `--karbon-shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1)` |

### Other

| Variable | Value |
|---|---|
| `--karbon-font-sans` | System UI sans-serif stack |
| `--karbon-font-mono` | System UI monospace stack |
| `--karbon-transition` | `150ms cubic-bezier(0.4, 0, 0.2, 1)` |

## Customizing

Override any variable in your CSS:

```css
:root {
  --karbon-primary: #6366f1;       /* Indigo instead of red */
  --karbon-primary-hover: #4f46e5;
  --karbon-radius-md: 0.75rem;     /* Rounder corners */
}
```

## Tailwind Integration

Components use Tailwind utilities with `[var(--karbon-*)]` arbitrary values:

```html
<div class="bg-[var(--karbon-bg-card)] text-[var(--karbon-text)] rounded-xl">
```

This means components automatically adapt to your theme tokens without any Tailwind config changes.
