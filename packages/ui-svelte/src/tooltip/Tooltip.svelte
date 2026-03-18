<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { TooltipPosition } from '@karbonjs/ui-core'

  interface Props {
    text: string
    position?: TooltipPosition
    class?: string
    children: Snippet
  }

  let {
    text,
    position = 'top',
    class: className = '',
    children
  }: Props = $props()

  let visible = $state(false)

  const posClasses: Record<string, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }
</script>

<div
  role="group"
  class="relative inline-block {className}"
  onmouseenter={() => visible = true}
  onmouseleave={() => visible = false}
  onfocusin={() => visible = true}
  onfocusout={() => visible = false}
>
  {@render children()}

  {#if visible}
    <div
      class="absolute z-50 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none
        bg-[var(--karbon-text,#1a1635)] text-white shadow-lg
        {posClasses[position]}"
      role="tooltip"
    >
      {text}
    </div>
  {/if}
</div>
