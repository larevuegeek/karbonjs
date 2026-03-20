<script lang="ts">
  import { PageHeader, Button, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { PageHeader, Button } from '@karbonjs/ui-svelte'
<\/script>

<PageHeader
  title="Articles"
  description="Gerez vos articles et publications."
  color="violet"
  breadcrumbs={[
    { label: 'Dashboard', href: '/' },
    { label: 'Articles' },
  ]}
>
  {#snippet actions()}
    <Button variant="ghost" size="sm">Exporter</Button>
    <Button color="violet" size="sm">Nouvel article</Button>
  {/snippet}
</PageHeader>`;

  const codeIcon = `<PageHeader title="Articles" description="..." color="violet">
  {#snippet icon()}
    <svg>...</svg>
  {/snippet}
</PageHeader>`;

  const codeActions = `<PageHeader title="Articles" color="violet">
  {#snippet actions()}
    <Button variant="ghost" size="sm">Exporter</Button>
    <Button color="violet" size="sm">Nouveau</Button>
  {/snippet}
</PageHeader>`;

  const colors = ['red', 'emerald', 'cyan', 'blue', 'violet', 'pink'] as const;
</script>

<h1 class="text-3xl font-bold mb-2">PageHeader</h1>
<p class="text-[var(--karbon-text-3)] mb-10">En-tetes de page avec icone, description, breadcrumb, back button et actions.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<!-- Variants -->
<DemoSection title="Variants" description="4 variantes : default, bordered, filled, clean." code={`<PageHeader title="Titre" description="Description." />
<PageHeader title="Titre" variant="bordered" />
<PageHeader title="Titre" variant="filled" color="violet" />
<PageHeader title="Titre" variant="clean" />`}>
  {#snippet children()}
    <div class="space-y-6">
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Default (border bottom)</span>
        <PageHeader title="Tableau de bord" description="Vue d'ensemble de votre activite." />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Bordered (card)</span>
        <PageHeader title="Tableau de bord" description="Vue d'ensemble de votre activite." variant="bordered" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Filled (fond teinte)</span>
        <PageHeader title="Tableau de bord" description="Vue d'ensemble de votre activite." variant="filled" color="violet" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Clean (aucun style)</span>
        <PageHeader title="Tableau de bord" description="Vue d'ensemble de votre activite." variant="clean" />
      </div>
    </div>
  {/snippet}
</DemoSection>

<!-- Icons -->
<DemoSection title="Avec icone" description="Icone dans le header avec couleur." code={codeIcon}>
  {#snippet children()}
    <div class="space-y-6">
      <PageHeader title="Articles" description="Gerez vos articles et publications." color="violet">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
        {/snippet}
      </PageHeader>

      <PageHeader title="Utilisateurs" description="Gestion des comptes et des roles." color="emerald" variant="bordered">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        {/snippet}
      </PageHeader>

      <PageHeader title="Parametres" description="Configuration avancee du systeme." color="cyan" variant="filled">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        {/snippet}
      </PageHeader>
    </div>
  {/snippet}
</DemoSection>

<!-- Actions -->
<DemoSection title="Avec actions" description="Boutons d'action a droite du header." code={codeActions}>
  {#snippet children()}
    <div class="space-y-6">
      <PageHeader title="Articles" description="Liste de tous les articles." color="violet">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
        {/snippet}
        {#snippet actions()}
          <Button variant="ghost" size="sm">Exporter</Button>
          <Button color="violet" size="sm">Nouvel article</Button>
        {/snippet}
      </PageHeader>

      <PageHeader title="Modifier l'article" description="Modifiez le contenu et les parametres." variant="bordered" color="blue" backHref="/" badge="Brouillon">
        {#snippet actions()}
          <Button variant="outline" color="slate" size="sm">Apercu</Button>
          <Button color="emerald" size="sm">Publier</Button>
        {/snippet}
      </PageHeader>
    </div>
  {/snippet}
</DemoSection>

<!-- Breadcrumb -->
<DemoSection title="Avec breadcrumb" description="Fil d'Ariane integre au header." code={`<PageHeader
  title="Modifier l'article"
  color="violet"
  breadcrumbs={[
    { label: 'Dashboard', href: '/' },
    { label: 'Articles', href: '/' },
    { label: 'Modifier' },
  ]}
/>`}>
  {#snippet children()}
    <PageHeader
      title="Modifier l'article"
      description="Netflix renonce au rachat de Warner Bros."
      color="violet"
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Articles', href: '/' },
        { label: 'Modifier' },
      ]}
    >
      {#snippet icon()}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
      {/snippet}
      {#snippet actions()}
        <Button variant="ghost" size="sm" color="red">Supprimer</Button>
        <Button variant="outline" color="slate" size="sm">Apercu</Button>
        <Button color="emerald" size="sm">Sauvegarder</Button>
      {/snippet}
    </PageHeader>
  {/snippet}
</DemoSection>

<!-- Back button -->
<DemoSection title="Avec back button" description="Lien de retour au-dessus du titre." code={`<PageHeader
  title="Details de l'utilisateur"
  backHref="/"
  backLabel="Retour aux utilisateurs"
  color="blue"
/>`}>
  {#snippet children()}
    <PageHeader title="Details de l'utilisateur" description="Alice Martin — admin@example.com" backHref="/" backLabel="Retour aux utilisateurs" color="blue">
      {#snippet icon()}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      {/snippet}
    </PageHeader>
  {/snippet}
</DemoSection>

<!-- Badge -->
<DemoSection title="Badge" description="Badge a cote du titre." code={`<PageHeader title="API Settings" badge="Beta" color="violet" variant="bordered" />
<PageHeader title="Plan Pro" badge="Actif" color="emerald" />
<PageHeader title="Domaine" badge="Expire" color="red" variant="filled" />`}>
  {#snippet children()}
    <div class="space-y-6">
      <PageHeader title="API Settings" badge="Beta" color="violet" variant="bordered" />
      <PageHeader title="Plan Pro" badge="Actif" color="emerald" />
      <PageHeader title="Domaine" badge="Expire" color="red" variant="filled" />
    </div>
  {/snippet}
</DemoSection>

<!-- Sizes -->
<DemoSection title="Tailles" description="3 tailles : sm, md, lg." code={`<PageHeader title="Titre" size="sm" color="violet" />
<PageHeader title="Titre" size="md" color="violet" />
<PageHeader title="Titre" size="lg" color="violet" />`}>
  {#snippet children()}
    <div class="space-y-6">
      {#each ['sm', 'md', 'lg'] as sz}
        <div>
          <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">{sz}</span>
          <PageHeader title="Titre de la page" description="Description courte." size={sz} color="violet">
            {#snippet icon()}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            {/snippet}
          </PageHeader>
        </div>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Colors -->
<DemoSection title="Couleurs x Filled" description="6 couleurs avec la variante filled." code={`<PageHeader title="Page violet" color="violet" variant="filled" size="sm" />
<PageHeader title="Page emerald" color="emerald" variant="filled" size="sm" />
<PageHeader title="Page cyan" color="cyan" variant="filled" size="sm" />`}>
  {#snippet children()}
    <div class="space-y-4">
      {#each colors as c}
        <PageHeader title="Page {c}" description="Description avec couleur {c}." color={c} variant="filled" size="sm" />
      {/each}
    </div>
  {/snippet}
</DemoSection>
