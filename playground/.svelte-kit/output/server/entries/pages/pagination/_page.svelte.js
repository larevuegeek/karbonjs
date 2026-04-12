import { T as escape_html, a as ensure_array_like } from "../../../chunks/server.js";
import { _ as CodeBlock, t as Pagination } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/pagination/+page.svelte
function _page($$renderer) {
	const usageCode = `<script lang="ts">
  import { Pagination } from '@karbonjs/ui-svelte'

  let page = $state(1)
<\/script>

<Pagination bind:page total={200} perPage={10} color="violet" />
<Pagination bind:page total={200} perPage={10} variant="outline" color="blue" />
<Pagination page={3} total={200} perPage={10} baseUrl="/articles" />`;
	const colors = [
		"red",
		"emerald",
		"cyan",
		"blue",
		"violet",
		"pink"
	];
	let page1 = 1;
	let page2 = 5;
	let page3 = 1;
	let page4 = 12;
	let $$settled = true;
	let $$inner_renderer;
	function $$render_inner($$renderer) {
		$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Pagination</h1> <p class="text-[var(--karbon-text-3)] mb-8">Navigation entre pages avec ellipsis, first/last, variantes et couleurs.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
		CodeBlock($$renderer, {
			code: usageCode,
			language: "svelte",
			title: "Example.svelte",
			lineCopy: true
		});
		$$renderer.push(`<!----></div> `);
		{
			function children($$renderer) {
				Pagination($$renderer, {
					total: 200,
					perPage: 10,
					get page() {
						return page1;
					},
					set page($$value) {
						page1 = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> <p class="text-xs mt-2" style="color: var(--karbon-text-4);">Page: ${escape_html(page1)}</p>`);
			}
			DemoSection($$renderer, {
				title: "Basic",
				description: "Pagination simple avec bind:page.",
				code: `<Pagination
  bind:page={page1}
  total={200}
  perPage={10}
/>`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="space-y-4"><div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Default</span> `);
				Pagination($$renderer, {
					total: 500,
					perPage: 10,
					color: "violet",
					get page() {
						return page2;
					},
					set page($$value) {
						page2 = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Outline</span> `);
				Pagination($$renderer, {
					total: 500,
					perPage: 10,
					variant: "outline",
					color: "violet",
					get page() {
						return page2;
					},
					set page($$value) {
						page2 = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Flat</span> `);
				Pagination($$renderer, {
					total: 500,
					perPage: 10,
					variant: "flat",
					color: "violet",
					get page() {
						return page2;
					},
					set page($$value) {
						page2 = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Minimal</span> `);
				Pagination($$renderer, {
					total: 500,
					perPage: 10,
					variant: "minimal",
					color: "violet",
					get page() {
						return page2;
					},
					set page($$value) {
						page2 = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----></div></div>`);
			}
			DemoSection($$renderer, {
				title: "Variants",
				description: "4 variantes visuelles : default, outline, flat, minimal.",
				code: `<Pagination bind:page total={500} perPage={10} color="violet" />
<Pagination bind:page total={500} perPage={10} variant="outline" color="violet" />
<Pagination bind:page total={500} perPage={10} variant="flat" color="violet" />
<Pagination bind:page total={500} perPage={10} variant="minimal" color="violet" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="space-y-3"><!--[-->`);
				const each_array = ensure_array_like(colors);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let c = each_array[$$index];
					Pagination($$renderer, {
						page: 3,
						total: 100,
						perPage: 10,
						color: c
					});
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Colors",
				description: "6 couleurs disponibles.",
				code: `<Pagination page={3} total={100} perPage={10} color="emerald" />
<Pagination page={3} total={100} perPage={10} color="violet" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="space-y-4"><div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Small</span> `);
				Pagination($$renderer, {
					total: 150,
					perPage: 10,
					size: "sm",
					color: "emerald",
					get page() {
						return page3;
					},
					set page($$value) {
						page3 = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Medium</span> `);
				Pagination($$renderer, {
					total: 150,
					perPage: 10,
					size: "md",
					color: "emerald",
					get page() {
						return page3;
					},
					set page($$value) {
						page3 = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----></div> <div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color: var(--karbon-text-4);">Large</span> `);
				Pagination($$renderer, {
					total: 150,
					perPage: 10,
					size: "lg",
					color: "emerald",
					get page() {
						return page3;
					},
					set page($$value) {
						page3 = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----></div></div>`);
			}
			DemoSection($$renderer, {
				title: "Sizes",
				description: "3 tailles : sm, md, lg.",
				code: `<Pagination bind:page total={150} perPage={10} size="sm" color="emerald" />
<Pagination bind:page total={150} perPage={10} size="md" color="emerald" />
<Pagination bind:page total={150} perPage={10} size="lg" color="emerald" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Pagination($$renderer, {
					total: 1e3,
					perPage: 10,
					color: "blue",
					siblings: 2,
					get page() {
						return page4;
					},
					set page($$value) {
						page4 = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> <p class="text-xs mt-2" style="color: var(--karbon-text-4);">Page ${escape_html(page4)} / 100 — Naviguez pour voir les ellipsis</p>`);
			}
			DemoSection($$renderer, {
				title: "Beaucoup de pages (ellipsis)",
				description: "Navigation avec ellipsis pour les grandes listes.",
				code: `<Pagination
  bind:page
  total={1000}
  perPage={10}
  color="blue"
  siblings={2}
/>`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Pagination($$renderer, {
					page: 3,
					total: 200,
					perPage: 10,
					showFirstLast: false,
					color: "pink"
				});
			}
			DemoSection($$renderer, {
				title: "Sans first/last",
				description: "Masque les boutons premiere/derniere page.",
				code: `<Pagination
  page={3}
  total={200}
  perPage={10}
  showFirstLast={false}
  color="pink"
/>`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Pagination($$renderer, {
					page: 3,
					total: 200,
					perPage: 10,
					baseUrl: "/pagination",
					color: "violet"
				});
			}
			DemoSection($$renderer, {
				title: "Avec liens (SSR)",
				description: "Utilise des balises <a> au lieu de <button> pour le SSR/SEO.",
				code: `<Pagination
  page={3}
  total={200}
  perPage={10}
  baseUrl="/pagination"
  color="violet"
/>`,
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
