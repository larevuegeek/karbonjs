<script lang="ts">
  import { Slider, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `import { Slider } from '@karbonjs/ui-svelte'

<Slider name="volume" label="Volume" bind:value={volume} />
<Slider name="temp" label="Temperature" min={10} max={35} step={0.5} color="red" />
<Slider name="hidden" label="Opacity" showValue={false} value={80} color="violet" />
<Slider name="off" label="Disabled" disabled value={40} />`;

  const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'emerald', 'cyan', 'blue', 'violet', 'pink', 'slate', 'zinc'] as const;

  let volume = $state(50);
  let brightness = $state(75);
  let temperature = $state(22);
</script>

<h1 class="text-3xl font-bold mb-2">Slider</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Curseurs de selection avec min/max, step, couleurs et etats.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Basic" code={`<Slider name="basic" label="Volume" bind:value={volume} />
<Slider name="brightness" label="Luminosite" bind:value={brightness} color="amber" />`}>
  {#snippet children()}
    <div class="max-w-md space-y-6">
      <Slider name="basic" label="Volume" bind:value={volume} />
      <Slider name="brightness" label="Luminosite" bind:value={brightness} color="amber" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Min / Max / Step" code={`<Slider name="temp" label="Temperature (°C)"
  min={10} max={35} step={0.5} bind:value={temperature} color="red" />
<Slider name="percent" label="Pourcentage"
  min={0} max={100} step={5} value={60} color="emerald" />`}>
  {#snippet children()}
    <div class="max-w-md space-y-6">
      <Slider name="temp" label="Temperature (°C)" min={10} max={35} step={0.5} bind:value={temperature} color="red" />
      <Slider name="percent" label="Pourcentage" min={0} max={100} step={5} value={60} color="emerald" />
      <Slider name="range" label="Range (0-1000)" min={0} max={1000} step={50} value={500} color="blue" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Colors" code={`<Slider name="color-violet" label="violet" color="violet" value={50} />
<Slider name="color-emerald" label="emerald" color="emerald" value={50} />`}>
  {#snippet children()}
    <div class="max-w-md space-y-4">
      {#each colors as color}
        <Slider name="color-{color}" label="{color}" {color} value={50} />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Without Value Display" code={`<Slider name="no-value" label="Slider sans valeur"
  showValue={false} value={30} color="violet" />`}>
  {#snippet children()}
    <div class="max-w-md">
      <Slider name="no-value" label="Slider sans valeur" showValue={false} value={30} color="violet" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Disabled" code={`<Slider name="disabled" label="Desactive" disabled value={40} />`}>
  {#snippet children()}
    <div class="max-w-md">
      <Slider name="disabled" label="Desactive" disabled value={40} />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Interactive" code={`<Slider name="int-volume" label="Volume" bind:value={volume} color="cyan" />
<Slider name="int-brightness" label="Luminosite" bind:value={brightness} color="amber" />
<Slider name="int-temp" label="Temperature"
  min={15} max={30} step={0.5} bind:value={temperature} color="red" />`}>
  {#snippet children()}
    <div class="max-w-md space-y-4 p-4 rounded-xl border border-[var(--karbon-border)]">
      <Slider name="int-volume" label="Volume" bind:value={volume} color="cyan" />
      <Slider name="int-brightness" label="Luminosite" bind:value={brightness} color="amber" />
      <Slider name="int-temp" label="Temperature" min={15} max={30} step={0.5} bind:value={temperature} color="red" />
      <div class="text-xs text-[var(--karbon-text-3)] pt-2 border-t border-[var(--karbon-border)]">
        Volume: <strong>{volume}</strong> | Luminosite: <strong>{brightness}</strong> | Temp: <strong>{temperature}°C</strong>
      </div>
    </div>
  {/snippet}
</DemoSection>
