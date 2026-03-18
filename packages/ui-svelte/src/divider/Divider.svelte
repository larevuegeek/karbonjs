<script lang="ts">
  import type { DividerDirection } from '@karbonjs/ui-core'

  interface Props {
    direction?: DividerDirection
    label?: string
    class?: string
  }

  let {
    direction = 'horizontal',
    label = '',
    class: className = ''
  }: Props = $props()
</script>

{#if direction === 'vertical'}
  <div class="inline-block w-px self-stretch bg-[var(--karbon-border,rgba(0,0,0,0.07))] {className}"></div>
{:else if label}
  <div class="flex items-center gap-3 {className}">
    <div class="flex-1 h-px bg-[var(--karbon-border,rgba(0,0,0,0.07))]"></div>
    <span class="text-xs text-[var(--karbon-text-4,#b5b2cc)] font-medium shrink-0">{label}</span>
    <div class="flex-1 h-px bg-[var(--karbon-border,rgba(0,0,0,0.07))]"></div>
  </div>
{:else}
  <div class="w-full h-px bg-[var(--karbon-border,rgba(0,0,0,0.07))] {className}"></div>
{/if}
