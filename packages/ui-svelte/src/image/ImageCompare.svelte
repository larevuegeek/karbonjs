<script lang="ts">
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    before: string
    after: string
    beforeLabel?: string
    afterLabel?: string
    initialPosition?: number
    orientation?: 'horizontal' | 'vertical'
    color?: ButtonColor
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    showLabels?: boolean
    showHandle?: boolean
    width?: string
    height?: string
    class?: string
    classes?: { root?: string, before?: string, after?: string, handle?: string, label?: string }
  }

  let {
    before,
    after,
    beforeLabel = 'Avant',
    afterLabel = 'Apres',
    initialPosition = 50,
    orientation = 'horizontal',
    color,
    rounded = 'lg',
    showLabels = true,
    showHandle = true,
    width,
    height,
    class: className = '',
    classes = {}
  }: Props = $props()

  let position = $state(initialPosition)
  let dragging = $state(false)
  let containerEl: HTMLDivElement

  const accent = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')
  const isHorizontal = $derived(orientation === 'horizontal')

  const roundedMap: Record<string, string> = {
    none: '0', sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem'
  }
  const rad = $derived(roundedMap[rounded])

  function updatePosition(e: MouseEvent | TouchEvent) {
    if (!containerEl) return
    const rect = containerEl.getBoundingClientRect()
    let clientPos: number
    let size: number

    if ('touches' in e) {
      clientPos = isHorizontal ? e.touches[0].clientX - rect.left : e.touches[0].clientY - rect.top
    } else {
      clientPos = isHorizontal ? e.clientX - rect.left : e.clientY - rect.top
    }
    size = isHorizontal ? rect.width : rect.height
    position = Math.min(Math.max((clientPos / size) * 100, 0), 100)
  }

  function handleMouseDown(e: MouseEvent) {
    e.preventDefault()
    dragging = true
    updatePosition(e)
  }

  function handleTouchStart(e: TouchEvent) {
    dragging = true
    updatePosition(e)
  }

  function handleMove(e: MouseEvent) {
    if (dragging) updatePosition(e)
  }

  function handleTouchMove(e: TouchEvent) {
    if (dragging) { e.preventDefault(); updatePosition(e) }
  }

  function handleEnd() {
    dragging = false
  }
</script>

<svelte:window
  onmousemove={handleMove}
  onmouseup={handleEnd}
  ontouchmove={handleTouchMove}
  ontouchend={handleEnd}
/>

<div
  bind:this={containerEl}
  class="karbon-imgcompare relative select-none overflow-hidden {classes?.root ?? className}"
  style="border-radius:{rad};{width ? `width:${width};` : 'width:100%;'}{height ? `height:${height};` : ''}aspect-ratio:{height ? 'auto' : '16/10'};cursor:{dragging ? 'grabbing' : 'col-resize'};"
  onmousedown={handleMouseDown}
  ontouchstart={handleTouchStart}
  role="slider"
  aria-valuenow={Math.round(position)}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Comparateur d'images"
  tabindex={0}
  onkeydown={(e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); position = Math.max(position - 2, 0) }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); position = Math.min(position + 2, 100) }
  }}
>
  <!-- After image (background, full) -->
  <img
    src={after}
    alt={afterLabel}
    class="absolute inset-0 w-full h-full object-cover {classes?.after ?? ''}"
    draggable="false"
  />

  <!-- Before image (clipped via clip-path) -->
  <img
    src={before}
    alt={beforeLabel}
    class="absolute inset-0 w-full h-full object-cover {classes?.before ?? ''}"
    style="clip-path:{isHorizontal ? `inset(0 ${100 - position}% 0 0)` : `inset(0 0 ${100 - position}% 0)`};"
    draggable="false"
  />

  <!-- Divider line -->
  <div
    class="absolute"
    style="{isHorizontal
      ? `left:${position}%;top:0;bottom:0;width:2px;transform:translateX(-1px);`
      : `top:${position}%;left:0;right:0;height:2px;transform:translateY(-1px);`
    }background:{accent};z-index:5;pointer-events:none;"
  ></div>

  <!-- Handle -->
  {#if showHandle}
    <div
      class="absolute z-10"
      style="{isHorizontal
        ? `left:${position}%;top:50%;transform:translate(-50%,-50%);`
        : `top:${position}%;left:50%;transform:translate(-50%,-50%);`
      }pointer-events:none;"
    >
      <div
        class="rounded-full flex items-center justify-center shadow-lg {classes?.handle ?? ''}"
        style="width:36px;height:36px;background:{accent};color:white;box-shadow:0 2px 10px rgba(0,0,0,0.3),0 0 0 3px rgba(255,255,255,0.3);"
      >
        {#if isHorizontal}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15-5-5 5-5"/><path d="m17 9 5 5-5 5"/></svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 7-5-5-5 5"/><path d="m9 17 5 5 5-5"/></svg>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Labels -->
  {#if showLabels}
    <div
      class="absolute z-5 pointer-events-none {classes?.label ?? ''}"
      style="{isHorizontal ? 'top:12px;left:12px;' : 'top:12px;left:12px;'}"
    >
      <span
        class="rounded-md px-2 py-1 text-[11px] font-semibold"
        style="background:rgba(0,0,0,0.5);color:white;backdrop-filter:blur(4px);"
      >{beforeLabel}</span>
    </div>
    <div
      class="absolute z-5 pointer-events-none {classes?.label ?? ''}"
      style="{isHorizontal ? 'top:12px;right:12px;' : 'bottom:12px;right:12px;'}"
    >
      <span
        class="rounded-md px-2 py-1 text-[11px] font-semibold"
        style="background:rgba(0,0,0,0.5);color:white;backdrop-filter:blur(4px);"
      >{afterLabel}</span>
    </div>
  {/if}
</div>
