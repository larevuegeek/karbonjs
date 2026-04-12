import { T as escape_html, a as ensure_array_like } from "../../../chunks/server.js";
import { _ as CodeBlock, a as Divider } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/divider/+page.svelte
function _page($$renderer) {
	const usageCode = `<script lang="ts">
  import { Divider } from '@karbonjs/ui-svelte'
<\/script>

<Divider />
<Divider label="ou continuer avec" color="violet" />
<Divider variant="gradient" color="emerald" spacing="lg" />

<!-- Vertical entre elements inline -->
<div class="flex items-center">
  <span>Accueil</span>
  <Divider direction="vertical" spacing="sm" />
  <span>Articles</span>
</div>`;
	const codeIcon = `<Divider color="violet">
  {#snippet icon()}
    <svg>...</svg>
  {/snippet}
</Divider>
<Divider label="ou" color="blue">
  {#snippet icon()}
    <svg>...</svg>
  {/snippet}
</Divider>`;
	const colors = [
		"red",
		"emerald",
		"cyan",
		"blue",
		"violet",
		"pink"
	];
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Divider</h1> <p class="text-[var(--karbon-text-3)] mb-10">Separateurs avec variantes, couleurs, labels, icones et orientations.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
	CodeBlock($$renderer, {
		code: usageCode,
		language: "svelte",
		title: "Example.svelte",
		lineCopy: true
	});
	$$renderer.push(`<!----></div> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-2"><!--[-->`);
			const each_array = ensure_array_like([
				"solid",
				"dashed",
				"dotted",
				"gradient"
			]);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let v = each_array[$$index];
				$$renderer.push(`<div class="flex items-center gap-3"><span class="text-[11px] font-semibold uppercase tracking-wider w-16 shrink-0" style="color:var(--karbon-text-4);">${escape_html(v)}</span> <div class="flex-1">`);
				Divider($$renderer, {
					variant: v,
					spacing: "none"
				});
				$$renderer.push(`<!----></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Variants",
			description: "4 styles de ligne.",
			code: `<Divider variant="solid" />
<Divider variant="dashed" />
<Divider variant="dotted" />
<Divider variant="gradient" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3"><!--[-->`);
			const each_array_1 = ensure_array_like(colors);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let c = each_array_1[$$index_1];
				Divider($$renderer, {
					color: c,
					spacing: "none"
				});
			}
			$$renderer.push(`<!--]--></div> <h3 class="text-sm font-semibold mt-6 mb-3" style="color:var(--karbon-text-2);">Couleurs x Gradient</h3> <div class="space-y-3"><!--[-->`);
			const each_array_2 = ensure_array_like(colors);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let c = each_array_2[$$index_2];
				Divider($$renderer, {
					color: c,
					variant: "gradient",
					spacing: "none"
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Couleurs",
			description: "12 couleurs disponibles.",
			code: `<Divider color="red" />
<Divider color="emerald" />
<Divider color="violet" />
<Divider color="violet" variant="gradient" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-1">`);
			Divider($$renderer, { label: "Centre (default)" });
			$$renderer.push(`<!----> `);
			Divider($$renderer, {
				label: "A gauche",
				labelPosition: "left"
			});
			$$renderer.push(`<!----> `);
			Divider($$renderer, {
				label: "A droite",
				labelPosition: "right"
			});
			$$renderer.push(`<!----> `);
			Divider($$renderer, {
				label: "Couleur",
				color: "violet"
			});
			$$renderer.push(`<!----> `);
			Divider($$renderer, {
				label: "Gradient",
				color: "emerald",
				variant: "gradient"
			});
			$$renderer.push(`<!----> `);
			Divider($$renderer, {
				label: "Dashed",
				variant: "dashed"
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Avec label",
			description: "Texte centre, a gauche ou a droite.",
			code: `<Divider label="Centre (default)" />
<Divider label="A gauche" labelPosition="left" />
<Divider label="A droite" labelPosition="right" />
<Divider label="Couleur" color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-1">`);
			{
				function icon($$renderer) {
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`);
				}
				Divider($$renderer, {
					color: "violet",
					icon,
					$$slots: { icon: true }
				});
			}
			$$renderer.push(`<!----> `);
			{
				function icon($$renderer) {
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>`);
				}
				Divider($$renderer, {
					label: "ou",
					color: "blue",
					icon,
					$$slots: { icon: true }
				});
			}
			$$renderer.push(`<!----> `);
			{
				function icon($$renderer) {
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`);
				}
				Divider($$renderer, {
					variant: "gradient",
					color: "pink",
					icon,
					$$slots: { icon: true }
				});
			}
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Avec icone",
			description: "Remplacez le texte par une icone SVG.",
			code: codeIcon,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3"><!--[-->`);
			const each_array_3 = ensure_array_like([
				1,
				2,
				3,
				4
			]);
			for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
				let t = each_array_3[$$index_3];
				$$renderer.push(`<div class="flex items-center gap-3"><span class="text-[11px] font-semibold w-8 shrink-0" style="color:var(--karbon-text-4);">${escape_html(t)}px</span> <div class="flex-1">`);
				Divider($$renderer, {
					thickness: t,
					color: "violet",
					spacing: "none"
				});
				$$renderer.push(`<!----></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Epaisseur",
			description: "De 1px (defaut) a N px.",
			code: `<Divider thickness={1} color="violet" />
<Divider thickness={2} color="violet" />
<Divider thickness={3} color="violet" />
<Divider thickness={4} color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="rounded-lg p-4" style="background:var(--karbon-bg-card);border:1px solid var(--karbon-border);"><p class="text-sm" style="color:var(--karbon-text-2);">Paragraphe avant</p> `);
			Divider($$renderer, {
				spacing: "none",
				label: "none"
			});
			$$renderer.push(`<!----> <p class="text-sm" style="color:var(--karbon-text-2);">Paragraphe</p> `);
			Divider($$renderer, {
				spacing: "sm",
				label: "sm"
			});
			$$renderer.push(`<!----> <p class="text-sm" style="color:var(--karbon-text-2);">Paragraphe</p> `);
			Divider($$renderer, {
				spacing: "md",
				label: "md"
			});
			$$renderer.push(`<!----> <p class="text-sm" style="color:var(--karbon-text-2);">Paragraphe</p> `);
			Divider($$renderer, {
				spacing: "lg",
				label: "lg"
			});
			$$renderer.push(`<!----> <p class="text-sm" style="color:var(--karbon-text-2);">Paragraphe</p> `);
			Divider($$renderer, {
				spacing: "xl",
				label: "xl"
			});
			$$renderer.push(`<!----> <p class="text-sm" style="color:var(--karbon-text-2);">Paragraphe apres</p></div>`);
		}
		DemoSection($$renderer, {
			title: "Espacement",
			description: "Controle le margin vertical autour du divider.",
			code: `<Divider spacing="none" />
<Divider spacing="sm" />
<Divider spacing="md" />
<Divider spacing="lg" />
<Divider spacing="xl" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex items-center gap-0 h-10"><span class="text-sm px-3" style="color:var(--karbon-text-2);">Accueil</span> `);
			Divider($$renderer, {
				direction: "vertical",
				spacing: "sm"
			});
			$$renderer.push(`<!----> <span class="text-sm px-3" style="color:var(--karbon-text-2);">Articles</span> `);
			Divider($$renderer, {
				direction: "vertical",
				spacing: "sm"
			});
			$$renderer.push(`<!----> <span class="text-sm px-3" style="color:var(--karbon-text-2);">Videos</span> `);
			Divider($$renderer, {
				direction: "vertical",
				spacing: "sm",
				color: "violet"
			});
			$$renderer.push(`<!----> <span class="text-sm px-3 font-semibold" style="color:var(--karbon-violet-400);">Contact</span></div> <div class="flex items-center gap-0 h-10 mt-4"><span class="text-sm px-3" style="color:var(--karbon-text-2);">Item 1</span> `);
			Divider($$renderer, {
				direction: "vertical",
				spacing: "sm",
				variant: "dashed"
			});
			$$renderer.push(`<!----> <span class="text-sm px-3" style="color:var(--karbon-text-2);">Item 2</span> `);
			Divider($$renderer, {
				direction: "vertical",
				spacing: "sm",
				variant: "dotted",
				color: "emerald"
			});
			$$renderer.push(`<!----> <span class="text-sm px-3" style="color:var(--karbon-text-2);">Item 3</span> `);
			Divider($$renderer, {
				direction: "vertical",
				spacing: "sm",
				variant: "gradient",
				color: "pink"
			});
			$$renderer.push(`<!----> <span class="text-sm px-3" style="color:var(--karbon-text-2);">Item 4</span></div>`);
		}
		DemoSection($$renderer, {
			title: "Vertical",
			description: "Separateurs verticaux entre des elements inline.",
			code: `<div class="flex items-center">
  <span>Accueil</span>
  <Divider direction="vertical" spacing="sm" />
  <span>Articles</span>
  <Divider direction="vertical" spacing="sm" color="violet" />
  <span>Contact</span>
</div>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="max-w-xs space-y-4"><h3 class="text-sm font-semibold" style="color:var(--karbon-text-2);">Formulaire de login</h3> <div class="rounded-lg p-5" style="background:var(--karbon-bg-card);border:1px solid var(--karbon-border);"><div class="h-9 rounded-lg mb-3" style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);"></div> <div class="h-9 rounded-lg mb-4" style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);"></div> <div class="h-9 rounded-lg mb-3" style="background:var(--karbon-primary);"></div> `);
			Divider($$renderer, {
				label: "ou continuer avec",
				spacing: "sm"
			});
			$$renderer.push(`<!----> <div class="flex gap-2 mt-1"><div class="flex-1 h-9 rounded-lg" style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);"></div> <div class="flex-1 h-9 rounded-lg" style="background:var(--karbon-bg-input);border:1px solid var(--karbon-border-input);"></div></div></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Cas d'usage",
			description: "Exemples concrets.",
			code: `<!-- Login form -->
<Divider label="ou continuer avec" spacing="sm" />

<!-- Between sections -->
<Divider variant="gradient" color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
