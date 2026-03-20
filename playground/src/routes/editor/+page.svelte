<script lang="ts">
  import { RichTextEditor, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { RichTextEditor } from '@karbonjs/ui-svelte'

  let content = $state('')

  const media = {
    browse: async (page, search) => {
      const res = await fetch(\`/api/media?page=\${page}&q=\${search}\`)
      return res.json()
    },
    upload: async (file) => {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/media/upload', { method: 'POST', body: form })
      return res.json()
    }
  }
<\/script>

<RichTextEditor bind:value={content} {media} placeholder="Redigez..." />`;

  let content = $state('<h2>Bienvenue dans l\'editeur KarbonJS</h2><p>Un editeur <strong>WYSIWYG</strong> complet construit avec <em>zero dependance</em>. Ecrivez, formatez et integrez des medias directement.</p><h3>Fonctionnalites</h3><ul><li><strong>Formatage riche</strong> — gras, italique, souligne, barre</li><li><strong>Titres</strong> — H2, H3, H4</li><li><strong>Listes</strong> — a puces et numerotees</li><li><strong>Liens et images</strong> — insertion et modification</li><li><strong>Tableaux</strong> — creation et edition</li><li><strong>Code</strong> — blocs et inline</li><li><strong>Citations</strong> — blockquote</li></ul><blockquote>KarbonJS — Le design system qui change tout.</blockquote><p>Essayez le <code>mode source</code> pour voir le HTML genere, ou utilisez le <strong>menu contextuel</strong> (clic droit) pour modifier les elements.</p>');

  let article = $state('<h2>Comment creer un site performant en 2026</h2><p>La performance web est devenue un enjeu majeur. Voici les bonnes pratiques a suivre pour garantir une experience optimale a vos utilisateurs.</p><h3>1. Optimiser les images</h3><p>Utilisez le format <strong>WebP</strong> ou <strong>AVIF</strong> pour reduire le poids des images de 30 a 50%. Pensez aussi au lazy loading natif avec l\'attribut <code>loading="lazy"</code>.</p><h3>2. Minimiser le JavaScript</h3><p>Le JavaScript est souvent le principal responsable de la lenteur. Privilegiez le <em>tree-shaking</em>, le <em>code-splitting</em> et les frameworks legers comme <a href="#">Svelte</a>.</p><h3>3. Utiliser un CDN</h3><p>Distribuez vos assets statiques via un CDN pour reduire la latence geographique.</p><hr/><p><em>Publie le 20 mars 2026 par LaRevueGeek</em></p>');

  let minimal = $state('');
  let floatingContent = $state('<p>Selectionnez du texte pour voir la toolbar flottante apparaitre au-dessus de la selection.</p><p>Essayez de selectionner <strong>ce mot</strong> ou <em>celui-ci</em> pour voir les options de formatage.</p>');
  let tokenContent = $state('<h3>Mon article</h3><p>Inserez des blocs custom via le bouton + dans la toolbar.</p>');

  const demoTokens = [
    // Layout
    { id: 'col2', label: '2 colonnes', icon: '▐▌', group: 'Layout', template: '<div data-token="col2" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:12px 0;"><div style="padding:16px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:80px;"><p>Colonne 1</p></div><div style="padding:16px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:80px;"><p>Colonne 2</p></div></div>' },
    { id: 'col3', label: '3 colonnes', icon: '▐█▌', group: 'Layout', template: '<div data-token="col3" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin:12px 0;"><div style="padding:16px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:80px;"><p>Col 1</p></div><div style="padding:16px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:80px;"><p>Col 2</p></div><div style="padding:16px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:80px;"><p>Col 3</p></div></div>' },
    { id: 'col4', label: '4 colonnes', icon: '████', group: 'Layout', template: '<div data-token="col4" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:12px 0;"><div style="padding:12px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:60px;"><p>1</p></div><div style="padding:12px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:60px;"><p>2</p></div><div style="padding:12px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:60px;"><p>3</p></div><div style="padding:12px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:60px;"><p>4</p></div></div>' },
    { id: 'sidebar', label: 'Sidebar layout', icon: '▐ █', group: 'Layout', template: '<div data-token="sidebar" style="display:grid;grid-template-columns:1fr 300px;gap:16px;margin:12px 0;"><div style="padding:16px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:120px;"><p>Contenu principal</p></div><div style="padding:16px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:120px;"><p>Sidebar</p></div></div>' },
    { id: 'grid22', label: 'Grille 2×2', icon: '⊞', group: 'Layout', template: '<div data-token="grid22" style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto auto;gap:12px;margin:12px 0;"><div style="padding:16px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:80px;"><p>Bloc 1</p></div><div style="padding:16px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:80px;"><p>Bloc 2</p></div><div style="padding:16px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:80px;"><p>Bloc 3</p></div><div style="padding:16px;border:1px dashed var(--karbon-border);border-radius:8px;min-height:80px;"><p>Bloc 4</p></div></div>' },
    { id: 'hero', label: 'Hero section', icon: '🏔️', group: 'Layout', template: '<div data-token="hero" style="padding:48px 32px;margin:12px 0;border-radius:12px;background:linear-gradient(135deg,var(--karbon-bg-2),color-mix(in srgb,var(--karbon-primary) 8%,transparent));text-align:center;"><h2 style="font-size:28px;font-weight:800;margin:0 0 8px 0;">Votre titre accrocheur</h2><p style="font-size:16px;color:var(--karbon-text-3);margin:0 auto 20px;max-width:500px;">Une description courte et percutante pour capter l\'attention.</p><span style="display:inline-block;padding:10px 24px;border-radius:8px;background:var(--karbon-primary);color:white;font-size:14px;font-weight:600;">Decouvrir →</span></div>' },
    // Contenu
    { id: 'article', label: 'Article embed', icon: '📰', group: 'Contenu', template: '<div data-token="article" contenteditable="false" style="padding:16px;margin:12px 0;border:1px dashed var(--karbon-border);border-radius:10px;background:var(--karbon-bg-2);"><div style="display:flex;gap:12px;align-items:center;"><div style="width:60px;height:60px;border-radius:8px;background:var(--karbon-nav-hover-bg);flex-shrink:0;"></div><div><div style="font-size:13px;font-weight:600;color:var(--karbon-text);">Article recommande</div><div style="font-size:11px;color:var(--karbon-text-3);margin-top:2px;">Cliquez pour selectionner un article...</div></div></div></div>' },
    { id: 'gallery', label: 'Galerie', icon: '🖼️', group: 'Contenu', template: '<div data-token="gallery" contenteditable="false" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px;margin:12px 0;border:1px dashed var(--karbon-border);border-radius:10px;background:var(--karbon-bg-2);"><div style="aspect-ratio:1;background:var(--karbon-nav-hover-bg);border-radius:6px;"></div><div style="aspect-ratio:1;background:var(--karbon-nav-hover-bg);border-radius:6px;"></div><div style="aspect-ratio:1;background:var(--karbon-nav-hover-bg);border-radius:6px;"></div></div>' },
    { id: 'alert-info', label: 'Info', icon: '💡', group: 'Contenu', template: '<div data-token="alert" style="padding:14px 16px;margin:12px 0;border-radius:10px;background:color-mix(in srgb,var(--karbon-blue-500) 10%,transparent);border-left:3px solid var(--karbon-blue-500);"><div style="font-size:13px;font-weight:600;color:var(--karbon-blue-400);margin-bottom:4px;">💡 A noter</div><p style="font-size:13px;color:var(--karbon-text-2);margin:0;">Information importante pour vos lecteurs.</p></div>' },
    { id: 'alert-warn', label: 'Attention', icon: '⚠️', group: 'Contenu', template: '<div data-token="alert-warn" style="padding:14px 16px;margin:12px 0;border-radius:10px;background:color-mix(in srgb,var(--karbon-amber-500) 10%,transparent);border-left:3px solid var(--karbon-amber-500);"><div style="font-size:13px;font-weight:600;color:var(--karbon-amber-400);margin-bottom:4px;">⚠️ Attention</div><p style="font-size:13px;color:var(--karbon-text-2);margin:0;">Avertissement a prendre en compte.</p></div>' },
    { id: 'alert-danger', label: 'Danger', icon: '🚨', group: 'Contenu', template: '<div data-token="alert-danger" style="padding:14px 16px;margin:12px 0;border-radius:10px;background:color-mix(in srgb,var(--karbon-red-500) 10%,transparent);border-left:3px solid var(--karbon-red-500);"><div style="font-size:13px;font-weight:600;color:var(--karbon-red-400);margin-bottom:4px;">🚨 Important</div><p style="font-size:13px;color:var(--karbon-text-2);margin:0;">Action critique requise.</p></div>' },
    { id: 'quote', label: 'Citation', icon: '💬', group: 'Contenu', template: '<div data-token="quote" style="padding:20px 24px;margin:12px 0;border-radius:12px;background:var(--karbon-bg-2);border-left:4px solid var(--karbon-primary);"><p style="font-size:15px;font-style:italic;color:var(--karbon-text);margin:0 0 8px 0;">"Le design est l\'ambassadeur silencieux de votre marque."</p><p style="font-size:12px;color:var(--karbon-text-3);margin:0;">— Paul Rand</p></div>' },
    { id: 'separator', label: 'Separateur', icon: '➖', group: 'Contenu', template: '<div style="margin:24px 0;text-align:center;"><span style="display:inline-block;width:60px;height:3px;border-radius:2px;background:var(--karbon-primary);"></span></div>' },
    { id: 'spacer', label: 'Espace', icon: '↕️', group: 'Contenu', template: '<div data-token="spacer" style="height:48px;margin:0;"></div>' },
    // Marketing
    { id: 'cta', label: 'Call to Action', icon: '🔘', group: 'Marketing', template: '<div data-token="cta" contenteditable="false" style="padding:24px;margin:12px 0;border-radius:12px;background:linear-gradient(135deg,color-mix(in srgb,var(--karbon-primary) 12%,transparent),color-mix(in srgb,var(--karbon-primary) 6%,transparent));text-align:center;"><div style="font-size:18px;font-weight:700;color:var(--karbon-text);">Decouvrez nos offres</div><div style="font-size:13px;color:var(--karbon-text-3);margin-top:6px;">Profitez de -20% sur votre premiere commande</div><div style="margin-top:12px;"><span style="display:inline-block;padding:8px 20px;border-radius:8px;background:var(--karbon-primary);color:white;font-size:13px;font-weight:600;">En savoir plus →</span></div></div>' },
    { id: 'pricing', label: 'Carte prix', icon: '💰', group: 'Marketing', template: '<div data-token="pricing" contenteditable="false" style="max-width:280px;margin:12px auto;padding:24px;border-radius:12px;border:1px solid var(--karbon-border);background:var(--karbon-bg-card);text-align:center;"><div style="font-size:14px;font-weight:600;color:var(--karbon-text);">Pro</div><div style="font-size:32px;font-weight:800;color:var(--karbon-primary);margin:8px 0;">29€<span style="font-size:14px;font-weight:400;color:var(--karbon-text-3);">/mois</span></div><div style="font-size:12px;color:var(--karbon-text-3);margin-bottom:16px;">Tout inclus, sans limite</div><span style="display:inline-block;padding:8px 24px;border-radius:8px;background:var(--karbon-primary);color:white;font-size:13px;font-weight:600;">Choisir ce plan</span></div>' },
    { id: 'testimonial', label: 'Temoignage', icon: '⭐', group: 'Marketing', template: '<div data-token="testimonial" style="padding:20px;margin:12px 0;border-radius:12px;background:var(--karbon-bg-2);display:flex;gap:14px;align-items:start;"><div style="width:44px;height:44px;border-radius:50%;background:color-mix(in srgb,var(--karbon-primary) 15%,transparent);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--karbon-primary);">JD</div><div><p style="font-size:13px;color:var(--karbon-text);margin:0 0 6px;font-style:italic;">"Ce produit a change ma vie professionnelle."</p><p style="font-size:11px;color:var(--karbon-text-3);margin:0;"><strong>Jean Dupont</strong> — CEO, TechCorp</p></div></div>' },
    { id: 'features', label: 'Features grid', icon: '✨', group: 'Marketing', template: '<div data-token="features" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0;">' +
      '<div style="padding:16px;border-radius:10px;background:var(--karbon-bg-2);"><div style="font-size:20px;margin-bottom:6px;">🚀</div><div style="font-size:13px;font-weight:600;color:var(--karbon-text);margin-bottom:4px;">Rapide</div><div style="font-size:12px;color:var(--karbon-text-3);">Performance optimale.</div></div>' +
      '<div style="padding:16px;border-radius:10px;background:var(--karbon-bg-2);"><div style="font-size:20px;margin-bottom:6px;">🎨</div><div style="font-size:13px;font-weight:600;color:var(--karbon-text);margin-bottom:4px;">Design</div><div style="font-size:12px;color:var(--karbon-text-3);">Interface soignee.</div></div>' +
      '<div style="padding:16px;border-radius:10px;background:var(--karbon-bg-2);"><div style="font-size:20px;margin-bottom:6px;">🔒</div><div style="font-size:13px;font-weight:600;color:var(--karbon-text);margin-bottom:4px;">Securise</div><div style="font-size:12px;color:var(--karbon-text-3);">Protection totale.</div></div>' +
      '<div style="padding:16px;border-radius:10px;background:var(--karbon-bg-2);"><div style="font-size:20px;margin-bottom:6px;">💬</div><div style="font-size:13px;font-weight:600;color:var(--karbon-text);margin-bottom:4px;">Support</div><div style="font-size:12px;color:var(--karbon-text-3);">24/7 disponible.</div></div></div>' },
  ];

  const media = {
    browse: async () => ({ files: [] as any[], total: 0 }),
    upload: async (file: File) => ({ url: URL.createObjectURL(file), name: file.name })
  };

  let showSource = $state(false);
  let showPreview = $state(false);
</script>

<h1 class="text-3xl font-bold mb-2">RichTextEditor</h1>
<p class="text-[var(--karbon-text-3)] mb-10">Editeur WYSIWYG complet avec toolbar, formatage, medias, source view et menu contextuel.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Editeur complet" description="Toolbar avec formatage, insertion d'images, tableaux, code blocks et plus." code={`<RichTextEditor bind:value={content} {media} />`}>
  {#snippet children()}
    <RichTextEditor bind:value={content} {media} />

    <div class="flex gap-2 mt-4">
      <button
        onclick={() => showSource = !showSource}
        class="text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
        style="background:{showSource ? 'var(--karbon-primary)' : 'var(--karbon-bg-card)'};color:{showSource ? 'white' : 'var(--karbon-text-2)'};border:1px solid var(--karbon-border);"
      >
        {showSource ? 'Masquer' : 'Voir'} le HTML
      </button>
      <button
        onclick={() => showPreview = !showPreview}
        class="text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
        style="background:{showPreview ? 'var(--karbon-primary)' : 'var(--karbon-bg-card)'};color:{showPreview ? 'white' : 'var(--karbon-text-2)'};border:1px solid var(--karbon-border);"
      >
        {showPreview ? 'Masquer' : 'Voir'} le rendu
      </button>
    </div>

    {#if showSource}
      <div class="mt-4 p-4 rounded-xl overflow-auto" style="background:var(--karbon-bg-card);border:1px solid var(--karbon-border);max-height:300px;">
        <pre class="text-xs font-mono whitespace-pre-wrap break-all" style="color:var(--karbon-text-2);">{content}</pre>
      </div>
    {/if}

    {#if showPreview}
      <div class="mt-4 p-6 rounded-xl" style="background:var(--karbon-bg-card);border:1px solid var(--karbon-border);">
        <div class="prose prose-sm max-w-none" style="color:var(--karbon-text);">
          {@html content}
        </div>
      </div>
    {/if}
  {/snippet}
</DemoSection>

<DemoSection title="Toolbar flottante" description="Selectionnez du texte pour voir la toolbar apparaitre. Mode ideal pour une experience d'ecriture immersive." code={`<RichTextEditor bind:value={floatingContent} toolbarMode="floating" {media} />`}>
  {#snippet children()}
    <RichTextEditor bind:value={floatingContent} toolbarMode="floating" {media} />
  {/snippet}
</DemoSection>

<DemoSection title="Tokens / Blocs custom" description="Cliquez sur le bouton + dans la toolbar pour inserer des blocs pre-configures." code={`<RichTextEditor bind:value={tokenContent} tokens={demoTokens} {media} />`}>
  {#snippet children()}
    <RichTextEditor bind:value={tokenContent} tokens={demoTokens} {media} />
  {/snippet}
</DemoSection>

<DemoSection title="Toolbar presets" description="3 presets pour adapter la toolbar au contexte." code={`<RichTextEditor value="..." toolbar="minimal" {media} />
<RichTextEditor value="..." toolbar="standard" {media} />
<RichTextEditor value="..." toolbar="full" {media} />`}>
  {#snippet children()}
    <div class="space-y-6">
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Minimal (gras, italique, souligne, lien)</span>
        <RichTextEditor value="<p>Editeur minimal — juste l'essentiel.</p>" toolbar="minimal" {media} />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Standard (defaut)</span>
        <RichTextEditor value="<p>Editeur standard — le set de base.</p>" toolbar="standard" {media} />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Full (tout)</span>
        <RichTextEditor value="<p>Editeur complet — toutes les options.</p>" toolbar="full" {media} />
      </div>
    </div>
  {/snippet}
</DemoSection>
