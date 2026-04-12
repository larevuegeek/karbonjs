import { T as escape_html, a as ensure_array_like, c as stringify } from "../../../chunks/server.js";
import { F as Button, _ as CodeBlock, y as PageHeader } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/pageheader/+page.svelte
function _page($$renderer) {
	const usageCode = `<script lang="ts">
  import { PageHeader, Button } from '@karbonjs/ui-svelte'
<\/script>

<PageHeader
  title="Articles"
  description="Gerez vos articles et publications."
  color="violet"
  breadcrumbs={[
    { label: 'Dashboard', href: '/' },
    { label: 'Articles' },
  ]}
>
  {#snippet actions()}
    <Button variant="ghost" size="sm">Exporter</Button>
    <Button color="violet" size="sm">Nouvel article</Button>
  {/snippet}
</PageHeader>`;
	const codeIcon = `<PageHeader title="Articles" description="..." color="violet">
  {#snippet icon()}
    <svg>...</svg>
  {/snippet}
</PageHeader>`;
	const codeActions = `<PageHeader title="Articles" color="violet">
  {#snippet actions()}
    <Button variant="ghost" size="sm">Exporter</Button>
    <Button color="violet" size="sm">Nouveau</Button>
  {/snippet}
</PageHeader>`;
	const colors = [
		"red",
		"emerald",
		"cyan",
		"blue",
		"violet",
		"pink"
	];
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">PageHeader</h1> <p class="text-[var(--karbon-text-3)] mb-10">En-tetes de page avec icone, description, breadcrumb, back button et actions.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
	CodeBlock($$renderer, {
		code: usageCode,
		language: "svelte",
		title: "Example.svelte",
		lineCopy: true
	});
	$$renderer.push(`<!----></div> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-6"><div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Default (border bottom)</span> `);
			PageHeader($$renderer, {
				title: "Tableau de bord",
				description: "Vue d'ensemble de votre activite."
			});
			$$renderer.push(`<!----></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Bordered (card)</span> `);
			PageHeader($$renderer, {
				title: "Tableau de bord",
				description: "Vue d'ensemble de votre activite.",
				variant: "bordered"
			});
			$$renderer.push(`<!----></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Filled (fond teinte)</span> `);
			PageHeader($$renderer, {
				title: "Tableau de bord",
				description: "Vue d'ensemble de votre activite.",
				variant: "filled",
				color: "violet"
			});
			$$renderer.push(`<!----></div> <div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">Clean (aucun style)</span> `);
			PageHeader($$renderer, {
				title: "Tableau de bord",
				description: "Vue d'ensemble de votre activite.",
				variant: "clean"
			});
			$$renderer.push(`<!----></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Variants",
			description: "4 variantes : default, bordered, filled, clean.",
			code: `<PageHeader title="Titre" description="Description." />
<PageHeader title="Titre" variant="bordered" />
<PageHeader title="Titre" variant="filled" color="violet" />
<PageHeader title="Titre" variant="clean" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-6">`);
			{
				function icon($$renderer) {
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg>`);
				}
				PageHeader($$renderer, {
					title: "Articles",
					description: "Gerez vos articles et publications.",
					color: "violet",
					icon,
					$$slots: { icon: true }
				});
			}
			$$renderer.push(`<!----> `);
			{
				function icon($$renderer) {
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`);
				}
				PageHeader($$renderer, {
					title: "Utilisateurs",
					description: "Gestion des comptes et des roles.",
					color: "emerald",
					variant: "bordered",
					icon,
					$$slots: { icon: true }
				});
			}
			$$renderer.push(`<!----> `);
			{
				function icon($$renderer) {
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>`);
				}
				PageHeader($$renderer, {
					title: "Parametres",
					description: "Configuration avancee du systeme.",
					color: "cyan",
					variant: "filled",
					icon,
					$$slots: { icon: true }
				});
			}
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Avec icone",
			description: "Icone dans le header avec couleur.",
			code: codeIcon,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-6">`);
			{
				function icon($$renderer) {
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></svg>`);
				}
				function actions($$renderer) {
					Button($$renderer, {
						variant: "ghost",
						size: "sm",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Exporter`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					Button($$renderer, {
						color: "violet",
						size: "sm",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Nouvel article`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!---->`);
				}
				PageHeader($$renderer, {
					title: "Articles",
					description: "Liste de tous les articles.",
					color: "violet",
					icon,
					actions,
					$$slots: {
						icon: true,
						actions: true
					}
				});
			}
			$$renderer.push(`<!----> `);
			{
				function actions($$renderer) {
					Button($$renderer, {
						variant: "outline",
						color: "slate",
						size: "sm",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Apercu`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					Button($$renderer, {
						color: "emerald",
						size: "sm",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Publier`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!---->`);
				}
				PageHeader($$renderer, {
					title: "Modifier l'article",
					description: "Modifiez le contenu et les parametres.",
					variant: "bordered",
					color: "blue",
					backHref: "/",
					badge: "Brouillon",
					actions,
					$$slots: { actions: true }
				});
			}
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Avec actions",
			description: "Boutons d'action a droite du header.",
			code: codeActions,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			{
				function icon($$renderer) {
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg>`);
				}
				function actions($$renderer) {
					Button($$renderer, {
						variant: "ghost",
						size: "sm",
						color: "red",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Supprimer`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					Button($$renderer, {
						variant: "outline",
						color: "slate",
						size: "sm",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Apercu`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					Button($$renderer, {
						color: "emerald",
						size: "sm",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Sauvegarder`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!---->`);
				}
				PageHeader($$renderer, {
					title: "Modifier l'article",
					description: "Netflix renonce au rachat de Warner Bros.",
					color: "violet",
					breadcrumbs: [
						{
							label: "Dashboard",
							href: "/"
						},
						{
							label: "Articles",
							href: "/"
						},
						{ label: "Modifier" }
					],
					icon,
					actions,
					$$slots: {
						icon: true,
						actions: true
					}
				});
			}
		}
		DemoSection($$renderer, {
			title: "Avec breadcrumb",
			description: "Fil d'Ariane integre au header.",
			code: `<PageHeader
  title="Modifier l'article"
  color="violet"
  breadcrumbs={[
    { label: 'Dashboard', href: '/' },
    { label: 'Articles', href: '/' },
    { label: 'Modifier' },
  ]}
/>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			{
				function icon($$renderer) {
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`);
				}
				PageHeader($$renderer, {
					title: "Details de l'utilisateur",
					description: "Alice Martin — admin@example.com",
					backHref: "/",
					backLabel: "Retour aux utilisateurs",
					color: "blue",
					icon,
					$$slots: { icon: true }
				});
			}
		}
		DemoSection($$renderer, {
			title: "Avec back button",
			description: "Lien de retour au-dessus du titre.",
			code: `<PageHeader
  title="Details de l'utilisateur"
  backHref="/"
  backLabel="Retour aux utilisateurs"
  color="blue"
/>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-6">`);
			PageHeader($$renderer, {
				title: "API Settings",
				badge: "Beta",
				color: "violet",
				variant: "bordered"
			});
			$$renderer.push(`<!----> `);
			PageHeader($$renderer, {
				title: "Plan Pro",
				badge: "Actif",
				color: "emerald"
			});
			$$renderer.push(`<!----> `);
			PageHeader($$renderer, {
				title: "Domaine",
				badge: "Expire",
				color: "red",
				variant: "filled"
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Badge",
			description: "Badge a cote du titre.",
			code: `<PageHeader title="API Settings" badge="Beta" color="violet" variant="bordered" />
<PageHeader title="Plan Pro" badge="Actif" color="emerald" />
<PageHeader title="Domaine" badge="Expire" color="red" variant="filled" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-6"><!--[-->`);
			const each_array = ensure_array_like([
				"sm",
				"md",
				"lg"
			]);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let sz = each_array[$$index];
				$$renderer.push(`<div><span class="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">${escape_html(sz)}</span> `);
				{
					function icon($$renderer) {
						$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`);
					}
					PageHeader($$renderer, {
						title: "Titre de la page",
						description: "Description courte.",
						size: sz,
						color: "violet",
						icon,
						$$slots: { icon: true }
					});
				}
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Tailles",
			description: "3 tailles : sm, md, lg.",
			code: `<PageHeader title="Titre" size="sm" color="violet" />
<PageHeader title="Titre" size="md" color="violet" />
<PageHeader title="Titre" size="lg" color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-4"><!--[-->`);
			const each_array_1 = ensure_array_like(colors);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let c = each_array_1[$$index_1];
				PageHeader($$renderer, {
					title: `Page ${stringify(c)}`,
					description: `Description avec couleur ${stringify(c)}.`,
					color: c,
					variant: "filled",
					size: "sm"
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Couleurs x Filled",
			description: "6 couleurs avec la variante filled.",
			code: `<PageHeader title="Page violet" color="violet" variant="filled" size="sm" />
<PageHeader title="Page emerald" color="emerald" variant="filled" size="sm" />
<PageHeader title="Page cyan" color="cyan" variant="filled" size="sm" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
