<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { TabItem } from '@karbonjs/ui-core'

  interface Props {
    tabs: TabItem[]
    active?: string
    class?: string
    onchange?: (id: string) => void
    children?: Snippet<[{ tab: TabItem }]>
  }

  let {
    tabs,
    active = $bindable(tabs[0]?.id ?? ''),
    class: className = '',
    onchange,
    children
  }: Props = $props()

  function select(id: string) {
    active = id
    onchange?.(id)
  }
</script>

<div class={className}>
  <div class="flex border-b border-[var(--karbon-border,rgba(0,0,0,0.07))]" role="tablist">
    {#each tabs as tab}
      <button
        type="button"
        role="tab"
        aria-selected={active === tab.id}
        onclick={() => { if (!tab.disabled) select(tab.id) }}
        disabled={tab.disabled}
        class="px-4 py-2.5 text-sm font-medium transition-colors relative cursor-pointer
          disabled:opacity-40 disabled:cursor-not-allowed
          {active === tab.id
            ? 'text-[var(--karbon-primary)]'
            : 'text-[var(--karbon-text-3,#8e8aae)] hover:text-[var(--karbon-text,#1a1635)]'}"
      >
        {tab.label}
        {#if active === tab.id}
          <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--karbon-primary)]"></span>
        {/if}
      </button>
    {/each}
  </div>

  {#if children}
    {#each tabs as tab}
      {#if active === tab.id}
        <div class="pt-4" role="tabpanel">
          {@render children({ tab })}
        </div>
      {/if}
    {/each}
  {/if}
</div>
