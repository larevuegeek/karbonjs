import { T as escape_html, a as ensure_array_like } from "../../../chunks/server.js";
import { _ as CodeBlock, d as Tabs } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/tabs/+page.svelte
function _page($$renderer) {
	const usageCode = `<script lang="ts">
  import { Tabs } from '@karbonjs/ui-svelte'

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'security', label: 'Securite' },
    { id: 'billing', label: 'Facturation' },
  ]
<\/script>

<Tabs {tabs} color="violet" variant="pills">
  {#snippet panel(id)}
    <p>Contenu de l'onglet {id}</p>
  {/snippet}
</Tabs>`;
	const codeUnderline = `<Tabs tabs={basicTabs}>
  {#snippet panel(id)}
    <p>Contenu de l'onglet...</p>
  {/snippet}
</Tabs>`;
	const codeVariants = `<Tabs tabs={tabs} variant="underline" color="violet" />
<Tabs tabs={tabs} variant="pills" color="violet" />
<Tabs tabs={tabs} variant="bordered" color="violet" />
<Tabs tabs={tabs} variant="segment" color="violet" />`;
	const codeVertical = `<Tabs tabs={tabs} vertical color="violet">
  {#snippet panel(id)}
    <p>Contenu de l'onglet...</p>
  {/snippet}
</Tabs>`;
	const colors = [
		"red",
		"emerald",
		"cyan",
		"blue",
		"violet",
		"pink"
	];
	const basicTabs = [
		{
			id: "general",
			label: "General"
		},
		{
			id: "security",
			label: "Securite"
		},
		{
			id: "notifications",
			label: "Notifications"
		},
		{
			id: "billing",
			label: "Facturation"
		}
	];
	const withBadges = [
		{
			id: "inbox",
			label: "Boite de reception",
			badge: "12"
		},
		{
			id: "sent",
			label: "Envoyes",
			badge: "3"
		},
		{
			id: "drafts",
			label: "Brouillons",
			badge: "1"
		},
		{
			id: "spam",
			label: "Spam",
			badge: "99+"
		},
		{
			id: "trash",
			label: "Corbeille"
		}
	];
	const withIcons = [
		{
			id: "home",
			label: "Accueil",
			icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/></svg>"
		},
		{
			id: "users",
			label: "Utilisateurs",
			icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/></svg>"
		},
		{
			id: "settings",
			label: "Parametres",
			icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>"
		}
	];
	const withDisabled = [
		{
			id: "active",
			label: "Actif"
		},
		{
			id: "pending",
			label: "En attente"
		},
		{
			id: "locked",
			label: "Verrouille",
			disabled: true
		},
		{
			id: "archive",
			label: "Archive"
		}
	];
	const panelContent = {
		general: "Parametres generaux de votre compte, nom, email et preferences.",
		security: "Mot de passe, authentification a deux facteurs et sessions actives.",
		notifications: "Gerez vos preferences de notification par email et push.",
		billing: "Methode de paiement, historique des factures et plan actuel.",
		inbox: "Vous avez 12 nouveaux messages non lus.",
		sent: "3 messages envoyes cette semaine.",
		drafts: "1 brouillon en attente.",
		spam: "99+ messages bloques par le filtre anti-spam.",
		trash: "La corbeille est vide.",
		home: "Bienvenue sur le tableau de bord principal.",
		users: "Liste des utilisateurs et gestion des roles.",
		settings: "Configuration avancee du systeme.",
		active: "Contenu actif et publie.",
		pending: "Contenu en attente de validation.",
		archive: "Contenu archive."
	};
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Tabs</h1> <p class="text-[var(--karbon-text-3)] mb-8">Onglets avec variantes, couleurs, icones, badges, animation et orientation.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
	CodeBlock($$renderer, {
		code: usageCode,
		language: "svelte",
		title: "Example.svelte",
		lineCopy: true
	});
	$$renderer.push(`<!----></div> `);
	{
		function children($$renderer) {
			{
				function panel($$renderer, id) {
					$$renderer.push(`<p style="color:var(--karbon-text-2);">${escape_html(panelContent[id] || "Contenu...")}</p>`);
				}
				Tabs($$renderer, {
					tabs: basicTabs,
					panel,
					$$slots: { panel: true }
				});
			}
		}
		DemoSection($$renderer, {
			title: "Underline (default)",
			description: "Style par defaut avec soulignement anime.",
			code: codeUnderline,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-6"><!--[-->`);
			const each_array = ensure_array_like([
				"underline",
				"pills",
				"bordered",
				"segment"
			]);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let v = each_array[$$index];
				$$renderer.push(`<div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">${escape_html(v)}</span> `);
				{
					function panel($$renderer, id) {
						$$renderer.push(`<p style="color:var(--karbon-text-2);">${escape_html(panelContent[id] || "Contenu...")}</p>`);
					}
					Tabs($$renderer, {
						tabs: basicTabs,
						variant: v,
						color: "violet",
						panel,
						$$slots: { panel: true }
					});
				}
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Variants",
			description: "4 variantes : underline, pills, bordered, segment.",
			code: codeVariants,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			{
				function panel($$renderer, id) {
					$$renderer.push(`<p style="color:var(--karbon-text-2);">${escape_html(panelContent[id] || "Contenu...")}</p>`);
				}
				Tabs($$renderer, {
					tabs: withBadges,
					color: "blue",
					panel,
					$$slots: { panel: true }
				});
			}
		}
		DemoSection($$renderer, {
			title: "Avec badges",
			description: "Compteurs sur chaque onglet.",
			code: `<Tabs tabs={[
  { id: 'inbox', label: 'Boite de reception', badge: '12' },
  { id: 'sent', label: 'Envoyes', badge: '3' },
]} color="blue" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-6">`);
			{
				function panel($$renderer, id) {
					$$renderer.push(`<p style="color:var(--karbon-text-2);">${escape_html(panelContent[id] || "Contenu...")}</p>`);
				}
				Tabs($$renderer, {
					tabs: withIcons,
					color: "emerald",
					panel,
					$$slots: { panel: true }
				});
			}
			$$renderer.push(`<!----> `);
			{
				function panel($$renderer, id) {
					$$renderer.push(`<p style="color:var(--karbon-text-2);">${escape_html(panelContent[id] || "Contenu...")}</p>`);
				}
				Tabs($$renderer, {
					tabs: withIcons,
					variant: "pills",
					color: "emerald",
					panel,
					$$slots: { panel: true }
				});
			}
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Avec icones",
			description: "Icones SVG dans chaque onglet.",
			code: `<Tabs tabs={[
  { id: 'home', label: 'Accueil', icon: '<svg>...</svg>' },
  { id: 'users', label: 'Utilisateurs', icon: '<svg>...</svg>' },
]} color="emerald" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			{
				function panel($$renderer, id) {
					$$renderer.push(`<p style="color:var(--karbon-text-2);">${escape_html(panelContent[id] || "Contenu...")}</p>`);
				}
				Tabs($$renderer, {
					tabs: withDisabled,
					color: "pink",
					panel,
					$$slots: { panel: true }
				});
			}
		}
		DemoSection($$renderer, {
			title: "Avec onglet desactive",
			description: "Un onglet peut etre desactive.",
			code: `<Tabs tabs={[
  { id: 'active', label: 'Actif' },
  { id: 'locked', label: 'Verrouille', disabled: true },
]} color="pink" />`,
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
				Tabs($$renderer, {
					tabs: basicTabs.slice(0, 3),
					color: c
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Colors",
			description: "6 couleurs disponibles.",
			code: `<Tabs tabs={tabs} color="red" />
<Tabs tabs={tabs} color="emerald" />
<Tabs tabs={tabs} color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-4"><!--[-->`);
			const each_array_2 = ensure_array_like([
				"sm",
				"md",
				"lg"
			]);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let sz = each_array_2[$$index_2];
				$$renderer.push(`<div><span class="text-xs font-semibold uppercase tracking-wider mb-2 block" style="color:var(--karbon-text-4);">${escape_html(sz)}</span> `);
				Tabs($$renderer, {
					tabs: basicTabs.slice(0, 3),
					size: sz,
					color: "violet"
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Sizes",
			description: "3 tailles : sm, md, lg.",
			code: `<Tabs tabs={tabs} size="sm" color="violet" />
<Tabs tabs={tabs} size="md" color="violet" />
<Tabs tabs={tabs} size="lg" color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			{
				function panel($$renderer, id) {
					$$renderer.push(`<p style="color:var(--karbon-text-2);">${escape_html(panelContent[id] || "Contenu...")}</p>`);
				}
				Tabs($$renderer, {
					tabs: basicTabs.slice(0, 3),
					fullWidth: true,
					color: "cyan",
					panel,
					$$slots: { panel: true }
				});
			}
			$$renderer.push(`<!----> <div class="mt-4">`);
			Tabs($$renderer, {
				tabs: basicTabs.slice(0, 3),
				fullWidth: true,
				variant: "segment",
				color: "violet"
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Full width",
			description: "Les onglets occupent toute la largeur.",
			code: `<Tabs tabs={tabs} fullWidth color="cyan" />
<Tabs tabs={tabs} fullWidth variant="segment" color="violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="rounded-xl p-4" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">`);
			{
				function panel($$renderer, id) {
					$$renderer.push(`<p style="color:var(--karbon-text-2);">${escape_html(panelContent[id] || "Contenu...")}</p>`);
				}
				Tabs($$renderer, {
					tabs: basicTabs,
					vertical: true,
					color: "violet",
					panel,
					$$slots: { panel: true }
				});
			}
			$$renderer.push(`<!----></div> <div class="rounded-xl p-4 mt-4" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">`);
			{
				function panel($$renderer, id) {
					$$renderer.push(`<p style="color:var(--karbon-text-2);">${escape_html(panelContent[id] || "Contenu...")}</p>`);
				}
				Tabs($$renderer, {
					tabs: withIcons,
					vertical: true,
					variant: "pills",
					color: "emerald",
					panel,
					$$slots: { panel: true }
				});
			}
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Vertical",
			description: "Orientation verticale avec panel a droite.",
			code: codeVertical,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
