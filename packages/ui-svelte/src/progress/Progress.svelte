<script lang="ts">
  import type { ProgressVariant, ProgressSize } from '@karbonjs/ui-core'

  interface Props {
    value: number
    max?: number
    variant?: ProgressVariant
    size?: ProgressSize
    showLabel?: boolean
    class?: string
  }

  let {
    value,
    max = 100,
    variant = 'primary',
    size = 'md',
    showLabel = false,
    class: className = ''
  }: Props = $props()

  const percent = $derived(Math.min(Math.max((value / max) * 100, 0), 100))

  const variantClasses: Record<string, string> = {
    primary: 'bg-[var(--karbon-primary)]',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500'
  }

  const sizeClasses: Record<string, string> = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }
</script>

<div class={className}>
  {#if showLabel}
    <div class="flex items-center justify-between mb-1">
      <span class="text-xs font-medium text-[var(--karbon-text-2,#5a567e)]">{Math.round(percent)}%</span>
    </div>
  {/if}
  <div class="w-full rounded-full bg-[var(--karbon-border,rgba(0,0,0,0.07))] overflow-hidden {sizeClasses[size]}" role="progressbar" aria-valuenow={value} aria-valuemax={max}>
    <div
      class="h-full rounded-full transition-all duration-300 ease-out {variantClasses[variant]}"
      style="width: {percent}%"
    ></div>
  </div>
</div>
