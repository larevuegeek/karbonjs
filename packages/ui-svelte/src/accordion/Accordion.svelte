<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { AccordionItem } from '@karbonjs/ui-core'

  interface Props {
    items: AccordionItem[]
    multiple?: boolean
    class?: string
    children?: Snippet<[{ item: AccordionItem; index: number }]>
  }

  let {
    items,
    multiple = false,
    class: className = '',
    children
  }: Props = $props()

  let openIds = $state<Set<string>>(new Set())

  function toggle(id: string) {
    const next = new Set(openIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      if (!multiple) next.clear()
      next.add(id)
    }
    openIds = next
  }
</script>

<div class="rounded-xl border border-[var(--karbon-border,rgba(0,0,0,0.07))] overflow-hidden divide-y divide-[var(--karbon-border,rgba(0,0,0,0.07))] {className}">
  {#each items as item, index}
    <div>
      <button
        type="button"
        onclick={() => { if (!item.disabled) toggle(item.id) }}
        disabled={item.disabled}
        class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-left transition-colors
          text-[var(--karbon-text,#1a1635)] hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))]
          disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <span>{item.title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="shrink-0 text-[var(--karbon-text-4,#b5b2cc)] transition-transform duration-200 {openIds.has(item.id) ? 'rotate-180' : ''}"
        ><path d="m6 9 6 6 6-6"/></svg>
      </button>

      {#if openIds.has(item.id)}
        <div class="px-4 pb-3 text-sm text-[var(--karbon-text-2,#5a567e)]">
          {#if children}
            {@render children({ item, index })}
          {:else if item.content}
            <p>{item.content}</p>
          {/if}
        </div>
      {/if}
    </div>
  {/each}
</div>
