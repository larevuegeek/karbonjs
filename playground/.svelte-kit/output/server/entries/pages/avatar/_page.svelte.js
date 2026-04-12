import { T as escape_html, a as ensure_array_like, c as stringify } from "../../../chunks/server.js";
import { c as Avatar } from "../../../chunks/src.js";
//#region src/routes/avatar/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
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
		const sizes = [
			"xs",
			"sm",
			"md",
			"lg",
			"xl"
		];
		const people = [
			{
				name: "Alice Martin",
				img: "https://picsum.photos/seed/karbon1/200/200"
			},
			{
				name: "Bob Dupont",
				img: "https://picsum.photos/seed/karbon2/200/200"
			},
			{
				name: "Claire Petit",
				img: "https://picsum.photos/seed/karbon3/200/200"
			},
			{
				name: "David Moreau",
				img: "https://picsum.photos/seed/karbon4/200/200"
			}
		];
		$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Avatar</h1> <p class="text-[var(--karbon-text-3)] mb-8">Avatars avec initiales, images, couleurs et tailles.</p> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Initials</h2> <div class="flex items-center gap-3">`);
		Avatar($$renderer, { name: "Alice Martin" });
		$$renderer.push(`<!----> `);
		Avatar($$renderer, { name: "Bob Dupont" });
		$$renderer.push(`<!----> `);
		Avatar($$renderer, { name: "Claire" });
		$$renderer.push(`<!----> `);
		Avatar($$renderer, { name: "David Moreau" });
		$$renderer.push(`<!----> `);
		Avatar($$renderer, { name: "Eva Bernard" });
		$$renderer.push(`<!----></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">With Images</h2> <div class="flex items-center gap-3"><!--[-->`);
		const each_array = ensure_array_like(people);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let person = each_array[$$index];
			Avatar($$renderer, {
				src: person.img,
				name: person.name
			});
		}
		$$renderer.push(`<!--]--></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Sizes</h2> <div class="flex items-end gap-3"><!--[-->`);
		const each_array_1 = ensure_array_like(sizes);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let size = each_array_1[$$index_1];
			$$renderer.push(`<div class="flex flex-col items-center gap-1">`);
			Avatar($$renderer, {
				name: "Alice Martin",
				size,
				color: "violet"
			});
			$$renderer.push(`<!----> <span class="text-xs text-[var(--karbon-text-4)]">${escape_html(size)}</span></div>`);
		}
		$$renderer.push(`<!--]--></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Sizes with Images</h2> <div class="flex items-end gap-3"><!--[-->`);
		const each_array_2 = ensure_array_like(sizes);
		for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
			let size = each_array_2[$$index_2];
			$$renderer.push(`<div class="flex flex-col items-center gap-1">`);
			Avatar($$renderer, {
				src: "https://picsum.photos/seed/karbon5/200/200",
				name: "Photo",
				size
			});
			$$renderer.push(`<!----> <span class="text-xs text-[var(--karbon-text-4)]">${escape_html(size)}</span></div>`);
		}
		$$renderer.push(`<!--]--></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Colors</h2> <div class="flex flex-wrap gap-3"><!--[-->`);
		const each_array_3 = ensure_array_like(colors);
		for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
			let color = each_array_3[$$index_3];
			$$renderer.push(`<div class="flex flex-col items-center gap-1">`);
			Avatar($$renderer, {
				name: `${stringify(color.charAt(0).toUpperCase())}${stringify(color.charAt(1))}`,
				color
			});
			$$renderer.push(`<!----> <span class="text-xs text-[var(--karbon-text-4)]">${escape_html(color)}</span></div>`);
		}
		$$renderer.push(`<!--]--></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Colors x Sizes (lg)</h2> <div class="flex flex-wrap gap-3"><!--[-->`);
		const each_array_4 = ensure_array_like(colors);
		for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
			let color = each_array_4[$$index_4];
			Avatar($$renderer, {
				name: `${stringify(color.charAt(0).toUpperCase())}${stringify(color.charAt(1))}`,
				color,
				size: "lg"
			});
		}
		$$renderer.push(`<!--]--></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Fallback (broken image)</h2> <div class="flex items-center gap-3">`);
		Avatar($$renderer, {
			src: "https://broken-url.invalid/avatar.jpg",
			name: "Fallback",
			color: "red"
		});
		$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">Image cassee - affiche les initiales</span></div></section>`);
	});
}
//#endregion
export { _page as default };
