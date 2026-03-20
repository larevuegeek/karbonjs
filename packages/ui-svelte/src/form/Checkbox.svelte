<script lang="ts">
  import type { CheckboxClasses, ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    name: string
    checked?: boolean
    indeterminate?: boolean
    label?: string
    description?: string
    disabled?: boolean
    color?: ButtonColor
    size?: 'sm' | 'md' | 'lg'
    shape?: 'square' | 'rounded' | 'circle'
    icon?: 'check' | 'cross' | 'dash' | 'heart' | 'star' | 'circle' | 'eye'
    variant?: 'filled' | 'outlined' | 'ghost' | 'elegant'
    classes?: CheckboxClasses
    class?: string
    onchange?: (checked: boolean) => void
  }

  let {
    name,
    checked = $bindable(false),
    indeterminate = false,
    label = '',
    description = '',
    disabled = false,
    color,
    size = 'md',
    shape = 'rounded',
    icon = 'check',
    variant = 'filled',
    classes,
    class: className = '',
    onchange
  }: Props = $props()

  const accentColor = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')
  const accentHover = $derived(color ? `var(--karbon-${color}-400)` : 'var(--karbon-primary-hover, var(--karbon-primary))')

  const sizeMap = {
    sm: { box: 'w-3.5 h-3.5', icon: 10, text: 'text-xs', desc: 'text-[11px]', gap: 'gap-2' },
    md: { box: 'w-4.5 h-4.5', icon: 13, text: 'text-sm', desc: 'text-xs', gap: 'gap-2.5' },
    lg: { box: 'w-5.5 h-5.5', icon: 16, text: 'text-base', desc: 'text-sm', gap: 'gap-3' },
  }
  const s = $derived(sizeMap[size])

  const shapeMap = { square: 'rounded-none', rounded: 'rounded', circle: 'rounded-full' }
  const shapeClass = $derived(shapeMap[shape])

  const isActive = $derived(checked || indeterminate)

  const boxStyle = $derived.by(() => {
    switch (variant) {
      case 'filled':
        return `background:${isActive ? accentColor : 'var(--karbon-bg-input,rgba(255,255,255,0.06))'};border:${isActive ? 'none' : '1.5px solid var(--karbon-border-input,rgba(255,255,255,0.12))'};box-shadow:${isActive ? `0 0 0 2px color-mix(in srgb,${accentColor} 20%,transparent)` : 'none'};`
      case 'outlined':
        return `background:transparent;border:2px solid ${isActive ? accentColor : 'var(--karbon-border-input,rgba(255,255,255,0.12))'};box-shadow:none;`
      case 'ghost':
        return `background:transparent;border:none;box-shadow:none;`
      case 'elegant':
        return `background:${isActive ? `color-mix(in srgb,${accentColor} 12%,transparent)` : 'transparent'};border:1.5px solid ${isActive ? accentColor : 'var(--karbon-border-input,rgba(255,255,255,0.12))'};box-shadow:${isActive ? `0 0 8px color-mix(in srgb,${accentColor} 15%,transparent)` : 'none'};`
      default: return ''
    }
  })

  const iconColor = $derived.by(() => {
    switch (variant) {
      case 'filled': return 'white'
      case 'outlined': return accentColor
      case 'ghost': return isActive ? accentColor : 'var(--karbon-text-4)'
      case 'elegant': return accentColor
      default: return 'white'
    }
  })

  function toggle() {
    if (disabled) return
    checked = !checked
    onchange?.(checked)
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      toggle()
    }
  }
</script>

<!-- Hidden real input for form submission -->
<input type="hidden" {name} value={checked ? 'on' : ''} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="inline-flex items-start {s.gap} {disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} {classes?.root ?? ''} {className}"
  onclick={toggle}
  onkeydown={handleKeydown}
  role="checkbox"
  aria-checked={indeterminate ? 'mixed' : checked}
  aria-disabled={disabled}
  tabindex={disabled ? -1 : 0}
>
  <!-- Custom checkbox box -->
  <div
    class="shrink-0 {s.box} {shapeClass} flex items-center justify-center transition-all duration-150 mt-0.5"
    style={boxStyle}
  >
    {#if indeterminate}
      <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="3" stroke-linecap="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    {:else if checked}
      {#if icon === 'check'}
        <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      {:else if icon === 'cross'}
        <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      {:else if icon === 'dash'}
        <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      {:else if icon === 'heart'}
        <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill={iconColor} stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      {:else if icon === 'star'}
        <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill={iconColor} stroke="none"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
      {:else if icon === 'circle'}
        <svg xmlns="http://www.w3.org/2000/svg" width={Math.round(s.icon * 0.6)} height={Math.round(s.icon * 0.6)} viewBox="0 0 24 24" fill={iconColor} stroke="none"><circle cx="12" cy="12" r="12"/></svg>
      {:else if icon === 'eye'}
        <svg xmlns="http://www.w3.org/2000/svg" width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
      {/if}
    {/if}
  </div>

  <!-- Label + description -->
  {#if label || description}
    <div class="select-none min-w-0">
      {#if label}
        <span class="{s.text} font-medium text-[var(--karbon-text)] {classes?.label ?? ''}">{label}</span>
      {/if}
      {#if description}
        <p class="{s.desc} text-[var(--karbon-text-3)] mt-0.5 leading-relaxed {classes?.description ?? ''}">{description}</p>
      {/if}
    </div>
  {/if}
</div>
