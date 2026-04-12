import { T as escape_html, a as ensure_array_like, c as stringify, n as attr_style } from "../../../chunks/server.js";
//#region src/routes/colors/+page.svelte
function _page($$renderer) {
	const colors = [
		"red",
		"orange",
		"amber",
		"yellow",
		"lime",
		"emerald",
		"cyan",
		"blue",
		"violet",
		"pink",
		"slate",
		"zinc"
	];
	const shades = [
		50,
		100,
		200,
		300,
		400,
		500,
		600,
		700,
		800,
		900,
		950
	];
	function getVar(color, shade) {
		return `var(--karbon-${color}-${shade})`;
	}
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Colors</h1> <p class="text-[var(--karbon-text-3)] mb-8">Les 12 palettes de couleurs avec 11 nuances chacune. Survolez une couleur pour voir son nom et sa variable CSS.</p> <!--[-->`);
	const each_array = ensure_array_like(colors);
	for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
		let color = each_array[$$index_1];
		$$renderer.push(`<section class="mb-8"><h2 class="text-lg font-semibold mb-3 capitalize">${escape_html(color)}</h2> <div class="flex gap-1.5 flex-wrap"><!--[-->`);
		const each_array_1 = ensure_array_like(shades);
		for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
			let shade = each_array_1[$$index];
			$$renderer.push(`<div class="relative group"><div class="w-14 h-14 rounded-lg cursor-pointer transition-transform hover:scale-110 hover:shadow-lg border border-white/10"${attr_style(`background: ${stringify(getVar(color, shade))}`)} role="presentation"></div> <div class="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none shadow-lg z-50 transition-opacity" style="background: var(--karbon-text, #111827); color: var(--karbon-bg, #ffffff);">--karbon-${escape_html(color)}-${escape_html(shade)}</div></div>`);
		}
		$$renderer.push(`<!--]--></div></section>`);
	}
	$$renderer.push(`<!--]--> <section class="mb-10 mt-12"><h2 class="text-xl font-semibold mb-4">Utilisation des couleurs</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
	const each_array_2 = ensure_array_like(colors);
	for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
		let color = each_array_2[$$index_2];
		$$renderer.push(`<div class="flex items-center gap-3 p-3 rounded-lg border border-[var(--karbon-border)]"><div class="w-10 h-10 rounded-lg shrink-0"${attr_style(`background: var(--karbon-${stringify(color)}-500)`)}></div> <div><div class="text-sm font-semibold capitalize">${escape_html(color)}-500</div> <code class="text-xs text-[var(--karbon-text-3)]">var(--karbon-${escape_html(color)}-500)</code></div></div>`);
	}
	$$renderer.push(`<!--]--></div></section>`);
}
//#endregion
export { _page as default };
