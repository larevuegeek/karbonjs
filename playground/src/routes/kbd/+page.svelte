<script lang="ts">
  import { Kbd } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';
</script>

<h1 class="text-3xl font-bold mb-2">Kbd</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Affichage de raccourcis clavier et combinaisons de touches.</p>

<DemoSection title="Single Keys" description="Touches individuelles." code={`<Kbd keys={['Esc']} />
<Kbd keys={['Tab']} />
<Kbd keys={['Enter']} />
<Kbd keys={['Space']} />`}>
  {#snippet children()}
    <div class="flex flex-wrap items-center gap-4">
      <Kbd keys={['Esc']} />
      <Kbd keys={['Tab']} />
      <Kbd keys={['Enter']} />
      <Kbd keys={['Space']} />
      <Kbd keys={['Backspace']} />
      <Kbd keys={['Delete']} />
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Key Combinations" description="Combinaisons de touches courantes." code={`<Kbd keys={['Ctrl', 'C']} />
<Kbd keys={['Ctrl', 'V']} />
<Kbd keys={['Ctrl', 'Shift', 'Z']} />`}>
  {#snippet children()}
    <div class="space-y-3">
      <div class="flex items-center gap-4">
        <Kbd keys={['Ctrl', 'C']} />
        <span class="text-sm text-[var(--karbon-text-3)]">Copier</span>
      </div>
      <div class="flex items-center gap-4">
        <Kbd keys={['Ctrl', 'V']} />
        <span class="text-sm text-[var(--karbon-text-3)]">Coller</span>
      </div>
      <div class="flex items-center gap-4">
        <Kbd keys={['Ctrl', 'X']} />
        <span class="text-sm text-[var(--karbon-text-3)]">Couper</span>
      </div>
      <div class="flex items-center gap-4">
        <Kbd keys={['Ctrl', 'Z']} />
        <span class="text-sm text-[var(--karbon-text-3)]">Annuler</span>
      </div>
      <div class="flex items-center gap-4">
        <Kbd keys={['Ctrl', 'Shift', 'Z']} />
        <span class="text-sm text-[var(--karbon-text-3)]">Retablir</span>
      </div>
      <div class="flex items-center gap-4">
        <Kbd keys={['Ctrl', 'S']} />
        <span class="text-sm text-[var(--karbon-text-3)]">Sauvegarder</span>
      </div>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Navigation" description="Raccourcis de navigation." code={`<Kbd keys={['Ctrl', 'K']} />
<Kbd keys={['Alt', 'Tab']} />
<Kbd keys={['Ctrl', 'Shift', 'P']} />`}>
  {#snippet children()}
    <div class="space-y-3">
      <div class="flex items-center gap-4">
        <Kbd keys={['Ctrl', 'K']} />
        <span class="text-sm text-[var(--karbon-text-3)]">Recherche rapide</span>
      </div>
      <div class="flex items-center gap-4">
        <Kbd keys={['Alt', 'Tab']} />
        <span class="text-sm text-[var(--karbon-text-3)]">Changer de fenetre</span>
      </div>
      <div class="flex items-center gap-4">
        <Kbd keys={['Ctrl', 'Shift', 'P']} />
        <span class="text-sm text-[var(--karbon-text-3)]">Palette de commandes</span>
      </div>
      <div class="flex items-center gap-4">
        <Kbd keys={['F11']} />
        <span class="text-sm text-[var(--karbon-text-3)]">Plein ecran</span>
      </div>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Mac-style Keys" description="Symboles Mac pour les modificateurs." code={`<Kbd keys={['⌘', 'C']} />
<Kbd keys={['⌘', '⇧', 'S']} />
<Kbd keys={['⌥', '⌘', 'I']} />`}>
  {#snippet children()}
    <div class="space-y-3">
      <div class="flex items-center gap-4">
        <Kbd keys={['⌘', 'C']} />
        <span class="text-sm text-[var(--karbon-text-3)]">Copier (Mac)</span>
      </div>
      <div class="flex items-center gap-4">
        <Kbd keys={['⌘', 'V']} />
        <span class="text-sm text-[var(--karbon-text-3)]">Coller (Mac)</span>
      </div>
      <div class="flex items-center gap-4">
        <Kbd keys={['⌘', '⇧', 'S']} />
        <span class="text-sm text-[var(--karbon-text-3)]">Sauvegarder sous (Mac)</span>
      </div>
      <div class="flex items-center gap-4">
        <Kbd keys={['⌥', '⌘', 'I']} />
        <span class="text-sm text-[var(--karbon-text-3)]">DevTools (Mac)</span>
      </div>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Inline Usage" description="Utilisation dans du texte courant." code={`<p>Appuyez sur <Kbd keys={['Ctrl', 'K']} /> pour ouvrir la recherche.</p>`}>
  {#snippet children()}
    <p class="text-sm text-[var(--karbon-text-2)] leading-relaxed">
      Appuyez sur <Kbd keys={['Ctrl', 'K']} /> pour ouvrir la recherche, puis utilisez
      <Kbd keys={['↑']} /> et <Kbd keys={['↓']} /> pour naviguer. Validez avec
      <Kbd keys={['Enter']} /> ou annulez avec <Kbd keys={['Esc']} />.
    </p>
  {/snippet}
</DemoSection>

<DemoSection title="Cheatsheet" description="Grille de raccourcis formatage." code={`<Kbd keys={['Ctrl', 'B']} /> Gras
<Kbd keys={['Ctrl', 'I']} /> Italique
<Kbd keys={['Ctrl', 'U']} /> Souligne`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
      {#each [
        { keys: ['Ctrl', 'B'], desc: 'Gras' },
        { keys: ['Ctrl', 'I'], desc: 'Italique' },
        { keys: ['Ctrl', 'U'], desc: 'Souligne' },
        { keys: ['Ctrl', 'A'], desc: 'Tout selectionner' },
        { keys: ['Ctrl', 'F'], desc: 'Rechercher' },
        { keys: ['Ctrl', 'H'], desc: 'Remplacer' },
        { keys: ['Ctrl', 'P'], desc: 'Imprimer' },
        { keys: ['Ctrl', 'N'], desc: 'Nouveau' },
      ] as shortcut}
        <div class="flex items-center justify-between p-2.5 rounded-lg border border-[var(--karbon-border)]">
          <span class="text-sm text-[var(--karbon-text-2)]">{shortcut.desc}</span>
          <Kbd keys={shortcut.keys} />
        </div>
      {/each}
    </div>
  {/snippet}
</DemoSection>
