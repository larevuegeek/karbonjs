<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonVariant, ButtonSize } from '@karbonjs/ui-core'

  interface Props {
    variant?: ButtonVariant
    size?: ButtonSize
    type?: 'button' | 'submit'
    disabled?: boolean
    loading?: boolean
    loadingText?: string
    arrow?: boolean
    fullWidth?: boolean
    class?: string
    onclick?: () => void
    children: Snippet
  }

  let {
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled = false,
    loading = false,
    loadingText = '',
    arrow = false,
    fullWidth = false,
    class: className = '',
    onclick,
    children
  }: Props = $props()

  const isDisabled = $derived(disabled || loading)

  const variantClasses: Record<string, string> = {
    primary: 'bg-[var(--karbon-primary)] text-white hover:bg-[var(--karbon-primary-hover)] focus:ring-[var(--karbon-primary)]',
    secondary: 'bg-[var(--karbon-bg-2)] text-[var(--karbon-text-2)] hover:bg-[var(--karbon-border)] focus:ring-[var(--karbon-primary)]',
    danger: 'bg-[var(--karbon-danger)] text-white hover:bg-red-600 focus:ring-[var(--karbon-danger)]',
    ghost: 'text-[var(--karbon-text-3)] hover:bg-[var(--karbon-nav-hover-bg)] focus:ring-[var(--karbon-primary)]',
    outline: 'border border-[var(--karbon-border)] text-[var(--karbon-text-2)] hover:bg-[var(--karbon-nav-hover-bg)] focus:ring-[var(--karbon-primary)]'
  }

  const sizeClasses: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }
</script>

<button
  {type}
  disabled={isDisabled}
  {onclick}
  class="
    inline-flex items-center justify-center gap-2 font-semibold rounded-lg
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-0
    cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
    {variantClasses[variant]}
    {arrow || fullWidth ? 'relative overflow-hidden py-3 md:py-3.5 px-4 text-[0.8125rem] md:text-sm' : sizeClasses[size]}
    {fullWidth ? 'w-full' : ''}
    {arrow ? 'group' : ''}
    active:enabled:scale-[0.97]
    {className}
  "
>
  {#if arrow}
    <span class="flex items-center gap-2 transition-transform duration-300 group-hover:enabled:-translate-x-2.5">
      {#if loading}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        {#if loadingText}<span>{loadingText}</span>{/if}
      {:else}
        {@render children()}
      {/if}
    </span>
    {#if !loading}
      <span class="absolute right-4 flex items-center opacity-0 -translate-x-2 transition-all duration-300 group-hover:enabled:opacity-100 group-hover:enabled:translate-x-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </span>
    {/if}
  {:else}
    {#if loading}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin mr-2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      {#if loadingText}<span>{loadingText}</span>{:else}{@render children()}{/if}
    {:else}
      {@render children()}
    {/if}
  {/if}
</button>
