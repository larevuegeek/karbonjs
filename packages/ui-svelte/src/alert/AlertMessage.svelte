<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { AlertType } from '@karbonjs/ui-core'

  interface Props {
    type?: AlertType
    message?: string
    class?: string
    children?: Snippet
  }

  let {
    type = 'error',
    message = '',
    class: className = '',
    children
  }: Props = $props()

  const variants: Record<string, string> = {
    error: 'bg-red-500/8 border border-red-500/20 text-red-400',
    success: 'bg-green-500/8 border border-green-500/20 text-green-400',
    warning: 'bg-amber-500/8 border border-amber-500/20 text-amber-300',
    info: 'bg-blue-500/8 border border-blue-500/20 text-blue-400'
  }
</script>

{#if message || children}
  <div class="flex items-center gap-2.5 px-4 py-3 rounded-[0.625rem] text-[0.825rem] font-medium {variants[type]} {className}">
    {#if type === 'error'}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
    {:else if type === 'success'}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
    {:else if type === 'warning'}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    {/if}
    {#if children}
      {@render children()}
    {:else}
      <span>{message}</span>
    {/if}
  </div>
{/if}
