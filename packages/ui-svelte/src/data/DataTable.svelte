<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Column {
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

  interface Props {
    data: any[]
    columns: Column[]
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
    class?: string
    classes?: { root?: string, header?: string, row?: string, cell?: string, search?: string, footer?: string }
    onselect?: (selected: any[]) => void
    onrowclick?: (row: any) => void
    onsort?: (key: string, dir: 'asc' | 'desc' | null) => void
    cell?: Snippet<[Column, any, number]>
    empty?: Snippet
    children?: Snippet
  }

  let {
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
    class: className = '',
    classes = {},
    onselect,
    onrowclick,
    onsort,
    cell,
    empty,
    children
  }: Props = $props()

  const accent = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')

  let search = $state('')
  let sortKey = $state('')
  let sortDir = $state<'asc' | 'desc' | null>(null)
  let currentPage = $state(1)
  let itemsPerPage = $state(perPage || 20)
  let selected = $state<Set<number>>(new Set())
  let activeFilters = $state<Record<string, string>>({})

  const searchableKeys = $derived(
    columns.filter(c => c.searchable !== false && c.type !== 'actions' && c.type !== 'image').map(c => c.key)
  )

  const filteredData = $derived.by(() => {
    let result = [...data]
    if (search && searchableKeys.length) {
      const q = search.toLowerCase()
      result = result.filter(row =>
        searchableKeys.some(key => {
          const val = row[key]
          return val != null && String(val).toLowerCase().includes(q)
        })
      )
    }
    for (const [key, filterVal] of Object.entries(activeFilters)) {
      if (filterVal) result = result.filter(row => String(row[key]) === filterVal)
    }
    if (sortKey && sortDir) {
      const col = columns.find(c => c.key === sortKey)
      result.sort((a, b) => {
        let va = a[sortKey], vb = b[sortKey]
        if (col?.type === 'number') { va = Number(va); vb = Number(vb) }
        else if (col?.type === 'date') { va = new Date(va).getTime(); vb = new Date(vb).getTime() }
        else { va = String(va ?? '').toLowerCase(); vb = String(vb ?? '').toLowerCase() }
        if (va < vb) return sortDir === 'asc' ? -1 : 1
        if (va > vb) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }
    return result
  })

  const totalPages = $derived(perPage > 0 ? Math.ceil(filteredData.length / itemsPerPage) : 1)
  const paginatedData = $derived(
    perPage > 0 ? filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : filteredData
  )
  const visibleColumns = $derived(columns.filter(c => !c.hidden))
  const allSelected = $derived(filteredData.length > 0 && selected.size === filteredData.length)
  const someSelected = $derived(selected.size > 0 && !allSelected)

  function toggleSort(key: string) {
    if (sortKey === key) {
      sortDir = sortDir === 'asc' ? 'desc' : sortDir === 'desc' ? null : 'asc'
      if (!sortDir) sortKey = ''
    } else { sortKey = key; sortDir = 'asc' }
    onsort?.(sortKey, sortDir)
  }

  function toggleAll() {
    selected = allSelected ? new Set() : new Set(filteredData.map((_, i) => i))
    emitSelection()
  }

  function toggleRow(index: number) {
    const next = new Set(selected)
    if (next.has(index)) next.delete(index); else next.add(index)
    selected = next
    emitSelection()
  }

  function emitSelection() {
    onselect?.([...selected].map(i => filteredData[i]).filter(Boolean))
  }

  function formatCell(col: Column, row: any): string {
    const val = row[col.key]
    if (col.render) return col.render(val, row)
    if (col.type === 'boolean') return val ? '✓' : '✗'
    if (col.type === 'date' && val) try { return new Date(val).toLocaleDateString('fr-FR') } catch { return String(val) }
    if (col.type === 'number' && val != null) return Number(val).toLocaleString('fr-FR')
    return val != null ? String(val) : ''
  }

  function exportCSV() {
    const cols = visibleColumns.filter(c => c.type !== 'actions')
    const csv = [cols.map(c => c.label || c.key).join(','), ...filteredData.map(row => cols.map(c => `"${String(row[c.key] ?? '').replace(/"/g, '""')}"`).join(','))].join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    a.download = `${exportFilename}.csv`
    a.click()
  }

  const pad = $derived(compact ? 'px-3 py-1.5' : 'px-4 py-3')
  const hpad = $derived(compact ? 'px-3 py-2' : 'px-4 py-3')
</script>

{#if children}
  <!-- Legacy mode: raw table content -->
  <div class="rounded-xl overflow-hidden {classes?.root ?? className}" style="background:var(--karbon-bg-card);border:1px solid var(--karbon-border);">
    <div class="overflow-x-auto">
      <table class="min-w-full [&_thead_tr]:border-b [&_thead_tr]:border-[var(--karbon-border)] [&_thead_tr]:bg-[var(--karbon-bg-2)] [&_thead_th]:text-xs [&_thead_th]:font-semibold [&_thead_th]:uppercase [&_thead_th]:tracking-wider [&_thead_th]:px-4 [&_thead_th]:py-3 [&_thead_th]:text-left [&_thead_th]:text-[var(--karbon-text-3)] [&_tbody_tr]:border-b [&_tbody_tr]:border-[var(--karbon-border)] [&_tbody_tr:last-child]:border-b-0 [&_tbody_tr:hover]:bg-[var(--karbon-nav-hover-bg)] [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:text-[var(--karbon-text-2)]">
        {@render children()}
      </table>
    </div>
  </div>
{:else}
  <!-- Full-featured mode -->
  <div class="rounded-xl overflow-hidden {classes?.root ?? className}" style="background:var(--karbon-bg-card);border:1px solid var(--karbon-border);">

    <!-- Toolbar -->
    {#if searchable || selectable || exportable || showPerPage}
      <div class="flex items-center gap-3 px-4 py-3 {classes?.search ?? ''}" style="border-bottom:1px solid var(--karbon-border);">
        {#if searchable}
          <div class="relative flex-1 max-w-xs">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-2.5 top-1/2 -translate-y-1/2" style="color:var(--karbon-text-4);"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" bind:value={search} placeholder="Rechercher..." class="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none" style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);color:var(--karbon-text);" oninput={() => { currentPage = 1 }} />
          </div>
        {/if}
        {#if someSelected || allSelected}
          <span class="text-xs font-medium" style="color:{accent};">{selected.size} selectionne{selected.size > 1 ? 's' : ''}</span>
        {/if}
        <div class="flex-1"></div>
        {#if showPerPage}
          <select class="text-xs rounded-md px-2 py-1 outline-none" style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);color:var(--karbon-text);" onchange={(e) => { itemsPerPage = Number((e.target as HTMLSelectElement).value); currentPage = 1 }}>
            {#each [10, 20, 50, 100] as n}<option value={n} selected={n === itemsPerPage}>{n}/page</option>{/each}
          </select>
        {/if}
        {#if exportable}
          <button onclick={exportCSV} class="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors" style="color:var(--karbon-text-2);background:var(--karbon-bg-input);" aria-label="Exporter CSV">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            CSV
          </button>
        {/if}
        <span class="text-[11px]" style="color:var(--karbon-text-4);">{filteredData.length} resultat{filteredData.length > 1 ? 's' : ''}</span>
      </div>
    {/if}

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr style="background:var(--karbon-bg-2);border-bottom:1px solid var(--karbon-border);" class="{stickyHeader ? 'sticky top-0 z-10' : ''}">
            {#if selectable}
              <th class="{hpad} w-10">
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="w-4 h-4 rounded border cursor-pointer" style="display:grid;place-items:center;box-sizing:border-box;border-color:{allSelected || someSelected ? accent : 'var(--karbon-border-input)'};background:{allSelected ? accent : 'transparent'};" onclick={toggleAll} role="checkbox" aria-checked={allSelected ? 'true' : someSelected ? 'mixed' : 'false'} tabindex={0} onkeydown={(e) => { if (e.key === ' ') { e.preventDefault(); toggleAll() } }}>
                  {#if allSelected}<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {:else if someSelected}<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>{/if}
                </div>
              </th>
            {/if}
            {#each visibleColumns as col}
              <th class="{hpad} text-left text-[11px] font-semibold uppercase tracking-wider {col.sortable ? 'cursor-pointer select-none' : ''}" style="color:var(--karbon-text-3);{col.width ? `width:${col.width};` : ''}{col.align ? `text-align:${col.align};` : ''}{col.sticky ? 'position:sticky;left:0;z-index:5;background:var(--karbon-bg-2);' : ''}" onclick={() => col.sortable && toggleSort(col.key)}>
                <div class="flex items-center gap-1.5">
                  <span>{col.label || col.key}</span>
                  {#if col.sortable}
                    <span class="inline-flex flex-col" style="line-height:0;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="{sortKey === col.key && sortDir === 'asc' ? accent : 'var(--karbon-text-4)'}" stroke="none"><path d="M12 5l7 9H5z"/></svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="{sortKey === col.key && sortDir === 'desc' ? accent : 'var(--karbon-text-4)'}" stroke="none"><path d="M12 19l7-9H5z"/></svg>
                    </span>
                  {/if}
                  {#if col.filterable && col.options}
                    <select class="text-[10px] rounded px-1 py-0.5 outline-none ml-1" style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);color:var(--karbon-text-2);" onchange={(e) => { activeFilters = { ...activeFilters, [col.key]: (e.target as HTMLSelectElement).value }; currentPage = 1 }} onclick={(e) => e.stopPropagation()}>
                      <option value="">Tous</option>
                      {#each col.options as opt}<option value={opt}>{opt}</option>{/each}
                    </select>
                  {/if}
                </div>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#if loading}
            {#each Array(loadingRows) as _, i}
              <tr style="border-bottom:1px solid var(--karbon-border);">
                {#if selectable}<td class="{pad}"><div class="w-4 h-4 rounded animate-pulse" style="background:var(--karbon-bg-2);"></div></td>{/if}
                {#each visibleColumns as col}<td class="{pad}"><div class="h-4 rounded animate-pulse" style="background:var(--karbon-bg-2);width:{col.type === 'actions' ? '60px' : `${40 + Math.random() * 40}%`};animation-delay:{i * 80}ms;"></div></td>{/each}
              </tr>
            {/each}
          {:else if paginatedData.length === 0}
            <tr><td colspan={visibleColumns.length + (selectable ? 1 : 0)} class="text-center py-12">
              {#if empty}{@render empty()}{:else}
                <div style="color:var(--karbon-text-4);">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2 opacity-50"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  <p class="text-sm">Aucun resultat</p>
                  {#if search}<p class="text-xs mt-1">Essayez un autre terme de recherche</p>{/if}
                </div>
              {/if}
            </td></tr>
          {:else}
            {#each paginatedData as row, i}
              {@const gi = perPage > 0 ? (currentPage - 1) * itemsPerPage + i : i}
              {@const isSel = selected.has(gi)}
              <tr
                class="{hoverable && !isSel ? 'transition-colors' : ''}"
                style="border-bottom:1px solid var(--karbon-border);background:{isSel ? `color-mix(in srgb,${accent} 8%,transparent)` : striped && i % 2 ? 'var(--karbon-bg-2)' : 'transparent'};{onrowclick ? 'cursor:pointer;' : ''}"
                onclick={() => onrowclick?.(row)}
                onmouseenter={(e) => { if (hoverable && !isSel) (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)' }}
                onmouseleave={(e) => { if (hoverable && !isSel) (e.currentTarget as HTMLElement).style.background = striped && i % 2 ? 'var(--karbon-bg-2)' : 'transparent' }}
              >
                {#if selectable}
                  <td class="{pad}">
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class="w-4 h-4 rounded border cursor-pointer" style="display:grid;place-items:center;box-sizing:border-box;border-color:{isSel ? accent : 'var(--karbon-border-input)'};background:{isSel ? accent : 'transparent'};" onclick={(e) => { e.stopPropagation(); toggleRow(gi) }} role="checkbox" aria-checked={isSel} tabindex={0} onkeydown={(e) => { if (e.key === ' ') { e.preventDefault(); toggleRow(gi) } }}>
                      {#if isSel}<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{/if}
                    </div>
                  </td>
                {/if}
                {#each visibleColumns as col}
                  <td class="{pad} text-sm {classes?.cell ?? ''}" style="color:var(--karbon-text-2);{col.align ? `text-align:${col.align};` : ''}{col.sticky ? 'position:sticky;left:0;z-index:1;background:inherit;' : ''}">
                    {#if cell}
                      {@render cell(col, row, i)}
                    {:else if col.type === 'image'}
                      {#if row[col.key]}<img src={row[col.key]} alt="" class="h-8 w-8 rounded object-cover" />{/if}
                    {:else if col.type === 'boolean'}
                      {#if row[col.key]}
                        <span class="inline-flex items-center justify-center w-5 h-5 rounded-full" style="background:color-mix(in srgb,var(--karbon-success) 15%,transparent);color:var(--karbon-success);"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                      {:else}
                        <span class="inline-flex items-center justify-center w-5 h-5 rounded-full" style="background:color-mix(in srgb,var(--karbon-danger) 15%,transparent);color:var(--karbon-danger);"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></span>
                      {/if}
                    {:else}
                      {formatCell(col, row)}
                    {/if}
                  </td>
                {/each}
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    {#if perPage > 0 && totalPages > 1}
      <div class="flex items-center justify-between px-4 py-3 {classes?.footer ?? ''}" style="border-top:1px solid var(--karbon-border);">
        <span class="text-xs" style="color:var(--karbon-text-4);">{(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredData.length)} sur {filteredData.length}</span>
        <div class="flex items-center gap-1">
          <button onclick={() => { if (currentPage > 1) currentPage-- }} disabled={currentPage <= 1} class="px-2 py-1 rounded text-xs cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" style="color:var(--karbon-text-2);" aria-label="Precedent">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          {#each Array(Math.min(totalPages, 7)) as _, i}
            {@const p = totalPages <= 7 ? i + 1 : currentPage <= 4 ? i + 1 : currentPage >= totalPages - 3 ? totalPages - 6 + i : currentPage - 3 + i}
            {#if p >= 1 && p <= totalPages}
              <button onclick={() => currentPage = p} class="w-7 h-7 rounded text-xs font-medium cursor-pointer transition-all" style="background:{p === currentPage ? accent : 'transparent'};color:{p === currentPage ? 'white' : 'var(--karbon-text-3)'};">{p}</button>
            {/if}
          {/each}
          <button onclick={() => { if (currentPage < totalPages) currentPage++ }} disabled={currentPage >= totalPages} class="px-2 py-1 rounded text-xs cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" style="color:var(--karbon-text-2);" aria-label="Suivant">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    {/if}
  </div>
{/if}
