<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    /** Image URLs for simple image carousel */
    images?: string[]
    /** Number of slides to show at once */
    slidesPerView?: number
    /** Gap between slides in px */
    gap?: number
    /** Peek amount — show edges of prev/next slides */
    peek?: number
    /** Transition mode */
    transition?: 'slide' | 'fade'
    autoplay?: number
    loop?: boolean
    arrows?: boolean
    indicators?: boolean
    color?: ButtonColor
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    aspectRatio?: string
    draggable?: boolean
    class?: string
    classes?: { root?: string, track?: string, slide?: string, arrow?: string, indicators?: string }
    onchange?: (index: number) => void
    /** Custom slides via snippet — receives (index, goTo, total) */
    slides?: Snippet<[number]>[]
    /** Alternative: render function per slide index */
    slide?: Snippet<[number]>
    /** Total slides when using slot mode */
    total?: number
    children?: Snippet
  }

  let {
    images = [],
    slidesPerView = 1,
    gap = 0,
    peek = 0,
    transition = 'slide',
    autoplay = 0,
    loop = false,
    arrows = true,
    indicators = true,
    color,
    rounded = 'lg',
    aspectRatio,
    draggable = true,
    class: className = '',
    classes = {},
    onchange,
    slide,
    total: totalProp,
    children
  }: Props = $props()

  let current = $state(0)
  let timer: ReturnType<typeof setInterval> | null = null
  let trackEl = $state<HTMLElement>()
  let dragStartX = 0
  let dragDelta = $state(0)
  let isDragging = $state(false)

  const accent = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')

  const roundedMap: Record<string, string> = {
    none: '0', sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem'
  }
  const rad = $derived(roundedMap[rounded])

  const total = $derived(totalProp ?? images.length)
  const maxIndex = $derived(Math.max(0, total - slidesPerView))
  const hasPrev = $derived(loop || current > 0)
  const hasNext = $derived(loop || current < maxIndex)
  const useSlot = $derived(!!slide || !!children)

  function goTo(i: number) {
    if (total === 0) return
    if (loop) {
      current = ((i % total) + total) % total
    } else {
      current = Math.max(0, Math.min(i, maxIndex))
    }
    onchange?.(current)
  }

  function prev() { goTo(current - 1) }
  function next() { goTo(current + 1) }

  function startAutoplay() {
    if (autoplay > 0 && total > 1) {
      timer = setInterval(next, autoplay)
    }
  }

  function stopAutoplay() {
    if (timer) { clearInterval(timer); timer = null }
  }

  // Drag / Swipe
  function handleDragStart(e: MouseEvent | TouchEvent) {
    if (!draggable) return
    isDragging = true
    dragDelta = 0
    dragStartX = 'touches' in e ? e.touches[0].clientX : e.clientX
    stopAutoplay()
  }

  function handleDragMove(e: MouseEvent | TouchEvent) {
    if (!isDragging) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    dragDelta = clientX - dragStartX
  }

  function handleDragEnd() {
    if (!isDragging) return
    isDragging = false
    const threshold = trackEl ? trackEl.offsetWidth * 0.15 : 80
    if (dragDelta < -threshold) next()
    else if (dragDelta > threshold) prev()
    dragDelta = 0
    startAutoplay()
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
  }

  $effect(() => {
    startAutoplay()
    return stopAutoplay
  })

  // Compute slide width percentage
  const slideWidth = $derived(100 / slidesPerView)

  // Track offset
  const trackOffset = $derived.by(() => {
    if (transition === 'fade') return 0
    const peekOffset = peek > 0 ? peek : 0
    return -(current * (slideWidth)) + (peekOffset > 0 ? (peekOffset / (trackEl?.offsetWidth || 1)) * 100 : 0)
  })
</script>

<svelte:window onmouseup={handleDragEnd} onmousemove={handleDragMove} ontouchend={handleDragEnd} />

