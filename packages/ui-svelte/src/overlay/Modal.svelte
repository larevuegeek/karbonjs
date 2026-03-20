<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    open: boolean
    title?: string
    description?: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    position?: 'center' | 'top' | 'right' | 'bottom'
    backdrop?: 'blur' | 'dark' | 'light' | 'transparent'
    closable?: boolean
    closeOnOverlay?: boolean
    color?: ButtonColor
    class?: string
    classes?: { overlay?: string, content?: string, header?: string, body?: string, footer?: string }
    onclose: () => void
    icon?: Snippet
    children: Snippet
    footer?: Snippet
  }

  let {
    open = $bindable(false),
    title = '',
    description = '',
    size = 'md',
    position = 'center',
    backdrop = 'blur',
    closable = true,
    closeOnOverlay = true,
    color,
    class: className = '',
    classes = {},
    onclose,
    icon,
    children,
    footer
  }: Props = $props()

  let visible = $state(false)
  let contentEl: HTMLDivElement | undefined = $state()

  const accent = $derived(color ? `var(--karbon-${color}-500)` : '')

  $effect(() => {
    if (open) {
      requestAnimationFrame(() => { visible = true })
      document.body.style.overflow = 'hidden'
    } else {
      visible = false
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  })

  const sizeMap: Record<string, string> = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
  }

  const backdropStyles: Record<string, string> = {
    blur: 'background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);',
    dark: 'background:rgba(0,0,0,0.6);',
    light: 'background:rgba(255,255,255,0.4);backdrop-filter:blur(4px);',
    transparent: 'background:transparent;',
  }

  const positionClasses: Record<string, string> = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-16',
    right: 'items-stretch justify-end',
    bottom: 'items-end justify-center pb-4',
  }

  const contentPosition: Record<string, string> = {
    center: 'rounded-xl',
    top: 'rounded-xl',
    right: 'rounded-l-xl rounded-r-none min-h-full',
    bottom: 'rounded-t-xl rounded-b-none',
  }

  function close() {
    if (!closable) return
    visible = false
    setTimeout(() => onclose(), 150)
  }

  function handleOverlayClick() {
    if (closeOnOverlay) close()
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && closable && open) close()
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div
    class="fixed inset-0 z-50 flex p-4 {positionClasses[position]}"
    style="opacity:{visible ? 1 : 0};transition:opacity 0.15s ease;"
  >
    <!-- Backdrop -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="fixed inset-0 {classes?.overlay ?? ''}"
      style="{backdropStyles[backdrop]}transition:opacity 0.15s ease;opacity:{visible ? 1 : 0};"
      onclick={handleOverlayClick}
    ></div>

    <!-- Content -->
    <div
      bind:this={contentEl}
      class="relative z-10 w-full {sizeMap[size]} {contentPosition[position]} flex flex-col {classes?.content ?? className}"
      style="background:var(--karbon-bg-card);box-shadow:0 25px 60px -12px rgba(0,0,0,0.4);border:1px solid var(--karbon-border);
        transform:{visible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(8px)'};
        transition:transform 0.2s cubic-bezier(0.16,1,0.3,1),opacity 0.15s ease;
        opacity:{visible ? 1 : 0};"
      role="dialog"
      aria-modal="true"
      aria-label={title || undefined}
    >
      <!-- Header -->
      {#if title || closable || icon || description}
        <div class="flex gap-4 px-6 pt-6 pb-2 {classes?.header ?? ''}">
          {#if icon}
            <div class="shrink-0 mt-0.5">
              {#if color}
                <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:color-mix(in srgb,{accent} 12%,transparent);color:{accent};">
                  {@render icon()}
                </div>
              {:else}
                {@render icon()}
              {/if}
            </div>
          {/if}
          <div class="flex-1 min-w-0">
            {#if title}
              <h3 class="text-lg font-semibold" style="color:var(--karbon-text);">{title}</h3>
            {/if}
            {#if description}
              <p class="text-sm mt-0.5" style="color:var(--karbon-text-3);">{description}</p>
            {/if}
          </div>
          {#if closable}
            <button
              onclick={close}
              aria-label="Fermer"
              class="shrink-0 rounded-lg p-1.5 transition-colors cursor-pointer"
              style="color:var(--karbon-text-4);"
              onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)'; (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-2)' }}
              onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-4)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          {/if}
        </div>
      {/if}

      <!-- Body -->
      <div class="px-6 py-4 flex-1 overflow-y-auto text-sm {classes?.body ?? ''}" style="color:var(--karbon-text-2);">
        {@render children()}
      </div>

      <!-- Footer -->
      {#if footer}
        <div class="px-6 py-4 flex items-center justify-end gap-2 {classes?.footer ?? ''}" style="border-top:1px solid var(--karbon-border);">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}
