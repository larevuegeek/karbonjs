import { C as attr, T as escape_html, a as ensure_array_like } from "../../../chunks/server.js";
import { E as Badge, _ as CodeBlock, m as Carousel } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/carousel/+page.svelte
function _page($$renderer) {
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
		"https://picsum.photos/seed/carousel1/800/450",
		"https://picsum.photos/seed/carousel2/800/450",
		"https://picsum.photos/seed/carousel3/800/450",
		"https://picsum.photos/seed/carousel4/800/450",
		"https://picsum.photos/seed/carousel5/800/450",
		"https://picsum.photos/seed/carousel6/800/450"
	];
	const products = [
		{
			name: "Casque Audio Pro",
			price: "149€",
			badge: "Nouveau",
			img: "https://picsum.photos/seed/prod1/400/400"
		},
		{
			name: "Clavier Mecanique",
			price: "89€",
			badge: "-20%",
			img: "https://picsum.photos/seed/prod2/400/400"
		},
		{
			name: "Souris Gaming",
			price: "59€",
			badge: "",
			img: "https://picsum.photos/seed/prod3/400/400"
		},
		{
			name: "Ecran 27\"",
			price: "349€",
			badge: "Top vente",
			img: "https://picsum.photos/seed/prod4/400/400"
		},
		{
			name: "Webcam HD",
			price: "79€",
			badge: "",
			img: "https://picsum.photos/seed/prod5/400/400"
		},
		{
			name: "Micro USB",
			price: "129€",
			badge: "Nouveau",
			img: "https://picsum.photos/seed/prod6/400/400"
		}
	];
	const testimonials = [
		{
			name: "Alice Martin",
			role: "Designer",
			text: "KarbonJS a completement transforme notre workflow. Les composants sont magnifiques et super faciles a personnaliser.",
			avatar: "AM"
		},
		{
			name: "Bob Dupont",
			role: "Developpeur",
			text: "La meilleure librairie UI que j'ai utilisee. Le systeme de themes est incroyable.",
			avatar: "BD"
		},
		{
			name: "Claire Morel",
			role: "Product Manager",
			text: "Notre equipe a gagne un temps enorme depuis qu'on utilise KarbonJS. Tout est coherent.",
			avatar: "CM"
		}
	];
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Carousel</h1> <p class="text-[var(--karbon-text-3)] mb-10">Carrousel avec slide/fade, multi-slides, drag/swipe, cards et contenu custom.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
	CodeBlock($$renderer, {
		code: usageCode,
		language: "svelte",
		title: "Example.svelte",
		lineCopy: true
	});
	$$renderer.push(`<!----></div> `);
	{
		function children($$renderer) {
			Carousel($$renderer, {
				images,
				aspectRatio: "16/9",
				rounded: "xl",
				color: "violet"
			});
		}
		DemoSection($$renderer, {
			title: "Basic (images)",
			description: "Glissez ou utilisez les fleches. Supporte le touch mobile.",
			code: `<Carousel {images} aspectRatio="16/9" rounded="xl" color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			Carousel($$renderer, {
				images,
				transition: "fade",
				aspectRatio: "16/9",
				rounded: "xl",
				color: "emerald"
			});
		}
		DemoSection($$renderer, {
			title: "Fade transition",
			description: "Transition en fondu au lieu du glissement.",
			code: `<Carousel {images} transition="fade" aspectRatio="16/9" rounded="xl" color="emerald" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			Carousel($$renderer, {
				images,
				autoplay: 3e3,
				loop: true,
				aspectRatio: "16/9",
				rounded: "xl",
				color: "cyan"
			});
		}
		DemoSection($$renderer, {
			title: "Autoplay + Loop",
			description: "Defilement auto toutes les 3s, boucle infinie. Pause au survol.",
			code: `<Carousel {images} autoplay={3000} loop aspectRatio="16/9" rounded="xl" color="cyan" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-6"><div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">2 slides</span> `);
			Carousel($$renderer, {
				images,
				slidesPerView: 2,
				gap: 12,
				aspectRatio: "16/9",
				rounded: "xl",
				color: "violet"
			});
			$$renderer.push(`<!----></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">3 slides</span> `);
			Carousel($$renderer, {
				images,
				slidesPerView: 3,
				gap: 12,
				aspectRatio: "16/9",
				rounded: "lg",
				color: "blue"
			});
			$$renderer.push(`<!----></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">4 slides</span> `);
			Carousel($$renderer, {
				images,
				slidesPerView: 4,
				gap: 8,
				aspectRatio: "16/9",
				rounded: "md",
				color: "pink"
			});
			$$renderer.push(`<!----></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Multi-slides",
			description: "Affichez plusieurs slides a la fois avec un gap.",
			code: `<Carousel {images} slidesPerView={2} gap={12} aspectRatio="16/9" rounded="xl" color="violet" />
<Carousel {images} slidesPerView={3} gap={12} aspectRatio="16/9" rounded="lg" color="blue" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			{
				function slide($$renderer, i) {
					$$renderer.push(`<div class="rounded-xl overflow-hidden h-full" style="background:var(--karbon-bg-card);border:1px solid var(--karbon-border);"><img${attr("src", products[i].img)}${attr("alt", products[i].name)} class="w-full aspect-square object-cover"/> <div class="p-3"><div class="flex items-center justify-between mb-1"><span class="text-sm font-semibold" style="color:var(--karbon-text);">${escape_html(products[i].name)}</span> `);
					if (products[i].badge) {
						$$renderer.push("<!--[0-->");
						Badge($$renderer, {
							color: "emerald",
							size: "xs",
							children: ($$renderer) => {
								$$renderer.push(`<!---->${escape_html(products[i].badge)}`);
							},
							$$slots: { default: true }
						});
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div> <span class="text-sm font-bold" style="color:var(--karbon-emerald-400);">${escape_html(products[i].price)}</span></div></div>`);
				}
				Carousel($$renderer, {
					total: products.length,
					slidesPerView: 3,
					gap: 16,
					rounded: "xl",
					color: "emerald",
					slide,
					$$slots: { slide: true }
				});
			}
		}
		DemoSection($$renderer, {
			title: "Carousel de produits (cards)",
			description: "Chaque slide est un composant custom via le snippet slide.",
			code: "<Carousel total={products.length} slidesPerView={3} gap={16} rounded=\"xl\" color=\"emerald\">\n  {#snippet slide(i)}\n    <div class=\"card\">\n      <img src={products[i].img} alt={products[i].name} />\n      <span>{products[i].name}</span>\n      <Badge color=\"emerald\" size=\"xs\">{products[i].badge}</Badge>\n    </div>\n  {/snippet}\n</Carousel>",
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			{
				function slide($$renderer, i) {
					$$renderer.push(`<div class="flex flex-col items-center text-center p-8"><div class="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold mb-4" style="background:color-mix(in srgb,var(--karbon-violet-500) 15%,transparent);color:var(--karbon-violet-400);">${escape_html(testimonials[i].avatar)}</div> <p class="text-base italic leading-relaxed mb-4" style="color:var(--karbon-text-2);max-width:28rem;">"${escape_html(testimonials[i].text)}"</p> <p class="text-sm font-semibold" style="color:var(--karbon-text);">${escape_html(testimonials[i].name)}</p> <p class="text-xs" style="color:var(--karbon-text-3);">${escape_html(testimonials[i].role)}</p></div>`);
				}
				Carousel($$renderer, {
					total: testimonials.length,
					transition: "fade",
					rounded: "xl",
					color: "violet",
					arrows: false,
					aspectRatio: "auto",
					slide,
					$$slots: { slide: true }
				});
			}
		}
		DemoSection($$renderer, {
			title: "Carousel de temoignages",
			description: "Cards de temoignages en mode fade.",
			code: "<Carousel total={testimonials.length} transition=\"fade\" rounded=\"xl\" color=\"violet\" arrows={false} aspectRatio=\"auto\">\n  {#snippet slide(i)}\n    <div class=\"text-center p-8\">\n      <p>\"{testimonials[i].text}\"</p>\n      <p>{testimonials[i].name}</p>\n    </div>\n  {/snippet}\n</Carousel>",
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="grid grid-cols-2 md:grid-cols-3 gap-4"><!--[-->`);
			const each_array = ensure_array_like([
				"red",
				"emerald",
				"cyan",
				"blue",
				"violet",
				"pink"
			]);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let c = each_array[$$index];
				Carousel($$renderer, {
					images: images.slice(0, 3),
					aspectRatio: "16/9",
					rounded: "lg",
					color: c,
					arrows: false
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Couleurs",
			description: "L'indicateur actif prend la couleur choisie.",
			code: `<Carousel images={images.slice(0, 3)} aspectRatio="16/9" rounded="lg" color="red" arrows={false} />
<Carousel images={images.slice(0, 3)} aspectRatio="16/9" rounded="lg" color="violet" arrows={false} />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			Carousel($$renderer, {
				images,
				aspectRatio: "16/9",
				rounded: "xl",
				arrows: false,
				indicators: false
			});
		}
		DemoSection($$renderer, {
			title: "Minimal (sans arrows ni indicators)",
			description: "Navigation uniquement par swipe/drag.",
			code: `<Carousel {images} aspectRatio="16/9" rounded="xl" arrows={false} indicators={false} />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
