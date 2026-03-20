<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonVariant, ButtonSize, ButtonColor, ButtonShape } from '@karbonjs/ui-core'

  interface Props {
    variant?: ButtonVariant
    size?: ButtonSize
    color?: ButtonColor
    shape?: ButtonShape
    type?: 'button' | 'submit'
    disabled?: boolean
    loading?: boolean
    loadingText?: string
    arrow?: boolean
    fullWidth?: boolean
    class?: string
    classes?: { root?: string }
    onclick?: () => void
    children: Snippet
  }

  let {
    variant = 'solid',
    size = 'md',
    color,
    shape = 'rounded',
    type = 'button',
    disabled = false,
    loading = false,
    loadingText = '',
    arrow = false,
    fullWidth = false,
    class: className = '',
    classes = {},
    onclick,
    children
  }: Props = $props()

  const isDisabled = $derived(disabled || loading)

  function c(shade: number): string {
    return color ? `var(--karbon-${color}-${shade})` : ''
  }

  // Primary color references
  const pri = $derived(color ? c(500) : 'var(--karbon-primary)')
  const priHover = $derived(color ? c(600) : 'var(--karbon-primary-hover)')
  const priLight = $derived(color ? c(400) : 'var(--karbon-primary)')
  const priFg = $derived(color ? 'white' : 'var(--karbon-primary-foreground, white)')

  // Build base + hover as CSS custom properties on the element
  // This way hover never "loses" base styles
  const style = $derived.by(() => {
    let vars = ''
    switch (variant) {
      case 'solid':
        vars = `--kb-bg:${pri};--kb-bg-h:${priHover};--kb-c:${priFg};--kb-c-h:${priFg};--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none`
        break
      case 'flat':
        vars = `--kb-bg:color-mix(in srgb,${pri} 15%,transparent);--kb-bg-h:color-mix(in srgb,${pri} 25%,transparent);--kb-c:${priLight};--kb-c-h:${priLight};--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none`
        break
      case 'bordered':
        vars = `--kb-bg:transparent;--kb-bg-h:color-mix(in srgb,${pri} 8%,transparent);--kb-c:${priLight};--kb-c-h:${priLight};--kb-b:2px solid ${priLight};--kb-b-h:2px solid ${pri};--kb-sh:none;--kb-sh-h:none`
        break
      case 'light':
        vars = `--kb-bg:transparent;--kb-bg-h:color-mix(in srgb,${pri} 10%,transparent);--kb-c:${priLight};--kb-c-h:${pri};--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none`
        break
      case 'outline':
        vars = `--kb-bg:transparent;--kb-bg-h:color-mix(in srgb,${pri} 6%,transparent);--kb-c:${priLight};--kb-c-h:${priLight};--kb-b:1px solid color-mix(in srgb,${priLight} 35%,transparent);--kb-b-h:1px solid ${priLight};--kb-sh:none;--kb-sh-h:none`
        break
      case 'ghost':
        vars = color
          ? `--kb-bg:transparent;--kb-bg-h:color-mix(in srgb,${pri} 10%,transparent);--kb-c:${priLight};--kb-c-h:${priLight};--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none`
          : `--kb-bg:transparent;--kb-bg-h:var(--karbon-nav-hover-bg,rgba(255,255,255,0.05));--kb-c:var(--karbon-text-3);--kb-c-h:var(--karbon-text-2);--kb-b:none;--kb-b-h:none;--kb-sh:none;--kb-sh-h:none`
        break
      case 'shadow':
        vars = `--kb-bg:${pri};--kb-bg-h:${priHover};--kb-c:${priFg};--kb-c-h:${priFg};--kb-b:none;--kb-b-h:none;--kb-sh:0 4px 14px 0 color-mix(in srgb,${pri} 40%,transparent);--kb-sh-h:0 6px 20px 0 color-mix(in srgb,${pri} 55%,transparent)`
        break
    }
    return vars
  })

  const sizeClasses: Record<string, string> = {
    '2xs': 'px-1.5 py-0.5 text-[10px] rounded-sm',
    xs: 'px-2.5 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    xl: 'px-6 py-3 text-base',
    '2xl': 'px-8 py-3.5 text-lg',
    '3xl': 'px-10 py-4 text-xl',
  }

  const circleSizeClasses: Record<string, string> = {
    '2xs': 'w-5 h-5 text-[10px]',
    xs: 'w-7 h-7 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-14 h-14 text-base',
    '2xl': 'w-16 h-16 text-lg',
    '3xl': 'w-20 h-20 text-xl',
  }

  const shapeClasses: Record<string, string> = {
    sharp: 'rounded-none',
    soft: 'rounded-md',
    rounded: 'rounded-lg',
    pill: 'rounded-full',
    circle: 'rounded-full',
  }
</script>

<button
  {type}
  disabled={isDisabled}
  {onclick}
  {style}
  class="
    karbon-btn
    inline-flex items-center justify-center gap-2 font-semibold
    {shapeClasses[shape]}
    transition-all duration-200 ease-out
    focus-visible:outline-2 focus-visible:outline-offset-2
    cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    {arrow ? 'relative overflow-hidden py-3 md:py-3.5 px-8 text-[0.8125rem] md:text-sm' : fullWidth ? 'w-full ' + sizeClasses[size] : shape === 'circle' ? circleSizeClasses[size] : sizeClasses[size]}
    {arrow ? 'group' : ''}
    {classes?.root ?? className}
  "
>
  {#if arrow}
    <span class="flex items-center gap-2 transition-transform duration-300 group-hover:-translate-x-3">
      {#if loading}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        {#if loadingText}<span>{loadingText}</span>{/if}
      {:else}
        {@render children()}
      {/if}
    </span>
    {#if !loading}
      <span class="absolute right-5 flex items-center opacity-0 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </span>
    {/if}
  {:else}
    {#if loading}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      {#if loadingText}<span>{loadingText}</span>{:else}{@render children()}{/if}
    {:else}
      {@render children()}
    {/if}
  {/if}
</button>

<style>
  .karbon-btn {
    background: var(--kb-bg);
    color: var(--kb-c);
    border: var(--kb-b);
    box-shadow: var(--kb-sh);
  }
  .karbon-btn:hover:not(:disabled) {
    background: var(--kb-bg-h);
    color: var(--kb-c-h);
    border: var(--kb-b-h);
    box-shadow: var(--kb-sh-h);
  }
  .karbon-btn:active:not(:disabled) {
    transform: scale(0.97);
  }
  .karbon-btn:focus-visible {
    outline-color: var(--kb-bg);
  }
</style>
