<script lang="ts">
  import { Button, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `import { Button } from '@karbonjs/ui-svelte'

<Button>Click me</Button>
<Button variant="flat" color="violet">Flat</Button>
<Button variant="bordered" shape="pill" size="lg">Large Pill</Button>
<Button color="red" variant="shadow">Delete</Button>
<Button arrow>Discover →</Button>
<Button loading loadingText="Loading...">Submit</Button>`;

  const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'emerald', 'cyan', 'blue', 'violet', 'pink', 'slate', 'zinc'] as const;
  const variants = ['solid', 'flat', 'bordered', 'outline', 'light', 'ghost', 'shadow'] as const;
  const shapes = ['sharp', 'soft', 'rounded', 'pill'] as const;
  const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;
</script>

<h1 class="text-3xl font-bold mb-2">Button</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Boutons interactifs avec variants, couleurs, formes et tailles.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Variants" description="7 styles visuels." code={`<Button variant="solid">Solid</Button>
<Button variant="flat">Flat</Button>
<Button variant="bordered">Bordered</Button>
<Button variant="outline">Outline</Button>
<Button variant="light">Light</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="shadow">Shadow</Button>`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-3">
      {#each variants as variant}
        <Button {variant}>{variant}</Button>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Variants × Colors -->
{#each variants as variant}
  <section class="mb-8">
    <h2 class="text-lg font-semibold mb-3 capitalize">{variant} × Colors</h2>
    <div class="flex flex-wrap gap-2">
      {#each colors as color}
        <Button {color} {variant}>{color}</Button>
      {/each}
    </div>
  </section>
{/each}

<DemoSection title="Shapes" description="5 formes de bouton : sharp, soft, rounded, pill, circle." code={`<Button shape="sharp">Sharp</Button>
<Button shape="soft">Soft</Button>
<Button shape="rounded">Rounded</Button>
<Button shape="pill">Pill</Button>
<Button shape="circle" size="md" color="violet">A</Button>`}>
  {#snippet children()}
    {#each shapes as shape}
      <div class="mb-4">
        <h3 class="text-sm font-semibold mb-2 capitalize" style="color:var(--karbon-text-2);">{shape}</h3>
        <div class="flex flex-wrap gap-2 mb-2">
          {#each colors as color}
            <Button {color} {shape}>{color}</Button>
          {/each}
        </div>
        <div class="flex flex-wrap gap-2">
          {#each colors as color}
            <Button {color} {shape} variant="bordered">{color}</Button>
          {/each}
        </div>
      </div>
    {/each}
    <h3 class="text-sm font-semibold mb-2" style="color:var(--karbon-text-2);">Circle</h3>
    <div class="flex flex-wrap gap-3 items-center">
      <Button shape="circle" size="sm" color="violet">A</Button>
      <Button shape="circle" size="md" color="emerald">+</Button>
      <Button shape="circle" size="lg" color="blue">K</Button>
      <Button shape="circle" size="xl" color="red">X</Button>
      <Button shape="circle" size="md" variant="bordered" color="cyan">?</Button>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Sizes" description="8 tailles de 2xs a 3xl." code={`<Button size="2xs">2XS</Button>
<Button size="xs">XS</Button>
<Button size="sm">SM</Button>
<Button size="md">MD</Button>
<Button size="lg">LG</Button>
<Button size="xl">XL</Button>
<Button size="2xl">2XL</Button>
<Button size="3xl">3XL</Button>`}>
  {#snippet children()}
    <div class="flex flex-wrap items-end gap-3">
      {#each sizes as size}
        <div class="flex flex-col items-center gap-1">
          <Button {size}>{size}</Button>
          <span class="text-[10px]" style="color:var(--karbon-text-4);">{size}</span>
        </div>
      {/each}
    </div>
    <div class="flex flex-wrap items-end gap-3 mt-4">
      {#each sizes as size}
        <Button {size} shape="pill" color="violet">{size}</Button>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="States" description="Loading et disabled." code={`<Button loading loadingText="Chargement...">Submit</Button>
