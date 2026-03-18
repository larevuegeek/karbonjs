<script lang="ts">
  import type { BreadcrumbItem } from '@karbonjs/ui-core'

  interface Props {
    items: BreadcrumbItem[]
    separator?: string
    class?: string
  }

  let {
    items,
    separator = '/',
    class: className = ''
  }: Props = $props()
</script>

<nav aria-label="Breadcrumb" class={className}>
  <ol class="flex items-center gap-1.5 text-sm">
    {#each items as item, i}
      {#if i > 0}
        <li class="text-[var(--karbon-text-4,#b5b2cc)] select-none" aria-hidden="true">{separator}</li>
      {/if}
      <li>
        {#if item.href && i < items.length - 1}
          <a href={item.href} class="text-[var(--karbon-text-3,#8e8aae)] hover:text-[var(--karbon-text,#1a1635)] transition-colors">
            {item.label}
          </a>
        {:else}
          <span class="text-[var(--karbon-text,#1a1635)] font-medium">{item.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