<!-- svelte-ignore a11y_no_noninteractive_tabindex a11y_no_noninteractive_element_interactions -->
<div
  role="region"
  aria-label="Carousel"
  aria-roledescription="carousel"
  class="relative overflow-hidden {classes?.root ?? className}"
  style="border-radius:{rad};"
  onmouseenter={stopAutoplay}
  onmouseleave={() => { if (!isDragging) startAutoplay() }}
  onkeydown={handleKeydown}
  tabindex={0}
>
  {#if children}
    <!-- Legacy: raw children -->
    {@render children()}
  {:else if transition === 'fade'}
    <!-- Fade mode -->
    <div class="relative {classes?.track ?? ''}" style="{aspectRatio ? `aspect-ratio:${aspectRatio};` : ''}">
      {#each Array(total) as _, i}
        <div
          class="absolute inset-0 transition-opacity duration-500 {classes?.slide ?? ''}"
          style="opacity:{i === current ? 1 : 0};z-index:{i === current ? 1 : 0};"
        >
          {#if slide}
            {@render slide(i)}
          {:else if images[i]}
            <img src={images[i]} alt="Slide {i + 1}" class="w-full h-full object-cover" loading="lazy" draggable="false" />
          {/if}
        </div>
      {/each}
    </div>
  {:else}
    <!-- Slide mode -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      bind:this={trackEl}
      role="group"
      aria-label="Slides"
      class="flex {classes?.track ?? ''}"
      style="transform:translateX(calc({trackOffset}% + {dragDelta}px));transition:{isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16,1,0.3,1)'};gap:{gap}px;{peek ? `padding:0 ${peek}px;` : ''}"
      onmousedown={handleDragStart}
      ontouchstart={handleDragStart}
      ontouchmove={(e) => { if (isDragging) { e.preventDefault(); handleDragMove(e) } }}
    >
      {#each Array(total) as _, i}
        <div
          class="shrink-0 {classes?.slide ?? ''}"
          style="width:calc({slideWidth}% - {gap * (slidesPerView - 1) / slidesPerView}px);{aspectRatio ? `aspect-ratio:${aspectRatio};` : ''}cursor:{draggable ? (isDragging ? 'grabbing' : 'grab') : 'default'};"
        >
          {#if slide}
            {@render slide(i)}
          {:else if images[i]}
            <img
              src={images[i]}
              alt="Slide {i + 1}"
              class="w-full h-full object-cover select-none"
              style="border-radius:{slidesPerView > 1 ? rad : '0'};"
              loading="lazy"
              draggable="false"
            />
          {/if}
        </div>
      {/each}
    </div>
  {/if}

  <!-- Arrows -->
  {#if arrows && total > slidesPerView}
    {#if hasPrev}
      <button
        onclick={prev}
        aria-label="Precedent"
        class="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2.5 transition-all cursor-pointer {classes?.arrow ?? ''}"
        style="background:rgba(0,0,0,0.4);color:white;backdrop-filter:blur(4px);"
        onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.6)' }}
        onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.4)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
    {/if}
    {#if hasNext}
      <button
        onclick={next}
        aria-label="Suivant"
        class="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2.5 transition-all cursor-pointer {classes?.arrow ?? ''}"
        style="background:rgba(0,0,0,0.4);color:white;backdrop-filter:blur(4px);"
        onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.6)' }}
        onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.4)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    {/if}
  {/if}

  <!-- Indicators -->
  {#if indicators && total > 1}
    <div class="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 {classes?.indicators ?? ''}">
      {#each Array(Math.min(total, total - slidesPerView + 1)) as _, i}
        <button
          onclick={() => goTo(i)}
          aria-label="Slide {i + 1}"
          class="rounded-full transition-all duration-300 cursor-pointer"
          style="width:{i === current ? '20px' : '8px'};height:8px;background:{i === current ? accent : 'rgba(255,255,255,0.4)'};"
        ></button>
      {/each}
    </div>
  {/if}
</div>
