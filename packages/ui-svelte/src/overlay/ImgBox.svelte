<script lang="ts">
  import type { OverlayBackdrop } from '@karbonjs/ui-core'

  interface Props {
    images: string[]
    index?: number
    open: boolean
    backdrop?: OverlayBackdrop
    captions?: string[]
    class?: string
    onclose: () => void
  }

  let {
    images,
    index = $bindable(0),
    open = $bindable(false),
    backdrop = 'dark',
    captions = [],
    class: className = '',
    onclose
  }: Props = $props()

  let scale = $state(1)
  let translateX = $state(0)
  let translateY = $state(0)
  let dragging = $state(false)
  let startX = 0
  let startY = 0

  const backdropClasses: Record<string, string> = {
    blur: 'bg-black/80 backdrop-blur-md',
    dark: 'bg-black/90',
    transparent: 'bg-transparent',
    none: ''
  }

  const hasPrev = $derived(index > 0)
  const hasNext = $derived(index < images.length - 1)
  const caption = $derived(captions[index] ?? '')

  function prev() {
    if (hasPrev) { index--; resetTransform() }
  }

  function next() {
    if (hasNext) { index++; resetTransform() }
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
    if (e.key === 'Escape') onclose()
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
  <div class="fixed inset-0 z-[70] flex items-center justify-center {backdropClasses[backdrop]} {className}">
    <!-- Close button -->
    <button
      onclick={onclose}
      aria-label="Fermer"
      class="absolute top-4 right-4 z-10 rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>

    <!-- Zoom controls -->
    <div class="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-black/40 rounded-full px-3 py-1.5">
      <button onclick={zoomOut} aria-label="Dézoomer" class="text-white/60 hover:text-white transition-colors cursor-pointer p-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
      </button>
      <span class="text-white/80 text-xs font-medium min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
      <button onclick={zoomIn} aria-label="Zoomer" class="text-white/60 hover:text-white transition-colors cursor-pointer p-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
      </button>
    </div>

    <!-- Prev -->
    {#if hasPrev}
      <button
        onclick={prev}
        aria-label="Image précédente"
        class="absolute left-4 z-10 rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
    {/if}

    <!-- Next -->
    {#if hasNext}
      <button
        onclick={next}
        aria-label="Image suivante"
        class="absolute right-4 z-10 rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    {/if}

    <!-- Image -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      class="flex items-center justify-center w-full h-full p-16 {scale > 1 ? 'cursor-grab' : ''} {dragging ? 'cursor-grabbing' : ''}"
      onclick={(e) => { if (e.target === e.currentTarget && scale <= 1) onclose() }}
      onmousedown={handleMouseDown}
      onwheel={handleWheel}
    >
      <img
        src={images[index]}
        alt={caption || `Image ${index + 1}`}
        class="max-w-full max-h-full object-contain select-none transition-transform duration-150"
        style="transform: scale({scale}) translate({translateX / scale}px, {translateY / scale}px)"
        draggable="false"
      />
    </div>

    <!-- Caption + counter -->
    {#if caption || images.length > 1}
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-center">
        {#if caption}
          <p class="text-white/80 text-sm mb-1">{caption}</p>
        {/if}
        {#if images.length > 1}
          <span class="text-white/40 text-xs">{index + 1} / {images.length}</span>
        {/if}
      </div>
    {/if}
  </div>
{/if}
