<script lang="ts">
  import { Checkbox, Toggle, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `import { Checkbox, Toggle } from '@karbonjs/ui-svelte'

<Checkbox name="terms" label="Accept terms" bind:checked={accepted} />
<Checkbox name="news" label="Newsletter" description="Get weekly updates" color="violet" />
<Checkbox name="star" label="Favorite" icon="star" color="amber" checked />

<Toggle name="dark" label="Dark mode" bind:checked={dark} />
<Toggle name="notif" label="Notifications" color="emerald" showIcons checked />`;

  const colors = ['red', 'orange', 'amber', 'emerald', 'cyan', 'blue', 'violet', 'pink'] as const;

  let basic = $state(false);
  let terms = $state(false);
  let toggle1 = $state(true);
  let toggle2 = $state(false);
</script>

<h1 class="text-3xl font-bold mb-2">Checkbox & Toggle</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Cases a cocher et interrupteurs avec couleurs, tailles et variantes.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Checkbox — Basic" code={`<Checkbox name="basic" label="Option simple" bind:checked={val} />
<Checkbox name="checked" label="Pre-coche" checked={true} />
<Checkbox name="ind" label="Indeterminate" indeterminate />
<Checkbox name="dis" label="Desactive" disabled />`}>
  {#snippet children()}
    <div class="space-y-3">
      <Checkbox name="basic" label="Option simple" bind:checked={basic} />
      <Checkbox name="checked" label="Pre-coche" checked={true} />
      <Checkbox name="indeterminate" label="Indeterminate" indeterminate />
      <Checkbox name="disabled" label="Desactive" disabled />
      <Checkbox name="disabled-checked" label="Desactive coche" checked disabled />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Avec description" code={`<Checkbox name="terms" label="J'accepte les conditions"
  description="En cochant, vous acceptez les CGU."
  bind:checked={terms} />`}>
  {#snippet children()}
    <div class="space-y-4">
      <Checkbox name="terms" label="J'accepte les conditions" description="En cochant cette case, vous acceptez les CGU et la politique de confidentialite." bind:checked={terms} />
      <Checkbox name="newsletter" label="Newsletter" description="Recevoir les dernieres actualites et offres par email." />
      <Checkbox name="partners" label="Partenaires" description="Autoriser le partage de vos donnees avec nos partenaires." disabled />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Variants" description="Filled, Outlined, Ghost et Elegant" code={`<Checkbox name="v-filled" label="Filled" variant="filled" checked color="violet" />
<Checkbox name="v-outlined" label="Outlined" variant="outlined" checked color="violet" />
<Checkbox name="v-ghost" label="Ghost" variant="ghost" checked color="violet" />
<Checkbox name="v-elegant" label="Elegant" variant="elegant" checked color="violet" />`}>
  {#snippet children()}
    <div class="space-y-4">
      <div class="flex flex-wrap items-start gap-6">
        <Checkbox name="v-filled" label="Filled (default)" variant="filled" checked color="violet" />
        <Checkbox name="v-outlined" label="Outlined" variant="outlined" checked color="violet" />
        <Checkbox name="v-ghost" label="Ghost" variant="ghost" checked color="violet" />
        <Checkbox name="v-elegant" label="Elegant" variant="elegant" checked color="violet" />
      </div>
      <div class="flex flex-wrap items-start gap-6">
        <Checkbox name="v-filled-off" label="Filled (off)" variant="filled" />
        <Checkbox name="v-outlined-off" label="Outlined (off)" variant="outlined" />
        <Checkbox name="v-ghost-off" label="Ghost (off)" variant="ghost" />
        <Checkbox name="v-elegant-off" label="Elegant (off)" variant="elegant" />
      </div>
    </div>

    <h3 class="text-base font-semibold mb-3 mt-6 text-[var(--karbon-text-2)]">Variants × Colors</h3>
    {#each ['filled', 'outlined', 'ghost', 'elegant'] as v}
      <div class="flex flex-wrap gap-4 mb-3">
        <span class="text-xs font-semibold text-[var(--karbon-text-4)] uppercase w-16 pt-1">{v}</span>
        {#each colors as color}
          <Checkbox name="vc-{v}-{color}" variant={v} {color} checked />
        {/each}
      </div>
    {/each}
  {/snippet}
</DemoSection>

<DemoSection title="Colors" code={`<Checkbox name="color-emerald" label="emerald" color="emerald" checked />
<Checkbox name="color-violet" label="violet" color="violet" checked />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-4">
      {#each colors as color}
        <Checkbox name="color-{color}" label="{color}" {color} checked />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Sizes" code={`<Checkbox name="sm" label="Small" size="sm" checked color="violet" />
<Checkbox name="md" label="Medium" size="md" checked color="violet" />
<Checkbox name="lg" label="Large" size="lg" checked color="violet" />`}>
  {#snippet children()}
    <div class="flex flex-wrap items-start gap-6">
      <Checkbox name="sm" label="Small" size="sm" checked color="violet" />
      <Checkbox name="md" label="Medium" size="md" checked color="violet" />
      <Checkbox name="lg" label="Large" size="lg" checked color="violet" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Shapes" code={`<Checkbox name="square" label="Square" shape="square" checked color="blue" />
<Checkbox name="rounded" label="Rounded" shape="rounded" checked color="blue" />
<Checkbox name="circle" label="Circle" shape="circle" checked color="blue" />`}>
  {#snippet children()}
    <div class="flex flex-wrap items-start gap-6">
      <Checkbox name="square" label="Square" shape="square" checked color="blue" />
      <Checkbox name="rounded" label="Rounded" shape="rounded" checked color="blue" />
      <Checkbox name="circle" label="Circle" shape="circle" checked color="blue" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Styles d'icone" code={`<Checkbox name="icon-check" label="Check" icon="check" checked color="emerald" />
<Checkbox name="icon-heart" label="Heart" icon="heart" checked color="pink" />
<Checkbox name="icon-star" label="Star" icon="star" checked color="amber" />`}>
  {#snippet children()}
    <div class="flex flex-wrap items-start gap-6">
      <Checkbox name="icon-check" label="Check" icon="check" checked color="emerald" />
      <Checkbox name="icon-cross" label="Cross" icon="cross" checked color="red" />
      <Checkbox name="icon-dash" label="Dash" icon="dash" checked color="blue" />
      <Checkbox name="icon-heart" label="Heart" icon="heart" checked color="pink" />
      <Checkbox name="icon-star" label="Star" icon="star" checked color="amber" />
      <Checkbox name="icon-circle" label="Circle" icon="circle" checked color="violet" />
      <Checkbox name="icon-eye" label="Eye" icon="eye" checked color="cyan" />
    </div>

    <h3 class="text-base font-semibold mb-3 mt-6 text-[var(--karbon-text-2)]">Styles × Shapes</h3>
    <div class="space-y-3">
      {#each ['square', 'rounded', 'circle'] as shp}
        <div class="flex flex-wrap gap-4">
          <span class="text-xs font-semibold text-[var(--karbon-text-4)] uppercase w-16 pt-1">{shp}</span>
          <Checkbox name="{shp}-check" icon="check" shape={shp} checked color="emerald" />
          <Checkbox name="{shp}-cross" icon="cross" shape={shp} checked color="red" />
          <Checkbox name="{shp}-heart" icon="heart" shape={shp} checked color="pink" />
          <Checkbox name="{shp}-star" icon="star" shape={shp} checked color="amber" />
          <Checkbox name="{shp}-circle" icon="circle" shape={shp} checked color="violet" />
          <Checkbox name="{shp}-eye" icon="eye" shape={shp} checked color="cyan" />
        </div>
      {/each}
    </div>

    <h3 class="text-base font-semibold mb-3 mt-6 text-[var(--karbon-text-2)]">Styles × Sizes</h3>
    <div class="space-y-3">
      {#each ['sm', 'md', 'lg'] as sz}
        <div class="flex flex-wrap gap-4">
          <span class="text-xs font-semibold text-[var(--karbon-text-4)] uppercase w-12 pt-1">{sz}</span>
          <Checkbox name="{sz}-check" icon="check" size={sz} checked color="emerald" />
          <Checkbox name="{sz}-cross" icon="cross" size={sz} checked color="red" />
          <Checkbox name="{sz}-heart" icon="heart" size={sz} checked color="pink" />
          <Checkbox name="{sz}-star" icon="star" size={sz} checked color="amber" />
          <Checkbox name="{sz}-circle" icon="circle" size={sz} checked color="violet" />
          <Checkbox name="{sz}-eye" icon="eye" size={sz} checked color="cyan" />
        </div>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Sizes × Colors" code={`<Checkbox name="sm-emerald" color="emerald" size="sm" checked />
<Checkbox name="lg-violet" color="violet" size="lg" checked />`}>
  {#snippet children()}
    <div class="space-y-4">
      {#each ['sm', 'md', 'lg'] as size}
        <div class="flex flex-wrap gap-4">
          <span class="text-xs font-semibold text-[var(--karbon-text-4)] uppercase w-12 pt-1">{size}</span>
          {#each colors as color}
            <Checkbox name="{size}-{color}" {color} {size} checked />
          {/each}
        </div>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<hr class="my-10 border-[var(--karbon-border)]" />

<DemoSection title="Toggle — Basic" code={`<Toggle name="notif" label="Notifications" bind:checked={val} />
<Toggle name="dark" label="Mode sombre" bind:checked={val} />
<Toggle name="dis" label="Desactive" checked disabled />`}>
  {#snippet children()}
    <div class="space-y-4">
      <Toggle name="notif" label="Notifications" bind:checked={toggle1} />
      <Toggle name="dark" label="Mode sombre" bind:checked={toggle2} />
      <Toggle name="disabled-on" label="Desactive (on)" checked disabled />
      <Toggle name="disabled-off" label="Desactive (off)" disabled />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Toggle avec description" code={`<Toggle name="email-notif" label="Notifications email"
  description="Recevoir un email a chaque connexion." checked />`}>
  {#snippet children()}
    <div class="space-y-4">
      <Toggle name="email-notif" label="Notifications email" description="Recevoir un email a chaque nouvelle connexion." checked />
      <Toggle name="2fa" label="Authentification 2FA" description="Ajouter une couche de securite supplementaire." />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Avec icones" code={`<Toggle name="icon-on" label="Avec icones" checked showIcons />
<Toggle name="icon-lg" label="Large" size="lg" checked showIcons color="emerald" />`}>
  {#snippet children()}
    <div class="space-y-4">
      <Toggle name="icon-on" label="Avec icones (on)" checked showIcons />
      <Toggle name="icon-off" label="Avec icones (off)" showIcons />
      <Toggle name="icon-lg" label="Large avec icones" size="lg" checked showIcons color="emerald" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Toggle Colors" code={`<Toggle name="toggle-emerald" label="emerald" color="emerald" checked />
<Toggle name="toggle-violet" label="violet" color="violet" checked />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-4">
      {#each colors as color}
        <Toggle name="toggle-{color}" label="{color}" {color} checked />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Toggle Sizes" code={`<Toggle name="toggle-sm" label="Small" size="sm" checked color="violet" />
<Toggle name="toggle-md" label="Medium" size="md" checked color="violet" />
<Toggle name="toggle-lg" label="Large" size="lg" checked color="violet" />`}>
  {#snippet children()}
    <div class="flex flex-wrap items-start gap-6">
      <Toggle name="toggle-sm" label="Small" size="sm" checked color="violet" />
      <Toggle name="toggle-md" label="Medium" size="md" checked color="violet" />
      <Toggle name="toggle-lg" label="Large" size="lg" checked color="violet" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Sizes × Colors (avec icones)" code={`<Toggle name="t-sm-emerald" color="emerald" size="sm" checked showIcons />
<Toggle name="t-lg-violet" color="violet" size="lg" checked showIcons />`}>
  {#snippet children()}
    <div class="space-y-4">
      {#each ['sm', 'md', 'lg'] as size}
        <div class="flex flex-wrap gap-4">
          <span class="text-xs font-semibold text-[var(--karbon-text-4)] uppercase w-12 pt-1">{size}</span>
          {#each colors as color}
            <Toggle name="t-{size}-{color}" {color} {size} checked showIcons />
          {/each}
        </div>
      {/each}
    </div>
  {/snippet}
</DemoSection>
