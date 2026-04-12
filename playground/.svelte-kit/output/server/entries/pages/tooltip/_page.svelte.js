import { T as escape_html, a as ensure_array_like, c as stringify } from "../../../chunks/server.js";
import { E as Badge, F as Button, _ as CodeBlock, l as Tooltip } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/tooltip/+page.svelte
function _page($$renderer) {
	const usageCode = `<script lang="ts">
  import { Tooltip, Button } from '@karbonjs/ui-svelte'
<\/script>

<Tooltip text="Sauvegarder le document" position="top">
  <Button>Sauvegarder</Button>
</Tooltip>

<Tooltip variant="colored" color="violet" delay={200}>
  {#snippet content()}
    <div>
      <p class="font-semibold">Alice Martin</p>
      <p class="text-xs opacity-70">admin@example.com</p>
    </div>
  {/snippet}
  <span class="underline cursor-help">Profil</span>
</Tooltip>`;
	const colors = [
		"red",
		"emerald",
		"cyan",
		"blue",
		"violet",
		"pink"
	];
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Tooltip</h1> <p class="text-[var(--karbon-text-3)] mb-8">Infobulles avec positions, variantes, couleurs, tailles et contenu riche.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
	CodeBlock($$renderer, {
		code: usageCode,
		language: "svelte",
		title: "Example.svelte",
		lineCopy: true
	});
	$$renderer.push(`<!----></div> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-center gap-6 py-10 justify-center">`);
			Tooltip($$renderer, {
				text: "Tooltip en haut",
				position: "top",
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "outline",
						color: "slate",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Top`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Tooltip en bas",
				position: "bottom",
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "outline",
						color: "slate",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Bottom`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Tooltip a gauche",
				position: "left",
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "outline",
						color: "slate",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Left`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Tooltip a droite",
				position: "right",
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "outline",
						color: "slate",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Right`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Positions",
			code: `<Tooltip text="Tooltip en haut" position="top">
  <Button variant="outline">Top</Button>
</Tooltip>
<Tooltip text="Tooltip en bas" position="bottom">
  <Button variant="outline">Bottom</Button>
</Tooltip>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-center gap-6 py-6">`);
			Tooltip($$renderer, {
				text: "Dark tooltip (default)",
				variant: "dark",
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "flat",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Dark`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Light tooltip",
				variant: "light",
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "flat",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Light`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Colored tooltip",
				variant: "colored",
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "flat",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Colored`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Colored violet",
				variant: "colored",
				color: "violet",
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "flat",
						color: "violet",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Violet`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Colored emerald",
				variant: "colored",
				color: "emerald",
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "flat",
						color: "emerald",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Emerald`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Variants",
			code: `<Tooltip text="Dark tooltip" variant="dark">...</Tooltip>
<Tooltip text="Light tooltip" variant="light">...</Tooltip>
<Tooltip text="Colored" variant="colored" color="violet">...</Tooltip>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-center gap-4 py-6"><!--[-->`);
			const each_array = ensure_array_like(colors);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let c = each_array[$$index];
				Tooltip($$renderer, {
					text: `Tooltip ${stringify(c)}`,
					variant: "colored",
					color: c,
					children: ($$renderer) => {
						Badge($$renderer, {
							color: c,
							variant: "soft",
							children: ($$renderer) => {
								$$renderer.push(`<!---->${escape_html(c)}`);
							},
							$$slots: { default: true }
						});
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Colored × Colors",
			code: `<Tooltip text="Tooltip violet" variant="colored" color="violet">
  <Badge color="violet" variant="soft">violet</Badge>
</Tooltip>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-center gap-6 py-6">`);
			Tooltip($$renderer, {
				text: "Small tooltip",
				size: "sm",
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "outline",
						size: "sm",
						children: ($$renderer) => {
							$$renderer.push(`<!---->SM`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Medium tooltip",
				size: "md",
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "outline",
						children: ($$renderer) => {
							$$renderer.push(`<!---->MD`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Large tooltip",
				size: "lg",
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "outline",
						size: "lg",
						children: ($$renderer) => {
							$$renderer.push(`<!---->LG`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Sizes",
			code: `<Tooltip text="Small tooltip" size="sm">...</Tooltip>
<Tooltip text="Medium tooltip" size="md">...</Tooltip>
<Tooltip text="Large tooltip" size="lg">...</Tooltip>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-center gap-6 py-6">`);
			Tooltip($$renderer, {
				text: "Ceci est un tooltip avec un texte plus long qui va automatiquement passer a la ligne grace au max-width.",
				maxWidth: "200px",
				children: ($$renderer) => {
					$$renderer.push(`<span class="underline cursor-help" style="color: var(--karbon-text-2);">Survolez pour un long texte</span>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Tooltip tres court",
				children: ($$renderer) => {
					$$renderer.push(`<span class="underline cursor-help" style="color: var(--karbon-text-2);">Texte court</span>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Texte long (wrap)",
			code: `<Tooltip text="Un texte long qui va passer a la ligne..."
  maxWidth="200px">
  <span class="underline cursor-help">Survolez</span>
</Tooltip>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-center gap-6 py-6">`);
			{
				function content($$renderer) {
					$$renderer.push(`<div class="space-y-1.5" style="min-width: 150px;"><p class="font-semibold">Alice Martin</p> <p class="text-[11px] opacity-70">admin@example.com</p> <div class="flex gap-1 pt-1"><span class="px-1.5 py-px rounded text-[10px] font-medium" style="background: rgba(139,92,246,0.2); color: #a78bfa;">Admin</span> <span class="px-1.5 py-px rounded text-[10px] font-medium" style="background: rgba(16,185,129,0.2); color: #34d399;">Actif</span></div></div>`);
				}
				Tooltip($$renderer, {
					content,
					children: ($$renderer) => {
						$$renderer.push(`<span class="underline cursor-help" style="color: var(--karbon-text-2);">Profil utilisateur</span>`);
					},
					$$slots: {
						content: true,
						default: true
					}
				});
			}
			$$renderer.push(`<!----> `);
			{
				function content($$renderer) {
					$$renderer.push(`<div class="space-y-1" style="min-width: 120px;"><p class="font-semibold" style="color: #111;">Raccourcis</p> <div class="flex items-center gap-2 text-[11px]" style="color: #555;"><kbd class="px-1 rounded" style="background: #e5e7eb;">Ctrl+S</kbd> <span>Sauvegarder</span></div> <div class="flex items-center gap-2 text-[11px]" style="color: #555;"><kbd class="px-1 rounded" style="background: #e5e7eb;">Ctrl+Z</kbd> <span>Annuler</span></div></div>`);
				}
				Tooltip($$renderer, {
					variant: "light",
					content,
					children: ($$renderer) => {
						$$renderer.push(`<span class="underline cursor-help" style="color: var(--karbon-text-2);">Raccourcis clavier</span>`);
					},
					$$slots: {
						content: true,
						default: true
					}
				});
			}
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Contenu riche (snippet)",
			code: `<Tooltip>
  <div slot="content">
    <p class="font-semibold">Alice Martin</p>
    <p class="text-xs opacity-70">admin@example.com</p>
  </div>
  <span class="underline cursor-help">Profil</span>
</Tooltip>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-center gap-6 py-6">`);
			Tooltip($$renderer, {
				text: "Pas de fleche",
				arrow: false,
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "ghost",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Sans fleche`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Avec fleche",
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "ghost",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Avec fleche`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Sans fleche",
			code: `<Tooltip text="Pas de fleche" arrow={false}>
  <Button variant="ghost">Sans fleche</Button>
</Tooltip>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-center gap-6 py-6">`);
			Tooltip($$renderer, {
				text: "Instant (0ms)",
				delay: 0,
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "flat",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Instant`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Rapide (200ms)",
				delay: 200,
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "flat",
						children: ($$renderer) => {
							$$renderer.push(`<!---->200ms`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Lent (800ms)",
				delay: 800,
				children: ($$renderer) => {
					Button($$renderer, {
						variant: "flat",
						children: ($$renderer) => {
							$$renderer.push(`<!---->800ms`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Delai",
			code: `<Tooltip text="Instant (0ms)" delay={0}>...</Tooltip>
<Tooltip text="Rapide (200ms)" delay={200}>...</Tooltip>
<Tooltip text="Lent (800ms)" delay={800}>...</Tooltip>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-center gap-6 py-6">`);
			Tooltip($$renderer, {
				text: "Bouton avec tooltip",
				children: ($$renderer) => {
					Button($$renderer, {
						color: "violet",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Bouton`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Badge avec tooltip",
				children: ($$renderer) => {
					Badge($$renderer, {
						color: "emerald",
						variant: "dot",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Status`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Texte avec tooltip",
				children: ($$renderer) => {
					$$renderer.push(`<span class="cursor-help border-b border-dashed" style="color: var(--karbon-text-2); border-color: var(--karbon-text-4);">Terme technique</span>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Tooltip($$renderer, {
				text: "Icone avec tooltip",
				children: ($$renderer) => {
					$$renderer.push(`<button class="p-2 rounded-lg cursor-pointer" style="color: var(--karbon-text-3); background: var(--karbon-bg-2);" aria-label="Info"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></button>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Sur differents elements",
			code: `<Tooltip text="Bouton avec tooltip">
  <Button color="violet">Bouton</Button>
</Tooltip>
<Tooltip text="Badge avec tooltip">
  <Badge color="emerald" variant="dot">Status</Badge>
</Tooltip>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
