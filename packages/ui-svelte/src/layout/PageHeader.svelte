<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    title: string
    description?: string
    icon?: Snippet
    color?: ButtonColor
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'bordered' | 'filled' | 'clean'
    backHref?: string
    backLabel?: string
    badge?: string
    breadcrumbs?: { label: string, href?: string }[]
    actions?: Snippet
    class?: string
    classes?: { root?: string, title?: string, description?: string, icon?: string, actions?: string, breadcrumb?: string }
  }

  let {
    title,
    description = '',
    icon,
    color,
    size = 'md',
    variant = 'default',
    backHref,
    backLabel = 'Retour',
    badge,
    breadcrumbs,
    actions,
    class: className = '',
    classes = {}
  }: Props = $props()

  const accent = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')
  const accentLight = $derived(color ? `var(--karbon-${color}-400)` : 'var(--karbon-primary)')

  const sizeMap = {
    sm: { title: 'text-lg', desc: 'text-xs', iconBox: 32, iconSize: 16, pad: 'pb-3', gap: 'gap-2.5' },
    md: { title: 'text-xl', desc: 'text-sm', iconBox: 40, iconSize: 20, pad: 'pb-4', gap: 'gap-3' },
    lg: { title: 'text-2xl', desc: 'text-base', iconBox: 48, iconSize: 24, pad: 'pb-5', gap: 'gap-4' },
  }
  const s = $derived(sizeMap[size])

  function rootStyle(): string {
    switch (variant) {
      case 'default': return `padding-bottom:${size === 'sm' ? '0.75rem' : size === 'lg' ? '1.25rem' : '1rem'};border-bottom:1px solid var(--karbon-border);margin-bottom:0.25rem;`
      case 'bordered': return `padding:${size === 'sm' ? '0.75rem' : size === 'lg' ? '1.25rem' : '1rem'};border:1px solid var(--karbon-border);border-radius:0.75rem;background:var(--karbon-bg-card);`
      case 'filled': return `padding:${size === 'sm' ? '0.75rem' : size === 'lg' ? '1.5rem' : '1rem'};border-radius:0.75rem;background:color-mix(in srgb,${accent} 8%,transparent);border:1px solid color-mix(in srgb,${accent} 15%,transparent);`
      case 'clean': return ''
      default: return ''
    }
  }
</script>

<div class="{classes?.root ?? className}" style={rootStyle()}>
  <!-- Breadcrumbs -->
  {#if breadcrumbs && breadcrumbs.length > 0}
    <nav class="flex items-center gap-1.5 mb-2 {classes?.breadcrumb ?? ''}" aria-label="Breadcrumb">
      {#each breadcrumbs as crumb, i}
        {#if i > 0}
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--karbon-text-4);"><path d="m9 18 6-6-6-6"/></svg>
        {/if}
        {#if crumb.href && i < breadcrumbs.length - 1}
          <a href={crumb.href} class="text-xs transition-colors" style="color:var(--karbon-text-3);"
            onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.color = accent }}
            onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-3)' }}
          >{crumb.label}</a>
        {:else}
          <span class="text-xs font-medium" style="color:var(--karbon-text-2);">{crumb.label}</span>
        {/if}
      {/each}
    </nav>
  {/if}

  <!-- Back button -->
  {#if backHref}
    <a
      href={backHref}
      class="inline-flex items-center gap-1.5 text-xs font-medium mb-2 transition-colors"
      style="color:var(--karbon-text-3);"
      onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.color = accent }}
      onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-3)' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
      {backLabel}
    </a>
  {/if}

  <!-- Main row -->
  <div class="flex items-start {s.gap}">
    <!-- Icon -->
    {#if icon}
      <div
        class="shrink-0 rounded-xl flex items-center justify-center {classes?.icon ?? ''}"
        style="width:{s.iconBox}px;height:{s.iconBox}px;background:color-mix(in srgb,{accent} 12%,transparent);color:{accentLight};"
      >
        {@render icon()}
      </div>
    {/if}

    <!-- Title + description -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <h1 class="{s.title} font-bold {classes?.title ?? ''}" style="color:var(--karbon-text);margin:0;">{title}</h1>
        {#if badge}
          <span
            class="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style="background:color-mix(in srgb,{accent} 15%,transparent);color:{accentLight};"
          >{badge}</span>
        {/if}
      </div>
      {#if description}
        <p class="{s.desc} mt-1 {classes?.description ?? ''}" style="color:var(--karbon-text-3);margin:0;">{description}</p>
      {/if}
    </div>

    <!-- Actions -->
    {#if actions}
      <div class="shrink-0 flex items-center gap-2 {classes?.actions ?? ''}">
        {@render actions()}
      </div>
    {/if}
  </div>
</div>
