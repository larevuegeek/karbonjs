<script lang="ts">
  import type { FormVariant } from '@karbonjs/ui-core'

  interface Props {
    name: string
    value?: string
    placeholder?: string
    label?: string
    error?: string
    rows?: number
    maxlength?: number
    showCount?: boolean
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    variant?: FormVariant
    class?: string
    oninput?: (e: Event) => void
  }

  let {
    name,
    value = $bindable(''),
    placeholder = '',
    label = '',
    error = '',
    rows = 4,
    maxlength,
    showCount = false,
    required = false,
    disabled = false,
    readonly = false,
    variant = 'dark',
    class: className = '',
    oninput
  }: Props = $props()

  const themes = {
    dark: {
      label: 'text-[11px] font-medium text-gray-500 uppercase tracking-wider',
      input: 'border-white/8 bg-white/3 text-white placeholder-gray-700 focus:border-[var(--karbon-primary)]/50 focus:bg-white/5 focus:ring-[3px] focus:ring-[var(--karbon-primary)]/8',
      error: 'text-red-400',
      count: 'text-gray-600'
    },
    light: {
      label: 'text-sm font-medium text-gray-700',
      input: 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-[var(--karbon-primary)] focus:ring-2 focus:ring-[var(--karbon-primary)]/20',
      error: 'text-[var(--karbon-danger)]',
      count: 'text-gray-400'
    }
  } as const

  const theme = $derived(themes[variant])
  const charCount = $derived(value.length)
</script>

<div class="space-y-1.5 {className}">
  {#if label}
    <label for={name} class="{theme.label} block mb-1.5">{label}</label>
  {/if}

  <textarea
    id={name}
    {name}
    bind:value
    {placeholder}
    {rows}
    {maxlength}
    {required}
    {disabled}
    {readonly}
    {oninput}
    class="w-full rounded-lg border px-3 py-2.5 text-[13px] md:text-sm focus:outline-none transition-all resize-y {theme.input} {error ? 'border-red-500/50' : ''}"
  ></textarea>

  <div class="flex items-center justify-between">
    {#if error}
      <p class="text-xs {theme.error}">{error}</p>
    {:else}
      <span></span>
    {/if}
    {#if showCount && maxlength}
      <span class="text-xs {theme.count}">{charCount}/{maxlength}</span>
    {/if}
  </div>
</div>
