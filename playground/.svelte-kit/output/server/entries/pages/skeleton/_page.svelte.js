import { a as ensure_array_like } from "../../../chunks/server.js";
import { o as Skeleton } from "../../../chunks/src.js";
//#region src/routes/skeleton/+page.svelte
function _page($$renderer) {
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Skeleton</h1> <p class="text-[var(--karbon-text-3)] mb-8">Squelettes de chargement avec variants text, circle et rect.</p> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Text</h2> <div class="space-y-4 max-w-md">`);
	Skeleton($$renderer, { variant: "text" });
	$$renderer.push(`<!----> `);
	Skeleton($$renderer, {
		variant: "text",
		width: "75%"
	});
	$$renderer.push(`<!----> `);
	Skeleton($$renderer, {
		variant: "text",
		width: "50%"
	});
	$$renderer.push(`<!----></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Multi-line Text</h2> <div class="max-w-md">`);
	Skeleton($$renderer, {
		variant: "text",
		lines: 3
	});
	$$renderer.push(`<!----></div> <div class="max-w-md mt-4">`);
	Skeleton($$renderer, {
		variant: "text",
		lines: 5
	});
	$$renderer.push(`<!----></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Circle</h2> <div class="flex items-center gap-4">`);
	Skeleton($$renderer, {
		variant: "circle",
		height: "2rem"
	});
	$$renderer.push(`<!----> `);
	Skeleton($$renderer, {
		variant: "circle",
		height: "3rem"
	});
	$$renderer.push(`<!----> `);
	Skeleton($$renderer, {
		variant: "circle",
		height: "4rem"
	});
	$$renderer.push(`<!----> `);
	Skeleton($$renderer, {
		variant: "circle",
		height: "5rem"
	});
	$$renderer.push(`<!----></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Rect</h2> <div class="space-y-4">`);
	Skeleton($$renderer, {
		variant: "rect",
		height: "4rem"
	});
	$$renderer.push(`<!----> `);
	Skeleton($$renderer, {
		variant: "rect",
		height: "8rem",
		width: "50%"
	});
	$$renderer.push(`<!----> `);
	Skeleton($$renderer, {
		variant: "rect",
		height: "12rem"
	});
	$$renderer.push(`<!----></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Card Skeleton</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><!--[-->`);
	const each_array = ensure_array_like([
		1,
		2,
		3
	]);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		each_array[$$index];
		$$renderer.push(`<div class="rounded-xl border border-[var(--karbon-border)] p-4 space-y-3">`);
		Skeleton($$renderer, {
			variant: "rect",
			height: "8rem"
		});
		$$renderer.push(`<!----> `);
		Skeleton($$renderer, {
			variant: "text",
			width: "80%"
		});
		$$renderer.push(`<!----> `);
		Skeleton($$renderer, {
			variant: "text",
			lines: 2
		});
		$$renderer.push(`<!----> <div class="flex items-center gap-3 pt-2">`);
		Skeleton($$renderer, {
			variant: "circle",
			height: "2.5rem"
		});
		$$renderer.push(`<!----> <div class="flex-1 space-y-1">`);
		Skeleton($$renderer, {
			variant: "text",
			width: "60%"
		});
		$$renderer.push(`<!----> `);
		Skeleton($$renderer, {
			variant: "text",
			width: "40%"
		});
		$$renderer.push(`<!----></div></div></div>`);
	}
	$$renderer.push(`<!--]--></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Profile Skeleton</h2> <div class="flex items-start gap-4 max-w-sm">`);
	Skeleton($$renderer, {
		variant: "circle",
		height: "4rem"
	});
	$$renderer.push(`<!----> <div class="flex-1 space-y-2">`);
	Skeleton($$renderer, {
		variant: "text",
		width: "70%"
	});
	$$renderer.push(`<!----> `);
	Skeleton($$renderer, {
		variant: "text",
		width: "50%"
	});
	$$renderer.push(`<!----> `);
	Skeleton($$renderer, {
		variant: "text",
		lines: 3
	});
	$$renderer.push(`<!----></div></div></section> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Table Skeleton</h2> <div class="rounded-xl border border-[var(--karbon-border)] overflow-hidden"><div class="p-3 bg-[var(--karbon-bg-2)]">`);
	Skeleton($$renderer, {
		variant: "text",
		width: "30%"
	});
	$$renderer.push(`<!----></div> <!--[-->`);
	const each_array_1 = ensure_array_like([
		1,
		2,
		3,
		4,
		5
	]);
	for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
		each_array_1[$$index_1];
		$$renderer.push(`<div class="flex items-center gap-4 px-4 py-3 border-t border-[var(--karbon-border)]">`);
		Skeleton($$renderer, {
			variant: "circle",
			height: "2rem"
		});
		$$renderer.push(`<!----> <div class="flex-1">`);
		Skeleton($$renderer, { variant: "text" });
		$$renderer.push(`<!----></div> `);
		Skeleton($$renderer, {
			variant: "text",
			width: "80px"
		});
		$$renderer.push(`<!----> `);
		Skeleton($$renderer, {
			variant: "text",
			width: "60px"
		});
		$$renderer.push(`<!----></div>`);
	}
	$$renderer.push(`<!--]--></div></section>`);
}
//#endregion
export { _page as default };
