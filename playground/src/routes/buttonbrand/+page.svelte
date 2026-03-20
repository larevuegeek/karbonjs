<script lang="ts">
  import { ButtonBrand, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { ButtonBrand } from '@karbonjs/ui-svelte'
<\/script>

<ButtonBrand brand="google" />
<ButtonBrand brand="github" variant="outline" />
<ButtonBrand brand="discord" variant="light" />

<!-- Login form -->
<ButtonBrand brand="google" fullWidth shape="pill" variant="outline">
  Se connecter avec Google
</ButtonBrand>

<!-- Icon only -->
<ButtonBrand brand="twitter" iconOnly shape="circle" />`;

  const socialProviders = ['google', 'facebook', 'apple', 'microsoft', 'github', 'gitlab', 'twitter', 'x', 'discord', 'slack', 'linkedin', 'reddit'] as const;
  const mediaProviders = ['twitch', 'youtube', 'tiktok', 'instagram', 'snapchat', 'pinterest', 'spotify'] as const;
  const streamingProviders = ['netflix', 'disneyplus', 'hbo', 'primeVideo', 'appletv', 'crunchyroll'] as const;
  const gamingProviders = ['steam', 'playstation', 'xbox', 'nintendo', 'epicgames'] as const;
  const techProviders = ['stripe', 'paypal', 'amazon', 'figma', 'notion', 'vercel', 'netlify'] as const;
</script>

<h1 class="text-3xl font-bold mb-2">ButtonBrand</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Boutons pre-styles pour les fournisseurs OAuth, reseaux sociaux et services.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Social & Auth" description="Google, Facebook, Apple, GitHub, Discord et plus." code={`<ButtonBrand brand="google" />
<ButtonBrand brand="github" variant="outline" />
<ButtonBrand brand="discord" variant="light" />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2 mb-4">
      {#each socialProviders as brand}
        <ButtonBrand {brand} />
      {/each}
    </div>
    <div class="flex flex-wrap gap-2 mb-4">
      {#each socialProviders as brand}
        <ButtonBrand {brand} variant="outline" />
      {/each}
    </div>
    <div class="flex flex-wrap gap-2">
      {#each socialProviders as brand}
        <ButtonBrand {brand} variant="light" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Media & Entertainment" description="Twitch, YouTube, TikTok, Instagram, Spotify et plus." code={`<ButtonBrand brand="twitch" />
<ButtonBrand brand="youtube" variant="outline" />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2 mb-4">
      {#each mediaProviders as brand}
        <ButtonBrand {brand} />
      {/each}
    </div>
    <div class="flex flex-wrap gap-2">
      {#each mediaProviders as brand}
        <ButtonBrand {brand} variant="outline" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Streaming TV" description="Netflix, Disney+, HBO, Prime Video et plus." code={`<ButtonBrand brand="netflix" />
<ButtonBrand brand="disneyplus" variant="outline" />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2 mb-4">
      {#each streamingProviders as brand}
        <ButtonBrand {brand} />
      {/each}
    </div>
    <div class="flex flex-wrap gap-2">
      {#each streamingProviders as brand}
        <ButtonBrand {brand} variant="outline" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Gaming" description="Steam, PlayStation, Xbox, Nintendo, Epic Games." code={`<ButtonBrand brand="steam" />
<ButtonBrand brand="playstation" variant="outline" />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2 mb-4">
      {#each gamingProviders as brand}
        <ButtonBrand {brand} />
      {/each}
    </div>
    <div class="flex flex-wrap gap-2">
      {#each gamingProviders as brand}
        <ButtonBrand {brand} variant="outline" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Tech & Business" description="Stripe, PayPal, Amazon, Figma, Notion, Vercel, Netlify." code={`<ButtonBrand brand="stripe" />
<ButtonBrand brand="figma" variant="outline" />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2 mb-4">
      {#each techProviders as brand}
        <ButtonBrand {brand} />
      {/each}
    </div>
    <div class="flex flex-wrap gap-2">
      {#each techProviders as brand}
        <ButtonBrand {brand} variant="outline" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Icon Only" description="Mode icone seule avec differentes formes et variantes." code={`<ButtonBrand brand="google" iconOnly shape="circle" />
<ButtonBrand brand="github" iconOnly shape="circle" variant="outline" />
<ButtonBrand brand="discord" iconOnly shape="rounded" variant="light" />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2 mb-4">
      {#each socialProviders as brand}
        <ButtonBrand {brand} iconOnly shape="circle" />
      {/each}
    </div>
    <div class="flex flex-wrap gap-2 mb-4">
      {#each socialProviders as brand}
        <ButtonBrand {brand} iconOnly shape="circle" variant="outline" />
      {/each}
    </div>
    <div class="flex flex-wrap gap-2">
      {#each socialProviders as brand}
        <ButtonBrand {brand} iconOnly shape="rounded" variant="light" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Sizes" description="De xs a 2xl." code={`<ButtonBrand brand="google" size="xs" />
<ButtonBrand brand="google" size="sm" />
<ButtonBrand brand="google" size="md" />
<ButtonBrand brand="google" size="lg" />
<ButtonBrand brand="google" size="xl" />
<ButtonBrand brand="google" size="2xl" />`}>
  {#snippet children()}
    <div class="flex flex-wrap items-end gap-3">
      <ButtonBrand brand="google" size="xs" />
      <ButtonBrand brand="google" size="sm" />
      <ButtonBrand brand="google" size="md" />
      <ButtonBrand brand="google" size="lg" />
      <ButtonBrand brand="google" size="xl" />
      <ButtonBrand brand="google" size="2xl" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Shapes" description="4 formes : sharp, soft, rounded, pill." code={`<ButtonBrand brand="discord" shape="sharp" />
<ButtonBrand brand="discord" shape="soft" />
<ButtonBrand brand="discord" shape="rounded" />
<ButtonBrand brand="discord" shape="pill" />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-3">
      <ButtonBrand brand="discord" shape="sharp" />
      <ButtonBrand brand="discord" shape="soft" />
      <ButtonBrand brand="discord" shape="rounded" />
      <ButtonBrand brand="discord" shape="pill" />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Cas d'usage — Login" description="Formulaire de connexion avec boutons pleine largeur." code={`<ButtonBrand brand="google" fullWidth shape="pill" variant="outline">Se connecter avec Google</ButtonBrand>
<ButtonBrand brand="facebook" fullWidth shape="pill">Se connecter avec Facebook</ButtonBrand>
<ButtonBrand brand="apple" fullWidth shape="pill">Continuer avec Apple</ButtonBrand>`}>
  {#snippet children()}
    <div class="flex flex-col gap-2 max-w-xs">
      <ButtonBrand brand="google" fullWidth shape="pill" variant="outline">Se connecter avec Google</ButtonBrand>
      <ButtonBrand brand="facebook" fullWidth shape="pill">Se connecter avec Facebook</ButtonBrand>
      <ButtonBrand brand="apple" fullWidth shape="pill">Continuer avec Apple</ButtonBrand>
      <ButtonBrand brand="github" fullWidth shape="pill" variant="outline">Se connecter avec GitHub</ButtonBrand>
      <ButtonBrand brand="discord" fullWidth shape="pill" variant="light">Rejoindre via Discord</ButtonBrand>
    </div>
  {/snippet}
</DemoSection>
