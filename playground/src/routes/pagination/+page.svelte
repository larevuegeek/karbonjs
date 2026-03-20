<script lang="ts">
  import { Pagination, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { Pagination } from '@karbonjs/ui-svelte'

  let page = $state(1)
<\/script>

<Pagination bind:page total={200} perPage={10} color="violet" />
<Pagination bind:page total={200} perPage={10} variant="outline" color="blue" />
<Pagination page={3} total={200} perPage={10} baseUrl="/articles" />`;

  const colors = ['red', 'emerald', 'cyan', 'blue', 'violet', 'pink'] as const;

  let page1 = $state(1);
  let page2 = $state(5);
  let page3 = $state(1);
  let page4 = $state(12);
</script>

<h1 class="text-3xl font-bold mb-2">Pagination</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Navigation entre pages avec ellipsis, first/last, variantes et couleurs.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<!-- Basic -->
<DemoSection title="Basic" description="Pagination simple avec bind:page." code={`<Pagination
  bind:page={page1}
  total={200}
  perPage={10}
/>`}>
  {#snippet children()}
    <Pagination bind:page={page1} total={200} perPage={10} />
    <p class="text-xs mt-2" style="color: var(--karbon-text-4);">Page: {page1}</p>
  {/snippet}
</DemoSection>

<!-- Variants -->
<DemoSection title="Variants" description="4 variantes visuelles : default, outline, flat, minimal." code={`<Pagination bind:page total={500} perPage={10} color="violet" />
<Pagination bind:page total={500} perPage={10} variant="outline" color="violet" />
<Pagination bind:page total={500} perPage={10} variant="flat" color="violet" />
<Pagination bind:page total={500} perPage={10} variant="minimal" color="violet" />`}>
  {#snippet children()}
    <div class="space-y-4">
      <div>
        <span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Default</span>
        <Pagination bind:page={page2} total={500} perPage={10} color="violet" />
      </div>
      <div>
        <span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Outline</span>
        <Pagination bind:page={page2} total={500} perPage={10} variant="outline" color="violet" />
      </div>
      <div>
        <span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Flat</span>
        <Pagination bind:page={page2} total={500} perPage={10} variant="flat" color="violet" />
      </div>
      <div>
        <span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Minimal</span>
        <Pagination bind:page={page2} total={500} perPage={10} variant="minimal" color="violet" />
      </div>
    </div>
  {/snippet}
</DemoSection>

<!-- Colors -->
<DemoSection title="Colors" description="6 couleurs disponibles." code={`<Pagination page={3} total={100} perPage={10} color="emerald" />
<Pagination page={3} total={100} perPage={10} color="violet" />`}>
  {#snippet children()}
    <div class="space-y-3">
      {#each colors as c}
        <Pagination page={3} total={100} perPage={10} color={c} />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Sizes -->
<DemoSection title="Sizes" description="3 tailles : sm, md, lg." code={`<Pagination bind:page total={150} perPage={10} size="sm" color="emerald" />
<Pagination bind:page total={150} perPage={10} size="md" color="emerald" />
<Pagination bind:page total={150} perPage={10} size="lg" color="emerald" />`}>
  {#snippet children()}
    <div class="space-y-4">
      <div>
        <span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Small</span>
        <Pagination bind:page={page3} total={150} perPage={10} size="sm" color="emerald" />
      </div>
      <div>
        <span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Medium</span>
        <Pagination bind:page={page3} total={150} perPage={10} size="md" color="emerald" />
      </div>
      <div>
        <span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Large</span>
        <Pagination bind:page={page3} total={150} perPage={10} size="lg" color="emerald" />
      </div>
    </div>
  {/snippet}
</DemoSection>

<!-- Many pages (ellipsis) -->
<DemoSection title="Beaucoup de pages (ellipsis)" description="Navigation avec ellipsis pour les grandes listes." code={`<Pagination
  bind:page
  total={1000}
  perPage={10}
  color="blue"
  siblings={2}
/>`}>
  {#snippet children()}
    <Pagination bind:page={page4} total={1000} perPage={10} color="blue" siblings={2} />
    <p class="text-xs mt-2" style="color: var(--karbon-text-4);">Page {page4} / 100 — Naviguez pour voir les ellipsis</p>
  {/snippet}
</DemoSection>

<!-- Without first/last -->
<DemoSection title="Sans first/last" description="Masque les boutons premiere/derniere page." code={`<Pagination
  page={3}
  total={200}
  perPage={10}
  showFirstLast={false}
  color="pink"
/>`}>
  {#snippet children()}
    <Pagination page={3} total={200} perPage={10} showFirstLast={false} color="pink" />
  {/snippet}
</DemoSection>

<!-- With links (SSR) -->
<DemoSection title="Avec liens (SSR)" description="Utilise des balises <a> au lieu de <button> pour le SSR/SEO." code={`<Pagination
  page={3}
  total={200}
  perPage={10}
  baseUrl="/pagination"
  color="violet"
/>`}>
  {#snippet children()}
    <Pagination page={3} total={200} perPage={10} baseUrl="/pagination" color="violet" />
  {/snippet}
</DemoSection>
