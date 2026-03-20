<script lang="ts">
  import { Modal, Button, Input, Badge, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { Modal, Button } from '@karbonjs/ui-svelte'

  let open = $state(false)
<\/script>

<Button onclick={() => open = true}>Ouvrir</Button>

<Modal bind:open title="Titre" description="Description optionnelle" onclose={() => open = false}>
  {#snippet children()}
    <p>Contenu de la modal.</p>
  {/snippet}
  {#snippet footer()}
    <Button variant="ghost" onclick={() => open = false}>Annuler</Button>
    <Button onclick={() => open = false}>Confirmer</Button>
  {/snippet}
</Modal>`;

  const codeBasic = `<Modal bind:open title="Titre de la modal">
  {#snippet children()}
    <p>Contenu de la modal.</p>
  {/snippet}
  {#snippet footer()}
    <Button variant="ghost">Annuler</Button>
    <Button>Confirmer</Button>
  {/snippet}
</Modal>`;

  const codeIcon = `<Modal bind:open title="Nouvelle fonctionnalite" color="violet">
  {#snippet icon()}
    <svg>...</svg>
  {/snippet}
</Modal>`;

  const codeForm = `<Modal bind:open title="Creer un article" color="violet">
  {#snippet children()}
    <Input name="title" label="Titre" />
    <Input name="slug" label="Slug" />
  {/snippet}
</Modal>`;

  const codeScrollable = `<Modal bind:open title="Conditions generales">
  {#snippet children()}
    <!-- Long content scrolls automatically -->
    <p>Article 1 — Lorem ipsum...</p>
  {/snippet}
</Modal>`;

  let basic = $state(false);
  let withDesc = $state(false);
  let withIcon = $state(false);
  let sizes = $state({ xs: false, sm: false, md: false, lg: false, xl: false, full: false });
  let positions = $state({ center: false, top: false, right: false, bottom: false });
  let backdrops = $state({ blur: false, dark: false, light: false, transparent: false });
  let noClose = $state(false);
  let form = $state(false);
  let scrollable = $state(false);
</script>

<h1 class="text-3xl font-bold mb-2">Modal</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Fenetres modales avec animations, positions, backdrops, tailles et contenu riche.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<!-- Basic -->
<DemoSection title="Basic" description="Modal simple avec titre et footer." code={codeBasic}>
  {#snippet children()}
    <Button onclick={() => basic = true}>Ouvrir modal</Button>
    <Modal bind:open={basic} title="Titre de la modal" onclose={() => basic = false}>
      {#snippet children()}
        <p>Ceci est le contenu de la modal. Vous pouvez y mettre n'importe quel contenu.</p>
      {/snippet}
      {#snippet footer()}
        <Button variant="ghost" onclick={() => basic = false}>Annuler</Button>
        <Button onclick={() => basic = false}>Confirmer</Button>
      {/snippet}
    </Modal>
  {/snippet}
</DemoSection>

<!-- With description -->
<DemoSection title="Avec description" description="Modal avec titre et description." code={`<Modal
  bind:open
  title="Parametres du compte"
  description="Gerez vos informations."
/>`}>
  {#snippet children()}
    <Button variant="flat" onclick={() => withDesc = true}>Avec description</Button>
    <Modal bind:open={withDesc} title="Parametres du compte" description="Gerez vos informations personnelles et vos preferences." onclose={() => withDesc = false}>
      {#snippet children()}
        <p>Contenu des parametres ici...</p>
      {/snippet}
      {#snippet footer()}
        <Button variant="ghost" onclick={() => withDesc = false}>Fermer</Button>
        <Button color="emerald" onclick={() => withDesc = false}>Sauvegarder</Button>
      {/snippet}
    </Modal>
  {/snippet}
</DemoSection>

<!-- With icon -->
<DemoSection title="Avec icone" description="Modal avec icone dans le header." code={codeIcon}>
  {#snippet children()}
    <Button variant="flat" color="violet" onclick={() => withIcon = true}>Avec icone</Button>
    <Modal bind:open={withIcon} title="Nouvelle fonctionnalite" description="Decouvrez les dernieres ameliorations de la plateforme." color="violet" onclose={() => withIcon = false}>
      {#snippet icon()}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
      {/snippet}
      {#snippet children()}
        <ul class="space-y-2">
          <li class="flex items-center gap-2"><Badge color="emerald" size="xs" variant="dot">Nouveau</Badge> Editeur WYSIWYG ameliore</li>
          <li class="flex items-center gap-2"><Badge color="emerald" size="xs" variant="dot">Nouveau</Badge> Explorateur de fichiers</li>
          <li class="flex items-center gap-2"><Badge color="blue" size="xs" variant="dot">Ameliore</Badge> Performance du dashboard</li>
        </ul>
      {/snippet}
      {#snippet footer()}
        <Button variant="ghost" onclick={() => withIcon = false}>Plus tard</Button>
        <Button color="violet" onclick={() => withIcon = false}>Decouvrir</Button>
      {/snippet}
    </Modal>
  {/snippet}
</DemoSection>

<!-- Sizes -->
<DemoSection title="Sizes" description="6 tailles disponibles : xs, sm, md, lg, xl, full." code={`<Modal open={open} title="Modal md" size="md" />
<Modal open={open} title="Modal lg" size="lg" />
<Modal open={open} title="Modal full" size="full" />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      {#each ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as sz}
        <Button variant="outline" color="slate" size="sm" onclick={() => sizes = { ...sizes, [sz]: true }}>{sz}</Button>
        <Modal open={sizes[sz]} title="Modal {sz}" size={sz} onclose={() => sizes = { ...sizes, [sz]: false }}>
          {#snippet children()}
            <p>Cette modal utilise la taille <strong>{sz}</strong>.</p>
            <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          {/snippet}
          {#snippet footer()}
            <Button variant="ghost" onclick={() => sizes = { ...sizes, [sz]: false }}>Fermer</Button>
          {/snippet}
        </Modal>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Positions -->
<DemoSection title="Positions" description="4 positions : center, top, right, bottom." code={`<Modal open={open} title="Position: top" position="top" />
<Modal open={open} title="Position: right" position="right" />
<Modal open={open} title="Position: bottom" position="bottom" />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      {#each ['center', 'top', 'right', 'bottom'] as pos}
        <Button variant="flat" color="cyan" size="sm" onclick={() => positions = { ...positions, [pos]: true }}>{pos}</Button>
        <Modal open={positions[pos]} title="Position: {pos}" position={pos} size={pos === 'right' ? 'sm' : 'md'} onclose={() => positions = { ...positions, [pos]: false }}>
          {#snippet children()}
            <p>La modal est positionnee en <strong>{pos}</strong>.</p>
            {#if pos === 'right'}
              <p class="mt-2">Le panel lateral est ideal pour les formulaires de detail, les parametres ou les previews.</p>
            {/if}
          {/snippet}
          {#snippet footer()}
            <Button variant="ghost" onclick={() => positions = { ...positions, [pos]: false }}>Fermer</Button>
          {/snippet}
        </Modal>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Backdrops -->
<DemoSection title="Backdrops" description="4 styles de backdrop : blur, dark, light, transparent." code={`<Modal open={open} title="Backdrop: blur" backdrop="blur" />
<Modal open={open} title="Backdrop: dark" backdrop="dark" />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      {#each ['blur', 'dark', 'light', 'transparent'] as bd}
        <Button variant="flat" color="pink" size="sm" onclick={() => backdrops = { ...backdrops, [bd]: true }}>{bd}</Button>
        <Modal open={backdrops[bd]} title="Backdrop: {bd}" backdrop={bd} onclose={() => backdrops = { ...backdrops, [bd]: false }}>
          {#snippet children()}
            <p>Backdrop <strong>{bd}</strong> applique.</p>
          {/snippet}
          {#snippet footer()}
            <Button variant="ghost" onclick={() => backdrops = { ...backdrops, [bd]: false }}>Fermer</Button>
          {/snippet}
        </Modal>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Not closable -->
<DemoSection title="Non fermable" description="Modal sans bouton de fermeture ni clic sur l'overlay." code={`<Modal
  bind:open
  title="Action requise"
  closable={false}
  closeOnOverlay={false}
/>`}>
  {#snippet children()}
    <Button variant="flat" color="red" onclick={() => noClose = true}>Non fermable</Button>
    <Modal bind:open={noClose} title="Action requise" closable={false} closeOnOverlay={false} onclose={() => noClose = false}>
      {#snippet children()}
        <p>Cette modal ne peut etre fermee qu'en cliquant sur le bouton ci-dessous.</p>
      {/snippet}
      {#snippet footer()}
        <Button color="red" onclick={() => noClose = false}>J'ai compris</Button>
      {/snippet}
    </Modal>
  {/snippet}
</DemoSection>

<!-- Form modal -->
<DemoSection title="Formulaire" description="Modal avec formulaire et icone." code={codeForm}>
  {#snippet children()}
    <Button variant="flat" color="violet" onclick={() => form = true}>Ouvrir formulaire</Button>
    <Modal bind:open={form} title="Creer un article" description="Remplissez les informations ci-dessous." color="violet" onclose={() => form = false}>
      {#snippet icon()}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
      {/snippet}
      {#snippet children()}
        <div class="space-y-4">
          <Input name="title" label="Titre" placeholder="Mon article..." color="violet" />
          <Input name="slug" label="Slug" placeholder="mon-article" color="violet" />
          <Input name="author" label="Auteur" placeholder="Votre nom" color="violet" />
        </div>
      {/snippet}
      {#snippet footer()}
        <Button variant="ghost" onclick={() => form = false}>Annuler</Button>
        <Button color="violet" onclick={() => form = false}>Creer</Button>
      {/snippet}
    </Modal>
  {/snippet}
</DemoSection>

<!-- Scrollable content -->
<DemoSection title="Contenu scrollable" description="Modal avec contenu long et scroll automatique." code={codeScrollable}>
  {#snippet children()}
    <Button variant="flat" color="blue" onclick={() => scrollable = true}>Long contenu</Button>
    <Modal bind:open={scrollable} title="Conditions generales" onclose={() => scrollable = false}>
      {#snippet children()}
        {#each Array(20) as _, i}
          <p class="mb-3">Article {i + 1} — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies.</p>
        {/each}
      {/snippet}
      {#snippet footer()}
        <Button variant="ghost" onclick={() => scrollable = false}>Refuser</Button>
        <Button color="emerald" onclick={() => scrollable = false}>Accepter</Button>
      {/snippet}
    </Modal>
  {/snippet}
</DemoSection>
