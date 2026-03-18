<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { FormVariant } from '@karbonjs/ui-core'

  interface Props {
    name: string
    type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
    value?: string
    placeholder?: string
    label?: string
    error?: string
    required?: boolean
    disabled?: boolean
    readonly?: boolean
    autocomplete?: string
    clearable?: boolean
    icon?: Snippet
    variant?: FormVariant
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
    required = false,
    disabled = false,
    readonly = false,
    autocomplete = '',
    clearable = false,
    icon,
    variant = 'dark',
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
      input: 'border-white/8 bg-white/3 text-white placeholder-gray-700 focus:border-[var(--karbon-primary)]/50 focus:bg-white/5 focus:ring-[3px] focus:ring-[var(--karbon-primary)]/8',
      icon: 'text-gray-600',
      iconFocused: 'text-[var(--karbon-primary)]',
      action: 'text-gray-600 hover:text-gray-400',
      error: 'text-red-400',
      glow: true
    },
    light: {
      label: 'text-sm font-medium text-gray-700',
      input: 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-[var(--karbon-primary)] focus:ring-2 focus:ring-[var(--karbon-primary)]/20',
      icon: 'text-gray-400',
      iconFocused: 'text-[var(--karbon-primary)]',
      action: 'text-gray-400 hover:text-gray-600',
      error: 'text-[var(--karbon-danger)]',
      glow: false
    }
  } as const

  const theme = $derived(themes[variant])
</script>

<div class="{wrapperClass || 'space-y-1.5'}">
  {#if label}
    <label for={name} class="{theme.label} block mb-1.5 {labelClass}">
      {label}
    </label>
  {/if}

  <div class="relative {className}">
    {#if icon}
      <div
        class="absolute left-3 top-1/2 -translate-y-1/2 transition-colors {focused ? theme.iconFocused : theme.icon}"
        class:z-10={variant === 'dark'}
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
      {autocomplete}
      {oninput}
      {onchange}
      {onkeydown}
      onfocus={handleFocus}
      onblur={handleBlur}
      class="w-full rounded-lg border {hasIcon ? 'pl-9' : 'pl-3'} {hasRightAction ? 'pr-10' : 'pr-3'} py-2.5 md:py-3 text-[13px] md:text-sm focus:outline-none transition-all {theme.input} {error ? 'border-red-500/50' : ''} {variant === 'dark' ? 'relative z-[1]' : ''} {inputClass}"
    />

    {#if variant === 'dark' && theme.glow}
      <div
        class="absolute -inset-px rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none"
        class:opacity-100={focused}
        style="background: linear-gradient(135deg, rgba(204, 26, 26, 0.1), transparent 50%);"
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
    <p class="text-xs {theme.error}">{error}</p>
  {/if}
</div>
