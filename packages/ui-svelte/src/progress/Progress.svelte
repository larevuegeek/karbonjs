<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    value: number
    max?: number
    color?: ButtonColor
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    variant?: 'default' | 'striped' | 'gradient' | 'glow'
    shape?: 'rounded' | 'square' | 'pill'
    label?: boolean | 'inside' | 'outside' | 'top'
    labelFormat?: (value: number, max: number) => string
    indeterminate?: boolean
    animated?: boolean
    segments?: { value: number, color?: ButtonColor, label?: string }[]
    class?: string
    classes?: { root?: string, track?: string, bar?: string, label?: string }
    children?: Snippet
  }

  let {
    value = 0,
    max = 100,
    color,
    size = 'md',
    variant = 'default',
    shape = 'rounded',
    label = false,
    labelFormat,
    indeterminate = false,
    animated = false,
    segments,
    class: className = '',
    classes = {},
    children
  }: Props = $props()

  const percent = $derived(Math.min(Math.max((value / max) * 100, 0), 100))
  const accent = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')
  const accentLight = $derived(color ? `var(--karbon-${color}-400)` : 'var(--karbon-primary)')

  const sizeMap = {
    xs: { track: 2, fontSize: '9px', showInside: false },
    sm: { track: 4, fontSize: '10px', showInside: false },
    md: { track: 8, fontSize: '11px', showInside: false },
    lg: { track: 12, fontSize: '11px', showInside: true },
    xl: { track: 20, fontSize: '12px', showInside: true },
  }
  const s = $derived(sizeMap[size])

  const shapeMap = { rounded: '9999px', square: '0', pill: '9999px' }
  const radius = $derived(shapeMap[shape])

  function formatLabel(v: number, m: number): string {
    if (labelFormat) return labelFormat(v, m)
    return `${Math.round((v / m) * 100)}%`
  }

  function barStyle(clr?: string): string {
    const bg = clr ? `var(--karbon-${clr}-500)` : accent
    const bgLight = clr ? `var(--karbon-${clr}-400)` : accentLight
    switch (variant) {
      case 'striped':
        return `background:repeating-linear-gradient(45deg,${bg},${bg} 10px,color-mix(in srgb,${bg} 70%,transparent) 10px,color-mix(in srgb,${bg} 70%,transparent) 20px);`
      case 'gradient':
        return `background:linear-gradient(90deg,color-mix(in srgb,${bg} 60%,transparent),${bg},${bgLight});`
      case 'glow':
        return `background:${bg};box-shadow:0 0 8px color-mix(in srgb,${bg} 50%,transparent),0 0 20px color-mix(in srgb,${bg} 20%,transparent);`
      default:
        return `background:${bg};`
    }
  }

  const showLabel = $derived(label === true || label === 'outside' || label === 'top' || label === 'inside')
  const labelPos = $derived(label === 'inside' ? 'inside' : label === 'top' ? 'top' : 'outside')
</script>

<div class="{classes?.root ?? className}">
  <!-- Top label -->
  {#if showLabel && labelPos === 'top'}
    <div class="flex items-center justify-between mb-1.5">
      {#if children}
        <span class="text-xs font-medium {classes?.label ?? ''}" style="color:var(--karbon-text-2);">{@render children()}</span>
      {:else}
        <span></span>
      {/if}
      <span class="text-xs font-semibold {classes?.label ?? ''}" style="color:{accent};">{formatLabel(value, max)}</span>
    </div>
  {/if}

  <!-- Track -->
  <div
    class="w-full overflow-hidden relative {classes?.track ?? ''}"
    style="height:{s.track}px;border-radius:{radius};background:var(--karbon-border,rgba(255,255,255,0.08));"
    role="progressbar"
    aria-valuenow={indeterminate ? undefined : value}
    aria-valuemax={max}
  >
    {#if indeterminate}
      <!-- Indeterminate animation -->
      <div
        class="absolute h-full {classes?.bar ?? ''}"
        style="{barStyle()};border-radius:{radius};animation:karbon-progress-indeterminate 1.5s ease-in-out infinite;width:40%;"
      ></div>
    {:else if segments && segments.length > 0}
      <!-- Multi-segments -->
      <div class="flex h-full">
        {#each segments as seg}
          {@const segPercent = Math.min(Math.max((seg.value / max) * 100, 0), 100)}
          <div
            class="h-full transition-all duration-500 ease-out first:rounded-l-inherit last:rounded-r-inherit {classes?.bar ?? ''}"
            style="width:{segPercent}%;{barStyle(seg.color)}"
            title={seg.label || `${Math.round(segPercent)}%`}
          ></div>
        {/each}
      </div>
    {:else}
      <!-- Single bar -->
      <div
        class="h-full transition-all duration-500 ease-out {classes?.bar ?? ''} {animated ? 'karbon-progress-animated' : ''}"
        style="width:{percent}%;border-radius:{radius};{barStyle()}"
      ></div>

      <!-- Inside label -->
      {#if showLabel && labelPos === 'inside' && s.showInside && percent > 10}
        <span
          class="absolute right-2 top-1/2 -translate-y-1/2 font-bold {classes?.label ?? ''}"
          style="font-size:{s.fontSize};color:white;text-shadow:0 1px 2px rgba(0,0,0,0.3);"
        >{formatLabel(value, max)}</span>
      {/if}
    {/if}
  </div>

  <!-- Outside label -->
  {#if showLabel && labelPos === 'outside'}
    <div class="flex items-center justify-between mt-1.5">
      {#if children}
        <span class="text-xs {classes?.label ?? ''}" style="color:var(--karbon-text-3);">{@render children()}</span>
      {:else}
        <span></span>
      {/if}
      <span class="text-xs font-semibold {classes?.label ?? ''}" style="color:{accent};">{formatLabel(value, max)}</span>
    </div>
  {/if}
</div>

<style>
  @keyframes karbon-progress-indeterminate {
    0% { left: -40%; }
    100% { left: 100%; }
  }
  .karbon-progress-animated {
    background-size: 30px 30px !important;
    animation: karbon-progress-stripe 1s linear infinite;
  }
  @keyframes karbon-progress-stripe {
    0% { background-position: 30px 0; }
    100% { background-position: 0 0; }
  }
</style>
