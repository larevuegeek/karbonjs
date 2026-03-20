import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'

export interface ImgBoxProps {
  images: string[]
  index?: number
  open: boolean
  backdrop?: 'blur' | 'dark' | 'transparent' | 'none'
  captions?: string[]
  className?: string
  classes?: { root?: string; backdrop?: string; image?: string }
  onclose: () => void
  onIndexChange?: (index: number) => void
}

const backdropClasses: Record<string, string> = {
  blur: 'bg-black/70 backdrop-blur-xl',
  dark: 'bg-black/90',
  transparent: 'bg-black/40 backdrop-blur-sm',
  none: '',
}

export function ImgBox({
  images,
  index: controlledIndex = 0,
  open,
  backdrop = 'blur',
  captions = [],
  className = '',
  classes = {},
  onclose,
  onIndexChange,
}: ImgBoxProps) {
  const [index, setIndex] = useState(controlledIndex)
  const [scale, setScale] = useState(1)
  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [visible, setVisible] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [showThumbs, setShowThumbs] = useState(false)

  const startRef = useRef({ x: 0, y: 0 })

  const hasPrev = index > 0
  const hasNext = index < images.length - 1
  const caption = captions[index] ?? ''

  useEffect(() => setIndex(controlledIndex), [controlledIndex])

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true))
    } else {
      setVisible(false)
    }
  }, [open])

  const resetTransform = useCallback(() => {
    setScale(1)
    setTranslateX(0)
    setTranslateY(0)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
    setTimeout(() => onclose(), 350)
  }, [onclose])

  const goTo = useCallback((i: number) => {
    if (i === index || transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setIndex(i)
      onIndexChange?.(i)
      resetTransform()
      setTransitioning(false)
    }, 150)
  }, [index, transitioning, onIndexChange, resetTransform])

  const prev = useCallback(() => {
    if (hasPrev && !transitioning) goTo(index - 1)
  }, [hasPrev, transitioning, index, goTo])

  const next = useCallback(() => {
    if (hasNext && !transitioning) goTo(index + 1)
  }, [hasNext, transitioning, index, goTo])

  const zoomIn = useCallback(() => setScale(s => Math.min(s + 0.5, 4)), [])
  const zoomOut = useCallback(() => {
    setScale(s => {
      const n = Math.max(s - 0.5, 0.5)
      if (n <= 1) resetTransform()
      return n
    })
  }, [resetTransform])

  const handleDblClick = useCallback(() => {
    if (scale > 1) resetTransform()
    else setScale(2.5)
  }, [scale, resetTransform])

  // Keyboard
  useEffect(() => {
    if (!open) return
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === '+' || e.key === '=') zoomIn()
      if (e.key === '-') zoomOut()
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [open, close, prev, next, zoomIn, zoomOut])

  // Mouse drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return
      setTranslateX(e.clientX - startRef.current.x)
      setTranslateY(e.clientY - startRef.current.y)
    }
    const handleMouseUp = () => setDragging(false)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return
    setDragging(true)
    startRef.current = { x: e.clientX - translateX, y: e.clientY - translateY }
  }, [scale, translateX, translateY])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) zoomIn()
    else zoomOut()
  }, [zoomIn, zoomOut])

  if (!open || images.length === 0) return null

  const content = (
    <div
      data-imgbox-root
      className={`imgbox-root ${classes?.root ?? className}`}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'auto', opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease',
      }}
    >
      {/* Backdrop */}
      <div
        className={`${backdropClasses[backdrop]} ${classes?.backdrop ?? ''}`}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto', cursor: 'default', transition: 'opacity 0.4s ease' }}
        onClick={() => { if (scale <= 1) close() }}
        role="presentation"
      />

      {/* Close button */}
      <button
        onClick={close}
        aria-label="Fermer"
        style={{
          borderRadius: '9999px', padding: '0.625rem', color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.3)',
          cursor: 'pointer', position: 'absolute', top: 16, right: 16, zIndex: 10, border: 'none',
          opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease 0.15s,background 0.15s ease,color 0.15s ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.5)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.3)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={prev}
          aria-label="Image precedente"
          style={{
            borderRadius: '9999px', padding: '0.75rem', color: 'rgba(255,255,255,0.6)', background: 'rgba(0,0,0,0.2)',
            cursor: 'pointer', position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', zIndex: 10, border: 'none',
            opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease 0.2s,background 0.15s ease,color 0.15s ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.5)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.2)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={next}
          aria-label="Image suivante"
          style={{
            borderRadius: '9999px', padding: '0.75rem', color: 'rgba(255,255,255,0.6)', background: 'rgba(0,0,0,0.2)',
            cursor: 'pointer', position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', zIndex: 10, border: 'none',
            opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease 0.2s,background 0.15s ease,color 0.15s ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.5)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.2)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      )}

      {/* Image container */}
      <div
        style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', padding: 48, pointerEvents: 'auto' }}
        className={`${scale > 1 ? 'cursor-grab' : ''} ${dragging ? '!cursor-grabbing' : ''}`}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
      >
        <img
          src={images[index]}
          alt={caption || `Image ${index + 1}`}
          className={classes?.image ?? ''}
          style={{
            maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', userSelect: 'none', pointerEvents: 'none',
            transform: `scale(${visible ? scale : 0.7}) translate(${translateX / scale}px, ${translateY / scale}px)`,
            opacity: visible && !transitioning ? 1 : 0,
            filter: visible ? 'blur(0)' : 'blur(8px)',
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, filter 0.3s ease',
          }}
          draggable={false}
          onDoubleClick={handleDblClick}
        />
      </div>

      {/* Caption */}
      {caption && (
        <div style={{ position: 'absolute', top: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
          <span style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: 8, fontSize: 13 }}>{caption}</span>
        </div>
      )}

      {/* Counter + thumbnails toggle */}
      {images.length > 1 && (
        <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.4)', borderRadius: 9999, padding: '4px 12px', backdropFilter: 'blur(8px)' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{index + 1} / {images.length}</span>
            <button
              onClick={() => setShowThumbs(!showThumbs)}
              style={{ color: `rgba(255,255,255,${showThumbs ? '0.9' : '0.4'})`, cursor: 'pointer', background: 'none', border: 'none', padding: 2 }}
              aria-label="Afficher les miniatures"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Thumbnails strip */}
      {showThumbs && images.length > 1 && (
        <div style={{ position: 'absolute', bottom: 56, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'auto' }}>
          <div style={{ display: 'flex', gap: 6, padding: '8px 12px', background: 'rgba(0,0,0,0.5)', borderRadius: 12, backdropFilter: 'blur(12px)' }}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{ width: 48, height: 36, borderRadius: 6, overflow: 'hidden', border: i === index ? '2px solid white' : '2px solid transparent', opacity: i === index ? 1 : 0.5, cursor: 'pointer', padding: 0, transition: 'all 0.15s ease', flexShrink: 0 }}
                aria-label={`Image ${i + 1}`}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Zoom controls */}
      <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none', opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <div className="flex items-center gap-1 bg-black/40 rounded-full px-3 py-1.5" style={{ pointerEvents: 'auto' }}>
          <button onClick={zoomOut} aria-label="Dezoomer" className="text-white/60 hover:text-white transition-colors cursor-pointer p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="8" x2="14" y1="11" y2="11" /></svg>
          </button>
          <span className="text-white/80 text-xs font-medium min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} aria-label="Zoomer" className="text-white/60 hover:text-white transition-colors cursor-pointer p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="11" x2="11" y1="8" y2="14" /><line x1="8" x2="14" y1="11" y2="11" /></svg>
          </button>
          <button onClick={resetTransform} aria-label="Reinitialiser" className="text-white/60 hover:text-white transition-colors cursor-pointer p-1 ml-1 border-l border-white/20 pl-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
          </button>
        </div>
      </div>
    </div>
  )

  // Portal to body to escape any parent transform/overflow
  return createPortal(content, document.body)
}
