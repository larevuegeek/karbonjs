<script lang="ts">
  import type { RadioOption, RadioDirection } from '@karbonjs/ui-core'

  interface Props {
    name: string
    options: RadioOption[]
    value?: string
    label?: string
    direction?: RadioDirection
    disabled?: boolean
    class?: string
    onchange?: (e: Event) => void
  }

  let {
    name,
    options,
    value = $bindable(''),
    label = '',
    direction = 'column',
    disabled = false,
    class: className = '',
    onchange
  }: Props = $props()
</script>

<fieldset class={className} {disabled}>
  {#if label}
    <legend class="text-sm font-medium text-[var(--karbon-text,#1a1635)] mb-2">{label}</legend>
  {/if}

  <div class="{direction === 'row' ? 'flex flex-wrap items-center gap-4' : 'flex flex-col gap-2.5'}">
    {#each options as opt}
      <label class="inline-flex items-start gap-2.5 {opt.disabled || disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}">
        <input
          type="radio"
          {name}
          value={opt.value}
          checked={value === opt.value}
          disabled={opt.disabled || disabled}
          {onchange}
          onchange={() => value = opt.value}
          class="mt-0.5 h-4 w-4 shrink-0 border-[var(--karbon-border-input,rgba(255,255,255,0.10))] bg-[var(--karbon-bg-input,rgba(255,255,255,0.06))] text-[var(--karbon-primary)] focus:ring-2 focus:ring-[var(--karbon-primary)]/20 focus:ring-offset-0 transition-colors cursor-pointer disabled:cursor-not-allowed"
        />
        <div class="select-none">
          <span class="text-sm font-medium text-[var(--karbon-text,#1a1635)]">{opt.label}</span>
          {#if opt.description}
            <p class="text-xs text-[var(--karbon-text-3,#8e8aae)] mt-0.5">{opt.description}</p>
          {/if}
        </div>
      </label>
    {/each}
  </div>
</fieldset>
