<script lang="ts">
  import type { FormVariant, FormInputVariant, TextareaClasses, ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    name: string
    value?: string
    placeholder?: string
    label?: string
    error?: string
    errorIcon?: boolean
    rows?: number
    maxlength?: number
    showCount?: boolean
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    variant?: FormVariant
    inputVariant?: FormInputVariant
    color?: ButtonColor
    classes?: TextareaClasses
    class?: string
    oninput?: (e: Event) => void
  }

  let {
    name,
    value = $bindable(''),
    placeholder = '',
    label = '',
    error = '',
    errorIcon = true,
    rows = 4,
    maxlength,
    showCount = false,
    required = false,
    disabled = false,
    readonly = false,
    variant = 'dark',
    inputVariant = 'outlined',
    color,
    classes,
    class: className = '',
    oninput
  }: Props = $props()

  let focused = $state(false)

  const focusColor = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')

  const themes = {
    dark: {
      label: 'text-[11px] font-medium text-gray-500 uppercase tracking-wider',
      base: 'text-white placeholder-gray-700',
      error: 'text-red-400',
      count: 'text-gray-600',
      variants: {
        outlined: 'border border-white/8 bg-white/3',
        filled: 'border-0 bg-white/8',
        underline: 'rounded-none bg-transparent'
      }
    },
    light: {
      label: 'text-sm font-medium text-gray-700',
      base: 'text-gray-900 placeholder-gray-400',
      error: 'text-[var(--karbon-danger)]',
      count: 'text-gray-400',
      variants: {
        outlined: 'border border-gray-300 bg-white',
        filled: 'border-0 bg-gray-100',
        underline: 'rounded-none bg-transparent'
      }
    }
  } as const

  const theme = $derived(themes[variant])
  const variantClass = $derived(theme.variants[inputVariant])
  const charCount = $derived(value.length)

  const inlineStyle = $derived.by(() => {
    let s = ''
    if (inputVariant === 'underline') {
      const bc = focused ? focusColor : error ? 'var(--karbon-danger)' : 'var(--karbon-border-input)'
      s += `border:none;border-bottom:1px solid ${bc};border-radius:0;`
      if (focused) s += 'box-shadow:none;'
    } else if (focused) {
      s += `border-color:${focusColor};box-shadow:0 0 0 3px color-mix(in srgb,${focusColor} 12%,transparent);`
    }
    return s
  })
</script>

<div class="space-y-1.5 {classes?.root ?? ''} {className}">
  {#if label}
    <label for={name} class="{theme.label} block mb-1.5 {classes?.label ?? ''}">{label}</label>
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
    onfocus={() => focused = true}
    onblur={() => focused = false}
    class="w-full {inputVariant !== 'underline' ? 'rounded-lg' : ''} px-3 py-2.5 text-[13px] md:text-sm focus:outline-none transition-all resize-y {theme.base} {variantClass} {error ? 'border-red-500/50' : ''} {disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''} {classes?.textarea ?? ''}"
    style={inlineStyle}
  ></textarea>

  <div class="flex items-center justify-between">
    {#if error}
      <p class="flex items-center gap-1.5 text-xs {theme.error} {classes?.error ?? ''}">
        {#if errorIcon}
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        {/if}
        <span>{error}</span>
      </p>
    {:else}
      <span></span>
    {/if}
    {#if showCount && maxlength}
      <span class="text-xs {theme.count} {classes?.count ?? ''}">{charCount}/{maxlength}</span>
    {/if}
  </div>
</div>
