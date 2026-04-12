import { T as escape_html, a as ensure_array_like } from "../../chunks/server.js";
import { E as Badge, F as Button, T as AlertMessage, a as Divider, b as Card, c as Avatar, i as Kbd, l as Tooltip, s as Progress } from "../../chunks/src.js";
//#region src/routes/+page.svelte
function _page($$renderer) {
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
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">KarbonJS <span class="text-[var(--karbon-primary)]">Playground</span></h1> <p class="text-[var(--karbon-text-3)] mb-8 text-lg">Explorez tous les composants, couleurs et themes. Selectionnez un composant dans le menu a gauche.</p> `);
	Divider($$renderer, { label: "Apercu rapide" });
	$$renderer.push(`<!----> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">`);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2">`);
			Button($$renderer, {
				children: ($$renderer) => {
					$$renderer.push(`<!---->Solid`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "flat",
				color: "violet",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Flat`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "bordered",
				color: "emerald",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Bordered`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "neon",
				color: "cyan",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Neon`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "shadow",
				color: "blue",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Shadow`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				variant: "light",
				color: "pink",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Light`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> <div class="flex flex-wrap gap-2 mt-3"><!--[-->`);
			const each_array = ensure_array_like(colors);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let color = each_array[$$index];
				Button($$renderer, {
					color,
					size: "sm",
					shape: "pill",
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(color)}`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		Card($$renderer, {
			title: "Buttons",
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-2 mb-3"><!--[-->`);
			const each_array_1 = ensure_array_like(colors);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let color = each_array_1[$$index_1];
				Badge($$renderer, {
					color,
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(color)}`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-2"><!--[-->`);
			const each_array_2 = ensure_array_like(colors);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let color = each_array_2[$$index_2];
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
		Card($$renderer, {
			title: "Badges",
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-2">`);
			AlertMessage($$renderer, {
				type: "success",
				message: "Operation reussie !"
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "error",
				message: "Erreur critique."
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "warning",
				message: "Attention !"
			});
			$$renderer.push(`<!----> `);
			AlertMessage($$renderer, {
				type: "info",
				message: "Info utile."
			});
			$$renderer.push(`<!----></div>`);
		}
		Card($$renderer, {
			title: "Alerts",
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-4"><div class="flex gap-3">`);
			Avatar($$renderer, { name: "Alice Martin" });
			$$renderer.push(`<!----> `);
			Avatar($$renderer, {
				name: "Bob Dupont",
				color: "emerald"
			});
			$$renderer.push(`<!----> `);
			Avatar($$renderer, {
				name: "Claire Morel",
				color: "violet"
			});
			$$renderer.push(`<!----> `);
			Avatar($$renderer, {
				src: "https://picsum.photos/seed/avatar1/100/100",
				name: "Photo"
			});
			$$renderer.push(`<!----></div> `);
			Progress($$renderer, {
				value: 65,
				color: "blue"
			});
			$$renderer.push(`<!----> `);
			Progress($$renderer, {
				value: 45,
				color: "emerald"
			});
			$$renderer.push(`<!----> <div class="flex items-center gap-4">`);
			Tooltip($$renderer, {
				text: "Raccourci clavier",
				children: ($$renderer) => {
					$$renderer.push(`<span class="text-[var(--karbon-text-2)] underline cursor-help text-sm">Survolez-moi</span>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Kbd($$renderer, { keys: ["Ctrl", "S"] });
			$$renderer.push(`<!----> `);
			Kbd($$renderer, { keys: ["Cmd", "K"] });
			$$renderer.push(`<!----></div></div>`);
		}
		Card($$renderer, {
			title: "Feedback",
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----></div> <div class="mt-10 p-6 rounded-xl border border-[var(--karbon-border)] bg-[var(--karbon-bg-2)]"><h3 class="font-semibold mb-2">Fonctionnalites du design system</h3> <ul class="text-sm text-[var(--karbon-text-2)] space-y-1 list-disc list-inside"><li><strong>12 couleurs</strong> × 11 nuances = 132 variables CSS</li> <li><strong>10 themes</strong> (midnight, aurora, neon, corporate, forest...)</li> <li><strong>34 composants</strong> Svelte 5 + 34 React</li> <li><strong>8 variants bouton</strong> : solid, flat, bordered, light, ghost, shadow, neon, danger</li> <li><strong>4 shapes</strong> : rounded, pill, square, soft</li> <li><strong>Classes override</strong> sur chaque element interne</li> <li><strong>Zero @apply</strong> — CSS pur + Tailwind classes</li> <li><strong>WYSIWYG</strong> avec explorateur de fichiers integre</li></ul></div>`);
}
//#endregion
export { _page as default };
