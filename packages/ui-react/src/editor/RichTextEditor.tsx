import { useState, useRef, useEffect, useCallback } from 'react'
import type { MediaProvider } from '@karbonjs/ui-core'

export interface RichTextEditorProps {
  value?: string
  placeholder?: string
  media?: MediaProvider
  className?: string
  onChange?: (value: string) => void
}

const COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#ffffff',
  '#e74c3c', '#c0392b', '#e67e22', '#d35400', '#f1c40f', '#f39c12',
  '#2ecc71', '#27ae60', '#1abc9c', '#16a085', '#3498db', '#2980b9',
  '#9b59b6', '#8e44ad', '#e84393', '#fd79a8', '#a29bfe', '#6c5ce7',
]

const FONT_SIZES = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px']

function escAttr(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
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
  div.querySelectorAll('script, style, meta, link, iframe, object, embed, form, base').forEach(el => el.remove())
  let str = div.innerHTML
  str = str.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '')
  return str
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
  escaped = escaped.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="text-gray-600 italic">$1</span>')
  escaped = escaped.replace(/(&lt;\/?)([\w-]+)/g, '<span class="text-gray-500">$1</span><span class="text-green-400">$2</span>')
  escaped = escaped.replace(/([\w-]+)(=)(&quot;[^&]*&quot;|&#39;[^&]*&#39;)/g, '<span class="text-blue-400">$1</span><span class="text-gray-500">$2</span><span class="text-sky-300">$3</span>')
  escaped = escaped.replace(/(&gt;)/g, '<span class="text-gray-500">$1</span>')
  return escaped
}

const btnClass = 'flex items-center justify-center min-w-[32px] h-8 rounded-md transition-all cursor-pointer border-none bg-transparent px-1'
const sepClass = 'w-px h-[22px] bg-[var(--karbon-border)] mx-0.5 shrink-0'
const modalOverlay = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
const modalBox = 'w-full rounded-xl border border-[var(--karbon-border)] bg-[var(--karbon-bg-card)] p-6 shadow-2xl'
const modalInput = 'block w-full rounded-lg border border-[var(--karbon-border-input)] bg-[var(--karbon-bg-input)] text-[var(--karbon-text)] px-3 py-2 text-sm outline-none focus:border-[var(--karbon-border-input-focus)] transition-colors'
const modalLabel = 'block text-xs font-medium text-[var(--karbon-text-4)]'
const modalBtnCancel = 'rounded-lg border border-[var(--karbon-border)] px-3 py-1.5 text-xs text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] cursor-pointer'
const modalBtnPrimary = 'rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-700 disabled:opacity-40 cursor-pointer'
const ctxItem = 'flex items-center gap-2 w-full text-left px-3 py-[7px] text-xs bg-transparent border-none cursor-pointer transition-all'

function isActiveClass(active: boolean): string {
  return active ? 'bg-violet-500/15 text-violet-400' : 'text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]'
}

// SVG icons as inline strings
const icons = {
  undo: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>,
  redo: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/></svg>,
  paragraph: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4v16"/><path d="M17 4v16"/><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"/></svg>,
  bold: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>,
  italic: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>,
  underline: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>,
  strikethrough: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/></svg>,
  alignLeft: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/></svg>,
  alignCenter: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="17" x2="7" y1="12" y2="12"/><line x1="19" x2="5" y1="18" y2="18"/></svg>,
  alignRight: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="9" y1="12" y2="12"/><line x1="21" x2="7" y1="18" y2="18"/></svg>,
  list: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>,
  listOrdered: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>,
  quote: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z"/></svg>,
  hr: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>,
  link: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  image: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>,
  table: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>,
  video: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>,
  search: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  code: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/></svg>,
  maximize: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>,
  minimize: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/></svg>,
  color: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/></svg>,
  removeFormat: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21a4.6 4.6 0 0 1 0-9h10a4.6 4.6 0 1 1 0 9H7Z"/><path d="m3 3 18 18"/></svg>,
  x: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  xSm: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  upload: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>,
  folder: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>,
  spinner: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>,
}

const editorContentClass = `outline-none px-5 py-5 text-[var(--karbon-text)] text-[0.9375rem] leading-relaxed
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
  [&_.embed-responsive_iframe]:absolute [&_.embed-responsive_iframe]:inset-0 [&_.embed-responsive_iframe]:w-full [&_.embed-responsive_iframe]:h-full [&_.embed-responsive_iframe]:border-0`

export function RichTextEditor({
  value = '',
  placeholder = 'Rédigez votre contenu...',
  media,
  className = '',
  onChange
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const sourceRef = useRef<HTMLTextAreaElement>(null)
  const lineNumRef = useRef<HTMLDivElement>(null)
  const savedRangeRef = useRef<Range | null>(null)
  const targetImageRef = useRef<HTMLImageElement | null>(null)
  const targetTableRef = useRef<HTMLTableElement | null>(null)
  const targetCellRef = useRef<HTMLTableCellElement | null>(null)

  const [sourceMode, setSourceMode] = useState(false)
  const [sourceCode, setSourceCode] = useState('')
  const [fullscreen, setFullscreen] = useState(false)
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  // Modal states
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showTableModal, setShowTableModal] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showEmbedModal, setShowEmbedModal] = useState(false)
  const [showFindReplace, setShowFindReplace] = useState(false)

  // Form states
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')
  const [linkTarget, setLinkTarget] = useState(true)
  const [linkTitle, setLinkTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [imageUploading, setImageUploading] = useState(false)
  const [tableRows, setTableRows] = useState(3)
  const [tableCols, setTableCols] = useState(3)
  const [embedUrl, setEmbedUrl] = useState('')
  const [findText, setFindText] = useState('')
  const [replaceText, setReplaceText] = useState('')

  useEffect(() => {
    if (editorRef.current && value && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value
      updateCounts()
    }
  }, [])

  function updateCounts() {
    const text = editorRef.current?.innerText ?? ''
    setCharCount(text.length)
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0)
  }

  function exec(command: string, val?: string) {
    editorRef.current?.focus()
    document.execCommand(command, false, val)
    updateActiveFormats()
    if (editorRef.current) onChange?.(editorRef.current.innerHTML)
    updateCounts()
  }

  function updateActiveFormats() {
    const formats = new Set<string>()
    for (const cmd of ['bold', 'italic', 'underline', 'strikeThrough', 'insertUnorderedList', 'insertOrderedList', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull']) {
      if (document.queryCommandState(cmd)) formats.add(cmd)
    }
    const block = document.queryCommandValue('formatBlock')
    if (block) formats.add(block.toLowerCase())
    setActiveFormats(formats)
  }

  function saveSelection() {
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0) savedRangeRef.current = sel.getRangeAt(0).cloneRange()
  }

  function restoreSelection() {
    if (savedRangeRef.current) {
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(savedRangeRef.current)
    }
  }

  function handleInput() {
    if (editorRef.current) onChange?.(editorRef.current.innerHTML)
    updateCounts()
  }

  function handleKeydown(e: React.KeyboardEvent) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b': e.preventDefault(); exec('bold'); break
        case 'i': e.preventDefault(); exec('italic'); break
        case 'u': e.preventDefault(); exec('underline'); break
        case 'k': e.preventDefault(); openLinkModal(); break
        case 'h': e.preventDefault(); setShowFindReplace(v => !v); break
      }
    }
    if (e.key === 'Tab') { e.preventDefault(); exec(e.shiftKey ? 'outdent' : 'indent') }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const html = e.clipboardData?.getData('text/html')
    if (html) { e.preventDefault(); exec('insertHTML', cleanHtml(html)) }
  }

  // Link
  function openLinkModal() {
    saveSelection()
    const sel = window.getSelection()
    setLinkText(sel?.toString() ?? '')
    const anchor = sel?.anchorNode?.parentElement?.closest('a')
    setLinkUrl(anchor?.getAttribute('href') ?? '')
    setLinkTarget(anchor?.getAttribute('target') === '_blank' || !anchor)
    setLinkTitle(anchor?.getAttribute('title') ?? '')
    setShowLinkModal(true)
  }

  function insertLink() {
    setShowLinkModal(false)
    restoreSelection()
    editorRef.current?.focus()
    if (!linkUrl) { exec('unlink'); return }
    const attrs = `href="${escAttr(linkUrl)}"${linkTarget ? ' target="_blank" rel="noopener"' : ''}${linkTitle ? ` title="${escAttr(linkTitle)}"` : ''}`
    if (linkText) exec('insertHTML', `<a ${attrs}>${escAttr(linkText)}</a>`)
    else exec('createLink', linkUrl)
    if (editorRef.current) onChange?.(editorRef.current.innerHTML)
  }

  // Image
  function openImageModal() {
    saveSelection()
    setImageUrl(''); setImageAlt('')
    setShowImageModal(true)
  }

  async function handleImageUpload(files: FileList | null) {
    if (!files?.length || !media?.upload) return
    setImageUploading(true)
    try {
      const result = await media.upload(files[0])
      setImageUrl(result.url)
      setImageAlt(files[0].name.replace(/\.[^/.]+$/, ''))
    } catch { /* */ } finally { setImageUploading(false) }
  }

  function insertImage() {
    setShowImageModal(false)
    if (!imageUrl) return
    restoreSelection()
    editorRef.current?.focus()
    exec('insertHTML', `<img src="${escAttr(imageUrl)}" ${imageAlt ? `alt="${escAttr(imageAlt)}"` : ''} loading="lazy" />`)
    if (editorRef.current) onChange?.(editorRef.current.innerHTML)
  }

  // Table
  function insertTable() {
    setShowTableModal(false)
    restoreSelection()
    editorRef.current?.focus()
    let html = '<table><thead><tr>'
    for (let c = 0; c < tableCols; c++) html += '<th>En-tête</th>'
    html += '</tr></thead><tbody>'
    for (let r = 0; r < tableRows - 1; r++) { html += '<tr>'; for (let c = 0; c < tableCols; c++) html += '<td>&nbsp;</td>'; html += '</tr>' }
    html += '</tbody></table><p><br></p>'
    exec('insertHTML', html)
  }

  // Embed
  function isSafeUrl(url: string): boolean {
    try {
      const parsed = new URL(url)
      return ['http:', 'https:'].includes(parsed.protocol)
    } catch {
      return false
    }
  }

  function insertEmbed() {
    setShowEmbedModal(false)
    if (!embedUrl) return
    restoreSelection()
    editorRef.current?.focus()
    let match = embedUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/)
    if (match) { exec('insertHTML', `<div class="embed-responsive"><iframe src="https://www.youtube.com/embed/${escAttr(match[1])}" frameborder="0" allowfullscreen loading="lazy"></iframe></div><p><br></p>`); return }
    match = embedUrl.match(/vimeo\.com\/(\d+)/)
    if (match) { exec('insertHTML', `<div class="embed-responsive"><iframe src="https://player.vimeo.com/video/${escAttr(match[1])}" frameborder="0" allowfullscreen loading="lazy"></iframe></div><p><br></p>`); return }
    if (!isSafeUrl(embedUrl)) return
    exec('insertHTML', `<div class="embed-responsive"><iframe src="${escAttr(embedUrl)}" frameborder="0" loading="lazy"></iframe></div><p><br></p>`)
  }

  // Find & Replace
  function findNext() {
    if (!findText || !editorRef.current) return
    const sel = window.getSelection()
    const range = document.createRange()
    const walker = document.createTreeWalker(editorRef.current, NodeFilter.SHOW_TEXT)
    let node: Node | null
    while ((node = walker.nextNode())) {
      const idx = (node.textContent ?? '').toLowerCase().indexOf(findText.toLowerCase())
      if (idx >= 0) { range.setStart(node, idx); range.setEnd(node, idx + findText.length); sel?.removeAllRanges(); sel?.addRange(range); break }
    }
  }

  function replaceNext() {
    const sel = window.getSelection()
    if (sel?.toString().toLowerCase() === findText.toLowerCase()) exec('insertText', replaceText)
    findNext()
  }

  function replaceAll() {
    if (!findText || !editorRef.current) return
    const walker = document.createTreeWalker(editorRef.current, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    while (walker.nextNode()) nodes.push(walker.currentNode as Text)
    for (const node of nodes) {
      if (node.textContent?.includes(findText)) {
        node.textContent = node.textContent.replaceAll(findText, replaceText)
      }
    }
    onChange?.(editorRef.current.innerHTML)
  }

  // Font size
  function setFontSize(size: string) {
    exec('fontSize', '7')
    editorRef.current?.querySelectorAll('font[size="7"]').forEach(el => {
      const span = document.createElement('span')
      span.style.fontSize = size
      span.innerHTML = el.innerHTML
      el.replaceWith(span)
    })
    if (editorRef.current) onChange?.(editorRef.current.innerHTML)
  }

  // Source mode
  function toggleSource() {
    if (!sourceMode) {
      setSourceCode(formatHtml(editorRef.current?.innerHTML ?? ''))
      setSourceMode(true)
    } else {
      setSourceMode(false)
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = sourceCode
          onChange?.(sourceCode)
          updateCounts()
        }
      }, 0)
    }
  }

  function updateLineNumbers(code: string) {
    if (lineNumRef.current) {
      lineNumRef.current.innerHTML = Array.from({ length: code.split('\n').length }, (_, i) => `<div>${i + 1}</div>`).join('')
    }
  }

  // Toolbar button helper
  function TBtn({ onClick, active, title, label, children }: { onClick: () => void; active?: boolean; title: string; label: string; children: React.ReactNode }) {
    return (
      <button type="button" onClick={onClick} className={`${btnClass} ${active !== undefined ? isActiveClass(active) : 'text-[var(--karbon-text-3)] hover:bg-[var(--karbon-bg-2)] hover:text-[var(--karbon-text)]'}`} title={title} aria-label={label}>
        {children}
      </button>
    )
  }

  return (
    <>
      <div role="toolbar" aria-label="Éditeur de texte riche" className={`rounded-xl border border-[var(--karbon-border)] bg-[var(--karbon-bg-card)] shadow-sm overflow-hidden ${fullscreen ? 'fixed inset-0 z-40 rounded-none flex flex-col' : ''} ${className}`}>

        {/* TOOLBAR */}
        <div className="flex flex-wrap items-center gap-1 border-b border-[var(--karbon-border)] bg-[var(--karbon-bg-2)]/50 px-3 py-2 select-none">
          <TBtn onClick={() => exec('undo')} title="Annuler (Ctrl+Z)" label="Annuler">{icons.undo}</TBtn>
          <TBtn onClick={() => exec('redo')} title="Rétablir" label="Rétablir">{icons.redo}</TBtn>
          <span className={sepClass} />

          <TBtn onClick={() => exec('formatBlock', 'p')} active={activeFormats.has('p')} title="Paragraphe" label="Paragraphe">{icons.paragraph}</TBtn>
          <TBtn onClick={() => exec('formatBlock', 'h2')} active={activeFormats.has('h2')} title="Titre 2" label="Titre 2"><span className="text-xs font-bold">H2</span></TBtn>
          <TBtn onClick={() => exec('formatBlock', 'h3')} active={activeFormats.has('h3')} title="Titre 3" label="Titre 3"><span className="text-xs font-bold">H3</span></TBtn>
          <TBtn onClick={() => exec('formatBlock', 'h4')} active={activeFormats.has('h4')} title="Titre 4" label="Titre 4"><span className="text-xs font-bold">H4</span></TBtn>
          <span className={sepClass} />

          <select onChange={(e) => { if (e.target.value) setFontSize(e.target.value) }} className="bg-[var(--karbon-bg-input)] border border-[var(--karbon-border-input)] text-[var(--karbon-text-3)] rounded-[5px] px-1 py-0.5 text-[0.6875rem] outline-none cursor-pointer" title="Taille">
            <option value="">Taille</option>
            {FONT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className={sepClass} />

          <TBtn onClick={() => exec('bold')} active={activeFormats.has('bold')} title="Gras (Ctrl+B)" label="Gras">{icons.bold}</TBtn>
          <TBtn onClick={() => exec('italic')} active={activeFormats.has('italic')} title="Italique (Ctrl+I)" label="Italique">{icons.italic}</TBtn>
          <TBtn onClick={() => exec('underline')} active={activeFormats.has('underline')} title="Souligné (Ctrl+U)" label="Souligné">{icons.underline}</TBtn>
          <TBtn onClick={() => exec('strikeThrough')} active={activeFormats.has('strikeThrough')} title="Barré" label="Barré">{icons.strikethrough}</TBtn>
          <span className={sepClass} />

          <div className="relative">
            <TBtn onClick={() => setShowColorPicker(!showColorPicker)} title="Couleur" label="Couleur du texte">{icons.color}</TBtn>
            {showColorPicker && (
              <div className="absolute left-0 top-full z-20 mt-1 grid grid-cols-8 gap-1 rounded-lg border border-[var(--karbon-border)] bg-[var(--karbon-bg-card)] p-2 shadow-xl">
                {COLORS.map(c => <button key={c} type="button" onClick={() => { exec('foreColor', c); setShowColorPicker(false) }} className="h-5 w-5 rounded border border-[var(--karbon-border)] hover:scale-125 transition-transform cursor-pointer" style={{ backgroundColor: c }} aria-label={`Couleur ${c}`} />)}
              </div>
            )}
          </div>
          <TBtn onClick={() => exec('removeFormat')} title="Effacer formatage" label="Effacer le formatage">{icons.removeFormat}</TBtn>
          <span className={sepClass} />

          <TBtn onClick={() => exec('justifyLeft')} active={activeFormats.has('justifyLeft')} title="Gauche" label="Aligner à gauche">{icons.alignLeft}</TBtn>
          <TBtn onClick={() => exec('justifyCenter')} active={activeFormats.has('justifyCenter')} title="Centre" label="Centrer">{icons.alignCenter}</TBtn>
          <TBtn onClick={() => exec('justifyRight')} active={activeFormats.has('justifyRight')} title="Droite" label="Aligner à droite">{icons.alignRight}</TBtn>
          <span className={sepClass} />

          <TBtn onClick={() => exec('insertUnorderedList')} active={activeFormats.has('insertunorderedlist')} title="Puces" label="Liste à puces">{icons.list}</TBtn>
          <TBtn onClick={() => exec('insertOrderedList')} active={activeFormats.has('insertorderedlist')} title="Numéros" label="Liste numérotée">{icons.listOrdered}</TBtn>
          <TBtn onClick={() => exec('formatBlock', 'blockquote')} active={activeFormats.has('blockquote')} title="Citation" label="Citation">{icons.quote}</TBtn>
          <TBtn onClick={() => exec('insertHTML', '<hr />')} title="Séparateur" label="Séparateur">{icons.hr}</TBtn>
          <span className={sepClass} />

          <TBtn onClick={openLinkModal} title="Lien (Ctrl+K)" label="Insérer un lien">{icons.link}</TBtn>
          <TBtn onClick={openImageModal} title="Image" label="Insérer une image">{icons.image}</TBtn>
          <TBtn onClick={() => { saveSelection(); setShowTableModal(true); setTableRows(3); setTableCols(3) }} title="Tableau" label="Insérer un tableau">{icons.table}</TBtn>
          <TBtn onClick={() => { saveSelection(); setEmbedUrl(''); setShowEmbedModal(true) }} title="Vidéo / Embed" label="Insérer une vidéo">{icons.video}</TBtn>

          <div className="flex-1" />

          <TBtn onClick={() => setShowFindReplace(v => !v)} active={showFindReplace} title="Rechercher (Ctrl+H)" label="Rechercher et remplacer">{icons.search}</TBtn>
          <TBtn onClick={toggleSource} active={sourceMode} title="Source" label="Mode source HTML">{icons.code}</TBtn>
          <TBtn onClick={() => setFullscreen(v => !v)} title="Plein écran" label="Plein écran">{fullscreen ? icons.minimize : icons.maximize}</TBtn>
        </div>

        {/* FIND/REPLACE */}
        {showFindReplace && (
          <div className="flex items-center gap-2 border-b border-[var(--karbon-border)] bg-[var(--karbon-bg-2)]/30 px-4 py-2">
            <input type="text" value={findText} onChange={e => setFindText(e.target.value)} placeholder="Rechercher..." className={`${modalInput} w-40 !py-1 !px-2 !text-xs`} onKeyDown={e => { if (e.key === 'Enter') findNext() }} />
            <input type="text" value={replaceText} onChange={e => setReplaceText(e.target.value)} placeholder="Remplacer..." className={`${modalInput} w-40 !py-1 !px-2 !text-xs`} />
            <button type="button" onClick={findNext} className="bg-[var(--karbon-bg-2)] border border-[var(--karbon-border)] text-[var(--karbon-text-3)] rounded-md px-2.5 py-1 text-[0.6875rem] cursor-pointer hover:bg-[var(--karbon-bg-card)] hover:text-[var(--karbon-text)] transition-all">Suivant</button>
            <button type="button" onClick={replaceNext} className="bg-[var(--karbon-bg-2)] border border-[var(--karbon-border)] text-[var(--karbon-text-3)] rounded-md px-2.5 py-1 text-[0.6875rem] cursor-pointer hover:bg-[var(--karbon-bg-card)] hover:text-[var(--karbon-text)] transition-all">Remplacer</button>
            <button type="button" onClick={replaceAll} className="bg-[var(--karbon-bg-2)] border border-[var(--karbon-border)] text-[var(--karbon-text-3)] rounded-md px-2.5 py-1 text-[0.6875rem] cursor-pointer hover:bg-[var(--karbon-bg-card)] hover:text-[var(--karbon-text)] transition-all">Tout</button>
            <button type="button" onClick={() => setShowFindReplace(false)} className={`${btnClass} text-[var(--karbon-text-4)]`} aria-label="Fermer">{icons.xSm}</button>
          </div>
        )}

        {/* EDITOR / SOURCE */}
        {sourceMode ? (
          <div className={`relative flex overflow-hidden bg-[#0d1117] ${fullscreen ? 'flex-1' : 'h-[500px]'}`}>
            <div ref={lineNumRef} className="shrink-0 w-12 py-4 text-right font-mono text-[0.8125rem] leading-[1.625] text-[#484f58] select-none overflow-hidden border-r border-[#21262d] [&>div]:pr-3" />
            <div className="absolute top-0 left-12 right-0 bottom-0 p-4 font-mono text-[0.8125rem] leading-[1.625] whitespace-pre overflow-hidden pointer-events-none text-[#c9d1d9]" dangerouslySetInnerHTML={{ __html: highlightHtml(sourceCode) }} />
            <textarea
              ref={sourceRef}
              value={sourceCode}
              onChange={e => { setSourceCode(e.target.value); onChange?.(e.target.value); updateLineNumbers(e.target.value) }}
              onScroll={() => { if (lineNumRef.current && sourceRef.current) lineNumRef.current.scrollTop = sourceRef.current.scrollTop }}
              className="absolute top-0 left-12 right-0 bottom-0 p-4 m-0 border-none outline-none resize-none font-mono text-[0.8125rem] leading-[1.625] text-transparent caret-[#c9d1d9] bg-transparent whitespace-pre overflow-auto [-webkit-text-fill-color:transparent]"
              spellCheck={false}
              wrap="off"
            />
          </div>
        ) : (
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className={`${editorContentClass} ${fullscreen ? 'flex-1 overflow-y-auto' : 'min-h-[500px] max-h-[800px] overflow-y-auto'}`}
            data-placeholder={placeholder}
            role="textbox"
            tabIndex={0}
            aria-multiline="true"
            onInput={handleInput}
            onKeyDown={handleKeydown}
            onKeyUp={updateActiveFormats}
            onMouseUp={updateActiveFormats}
            onPaste={handlePaste}
          />
        )}

        {/* STATUS BAR */}
        <div className="flex items-center gap-4 border-t border-[var(--karbon-border)] bg-[var(--karbon-bg-2)]/30 px-4 py-1.5 text-[11px] text-[var(--karbon-text-4)]">
          <span>{wordCount} mot{wordCount !== 1 ? 's' : ''}</span>
          <span>{charCount} caractère{charCount !== 1 ? 's' : ''}</span>
          {sourceMode && <span className="text-violet-400">Mode source</span>}
          <div className="flex-1" />
          <span>Raccourcis : Ctrl+B/I/U/K/H</span>
        </div>
      </div>

      {/* LINK MODAL */}
      {showLinkModal && (
        <div className={modalOverlay} role="presentation" onClick={() => setShowLinkModal(false)}>
          <div className={`${modalBox} max-w-md`} role="dialog" tabIndex={-1} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--karbon-text)]">Insérer un lien</h3>
              <button type="button" onClick={() => setShowLinkModal(false)} className="text-[var(--karbon-text-4)] hover:text-[var(--karbon-text)] cursor-pointer" aria-label="Fermer">{icons.x}</button>
            </div>
            <div className="space-y-3">
              <div className="space-y-1"><span className={modalLabel}>URL</span><input type="url" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://..." className={modalInput} /></div>
              <div className="space-y-1"><span className={modalLabel}>Texte</span><input type="text" value={linkText} onChange={e => setLinkText(e.target.value)} placeholder="Texte affiché" className={modalInput} /></div>
              <div className="space-y-1"><span className={modalLabel}>Title</span><input type="text" value={linkTitle} onChange={e => setLinkTitle(e.target.value)} placeholder="Info-bulle" className={modalInput} /></div>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={linkTarget} onChange={e => setLinkTarget(e.target.checked)} className="h-4 w-4 rounded" /><span className="text-sm text-[var(--karbon-text-2)]">Ouvrir dans un nouvel onglet</span></label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setShowLinkModal(false)} className={modalBtnCancel}>Annuler</button>
              <button type="button" onClick={insertLink} className={modalBtnPrimary}>Appliquer</button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE MODAL */}
      {showImageModal && (
        <div className={modalOverlay} role="presentation" onClick={() => setShowImageModal(false)}>
          <div className={`${modalBox} max-w-lg`} role="dialog" tabIndex={-1} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--karbon-text)]">Insérer une image</h3>
              <button type="button" onClick={() => setShowImageModal(false)} className="text-[var(--karbon-text-4)] hover:text-[var(--karbon-text)] cursor-pointer" aria-label="Fermer">{icons.x}</button>
            </div>
            <div className="space-y-4">
              {media?.upload && (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--karbon-border)] p-4">
                  {imageUploading ? (
                    <>{icons.spinner}<p className="text-[11px] text-[var(--karbon-text-3)] mt-1">Upload...</p></>
                  ) : (
                    <>{icons.upload}<label className="cursor-pointer text-xs font-medium text-violet-400 hover:text-violet-300 mt-1">Uploader<input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e.target.files)} /></label></>
                  )}
                </div>
              )}
              <div className="space-y-1"><span className={modalLabel}>URL</span><input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." className={modalInput} /></div>
              <div className="space-y-1"><span className={modalLabel}>Alt</span><input type="text" value={imageAlt} onChange={e => setImageAlt(e.target.value)} className={modalInput} /></div>
              {imageUrl && <div className="rounded-lg border border-[var(--karbon-border)] overflow-hidden"><img src={imageUrl} alt={imageAlt} className="w-full max-h-40 object-contain bg-[var(--karbon-bg-2)]" /></div>}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setShowImageModal(false)} className={modalBtnCancel}>Annuler</button>
              <button type="button" onClick={insertImage} disabled={!imageUrl} className={modalBtnPrimary}>Insérer</button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE MODAL */}
      {showTableModal && (
        <div className={modalOverlay} role="presentation" onClick={() => setShowTableModal(false)}>
          <div className={`${modalBox} max-w-sm`} role="dialog" tabIndex={-1} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--karbon-text)]">Insérer un tableau</h3>
              <button type="button" onClick={() => setShowTableModal(false)} className="text-[var(--karbon-text-4)] hover:text-[var(--karbon-text)] cursor-pointer" aria-label="Fermer">{icons.x}</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><span className={modalLabel}>Lignes</span><input type="number" value={tableRows} onChange={e => setTableRows(+e.target.value)} min={1} max={20} className={modalInput} /></div>
              <div className="space-y-1"><span className={modalLabel}>Colonnes</span><input type="number" value={tableCols} onChange={e => setTableCols(+e.target.value)} min={1} max={10} className={modalInput} /></div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setShowTableModal(false)} className={modalBtnCancel}>Annuler</button>
              <button type="button" onClick={insertTable} className={modalBtnPrimary}>Insérer</button>
            </div>
          </div>
        </div>
      )}

      {/* EMBED MODAL */}
      {showEmbedModal && (
        <div className={modalOverlay} role="presentation" onClick={() => setShowEmbedModal(false)}>
          <div className={`${modalBox} max-w-md`} role="dialog" tabIndex={-1} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--karbon-text)]">Embed vidéo</h3>
              <button type="button" onClick={() => setShowEmbedModal(false)} className="text-[var(--karbon-text-4)] hover:text-[var(--karbon-text)] cursor-pointer" aria-label="Fermer">{icons.x}</button>
            </div>
            <p className="text-xs text-[var(--karbon-text-3)] mb-3">Collez une URL YouTube, Vimeo ou un lien embed.</p>
            <input type="url" value={embedUrl} onChange={e => setEmbedUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className={modalInput} onKeyDown={e => { if (e.key === 'Enter') insertEmbed() }} />
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setShowEmbedModal(false)} className={modalBtnCancel}>Annuler</button>
              <button type="button" onClick={insertEmbed} disabled={!embedUrl} className={modalBtnPrimary}>Insérer</button>
            </div>
          </div>
        </div>
      )}

      {/* COLOR PICKER BACKDROP */}
      {showColorPicker && <div className="fixed inset-0 z-10" role="presentation" onClick={() => setShowColorPicker(false)} />}
    </>
  )
}
