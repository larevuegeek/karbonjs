<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    text?: string
    position?: 'top' | 'bottom' | 'left' | 'right'
    color?: ButtonColor
    variant?: 'dark' | 'light' | 'colored'
    size?: 'sm' | 'md' | 'lg'
    delay?: number
    arrow?: boolean
    maxWidth?: string
    nowrap?: boolean
    content?: Snippet
    class?: string
    classes?: { root?: string, content?: string }
    children: Snippet
  }

  let {
    text = '',
    position = 'top',
    color,
    variant = 'dark',
    size = 'md',
    delay = 200,
    arrow = true,
    maxWidth = '250px',
    nowrap = false,
    content,
    class: className = '',
    classes = {},
    children
  }: Props = $props()

  let visible = $state(false)
  let timeout: ReturnType<typeof setTimeout> | null = null

  function show() {
    if (delay > 0) {
      timeout = setTimeout(() => { visible = true }, delay)
    } else {
      visible = true
    }
  }

  function hide() {
    if (timeout) { clearTimeout(timeout); timeout = null }
    visible = false
  }

  const sizeMap = {
    sm: { px: '6px 10px', text: '11px', arrow: 4 },
    md: { px: '8px 12px', text: '12px', arrow: 5 },
    lg: { px: '10px 14px', text: '13px', arrow: 6 },
  }
  const s = $derived(sizeMap[size])

  const accent = $derived(color ? `var(--karbon-${color}-500)` : '')

  const bgColor = $derived.by(() => {
    switch (variant) {
      case 'dark': return 'rgba(15,10,30,0.95)'
      case 'light': return 'rgba(255,255,255,0.97)'
      case 'colored': return accent || 'var(--karbon-primary)'
      default: return 'rgba(15,10,30,0.95)'
    }
  })

  const textColor = $derived.by(() => {
    switch (variant) {
      case 'dark': return 'rgba(255,255,255,0.92)'
      case 'light': return 'rgba(15,10,30,0.85)'
      case 'colored': return 'white'
      default: return 'rgba(255,255,255,0.92)'
    }
  })

  // Position styles
  const posStyle: Record<string, string> = {
    top: 'bottom:100%;left:50%;transform:translateX(-50%);margin-bottom:8px;',
    bottom: 'top:100%;left:50%;transform:translateX(-50%);margin-top:8px;',
    left: 'right:100%;top:50%;transform:translateY(-50%);margin-right:8px;',
    right: 'left:100%;top:50%;transform:translateY(-50%);margin-left:8px;',
  }

  // Arrow position
  const arrowPos: Record<string, string> = {
    top: 'top:100%;left:50%;transform:translateX(-50%);',
    bottom: 'bottom:100%;left:50%;transform:translateX(-50%) rotate(180deg);',
    left: 'left:100%;top:50%;transform:translateY(-50%) rotate(-90deg);',
    right: 'right:100%;top:50%;transform:translateY(-50%) rotate(90deg);',
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="relative inline-flex {classes?.root ?? className}"
  onmouseenter={show}
  onmouseleave={hide}
  onfocusin={show}
  onfocusout={hide}
>
  {@render children()}

  {#if visible && (text || content)}
    <div
      class="absolute z-50 pointer-events-none {classes?.content ?? ''}"
      style="{posStyle[position]}animation:karbon-tooltip-in 0.15s ease;"
      role="tooltip"
    >
      <div
        class="relative rounded-lg font-medium {nowrap ? 'whitespace-nowrap' : 'whitespace-normal'}"
        style="padding:{s.px};font-size:{s.text};background:{bgColor};color:{textColor};max-width:{maxWidth};box-shadow:0 4px 14px rgba(0,0,0,0.25);backdrop-filter:blur(8px);"
      >
        {#if content}
          {@render content()}
        {:else}
          {text}
        {/if}

        {#if arrow}
          <div
            class="absolute"
            style="{arrowPos[position]}width:0;height:0;border-left:{s.arrow}px solid transparent;border-right:{s.arrow}px solid transparent;border-top:{s.arrow}px solid {bgColor};"
          ></div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  @keyframes karbon-tooltip-in {
    from { opacity: 0; transform: translateX(-50%) translateY(4px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
</style>
