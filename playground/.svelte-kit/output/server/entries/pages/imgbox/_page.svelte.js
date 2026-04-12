import { C as attr, T as escape_html, a as ensure_array_like, c as stringify, n as attr_style } from "../../../chunks/server.js";
import { _ as CodeBlock, x as ImgBox } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/imgbox/+page.svelte
function _page($$renderer) {
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
		"https://picsum.photos/seed/imgbox1/1200/800",
		"https://picsum.photos/seed/imgbox2/1200/800",
		"https://picsum.photos/seed/imgbox3/1200/800",
		"https://picsum.photos/seed/imgbox4/1200/800",
		"https://picsum.photos/seed/imgbox5/1200/800",
		"https://picsum.photos/seed/imgbox6/1200/800"
	];
	const captions = [
		"Paysage de montagne au coucher du soleil",
		"Architecture moderne en verre",
		"Foret tropicale dense",
		"Ocean et falaises rocheuses",
		"Ville illuminee la nuit",
		"Champ de lavande en Provence"
	];
	let basic = false;
	let basicIdx = 0;
	let withCaptions = false;
	let captionIdx = 0;
	let single = false;
	let dark = false;
	let darkIdx = 0;
	let $$settled = true;
	let $$inner_renderer;
	function $$render_inner($$renderer) {
		$$renderer.push(`<h1 class="text-3xl font-bold mb-2">ImgBox</h1> <p class="text-[var(--karbon-text-3)] mb-8">Lightbox galerie avec zoom, navigation, thumbnails, captions et transitions.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
		CodeBlock($$renderer, {
			code: usageCode,
			language: "svelte",
			title: "Example.svelte",
			lineCopy: true
		});
		$$renderer.push(`<!----></div> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-3 md:grid-cols-6 gap-2"><!--[-->`);
				const each_array = ensure_array_like(gallery);
				for (let i = 0, $$length = each_array.length; i < $$length; i++) {
					let img = each_array[i];
					$$renderer.push(`<button class="rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105" style="aspect-ratio:3/2;"><img${attr("src", img)}${attr("alt", `Photo ${stringify(i + 1)}`)} class="w-full h-full object-cover" loading="lazy"/></button>`);
				}
				$$renderer.push(`<!--]--></div> `);
				ImgBox($$renderer, {
					images: gallery,
					onclose: () => basic = false,
					get open() {
						return basic;
					},
					set open($$value) {
						basic = $$value;
						$$settled = false;
					},
					get index() {
						return basicIdx;
					},
					set index($$value) {
						basicIdx = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Galerie",
				description: "Cliquez sur une image pour ouvrir la lightbox. Naviguez avec les fleches ou le clavier.",
				code: `<ImgBox images={gallery} bind:open bind:index onclose={() => open = false} />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-3 md:grid-cols-6 gap-2"><!--[-->`);
				const each_array_1 = ensure_array_like(gallery);
				for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
					let img = each_array_1[i];
					$$renderer.push(`<button class="rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 relative group" style="aspect-ratio:3/2;"><img${attr("src", img)}${attr("alt", captions[i])} class="w-full h-full object-cover" loading="lazy"/> <span class="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity truncate">${escape_html(captions[i])}</span></button>`);
				}
				$$renderer.push(`<!--]--></div> `);
				ImgBox($$renderer, {
					images: gallery,
					captions,
					onclose: () => withCaptions = false,
					get open() {
						return withCaptions;
					},
					set open($$value) {
						withCaptions = $$value;
						$$settled = false;
					},
					get index() {
						return captionIdx;
					},
					set index($$value) {
						captionIdx = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Avec legendes",
				description: "Captions affichees sous l'image dans la lightbox.",
				code: `<ImgBox images={gallery} {captions} bind:open bind:index onclose={() => open = false} />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<button class="rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]" style="width:300px;aspect-ratio:3/2;"><img src="https://picsum.photos/seed/imgbox-single/800/600" alt="Single" class="w-full h-full object-cover" loading="lazy"/></button> `);
				ImgBox($$renderer, {
					images: ["https://picsum.photos/seed/imgbox-single/1600/1200"],
					onclose: () => single = false,
					get open() {
						return single;
					},
					set open($$value) {
						single = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Image unique",
				description: "Lightbox pour une seule image.",
				code: `<ImgBox images={['/photo.jpg']} bind:open onclose={() => open = false} />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="flex gap-2"><!--[-->`);
				const each_array_2 = ensure_array_like(gallery.slice(0, 3));
				for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
					let img = each_array_2[i];
					$$renderer.push(`<button class="rounded-lg overflow-hidden cursor-pointer" style="width:120px;aspect-ratio:3/2;"><img${attr("src", img)} alt="" class="w-full h-full object-cover" loading="lazy"/></button>`);
				}
				$$renderer.push(`<!--]--></div> `);
				ImgBox($$renderer, {
					images: gallery.slice(0, 3),
					backdrop: "dark",
					onclose: () => dark = false,
					get open() {
						return dark;
					},
					set open($$value) {
						dark = $$value;
						$$settled = false;
					},
					get index() {
						return darkIdx;
					},
					set index($$value) {
						darkIdx = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Backdrop sombre",
				description: "Fond plus opaque pour un rendu cinematique.",
				code: `<ImgBox images={gallery} bind:open bind:index backdrop="dark" onclose={() => open = false} />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="flex gap-3 items-end"><!--[-->`);
				const each_array_3 = ensure_array_like(gallery);
				for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
					let img = each_array_3[i];
					$$renderer.push(`<button class="rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl relative group"${attr_style(`width:${stringify(i === 0 ? "200px" : "100px")};aspect-ratio:${stringify(i === 0 ? "4/3" : "2/3")};`)}><img${attr("src", img)} alt="" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy"/> <span class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></span> <span class="absolute bottom-2 left-2 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">${escape_html(i + 1)}/${escape_html(gallery.length)}</span></button>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Transitions en action",
				description: "Ouvrez et naviguez pour voir les transitions fade, le zoom double-clic et les thumbnails animees.",
				code: `<ImgBox images={gallery} {captions} bind:open bind:index onclose={() => open = false} />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!---->`);
	}
	do {
		$$settled = true;
		$$inner_renderer = $$renderer.copy();
		$$render_inner($$inner_renderer);
	} while (!$$settled);
	$$renderer.subsume($$inner_renderer);
}
//#endregion
export { _page as default };
