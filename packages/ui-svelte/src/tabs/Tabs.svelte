<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface TabItem {
    id: string
    label: string
    icon?: string
    badge?: string | number
    disabled?: boolean
  }

  interface Props {
    tabs: TabItem[]
    active?: string
    variant?: 'underline' | 'pills' | 'bordered' | 'segment'
    color?: ButtonColor
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    vertical?: boolean
    class?: string
    classes?: { root?: string, list?: string, tab?: string, panel?: string, indicator?: string }
    onchange?: (id: string) => void
    panel?: Snippet<[string]>
  }

  let {
    tabs,
    active = $bindable(tabs[0]?.id ?? ''),
    variant = 'underline',
    color,
    size = 'md',
    fullWidth = false,
    vertical = false,
    class: className = '',
    classes = {},
    onchange,
    panel
  }: Props = $props()

  let listEl: HTMLElement

  const accent = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')
  const accentLight = $derived(color ? `var(--karbon-${color}-400)` : 'var(--karbon-primary)')

  const sizeMap = {
    sm: { px: 'px-3', py: 'py-1.5', text: 'text-xs', badge: 'text-[9px] px-1 py-px', gap: 'gap-1.5' },
    md: { px: 'px-4', py: 'py-2.5', text: 'text-sm', badge: 'text-[10px] px-1.5 py-px', gap: 'gap-2' },
    lg: { px: 'px-5', py: 'py-3', text: 'text-base', badge: 'text-xs px-1.5 py-0.5', gap: 'gap-2' },
  }
  const s = $derived(sizeMap[size])

  function sanitizeSvg(html: string): string {
    return html.replace(/on\w+\s*=/gi, '').replace(/<script/gi, '&lt;script')
  }

  function select(id: string) {
    active = id
    onchange?.(id)
  }

  function tabStyle(isActive: boolean): string {
    switch (variant) {
      case 'underline':
        return isActive
          ? `color:${accent};`
          : 'color:var(--karbon-text-3);'
      case 'pills':
        return isActive
          ? `background:${accent};color:white;`
          : 'color:var(--karbon-text-3);background:transparent;'
      case 'bordered':
        return isActive
          ? `background:var(--karbon-bg-card);color:${accent};border-color:var(--karbon-border);border-bottom-color:var(--karbon-bg-card);`
          : 'color:var(--karbon-text-3);border-color:transparent;'
      case 'segment':
        return isActive
          ? `background:var(--karbon-bg-card);color:${accent};box-shadow:0 1px 3px rgba(0,0,0,0.1);`
          : 'color:var(--karbon-text-3);background:transparent;'
      default: return ''
    }
  }

  function listStyle(): string {
    switch (variant) {
      case 'underline': return `border-bottom:1px solid var(--karbon-border);`
      case 'pills': return ''
      case 'bordered': return `border-bottom:1px solid var(--karbon-border);`
      case 'segment': return `background:var(--karbon-bg-2);padding:3px;border-radius:0.625rem;`
      default: return ''
    }
  }

  function tabShapeClass(): string {
    switch (variant) {
      case 'pills': return 'rounded-lg'
      case 'bordered': return 'rounded-t-lg border border-b-0'
      case 'segment': return 'rounded-lg'
      default: return ''
    }
  }
</script>

<div class="{vertical ? 'flex gap-4' : ''} {classes?.root ?? className}">
  <!-- Tab list -->
  <div
    bind:this={listEl}
    class="{vertical ? 'flex flex-col shrink-0' : 'flex'} {fullWidth && !vertical ? '[&>*]:flex-1' : ''} {s.gap} {classes?.list ?? ''}"
    style={listStyle()}
    role="tablist"
    aria-orientation={vertical ? 'vertical' : 'horizontal'}
  >
    {#each tabs as tab}
      {@const isActive = active === tab.id}
      <button
        type="button"
        role="tab"
        aria-selected={isActive}
        onclick={() => { if (!tab.disabled) select(tab.id) }}
        disabled={tab.disabled}
        class="relative {s.px} {s.py} {s.text} font-medium transition-all cursor-pointer
          disabled:opacity-30 disabled:cursor-not-allowed
          {tabShapeClass()}
          {fullWidth ? 'text-center' : ''}
          inline-flex items-center {s.gap} whitespace-nowrap
          {classes?.tab ?? ''}"
        style={tabStyle(isActive)}
        onmouseenter={(e) => { if (!isActive && !tab.disabled) (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-2)' }}
        onmouseleave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.cssText = tabStyle(isActive) }}
      >
        {#if tab.icon}
          <span class="shrink-0">{@html sanitizeSvg(tab.icon)}</span>
        {/if}
        <span>{tab.label}</span>
        {#if tab.badge != null}
          <span
            class="rounded-full font-semibold {s.badge}"
            style="background:{isActive ? `color-mix(in srgb,${accent} 20%,transparent)` : 'var(--karbon-bg-2)'};color:{isActive ? accent : 'var(--karbon-text-3)'};"
          >{tab.badge}</span>
        {/if}

        <!-- Underline indicator -->
        {#if variant === 'underline' && isActive}
          <span
            class="absolute {vertical ? 'right-0 top-0 bottom-0 w-0.5' : 'bottom-0 left-0 right-0 h-0.5'} {classes?.indicator ?? ''}"
            style="background:{accent};border-radius:1px;animation:karbon-tab-indicator 0.2s ease;"
          ></span>
        {/if}
      </button>
    {/each}
  </div>

  <!-- Panel -->
  {#if panel}
    <div class="{vertical ? 'flex-1' : 'mt-4'} {classes?.panel ?? ''}" role="tabpanel" style="animation:karbon-tab-panel 0.2s ease;">
      {@render panel(active)}
    </div>
  {/if}
</div>

<style>
  @keyframes karbon-tab-indicator {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  @keyframes karbon-tab-panel {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
