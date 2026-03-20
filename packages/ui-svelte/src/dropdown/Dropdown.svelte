<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface DropdownItem {
    label: string
    value?: string
    icon?: string
    description?: string
    badge?: string
    danger?: boolean
    disabled?: boolean
    divider?: boolean
    group?: string
  }

  interface Props {
    items: DropdownItem[]
    align?: 'left' | 'right'
    position?: 'bottom' | 'top'
    width?: string
    color?: ButtonColor
    searchable?: boolean
    searchPlaceholder?: string
    class?: string
    classes?: { root?: string, menu?: string, item?: string, group?: string, search?: string }
    trigger: Snippet
    onselect?: (value: string, item: DropdownItem) => void
  }

  let {
    items,
    align = 'left',
    position = 'bottom',
    width = '14rem',
    color,
    searchable = false,
    searchPlaceholder = 'Rechercher...',
    class: className = '',
    classes = {},
    trigger,
    onselect
  }: Props = $props()

  let open = $state(false)
  let search = $state('')
  let menuEl: HTMLDivElement | undefined = $state()
  let focusIndex = $state(-1)

  function sanitizeSvg(html: string): string {
    return html.replace(/on\w+\s*=/gi, '').replace(/<script/gi, '&lt;script')
  }

  const accent = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')

  const filteredItems = $derived(
    searchable && search
      ? items.filter(i => !i.divider && i.label.toLowerCase().includes(search.toLowerCase()))
      : items
  )

  // Group items
  const groupedItems = $derived.by(() => {
    const groups: { label: string | null, items: DropdownItem[] }[] = []
    let currentGroup: string | null = null
    for (const item of filteredItems) {
      if (item.group && item.group !== currentGroup) {
        currentGroup = item.group
        groups.push({ label: currentGroup, items: [] })
      }
      if (groups.length === 0) groups.push({ label: null, items: [] })
      groups[groups.length - 1].items.push(item)
    }
    return groups
  })

  function toggle(e: MouseEvent) {
    e.stopPropagation()
    open = !open
    if (open) { search = ''; focusIndex = -1 }
  }

  function select(item: DropdownItem) {
    if (item.divider || item.disabled) return
    onselect?.(item.value ?? item.label, item)
    open = false
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open) return
    const selectableItems = filteredItems.filter(i => !i.divider && !i.disabled)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      focusIndex = Math.min(focusIndex + 1, selectableItems.length - 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      focusIndex = Math.max(focusIndex - 1, 0)
    } else if (e.key === 'Enter' && focusIndex >= 0) {
      e.preventDefault()
      select(selectableItems[focusIndex])
    } else if (e.key === 'Escape') {
      open = false
    }
  }

  function clickOutside(e: MouseEvent) {
    if (menuEl && !menuEl.contains(e.target as Node)) open = false
  }

  const posClass = $derived(position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1')
  const alignClass = $derived(align === 'right' ? 'right-0' : 'left-0')
</script>

<svelte:window onclick={clickOutside} onkeydown={handleKeydown} />

<div class="relative inline-block {classes?.root ?? className}" bind:this={menuEl}>
  <!-- Trigger -->
  <button type="button" onclick={toggle} class="cursor-pointer bg-transparent border-none p-0 m-0">
    {@render trigger()}
  </button>

  <!-- Menu -->
  {#if open}
    <div
      class="absolute z-50 {posClass} {alignClass} rounded-xl overflow-hidden {classes?.menu ?? ''}"
      style="min-width:{width};background:var(--karbon-bg-card);border:1px solid var(--karbon-border);box-shadow:0 10px 40px rgba(0,0,0,0.25);animation:karbon-dropdown-in 0.15s cubic-bezier(0.16,1,0.3,1);"
      role="menu"
    >
      <!-- Search -->
      {#if searchable}
        <div class="p-2 {classes?.search ?? ''}" style="border-bottom:1px solid var(--karbon-border);">
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-2.5 top-1/2 -translate-y-1/2" style="color:var(--karbon-text-4);"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              bind:value={search}
              placeholder={searchPlaceholder}
              class="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none"
              style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);color:var(--karbon-text);"
              onclick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      {/if}

      <!-- Items -->
      <div class="py-1 max-h-72 overflow-y-auto">
        {#if filteredItems.length === 0}
          <div class="px-3 py-4 text-center text-xs" style="color:var(--karbon-text-4);">Aucun resultat</div>
        {:else}
          {#each groupedItems as group}
            {#if group.label}
              <div class="px-3 pt-2 pb-1 {classes?.group ?? ''}">
                <span class="text-[10px] font-semibold uppercase tracking-wider" style="color:var(--karbon-text-4);">{group.label}</span>
              </div>
            {/if}
            {#each group.items as item}
              {#if item.divider}
                <div class="my-1" style="border-top:1px solid var(--karbon-border);"></div>
              {:else}
                {@const isFocused = focusIndex >= 0 && filteredItems.filter(i => !i.divider && !i.disabled).indexOf(item) === focusIndex}
                <button
                  type="button"
                  onclick={(e) => { e.stopPropagation(); select(item) }}
                  disabled={item.disabled}
                  class="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors
                    disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer {classes?.item ?? ''}"
                  style="color:{item.danger ? 'var(--karbon-red-400)' : 'var(--karbon-text)'};background:{isFocused ? 'var(--karbon-nav-hover-bg)' : 'transparent'};"
                  onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = item.danger ? 'color-mix(in srgb, var(--karbon-red-500) 8%, transparent)' : 'var(--karbon-nav-hover-bg)'; focusIndex = -1 }}
                  onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                  role="menuitem"
                >
                  {#if item.icon}
                    <span class="shrink-0 opacity-60">{@html sanitizeSvg(item.icon)}</span>
                  {/if}
                  <div class="flex-1 min-w-0">
                    <span class="block">{item.label}</span>
                    {#if item.description}
                      <span class="block text-[11px] mt-0.5" style="color:var(--karbon-text-4);">{item.description}</span>
                    {/if}
                  </div>
                  {#if item.badge}
                    <span
                      class="shrink-0 rounded-full px-1.5 py-px text-[10px] font-medium"
                      style="background:color-mix(in srgb,{accent} 15%,transparent);color:{accent};"
                    >{item.badge}</span>
                  {/if}
                </button>
              {/if}
            {/each}
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  @keyframes karbon-dropdown-in {
    from { opacity: 0; transform: translateY(-4px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
</style>
