import { T as escape_html } from "../../../chunks/server.js";
import { F as Button, _ as CodeBlock, p as Dropdown } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/dropdown/+page.svelte
function _page($$renderer) {
	const usageCode = `<script lang="ts">
  import { Dropdown, Button } from '@karbonjs/ui-svelte'

  const items = [
    { label: 'Modifier', value: 'edit' },
    { label: 'Dupliquer', value: 'duplicate' },
    { divider: true, label: '' },
    { label: 'Supprimer', value: 'delete', danger: true },
  ]
<\/script>

<Dropdown {items} onselect={(v) => console.log(v)}>
  {#snippet trigger()}
    <Button variant="outline">Actions</Button>
  {/snippet}
</Dropdown>`;
	const codeBasic = `<Dropdown items={items} onselect={(v) => console.log(v)}>
  {#snippet trigger()}
    <Button variant="outline">Actions</Button>
  {/snippet}
</Dropdown>`;
	const codeIcons = `<Dropdown items={[
  { label: 'Modifier', value: 'edit', icon: '<svg>...</svg>' },
  { label: 'Supprimer', value: 'delete', danger: true },
]}>
  {#snippet trigger()}
    <Button>Options</Button>
  {/snippet}
</Dropdown>`;
	const codeDesc = `<Dropdown items={[
  { label: 'Publier', value: 'publish',
    description: 'Rendre visible a tous' },
  { label: 'Brouillon', value: 'draft',
    description: 'Sauvegarder sans publier' },
]} width="18rem">
  {#snippet trigger()}
    <Button>Sauvegarder</Button>
  {/snippet}
</Dropdown>`;
	const codeGroups = `<Dropdown items={[
  { label: 'Profil', value: 'profile', group: 'Mon compte' },
  { label: 'Equipe', value: 'team', group: 'Organisation' },
  { label: 'Deconnexion', value: 'logout', danger: true },
]}>
  {#snippet trigger()}
    <Button>Mon compte</Button>
  {/snippet}
</Dropdown>`;
	const codeBadges = `<Dropdown items={[
  { label: 'Boite de reception', value: 'inbox', badge: '12' },
  { label: 'Spam', value: 'spam', badge: '99+' },
]} color="blue">
  {#snippet trigger()}
    <Button>Messages</Button>
  {/snippet}
</Dropdown>`;
	const codeSearch = `<Dropdown items={longList} searchable width="16rem">
  {#snippet trigger()}
    <Button>20 options</Button>
  {/snippet}
</Dropdown>`;
	const codeTriggers = `<Dropdown items={items}>
  {#snippet trigger()}
    <div class="icon-button">...</div>
  {/snippet}
</Dropdown>
<Dropdown items={items}>
  {#snippet trigger()}
    <span class="text-link">Plus d'actions</span>
  {/snippet}
</Dropdown>`;
	let selected = "";
	const basicItems = [
		{
			label: "Modifier",
			value: "edit"
		},
		{
			label: "Dupliquer",
			value: "duplicate"
		},
		{
			label: "Archiver",
			value: "archive"
		},
		{
			divider: true,
			label: ""
		},
		{
			label: "Supprimer",
			value: "delete",
			danger: true
		}
	];
	const withIcons = [
		{
			label: "Modifier",
			value: "edit",
			icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"/><path d=\"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z\"/></svg>"
		},
		{
			label: "Dupliquer",
			value: "duplicate",
			icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\"/><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\"/></svg>"
		},
		{
			label: "Partager",
			value: "share",
			icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"18\" cy=\"5\" r=\"3\"/><circle cx=\"6\" cy=\"12\" r=\"3\"/><circle cx=\"18\" cy=\"19\" r=\"3\"/><line x1=\"8.59\" x2=\"15.42\" y1=\"13.51\" y2=\"17.49\"/><line x1=\"15.41\" x2=\"8.59\" y1=\"6.51\" y2=\"10.49\"/></svg>"
		},
		{
			divider: true,
			label: ""
		},
		{
			label: "Supprimer",
			value: "delete",
			danger: true,
			icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 6h18\"/><path d=\"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6\"/><path d=\"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2\"/></svg>"
		}
	];
	const withDescriptions = [
		{
			label: "Publier",
			value: "publish",
			description: "Rendre visible a tous",
			icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>"
		},
		{
			label: "Brouillon",
			value: "draft",
			description: "Sauvegarder sans publier",
			icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5z\"/><path d=\"M14 3v4a2 2 0 0 0 2 2h4\"/></svg>"
		},
		{
			label: "Planifier",
			value: "schedule",
			description: "Publier a une date donnee",
			icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/></svg>"
		}
	];
	const withGroups = [
		{
			label: "Profil",
			value: "profile",
			group: "Mon compte"
		},
		{
			label: "Parametres",
			value: "settings",
			group: "Mon compte"
		},
		{
			label: "Factures",
			value: "billing",
			group: "Mon compte"
		},
		{
			label: "Equipe",
			value: "team",
			group: "Organisation"
		},
		{
			label: "Projets",
			value: "projects",
			group: "Organisation"
		},
		{
			divider: true,
			label: ""
		},
		{
			label: "Deconnexion",
			value: "logout",
			danger: true
		}
	];
	const withBadges = [
		{
			label: "Boite de reception",
			value: "inbox",
			badge: "12"
		},
		{
			label: "Envoyes",
			value: "sent",
			badge: "3"
		},
		{
			label: "Brouillons",
			value: "drafts",
			badge: "1"
		},
		{
			label: "Spam",
			value: "spam",
			badge: "99+"
		},
		{
			divider: true,
			label: ""
		},
		{
			label: "Corbeille",
			value: "trash"
		}
	];
	const longList = Array.from({ length: 20 }, (_, i) => ({
		label: `Option ${i + 1}`,
		value: `opt-${i + 1}`
	}));
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Dropdown</h1> <p class="text-[var(--karbon-text-3)] mb-10">Menus deroulants avec icones, descriptions, groupes, badges, recherche et keyboard nav.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
	CodeBlock($$renderer, {
		code: usageCode,
		language: "svelte",
		title: "Example.svelte",
		lineCopy: true
	});
	$$renderer.push(`<!----></div> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-4">`);
			{
				function trigger($$renderer) {
					Button($$renderer, {
						variant: "outline",
						color: "slate",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Actions`);
						},
						$$slots: { default: true }
					});
				}
				Dropdown($$renderer, {
					items: basicItems,
					onselect: (v) => selected = v,
					trigger,
					$$slots: { trigger: true }
				});
			}
			$$renderer.push(`<!----> `);
			{
				function trigger($$renderer) {
					Button($$renderer, {
						variant: "outline",
						color: "slate",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Aligne droite`);
						},
						$$slots: { default: true }
					});
				}
				Dropdown($$renderer, {
					items: basicItems,
					align: "right",
					onselect: (v) => selected = v,
					trigger,
					$$slots: { trigger: true }
				});
			}
			$$renderer.push(`<!----> `);
			{
				function trigger($$renderer) {
					Button($$renderer, {
						variant: "outline",
						color: "slate",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Ouvre en haut`);
						},
						$$slots: { default: true }
					});
				}
				Dropdown($$renderer, {
					items: basicItems,
					position: "top",
					onselect: (v) => selected = v,
					trigger,
					$$slots: { trigger: true }
				});
			}
			$$renderer.push(`<!----></div> `);
			if (selected) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="text-xs mt-3" style="color:var(--karbon-text-3);">Selection: <strong>${escape_html(selected)}</strong></p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		DemoSection($$renderer, {
			title: "Basic",
			description: "Menu simple avec divider et action danger.",
			code: codeBasic,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			{
				function trigger($$renderer) {
					Button($$renderer, {
						variant: "flat",
						color: "violet",
						children: ($$renderer) => {
							$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg> Options`);
						},
						$$slots: { default: true }
					});
				}
				Dropdown($$renderer, {
					items: withIcons,
					onselect: (v) => selected = v,
					trigger,
					$$slots: { trigger: true }
				});
			}
		}
		DemoSection($$renderer, {
			title: "Avec icones",
			description: "Chaque item peut avoir une icone SVG.",
			code: codeIcons,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			{
				function trigger($$renderer) {
					Button($$renderer, {
						color: "emerald",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Sauvegarder`);
						},
						$$slots: { default: true }
					});
				}
				Dropdown($$renderer, {
					items: withDescriptions,
					width: "18rem",
					onselect: (v) => selected = v,
					trigger,
					$$slots: { trigger: true }
				});
			}
		}
		DemoSection($$renderer, {
			title: "Avec descriptions",
			description: "Ajoutez une description sous chaque item pour plus de contexte.",
			code: codeDesc,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			{
				function trigger($$renderer) {
					Button($$renderer, {
						variant: "flat",
						children: ($$renderer) => {
							$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Mon compte`);
						},
						$$slots: { default: true }
					});
				}
				Dropdown($$renderer, {
					items: withGroups,
					onselect: (v) => selected = v,
					trigger,
					$$slots: { trigger: true }
				});
			}
		}
		DemoSection($$renderer, {
			title: "Avec groupes",
			description: "Organisez les items par sections avec des titres de groupe.",
			code: codeGroups,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex gap-4">`);
			{
				function trigger($$renderer) {
					Button($$renderer, {
						variant: "flat",
						color: "blue",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Messages`);
						},
						$$slots: { default: true }
					});
				}
				Dropdown($$renderer, {
					items: withBadges,
					color: "blue",
					onselect: (v) => selected = v,
					trigger,
					$$slots: { trigger: true }
				});
			}
			$$renderer.push(`<!----> `);
			{
				function trigger($$renderer) {
					Button($$renderer, {
						variant: "flat",
						color: "violet",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Violet`);
						},
						$$slots: { default: true }
					});
				}
				Dropdown($$renderer, {
					items: withBadges,
					color: "violet",
					onselect: (v) => selected = v,
					trigger,
					$$slots: { trigger: true }
				});
			}
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Avec badges",
			description: "Compteurs a droite de chaque item.",
			code: codeBadges,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			{
				function trigger($$renderer) {
					Button($$renderer, {
						variant: "outline",
						color: "slate",
						children: ($$renderer) => {
							$$renderer.push(`<!---->20 options (recherche)`);
						},
						$$slots: { default: true }
					});
				}
				Dropdown($$renderer, {
					items: longList,
					searchable: true,
					width: "16rem",
					onselect: (v) => selected = v,
					trigger,
					$$slots: { trigger: true }
				});
			}
		}
		DemoSection($$renderer, {
			title: "Avec recherche",
			description: "Barre de recherche integree pour filtrer les items. Ideal pour les longues listes.",
			code: codeSearch,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-center gap-4">`);
			{
				function trigger($$renderer) {
					$$renderer.push(`<div class="p-2 rounded-lg cursor-pointer transition-colors" style="color:var(--karbon-text-3);background:var(--karbon-bg-card);border:1px solid var(--karbon-border);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></div>`);
				}
				Dropdown($$renderer, {
					items: basicItems,
					onselect: (v) => selected = v,
					trigger,
					$$slots: { trigger: true }
				});
			}
			$$renderer.push(`<!----> `);
			{
				function trigger($$renderer) {
					$$renderer.push(`<div class="p-2 rounded-lg cursor-pointer transition-colors" style="color:var(--karbon-text-3);background:var(--karbon-bg-card);border:1px solid var(--karbon-border);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></div>`);
				}
				Dropdown($$renderer, {
					items: basicItems,
					onselect: (v) => selected = v,
					trigger,
					$$slots: { trigger: true }
				});
			}
			$$renderer.push(`<!----> `);
			{
				function trigger($$renderer) {
					$$renderer.push(`<div class="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer text-sm font-semibold" style="background:color-mix(in srgb,var(--karbon-violet-500) 15%,transparent);color:var(--karbon-violet-400);">AM</div>`);
				}
				Dropdown($$renderer, {
					items: withGroups,
					align: "right",
					onselect: (v) => selected = v,
					trigger,
					$$slots: { trigger: true }
				});
			}
			$$renderer.push(`<!----> `);
			{
				function trigger($$renderer) {
					$$renderer.push(`<span class="text-sm underline cursor-pointer" style="color:var(--karbon-text-2);">Plus d'actions</span>`);
				}
				Dropdown($$renderer, {
					items: basicItems,
					onselect: (v) => selected = v,
					trigger,
					$$slots: { trigger: true }
				});
			}
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Triggers varies",
			description: "N'importe quel element peut etre un trigger.",
			code: codeTriggers,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
