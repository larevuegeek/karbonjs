import { T as escape_html, a as ensure_array_like } from "../../../chunks/server.js";
import { F as Button, S as Toast, _ as CodeBlock } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/toast/+page.svelte
function _page($$renderer) {
	const usageCode = `<script lang="ts">
  import { Toast } from '@karbonjs/ui-svelte'

  let show = $state(false)
<\/script>

{#if show}
  <Toast
    type="success"
    title="Sauvegarde"
    message="Article publie avec succes !"
    position="top-right"
    duration={5000}
    showProgress
    onclose={() => show = false}
  />
{/if}`;
	let toasts = [];
	let nextId = 0;
	function add(opts) {
		const toast = {
			id: ++nextId,
			type: "info",
			message: "",
			...opts
		};
		toasts = [...toasts, toast];
	}
	function remove(id) {
		toasts = toasts.filter((t) => t.id !== id);
	}
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Toast</h1> <p class="text-[var(--karbon-text-3)] mb-8">Notifications temporaires avec countdown, positions, variantes et actions.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
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
			Button($$renderer, {
				color: "emerald",
				variant: "flat",
				size: "sm",
				onclick: () => add({
					type: "success",
					title: "Succes",
					message: "Article publie avec succes !"
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Success`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				color: "red",
				variant: "flat",
				size: "sm",
				onclick: () => add({
					type: "error",
					title: "Erreur",
					message: "Impossible de sauvegarder les modifications."
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Error`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				color: "amber",
				variant: "flat",
				size: "sm",
				onclick: () => add({
					type: "warning",
					title: "Attention",
					message: "Votre session expire dans 5 minutes."
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Warning`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				color: "blue",
				variant: "flat",
				size: "sm",
				onclick: () => add({
					type: "info",
					title: "Information",
					message: "Mise a jour disponible."
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Info`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Types",
			description: "4 types de toast : success, error, warning, info.",
			code: `<Toast type="success" message="Article publie !" />
<Toast type="error" message="Impossible de sauvegarder." />
<Toast type="warning" message="Session expire bientot." />
<Toast type="info" message="Mise a jour disponible." />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2">`);
			Button($$renderer, {
				variant: "outline",
				color: "slate",
				size: "sm",
				onclick: () => add({
					type: "success",
					variant: "default",
					message: "Toast default"
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Default`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "outline",
				color: "slate",
				size: "sm",
				onclick: () => add({
					type: "success",
					variant: "filled",
					message: "Toast filled"
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Filled`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "outline",
				color: "slate",
				size: "sm",
				onclick: () => add({
					type: "success",
					variant: "bordered",
					message: "Toast bordered"
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Bordered`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> <div class="flex flex-wrap gap-2 mt-2">`);
			Button($$renderer, {
				variant: "outline",
				color: "slate",
				size: "sm",
				onclick: () => add({
					type: "error",
					variant: "default",
					message: "Error default"
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Error default`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "outline",
				color: "slate",
				size: "sm",
				onclick: () => add({
					type: "error",
					variant: "filled",
					message: "Error filled"
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Error filled`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "outline",
				color: "slate",
				size: "sm",
				onclick: () => add({
					type: "error",
					variant: "bordered",
					message: "Error bordered"
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Error bordered`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Variants",
			description: "3 variantes visuelles : default, filled, bordered.",
			code: `<Toast type="success" variant="default" message="Toast default" />
<Toast type="success" variant="filled" message="Toast filled" />
<Toast type="success" variant="bordered" message="Toast bordered" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2">`);
			Button($$renderer, {
				variant: "flat",
				color: "violet",
				size: "sm",
				onclick: () => add({
					type: "info",
					title: "Nouvelle fonctionnalite",
					message: "L'editeur WYSIWYG a ete ameliore avec de nouvelles options."
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Avec titre`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "flat",
				color: "emerald",
				size: "sm",
				onclick: () => add({
					type: "success",
					title: "Sauvegarde",
					message: "Toutes les modifications ont ete enregistrees."
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Sauvegarde`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Avec titre",
			description: "Toast avec titre et message.",
			code: `<Toast
  type="info"
  title="Nouvelle fonctionnalite"
  message="L'editeur a ete ameliore."
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
				"violet",
				"cyan",
				"pink",
				"emerald",
				"amber",
				"blue"
			]);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let c = each_array[$$index];
				Button($$renderer, {
					color: c,
					variant: "flat",
					size: "sm",
					onclick: () => add({
						type: "info",
						color: c,
						message: `Toast ${c}`
					}),
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(c)}`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-2 mt-2"><!--[-->`);
			const each_array_1 = ensure_array_like([
				"violet",
				"cyan",
				"pink"
			]);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let c = each_array_1[$$index_1];
				Button($$renderer, {
					color: c,
					variant: "flat",
					size: "sm",
					onclick: () => add({
						type: "info",
						color: c,
						variant: "filled",
						message: `Filled ${c}`
					}),
					children: ($$renderer) => {
						$$renderer.push(`<!---->Filled ${escape_html(c)}`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Couleurs custom",
			description: "Couleurs personnalisees via le prop color.",
			code: `<Toast type="info" color="violet" message="Toast violet" />
<Toast type="info" color="cyan" message="Toast cyan" />
<Toast type="info" color="pink" variant="filled" message="Filled pink" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="grid grid-cols-3 gap-2 max-w-sm">`);
			Button($$renderer, {
				size: "xs",
				variant: "outline",
				color: "slate",
				onclick: () => add({
					type: "info",
					message: "Top left",
					position: "top-left"
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->top-left`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				size: "xs",
				variant: "outline",
				color: "slate",
				onclick: () => add({
					type: "info",
					message: "Top center",
					position: "top-center"
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->top-center`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				size: "xs",
				variant: "outline",
				color: "slate",
				onclick: () => add({
					type: "info",
					message: "Top right",
					position: "top-right"
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->top-right`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				size: "xs",
				variant: "outline",
				color: "slate",
				onclick: () => add({
					type: "info",
					message: "Bottom left",
					position: "bottom-left"
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->bottom-left`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				size: "xs",
				variant: "outline",
				color: "slate",
				onclick: () => add({
					type: "info",
					message: "Bottom center",
					position: "bottom-center"
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->bottom-center`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				size: "xs",
				variant: "outline",
				color: "slate",
				onclick: () => add({
					type: "info",
					message: "Bottom right",
					position: "bottom-right"
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->bottom-right`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Positions",
			description: "6 positions d'affichage.",
			code: `<Toast message="Top right" position="top-right" />
<Toast message="Top center" position="top-center" />
<Toast message="Bottom left" position="bottom-left" />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2">`);
			Button($$renderer, {
				variant: "flat",
				size: "sm",
				onclick: () => add({
					type: "info",
					message: "2 secondes",
					duration: 2e3
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->2s`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "flat",
				size: "sm",
				onclick: () => add({
					type: "info",
					message: "5 secondes (default)",
					duration: 5e3
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->5s`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "flat",
				size: "sm",
				onclick: () => add({
					type: "info",
					message: "10 secondes",
					duration: 1e4
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->10s`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "flat",
				size: "sm",
				onclick: () => add({
					type: "warning",
					message: "Persistent (hover pour pause)",
					duration: 0,
					showProgress: false
				}),
				children: ($$renderer) => {
					$$renderer.push(`<!---->Persistent`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> <p class="text-xs mt-2" style="color:var(--karbon-text-4);">Survolez un toast pour mettre le countdown en pause.</p>`);
		}
		DemoSection($$renderer, {
			title: "Duree",
			description: "Controle la duree d'affichage. Survolez pour mettre en pause.",
			code: `<Toast message="2 secondes" duration={2000} />
<Toast message="5 secondes" duration={5000} />
<Toast message="Persistent" duration={0} />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> <!--[-->`);
	const each_array_2 = ensure_array_like(toasts);
	for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
		let toast = each_array_2[$$index_2];
		Toast($$renderer, {
			type: toast.type,
			variant: toast.variant,
			color: toast.color,
			title: toast.title,
			message: toast.message,
			position: toast.position || "top-right",
			duration: toast.duration ?? 5e3,
			showProgress: toast.showProgress ?? true,
			onclose: () => remove(toast.id),
			children: ($$renderer) => {
				if (toast.hasAction) $$renderer.push("<!--[0-->");
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!--]-->`);
}
//#endregion
export { _page as default };
