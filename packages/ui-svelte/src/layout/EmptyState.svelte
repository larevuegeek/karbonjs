<script lang="ts">
  interface Props {
    title: string
    description?: string
    icon?: any
  }

  let {
    title,
    description = '',
    icon: Icon
  }: Props = $props()
</script>

<div class="text-center py-12 px-6">
  {#if Icon}
    <div class="w-14 h-14 rounded-2xl bg-[var(--karbon-nav-hover-bg,rgba(0,0,0,0.04))] text-[var(--karbon-text-4,#b5b2cc)] flex items-center justify-center mx-auto mb-4">
      <Icon class="w-8 h-8" />
    </div>
  {/if}
  <p class="text-[var(--karbon-text-2,#5a567e)] font-semibold text-[0.95rem] m-0">{title}</p>
  {#if description}
    <p class="text-[var(--karbon-text-3,#8e8aae)] text-[0.8rem] mt-1.5 mx-auto max-w-[22rem]">{description}</p>
  {/if}
</div>
