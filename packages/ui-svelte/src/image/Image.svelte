<script lang="ts">
  import type { ImageHover, ImageRounded, ImageAspect } from '@karbonjs/ui-core'
  import ImgBox from '../overlay/ImgBox.svelte'

  interface Props {
    src: string
    alt?: string
    hover?: ImageHover
    rounded?: ImageRounded
    aspect?: ImageAspect
    fallback?: string
    imgbox?: boolean
    class?: string
    classes?: { root?: string, img?: string }
    onclick?: () => void
  }

  let {
    src,
    alt = '',
    hover = 'none',
    rounded = 'md',
    aspect = 'auto',
    fallback = '',
    imgbox = false,
    class: className = '',
    classes = {},
    onclick
  }: Props = $props()

  let errored = $state(false)
  let imgboxOpen = $state(false)

  const hoverClasses: Record<string, string> = {
    none: '',
    zoom: 'group-hover:scale-110',
    brightness: 'group-hover:brightness-110',
    blur: 'group-hover:blur-sm'
  }

  const roundedClasses: Record<string, string> = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full'
  }

  const aspectClasses: Record<string, string> = {
    auto: '',
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]'
  }

  const imgSrc = $derived(errored && fallback ? fallback : src)
  const isClickable = $derived(imgbox || !!onclick)

  function handleClick() {
    if (imgbox) imgboxOpen = true
    onclick?.()
  }

  function handleError() {
    errored = true
  }
</script>

{#if isClickable}
  <button type="button" onclick={handleClick} class="group overflow-hidden {roundedClasses[rounded]} {aspectClasses[aspect]} cursor-pointer bg-transparent border-none p-0 m-0 block {classes?.root ?? className}">
    <img src={imgSrc} {alt} onerror={handleError} class="w-full h-full object-cover transition-all duration-300 {hoverClasses[hover]} {classes?.img ?? ''}" loading="lazy" />
  </button>
{:else}
  <div class="group overflow-hidden {roundedClasses[rounded]} {aspectClasses[aspect]} {classes?.root ?? className}">
    <img src={imgSrc} {alt} onerror={handleError} class="w-full h-full object-cover transition-all duration-300 {hoverClasses[hover]} {classes?.img ?? ''}" loading="lazy" />
  </div>
{/if}

{#if imgbox && imgboxOpen}
  <ImgBox
    images={[src]}
    open={imgboxOpen}
    backdrop="dark"
    onclose={() => imgboxOpen = false}
  />
{/if}
