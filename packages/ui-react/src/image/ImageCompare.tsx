import { useState, useRef, useCallback, useEffect } from 'react'
import type { CSSProperties } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface ImageCompareProps {
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
  className?: string
  classes?: { root?: string; before?: string; after?: string; handle?: string; label?: string }
}

const roundedMap: Record<string, string> = {
  none: '0', sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem'
}

export function ImageCompare({
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
  className = '',
  classes = {}
}: ImageCompareProps) {
  const [position, setPosition] = useState(initialPosition)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const accent = color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)'
  const isHorizontal = orientation === 'horizontal'
  const rad = roundedMap[rounded]

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const clientPos = isHorizontal ? clientX - rect.left : clientY - rect.top
    const size = isHorizontal ? rect.width : rect.height
    setPosition(Math.min(Math.max((clientPos / size) * 100, 0), 100))
  }, [isHorizontal])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setDragging(true)
    updatePosition(e.clientX, e.clientY)
  }, [updatePosition])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setDragging(true)
    updatePosition(e.touches[0].clientX, e.touches[0].clientY)
  }, [updatePosition])

  useEffect(() => {
    if (!dragging) return

    const handleMove = (e: MouseEvent) => updatePosition(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => { e.preventDefault(); updatePosition(e.touches[0].clientX, e.touches[0].clientY) }
    const handleEnd = () => setDragging(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleEnd)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [dragging, updatePosition])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); setPosition(p => Math.max(p - 2, 0)) }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); setPosition(p => Math.min(p + 2, 100)) }
  }, [])

  const rootStyle: CSSProperties = {
    borderRadius: rad,
    ...(width ? { width } : { width: '100%' }),
    ...(height ? { height } : {}),
    aspectRatio: height ? 'auto' : '16/10',
    cursor: dragging ? 'grabbing' : 'col-resize'
  }

  const clipPath = isHorizontal
    ? `inset(0 ${100 - position}% 0 0)`
    : `inset(0 0 ${100 - position}% 0)`

  const dividerStyle: CSSProperties = isHorizontal
    ? { left: `${position}%`, top: 0, bottom: 0, width: 2, transform: 'translateX(-1px)' }
    : { top: `${position}%`, left: 0, right: 0, height: 2, transform: 'translateY(-1px)' }

  const handleStyle: CSSProperties = isHorizontal
    ? { left: `${position}%`, top: '50%', transform: 'translate(-50%,-50%)' }
    : { top: `${position}%`, left: '50%', transform: 'translate(-50%,-50%)' }

  return (
    <div
      ref={containerRef}
      className={`karbon-imgcompare relative select-none overflow-hidden ${classes?.root ?? className}`}
      style={rootStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="slider"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Comparateur d'images"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* After image (background, full) */}
      <img
        src={after}
        alt={afterLabel}
        className={`absolute inset-0 w-full h-full object-cover ${classes?.after ?? ''}`}
        draggable={false}
      />

      {/* Before image (clipped) */}
      <img
        src={before}
        alt={beforeLabel}
        className={`absolute inset-0 w-full h-full object-cover ${classes?.before ?? ''}`}
        style={{ clipPath }}
        draggable={false}
      />

      {/* Divider line */}
      <div
        className="absolute"
        style={{ ...dividerStyle, background: accent, zIndex: 5, pointerEvents: 'none' }}
      />

      {/* Handle */}
      {showHandle && (
        <div className="absolute z-10" style={{ ...handleStyle, pointerEvents: 'none' }}>
          <div
            className={`rounded-full flex items-center justify-center shadow-lg ${classes?.handle ?? ''}`}
            style={{ width: 36, height: 36, background: accent, color: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.3),0 0 0 3px rgba(255,255,255,0.3)' }}
          >
            {isHorizontal ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15-5-5 5-5"/><path d="m17 9 5 5-5 5"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 7-5-5-5 5"/><path d="m9 17 5 5 5-5"/></svg>
            )}
          </div>
        </div>
      )}

      {/* Labels */}
      {showLabels && (
        <>
          <div className={`absolute z-5 pointer-events-none ${classes?.label ?? ''}`} style={isHorizontal ? { top: 12, left: 12 } : { top: 12, left: 12 }}>
            <span className="rounded-md px-2 py-1 text-[11px] font-semibold" style={{ background: 'rgba(0,0,0,0.5)', color: 'white', backdropFilter: 'blur(4px)' }}>{beforeLabel}</span>
          </div>
          <div className={`absolute z-5 pointer-events-none ${classes?.label ?? ''}`} style={isHorizontal ? { top: 12, right: 12 } : { bottom: 12, right: 12 }}>
            <span className="rounded-md px-2 py-1 text-[11px] font-semibold" style={{ background: 'rgba(0,0,0,0.5)', color: 'white', backdropFilter: 'blur(4px)' }}>{afterLabel}</span>
          </div>
        </>
      )}
    </div>
  )
}
