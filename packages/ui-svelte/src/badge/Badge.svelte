<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    variant?: 'soft' | 'solid' | 'outline' | 'dot' | 'flat'
    color?: ButtonColor
    size?: 'xs' | 'sm' | 'md' | 'lg'
    shape?: 'pill' | 'rounded' | 'square'
    closable?: boolean
    dot?: boolean
    icon?: Snippet
    class?: string
    classes?: { root?: string, dot?: string, icon?: string, close?: string }
    onclose?: () => void
    children: Snippet
  }

  let {
    variant = 'soft',
    color,
    size = 'sm',
    shape = 'pill',
    closable = false,
    dot = false,
    icon,
    class: className = '',
    classes = {},
    onclose,
    children
  }: Props = $props()

  function c(shade: number): string {
    return color ? `var(--karbon-${color}-${shade})` : ''
  }

  const accent = $derived(color ? c(500) : 'var(--karbon-primary)')
  const accentLight = $derived(color ? c(400) : 'var(--karbon-primary)')

  // Preset color variants (when no color prop)
  const presetStyles: Record<string, string> = {
    soft: 'background:var(--karbon-bg-2);color:var(--karbon-text-2);',
    solid: 'background:var(--karbon-primary);color:white;',
    outline: 'background:transparent;color:var(--karbon-text-2);border:1px solid var(--karbon-border);',
    dot: 'background:var(--karbon-bg-2);color:var(--karbon-text-2);',
    flat: 'background:transparent;color:var(--karbon-text-2);',
  }

  const colorStyle = $derived.by(() => {
    if (!color) return presetStyles[variant] || presetStyles.soft
    switch (variant) {
      case 'soft': return `background:color-mix(in srgb,${accent} 15%,transparent);color:${accentLight};`
      case 'solid': return `background:${accent};color:white;`
      case 'outline': return `background:transparent;color:${accentLight};border:1px solid color-mix(in srgb,${accentLight} 40%,transparent);`
      case 'dot': return `background:color-mix(in srgb,${accent} 10%,transparent);color:${accentLight};`
      case 'flat': return `background:transparent;color:${accentLight};`
      default: return `background:color-mix(in srgb,${accent} 15%,transparent);color:${accentLight};`
    }
  })

  const sizeClasses: Record<string, string> = {
    xs: 'px-1.5 py-px text-[10px] gap-1',
    sm: 'px-2 py-0.5 text-[11px] gap-1',
    md: 'px-2.5 py-0.5 text-xs gap-1.5',
    lg: 'px-3 py-1 text-sm gap-1.5',
  }

  const dotSizes: Record<string, string> = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2 h-2',
  }

  const iconSizes: Record<string, number> = { xs: 8, sm: 10, md: 12, lg: 14 }

  const shapeClasses: Record<string, string> = {
    pill: 'rounded-full',
    rounded: 'rounded-md',
    square: 'rounded-none',
  }
</script>

<span
  class="inline-flex items-center font-medium {sizeClasses[size]} {shapeClasses[shape]} {classes?.root ?? className}"
  style={colorStyle}
>
  {#if (variant === 'dot' || dot) && !icon}
    <span
      class="rounded-full shrink-0 {dotSizes[size]} {classes?.dot ?? ''}"
      style="background: {color ? accentLight : 'currentColor'};"
    ></span>
  {/if}

  {#if icon}
    <span class="shrink-0 {classes?.icon ?? ''}">
      {@render icon()}
    </span>
  {/if}

  {@render children()}

  {#if closable}
    <button
      type="button"
      onclick={(e) => { e.stopPropagation(); onclose?.() }}
      class="shrink-0 ml-0.5 rounded-full transition-opacity opacity-60 hover:opacity-100 cursor-pointer {classes?.close ?? ''}"
      aria-label="Fermer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width={iconSizes[size]} height={iconSizes[size]} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  {/if}
</span>
