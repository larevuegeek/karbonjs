<script lang="ts">
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    page: number
    total: number
    perPage?: number
    /** If set, renders <a> links instead of buttons */
    baseUrl?: string
    color?: ButtonColor
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'outline' | 'flat' | 'minimal'
    showTotal?: boolean
    showFirstLast?: boolean
    showInfo?: boolean
    siblings?: number
    class?: string
    classes?: { root?: string, button?: string, active?: string, info?: string }
    onchange?: (page: number) => void
  }

  let {
    page = $bindable(1),
    total,
    perPage = 20,
    baseUrl,
    color,
    size = 'md',
    variant = 'default',
    showTotal = true,
    showFirstLast = true,
    showInfo = true,
    siblings = 1,
    class: className = '',
    classes = {},
    onchange
  }: Props = $props()

  const accent = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')
  const totalPages = $derived(Math.max(1, Math.ceil(total / perPage)))

  // Generate page numbers with ellipsis
  const pages = $derived.by(() => {
    const items: (number | '...')[] = []
    const left = Math.max(2, page - siblings)
    const right = Math.min(totalPages - 1, page + siblings)

    items.push(1)
    if (left > 2) items.push('...')
    for (let i = left; i <= right; i++) items.push(i)
    if (right < totalPages - 1) items.push('...')
    if (totalPages > 1) items.push(totalPages)

    return items
  })

  const sizeMap = {
    sm: { btn: 'w-7 h-7 text-xs', arrow: 'w-7 h-7', icon: 14, gap: 'gap-0.5' },
    md: { btn: 'w-8 h-8 text-sm', arrow: 'w-8 h-8', icon: 16, gap: 'gap-1' },
    lg: { btn: 'w-10 h-10 text-base', arrow: 'w-10 h-10', icon: 18, gap: 'gap-1.5' },
  }
  const s = $derived(sizeMap[size])

  function go(p: number) {
    if (p < 1 || p > totalPages || p === page) return
    page = p
    onchange?.(p)
  }

  function btnStyle(p: number): string {
    const isActive = p === page
    switch (variant) {
      case 'default':
        return isActive
          ? `background:${accent};color:white;`
          : 'background:transparent;color:var(--karbon-text-3);'
      case 'outline':
        return isActive
          ? `background:transparent;color:${accent};border:1.5px solid ${accent};`
          : 'background:transparent;color:var(--karbon-text-3);border:1.5px solid transparent;'
      case 'flat':
        return isActive
          ? `background:color-mix(in srgb,${accent} 15%,transparent);color:${accent};`
          : 'background:transparent;color:var(--karbon-text-3);'
      case 'minimal':
        return isActive
          ? `background:transparent;color:${accent};font-weight:700;`
          : 'background:transparent;color:var(--karbon-text-3);'
      default: return ''
    }
  }

  function arrowStyle(enabled: boolean): string {
    return enabled
      ? 'color:var(--karbon-text-2);cursor:pointer;'
      : 'color:var(--karbon-text-4);opacity:0.4;cursor:not-allowed;pointer-events:none;'
  }

  const startItem = $derived((page - 1) * perPage + 1)
  const endItem = $derived(Math.min(page * perPage, total))
</script>

{#if totalPages > 1 || showInfo}
  <nav class="flex items-center justify-between flex-wrap gap-3 {classes?.root ?? className}">
    <!-- Info -->
    {#if showInfo}
      <span class="text-xs" style="color: var(--karbon-text-4);">
        {startItem}–{endItem} sur {total}
      </span>
    {/if}

    <div class="flex items-center {s.gap}">
      <!-- First -->
      {#if showFirstLast}
        {#if baseUrl}
          <a href="{baseUrl}?page=1" class="inline-flex items-center justify-center rounded-lg transition-colors {s.arrow} {classes?.button ?? ''}" style={arrowStyle(page > 1)} aria-label="Premiere page">
            <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
          </a>
        {:else}
          <button onclick={() => go(1)} disabled={page <= 1} class="inline-flex items-center justify-center rounded-lg transition-colors {s.arrow} {classes?.button ?? ''}" style={arrowStyle(page > 1)} aria-label="Premiere page">
            <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
          </button>
        {/if}
      {/if}

      <!-- Prev -->
      {#if baseUrl}
        <a href="{baseUrl}?page={Math.max(1, page - 1)}" class="inline-flex items-center justify-center rounded-lg transition-colors {s.arrow} {classes?.button ?? ''}" style={arrowStyle(page > 1)} aria-label="Page precedente">
          <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </a>
      {:else}
        <button onclick={() => go(page - 1)} disabled={page <= 1} class="inline-flex items-center justify-center rounded-lg transition-colors {s.arrow} {classes?.button ?? ''}" style={arrowStyle(page > 1)} aria-label="Page precedente">
          <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      {/if}

      <!-- Pages -->
      {#each pages as p}
        {#if p === '...'}
          <span class="{s.btn} inline-flex items-center justify-center" style="color: var(--karbon-text-4);">…</span>
        {:else if baseUrl}
          <a
            href="{baseUrl}?page={p}"
            class="inline-flex items-center justify-center rounded-lg font-medium transition-all {s.btn} {p === page ? classes?.active ?? '' : classes?.button ?? ''}"
            style={btnStyle(p)}
            onmouseenter={(e) => { if (p !== page) (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)' }}
            onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.cssText = btnStyle(p) }}
          >{p}</a>
        {:else}
          <button
            onclick={() => go(p)}
            class="inline-flex items-center justify-center rounded-lg font-medium transition-all cursor-pointer {s.btn} {p === page ? classes?.active ?? '' : classes?.button ?? ''}"
            style={btnStyle(p)}
            onmouseenter={(e) => { if (p !== page) (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)' }}
            onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.cssText = btnStyle(p) }}
          >{p}</button>
        {/if}
      {/each}

      <!-- Next -->
      {#if baseUrl}
        <a href="{baseUrl}?page={Math.min(totalPages, page + 1)}" class="inline-flex items-center justify-center rounded-lg transition-colors {s.arrow} {classes?.button ?? ''}" style={arrowStyle(page < totalPages)} aria-label="Page suivante">
          <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </a>
      {:else}
        <button onclick={() => go(page + 1)} disabled={page >= totalPages} class="inline-flex items-center justify-center rounded-lg transition-colors {s.arrow} {classes?.button ?? ''}" style={arrowStyle(page < totalPages)} aria-label="Page suivante">
          <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      {/if}

      <!-- Last -->
      {#if showFirstLast}
        {#if baseUrl}
          <a href="{baseUrl}?page={totalPages}" class="inline-flex items-center justify-center rounded-lg transition-colors {s.arrow} {classes?.button ?? ''}" style={arrowStyle(page < totalPages)} aria-label="Derniere page">
            <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 17 5-5-5-5"/><path d="m6 17 5-5-5-5"/></svg>
          </a>
        {:else}
          <button onclick={() => go(totalPages)} disabled={page >= totalPages} class="inline-flex items-center justify-center rounded-lg transition-colors {s.arrow} {classes?.button ?? ''}" style={arrowStyle(page < totalPages)} aria-label="Derniere page">
            <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 17 5-5-5-5"/><path d="m6 17 5-5-5-5"/></svg>
          </button>
        {/if}
      {/if}
    </div>
  </nav>
{/if}
