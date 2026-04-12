import { T as escape_html, a as ensure_array_like, c as stringify } from "../../../chunks/server.js";
import { _ as CodeBlock, g as ImgZoom } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/image/+page.svelte
function _page($$renderer) {
	const usageCode = `<script lang="ts">
  import { ImgZoom } from '@karbonjs/ui-svelte'
<\/script>

<!-- Overlay (default) — zoom au survol -->
<ImgZoom src="/photo.jpg" alt="Photo" width="300px" rounded="lg" zoom={2.5} />

<!-- Loupe — style e-commerce -->
<ImgZoom src="/product.jpg" alt="Produit" width="300px" mode="lens" lensSize={150} color="violet" />

<!-- Side panel — fiche produit -->
<ImgZoom src="/product.jpg" zoomSrc="/product-hd.jpg" alt="Produit"
  width="250px" height="250px" mode="side" color="cyan" />`;
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">ImgZoom</h1> <p class="text-[var(--karbon-text-3)] mb-8">Zoom d'image avec 3 modes : overlay, loupe et side panel.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
	CodeBlock($$renderer, {
		code: usageCode,
		language: "svelte",
		title: "Example.svelte",
		lineCopy: true
	});
	$$renderer.push(`<!----></div> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-4">`);
			ImgZoom($$renderer, {
				src: "https://picsum.photos/seed/zoom1/600/400",
				alt: "Photo 1",
				width: "280px",
				rounded: "lg"
			});
			$$renderer.push(`<!----> `);
			ImgZoom($$renderer, {
				src: "https://picsum.photos/seed/zoom2/600/400",
				alt: "Photo 2",
				width: "280px",
				rounded: "lg",
				zoom: 3
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Overlay (default)",
			description: "L'image se zoom sur elle-meme au survol. Ideal pour les galeries.",
			code: `<ImgZoom src="/photo.jpg" alt="Photo" width="280px" rounded="lg" />
<ImgZoom src="/photo.jpg" alt="Photo" width="280px" rounded="lg" zoom={3} />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			ImgZoom($$renderer, {
				src: "https://picsum.photos/seed/zoom3/800/500",
				alt: "Photo 3",
				width: "400px",
				rounded: "xl",
				trigger: "click"
			});
		}
		DemoSection($$renderer, {
			title: "Overlay × Click",
			description: "Cliquez pour activer/desactiver le zoom. Deplacez la souris pour explorer.",
			code: `<ImgZoom src="/photo.jpg" alt="Photo" width="400px" rounded="xl" trigger="click" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-6"><div><span class="text-xs block mb-2" style="color:var(--karbon-text-4);">Default (120px)</span> `);
			ImgZoom($$renderer, {
				src: "https://picsum.photos/seed/zoom4/600/400",
				alt: "Lens",
				width: "280px",
				rounded: "lg",
				mode: "lens"
			});
			$$renderer.push(`<!----></div> <div><span class="text-xs block mb-2" style="color:var(--karbon-text-4);">Grande loupe (180px) × Zoom 3x</span> `);
			ImgZoom($$renderer, {
				src: "https://picsum.photos/seed/zoom5/600/400",
				alt: "Lens big",
				width: "280px",
				rounded: "lg",
				mode: "lens",
				lensSize: 180,
				zoom: 3
			});
			$$renderer.push(`<!----></div> <div><span class="text-xs block mb-2" style="color:var(--karbon-text-4);">Couleur violet</span> `);
			ImgZoom($$renderer, {
				src: "https://picsum.photos/seed/zoom6/600/400",
				alt: "Lens color",
				width: "280px",
				rounded: "lg",
				mode: "lens",
				color: "violet"
			});
			$$renderer.push(`<!----></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Loupe (lens)",
			description: "Une loupe circulaire suit la souris. Style e-commerce.",
			code: `<ImgZoom src="/photo.jpg" alt="Lens" width="280px" rounded="lg" mode="lens" />
<ImgZoom src="/photo.jpg" alt="Lens" width="280px" rounded="lg" mode="lens" lensSize={180} zoom={3} />
<ImgZoom src="/photo.jpg" alt="Lens" width="280px" rounded="lg" mode="lens" color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex gap-8">`);
			ImgZoom($$renderer, {
				src: "https://picsum.photos/seed/zoom8/400/400",
				alt: "Side",
				width: "250px",
				height: "250px",
				rounded: "lg",
				mode: "side",
				color: "cyan"
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Side panel",
			description: "Le zoom s'affiche dans un panel a droite. Ideal pour les fiches produit.",
			code: `<ImgZoom src="/photo.jpg" alt="Side" width="250px" height="250px" rounded="lg" mode="side" color="cyan" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-4"><!--[-->`);
			const each_array = ensure_array_like([
				1.5,
				2,
				3,
				4,
				5
			]);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let z = each_array[$$index];
				$$renderer.push(`<div><span class="text-xs block mb-2" style="color:var(--karbon-text-4);">${escape_html(z)}x</span> `);
				ImgZoom($$renderer, {
					src: "https://picsum.photos/seed/zoomlvl/400/300",
					alt: `Zoom ${stringify(z)}x`,
					width: "180px",
					rounded: "md",
					zoom: z
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Niveaux de zoom",
			description: "De 1.5x a 5x.",
			code: `<ImgZoom src="/photo.jpg" alt="Zoom" width="180px" rounded="md" zoom={1.5} />
<ImgZoom src="/photo.jpg" alt="Zoom" width="180px" rounded="md" zoom={3} />
<ImgZoom src="/photo.jpg" alt="Zoom" width="180px" rounded="md" zoom={5} />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-4"><!--[-->`);
			const each_array_1 = ensure_array_like([
				"none",
				"sm",
				"md",
				"lg",
				"xl",
				"full"
			]);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let r = each_array_1[$$index_1];
				$$renderer.push(`<div><span class="text-xs block mb-2" style="color:var(--karbon-text-4);">${escape_html(r)}</span> `);
				ImgZoom($$renderer, {
					src: "https://picsum.photos/seed/zoomround/200/200",
					alt: `Rounded ${stringify(r)}`,
					width: "120px",
					height: "120px",
					rounded: r,
					mode: "lens",
					lensSize: 80,
					color: "pink"
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Arrondis",
			description: "6 niveaux d'arrondi.",
			code: `<ImgZoom src="/photo.jpg" alt="Rounded" width="120px" height="120px" rounded="none" mode="lens" />
<ImgZoom src="/photo.jpg" alt="Rounded" width="120px" height="120px" rounded="xl" mode="lens" />
<ImgZoom src="/photo.jpg" alt="Rounded" width="120px" height="120px" rounded="full" mode="lens" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			ImgZoom($$renderer, {
				src: "https://picsum.photos/seed/zoomhd/400/300",
				zoomSrc: "https://picsum.photos/seed/zoomhd/1600/1200",
				alt: "HD zoom",
				width: "350px",
				rounded: "xl",
				mode: "lens",
				lensSize: 160,
				zoom: 3,
				color: "blue"
			});
		}
		DemoSection($$renderer, {
			title: "Image HD pour le zoom",
			description: "L'image affichee est en basse resolution, le zoom charge une version HD.",
			code: `<ImgZoom
  src="/photo-low.jpg"
  zoomSrc="/photo-hd.jpg"
  alt="HD zoom"
  width="350px"
  rounded="xl"
  mode="lens"
  lensSize={160}
  zoom={3}
  color="blue"
/>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
