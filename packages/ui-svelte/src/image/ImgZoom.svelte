<script lang="ts">
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    src: string
    zoomSrc?: string
    alt?: string
    zoom?: number
    trigger?: 'hover' | 'click'
    mode?: 'overlay' | 'lens' | 'side'
    lensSize?: number
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    showHint?: boolean
    color?: ButtonColor
    width?: string
    height?: string
    class?: string
    classes?: { root?: string, img?: string, lens?: string, overlay?: string }
  }

  let {
    src,
    zoomSrc,
    alt = '',
    zoom = 2.5,
    trigger = 'hover',
    mode = 'overlay',
    lensSize = 120,
    rounded = 'md',
    showHint = true,
    color,
    width,
    height,
    class: className = '',
    classes = {}
  }: Props = $props()

  let container = $state<HTMLDivElement>()
  let zooming = $state(false)
  let posX = $state(50)
  let posY = $state(50)
  let mouseX = $state(0)
  let mouseY = $state(0)
  let hovered = $state(false)

  const accent = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')
  const zoomImage = $derived(zoomSrc || src)

  const roundedMap: Record<string, string> = {
    none: '0', sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem', full: '9999px'
  }
  const rad = $derived(roundedMap[rounded])

  function updatePosition(e: MouseEvent) {
    if (!container) return
    const rect = container.getBoundingClientRect()
    posX = ((e.clientX - rect.left) / rect.width) * 100
    posY = ((e.clientY - rect.top) / rect.height) * 100
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top
  }

  function handleMouseEnter(e: MouseEvent) {
    hovered = true
    if (trigger === 'hover') { zooming = true; updatePosition(e) }
  }

  function handleMouseMove(e: MouseEvent) {
    if (zooming || hovered) updatePosition(e)
  }

  function handleMouseLeave() {
    hovered = false
    if (trigger === 'hover') zooming = false
  }

  function handleClick(e: MouseEvent) {
    zooming = !zooming
    if (zooming) updatePosition(e)
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
<div
  bind:this={container}
  class="karbon-imgzoom relative overflow-hidden inline-block {classes?.root ?? className}"
  style="border-radius:{rad};{width ? `width:${width};` : ''}{height ? `height:${height};` : ''}cursor:{zooming ? 'crosshair' : trigger === 'click' ? 'zoom-in' : 'crosshair'};"
  role="img"
  aria-label={alt || 'Image zoomable'}
  tabindex={0}
  onmouseenter={handleMouseEnter}
  onmousemove={handleMouseMove}
  onmouseleave={handleMouseLeave}
  onclick={trigger === 'click' ? handleClick : undefined}
  onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); zooming = !zooming } }}
>
  <!-- Base image -->
  <img
    {src}
    {alt}
    class="w-full h-full object-cover block transition-transform duration-200 {classes?.img ?? ''}"
    style={zooming && mode === 'overlay' ? `transform:scale(${zoom});transform-origin:${posX}% ${posY}%;` : ''}
    loading="lazy"
    draggable="false"
  />

  <!-- Hint icon -->
  {#if showHint && !zooming && hovered}
    <div
      class="absolute top-3 right-3 rounded-full px-2 py-1 flex items-center gap-1 pointer-events-none"
      style="background:rgba(0,0,0,0.5);color:white;font-size:11px;backdrop-filter:blur(4px);opacity:0.8;"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
      <span>Zoom</span>
    </div>
  {/if}

  <!-- Lens mode -->
  {#if mode === 'lens' && zooming}
    <div
      class="absolute rounded-full pointer-events-none shadow-xl {classes?.lens ?? ''}"
      style="
        width:{lensSize}px;height:{lensSize}px;
        left:{mouseX - lensSize / 2}px;top:{mouseY - lensSize / 2}px;
        background-image:url({zoomImage});
        background-size:{zoom * 100}%;
        background-position:{posX}% {posY}%;
        background-repeat:no-repeat;
        border:3px solid {accent};
        box-shadow:0 0 0 1px rgba(0,0,0,0.1),0 8px 25px rgba(0,0,0,0.3);
        z-index:10;
      "
    ></div>
    <!-- Crosshair on source -->
    <div
      class="absolute pointer-events-none"
      style="
        width:{lensSize / zoom}px;height:{lensSize / zoom}px;
        left:{mouseX - lensSize / zoom / 2}px;top:{mouseY - lensSize / zoom / 2}px;
        border:1.5px solid {accent};
        border-radius:2px;
        background:color-mix(in srgb,{accent} 8%,transparent);
        z-index:5;
      "
    ></div>
  {/if}

  <!-- Overlay mode zoom layer (CSS transform on img handles this) -->

  <!-- Side mode -->
  {#if mode === 'side' && zooming}
    <div
      class="absolute top-0 shadow-2xl pointer-events-none {classes?.overlay ?? ''}"
      style="
        left:calc(100% + 12px);
        width:{container?.offsetWidth || 300}px;
        height:{container?.offsetHeight || 300}px;
        background-image:url({zoomImage});
        background-size:{zoom * 100}%;
        background-position:{posX}% {posY}%;
        background-repeat:no-repeat;
        border-radius:{rad};
        border:1px solid var(--karbon-border);
        z-index:10;
      "
    ></div>
    <!-- Crosshair indicator -->
    <div
      class="absolute pointer-events-none"
      style="
        width:{100 / zoom}%;height:{100 / zoom}%;
        left:{posX - 50 / zoom}%;top:{posY - 50 / zoom}%;
        border:2px solid {accent};
        background:color-mix(in srgb,{accent} 10%,transparent);
        z-index:5;
      "
    ></div>
  {/if}
</div>
