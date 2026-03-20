<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    open: boolean
    title: string
    message?: string
    variant?: 'info' | 'warning' | 'danger' | 'success'
    backdrop?: 'blur' | 'dark' | 'transparent'
    color?: ButtonColor
    confirmLabel?: string
    cancelLabel?: string
    confirmInput?: string
    confirmInputLabel?: string
    confirmInputPlaceholder?: string
    loading?: boolean
    class?: string
    classes?: { overlay?: string, content?: string }
    onconfirm: () => void
    oncancel: () => void
    icon?: Snippet
    children?: Snippet
  }

  let {
    open = $bindable(false),
    title,
    message = '',
    variant = 'info',
    backdrop = 'blur',
    color,
    confirmLabel = 'Confirmer',
    cancelLabel = 'Annuler',
    confirmInput,
    confirmInputLabel,
    confirmInputPlaceholder,
    loading = false,
    class: className = '',
    classes = {},
    onconfirm,
    oncancel,
    icon,
    children
  }: Props = $props()

  let visible = $state(false)
  let inputValue = $state('')

  $effect(() => {
    if (open) {
      inputValue = ''
      requestAnimationFrame(() => { visible = true })
      document.body.style.overflow = 'hidden'
    } else {
      visible = false
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  })

  const confirmInputLabelText = $derived(confirmInputLabel ?? `Tapez "${confirmInput}" pour confirmer`)
  const isConfirmDisabled = $derived(loading || (confirmInput ? inputValue !== confirmInput : false))

  // Variant colors
  const variantColors: Record<string, { bg: string, text: string, btn: string, btnHover: string }> = {
    info:    { bg: 'var(--karbon-blue-500)', text: 'var(--karbon-blue-400)', btn: 'var(--karbon-blue-500)', btnHover: 'var(--karbon-blue-600)' },
    warning: { bg: 'var(--karbon-amber-500)', text: 'var(--karbon-amber-400)', btn: 'var(--karbon-amber-500)', btnHover: 'var(--karbon-amber-600)' },
    danger:  { bg: 'var(--karbon-red-500)', text: 'var(--karbon-red-400)', btn: 'var(--karbon-red-500)', btnHover: 'var(--karbon-red-600)' },
    success: { bg: 'var(--karbon-emerald-500)', text: 'var(--karbon-emerald-400)', btn: 'var(--karbon-emerald-500)', btnHover: 'var(--karbon-emerald-600)' },
  }

  const vc = $derived(color
    ? { bg: `var(--karbon-${color}-500)`, text: `var(--karbon-${color}-400)`, btn: `var(--karbon-${color}-500)`, btnHover: `var(--karbon-${color}-600)` }
    : variantColors[variant]
  )

  // SVG icons per variant
  const variantIcons: Record<string, string> = {
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    warning: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    danger: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
    success: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  }

  const backdropStyles: Record<string, string> = {
    blur: 'background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);',
    dark: 'background:rgba(0,0,0,0.6);',
    transparent: 'background:transparent;',
  }

  let btnHovered = $state(false)

  function cancel() {
    visible = false
    setTimeout(() => oncancel(), 150)
  }

  function confirm() {
    if (isConfirmDisabled) return
    onconfirm()
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) cancel()
    if (e.key === 'Enter' && open && !isConfirmDisabled) confirm()
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    style="opacity:{visible ? 1 : 0};transition:opacity 0.15s ease;"
  >
    <!-- Backdrop -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="fixed inset-0 {classes?.overlay ?? ''}"
      style="{backdropStyles[backdrop]}transition:opacity 0.15s ease;opacity:{visible ? 1 : 0};"
      onclick={cancel}
    ></div>

    <!-- Content -->
    <div
      class="relative z-10 w-full max-w-md rounded-2xl p-6 {classes?.content ?? className}"
      style="background:var(--karbon-bg-card);border:1px solid var(--karbon-border);
        box-shadow:0 25px 60px -12px rgba(0,0,0,0.4);
        transform:{visible ? 'scale(1)' : 'scale(0.95)'};
        transition:transform 0.2s cubic-bezier(0.16,1,0.3,1);
        opacity:{visible ? 1 : 0};"
      role="alertdialog"
      aria-modal="true"
    >
      <!-- Icon + Title -->
      <div class="flex flex-col items-center text-center">
        <div
          class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style="background:color-mix(in srgb,{vc.bg} 12%,transparent);"
        >
          {#if icon}
            <span style="color:{vc.text};">{@render icon()}</span>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={vc.text} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{@html variantIcons[variant] || variantIcons.info}</svg>
          {/if}
        </div>

        <h3 class="text-lg font-semibold" style="color:var(--karbon-text);">{title}</h3>

        {#if message}
          <p class="mt-2 text-sm leading-relaxed" style="color:var(--karbon-text-3);">{message}</p>
        {/if}
      </div>

      <!-- Custom children -->
      {#if children}
        <div class="mt-4">
          {@render children()}
        </div>
      {/if}

      <!-- Confirm input -->
      {#if confirmInput}
        <div class="mt-5 text-left">
          <label class="block text-xs font-medium mb-1.5" style="color:var(--karbon-text-2);">
            {confirmInputLabelText}
          </label>
          <input
            type="text"
            bind:value={inputValue}
            placeholder={confirmInputPlaceholder ?? confirmInput}
            class="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-colors"
            style="background:var(--karbon-bg-input);border:1px solid {inputValue === confirmInput ? vc.bg : 'var(--karbon-border-input)'};color:var(--karbon-text);"
            onfocus={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 3px color-mix(in srgb, ${vc.bg} 15%, transparent)` }}
            onblur={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
          />
          {#if confirmInput && inputValue && inputValue !== confirmInput}
            <p class="mt-1 text-[11px]" style="color:var(--karbon-red-400);">Le texte ne correspond pas</p>
          {/if}
        </div>
      {/if}

      <!-- Buttons -->
      <div class="mt-6 flex gap-3">
        <button
          onclick={cancel}
          disabled={loading}
          class="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          style="color:var(--karbon-text-2);border:1px solid var(--karbon-border);"
          onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)' }}
          onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
        >
          {cancelLabel}
        </button>
        <button
          onclick={confirm}
          disabled={isConfirmDisabled}
          onmouseenter={() => btnHovered = true}
          onmouseleave={() => btnHovered = false}
          class="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer
            disabled:opacity-40 disabled:cursor-not-allowed
            inline-flex items-center justify-center gap-2"
          style="background:{btnHovered && !isConfirmDisabled ? vc.btnHover : vc.btn};"
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
