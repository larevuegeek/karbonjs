<script lang="ts">
  import { Card, Button, Badge } from '@karbonjs/ui-svelte';

  const variants = ['default', 'elevated', 'outlined', 'ghost'] as const;
</script>

<h1 class="text-3xl font-bold mb-2">Card</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Cartes avec variants, titres, padding et hover effects.</p>

<!-- Variants -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Variants</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each variants as variant}
      <Card {variant}>
        {#snippet children()}
          <h3 class="font-semibold text-sm text-[var(--karbon-text)] mb-1 capitalize">{variant}</h3>
          <p class="text-xs text-[var(--karbon-text-3)]">Card avec variant "{variant}".</p>
        {/snippet}
      </Card>
    {/each}
  </div>
</section>

<!-- With title -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">With Title</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card title="Parametres">
      {#snippet children()}
        <p class="text-sm text-[var(--karbon-text-2)]">Modifiez vos parametres de compte.</p>
      {/snippet}
    </Card>
    <Card title="Statistiques">
      {#snippet children()}
        <p class="text-sm text-[var(--karbon-text-2)]">Consultez vos statistiques.</p>
      {/snippet}
    </Card>
  </div>
</section>

<!-- noPadding -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">noPadding</h2>
  <Card noPadding title="Image card">
    {#snippet children()}
      <img src="https://picsum.photos/seed/karbon6/800/300" alt="Card image" class="w-full h-48 object-cover" loading="lazy" />
      <div class="p-5">
        <h3 class="font-semibold text-sm text-[var(--karbon-text)]">Article avec image</h3>
        <p class="text-xs text-[var(--karbon-text-3)] mt-1">Le padding est retire du body, permettant une image pleine largeur.</p>
      </div>
    {/snippet}
  </Card>
</section>

<!-- Hoverable -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Hoverable</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each ['default', 'elevated', 'outlined'] as variant}
      <Card {variant} hoverable>
        {#snippet children()}
          <h3 class="font-semibold text-sm text-[var(--karbon-text)] capitalize mb-1">{variant}</h3>
          <p class="text-xs text-[var(--karbon-text-3)]">Survolez pour voir l'effet.</p>
        {/snippet}
      </Card>
    {/each}
  </div>
</section>

<!-- With header and footer snippets -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">With Header & Footer</h2>
  <div class="max-w-md">
    <Card>
      {#snippet header()}
        <div class="flex items-center justify-between">
          <span class="font-semibold text-sm text-[var(--karbon-text)]">Projet Alpha</span>
          <Badge variant="soft" color="emerald">
            {#snippet children()}Actif{/snippet}
          </Badge>
        </div>
      {/snippet}
      {#snippet children()}
        <p class="text-sm text-[var(--karbon-text-2)]">Description du projet avec des details supplementaires. Ce projet est en cours de developpement.</p>
      {/snippet}
      {#snippet footer()}
        <div class="flex items-center justify-between">
          <span class="text-xs text-[var(--karbon-text-4)]">Mis a jour il y a 2 jours</span>
          <Button size="sm" variant="flat" color="blue">Voir</Button>
        </div>
      {/snippet}
    </Card>
  </div>
</section>

<!-- Padding variants -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Padding Sizes</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each ['sm', 'md', 'lg'] as padding}
      <Card {padding}>
        {#snippet children()}
          <h3 class="font-semibold text-sm text-[var(--karbon-text)] mb-1">Padding: {padding}</h3>
          <p class="text-xs text-[var(--karbon-text-3)]">Contenu avec padding "{padding}".</p>
        {/snippet}
      </Card>
    {/each}
  </div>
</section>
