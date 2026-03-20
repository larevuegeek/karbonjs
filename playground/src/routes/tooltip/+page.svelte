<script lang="ts">
  import { Tooltip, Button, Badge, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { Tooltip, Button } from '@karbonjs/ui-svelte'
<\/script>

<Tooltip text="Sauvegarder le document" position="top">
  <Button>Sauvegarder</Button>
</Tooltip>

<Tooltip variant="colored" color="violet" delay={200}>
  {#snippet content()}
    <div>
      <p class="font-semibold">Alice Martin</p>
      <p class="text-xs opacity-70">admin@example.com</p>
    </div>
  {/snippet}
  <span class="underline cursor-help">Profil</span>
</Tooltip>`;

  const colors = ['red', 'emerald', 'cyan', 'blue', 'violet', 'pink'] as const;
</script>

<h1 class="text-3xl font-bold mb-2">Tooltip</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Infobulles avec positions, variantes, couleurs, tailles et contenu riche.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Positions" code={`<Tooltip text="Tooltip en haut" position="top">
  <Button variant="outline">Top</Button>
</Tooltip>
<Tooltip text="Tooltip en bas" position="bottom">
  <Button variant="outline">Bottom</Button>
</Tooltip>`}>
  {#snippet children()}
    <div class="flex flex-wrap items-center gap-6 py-10 justify-center">
      <Tooltip text="Tooltip en haut" position="top">
        <Button variant="outline" color="slate">Top</Button>
      </Tooltip>
      <Tooltip text="Tooltip en bas" position="bottom">
        <Button variant="outline" color="slate">Bottom</Button>
      </Tooltip>
      <Tooltip text="Tooltip a gauche" position="left">
        <Button variant="outline" color="slate">Left</Button>
      </Tooltip>
      <Tooltip text="Tooltip a droite" position="right">
        <Button variant="outline" color="slate">Right</Button>
      </Tooltip>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Variants" code={`<Tooltip text="Dark tooltip" variant="dark">...</Tooltip>
<Tooltip text="Light tooltip" variant="light">...</Tooltip>
<Tooltip text="Colored" variant="colored" color="violet">...</Tooltip>`}>
  {#snippet children()}
    <div class="flex flex-wrap items-center gap-6 py-6">
      <Tooltip text="Dark tooltip (default)" variant="dark">
        <Button variant="flat">Dark</Button>
      </Tooltip>
      <Tooltip text="Light tooltip" variant="light">
        <Button variant="flat">Light</Button>
      </Tooltip>
      <Tooltip text="Colored tooltip" variant="colored">
        <Button variant="flat">Colored</Button>
      </Tooltip>
      <Tooltip text="Colored violet" variant="colored" color="violet">
        <Button variant="flat" color="violet">Violet</Button>
      </Tooltip>
      <Tooltip text="Colored emerald" variant="colored" color="emerald">
        <Button variant="flat" color="emerald">Emerald</Button>
      </Tooltip>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Colored × Colors" code={`<Tooltip text="Tooltip violet" variant="colored" color="violet">
  <Badge color="violet" variant="soft">violet</Badge>
</Tooltip>`}>
  {#snippet children()}
    <div class="flex flex-wrap items-center gap-4 py-6">
      {#each colors as c}
        <Tooltip text="Tooltip {c}" variant="colored" color={c}>
          <Badge color={c} variant="soft">{c}</Badge>
        </Tooltip>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Sizes" code={`<Tooltip text="Small tooltip" size="sm">...</Tooltip>
<Tooltip text="Medium tooltip" size="md">...</Tooltip>
<Tooltip text="Large tooltip" size="lg">...</Tooltip>`}>
  {#snippet children()}
    <div class="flex flex-wrap items-center gap-6 py-6">
      <Tooltip text="Small tooltip" size="sm">
        <Button variant="outline" size="sm">SM</Button>
      </Tooltip>
      <Tooltip text="Medium tooltip" size="md">
        <Button variant="outline">MD</Button>
      </Tooltip>
      <Tooltip text="Large tooltip" size="lg">
        <Button variant="outline" size="lg">LG</Button>
      </Tooltip>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Texte long (wrap)" code={`<Tooltip text="Un texte long qui va passer a la ligne..."
  maxWidth="200px">
  <span class="underline cursor-help">Survolez</span>
</Tooltip>`}>
  {#snippet children()}
    <div class="flex flex-wrap items-center gap-6 py-6">
      <Tooltip text="Ceci est un tooltip avec un texte plus long qui va automatiquement passer a la ligne grace au max-width." maxWidth="200px">
        <span class="underline cursor-help" style="color: var(--karbon-text-2);">Survolez pour un long texte</span>
      </Tooltip>
      <Tooltip text="Tooltip tres court">
        <span class="underline cursor-help" style="color: var(--karbon-text-2);">Texte court</span>
      </Tooltip>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Contenu riche (snippet)" code={`<Tooltip>
  <div slot="content">
    <p class="font-semibold">Alice Martin</p>
    <p class="text-xs opacity-70">admin@example.com</p>
  </div>
  <span class="underline cursor-help">Profil</span>
</Tooltip>`}>
  {#snippet children()}
    <div class="flex flex-wrap items-center gap-6 py-6">
      <Tooltip>
        {#snippet content()}
          <div class="space-y-1.5" style="min-width: 150px;">
            <p class="font-semibold">Alice Martin</p>
            <p class="text-[11px] opacity-70">admin@example.com</p>
            <div class="flex gap-1 pt-1">
              <span class="px-1.5 py-px rounded text-[10px] font-medium" style="background: rgba(139,92,246,0.2); color: #a78bfa;">Admin</span>
              <span class="px-1.5 py-px rounded text-[10px] font-medium" style="background: rgba(16,185,129,0.2); color: #34d399;">Actif</span>
            </div>
          </div>
        {/snippet}
        <span class="underline cursor-help" style="color: var(--karbon-text-2);">Profil utilisateur</span>
      </Tooltip>

      <Tooltip variant="light">
        {#snippet content()}
          <div class="space-y-1" style="min-width: 120px;">
            <p class="font-semibold" style="color: #111;">Raccourcis</p>
            <div class="flex items-center gap-2 text-[11px]" style="color: #555;">
              <kbd class="px-1 rounded" style="background: #e5e7eb;">Ctrl+S</kbd>
              <span>Sauvegarder</span>
            </div>
            <div class="flex items-center gap-2 text-[11px]" style="color: #555;">
              <kbd class="px-1 rounded" style="background: #e5e7eb;">Ctrl+Z</kbd>
              <span>Annuler</span>
            </div>
          </div>
        {/snippet}
        <span class="underline cursor-help" style="color: var(--karbon-text-2);">Raccourcis clavier</span>
      </Tooltip>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Sans fleche" code={`<Tooltip text="Pas de fleche" arrow={false}>
  <Button variant="ghost">Sans fleche</Button>
</Tooltip>`}>
  {#snippet children()}
    <div class="flex flex-wrap items-center gap-6 py-6">
      <Tooltip text="Pas de fleche" arrow={false}>
        <Button variant="ghost">Sans fleche</Button>
      </Tooltip>
      <Tooltip text="Avec fleche">
        <Button variant="ghost">Avec fleche</Button>
      </Tooltip>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Delai" code={`<Tooltip text="Instant (0ms)" delay={0}>...</Tooltip>
<Tooltip text="Rapide (200ms)" delay={200}>...</Tooltip>
<Tooltip text="Lent (800ms)" delay={800}>...</Tooltip>`}>
  {#snippet children()}
    <div class="flex flex-wrap items-center gap-6 py-6">
      <Tooltip text="Instant (0ms)" delay={0}>
        <Button variant="flat">Instant</Button>
      </Tooltip>
      <Tooltip text="Rapide (200ms)" delay={200}>
        <Button variant="flat">200ms</Button>
      </Tooltip>
      <Tooltip text="Lent (800ms)" delay={800}>
        <Button variant="flat">800ms</Button>
      </Tooltip>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Sur differents elements" code={`<Tooltip text="Bouton avec tooltip">
  <Button color="violet">Bouton</Button>
</Tooltip>
<Tooltip text="Badge avec tooltip">
  <Badge color="emerald" variant="dot">Status</Badge>
</Tooltip>`}>
  {#snippet children()}
    <div class="flex flex-wrap items-center gap-6 py-6">
      <Tooltip text="Bouton avec tooltip">
        <Button color="violet">Bouton</Button>
      </Tooltip>
      <Tooltip text="Badge avec tooltip">
        <Badge color="emerald" variant="dot">Status</Badge>
      </Tooltip>
      <Tooltip text="Texte avec tooltip">
        <span class="cursor-help border-b border-dashed" style="color: var(--karbon-text-2); border-color: var(--karbon-text-4);">Terme technique</span>
      </Tooltip>
      <Tooltip text="Icone avec tooltip">
        <button class="p-2 rounded-lg cursor-pointer" style="color: var(--karbon-text-3); background: var(--karbon-bg-2);" aria-label="Info">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </button>
      </Tooltip>
    </div>
  {/snippet}
</DemoSection>
