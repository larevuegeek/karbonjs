import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface DropdownItem {
  label: string
  value?: string
  icon?: string
  description?: string
  badge?: string
  danger?: boolean
  disabled?: boolean
  divider?: boolean
  group?: string
}

export interface DropdownProps {
  items: DropdownItem[]
  align?: 'left' | 'right'
  position?: 'bottom' | 'top'
  width?: string
  color?: ButtonColor
  searchable?: boolean
  searchPlaceholder?: string
  className?: string
  classes?: { root?: string; menu?: string; item?: string; group?: string; search?: string }
  trigger: ReactNode
  onselect?: (value: string, item: DropdownItem) => void
}

function sanitizeSvg(html: string): string {
  return html.replace(/on\w+\s*=/gi, '').replace(/<script/gi, '&lt;script')
}

export function Dropdown({
  items,
  align = 'left',
  position = 'bottom',
  width = '14rem',
  color,
  searchable = false,
  searchPlaceholder = 'Rechercher...',
  className = '',
  classes = {},
  trigger,
  onselect,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [focusIndex, setFocusIndex] = useState(-1)
  const menuRef = useRef<HTMLDivElement>(null)

  const accent = color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)'

  const filteredItems = useMemo(() => {
    if (searchable && search) {
      return items.filter(i => !i.divider && i.label.toLowerCase().includes(search.toLowerCase()))
    }
    return items
  }, [items, searchable, search])

  const groupedItems = useMemo(() => {
    const groups: { label: string | null; items: DropdownItem[] }[] = []
    let currentGroup: string | null = null
    for (const item of filteredItems) {
      if (item.group && item.group !== currentGroup) {
        currentGroup = item.group
        groups.push({ label: currentGroup, items: [] })
      }
      if (groups.length === 0) groups.push({ label: null, items: [] })
      groups[groups.length - 1].items.push(item)
    }
    return groups
  }, [filteredItems])

  const toggleMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(prev => {
      if (!prev) { setSearch(''); setFocusIndex(-1) }
      return !prev
    })
  }, [])

  const selectItem = useCallback((item: DropdownItem) => {
    if (item.divider || item.disabled) return
    onselect?.(item.value ?? item.label, item)
    setOpen(false)
  }, [onselect])

  // Click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  // Keyboard nav
  useEffect(() => {
    if (!open) return
    const handleKeydown = (e: KeyboardEvent) => {
      const selectableItems = filteredItems.filter(i => !i.divider && !i.disabled)
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusIndex(prev => Math.min(prev + 1, selectableItems.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && focusIndex >= 0) {
        e.preventDefault()
        selectItem(selectableItems[focusIndex])
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [open, filteredItems, focusIndex, selectItem])

  const posClass = position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
  const alignClass = align === 'right' ? 'right-0' : 'left-0'

  return (
    <div className={`relative inline-block ${classes?.root ?? className}`} ref={menuRef}>
      {/* Trigger */}
      <button type="button" onClick={toggleMenu} className="cursor-pointer bg-transparent border-none p-0 m-0">
        {trigger}
      </button>

      {/* Menu */}
      {open && (
        <div
          className={`absolute z-50 ${posClass} ${alignClass} rounded-xl overflow-hidden ${classes?.menu ?? ''}`}
          style={{ minWidth: width, background: 'var(--karbon-bg-card)', border: '1px solid var(--karbon-border)', boxShadow: '0 10px 40px rgba(0,0,0,0.25)' }}
          role="menu"
        >
          {/* Search */}
          {searchable && (
            <div className={`p-2 ${classes?.search ?? ''}`} style={{ borderBottom: '1px solid var(--karbon-border)' }}>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--karbon-text-4)' }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none"
                  style={{ background: 'var(--karbon-bg-input)', border: '1px solid var(--karbon-border-input)', color: 'var(--karbon-text)' }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          {/* Items */}
          <div className="py-1 max-h-72 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs" style={{ color: 'var(--karbon-text-4)' }}>Aucun resultat</div>
            ) : (
              groupedItems.map((group, gi) => (
                <div key={gi}>
                  {group.label && (
                    <div className={`px-3 pt-2 pb-1 ${classes?.group ?? ''}`}>
                      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--karbon-text-4)' }}>{group.label}</span>
                    </div>
                  )}
                  {group.items.map((item, ii) => {
                    if (item.divider) {
                      return <div key={`${gi}-${ii}`} className="my-1" style={{ borderTop: '1px solid var(--karbon-border)' }} />
                    }
                    const selectableItems = filteredItems.filter(i => !i.divider && !i.disabled)
                    const isFocused = focusIndex >= 0 && selectableItems.indexOf(item) === focusIndex
                    return (
                      <button
                        key={`${gi}-${ii}`}
                        type="button"
                        onClick={(e) => { e.stopPropagation(); selectItem(item) }}
                        disabled={item.disabled}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${classes?.item ?? ''}`}
                        style={{ color: item.danger ? 'var(--karbon-red-400)' : 'var(--karbon-text)', background: isFocused ? 'var(--karbon-nav-hover-bg)' : 'transparent' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = item.danger ? 'color-mix(in srgb, var(--karbon-red-500) 8%, transparent)' : 'var(--karbon-nav-hover-bg)'; setFocusIndex(-1) }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                        role="menuitem"
                      >
                        {item.icon && <span className="shrink-0 opacity-60" dangerouslySetInnerHTML={{ __html: sanitizeSvg(item.icon) }} />}
                        <div className="flex-1 min-w-0">
                          <span className="block">{item.label}</span>
                          {item.description && <span className="block text-[11px] mt-0.5" style={{ color: 'var(--karbon-text-4)' }}>{item.description}</span>}
                        </div>
                        {item.badge && (
                          <span className="shrink-0 rounded-full px-1.5 py-px text-[10px] font-medium" style={{ background: `color-mix(in srgb,${accent} 15%,transparent)`, color: accent }}>{item.badge}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
