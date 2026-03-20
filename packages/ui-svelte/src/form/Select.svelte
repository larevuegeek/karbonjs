<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { FormVariant, FormInputVariant, SelectOption, SelectClasses, ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    name: string
    options: SelectOption[]
    value?: string
    values?: string[]
    placeholder?: string
    label?: string
    error?: string
    errorIcon?: boolean
    required?: boolean
    disabled?: boolean
    multiple?: boolean
    searchable?: boolean
    clearable?: boolean
    variant?: FormVariant
    inputVariant?: FormInputVariant
    color?: ButtonColor
    classes?: SelectClasses
    class?: string
    onchange?: (value: string | string[]) => void
  }

  let {
    name,
    options,
    value = $bindable(''),
    values = $bindable([]),
    placeholder = 'Selectionner...',
    label = '',
    error = '',
    errorIcon = true,
    required = false,
    disabled = false,
    multiple = false,
    searchable = false,
    clearable = false,
    variant = 'dark',
    inputVariant = 'outlined',
    color,
    classes,
    class: className = '',
    onchange
  }: Props = $props()

  let open = $state(false)
  let focused = $state(false)
  let search = $state('')
  let triggerEl: HTMLDivElement | undefined = $state()
  let dropdownEl: HTMLDivElement | undefined = $state()

  const focusColor = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')
  const isDark = $derived(variant === 'dark')

  const filteredOptions = $derived(
    searchable && search
      ? options.filter(o => !o.disabled && o.label.toLowerCase().includes(search.toLowerCase()))
      : options
  )

  const selectedLabel = $derived(() => {
    if (multiple) {
      return values.length ? `${values.length} selectionne${values.length > 1 ? 's' : ''}` : ''
    }
    const opt = options.find(o => o.value === value)
    return opt?.label || ''
  })

  const selectedOptions = $derived(
    multiple ? options.filter(o => values.includes(o.value)) : []
  )

  function toggle() {
    if (disabled) return
    open = !open
    if (open) {
      search = ''
      focused = true
    }
  }

  function selectOption(opt: SelectOption) {
    if (opt.disabled) return
    if (multiple) {
      if (values.includes(opt.value)) {
        values = values.filter(v => v !== opt.value)
      } else {
        values = [...values, opt.value]
      }
      onchange?.(values)
    } else {
      value = opt.value
      open = false
      onchange?.(value)
    }
  }

  function removeChip(val: string) {
    values = values.filter(v => v !== val)
    onchange?.(values)
  }

  function clearAll() {
    if (multiple) {
      values = []
      onchange?.(values)
    } else {
      value = ''
      onchange?.('')
    }
  }

  function handleClickOutside(e: MouseEvent) {
    if (triggerEl && !triggerEl.contains(e.target as Node) && dropdownEl && !dropdownEl.contains(e.target as Node)) {
      open = false
      focused = false
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      open = false
      focused = false
    }
  }

  const variantClasses = $derived.by(() => {
    if (inputVariant === 'underline') return 'rounded-none bg-transparent'
    if (inputVariant === 'filled') return isDark ? 'rounded-lg bg-white/8' : 'rounded-lg bg-gray-100'
    return isDark ? 'rounded-lg border border-white/8 bg-white/3' : 'rounded-lg border border-gray-300 bg-white'
  })

  const inlineStyle = $derived.by(() => {
    let s = ''
    if (inputVariant === 'underline') {
      const bc = focused ? focusColor : error ? 'var(--karbon-danger)' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)'
      s = `border:none;border-bottom:1px solid ${bc};border-radius:0;`
    } else if (focused) {
      s = `border-color:${focusColor};box-shadow:0 0 0 3px color-mix(in srgb,${focusColor} 12%,transparent);`
    }
    return s
  })
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<div class="space-y-1.5 {classes?.root ?? ''} {className}">
  {#if label}
    <span class="{isDark ? 'text-[11px] font-medium text-gray-500 uppercase tracking-wider' : 'text-sm font-medium text-gray-700'} block mb-1.5 {classes?.label ?? ''}">{label}</span>
  {/if}

  <!-- Hidden input for form submission -->
  <input type="hidden" {name} value={multiple ? values.join(',') : value} />

  <div class="relative">
    <!-- Trigger -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      bind:this={triggerEl}
      onclick={toggle}
      class="relative w-full min-h-[42px] md:min-h-[46px] flex items-center gap-2 px-3 py-2 text-[13px] md:text-sm cursor-pointer transition-all
        {variantClasses}
        {error ? 'border-red-500/50' : ''}
        {disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}
        {classes?.select ?? ''}"
      style={inlineStyle}
    >
      <!-- Content -->
      <div class="flex-1 flex flex-wrap items-center gap-1.5 min-w-0">
        {#if multiple && selectedOptions.length > 0}
          {#each selectedOptions as opt}
            <span
              class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium transition-colors"
              style="background: color-mix(in srgb, {focusColor} 15%, transparent); color: {focusColor};"
            >
              {opt.label}
              <button
                type="button"
                onclick={(e) => { e.stopPropagation(); removeChip(opt.value) }}
                class="hover:opacity-70 cursor-pointer"
                aria-label="Retirer {opt.label}"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </span>
          {/each}
        {:else if !multiple && selectedLabel()}
          <span class="{isDark ? 'text-white' : 'text-gray-900'}">{selectedLabel()}</span>
        {:else}
          <span class="{isDark ? 'text-gray-600' : 'text-gray-400'}">{placeholder}</span>
        {/if}
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-1 shrink-0">
        {#if clearable && (value || values.length > 0)}
          <button
            type="button"
            onclick={(e) => { e.stopPropagation(); clearAll() }}
            class="{isDark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors cursor-pointer"
            aria-label="Tout effacer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        {/if}
        <svg
          xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="{isDark ? 'text-gray-600' : 'text-gray-400'} transition-transform duration-200 {open ? 'rotate-180' : ''}"
        ><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>

    <!-- Dropdown -->
    {#if open}
      <div
        bind:this={dropdownEl}
        class="absolute z-50 mt-1 w-full rounded-lg shadow-xl overflow-hidden"
        style="background: {isDark ? 'var(--karbon-bg-card, #1a1a2e)' : '#fff'}; border: 1px solid {isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};"
      >
        {#if searchable}
          <div class="p-2" style="border-bottom: 1px solid {isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};">
            <input
              type="text"
              bind:value={search}
              placeholder="Rechercher..."
              class="w-full px-2.5 py-1.5 text-xs rounded-md outline-none"
              style="background: {isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6'}; color: {isDark ? 'white' : '#111'};"
            />
          </div>
        {/if}

        <div class="max-h-60 overflow-y-auto py-1">
          {#if filteredOptions.length === 0}
            <div class="px-3 py-4 text-center text-xs {isDark ? 'text-gray-600' : 'text-gray-400'}">
              Aucun resultat
            </div>
          {:else}
            {#each filteredOptions as opt}
              {@const isSelected = multiple ? values.includes(opt.value) : value === opt.value}
              <button
                type="button"
                onclick={() => selectOption(opt)}
                disabled={opt.disabled}
                class="w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors cursor-pointer
                  {opt.disabled ? 'opacity-30 cursor-not-allowed' : ''}
                  {isSelected && !isDark ? 'bg-gray-50 font-medium' : ''}
                  {isSelected && isDark ? 'font-medium' : ''}"
                style="color: {isDark ? (isSelected ? focusColor : 'rgba(255,255,255,0.8)') : (isSelected ? focusColor : '#374151')}; background: {isSelected ? `color-mix(in srgb, ${focusColor} 8%, transparent)` : 'transparent'};"
                onmouseenter={(e) => { if (!opt.disabled) (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.05)' : '#f9fafb' }}
                onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = isSelected ? `color-mix(in srgb, ${focusColor} 8%, transparent)` : 'transparent' }}
              >
                {#if multiple}
                  <div
                    class="w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-colors"
                    style="border-color: {isSelected ? focusColor : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}; background: {isSelected ? focusColor : 'transparent'};"
                  >
                    {#if isSelected}
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {/if}
                  </div>
                {/if}
                <span class="flex-1 truncate">{opt.label}</span>
                {#if !multiple && isSelected}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {/if}
              </button>
            {/each}
          {/if}
        </div>
      </div>
    {/if}
  </div>

  {#if error}
    <p class="flex items-center gap-1.5 text-xs {isDark ? 'text-red-400' : 'text-[var(--karbon-danger)]'} {classes?.error ?? ''}">
      {#if errorIcon}
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      {/if}
      <span>{error}</span>
    </p>
  {/if}
</div>
