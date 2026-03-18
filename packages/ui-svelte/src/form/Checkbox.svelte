<script lang="ts">
  interface Props {
    name: string
    checked?: boolean
    indeterminate?: boolean
    label?: string
    description?: string
    disabled?: boolean
    class?: string
    onchange?: (e: Event) => void
  }

  let {
    name,
    checked = $bindable(false),
    indeterminate = false,
    label = '',
    description = '',
    disabled = false,
    class: className = '',
    onchange
  }: Props = $props()

  let inputEl: HTMLInputElement

  $effect(() => {
    if (inputEl) inputEl.indeterminate = indeterminate
  })
</script>

<label class="inline-flex items-start gap-3 {disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} {className}">
  <input
    bind:this={inputEl}
    type="checkbox"
    {name}
    bind:checked
    {disabled}
    {onchange}
    class="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--karbon-border-input,rgba(255,255,255,0.10))] bg-[var(--karbon-bg-input,rgba(255,255,255,0.06))] text-[var(--karbon-primary)] focus:ring-2 focus:ring-[var(--karbon-primary)]/20 focus:ring-offset-0 transition-colors cursor-pointer disabled:cursor-not-allowed"
  />
  {#if label || description}
    <div class="select-none">
      {#if label}
        <span class="text-sm font-medium text-[var(--karbon-text,#1a1635)]">{label}</span>
      {/if}
      {#if description}
        <p class="text-xs text-[var(--karbon-text-3,#8e8aae)] mt-0.5">{description}</p>
      {/if}
    </div>
  {/if}
</label>
