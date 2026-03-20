<script lang="ts">
  const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'emerald', 'cyan', 'blue', 'violet', 'pink', 'slate', 'zinc'] as const;
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

  let hoveredColor = $state('');
  let hoveredShade = $state(0);
  let showTooltip = $state(false);

  function getVar(color: string, shade: number): string {
    return `var(--karbon-${color}-${shade})`;
  }

  function handleEnter(color: string, shade: number) {
    hoveredColor = color;
    hoveredShade = shade;
    showTooltip = true;
  }

  function handleLeave() {
    showTooltip = false;
  }
</script>

<h1 class="text-3xl font-bold mb-2">Colors</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Les 12 palettes de couleurs avec 11 nuances chacune. Survolez une couleur pour voir son nom et sa variable CSS.</p>

{#each colors as color}
  <section class="mb-8">
    <h2 class="text-lg font-semibold mb-3 capitalize">{color}</h2>
    <div class="flex gap-1.5 flex-wrap">
      {#each shades as shade}
        <div class="relative group">
          <div
            class="w-14 h-14 rounded-lg cursor-pointer transition-transform hover:scale-110 hover:shadow-lg border border-white/10"
            style="background: {getVar(color, shade)}"
            onmouseenter={() => handleEnter(color, shade)}
            onmouseleave={handleLeave}
            role="presentation"
          ></div>
          <div class="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none shadow-lg z-50 transition-opacity"
            style="background: var(--karbon-text, #111827); color: var(--karbon-bg, #ffffff);"
          >
            --karbon-{color}-{shade}
          </div>
        </div>
      {/each}
    </div>
  </section>
{/each}

<!-- Color usage example -->
<section class="mb-10 mt-12">
  <h2 class="text-xl font-semibold mb-4">Utilisation des couleurs</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each colors as color}
      <div class="flex items-center gap-3 p-3 rounded-lg border border-[var(--karbon-border)]">
        <div class="w-10 h-10 rounded-lg shrink-0" style="background: var(--karbon-{color}-500)"></div>
        <div>
          <div class="text-sm font-semibold capitalize">{color}-500</div>
          <code class="text-xs text-[var(--karbon-text-3)]">var(--karbon-{color}-500)</code>
        </div>
      </div>
    {/each}
  </div>
</section>
