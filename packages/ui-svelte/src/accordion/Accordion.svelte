<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface AccordionItem {
    id: string
    title: string
    content?: string
    description?: string
    icon?: string
    disabled?: boolean
    defaultOpen?: boolean
  }

  interface Props {
    items: AccordionItem[]
    multiple?: boolean
    variant?: 'default' | 'bordered' | 'separated' | 'ghost' | 'filled' | 'colored'
    color?: ButtonColor
    size?: 'sm' | 'md' | 'lg'
    bg?: boolean | string
    border?: boolean | string
    highlightActive?: boolean
    arrow?: 'chevron' | 'plus' | 'arrow' | 'dot' | 'none'
    arrowPosition?: 'left' | 'right'
    class?: string
    classes?: { root?: string, item?: string, trigger?: string, content?: string, arrow?: string }
    onchange?: (openIds: string[]) => void
    children?: Snippet<[{ item: AccordionItem, index: number }]>
  }

  let {
    items,
    multiple = false,
    variant = 'default',
    bg = false,
    border = false,
    highlightActive = true,
    color,
    size = 'md',
    arrow = 'chevron',
    arrowPosition = 'right',
    class: className = '',
    classes = {},
    onchange,
    children
  }: Props = $props()

  function sanitizeSvg(html: string): string {
    return html.replace(/on\w+\s*=/gi, '').replace(/<script/gi, '&lt;script')
  }

  const accent = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')
  const accentBg = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')

  // svelte-ignore state_referenced_locally
  let openIds = $state<Set<string>>(new Set(items.filter(i => i.defaultOpen).map(i => i.id)))

  function toggle(id: string) {
    const next = new Set(openIds)
    if (next.has(id)) next.delete(id)
    else { if (!multiple) next.clear(); next.add(id) }
    openIds = next
    onchange?.([...next])
  }

  const sizeMap = {
    sm: { px: 'px-3', py: 'py-2.5', text: 'text-xs', content: 'text-xs', icon: 14, arrowBox: 20 },
    md: { px: 'px-4', py: 'py-3.5', text: 'text-sm', content: 'text-sm', icon: 16, arrowBox: 24 },
    lg: { px: 'px-5', py: 'py-4', text: 'text-base', content: 'text-base', icon: 18, arrowBox: 28 },
  }
  const s = $derived(sizeMap[size])

  // Arrow SVGs
  const arrows: Record<string, { open: string, closed: string }> = {
    chevron: {
      closed: '<path d="m6 9 6 6 6-6"/>',
      open: '<path d="m6 9 6 6 6-6"/>',
    },
    plus: {
      closed: '<path d="M12 5v14"/><path d="M5 12h14"/>',
      open: '<path d="M5 12h14"/>',
    },
    arrow: {
      closed: '<path d="m9 18 6-6-6-6"/>',
      open: '<path d="m9 18 6-6-6-6"/>',
    },
    dot: {
      closed: '<circle cx="12" cy="12" r="4"/>',
      open: '<circle cx="12" cy="12" r="4"/>',
    },
  }

  function arrowRotation(isOpen: boolean): string {
    if (arrow === 'plus' || arrow === 'dot') return '' // plus uses different SVG, no rotation
    if (arrow === 'arrow') return isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
    return isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
  }

  function rootStyle(): string {
    switch (variant) {
      case 'default': {
        const bc = border ? (typeof border === 'string' ? border : 'var(--karbon-border)') : 'var(--karbon-border)'
        return `border-radius:0.75rem;border:1px solid ${bc};overflow:hidden;`
      }
      case 'bordered': {
        const bc = border ? (typeof border === 'string' ? border : 'var(--karbon-border)') : 'var(--karbon-border)'
        return `border-radius:0.75rem;border:1px solid ${bc};overflow:hidden;`
      }
      case 'separated': return ''
      case 'ghost': return ''
      case 'filled': return `border-radius:0.75rem;overflow:hidden;`
      case 'colored': return `border-radius:0.75rem;overflow:hidden;`
      default: return ''
    }
  }

  function itemStyle(isOpen: boolean, isLast: boolean): string {
    switch (variant) {
      case 'separated': {
        const bc = border ? (typeof border === 'string' ? border : 'var(--karbon-border)') : (isOpen ? accent : 'var(--karbon-border)')
        return `border-radius:0.75rem;border:1px solid ${bc};overflow:hidden;margin-bottom:0.5rem;${isOpen ? `box-shadow:0 0 0 1px color-mix(in srgb,${accent} 15%,transparent),0 2px 8px color-mix(in srgb,${accent} 8%,transparent);` : ''}`
      }
      case 'filled': {
        const bc = border ? (typeof border === 'string' ? border : 'var(--karbon-border)') : (isOpen ? `color-mix(in srgb,${accent} 15%,transparent)` : 'var(--karbon-border)')
        return `background:${isOpen ? `color-mix(in srgb,${accentBg} 6%,transparent)` : 'transparent'};${!isLast ? `border-bottom:1px solid ${bc};` : ''}`
      }
      case 'colored': {
        const bc = border ? (typeof border === 'string' ? border : 'var(--karbon-border)') : (isOpen ? `color-mix(in srgb,${accent} 20%,transparent)` : 'var(--karbon-border)')
        return `background:${isOpen ? `color-mix(in srgb,${accentBg} 12%,transparent)` : 'var(--karbon-bg-2)'};${!isLast ? `border-bottom:1px solid ${bc};` : ''}${isOpen ? `box-shadow:inset 3px 0 0 ${accent};` : ''}transition:all 0.2s ease;`
      }
      case 'ghost': {
        const bc = border ? (typeof border === 'string' ? border : 'var(--karbon-border)') : 'var(--karbon-border)'
        return `${!isLast ? `border-bottom:1px solid ${bc};` : ''}`
      }
      default: {
        const bc = border ? (typeof border === 'string' ? border : 'var(--karbon-border)') : 'var(--karbon-border)'
        return `${!isLast ? `border-bottom:1px solid ${bc};` : ''}`
      }
    }
  }

  function triggerStyle(isOpen: boolean): string {
    if (!highlightActive) return 'color:var(--karbon-text);'
    if (variant === 'bordered' && isOpen) {
      return `background:color-mix(in srgb,${accent} 6%,transparent);color:${accent};`
    }
    if (variant === 'colored' && isOpen) {
      return `color:${accent};`
    }
    return `color:${isOpen ? accent : 'var(--karbon-text)'};`
  }

  function arrowStyle(isOpen: boolean): string {
    const base = `width:${s.arrowBox}px;height:${s.arrowBox}px;display:inline-flex;align-items:center;justify-content:center;border-radius:6px;transition:all 0.25s cubic-bezier(0.16,1,0.3,1);flex-shrink:0;`
    if (isOpen) {
      return `${base}background:color-mix(in srgb,${accent} 15%,transparent);color:${accent};transform:${arrowRotation(true)};`
    }
    return `${base}background:transparent;color:var(--karbon-text-4);transform:${arrowRotation(false)};`
  }
