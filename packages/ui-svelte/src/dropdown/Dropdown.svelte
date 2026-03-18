<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { DropdownEntry, DropdownAlign } from '@karbonjs/ui-core'

  interface Props {
    items: DropdownEntry[]
    align?: DropdownAlign
    class?: string
    trigger: Snippet
    onselect?: (value: string) => void
  }

  let {
    items,
    align = 'left',
    class: className = '',
    trigger,
    onselect
  }: Props = $props()

  let open = $state(false)

  function handleSelect(item: DropdownEntry) {
    if ('divider' in item) return
    if (item.disabled) return
    onselect?.(item.value ?? item.label)
    open = false
  }
</script>

<svelte:window onclick={() => open = false} />

<div class="relative inline-block {className}">
  <button type="button" onclick={(e) => { e.stopPropagation(); open = !open }} class="cursor-pointer bg-transparent border-none p-0 m-0">
    {@render trigger()}
  </button>

  {#if open}
    <div class="absolute z-50 mt-1 min-w-[12rem] rounded-xl border border-[var(--karbon-border,rgba(0,0,0,0.07))] bg-[var(--karbon-bg-card,#fff)] shadow-xl py-1
      {align === 'right' ? 'right-0' : 'left-0'}">
      {#each items as item}
        {#if 'divider' in item}
          <div class="my-1 border-t border-[var(--karbon-border,rgba(0,0,0,0.07))]"></div>
        {:else}
          <button
            type="button"
            onclick={() => handleSelect(item)}
            disabled={item.disabled}
            class="w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors
              {item.danger ? 'text-red-400 hover:bg-red-500/8' : 'text-[var(--karbon-text,#1a1635)] hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))]'}
              disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {item.label}
          </button>
        {/if}
      {/each}
    </div>
  {/if}
</div>
