import { T as escape_html, a as ensure_array_like } from "../../../chunks/server.js";
import { E as Badge, F as Button, b as Card } from "../../../chunks/src.js";
//#region src/routes/card/+page.svelte
function _page($$renderer) {
	const variants = [
		"default",
		"elevated",
		"outlined",
		"ghost"
	];
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Card</h1> <p class="text-[var(--karbon-text-3)] mb-8">Cartes avec variants, titres, padding et hover effects.</p> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Variants</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
	const each_array = ensure_array_like(variants);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let variant = each_array[$$index];
		{
			function children($$renderer) {
				$$renderer.push(`<h3 class="font-semibold text-sm text-[var(--karbon-text)] mb-1 capitalize">${escape_html(variant)}</h3> <p class="text-xs text-[var(--karbon-text-3)]">Card avec variant "${escape_html(variant)}".</p>`);
			}
			Card($$renderer, {
				variant,
				children,
				$$slots: { default: true }
			});
		}
	}
	$$renderer.push(`<!--]--></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">With Title</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
	{
		function children($$renderer) {
			$$renderer.push(`<p class="text-sm text-[var(--karbon-text-2)]">Modifiez vos parametres de compte.</p>`);
		}
		Card($$renderer, {
			title: "Parametres",
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<p class="text-sm text-[var(--karbon-text-2)]">Consultez vos statistiques.</p>`);
		}
		Card($$renderer, {
			title: "Statistiques",
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">noPadding</h2> `);
	{
		function children($$renderer) {
			$$renderer.push(`<img src="https://picsum.photos/seed/karbon6/800/300" alt="Card image" class="w-full h-48 object-cover" loading="lazy"/> <div class="p-5"><h3 class="font-semibold text-sm text-[var(--karbon-text)]">Article avec image</h3> <p class="text-xs text-[var(--karbon-text-3)] mt-1">Le padding est retire du body, permettant une image pleine largeur.</p></div>`);
		}
		Card($$renderer, {
			noPadding: true,
			title: "Image card",
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Hoverable</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><!--[-->`);
	const each_array_1 = ensure_array_like([
		"default",
		"elevated",
		"outlined"
	]);
	for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
		let variant = each_array_1[$$index_1];
		{
			function children($$renderer) {
				$$renderer.push(`<h3 class="font-semibold text-sm text-[var(--karbon-text)] capitalize mb-1">${escape_html(variant)}</h3> <p class="text-xs text-[var(--karbon-text-3)]">Survolez pour voir l'effet.</p>`);
			}
			Card($$renderer, {
				variant,
				hoverable: true,
				children,
				$$slots: { default: true }
			});
		}
	}
	$$renderer.push(`<!--]--></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">With Header &amp; Footer</h2> <div class="max-w-md">`);
	{
		function header($$renderer) {
			$$renderer.push(`<div class="flex items-center justify-between"><span class="font-semibold text-sm text-[var(--karbon-text)]">Projet Alpha</span> `);
			{
				function children($$renderer) {
					$$renderer.push(`<!---->Actif`);
				}
				Badge($$renderer, {
					variant: "soft",
					color: "emerald",
					children,
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!----></div>`);
		}
		function children($$renderer) {
			$$renderer.push(`<p class="text-sm text-[var(--karbon-text-2)]">Description du projet avec des details supplementaires. Ce projet est en cours de developpement.</p>`);
		}
		function footer($$renderer) {
			$$renderer.push(`<div class="flex items-center justify-between"><span class="text-xs text-[var(--karbon-text-4)]">Mis a jour il y a 2 jours</span> `);
			Button($$renderer, {
				size: "sm",
				variant: "flat",
				color: "blue",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Voir`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		Card($$renderer, {
			header,
			children,
			footer,
			$$slots: {
				header: true,
				default: true,
				footer: true
			}
		});
	}
	$$renderer.push(`<!----></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Padding Sizes</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><!--[-->`);
	const each_array_2 = ensure_array_like([
		"sm",
		"md",
		"lg"
	]);
	for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
		let padding = each_array_2[$$index_2];
		{
			function children($$renderer) {
				$$renderer.push(`<h3 class="font-semibold text-sm text-[var(--karbon-text)] mb-1">Padding: ${escape_html(padding)}</h3> <p class="text-xs text-[var(--karbon-text-3)]">Contenu avec padding "${escape_html(padding)}".</p>`);
			}
			Card($$renderer, {
				padding,
				children,
				$$slots: { default: true }
			});
		}
	}
	$$renderer.push(`<!--]--></div></section>`);
}
//#endregion
export { _page as default };
