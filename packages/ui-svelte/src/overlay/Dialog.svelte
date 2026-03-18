<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { DialogVariant, OverlayBackdrop } from '@karbonjs/ui-core'

  interface Props {
    open: boolean
    title: string
    description?: string
    variant?: DialogVariant
    backdrop?: OverlayBackdrop
    confirmLabel?: string
    cancelLabel?: string
    loading?: boolean
    class?: string
    onconfirm: () => void
    oncancel: () => void
    icon?: Snippet
  }

  let {
    open = $bindable(false),
    title,
    description = '',
    variant = 'info',
    backdrop = 'none',
    confirmLabel = 'Confirmer',
    cancelLabel = 'Annuler',
    loading = false,
    class: className = '',
    onconfirm,
    oncancel,
    icon
  }: Props = $props()

  const backdropClasses: Record<string, string> = {
    blur: 'bg-black/30 backdrop-blur-sm',
    dark: 'bg-black/50',
    transparent: 'bg-transparent',
    none: 'hidden'
  }

  const variantIcon: Record<string, string> = {
    info: 'bg-blue-500/10 text-blue-500',
    warning: 'bg-amber-500/10 text-amber-500',
    danger: 'bg-red-500/10 text-red-500',
    success: 'bg-emerald-500/10 text-emerald-500'
  }

  const confirmClasses: Record<string, string> = {
    info: 'bg-[var(--karbon-primary)] hover:bg-[var(--karbon-primary-hover)]',
    warning: 'bg-amber-500 hover:bg-amber-600',
    danger: 'bg-red-500 hover:bg-red-600',
    success: 'bg-emerald-500 hover:bg-emerald-600'
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') oncancel()
  }
</script>

<svelte:window onkeydown={open ? handleKeydown : undefined} />

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    {#if backdrop !== 'none'}
      <div class="fixed inset-0 {backdropClasses[backdrop]}" onclick={oncancel}></div>
    {/if}
    <div
      class="relative z-10 w-full max-w-md rounded-xl shadow-xl bg-[var(--karbon-bg-card,#fff)] p-6 {className}"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="karbon-dialog-title"
      aria-describedby={description ? 'karbon-dialog-desc' : undefined}
    >
      <div class="flex flex-col items-center text-center">
        {#if icon}
          <div class="w-12 h-12 rounded-full {variantIcon[variant]} flex items-center justify-center mb-4">
            {@render icon()}
          </div>
        {:else}
          <div class="w-12 h-12 rounded-full {variantIcon[variant]} flex items-center justify-center mb-4">
            {#if variant === 'danger'}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            {:else if variant === 'warning'}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
            {:else if variant === 'success'}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            {/if}
          </div>
        {/if}

        <h3 id="karbon-dialog-title" class="text-lg font-semibold text-[var(--karbon-text,#1a1635)]">
          {title}
        </h3>

        {#if description}
          <p id="karbon-dialog-desc" class="mt-2 text-sm text-[var(--karbon-text-3,#8e8aae)]">
            {description}
          </p>
        {/if}
      </div>

      <div class="mt-6 flex gap-3">
        <button
          onclick={oncancel}
          disabled={loading}
          class="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
            border border-[var(--karbon-border,rgba(0,0,0,0.07))]
            text-[var(--karbon-text-2,#5a567e)]
            hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))]
            disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {cancelLabel}
        </button>
        <button
          onclick={onconfirm}
          disabled={loading}
          class="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors
            {confirmClasses[variant]}
            disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
            inline-flex items-center justify-center gap-2"
        >
          {#if loading}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          {/if}
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
{/if}
