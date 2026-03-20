<script lang="ts">
  import type { ColorPickerClasses, ButtonColor } from '@karbonjs/ui-core'

  const defaultPresets = [
    '#cc1a1a', '#ef4444', '#f59e0b', '#22c55e', '#10b981',
    '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899',
    '#f43f5e', '#14b8a6', '#000000', '#6b7280', '#ffffff'
  ]

  interface Props {
    name: string
    value?: string
    label?: string
    presets?: string[]
    disabled?: boolean
    color?: ButtonColor
    classes?: ColorPickerClasses
    class?: string
    onchange?: (e: Event) => void
  }

  let {
    name,
    value = $bindable('#cc1a1a'),
    label = '',
    presets = defaultPresets,
    disabled = false,
    color,
    classes,
    class: className = '',
    onchange
  }: Props = $props()

  let showPicker = $state(false)
  let hexFocused = $state(false)

  const focusColor = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')
</script>

<svelte:window onclick={() => showPicker = false} />

<div class="space-y-1.5 {classes?.root ?? ''} {className}">
  {#if label}
    <label for={name} class="text-sm font-medium text-[var(--karbon-text,#1a1635)] block mb-1.5 {classes?.label ?? ''}">{label}</label>
  {/if}

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="relative" onclick={(e) => e.stopPropagation()}>
    <button
      type="button"
      onclick={() => { if (!disabled) showPicker = !showPicker }}
      class="flex items-center gap-2.5 rounded-lg border border-[var(--karbon-border,rgba(0,0,0,0.07))] px-3 py-2 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))] {classes?.trigger ?? ''}"
      {disabled}
    >
      <span
        class="w-6 h-6 rounded-md border border-[var(--karbon-border,rgba(0,0,0,0.07))] shrink-0"
        style="background: {value}"
      ></span>
      <span class="text-sm font-mono text-[var(--karbon-text-2,#5a567e)]">{value}</span>
    </button>

    <input type="hidden" {name} bind:value {onchange} />

    {#if showPicker}
      <div class="absolute z-50 mt-1 w-64 rounded-xl border border-[var(--karbon-border,rgba(0,0,0,0.07))] shadow-xl p-4 bg-[var(--karbon-bg-card,#fff)] {classes?.dropdown ?? ''}">
        <!-- Native color input -->
        <div class="mb-3">
          <input
            type="color"
            bind:value
            class="w-full h-10 rounded-lg cursor-pointer border-0 p-0"
          />
        </div>

        <!-- Hex input -->
        <div class="mb-3">
          <input
            type="text"
            bind:value
            maxlength="7"
            onfocus={() => hexFocused = true}
            onblur={() => hexFocused = false}
            class="w-full rounded-lg border border-[var(--karbon-border,rgba(0,0,0,0.07))] px-3 py-1.5 text-sm font-mono text-center focus:outline-none bg-[var(--karbon-bg-input,rgba(255,255,255,0.06))] text-[var(--karbon-text,#1a1635)] {classes?.hexInput ?? ''}"
            style={hexFocused ? `border-color: ${focusColor}; box-shadow: 0 0 0 3px color-mix(in srgb, ${focusColor} 12%, transparent);` : ''}
          />
        </div>

        <!-- Presets -->
        {#if presets.length > 0}
          <div class="grid grid-cols-5 gap-1.5">
            {#each presets as presetColor}
              <button
                type="button"
                onclick={() => value = presetColor}
                class="w-full aspect-square rounded-lg border transition-transform cursor-pointer hover:scale-110
                  {value === presetColor ? 'scale-110' : 'border-[var(--karbon-border,rgba(0,0,0,0.07))]'}"
                style={value === presetColor ? `border-color: ${focusColor}; box-shadow: 0 0 0 2px color-mix(in srgb, ${focusColor} 20%, transparent); background: ${presetColor}` : `background: ${presetColor}`}
                aria-label={presetColor}
              ></button>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
