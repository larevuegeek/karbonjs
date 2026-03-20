<script lang="ts">
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface BreadcrumbItem {
    label: string
    href?: string
    icon?: string
  }

  interface Props {
    items: BreadcrumbItem[]
    separator?: 'chevron' | 'slash' | 'dot' | 'arrow' | 'dash' | string
    variant?: 'default' | 'pills' | 'bordered'
    color?: ButtonColor
    size?: 'sm' | 'md' | 'lg'
    collapse?: number
    class?: string
    classes?: { root?: string, item?: string, separator?: string, active?: string, link?: string }
  }

  let {
    items,
    separator = 'chevron',
    variant = 'default',
    color,
    size = 'md',
    collapse = 0,
    class: className = '',
    classes = {}
  }: Props = $props()

  function sanitizeSvg(html: string): string {
    return html.replace(/on\w+\s*=/gi, '').replace(/<script/gi, '&lt;script')
  }

  const accent = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')

  const sizeMap = {
    sm: { text: 'text-xs', gap: 'gap-1', icon: 12, sepSize: 10, px: 'px-1.5 py-0.5' },
    md: { text: 'text-sm', gap: 'gap-1.5', icon: 14, sepSize: 12, px: 'px-2 py-0.5' },
    lg: { text: 'text-base', gap: 'gap-2', icon: 16, sepSize: 14, px: 'px-2.5 py-1' },
  }
  const s = $derived(sizeMap[size])

  const separators: Record<string, string> = {
    chevron: '<path d="m9 18 6-6-6-6"/>',
    slash: '<line x1="16" y1="4" x2="8" y2="20"/>',
    dot: '<circle cx="12" cy="12" r="3"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    dash: '<line x1="5" y1="12" x2="19" y2="12"/>',
  }

  // Collapse: show first, ellipsis, then last N items
  const displayItems = $derived.by(() => {
    if (collapse <= 0 || items.length <= collapse + 2) return items
    return [
      items[0],
      { label: '...', href: undefined, icon: undefined } as BreadcrumbItem,
      ...items.slice(-(collapse))
    ]
  })

  let expanded = $state(false)
  const finalItems = $derived(expanded ? items : displayItems)
</script>

<nav aria-label="Breadcrumb" class="{classes?.root ?? className}">
  <ol class="flex flex-wrap items-center {s.gap} {s.text}">
    {#each finalItems as item, i}
      {@const isLast = i === finalItems.length - 1}
      {@const isEllipsis = item.label === '...'}

      {#if i > 0}
        <li class="select-none {classes?.separator ?? ''}" aria-hidden="true" style="color:var(--karbon-text-4);">
          {#if separators[separator]}
            <svg xmlns="http://www.w3.org/2000/svg" width={s.sepSize} height={s.sepSize} viewBox="0 0 24 24" fill={separator === 'dot' ? 'currentColor' : 'none'} stroke={separator === 'dot' ? 'none' : 'currentColor'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{@html separators[separator]}</svg>
          {:else}
            <span>{separator}</span>
          {/if}
        </li>
      {/if}

      <li class="{classes?.item ?? ''}">
        {#if isEllipsis}
          <button
            onclick={() => expanded = true}
            class="rounded-md transition-colors cursor-pointer {s.px}"
            style="color:var(--karbon-text-3);"
            onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)' }}
            onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            aria-label="Afficher le chemin complet"
          >···</button>
        {:else if isLast}
          <!-- Active (last) item -->
          {#if variant === 'pills'}
            <span
              class="inline-flex items-center {s.gap} rounded-full font-medium {s.px}"
              style="background:color-mix(in srgb,{accent} 15%,transparent);color:{accent};"
            >
              {#if item.icon}<span class="shrink-0">{@html sanitizeSvg(item.icon)}</span>{/if}
              {item.label}
            </span>
          {:else if variant === 'bordered'}
            <span
              class="inline-flex items-center {s.gap} rounded-md font-medium {s.px}"
              style="border:1px solid {accent};color:{accent};"
            >
              {#if item.icon}<span class="shrink-0">{@html sanitizeSvg(item.icon)}</span>{/if}
              {item.label}
            </span>
          {:else}
            <span
              class="inline-flex items-center {s.gap} font-semibold {classes?.active ?? ''}"
              style="color:{color ? accent : 'var(--karbon-text)'};"
            >
              {#if item.icon}<span class="shrink-0">{@html sanitizeSvg(item.icon)}</span>{/if}
              {item.label}
            </span>
          {/if}
        {:else}
          <!-- Link item -->
          <a
            href={item.href || '#'}
            class="inline-flex items-center {s.gap} transition-colors {classes?.link ?? ''} {variant === 'pills' ? `rounded-full ${s.px}` : ''} {variant === 'bordered' ? `rounded-md ${s.px}` : ''}"
            style="color:var(--karbon-text-3);"
            onmouseenter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.color = color ? accent : 'var(--karbon-text)'
              if (variant === 'pills') el.style.background = 'var(--karbon-nav-hover-bg)'
              if (variant === 'bordered') el.style.background = 'var(--karbon-nav-hover-bg)'
            }}
            onmouseleave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.color = 'var(--karbon-text-3)'
              el.style.background = 'transparent'
            }}
          >
            {#if item.icon}<span class="shrink-0">{@html sanitizeSvg(item.icon)}</span>{/if}
            {item.label}
          </a>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
