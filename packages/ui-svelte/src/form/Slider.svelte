<script lang="ts">
  import type { SliderClasses, ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    name: string
    value?: number
    min?: number
    max?: number
    step?: number
    label?: string
    showValue?: boolean
    disabled?: boolean
    color?: ButtonColor
    classes?: SliderClasses
    class?: string
    oninput?: (e: Event) => void
  }

  let {
    name,
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    label = '',
    showValue = true,
    disabled = false,
    color,
    classes,
    class: className = '',
    oninput
  }: Props = $props()

  const percent = $derived(((value - min) / (max - min)) * 100)
  const trackColor = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')
</script>

<div class="space-y-2 {classes?.root ?? ''} {className}">
  {#if label || showValue}
    <div class="flex items-center justify-between">
      {#if label}
        <label for={name} class="text-sm font-medium text-[var(--karbon-text,#1a1635)] {classes?.label ?? ''}">{label}</label>
      {/if}
      {#if showValue}
        <span class="text-sm font-semibold tabular-nums {classes?.value ?? ''}" style="color: {trackColor}">{value}</span>
      {/if}
    </div>
  {/if}

  <input
    id={name}
    {name}
    type="range"
    bind:value
    {min}
    {max}
    {step}
    {disabled}
    {oninput}
    class="w-full h-2 rounded-full appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
      [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:w-4.5
      [&::-webkit-slider-thumb]:h-4.5
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:border-2
      [&::-webkit-slider-thumb]:border-white
      [&::-webkit-slider-thumb]:shadow-md
      [&::-webkit-slider-thumb]:transition-transform
      [&::-webkit-slider-thumb]:duration-150
      [&::-webkit-slider-thumb]:hover:scale-110
      [&::-moz-range-thumb]:w-4
      [&::-moz-range-thumb]:h-4
      [&::-moz-range-thumb]:rounded-full
      [&::-moz-range-thumb]:border-2
      [&::-moz-range-thumb]:border-white
      [&::-moz-range-thumb]:shadow-md
      {classes?.input ?? ''}"
    style="background: linear-gradient(to right, {trackColor} {percent}%, var(--karbon-border, rgba(0,0,0,0.07)) {percent}%); --thumb-color: {trackColor};"
  />
</div>

<style>
  input[type="range"]::-webkit-slider-thumb {
    background-color: var(--thumb-color, var(--karbon-primary));
  }
  input[type="range"]::-moz-range-thumb {
    background-color: var(--thumb-color, var(--karbon-primary));
  }
</style>
