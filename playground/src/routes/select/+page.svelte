<script lang="ts">
  import { Select, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `import { Select } from '@karbonjs/ui-svelte'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]

<Select name="fruit" label="Fruit" {options} bind:value={selected} placeholder="Choose..." />
<Select name="multi" label="Tags" {options} bind:values={tags} multiple searchable clearable />
<Select name="styled" label="Color" {options} color="violet" inputVariant="filled" />`;

  const fruits = [
    { label: 'Pomme', value: 'apple' },
    { label: 'Banane', value: 'banana' },
    { label: 'Cerise', value: 'cherry' },
    { label: 'Fraise', value: 'strawberry' },
    { label: 'Mangue', value: 'mango' },
    { label: 'Kiwi', value: 'kiwi' },
    { label: 'Orange', value: 'orange' },
    { label: 'Raisin', value: 'grape' },
  ];

  const withDisabled = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2 (disabled)', value: '2', disabled: true },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4 (disabled)', value: '4', disabled: true },
    { label: 'Option 5', value: '5' },
  ];

  const countries = [
    { label: 'France', value: 'fr' },
    { label: 'Belgique', value: 'be' },
    { label: 'Suisse', value: 'ch' },
    { label: 'Canada', value: 'ca' },
    { label: 'Luxembourg', value: 'lu' },
    { label: 'Monaco', value: 'mc' },
    { label: 'Tunisie', value: 'tn' },
    { label: 'Maroc', value: 'ma' },
    { label: 'Senegal', value: 'sn' },
    { label: 'Cote d\'Ivoire', value: 'ci' },
  ];

  let singleValue = $state('');
  let multiValues = $state<string[]>([]);
  let searchValue = $state('');
  let coloredValue = $state('');
</script>

<h1 class="text-3xl font-bold mb-2">Select</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Selecteur custom avec dropdown, recherche, multi-select et chips.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8">

  <DemoSection title="Simple" code={`<Select name="basic" label="Fruit prefere"
  options={fruits} bind:value={val}
  placeholder="Choisir un fruit..." />`}>
    {#snippet children()}
      <div class="space-y-4">
        <Select name="basic" label="Fruit prefere" options={fruits} bind:value={singleValue} placeholder="Choisir un fruit..." />
        <p class="text-xs text-[var(--karbon-text-3)]">Valeur: {singleValue || 'aucune'}</p>
      </div>
    {/snippet}
  </DemoSection>

  <DemoSection title="Clearable" code={`<Select name="clearable" label="Avec effacement"
  options={fruits} bind:value={val} clearable />`}>
    {#snippet children()}
      <Select name="clearable" label="Avec effacement" options={fruits} bind:value={singleValue} clearable placeholder="Choisir..." />
    {/snippet}
  </DemoSection>

  <DemoSection title="Avec recherche" code={`<Select name="search" label="Pays"
  options={countries} bind:value={val} searchable />`}>
    {#snippet children()}
      <Select name="search" label="Pays" options={countries} bind:value={searchValue} searchable placeholder="Rechercher un pays..." />
    {/snippet}
  </DemoSection>

  <DemoSection title="Multi-select (chips)" code={`<Select name="multi" label="Fruits (multiple)"
  options={fruits} bind:values={vals}
  multiple clearable />`}>
    {#snippet children()}
      <div class="space-y-4">
        <Select name="multi" label="Fruits (multiple)" options={fruits} bind:values={multiValues} multiple clearable placeholder="Selectionner..." />
        <p class="text-xs text-[var(--karbon-text-3)]">Valeurs: {multiValues.join(', ') || 'aucune'}</p>
      </div>
    {/snippet}
  </DemoSection>

  <DemoSection title="Multi + Recherche" code={`<Select name="multi-search" label="Pays"
  options={countries} bind:values={vals}
  multiple searchable clearable />`}>
    {#snippet children()}
      <Select name="multi-search" label="Pays (multi + recherche)" options={countries} bind:values={multiValues} multiple searchable clearable placeholder="Rechercher et selectionner..." />
    {/snippet}
  </DemoSection>

  <DemoSection title="Options desactivees" code={`const opts = [
  { label: 'Option 2', value: '2', disabled: true },
]
<Select name="dis" options={opts} bind:value={val} />`}>
    {#snippet children()}
      <Select name="disabled-opts" label="Avec options disabled" options={withDisabled} bind:value={singleValue} />
    {/snippet}
  </DemoSection>

  <DemoSection title="Select desactive" code={`<Select name="disabled" label="Disabled"
  options={fruits} value="apple" disabled />`}>
    {#snippet children()}
      <Select name="disabled" label="Disabled" options={fruits} value="apple" disabled />
    {/snippet}
  </DemoSection>

  <DemoSection title="Erreur" code={`<Select name="error" label="Champ requis"
  options={fruits} error="Ce champ est obligatoire" />`}>
    {#snippet children()}
      <Select name="error" label="Champ requis" options={fruits} error="Ce champ est obligatoire" />
    {/snippet}
  </DemoSection>
</div>

<DemoSection title="Variants" code={`<Select name="outlined" label="Outlined" inputVariant="outlined" />
<Select name="filled" label="Filled" inputVariant="filled" />
<Select name="underline" label="Underline" inputVariant="underline" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Select name="outlined" label="Outlined" options={fruits} inputVariant="outlined" placeholder="Outlined..." />
      <Select name="filled" label="Filled" options={fruits} inputVariant="filled" placeholder="Filled..." />
      <Select name="underline" label="Underline" options={fruits} inputVariant="underline" placeholder="Underline..." />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Colors" code={`<Select name="color-violet" label="violet"
  options={fruits} color="violet" />`}>
  {#snippet children()}
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {#each ['violet', 'emerald', 'cyan', 'pink', 'blue', 'orange'] as c}
        <Select name="color-{c}" label="{c}" options={fruits} color={c} bind:value={coloredValue} placeholder="Choisir..." />
      {/each}
    </div>
  {/snippet}
</DemoSection>
