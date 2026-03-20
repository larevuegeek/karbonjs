<script lang="ts">
  import { Badge, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `import { Badge } from '@karbonjs/ui-svelte'

<Badge>Default</Badge>
<Badge color="emerald" variant="solid">Active</Badge>
<Badge color="red" variant="dot">Offline</Badge>
<Badge color="violet" closable onclose={() => {}}>Tag</Badge>`;

  const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'emerald', 'cyan', 'blue', 'violet', 'pink', 'slate', 'zinc'] as const;

  let tags = $state(['Svelte', 'React', 'TypeScript', 'Tailwind', 'Rust']);

  function removeTag(tag: string) {
    tags = tags.filter(t => t !== tag);
  }
</script>

<h1 class="text-3xl font-bold mb-2">Badge</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Badges avec variantes, couleurs, tailles, formes, dot indicator et closable.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Variants" code={`<Badge variant="soft">Soft</Badge>
<Badge variant="solid">Solid</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="dot">Dot</Badge>`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      <Badge variant="soft">Soft</Badge>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="dot">Dot</Badge>
      <Badge variant="flat">Flat</Badge>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Soft × Colors" code={`<Badge color="emerald" variant="soft">emerald</Badge>
<Badge color="violet" variant="soft">violet</Badge>`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      {#each colors as color}
        <Badge {color} variant="soft">{color}</Badge>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Solid × Colors" code={`<Badge color="emerald" variant="solid">emerald</Badge>
<Badge color="violet" variant="solid">violet</Badge>`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      {#each colors as color}
        <Badge {color} variant="solid">{color}</Badge>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Outline × Colors" code={`<Badge color="emerald" variant="outline">emerald</Badge>
<Badge color="violet" variant="outline">violet</Badge>`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      {#each colors as color}
        <Badge {color} variant="outline">{color}</Badge>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Dot × Colors" code={`<Badge color="emerald" variant="dot">emerald</Badge>
<Badge color="red" variant="dot">red</Badge>`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      {#each colors as color}
        <Badge {color} variant="dot">{color}</Badge>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Sizes" code={`<Badge size="xs" color="violet">XS</Badge>
<Badge size="sm" color="violet">SM</Badge>
<Badge size="md" color="violet">MD</Badge>
<Badge size="lg" color="violet">LG</Badge>`}>
  {#snippet children()}
    <div class="flex flex-wrap items-center gap-2">
      <Badge size="xs" color="violet">XS</Badge>
      <Badge size="sm" color="violet">SM</Badge>
      <Badge size="md" color="violet">MD</Badge>
      <Badge size="lg" color="violet">LG</Badge>
    </div>
    <div class="flex flex-wrap items-center gap-2 mt-3">
      <Badge size="xs" color="emerald" variant="solid">XS</Badge>
      <Badge size="sm" color="emerald" variant="solid">SM</Badge>
      <Badge size="md" color="emerald" variant="solid">MD</Badge>
      <Badge size="lg" color="emerald" variant="solid">LG</Badge>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Shapes" code={`<Badge shape="pill" color="blue">Pill</Badge>
<Badge shape="rounded" color="blue">Rounded</Badge>
<Badge shape="square" color="blue">Square</Badge>`}>
  {#snippet children()}
    <div class="flex flex-wrap items-center gap-2">
      <Badge shape="pill" color="blue">Pill</Badge>
      <Badge shape="rounded" color="blue">Rounded</Badge>
      <Badge shape="square" color="blue">Square</Badge>
    </div>
    <div class="flex flex-wrap items-center gap-2 mt-3">
      <Badge shape="pill" color="pink" variant="outline">Pill</Badge>
      <Badge shape="rounded" color="pink" variant="outline">Rounded</Badge>
      <Badge shape="square" color="pink" variant="outline">Square</Badge>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Closable (tags)" code={`<Badge color="violet" closable onclose={() => removeTag(tag)}>
  {tag}
</Badge>`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      {#each tags as tag}
        <Badge color="violet" closable onclose={() => removeTag(tag)}>{tag}</Badge>
      {/each}
    </div>
    {#if tags.length === 0}
      <p class="text-xs mt-2" style="color: var(--karbon-text-4);">Tous les tags ont ete retires. <button class="underline cursor-pointer" onclick={() => tags = ['Svelte', 'React', 'TypeScript', 'Tailwind', 'Rust']}>Reinitialiser</button></p>
    {/if}
  {/snippet}
</DemoSection>

<DemoSection title="Closable × Colors" code={`<Badge color="emerald" closable onclose={() => {}}>emerald</Badge>`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      {#each colors as color}
        <Badge {color} closable onclose={() => {}}>{color}</Badge>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Dot indicator" code={`<Badge dot color="emerald" variant="soft">En ligne</Badge>
<Badge dot color="red" variant="soft">Hors ligne</Badge>`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-3">
      <Badge dot color="emerald" variant="soft">En ligne</Badge>
      <Badge dot color="amber" variant="soft">Absent</Badge>
      <Badge dot color="red" variant="soft">Hors ligne</Badge>
      <Badge dot color="blue" variant="soft">Occupe</Badge>
      <Badge dot color="slate" variant="soft">Inconnu</Badge>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Cas d'usage" description="Statuts, roles, categories et notifications" code={`<Badge color="emerald" variant="dot" size="md">Publie</Badge>
<Badge color="red" variant="solid" size="sm">Super Admin</Badge>
<Badge color="cyan" variant="outline" shape="rounded">Tech</Badge>`}>
  {#snippet children()}
    <h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Statuts</h3>
    <div class="flex flex-wrap gap-2">
      <Badge color="emerald" variant="dot" size="md">Publie</Badge>
      <Badge color="amber" variant="dot" size="md">Brouillon</Badge>
      <Badge color="red" variant="dot" size="md">Archive</Badge>
      <Badge color="blue" variant="dot" size="md">En revision</Badge>
    </div>

    <h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Roles</h3>
    <div class="flex flex-wrap gap-2">
      <Badge color="red" variant="solid" size="sm">Super Admin</Badge>
      <Badge color="orange" variant="solid" size="sm">Admin</Badge>
      <Badge color="violet" variant="solid" size="sm">Redacteur</Badge>
      <Badge color="slate" variant="solid" size="sm">Utilisateur</Badge>
    </div>

    <h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Categories</h3>
    <div class="flex flex-wrap gap-2">
      <Badge color="cyan" variant="outline" shape="rounded" size="md">Technologie</Badge>
      <Badge color="pink" variant="outline" shape="rounded" size="md">Lifestyle</Badge>
      <Badge color="emerald" variant="outline" shape="rounded" size="md">Gaming</Badge>
      <Badge color="amber" variant="outline" shape="rounded" size="md">Cinema</Badge>
    </div>

    <h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Notifications</h3>
    <div class="flex flex-wrap items-center gap-4">
      <span class="relative">
        <span style="color: var(--karbon-text-2);">Messages</span>
        <Badge color="red" variant="solid" size="xs" class="absolute -top-2 -right-5">3</Badge>
      </span>
      <span class="relative">
        <span style="color: var(--karbon-text-2);">Alertes</span>
        <Badge color="amber" variant="solid" size="xs" class="absolute -top-2 -right-6">12</Badge>
      </span>
      <span class="relative">
        <span style="color: var(--karbon-text-2);">Updates</span>
        <Badge color="blue" variant="solid" size="xs" class="absolute -top-2 -right-3">!</Badge>
      </span>
    </div>
  {/snippet}
</DemoSection>
