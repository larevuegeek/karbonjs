<script lang="ts">
  interface Props {
    name: string
    value?: number
    min?: number
    max?: number
    step?: number
    label?: string
    showValue?: boolean
    disabled?: boolean
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
    class: className = '',
    oninput
  }: Props = $props()

  const percent = $derived(((value - min) / (max - min)) * 100)
</script>

<div class="space-y-2 {className}">
  {#if label || showValue}
    <div class="flex items-center justify-between">
      {#if label}
        <label for={name} class="text-sm font-medium text-[var(--karbon-text,#1a1635)]">{label}</label>
      {/if}
      {#if showValue}
        <span class="text-sm font-semibold text-[var(--karbon-primary)] tabular-nums">{value}</span>
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
      bg-[linear-gradient(to_right,var(--karbon-primary)_{percent}%,var(--karbon-border,rgba(0,0,0,0.07))_{percent}%)]
      [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:w-4.5
      [&::-webkit-slider-thumb]:h-4.5
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:bg-[var(--karbon-primary)]
      [&::-webkit-slider-thumb]:border-2
      [&::-webkit-slider-thumb]:border-white
      [&::-webkit-slider-thumb]:shadow-md
      [&::-webkit-slider-thumb]:transition-transform
      [&::-webkit-slider-thumb]:duration-150
      [&::-webkit-slider-thumb]:hover:scale-110
      [&::-moz-range-thumb]:w-4
      [&::-moz-range-thumb]:h-4
      [&::-moz-range-thumb]:rounded-full
      [&::-moz-range-thumb]:bg-[var(--karbon-primary)]
      [&::-moz-range-thumb]:border-2
      [&::-moz-range-thumb]:border-white
      [&::-moz-range-thumb]:shadow-md"
  />
</div>
