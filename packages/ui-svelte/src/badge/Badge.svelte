<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { BadgeVariant } from '@karbonjs/ui-core'

  interface Props {
    variant?: BadgeVariant
    class?: string
    children: Snippet
  }

  let { variant = 'default', class: className = '', children }: Props = $props()

  const variants: Record<string, string> = {
    default: 'bg-[var(--karbon-bg-2,rgba(255,255,255,0.08))] text-[var(--karbon-text-2,#a1a1aa)]',
    success: 'bg-emerald-500/15 text-emerald-500',
    warning: 'bg-amber-500/15 text-amber-500',
    danger: 'bg-red-500/15 text-red-500',
    info: 'bg-blue-500/15 text-blue-500'
  }
</script>

<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {variants[variant]} {className}">
  {@render children()}
</span>
