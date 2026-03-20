<script lang="ts">
  import { Dialog, Button, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { Dialog, Button } from '@karbonjs/ui-svelte'

  let open = $state(false)
<\/script>

<Button color="red" onclick={() => open = true}>Supprimer</Button>

<Dialog
  bind:open
  title="Supprimer definitivement"
  message="Cette action est irreversible."
  variant="danger"
  confirmLabel="Supprimer"
  confirmInput="Supprimer"
  confirmInputLabel="Tapez 'Supprimer' pour confirmer"
  onconfirm={() => open = false}
  oncancel={() => open = false}
/>`;

  const codeCustom = `<Dialog bind:open title="Permissions" variant="warning">
  {#snippet children()}
    <ul>
      <li>Acces a la camera</li>
      <li>Acces au microphone</li>
    </ul>
  {/snippet}
</Dialog>`;

  let basic = $state(false);
  let variants = $state({ info: false, warning: false, danger: false, success: false });
  let withConfirm = $state(false);
  let withLoading = $state(false);
  let withChildren = $state(false);
  let colored = $state(false);
  let loadingState = $state(false);

  function simulateLoading() {
    withLoading = true;
    loadingState = true;
    setTimeout(() => {
      loadingState = false;
      withLoading = false;
    }, 2000);
  }
</script>

<h1 class="text-3xl font-bold mb-2">Dialog</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Boites de dialogue de confirmation avec variantes, input de confirmation et loading.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<!-- Basic -->
<DemoSection title="Basic" description="Dialog simple de confirmation." code={`<Dialog
  bind:open
  title="Confirmer l'action"
  message="Etes-vous sur de vouloir continuer ?"
  onconfirm={() => open = false}
  oncancel={() => open = false}
/>`}>
  {#snippet children()}
    <Button onclick={() => basic = true}>Ouvrir Dialog</Button>
    <Dialog
      bind:open={basic}
      title="Confirmer l'action"
      message="Etes-vous sur de vouloir continuer ? Cette action peut etre annulee."
      onconfirm={() => basic = false}
      oncancel={() => basic = false}
    />
  {/snippet}
</DemoSection>

<!-- Variants -->
<DemoSection title="Variants" description="4 variantes : info, warning, danger, success." code={`<Dialog open={open} title="Information" variant="info" />
<Dialog open={open} title="Attention" variant="warning" />
<Dialog open={open} title="Suppression" variant="danger" />
<Dialog open={open} title="Succes" variant="success" />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      {#each ['info', 'warning', 'danger', 'success'] as v}
        <Button
          color={v === 'info' ? 'blue' : v === 'warning' ? 'amber' : v === 'danger' ? 'red' : 'emerald'}
          variant="flat"
          onclick={() => variants = { ...variants, [v]: true }}
        >{v}</Button>
        <Dialog
          open={variants[v]}
          title={v === 'info' ? 'Information' : v === 'warning' ? 'Attention' : v === 'danger' ? 'Suppression' : 'Succes'}
          message={v === 'info' ? 'Voici une information importante a prendre en compte.'
            : v === 'warning' ? 'Cette action pourrait avoir des consequences inattendues.'
            : v === 'danger' ? 'Cette action est irreversible. Toutes les donnees seront perdues.'
            : 'L\'operation a ete effectuee avec succes.'}
          variant={v}
          confirmLabel={v === 'danger' ? 'Supprimer' : v === 'success' ? 'Parfait' : 'Continuer'}
          onconfirm={() => variants = { ...variants, [v]: false }}
          oncancel={() => variants = { ...variants, [v]: false }}
        />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- With confirmation input -->
<DemoSection title="Input de confirmation" description="L'utilisateur doit taper un mot pour confirmer." code={`<Dialog
  bind:open
  title="Supprimer definitivement"
  variant="danger"
  confirmInput="Supprimer"
  confirmInputLabel="Tapez 'Supprimer' pour confirmer"
/>`}>
  {#snippet children()}
    <Button color="red" variant="flat" onclick={() => withConfirm = true}>Supprimer le compte</Button>
    <Dialog
      bind:open={withConfirm}
      title="Supprimer definitivement"
      message="Cette action va supprimer votre compte et toutes les donnees associees. C'est irreversible."
      variant="danger"
      confirmLabel="Supprimer mon compte"
      cancelLabel="Non, garder mon compte"
      confirmInput="Supprimer"
      confirmInputLabel="Tapez 'Supprimer' pour confirmer"
      onconfirm={() => withConfirm = false}
      oncancel={() => withConfirm = false}
    />
  {/snippet}
</DemoSection>

<!-- With loading -->
<DemoSection title="Avec loading" description="Etat de chargement pendant la confirmation." code={`<Dialog
  bind:open
  title="Enregistrement"
  variant="info"
  loading={loadingState}
/>`}>
  {#snippet children()}
    <Button variant="flat" color="violet" onclick={simulateLoading}>Avec loading (2s)</Button>
    <Dialog
      bind:open={withLoading}
      title="Enregistrement"
      message="Vos modifications vont etre sauvegardees."
      variant="info"
      confirmLabel="Sauvegarder"
      loading={loadingState}
      onconfirm={() => {}}
      oncancel={() => { withLoading = false; loadingState = false }}
    />
  {/snippet}
</DemoSection>

<!-- With custom children -->
<DemoSection title="Contenu custom" description="Injectez du contenu riche via le snippet children." code={codeCustom}>
  {#snippet children()}
    <Button variant="flat" color="amber" onclick={() => withChildren = true}>Avec contenu custom</Button>
    <Dialog
      bind:open={withChildren}
      title="Permissions requises"
      variant="warning"
      confirmLabel="Autoriser"
      onconfirm={() => withChildren = false}
      oncancel={() => withChildren = false}
    >
      {#snippet children()}
        <div class="text-left space-y-2 text-sm" style="color:var(--karbon-text-2);">
          <p>L'application demande les permissions suivantes :</p>
          <ul class="space-y-1.5 pl-4">
            <li class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              Acces a la camera
            </li>
            <li class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              Acces au microphone
            </li>
            <li class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              Acces aux fichiers
            </li>
          </ul>
        </div>
      {/snippet}
    </Dialog>
  {/snippet}
</DemoSection>

<!-- Custom color -->
<DemoSection title="Couleur custom" description="Utilisez n'importe quelle couleur du theme." code={`<Dialog
  bind:open
  title="Publier l'article"
  message="L'article sera visible par tous."
  color="violet"
/>`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      {#each ['violet', 'cyan', 'pink', 'emerald'] as c}
        <Button color={c} variant="flat" onclick={() => colored = true}>
          {c}
        </Button>
      {/each}
    </div>
    <Dialog
      bind:open={colored}
      title="Publier l'article"
      message="L'article sera visible par tous les visiteurs du site."
      color="violet"
      confirmLabel="Publier"
      onconfirm={() => colored = false}
      oncancel={() => colored = false}
    />
  {/snippet}
</DemoSection>
