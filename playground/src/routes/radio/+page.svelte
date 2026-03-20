<script lang="ts">
  import { Radio, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `import { Radio } from '@karbonjs/ui-svelte'

const options = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro', description: 'Priority support' },
  { label: 'Legacy', value: 'legacy', disabled: true },
]

<Radio name="plan" label="Plan" {options} bind:value={plan} />
<Radio name="row" label="Size" {options} direction="row" color="violet" />
<Radio name="styled" {options} variant="elegant" color="emerald" value="pro" />`;

  const colors = ['red', 'orange', 'amber', 'emerald', 'cyan', 'blue', 'violet', 'pink'] as const;

  const fruits = [
    { label: 'Pomme', value: 'apple' },
    { label: 'Banane', value: 'banana' },
    { label: 'Cerise', value: 'cherry' },
  ];

  const plans = [
    { label: 'Gratuit', value: 'free', description: 'Fonctionnalites de base, 1 projet' },
    { label: 'Pro', value: 'pro', description: '10 projets, support prioritaire' },
    { label: 'Enterprise', value: 'enterprise', description: 'Projets illimites, SLA garanti' },
    { label: 'Legacy', value: 'legacy', description: 'Plus disponible', disabled: true },
  ];

  let fruit = $state('apple');
  let plan = $state('pro');
</script>

<h1 class="text-3xl font-bold mb-2">Radio</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Boutons radio avec couleurs, tailles, variantes et descriptions.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Basic" code={`<Radio name="fruit-col" label="Fruit (colonne)"
  options={fruits} bind:value={fruit} />
<Radio name="fruit-row" label="Fruit (ligne)"
  options={fruits} bind:value={fruit} direction="row" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Radio name="fruit-col" label="Fruit (colonne)" options={fruits} bind:value={fruit} />
      <Radio name="fruit-row" label="Fruit (ligne)" options={fruits} bind:value={fruit} direction="row" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Avec descriptions" code={`<Radio name="plan" label="Choisir un plan" options={plans}
  bind:value={plan} />`}>
  {#snippet children()}
    <Radio name="plan" label="Choisir un plan" options={plans} bind:value={plan} />
  {/snippet}
</DemoSection>

<DemoSection title="Variants" code={`<Radio name="v-filled" label="Filled" options={fruits}
  variant="filled" value="apple" color="violet" />
<Radio name="v-elegant" label="Elegant" options={fruits}
  variant="elegant" value="apple" color="violet" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Radio name="v-filled" label="Filled" options={fruits} variant="filled" value="apple" color="violet" />
      <Radio name="v-outlined" label="Outlined" options={fruits} variant="outlined" value="apple" color="violet" />
      <Radio name="v-ghost" label="Ghost" options={fruits} variant="ghost" value="apple" color="violet" />
      <Radio name="v-elegant" label="Elegant" options={fruits} variant="elegant" value="apple" color="violet" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Colors" code={`<Radio name="color-emerald" label="emerald"
  options={fruits} color="emerald" value="apple" />`}>
  {#snippet children()}
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      {#each colors as c}
        <Radio name="color-{c}" label="{c}" options={fruits} color={c} value="apple" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Sizes" code={`<Radio name="sz-sm" label="Small" options={fruits} size="sm" value="apple" color="blue" />
<Radio name="sz-md" label="Medium" options={fruits} size="md" value="apple" color="blue" />
<Radio name="sz-lg" label="Large" options={fruits} size="lg" value="apple" color="blue" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Radio name="sz-sm" label="Small" options={fruits} size="sm" value="apple" color="blue" />
      <Radio name="sz-md" label="Medium" options={fruits} size="md" value="apple" color="blue" />
      <Radio name="sz-lg" label="Large" options={fruits} size="lg" value="apple" color="blue" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Variants × Colors" code={`<Radio name="vc-filled-emerald" options={fruits}
  variant="filled" color="emerald" value="apple" direction="row" />`}>
  {#snippet children()}
    {#each ['filled', 'outlined', 'ghost', 'elegant'] as v}
      <h3 class="text-sm font-semibold text-[var(--karbon-text-3)] uppercase tracking-wider mb-2 mt-4">{v}</h3>
      <div class="flex flex-wrap gap-6">
        {#each ['emerald', 'violet', 'cyan', 'pink'] as c}
          <Radio name="vc-{v}-{c}" options={fruits} variant={v} color={c} value="apple" direction="row" />
        {/each}
      </div>
    {/each}
  {/snippet}
</DemoSection>

<DemoSection title="Disabled" code={`<Radio name="disabled" label="Tout desactive"
  options={fruits} value="apple" disabled />`}>
  {#snippet children()}
    <Radio name="disabled" label="Tout desactive" options={fruits} value="apple" disabled />
  {/snippet}
</DemoSection>
