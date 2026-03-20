import { useState, useMemo, useCallback } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import type { ButtonColor } from '@karbonjs/ui-core'

export interface Column {
  key: string
  label?: string
  sortable?: boolean
  searchable?: boolean
  filterable?: boolean
  options?: string[]
  type?: 'text' | 'number' | 'date' | 'boolean' | 'actions' | 'image'
  render?: (value: any, row: any) => string
  width?: string
  align?: 'left' | 'center' | 'right'
  sticky?: boolean
  hidden?: boolean
}

export interface DataTableProps {
  data?: any[]
  columns?: Column[]
  selectable?: boolean
  searchable?: boolean
  striped?: boolean
  hoverable?: boolean
  stickyHeader?: boolean
  loading?: boolean
  loadingRows?: number
  compact?: boolean
  bordered?: boolean
  color?: ButtonColor
  perPage?: number
  showPerPage?: boolean
  exportable?: boolean
  exportFilename?: string
  className?: string
  classes?: { root?: string; header?: string; row?: string; cell?: string; search?: string; footer?: string }
  onselect?: (selected: any[]) => void
  onrowclick?: (row: any) => void
  onsort?: (key: string, dir: 'asc' | 'desc' | null) => void
  cell?: (col: Column, row: any, index: number) => ReactNode
  empty?: ReactNode
  children?: ReactNode
}

