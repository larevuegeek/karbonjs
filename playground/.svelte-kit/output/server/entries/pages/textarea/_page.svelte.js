import { T as escape_html, a as ensure_array_like, c as stringify } from "../../../chunks/server.js";
import { _ as CodeBlock, k as Textarea } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/textarea/+page.svelte
function _page($$renderer) {
	const usageCode = `import { Textarea } from '@karbonjs/ui-svelte'

<Textarea name="comment" label="Comment" placeholder="Write here..." bind:value={text} />
<Textarea name="bio" label="Bio" rows={4} maxlength={200} showCount color="violet" />
<Textarea name="desc" label="Description" inputVariant="filled" error="Required" value="" />
<Textarea name="notes" label="Notes" readonly value="Read-only content" />`;
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
	let content = "";
	let limitedContent = "";
	let $$settled = true;
	let $$inner_renderer;
	function $$render_inner($$renderer) {
		$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Textarea</h1> <p class="text-[var(--karbon-text-3)] mb-8">Zones de texte multi-lignes avec variants, couleurs, compteur et etats.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
		CodeBlock($$renderer, {
			code: usageCode,
			language: "svelte",
			title: "Example.svelte",
			lineCopy: true
		});
		$$renderer.push(`<!----></div> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4"><!--[-->`);
				const each_array = ensure_array_like(inputVariants);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let variant = each_array[$$index];
					Textarea($$renderer, {
						name: `variant-${stringify(variant)}`,
						label: variant,
						inputVariant: variant,
						placeholder: "Ecrivez ici...",
						rows: 3,
						value: ""
					});
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Input Variants",
				code: `<Textarea name="out" label="Outlined" inputVariant="outlined" />
<Textarea name="fill" label="Filled" inputVariant="filled" />
<Textarea name="under" label="Underline" inputVariant="underline" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4">`);
				Textarea($$renderer, {
					name: "rows-2",
					label: "2 lignes",
					rows: 2,
					placeholder: "2 rows",
					value: ""
				});
				$$renderer.push(`<!----> `);
				Textarea($$renderer, {
					name: "rows-4",
					label: "4 lignes",
					rows: 4,
					placeholder: "4 rows",
					value: ""
				});
				$$renderer.push(`<!----> `);
				Textarea($$renderer, {
					name: "rows-6",
					label: "6 lignes",
					rows: 6,
					placeholder: "6 rows",
					value: ""
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Rows",
				code: `<Textarea name="rows-2" label="2 lignes" rows={2} />
<Textarea name="rows-4" label="4 lignes" rows={4} />
<Textarea name="rows-6" label="6 lignes" rows={6} />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="max-w-md">`);
				Textarea($$renderer, {
					name: "limited",
					label: "Limite a 200 caracteres",
					maxlength: 200,
					showCount: true,
					placeholder: "Tapez pour voir le compteur...",
					color: "violet",
					get value() {
						return limitedContent;
					},
					set value($$value) {
						limitedContent = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "MaxLength & Counter",
				code: `<Textarea name="limited" label="Limite a 200 caracteres"
  maxlength={200} showCount color="violet"
  bind:value={val} />`,
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
					Textarea($$renderer, {
						name: `color-${stringify(color)}`,
						color,
						label: color,
						placeholder: `${stringify(color)}...`,
						rows: 2,
						value: ""
					});
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Colors",
				code: `<Textarea name="color-violet" color="violet" label="violet" rows={2} />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">`);
				Textarea($$renderer, {
					name: "error-1",
					label: "Description",
					error: "Ce champ est requis",
					placeholder: "...",
					value: ""
				});
				$$renderer.push(`<!----> `);
				Textarea($$renderer, {
					name: "error-2",
					label: "Bio",
					error: "Trop court, minimum 50 caracteres",
					inputVariant: "filled",
					value: "Bonjour"
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Error State",
				code: `<Textarea name="error-1" label="Description"
  error="Ce champ est requis" value="" />
<Textarea name="error-2" label="Bio"
  error="Trop court" inputVariant="filled" value="Bonjour" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">`);
				Textarea($$renderer, {
					name: "disabled",
					label: "Desactive",
					disabled: true,
					value: "Contenu desactive"
				});
				$$renderer.push(`<!----> `);
				Textarea($$renderer, {
					name: "readonly",
					label: "Lecture seule",
					readonly: true,
					value: "Contenu en lecture seule"
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Disabled & Readonly",
				code: `<Textarea name="disabled" label="Desactive" disabled value="Contenu desactive" />
<Textarea name="readonly" label="Lecture seule" readonly value="Contenu en lecture seule" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="max-w-md space-y-3">`);
				Textarea($$renderer, {
					name: "interactive",
					label: "Commentaire",
					placeholder: "Ecrivez votre commentaire...",
					rows: 4,
					maxlength: 500,
					showCount: true,
					color: "emerald",
					get value() {
						return content;
					},
					set value($$value) {
						content = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> <p class="text-sm text-[var(--karbon-text-2)]">Contenu: <strong>${escape_html(content.length)}</strong> caracteres</p></div>`);
			}
			DemoSection($$renderer, {
				title: "Interactive",
				code: `<Textarea name="interactive" label="Commentaire"
  rows={4} maxlength={500} showCount
  color="emerald" bind:value={content} />`,
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
