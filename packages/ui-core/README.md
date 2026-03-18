# @karbonjs/ui-core

Shared design tokens, CSS variables, and TypeScript prop types for Karbon UI components.

This package is used internally by `@karbonjs/ui-svelte` and `@karbonjs/ui-react`. You generally don't need to install it directly — it's pulled in automatically as a dependency.

## Install

```bash
npm install @karbonjs/ui-core
```

## Design Tokens (CSS)

```css
@import '@karbonjs/ui-core/css';

/* Available variables */
button {
  border-radius: var(--karbon-radius-md);
  font-family: var(--karbon-font-sans);
  transition: all var(--karbon-transition);
}
```

## Component Prop Types

```typescript
import type { ButtonProps, BadgeProps, AlertProps, ModalProps, PaginationProps } from '@karbonjs/ui-core'

// Use in your own component implementations
const props: ButtonProps = {
  variant: 'primary',
  size: 'md',
  loading: false,
}
```

## License

MIT
