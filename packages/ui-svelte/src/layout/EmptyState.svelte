<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    title: string
    description?: string
    icon?: Snippet
    color?: ButtonColor
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'bordered' | 'filled' | 'minimal'
    actions?: Snippet
    illustration?: Snippet
    class?: string
    classes?: { root?: string, icon?: string, title?: string, description?: string, actions?: string }
  }

  let {
    title,
    description = '',
    icon,
    color,
    size = 'md',
    variant = 'default',
    actions,
    illustration,
    class: className = '',
    classes = {}
  }: Props = $props()

  const accent = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')
  const accentLight = $derived(color ? `var(--karbon-${color}-400)` : 'var(--karbon-text-4)')

  const sizeMap = {
    sm: { py: 'py-8', title: 'text-sm', desc: 'text-xs', iconBox: 40, iconSize: 20, maxW: '18rem', gap: 'gap-2' },
    md: { py: 'py-12', title: 'text-base', desc: 'text-sm', iconBox: 52, iconSize: 24, maxW: '22rem', gap: 'gap-3' },
    lg: { py: 'py-16', title: 'text-lg', desc: 'text-base', iconBox: 64, iconSize: 28, maxW: '26rem', gap: 'gap-4' },
  }
  const s = $derived(sizeMap[size])

  function rootStyle(): string {
    switch (variant) {
      case 'bordered': return `border:1px solid var(--karbon-border);border-radius:0.75rem;background:var(--karbon-bg-card);`
      case 'filled': return `border-radius:0.75rem;background:color-mix(in srgb,${accent} 5%,transparent);border:1px solid color-mix(in srgb,${accent} 10%,transparent);`
      case 'minimal': return ''
      default: return ''
    }
  }
</script>

<div
  class="text-center {s.py} px-6 {classes?.root ?? className}"
  style={rootStyle()}
>
  <!-- Illustration -->
  {#if illustration}
    <div class="mb-4 flex justify-center">
      {@render illustration()}
    </div>
  {:else if icon}
    <!-- Icon -->
    <div
      class="mx-auto mb-4 rounded-2xl flex items-center justify-center {classes?.icon ?? ''}"
      style="width:{s.iconBox}px;height:{s.iconBox}px;background:color-mix(in srgb,{accent} 10%,transparent);color:{accentLight};"
    >
      {@render icon()}
    </div>
  {:else}
    <!-- Default icon -->
    <div
      class="mx-auto mb-4 rounded-2xl flex items-center justify-center {classes?.icon ?? ''}"
      style="width:{s.iconBox}px;height:{s.iconBox}px;background:var(--karbon-nav-hover-bg);color:var(--karbon-text-4);"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width={s.iconSize} height={s.iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
    </div>
  {/if}

  <!-- Title -->
  <p class="{s.title} font-semibold {classes?.title ?? ''}" style="color:var(--karbon-text);margin:0;">{title}</p>

  <!-- Description -->
  {#if description}
    <p class="{s.desc} mt-1.5 mx-auto {classes?.description ?? ''}" style="color:var(--karbon-text-3);margin-top:0.375rem;max-width:{s.maxW};">{description}</p>
  {/if}

  <!-- Actions -->
  {#if actions}
    <div class="mt-5 flex items-center justify-center {s.gap} {classes?.actions ?? ''}">
      {@render actions()}
    </div>
  {/if}
</div>
