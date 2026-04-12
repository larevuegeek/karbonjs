import { a as ensure_array_like, c as stringify } from "../../../chunks/server.js";
import { F as Button, T as AlertMessage, _ as CodeBlock } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/alert/+page.svelte
function _page($$renderer) {
	const usageCode = `import { AlertMessage } from '@karbonjs/ui-svelte'

<AlertMessage type="success" message="Saved!" />
<AlertMessage type="error" title="Error" message="Something went wrong." dismissible />
<AlertMessage type="info" variant="bordered" title="Note">
  {#snippet actions()}
    <Button size="xs">Retry</Button>
  {/snippet}
</AlertMessage>`;
	const colors = [
		"red",
		"orange",
		"amber",
		"emerald",
		"cyan",
		"blue",
		"violet",
		"pink"
	];
	let dismissed = false;
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">AlertMessage</h1> <p class="text-[var(--karbon-text-3)] mb-8">Messages d'alerte avec types, variantes, couleurs, titre, actions et dismiss.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
	CodeBlock($$renderer, {
		code: usageCode,
		language: "svelte",
		title: "Example.svelte",
		lineCopy: true
	});
	$$renderer.push(`<!----></div> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3">`);
			AlertMessage($$renderer, {
				type: "success",
				message: "Operation reussie avec succes !"
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "error",
				message: "Une erreur critique est survenue."
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "warning",
				message: "Attention, cette action est irreversible."
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "info",
				message: "Une nouvelle mise a jour est disponible."
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Types",
			code: `<AlertMessage type="success" message="Operation reussie !" />
<AlertMessage type="error" message="Une erreur est survenue." />
<AlertMessage type="warning" message="Attention !" />
<AlertMessage type="info" message="Information." />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Soft (default)</h3> <div class="space-y-2">`);
			AlertMessage($$renderer, {
				type: "success",
				variant: "soft",
				message: "Soft success"
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "error",
				variant: "soft",
				message: "Soft error"
			});
			$$renderer.push(`<!----></div> <h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Filled</h3> <div class="space-y-2">`);
			AlertMessage($$renderer, {
				type: "success",
				variant: "filled",
				message: "Filled success"
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "error",
				variant: "filled",
				message: "Filled error"
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "warning",
				variant: "filled",
				message: "Filled warning"
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "info",
				variant: "filled",
				message: "Filled info"
			});
			$$renderer.push(`<!----></div> <h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Outline</h3> <div class="space-y-2">`);
			AlertMessage($$renderer, {
				type: "success",
				variant: "outline",
				message: "Outline success"
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "error",
				variant: "outline",
				message: "Outline error"
			});
			$$renderer.push(`<!----></div> <h3 class="text-sm font-semibold mb-2 mt-4" style="color: var(--karbon-text-3);">Bordered (left bar)</h3> <div class="space-y-2">`);
			AlertMessage($$renderer, {
				type: "success",
				variant: "bordered",
				message: "Bordered success"
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "error",
				variant: "bordered",
				message: "Bordered error"
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "warning",
				variant: "bordered",
				message: "Bordered warning"
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "info",
				variant: "bordered",
				message: "Bordered info"
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Variants",
			description: "Soft, Filled, Outline et Bordered",
			code: `<AlertMessage type="success" variant="soft" message="Soft" />
<AlertMessage type="error" variant="filled" message="Filled" />
<AlertMessage type="success" variant="outline" message="Outline" />
<AlertMessage type="info" variant="bordered" message="Bordered" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3">`);
			AlertMessage($$renderer, {
				type: "success",
				title: "Sauvegarde reussie",
				message: "Vos modifications ont ete enregistrees avec succes."
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "error",
				title: "Erreur de connexion",
				message: "Impossible de se connecter au serveur. Veuillez reessayer."
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "warning",
				title: "Espace disque faible",
				message: "Il ne reste que 2 Go d'espace disponible sur votre serveur."
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "info",
				title: "Mise a jour v2.0",
				message: "De nouvelles fonctionnalites sont disponibles. Consultez le changelog."
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Avec titre",
			code: `<AlertMessage type="success" title="Sauvegarde reussie"
  message="Vos modifications ont ete enregistrees." />
<AlertMessage type="error" title="Erreur de connexion"
  message="Impossible de se connecter au serveur." />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3">`);
			AlertMessage($$renderer, {
				type: "error",
				variant: "bordered",
				title: "Erreur critique",
				message: "Le service de paiement est temporairement indisponible."
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "warning",
				variant: "bordered",
				title: "Maintenance prevue",
				message: "Le site sera en maintenance le 25 mars de 2h a 4h."
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Titre + Bordered",
			code: `<AlertMessage type="error" variant="bordered"
  title="Erreur critique"
  message="Le service est indisponible." />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3">`);
			AlertMessage($$renderer, {
				type: "info",
				message: "Vous pouvez fermer cette alerte.",
				dismissible: true
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "success",
				variant: "filled",
				message: "Alerte filled dismissible.",
				dismissible: true
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "warning",
				variant: "bordered",
				title: "Notification",
				message: "Cliquez sur la croix pour fermer.",
				dismissible: true
			});
			$$renderer.push(`<!----></div> `);
			if (!dismissed) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="mt-3">`);
				AlertMessage($$renderer, {
					type: "error",
					title: "Alerte avec callback",
					message: "Fermer cette alerte affiche un message.",
					dismissible: true,
					ondismiss: () => dismissed = true
				});
				$$renderer.push(`<!----></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<p class="mt-3 text-xs" style="color: var(--karbon-text-3);">Alerte fermee ! <button class="underline cursor-pointer">Reafficher</button></p>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		DemoSection($$renderer, {
			title: "Dismissible",
			code: `<AlertMessage type="info" message="Fermable." dismissible />
<AlertMessage type="error" title="Avec callback"
  message="..." dismissible ondismiss={() => {}} />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3">`);
			{
				function actions($$renderer) {
					Button($$renderer, {
						size: "xs",
						variant: "flat",
						color: "blue",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Mettre a jour`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					Button($$renderer, {
						size: "xs",
						variant: "ghost",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Plus tard`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!---->`);
				}
				AlertMessage($$renderer, {
					type: "info",
					title: "Nouvelle version",
					message: "La version 3.0 est disponible avec des ameliorations majeures.",
					actions,
					$$slots: { actions: true }
				});
			}
			$$renderer.push(`<!----> `);
			{
				function actions($$renderer) {
					Button($$renderer, {
						size: "xs",
						color: "red",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Se reconnecter`);
						},
						$$slots: { default: true }
					});
				}
				AlertMessage($$renderer, {
					type: "error",
					variant: "bordered",
					title: "Session expiree",
					message: "Votre session a expire. Reconnectez-vous pour continuer.",
					actions,
					$$slots: { actions: true }
				});
			}
			$$renderer.push(`<!----> `);
			{
				function actions($$renderer) {
					Button($$renderer, {
						size: "xs",
						variant: "outline",
						class: "border-white/30! text-white!",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Augmenter`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					Button($$renderer, {
						size: "xs",
						variant: "ghost",
						class: "text-white/70!",
						children: ($$renderer) => {
							$$renderer.push(`<!---->Ignorer`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!---->`);
				}
				AlertMessage($$renderer, {
					type: "warning",
					variant: "filled",
					title: "Quota atteint",
					message: "Vous avez atteint 90% de votre quota de stockage.",
					dismissible: true,
					actions,
					$$slots: { actions: true }
				});
			}
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Avec actions",
			code: `<AlertMessage type="info" title="Nouvelle version" message="...">
  {#snippet actions()}
    <Button size="xs" variant="flat" color="blue">Mettre a jour</Button>
  {/snippet}
</AlertMessage>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-2"><!--[-->`);
			const each_array = ensure_array_like(colors);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let c = each_array[$$index];
				AlertMessage($$renderer, {
					color: c,
					message: `Alerte avec couleur ${stringify(c)}`
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Couleurs custom",
			code: `<AlertMessage color="violet" message="Alerte avec couleur violet" />
<AlertMessage color="cyan" message="Alerte avec couleur cyan" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-2"><!--[-->`);
			const each_array_1 = ensure_array_like(colors);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let c = each_array_1[$$index_1];
				AlertMessage($$renderer, {
					color: c,
					variant: "filled",
					message: `Filled ${stringify(c)}`
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Couleurs × Filled",
			code: `<AlertMessage color="violet" variant="filled" message="Filled violet" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			AlertMessage($$renderer, {
				type: "info",
				icon: false,
				message: "Alerte sans icone — parfois moins c'est plus."
			});
		}
		DemoSection($$renderer, {
			title: "Sans icone",
			code: `<AlertMessage type="info" icon={false} message="Alerte sans icone." />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			{
				function children($$renderer) {
					$$renderer.push(`<ul class="list-disc list-inside space-y-1 text-sm opacity-80"><li><kbd class="px-1 rounded text-xs" style="background:var(--karbon-bg-2);">Ctrl+S</kbd> — Sauvegarder</li> <li><kbd class="px-1 rounded text-xs" style="background:var(--karbon-bg-2);">Ctrl+Z</kbd> — Annuler</li> <li><kbd class="px-1 rounded text-xs" style="background:var(--karbon-bg-2);">Ctrl+K</kbd> — Rechercher</li></ul>`);
				}
				AlertMessage($$renderer, {
					type: "info",
					title: "Raccourcis clavier",
					children,
					$$slots: { default: true }
				});
			}
		}
		DemoSection($$renderer, {
			title: "Contenu custom (children)",
			code: `<AlertMessage type="info" title="Raccourcis clavier">
  {#snippet children()}
    <ul><li>Ctrl+S — Sauvegarder</li></ul>
  {/snippet}
</AlertMessage>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
