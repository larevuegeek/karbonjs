<script lang="ts">
  import { AlertMessage, Button, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `import { AlertMessage } from '@karbonjs/ui-svelte'

<AlertMessage type="success" message="Saved!" />
<AlertMessage type="error" title="Error" message="Something went wrong." dismissible />
<AlertMessage type="info" variant="bordered" title="Note">
  {#snippet actions()}
    <Button size="xs">Retry</Button>
  {/snippet}
</AlertMessage>`;

  const colors = ['red', 'orange', 'amber', 'emerald', 'cyan', 'blue', 'violet', 'pink'] as const;

  let dismissed = $state(false);
</script>

<h1 class="text-3xl font-bold mb-2">AlertMessage</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Messages d'alerte avec types, variantes, couleurs, titre, actions et dismiss.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Types" code={`<AlertMessage type="success" message="Operation reussie !" />
<AlertMessage type="error" message="Une erreur est survenue." />
<AlertMessage type="warning" message="Attention !" />
<AlertMessage type="info" message="Information." />`}>
  {#snippet children()}
    <div class="space-y-3">
      <AlertMessage type="success" message="Operation reussie avec succes !" />
      <AlertMessage type="error" message="Une erreur critique est survenue." />
      <AlertMessage type="warning" message="Attention, cette action est irreversible." />
      <AlertMessage type="info" message="Une nouvelle mise a jour est disponible." />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Variants" description="Soft, Filled, Outline et Bordered" code={`<AlertMessage type="success" variant="soft" message="Soft" />
<AlertMessage type="error" variant="filled" message="Filled" />
<AlertMessage type="success" variant="outline" message="Outline" />
<AlertMessage type="info" variant="bordered" message="Bordered" />`}>
  {#snippet children()}
    <h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Soft (default)</h3>
    <div class="space-y-2">
      <AlertMessage type="success" variant="soft" message="Soft success" />
      <AlertMessage type="error" variant="soft" message="Soft error" />
    </div>

    <h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Filled</h3>
    <div class="space-y-2">
      <AlertMessage type="success" variant="filled" message="Filled success" />
      <AlertMessage type="error" variant="filled" message="Filled error" />
      <AlertMessage type="warning" variant="filled" message="Filled warning" />
      <AlertMessage type="info" variant="filled" message="Filled info" />
    </div>

    <h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Outline</h3>
    <div class="space-y-2">
      <AlertMessage type="success" variant="outline" message="Outline success" />
      <AlertMessage type="error" variant="outline" message="Outline error" />
    </div>

    <h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Bordered (left bar)</h3>
    <div class="space-y-2">
      <AlertMessage type="success" variant="bordered" message="Bordered success" />
      <AlertMessage type="error" variant="bordered" message="Bordered error" />
      <AlertMessage type="warning" variant="bordered" message="Bordered warning" />
      <AlertMessage type="info" variant="bordered" message="Bordered info" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Avec titre" code={`<AlertMessage type="success" title="Sauvegarde reussie"
  message="Vos modifications ont ete enregistrees." />
<AlertMessage type="error" title="Erreur de connexion"
  message="Impossible de se connecter au serveur." />`}>
  {#snippet children()}
    <div class="space-y-3">
      <AlertMessage type="success" title="Sauvegarde reussie" message="Vos modifications ont ete enregistrees avec succes." />
      <AlertMessage type="error" title="Erreur de connexion" message="Impossible de se connecter au serveur. Veuillez reessayer." />
      <AlertMessage type="warning" title="Espace disque faible" message="Il ne reste que 2 Go d'espace disponible sur votre serveur." />
      <AlertMessage type="info" title="Mise a jour v2.0" message="De nouvelles fonctionnalites sont disponibles. Consultez le changelog." />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Titre + Bordered" code={`<AlertMessage type="error" variant="bordered"
  title="Erreur critique"
  message="Le service est indisponible." />`}>
  {#snippet children()}
    <div class="space-y-3">
      <AlertMessage type="error" variant="bordered" title="Erreur critique" message="Le service de paiement est temporairement indisponible." />
      <AlertMessage type="warning" variant="bordered" title="Maintenance prevue" message="Le site sera en maintenance le 25 mars de 2h a 4h." />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Dismissible" code={`<AlertMessage type="info" message="Fermable." dismissible />
<AlertMessage type="error" title="Avec callback"
  message="..." dismissible ondismiss={() => {}} />`}>
  {#snippet children()}
    <div class="space-y-3">
      <AlertMessage type="info" message="Vous pouvez fermer cette alerte." dismissible />
      <AlertMessage type="success" variant="filled" message="Alerte filled dismissible." dismissible />
      <AlertMessage type="warning" variant="bordered" title="Notification" message="Cliquez sur la croix pour fermer." dismissible />
    </div>

    {#if !dismissed}
      <div class="mt-3">
        <AlertMessage type="error" title="Alerte avec callback" message="Fermer cette alerte affiche un message." dismissible ondismiss={() => dismissed = true} />
      </div>
    {:else}
      <p class="mt-3 text-xs" style="color: var(--karbon-text-3);">Alerte fermee ! <button class="underline cursor-pointer" onclick={() => dismissed = false}>Reafficher</button></p>
    {/if}
  {/snippet}
</DemoSection>

<DemoSection title="Avec actions" code={`<AlertMessage type="info" title="Nouvelle version" message="...">
  {#snippet actions()}
    <Button size="xs" variant="flat" color="blue">Mettre a jour</Button>
  {/snippet}
</AlertMessage>`}>
  {#snippet children()}
    <div class="space-y-3">
      <AlertMessage type="info" title="Nouvelle version" message="La version 3.0 est disponible avec des ameliorations majeures.">
        {#snippet actions()}
          <Button size="xs" variant="flat" color="blue">Mettre a jour</Button>
          <Button size="xs" variant="ghost">Plus tard</Button>
        {/snippet}
      </AlertMessage>

      <AlertMessage type="error" variant="bordered" title="Session expiree" message="Votre session a expire. Reconnectez-vous pour continuer.">
        {#snippet actions()}
          <Button size="xs" color="red">Se reconnecter</Button>
        {/snippet}
      </AlertMessage>

      <AlertMessage type="warning" variant="filled" title="Quota atteint" message="Vous avez atteint 90% de votre quota de stockage." dismissible>
        {#snippet actions()}
          <Button size="xs" variant="outline" class="border-white/30! text-white!">Augmenter</Button>
          <Button size="xs" variant="ghost" class="text-white/70!">Ignorer</Button>
        {/snippet}
      </AlertMessage>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Couleurs custom" code={`<AlertMessage color="violet" message="Alerte avec couleur violet" />
<AlertMessage color="cyan" message="Alerte avec couleur cyan" />`}>
  {#snippet children()}
    <div class="space-y-2">
      {#each colors as c}
        <AlertMessage color={c} message="Alerte avec couleur {c}" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Couleurs × Filled" code={`<AlertMessage color="violet" variant="filled" message="Filled violet" />`}>
  {#snippet children()}
    <div class="space-y-2">
      {#each colors as c}
        <AlertMessage color={c} variant="filled" message="Filled {c}" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Sans icone" code={`<AlertMessage type="info" icon={false} message="Alerte sans icone." />`}>
  {#snippet children()}
    <AlertMessage type="info" icon={false} message="Alerte sans icone — parfois moins c'est plus." />
  {/snippet}
</DemoSection>

<DemoSection title="Contenu custom (children)" code={`<AlertMessage type="info" title="Raccourcis clavier">
  {#snippet children()}
    <ul><li>Ctrl+S — Sauvegarder</li></ul>
  {/snippet}
</AlertMessage>`}>
  {#snippet children()}
    <AlertMessage type="info" title="Raccourcis clavier">
      {#snippet children()}
        <ul class="list-disc list-inside space-y-1 text-sm opacity-80">
          <li><kbd class="px-1 rounded text-xs" style="background:var(--karbon-bg-2);">Ctrl+S</kbd> — Sauvegarder</li>
          <li><kbd class="px-1 rounded text-xs" style="background:var(--karbon-bg-2);">Ctrl+Z</kbd> — Annuler</li>
          <li><kbd class="px-1 rounded text-xs" style="background:var(--karbon-bg-2);">Ctrl+K</kbd> — Rechercher</li>
        </ul>
      {/snippet}
    </AlertMessage>
  {/snippet}
</DemoSection>
