<script lang="ts">
  import { Input, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `import { Input } from '@karbonjs/ui-svelte'

<Input name="email" type="email" label="Email" placeholder="you@example.com" bind:value={email} />
<Input name="pwd" type="password" label="Password" bind:value={pwd} />
<Input name="search" label="Search" clearable bind:value={q} />
<Input name="bio" inputVariant="filled" color="violet" error="Required" value="" />`;

  const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'emerald', 'cyan', 'blue', 'violet', 'pink', 'slate', 'zinc'] as const;
  const inputVariants = ['outlined', 'filled', 'underline'] as const;

  let textValue = $state('');
  let emailValue = $state('');
  let passwordValue = $state('');
  let searchValue = $state('');
  let clearableValue = $state('Effacez-moi');
</script>

<h1 class="text-3xl font-bold mb-2">Input</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Champs de saisie avec variants, couleurs, etats et icones.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Input Variants" code={`<Input name="out" label="Outlined" inputVariant="outlined" />
<Input name="fill" label="Filled" inputVariant="filled" />
<Input name="under" label="Underline" inputVariant="underline" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
      {#each inputVariants as variant}
        <Input name="variant-{variant}" label="{variant}" inputVariant={variant} placeholder="Tapez ici..." bind:value={textValue} />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Types" code={`<Input name="text" type="text" label="Text" />
<Input name="email" type="email" label="Email" />
<Input name="password" type="password" label="Password" />
<Input name="search" type="search" label="Search" clearable />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      <Input name="text" type="text" label="Text" placeholder="Votre nom" bind:value={textValue} />
      <Input name="email" type="email" label="Email" placeholder="email@exemple.com" bind:value={emailValue} />
      <Input name="password" type="password" label="Password" placeholder="Mot de passe" bind:value={passwordValue} />
      <Input name="search" type="search" label="Search" placeholder="Rechercher..." bind:value={searchValue} clearable />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Outlined × Colors" code={`<Input name="demo" inputVariant="outlined" color="violet" label="violet" />`}>
  {#snippet children()}
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      {#each colors as color}
        <Input name="outlined-{color}" inputVariant="outlined" {color} label="{color}" placeholder="{color}..." value="" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Filled × Colors" code={`<Input name="demo" inputVariant="filled" color="violet" label="violet" />`}>
  {#snippet children()}
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      {#each colors as color}
        <Input name="filled-{color}" inputVariant="filled" {color} label="{color}" placeholder="{color}..." value="" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Underline × Colors" code={`<Input name="demo" inputVariant="underline" color="violet" label="violet" />`}>
  {#snippet children()}
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      {#each colors as color}
        <Input name="underline-{color}" inputVariant="underline" {color} label="{color}" placeholder="{color}..." value="" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Error State" code={`<Input name="err" label="Outlined error"
  inputVariant="outlined" error="Ce champ est requis" value="" />
<Input name="err2" label="Error sans icone"
  error="Message" errorIcon={false} value="" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
      <Input name="error-outlined" label="Outlined error" inputVariant="outlined" error="Ce champ est requis" value="" />
      <Input name="error-filled" label="Filled error" inputVariant="filled" error="Email invalide" value="" />
      <Input name="error-underline" label="Underline error" inputVariant="underline" error="Trop court" value="" />
      <Input name="error-no-icon" label="Error sans icone" error="Message sans icone" errorIcon={false} value="" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Disabled" code={`<Input name="dis" label="Outlined disabled"
  inputVariant="outlined" disabled value="Desactive" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
      <Input name="disabled-outlined" label="Outlined disabled" inputVariant="outlined" disabled value="Desactive" />
      <Input name="disabled-filled" label="Filled disabled" inputVariant="filled" disabled value="Desactive" />
      <Input name="disabled-underline" label="Underline disabled" inputVariant="underline" disabled value="Desactive" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="With Icon" code={`<Input name="icon-search" label="Recherche" color="blue" value="">
  {#snippet icon()}
    <svg>...</svg>
  {/snippet}
</Input>`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      <Input name="icon-search" label="Recherche" placeholder="Rechercher..." color="blue" value="">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        {/snippet}
      </Input>
      <Input name="icon-email" label="Email" type="email" placeholder="email@exemple.com" color="violet" value="">
        {#snippet icon()}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        {/snippet}
      </Input>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Clearable" code={`<Input name="clearable" label="Clearable"
  clearable bind:value={val} color="emerald" />`}>
  {#snippet children()}
    <div class="max-w-sm">
      <Input name="clearable" label="Clearable" clearable bind:value={clearableValue} color="emerald" />
    </div>
  {/snippet}
</DemoSection>
