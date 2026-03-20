<script lang="ts">
  import { ImageCompare, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { ImageCompare } from '@karbonjs/ui-svelte'
<\/script>

<ImageCompare
  before="/before.jpg"
  after="/after.jpg"
  beforeLabel="Avant"
  afterLabel="Apres"
  color="violet"
  rounded="xl"
/>

<!-- Mode vertical -->
<ImageCompare
  before="/old.jpg"
  after="/new.jpg"
  orientation="vertical"
  initialPosition={25}
  color="cyan"
/>`;

  const colors = ['red', 'emerald', 'cyan', 'blue', 'violet', 'pink'] as const;
</script>

<h1 class="text-3xl font-bold mb-2">ImageCompare</h1>
<p class="text-[var(--karbon-text-3)] mb-10">Comparateur d'images avant/apres avec slider, touch support et keyboard nav.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Basic" description="Glissez le curseur pour comparer. Fonctionne aussi au touch et au clavier." code={`<ImageCompare
  before="/before.jpg"
  after="/after.jpg"
  rounded="xl"
/>`}>
  {#snippet children()}
    <ImageCompare
      before="https://picsum.photos/seed/compare-before/800/500"
      after="https://picsum.photos/seed/compare-after/800/500"
      rounded="xl"
    />
  {/snippet}
</DemoSection>

<DemoSection title="Flou → Net" description="Meme image : version floue vs version nette. Ideal pour montrer un debruitage ou un upscale IA." code={`<ImageCompare
  before="/blur.jpg"
  after="/sharp.jpg"
  beforeLabel="Flou"
  afterLabel="Net"
  color="cyan"
  rounded="xl"
/>`}>
  {#snippet children()}
    <ImageCompare
      before="https://picsum.photos/seed/blur-demo/800/500?blur=10"
      after="https://picsum.photos/seed/blur-demo/800/500"
      beforeLabel="Flou"
      afterLabel="Net"
      color="cyan"
      rounded="xl"
    />
  {/snippet}
</DemoSection>

<DemoSection title="Noir & blanc → Couleur" description="Comparez une version desaturee et la version couleur." code={`<ImageCompare
  before="/grayscale.jpg"
  after="/color.jpg"
  beforeLabel="N&B"
  afterLabel="Couleur"
  color="violet"
  rounded="xl"
/>`}>
  {#snippet children()}
    <ImageCompare
      before="https://picsum.photos/seed/bw-demo/800/500?grayscale"
      after="https://picsum.photos/seed/bw-demo/800/500"
      beforeLabel="N&B"
      afterLabel="Couleur"
      color="violet"
      rounded="xl"
    />
  {/snippet}
</DemoSection>

<DemoSection title="Labels custom" description="Personnalisez les textes avant/apres." code={`<ImageCompare before="/day.jpg" after="/night.jpg" beforeLabel="Jour" afterLabel="Nuit" color="amber" />
<ImageCompare before="/old.jpg" after="/new.jpg" beforeLabel="Original" afterLabel="Retouche" color="violet" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ImageCompare
        before="https://picsum.photos/seed/day/600/400"
        after="https://picsum.photos/seed/night/600/400"
        beforeLabel="Jour"
        afterLabel="Nuit"
        color="amber"
      />
      <ImageCompare
        before="https://picsum.photos/seed/old/600/400"
        after="https://picsum.photos/seed/new/600/400"
        beforeLabel="Original"
        afterLabel="Retouche"
        color="violet"
      />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Couleurs" description="La ligne et le handle prennent la couleur choisie." code={`<ImageCompare before="/a.jpg" after="/b.jpg" color="red" showLabels={false} rounded="lg" />
<ImageCompare before="/a.jpg" after="/b.jpg" color="violet" showLabels={false} rounded="lg" />`}>
  {#snippet children()}
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {#each colors as c}
        <ImageCompare
          before="https://picsum.photos/seed/cc-{c}-a/400/300"
          after="https://picsum.photos/seed/cc-{c}-b/400/300"
          color={c}
          beforeLabel=""
          afterLabel=""
          showLabels={false}
          rounded="lg"
        />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Position initiale" description="Definissez ou le slider commence." code={`<ImageCompare before="/a.jpg" after="/b.jpg" initialPosition={25} color="blue" />
<ImageCompare before="/a.jpg" after="/b.jpg" initialPosition={50} color="emerald" />
<ImageCompare before="/a.jpg" after="/b.jpg" initialPosition={75} color="pink" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">25%</span>
        <ImageCompare
          before="https://picsum.photos/seed/pos25a/400/300"
          after="https://picsum.photos/seed/pos25b/400/300"
          initialPosition={25}
          color="blue"
        />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">50% (default)</span>
        <ImageCompare
          before="https://picsum.photos/seed/pos50a/400/300"
          after="https://picsum.photos/seed/pos50b/400/300"
          initialPosition={50}
          color="emerald"
        />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">75%</span>
        <ImageCompare
          before="https://picsum.photos/seed/pos75a/400/300"
          after="https://picsum.photos/seed/pos75b/400/300"
          initialPosition={75}
          color="pink"
        />
      </div>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Vertical" description="Le slider se deplace de haut en bas." code={`<ImageCompare
  before="/a.jpg"
  after="/b.jpg"
  orientation="vertical"
  beforeLabel="Haut"
  afterLabel="Bas"
  color="cyan"
  rounded="xl"
/>`}>
  {#snippet children()}
    <div class="max-w-md">
      <ImageCompare
        before="https://picsum.photos/seed/vert-a/600/400"
        after="https://picsum.photos/seed/vert-b/600/400"
        orientation="vertical"
        beforeLabel="Haut"
        afterLabel="Bas"
        color="cyan"
        rounded="xl"
      />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Arrondis" description="5 niveaux d'arrondi." code={`<ImageCompare before="/a.jpg" after="/b.jpg" rounded="none" showLabels={false} color="violet" />
<ImageCompare before="/a.jpg" after="/b.jpg" rounded="xl" showLabels={false} color="violet" />`}>
  {#snippet children()}
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      {#each ['none', 'sm', 'md', 'lg', 'xl'] as r}
        <div>
          <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">{r}</span>
          <ImageCompare
            before="https://picsum.photos/seed/round-{r}-a/200/200"
            after="https://picsum.photos/seed/round-{r}-b/200/200"
            rounded={r}
            showLabels={false}
            color="violet"
            height="120px"
          />
        </div>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Sans handle / Sans labels" description="Mode minimal avec juste la ligne." code={`<ImageCompare before="/a.jpg" after="/b.jpg" showHandle={false} color="emerald" />
<ImageCompare before="/a.jpg" after="/b.jpg" showLabels={false} color="pink" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans handle</span>
        <ImageCompare
          before="https://picsum.photos/seed/no-handle-a/500/350"
          after="https://picsum.photos/seed/no-handle-b/500/350"
          showHandle={false}
          color="emerald"
        />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans labels</span>
        <ImageCompare
          before="https://picsum.photos/seed/no-labels-a/500/350"
          after="https://picsum.photos/seed/no-labels-b/500/350"
          showLabels={false}
          color="pink"
        />
      </div>
    </div>
  {/snippet}
</DemoSection>
