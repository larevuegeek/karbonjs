<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { AlertType } from '@karbonjs/ui-core'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    type?: AlertType
    variant?: 'soft' | 'filled' | 'outline' | 'bordered'
    color?: ButtonColor
    title?: string
    message?: string
    dismissible?: boolean
    icon?: Snippet | false
    actions?: Snippet
    class?: string
    classes?: { root?: string, icon?: string, title?: string, text?: string, close?: string }
    ondismiss?: () => void
    children?: Snippet
  }

  let {
    type = 'info',
    variant = 'soft',
    color,
    title = '',
    message = '',
    dismissible = false,
    icon,
    actions,
    class: className = '',
    classes = {},
    ondismiss,
    children
  }: Props = $props()

  let visible = $state(true)

  // Type → color mapping when no color prop
  const typeColors: Record<string, string> = {
    error: 'var(--karbon-red-500, #ef4444)',
    success: 'var(--karbon-emerald-500, #10b981)',
    warning: 'var(--karbon-amber-500, #f59e0b)',
    info: 'var(--karbon-blue-500, #3b82f6)',
  }

  const typeColorsLight: Record<string, string> = {
    error: 'var(--karbon-red-400, #f87171)',
    success: 'var(--karbon-emerald-400, #34d399)',
    warning: 'var(--karbon-amber-400, #fbbf24)',
    info: 'var(--karbon-blue-400, #60a5fa)',
  }

  const baseColor = $derived(color ? `var(--karbon-${color}-500)` : typeColors[type])
  const lightColor = $derived(color ? `var(--karbon-${color}-400)` : typeColorsLight[type])

  const style = $derived.by(() => {
    switch (variant) {
      case 'soft':
        return `background:color-mix(in srgb,${baseColor} 10%,transparent);color:${lightColor};border:1px solid color-mix(in srgb,${baseColor} 15%,transparent);`
      case 'filled':
        return `background:${baseColor};color:white;border:none;`
      case 'outline':
        return `background:transparent;color:${lightColor};border:1px solid color-mix(in srgb,${baseColor} 30%,transparent);`
      case 'bordered':
        return `background:color-mix(in srgb,${baseColor} 6%,transparent);color:${lightColor};border:none;border-left:3px solid ${baseColor};`
      default: return ''
    }
  })

  // SVG icons per type
  const typeIcons: Record<string, string> = {
    error: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    success: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    warning: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  }

  function dismiss() {
    visible = false
    ondismiss?.()
  }
</script>

{#if visible && (message || children || title)}
  <div
    class="flex gap-3 rounded-xl px-4 py-3 text-sm {classes?.root ?? className}"
    style="{style}animation:karbon-alert-in 0.25s ease;"
    role="alert"
  >
    <!-- Icon -->
    {#if icon !== false}
      <div class="shrink-0 mt-0.5 {classes?.icon ?? ''}">
        {#if icon}
          {@render icon()}
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke={variant === 'filled' ? 'white' : 'currentColor'}
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          >{@html typeIcons[type] || typeIcons.info}</svg>
        {/if}
      </div>
    {/if}

    <!-- Content -->
    <div class="flex-1 min-w-0">
      {#if title}
        <p class="font-semibold {message || children ? 'mb-1' : ''} {classes?.title ?? ''}"
          style={variant === 'filled' ? 'color:white;' : ''}
        >{title}</p>
      {/if}
      {#if children}
        <div class="opacity-90 {classes?.text ?? ''}">{@render children()}</div>
      {:else if message}
        <p class="opacity-90 {classes?.text ?? ''}">{message}</p>
      {/if}
      {#if actions}
        <div class="mt-2.5 flex items-center gap-2">
          {@render actions()}
        </div>
      {/if}
    </div>

    <!-- Dismiss -->
    {#if dismissible}
      <button
        type="button"
        onclick={dismiss}
        class="shrink-0 mt-0.5 rounded-lg p-1 transition-opacity opacity-50 hover:opacity-100 cursor-pointer {classes?.close ?? ''}"
        aria-label="Fermer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke={variant === 'filled' ? 'white' : 'currentColor'}
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        ><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    {/if}
  </div>
{/if}