</script>

<div class="{classes?.root ?? className}" style="{rootStyle()}{bg === true ? 'background:var(--karbon-bg-card);' : typeof bg === 'string' ? `background:${bg};` : ''}">
  {#each items as item, index}
    {@const isOpen = openIds.has(item.id)}
    {@const isLast = index === items.length - 1}
    <div class="{classes?.item ?? ''}" style={itemStyle(isOpen, isLast)}>
      <!-- Trigger -->
      <button
        type="button"
        onclick={() => { if (!item.disabled) toggle(item.id) }}
        disabled={item.disabled}
        class="w-full flex items-center gap-3 {s.px} {s.py} {s.text} font-medium text-left transition-all
          disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer
          {classes?.trigger ?? ''}"
        style={triggerStyle(isOpen)}
        onmouseenter={(e) => { if (!item.disabled && !isOpen) (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)' }}
        onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.cssText = triggerStyle(isOpen) }}
      >
        <!-- Left arrow -->
        {#if arrowPosition === 'left' && arrow !== 'none'}
          <span style={arrowStyle(isOpen)} class="{classes?.arrow ?? ''}">
            <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill={arrow === 'dot' ? 'currentColor' : 'none'} stroke={arrow === 'dot' ? 'none' : 'currentColor'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              {@html isOpen ? arrows[arrow].open : arrows[arrow].closed}
            </svg>
          </span>
        {/if}

        <!-- Item icon -->
        {#if item.icon}
          <span class="shrink-0 opacity-60">{@html sanitizeSvg(item.icon)}</span>
        {/if}

        <!-- Title + description -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span>{item.title}</span>
            {#if item.description && !isOpen}
              <span class="font-normal truncate hidden sm:inline" style="color:var(--karbon-text-4);font-size:0.85em;">— {item.description}</span>
            {/if}
          </div>
          {#if item.description && isOpen}
            <p class="font-normal mt-0.5" style="color:var(--karbon-text-3);font-size:0.85em;">{item.description}</p>
          {/if}
        </div>

        <!-- Right arrow -->
        {#if arrowPosition === 'right' && arrow !== 'none'}
          <span style={arrowStyle(isOpen)} class="{classes?.arrow ?? ''}">
            <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill={arrow === 'dot' ? 'currentColor' : 'none'} stroke={arrow === 'dot' ? 'none' : 'currentColor'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              {@html isOpen ? arrows[arrow].open : arrows[arrow].closed}
            </svg>
          </span>
        {/if}
      </button>

      <!-- Content -->
      {#if isOpen}
        <div
          class="{s.px} pb-4 {s.content} {classes?.content ?? ''}"
          style="color:var(--karbon-text-2);animation:karbon-accordion-slide 0.25s cubic-bezier(0.16,1,0.3,1);"
        >
          {#if children}
            {@render children({ item, index })}
          {:else if item.content}
            <p class="leading-relaxed">{item.content}</p>
          {/if}
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  @keyframes karbon-accordion-slide {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
