<script lang="ts">
  import { Button, Badge, Progress } from '@karbonjs/ui-svelte';

  const themes = ['default', 'midnight', 'aurora', 'minimal', 'corporate', 'sunset', 'ocean', 'forest', 'neon', 'rose'] as const;

  const descriptions: Record<string, string> = {
    default: 'Clean et neutre, ideal pour commencer',
    midnight: 'Dark premium avec accents violets (LaRevueGeek)',
    aurora: 'Gradients nordiques, vert/bleu/violet irises',
    minimal: 'Ultra epure, noir et blanc, zero decoration',
    corporate: 'Business serieux, bleu marine, classique',
    sunset: 'Chaleureux, orange et ambre',
    ocean: 'Frais et profond, bleu/cyan/turquoise',
    forest: 'Nature et zen, vert et tons terre',
    neon: 'Cyberpunk/gaming, glow fluo sur noir',
    rose: 'Doux et elegant, rose et mauve',
  };

  function applyTheme(theme: string) {
    document.documentElement.setAttribute('data-karbon-theme', theme);
  }
</script>

<h1 class="text-3xl font-bold mb-2">Themes</h1>
<p class="text-[var(--karbon-text-3)] mb-8">10 themes disponibles. Cliquez sur "Appliquer" pour tester globalement.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  {#each themes as theme}
    <!-- Each card scopes both attributes so theme CSS applies inside -->
    <div
      class="rounded-xl overflow-hidden"
      data-karbon-theme={theme}
      data-theme="dark"
      style="border: 1px solid var(--karbon-border);"
    >
      <!-- Header -->
      <div class="px-5 py-3 flex items-center justify-between" style="background: var(--karbon-bg-2); border-bottom: 1px solid var(--karbon-border);">
        <div>
          <h3 class="font-semibold text-sm capitalize" style="color: var(--karbon-text);">{theme}</h3>
          <p class="text-[10px] mt-0.5" style="color: var(--karbon-text-3);">{descriptions[theme]}</p>
        </div>
        <button
          onclick={() => applyTheme(theme)}
          class="text-[11px] font-medium px-3 py-1 rounded-md cursor-pointer transition-all"
          style="background: var(--karbon-primary); color: var(--karbon-primary-foreground, white);"
        >Appliquer</button>
      </div>

      <!-- Preview -->
      <div class="p-5 space-y-4" style="background: var(--karbon-bg);">
        <!-- Color dots -->
        <div class="flex gap-2">
          <div class="w-7 h-7 rounded-full" style="background: var(--karbon-primary);" title="primary"></div>
          <div class="w-7 h-7 rounded-full" style="background: var(--karbon-secondary, var(--karbon-primary));" title="secondary"></div>
          <div class="w-7 h-7 rounded-full" style="background: var(--karbon-accent, var(--karbon-primary));" title="accent"></div>
          <div class="w-7 h-7 rounded-full" style="background: var(--karbon-success);" title="success"></div>
          <div class="w-7 h-7 rounded-full" style="background: var(--karbon-danger);" title="danger"></div>
          <div class="w-7 h-7 rounded-full" style="background: var(--karbon-bg-card); border: 1px solid var(--karbon-border);" title="card"></div>
        </div>

        <!-- Buttons -->
        <div class="flex items-center gap-2">
          <Button size="xs">Solid</Button>
          <Button size="xs" variant="flat">Flat</Button>
          <Button size="xs" variant="bordered">Bordered</Button>
          <Button size="xs" variant="neon">Neon</Button>
        </div>

        <!-- Progress -->
        <Progress value={65} />

        <!-- Text -->
        <div class="space-y-0.5">
          <p class="text-sm font-medium" style="color: var(--karbon-text);">Texte principal</p>
          <p class="text-xs" style="color: var(--karbon-text-2);">Texte secondaire avec couleur atténuée</p>
          <p class="text-[11px]" style="color: var(--karbon-text-3);">Texte tertiaire discret</p>
        </div>

        <!-- Card inside card -->
        <div class="rounded-lg p-3" style="background: var(--karbon-bg-card); border: 1px solid var(--karbon-border);">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium" style="color: var(--karbon-text-2);">Exemple de carte</span>
            <div class="flex gap-1">
              <span class="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style="background: color-mix(in srgb, var(--karbon-primary) 15%, transparent); color: var(--karbon-primary);">Badge</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Light mode preview -->
      <div
        class="px-5 py-3 flex items-center gap-3"
        data-karbon-theme={theme}
        data-theme="light"
        style="background: var(--karbon-bg); border-top: 1px solid var(--karbon-border);"
      >
        <span class="text-[10px] font-semibold uppercase tracking-wider" style="color: var(--karbon-text-3);">Light</span>
        <div class="flex gap-1.5">
          <div class="w-4 h-4 rounded-full" style="background: var(--karbon-primary);"></div>
          <div class="w-4 h-4 rounded-full" style="background: var(--karbon-bg-card); border: 1px solid var(--karbon-border);"></div>
          <div class="w-4 h-4 rounded-full" style="background: var(--karbon-bg-2);"></div>
        </div>
        <p class="text-[11px]" style="color: var(--karbon-text);">Apercu clair</p>
      </div>
    </div>
  {/each}
</div>
