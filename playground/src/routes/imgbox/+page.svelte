<script lang="ts">
  import { ImgBox, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { ImgBox } from '@karbonjs/ui-svelte'

  const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg']
  const captions = ['Photo 1', 'Photo 2', 'Photo 3']

  let open = $state(false)
  let index = $state(0)
<\/script>

<button onclick={() => { index = 0; open = true }}>Ouvrir galerie</button>

<ImgBox {images} {captions} bind:open bind:index onclose={() => open = false} />`;

  const gallery = [
    'https://picsum.photos/seed/imgbox1/1200/800',
    'https://picsum.photos/seed/imgbox2/1200/800',
    'https://picsum.photos/seed/imgbox3/1200/800',
    'https://picsum.photos/seed/imgbox4/1200/800',
    'https://picsum.photos/seed/imgbox5/1200/800',
    'https://picsum.photos/seed/imgbox6/1200/800',
  ];

  const captions = [
    'Paysage de montagne au coucher du soleil',
    'Architecture moderne en verre',
    'Foret tropicale dense',
    'Ocean et falaises rocheuses',
    'Ville illuminee la nuit',
    'Champ de lavande en Provence',
  ];

  let basic = $state(false);
  let basicIdx = $state(0);

  let withCaptions = $state(false);
  let captionIdx = $state(0);

  let single = $state(false);

  let dark = $state(false);
  let darkIdx = $state(0);

  function openAt(setter: (v: boolean) => void, idxSetter: (v: number) => void, i: number) {
    idxSetter(i);
    setter(true);
  }
</script>

<h1 class="text-3xl font-bold mb-2">ImgBox</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Lightbox galerie avec zoom, navigation, thumbnails, captions et transitions.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Galerie" description="Cliquez sur une image pour ouvrir la lightbox. Naviguez avec les fleches ou le clavier." code={`<ImgBox images={gallery} bind:open bind:index onclose={() => open = false} />`}>
  {#snippet children()}
    <div class="grid grid-cols-3 md:grid-cols-6 gap-2">
      {#each gallery as img, i}
        <button
          onclick={() => openAt(v => basic = v, v => basicIdx = v, i)}
          class="rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
          style="aspect-ratio:3/2;"
        >
          <img src={img} alt="Photo {i + 1}" class="w-full h-full object-cover" loading="lazy" />
        </button>
      {/each}
    </div>
    <ImgBox images={gallery} bind:open={basic} bind:index={basicIdx} onclose={() => basic = false} />
  {/snippet}
</DemoSection>

<DemoSection title="Avec legendes" description="Captions affichees sous l'image dans la lightbox." code={`<ImgBox images={gallery} {captions} bind:open bind:index onclose={() => open = false} />`}>
  {#snippet children()}
    <div class="grid grid-cols-3 md:grid-cols-6 gap-2">
      {#each gallery as img, i}
        <button
          onclick={() => openAt(v => withCaptions = v, v => captionIdx = v, i)}
          class="rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 relative group"
          style="aspect-ratio:3/2;"
        >
          <img src={img} alt={captions[i]} class="w-full h-full object-cover" loading="lazy" />
          <span class="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity truncate">{captions[i]}</span>
        </button>
      {/each}
    </div>
    <ImgBox images={gallery} {captions} bind:open={withCaptions} bind:index={captionIdx} onclose={() => withCaptions = false} />
  {/snippet}
</DemoSection>

<DemoSection title="Image unique" description="Lightbox pour une seule image." code={`<ImgBox images={['/photo.jpg']} bind:open onclose={() => open = false} />`}>
  {#snippet children()}
    <button
      onclick={() => single = true}
      class="rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      style="width:300px;aspect-ratio:3/2;"
    >
      <img src="https://picsum.photos/seed/imgbox-single/800/600" alt="Single" class="w-full h-full object-cover" loading="lazy" />
    </button>
    <ImgBox images={['https://picsum.photos/seed/imgbox-single/1600/1200']} bind:open={single} onclose={() => single = false} />
  {/snippet}
</DemoSection>

<DemoSection title="Backdrop sombre" description="Fond plus opaque pour un rendu cinematique." code={`<ImgBox images={gallery} bind:open bind:index backdrop="dark" onclose={() => open = false} />`}>
  {#snippet children()}
    <div class="flex gap-2">
      {#each gallery.slice(0, 3) as img, i}
        <button
          onclick={() => openAt(v => dark = v, v => darkIdx = v, i)}
          class="rounded-lg overflow-hidden cursor-pointer"
          style="width:120px;aspect-ratio:3/2;"
        >
          <img src={img} alt="" class="w-full h-full object-cover" loading="lazy" />
        </button>
      {/each}
    </div>
    <ImgBox images={gallery.slice(0, 3)} bind:open={dark} bind:index={darkIdx} backdrop="dark" onclose={() => dark = false} />
  {/snippet}
</DemoSection>

<DemoSection title="Transitions en action" description="Ouvrez et naviguez pour voir les transitions fade, le zoom double-clic et les thumbnails animees." code={`<ImgBox images={gallery} {captions} bind:open bind:index onclose={() => open = false} />`}>
  {#snippet children()}
    <div class="flex gap-3 items-end">
      {#each gallery as img, i}
        <button
          onclick={() => openAt(v => withCaptions = v, v => captionIdx = v, i)}
          class="rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl relative group"
          style="width:{i === 0 ? '200px' : '100px'};aspect-ratio:{i === 0 ? '4/3' : '2/3'};"
        >
          <img src={img} alt="" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
          <span class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></span>
          <span class="absolute bottom-2 left-2 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">{i + 1}/{gallery.length}</span>
        </button>
      {/each}
    </div>
  {/snippet}
</DemoSection>
