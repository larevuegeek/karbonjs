<script lang="ts">
  import type { RadioOption, RadioDirection, RadioClasses, ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    name: string
    options: RadioOption[]
    value?: string
    label?: string
    direction?: RadioDirection
    disabled?: boolean
    color?: ButtonColor
    size?: 'sm' | 'md' | 'lg'
    variant?: 'filled' | 'outlined' | 'ghost' | 'elegant'
    classes?: RadioClasses
    class?: string
    onchange?: (value: string) => void
  }

  let {
    name,
    options,
    value = $bindable(''),
    label = '',
    direction = 'column',
    disabled = false,
    color,
    size = 'md',
    variant = 'filled',
    classes,
    class: className = '',
    onchange
  }: Props = $props()

  const accentColor = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')

  const sizeMap = {
    sm: { box: 16, dot: 8, text: 'text-xs', desc: 'text-[11px]', gap: 'gap-2' },
    md: { box: 20, dot: 11, text: 'text-sm', desc: 'text-xs', gap: 'gap-2.5' },
    lg: { box: 24, dot: 13, text: 'text-base', desc: 'text-sm', gap: 'gap-3' },
  }
  const s = $derived(sizeMap[size])

  function boxStyle(selected: boolean): string {
    switch (variant) {
      case 'filled':
        return `background:${selected ? accentColor : 'var(--karbon-bg-input,rgba(255,255,255,0.06))'};border:${selected ? 'none' : '1.5px solid var(--karbon-border-input,rgba(255,255,255,0.12))'};box-shadow:${selected ? `0 0 0 2px color-mix(in srgb,${accentColor} 20%,transparent)` : 'none'};`
      case 'outlined':
        return `background:transparent;border:2px solid ${selected ? accentColor : 'var(--karbon-border-input,rgba(255,255,255,0.12))'};`
      case 'ghost':
        return `background:transparent;border:none;`
      case 'elegant':
        return `background:${selected ? `color-mix(in srgb,${accentColor} 12%,transparent)` : 'transparent'};border:1.5px solid ${selected ? accentColor : 'var(--karbon-border-input,rgba(255,255,255,0.12))'};box-shadow:${selected ? `0 0 8px color-mix(in srgb,${accentColor} 15%,transparent)` : 'none'};`
      default: return ''
    }
  }

  function dotColor(selected: boolean): string {
    switch (variant) {
      case 'filled': return 'white'
      case 'outlined': return accentColor
      case 'ghost': return selected ? accentColor : 'var(--karbon-text-4)'
      case 'elegant': return accentColor
      default: return 'white'
    }
  }

  function select(val: string) {
    if (disabled) return
    value = val
    onchange?.(val)
  }
</script>

<fieldset class="{classes?.root ?? ''} {className}" {disabled}>
  {#if label}
    <legend class="{s.text} font-medium text-[var(--karbon-text)] mb-2 {classes?.legend ?? ''}">{label}</legend>
  {/if}

  <div class="{direction === 'row' ? 'flex flex-wrap items-center gap-4' : 'flex flex-col gap-2.5'}">
    {#each options as opt}
      {@const selected = value === opt.value}
      {@const isDisabled = opt.disabled || disabled}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="inline-flex items-center {s.gap} {isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}"
        onclick={() => { if (!isDisabled) select(opt.value) }}
        onkeydown={(e) => { if (!isDisabled && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); select(opt.value) } }}
        role="radio"
        aria-checked={selected}
        aria-disabled={isDisabled}
        tabindex={isDisabled ? -1 : 0}
      >
        <!-- Custom radio circle -->
        <div
          class="shrink-0 rounded-full transition-all duration-150"
          style="width:{s.box}px;height:{s.box}px;display:grid;place-items:center;box-sizing:border-box;{boxStyle(selected)}"
        >
          {#if selected}
            <div
              class="rounded-full"
              style="width:{s.dot}px;height:{s.dot}px;background:{dotColor(selected)};"
            ></div>
          {:else if variant === 'ghost'}
            <div
              class="rounded-full"
              style="width:{s.dot}px;height:{s.dot}px;background:var(--karbon-border-input,rgba(255,255,255,0.12));"
            ></div>
          {/if}
        </div>

        <!-- Label + description -->
        <div class="select-none min-w-0">
          <span class="{s.text} font-medium text-[var(--karbon-text)] {classes?.label ?? ''}">{opt.label}</span>
          {#if opt.description}
            <p class="{s.desc} text-[var(--karbon-text-3)] mt-0.5 leading-relaxed {classes?.description ?? ''}">{opt.description}</p>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</fieldset>
