<script lang="ts">
  import { EmptyState, Button, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { EmptyState, Button } from '@karbonjs/ui-svelte'
<\/script>

<EmptyState
  title="Aucun article"
  description="Commencez par creer votre premier article."
  color="violet"
  variant="bordered"
>
  {#snippet icon()}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
    </svg>
  {/snippet}
  {#snippet actions()}
    <Button color="violet" size="sm">Creer un article</Button>
  {/snippet}
</EmptyState>`;

  const colors = ['red', 'emerald', 'cyan', 'blue', 'violet', 'pink'] as const;
</script>

<h1 class="text-3xl font-bold mb-2">EmptyState</h1>
<p class="text-[var(--karbon-text-3)] mb-10">Etats vides avec icones, actions, illustrations et variantes.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Variants" description="Les 4 variantes disponibles." code={`<EmptyState title="Aucun article" description="Vous n'avez pas encore cree d'article." />
<EmptyState title="Aucun article" description="..." variant="bordered" />
<EmptyState title="Aucun article" description="..." variant="filled" color="violet" />
<EmptyState title="Aucun article" description="..." variant="minimal" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Default</span>
        <EmptyState title="Aucun article" description="Vous n'avez pas encore cree d'article." />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Bordered</span>
        <EmptyState title="Aucun article" description="Vous n'avez pas encore cree d'article." variant="bordered" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Filled</span>
        <EmptyState title="Aucun article" description="Vous n'avez pas encore cree d'article." variant="filled" color="violet" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Minimal</span>
        <EmptyState title="Aucun article" description="Vous n'avez pas encore cree d'article." variant="minimal" />
      </div>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Avec icones custom" description="Icones SVG personnalisees dans le snippet icon." code={`<EmptyState title="Aucun resultat" description="Essayez un autre terme." color="blue">
  {#snippet icon()}
    <svg>...</svg>
  {/snippet}
</EmptyState>`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <EmptyState title="Aucun resultat" description="Essayez un autre terme de recherche." color="blue">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        {/snippet}
      </EmptyState>

      <EmptyState title="Panier vide" description="Parcourez notre catalogue pour trouver des produits." color="emerald">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        {/snippet}
      </EmptyState>

      <EmptyState title="Aucune notification" description="Vous etes a jour ! Aucune notification en attente." color="amber">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="m2 2 20 20"/></svg>
        {/snippet}
      </EmptyState>

      <EmptyState title="Pas de commentaires" description="Soyez le premier a commenter cet article." color="pink">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/></svg>
        {/snippet}
      </EmptyState>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Avec actions" description="Boutons d'action via le snippet actions." code={`<EmptyState title="Aucun article" description="Commencez par creer." color="violet" variant="bordered">
  {#snippet icon()}
    <svg>...</svg>
  {/snippet}
  {#snippet actions()}
    <Button color="violet" size="sm">Creer un article</Button>
  {/snippet}
</EmptyState>`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <EmptyState title="Aucun article" description="Commencez par creer votre premier article." color="violet" variant="bordered">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
        {/snippet}
        {#snippet actions()}
          <Button color="violet" size="sm">Creer un article</Button>
        {/snippet}
      </EmptyState>

      <EmptyState title="Invitez votre equipe" description="Collaborez en temps reel avec vos collegues." color="blue" variant="bordered">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
        {/snippet}
        {#snippet actions()}
          <Button color="blue" size="sm">Inviter</Button>
          <Button variant="ghost" size="sm">En savoir plus</Button>
        {/snippet}
      </EmptyState>

      <EmptyState title="Erreur 404" description="La page que vous cherchez n'existe pas ou a ete deplacee." color="red">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        {/snippet}
        {#snippet actions()}
          <Button color="red" variant="flat" size="sm">Retour a l'accueil</Button>
        {/snippet}
      </EmptyState>

      <EmptyState title="Connexion requise" description="Connectez-vous pour acceder a cette fonctionnalite." color="cyan" variant="filled">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        {/snippet}
        {#snippet actions()}
          <Button size="sm">Se connecter</Button>
          <Button variant="ghost" size="sm">S'inscrire</Button>
        {/snippet}
      </EmptyState>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Tailles" description="3 tailles disponibles : sm, md, lg." code={`<EmptyState title="Aucun resultat" description="..." size="sm" color="violet" variant="bordered" />
<EmptyState title="Aucun resultat" description="..." size="md" color="violet" variant="bordered" />
<EmptyState title="Aucun resultat" description="..." size="lg" color="violet" variant="bordered" />`}>
  {#snippet children()}
    <div class="space-y-4">
      {#each ['sm', 'md', 'lg'] as sz}
        <div>
          <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">{sz}</span>
          <EmptyState title="Aucun resultat" description="Modifiez vos filtres pour trouver du contenu." size={sz} color="violet" variant="bordered" />
        </div>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Couleurs × Filled" description="Toutes les couleurs en variante filled." code={`<EmptyState title="Vide" description="Aucune donnee." color="red" variant="filled" size="sm" />
<EmptyState title="Vide" description="Aucune donnee." color="emerald" variant="filled" size="sm" />`}>
  {#snippet children()}
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {#each colors as c}
        <EmptyState title="Vide" description="Aucune donnee {c}." color={c} variant="filled" size="sm" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Illustration custom" description="Snippet illustration pour un visuel personnalise." code={`<EmptyState title="Bienvenue !" description="Votre espace est pret." color="violet" variant="bordered">
  {#snippet illustration()}
    <div class="w-32 h-24 rounded-2xl flex items-center justify-center" style="background:linear-gradient(...);">
      <svg>...</svg>
    </div>
  {/snippet}
  {#snippet actions()}
    <Button color="violet" size="sm">Commencer</Button>
  {/snippet}
</EmptyState>`}>
  {#snippet children()}
    <EmptyState title="Bienvenue !" description="Votre espace est pret. Commencez par explorer les fonctionnalites." color="violet" variant="bordered">
      {#snippet illustration()}
        <div class="w-32 h-24 rounded-2xl flex items-center justify-center" style="background:linear-gradient(135deg,color-mix(in srgb,var(--karbon-violet-500) 15%,transparent),color-mix(in srgb,var(--karbon-cyan-500) 15%,transparent));">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-violet-400)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        </div>
      {/snippet}
      {#snippet actions()}
        <Button color="violet" size="sm">Commencer</Button>
        <Button variant="ghost" size="sm">Documentation</Button>
      {/snippet}
    </EmptyState>
  {/snippet}
</DemoSection>
