<script lang="ts">
  import { Button, Badge, AlertMessage, Card, Progress, Avatar, Tooltip, Kbd, Divider } from '@karbonjs/ui-svelte';

  const colors = ['red', 'orange', 'amber', 'emerald', 'cyan', 'blue', 'violet', 'pink'] as const;
</script>

<h1 class="text-3xl font-bold mb-2">KarbonJS <span class="text-[var(--karbon-primary)]">Playground</span></h1>
<p class="text-[var(--karbon-text-3)] mb-8 text-lg">Explorez tous les composants, couleurs et themes. Selectionnez un composant dans le menu a gauche.</p>

<Divider label="Apercu rapide" />

<!-- Quick preview of key components -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  <Card title="Buttons">
    {#snippet children()}
      <div class="flex flex-wrap gap-2">
        <Button>Solid</Button>
        <Button variant="flat" color="violet">Flat</Button>
        <Button variant="bordered" color="emerald">Bordered</Button>
        <Button variant="neon" color="cyan">Neon</Button>
        <Button variant="shadow" color="blue">Shadow</Button>
        <Button variant="light" color="pink">Light</Button>
      </div>
      <div class="flex flex-wrap gap-2 mt-3">
        {#each colors as color}
          <Button {color} size="sm" shape="pill">{color}</Button>
        {/each}
      </div>
    {/snippet}
  </Card>

  <Card title="Badges">
    {#snippet children()}
      <div class="flex flex-wrap gap-2 mb-3">
        {#each colors as color}
          <Badge {color}>{color}</Badge>
        {/each}
      </div>
      <div class="flex flex-wrap gap-2">
        {#each colors as color}
          <Badge {color} variant="solid">{color}</Badge>
        {/each}
      </div>
    {/snippet}
  </Card>

  <Card title="Alerts">
    {#snippet children()}
      <div class="space-y-2">
        <AlertMessage type="success" message="Operation reussie !" />
        <AlertMessage type="error" message="Erreur critique." />
        <AlertMessage type="warning" message="Attention !" />
        <AlertMessage type="info" message="Info utile." />
      </div>
    {/snippet}
  </Card>

  <Card title="Feedback">
    {#snippet children()}
      <div class="space-y-4">
        <div class="flex gap-3">
          <Avatar name="Alice Martin" />
          <Avatar name="Bob Dupont" color="emerald" />
          <Avatar name="Claire Morel" color="violet" />
          <Avatar src="https://picsum.photos/seed/avatar1/100/100" name="Photo" />
        </div>
        <Progress value={65} color="blue" />
        <Progress value={45} color="emerald" />
        <div class="flex items-center gap-4">
          <Tooltip text="Raccourci clavier">
            <span class="text-[var(--karbon-text-2)] underline cursor-help text-sm">Survolez-moi</span>
          </Tooltip>
          <Kbd keys={['Ctrl', 'S']} />
          <Kbd keys={['Cmd', 'K']} />
        </div>
      </div>
    {/snippet}
  </Card>
</div>

<div class="mt-10 p-6 rounded-xl border border-[var(--karbon-border)] bg-[var(--karbon-bg-2)]">
  <h3 class="font-semibold mb-2">Fonctionnalites du design system</h3>
  <ul class="text-sm text-[var(--karbon-text-2)] space-y-1 list-disc list-inside">
    <li><strong>12 couleurs</strong> × 11 nuances = 132 variables CSS</li>
    <li><strong>10 themes</strong> (midnight, aurora, neon, corporate, forest...)</li>
    <li><strong>34 composants</strong> Svelte 5 + 34 React</li>
    <li><strong>8 variants bouton</strong> : solid, flat, bordered, light, ghost, shadow, neon, danger</li>
    <li><strong>4 shapes</strong> : rounded, pill, square, soft</li>
    <li><strong>Classes override</strong> sur chaque element interne</li>
    <li><strong>Zero @apply</strong> — CSS pur + Tailwind classes</li>
    <li><strong>WYSIWYG</strong> avec explorateur de fichiers integre</li>
  </ul>
</div>
