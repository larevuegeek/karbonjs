<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { FormVariant, FormInputVariant, FormInputClasses, ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    name: string
    type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
    value?: string
    placeholder?: string
    label?: string
    error?: string
    errorIcon?: boolean
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    autocomplete?: string
    clearable?: boolean
    icon?: Snippet
    variant?: FormVariant
    inputVariant?: FormInputVariant
    color?: ButtonColor
    classes?: FormInputClasses
    class?: string
    inputClass?: string
    labelClass?: string
    wrapperClass?: string
    oninput?: (e: Event) => void
    onchange?: (e: Event) => void
    onfocus?: (e: FocusEvent) => void
    onblur?: (e: FocusEvent) => void
    onkeydown?: (e: KeyboardEvent) => void
  }

  let {
    name,
    type = 'text',
    value = $bindable(''),
    placeholder = '',
    label = '',
    error = '',
    errorIcon = true,
    required = false,
    disabled = false,
    readonly = false,
    autocomplete = '',
    clearable = false,
    icon,
    variant = 'dark',
    inputVariant = 'outlined',
    color,
    classes,
    class: className = '',
    inputClass = '',
    labelClass = '',
    wrapperClass = '',
    oninput,
    onchange,
    onfocus,
    onblur,
    onkeydown
  }: Props = $props()

  let focused = $state(false)
  let showPassword = $state(false)

  const isPassword = $derived(type === 'password')
  const inputType = $derived(isPassword && showPassword ? 'text' : type)
  const hasRightAction = $derived(isPassword || (clearable && value))
  const hasIcon = $derived(!!icon)

  const focusColor = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')
  const focusRingColor = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')

  function handleFocus(e: FocusEvent) {
    focused = true
    onfocus?.(e)
  }

  function handleBlur(e: FocusEvent) {
    focused = false
    onblur?.(e)
  }

  function handleClear() {
    value = ''
  }

  const themes = {
    dark: {
      label: 'text-[11px] font-medium text-gray-500 uppercase tracking-wider',
      icon: 'text-gray-600',
      action: 'text-gray-600 hover:text-gray-400',
      error: 'text-red-400',
      glow: true,
      base: 'text-white placeholder-gray-700',
      variants: {
        outlined: 'border border-white/8 bg-white/3',
        filled: 'border-0 bg-white/8',
        underline: 'rounded-none bg-transparent'
      }
    },
    light: {
      label: 'text-sm font-medium text-gray-700',
      icon: 'text-gray-400',
      action: 'text-gray-400 hover:text-gray-600',
      error: 'text-[var(--karbon-danger)]',
      glow: false,
      base: 'text-gray-900 placeholder-gray-400',
      variants: {
        outlined: 'border border-gray-300 bg-white',
        filled: 'border-0 bg-gray-100',
        underline: 'rounded-none bg-transparent'
      }
    }
  } as const

  const theme = $derived(themes[variant])
  const variantClass = $derived(theme.variants[inputVariant])
</script>

<div class="{classes?.root ?? ''} {wrapperClass || 'space-y-1.5'}">
  {#if label}
    <label for={name} class="{theme.label} block mb-1.5 {classes?.label ?? ''} {labelClass}">
      {label}
    </label>
  {/if}

  <div class="relative {className}">
    {#if icon}
      <div
        class="absolute left-3 top-1/2 -translate-y-1/2 transition-colors {classes?.icon ?? ''} {focused ? '' : theme.icon}"
        class:z-10={variant === 'dark'}
        style={focused ? `color: ${focusColor}` : ''}
      >
        {@render icon()}
      </div>
    {/if}

    <input
      id={name}
      {name}
      type={inputType}
      bind:value
      {placeholder}
      {required}
      {disabled}
      {readonly}
      autocomplete={autocomplete as any}
      {oninput}
      {onchange}
      {onkeydown}
      onfocus={handleFocus}
      onblur={handleBlur}
      class="w-full {inputVariant !== 'underline' ? 'rounded-lg' : ''} {hasIcon ? 'pl-9' : 'pl-3'} {hasRightAction ? 'pr-10' : 'pr-3'} py-2.5 md:py-3 text-[13px] md:text-sm focus:outline-none transition-all {theme.base} {variantClass} {error ? 'border-red-500/50' : ''} {disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''} {variant === 'dark' ? 'relative z-[1]' : ''} {classes?.input ?? ''} {inputClass}"
      style="{inputVariant === 'underline' ? 'border:none;border-bottom:1px solid ' + (focused ? focusColor : error ? 'var(--karbon-danger)' : 'var(--karbon-border-input)') + ';border-radius:0;' : ''}{focused ? (inputVariant === 'underline' ? 'box-shadow:none;' : 'border-color:' + focusColor + ';box-shadow:0 0 0 3px color-mix(in srgb,' + focusRingColor + ' 12%,transparent);') : ''}"
    />

    {#if variant === 'dark' && theme.glow && inputVariant === 'outlined'}
      <div
        class="absolute -inset-px rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none"
        class:opacity-100={focused}
        style="background: linear-gradient(135deg, color-mix(in srgb, {focusColor} 10%, transparent), transparent 50%);"
      ></div>
    {/if}

    {#if isPassword}
      <button
        type="button"
        onclick={() => showPassword = !showPassword}
        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        class="absolute right-3 top-1/2 -translate-y-1/2 {theme.action} transition-colors cursor-pointer z-10"
        tabindex={-1}
      >
        {#if showPassword}
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
        {/if}
      </button>
    {:else if clearable && value}
      <button
        type="button"
        onclick={handleClear}
        aria-label="Effacer"
        class="absolute right-3 top-1/2 -translate-y-1/2 {theme.action} transition-colors cursor-pointer z-10"
        tabindex={-1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    {/if}
  </div>

  {#if error}
    <p class="flex items-center gap-1.5 text-xs {theme.error} {classes?.error ?? ''}">
      {#if errorIcon}
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      {/if}
      <span>{error}</span>
    </p>
  {/if}
</div>
