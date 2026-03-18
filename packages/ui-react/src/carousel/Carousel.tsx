import { useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'

export interface CarouselProps {
  images?: string[]
  autoplay?: number
  loop?: boolean
  arrows?: boolean
  indicators?: boolean
  className?: string
  children?: ReactNode
}

export function Carousel({
  images = [],
  autoplay = 0,
  loop = false,
  arrows = true,
  indicators = true,
  className = '',
  children
}: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const hasSlots = !!children
  const total = hasSlots ? 0 : images.length

  const goTo = useCallback((i: number) => {
    if (total === 0) return
    if (loop) {
      setCurrent(((i % total) + total) % total)
    } else {
      setCurrent(Math.max(0, Math.min(i, total - 1)))
    }
  }, [total, loop])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  const hasPrev = loop || current > 0
  const hasNext = loop || current < total - 1

  useEffect(() => {
    if (autoplay > 0 && total > 1) {
      const timer = setInterval(next, autoplay)
      return () => clearInterval(timer)
    }
  }, [autoplay, total, next])

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {hasSlots ? (
        children
      ) : (
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="w-full shrink-0">
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {arrows && total > 1 && (
        <>
          {hasPrev && (
            <button
              onClick={prev}
              aria-label="Slide précédent"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-black/30 text-white/80 hover:bg-black/50 hover:text-white transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          )}
          {hasNext && (
            <button
              onClick={next}
              aria-label="Slide suivant"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-black/30 text-white/80 hover:bg-black/50 hover:text-white transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          )}
        </>
      )}

      {indicators && total > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Aller au slide ${i + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${i === current ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/60 w-2'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
