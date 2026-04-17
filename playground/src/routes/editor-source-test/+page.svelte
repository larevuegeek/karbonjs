<script lang="ts">
  import { RichTextEditor } from '@karbonjs/ui-svelte'

  // Exact Netflix content reproducing the reported bug
  let netflixContent = $state(`<p>Pourquoi Netflix a-t-il lâché prise si vite ? La réponse tient en deux mots : <strong>prudence financière</strong>.</p><p>S'aligner sur les 111 milliards de dollars de Paramount signifiait faire exploser la tirelire, au risque d'effrayer Wall Street. Le conseil d'administration du géant du streaming a été ferme.</p><p>De plus, Netflix ciblait principalement la division streaming et les studios, fuyant la gestion des chaînes de télévision traditionnelles (comme CNN) et d'autres secteurs jugés trop lourds.</p><h3><strong>Ce que ça change pour nous ?</strong></h3><p>Si l'industrie du cinéma tremble face à la naissance de ce nouveau mastodonte, du côté des joueurs, c'est plutôt le soulagement !</p><p>En effet, l'offre de Paramount englobe la totalité de WBD, y compris sa précieuse <strong>division gaming</strong> (WB Games). Cela signifie que des studios légendaires restent à l'abri du remous :</p><ul><li><strong>Rocksteady Studios</strong> (<em>Batman Arkham</em>)</li><li><strong>NetherRealm Studios</strong> (<em>Mortal Kombat</em>)</li><li><strong>Avalanche Software</strong> (<em>Hogwarts Legacy</em>)</li><li><strong>Portkey Games</strong> et <strong>Traveller's Tales</strong> (<em>LEGO</em>)</li></ul><p>Netflix, très orienté vers le jeu mobile et casual, n'accordait que très peu d'importance à ces studios AAA. Avec Paramount aux commandes, le futur des adaptations reste ouvert.</p><h3><strong>Et maintenant ?</strong></h3><p>La balle est dans le camp des actionnaires de Warner Bros. Discovery. Ils se réuniront lors d'une assemblée générale extraordinaire très attendue le <strong>18 mars 2026</strong>.</p>`)

  let nested = $state(`<div><section><article><h2>Titre</h2><p>Paragraphe avec <strong>gras</strong> et <em>italique</em>.</p><ul><li>Item 1 <strong>bold</strong></li><li>Item 2 <a href="#">link</a></li><li>Item 3 <code>inline</code></li></ul></article></section></div>`)

  let table = $state(`<table><thead><tr><th>Col 1</th><th>Col 2</th><th>Col 3</th></tr></thead><tbody><tr><td>A1</td><td>B1 <strong>bold</strong></td><td>C1</td></tr><tr><td>A2</td><td>B2</td><td>C2 <em>italique</em></td></tr></tbody></table>`)

  let mixed = $state(`<p>Para avec <strong>gras <em>et italique <u>et souligné</u></em></strong> imbriqués.</p><blockquote><p>Citation <strong>importante</strong>.</p><p>Suite.</p></blockquote><pre><code>const x = 1
const y = 2</code></pre><p><img src="https://via.placeholder.com/150" alt="img"></p><hr/><p>Après hr.</p>`)

  const media = {
    browse: async () => ({ files: [] as any[], total: 0 }),
    upload: async (file: File) => ({ url: URL.createObjectURL(file), name: file.name })
  }
</script>

<h1 class="text-3xl font-bold mb-2">Test — Indentation mode source</h1>
<p class="text-[var(--karbon-text-3)] mb-8">
  Clique sur le bouton <strong>&lt;/&gt;</strong> (Source) dans chaque éditeur pour vérifier l'indentation du HTML.
  Le contenu doit apparaître proprement indenté, sans décalage progressif vers la droite.
</p>

<section class="mb-10">
  <h2 class="text-xl font-bold mb-2">1. Contenu Netflix (cas reporté)</h2>
  <p class="text-sm text-[var(--karbon-text-3)] mb-3">
    Enchaînement de <code>&lt;p&gt;</code>, <code>&lt;h3&gt;</code>, <code>&lt;ul&gt;</code> avec balises inline.
    Chaque bloc doit être à la racine (indent 0), les <code>&lt;li&gt;</code> à indent 1 sous <code>&lt;ul&gt;</code>.
  </p>
  <RichTextEditor bind:value={netflixContent} {media} />
</section>

<section class="mb-10">
  <h2 class="text-xl font-bold mb-2">2. Imbrication profonde</h2>
  <p class="text-sm text-[var(--karbon-text-3)] mb-3">
    <code>div &gt; section &gt; article &gt; {'{h2,p,ul}'}</code> — l'indentation doit refléter la profondeur réelle (4 niveaux).
  </p>
  <RichTextEditor bind:value={nested} {media} />
</section>

<section class="mb-10">
  <h2 class="text-xl font-bold mb-2">3. Tableau</h2>
  <p class="text-sm text-[var(--karbon-text-3)] mb-3">
    <code>table &gt; thead/tbody &gt; tr &gt; th/td</code> — 4 niveaux d'indentation.
  </p>
  <RichTextEditor bind:value={table} {media} />
</section>

<section class="mb-10">
  <h2 class="text-xl font-bold mb-2">4. Inline imbriqué + void tags</h2>
  <p class="text-sm text-[var(--karbon-text-3)] mb-3">
    Gras/italique/souligné imbriqués, <code>&lt;img&gt;</code>, <code>&lt;hr&gt;</code>, <code>&lt;blockquote&gt;</code>, <code>&lt;pre&gt;&lt;code&gt;</code>.
    Les balises void ne doivent pas incrémenter l'indent.
  </p>
  <RichTextEditor bind:value={mixed} {media} />
</section>

<section class="mb-10 p-4 rounded-xl" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-xl font-bold mb-2">Test Tab / Shift+Tab</h2>
  <ol class="list-decimal pl-5 text-sm text-[var(--karbon-text-2)] space-y-1">
    <li>Active le mode source sur n'importe quel éditeur ci-dessus</li>
    <li>Place le curseur dans le textarea → appuie sur <kbd>Tab</kbd> → doit insérer 2 espaces</li>
    <li>Sélectionne plusieurs lignes → <kbd>Tab</kbd> → doit indenter toutes les lignes</li>
    <li>Sélectionne plusieurs lignes indentées → <kbd>Shift</kbd>+<kbd>Tab</kbd> → doit désindenter</li>
  </ol>
</section>
