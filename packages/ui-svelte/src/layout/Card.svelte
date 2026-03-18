<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { CardVariant, CardPadding } from '@karbonjs/ui-core'

  interface Props {
    variant?: CardVariant
    padding?: CardPadding
    hoverable?: boolean
    title?: string
    icon?: any
    class?: string
    children: Snippet
    header?: Snippet
    footer?: Snippet
  }

  let {
    variant = 'default',
    padding = 'md',
    hoverable = false,
    title = '',
    icon: Icon,
    class: className = '',
    children,
    header,
    footer
  }: Props = $props()

  const variantClasses: Record<string, string> = {
    default: 'bg-[var(--karbon-bg-card,#fff)] border border-[var(--karbon-border,rgba(0,0,0,0.07))]',
    elevated: 'bg-[var(--karbon-bg-card,#fff)] shadow-lg',
    outlined: 'border-2 border-[var(--karbon-border,rgba(0,0,0,0.07))]',
    ghost: 'bg-transparent'
  }

  const paddingClasses: Record<string, string> = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8'
  }
</script>

<div class="rounded-xl overflow-hidden {variantClasses[variant]} {hoverable ? 'transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5' : ''} {className}">
  {#if header}
    <div class="px-5 py-3.5 border-b border-[var(--karbon-border,rgba(0,0,0,0.07))]">
      {@render header()}
    </div>
  {:else if title}
    <div class="flex items-center gap-2 px-5 py-3.5 border-b border-[var(--karbon-border,rgba(0,0,0,0.07))] text-[var(--karbon-text-2,#5a567e)] text-[0.825rem] font-semibold">
      {#if Icon}
        <Icon class="w-4 h-4" />
      {/if}
      <span>{title}</span>
    </div>
  {/if}

  <div class={paddingClasses[padding]}>
    {@render children()}
  </div>

  {#if footer}
    <div class="px-5 py-3.5 border-t border-[var(--karbon-border,rgba(0,0,0,0.07))]">
      {@render footer()}
    </div>
  {/if}
</div>
