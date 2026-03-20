<script lang="ts">
  import { Toast, Button, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { Toast } from '@karbonjs/ui-svelte'

  let show = $state(false)
<\/script>

{#if show}
  <Toast
    type="success"
    title="Sauvegarde"
    message="Article publie avec succes !"
    position="top-right"
    duration={5000}
    showProgress
    onclose={() => show = false}
  />
{/if}`;

  const codeAction = `<Toast type="info" title="Mise a jour" message="Nouvelle version disponible.">
  {#snippet action()}
    <Button size="2xs" variant="flat">Mettre a jour</Button>
  {/snippet}
</Toast>`;

  interface ToastItem {
    id: number
    type: 'success' | 'error' | 'warning' | 'info'
    variant?: 'default' | 'filled' | 'bordered'
    color?: string
    title?: string
    message: string
    position?: string
    duration?: number
    showProgress?: boolean
    hasAction?: boolean
  }

  let toasts = $state<ToastItem[]>([]);
  let nextId = 0;

  function add(opts: Partial<ToastItem> & { message: string }) {
    const toast: ToastItem = {
      id: ++nextId,
      type: 'info',
      message: '',
      ...opts
    };
    toasts = [...toasts, toast];
  }

  function remove(id: number) {
    toasts = toasts.filter(t => t.id !== id);
  }
</script>

<h1 class="text-3xl font-bold mb-2">Toast</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Notifications temporaires avec countdown, positions, variantes et actions.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<!-- Types -->
<DemoSection title="Types" description="4 types de toast : success, error, warning, info." code={`<Toast type="success" message="Article publie !" />
<Toast type="error" message="Impossible de sauvegarder." />
<Toast type="warning" message="Session expire bientot." />
<Toast type="info" message="Mise a jour disponible." />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      <Button color="emerald" variant="flat" size="sm" onclick={() => add({ type: 'success', title: 'Succes', message: 'Article publie avec succes !' })}>Success</Button>
      <Button color="red" variant="flat" size="sm" onclick={() => add({ type: 'error', title: 'Erreur', message: 'Impossible de sauvegarder les modifications.' })}>Error</Button>
      <Button color="amber" variant="flat" size="sm" onclick={() => add({ type: 'warning', title: 'Attention', message: 'Votre session expire dans 5 minutes.' })}>Warning</Button>
      <Button color="blue" variant="flat" size="sm" onclick={() => add({ type: 'info', title: 'Information', message: 'Mise a jour disponible.' })}>Info</Button>
    </div>
  {/snippet}
</DemoSection>

<!-- Variants -->
<DemoSection title="Variants" description="3 variantes visuelles : default, filled, bordered." code={`<Toast type="success" variant="default" message="Toast default" />
<Toast type="success" variant="filled" message="Toast filled" />
<Toast type="success" variant="bordered" message="Toast bordered" />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      <Button variant="outline" color="slate" size="sm" onclick={() => add({ type: 'success', variant: 'default', message: 'Toast default' })}>Default</Button>
      <Button variant="outline" color="slate" size="sm" onclick={() => add({ type: 'success', variant: 'filled', message: 'Toast filled' })}>Filled</Button>
      <Button variant="outline" color="slate" size="sm" onclick={() => add({ type: 'success', variant: 'bordered', message: 'Toast bordered' })}>Bordered</Button>
    </div>
    <div class="flex flex-wrap gap-2 mt-2">
      <Button variant="outline" color="slate" size="sm" onclick={() => add({ type: 'error', variant: 'default', message: 'Error default' })}>Error default</Button>
      <Button variant="outline" color="slate" size="sm" onclick={() => add({ type: 'error', variant: 'filled', message: 'Error filled' })}>Error filled</Button>
      <Button variant="outline" color="slate" size="sm" onclick={() => add({ type: 'error', variant: 'bordered', message: 'Error bordered' })}>Error bordered</Button>
    </div>
  {/snippet}
</DemoSection>

<!-- With title -->
<DemoSection title="Avec titre" description="Toast avec titre et message." code={`<Toast
  type="info"
  title="Nouvelle fonctionnalite"
  message="L'editeur a ete ameliore."
/>`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      <Button variant="flat" color="violet" size="sm" onclick={() => add({ type: 'info', title: 'Nouvelle fonctionnalite', message: 'L\'editeur WYSIWYG a ete ameliore avec de nouvelles options.' })}>Avec titre</Button>
      <Button variant="flat" color="emerald" size="sm" onclick={() => add({ type: 'success', title: 'Sauvegarde', message: 'Toutes les modifications ont ete enregistrees.' })}>Sauvegarde</Button>
    </div>
  {/snippet}
</DemoSection>

<!-- Colors -->
<DemoSection title="Couleurs custom" description="Couleurs personnalisees via le prop color." code={`<Toast type="info" color="violet" message="Toast violet" />
<Toast type="info" color="cyan" message="Toast cyan" />
<Toast type="info" color="pink" variant="filled" message="Filled pink" />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      {#each ['violet', 'cyan', 'pink', 'emerald', 'amber', 'blue'] as c}
        <Button color={c} variant="flat" size="sm" onclick={() => add({ type: 'info', color: c, message: `Toast ${c}` })}>{c}</Button>
      {/each}
    </div>
    <div class="flex flex-wrap gap-2 mt-2">
      {#each ['violet', 'cyan', 'pink'] as c}
        <Button color={c} variant="flat" size="sm" onclick={() => add({ type: 'info', color: c, variant: 'filled', message: `Filled ${c}` })}>Filled {c}</Button>
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Positions -->
<DemoSection title="Positions" description="6 positions d'affichage." code={`<Toast message="Top right" position="top-right" />
<Toast message="Top center" position="top-center" />
<Toast message="Bottom left" position="bottom-left" />`}>
  {#snippet children()}
    <div class="grid grid-cols-3 gap-2 max-w-sm">
      <Button size="xs" variant="outline" color="slate" onclick={() => add({ type: 'info', message: 'Top left', position: 'top-left' })}>top-left</Button>
      <Button size="xs" variant="outline" color="slate" onclick={() => add({ type: 'info', message: 'Top center', position: 'top-center' })}>top-center</Button>
      <Button size="xs" variant="outline" color="slate" onclick={() => add({ type: 'info', message: 'Top right', position: 'top-right' })}>top-right</Button>
      <Button size="xs" variant="outline" color="slate" onclick={() => add({ type: 'info', message: 'Bottom left', position: 'bottom-left' })}>bottom-left</Button>
      <Button size="xs" variant="outline" color="slate" onclick={() => add({ type: 'info', message: 'Bottom center', position: 'bottom-center' })}>bottom-center</Button>
      <Button size="xs" variant="outline" color="slate" onclick={() => add({ type: 'info', message: 'Bottom right', position: 'bottom-right' })}>bottom-right</Button>
    </div>
  {/snippet}
</DemoSection>

<!-- Duration -->
<DemoSection title="Duree" description="Controle la duree d'affichage. Survolez pour mettre en pause." code={`<Toast message="2 secondes" duration={2000} />
<Toast message="5 secondes" duration={5000} />
<Toast message="Persistent" duration={0} />`}>
  {#snippet children()}
    <div class="flex flex-wrap gap-2">
      <Button variant="flat" size="sm" onclick={() => add({ type: 'info', message: '2 secondes', duration: 2000 })}>2s</Button>
      <Button variant="flat" size="sm" onclick={() => add({ type: 'info', message: '5 secondes (default)', duration: 5000 })}>5s</Button>
      <Button variant="flat" size="sm" onclick={() => add({ type: 'info', message: '10 secondes', duration: 10000 })}>10s</Button>
      <Button variant="flat" size="sm" onclick={() => add({ type: 'warning', message: 'Persistent (hover pour pause)', duration: 0, showProgress: false })}>Persistent</Button>
    </div>
    <p class="text-xs mt-2" style="color:var(--karbon-text-4);">Survolez un toast pour mettre le countdown en pause.</p>
  {/snippet}
</DemoSection>

<!-- Render toasts -->
{#each toasts as toast (toast.id)}
  <Toast
    type={toast.type}
    variant={toast.variant}
    color={toast.color}
    title={toast.title}
    message={toast.message}
    position={toast.position || 'top-right'}
    duration={toast.duration ?? 5000}
    showProgress={toast.showProgress ?? true}
    onclose={() => remove(toast.id)}
  >
    {#if toast.hasAction}
      {#snippet action()}
        <Button size="2xs" variant="flat" color="violet" onclick={() => remove(toast.id)}>Mettre a jour</Button>
      {/snippet}
    {/if}
  </Toast>
{/each}
