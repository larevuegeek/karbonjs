<script lang="ts">
  interface Props {
    title: string
    description?: string
    icon?: any
    iconColor?: string
  }

  let {
    title,
    description = '',
    icon: Icon,
    iconColor = 'var(--karbon-primary, #cc1a1a)'
  }: Props = $props()
</script>

<div class="flex items-start gap-3 pb-4 border-b border-[var(--karbon-border,rgba(0,0,0,0.07))] mb-1">
  {#if Icon}
    <Icon class="w-5 h-5 shrink-0" style="color: {iconColor}" />
  {/if}
  <div>
    <h1 class="text-[var(--karbon-text,#1a1635)] text-[1.1rem] font-bold m-0">{title}</h1>
    {#if description}
      <p class="text-[var(--karbon-text-3,#8e8aae)] text-[0.8rem] mt-0.5">{description}</p>
    {/if}
  </div>
</div>
