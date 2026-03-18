<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    class?: string
    children: Snippet
  }

  let { class: className = '', children }: Props = $props()
</script>

<div class="overflow-hidden rounded-xl bg-[var(--karbon-bg-card,#fff)] border border-[var(--karbon-border,rgba(0,0,0,0.07))] {className}">
  <div class="overflow-x-auto">
    <table class="min-w-full [&_thead_tr]:bg-[var(--karbon-bg-2,#e8e6f0)] [&_thead_tr]:border-b [&_thead_tr]:border-[var(--karbon-border,rgba(0,0,0,0.07))] [&_thead_th]:text-[var(--karbon-text-3,#8e8aae)] [&_thead_th]:text-xs [&_thead_th]:font-semibold [&_thead_th]:uppercase [&_thead_th]:tracking-wider [&_thead_th]:px-4 [&_thead_th]:py-3 [&_thead_th]:text-left [&_tbody_tr]:border-b [&_tbody_tr]:border-[var(--karbon-border,rgba(0,0,0,0.07))] [&_tbody_tr]:transition-colors [&_tbody_tr]:duration-150 [&_tbody_tr:last-child]:border-b-0 [&_tbody_tr:hover]:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))] [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:text-[var(--karbon-text-2,#5a567e)]">
      {@render children()}
    </table>
  </div>
</div>
