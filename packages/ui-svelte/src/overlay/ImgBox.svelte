<script lang="ts">
  import type { OverlayBackdrop } from '@karbonjs/ui-core'

  interface Props {
    images: string[]
    index?: number
    open: boolean
    backdrop?: OverlayBackdrop
    captions?: string[]
    class?: string
    classes?: { root?: string, backdrop?: string, image?: string }
    onclose: () => void
  }

  let {
    images,
    index = $bindable(0),
    open = $bindable(false),
    backdrop = 'blur',
    captions = [],
    class: className = '',
    classes = {},
    onclose
  }: Props = $props()

  let scale = $state(1)
  let translateX = $state(0)
  let translateY = $state(0)
  let dragging = $state(false)
  let visible = $state(false)
  let portal: HTMLDivElement | null = $state(null)
  let transitioning = $state(false)
  let showThumbs = $state(false)

  const backdropClasses: Record<string, string> = {
    blur: 'bg-black/70 backdrop-blur-xl',
    dark: 'bg-black/90',
    transparent: 'bg-black/40 backdrop-blur-sm',
    none: ''
  }

  const hasPrev = $derived(index > 0)
  const hasNext = $derived(index < images.length - 1)
  const caption = $derived(captions[index] ?? '')

  // Teleport to <body> to escape any parent transform/overflow
  function teleport(node: HTMLElement) {
    document.body.appendChild(node)
    return {
      destroy() {
        node.remove()
      }
    }
  }

  $effect(() => {
    if (open) {
      requestAnimationFrame(() => { visible = true })
      return () => { visible = false }
    }
  })

  function close() {
    visible = false
    setTimeout(() => onclose(), 350)
  }

  function prev() {
    if (hasPrev && !transitioning) {
      transitioning = true
      setTimeout(() => { index--; resetTransform(); transitioning = false }, 150)
    }
  }

  function next() {
    if (hasNext && !transitioning) {
      transitioning = true
      setTimeout(() => { index++; resetTransform(); transitioning = false }, 150)
    }
  }

  function goTo(i: number) {
    if (i === index || transitioning) return
    transitioning = true
    setTimeout(() => { index = i; resetTransform(); transitioning = false }, 150)
  }

  function handleDblClick() {
    if (scale > 1) resetTransform()
    else scale = 2.5
  }

  function zoomIn() {
    scale = Math.min(scale + 0.5, 4)
  }

  function zoomOut() {
    scale = Math.max(scale - 0.5, 0.5)
    if (scale <= 1) resetTransform()
  }

  function resetTransform() {
    scale = 1
    translateX = 0
    translateY = 0
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open) return
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === '+' || e.key === '=') zoomIn()
    if (e.key === '-') zoomOut()
  }

  function handleMouseDown(e: MouseEvent) {
    if (scale <= 1) return
    dragging = true
    startX = e.clientX - translateX
    startY = e.clientY - translateY
  }

  let startX = 0
  let startY = 0

  function handleMouseMove(e: MouseEvent) {
    if (!dragging) return
    translateX = e.clientX - startX
    translateY = e.clientY - startY
  }

  function handleMouseUp() {
    dragging = false
  }

  function handleWheel(e: WheelEvent) {
    e.preventDefault()
    if (e.deltaY < 0) zoomIn()
    else zoomOut()
  }
</script>

<svelte:window onkeydown={handleKeydown} onmouseup={handleMouseUp} onmousemove={handleMouseMove} />

