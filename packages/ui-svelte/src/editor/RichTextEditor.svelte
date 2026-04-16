<script lang="ts">
  import { onMount, tick } from 'svelte'
  import type { MediaProvider, MediaFile, EditorTheme } from '@karbonjs/ui-core'

  interface EditorToken {
    id: string
    label: string
    icon?: string
    group?: string
    template?: string
    render?: (data?: any) => string
  }

  type ToolbarItem = string
  type ToolbarGroup = ToolbarItem[]
  type ToolbarConfig = ToolbarGroup[] | 'minimal' | 'standard' | 'full'

  interface Props {
    value: string
    placeholder?: string
    media?: MediaProvider
    theme?: EditorTheme
    toolbar?: ToolbarConfig
    toolbarMode?: 'fixed' | 'floating' | 'bottom'
    tokens?: EditorToken[]
    preserveStyles?: boolean
    class?: string
  }

  let {
    value = $bindable(''),
    placeholder = 'Rédigez votre contenu...',
    media,
    theme = 'default',
    toolbar = 'standard',
    toolbarMode = 'fixed',
    tokens = [],
    preserveStyles = false,
    class: className = ''
  }: Props = $props()

  // ── Toolbar presets ──
  const toolbarPresets: Record<string, ToolbarGroup[]> = {
    minimal: [
      ['bold', 'italic', 'underline'],
      ['link'],
    ],
    standard: [
      ['bold', 'italic', 'underline', 'strikethrough'],
      ['h2', 'h3', 'h4'],
      ['bulletList', 'orderedList', 'blockquote'],
      ['link', 'image'],
      ['code', 'hr'],
      ['source'],
    ],
    full: [
      ['bold', 'italic', 'underline', 'strikethrough'],
      ['h2', 'h3', 'h4'],
      ['bulletList', 'orderedList', 'blockquote'],
      ['alignLeft', 'alignCenter', 'alignRight'],
      ['link', 'image', 'video', 'table'],
      ['code', 'hr', 'color'],
      ['clearFormat', 'source', 'fullscreen'],
    ],
  }

  const resolvedToolbar = $derived<ToolbarGroup[]>(
    typeof toolbar === 'string' ? (toolbarPresets[toolbar] ?? toolbarPresets.standard) : toolbar
  )

  // ── Toolbar helpers ──
  const flatToolbar = $derived(resolvedToolbar.flat())
  function hasBtn(id: string): boolean { return flatToolbar.includes(id) }
  function isGroupVisible(ids: string[]): boolean { return ids.some(id => flatToolbar.includes(id)) }

  // ── Token picker state ──
  let showTokenPicker = $state(false)
  let tokenFilter = $state('')

  // Group tokens by category
  const tokenGroups = $derived.by(() => {
    const groups: string[] = []
    for (const t of tokens) {
      if (t.group && !groups.includes(t.group)) groups.push(t.group)
    }
    return groups
  })

  const filteredTokens = $derived(
    tokenFilter ? tokens.filter(t => t.group === tokenFilter) : tokens
  )

  // ── Block editor state ──
  let selectedBlock = $state<HTMLElement | null>(null)
  let blockEditorPos = $state({ x: 0, y: 0 })
  let showBlockEditor = $state(false)
  let blockCols = $state('2')
  let blockGap = $state('16')
  let blockPad = $state('16')
  let blockRadius = $state('8')
  let blockBg = $state('')

  function handleEditorClick(e: MouseEvent) {
    // Find closest data-token element
    const target = e.target as HTMLElement
    const block = target.closest('[data-token]') as HTMLElement | null

    if (block && editor?.contains(block)) {
      selectedBlock = block
      // Read current styles
      const style = block.style
      blockCols = (style.gridTemplateColumns?.match(/repeat\((\d+)/)?.[1]) || style.gridTemplateColumns?.split(/\s+1fr/).length?.toString() || '2'
      blockGap = parseInt(style.gap || '16').toString()
      blockPad = parseInt(style.padding || '16').toString()
      blockRadius = parseInt(style.borderRadius || '8').toString()
      blockBg = style.background || ''

      // Position the editor above the block
      const rect = block.getBoundingClientRect()
      blockEditorPos = { x: rect.left, y: rect.top - 44 }
      showBlockEditor = true

      // Visual selection
      block.style.outline = '2px solid var(--karbon-primary)'
      block.style.outlineOffset = '2px'
    } else {
      deselectBlock()
    }
  }

  function deselectBlock() {
    if (selectedBlock) {
      selectedBlock.style.outline = ''
      selectedBlock.style.outlineOffset = ''
    }
    selectedBlock = null
    showBlockEditor = false
  }

  function updateBlockCols(cols: string) {
    if (!selectedBlock) return
    blockCols = cols
    if (selectedBlock.style.display === 'grid' || selectedBlock.style.gridTemplateColumns) {
      selectedBlock.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
      // Adjust children count
      const childCount = selectedBlock.children.length
      const targetCount = parseInt(cols)
      if (childCount < targetCount) {
        for (let i = childCount; i < targetCount; i++) {
          const div = document.createElement('div')
          div.style.cssText = 'padding:16px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:60px;'
          div.innerHTML = '<p>Nouvelle colonne</p>'
          selectedBlock.appendChild(div)
        }
      }
    }
    syncValue()
  }

  function updateBlockGap(gap: string) {
    if (!selectedBlock) return
    blockGap = gap
    selectedBlock.style.gap = gap + 'px'
    syncValue()
  }

  function updateBlockPad(pad: string) {
    if (!selectedBlock) return
    blockPad = pad
    // Apply padding to children if grid, or to block itself
    if (selectedBlock.style.display === 'grid') {
      Array.from(selectedBlock.children).forEach((child) => {
        (child as HTMLElement).style.padding = pad + 'px'
      })
    } else {
      selectedBlock.style.padding = pad + 'px'
    }
    syncValue()
  }

  function updateBlockRadius(radius: string) {
    if (!selectedBlock) return
    blockRadius = radius
    selectedBlock.style.borderRadius = radius + 'px'
    // Also update children
    Array.from(selectedBlock.children).forEach((child) => {
      (child as HTMLElement).style.borderRadius = radius + 'px'
    })
    syncValue()
  }

  function deleteBlock() {
    if (!selectedBlock) return
    selectedBlock.remove()
    deselectBlock()
    syncValue()
  }

  function duplicateBlock() {
    if (!selectedBlock) return
    const clone = selectedBlock.cloneNode(true) as HTMLElement
    selectedBlock.after(clone)
    deselectBlock()
    syncValue()
  }

  // Close block editor on outside click
  function handleGlobalClick() {
    if (showTokenPicker) showTokenPicker = false
  }

  function insertToken(token: EditorToken) {
    if (!editor) return
    editor.focus()
    let html = ''
    if (token.template) {
      html = token.template
    } else if (token.render) {
      html = token.render()
    } else {
      html = `<div data-token="${token.id}" contenteditable="false" style="padding:12px;margin:8px 0;border:1px dashed var(--karbon-border);border-radius:8px;background:var(--karbon-bg-2);cursor:pointer;">
        <span style="font-size:11px;font-weight:600;color:var(--karbon-text-3);">${token.icon ? token.icon + ' ' : ''}${token.label}</span>
      </div>`
    }
    document.execCommand('insertHTML', false, html)
    syncValue()
    showTokenPicker = false
  }

  // ── Floating toolbar state ──
  let floatingPos = $state({ x: 0, y: 0 })
  let showFloating = $state(false)

  function updateFloatingToolbar() {
    if (toolbarMode !== 'floating') return
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed || !sel.rangeCount) {
      showFloating = false
      return
    }
    const range = sel.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    // Position relative to viewport, use fixed positioning
    floatingPos = {
      x: rect.left + rect.width / 2,
      y: rect.top - 52,
    }
    showFloating = true
  }

  // ── DOM refs ──
  let editor = $state<HTMLDivElement>(undefined!)
  let sourceEl = $state<HTMLTextAreaElement>(undefined!)
  let lineNumbers = $state<HTMLDivElement>(undefined!)

  // ── Editor state ──
  let sourceMode = $state(false)
  let sourceCode = $state('')
  let fullscreen = $state(false)
  let activeFormats = $state<Set<string>>(new Set())
  let savedRange: Range | null = null
  let wordCount = $state(0)
  let charCount = $state(0)

  // ── Modals ──
  let showLinkModal = $state(false)
  let showImageModal = $state(false)
  let showImagePropsModal = $state(false)
  let showTableModal = $state(false)
  let showColorPicker = $state(false)
  let showMediaExplorer = $state(false)
  let showEmbedModal = $state(false)
  let showFindReplace = $state(false)
  let showContextMenu = $state(false)
  let showElementProps = $state(false)

  let mediaExplorerContext = $state<'editor' | 'imageModal'>('editor')

  // ── Link state ──
  let linkUrl = $state('')
  let linkText = $state('')
  let linkTarget = $state(true)
  let linkTitle = $state('')
  let linkClass = $state('')

  // ── Image state ──
  let imageUrl = $state('')
  let imageAlt = $state('')
  let imageTitle = $state('')
  let imageClass = $state('')
  let imageStyle = $state('')
  let imageWidth = $state('')
  let imageHeight = $state('')
  let imageAlign = $state('')
  let imageUploading = $state(false)
  let targetImage: HTMLImageElement | null = null

  // ── Table state ──
  let tableRows = $state(3)
  let tableCols = $state(3)
  let targetTable: HTMLTableElement | null = null
  let targetCell: HTMLTableCellElement | null = null

  // ── Embed state ──
  let embedUrl = $state('')

  // ── Find/Replace ──
  let findText = $state('')
  let replaceText = $state('')

  // ── Context menu ──
  let contextPos = $state({ x: 0, y: 0 })
  let contextTarget = $state<HTMLElement | null>(null)
  let contextType = $state<'image' | 'link' | 'table' | 'general'>('general')

  // ── Element properties ──
  let elPropsTag = $state('')
  let elPropsClass = $state('')
  let elPropsStyle = $state('')
  let elPropsId = $state('')
  let elPropsTarget = $state<HTMLElement | null>(null)

  // ── Media explorer state ──
  let mediaCurrentPath = $state('')
  let mediaEntries = $state<MediaFile[]>([])
  let mediaLoading = $state(false)
  let mediaUploading = $state(false)
  let mediaSearch = $state('')
  let mediaSelected = $state<MediaFile | null>(null)
  let mediaViewMode = $state<'grid' | 'list'>('grid')
  let mediaShowNewFolder = $state(false)
  let mediaNewFolderName = $state('')
  let mediaDragOver = $state(false)

  const mediaBreadcrumbs = $derived.by(() => {
    const parts = mediaCurrentPath.split('/').filter(Boolean)
    return parts.map((part, i) => ({
      label: part,
      path: parts.slice(0, i + 1).join('/')
    }))
  })

  const mediaFiltered = $derived(
    mediaSearch ? mediaEntries.filter(e => e.name.toLowerCase().includes(mediaSearch.toLowerCase())) : mediaEntries
  )

  const COLORS = [
    '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#ffffff',
    '#e74c3c', '#c0392b', '#e67e22', '#d35400', '#f1c40f', '#f39c12',
    '#2ecc71', '#27ae60', '#1abc9c', '#16a085', '#3498db', '#2980b9',
    '#9b59b6', '#8e44ad', '#e84393', '#fd79a8', '#a29bfe', '#6c5ce7',
  ]

  const FONT_SIZES = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px']

  const HTML_RULES: [RegExp, string][] = [
    [/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="hl-comment">$1</span>'],
    [/(&lt;\/?)([\w-]+)/g, '<span class="hl-bracket">$1</span><span class="hl-tag">$2</span>'],
    [/([\w-]+)(=)(&quot;[^&]*&quot;|&#39;[^&]*&#39;)/g, '<span class="hl-attr">$1</span><span class="hl-eq">$2</span><span class="hl-val">$3</span>'],
    [/(&gt;)/g, '<span class="hl-bracket">$1</span>'],
  ]

  /** Escape string for safe HTML attribute insertion */
  function escAttr(str: string): string {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  function isImage(entry: MediaFile): boolean {
    return entry.mime?.startsWith('image/') ?? false
  }

  function formatSize(bytes: number): string {
    if (bytes === 0) return '—'
    if (bytes < 1024) return `${bytes} o`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} Ko`
    return `${(bytes / 1048576).toFixed(1)} Mo`
  }

  onMount(() => {
    if (value) editor.innerHTML = cleanHtml(value)
    updateCounts()
  })

  // ── Core editor functions ──
  function handleInput() { value = editor.innerHTML; updateCounts() }

  function updateCounts() {
    const text = editor?.innerText ?? ''
    charCount = text.length
    wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b': e.preventDefault(); exec('bold'); break
        case 'i': e.preventDefault(); exec('italic'); break
        case 'u': e.preventDefault(); exec('underline'); break
        case 'k': e.preventDefault(); openLinkModal(); break
        case 'h': e.preventDefault(); showFindReplace = !showFindReplace; break
      }
    }
    if (e.key === 'Tab') { e.preventDefault(); exec(e.shiftKey ? 'outdent' : 'indent') }
  }

  function handlePaste(e: ClipboardEvent) {
    const html = e.clipboardData?.getData('text/html')
    if (html) { e.preventDefault(); exec('insertHTML', cleanHtml(html)) }
  }

  function cleanHtml(html: string): string {
    const div = document.createElement('div')

    // Full HTML document: extract body content and preserve body style
    if (preserveStyles && /<(!DOCTYPE|html|body)\b/i.test(html)) {
      const bodyMatch = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/i)
      if (bodyMatch) {
        const bodyAttrs = bodyMatch[1]
        const bodyContent = bodyMatch[2]
        const styleMatch = bodyAttrs.match(/style="([^"]*)"/)
        const bodyStyle = styleMatch ? styleMatch[1] : ''
        div.innerHTML = bodyStyle
          ? `<div style="${bodyStyle}">${bodyContent}</div>`
          : bodyContent
      } else {
        div.innerHTML = html
      }
    } else {
      div.innerHTML = html
    }

    div.querySelectorAll('*').forEach(el => {
      el.removeAttribute('class'); el.removeAttribute('id')
      if (!preserveStyles) {
        const style = el.getAttribute('style')
        if (style) {
          const parts = style.split(';').filter(s => ['text-align', 'font-weight', 'font-style', 'text-decoration'].some(a => s.trim().startsWith(a)))
          if (parts.length) el.setAttribute('style', parts.join(';')); else el.removeAttribute('style')
        }
      }
    })
    div.querySelectorAll('script, meta, link').forEach(el => el.remove())
    let str = div.innerHTML
    str = str.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '')
    return str
  }

  function exec(command: string, val: string | undefined = undefined) {
    editor?.focus()
    document.execCommand(command, false, val)
    updateActiveFormats()
    value = editor.innerHTML
    updateCounts()
  }

  function updateActiveFormats() {
    const formats = new Set<string>()
    for (const cmd of ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'insertUnorderedList', 'insertOrderedList', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull']) {
      if (document.queryCommandState(cmd)) formats.add(cmd)
    }
    const block = document.queryCommandValue('formatBlock')
    if (block) formats.add(block.toLowerCase())
    activeFormats = formats
  }

  function saveSelection() { const sel = window.getSelection(); if (sel && sel.rangeCount > 0) savedRange = sel.getRangeAt(0).cloneRange() }
  function restoreSelection() { if (savedRange) { const sel = window.getSelection(); sel?.removeAllRanges(); sel?.addRange(savedRange) } }

  // ── Context menu ──
  function handleContextMenu(e: MouseEvent) {
    e.preventDefault()
    const target = e.target as HTMLElement
    contextTarget = target
    const img = target.closest('img') as HTMLImageElement | null
    const link = target.closest('a') as HTMLAnchorElement | null
    const table = target.closest('table') as HTMLTableElement | null
    if (img) { contextType = 'image'; targetImage = img }
    else if (link) contextType = 'link'
    else if (table) { contextType = 'table'; targetTable = table; targetCell = target.closest('td, th') as HTMLTableCellElement }
    else contextType = 'general'
    contextPos = { x: e.clientX, y: e.clientY }
    showContextMenu = true
  }

  function handleDblClick(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (target.tagName === 'IMG') openImageProps(target as HTMLImageElement)
    else if (target.closest('a')) openLinkModalFromElement(target.closest('a') as HTMLAnchorElement)
  }

  // ── Image properties ──
  function openImageProps(img: HTMLImageElement) {
    targetImage = img; imageUrl = img.src; imageAlt = img.alt ?? ''; imageTitle = img.title ?? ''
    imageClass = img.className ?? ''; imageStyle = img.getAttribute('style') ?? ''
    imageWidth = img.width ? String(img.width) : ''; imageHeight = img.height ? String(img.height) : ''
    imageAlign = img.style.float || (img.style.display === 'block' && img.style.margin === '0px auto' ? 'center' : '') || ''
    showImagePropsModal = true; showContextMenu = false
  }

  function applyImageProps() {
    if (!targetImage) return
    targetImage.alt = imageAlt; targetImage.title = imageTitle; targetImage.className = imageClass
    if (imageWidth) targetImage.width = parseInt(imageWidth); else targetImage.removeAttribute('width')
    if (imageHeight) targetImage.height = parseInt(imageHeight); else targetImage.removeAttribute('height')
    targetImage.style.float = ''; targetImage.style.display = ''; targetImage.style.margin = ''
    if (imageAlign === 'left') targetImage.style.float = 'left'
    else if (imageAlign === 'right') targetImage.style.float = 'right'
    else if (imageAlign === 'center') { targetImage.style.display = 'block'; targetImage.style.margin = '0 auto' }
    if (imageStyle) { const existing = targetImage.getAttribute('style') ?? ''; targetImage.setAttribute('style', existing + ';' + imageStyle) }
    showImagePropsModal = false; value = editor.innerHTML
  }

  function deleteTargetImage() { targetImage?.remove(); showImagePropsModal = false; showContextMenu = false; value = editor.innerHTML }

  // ── Link ──
  function openLinkModal() {
    saveSelection(); const sel = window.getSelection(); linkText = sel?.toString() ?? ''
    const anchor = sel?.anchorNode?.parentElement?.closest('a')
    linkUrl = anchor?.getAttribute('href') ?? ''; linkTarget = anchor?.getAttribute('target') === '_blank' || !anchor
    linkTitle = anchor?.getAttribute('title') ?? ''; linkClass = anchor?.className ?? ''; showLinkModal = true
  }

  function openLinkModalFromElement(a: HTMLAnchorElement) {
    linkUrl = a.href; linkText = a.textContent ?? ''; linkTarget = a.target === '_blank'
    linkTitle = a.title ?? ''; linkClass = a.className ?? ''
    const range = document.createRange(); range.selectNodeContents(a)
    const sel = window.getSelection(); sel?.removeAllRanges(); sel?.addRange(range)
    saveSelection(); showLinkModal = true; showContextMenu = false
  }

  function insertLink() {
    showLinkModal = false; restoreSelection(); editor.focus()
    if (!linkUrl) { exec('unlink'); return }
    const safeUrl = escAttr(linkUrl)
    const attrs = `href="${safeUrl}"${linkTarget ? ' target="_blank" rel="noopener"' : ''}${linkTitle ? ` title="${escAttr(linkTitle)}"` : ''}${linkClass ? ` class="${escAttr(linkClass)}"` : ''}`
    if (linkText) exec('insertHTML', `<a ${attrs}>${escAttr(linkText)}</a>`)
    else {
      exec('createLink', linkUrl)
      const a = window.getSelection()?.anchorNode?.parentElement?.closest('a')
      if (a) { if (linkTarget) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener') }; if (linkTitle) a.setAttribute('title', linkTitle); if (linkClass) a.className = linkClass }
    }
    value = editor.innerHTML
  }

  // ── Image insert ──
  function openImageModal() { saveSelection(); imageUrl = ''; imageAlt = ''; imageTitle = ''; imageClass = ''; imageWidth = ''; imageHeight = ''; showImageModal = true }

  async function handleImageUpload(files: FileList | null) {
    if (!files?.length || !media?.upload) return
    imageUploading = true
    try {
      const result = await media.upload(files[0], mediaCurrentPath)
      imageUrl = result.url
      imageAlt = files[0].name.replace(/\.[^/.]+$/, '')
    } catch { /* */ } finally { imageUploading = false }
  }

  function insertImage() {
    showImageModal = false; if (!imageUrl) return
    restoreSelection(); editor.focus()
    const attrs = [`src="${escAttr(imageUrl)}"`, imageAlt ? `alt="${escAttr(imageAlt)}"` : '', imageTitle ? `title="${escAttr(imageTitle)}"` : '', imageClass ? `class="${escAttr(imageClass)}"` : '', imageWidth ? `width="${escAttr(imageWidth)}"` : '', imageHeight ? `height="${escAttr(imageHeight)}"` : '', 'loading="lazy"'].filter(Boolean).join(' ')
    exec('insertHTML', `<img ${attrs} />`)
    value = editor.innerHTML
  }

  function openMediaExplorerForImage() { mediaExplorerContext = 'imageModal'; showImageModal = false; showMediaExplorer = true; browseMedia(mediaCurrentPath) }
  function openMediaExplorerInline() { saveSelection(); mediaExplorerContext = 'editor'; showMediaExplorer = true; browseMedia(mediaCurrentPath) }

  // ── Media explorer ──
  async function browseMedia(path: string) {
    if (!media?.browse) return
    mediaLoading = true
    mediaSelected = null
    try {
      const result = await media.browse(path, mediaSearch || undefined)
      mediaCurrentPath = result.path ?? path
      mediaEntries = result.entries ?? []
    } catch { mediaEntries = [] } finally { mediaLoading = false }
  }

  function mediaNavigateTo(path: string) { mediaCurrentPath = path; browseMedia(path) }
  function mediaGoUp() { const parts = mediaCurrentPath.split('/').filter(Boolean); parts.pop(); mediaNavigateTo(parts.join('/')) }

  function handleMediaEntryClick(entry: MediaFile) {
    if (entry.is_dir) mediaNavigateTo(entry.path)
    else mediaSelected = mediaSelected?.path === entry.path ? null : entry
  }

  function handleMediaEntryDblClick(entry: MediaFile) {
    if (!entry.is_dir && entry.url) handleMediaSelect(entry.url)
  }

  function handleMediaSelect(url: string) {
    showMediaExplorer = false
    if (mediaExplorerContext === 'imageModal') {
      imageUrl = url; imageAlt = url.split('/').pop()?.replace(/\.[^/.]+$/, '') ?? ''
      showImageModal = true
    } else {
      restoreSelection(); editor.focus()
      exec('insertHTML', `<img src="${escAttr(url)}" loading="lazy" />`)
      value = editor.innerHTML
    }
  }

  async function mediaHandleUpload(files: FileList | null) {
    if (!files?.length || !media?.upload) return
    mediaUploading = true
    try {
      for (const file of files) await media.upload(file, mediaCurrentPath)
      await browseMedia(mediaCurrentPath)
    } catch { } finally { mediaUploading = false; mediaDragOver = false }
  }

  function mediaHandleDrop(e: DragEvent) { e.preventDefault(); mediaDragOver = false; mediaHandleUpload(e.dataTransfer?.files ?? null) }

  async function mediaCreateFolder() {
    if (!mediaNewFolderName.trim() || !media?.createFolder) return
    try {
      const path = mediaCurrentPath ? `${mediaCurrentPath}/${mediaNewFolderName}` : mediaNewFolderName
      await media.createFolder(path)
      mediaShowNewFolder = false; mediaNewFolderName = ''
      await browseMedia(mediaCurrentPath)
    } catch { }
  }

  // ── Table ──
  function openTableModal() { saveSelection(); tableRows = 3; tableCols = 3; showTableModal = true }

  function insertTable() {
    showTableModal = false; restoreSelection(); editor.focus()
    let html = '<table><thead><tr>'
    for (let c = 0; c < tableCols; c++) html += '<th>En-tête</th>'
    html += '</tr></thead><tbody>'
    for (let r = 0; r < tableRows - 1; r++) { html += '<tr>'; for (let c = 0; c < tableCols; c++) html += '<td>&nbsp;</td>'; html += '</tr>' }
    html += '</tbody></table><p><br></p>'
    exec('insertHTML', html)
  }

  function tableAction(action: string) {
    showContextMenu = false
    if (!targetTable || !targetCell) return
    const row = targetCell.parentElement as HTMLTableRowElement
    const rowIndex = row.rowIndex; const colIndex = targetCell.cellIndex
    if (action === 'addRowAbove') { const nr = targetTable.insertRow(rowIndex); for (let i = 0; i < row.cells.length; i++) nr.insertCell().innerHTML = '&nbsp;' }
    else if (action === 'addRowBelow') { const nr = targetTable.insertRow(rowIndex + 1); for (let i = 0; i < row.cells.length; i++) nr.insertCell().innerHTML = '&nbsp;' }
    else if (action === 'addColLeft' || action === 'addColRight') { const idx = action === 'addColLeft' ? colIndex : colIndex + 1; for (let r = 0; r < targetTable.rows.length; r++) { const cell = targetTable.rows[r].insertCell(idx); cell.innerHTML = r === 0 && targetTable.tHead ? 'En-tête' : '&nbsp;' } }
    else if (action === 'deleteRow') { if (targetTable.rows.length > 1) targetTable.deleteRow(rowIndex) }
    else if (action === 'deleteCol') { for (let r = targetTable.rows.length - 1; r >= 0; r--) { if (targetTable.rows[r].cells.length > 1) targetTable.rows[r].deleteCell(colIndex) } }
    else if (action === 'deleteTable') targetTable.remove()
    value = editor.innerHTML
  }

  // ── Embed ──
  function openEmbedModal() { saveSelection(); embedUrl = ''; showEmbedModal = true }

  function isSafeUrl(url: string): boolean {
    try {
      const parsed = new URL(url)
      return ['http:', 'https:'].includes(parsed.protocol)
    } catch {
      return false
    }
  }

  function insertEmbed() {
    showEmbedModal = false; if (!embedUrl) return
    restoreSelection(); editor.focus()
    let match = embedUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/)
    if (match) { exec('insertHTML', `<div class="embed-responsive"><iframe src="https://www.youtube.com/embed/${escAttr(match[1])}" frameborder="0" allowfullscreen loading="lazy"></iframe></div><p><br></p>`); value = editor.innerHTML; return }
    match = embedUrl.match(/vimeo\.com\/(\d+)/)
    if (match) { exec('insertHTML', `<div class="embed-responsive"><iframe src="https://player.vimeo.com/video/${escAttr(match[1])}" frameborder="0" allowfullscreen loading="lazy"></iframe></div><p><br></p>`); value = editor.innerHTML; return }
    if (!isSafeUrl(embedUrl)) return
    exec('insertHTML', `<div class="embed-responsive"><iframe src="${escAttr(embedUrl)}" frameborder="0" loading="lazy"></iframe></div><p><br></p>`)
    value = editor.innerHTML
  }

  // ── Find & Replace ──
  function findNext() {
    if (!findText) return
    const sel = window.getSelection(); const range = document.createRange()
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT)
    let node: Node | null
    while ((node = walker.nextNode())) {
      const idx = (node.textContent ?? '').toLowerCase().indexOf(findText.toLowerCase())
      if (idx >= 0) { range.setStart(node, idx); range.setEnd(node, idx + findText.length); sel?.removeAllRanges(); sel?.addRange(range); break }
    }
  }

  function replaceNext() { const sel = window.getSelection(); if (sel?.toString().toLowerCase() === findText.toLowerCase()) exec('insertText', replaceText); findNext() }
  function replaceAll() {
    if (!findText || !editor) return
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    while (walker.nextNode()) nodes.push(walker.currentNode as Text)
    for (const node of nodes) {
      if (node.textContent?.includes(findText)) {
        node.textContent = node.textContent.replaceAll(findText, replaceText)
      }
    }
    value = editor.innerHTML
  }

  // ── Element properties ──
  function openElementProps(el?: HTMLElement) {
    const target = el ?? contextTarget; if (!target || target === editor) return
    elPropsTarget = target; elPropsTag = target.tagName.toLowerCase()
    elPropsClass = target.className ?? ''; elPropsStyle = target.getAttribute('style') ?? ''; elPropsId = target.id ?? ''
    showElementProps = true; showContextMenu = false
  }

  function applyElementProps() {
    if (!elPropsTarget) return
    elPropsTarget.className = elPropsClass
    if (elPropsStyle) elPropsTarget.setAttribute('style', elPropsStyle); else elPropsTarget.removeAttribute('style')
    if (elPropsId) elPropsTarget.id = elPropsId; else elPropsTarget.removeAttribute('id')
    showElementProps = false; value = editor.innerHTML
  }

  // ── Font size ──
  function setFontSize(size: string) {
    exec('fontSize', '7')
    editor.querySelectorAll('font[size="7"]').forEach(el => {
      const span = document.createElement('span'); span.style.fontSize = size; span.innerHTML = el.innerHTML; el.replaceWith(span)
    })
    value = editor.innerHTML
  }

  // ── Source mode ──
  function toggleSource() {
    if (!sourceMode) { sourceCode = formatHtml(editor.innerHTML); sourceMode = true; tick().then(() => updateLineNumbers()) }
    else { sourceMode = false; tick().then(() => { editor.innerHTML = sourceCode; value = sourceCode; updateCounts() }) }
  }

  function formatHtml(html: string): string {
    let result = '', indent = 0
    const tags = html.replace(/>\s*</g, '>\n<').split('\n')
    for (const tag of tags) {
      const trimmed = tag.trim(); if (!trimmed) continue
      if (trimmed.startsWith('</')) indent = Math.max(0, indent - 1)
      result += '  '.repeat(indent) + trimmed + '\n'
      if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>') && !trimmed.startsWith('<!') && !/^<(br|hr|img|input|meta|link)\b/i.test(trimmed)) indent++
    }
    return result.trim()
  }

  function highlightHtml(code: string): string {
    let escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
    for (const [regex, replacement] of HTML_RULES) escaped = escaped.replace(regex, replacement)
    return escaped
  }

  function updateLineNumbers() {
    if (!sourceEl || !lineNumbers) return
    lineNumbers.innerHTML = Array.from({ length: sourceCode.split('\n').length }, (_, i) => `<div>${i + 1}</div>`).join('')
  }

  function handleSourceInput() { value = sourceCode; updateLineNumbers() }
  function handleSourceScroll() { if (lineNumbers && sourceEl) lineNumbers.scrollTop = sourceEl.scrollTop }
  function insertColor(color: string) { exec('foreColor', color); showColorPicker = false }
  function isActive(cmd: string): string { return activeFormats.has(cmd) ? 'rte-btn rte-btn-active' : 'rte-btn' }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div role="toolbar" aria-label="Éditeur de texte riche" class="rte-wrapper {fullscreen ? 'fixed inset-0 z-40 rounded-none flex flex-col' : ''} {preserveStyles ? 'rte-wrapper-preserve' : ''} {className}">

  <!-- ═══ TOOLBAR ═══ -->
  <div class="rte-toolbar" style="{toolbarMode === 'floating' ? 'display:none;' : ''}{toolbarMode === 'bottom' ? 'order:2;' : ''}">
    <button type="button" onclick={() => exec('undo')} class="rte-btn" title="Annuler (Ctrl+Z)" aria-label="Annuler">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
    </button>
    <button type="button" onclick={() => exec('redo')} class="rte-btn" title="Rétablir" aria-label="Rétablir">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/></svg>
    </button>
    <span class="rte-sep"></span>

    <button type="button" onclick={() => exec('formatBlock', 'p')} class={isActive('p')} title="Paragraphe" aria-label="Paragraphe">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4v16"/><path d="M17 4v16"/><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"/></svg>
    </button>
    <button type="button" onclick={() => exec('formatBlock', 'h2')} class="{isActive('h2')} text-xs font-bold" title="Titre 2">H2</button>
    <button type="button" onclick={() => exec('formatBlock', 'h3')} class="{isActive('h3')} text-xs font-bold" title="Titre 3">H3</button>
    <button type="button" onclick={() => exec('formatBlock', 'h4')} class="{isActive('h4')} text-xs font-bold" title="Titre 4">H4</button>
    <span class="rte-sep"></span>

    <select onchange={(e) => setFontSize(e.currentTarget.value)} class="rte-select" title="Taille">
      <option value="">Taille</option>
      {#each FONT_SIZES as size}<option value={size}>{size}</option>{/each}
    </select>
    <span class="rte-sep"></span>

    <button type="button" onclick={() => exec('bold')} class={isActive('bold')} title="Gras (Ctrl+B)" aria-label="Gras">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>
    </button>
    <button type="button" onclick={() => exec('italic')} class={isActive('italic')} title="Italique (Ctrl+I)" aria-label="Italique">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>
    </button>
    <button type="button" onclick={() => exec('underline')} class={isActive('underline')} title="Souligné (Ctrl+U)" aria-label="Souligné">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>
    </button>
    <button type="button" onclick={() => exec('strikeThrough')} class={isActive('strikeThrough')} title="Barré" aria-label="Barré">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/></svg>
    </button>
    <button type="button" onclick={() => exec('subscript')} class={isActive('subscript')} title="Indice" aria-label="Indice">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 5 8 8"/><path d="m12 5-8 8"/><path d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"/></svg>
    </button>
    <button type="button" onclick={() => exec('superscript')} class={isActive('superscript')} title="Exposant" aria-label="Exposant">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 19 8-8"/><path d="m12 19-8-8"/><path d="M20 9h-4c0-1.5.44-2 1.5-2.5S20 5.33 20 4c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"/></svg>
    </button>
    <span class="rte-sep"></span>

    <!-- Color -->
    <div class="relative">
      <button type="button" onclick={() => showColorPicker = !showColorPicker} class="rte-btn" title="Couleur" aria-label="Couleur du texte">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/></svg>
      </button>
      {#if showColorPicker}
        <div class="rte-color-grid">
          {#each COLORS as color}<button type="button" onclick={() => insertColor(color)} class="rte-color-swatch" style="background-color: {color}" aria-label="Couleur {color}"></button>{/each}
        </div>
      {/if}
    </div>
    <button type="button" onclick={() => exec('removeFormat')} class="rte-btn" title="Effacer formatage" aria-label="Effacer le formatage">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21a4.6 4.6 0 0 1 0-9h10a4.6 4.6 0 1 1 0 9H7Z"/><path d="m3 3 18 18"/></svg>
    </button>
    <span class="rte-sep"></span>

    <!-- Alignment -->
    <button type="button" onclick={() => exec('justifyLeft')} class={isActive('justifyLeft')} title="Gauche" aria-label="Aligner à gauche">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/></svg>
    </button>
    <button type="button" onclick={() => exec('justifyCenter')} class={isActive('justifyCenter')} title="Centre" aria-label="Centrer">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="17" x2="7" y1="12" y2="12"/><line x1="19" x2="5" y1="18" y2="18"/></svg>
    </button>
    <button type="button" onclick={() => exec('justifyRight')} class={isActive('justifyRight')} title="Droite" aria-label="Aligner à droite">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/></svg>
    </button>
    <button type="button" onclick={() => exec('justifyFull')} class={isActive('justifyFull')} title="Justifier" aria-label="Justifier">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="3" y1="12" y2="12"/><line x1="21" x2="3" y1="18" y2="18"/></svg>
    </button>
    <span class="rte-sep"></span>

    <!-- Lists & blocks -->
    <button type="button" onclick={() => exec('insertUnorderedList')} class={isActive('insertunorderedlist')} title="Puces" aria-label="Liste à puces">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
    </button>
    <button type="button" onclick={() => exec('insertOrderedList')} class={isActive('insertorderedlist')} title="Numéros" aria-label="Liste numérotée">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
    </button>
    <button type="button" onclick={() => exec('indent')} class="rte-btn" title="Indenter" aria-label="Indenter">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 8 7 12 3 16"/><line x1="21" x2="11" y1="12" y2="12"/><line x1="21" x2="11" y1="6" y2="6"/><line x1="21" x2="11" y1="18" y2="18"/></svg>
    </button>
    <button type="button" onclick={() => exec('outdent')} class="rte-btn" title="Désindenter" aria-label="Désindenter">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 8 3 12 7 16"/><line x1="21" x2="11" y1="12" y2="12"/><line x1="21" x2="11" y1="6" y2="6"/><line x1="21" x2="11" y1="18" y2="18"/></svg>
    </button>
    <button type="button" onclick={() => exec('formatBlock', 'blockquote')} class={isActive('blockquote')} title="Citation" aria-label="Citation">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z"/></svg>
    </button>
    <button type="button" onclick={() => exec('formatBlock', 'pre')} class="rte-btn" title="Bloc de code" aria-label="Bloc de code"><code class="text-[11px]">&lt;/&gt;</code></button>
    <button type="button" onclick={() => exec('insertHTML', '<hr />')} class="rte-btn" title="Séparateur" aria-label="Séparateur">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
    </button>
    <span class="rte-sep"></span>

    <!-- Insert -->
    <button type="button" onclick={openLinkModal} class="rte-btn" title="Lien (Ctrl+K)" aria-label="Insérer un lien">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
    </button>
    <button type="button" onclick={openImageModal} class="rte-btn" title="Image" aria-label="Insérer une image">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
    </button>
    {#if media}
      <button type="button" onclick={openMediaExplorerInline} class="rte-btn" title="Médias" aria-label="Explorer les médias">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
      </button>
    {/if}
    <button type="button" onclick={openTableModal} class="rte-btn" title="Tableau" aria-label="Insérer un tableau">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
    </button>
    <button type="button" onclick={openEmbedModal} class="rte-btn" title="Vidéo / Embed" aria-label="Insérer une vidéo">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
    </button>

    <!-- ═══ TOKEN PICKER ═══ -->
    {#if tokens.length > 0}
      <span class="rte-sep"></span>
      <div style="position:relative;display:inline-flex;">
        <button type="button" onclick={(e) => { e.stopPropagation(); showTokenPicker = !showTokenPicker }} class="rte-btn" title="Inserer un bloc" aria-label="Inserer un bloc" style="gap:4px;padding:0 8px;{showTokenPicker ? 'background:rgba(139,92,246,0.15);color:#a78bfa;' : ''}">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
          <span style="font-size:11px;font-weight:600;">Bloc</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.5;margin-left:2px;transition:transform 0.15s;{showTokenPicker ? 'transform:rotate(180deg);' : ''}"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        {#if showTokenPicker}
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <div
            onclick={(e) => e.stopPropagation()}
            style="position:absolute;top:100%;right:0;z-index:60;margin-top:6px;width:340px;
              background:var(--karbon-bg-card);border:1px solid var(--karbon-border);
              border-radius:0.75rem;box-shadow:0 12px 48px rgba(0,0,0,0.35);
              overflow:hidden;animation:karbon-token-slide 0.15s ease;"
          >
            <!-- Header + filter tabs -->
            <div style="padding:8px 10px;border-bottom:1px solid var(--karbon-border);">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-text-3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>
                <span style="font-size:12px;font-weight:600;color:var(--karbon-text);flex:1;">Blocs</span>
                <button type="button" onclick={() => showTokenPicker = false} style="background:none;border:none;color:var(--karbon-text-4);cursor:pointer;padding:3px;border-radius:6px;display:flex;transition:all 0.1s;" aria-label="Fermer"
                  onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--karbon-nav-hover-bg)'; (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-2)' }}
                  onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-4)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
              {#if tokenGroups.length > 1}
                <div style="display:flex;gap:4px;flex-wrap:wrap;">
                  <button type="button" onclick={() => tokenFilter = ''} style="padding:3px 8px;border-radius:6px;border:none;font-size:10px;font-weight:600;cursor:pointer;transition:all 0.1s;background:{!tokenFilter ? 'var(--karbon-primary)' : 'var(--karbon-bg-2)'};color:{!tokenFilter ? 'white' : 'var(--karbon-text-3)'};">Tout</button>
                  {#each tokenGroups as group}
                    <button type="button" onclick={() => tokenFilter = group} style="padding:3px 8px;border-radius:6px;border:none;font-size:10px;font-weight:600;cursor:pointer;transition:all 0.1s;background:{tokenFilter === group ? 'var(--karbon-primary)' : 'var(--karbon-bg-2)'};color:{tokenFilter === group ? 'white' : 'var(--karbon-text-3)'};">{group}</button>
                  {/each}
                </div>
              {/if}
            </div>
            <!-- Grid of tokens -->
            <div style="padding:8px;display:grid;grid-template-columns:1fr 1fr;gap:6px;max-height:350px;overflow-y:auto;">
              {#each filteredTokens as token}
                <button
                  type="button"
                  onclick={() => insertToken(token)}
                  style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 8px;border:1px solid var(--karbon-border);background:var(--karbon-bg-2);color:var(--karbon-text);border-radius:10px;cursor:pointer;transition:all 0.15s ease;text-align:center;"
                  onmouseenter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--karbon-primary)'; el.style.background = 'color-mix(in srgb, var(--karbon-primary) 8%, transparent)'; el.style.transform = 'translateY(-1px)' }}
                  onmouseleave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--karbon-border)'; el.style.background = 'var(--karbon-bg-2)'; el.style.transform = 'translateY(0)' }}
                >
                  <span style="font-size:22px;height:28px;display:flex;align-items:center;">{token.icon || '📦'}</span>
                  <span style="font-size:11px;font-weight:600;line-height:1.2;">{token.label}</span>
                  {#if token.group}<span style="font-size:9px;color:var(--karbon-text-4);margin-top:-2px;">{token.group}</span>{/if}
                </button>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/if}

    <div class="flex-1"></div>

    <button type="button" onclick={() => showFindReplace = !showFindReplace} class="{showFindReplace ? 'rte-btn rte-btn-active' : 'rte-btn'}" title="Rechercher (Ctrl+H)" aria-label="Rechercher et remplacer">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    </button>
    <button type="button" onclick={toggleSource} class="{sourceMode ? 'rte-btn rte-btn-active' : 'rte-btn'}" title="Source" aria-label="Mode source HTML">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/></svg>
    </button>
    <button type="button" onclick={() => fullscreen = !fullscreen} class="rte-btn" title="Plein écran" aria-label="Plein écran">
      {#if fullscreen}
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/></svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>
      {/if}
    </button>
  </div>

  <!-- ═══ FIND/REPLACE BAR ═══ -->
  {#if showFindReplace}
    <div class="rte-findbar">
      <input type="text" bind:value={findText} placeholder="Rechercher..." class="rte-bar-input w-40" onkeydown={(e) => { if (e.key === 'Enter') findNext() }} />
      <input type="text" bind:value={replaceText} placeholder="Remplacer..." class="rte-bar-input w-40" />
      <button type="button" onclick={findNext} class="rte-bar-btn">Suivant</button>
      <button type="button" onclick={replaceNext} class="rte-bar-btn">Remplacer</button>
      <button type="button" onclick={replaceAll} class="rte-bar-btn">Tout</button>
      <button type="button" onclick={() => showFindReplace = false} class="rte-btn" aria-label="Fermer">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
  {/if}

  <!-- Token picker moved into toolbar above -->

  <!-- ═══ FLOATING TOOLBAR ═══ -->
  {#if toolbarMode === 'floating' && showFloating}
    <div
      style="position:fixed;left:{floatingPos.x}px;top:{floatingPos.y}px;transform:translateX(-50%);z-index:9999;
        display:flex;align-items:center;gap:1px;padding:3px 6px;
        background:var(--karbon-bg-card);border:1px solid var(--karbon-border);
        border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,0.35);
        backdrop-filter:blur(12px);animation:karbon-float-in 0.15s ease;"
    >
      <button type="button" onclick={() => exec('bold')} class={isActive('bold')} title="Gras" aria-label="Gras"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg></button>
      <button type="button" onclick={() => exec('italic')} class={isActive('italic')} title="Italique" aria-label="Italique"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg></button>
      <button type="button" onclick={() => exec('underline')} class={isActive('underline')} title="Souligne" aria-label="Souligne"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg></button>
      <button type="button" onclick={() => exec('strikeThrough')} class={isActive('strikeThrough')} title="Barre" aria-label="Barre"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/></svg></button>
      <span style="width:1px;height:14px;background:var(--karbon-border);margin:0 3px;"></span>
      <button type="button" onclick={() => exec('formatBlock', 'h2')} class="{isActive('h2')} rte-btn" title="H2" aria-label="Titre 2" style="font-size:11px;font-weight:700;padding:0 4px;">H2</button>
      <button type="button" onclick={() => exec('formatBlock', 'h3')} class="{isActive('h3')} rte-btn" title="H3" aria-label="Titre 3" style="font-size:11px;font-weight:700;padding:0 4px;">H3</button>
      <span style="width:1px;height:14px;background:var(--karbon-border);margin:0 3px;"></span>
      <button type="button" onclick={() => exec('insertUnorderedList')} class="rte-btn" title="Puces" aria-label="Liste"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg></button>
      <button type="button" onclick={openLinkModal} class="rte-btn" title="Lien" aria-label="Lien"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></button>
      <button type="button" onclick={() => exec('formatBlock', 'blockquote')} class="rte-btn" title="Citation" aria-label="Citation"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 .001 0 .002.002.003A.003.003 0 0 0 15 21z"/></svg></button>
      <!-- Arrow pointing down to show it's attached to the selection -->
      <div style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid var(--karbon-bg-card);"></div>
    </div>
  {/if}

  <!-- ═══ BLOCK EDITOR PANEL ═══ -->
  {#if showBlockEditor && selectedBlock}
    <div
      style="position:fixed;left:{blockEditorPos.x}px;top:{blockEditorPos.y}px;z-index:9998;
        display:flex;align-items:center;gap:3px;padding:4px 8px;
        background:var(--karbon-bg-card);border:1px solid var(--karbon-border);
        border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,0.35);
        backdrop-filter:blur(12px);animation:karbon-float-in 0.15s ease;
        font-size:11px;color:var(--karbon-text-2);"
    >
      <!-- Columns -->
      {#if selectedBlock.style.gridTemplateColumns}
        <span style="font-weight:600;color:var(--karbon-text-3);margin-right:2px;">Col</span>
        {#each ['1','2','3','4','5','6'] as n}
          <button type="button" onclick={() => updateBlockCols(n)}
            style="width:22px;height:22px;border-radius:5px;border:none;font-size:10px;font-weight:700;cursor:pointer;transition:all 0.1s;
              background:{blockCols === n ? 'var(--karbon-primary)' : 'var(--karbon-bg-2)'};
              color:{blockCols === n ? 'white' : 'var(--karbon-text-3)'};"
          >{n}</button>
        {/each}
        <span style="width:1px;height:16px;background:var(--karbon-border);margin:0 4px;"></span>
      {/if}

      <!-- Gap -->
      <span style="font-weight:600;color:var(--karbon-text-3);">Gap</span>
      <input type="range" min="0" max="32" step="4" bind:value={blockGap}
        oninput={() => updateBlockGap(blockGap)}
        style="width:50px;height:14px;cursor:pointer;accent-color:var(--karbon-primary);"
      />
      <span style="font-size:10px;min-width:20px;">{blockGap}</span>

      <span style="width:1px;height:16px;background:var(--karbon-border);margin:0 4px;"></span>

      <!-- Padding -->
      <span style="font-weight:600;color:var(--karbon-text-3);">Pad</span>
      <input type="range" min="0" max="48" step="4" bind:value={blockPad}
        oninput={() => updateBlockPad(blockPad)}
        style="width:50px;height:14px;cursor:pointer;accent-color:var(--karbon-primary);"
      />
      <span style="font-size:10px;min-width:20px;">{blockPad}</span>

      <span style="width:1px;height:16px;background:var(--karbon-border);margin:0 4px;"></span>

      <!-- Border radius -->
      <span style="font-weight:600;color:var(--karbon-text-3);">↺</span>
      <input type="range" min="0" max="24" step="2" bind:value={blockRadius}
        oninput={() => updateBlockRadius(blockRadius)}
        style="width:40px;height:14px;cursor:pointer;accent-color:var(--karbon-primary);"
      />

      <span style="width:1px;height:16px;background:var(--karbon-border);margin:0 4px;"></span>

      <!-- Actions -->
      <button type="button" onclick={duplicateBlock} title="Dupliquer" aria-label="Dupliquer le bloc"
        style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:5px;border:none;background:var(--karbon-bg-2);color:var(--karbon-text-3);cursor:pointer;transition:all 0.1s;"
        onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'color-mix(in srgb, var(--karbon-primary) 15%, transparent)'; (e.currentTarget as HTMLElement).style.color = 'var(--karbon-primary)' }}
        onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--karbon-bg-2)'; (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-3)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
      </button>
      <button type="button" onclick={deleteBlock} title="Supprimer" aria-label="Supprimer le bloc"
        style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:5px;border:none;background:var(--karbon-bg-2);color:var(--karbon-text-3);cursor:pointer;transition:all 0.1s;"
        onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'color-mix(in srgb, var(--karbon-red-500) 15%, transparent)'; (e.currentTarget as HTMLElement).style.color = 'var(--karbon-red-400)' }}
        onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--karbon-bg-2)'; (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-3)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
      </button>
      <button type="button" onclick={deselectBlock} title="Fermer" aria-label="Fermer"
        style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:5px;border:none;background:var(--karbon-bg-2);color:var(--karbon-text-3);cursor:pointer;transition:all 0.1s;"
        onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-2)' }}
        onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-3)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
  {/if}

  <!-- ═══ EDITOR / SOURCE ═══ -->
  {#if sourceMode}
    <div class="rte-source-wrapper {fullscreen ? 'flex-1' : ''}" style="{fullscreen ? '' : 'height: 500px;'}">
      <div bind:this={lineNumbers} class="rte-line-numbers"></div>
      <div class="rte-highlight-layer" aria-hidden="true">{@html highlightHtml(sourceCode)}</div>
      <textarea bind:this={sourceEl} bind:value={sourceCode} oninput={handleSourceInput} onscroll={handleSourceScroll} class="rte-source-textarea" spellcheck="false" wrap="off"></textarea>
    </div>
  {:else}
    <!-- svelte-ignore a11y_interactive_supports_focus -->
    <div
      bind:this={editor} contenteditable="true"
      class="rte-content rte-{theme} outline-none {fullscreen ? 'flex-1 overflow-y-auto' : ''} {preserveStyles ? 'rte-preserve-styles' : ''}"
      style="{fullscreen ? '' : 'min-height: 500px; max-height: 800px; overflow-y: auto;'}"
      data-placeholder={placeholder} role="textbox" aria-multiline="true"
      oninput={handleInput} onkeydown={handleKeydown} onkeyup={updateActiveFormats}
      onmouseup={() => { updateActiveFormats(); updateFloatingToolbar() }} onpaste={handlePaste}
      oncontextmenu={handleContextMenu} ondblclick={handleDblClick}
      onclick={handleEditorClick}
    ></div>
  {/if}

  <!-- ═══ STATUS BAR ═══ -->
  <div class="rte-statusbar">
    <span>{wordCount} mot{wordCount !== 1 ? 's' : ''}</span>
    <span>{charCount} caractère{charCount !== 1 ? 's' : ''}</span>
    {#if sourceMode}<span class="text-violet-400">Mode source</span>{/if}
    <div class="flex-1"></div>
    <span>Double-clic : propriétés · Clic droit : menu contextuel</span>
  </div>
</div>

<!-- ═══ CONTEXT MENU ═══ -->
{#if showContextMenu}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 z-[60]" role="presentation" onclick={() => showContextMenu = false} onkeydown={(e) => { if (e.key === "Escape") showContextMenu = false }}></div>
  <div class="ctx-menu" style="left: {contextPos.x}px; top: {contextPos.y}px;">
    <div class="ctx-header">
      <span>{contextType === 'image' ? 'Image' : contextType === 'link' ? 'Lien' : contextType === 'table' ? 'Tableau' : 'Élément'}</span>
    </div>
    {#if contextType === 'image'}
      <div class="py-1">
        <button type="button" onclick={() => { if (targetImage) openImageProps(targetImage) }} class="ctx-item">Propriétés de l'image</button>
        <button type="button" onclick={() => { showContextMenu = false; if (targetImage) { saveSelection(); linkUrl = ''; linkText = ''; showLinkModal = true } }} class="ctx-item">Ajouter un lien</button>
      </div>
      <div class="ctx-divider">
        <button type="button" onclick={deleteTargetImage} class="ctx-item ctx-danger">Supprimer l'image</button>
      </div>
    {:else if contextType === 'link'}
      <div class="py-1">
        <button type="button" onclick={() => { const a = contextTarget?.closest('a'); if (a) openLinkModalFromElement(a) }} class="ctx-item">Modifier le lien</button>
      </div>
      <div class="ctx-divider">
        <button type="button" onclick={() => { showContextMenu = false; exec('unlink') }} class="ctx-item ctx-danger">Supprimer le lien</button>
      </div>
    {:else if contextType === 'table'}
      <div class="py-1">
        <div class="ctx-section-title">Lignes</div>
        <button type="button" onclick={() => tableAction('addRowAbove')} class="ctx-item">↑ Insérer au-dessus</button>
        <button type="button" onclick={() => tableAction('addRowBelow')} class="ctx-item">↓ Insérer en-dessous</button>
      </div>
      <div class="ctx-divider">
        <div class="ctx-section-title">Colonnes</div>
        <button type="button" onclick={() => tableAction('addColLeft')} class="ctx-item">← Insérer à gauche</button>
        <button type="button" onclick={() => tableAction('addColRight')} class="ctx-item">→ Insérer à droite</button>
      </div>
      <div class="ctx-divider">
        <button type="button" onclick={() => tableAction('deleteRow')} class="ctx-item ctx-warn">Supprimer la ligne</button>
        <button type="button" onclick={() => tableAction('deleteCol')} class="ctx-item ctx-warn">Supprimer la colonne</button>
        <button type="button" onclick={() => tableAction('deleteTable')} class="ctx-item ctx-danger">Supprimer le tableau</button>
      </div>
    {/if}
    <div class="ctx-divider">
      <button type="button" onclick={() => openElementProps()} class="ctx-item">Propriétés HTML</button>
      <button type="button" onclick={() => { showContextMenu = false; exec('removeFormat') }} class="ctx-item">Effacer le formatage</button>
    </div>
  </div>
{/if}

<!-- ═══ LINK MODAL ═══ -->
{#if showLinkModal}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="rte-overlay" role="presentation" onclick={() => showLinkModal = false} onkeydown={(e) => { if (e.key === "Escape") showLinkModal = false }}>
    <div class="rte-modal max-w-md" role="dialog" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
      <div class="rte-modal-header">
        <h3>Insérer / Modifier un lien</h3>
        <button type="button" onclick={() => showLinkModal = false} class="rte-modal-close" aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      <div class="space-y-3">
        <div class="space-y-1"><span class="rte-label">URL</span><input type="url" bind:value={linkUrl} placeholder="https://..." class="rte-input" /></div>
        <div class="space-y-1"><span class="rte-label">Texte</span><input type="text" bind:value={linkText} placeholder="Texte affiché" class="rte-input" /></div>
        <div class="space-y-1"><span class="rte-label">Title</span><input type="text" bind:value={linkTitle} placeholder="Info-bulle au survol" class="rte-input" /></div>
        <div class="space-y-1"><span class="rte-label">Classes CSS</span><input type="text" bind:value={linkClass} placeholder="ex: btn btn-primary" class="rte-input font-mono text-xs" /></div>
        <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" bind:checked={linkTarget} class="h-4 w-4 rounded" /><span class="rte-label-inline">Ouvrir dans un nouvel onglet</span></label>
      </div>
      <div class="rte-modal-footer justify-between">
        <button type="button" onclick={() => { showLinkModal = false; restoreSelection(); exec('unlink') }} class="rte-btn-danger-text">Supprimer</button>
        <div class="flex gap-2">
          <button type="button" onclick={() => showLinkModal = false} class="rte-btn-cancel">Annuler</button>
          <button type="button" onclick={insertLink} class="rte-btn-primary">Appliquer</button>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- ═══ IMAGE INSERT MODAL ═══ -->
{#if showImageModal}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="rte-overlay" role="presentation" onclick={() => showImageModal = false} onkeydown={(e) => { if (e.key === "Escape") showImageModal = false }}>
    <div class="rte-modal max-w-lg" role="dialog" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
      <div class="rte-modal-header">
        <h3>Insérer une image</h3>
        <button type="button" onclick={() => showImageModal = false} class="rte-modal-close" aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          {#if media?.upload}
            <div class="rte-upload-zone">
              {#if imageUploading}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin text-violet-400 mb-1"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                <p class="text-[11px] opacity-60">Upload...</p>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-40 mb-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                <label class="cursor-pointer text-xs font-medium text-violet-400 hover:text-violet-300">Uploader<input type="file" accept="image/*" class="hidden" onchange={(e) => handleImageUpload(e.currentTarget.files)} /></label>
              {/if}
            </div>
          {/if}
          {#if media}
            <button type="button" onclick={openMediaExplorerForImage} class="rte-upload-zone hover:border-violet-500/40 hover:bg-violet-500/5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-40 mb-1"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
              <span class="text-xs font-medium text-violet-400">Parcourir les médias</span>
            </button>
          {/if}
        </div>
        <div class="space-y-1"><span class="rte-label">URL</span><input type="url" bind:value={imageUrl} placeholder="https://..." class="rte-input" /></div>
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1"><span class="rte-label">Alt</span><input type="text" bind:value={imageAlt} class="rte-input" /></div>
          <div class="space-y-1"><span class="rte-label">Title</span><input type="text" bind:value={imageTitle} class="rte-input" /></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1"><span class="rte-label">Largeur</span><input type="text" bind:value={imageWidth} placeholder="auto" class="rte-input" /></div>
          <div class="space-y-1"><span class="rte-label">Classes CSS</span><input type="text" bind:value={imageClass} placeholder="rounded shadow" class="rte-input font-mono text-xs" /></div>
        </div>
        {#if imageUrl}<div class="rte-preview-box"><img src={imageUrl} alt={imageAlt} class="w-full max-h-40 object-contain" /></div>{/if}
      </div>
      <div class="rte-modal-footer justify-end">
        <button type="button" onclick={() => showImageModal = false} class="rte-btn-cancel">Annuler</button>
        <button type="button" onclick={insertImage} disabled={!imageUrl} class="rte-btn-primary">Insérer</button>
      </div>
    </div>
  </div>
{/if}

<!-- ═══ IMAGE PROPS MODAL ═══ -->
{#if showImagePropsModal}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="rte-overlay" role="presentation" onclick={() => showImagePropsModal = false} onkeydown={(e) => { if (e.key === "Escape") showImagePropsModal = false }}>
    <div class="rte-modal max-w-lg" role="dialog" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
      <div class="rte-modal-header">
        <h3>Propriétés de l'image</h3>
        <button type="button" onclick={() => showImagePropsModal = false} class="rte-modal-close" aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      {#if imageUrl}<div class="rte-preview-box mb-4"><img src={imageUrl} alt="" class="mx-auto max-h-32 object-contain" /></div>{/if}
      <div class="space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1"><span class="rte-label">Largeur</span><input type="text" bind:value={imageWidth} placeholder="auto" class="rte-input" /></div>
          <div class="space-y-1"><span class="rte-label">Hauteur</span><input type="text" bind:value={imageHeight} placeholder="auto" class="rte-input" /></div>
        </div>
        <div class="space-y-1"><span class="rte-label">Texte alternatif</span><input type="text" bind:value={imageAlt} class="rte-input" /></div>
        <div class="space-y-1"><span class="rte-label">Title</span><input type="text" bind:value={imageTitle} class="rte-input" /></div>
        <div class="space-y-1">
          <span class="rte-label">Alignement</span>
          <div class="flex gap-1">
            {#each [{ v: '', l: 'Aucun' }, { v: 'left', l: 'Gauche' }, { v: 'center', l: 'Centre' }, { v: 'right', l: 'Droite' }] as opt}
              <button type="button" onclick={() => imageAlign = opt.v} class="rte-align-btn {imageAlign === opt.v ? 'rte-align-btn-active' : ''}">{opt.l}</button>
            {/each}
          </div>
        </div>
        <div class="space-y-1"><span class="rte-label">Classes CSS</span><input type="text" bind:value={imageClass} placeholder="ex: rounded shadow-lg" class="rte-input" /></div>
        <div class="space-y-1"><span class="rte-label">Style inline</span><input type="text" bind:value={imageStyle} placeholder="ex: border-radius: 8px" class="rte-input font-mono text-xs" /></div>
      </div>
      <div class="rte-modal-footer justify-between">
        <button type="button" onclick={deleteTargetImage} class="rte-btn-danger-text">Supprimer</button>
        <div class="flex gap-2">
          <button type="button" onclick={() => showImagePropsModal = false} class="rte-btn-cancel">Annuler</button>
          <button type="button" onclick={applyImageProps} class="rte-btn-primary">Appliquer</button>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- ═══ ELEMENT PROPS MODAL ═══ -->
{#if showElementProps}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="rte-overlay" role="presentation" onclick={() => showElementProps = false} onkeydown={(e) => { if (e.key === "Escape") showElementProps = false }}>
    <div class="rte-modal max-w-md" role="dialog" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
      <div class="rte-modal-header">
        <h3>Propriétés : <code class="text-violet-400">&lt;{elPropsTag}&gt;</code></h3>
        <button type="button" onclick={() => showElementProps = false} class="rte-modal-close" aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      <div class="space-y-3">
        <div class="space-y-1"><span class="rte-label">ID</span><input type="text" bind:value={elPropsId} placeholder="identifiant" class="rte-input font-mono text-xs" /></div>
        <div class="space-y-1"><span class="rte-label">Classes CSS</span><input type="text" bind:value={elPropsClass} placeholder="class1 class2" class="rte-input font-mono text-xs" /></div>
        <div class="space-y-1"><span class="rte-label">Style inline</span><textarea bind:value={elPropsStyle} rows="3" placeholder="color: red; font-size: 16px;" class="rte-input font-mono text-xs"></textarea></div>
      </div>
      <div class="rte-modal-footer justify-end">
        <button type="button" onclick={() => showElementProps = false} class="rte-btn-cancel">Annuler</button>
        <button type="button" onclick={applyElementProps} class="rte-btn-primary">Appliquer</button>
      </div>
    </div>
  </div>
{/if}

<!-- ═══ TABLE MODAL ═══ -->
{#if showTableModal}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="rte-overlay" role="presentation" onclick={() => showTableModal = false} onkeydown={(e) => { if (e.key === "Escape") showTableModal = false }}>
    <div class="rte-modal max-w-sm" role="dialog" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
      <div class="rte-modal-header">
        <h3>Insérer un tableau</h3>
        <button type="button" onclick={() => showTableModal = false} class="rte-modal-close" aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1"><span class="rte-label">Lignes</span><input type="number" bind:value={tableRows} min="1" max="20" class="rte-input" /></div>
        <div class="space-y-1"><span class="rte-label">Colonnes</span><input type="number" bind:value={tableCols} min="1" max="10" class="rte-input" /></div>
      </div>
      <div class="rte-modal-footer justify-end">
        <button type="button" onclick={() => showTableModal = false} class="rte-btn-cancel">Annuler</button>
        <button type="button" onclick={insertTable} class="rte-btn-primary">Insérer</button>
      </div>
    </div>
  </div>
{/if}

<!-- ═══ EMBED MODAL ═══ -->
{#if showEmbedModal}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="rte-overlay" role="presentation" onclick={() => showEmbedModal = false} onkeydown={(e) => { if (e.key === "Escape") showEmbedModal = false }}>
    <div class="rte-modal max-w-md" role="dialog" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
      <div class="rte-modal-header">
        <h3>Embed vidéo</h3>
        <button type="button" onclick={() => showEmbedModal = false} class="rte-modal-close" aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      <p class="text-xs opacity-50 mb-3">Collez une URL YouTube, Vimeo ou un lien embed.</p>
      <input type="url" bind:value={embedUrl} placeholder="https://www.youtube.com/watch?v=..." class="rte-input" onkeydown={(e) => { if (e.key === 'Enter') insertEmbed() }} />
      <div class="rte-modal-footer justify-end">
        <button type="button" onclick={() => showEmbedModal = false} class="rte-btn-cancel">Annuler</button>
        <button type="button" onclick={insertEmbed} disabled={!embedUrl} class="rte-btn-primary">Insérer</button>
      </div>
    </div>
  </div>
{/if}

<!-- ═══ MEDIA EXPLORER ═══ -->
{#if showMediaExplorer && media}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="rte-overlay" role="presentation" onclick={() => showMediaExplorer = false} onkeydown={(e) => { if (e.key === "Escape") showMediaExplorer = false }}>
    <div class="rte-media-explorer" role="dialog" tabindex="-1"
      onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}
      ondragover={(e) => { e.preventDefault(); mediaDragOver = true }}
      ondragleave={() => mediaDragOver = false}
      ondrop={mediaHandleDrop}
    >
      <!-- Header -->
      <div class="rte-media-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-violet-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        <h2 class="text-sm font-semibold">Explorateur de médias</h2>
        <div class="flex-1"></div>
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-40"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" bind:value={mediaSearch} placeholder="Filtrer..." class="rte-input w-48 !py-1.5 !pl-8 !text-xs" onkeydown={(e) => { if (e.key === 'Enter') browseMedia(mediaCurrentPath) }} />
        </div>
        <!-- View toggle -->
        <div class="rte-media-view-toggle">
          <button type="button" onclick={() => mediaViewMode = 'grid'} class="p-1.5 {mediaViewMode === 'grid' ? 'bg-violet-500/15 text-violet-400' : 'opacity-40 hover:opacity-70'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
          </button>
          <button type="button" onclick={() => mediaViewMode = 'list'} class="p-1.5 {mediaViewMode === 'list' ? 'bg-violet-500/15 text-violet-400' : 'opacity-40 hover:opacity-70'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
          </button>
        </div>
        <button type="button" onclick={() => showMediaExplorer = false} class="rte-modal-close" aria-label="Fermer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <!-- Toolbar (nav + breadcrumbs + actions) -->
      <div class="rte-media-toolbar">
        <button type="button" onclick={mediaGoUp} disabled={!mediaCurrentPath} class="rte-btn disabled:opacity-30" aria-label="Remonter">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        </button>
        <button type="button" onclick={() => mediaNavigateTo('')} class="rte-btn" aria-label="Racine">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </button>
        <button type="button" onclick={() => browseMedia(mediaCurrentPath)} class="rte-btn" aria-label="Rafraîchir">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
        </button>
        <!-- Breadcrumb -->
        <div class="rte-media-breadcrumb">
          <button type="button" onclick={() => mediaNavigateTo('')} class="hover:text-violet-400 transition-colors">uploads</button>
          {#each mediaBreadcrumbs as crumb}
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <button type="button" onclick={() => mediaNavigateTo(crumb.path)} class="hover:text-violet-400 transition-colors">{crumb.label}</button>
          {/each}
        </div>
        <div class="flex-1"></div>
        {#if media.createFolder}
          <button type="button" onclick={() => { mediaShowNewFolder = true; mediaNewFolderName = '' }} class="rte-media-action-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
            Nouveau dossier
          </button>
        {/if}
        {#if media.upload}
          <label class="rte-media-upload-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            Uploader
            <input type="file" accept="image/*" multiple class="hidden" onchange={(e) => mediaHandleUpload(e.currentTarget.files)} />
          </label>
        {/if}
      </div>

      <!-- New folder inline -->
      {#if mediaShowNewFolder}
        <div class="rte-media-newfolder">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-violet-400"><path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
          <input type="text" bind:value={mediaNewFolderName} placeholder="Nom du dossier..." class="rte-input flex-1 !py-1.5 !text-xs"
            onkeydown={(e) => { if (e.key === 'Enter') mediaCreateFolder(); if (e.key === 'Escape') mediaShowNewFolder = false }} />
          <button type="button" onclick={mediaCreateFolder} class="rte-btn-primary !py-1.5 !px-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </button>
          <button type="button" onclick={() => mediaShowNewFolder = false} class="rte-modal-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      {/if}

      <!-- Content -->
      <div class="rte-media-content {mediaDragOver ? 'ring-2 ring-inset ring-violet-500/50 bg-violet-500/5' : ''}">
        {#if mediaUploading}
          <div class="rte-media-overlay">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin text-violet-400"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            <p class="text-sm opacity-60 mt-2">Upload en cours...</p>
          </div>
        {/if}

        {#if mediaLoading}
          <div class="flex items-center justify-center py-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin text-violet-400"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          </div>
        {:else if mediaFiltered.length === 0}
          <div class="flex flex-col items-center justify-center py-20 opacity-40">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="mb-3 opacity-30"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
            <p class="text-sm">Dossier vide</p>
            <p class="mt-1 text-xs">Glissez des fichiers ici ou cliquez sur Uploader</p>
          </div>
        {:else if mediaViewMode === 'grid'}
          <div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {#each mediaFiltered as entry}
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <div class="rte-media-item {mediaSelected?.path === entry.path ? 'rte-media-item-selected' : ''}"
                onclick={() => handleMediaEntryClick(entry)}
                ondblclick={() => handleMediaEntryDblClick(entry)}
              >
                {#if entry.is_dir}
                  <div class="flex h-16 w-16 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400/80"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                  </div>
                {:else if isImage(entry) && entry.url}
                  <div class="rte-media-thumb"><img src={entry.url} alt={entry.name} class="h-full w-full object-cover" loading="lazy" /></div>
                {:else}
                  <div class="flex h-16 w-16 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="opacity-40"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                  </div>
                {/if}
                <p class="mt-1.5 w-full truncate text-center text-[11px]">{entry.name}</p>
                <p class="text-[10px] opacity-40">{entry.is_dir ? 'Dossier' : formatSize(entry.size)}</p>
              </div>
            {/each}
          </div>
        {:else}
          <div class="rte-media-list">
            {#each mediaFiltered as entry, i}
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <div class="rte-media-list-item {i > 0 ? 'rte-media-list-divider' : ''} {mediaSelected?.path === entry.path ? 'bg-violet-500/10' : ''}"
                onclick={() => handleMediaEntryClick(entry)}
                ondblclick={() => handleMediaEntryDblClick(entry)}
              >
                {#if entry.is_dir}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-amber-400/80"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                {:else if isImage(entry) && entry.url}
                  <img src={entry.url} alt="" class="rte-media-list-thumb" loading="lazy" />
                {:else}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 opacity-40"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                {/if}
                <span class="flex-1 truncate text-xs">{entry.name}</span>
                <span class="text-[11px] opacity-40">{entry.is_dir ? 'Dossier' : formatSize(entry.size)}</span>
                {#if entry.modified}<span class="hidden sm:block text-[11px] opacity-40">{entry.modified}</span>{/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Footer -->
      <div class="rte-media-footer">
        {#if mediaSelected}
          <div class="flex items-center gap-3 flex-1 min-w-0">
            {#if isImage(mediaSelected) && mediaSelected.url}
              <img src={mediaSelected.url} alt="" class="h-10 w-10 rounded object-cover" />
            {/if}
            <div class="min-w-0">
              <p class="truncate text-xs font-medium">{mediaSelected.name}</p>
              <p class="text-[11px] opacity-40">{formatSize(mediaSelected.size)} · {mediaSelected.mime ?? 'Inconnu'}</p>
            </div>
          </div>
        {:else}
          <p class="flex-1 text-xs opacity-40">{mediaFiltered.length} élément{mediaFiltered.length !== 1 ? 's' : ''}</p>
        {/if}
        <button type="button" onclick={() => showMediaExplorer = false} class="rte-btn-cancel">Annuler</button>
        <button type="button" onclick={() => { if (mediaSelected?.url) handleMediaSelect(mediaSelected.url) }} disabled={!mediaSelected?.url} class="rte-btn-primary">Sélectionner</button>
      </div>
    </div>
  </div>
{/if}

<!-- Color picker backdrop -->
{#if showColorPicker}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 z-10" role="presentation" onclick={() => showColorPicker = false} onkeydown={(e) => { if (e.key === "Escape") showColorPicker = false }}></div>
{/if}

<style>
  /* ═══════════════════════════════════════════════
     WRAPPER
     ═══════════════════════════════════════════════ */
  .rte-wrapper {
    border-radius: 0.75rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); overflow: hidden;
    border: 1px solid var(--karbon-border);
    background: var(--karbon-bg-card);
  }
  .rte-wrapper-preserve {
    background: transparent; border: none; box-shadow: none; border-radius: 0;
  }

  /* ═══════════════════════════════════════════════
     TOOLBAR
     ═══════════════════════════════════════════════ */
  .rte-toolbar {
    display: flex; flex-wrap: wrap; align-items: center; gap: 0.25rem; padding: 0.75rem 0.5rem; user-select: none;
    border-bottom: 1px solid var(--karbon-border);
    background: color-mix(in srgb, var(--karbon-bg-2) 50%, transparent);
  }

  .rte-btn {
    display: flex; align-items: center; justify-content: center; border-radius: 0.375rem; transition: all 0.15s ease; cursor: pointer; border: none; background: transparent; padding: 0 0.25rem;
    min-width: 32px;
    height: 32px;
    color: var(--karbon-text-3);
  }

  .rte-btn:hover {
    background: var(--karbon-bg-2);
    color: var(--karbon-text);
  }

  .rte-btn-active {
    background: rgba(139,92,246,0.15); color: #a78bfa;
  }

  .rte-btn-active:hover {
    background: rgba(139,92,246,0.2); color: #a78bfa;
  }

  .rte-sep {
    margin: 0 0.125rem; flex-shrink: 0;
    width: 1px;
    height: 22px;
    background: var(--karbon-border);
  }

  .rte-select {
    font-size: 0.6875rem;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    padding-top: 0.125rem;
    padding-bottom: 0.125rem;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    background: var(--karbon-bg-input);
    border: 1px solid var(--karbon-border-input);
    color: var(--karbon-text-3);
  }

  /* ═══════════════════════════════════════════════
     FIND/REPLACE BAR
     ═══════════════════════════════════════════════ */
  .rte-findbar {
    align-items: center;
    gap: 0.5rem;
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--karbon-border);
    background: color-mix(in srgb, var(--karbon-bg-2) 30%, transparent);
  }

  .rte-bar-input {
    outline: none;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    line-height: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    background: var(--karbon-bg-input);
    border: 1px solid var(--karbon-border-input);
    color: var(--karbon-text);
  }

  .rte-bar-input:focus {
    border-color: var(--karbon-border-input-focus);
  }

  .rte-bar-btn {
    font-size: 0.6875rem;
    cursor: pointer;
    transition: all 0.15s ease;
    border-radius: 0.375rem;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    background: var(--karbon-bg-2);
    border: 1px solid var(--karbon-border);
    color: var(--karbon-text-3);
  }

  .rte-bar-btn:hover {
    background: var(--karbon-bg-card);
    color: var(--karbon-text);
  }

  /* ═══════════════════════════════════════════════
     STATUS BAR
     ═══════════════════════════════════════════════ */
  .rte-statusbar {
    font-size: 11px;
    align-items: center;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    gap: 1rem;
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;
    border-top: 1px solid var(--karbon-border);
    background: color-mix(in srgb, var(--karbon-bg-2) 30%, transparent);
    color: var(--karbon-text-4);
  }

  /* ═══════════════════════════════════════════════
     CONTENT AREA — Default theme
     ═══════════════════════════════════════════════ */
  .rte-content {
    padding: 1.25rem 1.5rem;
    color: var(--karbon-text);
    font-size: 0.9375rem;
    line-height: 1.75;
  }

  .rte-content:empty:before {
    content: attr(data-placeholder);
    color: var(--karbon-text-4);
    pointer-events: none;
  }

  .rte-content :global(h2) { font-size: 1.5rem; font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; }
  .rte-content :global(h3) { font-size: 1.25rem; font-weight: 600; margin-top: 0.75rem; margin-bottom: 0.375rem; }
  .rte-content :global(h4) { font-size: 1.125rem; font-weight: 600; margin-top: 0.625rem; margin-bottom: 0.25rem; }
  .rte-content :global(p) { margin-top: 0.5rem; margin-bottom: 0.5rem; }
  .rte-content :global(a) { color: #8b5cf6; text-decoration: underline; }
  .rte-content :global(blockquote) {
    border-color: #8b5cf6;
    border-left: 3px solid;
    border-radius: 0 0.5rem 0.5rem 0;
    font-style: italic;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    background: rgba(139, 92, 246, 0.05);
  }
  .rte-content :global(pre) {
    overflow-x: auto;
    border-radius: 0.5rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    background: var(--karbon-bg-2);
    border: 1px solid var(--karbon-border);
  }
  .rte-content :global(code) {
    border-radius: 0.25rem;
    padding-left: 0.375rem;
    padding-right: 0.375rem;
    padding-top: 0.125rem;
    padding-bottom: 0.125rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    background: var(--karbon-bg-2);
  }
  .rte-content :global(img) {
    cursor: pointer;
    border-radius: 0.5rem;
    max-width: 100%;
    height: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .rte-content :global(img):hover {
    outline: 2px solid rgba(139,92,246,0.5);
    outline-offset: 2px;
  }
  .rte-content :global(hr) {
    border: none;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    border-top: 1px solid var(--karbon-border);
  }
  .rte-content :global(ul), .rte-content :global(ol) { padding-left: 1.5rem; margin-top: 0.5rem; margin-bottom: 0.5rem; }
  .rte-content :global(li) { margin-top: 0.25rem; margin-bottom: 0.25rem; }
  .rte-content :global(table) { width: 100%; border-collapse: collapse; margin-top: 1rem; margin-bottom: 1rem; }
  .rte-content :global(th) {
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border: 1px solid var(--karbon-border);
    background: var(--karbon-bg-2);
  }
  .rte-content :global(td) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border: 1px solid var(--karbon-border);
  }

  /* preserveStyles: reset all editor defaults so inline styles from HTML templates are respected */
  .rte-preserve-styles { padding: 0 !important; line-height: normal !important; }
  .rte-preserve-styles :global(table) { width: auto; border-collapse: collapse; margin: 0; }
  .rte-preserve-styles :global(td),
  .rte-preserve-styles :global(th) { padding: 0; border: none; background: none; font-weight: inherit; font-size: inherit; line-height: inherit; }
  .rte-preserve-styles :global(p) { margin: 0; }

  .rte-content :global(.embed-responsive) {
    overflow: hidden;
    border-radius: 0.5rem;
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    height: 0;
    padding-bottom: 56.25%;
  }
  .rte-content :global(.embed-responsive iframe) {
    position: absolute;
    border: 0;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  /* ═══════════════════════════════════════════════
     CONTENT — Prose theme (article/blog)
     ═══════════════════════════════════════════════ */
  .rte-prose {
    line-height: 1.9;
    padding: 2rem 2.5rem;
  }

  .rte-prose :global(h2) { font-size: 1.875rem; font-weight: 700; margin-top: 2rem; margin-bottom: 0.75rem; }
  .rte-prose :global(h3) { font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem; }
  .rte-prose :global(h4) { font-size: 1.25rem; font-weight: 600; margin-top: 1rem; margin-bottom: 0.375rem; }
  .rte-prose :global(p) { margin-top: 1rem; margin-bottom: 1rem; }
  .rte-prose :global(blockquote) { padding-left: 1.5rem; padding-top: 0.75rem; padding-bottom: 0.75rem; margin-top: 1.5rem; margin-bottom: 1.5rem; }
  .rte-prose :global(img) { margin-top: 1.5rem; margin-bottom: 1.5rem; }
  .rte-prose :global(hr) { margin-top: 2.5rem; margin-bottom: 2.5rem; }

  /* ═══════════════════════════════════════════════
     CONTENT — Compact theme (admin/dashboard)
     ═══════════════════════════════════════════════ */
  .rte-compact {
    padding: 0.75rem 1rem;
    font-size: 0.8125rem;
    line-height: 1.6;
  }

  .rte-compact :global(h2) { font-size: 1.125rem; font-weight: 600; margin-top: 0.5rem; margin-bottom: 0.25rem; }
  .rte-compact :global(h3) { font-size: 1rem; font-weight: 600; margin-top: 0.375rem; margin-bottom: 0.125rem; }
  .rte-compact :global(h4) { font-size: 0.875rem; font-weight: 600; margin-top: 0.25rem; margin-bottom: 0.125rem; }
  .rte-compact :global(p) { margin-top: 0.25rem; margin-bottom: 0.25rem; }
  .rte-compact :global(blockquote) { padding-left: 0.75rem; padding-top: 0.25rem; padding-bottom: 0.25rem; margin-top: 0.5rem; margin-bottom: 0.5rem; }
  .rte-compact :global(img) { margin-top: 0.5rem; margin-bottom: 0.5rem; border-radius: 0.375rem; }
  .rte-compact :global(hr) { margin-top: 0.75rem; margin-bottom: 0.75rem; }

  /* ═══════════════════════════════════════════════
     CONTENT — Minimal theme (neutral)
     ═══════════════════════════════════════════════ */
  .rte-minimal {
    padding: 1rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.7;
  }

  .rte-minimal :global(h2) { font-size: 1.25rem; font-weight: 600; margin-top: 0.75rem; margin-bottom: 0.375rem; }
  .rte-minimal :global(h3) { font-size: 1.125rem; font-weight: 500; margin-top: 0.5rem; margin-bottom: 0.25rem; }
  .rte-minimal :global(h4) { font-size: 1rem; font-weight: 500; margin-top: 0.375rem; margin-bottom: 0.125rem; }
  .rte-minimal :global(a) { color: #3b82f6; text-decoration: underline; }
  .rte-minimal :global(blockquote) {
    border-color: #9ca3af;
    background: transparent;
  }

  /* ═══════════════════════════════════════════════
     SOURCE MODE
     ═══════════════════════════════════════════════ */
  .rte-source-wrapper {
    overflow: hidden;
    position: relative;
    display: flex;
    background: #0d1117;
  }

  .rte-line-numbers {
    overflow: hidden;
    user-select: none;
    text-align: right;
    flex-shrink: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    width: 48px;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.8125rem;
    line-height: 1.625;
    color: #484f58;
    border-right: 1px solid #21262d;
  }

  .rte-line-numbers :global(div) { padding-right: 12px; }

  .rte-highlight-layer {
    pointer-events: none;
    overflow: hidden;
    white-space: pre;
    position: absolute;
    bottom: 0;
    right: 0;
    top: 0;
    padding: 1rem;
    left: 48px;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.8125rem;
    line-height: 1.625;
    color: #c9d1d9;
  }

  .rte-source-textarea {
    white-space: pre;
    overflow: auto;
    outline: none;
    border: none;
    resize: none;
    position: absolute;
    bottom: 0;
    right: 0;
    top: 0;
    padding: 1rem;
    margin: 0;
    left: 48px;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.8125rem;
    line-height: 1.625;
    color: transparent;
    caret-color: #c9d1d9;
    background: transparent;
    -webkit-text-fill-color: transparent;
  }

  .rte-highlight-layer :global(.hl-tag) { color: #7ee787; }
  .rte-highlight-layer :global(.hl-bracket) { color: #8b949e; }
  .rte-highlight-layer :global(.hl-attr) { color: #79c0ff; }
  .rte-highlight-layer :global(.hl-eq) { color: #8b949e; }
  .rte-highlight-layer :global(.hl-val) { color: #a5d6ff; }
  .rte-highlight-layer :global(.hl-comment) { color: #484f58; font-style: italic; }

  /* ═══════════════════════════════════════════════
     CONTEXT MENU
     ═══════════════════════════════════════════════ */
  .ctx-menu {
    backdrop-filter: blur(24px);
    overflow: hidden;
    border-radius: 0.75rem;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
    z-index: 61;
    position: fixed;
    width: 14rem;
    /* TODO: shadow-black/30 */
    border: 1px solid var(--karbon-border);
    background: var(--karbon-bg-card);
  }

  .ctx-header {
    letter-spacing: 0.05em;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--karbon-border);
    background: color-mix(in srgb, var(--karbon-bg-2) 50%, transparent);
    color: var(--karbon-text-4);
  }

  .ctx-item {
    cursor: pointer;
    transition: all 0.15s ease;
    background: transparent;
    align-items: center;
    border: none;
    padding-top: 7px;
    padding-bottom: 7px;
    text-align: left;
    font-size: 0.75rem;
    line-height: 1rem;
    width: 100%;
    gap: 0.5rem;
    display: flex;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    color: var(--karbon-text-2);
  }

  .ctx-item:hover {
    background: rgba(139, 92, 246, 0.08);
    color: var(--karbon-text);
  }

  .ctx-danger { color: #f87171; }
  .ctx-danger:hover { background: rgba(239,68,68,0.1); color: #ef4444; }
  .ctx-warn { color: #fbbf24; }
  .ctx-warn:hover { background: rgba(245,158,11,0.1); color: #f59e0b; }

  .ctx-divider {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    border-top: 1px solid var(--karbon-border);
  }

  .ctx-section-title {
    letter-spacing: 0.05em;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    color: var(--karbon-text-4);
  }

  /* ═══════════════════════════════════════════════
     MODALS
     ═══════════════════════════════════════════════ */
  .rte-overlay {
    backdrop-filter: blur(4px);
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.5);
    inset: 0;
    position: fixed;
    display: flex;
    z-index: 50;
  }

  .rte-modal {
    border-radius: 0.75rem;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
    width: 100%;
    padding: 1.5rem;
    border: 1px solid var(--karbon-border);
    background: var(--karbon-bg-card);
  }

  .rte-modal-header {
    justify-content: space-between;
    align-items: center;
    display: flex;
    margin-bottom: 1rem;
  }

  .rte-modal-header h3 {
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--karbon-text);
  }

  .rte-modal-close {
    cursor: pointer;
    background: transparent;
    border: none;
    color: var(--karbon-text-4);
  }

  .rte-modal-close:hover {
    color: var(--karbon-text);
  }

  .rte-modal-footer {
    align-items: center;
    gap: 0.5rem;
    display: flex;
    margin-top: 1.25rem;
  }

  .rte-input {
    transition: color 0.15s ease, background-color 0.15s ease;
    outline: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 100%;
    display: block;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border: 1px solid var(--karbon-border-input);
    background: var(--karbon-bg-input);
    color: var(--karbon-text);
  }

  .rte-input:focus {
    border-color: var(--karbon-border-input-focus);
  }

  .rte-label {
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1rem;
    display: block;
    color: var(--karbon-text-4);
  }

  .rte-label-inline {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--karbon-text-2);
  }

  .rte-btn-primary {
    cursor: pointer;
    background: #7c3aed;
    font-weight: 500;
    border-radius: 0.5rem;
    color: white;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    font-size: 0.75rem;
    line-height: 1rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .rte-btn-primary:hover { background: #6d28d9; }
  .rte-btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

  .rte-btn-cancel {
    cursor: pointer;
    border-radius: 0.5rem;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    font-size: 0.75rem;
    line-height: 1rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border: 1px solid var(--karbon-border);
    color: var(--karbon-text-3);
  }

  .rte-btn-cancel:hover {
    background: var(--karbon-bg-2);
  }

  .rte-btn-danger-text {
    cursor: pointer;
    background: transparent;
    color: #f87171;
    border: none;
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .rte-btn-danger-text:hover { color: #fca5a5; }

  .rte-upload-zone {
    transition: color 0.15s ease, background-color 0.15s ease;
    justify-content: center;
    border-style: dashed;
    align-items: center;
    border-radius: 0.5rem;
    flex-direction: column;
    border-width: 2px;
    display: flex;
    padding: 1rem;
    border-color: var(--karbon-border);
  }

  .rte-upload-zone:hover {
    border-color: var(--karbon-border-input);
  }

  .rte-preview-box {
    overflow: hidden;
    border-radius: 0.5rem;
    border: 1px solid var(--karbon-border);
    background: var(--karbon-bg-2);
  }

  .rte-align-btn {
    transition: color 0.15s ease, background-color 0.15s ease;
    cursor: pointer;
    border-radius: 0.375rem;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    font-size: 0.75rem;
    line-height: 1rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    color: var(--karbon-text-3);
  }

  .rte-align-btn:hover {
    background: var(--karbon-bg-2);
  }

  .rte-align-btn-active {
    box-shadow: 0 0 0 1px rgba(139,92,246,0.3);
    background: rgba(139,92,246,0.15);
    color: #a78bfa;
  }

  /* ═══════════════════════════════════════════════
     COLOR PICKER
     ═══════════════════════════════════════════════ */
  .rte-color-grid {
    grid-template-columns: repeat(8, minmax(0, 1fr));
    border-radius: 0.5rem;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
    position: absolute;
    top: 100%;
    left: 0;
    gap: 0.25rem;
    display: grid;
    margin-top: 0.25rem;
    z-index: 20;
    padding: 0.5rem;
    border: 1px solid var(--karbon-border);
    background: var(--karbon-bg-card);
  }

  .rte-color-swatch {
    transition: transform 0.15s ease;
    cursor: pointer;
    border-radius: 0.25rem;
    height: 1.25rem;
    width: 1.25rem;
    border: 1px solid var(--karbon-border);
  }

  .rte-color-swatch:hover { transform: scale(1.25); }

  /* ═══════════════════════════════════════════════
     MEDIA EXPLORER
     ═══════════════════════════════════════════════ */
  .rte-media-explorer {
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
    flex-direction: column;
    display: flex;
    height: 85vh;
    width: 90vw;
    max-width: 64rem;
    border: 1px solid var(--karbon-border);
    background: var(--karbon-bg-card);
  }

  .rte-media-header {
    align-items: center;
    gap: 0.75rem;
    display: flex;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--karbon-border);
    color: var(--karbon-text);
  }

  .rte-media-toolbar {
    align-items: center;
    gap: 0.5rem;
    display: flex;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--karbon-border);
    background: color-mix(in srgb, var(--karbon-bg-2) 50%, transparent);
  }

  .rte-media-breadcrumb {
    align-items: center;
    font-size: 0.75rem;
    line-height: 1rem;
    gap: 0.25rem;
    display: flex;
    margin-left: 0.5rem;
    color: var(--karbon-text-4);
  }

  .rte-media-action-btn {
    transition: color 0.15s ease, background-color 0.15s ease;
    cursor: pointer;
    background: transparent;
    align-items: center;
    font-weight: 500;
    border: none;
    border-radius: 0.375rem;
    gap: 0.375rem;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    font-size: 0.75rem;
    line-height: 1rem;
    display: flex;
    color: var(--karbon-text-3);
  }

  .rte-media-action-btn:hover {
    background: var(--karbon-bg-2);
  }

  .rte-media-upload-btn {
    transition: color 0.15s ease, background-color 0.15s ease;
    color: #a78bfa;
    cursor: pointer;
    align-items: center;
    font-weight: 500;
    border-radius: 0.375rem;
    gap: 0.375rem;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    font-size: 0.75rem;
    line-height: 1rem;
    display: flex;
    background: rgba(139, 92, 246, 0.1);
  }

  .rte-media-upload-btn:hover {
    background: rgba(139, 92, 246, 0.2);
  }

  .rte-media-view-toggle {
    overflow: hidden;
    align-items: center;
    border-radius: 0.5rem;
    display: flex;
    border: 1px solid var(--karbon-border-input);
  }

  .rte-media-newfolder {
    align-items: center;
    gap: 0.5rem;
    display: flex;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--karbon-border);
    background: rgba(139, 92, 246, 0.05);
  }

  .rte-media-content {
    overflow-y: auto;
    position: relative;
    flex: 1 1 0%;
    padding: 1rem;
  }

  .rte-media-overlay {
    backdrop-filter: blur(4px);
    justify-content: center;
    align-items: center;
    position: absolute;
    flex-direction: column;
    inset: 0;
    display: flex;
    z-index: 10;
    background: color-mix(in srgb, var(--karbon-bg-card) 80%, transparent);
  }

  .rte-media-footer {
    align-items: center;
    gap: 0.75rem;
    display: flex;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    border-top: 1px solid var(--karbon-border);
    background: color-mix(in srgb, var(--karbon-bg-2) 50%, transparent);
  }

  .rte-media-item {
    cursor: pointer;
    transition: all 0.15s ease;
    align-items: center;
    border-radius: 0.5rem;
    flex-direction: column;
    display: flex;
    padding: 0.5rem;
  }

  .rte-media-item:hover {
    background: var(--karbon-bg-2);
  }

  .rte-media-item-selected {
    box-shadow: 0 0 0 1px rgba(139,92,246,0.4);
    background: rgba(139,92,246,0.15);
  }

  .rte-media-thumb {
    overflow: hidden;
    border-radius: 0.375rem;
    height: 4rem;
    width: 4rem;
    background: var(--karbon-bg-2);
  }

  .rte-media-list {
    overflow: hidden;
    border-radius: 0.5rem;
    border: 1px solid var(--karbon-border);
  }

  .rte-media-list-item {
    transition: color 0.15s ease, background-color 0.15s ease;
    cursor: pointer;
    align-items: center;
    gap: 0.75rem;
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .rte-media-list-item:hover {
    background: var(--karbon-bg-2);
  }

  .rte-media-list-divider {
    border-top: 1px solid var(--karbon-border);
  }

  .rte-media-list-thumb {
    object-fit: cover;
    flex-shrink: 0;
    border-radius: 0.25rem;
    height: 2rem;
    width: 2rem;
    background: var(--karbon-bg-2);
  }

  @keyframes karbon-token-slide {
    from { opacity: 0; max-height: 0; padding-top: 0; padding-bottom: 0; }
    to { opacity: 1; max-height: 200px; }
  }

  @keyframes karbon-float-in {
    from { opacity: 0; transform: translateX(-50%) translateY(4px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
</style>
