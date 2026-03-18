import { useState } from 'react'
import type { ImageHover, ImageRounded, ImageAspect } from '@karbonjs/ui-core'
import { ImgBox } from '../overlay/ImgBox.js'

export interface ImageProps {
  src: string
  alt?: string
  hover?: ImageHover
  rounded?: ImageRounded
  aspect?: ImageAspect
  fallback?: string
  imgbox?: boolean
  className?: string
  onClick?: () => void
}

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

export function Image({
  src,
  alt = '',
  hover = 'none',
  rounded = 'md',
  aspect = 'auto',
  fallback = '',
  imgbox = false,
  className = '',
  onClick
}: ImageProps) {
  const [errored, setErrored] = useState(false)
  const [imgboxOpen, setImgboxOpen] = useState(false)

  const imgSrc = errored && fallback ? fallback : src
  const isClickable = imgbox || !!onClick

  function handleClick() {
    if (imgbox) setImgboxOpen(true)
    onClick?.()
  }

  return (
    <>
      <div
        className={`group overflow-hidden ${roundedClasses[rounded]} ${aspectClasses[aspect]} ${isClickable ? 'cursor-pointer' : ''} ${className}`}
        onClick={isClickable ? handleClick : undefined}
      >
        <img
          src={imgSrc}
          alt={alt}
          onError={() => setErrored(true)}
          className={`w-full h-full object-cover transition-all duration-300 ${hoverClasses[hover]}`}
          loading="lazy"
        />
      </div>

      {imgbox && (
        <ImgBox
          images={[src]}
          open={imgboxOpen}
          backdrop="dark"
          onClose={() => setImgboxOpen(false)}
        />
      )}
    </>
  )
}
