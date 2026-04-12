import { T as escape_html, a as ensure_array_like, c as stringify } from "../../../chunks/server.js";
import { M as Select, _ as CodeBlock } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/select/+page.svelte
function _page($$renderer) {
	const usageCode = `import { Select } from '@karbonjs/ui-svelte'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]

<Select name="fruit" label="Fruit" {options} bind:value={selected} placeholder="Choose..." />
<Select name="multi" label="Tags" {options} bind:values={tags} multiple searchable clearable />
<Select name="styled" label="Color" {options} color="violet" inputVariant="filled" />`;
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
		},
		{
			label: "Fraise",
			value: "strawberry"
		},
		{
			label: "Mangue",
			value: "mango"
		},
		{
			label: "Kiwi",
			value: "kiwi"
		},
		{
			label: "Orange",
			value: "orange"
		},
		{
			label: "Raisin",
			value: "grape"
		}
	];
	const withDisabled = [
		{
			label: "Option 1",
			value: "1"
		},
		{
			label: "Option 2 (disabled)",
			value: "2",
			disabled: true
		},
		{
			label: "Option 3",
			value: "3"
		},
		{
			label: "Option 4 (disabled)",
			value: "4",
			disabled: true
		},
		{
			label: "Option 5",
			value: "5"
		}
	];
	const countries = [
		{
			label: "France",
			value: "fr"
		},
		{
			label: "Belgique",
			value: "be"
		},
		{
			label: "Suisse",
			value: "ch"
		},
		{
			label: "Canada",
			value: "ca"
		},
		{
			label: "Luxembourg",
			value: "lu"
		},
		{
			label: "Monaco",
			value: "mc"
		},
		{
			label: "Tunisie",
			value: "tn"
		},
		{
			label: "Maroc",
			value: "ma"
		},
		{
			label: "Senegal",
			value: "sn"
		},
		{
			label: "Cote d'Ivoire",
			value: "ci"
		}
	];
	let singleValue = "";
	let multiValues = [];
	let searchValue = "";
	let coloredValue = "";
	let $$settled = true;
	let $$inner_renderer;
	function $$render_inner($$renderer) {
		$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Select</h1> <p class="text-[var(--karbon-text-3)] mb-8">Selecteur custom avec dropdown, recherche, multi-select et chips.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
		CodeBlock($$renderer, {
			code: usageCode,
			language: "svelte",
			title: "Example.svelte",
			lineCopy: true
		});
		$$renderer.push(`<!----></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8">`);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="space-y-4">`);
				Select($$renderer, {
					name: "basic",
					label: "Fruit prefere",
					options: fruits,
					placeholder: "Choisir un fruit...",
					get value() {
						return singleValue;
					},
					set value($$value) {
						singleValue = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> <p class="text-xs text-[var(--karbon-text-3)]">Valeur: ${escape_html(singleValue || "aucune")}</p></div>`);
			}
			DemoSection($$renderer, {
				title: "Simple",
				code: `<Select name="basic" label="Fruit prefere"
  options={fruits} bind:value={val}
  placeholder="Choisir un fruit..." />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Select($$renderer, {
					name: "clearable",
					label: "Avec effacement",
					options: fruits,
					clearable: true,
					placeholder: "Choisir...",
					get value() {
						return singleValue;
					},
					set value($$value) {
						singleValue = $$value;
						$$settled = false;
					}
				});
			}
			DemoSection($$renderer, {
				title: "Clearable",
				code: `<Select name="clearable" label="Avec effacement"
  options={fruits} bind:value={val} clearable />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Select($$renderer, {
					name: "search",
					label: "Pays",
					options: countries,
					searchable: true,
					placeholder: "Rechercher un pays...",
					get value() {
						return searchValue;
					},
					set value($$value) {
						searchValue = $$value;
						$$settled = false;
					}
				});
			}
			DemoSection($$renderer, {
				title: "Avec recherche",
				code: `<Select name="search" label="Pays"
  options={countries} bind:value={val} searchable />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="space-y-4">`);
				Select($$renderer, {
					name: "multi",
					label: "Fruits (multiple)",
					options: fruits,
					multiple: true,
					clearable: true,
					placeholder: "Selectionner...",
					get values() {
						return multiValues;
					},
					set values($$value) {
						multiValues = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> <p class="text-xs text-[var(--karbon-text-3)]">Valeurs: ${escape_html(multiValues.join(", ") || "aucune")}</p></div>`);
			}
			DemoSection($$renderer, {
				title: "Multi-select (chips)",
				code: `<Select name="multi" label="Fruits (multiple)"
  options={fruits} bind:values={vals}
  multiple clearable />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Select($$renderer, {
					name: "multi-search",
					label: "Pays (multi + recherche)",
					options: countries,
					multiple: true,
					searchable: true,
					clearable: true,
					placeholder: "Rechercher et selectionner...",
					get values() {
						return multiValues;
					},
					set values($$value) {
						multiValues = $$value;
						$$settled = false;
					}
				});
			}
			DemoSection($$renderer, {
				title: "Multi + Recherche",
				code: `<Select name="multi-search" label="Pays"
  options={countries} bind:values={vals}
  multiple searchable clearable />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Select($$renderer, {
					name: "disabled-opts",
					label: "Avec options disabled",
					options: withDisabled,
					get value() {
						return singleValue;
					},
					set value($$value) {
						singleValue = $$value;
						$$settled = false;
					}
				});
			}
			DemoSection($$renderer, {
				title: "Options desactivees",
				code: `const opts = [
  { label: 'Option 2', value: '2', disabled: true },
]
<Select name="dis" options={opts} bind:value={val} />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Select($$renderer, {
					name: "disabled",
					label: "Disabled",
					options: fruits,
					value: "apple",
					disabled: true
				});
			}
			DemoSection($$renderer, {
				title: "Select desactive",
				code: `<Select name="disabled" label="Disabled"
  options={fruits} value="apple" disabled />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Select($$renderer, {
					name: "error",
					label: "Champ requis",
					options: fruits,
					error: "Ce champ est obligatoire"
				});
			}
			DemoSection($$renderer, {
				title: "Erreur",
				code: `<Select name="error" label="Champ requis"
  options={fruits} error="Ce champ est obligatoire" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----></div> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-6">`);
				Select($$renderer, {
					name: "outlined",
					label: "Outlined",
					options: fruits,
					inputVariant: "outlined",
					placeholder: "Outlined..."
				});
				$$renderer.push(`<!----> `);
				Select($$renderer, {
					name: "filled",
					label: "Filled",
					options: fruits,
					inputVariant: "filled",
					placeholder: "Filled..."
				});
				$$renderer.push(`<!----> `);
				Select($$renderer, {
					name: "underline",
					label: "Underline",
					options: fruits,
					inputVariant: "underline",
					placeholder: "Underline..."
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Variants",
				code: `<Select name="outlined" label="Outlined" inputVariant="outlined" />
<Select name="filled" label="Filled" inputVariant="filled" />
<Select name="underline" label="Underline" inputVariant="underline" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4"><!--[-->`);
				const each_array = ensure_array_like([
					"violet",
					"emerald",
					"cyan",
					"pink",
					"blue",
					"orange"
				]);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let c = each_array[$$index];
					Select($$renderer, {
						name: `color-${stringify(c)}`,
						label: c,
						options: fruits,
						color: c,
						placeholder: "Choisir...",
						get value() {
							return coloredValue;
						},
						set value($$value) {
							coloredValue = $$value;
							$$settled = false;
						}
					});
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Colors",
				code: `<Select name="color-violet" label="violet"
  options={fruits} color="violet" />`,
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
