export type ImageHover = 'none' | 'zoom' | 'brightness' | 'blur'
export type ImageRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type ImageAspect = 'auto' | 'square' | 'video' | 'portrait'

export interface ImageProps {
  src: string
  alt?: string
  hover?: ImageHover
  rounded?: ImageRounded
  aspect?: ImageAspect
  fallback?: string
  imgbox?: boolean
  class?: string
}

export type ImgZoomTrigger = 'hover' | 'click'

export interface ImgZoomProps {
  src: string
  zoomSrc?: string
  alt?: string
  zoom?: number
  trigger?: ImgZoomTrigger
  rounded?: ImageRounded
  class?: string
}
