<script lang="ts">
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    code: string
    language?: string
    title?: string
    showLineNumbers?: boolean
    showCopy?: boolean
    showLanguage?: boolean
    highlightLines?: number[]
    lineCopy?: boolean
    maxHeight?: string
    wrap?: boolean
    color?: ButtonColor
    variant?: 'default' | 'bordered' | 'filled' | 'minimal'
    class?: string
    classes?: { root?: string, header?: string, code?: string, line?: string }
  }

  let {
    code,
    language = 'text',
    title = '',
    showLineNumbers = true,
    showCopy = true,
    showLanguage = true,
    highlightLines = [],
    lineCopy = false,
    maxHeight = '500px',
    wrap = false,
    color,
    variant = 'default',
    class: className = '',
    classes = {}
  }: Props = $props()

  let copied = $state(false)
  let copiedLine = $state(-1)

  const accent = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')

  const lines = $derived(code.split('\n'))

  // Colors — use hex to avoid var() conflicts with escapeHtml
  const C = {
    kw: 'color:#a78bfa;font-weight:500',       // keywords (violet)
    fn: 'color:#60a5fa',                        // functions (blue)
    str: 'color:#34d399',                       // strings (emerald)
    num: 'color:#fbbf24',                       // numbers (amber)
    com: 'color:#6b7280;font-style:italic',     // comments (gray)
    type: 'color:#22d3ee',                       // types (cyan)
    op: 'color:#f472b6',                         // operators (pink)
    tag: 'color:#f87171',                        // html tags (red)
    attr: 'color:#fbbf24',                       // html attributes
    deco: 'color:#fbbf24;font-style:italic',     // decorators
    prop: 'color:#67e8f9',                        // properties (cyan light)
    bool: 'color:#fbbf24;font-weight:500',       // booleans
    builtin: 'color:#22d3ee',                    // built-in
    var: 'color:#fca5a5',                         // special vars
    punct: 'color:#9ca3af',                       // punctuation
  }

  const sp = (cls: string, text: string) => `<span style="${cls}">${text}</span>`

  // Tokenizer approach — split line into tokens THEN colorize, avoids regex overlap
  function highlight(line: string, lang: string): string {
    if (lang === 'text' || lang === 'plain' || !line.trim()) return escapeHtml(line)

    const aliases: Record<string, string> = { javascript: 'js', typescript: 'ts', jsx: 'js', tsx: 'ts', sh: 'bash', scss: 'css', xml: 'html' }
    const l = aliases[lang] || lang

    const keywordSets: Record<string, Set<string>> = {
      js: new Set(['const','let','var','function','return','if','else','for','while','do','class','import','export','from','default','async','await','new','this','super','try','catch','throw','finally','typeof','instanceof','switch','case','break','continue','of','in','yield','delete','void']),
      ts: new Set(['const','let','var','function','return','if','else','for','while','do','class','import','export','from','default','async','await','new','this','super','try','catch','throw','finally','typeof','instanceof','interface','type','enum','as','extends','implements','abstract','readonly','declare','keyof','infer','is','satisfies','namespace']),
      python: new Set(['def','class','return','if','elif','else','for','while','import','from','as','try','except','finally','with','yield','lambda','pass','raise','del','global','nonlocal','assert','break','continue','and','or','not','in','is']),
      rust: new Set(['fn','let','mut','const','struct','enum','impl','trait','pub','use','mod','crate','if','else','for','while','loop','match','return','self','Self','async','await','where','type','move','ref','static','unsafe','extern','dyn','as','in']),
      go: new Set(['func','var','const','type','struct','interface','return','if','else','for','range','switch','case','import','package','defer','go','chan','select','map','make','nil','fallthrough','break','continue','default']),
      php: new Set(['function','class','return','if','else','elseif','foreach','for','while','new','public','private','protected','static','use','namespace','echo','require','include','extends','implements','abstract','final','match','throw','try','catch']),
      bash: new Set(['if','then','else','elif','fi','for','do','done','while','until','case','esac','in','function','return','local','declare','echo','exit','export','source','set']),
      sql: new Set(['SELECT','FROM','WHERE','INSERT','UPDATE','DELETE','CREATE','TABLE','ALTER','DROP','JOIN','LEFT','RIGHT','INNER','ON','AND','OR','NOT','ORDER','BY','GROUP','HAVING','LIMIT','AS','INTO','VALUES','SET','COUNT','MAX','MIN','AVG','SUM','DISTINCT','BETWEEN','LIKE','IN','EXISTS','CASE','WHEN','THEN','ELSE','END','NULL','IS']),
      css: new Set(['important']),
      html: new Set(),
      svelte: new Set(['const','let','function','return','if','else','each','await','then','catch','import','export','from','as','snippet','render']),
    }

    const builtins: Record<string, Set<string>> = {
      js: new Set(['console','document','window','Math','JSON','Object','Array','Promise','Map','Set','Error','RegExp','Date','parseInt','parseFloat','setTimeout','setInterval','fetch','require','undefined','NaN','Infinity']),
      ts: new Set(['console','document','window','Math','JSON','Object','Array','Promise','Map','Set','Error','RegExp','Date','parseInt','parseFloat','setTimeout','setInterval','fetch','require','undefined','NaN','Infinity','Record','Partial','Required','Pick','Omit','Readonly']),
      python: new Set(['print','len','range','int','str','float','list','dict','tuple','set','bool','type','isinstance','super','open','enumerate','zip','map','filter','sorted','reversed','any','all','input','format','hasattr','getattr','setattr','True','False','None']),
      rust: new Set(['println','eprintln','format','vec','Box','Rc','Arc','Option','Result','Ok','Err','Some','None','String','Vec','HashMap','HashSet','BTreeMap','anyhow']),
      go: new Set(['fmt','log','http','io','os','strings','strconv','errors','context','sync','time','nil']),
    }

    const booleans = new Set(['true','false','null','undefined','nil','None','True','False','NaN','Infinity'])
    const kw = keywordSets[l] || keywordSets.js || new Set()
    const bi = builtins[l] || new Set()

    // Check for full-line comment
    const trimmed = line.trimStart()
    if (['js','ts','svelte','java','c','cpp','go','rust','php'].includes(l) && trimmed.startsWith('//')) return sp(C.com, escapeHtml(line))
    if (['python','ruby','bash','yaml','toml'].includes(l) && trimmed.startsWith('#')) return sp(C.com, escapeHtml(line))
    if (['sql'].includes(l) && trimmed.startsWith('--')) return sp(C.com, escapeHtml(line))

    // Tokenize
    const tokens: { type: string, text: string }[] = []
    let i = 0

    while (i < line.length) {
      const ch = line[i]
      const rest = line.slice(i)

      // Inline comment
      if (rest.startsWith('//') && ['js','ts','svelte','go','rust','java','c','cpp','php'].includes(l)) {
        tokens.push({ type: 'comment', text: line.slice(i) }); break
      }
      if (ch === '#' && ['python','bash','ruby','yaml','toml'].includes(l)) {
        tokens.push({ type: 'comment', text: line.slice(i) }); break
      }

      // Strings
      if (ch === '"' || ch === "'" || ch === '`') {
        let end = i + 1
        while (end < line.length && line[end] !== ch) { if (line[end] === '\\') end++; end++ }
        tokens.push({ type: 'string', text: line.slice(i, end + 1) }); i = end + 1; continue
      }

      // Numbers
      if (/\d/.test(ch) && (i === 0 || /[\s,;:(=+\-*/<>!&|^~%]/.test(line[i-1]))) {
        let end = i
        while (end < line.length && /[\d.xXa-fA-F_]/.test(line[end])) end++
        // optional suffix like px, rem, ms
        if (end < line.length && /[a-z%]/.test(line[end])) { while (end < line.length && /[a-z%]/.test(line[end])) end++ }
        tokens.push({ type: 'number', text: line.slice(i, end) }); i = end; continue
      }

      // Words (identifiers, keywords)
      if (/[a-zA-Z_$@]/.test(ch)) {
        let end = i
        if (ch === '@') end++ // decorators
        while (end < line.length && /[\w$]/.test(line[end])) end++
        const word = line.slice(i, end)

        if (ch === '$' && ['php','bash'].includes(l)) { tokens.push({ type: 'variable', text: word }) }
        else if (ch === '@') { tokens.push({ type: 'decorator', text: word }) }
        else if (kw.has(word) || (l === 'sql' && kw.has(word.toUpperCase()))) { tokens.push({ type: 'keyword', text: word }) }
        else if (booleans.has(word)) { tokens.push({ type: 'boolean', text: word }) }
        else if (bi.has(word)) { tokens.push({ type: 'builtin', text: word }) }
        else if (/^[A-Z]/.test(word) && word.length > 1) { tokens.push({ type: 'type', text: word }) }
        else if (end < line.length && line[end] === '(') { tokens.push({ type: 'function', text: word }) }
        else { tokens.push({ type: 'ident', text: word }) }

        i = end; continue
      }

      // Operators
      const op2 = line.slice(i, i + 3)
      const op1 = line.slice(i, i + 2)
      if (['===','!==','...','<<=','>>='].includes(op2)) { tokens.push({ type: 'operator', text: op2 }); i += 3; continue }
      if (['=>','==','!=','<=','>=','&&','||','??','?.','::','->','..','+=','-=','*=','/=','%=','|=','&=','<<','>>'].includes(op1)) { tokens.push({ type: 'operator', text: op1 }); i += 2; continue }
      if ('=+-*/%<>!&|^~?:'.includes(ch)) { tokens.push({ type: 'operator', text: ch }); i++; continue }

      // Property access
      if (ch === '.') { tokens.push({ type: 'punct', text: '.' }); i++; continue }

      // Punctuation
      if ('{}[]();,'.includes(ch)) { tokens.push({ type: 'punct', text: ch }); i++; continue }

      // HTML tags
      if (ch === '<' && ['html','svelte','jsx','tsx'].includes(l)) {
        const tagMatch = rest.match(/^(<\/?)([\w-]+)/)
        if (tagMatch) {
          tokens.push({ type: 'punct', text: tagMatch[1] })
          tokens.push({ type: 'tag', text: tagMatch[2] })
          i += tagMatch[0].length; continue
        }
      }

      // Whitespace
      if (/\s/.test(ch)) {
        let end = i
        while (end < line.length && /\s/.test(line[end])) end++
        tokens.push({ type: 'space', text: line.slice(i, end) }); i = end; continue
      }

      // Fallback
      tokens.push({ type: 'text', text: ch }); i++
    }

    // Render tokens
    return tokens.map(t => {
      const escaped = escapeHtml(t.text)
      switch (t.type) {
        case 'keyword': return sp(C.kw, escaped)
        case 'function': return sp(C.fn, escaped)
        case 'string': return sp(C.str, escaped)
        case 'number': return sp(C.num, escaped)
        case 'comment': return sp(C.com, escaped)
        case 'type': return sp(C.type, escaped)
        case 'operator': return sp(C.op, escaped)
        case 'boolean': return sp(C.bool, escaped)
        case 'builtin': return sp(C.builtin, escaped)
        case 'variable': return sp(C.var, escaped)
        case 'decorator': return sp(C.deco, escaped)
        case 'tag': return sp(C.tag, escaped)
        case 'punct': return sp(C.punct, escaped)
        case 'prop': return sp(C.prop, escaped)
        default: return escaped
      }
    }).join('')
  }

  function escapeHtml(str: string): string {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
      copied = true
      setTimeout(() => copied = false, 2000)
    } catch {}
  }

  async function copyLine(index: number) {
    try {
      await navigator.clipboard.writeText(lines[index])
      copiedLine = index
      setTimeout(() => copiedLine = -1, 1500)
    } catch {}
  }

  const langLabels: Record<string, string> = {
    js: 'JavaScript', javascript: 'JavaScript', ts: 'TypeScript', typescript: 'TypeScript',
    jsx: 'JSX', tsx: 'TSX', html: 'HTML', css: 'CSS', scss: 'SCSS',
    python: 'Python', rust: 'Rust', go: 'Go', php: 'PHP', sql: 'SQL',
    bash: 'Bash', sh: 'Shell', json: 'JSON', yaml: 'YAML', toml: 'TOML',
    xml: 'XML', svelte: 'Svelte', text: 'Text', plain: 'Plain',
    java: 'Java', c: 'C', cpp: 'C++', ruby: 'Ruby', swift: 'Swift', kotlin: 'Kotlin',
  }

  const langLabel = $derived(langLabels[language] || language)

  function rootStyle(): string {
    switch (variant) {
      case 'default': return 'background:var(--karbon-bg-2);border:1px solid var(--karbon-border);'
      case 'bordered': return `background:var(--karbon-bg-card);border:1px solid ${accent};`
      case 'filled': return `background:color-mix(in srgb,${accent} 6%,transparent);border:1px solid color-mix(in srgb,${accent} 15%,transparent);`
      case 'minimal': return 'background:transparent;border:none;'
      default: return ''
    }
  }
