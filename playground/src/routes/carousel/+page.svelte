<script lang="ts">
  import { Carousel, Button, Badge, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

  const usageCode = `<script lang="ts">
  import { Carousel } from '@karbonjs/ui-svelte'

  const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg']
<\/script>

<Carousel {images} aspectRatio="16/9" rounded="xl" color="violet" />

<Carousel {images} transition="fade" autoplay={3000} loop />

<Carousel total={3} slidesPerView={2} gap={12}>
  {#snippet slide(i)}
    <div class="card">Slide {i + 1}</div>
  {/snippet}
</Carousel>`;

  const images = [
    'https://picsum.photos/seed/carousel1/800/450',
    'https://picsum.photos/seed/carousel2/800/450',
    'https://picsum.photos/seed/carousel3/800/450',
    'https://picsum.photos/seed/carousel4/800/450',
    'https://picsum.photos/seed/carousel5/800/450',
    'https://picsum.photos/seed/carousel6/800/450',
  ];

  const products = [
    { name: 'Casque Audio Pro', price: '149€', badge: 'Nouveau', img: 'https://picsum.photos/seed/prod1/400/400' },
    { name: 'Clavier Mecanique', price: '89€', badge: '-20%', img: 'https://picsum.photos/seed/prod2/400/400' },
    { name: 'Souris Gaming', price: '59€', badge: '', img: 'https://picsum.photos/seed/prod3/400/400' },
    { name: 'Ecran 27"', price: '349€', badge: 'Top vente', img: 'https://picsum.photos/seed/prod4/400/400' },
    { name: 'Webcam HD', price: '79€', badge: '', img: 'https://picsum.photos/seed/prod5/400/400' },
    { name: 'Micro USB', price: '129€', badge: 'Nouveau', img: 'https://picsum.photos/seed/prod6/400/400' },
  ];

  const testimonials = [
    { name: 'Alice Martin', role: 'Designer', text: 'KarbonJS a completement transforme notre workflow. Les composants sont magnifiques et super faciles a personnaliser.', avatar: 'AM' },
    { name: 'Bob Dupont', role: 'Developpeur', text: 'La meilleure librairie UI que j\'ai utilisee. Le systeme de themes est incroyable.', avatar: 'BD' },
    { name: 'Claire Morel', role: 'Product Manager', text: 'Notre equipe a gagne un temps enorme depuis qu\'on utilise KarbonJS. Tout est coherent.', avatar: 'CM' },
  ];
</script>

<h1 class="text-3xl font-bold mb-2">Carousel</h1>
<p class="text-[var(--karbon-text-3)] mb-10">Carrousel avec slide/fade, multi-slides, drag/swipe, cards et contenu custom.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<DemoSection title="Basic (images)" description="Glissez ou utilisez les fleches. Supporte le touch mobile." code={`<Carousel {images} aspectRatio="16/9" rounded="xl" color="violet" />`}>
  {#snippet children()}
    <Carousel {images} aspectRatio="16/9" rounded="xl" color="violet" />
  {/snippet}
</DemoSection>

<DemoSection title="Fade transition" description="Transition en fondu au lieu du glissement." code={`<Carousel {images} transition="fade" aspectRatio="16/9" rounded="xl" color="emerald" />`}>
  {#snippet children()}
    <Carousel {images} transition="fade" aspectRatio="16/9" rounded="xl" color="emerald" />
  {/snippet}
</DemoSection>

<DemoSection title="Autoplay + Loop" description="Defilement auto toutes les 3s, boucle infinie. Pause au survol." code={`<Carousel {images} autoplay={3000} loop aspectRatio="16/9" rounded="xl" color="cyan" />`}>
  {#snippet children()}
    <Carousel {images} autoplay={3000} loop aspectRatio="16/9" rounded="xl" color="cyan" />
  {/snippet}
</DemoSection>

<DemoSection title="Multi-slides" description="Affichez plusieurs slides a la fois avec un gap." code={`<Carousel {images} slidesPerView={2} gap={12} aspectRatio="16/9" rounded="xl" color="violet" />
<Carousel {images} slidesPerView={3} gap={12} aspectRatio="16/9" rounded="lg" color="blue" />`}>
  {#snippet children()}
    <div class="space-y-6">
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">2 slides</span>
        <Carousel {images} slidesPerView={2} gap={12} aspectRatio="16/9" rounded="xl" color="violet" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">3 slides</span>
        <Carousel {images} slidesPerView={3} gap={12} aspectRatio="16/9" rounded="lg" color="blue" />
      </div>
      <div>
        <span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">4 slides</span>
        <Carousel {images} slidesPerView={4} gap={8} aspectRatio="16/9" rounded="md" color="pink" />
      </div>
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Carousel de produits (cards)" description="Chaque slide est un composant custom via le snippet slide." code={'<Carousel total={products.length} slidesPerView={3} gap={16} rounded="xl" color="emerald">\n  {#snippet slide(i)}\n    <div class="card">\n      <img src={products[i].img} alt={products[i].name} />\n      <span>{products[i].name}</span>\n      <Badge color="emerald" size="xs">{products[i].badge}</Badge>\n    </div>\n  {/snippet}\n</Carousel>'}>
  {#snippet children()}
    <Carousel total={products.length} slidesPerView={3} gap={16} rounded="xl" color="emerald">
      {#snippet slide(i)}
        <div class="rounded-xl overflow-hidden h-full" style="background:var(--karbon-bg-card);border:1px solid var(--karbon-border);">
          <img src={products[i].img} alt={products[i].name} class="w-full aspect-square object-cover" />
          <div class="p-3">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-semibold" style="color:var(--karbon-text);">{products[i].name}</span>
              {#if products[i].badge}
                <Badge color="emerald" size="xs">{products[i].badge}</Badge>
              {/if}
            </div>
            <span class="text-sm font-bold" style="color:var(--karbon-emerald-400);">{products[i].price}</span>
          </div>
        </div>
      {/snippet}
    </Carousel>
  {/snippet}
</DemoSection>

<DemoSection title="Carousel de temoignages" description="Cards de temoignages en mode fade." code={'<Carousel total={testimonials.length} transition="fade" rounded="xl" color="violet" arrows={false} aspectRatio="auto">\n  {#snippet slide(i)}\n    <div class="text-center p-8">\n      <p>"{testimonials[i].text}"</p>\n      <p>{testimonials[i].name}</p>\n    </div>\n  {/snippet}\n</Carousel>'}>
  {#snippet children()}
    <Carousel total={testimonials.length} transition="fade" rounded="xl" color="violet" arrows={false} aspectRatio="auto">
      {#snippet slide(i)}
        <div class="flex flex-col items-center text-center p-8">
          <div
            class="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold mb-4"
            style="background:color-mix(in srgb,var(--karbon-violet-500) 15%,transparent);color:var(--karbon-violet-400);"
          >{testimonials[i].avatar}</div>
          <p class="text-base italic leading-relaxed mb-4" style="color:var(--karbon-text-2);max-width:28rem;">"{testimonials[i].text}"</p>
          <p class="text-sm font-semibold" style="color:var(--karbon-text);">{testimonials[i].name}</p>
          <p class="text-xs" style="color:var(--karbon-text-3);">{testimonials[i].role}</p>
        </div>
      {/snippet}
    </Carousel>
  {/snippet}
</DemoSection>

<DemoSection title="Couleurs" description="L'indicateur actif prend la couleur choisie." code={`<Carousel images={images.slice(0, 3)} aspectRatio="16/9" rounded="lg" color="red" arrows={false} />
<Carousel images={images.slice(0, 3)} aspectRatio="16/9" rounded="lg" color="violet" arrows={false} />`}>
  {#snippet children()}
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {#each ['red', 'emerald', 'cyan', 'blue', 'violet', 'pink'] as c}
        <Carousel images={images.slice(0, 3)} aspectRatio="16/9" rounded="lg" color={c} arrows={false} />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<DemoSection title="Minimal (sans arrows ni indicators)" description="Navigation uniquement par swipe/drag." code={`<Carousel {images} aspectRatio="16/9" rounded="xl" arrows={false} indicators={false} />`}>
  {#snippet children()}
    <Carousel {images} aspectRatio="16/9" rounded="xl" arrows={false} indicators={false} />
  {/snippet}
</DemoSection>
