import { useState, useEffect, useCallback } from 'react'
import type { OverlayBackdrop } from '@karbonjs/ui-core'

export interface ImgBoxProps {
  images: string[]
  index?: number
  open: boolean
  backdrop?: OverlayBackdrop
  captions?: string[]
  className?: string
  onClose: () => void
  onIndexChange?: (index: number) => void
}

const backdropClasses: Record<string, string> = {
  blur: 'bg-black/80 backdrop-blur-md',
  dark: 'bg-black/90',
  transparent: 'bg-transparent',
  none: ''
}

export function ImgBox({
  images,
  index: controlledIndex = 0,
  open,
  backdrop = 'dark',
  captions = [],
  className = '',
  onClose,
  onIndexChange
}: ImgBoxProps) {
  const [index, setIndex] = useState(controlledIndex)
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })

  useEffect(() => setIndex(controlledIndex), [controlledIndex])

  const caption = captions[index] ?? ''
  const hasPrev = index > 0
  const hasNext = index < images.length - 1

  function go(i: number) {
    setIndex(i)
    onIndexChange?.(i)
    resetTransform()
  }

  function resetTransform() {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft' && index > 0) go(index - 1)
    if (e.key === 'ArrowRight' && index < images.length - 1) go(index + 1)
    if (e.key === '+' || e.key === '=') setScale((s) => Math.min(s + 0.5, 4))
    if (e.key === '-') { setScale((s) => { const n = Math.max(s - 0.5, 0.5); if (n <= 1) resetTransform(); return n }) }
  }, [index, images.length, onClose])

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKeydown)
      return () => window.removeEventListener('keydown', handleKeydown)
    }
  }, [open, handleKeydown])

  if (!open || images.length === 0) return null

  return (
    <div className={`fixed inset-0 z-[70] flex items-center justify-center ${backdropClasses[backdrop]} ${className}`}>
      <button onClick={onClose} aria-label="Fermer" className="absolute top-4 right-4 z-10 rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-black/40 rounded-full px-3 py-1.5">
        <button onClick={() => { setScale((s) => { const n = Math.max(s - 0.5, 0.5); if (n <= 1) resetTransform(); return n }) }} aria-label="Dézoomer" className="text-white/60 hover:text-white transition-colors cursor-pointer p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
        </button>
        <span className="text-white/80 text-xs font-medium min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
        <button onClick={() => setScale((s) => Math.min(s + 0.5, 4))} aria-label="Zoomer" className="text-white/60 hover:text-white transition-colors cursor-pointer p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
        </button>
      </div>

      {hasPrev && (
        <button onClick={() => go(index - 1)} aria-label="Image précédente" className="absolute left-4 z-10 rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      )}

      {hasNext && (
        <button onClick={() => go(index + 1)} aria-label="Image suivante" className="absolute right-4 z-10 rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      )}

      <div className="flex items-center justify-center w-full h-full p-16">
        <img
          src={images[index]}
          alt={caption || `Image ${index + 1}`}
          className="max-w-full max-h-full object-contain select-none transition-transform duration-150"
          style={{ transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)` }}
          draggable={false}
        />
      </div>

      {(caption || images.length > 1) && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-center">
          {caption && <p className="text-white/80 text-sm mb-1">{caption}</p>}
          {images.length > 1 && <span className="text-white/40 text-xs">{index + 1} / {images.length}</span>}
        </div>
      )}
    </div>
  )
}