<Button disabled>Disabled</Button>`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-3">
      <Button loading loadingText="Chargement...">Loading</Button>
      <Button disabled>Disabled</Button>
      <Button loading variant="bordered" color="violet">Loading</Button>
      <Button disabled variant="flat" color="emerald">Disabled</Button>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Arrow Effect" description="Effet fleche au survol." code={`<Button arrow>Decouvrir</Button>
<Button arrow color="emerald">Commencer</Button>
<Button arrow color="violet" variant="bordered">En savoir plus</Button>`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-3">
      <Button arrow>Decouvrir</Button>
      <Button arrow color="emerald">Commencer</Button>
      <Button arrow color="violet" variant="bordered">En savoir plus</Button>
      <Button arrow color="cyan" variant="flat">Explorer</Button>
      <Button arrow color="blue" variant="shadow">Lancer</Button>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Full Width" description="Bouton pleine largeur." code={`<Button fullWidth>Solid</Button>
<Button fullWidth variant="bordered" color="violet">Bordered</Button>`}>
  {#snippet children()}
    <div class="space-y-3 max-w-md">
      <Button fullWidth>Solid</Button>
      <Button fullWidth variant="bordered" color="violet">Bordered</Button>
      <Button fullWidth variant="shadow" color="blue">Shadow</Button>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Danger" description="Utilisez color='red' pour les actions destructives." code={`<Button color="red">Supprimer</Button>
<Button color="red" variant="flat">Retirer</Button>
<Button color="red" variant="bordered">Revoquer</Button>
<Button color="red" variant="shadow">Confirmer</Button>`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-3">
      <Button color="red">Supprimer</Button>
      <Button color="red" variant="flat">Supprimer</Button>
      <Button color="red" variant="bordered">Supprimer</Button>
      <Button color="red" variant="light">Supprimer</Button>
      <Button color="red" variant="ghost">Supprimer</Button>
      <Button color="red" variant="shadow">Supprimer</Button>
    </div>
  {/snippet}
</DemoSection>

<!-- Use cases -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Cas d'usage</h2>

  <h3 class="text-sm font-semibold mb-3 text-[var(--karbon-text-3)] uppercase tracking-wider">Actions principales</h3>
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <Button color="emerald" shape="pill" variant="shadow">Publier</Button>
    <Button variant="outline">Enregistrer brouillon</Button>
    <Button variant="ghost" size="sm">Annuler</Button>
  </div>

  <h3 class="text-sm font-semibold mb-3 text-[var(--karbon-text-3)] uppercase tracking-wider">Zone danger</h3>
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <Button color="red">Supprimer le compte</Button>
    <Button color="red" variant="flat">Retirer</Button>
    <Button color="red" variant="outline" size="sm">Revoquer</Button>
  </div>

  <h3 class="text-sm font-semibold mb-3 text-[var(--karbon-text-3)] uppercase tracking-wider">CTA Marketing</h3>
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <Button color="violet" shape="pill" variant="shadow" size="xl" arrow>Commencer gratuitement</Button>
    <Button color="blue" shape="pill" variant="outline" size="lg">En savoir plus</Button>
  </div>

  <h3 class="text-sm font-semibold mb-3 text-[var(--karbon-text-3)] uppercase tracking-wider">Toolbar</h3>
  <div class="flex items-center gap-1 p-1 rounded-lg" style="background: var(--karbon-bg-2); border: 1px solid var(--karbon-border);">
    <Button variant="ghost" size="xs">Copier</Button>
    <Button variant="ghost" size="xs">Coller</Button>
    <Button variant="flat" color="violet" size="xs">Formater</Button>
    <Button variant="ghost" size="xs" color="red">Effacer</Button>
  </div>

  <h3 class="text-sm font-semibold mb-3 mt-6 text-[var(--karbon-text-3)] uppercase tracking-wider">Social / Auth</h3>
  <div class="flex flex-col gap-2 max-w-xs">
    <Button fullWidth shape="pill" variant="bordered">Connexion avec Google</Button>
    <Button fullWidth shape="pill" color="blue">Connexion avec Facebook</Button>
    <Button fullWidth shape="pill" variant="flat" color="slate">Continuer avec email</Button>
  </div>
</section>