export function DataTable({
  data = [],
  columns = [],
  selectable = false,
  searchable = false,
  striped = false,
  hoverable = true,
  stickyHeader = false,
  loading = false,
  loadingRows = 5,
  compact = false,
  bordered = false,
  color,
  perPage = 0,
  showPerPage = false,
  exportable = false,
  exportFilename = 'export',
  className = '',
  classes = {},
  onselect,
  onrowclick,
  onsort,
  cell,
  empty,
  children,
}: DataTableProps) {
  const accent = color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)'

  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('')
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(perPage || 20)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const searchableKeys = useMemo(
    () => columns.filter(c => c.searchable !== false && c.type !== 'actions' && c.type !== 'image').map(c => c.key),
    [columns],
  )

  const filteredData = useMemo(() => {
    let result = [...data]
    if (search && searchableKeys.length) {
      const q = search.toLowerCase()
      result = result.filter(row =>
        searchableKeys.some(key => {
          const val = row[key]
          return val != null && String(val).toLowerCase().includes(q)
        }),
      )
    }
    for (const [key, filterVal] of Object.entries(activeFilters)) {
      if (filterVal) result = result.filter(row => String(row[key]) === filterVal)
    }
    if (sortKey && sortDir) {
      const col = columns.find(c => c.key === sortKey)
      result.sort((a, b) => {
        let va: any = a[sortKey], vb: any = b[sortKey]
        if (col?.type === 'number') { va = Number(va); vb = Number(vb) }
        else if (col?.type === 'date') { va = new Date(va).getTime(); vb = new Date(vb).getTime() }
        else { va = String(va ?? '').toLowerCase(); vb = String(vb ?? '').toLowerCase() }
        if (va < vb) return sortDir === 'asc' ? -1 : 1
        if (va > vb) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }
    return result
  }, [data, search, searchableKeys, activeFilters, sortKey, sortDir, columns])

  const totalPages = perPage > 0 ? Math.ceil(filteredData.length / itemsPerPage) : 1
  const paginatedData = perPage > 0 ? filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : filteredData
  const visibleColumns = useMemo(() => columns.filter(c => !c.hidden), [columns])
  const allSelected = filteredData.length > 0 && selected.size === filteredData.length
  const someSelected = selected.size > 0 && !allSelected

  const toggleSort = useCallback((key: string) => {
    let newKey = key
    let newDir: 'asc' | 'desc' | null
    if (sortKey === key) {
      newDir = sortDir === 'asc' ? 'desc' : sortDir === 'desc' ? null : 'asc'
      if (!newDir) newKey = ''
    } else {
      newDir = 'asc'
    }
    setSortKey(newKey)
    setSortDir(newDir)
    onsort?.(newKey, newDir)
  }, [sortKey, sortDir, onsort])

  const emitSelection = useCallback((sel: Set<number>) => {
    onselect?.([...sel].map(i => filteredData[i]).filter(Boolean))
  }, [filteredData, onselect])

  const toggleAll = useCallback(() => {
    const next = allSelected ? new Set<number>() : new Set(filteredData.map((_, i) => i))
    setSelected(next)
    emitSelection(next)
  }, [allSelected, filteredData, emitSelection])

  const toggleRow = useCallback((index: number) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index); else next.add(index)
      emitSelection(next)
      return next
    })
  }, [emitSelection])

  const formatCell = useCallback((col: Column, row: any): string => {
    const val = row[col.key]
    if (col.render) return col.render(val, row)
    if (col.type === 'boolean') return val ? '\u2713' : '\u2717'
    if (col.type === 'date' && val) try { return new Date(val).toLocaleDateString('fr-FR') } catch { return String(val) }
    if (col.type === 'number' && val != null) return Number(val).toLocaleString('fr-FR')
    return val != null ? String(val) : ''
  }, [])

  const exportCSV = useCallback(() => {
    const cols = visibleColumns.filter(c => c.type !== 'actions')
    const csv = [
      cols.map(c => c.label || c.key).join(','),
      ...filteredData.map(row => cols.map(c => `"${String(row[c.key] ?? '').replace(/"/g, '""')}"`).join(',')),
    ].join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    a.download = `${exportFilename}.csv`
    a.click()
  }, [visibleColumns, filteredData, exportFilename])

  const pad = compact ? 'px-3 py-1.5' : 'px-4 py-3'
  const hpad = compact ? 'px-3 py-2' : 'px-4 py-3'

  // Legacy mode: raw table content
  if (children) {
    return (
      <div className={`rounded-xl overflow-hidden ${classes?.root ?? className}`} style={{ background: 'var(--karbon-bg-card)', border: '1px solid var(--karbon-border)' }}>
        <div className="overflow-x-auto">
          <table className="min-w-full [&_thead_tr]:border-b [&_thead_tr]:border-[var(--karbon-border)] [&_thead_tr]:bg-[var(--karbon-bg-2)] [&_thead_th]:text-xs [&_thead_th]:font-semibold [&_thead_th]:uppercase [&_thead_th]:tracking-wider [&_thead_th]:px-4 [&_thead_th]:py-3 [&_thead_th]:text-left [&_thead_th]:text-[var(--karbon-text-3)] [&_tbody_tr]:border-b [&_tbody_tr]:border-[var(--karbon-border)] [&_tbody_tr:last-child]:border-b-0 [&_tbody_tr:hover]:bg-[var(--karbon-nav-hover-bg)] [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:text-[var(--karbon-text-2)]">
            {children}
          </table>
        </div>
      </div>
    )
  }

  // Full-featured mode
  return (
    <div className={`rounded-xl overflow-hidden ${classes?.root ?? className}`} style={{ background: 'var(--karbon-bg-card)', border: '1px solid var(--karbon-border)' }}>

      {/* Toolbar */}
      {(searchable || selectable || exportable || showPerPage) && (
        <div className={`flex items-center gap-3 px-4 py-3 ${classes?.search ?? ''}`} style={{ borderBottom: '1px solid var(--karbon-border)' }}>
          {searchable && (
            <div className="relative flex-1 max-w-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--karbon-text-4)' }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
                placeholder="Rechercher..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none"
                style={{ background: 'var(--karbon-bg-input)', border: '1px solid var(--karbon-border-input)', color: 'var(--karbon-text)' }}
              />
            </div>
          )}
          {(someSelected || allSelected) && (
            <span className="text-xs font-medium" style={{ color: accent }}>{selected.size} selectionne{selected.size > 1 ? 's' : ''}</span>
          )}
          <div className="flex-1" />
          {showPerPage && (
            <select
              className="text-xs rounded-md px-2 py-1 outline-none"
              style={{ background: 'var(--karbon-bg-input)', border: '1px solid var(--karbon-border-input)', color: 'var(--karbon-text)' }}
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1) }}
            >
              {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}/page</option>)}
            </select>
          )}
          {exportable && (
            <button onClick={exportCSV} className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors" style={{ color: 'var(--karbon-text-2)', background: 'var(--karbon-bg-input)' }} aria-label="Exporter CSV">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
              CSV
            </button>
          )}
          <span className="text-[11px]" style={{ color: 'var(--karbon-text-4)' }}>{filteredData.length} resultat{filteredData.length > 1 ? 's' : ''}</span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ background: 'var(--karbon-bg-2)', borderBottom: '1px solid var(--karbon-border)' }} className={stickyHeader ? 'sticky top-0 z-10' : ''}>
              {selectable && (
                <th className={`${hpad} w-10`}>
                  <div
                    className="w-4 h-4 rounded border cursor-pointer"
                    style={{ display: 'grid', placeItems: 'center', boxSizing: 'border-box', borderColor: allSelected || someSelected ? accent : 'var(--karbon-border-input)', background: allSelected ? accent : 'transparent' }}
                    onClick={toggleAll}
                    role="checkbox"
                    aria-checked={allSelected ? 'true' : someSelected ? 'mixed' : 'false'}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); toggleAll() } }}
                  >
                    {allSelected && <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                    {someSelected && <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>}
                  </div>
                </th>
              )}
              {visibleColumns.map(col => (
                <th
                  key={col.key}
                  className={`${hpad} text-left text-[11px] font-semibold uppercase tracking-wider ${col.sortable ? 'cursor-pointer select-none' : ''}`}
                  style={{ color: 'var(--karbon-text-3)', ...(col.width ? { width: col.width } : {}), ...(col.align ? { textAlign: col.align } : {}), ...(col.sticky ? { position: 'sticky', left: 0, zIndex: 5, background: 'var(--karbon-bg-2)' } as CSSProperties : {}) }}
                  onClick={() => col.sortable && toggleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.label || col.key}</span>
                    {col.sortable && (
                      <span className="inline-flex flex-col" style={{ lineHeight: 0 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill={sortKey === col.key && sortDir === 'asc' ? accent : 'var(--karbon-text-4)'} stroke="none"><path d="M12 5l7 9H5z" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill={sortKey === col.key && sortDir === 'desc' ? accent : 'var(--karbon-text-4)'} stroke="none"><path d="M12 19l7-9H5z" /></svg>
                      </span>
                    )}
                    {col.filterable && col.options && (
                      <select
                        className="text-[10px] rounded px-1 py-0.5 outline-none ml-1"
                        style={{ background: 'var(--karbon-bg-input)', border: '1px solid var(--karbon-border-input)', color: 'var(--karbon-text-2)' }}
                        onChange={(e) => { setActiveFilters(prev => ({ ...prev, [col.key]: e.target.value })); setCurrentPage(1) }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="">Tous</option>
                        {col.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: loadingRows }).map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--karbon-border)' }}>
                  {selectable && <td className={pad}><div className="w-4 h-4 rounded animate-pulse" style={{ background: 'var(--karbon-bg-2)' }} /></td>}
                  {visibleColumns.map(col => (
                    <td key={col.key} className={pad}><div className="h-4 rounded animate-pulse" style={{ background: 'var(--karbon-bg-2)', width: col.type === 'actions' ? '60px' : `${40 + Math.random() * 40}%`, animationDelay: `${i * 80}ms` }} /></td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length + (selectable ? 1 : 0)} className="text-center py-12">
                  {empty || (
                    <div style={{ color: 'var(--karbon-text-4)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 opacity-50"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                      <p className="text-sm">Aucun resultat</p>
                      {search && <p className="text-xs mt-1">Essayez un autre terme de recherche</p>}
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, i) => {
                const gi = perPage > 0 ? (currentPage - 1) * itemsPerPage + i : i
                const isSel = selected.has(gi)
                return (
                  <tr
                    key={gi}
                    className={hoverable && !isSel ? 'transition-colors' : ''}
                    style={{ borderBottom: '1px solid var(--karbon-border)', background: isSel ? `color-mix(in srgb,${accent} 8%,transparent)` : striped && i % 2 ? 'var(--karbon-bg-2)' : 'transparent', ...(onrowclick ? { cursor: 'pointer' } : {}) }}
                    onClick={() => onrowclick?.(row)}
                    onMouseEnter={(e) => { if (hoverable && !isSel) (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)' }}
                    onMouseLeave={(e) => { if (hoverable && !isSel) (e.currentTarget as HTMLElement).style.background = striped && i % 2 ? 'var(--karbon-bg-2)' : 'transparent' }}
                  >
                    {selectable && (
                      <td className={pad}>
                        <div
                          className="w-4 h-4 rounded border cursor-pointer"
                          style={{ display: 'grid', placeItems: 'center', boxSizing: 'border-box', borderColor: isSel ? accent : 'var(--karbon-border-input)', background: isSel ? accent : 'transparent' }}
                          onClick={(e) => { e.stopPropagation(); toggleRow(gi) }}
                          role="checkbox"
                          aria-checked={isSel}
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); toggleRow(gi) } }}
                        >
                          {isSel && <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                        </div>
                      </td>
                    )}
                    {visibleColumns.map(col => (
                      <td
                        key={col.key}
                        className={`${pad} text-sm ${classes?.cell ?? ''}`}
                        style={{ color: 'var(--karbon-text-2)', ...(col.align ? { textAlign: col.align } : {}), ...(col.sticky ? { position: 'sticky', left: 0, zIndex: 1, background: 'inherit' } as CSSProperties : {}) }}
                      >
                        {cell ? cell(col, row, i)
                          : col.type === 'image' ? (row[col.key] ? <img src={row[col.key]} alt="" className="h-8 w-8 rounded object-cover" /> : null)
                          : col.type === 'boolean' ? (
                            row[col.key]
                              ? <span className="inline-flex items-center justify-center w-5 h-5 rounded-full" style={{ background: 'color-mix(in srgb,var(--karbon-success) 15%,transparent)', color: 'var(--karbon-success)' }}><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                              : <span className="inline-flex items-center justify-center w-5 h-5 rounded-full" style={{ background: 'color-mix(in srgb,var(--karbon-danger) 15%,transparent)', color: 'var(--karbon-danger)' }}><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></span>
                          ) : formatCell(col, row)}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {perPage > 0 && totalPages > 1 && (
        <div className={`flex items-center justify-between px-4 py-3 ${classes?.footer ?? ''}`} style={{ borderTop: '1px solid var(--karbon-border)' }}>
          <span className="text-xs" style={{ color: 'var(--karbon-text-4)' }}>{(currentPage - 1) * itemsPerPage + 1}&ndash;{Math.min(currentPage * itemsPerPage, filteredData.length)} sur {filteredData.length}</span>
          <div className="flex items-center gap-1">
            <button onClick={() => { if (currentPage > 1) setCurrentPage(p => p - 1) }} disabled={currentPage <= 1} className="px-2 py-1 rounded text-xs cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" style={{ color: 'var(--karbon-text-2)' }} aria-label="Precedent">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
              const p = totalPages <= 7 ? i + 1 : currentPage <= 4 ? i + 1 : currentPage >= totalPages - 3 ? totalPages - 6 + i : currentPage - 3 + i
              if (p < 1 || p > totalPages) return null
              return (
                <button key={p} onClick={() => setCurrentPage(p)} className="w-7 h-7 rounded text-xs font-medium cursor-pointer transition-all" style={{ background: p === currentPage ? accent : 'transparent', color: p === currentPage ? 'white' : 'var(--karbon-text-3)' }}>{p}</button>
              )
            })}
            <button onClick={() => { if (currentPage < totalPages) setCurrentPage(p => p + 1) }} disabled={currentPage >= totalPages} className="px-2 py-1 rounded text-xs cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" style={{ color: 'var(--karbon-text-2)' }} aria-label="Suivant">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
