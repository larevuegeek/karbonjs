<script lang="ts">
  import { onMount, tick } from 'svelte'
  import type { MediaProvider } from '@karbonjs/ui-core'

  interface Props {
    value: string
    placeholder?: string
    media?: MediaProvider
    class?: string
  }

  let {
    value = $bindable(''),
    placeholder = 'Rédigez votre contenu...',
    media,
    class: className = ''
  }: Props = $props()

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
  let mediaFiles = $state<any[]>([])
  let mediaLoading = $state(false)
  let mediaSearch = $state('')
  let mediaPage = $state(1)
  let mediaTotal = $state(0)
  let mediaSelected = $state<any>(null)
  let mediaUploading = $state(false)

  const COLORS = [
    '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#ffffff',
    '#e74c3c', '#c0392b', '#e67e22', '#d35400', '#f1c40f', '#f39c12',
    '#2ecc71', '#27ae60', '#1abc9c', '#16a085', '#3498db', '#2980b9',
    '#9b59b6', '#8e44ad', '#e84393', '#fd79a8', '#a29bfe', '#6c5ce7',
  ]

  const FONT_SIZES = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px']

  const HTML_RULES: [RegExp, string][] = [
    [/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="text-gray-600 italic">$1</span>'],
    [/(&lt;\/?)([\w-]+)/g, '<span class="text-gray-500">$1</span><span class="text-green-400">$2</span>'],
    [/([\w-]+)(=)(&quot;[^&]*&quot;|&#39;[^&]*&#39;)/g, '<span class="text-blue-400">$1</span><span class="text-gray-500">$2</span><span class="text-sky-300">$3</span>'],
    [/(&gt;)/g, '<span class="text-gray-500">$1</span>'],
  ]

  /** Escape string for safe HTML attribute insertion */
  function escAttr(str: string): string {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  onMount(() => {
    if (value) editor.innerHTML = value
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
    div.innerHTML = html
    div.querySelectorAll('*').forEach(el => {
      el.removeAttribute('class'); el.removeAttribute('id')
      const style = el.getAttribute('style')
      if (style) {
        const parts = style.split(';').filter(s => ['text-align', 'font-weight', 'font-style', 'text-decoration'].some(a => s.trim().startsWith(a)))
        if (parts.length) el.setAttribute('style', parts.join(';')); else el.removeAttribute('style')
      }
    })
    div.querySelectorAll('script, style, meta, link').forEach(el => el.remove())
    return div.innerHTML
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
      const result = await media.upload(files[0])
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

  function openMediaExplorerForImage() { mediaExplorerContext = 'imageModal'; showImageModal = false; showMediaExplorer = true; browseMedia() }
  function openMediaExplorerInline() { saveSelection(); mediaExplorerContext = 'editor'; showMediaExplorer = true; browseMedia() }

  async function browseMedia() {
    if (!media?.browse) return
    mediaLoading = true
    try {
      const result = await media.browse(mediaPage, mediaSearch)
      mediaFiles = result.files; mediaTotal = result.total
    } catch { mediaFiles = [] } finally { mediaLoading = false }
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

  function insertEmbed() {
    showEmbedModal = false; if (!embedUrl) return
    restoreSelection(); editor.focus()
    let match = embedUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/)
    if (match) { exec('insertHTML', `<div class="embed-responsive"><iframe src="https://www.youtube.com/embed/${escAttr(match[1])}" frameborder="0" allowfullscreen loading="lazy"></iframe></div><p><br></p>`); value = editor.innerHTML; return }
    match = embedUrl.match(/vimeo\.com\/(\d+)/)
    if (match) { exec('insertHTML', `<div class="embed-responsive"><iframe src="https://player.vimeo.com/video/${escAttr(match[1])}" frameborder="0" allowfullscreen loading="lazy"></iframe></div><p><br></p>`); value = editor.innerHTML; return }
    exec('insertHTML', `<div class="embed-responsive"><iframe src="${escAttr(embedUrl)}" frameborder="0" loading="lazy"></iframe></div><p><br></p>`)
    value = editor.innerHTML
  }

  // ── Find & Replace ──
  function findNext() {
    if (!findText) return
    const sel = window.getSelection(); const range = document.createRange()
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT)
    let node: Node | null; let found = false
    while ((node = walker.nextNode())) {
      const idx = (node.textContent ?? '').toLowerCase().indexOf(findText.toLowerCase())
      if (idx >= 0) { range.setStart(node, idx); range.setEnd(node, idx + findText.length); sel?.removeAllRanges(); sel?.addRange(range); found = true; break }
    }
  }

  function replaceNext() { const sel = window.getSelection(); if (sel?.toString().toLowerCase() === findText.toLowerCase()) exec('insertText', replaceText); findNext() }
  function replaceAll() { if (!findText) return; editor.innerHTML = editor.innerHTML.replaceAll(findText, replaceText); value = editor.innerHTML }

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
  function isActive(cmd: string): string { return activeFormats.has(cmd) ? 'bg-violet-500/15 text-violet-400' : 'text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]' }

  const btnClass = 'flex items-center justify-center min-w-[32px] h-8 rounded-md transition-all cursor-pointer border-none bg-transparent px-1'
  const sepClass = 'w-px h-[22px] bg-[var(--karbon-border)] mx-0.5 shrink-0'
  const modalOverlay = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
  const modalBox = 'w-full rounded-xl border border-[var(--karbon-border)] bg-[var(--karbon-bg-card)] p-6 shadow-2xl'
  const modalInput = 'block w-full rounded-lg border border-[var(--karbon-border-input)] bg-[var(--karbon-bg-input)] text-[var(--karbon-text)] px-3 py-2 text-sm outline-none focus:border-[var(--karbon-border-input-focus)] transition-colors'
  const modalLabel = 'block text-xs font-medium text-[var(--karbon-text-4)]'
  const modalBtnCancel = 'rounded-lg border border-[var(--karbon-border)] px-3 py-1.5 text-xs text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)]'
  const modalBtnPrimary = 'rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-700 disabled:opacity-40'
</script>
<div role="toolbar" aria-label="Éditeur de texte riche" class="rounded-xl border border-[var(--karbon-border)] bg-[var(--karbon-bg-card)] shadow-sm overflow-hidden {fullscreen ? 'fixed inset-0 z-40 rounded-none flex flex-col' : ''} {className}">

  <!-- ═══ TOOLBAR ═══ -->
  <div class="flex flex-wrap items-center gap-1 border-b border-[var(--karbon-border)] bg-[var(--karbon-bg-2)]/50 px-3 py-2 select-none">
    <button type="button" onclick={() => exec('undo')} class="{btnClass} text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]" title="Annuler (Ctrl+Z)" aria-label="Annuler">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
    </button>
    <button type="button" onclick={() => exec('redo')} class="{btnClass} text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]" title="Rétablir" aria-label="Rétablir">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/></svg>
    </button>
    <span class={sepClass}></span>

    <button type="button" onclick={() => exec('formatBlock', 'p')} class="{btnClass} {isActive('p')}" title="Paragraphe" aria-label="Paragraphe">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4v16"/><path d="M17 4v16"/><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"/></svg>
    </button>
    <button type="button" onclick={() => exec('formatBlock', 'h2')} class="{btnClass} text-xs font-bold {isActive('h2')}" title="Titre 2">H2</button>
    <button type="button" onclick={() => exec('formatBlock', 'h3')} class="{btnClass} text-xs font-bold {isActive('h3')}" title="Titre 3">H3</button>
    <button type="button" onclick={() => exec('formatBlock', 'h4')} class="{btnClass} text-xs font-bold {isActive('h4')}" title="Titre 4">H4</button>
    <span class={sepClass}></span>

    <select onchange={(e) => setFontSize(e.currentTarget.value)} class="bg-[var(--karbon-bg-input)] border border-[var(--karbon-border-input)] text-[var(--karbon-text-3)] rounded-[5px] px-1 py-0.5 text-[0.6875rem] outline-none cursor-pointer" title="Taille">
      <option value="">Taille</option>
      {#each FONT_SIZES as size}<option value={size}>{size}</option>{/each}
    </select>
    <span class={sepClass}></span>

    <button type="button" onclick={() => exec('bold')} class="{btnClass} {isActive('bold')}" title="Gras (Ctrl+B)" aria-label="Gras">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>
    </button>
    <button type="button" onclick={() => exec('italic')} class="{btnClass} {isActive('italic')}" title="Italique (Ctrl+I)" aria-label="Italique">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>
    </button>
    <button type="button" onclick={() => exec('underline')} class="{btnClass} {isActive('underline')}" title="Souligné (Ctrl+U)" aria-label="Souligné">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>
    </button>
    <button type="button" onclick={() => exec('strikeThrough')} class="{btnClass} {isActive('strikeThrough')}" title="Barré" aria-label="Barré">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/></svg>
    </button>
    <span class={sepClass}></span>

    <div class="relative">
      <button type="button" onclick={() => showColorPicker = !showColorPicker} class="{btnClass} text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]" title="Couleur" aria-label="Couleur du texte">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/></svg>
      </button>
      {#if showColorPicker}
        <div class="absolute left-0 top-full z-20 mt-1 grid grid-cols-8 gap-1 rounded-lg border border-[var(--karbon-border)] bg-[var(--karbon-bg-card)] p-2 shadow-xl">
          {#each COLORS as color}<button type="button" onclick={() => insertColor(color)} class="h-5 w-5 rounded border border-[var(--karbon-border)] hover:scale-125 transition-transform cursor-pointer" style="background-color: {color}" aria-label="Couleur {color}"></button>{/each}
        </div>
      {/if}
    </div>
    <button type="button" onclick={() => exec('removeFormat')} class="{btnClass} text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]" title="Effacer formatage" aria-label="Effacer le formatage">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21a4.6 4.6 0 0 1 0-9h10a4.6 4.6 0 1 1 0 9H7Z"/><path d="m3 3 18 18"/></svg>
    </button>
    <span class={sepClass}></span>

    <button type="button" onclick={() => exec('justifyLeft')} class="{btnClass} {isActive('justifyLeft')}" title="Gauche" aria-label="Aligner à gauche">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/></svg>
    </button>
    <button type="button" onclick={() => exec('justifyCenter')} class="{btnClass} {isActive('justifyCenter')}" title="Centre" aria-label="Centrer">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="17" x2="7" y1="12" y2="12"/><line x1="19" x2="5" y1="18" y2="18"/></svg>
    </button>
    <button type="button" onclick={() => exec('justifyRight')} class="{btnClass} {isActive('justifyRight')}" title="Droite" aria-label="Aligner à droite">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/></svg>
    </button>
    <span class={sepClass}></span>

    <button type="button" onclick={() => exec('insertUnorderedList')} class="{btnClass} {isActive('insertunorderedlist')}" title="Puces" aria-label="Liste à puces">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
    </button>
    <button type="button" onclick={() => exec('insertOrderedList')} class="{btnClass} {isActive('insertorderedlist')}" title="Numéros" aria-label="Liste numérotée">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
    </button>
    <button type="button" onclick={() => exec('formatBlock', 'blockquote')} class="{btnClass} {isActive('blockquote')}" title="Citation" aria-label="Citation">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z"/></svg>
    </button>
    <button type="button" onclick={() => exec('insertHTML', '<hr />')} class="{btnClass} text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]" title="Séparateur" aria-label="Séparateur">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
    </button>
    <span class={sepClass}></span>

    <button type="button" onclick={openLinkModal} class="{btnClass} text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]" title="Lien (Ctrl+K)" aria-label="Insérer un lien">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
    </button>
    <button type="button" onclick={openImageModal} class="{btnClass} text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]" title="Image" aria-label="Insérer une image">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
    </button>
    {#if media}
      <button type="button" onclick={openMediaExplorerInline} class="{btnClass} text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]" title="Médias" aria-label="Explorer les médias">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
      </button>
    {/if}
    <button type="button" onclick={openTableModal} class="{btnClass} text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]" title="Tableau" aria-label="Insérer un tableau">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
    </button>
    <button type="button" onclick={openEmbedModal} class="{btnClass} text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]" title="Vidéo / Embed" aria-label="Insérer une vidéo">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
    </button>

    <div class="flex-1"></div>

    <button type="button" onclick={() => showFindReplace = !showFindReplace} class="{btnClass} {showFindReplace ? 'bg-violet-500/15 text-violet-400' : 'text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]'}" title="Rechercher (Ctrl+H)" aria-label="Rechercher et remplacer">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    </button>
    <button type="button" onclick={toggleSource} class="{btnClass} {sourceMode ? 'bg-violet-500/15 text-violet-400' : 'text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]'}" title="Source" aria-label="Mode source HTML">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/></svg>
    </button>
    <button type="button" onclick={() => fullscreen = !fullscreen} class="{btnClass} text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]" title="Plein écran" aria-label="Plein écran">
      {#if fullscreen}
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/></svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>
      {/if}
    </button>
  </div>

  <!-- ═══ FIND/REPLACE BAR ═══ -->
  {#if showFindReplace}
    <div class="flex items-center gap-2 border-b border-[var(--karbon-border)] bg-[var(--karbon-bg-2)]/30 px-4 py-2">
      <input type="text" bind:value={findText} placeholder="Rechercher..." class="{modalInput} w-40 !py-1 !px-2 !text-xs" onkeydown={(e) => { if (e.key === 'Enter') findNext() }} />
      <input type="text" bind:value={replaceText} placeholder="Remplacer..." class="{modalInput} w-40 !py-1 !px-2 !text-xs" />
      <button type="button" onclick={findNext} class="bg-[var(--karbon-bg-2)] border border-[var(--karbon-border)] text-[var(--karbon-text-3)] rounded-md px-2.5 py-1 text-[0.6875rem] cursor-pointer hover:bg-[var(--karbon-bg-card)] hover:text-[var(--karbon-text)] transition-all">Suivant</button>
      <button type="button" onclick={replaceNext} class="bg-[var(--karbon-bg-2)] border border-[var(--karbon-border)] text-[var(--karbon-text-3)] rounded-md px-2.5 py-1 text-[0.6875rem] cursor-pointer hover:bg-[var(--karbon-bg-card)] hover:text-[var(--karbon-text)] transition-all">Remplacer</button>
      <button type="button" onclick={replaceAll} class="bg-[var(--karbon-bg-2)] border border-[var(--karbon-border)] text-[var(--karbon-text-3)] rounded-md px-2.5 py-1 text-[0.6875rem] cursor-pointer hover:bg-[var(--karbon-bg-card)] hover:text-[var(--karbon-text)] transition-all">Tout</button>
      <button type="button" onclick={() => showFindReplace = false} class="{btnClass} text-[var(--karbon-text-4)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]" aria-label="Fermer">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
  {/if}

  <!-- ═══ EDITOR / SOURCE ═══ -->
  {#if sourceMode}
    <div class="relative flex overflow-hidden bg-[#0d1117] {fullscreen ? 'flex-1' : 'h-[500px]'}">
      <div bind:this={lineNumbers} class="shrink-0 w-12 py-4 text-right font-mono text-[0.8125rem] leading-[1.625] text-[#484f58] select-none overflow-hidden border-r border-[#21262d] [&>div]:pr-3"></div>
      <div class="absolute top-0 left-12 right-0 bottom-0 p-4 font-mono text-[0.8125rem] leading-[1.625] whitespace-pre overflow-hidden pointer-events-none text-[#c9d1d9]">{@html highlightHtml(sourceCode)}</div>
      <textarea bind:this={sourceEl} bind:value={sourceCode} oninput={handleSourceInput} onscroll={handleSourceScroll} class="absolute top-0 left-12 right-0 bottom-0 p-4 m-0 border-none outline-none resize-none font-mono text-[0.8125rem] leading-[1.625] text-transparent caret-[#c9d1d9] bg-transparent whitespace-pre overflow-auto [-webkit-text-fill-color:transparent]" spellcheck="false" wrap="off"></textarea>
    </div>
  {:else}
    <div
      bind:this={editor} contenteditable="true"
      class="outline-none px-5 py-5 text-[var(--karbon-text)] text-[0.9375rem] leading-relaxed
        [&:empty:before]:content-[attr(data-placeholder)] [&:empty:before]:text-[var(--karbon-text-4)] [&:empty:before]:pointer-events-none
        [&_h2]:text-[1.5em] [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2
        [&_h3]:text-[1.25em] [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1.5
        [&_h4]:text-[1.1em] [&_h4]:font-semibold [&_h4]:mt-2.5 [&_h4]:mb-1
        [&_p]:my-2 [&_a]:text-violet-500 [&_a]:underline
        [&_blockquote]:border-l-[3px] [&_blockquote]:border-violet-500 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-4 [&_blockquote]:bg-violet-500/5 [&_blockquote]:rounded-r-lg [&_blockquote]:italic
        [&_pre]:bg-[var(--karbon-bg-2)] [&_pre]:border [&_pre]:border-[var(--karbon-border)] [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-[0.875em] [&_pre]:overflow-x-auto [&_pre]:my-4
        [&_code]:bg-[var(--karbon-bg-2)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.875em]
        [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-4 [&_img]:cursor-pointer [&_img:hover]:outline [&_img:hover]:outline-2 [&_img:hover]:outline-violet-500/50 [&_img:hover]:outline-offset-2
        [&_hr]:border-none [&_hr]:border-t [&_hr]:border-[var(--karbon-border)] [&_hr]:my-6
        [&_ul]:pl-6 [&_ul]:my-2 [&_ol]:pl-6 [&_ol]:my-2 [&_li]:my-1
        [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
        [&_th]:border [&_th]:border-[var(--karbon-border)] [&_th]:px-3 [&_th]:py-2 [&_th]:bg-[var(--karbon-bg-2)] [&_th]:font-semibold [&_th]:text-[0.875em]
        [&_td]:border [&_td]:border-[var(--karbon-border)] [&_td]:px-3 [&_td]:py-2
        [&_.embed-responsive]:relative [&_.embed-responsive]:pb-[56.25%] [&_.embed-responsive]:h-0 [&_.embed-responsive]:overflow-hidden [&_.embed-responsive]:my-4 [&_.embed-responsive]:rounded-lg
        [&_.embed-responsive_iframe]:absolute [&_.embed-responsive_iframe]:inset-0 [&_.embed-responsive_iframe]:w-full [&_.embed-responsive_iframe]:h-full [&_.embed-responsive_iframe]:border-0
        {fullscreen ? 'flex-1 overflow-y-auto' : 'min-h-[500px] max-h-[800px] overflow-y-auto'}"
      data-placeholder={placeholder} role="textbox" tabindex="0" aria-multiline="true"
      oninput={handleInput} onkeydown={handleKeydown} onkeyup={updateActiveFormats}
      onmouseup={updateActiveFormats} onpaste={handlePaste}
      oncontextmenu={handleContextMenu} ondblclick={handleDblClick}
    ></div>
  {/if}

  <!-- ═══ STATUS BAR ═══ -->
  <div class="flex items-center gap-4 border-t border-[var(--karbon-border)] bg-[var(--karbon-bg-2)]/30 px-4 py-1.5 text-[11px] text-[var(--karbon-text-4)]">
    <span>{wordCount} mot{wordCount !== 1 ? 's' : ''}</span>
    <span>{charCount} caractère{charCount !== 1 ? 's' : ''}</span>
    {#if sourceMode}<span class="text-violet-400">Mode source</span>{/if}
    <div class="flex-1"></div>
    <span>Double-clic : propriétés · Clic droit : menu contextuel</span>
  </div>
</div>

<!-- ═══ CONTEXT MENU ═══ -->
{#if showContextMenu}
  <div class="fixed inset-0 z-[60]" role="presentation" onclick={() => showContextMenu = false} onkeydown={(e) => { if (e.key === "Escape") showContextMenu = false }}></div>
  <div class="fixed z-[61] w-56 rounded-xl border border-[var(--karbon-border)] bg-[var(--karbon-bg-card)] shadow-2xl shadow-black/30 backdrop-blur-xl overflow-hidden" style="left: {contextPos.x}px; top: {contextPos.y}px;">
    <div class="px-3 py-2 border-b border-[var(--karbon-border)] bg-[var(--karbon-bg-2)]/50">
      <span class="text-[11px] font-semibold uppercase tracking-wider text-[var(--karbon-text-4)]">
        {contextType === 'image' ? 'Image' : contextType === 'link' ? 'Lien' : contextType === 'table' ? 'Tableau' : 'Élément'}
      </span>
    </div>
    {#if contextType === 'image'}
      <div class="py-1">
        <button type="button" onclick={() => { if (targetImage) openImageProps(targetImage) }} class="flex items-center gap-2 w-full text-left px-3 py-[7px] text-xs text-[var(--karbon-text-2)] bg-transparent border-none cursor-pointer transition-all hover:bg-violet-500/8 hover:text-[var(--karbon-text)]">Propriétés de l'image</button>
      </div>
      <div class="border-t border-[var(--karbon-border)] py-1">
        <button type="button" onclick={deleteTargetImage} class="flex items-center gap-2 w-full text-left px-3 py-[7px] text-xs text-red-400 bg-transparent border-none cursor-pointer transition-all hover:bg-red-500/10 hover:text-red-500">Supprimer l'image</button>
      </div>
    {:else if contextType === 'link'}
      <div class="py-1">
        <button type="button" onclick={() => { const a = contextTarget?.closest('a'); if (a) openLinkModalFromElement(a) }} class="flex items-center gap-2 w-full text-left px-3 py-[7px] text-xs text-[var(--karbon-text-2)] bg-transparent border-none cursor-pointer transition-all hover:bg-violet-500/8 hover:text-[var(--karbon-text)]">Modifier le lien</button>
      </div>
      <div class="border-t border-[var(--karbon-border)] py-1">
        <button type="button" onclick={() => { showContextMenu = false; exec('unlink') }} class="flex items-center gap-2 w-full text-left px-3 py-[7px] text-xs text-red-400 bg-transparent border-none cursor-pointer transition-all hover:bg-red-500/10 hover:text-red-500">Supprimer le lien</button>
      </div>
    {:else if contextType === 'table'}
      <div class="py-1">
        <div class="px-3 py-1"><span class="text-[10px] font-semibold uppercase tracking-wider text-[var(--karbon-text-4)]">Lignes</span></div>
        <button type="button" onclick={() => tableAction('addRowAbove')} class="flex items-center gap-2 w-full text-left px-3 py-[7px] text-xs text-[var(--karbon-text-2)] bg-transparent border-none cursor-pointer transition-all hover:bg-violet-500/8 hover:text-[var(--karbon-text)]">↑ Insérer au-dessus</button>
        <button type="button" onclick={() => tableAction('addRowBelow')} class="flex items-center gap-2 w-full text-left px-3 py-[7px] text-xs text-[var(--karbon-text-2)] bg-transparent border-none cursor-pointer transition-all hover:bg-violet-500/8 hover:text-[var(--karbon-text)]">↓ Insérer en-dessous</button>
      </div>
      <div class="border-t border-[var(--karbon-border)] py-1">
        <div class="px-3 py-1"><span class="text-[10px] font-semibold uppercase tracking-wider text-[var(--karbon-text-4)]">Colonnes</span></div>
        <button type="button" onclick={() => tableAction('addColLeft')} class="flex items-center gap-2 w-full text-left px-3 py-[7px] text-xs text-[var(--karbon-text-2)] bg-transparent border-none cursor-pointer transition-all hover:bg-violet-500/8 hover:text-[var(--karbon-text)]">← Insérer à gauche</button>
        <button type="button" onclick={() => tableAction('addColRight')} class="flex items-center gap-2 w-full text-left px-3 py-[7px] text-xs text-[var(--karbon-text-2)] bg-transparent border-none cursor-pointer transition-all hover:bg-violet-500/8 hover:text-[var(--karbon-text)]">→ Insérer à droite</button>
      </div>
      <div class="border-t border-[var(--karbon-border)] py-1">
        <button type="button" onclick={() => tableAction('deleteRow')} class="flex items-center gap-2 w-full text-left px-3 py-[7px] text-xs text-amber-400 bg-transparent border-none cursor-pointer transition-all hover:bg-amber-500/10 hover:text-amber-500">Supprimer la ligne</button>
        <button type="button" onclick={() => tableAction('deleteCol')} class="flex items-center gap-2 w-full text-left px-3 py-[7px] text-xs text-amber-400 bg-transparent border-none cursor-pointer transition-all hover:bg-amber-500/10 hover:text-amber-500">Supprimer la colonne</button>
        <button type="button" onclick={() => tableAction('deleteTable')} class="flex items-center gap-2 w-full text-left px-3 py-[7px] text-xs text-red-400 bg-transparent border-none cursor-pointer transition-all hover:bg-red-500/10 hover:text-red-500">Supprimer le tableau</button>
      </div>
    {/if}
    <div class="border-t border-[var(--karbon-border)] py-1">
      <button type="button" onclick={() => openElementProps()} class="flex items-center gap-2 w-full text-left px-3 py-[7px] text-xs text-[var(--karbon-text-2)] bg-transparent border-none cursor-pointer transition-all hover:bg-violet-500/8 hover:text-[var(--karbon-text)]">Propriétés HTML</button>
      <button type="button" onclick={() => { showContextMenu = false; exec('removeFormat') }} class="flex items-center gap-2 w-full text-left px-3 py-[7px] text-xs text-[var(--karbon-text-2)] bg-transparent border-none cursor-pointer transition-all hover:bg-violet-500/8 hover:text-[var(--karbon-text)]">Effacer le formatage</button>
    </div>
  </div>
{/if}

<!-- ═══ LINK MODAL ═══ -->
{#if showLinkModal}
  <div class={modalOverlay} role="presentation" onclick={() => showLinkModal = false} onkeydown={(e) => { if (e.key === "Escape") showLinkModal = false }}>
    <div class="{modalBox} max-w-md" role="dialog" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-[var(--karbon-text)]">Insérer / Modifier un lien</h3>
        <button type="button" onclick={() => showLinkModal = false} class="text-[var(--karbon-text-4)] hover:text-[var(--karbon-text)] cursor-pointer" aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      <div class="space-y-3">
        <div class="space-y-1"><span class={modalLabel}>URL</span><input type="url" bind:value={linkUrl} placeholder="https://..." class={modalInput} /></div>
        <div class="space-y-1"><span class={modalLabel}>Texte</span><input type="text" bind:value={linkText} placeholder="Texte affiché" class={modalInput} /></div>
        <div class="space-y-1"><span class={modalLabel}>Title</span><input type="text" bind:value={linkTitle} placeholder="Info-bulle au survol" class={modalInput} /></div>
        <div class="space-y-1"><span class={modalLabel}>Classes CSS</span><input type="text" bind:value={linkClass} placeholder="ex: btn btn-primary" class="{modalInput} font-mono text-xs" /></div>
        <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" bind:checked={linkTarget} class="h-4 w-4 rounded" /><span class="text-sm text-[var(--karbon-text-2)]">Ouvrir dans un nouvel onglet</span></label>
      </div>
      <div class="mt-5 flex items-center justify-between">
        <button type="button" onclick={() => { showLinkModal = false; restoreSelection(); exec('unlink') }} class="text-xs text-red-400 hover:text-red-300 cursor-pointer">Supprimer</button>
        <div class="flex gap-2">
          <button type="button" onclick={() => showLinkModal = false} class="{modalBtnCancel} cursor-pointer">Annuler</button>
          <button type="button" onclick={insertLink} class="{modalBtnPrimary} cursor-pointer">Appliquer</button>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- ═══ IMAGE INSERT MODAL ═══ -->
{#if showImageModal}
  <div class={modalOverlay} role="presentation" onclick={() => showImageModal = false} onkeydown={(e) => { if (e.key === "Escape") showImageModal = false }}>
    <div class="{modalBox} max-w-lg" role="dialog" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-[var(--karbon-text)]">Insérer une image</h3>
        <button type="button" onclick={() => showImageModal = false} class="text-[var(--karbon-text-4)] hover:text-[var(--karbon-text)] cursor-pointer" aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          {#if media?.upload}
            <div class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--karbon-border)] p-4 hover:border-[var(--karbon-border-input)] transition-colors">
              {#if imageUploading}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin text-violet-400 mb-1"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                <p class="text-[11px] text-[var(--karbon-text-3)]">Upload...</p>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[var(--karbon-text-4)] mb-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                <label class="cursor-pointer text-xs font-medium text-violet-400 hover:text-violet-300">Uploader<input type="file" accept="image/*" class="hidden" onchange={(e) => handleImageUpload(e.currentTarget.files)} /></label>
              {/if}
            </div>
          {/if}
          {#if media}
            <button type="button" onclick={openMediaExplorerForImage} class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--karbon-border)] p-4 hover:border-violet-500/40 hover:bg-violet-500/5 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[var(--karbon-text-4)] mb-1"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
              <span class="text-xs font-medium text-violet-400">Parcourir les médias</span>
            </button>
          {/if}
        </div>
        <div class="space-y-1"><span class={modalLabel}>URL</span><input type="url" bind:value={imageUrl} placeholder="https://..." class={modalInput} /></div>
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1"><span class={modalLabel}>Alt</span><input type="text" bind:value={imageAlt} class={modalInput} /></div>
          <div class="space-y-1"><span class={modalLabel}>Title</span><input type="text" bind:value={imageTitle} class={modalInput} /></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1"><span class={modalLabel}>Largeur</span><input type="text" bind:value={imageWidth} placeholder="auto" class={modalInput} /></div>
          <div class="space-y-1"><span class={modalLabel}>Classes CSS</span><input type="text" bind:value={imageClass} placeholder="rounded shadow" class="{modalInput} font-mono text-xs" /></div>
        </div>
        {#if imageUrl}<div class="rounded-lg border border-[var(--karbon-border)] overflow-hidden"><img src={imageUrl} alt={imageAlt} class="w-full max-h-40 object-contain bg-[var(--karbon-bg-2)]" /></div>{/if}
      </div>
      <div class="mt-5 flex justify-end gap-2">
        <button type="button" onclick={() => showImageModal = false} class="{modalBtnCancel} cursor-pointer">Annuler</button>
        <button type="button" onclick={insertImage} disabled={!imageUrl} class="{modalBtnPrimary} cursor-pointer">Insérer</button>
      </div>
    </div>
  </div>
{/if}

<!-- ═══ IMAGE PROPS MODAL ═══ -->
{#if showImagePropsModal}
  <div class={modalOverlay} role="presentation" onclick={() => showImagePropsModal = false} onkeydown={(e) => { if (e.key === "Escape") showImagePropsModal = false }}>
    <div class="{modalBox} max-w-lg" role="dialog" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-[var(--karbon-text)]">Propriétés de l'image</h3>
        <button type="button" onclick={() => showImagePropsModal = false} class="text-[var(--karbon-text-4)] hover:text-[var(--karbon-text)] cursor-pointer" aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      {#if imageUrl}<div class="mb-4 rounded-lg border border-[var(--karbon-border)] overflow-hidden bg-[var(--karbon-bg-2)]"><img src={imageUrl} alt="" class="mx-auto max-h-32 object-contain" /></div>{/if}
      <div class="space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1"><span class={modalLabel}>Largeur</span><input type="text" bind:value={imageWidth} placeholder="auto" class={modalInput} /></div>
          <div class="space-y-1"><span class={modalLabel}>Hauteur</span><input type="text" bind:value={imageHeight} placeholder="auto" class={modalInput} /></div>
        </div>
        <div class="space-y-1"><span class={modalLabel}>Texte alternatif</span><input type="text" bind:value={imageAlt} class={modalInput} /></div>
        <div class="space-y-1"><span class={modalLabel}>Title</span><input type="text" bind:value={imageTitle} class={modalInput} /></div>
        <div class="space-y-1">
          <span class={modalLabel}>Alignement</span>
          <div class="flex gap-1">
            {#each [{ v: '', l: 'Aucun' }, { v: 'left', l: 'Gauche' }, { v: 'center', l: 'Centre' }, { v: 'right', l: 'Droite' }] as opt}
              <button type="button" onclick={() => imageAlign = opt.v} class="rounded-md px-3 py-1.5 text-xs transition-colors cursor-pointer {imageAlign === opt.v ? 'bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/30' : 'text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)]'}">{opt.l}</button>
            {/each}
          </div>
        </div>
        <div class="space-y-1"><span class={modalLabel}>Classes CSS</span><input type="text" bind:value={imageClass} placeholder="ex: rounded shadow-lg" class={modalInput} /></div>
        <div class="space-y-1"><span class={modalLabel}>Style inline</span><input type="text" bind:value={imageStyle} placeholder="ex: border-radius: 8px" class="{modalInput} font-mono text-xs" /></div>
      </div>
      <div class="mt-5 flex items-center justify-between">
        <button type="button" onclick={deleteTargetImage} class="text-xs text-red-400 hover:text-red-300 cursor-pointer">Supprimer</button>
        <div class="flex gap-2">
          <button type="button" onclick={() => showImagePropsModal = false} class="{modalBtnCancel} cursor-pointer">Annuler</button>
          <button type="button" onclick={applyImageProps} class="{modalBtnPrimary} cursor-pointer">Appliquer</button>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- ═══ ELEMENT PROPS MODAL ═══ -->
{#if showElementProps}
  <div class={modalOverlay} role="presentation" onclick={() => showElementProps = false} onkeydown={(e) => { if (e.key === "Escape") showElementProps = false }}>
    <div class="{modalBox} max-w-md" role="dialog" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-[var(--karbon-text)]">Propriétés : <code class="text-violet-400">&lt;{elPropsTag}&gt;</code></h3>
        <button type="button" onclick={() => showElementProps = false} class="text-[var(--karbon-text-4)] hover:text-[var(--karbon-text)] cursor-pointer" aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      <div class="space-y-3">
        <div class="space-y-1"><span class={modalLabel}>ID</span><input type="text" bind:value={elPropsId} placeholder="identifiant" class="{modalInput} font-mono text-xs" /></div>
        <div class="space-y-1"><span class={modalLabel}>Classes CSS</span><input type="text" bind:value={elPropsClass} placeholder="class1 class2" class="{modalInput} font-mono text-xs" /></div>
        <div class="space-y-1"><span class={modalLabel}>Style inline</span><textarea bind:value={elPropsStyle} rows="3" placeholder="color: red; font-size: 16px;" class="{modalInput} font-mono text-xs"></textarea></div>
      </div>
      <div class="mt-5 flex justify-end gap-2">
        <button type="button" onclick={() => showElementProps = false} class="{modalBtnCancel} cursor-pointer">Annuler</button>
        <button type="button" onclick={applyElementProps} class="{modalBtnPrimary} cursor-pointer">Appliquer</button>
      </div>
    </div>
  </div>
{/if}

<!-- ═══ TABLE MODAL ═══ -->
{#if showTableModal}
  <div class={modalOverlay} role="presentation" onclick={() => showTableModal = false} onkeydown={(e) => { if (e.key === "Escape") showTableModal = false }}>
    <div class="{modalBox} max-w-sm" role="dialog" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-[var(--karbon-text)]">Insérer un tableau</h3>
        <button type="button" onclick={() => showTableModal = false} class="text-[var(--karbon-text-4)] hover:text-[var(--karbon-text)] cursor-pointer" aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1"><span class={modalLabel}>Lignes</span><input type="number" bind:value={tableRows} min="1" max="20" class={modalInput} /></div>
        <div class="space-y-1"><span class={modalLabel}>Colonnes</span><input type="number" bind:value={tableCols} min="1" max="10" class={modalInput} /></div>
      </div>
      <div class="mt-5 flex justify-end gap-2">
        <button type="button" onclick={() => showTableModal = false} class="{modalBtnCancel} cursor-pointer">Annuler</button>
        <button type="button" onclick={insertTable} class="{modalBtnPrimary} cursor-pointer">Insérer</button>
      </div>
    </div>
  </div>
{/if}

<!-- ═══ EMBED MODAL ═══ -->
{#if showEmbedModal}
  <div class={modalOverlay} role="presentation" onclick={() => showEmbedModal = false} onkeydown={(e) => { if (e.key === "Escape") showEmbedModal = false }}>
    <div class="{modalBox} max-w-md" role="dialog" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-[var(--karbon-text)]">Embed vidéo</h3>
        <button type="button" onclick={() => showEmbedModal = false} class="text-[var(--karbon-text-4)] hover:text-[var(--karbon-text)] cursor-pointer" aria-label="Fermer"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      <p class="text-xs text-[var(--karbon-text-3)] mb-3">Collez une URL YouTube, Vimeo ou un lien embed.</p>
      <input type="url" bind:value={embedUrl} placeholder="https://www.youtube.com/watch?v=..." class={modalInput} onkeydown={(e) => { if (e.key === 'Enter') insertEmbed() }} />
      <div class="mt-5 flex justify-end gap-2">
        <button type="button" onclick={() => showEmbedModal = false} class="{modalBtnCancel} cursor-pointer">Annuler</button>
        <button type="button" onclick={insertEmbed} disabled={!embedUrl} class="{modalBtnPrimary} cursor-pointer">Insérer</button>
      </div>
    </div>
  </div>
{/if}

<!-- ═══ MEDIA EXPLORER (simple) ═══ -->
{#if showMediaExplorer && media}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" role="presentation" onclick={() => showMediaExplorer = false} onkeydown={(e) => { if (e.key === "Escape") showMediaExplorer = false }}>
    <div class="flex h-[70vh] w-[80vw] max-w-4xl flex-col rounded-2xl border border-[var(--karbon-border)] bg-[var(--karbon-bg-card)] shadow-2xl overflow-hidden" role="dialog" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
      <div class="flex items-center gap-3 border-b border-[var(--karbon-border)] px-5 py-3">
        <h2 class="text-sm font-semibold text-[var(--karbon-text)]">Explorateur de médias</h2>
        <div class="flex-1"></div>
        <input type="text" bind:value={mediaSearch} placeholder="Rechercher..." class="{modalInput} w-48 !py-1.5 !text-xs" onkeydown={(e) => { if (e.key === 'Enter') browseMedia() }} />
        <button type="button" onclick={() => showMediaExplorer = false} class="rounded-lg p-1.5 text-[var(--karbon-text-4)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)] cursor-pointer" aria-label="Fermer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4">
        {#if mediaLoading}
          <div class="flex items-center justify-center py-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin text-violet-400"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          </div>
        {:else if mediaFiles.length === 0}
          <div class="flex flex-col items-center justify-center py-20 text-[var(--karbon-text-4)]">
            <p class="text-sm">Aucun média trouvé</p>
          </div>
        {:else}
          <div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
            {#each mediaFiles as file}
              <div
                class="group flex flex-col items-center rounded-lg p-2 cursor-pointer transition-all {mediaSelected?.id === file.id ? 'bg-violet-500/15 ring-1 ring-violet-500/40' : 'hover:bg-[var(--karbon-bg-2)]'}"
                role="option" tabindex="0" aria-selected={mediaSelected?.id === file.id} onclick={() => mediaSelected = mediaSelected?.id === file.id ? null : file} onkeydown={(e) => { if (e.key === "Enter") { mediaSelected = mediaSelected?.id === file.id ? null : file } }}
                ondblclick={() => { if (file.url) handleMediaSelect(file.url) }}
              >
                {#if file.type?.startsWith('image/')}
                  <div class="h-16 w-16 overflow-hidden rounded-md bg-[var(--karbon-bg-2)]">
                    <img src={file.url} alt={file.name} class="h-full w-full object-cover" loading="lazy" />
                  </div>
                {:else}
                  <div class="flex h-16 w-16 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[var(--karbon-text-4)]"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                  </div>
                {/if}
                <p class="mt-1.5 w-full truncate text-center text-[11px] text-[var(--karbon-text-2)]">{file.name}</p>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <div class="flex items-center gap-3 border-t border-[var(--karbon-border)] bg-[var(--karbon-bg-2)]/50 px-5 py-3">
        <p class="flex-1 text-xs text-[var(--karbon-text-4)]">{mediaFiles.length} fichier{mediaFiles.length !== 1 ? 's' : ''}</p>
        <button type="button" onclick={() => showMediaExplorer = false} class="{modalBtnCancel} cursor-pointer">Annuler</button>
        <button type="button" onclick={() => { if (mediaSelected?.url) handleMediaSelect(mediaSelected.url) }} disabled={!mediaSelected?.url} class="{modalBtnPrimary} cursor-pointer">Sélectionner</button>
      </div>
    </div>
  </div>
{/if}

{#if showColorPicker}
  <div class="fixed inset-0 z-10" role="presentation" onclick={() => showColorPicker = false} onkeydown={(e) => { if (e.key === "Escape") showColorPicker = false }}></div>
{/if}
