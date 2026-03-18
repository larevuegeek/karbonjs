<script lang="ts">
  import type { ImageRounded, ImgZoomTrigger } from '@karbonjs/ui-core'

  interface Props {
    src: string
    zoomSrc?: string
    alt?: string
    zoom?: number
    trigger?: ImgZoomTrigger
    rounded?: ImageRounded
    class?: string
  }

  let {
    src,
    zoomSrc,
    alt = '',
    zoom = 2,
    trigger = 'hover',
    rounded = 'md',
    class: className = ''
  }: Props = $props()

  let container = $state<HTMLElement>(undefined!)
  let zooming = $state(false)
  let posX = $state(50)
  let posY = $state(50)

  const roundedClasses: Record<string, string> = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full'
  }

  const zoomImage = $derived(zoomSrc || src)

  function updatePosition(e: MouseEvent) {
    const rect = container.getBoundingClientRect()
    posX = ((e.clientX - rect.left) / rect.width) * 100
    posY = ((e.clientY - rect.top) / rect.height) * 100
  }

  function handleMouseEnter(e: MouseEvent) {
    if (trigger === 'hover') { zooming = true; updatePosition(e) }
  }

  function handleMouseMove(e: MouseEvent) {
    if (zooming) updatePosition(e)
  }

  function handleMouseLeave() {
    if (trigger === 'hover') zooming = false
  }

  function handleClick(e: MouseEvent) {
    zooming = !zooming
    if (zooming) updatePosition(e)
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); zooming = !zooming }
  }
</script>

{#if trigger === 'click'}
  <button
    type="button"
    bind:this={container}
    class="relative overflow-hidden {roundedClasses[rounded]} bg-transparent border-none p-0 m-0 block {zooming ? 'cursor-zoom-out' : 'cursor-zoom-in'} {className}"
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    onclick={handleClick}
  >
    <img {src} {alt} class="w-full h-full object-cover block" loading="lazy" />
    {#if zooming}
      <span class="absolute inset-0 pointer-events-none" style="background-image: url({zoomImage}); background-size: {zoom * 100}%; background-position: {posX}% {posY}%; background-repeat: no-repeat;"></span>
    {/if}
  </button>
{:else}
  <div
    bind:this={container}
    role="img"
    aria-label={alt || 'Zoomable image'}
    class="relative overflow-hidden {roundedClasses[rounded]} {className}"
    onmouseenter={handleMouseEnter}
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
  >
    <img {src} {alt} class="w-full h-full object-cover block" loading="lazy" />
    {#if zooming}
      <div class="absolute inset-0 pointer-events-none" style="background-image: url({zoomImage}); background-size: {zoom * 100}%; background-position: {posX}% {posY}%; background-repeat: no-repeat;"></div>
    {/if}
  </div>
{/if}
