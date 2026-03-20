<script lang="ts">
  import type { AvatarSize } from '@karbonjs/ui-core'

  interface Props {
    src?: string
    alt?: string
    name?: string
    size?: AvatarSize
    color?: string
    class?: string
    classes?: { root?: string }
  }

  let {
    src = '',
    alt = '',
    name = '',
    size = 'md',
    color,
    class: className = '',
    classes = {}
  }: Props = $props()

  let errored = $state(false)

  const sizeClasses: Record<string, string> = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl'
  }

  const initials = $derived(
    (name || alt || 'A').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  )

  const showImage = $derived(src && !errored)

  const colorStyle = $derived.by(() => {
    if (!color) return ''
    return `background:color-mix(in srgb,var(--karbon-${color}-500) 15%,transparent);color:var(--karbon-${color}-400)`
  })

  const defaultBgClass = $derived(color ? '' : 'bg-[var(--karbon-bg-2,#e8e6f0)] text-[var(--karbon-text-2,#5a567e)]')
</script>

<div
  class="relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden font-semibold {defaultBgClass} {sizeClasses[size]} {classes?.root ?? className}"
  style={colorStyle}
>
  {#if showImage}
    <img
      {src}
      alt={alt || name}
      onerror={() => errored = true}
      class="w-full h-full object-cover"
    />
  {:else}
    <span>{initials}</span>
  {/if}
</div>
