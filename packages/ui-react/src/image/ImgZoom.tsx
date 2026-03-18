import { useState, useRef, useCallback } from 'react'
import type { ImageRounded, ImgZoomTrigger } from '@karbonjs/ui-core'

export interface ImgZoomProps {
  src: string
  zoomSrc?: string
  alt?: string
  zoom?: number
  trigger?: ImgZoomTrigger
  rounded?: ImageRounded
  className?: string
}

const roundedClasses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full'
}

export function ImgZoom({
  src,
  zoomSrc,
  alt = '',
  zoom = 2,
  trigger = 'hover',
  rounded = 'md',
  className = ''
}: ImgZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [zooming, setZooming] = useState(false)
  const [pos, setPos] = useState({ x: 50, y: 50 })

  const zoomImage = zoomSrc || src

  const updatePosition = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${roundedClasses[rounded]} ${trigger === 'click' ? (zooming ? 'cursor-zoom-out' : 'cursor-zoom-in') : ''} ${className}`}
      onMouseEnter={(e) => { if (trigger === 'hover') { setZooming(true); updatePosition(e) } }}
      onMouseMove={(e) => { if (zooming) updatePosition(e) }}
      onMouseLeave={() => { if (trigger === 'hover') setZooming(false) }}
      onClick={(e) => { if (trigger === 'click') { setZooming(!zooming); if (!zooming) updatePosition(e) } }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover block"
        loading="lazy"
      />

      {zooming && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${zoomImage})`,
            backgroundSize: `${zoom * 100}%`,
            backgroundPosition: `${pos.x}% ${pos.y}%`,
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}
    </div>
  )
}
