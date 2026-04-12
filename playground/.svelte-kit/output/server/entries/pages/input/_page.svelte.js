import { a as ensure_array_like, c as stringify } from "../../../chunks/server.js";
import { N as Input, _ as CodeBlock } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/input/+page.svelte
function _page($$renderer) {
	const usageCode = `import { Input } from '@karbonjs/ui-svelte'

<Input name="email" type="email" label="Email" placeholder="you@example.com" bind:value={email} />
<Input name="pwd" type="password" label="Password" bind:value={pwd} />
<Input name="search" label="Search" clearable bind:value={q} />
<Input name="bio" inputVariant="filled" color="violet" error="Required" value="" />`;
	const colors = [
		"red",
		"orange",
		"amber",
		"yellow",
		"lime",
		"emerald",
		"cyan",
		"blue",
		"violet",
		"pink",
		"slate",
		"zinc"
	];
	const inputVariants = [
		"outlined",
		"filled",
		"underline"
	];
	let textValue = "";
	let emailValue = "";
	let passwordValue = "";
	let searchValue = "";
	let clearableValue = "Effacez-moi";
	let $$settled = true;
	let $$inner_renderer;
	function $$render_inner($$renderer) {
		$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Input</h1> <p class="text-[var(--karbon-text-3)] mb-8">Champs de saisie avec variants, couleurs, etats et icones.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
		CodeBlock($$renderer, {
			code: usageCode,
			language: "svelte",
			title: "Example.svelte",
			lineCopy: true
		});
		$$renderer.push(`<!----></div> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl"><!--[-->`);
				const each_array = ensure_array_like(inputVariants);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let variant = each_array[$$index];
					Input($$renderer, {
						name: `variant-${stringify(variant)}`,
						label: variant,
						inputVariant: variant,
						placeholder: "Tapez ici...",
						get value() {
							return textValue;
						},
						set value($$value) {
							textValue = $$value;
							$$settled = false;
						}
					});
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Input Variants",
				code: `<Input name="out" label="Outlined" inputVariant="outlined" />
<Input name="fill" label="Filled" inputVariant="filled" />
<Input name="under" label="Underline" inputVariant="underline" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">`);
				Input($$renderer, {
					name: "text",
					type: "text",
					label: "Text",
					placeholder: "Votre nom",
					get value() {
						return textValue;
					},
					set value($$value) {
						textValue = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				Input($$renderer, {
					name: "email",
					type: "email",
					label: "Email",
					placeholder: "email@exemple.com",
					get value() {
						return emailValue;
					},
					set value($$value) {
						emailValue = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				Input($$renderer, {
					name: "password",
					type: "password",
					label: "Password",
					placeholder: "Mot de passe",
					get value() {
						return passwordValue;
					},
					set value($$value) {
						passwordValue = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				Input($$renderer, {
					name: "search",
					type: "search",
					label: "Search",
					placeholder: "Rechercher...",
					clearable: true,
					get value() {
						return searchValue;
					},
					set value($$value) {
						searchValue = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Types",
				code: `<Input name="text" type="text" label="Text" />
<Input name="email" type="email" label="Email" />
<Input name="password" type="password" label="Password" />
<Input name="search" type="search" label="Search" clearable />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-3"><!--[-->`);
				const each_array_1 = ensure_array_like(colors);
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let color = each_array_1[$$index_1];
					Input($$renderer, {
						name: `outlined-${stringify(color)}`,
						inputVariant: "outlined",
						color,
						label: color,
						placeholder: `${stringify(color)}...`,
						value: ""
					});
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Outlined × Colors",
				code: `<Input name="demo" inputVariant="outlined" color="violet" label="violet" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-3"><!--[-->`);
				const each_array_2 = ensure_array_like(colors);
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let color = each_array_2[$$index_2];
					Input($$renderer, {
						name: `filled-${stringify(color)}`,
						inputVariant: "filled",
						color,
						label: color,
						placeholder: `${stringify(color)}...`,
						value: ""
					});
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Filled × Colors",
				code: `<Input name="demo" inputVariant="filled" color="violet" label="violet" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-3"><!--[-->`);
				const each_array_3 = ensure_array_like(colors);
				for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
					let color = each_array_3[$$index_3];
					Input($$renderer, {
						name: `underline-${stringify(color)}`,
						inputVariant: "underline",
						color,
						label: color,
						placeholder: `${stringify(color)}...`,
						value: ""
					});
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Underline × Colors",
				code: `<Input name="demo" inputVariant="underline" color="violet" label="violet" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">`);
				Input($$renderer, {
					name: "error-outlined",
					label: "Outlined error",
					inputVariant: "outlined",
					error: "Ce champ est requis",
					value: ""
				});
				$$renderer.push(`<!----> `);
				Input($$renderer, {
					name: "error-filled",
					label: "Filled error",
					inputVariant: "filled",
					error: "Email invalide",
					value: ""
				});
				$$renderer.push(`<!----> `);
				Input($$renderer, {
					name: "error-underline",
					label: "Underline error",
					inputVariant: "underline",
					error: "Trop court",
					value: ""
				});
				$$renderer.push(`<!----> `);
				Input($$renderer, {
					name: "error-no-icon",
					label: "Error sans icone",
					error: "Message sans icone",
					errorIcon: false,
					value: ""
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Error State",
				code: `<Input name="err" label="Outlined error"
  inputVariant="outlined" error="Ce champ est requis" value="" />
<Input name="err2" label="Error sans icone"
  error="Message" errorIcon={false} value="" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">`);
				Input($$renderer, {
					name: "disabled-outlined",
					label: "Outlined disabled",
					inputVariant: "outlined",
					disabled: true,
					value: "Desactive"
				});
				$$renderer.push(`<!----> `);
				Input($$renderer, {
					name: "disabled-filled",
					label: "Filled disabled",
					inputVariant: "filled",
					disabled: true,
					value: "Desactive"
				});
				$$renderer.push(`<!----> `);
				Input($$renderer, {
					name: "disabled-underline",
					label: "Underline disabled",
					inputVariant: "underline",
					disabled: true,
					value: "Desactive"
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Disabled",
				code: `<Input name="dis" label="Outlined disabled"
  inputVariant="outlined" disabled value="Desactive" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">`);
				{
					function icon($$renderer) {
						$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>`);
					}
					Input($$renderer, {
						name: "icon-search",
						label: "Recherche",
						placeholder: "Rechercher...",
						color: "blue",
						value: "",
						icon,
						$$slots: { icon: true }
					});
				}
				$$renderer.push(`<!----> `);
				{
					function icon($$renderer) {
						$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`);
					}
					Input($$renderer, {
						name: "icon-email",
						label: "Email",
						type: "email",
						placeholder: "email@exemple.com",
						color: "violet",
						value: "",
						icon,
						$$slots: { icon: true }
					});
				}
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "With Icon",
				code: `<Input name="icon-search" label="Recherche" color="blue" value="">
  {#snippet icon()}
    <svg>...</svg>
  {/snippet}
</Input>`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="max-w-sm">`);
				Input($$renderer, {
					name: "clearable",
					label: "Clearable",
					clearable: true,
					color: "emerald",
					get value() {
						return clearableValue;
					},
					set value($$value) {
						clearableValue = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Clearable",
				code: `<Input name="clearable" label="Clearable"
  clearable bind:value={val} color="emerald" />`,
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
