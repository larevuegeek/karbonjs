<script lang="ts">
  import type { Snippet } from 'svelte'
  import { CodeBlock } from '@karbonjs/ui-svelte'

  interface Props {
    title: string
    description?: string
    code?: string
    language?: string
    children: Snippet
  }

  let {
    title,
    description = '',
    code = '',
    language = 'svelte',
    children
  }: Props = $props()

  let showCode = $state(false)
</script>

<div class="rounded-xl mb-8 overflow-hidden" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <!-- Header -->
  <div class="px-6 pt-5 pb-1">
    <h2 class="text-lg font-semibold" style="color:var(--karbon-text);">{title}</h2>
    {#if description}
      <p class="text-xs mt-0.5" style="color:var(--karbon-text-3);">{description}</p>
    {/if}
  </div>

  <!-- Demo content -->
  <div class="px-6 py-4">
    {@render children()}
  </div>

  <!-- Code toggle -->
  {#if code}
    <div style="border-top:1px solid var(--karbon-border);">
      <button
        type="button"
        onclick={() => showCode = !showCode}
        class="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium cursor-pointer transition-colors"
        style="color:var(--karbon-text-3);background:{showCode ? 'var(--karbon-bg-card)' : 'transparent'};"
        onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-2)' }}
        onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--karbon-text-3)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        {showCode ? 'Masquer le code' : 'Afficher le code'}
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.2s;{showCode ? 'transform:rotate(180deg);' : ''}"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      {#if showCode}
        <div style="animation:karbon-code-slide 0.2s ease;">
          <CodeBlock {code} {language} showLanguage={false} lineCopy variant="minimal" />
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  @keyframes karbon-code-slide {
    from { opacity: 0; max-height: 0; }
    to { opacity: 1; max-height: 600px; }
  }
</style>
