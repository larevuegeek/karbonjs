import { useState, useRef, useCallback } from 'react'
import type { CSSProperties } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface ImgZoomProps {
  src: string
  zoomSrc?: string
  alt?: string
  zoom?: number
  trigger?: 'hover' | 'click'
  mode?: 'overlay' | 'lens' | 'side'
  lensSize?: number
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showHint?: boolean
  color?: ButtonColor
  width?: string
  height?: string
  className?: string
  classes?: { root?: string; img?: string; lens?: string; overlay?: string }
}

const roundedMap: Record<string, string> = {
  none: '0', sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem', full: '9999px'
}

export function ImgZoom({
  src,
  zoomSrc,
  alt = '',
  zoom = 2.5,
  trigger = 'hover',
  mode = 'overlay',
  lensSize = 120,
  rounded = 'md',
  showHint = true,
  color,
  width,
  height,
  className = '',
  classes = {}
}: ImgZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [zooming, setZooming] = useState(false)
  const [posX, setPosX] = useState(50)
  const [posY, setPosY] = useState(50)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [hovered, setHovered] = useState(false)

  const accent = color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)'
  const zoomImage = zoomSrc || src
  const rad = roundedMap[rounded]

  const updatePosition = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPosX(x)
    setPosY(y)
    setMouseX(e.clientX - rect.left)
    setMouseY(e.clientY - rect.top)
  }, [])

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    setHovered(true)
    if (trigger === 'hover') { setZooming(true); updatePosition(e) }
  }, [trigger, updatePosition])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (zooming || hovered) updatePosition(e)
  }, [zooming, hovered, updatePosition])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    if (trigger === 'hover') setZooming(false)
  }, [trigger])

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (trigger !== 'click') return
    setZooming(prev => {
      if (!prev) updatePosition(e)
      return !prev
    })
  }, [trigger, updatePosition])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setZooming(prev => !prev)
    }
  }, [])

  const rootStyle: CSSProperties = {
    borderRadius: rad,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    cursor: zooming ? 'crosshair' : trigger === 'click' ? 'zoom-in' : 'crosshair'
  }

  const imgStyle: CSSProperties = zooming && mode === 'overlay'
    ? { transform: `scale(${zoom})`, transformOrigin: `${posX}% ${posY}%` }
    : {}

  return (
    <div
      ref={containerRef}
      className={`karbon-imgzoom relative overflow-hidden inline-block ${classes?.root ?? className}`}
      style={rootStyle}
      role="img"
      aria-label={alt || 'Image zoomable'}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Base image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover block transition-transform duration-200 ${classes?.img ?? ''}`}
        style={imgStyle}
        loading="lazy"
        draggable={false}
      />

      {/* Hint icon */}
      {showHint && !zooming && hovered && (
        <div
          className="absolute top-3 right-3 rounded-full px-2 py-1 flex items-center gap-1 pointer-events-none"
          style={{ background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 11, backdropFilter: 'blur(4px)', opacity: 0.8 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
          <span>Zoom</span>
        </div>
      )}

      {/* Lens mode */}
      {mode === 'lens' && zooming && (
        <>
          <div
            className={`absolute rounded-full pointer-events-none shadow-xl ${classes?.lens ?? ''}`}
            style={{
              width: lensSize, height: lensSize,
              left: mouseX - lensSize / 2, top: mouseY - lensSize / 2,
              backgroundImage: `url(${zoomImage})`,
              backgroundSize: `${zoom * 100}%`,
              backgroundPosition: `${posX}% ${posY}%`,
              backgroundRepeat: 'no-repeat',
              border: `3px solid ${accent}`,
              boxShadow: '0 0 0 1px rgba(0,0,0,0.1),0 8px 25px rgba(0,0,0,0.3)',
              zIndex: 10
            }}
          />
          {/* Crosshair on source */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: lensSize / zoom, height: lensSize / zoom,
              left: mouseX - lensSize / zoom / 2, top: mouseY - lensSize / zoom / 2,
              border: `1.5px solid ${accent}`,
              borderRadius: 2,
              background: `color-mix(in srgb,${accent} 8%,transparent)`,
              zIndex: 5
            }}
          />
        </>
      )}

      {/* Side mode */}
      {mode === 'side' && zooming && (
        <>
          <div
            className={`absolute top-0 shadow-2xl pointer-events-none ${classes?.overlay ?? ''}`}
            style={{
              left: 'calc(100% + 12px)',
              width: containerRef.current?.offsetWidth || 300,
              height: containerRef.current?.offsetHeight || 300,
              backgroundImage: `url(${zoomImage})`,
              backgroundSize: `${zoom * 100}%`,
              backgroundPosition: `${posX}% ${posY}%`,
              backgroundRepeat: 'no-repeat',
              borderRadius: rad,
              border: '1px solid var(--karbon-border)',
              zIndex: 10
            }}
          />
          {/* Crosshair indicator */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: `${100 / zoom}%`, height: `${100 / zoom}%`,
              left: `${posX - 50 / zoom}%`, top: `${posY - 50 / zoom}%`,
              border: `2px solid ${accent}`,
              background: `color-mix(in srgb,${accent} 10%,transparent)`,
              zIndex: 5
            }}
          />
        </>
      )}
    </div>
  )
}
