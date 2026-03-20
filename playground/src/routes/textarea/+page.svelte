<script lang="ts">
  import { Textarea, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `import { Textarea } from '@karbonjs/ui-svelte'

<Textarea name="comment" label="Comment" placeholder="Write here..." bind:value={text} />
<Textarea name="bio" label="Bio" rows={4} maxlength={200} showCount color="violet" />
<Textarea name="desc" label="Description" inputVariant="filled" error="Required" value="" />
<Textarea name="notes" label="Notes" readonly value="Read-only content" />`;

  const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'emerald', 'cyan', 'blue', 'violet', 'pink', 'slate', 'zinc'] as const;
  const inputVariants = ['outlined', 'filled', 'underline'] as const;

  let content = $state('');
  let limitedContent = $state('');
</script>

<h1 class="text-3xl font-bold mb-2">Textarea</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Zones de texte multi-lignes avec variants, couleurs, compteur et etats.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Input Variants" code={`<Textarea name="out" label="Outlined" inputVariant="outlined" />
<Textarea name="fill" label="Filled" inputVariant="filled" />
<Textarea name="under" label="Underline" inputVariant="underline" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {#each inputVariants as variant}
        <Textarea name="variant-{variant}" label="{variant}" inputVariant={variant} placeholder="Ecrivez ici..." rows={3} value="" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Rows" code={`<Textarea name="rows-2" label="2 lignes" rows={2} />
<Textarea name="rows-4" label="4 lignes" rows={4} />
<Textarea name="rows-6" label="6 lignes" rows={6} />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Textarea name="rows-2" label="2 lignes" rows={2} placeholder="2 rows" value="" />
      <Textarea name="rows-4" label="4 lignes" rows={4} placeholder="4 rows" value="" />
      <Textarea name="rows-6" label="6 lignes" rows={6} placeholder="6 rows" value="" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="MaxLength & Counter" code={`<Textarea name="limited" label="Limite a 200 caracteres"
  maxlength={200} showCount color="violet"
  bind:value={val} />`}>
  {#snippet children()}
    <div class="max-w-md">
      <Textarea name="limited" label="Limite a 200 caracteres" maxlength={200} showCount placeholder="Tapez pour voir le compteur..." bind:value={limitedContent} color="violet" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Colors" code={`<Textarea name="color-violet" color="violet" label="violet" rows={2} />`}>
  {#snippet children()}
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      {#each colors as color}
        <Textarea name="color-{color}" {color} label="{color}" placeholder="{color}..." rows={2} value="" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Error State" code={`<Textarea name="error-1" label="Description"
  error="Ce champ est requis" value="" />
<Textarea name="error-2" label="Bio"
  error="Trop court" inputVariant="filled" value="Bonjour" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      <Textarea name="error-1" label="Description" error="Ce champ est requis" placeholder="..." value="" />
      <Textarea name="error-2" label="Bio" error="Trop court, minimum 50 caracteres" inputVariant="filled" value="Bonjour" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Disabled & Readonly" code={`<Textarea name="disabled" label="Desactive" disabled value="Contenu desactive" />
<Textarea name="readonly" label="Lecture seule" readonly value="Contenu en lecture seule" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      <Textarea name="disabled" label="Desactive" disabled value="Contenu desactive" />
      <Textarea name="readonly" label="Lecture seule" readonly value="Contenu en lecture seule" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Interactive" code={`<Textarea name="interactive" label="Commentaire"
  rows={4} maxlength={500} showCount
  color="emerald" bind:value={content} />`}>
  {#snippet children()}
    <div class="max-w-md space-y-3">
      <Textarea name="interactive" label="Commentaire" placeholder="Ecrivez votre commentaire..." rows={4} maxlength={500} showCount color="emerald" bind:value={content} />
      <p class="text-sm text-[var(--karbon-text-2)]">Contenu: <strong>{content.length}</strong> caracteres</p>
    </div>
  {/snippet}
</DemoSection>
