import { T as escape_html, a as ensure_array_like, c as stringify } from "../../../chunks/server.js";
import { O as Radio, _ as CodeBlock } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/radio/+page.svelte
function _page($$renderer) {
	const usageCode = `import { Radio } from '@karbonjs/ui-svelte'

const options = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro', description: 'Priority support' },
  { label: 'Legacy', value: 'legacy', disabled: true },
]

<Radio name="plan" label="Plan" {options} bind:value={plan} />
<Radio name="row" label="Size" {options} direction="row" color="violet" />
<Radio name="styled" {options} variant="elegant" color="emerald" value="pro" />`;
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
	const fruits = [
		{
			label: "Pomme",
			value: "apple"
		},
		{
			label: "Banane",
			value: "banana"
		},
		{
			label: "Cerise",
			value: "cherry"
		}
	];
	const plans = [
		{
			label: "Gratuit",
			value: "free",
			description: "Fonctionnalites de base, 1 projet"
		},
		{
			label: "Pro",
			value: "pro",
			description: "10 projets, support prioritaire"
		},
		{
			label: "Enterprise",
			value: "enterprise",
			description: "Projets illimites, SLA garanti"
		},
		{
			label: "Legacy",
			value: "legacy",
			description: "Plus disponible",
			disabled: true
		}
	];
	let fruit = "apple";
	let plan = "pro";
	let $$settled = true;
	let $$inner_renderer;
	function $$render_inner($$renderer) {
		$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Radio</h1> <p class="text-[var(--karbon-text-3)] mb-8">Boutons radio avec couleurs, tailles, variantes et descriptions.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
		CodeBlock($$renderer, {
			code: usageCode,
			language: "svelte",
			title: "Example.svelte",
			lineCopy: true
		});
		$$renderer.push(`<!----></div> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-8">`);
				Radio($$renderer, {
					name: "fruit-col",
					label: "Fruit (colonne)",
					options: fruits,
					get value() {
						return fruit;
					},
					set value($$value) {
						fruit = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				Radio($$renderer, {
					name: "fruit-row",
					label: "Fruit (ligne)",
					options: fruits,
					direction: "row",
					get value() {
						return fruit;
					},
					set value($$value) {
						fruit = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Basic",
				code: `<Radio name="fruit-col" label="Fruit (colonne)"
  options={fruits} bind:value={fruit} />
<Radio name="fruit-row" label="Fruit (ligne)"
  options={fruits} bind:value={fruit} direction="row" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Radio($$renderer, {
					name: "plan",
					label: "Choisir un plan",
					options: plans,
					get value() {
						return plan;
					},
					set value($$value) {
						plan = $$value;
						$$settled = false;
					}
				});
			}
			DemoSection($$renderer, {
				title: "Avec descriptions",
				code: `<Radio name="plan" label="Choisir un plan" options={plans}
  bind:value={plan} />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-8">`);
				Radio($$renderer, {
					name: "v-filled",
					label: "Filled",
					options: fruits,
					variant: "filled",
					value: "apple",
					color: "violet"
				});
				$$renderer.push(`<!----> `);
				Radio($$renderer, {
					name: "v-outlined",
					label: "Outlined",
					options: fruits,
					variant: "outlined",
					value: "apple",
					color: "violet"
				});
				$$renderer.push(`<!----> `);
				Radio($$renderer, {
					name: "v-ghost",
					label: "Ghost",
					options: fruits,
					variant: "ghost",
					value: "apple",
					color: "violet"
				});
				$$renderer.push(`<!----> `);
				Radio($$renderer, {
					name: "v-elegant",
					label: "Elegant",
					options: fruits,
					variant: "elegant",
					value: "apple",
					color: "violet"
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Variants",
				code: `<Radio name="v-filled" label="Filled" options={fruits}
  variant="filled" value="apple" color="violet" />
<Radio name="v-elegant" label="Elegant" options={fruits}
  variant="elegant" value="apple" color="violet" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-6"><!--[-->`);
				const each_array = ensure_array_like(colors);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let c = each_array[$$index];
					Radio($$renderer, {
						name: `color-${stringify(c)}`,
						label: c,
						options: fruits,
						color: c,
						value: "apple"
					});
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Colors",
				code: `<Radio name="color-emerald" label="emerald"
  options={fruits} color="emerald" value="apple" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-8">`);
				Radio($$renderer, {
					name: "sz-sm",
					label: "Small",
					options: fruits,
					size: "sm",
					value: "apple",
					color: "blue"
				});
				$$renderer.push(`<!----> `);
				Radio($$renderer, {
					name: "sz-md",
					label: "Medium",
					options: fruits,
					size: "md",
					value: "apple",
					color: "blue"
				});
				$$renderer.push(`<!----> `);
				Radio($$renderer, {
					name: "sz-lg",
					label: "Large",
					options: fruits,
					size: "lg",
					value: "apple",
					color: "blue"
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Sizes",
				code: `<Radio name="sz-sm" label="Small" options={fruits} size="sm" value="apple" color="blue" />
<Radio name="sz-md" label="Medium" options={fruits} size="md" value="apple" color="blue" />
<Radio name="sz-lg" label="Large" options={fruits} size="lg" value="apple" color="blue" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<!--[-->`);
				const each_array_1 = ensure_array_like([
					"filled",
					"outlined",
					"ghost",
					"elegant"
				]);
				for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
					let v = each_array_1[$$index_2];
					$$renderer.push(`<h3 class="text-sm font-semibold text-[var(--karbon-text-3)] uppercase tracking-wider mb-2 mt-4">${escape_html(v)}</h3> <div class="flex flex-wrap gap-6"><!--[-->`);
					const each_array_2 = ensure_array_like([
						"emerald",
						"violet",
						"cyan",
						"pink"
					]);
					for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
						let c = each_array_2[$$index_1];
						Radio($$renderer, {
							name: `vc-${stringify(v)}-${stringify(c)}`,
							options: fruits,
							variant: v,
							color: c,
							value: "apple",
							direction: "row"
						});
					}
					$$renderer.push(`<!--]--></div>`);
				}
				$$renderer.push(`<!--]-->`);
			}
			DemoSection($$renderer, {
				title: "Variants × Colors",
				code: `<Radio name="vc-filled-emerald" options={fruits}
  variant="filled" color="emerald" value="apple" direction="row" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Radio($$renderer, {
					name: "disabled",
					label: "Tout desactive",
					options: fruits,
					value: "apple",
					disabled: true
				});
			}
			DemoSection($$renderer, {
				title: "Disabled",
				code: `<Radio name="disabled" label="Tout desactive"
  options={fruits} value="apple" disabled />`,
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
