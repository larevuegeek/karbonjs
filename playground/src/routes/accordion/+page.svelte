<script lang="ts">
  import { Accordion, Badge, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { Accordion } from '@karbonjs/ui-svelte'

  const items = [
    { id: 'q1', title: 'Comment ca marche ?', content: 'Reponse ici...' },
    { id: 'q2', title: 'Quels sont les tarifs ?', content: 'A partir de 9€/mois.' },
    { id: 'q3', title: 'Support inclus ?', content: 'Oui, 24/7 par email.' },
  ]
<\/script>

<Accordion {items} color="violet" variant="separated" />
<Accordion {items} multiple arrow="plus" />`;

  const codeCustom = `<Accordion items={items} variant="separated" color="emerald" arrow="plus">
  {#snippet children({ item })}
    <p>{item.content}</p>
    <Badge color="emerald" size="xs">Nouveau</Badge>
  {/snippet}
</Accordion>`;

  const faqItems = [
    { id: 'q1', title: 'Comment fonctionne KarbonJS ?', content: 'KarbonJS est un framework UI complet avec themes, couleurs et composants prets a l\'emploi. Il supporte Svelte 5 et React, avec un systeme de design tokens CSS personnalisables.' },
    { id: 'q2', title: 'Quels frameworks sont supportes ?', content: 'Svelte 5 (runes mode) et React 18+ sont supportes nativement. Les packages sont independants : installez uniquement ce dont vous avez besoin.' },
    { id: 'q3', title: 'Peut-on personnaliser les composants ?', content: 'Oui, via 3 niveaux : themes globaux (10 presets), props color/variant sur chaque composant, et override CSS via le prop classes.' },
  ];

  const settingsItems = [
    { id: 'profile', title: 'Mon profil', description: 'Informations personnelles', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>', content: 'Modifiez votre nom, email, photo de profil et autres informations personnelles.' },
    { id: 'security', title: 'Securite', description: 'Mot de passe et 2FA', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>', content: 'Gerez votre mot de passe, activez l\'authentification a deux facteurs et consultez vos sessions.' },
    { id: 'notifications', title: 'Notifications', description: 'Email et push', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>', content: 'Configurez quelles notifications vous souhaitez recevoir par email et push.' },
  ];
</script>

<h1 class="text-3xl font-bold mb-2">Accordion</h1>
<p class="text-[var(--karbon-text-3)] mb-10">Panneaux accordeon avec variantes, styles de fleche, couleurs et bordures personnalisables.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<!-- Variants -->
<DemoSection title="Variants" description="5 styles visuels pour s'adapter a tous les contextes." code={`<Accordion items={items} color="violet" />
<Accordion items={items} variant="bordered" color="violet" />
<Accordion items={items} variant="separated" color="violet" />
<Accordion items={items} variant="ghost" color="violet" />
<Accordion items={items} variant="filled" color="violet" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Default</span>
        <Accordion items={faqItems} color="violet" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Bordered</span>
        <Accordion items={faqItems} variant="bordered" color="violet" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Separated</span>
        <Accordion items={faqItems} variant="separated" color="violet" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Ghost</span>
        <Accordion items={faqItems} variant="ghost" color="violet" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Filled</span>
        <Accordion items={faqItems} variant="filled" color="violet" />
      </div>
    </div>
  {/snippet}
</DemoSection>

<!-- Arrow styles -->
<DemoSection title="Styles de fleche" description="5 icones animees avec fond teinte au clic." code={`<Accordion items={items} arrow="chevron" color="emerald" />
<Accordion items={items} arrow="plus" color="emerald" />
<Accordion items={items} arrow="arrow" color="emerald" />
<Accordion items={items} arrow="dot" color="emerald" />
<Accordion items={items} arrow="none" color="emerald" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each [
        { name: 'Chevron', arrow: 'chevron' },
        { name: 'Plus / Minus', arrow: 'plus' },
        { name: 'Arrow', arrow: 'arrow' },
        { name: 'Dot', arrow: 'dot' },
        { name: 'None', arrow: 'none' },
      ] as a}
        <div>
          <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">{a.name}</span>
          <Accordion items={faqItems.slice(0, 2)} arrow={a.arrow} color="emerald" variant="ghost" />
        </div>
      {/each}
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Arrow gauche</span>
        <Accordion items={faqItems.slice(0, 2)} arrow="arrow" arrowPosition="left" color="emerald" variant="ghost" />
      </div>
    </div>
  {/snippet}
</DemoSection>

<!-- With icons + descriptions -->
<DemoSection title="Avec icones + descriptions" description="Chaque item peut avoir une icone et une description contextuelle." code={`<Accordion items={[
  { id: 'profile', title: 'Mon profil',
    description: 'Informations personnelles',
    icon: '<svg>...</svg>',
    content: '...' },
]} variant="separated" color="blue" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Accordion items={settingsItems} variant="separated" color="blue" />
      <Accordion items={settingsItems} variant="ghost" color="cyan" arrow="plus" />
    </div>
  {/snippet}
</DemoSection>

<!-- Borders -->
<DemoSection title="Bordures personnalisees" description="Colorez les bordures de chaque item avec n'importe quelle couleur CSS." code={`<Accordion items={items} border="var(--karbon-violet-500)" color="violet" />
<Accordion items={items} border="var(--karbon-emerald-500)"
  color="emerald" variant="separated" />
<Accordion items={items} border="var(--karbon-cyan-500)"
  bg color="cyan" variant="ghost" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Default + bordure violet</span>
        <Accordion items={faqItems.slice(0, 2)} border="var(--karbon-violet-500)" color="violet" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Separated + bordure emerald</span>
        <Accordion items={faqItems.slice(0, 2)} border="var(--karbon-emerald-500)" color="emerald" variant="separated" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Ghost + bordure + fond</span>
        <Accordion items={faqItems.slice(0, 2)} border="var(--karbon-cyan-500)" bg color="cyan" variant="ghost" arrow="plus" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Fond teinte + bordure rose</span>
        <Accordion items={faqItems.slice(0, 2)} border="var(--karbon-pink-500)" bg="color-mix(in srgb, var(--karbon-pink-500) 5%, transparent)" color="pink" arrow="arrow" arrowPosition="left" />
      </div>
    </div>
  {/snippet}
</DemoSection>

<!-- Colors -->
<DemoSection title="Couleurs" description="12 couleurs sur le titre actif, la fleche et les bordures." code={`<Accordion items={items} color="red" variant="separated" />
<Accordion items={items} color="violet" variant="separated" />
<Accordion items={items} color="emerald" variant="separated" />`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each ['red', 'orange', 'amber', 'emerald', 'cyan', 'blue', 'violet', 'pink', 'slate'] as c}
        <Accordion items={[
          { id: `${c}-1`, title: c, content: `Accordion ${c}`, defaultOpen: true },
          { id: `${c}-2`, title: 'Ferme', content: 'Contenu.' },
        ]} color={c} variant="separated" />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Sizes -->
<DemoSection title="Tailles" description="3 tailles de padding et texte." code={`<Accordion items={items} size="sm" color="violet" />
<Accordion items={items} size="md" color="violet" />
<Accordion items={items} size="lg" color="violet" />`}>
  {#snippet children()}
    <div class="space-y-4">
      {#each ['sm', 'md', 'lg'] as sz}
        <div>
          <span class="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block" style="color:var(--karbon-text-4);">{sz}</span>
          <Accordion items={faqItems.slice(0, 2)} size={sz} color="violet" />
        </div>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Options -->
<DemoSection title="Options" description="Multi-expand, disabled, ouvert par defaut." code={`<Accordion items={items} multiple color="blue" />
<Accordion items={[
  { id: 'a', title: 'Ouvert', content: '...', defaultOpen: true },
  { id: 'b', title: 'Verrouille', content: '...', disabled: true },
]} color="pink" />`}>
  {#snippet children()}
    <div class="space-y-4">
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block" style="color:var(--karbon-text-4);">Multiple expand</span>
        <Accordion items={faqItems} multiple color="blue" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block" style="color:var(--karbon-text-4);">Disabled + default open</span>
        <Accordion items={[
          { id: 'a', title: 'Ouvert par defaut', content: 'Ce panneau est ouvert au chargement.', defaultOpen: true },
          { id: 'b', title: 'Verrouille', content: 'Inaccessible.', disabled: true },
          { id: 'c', title: 'Normal', content: 'Panneau classique.' },
        ]} color="pink" />
      </div>
    </div>
  {/snippet}
</DemoSection>

<!-- Custom content -->
<DemoSection title="Contenu custom (snippet)" description="Injectez n'importe quel contenu riche via le snippet children." code={codeCustom}>
  {#snippet children()}
    <Accordion items={settingsItems} variant="separated" color="emerald" arrow="plus">
      {#snippet children({ item })}
        <div class="space-y-2">
          <p class="leading-relaxed">{item.content}</p>
          <div class="flex gap-2 pt-1">
            <Badge color="emerald" variant="soft" size="xs">Nouveau</Badge>
            <Badge variant="soft" size="xs">v2.0</Badge>
          </div>
        </div>
      {/snippet}
    </Accordion>
  {/snippet}
</DemoSection>
