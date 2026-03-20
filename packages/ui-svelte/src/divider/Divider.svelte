<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    direction?: 'horizontal' | 'vertical'
    variant?: 'solid' | 'dashed' | 'dotted' | 'gradient'
    color?: ButtonColor
    thickness?: number
    label?: string
    labelPosition?: 'left' | 'center' | 'right'
    icon?: Snippet
    spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    class?: string
    classes?: { root?: string, line?: string, label?: string }
  }

  let {
    direction = 'horizontal',
    variant = 'solid',
    color,
    thickness = 1,
    label = '',
    labelPosition = 'center',
    icon,
    spacing = 'md',
    class: className = '',
    classes = {}
  }: Props = $props()

  const lineColor = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-border)')
  const labelColor = $derived(color ? `var(--karbon-${color}-400)` : 'var(--karbon-text-4)')

  const spacingMap = { none: '0', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2.5rem' }
  const pad = $derived(spacingMap[spacing])

  function lineStyle(): string {
    switch (variant) {
      case 'solid': return `background:${lineColor};`
      case 'dashed': return `background:transparent;border-top:${thickness}px dashed ${lineColor};height:0;`
      case 'dotted': return `background:transparent;border-top:${thickness}px dotted ${lineColor};height:0;`
      case 'gradient': return `background:linear-gradient(90deg,transparent,${lineColor},transparent);`
      default: return `background:${lineColor};`
    }
  }

  function verticalLineStyle(): string {
    switch (variant) {
      case 'solid': return `background:${lineColor};`
      case 'dashed': return `background:transparent;border-left:${thickness}px dashed ${lineColor};width:0;`
      case 'dotted': return `background:transparent;border-left:${thickness}px dotted ${lineColor};width:0;`
      case 'gradient': return `background:linear-gradient(180deg,transparent,${lineColor},transparent);`
      default: return `background:${lineColor};`
    }
  }

  const hasLabel = $derived(!!label || !!icon)
</script>

{#if direction === 'vertical'}
  <div
    class="inline-flex self-stretch items-center {classes?.root ?? className}"
    style="padding:0 {pad};"
  >
    {#if hasLabel}
      <div class="flex flex-col items-center gap-2 h-full">
        <div class="flex-1" style="{verticalLineStyle()}width:{variant === 'solid' || variant === 'gradient' ? `${thickness}px` : '0'};min-height:8px;"></div>
        {#if icon}
          <span class="shrink-0" style="color:{labelColor};">{@render icon()}</span>
        {:else}
          <span class="text-[10px] font-medium shrink-0 [writing-mode:vertical-lr] {classes?.label ?? ''}" style="color:{labelColor};">{label}</span>
        {/if}
        <div class="flex-1" style="{verticalLineStyle()}width:{variant === 'solid' || variant === 'gradient' ? `${thickness}px` : '0'};min-height:8px;"></div>
      </div>
    {:else}
      <div style="{verticalLineStyle()}width:{variant === 'solid' || variant === 'gradient' ? `${thickness}px` : '0'};height:100%;"></div>
    {/if}
  </div>
{:else if hasLabel}
  <div
    class="flex items-center gap-3 {classes?.root ?? className}"
    style="padding:{pad} 0;"
  >
    <div
      class="{labelPosition === 'left' ? 'w-8' : 'flex-1'} {classes?.line ?? ''}"
      style="{lineStyle()}height:{variant === 'solid' || variant === 'gradient' ? `${thickness}px` : '0'};min-width:8px;"
    ></div>

    <div class="flex items-center gap-2 shrink-0">
      {#if icon}
        <span style="color:{labelColor};">{@render icon()}</span>
      {/if}
      {#if label}
        <span class="text-xs font-medium {classes?.label ?? ''}" style="color:{labelColor};">{label}</span>
      {/if}
    </div>

    <div
      class="{labelPosition === 'right' ? 'w-8' : 'flex-1'} {classes?.line ?? ''}"
      style="{lineStyle()}height:{variant === 'solid' || variant === 'gradient' ? `${thickness}px` : '0'};min-width:8px;"
    ></div>
  </div>
{:else}
  <div
    class="w-full {classes?.root ?? className}"
    style="{lineStyle()}height:{variant === 'solid' || variant === 'gradient' ? `${thickness}px` : '0'};margin:{pad} 0;"
  ></div>
{/if}
