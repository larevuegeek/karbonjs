<script lang="ts">
  import type { FormVariant, DatePickerClasses, ButtonColor } from '@karbonjs/ui-core'

  interface Props {
    name: string
    value?: string
    label?: string
    error?: string
    placeholder?: string
    min?: string
    max?: string
    required?: boolean
    disabled?: boolean
    variant?: FormVariant
    color?: ButtonColor
    classes?: DatePickerClasses
    class?: string
    onchange?: (e: Event) => void
  }

  let {
    name,
    value = $bindable(''),
    label = '',
    error = '',
    placeholder = '',
    min = '',
    max = '',
    required = false,
    disabled = false,
    variant = 'dark',
    color,
    classes,
    class: className = '',
    onchange
  }: Props = $props()

  let showCalendar = $state(false)
  let focused = $state(false)

  const focusColor = $derived(color ? `var(--karbon-${color}-500)` : 'var(--karbon-primary)')

  const themes = {
    dark: {
      label: 'text-[11px] font-medium text-gray-500 uppercase tracking-wider',
      input: 'border-white/8 bg-white/3 text-white',
      error: 'text-red-400',
      calendar: 'bg-[var(--karbon-bg-card,#0a0820)] border-white/10 text-white',
      dayHover: 'hover:bg-white/10',
      dayOther: 'text-gray-600'
    },
    light: {
      label: 'text-sm font-medium text-gray-700',
      input: 'border-gray-300 bg-white text-gray-900',
      error: 'text-[var(--karbon-danger)]',
      calendar: 'bg-white border-gray-200 text-gray-900',
      dayHover: 'hover:bg-gray-100',
      dayOther: 'text-gray-300'
    }
  } as const

  const theme = $derived(themes[variant])

  // Calendar state
  const selectedDate = $derived(value ? new Date(value + 'T00:00:00') : null)
  let viewYear = $state(new Date().getFullYear())
  let viewMonth = $state(new Date().getMonth())

  $effect(() => {
    if (selectedDate) {
      viewYear = selectedDate.getFullYear()
      viewMonth = selectedDate.getMonth()
    }
  })

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  const dayNames = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']

  const calendarDays = $derived((() => {
    const first = new Date(viewYear, viewMonth, 1)
    const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate()
    let startDay = first.getDay() - 1
    if (startDay < 0) startDay = 6

    const days: { date: number; month: number; year: number; current: boolean }[] = []

    // Previous month padding
    const prevLastDay = new Date(viewYear, viewMonth, 0).getDate()
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({ date: prevLastDay - i, month: viewMonth - 1, year: viewYear, current: false })
    }

    // Current month
    for (let i = 1; i <= lastDay; i++) {
      days.push({ date: i, month: viewMonth, year: viewYear, current: true })
    }

    // Next month padding
    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: i, month: viewMonth + 1, year: viewYear, current: false })
    }

    return days
  })())

  function prevMonth() {
    if (viewMonth === 0) { viewMonth = 11; viewYear-- }
    else viewMonth--
  }

  function nextMonth() {
    if (viewMonth === 11) { viewMonth = 0; viewYear++ }
    else viewMonth++
  }

  function selectDay(day: { date: number; month: number; year: number }) {
    const m = day.month < 0 ? 11 : day.month > 11 ? 0 : day.month
    const y = day.month < 0 ? day.year - 1 : day.month > 11 ? day.year + 1 : day.year
    const d = String(day.date).padStart(2, '0')
    const mo = String(m + 1).padStart(2, '0')
    value = `${y}-${mo}-${d}`
    showCalendar = false
  }

  function isSelected(day: { date: number; month: number; year: number }) {
    if (!selectedDate) return false
    const m = day.month < 0 ? 11 : day.month > 11 ? 0 : day.month
    return selectedDate.getDate() === day.date && selectedDate.getMonth() === m && selectedDate.getFullYear() === day.year
  }

  function isToday(day: { date: number; month: number; year: number; current: boolean }) {
    if (!day.current) return false
    const now = new Date()
    return day.date === now.getDate() && viewMonth === now.getMonth() && viewYear === now.getFullYear()
  }

  function formatDisplay(val: string): string {
    if (!val) return ''
    const d = new Date(val + 'T00:00:00')
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
  }
</script>

<svelte:window onclick={() => showCalendar = false} />

<div class="space-y-1.5 {classes?.root ?? ''} {className}">
  {#if label}
    <label for={name} class="{theme.label} block mb-1.5 {classes?.label ?? ''}">{label}</label>
  {/if}

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="relative" onclick={(e) => e.stopPropagation()}>
    <button
      type="button"
      onclick={() => { if (!disabled) showCalendar = !showCalendar }}
      onfocus={() => focused = true}
      onblur={() => focused = false}
      class="w-full rounded-lg border px-3 py-2.5 md:py-3 text-[13px] md:text-sm text-left focus:outline-none transition-all {theme.input} {error ? 'border-red-500/50' : ''} {!value ? 'text-gray-500' : ''} cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed {classes?.trigger ?? ''}"
      style={focused ? `border-color: ${focusColor}; box-shadow: 0 0 0 3px color-mix(in srgb, ${focusColor} 12%, transparent);` : ''}
      {disabled}
    >
      {value ? formatDisplay(value) : placeholder || 'Sélectionner une date'}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
    </button>

    <input type="hidden" {name} bind:value {required} {onchange} />

    {#if showCalendar}
      <div class="absolute z-50 mt-1 w-72 rounded-xl border shadow-xl p-3 {theme.calendar} {classes?.calendar ?? ''}">
        <!-- Header -->
        <div class="flex items-center justify-between mb-3">
          <button type="button" onclick={prevMonth} aria-label="Mois précédent" class="p-1 rounded-lg {theme.dayHover} cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <span class="text-sm font-semibold">{monthNames[viewMonth]} {viewYear}</span>
          <button type="button" onclick={nextMonth} aria-label="Mois suivant" class="p-1 rounded-lg {theme.dayHover} cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <!-- Day names -->
        <div class="grid grid-cols-7 mb-1">
          {#each dayNames as d}
            <div class="text-center text-[10px] font-medium text-[var(--karbon-text-4,#b5b2cc)] py-1">{d}</div>
          {/each}
        </div>

        <!-- Days grid -->
        <div class="grid grid-cols-7">
          {#each calendarDays as day}
            <button
              type="button"
              onclick={() => selectDay(day)}
              class="h-8 w-full rounded-lg text-xs font-medium transition-colors cursor-pointer
                {isToday(day) && !isSelected(day) ? 'ring-1' : ''}
                {!day.current ? theme.dayOther : ''}
                {!isSelected(day) ? theme.dayHover : ''}"
              style={isSelected(day) ? `background-color: ${focusColor}; color: white;` : isToday(day) ? `--tw-ring-color: ${focusColor};` : ''}
            >
              {day.date}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  {#if error}
    <p class="text-xs {theme.error} {classes?.error ?? ''}">{error}</p>
  {/if}
</div>
