<script lang="ts">
  import { Divider, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { Divider } from '@karbonjs/ui-svelte'
<\/script>

<Divider />
<Divider label="ou continuer avec" color="violet" />
<Divider variant="gradient" color="emerald" spacing="lg" />

<!-- Vertical entre elements inline -->
<div class="flex items-center">
  <span>Accueil</span>
  <Divider direction="vertical" spacing="sm" />
  <span>Articles</span>
</div>`;

  const codeIcon = `<Divider color="violet">
  {#snippet icon()}
    <svg>...</svg>
  {/snippet}
</Divider>
<Divider label="ou" color="blue">
  {#snippet icon()}
    <svg>...</svg>
  {/snippet}
</Divider>`;

  const colors = ['red', 'emerald', 'cyan', 'blue', 'violet', 'pink'] as const;
</script>

<h1 class="text-3xl font-bold mb-2">Divider</h1>
<p class="text-[var(--karbon-text-3)] mb-10">Separateurs avec variantes, couleurs, labels, icones et orientations.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<!-- Variants -->
<DemoSection title="Variants" description="4 styles de ligne." code={`<Divider variant="solid" />
<Divider variant="dashed" />
<Divider variant="dotted" />
<Divider variant="gradient" />`}>
  {#snippet children()}
    <div class="space-y-2">
      {#each ['solid', 'dashed', 'dotted', 'gradient'] as v}
        <div class="flex items-center gap-3">
          <span class="text-[11px] font-semibold uppercase tracking-wider w-16 shrink-0" style="color:var(--karbon-text-4);">{v}</span>
          <div class="flex-1"><Divider variant={v} spacing="none" /></div>
        </div>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Colors -->
<DemoSection title="Couleurs" description="12 couleurs disponibles." code={`<Divider color="red" />
<Divider color="emerald" />
<Divider color="violet" />
<Divider color="violet" variant="gradient" />`}>
  {#snippet children()}
    <div class="space-y-3">
      {#each colors as c}
        <Divider color={c} spacing="none" />
      {/each}
    </div>

    <h3 class="text-sm font-semibold mt-6 mb-3" style="color:var(--karbon-text-2);">Couleurs x Gradient</h3>
    <div class="space-y-3">
      {#each colors as c}
        <Divider color={c} variant="gradient" spacing="none" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Label -->
<DemoSection title="Avec label" description="Texte centre, a gauche ou a droite." code={`<Divider label="Centre (default)" />
<Divider label="A gauche" labelPosition="left" />
<Divider label="A droite" labelPosition="right" />
<Divider label="Couleur" color="violet" />`}>
  {#snippet children()}
    <div class="space-y-1">
      <Divider label="Centre (default)" />
      <Divider label="A gauche" labelPosition="left" />
      <Divider label="A droite" labelPosition="right" />
      <Divider label="Couleur" color="violet" />
      <Divider label="Gradient" color="emerald" variant="gradient" />
      <Divider label="Dashed" variant="dashed" />
    </div>
  {/snippet}
</DemoSection>

<!-- Icon -->
<DemoSection title="Avec icone" description="Remplacez le texte par une icone SVG." code={codeIcon}>
  {#snippet children()}
    <div class="space-y-1">
      <Divider color="violet">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        {/snippet}
      </Divider>
      <Divider label="ou" color="blue">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        {/snippet}
      </Divider>
      <Divider variant="gradient" color="pink">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        {/snippet}
      </Divider>
    </div>
  {/snippet}
</DemoSection>

<!-- Thickness -->
<DemoSection title="Epaisseur" description="De 1px (defaut) a N px." code={`<Divider thickness={1} color="violet" />
<Divider thickness={2} color="violet" />
<Divider thickness={3} color="violet" />
<Divider thickness={4} color="violet" />`}>
  {#snippet children()}
    <div class="space-y-3">
      {#each [1, 2, 3, 4] as t}
        <div class="flex items-center gap-3">
          <span class="text-[11px] font-semibold w-8 shrink-0" style="color:var(--karbon-text-4);">{t}px</span>
          <div class="flex-1"><Divider thickness={t} color="violet" spacing="none" /></div>
        </div>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Spacing -->
<DemoSection title="Espacement" description="Controle le margin vertical autour du divider." code={`<Divider spacing="none" />
<Divider spacing="sm" />
<Divider spacing="md" />
<Divider spacing="lg" />
<Divider spacing="xl" />`}>
  {#snippet children()}
    <div class="rounded-lg p-4" style="background:var(--karbon-bg-card);border:1px solid var(--karbon-border);">
      <p class="text-sm" style="color:var(--karbon-text-2);">Paragraphe avant</p>
      <Divider spacing="none" label="none" />
      <p class="text-sm" style="color:var(--karbon-text-2);">Paragraphe</p>
      <Divider spacing="sm" label="sm" />
      <p class="text-sm" style="color:var(--karbon-text-2);">Paragraphe</p>
      <Divider spacing="md" label="md" />
      <p class="text-sm" style="color:var(--karbon-text-2);">Paragraphe</p>
      <Divider spacing="lg" label="lg" />
      <p class="text-sm" style="color:var(--karbon-text-2);">Paragraphe</p>
      <Divider spacing="xl" label="xl" />
      <p class="text-sm" style="color:var(--karbon-text-2);">Paragraphe apres</p>
    </div>
  {/snippet}
</DemoSection>

<!-- Vertical -->
<DemoSection title="Vertical" description="Separateurs verticaux entre des elements inline." code={`<div class="flex items-center">
  <span>Accueil</span>
  <Divider direction="vertical" spacing="sm" />
  <span>Articles</span>
  <Divider direction="vertical" spacing="sm" color="violet" />
  <span>Contact</span>
</div>`}>
  {#snippet children()}
    <div class="flex items-center gap-0 h-10">
      <span class="text-sm px-3" style="color:var(--karbon-text-2);">Accueil</span>
      <Divider direction="vertical" spacing="sm" />
      <span class="text-sm px-3" style="color:var(--karbon-text-2);">Articles</span>
      <Divider direction="vertical" spacing="sm" />
      <span class="text-sm px-3" style="color:var(--karbon-text-2);">Videos</span>
      <Divider direction="vertical" spacing="sm" color="violet" />
      <span class="text-sm px-3 font-semibold" style="color:var(--karbon-violet-400);">Contact</span>
    </div>

    <div class="flex items-center gap-0 h-10 mt-4">
      <span class="text-sm px-3" style="color:var(--karbon-text-2);">Item 1</span>
      <Divider direction="vertical" spacing="sm" variant="dashed" />
      <span class="text-sm px-3" style="color:var(--karbon-text-2);">Item 2</span>
      <Divider direction="vertical" spacing="sm" variant="dotted" color="emerald" />
      <span class="text-sm px-3" style="color:var(--karbon-text-2);">Item 3</span>
      <Divider direction="vertical" spacing="sm" variant="gradient" color="pink" />
      <span class="text-sm px-3" style="color:var(--karbon-text-2);">Item 4</span>
    </div>
  {/snippet}
</DemoSection>

<!-- Use cases -->
<DemoSection title="Cas d'usage" description="Exemples concrets." code={`<!-- Login form -->
<Divider label="ou continuer avec" spacing="sm" />

<!-- Between sections -->
<Divider variant="gradient" color="violet" />`}>
  {#snippet children()}
    <div class="max-w-xs space-y-4">
      <h3 class="text-sm font-semibold" style="color:var(--karbon-text-2);">Formulaire de login</h3>
      <div class="rounded-lg p-5" style="background:var(--karbon-bg-card);border:1px solid var(--karbon-border);">
        <div class="h-9 rounded-lg mb-3" style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);"></div>
        <div class="h-9 rounded-lg mb-4" style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);"></div>
        <div class="h-9 rounded-lg mb-3" style="background:var(--karbon-primary);"></div>
        <Divider label="ou continuer avec" spacing="sm" />
        <div class="flex gap-2 mt-1">
          <div class="flex-1 h-9 rounded-lg" style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);"></div>
          <div class="flex-1 h-9 rounded-lg" style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);"></div>
        </div>
      </div>
    </div>
  {/snippet}
</DemoSection>