</script>

<div class="rounded-xl overflow-hidden {classes?.root ?? className}" style={rootStyle()}>
  <!-- Header -->
  {#if title || showLanguage || showCopy}
    <div class="flex items-center gap-2 px-4 py-2 {classes?.header ?? ''}" style="border-bottom:1px solid var(--karbon-border);">
      {#if title}
        <span style="font-size:12px;font-weight:600;color:var(--karbon-text);">{title}</span>
      {/if}
      {#if showLanguage}
        <span
          style="font-size:10px;font-weight:600;padding:2px 6px;border-radius:4px;
            background:color-mix(in srgb,{accent} 12%,transparent);color:{accent};
            text-transform:uppercase;letter-spacing:0.04em;"
        >{langLabel}</span>
      {/if}
      <div style="flex:1;"></div>
      {#if showCopy}
        <button
          type="button"
          onclick={copyCode}
          style="display:flex;align-items:center;gap:4px;padding:3px 8px;border-radius:6px;border:none;
            font-size:11px;font-weight:500;cursor:pointer;transition:all 0.15s;
            background:{copied ? 'color-mix(in srgb, var(--karbon-emerald-500) 15%, transparent)' : 'var(--karbon-bg-card)'};
            color:{copied ? 'var(--karbon-emerald-400)' : 'var(--karbon-text-3)'};"
          onmouseenter={(e) => { if (!copied) { (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-2)' } }}
          onmouseleave={(e) => { if (!copied) { (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-3)' } }}
          aria-label="Copier le code"
        >
          {#if copied}
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Copie !
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            Copier
          {/if}
        </button>
      {/if}
    </div>
  {/if}

  <!-- Code -->
  <div style="overflow:auto;max-height:{maxHeight};{classes?.code ?? ''}">
    <pre style="margin:0;padding:0;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:13px;line-height:1.6;"><code>{#each lines as line, i}<div
          class="karbon-code-line {classes?.line ?? ''}"
          style="display:flex;position:relative;{highlightLines.includes(i + 1) ? `background:color-mix(in srgb,${accent} 10%,transparent);` : ''}{wrap ? 'white-space:pre-wrap;word-break:break-all;' : 'white-space:pre;'}"
        >{#if showLineNumbers}<span
            style="display:inline-block;min-width:3ch;padding:0 12px 0 16px;text-align:right;color:{highlightLines.includes(i + 1) ? accent : 'var(--karbon-text-4)'};user-select:none;flex-shrink:0;font-size:12px;"
          >{i + 1}</span>{/if}<span style="padding:0 {lineCopy ? '36px' : '16px'} 0 {showLineNumbers ? '0' : '16px'};flex:1;color:var(--karbon-text);">{@html highlight(line, language)}</span>{#if lineCopy && line.trim()}<button
            type="button"
            onclick={() => copyLine(i)}
            class="karbon-code-line-copy"
            style="position:absolute;right:10px;top:50%;transform:translateY(-50%);
              display:flex;align-items:center;justify-content:center;
              width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;
              transition:all 0.1s;opacity:0;
              background:{copiedLine === i ? 'color-mix(in srgb, var(--karbon-emerald-500) 20%, transparent)' : 'var(--karbon-bg-card)'};
              color:{copiedLine === i ? 'var(--karbon-emerald-400)' : 'var(--karbon-text-4)'};"
            aria-label="Copier la ligne {i + 1}"
          >{#if copiedLine === i}<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{:else}<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>{/if}</button>{/if}</div>{/each}</code></pre>
  </div>
</div>

<style>
  .karbon-code-line:hover {
    background: var(--karbon-nav-hover-bg);
  }
  .karbon-code-line:hover .karbon-code-line-copy {
    opacity: 1 !important;
  }
</style>
