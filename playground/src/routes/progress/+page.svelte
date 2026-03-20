<script lang="ts">
  import { Progress, Button, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { Progress } from '@karbonjs/ui-svelte'
<\/script>

<Progress value={65} color="violet" variant="glow" label="outside" />

<Progress value={45} color="emerald" variant="striped" animated size="lg" />

<Progress value={0} segments={[
  { value: 35, color: 'blue', label: 'Systeme' },
  { value: 25, color: 'violet', label: 'Apps' },
  { value: 15, color: 'amber', label: 'Media' },
]} size="lg" />`;

  const colors = ['red', 'orange', 'amber', 'emerald', 'cyan', 'blue', 'violet', 'pink'] as const;

  let animValue = $state(0);
  let running = $state(false);

  function startAnimation() {
    animValue = 0;
    running = true;
    const interval = setInterval(() => {
      animValue += Math.random() * 8 + 2;
      if (animValue >= 100) {
        animValue = 100;
        running = false;
        clearInterval(interval);
      }
    }, 200);
  }
</script>

<h1 class="text-3xl font-bold mb-2">Progress</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Barres de progression avec variantes, couleurs, tailles, labels et animations.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Basic" code={`<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />`}>
  {#snippet children()}
    <div class="space-y-4 max-w-lg">
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={75} />
      <Progress value={100} />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Colors" code={`<Progress value={60} color="emerald" />
<Progress value={40} color="violet" />`}>
  {#snippet children()}
    <div class="space-y-3 max-w-lg">
      {#each colors as c, i}
        <Progress value={20 + i * 10} color={c} />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Variants" code={`<Progress value={65} color="violet" />
<Progress value={65} color="violet" variant="striped" />
<Progress value={65} color="violet" variant="gradient" />
<Progress value={65} color="violet" variant="glow" />`}>
  {#snippet children()}
    <div class="space-y-4 max-w-lg">
      <div>
        <span class="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style="color: var(--karbon-text-4);">Default</span>
        <Progress value={65} color="violet" />
      </div>
      <div>
        <span class="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style="color: var(--karbon-text-4);">Striped</span>
        <Progress value={65} color="violet" variant="striped" />
      </div>
      <div>
        <span class="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style="color: var(--karbon-text-4);">Gradient</span>
        <Progress value={65} color="violet" variant="gradient" />
      </div>
      <div>
        <span class="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style="color: var(--karbon-text-4);">Glow</span>
        <Progress value={65} color="violet" variant="glow" />
      </div>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Striped × Colors" code={`<Progress value={50} color="emerald" variant="striped" />`}>
  {#snippet children()}
    <div class="space-y-2 max-w-lg">
      {#each colors as c, i}
        <Progress value={30 + i * 8} color={c} variant="striped" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Glow × Colors" code={`<Progress value={50} color="violet" variant="glow" />`}>
  {#snippet children()}
    <div class="space-y-3 max-w-lg">
      {#each colors as c, i}
        <Progress value={30 + i * 8} color={c} variant="glow" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Sizes" code={`<Progress value={65} color="emerald" size="xs" />
<Progress value={65} color="emerald" size="md" />
<Progress value={65} color="emerald" size="xl" />`}>
  {#snippet children()}
    <div class="space-y-4 max-w-lg">
      {#each ['xs', 'sm', 'md', 'lg', 'xl'] as sz}
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style="color: var(--karbon-text-4);">{sz}</span>
          <Progress value={65} color="emerald" size={sz} />
        </div>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Labels" code={'<Progress value={65} color="blue" label="outside" />\n<Progress value={45} color="violet" label="top" />\n<Progress value={72} color="emerald" label="inside" size="xl" />\n<Progress value={750} max={1000} color="cyan" label="outside"\n  labelFormat={(v, m) => `${v} / ${m} Mo`} />'}>
  {#snippet children()}
    <div class="space-y-5 max-w-lg">
      <div>
        <span class="text-xs mb-1.5 block" style="color: var(--karbon-text-4);">Outside (default)</span>
        <Progress value={65} color="blue" label="outside" />
      </div>
      <div>
        <span class="text-xs mb-1.5 block" style="color: var(--karbon-text-4);">Top</span>
        <Progress value={45} color="violet" label="top">
          {#snippet children()}Progression{/snippet}
        </Progress>
      </div>
      <div>
        <span class="text-xs mb-1.5 block" style="color: var(--karbon-text-4);">Inside (lg/xl only)</span>
        <Progress value={72} color="emerald" label="inside" size="xl" />
      </div>
      <div>
        <span class="text-xs mb-1.5 block" style="color: var(--karbon-text-4);">Custom format</span>
        <Progress value={750} max={1000} color="cyan" label="outside" labelFormat={(v, m) => `${v} / ${m} Mo`} />
      </div>
      <div>
        <span class="text-xs mb-1.5 block" style="color: var(--karbon-text-4);">Top + children label</span>
        <Progress value={3} max={5} color="pink" label="top" labelFormat={(v, m) => `Etape ${v}/${m}`}>
          {#snippet children()}Installation{/snippet}
        </Progress>
      </div>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Indeterminate" code={`<Progress value={0} indeterminate color="violet" />
<Progress value={0} indeterminate color="emerald" variant="glow" />`}>
  {#snippet children()}
    <div class="space-y-3 max-w-lg">
      <Progress value={0} indeterminate color="violet" />
      <Progress value={0} indeterminate color="emerald" variant="glow" />
      <Progress value={0} indeterminate color="cyan" size="sm" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Striped anime" code={`<Progress value={60} color="violet" variant="striped" animated />
<Progress value={80} color="emerald" variant="striped" animated />`}>
  {#snippet children()}
    <div class="space-y-3 max-w-lg">
      <Progress value={60} color="violet" variant="striped" animated />
      <Progress value={80} color="emerald" variant="striped" animated />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Multi-segments" code={`<Progress value={0} segments={[
  { value: 35, color: 'blue', label: 'Systeme' },
  { value: 25, color: 'violet', label: 'Apps' },
  { value: 15, color: 'amber', label: 'Media' },
]} size="lg" />`}>
  {#snippet children()}
    <div class="space-y-4 max-w-lg">
      <div>
        <span class="text-xs mb-1 block" style="color: var(--karbon-text-4);">Espace disque</span>
        <Progress value={0} segments={[
          { value: 35, color: 'blue', label: 'Systeme' },
          { value: 25, color: 'violet', label: 'Apps' },
          { value: 15, color: 'amber', label: 'Media' },
        ]} size="lg" />
        <div class="flex gap-4 mt-2">
          <span class="flex items-center gap-1 text-[11px]" style="color: var(--karbon-text-3);"><span class="w-2 h-2 rounded-full" style="background:var(--karbon-blue-500);"></span>Systeme 35%</span>
          <span class="flex items-center gap-1 text-[11px]" style="color: var(--karbon-text-3);"><span class="w-2 h-2 rounded-full" style="background:var(--karbon-violet-500);"></span>Apps 25%</span>
          <span class="flex items-center gap-1 text-[11px]" style="color: var(--karbon-text-3);"><span class="w-2 h-2 rounded-full" style="background:var(--karbon-amber-500);"></span>Media 15%</span>
        </div>
      </div>

      <div>
        <span class="text-xs mb-1 block" style="color: var(--karbon-text-4);">Sondage</span>
        <Progress value={0} segments={[
          { value: 45, color: 'emerald', label: 'Pour' },
          { value: 30, color: 'red', label: 'Contre' },
          { value: 25, color: 'slate', label: 'Abstention' },
        ]} size="md" />
      </div>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Animation en direct" code={`<Button size="sm" onclick={startAnimation}>Demarrer</Button>
<Progress value={animValue} color="violet"
  variant="glow" label="outside" size="lg" />`}>
  {#snippet children()}
    <div class="max-w-lg">
      <Button size="sm" variant="flat" color="violet" onclick={startAnimation} disabled={running} class="mb-3">
        {running ? 'En cours...' : 'Demarrer'}
      </Button>
      <Progress value={animValue} color="violet" variant="glow" label="outside" size="lg" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Shapes" code={`<Progress value={65} color="blue" shape="rounded" />
<Progress value={65} color="blue" shape="square" />`}>
  {#snippet children()}
    <div class="space-y-3 max-w-lg">
      <div>
        <span class="text-xs mb-1 block" style="color: var(--karbon-text-4);">Rounded (default)</span>
        <Progress value={65} color="blue" shape="rounded" />
      </div>
      <div>
        <span class="text-xs mb-1 block" style="color: var(--karbon-text-4);">Square</span>
        <Progress value={65} color="blue" shape="square" />
      </div>
    </div>
  {/snippet}
</DemoSection>
