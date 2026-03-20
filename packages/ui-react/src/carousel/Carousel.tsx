import { useState, useEffect, useCallback, useRef } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface CarouselProps {
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
  className?: string
  classes?: { root?: string; track?: string; slide?: string; arrow?: string; indicators?: string }
  onchange?: (index: number) => void
  /** Render function per slide index */
  slide?: (index: number) => ReactNode
  /** Total slides when using render function mode */
  total?: number
  children?: ReactNode
}

const roundedMap: Record<string, string> = {
  none: '0', sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem'
}

export function Carousel({
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
  draggable: isDraggable = true,
  className = '',
  classes = {},
  onchange,
  slide,
  total: totalProp,
  children
}: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const [dragDelta, setDragDelta] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const accent = color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)'
  const rad = roundedMap[rounded]
  const total = totalProp ?? images.length
  const maxIndex = Math.max(0, total - slidesPerView)
  const hasPrev = loop || current > 0
  const hasNext = loop || current < maxIndex
  const slideWidth = 100 / slidesPerView

  const goTo = useCallback((i: number) => {
    if (total === 0) return
    let next: number
    if (loop) {
      next = ((i % total) + total) % total
    } else {
      next = Math.max(0, Math.min(i, maxIndex))
    }
    setCurrent(next)
    onchange?.(next)
  }, [total, loop, maxIndex, onchange])

  const prev = useCallback(() => goTo(current - 1), [current, goTo])
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  const startAutoplay = useCallback(() => {
    if (autoplay > 0 && total > 1) {
      timerRef.current = setInterval(() => {
        setCurrent(c => {
          const n = loop ? ((c + 1) % total) : Math.min(c + 1, maxIndex)
          onchange?.(n)
          return n
        })
      }, autoplay)
    }
  }, [autoplay, total, loop, maxIndex, onchange])

  const stopAutoplay = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }, [])

  useEffect(() => {
    startAutoplay()
    return stopAutoplay
  }, [startAutoplay, stopAutoplay])

  // Drag handling via window listeners
  useEffect(() => {
    if (!isDragging) return

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      setDragDelta(clientX - dragStartRef.current)
    }

    const handleEnd = () => {
      setIsDragging(false)
      setDragDelta(d => {
        const threshold = trackRef.current ? trackRef.current.offsetWidth * 0.15 : 80
        if (d < -threshold) setCurrent(c => { const n = loop ? ((c + 1) % total) : Math.min(c + 1, maxIndex); onchange?.(n); return n })
        else if (d > threshold) setCurrent(c => { const n = loop ? (((c - 1) % total) + total) % total : Math.max(c - 1, 0); onchange?.(n); return n })
        return 0
      })
      startAutoplay()
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleMove, { passive: true })
    window.addEventListener('touchend', handleEnd)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, loop, total, maxIndex, onchange, startAutoplay])

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggable) return
    setIsDragging(true)
    setDragDelta(0)
    dragStartRef.current = 'touches' in e ? e.touches[0].clientX : e.clientX
    stopAutoplay()
  }, [isDraggable, stopAutoplay])

  const handleKeydown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
  }, [prev, next])

  // Track offset
  const peekOffset = peek > 0 ? peek : 0
  const trackOffset = transition === 'fade' ? 0 : -(current * slideWidth) + (peekOffset > 0 && trackRef.current ? (peekOffset / trackRef.current.offsetWidth) * 100 : 0)

  const indicatorCount = Math.min(total, total - slidesPerView + 1)

  return (
    <div
      role="region"
      aria-label="Carousel"
      aria-roledescription="carousel"
      className={`relative overflow-hidden ${classes?.root ?? className}`}
      style={{ borderRadius: rad }}
      onMouseEnter={stopAutoplay}
      onMouseLeave={() => { if (!isDragging) startAutoplay() }}
      onKeyDown={handleKeydown}
      tabIndex={0}
    >
      {children ? (
        children
      ) : transition === 'fade' ? (
        /* Fade mode */
        <div className={classes?.track ?? ''} style={{ position: 'relative', ...(aspectRatio ? { aspectRatio } : {}) }}>
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-500 ${classes?.slide ?? ''}`}
              style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
            >
              {slide ? slide(i) : images[i] ? (
                <img src={images[i]} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" loading="lazy" draggable={false} />
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        /* Slide mode */
        <div
          ref={trackRef}
          className={`flex ${classes?.track ?? ''}`}
          style={{
            transform: `translateX(calc(${trackOffset}% + ${dragDelta}px))`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
            gap,
            ...(peek ? { padding: `0 ${peek}px` } : {})
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {Array.from({ length: total }, (_, i) => {
            const slideStyle: CSSProperties = {
              width: `calc(${slideWidth}% - ${gap * (slidesPerView - 1) / slidesPerView}px)`,
              ...(aspectRatio ? { aspectRatio } : {}),
              cursor: isDraggable ? (isDragging ? 'grabbing' : 'grab') : 'default'
            }
            return (
              <div key={i} className={`shrink-0 ${classes?.slide ?? ''}`} style={slideStyle}>
                {slide ? slide(i) : images[i] ? (
                  <img
                    src={images[i]}
                    alt={`Slide ${i + 1}`}
                    className="w-full h-full object-cover select-none"
                    style={{ borderRadius: slidesPerView > 1 ? rad : '0' }}
                    loading="lazy"
                    draggable={false}
                  />
                ) : null}
              </div>
            )
          })}
        </div>
      )}

      {/* Arrows */}
      {arrows && total > slidesPerView && (
        <>
          {hasPrev && (
            <button
              onClick={prev}
              aria-label="Precedent"
              className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2.5 transition-all cursor-pointer ${classes?.arrow ?? ''}`}
              style={{ background: 'rgba(0,0,0,0.4)', color: 'white', backdropFilter: 'blur(4px)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.6)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.4)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          )}
          {hasNext && (
            <button
              onClick={next}
              aria-label="Suivant"
              className={`absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2.5 transition-all cursor-pointer ${classes?.arrow ?? ''}`}
              style={{ background: 'rgba(0,0,0,0.4)', color: 'white', backdropFilter: 'blur(4px)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.6)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.4)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          )}
        </>
      )}

      {/* Indicators */}
      {indicators && total > 1 && (
        <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 ${classes?.indicators ?? ''}`}>
          {Array.from({ length: indicatorCount }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{ width: i === current ? 20 : 8, height: 8, background: i === current ? accent : 'rgba(255,255,255,0.4)' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
