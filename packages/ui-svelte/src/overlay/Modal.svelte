<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ModalSize, OverlayBackdrop } from '@karbonjs/ui-core'

  interface Props {
    open: boolean
    title?: string
    size?: ModalSize
    backdrop?: OverlayBackdrop
    closable?: boolean
    closeOnOverlay?: boolean
    class?: string
    onclose: () => void
    children: Snippet
    footer?: Snippet
  }

  let {
    open = $bindable(false),
    title = '',
    size = 'md',
    backdrop = 'none',
    closable = true,
    closeOnOverlay = true,
    class: className = '',
    onclose,
    children,
    footer
  }: Props = $props()

  const sizeClasses: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]'
  }

  const backdropClasses: Record<string, string> = {
    blur: 'bg-black/30 backdrop-blur-sm',
    dark: 'bg-black/50',
    transparent: 'bg-transparent',
    none: 'hidden'
  }

  function handleOverlayClick() {
    if (closeOnOverlay) onclose()
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && closable) onclose()
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    {#if backdrop !== 'none'}
      <div class="fixed inset-0 {backdropClasses[backdrop]}" onclick={handleOverlayClick}></div>
    {/if}
    <div
      class="relative z-10 w-full {sizeClasses[size]} rounded-xl shadow-xl bg-[var(--karbon-bg-card,#fff)] flex flex-col {className}"
      role="dialog"
      aria-modal="true"
      aria-label={title || undefined}
    >
      {#if title || closable}
        <div class="flex items-center justify-between px-6 pt-6 {title ? 'mb-4' : ''}">
          {#if title}
            <h3 class="text-lg font-semibold text-[var(--karbon-text,#1a1635)]">{title}</h3>
          {/if}
          {#if closable}
            <button
              onclick={onclose}
              aria-label="Fermer"
              class="rounded-lg p-1 ml-auto text-[var(--karbon-text-4,#b5b2cc)] transition-colors duration-150 hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))] hover:text-[var(--karbon-text-2,#5a567e)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          {/if}
        </div>
      {/if}

      <div class="px-6 {footer ? 'pb-4' : 'pb-6'} {!title && !closable ? 'pt-6' : ''} overflow-y-auto">
        {@render children()}
      </div>

      {#if footer}
        <div class="px-6 pb-6 pt-2 flex items-center justify-end gap-3">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}
