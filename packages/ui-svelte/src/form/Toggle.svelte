<script lang="ts">
  import type { ToggleSize } from '@karbonjs/ui-core'

  interface Props {
    name: string
    checked?: boolean
    label?: string
    size?: ToggleSize
    disabled?: boolean
    class?: string
    onchange?: (e: Event) => void
  }

  let {
    name,
    checked = $bindable(false),
    label = '',
    size = 'md',
    disabled = false,
    class: className = '',
    onchange
  }: Props = $props()

  const sizes = {
    sm: { track: 'w-8 h-[18px]', dot: 'h-3.5 w-3.5', translate: 'translate-x-3.5' },
    md: { track: 'w-10 h-[22px]', dot: 'h-4.5 w-4.5', translate: 'translate-x-4.5' }
  } as const

  const s = $derived(sizes[size])
</script>

<label class="inline-flex items-center gap-2.5 {disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} {className}">
  <input type="checkbox" {name} bind:checked {disabled} {onchange} class="sr-only peer" />
  <span
    class="relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200
      {s.track}
      {checked ? 'bg-[var(--karbon-primary)]' : 'bg-[var(--karbon-border,rgba(0,0,0,0.07))]'}
      peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--karbon-primary)]/20"
    aria-hidden="true"
  >
    <span
      class="inline-block rounded-full bg-white shadow-sm transition-transform duration-200 {s.dot} {checked ? s.translate : 'translate-x-0.5'}"
    ></span>
  </span>
  {#if label}
    <span class="text-sm font-medium text-[var(--karbon-text,#1a1635)] select-none">{label}</span>
  {/if}
</label>