{#if open && images.length > 0}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    use:teleport
    data-imgbox-root
    class="imgbox-root {classes?.root ?? className}"
    style="opacity: {visible ? 1 : 0};"
  >
    <!-- Backdrop -->
    <div
      class="imgbox-backdrop {backdropClasses[backdrop]} {classes?.backdrop ?? ''}"
      onclick={() => { if (scale <= 1) close() }}
      role="presentation"
    ></div>

    <!-- Close button -->
    <button
      onclick={close}
      aria-label="Fermer"
      class="imgbox-close"
      style="opacity:{visible ? 1 : 0};transition:opacity 0.3s ease 0.15s,background 0.15s ease,color 0.15s ease;"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>

    <!-- Prev -->
    {#if hasPrev}
      <button
        onclick={prev}
        aria-label="Image precedente"
        class="imgbox-nav imgbox-nav-prev"
        style="opacity:{visible ? 1 : 0};transition:opacity 0.3s ease 0.2s,background 0.15s ease,color 0.15s ease;"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
    {/if}

    <!-- Next -->
    {#if hasNext}
      <button
        onclick={next}
        aria-label="Image suivante"
        class="imgbox-nav imgbox-nav-next"
        style="opacity:{visible ? 1 : 0};transition:opacity 0.3s ease 0.2s,background 0.15s ease,color 0.15s ease;"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    {/if}

    <!-- Image container -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="imgbox-stage {scale > 1 ? 'cursor-grab' : ''} {dragging ? '!cursor-grabbing' : ''}"
      onmousedown={handleMouseDown}
      onwheel={handleWheel}
    >
      <img
        src={images[index]}
        alt={caption || `Image ${index + 1}`}
        class="imgbox-image {classes?.image ?? ''}"
        style="
          transform: scale({visible ? scale : 0.7}) translate({translateX / scale}px, {translateY / scale}px);
          opacity: {visible && !transitioning ? 1 : 0};
          filter: {visible ? 'blur(0)' : 'blur(8px)'};
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, filter 0.3s ease;
        "
        draggable="false"
        ondblclick={handleDblClick}
      />
    </div>

    <!-- Caption -->
    {#if caption}
      <div class="imgbox-caption">
        <span style="background:rgba(0,0,0,0.5);color:rgba(255,255,255,0.85);backdrop-filter:blur(8px);padding:6px 14px;border-radius:8px;font-size:13px;">{caption}</span>
      </div>
    {/if}

    <!-- Counter + thumbnails toggle -->
    {#if images.length > 1}
      <div class="imgbox-counter">
        <div style="display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.4);border-radius:9999px;padding:4px 12px;backdrop-filter:blur(8px);">
          <span style="color:rgba(255,255,255,0.5);font-size:12px;">{index + 1} / {images.length}</span>
          <button
            onclick={() => showThumbs = !showThumbs}
            style="color:rgba(255,255,255,{showThumbs ? '0.9' : '0.4'});cursor:pointer;background:none;border:none;padding:2px;"
            aria-label="Afficher les miniatures"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>
          </button>
        </div>
      </div>
    {/if}

    <!-- Thumbnails strip -->
    {#if showThumbs && images.length > 1}
      <div class="imgbox-thumbs">
        <div style="display:flex;gap:6px;padding:8px 12px;background:rgba(0,0,0,0.5);border-radius:12px;backdrop-filter:blur(12px);">
          {#each images as img, i}
            <button
              onclick={() => goTo(i)}
              style="width:48px;height:36px;border-radius:6px;overflow:hidden;border:{i === index ? '2px solid white' : '2px solid transparent'};opacity:{i === index ? 1 : 0.5};cursor:pointer;padding:0;transition:all 0.15s ease;flex-shrink:0;"
              aria-label="Image {i + 1}"
            >
              <img src={img} alt="" style="width:100%;height:100%;object-fit:cover;" draggable="false" />
            </button>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Zoom controls -->
    <div class="imgbox-controls" style="opacity: {visible ? 1 : 0};">
      <div class="flex items-center gap-1 bg-black/40 rounded-full px-3 py-1.5">
        <button onclick={zoomOut} aria-label="Dezoomer" class="text-white/60 hover:text-white transition-colors cursor-pointer p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
        </button>
        <span class="text-white/80 text-xs font-medium min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
        <button onclick={zoomIn} aria-label="Zoomer" class="text-white/60 hover:text-white transition-colors cursor-pointer p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
        </button>
        <button onclick={resetTransform} aria-label="Reinitialiser" class="text-white/60 hover:text-white transition-colors cursor-pointer p-1 ml-1 border-l border-white/20 pl-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .imgbox-root {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    transition: opacity 0.3s ease;
  }

  .imgbox-backdrop {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: auto;
    cursor: default;
    transition: opacity 0.4s ease;
  }

  .imgbox-close {
    border-radius: 9999px;
    padding: 0.625rem;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(0, 0, 0, 0.3);
    transition: all 0.15s ease;
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
    pointer-events: auto;
    border: none;
  }

  .imgbox-close:hover {
    color: white;
    background: rgba(0, 0, 0, 0.5);
  }

  .imgbox-nav {
    border-radius: 9999px;
    padding: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
    background: rgba(0, 0, 0, 0.2);
    transition: all 0.15s ease;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    pointer-events: auto;
    border: none;
  }

  .imgbox-nav:hover {
    color: white;
    background: rgba(0, 0, 0, 0.5);
  }

  .imgbox-nav-prev { left: 16px; }
  .imgbox-nav-next { right: 16px; }

  .imgbox-stage {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 48px;
    pointer-events: auto;
  }

  .imgbox-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    user-select: none;
    transition: transform 0.15s ease;
    pointer-events: none;
  }

  .imgbox-caption {
    position: absolute;
    top: 16px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 10;
    pointer-events: none;
  }

  .imgbox-counter {
    position: absolute;
    bottom: 80px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 10;
    pointer-events: auto;
  }

  .imgbox-thumbs {
    position: absolute;
    bottom: 56px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 10;
    pointer-events: auto;
    animation: karbon-imgbox-thumbs-in 0.2s ease;
  }

  @keyframes karbon-imgbox-thumbs-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .imgbox-controls {
    position: absolute;
    bottom: 16px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 10;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .imgbox-controls > div {
    pointer-events: auto;
  }
</style>
