<script lang="ts">
  import type { SkeletonVariant } from '@karbonjs/ui-core'

  interface Props {
    variant?: SkeletonVariant
    width?: string
    height?: string
    lines?: number
    class?: string
    classes?: { root?: string }
  }

  let {
    variant = 'text',
    width = '100%',
    height,
    lines = 1,
    class: className = '',
    classes = {}
  }: Props = $props()

  const baseClass = 'animate-pulse bg-[var(--karbon-border,rgba(0,0,0,0.07))]'

  const variantDefaults: Record<string, { h: string; rounded: string }> = {
    text: { h: '0.875rem', rounded: 'rounded' },
    circle: { h: '3rem', rounded: 'rounded-full' },
    rect: { h: '8rem', rounded: 'rounded-lg' }
  }

  const v = $derived(variantDefaults[variant])
</script>

{#if variant === 'text' && lines > 1}
  <div class="space-y-2 {classes?.root ?? className}">
    {#each Array(lines) as _, i}
      <div
        class="{baseClass} {v.rounded}"
        style="width: {i === lines - 1 ? '66%' : width}; height: {height ?? v.h}"
      ></div>
    {/each}
  </div>
{:else if variant === 'circle'}
  <div
    class="{baseClass} {v.rounded} aspect-square {classes?.root ?? className}"
    style="width: {width === '100%' ? height ?? v.h : width}; height: {height ?? v.h}"
  ></div>
{:else}
  <div
    class="{baseClass} {v.rounded} {classes?.root ?? className}"
    style="width: {width}; height: {height ?? v.h}"
  ></div>
{/if}
