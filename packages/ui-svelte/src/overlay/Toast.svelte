<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    type?: 'success' | 'error' | 'warning' | 'info'
    variant?: 'default' | 'filled' | 'bordered'
    color?: ButtonColor
    title?: string
    message?: string
    duration?: number
    dismissible?: boolean
    showProgress?: boolean
    position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'
    icon?: Snippet | false
    action?: Snippet
    class?: string
    classes?: { root?: string, icon?: string, close?: string, progress?: string }
    onclose?: () => void
    children?: Snippet
  }

  let {
    type = 'info',
    variant = 'default',
    color,
    title = '',
    message = '',
    duration = 5000,
    dismissible = true,
    showProgress = true,
    position = 'top-right',
    icon,
    action,
    class: className = '',
    classes = {},
    onclose,
    children
  }: Props = $props()

  let visible = $state(false)
  let alive = $state(true)
  let progress = $state(100)
  let paused = $state(false)

  const typeColors: Record<string, { bg: string, text: string, border: string }> = {
    success: { bg: 'var(--karbon-emerald-500)', text: 'var(--karbon-emerald-400)', border: 'var(--karbon-emerald-500)' },
    error:   { bg: 'var(--karbon-red-500)', text: 'var(--karbon-red-400)', border: 'var(--karbon-red-500)' },
    warning: { bg: 'var(--karbon-amber-500)', text: 'var(--karbon-amber-400)', border: 'var(--karbon-amber-500)' },
    info:    { bg: 'var(--karbon-blue-500)', text: 'var(--karbon-blue-400)', border: 'var(--karbon-blue-500)' },
  }

  const tc = $derived(color
    ? { bg: `var(--karbon-${color}-500)`, text: `var(--karbon-${color}-400)`, border: `var(--karbon-${color}-500)` }
    : typeColors[type]
  )

  const typeIcons: Record<string, string> = {
    success: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    error: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    warning: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  }

  const posStyles: Record<string, string> = {
    'top-right': 'top:1rem;right:1rem;',
    'top-left': 'top:1rem;left:1rem;',
    'top-center': 'top:1rem;left:50%;transform:translateX(-50%);',
    'bottom-right': 'bottom:1rem;right:1rem;',
    'bottom-left': 'bottom:1rem;left:1rem;',
    'bottom-center': 'bottom:1rem;left:50%;transform:translateX(-50%);',
  }

  const isTop = $derived(position.startsWith('top'))
  const slideFrom = $derived(isTop ? '-20px' : '20px')

  const toastStyle = $derived.by(() => {
    switch (variant) {
      case 'filled':
        return `background:${tc.bg};color:white;border:none;`
      case 'bordered':
        return `background:var(--karbon-bg-card);color:var(--karbon-text);border-left:3px solid ${tc.border};border-top:1px solid var(--karbon-border);border-right:1px solid var(--karbon-border);border-bottom:1px solid var(--karbon-border);`
      default:
        return `background:var(--karbon-bg-card);color:var(--karbon-text);border:1px solid var(--karbon-border);`
    }
  })

  const iconColor = $derived(variant === 'filled' ? 'white' : tc.text)

  // Animation + countdown
  $effect(() => {
    if (alive) {
      requestAnimationFrame(() => { visible = true })

      if (duration > 0) {
        const interval = 30
        const step = (100 / duration) * interval
        const timer = setInterval(() => {
          if (!paused) {
            progress -= step
            if (progress <= 0) {
              clearInterval(timer)
              dismiss()
            }
          }
        }, interval)
        return () => clearInterval(timer)
      }
    }
  })

  function dismiss() {
    visible = false
    setTimeout(() => {
      alive = false
      onclose?.()
    }, 200)
  }
</script>

{#if alive}
  <div
    class="fixed z-[60] w-full max-w-sm pointer-events-auto"
    style={posStyles[position]}
    role="alert"
    aria-live="assertive"
    onmouseenter={() => paused = true}
    onmouseleave={() => paused = false}
  >
    <div
      class="rounded-xl shadow-xl overflow-hidden {classes?.root ?? className}"
      style="{toastStyle}
        opacity:{visible ? 1 : 0};
        transform:translateY({visible ? '0' : slideFrom});
        transition:transform 0.25s cubic-bezier(0.16,1,0.3,1),opacity 0.2s ease;"
    >
      <div class="flex items-start gap-3 px-4 py-3">
        <!-- Icon -->
        {#if icon !== false}
          <div class="shrink-0 mt-0.5 {classes?.icon ?? ''}">
            {#if icon}
              {@render icon()}
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{@html typeIcons[type] || typeIcons.info}</svg>
            {/if}
          </div>
        {/if}

        <!-- Content -->
        <div class="flex-1 min-w-0">
          {#if title}
            <p class="text-sm font-semibold {message || children ? 'mb-0.5' : ''}"
              style="color:white;"
            >{title}</p>
          {/if}
          {#if children}
            <div class="text-[13px]" style="color:rgba(255,255,255,0.75);">{@render children()}</div>
          {:else if message}
            <p class="text-[13px]" style="color:rgba(255,255,255,0.75);">{message}</p>
          {/if}
          {#if action}
            <div class="mt-2">{@render action()}</div>
          {/if}
        </div>

        <!-- Close -->
        {#if dismissible}
          <button
            onclick={dismiss}
            aria-label="Fermer"
            class="shrink-0 rounded-md p-0.5 transition-opacity opacity-50 hover:opacity-100 cursor-pointer {classes?.close ?? ''}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        {/if}
      </div>

      <!-- Progress bar -->
      {#if showProgress && duration > 0}
        <div class="h-[2px] w-full {classes?.progress ?? ''}" style="background:color-mix(in srgb,{tc.bg} 15%,transparent);">
          <div
            class="h-full transition-none"
            style="width:{progress}%;background:{variant === 'filled' ? 'rgba(255,255,255,0.4)' : tc.bg};"
          ></div>
        </div>
      {/if}
    </div>
  </div>
{/if}
