import { T as escape_html, a as ensure_array_like } from "../../../chunks/server.js";
import { C as Dialog, F as Button, _ as CodeBlock } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/dialog/+page.svelte
function _page($$renderer) {
	const usageCode = `<script lang="ts">
  import { Dialog, Button } from '@karbonjs/ui-svelte'

  let open = $state(false)
<\/script>

<Button color="red" onclick={() => open = true}>Supprimer</Button>

<Dialog
  bind:open
  title="Supprimer definitivement"
  message="Cette action est irreversible."
  variant="danger"
  confirmLabel="Supprimer"
  confirmInput="Supprimer"
  confirmInputLabel="Tapez 'Supprimer' pour confirmer"
  onconfirm={() => open = false}
  oncancel={() => open = false}
/>`;
	const codeCustom = `<Dialog bind:open title="Permissions" variant="warning">
  {#snippet children()}
    <ul>
      <li>Acces a la camera</li>
      <li>Acces au microphone</li>
    </ul>
  {/snippet}
</Dialog>`;
	let basic = false;
	let variants = {
		info: false,
		warning: false,
		danger: false,
		success: false
	};
	let withConfirm = false;
	let withLoading = false;
	let withChildren = false;
	let colored = false;
	let loadingState = false;
	function simulateLoading() {
		withLoading = true;
		loadingState = true;
		setTimeout(() => {
			loadingState = false;
			withLoading = false;
		}, 2e3);
	}
	let $$settled = true;
	let $$inner_renderer;
	function $$render_inner($$renderer) {
		$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Dialog</h1> <p class="text-[var(--karbon-text-3)] mb-8">Boites de dialogue de confirmation avec variantes, input de confirmation et loading.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
		CodeBlock($$renderer, {
			code: usageCode,
			language: "svelte",
			title: "Example.svelte",
			lineCopy: true
		});
		$$renderer.push(`<!----></div> `);
		{
			function children($$renderer) {
				Button($$renderer, {
					onclick: () => basic = true,
					children: ($$renderer) => {
						$$renderer.push(`<!---->Ouvrir Dialog`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				Dialog($$renderer, {
					title: "Confirmer l'action",
					message: "Etes-vous sur de vouloir continuer ? Cette action peut etre annulee.",
					onconfirm: () => basic = false,
					oncancel: () => basic = false,
					get open() {
						return basic;
					},
					set open($$value) {
						basic = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Basic",
				description: "Dialog simple de confirmation.",
				code: `<Dialog
  bind:open
  title="Confirmer l'action"
  message="Etes-vous sur de vouloir continuer ?"
  onconfirm={() => open = false}
  oncancel={() => open = false}
/>`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
				const each_array = ensure_array_like([
					"info",
					"warning",
					"danger",
					"success"
				]);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let v = each_array[$$index];
					Button($$renderer, {
						color: v === "info" ? "blue" : v === "warning" ? "amber" : v === "danger" ? "red" : "emerald",
						variant: "flat",
						onclick: () => variants = {
							...variants,
							[v]: true
						},
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(v)}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					Dialog($$renderer, {
						open: variants[v],
						title: v === "info" ? "Information" : v === "warning" ? "Attention" : v === "danger" ? "Suppression" : "Succes",
						message: v === "info" ? "Voici une information importante a prendre en compte." : v === "warning" ? "Cette action pourrait avoir des consequences inattendues." : v === "danger" ? "Cette action est irreversible. Toutes les donnees seront perdues." : "L'operation a ete effectuee avec succes.",
						variant: v,
						confirmLabel: v === "danger" ? "Supprimer" : v === "success" ? "Parfait" : "Continuer",
						onconfirm: () => variants = {
							...variants,
							[v]: false
						},
						oncancel: () => variants = {
							...variants,
							[v]: false
						}
					});
					$$renderer.push(`<!---->`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Variants",
				description: "4 variantes : info, warning, danger, success.",
				code: `<Dialog open={open} title="Information" variant="info" />
<Dialog open={open} title="Attention" variant="warning" />
<Dialog open={open} title="Suppression" variant="danger" />
<Dialog open={open} title="Succes" variant="success" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Button($$renderer, {
					color: "red",
					variant: "flat",
					onclick: () => withConfirm = true,
					children: ($$renderer) => {
						$$renderer.push(`<!---->Supprimer le compte`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				Dialog($$renderer, {
					title: "Supprimer definitivement",
					message: "Cette action va supprimer votre compte et toutes les donnees associees. C'est irreversible.",
					variant: "danger",
					confirmLabel: "Supprimer mon compte",
					cancelLabel: "Non, garder mon compte",
					confirmInput: "Supprimer",
					confirmInputLabel: "Tapez 'Supprimer' pour confirmer",
					onconfirm: () => withConfirm = false,
					oncancel: () => withConfirm = false,
					get open() {
						return withConfirm;
					},
					set open($$value) {
						withConfirm = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Input de confirmation",
				description: "L'utilisateur doit taper un mot pour confirmer.",
				code: `<Dialog
  bind:open
  title="Supprimer definitivement"
  variant="danger"
  confirmInput="Supprimer"
  confirmInputLabel="Tapez 'Supprimer' pour confirmer"
/>`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Button($$renderer, {
					variant: "flat",
					color: "violet",
					onclick: simulateLoading,
					children: ($$renderer) => {
						$$renderer.push(`<!---->Avec loading (2s)`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				Dialog($$renderer, {
					title: "Enregistrement",
					message: "Vos modifications vont etre sauvegardees.",
					variant: "info",
					confirmLabel: "Sauvegarder",
					loading: loadingState,
					onconfirm: () => {},
					oncancel: () => {
						withLoading = false;
						loadingState = false;
					},
					get open() {
						return withLoading;
					},
					set open($$value) {
						withLoading = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Avec loading",
				description: "Etat de chargement pendant la confirmation.",
				code: `<Dialog
  bind:open
  title="Enregistrement"
  variant="info"
  loading={loadingState}
/>`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Button($$renderer, {
					variant: "flat",
					color: "amber",
					onclick: () => withChildren = true,
					children: ($$renderer) => {
						$$renderer.push(`<!---->Avec contenu custom`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				{
					function children($$renderer) {
						$$renderer.push(`<div class="text-left space-y-2 text-sm" style="color:var(--karbon-text-2);"><p>L'application demande les permissions suivantes :</p> <ul class="space-y-1.5 pl-4"><li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces a la camera</li> <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces au microphone</li> <li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--karbon-amber-400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Acces aux fichiers</li></ul></div>`);
					}
					Dialog($$renderer, {
						title: "Permissions requises",
						variant: "warning",
						confirmLabel: "Autoriser",
						onconfirm: () => withChildren = false,
						oncancel: () => withChildren = false,
						get open() {
							return withChildren;
						},
						set open($$value) {
							withChildren = $$value;
							$$settled = false;
						},
						children,
						$$slots: { default: true }
					});
				}
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Contenu custom",
				description: "Injectez du contenu riche via le snippet children.",
				code: codeCustom,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
				const each_array_1 = ensure_array_like([
					"violet",
					"cyan",
					"pink",
					"emerald"
				]);
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let c = each_array_1[$$index_1];
					Button($$renderer, {
						color: c,
						variant: "flat",
						onclick: () => colored = true,
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(c)}`);
						},
						$$slots: { default: true }
					});
				}
				$$renderer.push(`<!--]--></div> `);
				Dialog($$renderer, {
					title: "Publier l'article",
					message: "L'article sera visible par tous les visiteurs du site.",
					color: "violet",
					confirmLabel: "Publier",
					onconfirm: () => colored = false,
					oncancel: () => colored = false,
					get open() {
						return colored;
					},
					set open($$value) {
						colored = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Couleur custom",
				description: "Utilisez n'importe quelle couleur du theme.",
				code: `<Dialog
  bind:open
  title="Publier l'article"
  message="L'article sera visible par tous."
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
