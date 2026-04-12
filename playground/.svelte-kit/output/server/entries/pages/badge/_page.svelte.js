import { T as escape_html, a as ensure_array_like } from "../../../chunks/server.js";
import { E as Badge, _ as CodeBlock } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/badge/+page.svelte
function _page($$renderer) {
	const usageCode = `import { Badge } from '@karbonjs/ui-svelte'

<Badge>Default</Badge>
<Badge color="emerald" variant="solid">Active</Badge>
<Badge color="red" variant="dot">Offline</Badge>
<Badge color="violet" closable onclose={() => {}}>Tag</Badge>`;
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
	let tags = [
		"Svelte",
		"React",
		"TypeScript",
		"Tailwind",
		"Rust"
	];
	function removeTag(tag) {
		tags = tags.filter((t) => t !== tag);
	}
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Badge</h1> <p class="text-[var(--karbon-text-3)] mb-8">Badges avec variantes, couleurs, tailles, formes, dot indicator et closable.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
	CodeBlock($$renderer, {
		code: usageCode,
		language: "svelte",
		title: "Example.svelte",
		lineCopy: true
	});
	$$renderer.push(`<!----></div> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2">`);
			Badge($$renderer, {
				variant: "soft",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Soft`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				variant: "solid",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Solid`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				variant: "outline",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Outline`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				variant: "dot",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Dot`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				variant: "flat",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Flat`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Variants",
			code: `<Badge variant="soft">Soft</Badge>
<Badge variant="solid">Solid</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="dot">Dot</Badge>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
			const each_array = ensure_array_like(colors);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let color = each_array[$$index];
				Badge($$renderer, {
					color,
					variant: "soft",
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(color)}`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Soft × Colors",
			code: `<Badge color="emerald" variant="soft">emerald</Badge>
<Badge color="violet" variant="soft">violet</Badge>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
			const each_array_1 = ensure_array_like(colors);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let color = each_array_1[$$index_1];
				Badge($$renderer, {
					color,
					variant: "solid",
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(color)}`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Solid × Colors",
			code: `<Badge color="emerald" variant="solid">emerald</Badge>
<Badge color="violet" variant="solid">violet</Badge>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
			const each_array_2 = ensure_array_like(colors);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let color = each_array_2[$$index_2];
				Badge($$renderer, {
					color,
					variant: "outline",
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(color)}`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Outline × Colors",
			code: `<Badge color="emerald" variant="outline">emerald</Badge>
<Badge color="violet" variant="outline">violet</Badge>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
			const each_array_3 = ensure_array_like(colors);
			for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
				let color = each_array_3[$$index_3];
				Badge($$renderer, {
					color,
					variant: "dot",
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(color)}`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Dot × Colors",
			code: `<Badge color="emerald" variant="dot">emerald</Badge>
<Badge color="red" variant="dot">red</Badge>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-center gap-2">`);
			Badge($$renderer, {
				size: "xs",
				color: "violet",
				children: ($$renderer) => {
					$$renderer.push(`<!---->XS`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				size: "sm",
				color: "violet",
				children: ($$renderer) => {
					$$renderer.push(`<!---->SM`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				size: "md",
				color: "violet",
				children: ($$renderer) => {
					$$renderer.push(`<!---->MD`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				size: "lg",
				color: "violet",
				children: ($$renderer) => {
					$$renderer.push(`<!---->LG`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> <div class="flex flex-wrap items-center gap-2 mt-3">`);
			Badge($$renderer, {
				size: "xs",
				color: "emerald",
				variant: "solid",
				children: ($$renderer) => {
					$$renderer.push(`<!---->XS`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				size: "sm",
				color: "emerald",
				variant: "solid",
				children: ($$renderer) => {
					$$renderer.push(`<!---->SM`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				size: "md",
				color: "emerald",
				variant: "solid",
				children: ($$renderer) => {
					$$renderer.push(`<!---->MD`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				size: "lg",
				color: "emerald",
				variant: "solid",
				children: ($$renderer) => {
					$$renderer.push(`<!---->LG`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Sizes",
			code: `<Badge size="xs" color="violet">XS</Badge>
<Badge size="sm" color="violet">SM</Badge>
<Badge size="md" color="violet">MD</Badge>
<Badge size="lg" color="violet">LG</Badge>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-center gap-2">`);
			Badge($$renderer, {
				shape: "pill",
				color: "blue",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Pill`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				shape: "rounded",
				color: "blue",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Rounded`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				shape: "square",
				color: "blue",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Square`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> <div class="flex flex-wrap items-center gap-2 mt-3">`);
			Badge($$renderer, {
				shape: "pill",
				color: "pink",
				variant: "outline",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Pill`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				shape: "rounded",
				color: "pink",
				variant: "outline",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Rounded`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				shape: "square",
				color: "pink",
				variant: "outline",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Square`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Shapes",
			code: `<Badge shape="pill" color="blue">Pill</Badge>
<Badge shape="rounded" color="blue">Rounded</Badge>
<Badge shape="square" color="blue">Square</Badge>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
			const each_array_4 = ensure_array_like(tags);
			for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
				let tag = each_array_4[$$index_4];
				Badge($$renderer, {
					color: "violet",
					closable: true,
					onclose: () => removeTag(tag),
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(tag)}`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div> `);
			if (tags.length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="text-xs mt-2" style="color: var(--karbon-text-4);">Tous les tags ont ete retires. <button class="underline cursor-pointer">Reinitialiser</button></p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		DemoSection($$renderer, {
			title: "Closable (tags)",
			code: `<Badge color="violet" closable onclose={() => removeTag(tag)}>
  {tag}
</Badge>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
			const each_array_5 = ensure_array_like(colors);
			for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
				let color = each_array_5[$$index_5];
				Badge($$renderer, {
					color,
					closable: true,
					onclose: () => {},
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(color)}`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Closable × Colors",
			code: `<Badge color="emerald" closable onclose={() => {}}>emerald</Badge>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-3">`);
			Badge($$renderer, {
				dot: true,
				color: "emerald",
				variant: "soft",
				children: ($$renderer) => {
					$$renderer.push(`<!---->En ligne`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				dot: true,
				color: "amber",
				variant: "soft",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Absent`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				dot: true,
				color: "red",
				variant: "soft",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Hors ligne`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				dot: true,
				color: "blue",
				variant: "soft",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Occupe`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				dot: true,
				color: "slate",
				variant: "soft",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Inconnu`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Dot indicator",
			code: `<Badge dot color="emerald" variant="soft">En ligne</Badge>
<Badge dot color="red" variant="soft">Hors ligne</Badge>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Statuts</h3> <div class="flex flex-wrap gap-2">`);
			Badge($$renderer, {
				color: "emerald",
				variant: "dot",
				size: "md",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Publie`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				color: "amber",
				variant: "dot",
				size: "md",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Brouillon`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				color: "red",
				variant: "dot",
				size: "md",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Archive`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				color: "blue",
				variant: "dot",
				size: "md",
				children: ($$renderer) => {
					$$renderer.push(`<!---->En revision`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> <h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Roles</h3> <div class="flex flex-wrap gap-2">`);
			Badge($$renderer, {
				color: "red",
				variant: "solid",
				size: "sm",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Super Admin`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				color: "orange",
				variant: "solid",
				size: "sm",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Admin`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				color: "violet",
				variant: "solid",
				size: "sm",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Redacteur`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				color: "slate",
				variant: "solid",
				size: "sm",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Utilisateur`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> <h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Categories</h3> <div class="flex flex-wrap gap-2">`);
			Badge($$renderer, {
				color: "cyan",
				variant: "outline",
				shape: "rounded",
				size: "md",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Technologie`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				color: "pink",
				variant: "outline",
				shape: "rounded",
				size: "md",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Lifestyle`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				color: "emerald",
				variant: "outline",
				shape: "rounded",
				size: "md",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Gaming`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Badge($$renderer, {
				color: "amber",
				variant: "outline",
				shape: "rounded",
				size: "md",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Cinema`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> <h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Notifications</h3> <div class="flex flex-wrap items-center gap-4"><span class="relative"><span style="color: var(--karbon-text-2);">Messages</span> `);
			Badge($$renderer, {
				color: "red",
				variant: "solid",
				size: "xs",
				class: "absolute -top-2 -right-5",
				children: ($$renderer) => {
					$$renderer.push(`<!---->3`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></span> <span class="relative"><span style="color: var(--karbon-text-2);">Alertes</span> `);
			Badge($$renderer, {
				color: "amber",
				variant: "solid",
				size: "xs",
				class: "absolute -top-2 -right-6",
				children: ($$renderer) => {
					$$renderer.push(`<!---->12`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></span> <span class="relative"><span style="color: var(--karbon-text-2);">Updates</span> `);
			Badge($$renderer, {
				color: "blue",
				variant: "solid",
				size: "xs",
				class: "absolute -top-2 -right-3",
				children: ($$renderer) => {
					$$renderer.push(`<!---->!`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></span></div>`);
		}
		DemoSection($$renderer, {
			title: "Cas d'usage",
			description: "Statuts, roles, categories et notifications",
			code: `<Badge color="emerald" variant="dot" size="md">Publie</Badge>
<Badge color="red" variant="solid" size="sm">Super Admin</Badge>
<Badge color="cyan" variant="outline" shape="rounded">Tech</Badge>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
