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
    backdrop = 'blur',
    captions = [],
    class: className = '',
    onclose
  }: Props = $props()

  let scale = $state(1)
  let translateX = $state(0)
  let translateY = $state(0)
  let dragging = $state(false)
  let visible = $state(false)
  let startX = 0
  let startY = 0

  const backdropClasses: Record<string, string> = {
    blur: 'bg-black/70 backdrop-blur-xl',
    dark: 'bg-black/90',
    transparent: 'bg-black/40 backdrop-blur-sm',
    none: ''
  }

  const hasPrev = $derived(index > 0)
  const hasNext = $derived(index < images.length - 1)
  const caption = $derived(captions[index] ?? '')

  // Animate in
  $effect(() => {
    if (open) {
      requestAnimationFrame(() => { visible = true })
    } else {
      visible = false
    }
  })

  function close() {
    visible = false
    setTimeout(() => onclose(), 200)
  }

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
  <div
    class="fixed inset-0 z-[99999] flex items-center justify-center transition-opacity duration-200 {backdropClasses[backdrop]} {className}"
    style="opacity: {visible ? 1 : 0}"
  >
    <!-- Close button -->
    <button
      onclick={close}
      aria-label="Fermer"
      class="absolute top-4 right-4 z-10 rounded-full p-2.5 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 transition-all cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>

    <!-- Zoom controls -->
    <div class="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-black/40 rounded-full px-3 py-1.5 transition-opacity duration-300" style="opacity: {visible ? 1 : 0}">
      <button onclick={zoomOut} aria-label="Dézoomer" class="text-white/60 hover:text-white transition-colors cursor-pointer p-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
      </button>
      <span class="text-white/80 text-xs font-medium min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
      <button onclick={zoomIn} aria-label="Zoomer" class="text-white/60 hover:text-white transition-colors cursor-pointer p-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
      </button>
      <button onclick={resetTransform} aria-label="Réinitialiser" class="text-white/60 hover:text-white transition-colors cursor-pointer p-1 ml-1 border-l border-white/20 pl-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
      </button>
    </div>

    <!-- Prev -->
    {#if hasPrev}
      <button
        onclick={prev}
        aria-label="Image précédente"
        class="absolute left-4 z-10 rounded-full p-3 text-white/60 hover:text-white bg-black/20 hover:bg-black/50 transition-all cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
    {/if}

    <!-- Next -->
    {#if hasNext}
      <button
        onclick={next}
        aria-label="Image suivante"
        class="absolute right-4 z-10 rounded-full p-3 text-white/60 hover:text-white bg-black/20 hover:bg-black/50 transition-all cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    {/if}

    <!-- Image -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      class="flex items-center justify-center w-full h-full p-12 {scale > 1 ? 'cursor-grab' : ''} {dragging ? 'cursor-grabbing' : ''}"
      onclick={(e) => { if (e.target === e.currentTarget && scale <= 1) close() }}
      onmousedown={handleMouseDown}
      onwheel={handleWheel}
    >
      <img
        src={images[index]}
        alt={caption || `Image ${index + 1}`}
        class="max-w-full max-h-full object-contain select-none transition-all duration-200"
        style="transform: scale({visible ? scale : 0.9}) translate({translateX / scale}px, {translateY / scale}px); opacity: {visible ? 1 : 0}"
        draggable="false"
      />
    </div>

    <!-- Counter only (no caption on image) -->
    {#if images.length > 1}
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/40 rounded-full px-3 py-1">
        <span class="text-white/60 text-xs">{index + 1} / {images.length}</span>
      </div>
    {/if}
  </div>
{/if}
