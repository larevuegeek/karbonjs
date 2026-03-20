<script lang="ts">
  import { Breadcrumb, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { Breadcrumb } from '@karbonjs/ui-svelte'

  const items = [
    { label: 'Accueil', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: 'Mon article' },
  ]
<\/script>

<Breadcrumb {items} color="violet" separator="chevron" />
<Breadcrumb {items} variant="pills" color="blue" collapse={2} />`;

  const colors = ['red', 'emerald', 'cyan', 'blue', 'violet', 'pink'] as const;

  const basic = [
    { label: 'Accueil', href: '/' },
    { label: 'Composants', href: '/' },
    { label: 'Breadcrumb' },
  ];

  const withIcons = [
    { label: 'Accueil', href: '/', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
    { label: 'Produits', href: '/', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>' },
    { label: 'Electronique', href: '/' },
    { label: 'Casques audio' },
  ];

  const long = [
    { label: 'Accueil', href: '/' },
    { label: 'Categorie', href: '/' },
    { label: 'Sous-categorie', href: '/' },
    { label: 'Produit', href: '/' },
    { label: 'Variante', href: '/' },
    { label: 'Details', href: '/' },
    { label: 'Avis clients' },
  ];
</script>

<h1 class="text-3xl font-bold mb-2">Breadcrumb</h1>
<p class="text-[var(--karbon-text-3)] mb-10">Fil d'Ariane avec separateurs, variantes, icones, couleurs et collapse.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<!-- Separators -->
<DemoSection title="Separateurs" description="6 styles de separateur entre les elements." code={`<Breadcrumb items={items} separator="chevron" />
<Breadcrumb items={items} separator="slash" />
<Breadcrumb items={items} separator="dot" />
<Breadcrumb items={items} separator="arrow" />
<Breadcrumb items={items} separator="dash" />`}>
  {#snippet children()}
    <div class="space-y-4">
      {#each ['chevron', 'slash', 'dot', 'arrow', 'dash'] as sep}
        <div class="flex items-center gap-3">
          <span class="text-[11px] font-semibold uppercase tracking-wider w-16 shrink-0" style="color:var(--karbon-text-4);">{sep}</span>
          <Breadcrumb items={basic} separator={sep} />
        </div>
      {/each}
      <div class="flex items-center gap-3">
        <span class="text-[11px] font-semibold uppercase tracking-wider w-16 shrink-0" style="color:var(--karbon-text-4);">custom</span>
        <Breadcrumb items={basic} separator="»" />
      </div>
    </div>
  {/snippet}
</DemoSection>

<!-- Variants -->
<DemoSection title="Variants" description="3 styles visuels pour l'element actif." code={`<Breadcrumb items={items} variant="default" color="violet" />
<Breadcrumb items={items} variant="pills" color="violet" />
<Breadcrumb items={items} variant="bordered" color="violet" />`}>
  {#snippet children()}
    <div class="space-y-4">
      {#each ['default', 'pills', 'bordered'] as v}
        <div class="flex items-center gap-3">
          <span class="text-[11px] font-semibold uppercase tracking-wider w-16 shrink-0" style="color:var(--karbon-text-4);">{v}</span>
          <Breadcrumb items={basic} variant={v} color="violet" />
        </div>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Icons -->
<DemoSection title="Avec icones" description="Chaque element peut avoir une icone SVG." code={`<Breadcrumb items={[
  { label: 'Accueil', href: '/', icon: '<svg>...</svg>' },
  { label: 'Produits', href: '/' },
  { label: 'Details' },
]} color="blue" />`}>
  {#snippet children()}
    <div class="space-y-4">
      <Breadcrumb items={withIcons} color="blue" />
      <Breadcrumb items={withIcons} variant="pills" color="emerald" />
      <Breadcrumb items={withIcons} variant="bordered" color="pink" separator="arrow" />
    </div>
  {/snippet}
</DemoSection>

<!-- Colors -->
<DemoSection title="Couleurs" description="12 couleurs pour l'element actif et les hover." code={`<Breadcrumb items={items} color="red" />
<Breadcrumb items={items} color="emerald" />
<Breadcrumb items={items} color="violet" />`}>
  {#snippet children()}
    <div class="space-y-3">
      {#each colors as c}
        <div class="flex items-center gap-3">
          <span class="text-[11px] font-semibold uppercase tracking-wider w-14 shrink-0" style="color:var(--karbon-text-4);">{c}</span>
          <Breadcrumb items={basic} color={c} />
        </div>
      {/each}
    </div>

    <h3 class="text-sm font-semibold mt-6 mb-3" style="color:var(--karbon-text-2);">Couleurs x Pills</h3>
    <div class="space-y-3">
      {#each colors as c}
        <Breadcrumb items={basic} color={c} variant="pills" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Sizes -->
<DemoSection title="Tailles" description="3 tailles de texte et espacement." code={`<Breadcrumb items={items} size="sm" color="violet" />
<Breadcrumb items={items} size="md" color="violet" />
<Breadcrumb items={items} size="lg" color="violet" />`}>
  {#snippet children()}
    <div class="space-y-4">
      {#each ['sm', 'md', 'lg'] as sz}
        <div class="flex items-center gap-3">
          <span class="text-[11px] font-semibold uppercase tracking-wider w-8 shrink-0" style="color:var(--karbon-text-4);">{sz}</span>
          <Breadcrumb items={withIcons} size={sz} color="violet" />
        </div>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Collapse -->
<DemoSection title="Collapse (chemin long)" description="Collapse automatique pour les chemins profonds. Cliquez sur '...' pour expander." code={`<Breadcrumb items={longItems} collapse={2} color="violet" />
<Breadcrumb items={longItems} collapse={1} color="emerald"
  variant="pills" />`}>
  {#snippet children()}
    <div class="space-y-4">
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans collapse (7 items)</span>
        <Breadcrumb items={long} color="blue" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Collapse 2 (montre dernier 2)</span>
        <Breadcrumb items={long} collapse={2} color="violet" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Collapse 1 (montre dernier 1)</span>
        <Breadcrumb items={long} collapse={1} color="emerald" variant="pills" />
      </div>
    </div>
  {/snippet}
</DemoSection>

<!-- Use cases -->
<DemoSection title="Cas d'usage" description="Exemples concrets d'utilisation." code={`<!-- E-commerce -->
<Breadcrumb items={shopItems} color="blue" />
<!-- Administration -->
<Breadcrumb items={adminItems} color="violet" variant="pills" />
<!-- Documentation -->
<Breadcrumb items={docItems} separator="slash" size="sm" />`}>
  {#snippet children()}
    <div class="space-y-5">
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">E-commerce</span>
        <Breadcrumb items={[
          { label: 'Boutique', href: '/' },
          { label: 'Homme', href: '/' },
          { label: 'Chaussures', href: '/' },
          { label: 'Nike Air Max 90' },
        ]} color="blue" separator="chevron" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Administration</span>
        <Breadcrumb items={[
          { label: 'Dashboard', href: '/', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>' },
          { label: 'Articles', href: '/' },
          { label: 'Modifier' },
        ]} color="violet" variant="pills" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Documentation</span>
        <Breadcrumb items={[
          { label: 'Docs', href: '/' },
          { label: 'Composants', href: '/' },
          { label: 'Overlay', href: '/' },
          { label: 'Modal' },
        ]} separator="slash" size="sm" />
      </div>
    </div>
  {/snippet}
</DemoSection>
