<script lang="ts">
  interface Props {
    keys: string[]
    class?: string
    classes?: { root?: string, key?: string }
  }

  let { keys, class: className = '', classes = {} }: Props = $props()
</script>

<span class="inline-flex items-center gap-1 {classes?.root ?? className}">
  {#each keys as key, i}
    {#if i > 0}
      <span class="text-[var(--karbon-text-4,#b5b2cc)] text-xs">+</span>
    {/if}
    <kbd class="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-md border border-[var(--karbon-border,rgba(0,0,0,0.07))] bg-[var(--karbon-bg-2,#e8e6f0)] text-[var(--karbon-text-2,#5a567e)] text-[11px] font-mono font-medium shadow-sm {classes?.key ?? ''}">
      {key}
    </kbd>
  {/each}
</span>
