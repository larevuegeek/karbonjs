<script lang="ts">
  interface Props {
    page: number
    total: number
    perPage: number
    baseUrl: string
  }

  let { page, total, perPage, baseUrl }: Props = $props()

  const totalPages = $derived(Math.ceil(total / perPage))
  const pages = $derived((() => {
    const p: number[] = []
    const start = Math.max(1, page - 2)
    const end = Math.min(totalPages, page + 2)
    for (let i = start; i <= end; i++) p.push(i)
    return p
  })())
</script>

{#if totalPages > 1}
  <nav class="flex items-center gap-1">
    {#if page > 1}
      <a href="{baseUrl}?page={page - 1}" aria-label="Page précédente" class="rounded-lg p-2 transition-colors text-[var(--karbon-text-3,#8e8aae)] hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))] hover:text-[var(--karbon-text,#1a1635)]">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </a>
    {/if}

    {#each pages as p}
      {#if p === page}
        <span class="rounded-lg bg-[var(--karbon-primary)] px-3 py-1.5 text-sm font-medium text-white">{p}</span>
      {:else}
        <a href="{baseUrl}?page={p}" class="rounded-lg px-3 py-1.5 text-sm transition-colors text-[var(--karbon-text-2,#5a567e)] hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))] hover:text-[var(--karbon-text,#1a1635)]">{p}</a>
      {/if}
    {/each}

    {#if page < totalPages}
      <a href="{baseUrl}?page={page + 1}" aria-label="Page suivante" class="rounded-lg p-2 transition-colors text-[var(--karbon-text-3,#8e8aae)] hover:bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))] hover:text-[var(--karbon-text,#1a1635)]">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </a>
    {/if}

    <span class="ml-2 text-sm text-[var(--karbon-text-4,#b5b2cc)]">{total} résultats</span>
  </nav>
{/if}
