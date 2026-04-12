import { T as escape_html, a as ensure_array_like } from "../../../chunks/server.js";
import { _ as CodeBlock, u as Breadcrumb } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/breadcrumb/+page.svelte
function _page($$renderer) {
	const usageCode = `<script lang="ts">
  import { Breadcrumb } from '@karbonjs/ui-svelte'

  const items = [
    { label: 'Accueil', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: 'Mon article' },
  ]
<\/script>

<Breadcrumb {items} color="violet" separator="chevron" />
<Breadcrumb {items} variant="pills" color="blue" collapse={2} />`;
	const colors = [
		"red",
		"emerald",
		"cyan",
		"blue",
		"violet",
		"pink"
	];
	const basic = [
		{
			label: "Accueil",
			href: "/"
		},
		{
			label: "Composants",
			href: "/"
		},
		{ label: "Breadcrumb" }
	];
	const withIcons = [
		{
			label: "Accueil",
			href: "/",
			icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/></svg>"
		},
		{
			label: "Produits",
			href: "/",
			icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7.5 4.27 9 5.15\"/><path d=\"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z\"/><path d=\"m3.3 7 8.7 5 8.7-5\"/><path d=\"M12 22V12\"/></svg>"
		},
		{
			label: "Electronique",
			href: "/"
		},
		{ label: "Casques audio" }
	];
	const long = [
		{
			label: "Accueil",
			href: "/"
		},
		{
			label: "Categorie",
			href: "/"
		},
		{
			label: "Sous-categorie",
			href: "/"
		},
		{
			label: "Produit",
			href: "/"
		},
		{
			label: "Variante",
			href: "/"
		},
		{
			label: "Details",
			href: "/"
		},
		{ label: "Avis clients" }
	];
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Breadcrumb</h1> <p class="text-[var(--karbon-text-3)] mb-10">Fil d'Ariane avec separateurs, variantes, icones, couleurs et collapse.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
	CodeBlock($$renderer, {
		code: usageCode,
		language: "svelte",
		title: "Example.svelte",
		lineCopy: true
	});
	$$renderer.push(`<!----></div> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-4"><!--[-->`);
			const each_array = ensure_array_like([
				"chevron",
				"slash",
				"dot",
				"arrow",
				"dash"
			]);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let sep = each_array[$$index];
				$$renderer.push(`<div class="flex items-center gap-3"><span class="text-[11px] font-semibold uppercase tracking-wider w-16 shrink-0" style="color:var(--karbon-text-4);">${escape_html(sep)}</span> `);
				Breadcrumb($$renderer, {
					items: basic,
					separator: sep
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--> <div class="flex items-center gap-3"><span class="text-[11px] font-semibold uppercase tracking-wider w-16 shrink-0" style="color:var(--karbon-text-4);">custom</span> `);
			Breadcrumb($$renderer, {
				items: basic,
				separator: "»"
			});
			$$renderer.push(`<!----></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Separateurs",
			description: "6 styles de separateur entre les elements.",
			code: `<Breadcrumb items={items} separator="chevron" />
<Breadcrumb items={items} separator="slash" />
<Breadcrumb items={items} separator="dot" />
<Breadcrumb items={items} separator="arrow" />
<Breadcrumb items={items} separator="dash" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-4"><!--[-->`);
			const each_array_1 = ensure_array_like([
				"default",
				"pills",
				"bordered"
			]);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let v = each_array_1[$$index_1];
				$$renderer.push(`<div class="flex items-center gap-3"><span class="text-[11px] font-semibold uppercase tracking-wider w-16 shrink-0" style="color:var(--karbon-text-4);">${escape_html(v)}</span> `);
				Breadcrumb($$renderer, {
					items: basic,
					variant: v,
					color: "violet"
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Variants",
			description: "3 styles visuels pour l'element actif.",
			code: `<Breadcrumb items={items} variant="default" color="violet" />
<Breadcrumb items={items} variant="pills" color="violet" />
<Breadcrumb items={items} variant="bordered" color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-4">`);
			Breadcrumb($$renderer, {
				items: withIcons,
				color: "blue"
			});
			$$renderer.push(`<!----> `);
			Breadcrumb($$renderer, {
				items: withIcons,
				variant: "pills",
				color: "emerald"
			});
			$$renderer.push(`<!----> `);
			Breadcrumb($$renderer, {
				items: withIcons,
				variant: "bordered",
				color: "pink",
				separator: "arrow"
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Avec icones",
			description: "Chaque element peut avoir une icone SVG.",
			code: `<Breadcrumb items={[
  { label: 'Accueil', href: '/', icon: '<svg>...</svg>' },
  { label: 'Produits', href: '/' },
  { label: 'Details' },
]} color="blue" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3"><!--[-->`);
			const each_array_2 = ensure_array_like(colors);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let c = each_array_2[$$index_2];
				$$renderer.push(`<div class="flex items-center gap-3"><span class="text-[11px] font-semibold uppercase tracking-wider w-14 shrink-0" style="color:var(--karbon-text-4);">${escape_html(c)}</span> `);
				Breadcrumb($$renderer, {
					items: basic,
					color: c
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div> <h3 class="text-sm font-semibold mt-6 mb-3" style="color:var(--karbon-text-2);">Couleurs x Pills</h3> <div class="space-y-3"><!--[-->`);
			const each_array_3 = ensure_array_like(colors);
			for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
				let c = each_array_3[$$index_3];
				Breadcrumb($$renderer, {
					items: basic,
					color: c,
					variant: "pills"
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Couleurs",
			description: "12 couleurs pour l'element actif et les hover.",
			code: `<Breadcrumb items={items} color="red" />
<Breadcrumb items={items} color="emerald" />
<Breadcrumb items={items} color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-4"><!--[-->`);
			const each_array_4 = ensure_array_like([
				"sm",
				"md",
				"lg"
			]);
			for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
				let sz = each_array_4[$$index_4];
				$$renderer.push(`<div class="flex items-center gap-3"><span class="text-[11px] font-semibold uppercase tracking-wider w-8 shrink-0" style="color:var(--karbon-text-4);">${escape_html(sz)}</span> `);
				Breadcrumb($$renderer, {
					items: withIcons,
					size: sz,
					color: "violet"
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Tailles",
			description: "3 tailles de texte et espacement.",
			code: `<Breadcrumb items={items} size="sm" color="violet" />
<Breadcrumb items={items} size="md" color="violet" />
<Breadcrumb items={items} size="lg" color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-4"><div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Sans collapse (7 items)</span> `);
			Breadcrumb($$renderer, {
				items: long,
				color: "blue"
			});
			$$renderer.push(`<!----></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Collapse 2 (montre dernier 2)</span> `);
			Breadcrumb($$renderer, {
				items: long,
				collapse: 2,
				color: "violet"
			});
			$$renderer.push(`<!----></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Collapse 1 (montre dernier 1)</span> `);
			Breadcrumb($$renderer, {
				items: long,
				collapse: 1,
				color: "emerald",
				variant: "pills"
			});
			$$renderer.push(`<!----></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Collapse (chemin long)",
			description: "Collapse automatique pour les chemins profonds. Cliquez sur '...' pour expander.",
			code: `<Breadcrumb items={longItems} collapse={2} color="violet" />
<Breadcrumb items={longItems} collapse={1} color="emerald"
  variant="pills" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-5"><div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">E-commerce</span> `);
			Breadcrumb($$renderer, {
				items: [
					{
						label: "Boutique",
						href: "/"
					},
					{
						label: "Homme",
						href: "/"
					},
					{
						label: "Chaussures",
						href: "/"
					},
					{ label: "Nike Air Max 90" }
				],
				color: "blue",
				separator: "chevron"
			});
			$$renderer.push(`<!----></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Administration</span> `);
			Breadcrumb($$renderer, {
				items: [
					{
						label: "Dashboard",
						href: "/",
						icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"7\" height=\"9\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"14\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"9\" x=\"14\" y=\"12\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\"/></svg>"
					},
					{
						label: "Articles",
						href: "/"
					},
					{ label: "Modifier" }
				],
				color: "violet",
				variant: "pills"
			});
			$$renderer.push(`<!----></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Documentation</span> `);
			Breadcrumb($$renderer, {
				items: [
					{
						label: "Docs",
						href: "/"
					},
					{
						label: "Composants",
						href: "/"
					},
					{
						label: "Overlay",
						href: "/"
					},
					{ label: "Modal" }
				],
				separator: "slash",
				size: "sm"
			});
			$$renderer.push(`<!----></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Cas d'usage",
			description: "Exemples concrets d'utilisation.",
			code: `<!-- E-commerce -->
<Breadcrumb items={shopItems} color="blue" />
<!-- Administration -->
<Breadcrumb items={adminItems} color="violet" variant="pills" />
<!-- Documentation -->
<Breadcrumb items={docItems} separator="slash" size="sm" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
