<script lang="ts">
  import type { ToggleClasses, ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    name: string
    checked?: boolean
    label?: string
    description?: string
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    color?: ButtonColor
    showIcons?: boolean
    classes?: ToggleClasses
    class?: string
    onchange?: (checked: boolean) => void
  }

  let {
    name,
    checked = $bindable(false),
    label = '',
    description = '',
    size = 'md',
    disabled = false,
    color,
    showIcons = false,
    classes,
    class: className = '',
    onchange
  }: Props = $props()

  const trackColor = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')

  // pad = space between dot edge and track edge (both sides)
  // translate = trackWidth - dotSize - (2 * pad)
  const sizes = {
    sm: { track: 'w-7 h-4', dot: 12, pad: 2, translate: 14, text: 'text-xs', desc: 'text-[11px]', iconSize: 7 },
    md: { track: 'w-10 h-[22px]', dot: 16, pad: 3, translate: 19, text: 'text-sm', desc: 'text-xs', iconSize: 9 },
    lg: { track: 'w-14 h-7', dot: 20, pad: 4, translate: 30, text: 'text-base', desc: 'text-sm', iconSize: 11 },
  }
  const s = $derived(sizes[size])

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

<input type="hidden" {name} value={checked ? 'on' : ''} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="inline-flex items-center gap-2.5 {disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} {classes?.root ?? ''} {className}"
  onclick={toggle}
  onkeydown={handleKeydown}
  role="switch"
  aria-checked={checked}
  aria-disabled={disabled}
  tabindex={disabled ? -1 : 0}
>
  <!-- Track -->
  <span
    class="relative inline-flex shrink-0 items-center rounded-full transition-all duration-200 {s.track} {classes?.track ?? ''}"
    style="background: {checked ? trackColor : 'var(--karbon-border, rgba(255,255,255,0.12))'};{checked ? `box-shadow: 0 0 8px color-mix(in srgb, ${trackColor} 30%, transparent);` : ''}"
  >
    <!-- Icons inside track -->
    {#if showIcons}
      <span class="absolute left-1.5 top-1/2 -translate-y-1/2 transition-opacity duration-150 {checked ? 'opacity-100' : 'opacity-0'}">
        <svg xmlns="http://www.w3.org/2000/svg" width={s.iconSize} height={s.iconSize} viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
      </span>
      <span class="absolute right-1.5 top-1/2 -translate-y-1/2 transition-opacity duration-150 {checked ? 'opacity-0' : 'opacity-50'}">
        <svg xmlns="http://www.w3.org/2000/svg" width={s.iconSize} height={s.iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </span>
    {/if}

    <!-- Dot -->
    <span
      class="inline-block rounded-full bg-white shadow-sm transition-transform duration-200 {classes?.dot ?? ''}"
      style="width: {s.dot}px; height: {s.dot}px; transform: translateX({checked ? s.translate : s.pad}px);"
    ></span>
  </span>

  <!-- Label + description -->
  {#if label || description}
    <div class="select-none min-w-0">
      {#if label}
        <span class="{s.text} font-medium text-[var(--karbon-text)] {classes?.label ?? ''}">{label}</span>
      {/if}
      {#if description}
        <p class="{s.desc} text-[var(--karbon-text-3)] mt-0.5 leading-relaxed">{description}</p>
      {/if}
    </div>
  {/if}
</div>
