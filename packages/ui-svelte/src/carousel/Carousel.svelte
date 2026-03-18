<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    images?: string[]
    autoplay?: number
    loop?: boolean
    arrows?: boolean
    indicators?: boolean
    class?: string
    children?: Snippet
  }

  let {
    images = [],
    autoplay = 0,
    loop = false,
    arrows = true,
    indicators = true,
    class: className = '',
    children
  }: Props = $props()

  let current = $state(0)
  let timer: ReturnType<typeof setInterval> | null = null

  const hasSlots = $derived(!!children)
  const total = $derived(hasSlots ? 0 : images.length)
  const hasPrev = $derived(loop || current > 0)
  const hasNext = $derived(loop || current < total - 1)

  function goTo(i: number) {
    if (total === 0) return
    if (loop) {
      current = ((i % total) + total) % total
    } else {
      current = Math.max(0, Math.min(i, total - 1))
    }
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

  $effect(() => {
    startAutoplay()
    return stopAutoplay
  })
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="relative overflow-hidden rounded-xl {className}"
  onmouseenter={stopAutoplay}
  onmouseleave={startAutoplay}
>
  {#if hasSlots}
    {@render children()}
  {:else}
    <div
      class="flex transition-transform duration-500 ease-out"
      style="transform: translateX(-{current * 100}%)"
    >
      {#each images as src, i}
        <div class="w-full shrink-0">
          <img
            {src}
            alt="Slide {i + 1}"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      {/each}
    </div>
  {/if}

  {#if arrows && total > 1}
    {#if hasPrev}
      <button
        onclick={prev}
        aria-label="Slide précédent"
        class="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-black/30 text-white/80 hover:bg-black/50 hover:text-white transition-colors cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
    {/if}
    {#if hasNext}
      <button
        onclick={next}
        aria-label="Slide suivant"
        class="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-black/30 text-white/80 hover:bg-black/50 hover:text-white transition-colors cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    {/if}
  {/if}

  {#if indicators && total > 1}
    <div class="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
      {#each images as _, i}
        <button
          onclick={() => goTo(i)}
          aria-label="Aller au slide {i + 1}"
          class="w-2 h-2 rounded-full transition-all cursor-pointer {i === current ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/60'}"
        ></button>
      {/each}
    </div>
  {/if}
</div>
