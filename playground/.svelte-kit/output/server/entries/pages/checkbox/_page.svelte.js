import { T as escape_html, a as ensure_array_like, c as stringify } from "../../../chunks/server.js";
import { A as Toggle, _ as CodeBlock, j as Checkbox } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/checkbox/+page.svelte
function _page($$renderer) {
	const usageCode = `import { Checkbox, Toggle } from '@karbonjs/ui-svelte'

<Checkbox name="terms" label="Accept terms" bind:checked={accepted} />
<Checkbox name="news" label="Newsletter" description="Get weekly updates" color="violet" />
<Checkbox name="star" label="Favorite" icon="star" color="amber" checked />

<Toggle name="dark" label="Dark mode" bind:checked={dark} />
<Toggle name="notif" label="Notifications" color="emerald" showIcons checked />`;
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
	let basic = false;
	let terms = false;
	let toggle1 = true;
	let toggle2 = false;
	let $$settled = true;
	let $$inner_renderer;
	function $$render_inner($$renderer) {
		$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Checkbox &amp; Toggle</h1> <p class="text-[var(--karbon-text-3)] mb-8">Cases a cocher et interrupteurs avec couleurs, tailles et variantes.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
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
				Checkbox($$renderer, {
					name: "basic",
					label: "Option simple",
					get checked() {
						return basic;
					},
					set checked($$value) {
						basic = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "checked",
					label: "Pre-coche",
					checked: true
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "indeterminate",
					label: "Indeterminate",
					indeterminate: true
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "disabled",
					label: "Desactive",
					disabled: true
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "disabled-checked",
					label: "Desactive coche",
					checked: true,
					disabled: true
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Checkbox — Basic",
				code: `<Checkbox name="basic" label="Option simple" bind:checked={val} />
<Checkbox name="checked" label="Pre-coche" checked={true} />
<Checkbox name="ind" label="Indeterminate" indeterminate />
<Checkbox name="dis" label="Desactive" disabled />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="space-y-4">`);
				Checkbox($$renderer, {
					name: "terms",
					label: "J'accepte les conditions",
					description: "En cochant cette case, vous acceptez les CGU et la politique de confidentialite.",
					get checked() {
						return terms;
					},
					set checked($$value) {
						terms = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "newsletter",
					label: "Newsletter",
					description: "Recevoir les dernieres actualites et offres par email."
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "partners",
					label: "Partenaires",
					description: "Autoriser le partage de vos donnees avec nos partenaires.",
					disabled: true
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Avec description",
				code: `<Checkbox name="terms" label="J'accepte les conditions"
  description="En cochant, vous acceptez les CGU."
  bind:checked={terms} />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="space-y-4"><div class="flex flex-wrap items-start gap-6">`);
				Checkbox($$renderer, {
					name: "v-filled",
					label: "Filled (default)",
					variant: "filled",
					checked: true,
					color: "violet"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "v-outlined",
					label: "Outlined",
					variant: "outlined",
					checked: true,
					color: "violet"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "v-ghost",
					label: "Ghost",
					variant: "ghost",
					checked: true,
					color: "violet"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "v-elegant",
					label: "Elegant",
					variant: "elegant",
					checked: true,
					color: "violet"
				});
				$$renderer.push(`<!----></div> <div class="flex flex-wrap items-start gap-6">`);
				Checkbox($$renderer, {
					name: "v-filled-off",
					label: "Filled (off)",
					variant: "filled"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "v-outlined-off",
					label: "Outlined (off)",
					variant: "outlined"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "v-ghost-off",
					label: "Ghost (off)",
					variant: "ghost"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "v-elegant-off",
					label: "Elegant (off)",
					variant: "elegant"
				});
				$$renderer.push(`<!----></div></div> <h3 class="text-base font-semibold mb-3 mt-6 text-[var(--karbon-text-2)]">Variants × Colors</h3> <!--[-->`);
				const each_array = ensure_array_like([
					"filled",
					"outlined",
					"ghost",
					"elegant"
				]);
				for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
					let v = each_array[$$index_1];
					$$renderer.push(`<div class="flex flex-wrap gap-4 mb-3"><span class="text-xs font-semibold text-[var(--karbon-text-4)] uppercase w-16 pt-1">${escape_html(v)}</span> <!--[-->`);
					const each_array_1 = ensure_array_like(colors);
					for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
						let color = each_array_1[$$index];
						Checkbox($$renderer, {
							name: `vc-${stringify(v)}-${stringify(color)}`,
							variant: v,
							color,
							checked: true
						});
					}
					$$renderer.push(`<!--]--></div>`);
				}
				$$renderer.push(`<!--]-->`);
			}
			DemoSection($$renderer, {
				title: "Variants",
				description: "Filled, Outlined, Ghost et Elegant",
				code: `<Checkbox name="v-filled" label="Filled" variant="filled" checked color="violet" />
<Checkbox name="v-outlined" label="Outlined" variant="outlined" checked color="violet" />
<Checkbox name="v-ghost" label="Ghost" variant="ghost" checked color="violet" />
<Checkbox name="v-elegant" label="Elegant" variant="elegant" checked color="violet" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="flex flex-wrap gap-4"><!--[-->`);
				const each_array_2 = ensure_array_like(colors);
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let color = each_array_2[$$index_2];
					Checkbox($$renderer, {
						name: `color-${stringify(color)}`,
						label: color,
						color,
						checked: true
					});
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Colors",
				code: `<Checkbox name="color-emerald" label="emerald" color="emerald" checked />
<Checkbox name="color-violet" label="violet" color="violet" checked />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="flex flex-wrap items-start gap-6">`);
				Checkbox($$renderer, {
					name: "sm",
					label: "Small",
					size: "sm",
					checked: true,
					color: "violet"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "md",
					label: "Medium",
					size: "md",
					checked: true,
					color: "violet"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "lg",
					label: "Large",
					size: "lg",
					checked: true,
					color: "violet"
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Sizes",
				code: `<Checkbox name="sm" label="Small" size="sm" checked color="violet" />
<Checkbox name="md" label="Medium" size="md" checked color="violet" />
<Checkbox name="lg" label="Large" size="lg" checked color="violet" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="flex flex-wrap items-start gap-6">`);
				Checkbox($$renderer, {
					name: "square",
					label: "Square",
					shape: "square",
					checked: true,
					color: "blue"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "rounded",
					label: "Rounded",
					shape: "rounded",
					checked: true,
					color: "blue"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "circle",
					label: "Circle",
					shape: "circle",
					checked: true,
					color: "blue"
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Shapes",
				code: `<Checkbox name="square" label="Square" shape="square" checked color="blue" />
<Checkbox name="rounded" label="Rounded" shape="rounded" checked color="blue" />
<Checkbox name="circle" label="Circle" shape="circle" checked color="blue" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="flex flex-wrap items-start gap-6">`);
				Checkbox($$renderer, {
					name: "icon-check",
					label: "Check",
					icon: "check",
					checked: true,
					color: "emerald"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "icon-cross",
					label: "Cross",
					icon: "cross",
					checked: true,
					color: "red"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "icon-dash",
					label: "Dash",
					icon: "dash",
					checked: true,
					color: "blue"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "icon-heart",
					label: "Heart",
					icon: "heart",
					checked: true,
					color: "pink"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "icon-star",
					label: "Star",
					icon: "star",
					checked: true,
					color: "amber"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "icon-circle",
					label: "Circle",
					icon: "circle",
					checked: true,
					color: "violet"
				});
				$$renderer.push(`<!----> `);
				Checkbox($$renderer, {
					name: "icon-eye",
					label: "Eye",
					icon: "eye",
					checked: true,
					color: "cyan"
				});
				$$renderer.push(`<!----></div> <h3 class="text-base font-semibold mb-3 mt-6 text-[var(--karbon-text-2)]">Styles × Shapes</h3> <div class="space-y-3"><!--[-->`);
				const each_array_3 = ensure_array_like([
					"square",
					"rounded",
					"circle"
				]);
				for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
					let shp = each_array_3[$$index_3];
					$$renderer.push(`<div class="flex flex-wrap gap-4"><span class="text-xs font-semibold text-[var(--karbon-text-4)] uppercase w-16 pt-1">${escape_html(shp)}</span> `);
					Checkbox($$renderer, {
						name: `${stringify(shp)}-check`,
						icon: "check",
						shape: shp,
						checked: true,
						color: "emerald"
					});
					$$renderer.push(`<!----> `);
					Checkbox($$renderer, {
						name: `${stringify(shp)}-cross`,
						icon: "cross",
						shape: shp,
						checked: true,
						color: "red"
					});
					$$renderer.push(`<!----> `);
					Checkbox($$renderer, {
						name: `${stringify(shp)}-heart`,
						icon: "heart",
						shape: shp,
						checked: true,
						color: "pink"
					});
					$$renderer.push(`<!----> `);
					Checkbox($$renderer, {
						name: `${stringify(shp)}-star`,
						icon: "star",
						shape: shp,
						checked: true,
						color: "amber"
					});
					$$renderer.push(`<!----> `);
					Checkbox($$renderer, {
						name: `${stringify(shp)}-circle`,
						icon: "circle",
						shape: shp,
						checked: true,
						color: "violet"
					});
					$$renderer.push(`<!----> `);
					Checkbox($$renderer, {
						name: `${stringify(shp)}-eye`,
						icon: "eye",
						shape: shp,
						checked: true,
						color: "cyan"
					});
					$$renderer.push(`<!----></div>`);
				}
				$$renderer.push(`<!--]--></div> <h3 class="text-base font-semibold mb-3 mt-6 text-[var(--karbon-text-2)]">Styles × Sizes</h3> <div class="space-y-3"><!--[-->`);
				const each_array_4 = ensure_array_like([
					"sm",
					"md",
					"lg"
				]);
				for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
					let sz = each_array_4[$$index_4];
					$$renderer.push(`<div class="flex flex-wrap gap-4"><span class="text-xs font-semibold text-[var(--karbon-text-4)] uppercase w-12 pt-1">${escape_html(sz)}</span> `);
					Checkbox($$renderer, {
						name: `${stringify(sz)}-check`,
						icon: "check",
						size: sz,
						checked: true,
						color: "emerald"
					});
					$$renderer.push(`<!----> `);
					Checkbox($$renderer, {
						name: `${stringify(sz)}-cross`,
						icon: "cross",
						size: sz,
						checked: true,
						color: "red"
					});
					$$renderer.push(`<!----> `);
					Checkbox($$renderer, {
						name: `${stringify(sz)}-heart`,
						icon: "heart",
						size: sz,
						checked: true,
						color: "pink"
					});
					$$renderer.push(`<!----> `);
					Checkbox($$renderer, {
						name: `${stringify(sz)}-star`,
						icon: "star",
						size: sz,
						checked: true,
						color: "amber"
					});
					$$renderer.push(`<!----> `);
					Checkbox($$renderer, {
						name: `${stringify(sz)}-circle`,
						icon: "circle",
						size: sz,
						checked: true,
						color: "violet"
					});
					$$renderer.push(`<!----> `);
					Checkbox($$renderer, {
						name: `${stringify(sz)}-eye`,
						icon: "eye",
						size: sz,
						checked: true,
						color: "cyan"
					});
					$$renderer.push(`<!----></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Styles d'icone",
				code: `<Checkbox name="icon-check" label="Check" icon="check" checked color="emerald" />
<Checkbox name="icon-heart" label="Heart" icon="heart" checked color="pink" />
<Checkbox name="icon-star" label="Star" icon="star" checked color="amber" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="space-y-4"><!--[-->`);
				const each_array_5 = ensure_array_like([
					"sm",
					"md",
					"lg"
				]);
				for (let $$index_6 = 0, $$length = each_array_5.length; $$index_6 < $$length; $$index_6++) {
					let size = each_array_5[$$index_6];
					$$renderer.push(`<div class="flex flex-wrap gap-4"><span class="text-xs font-semibold text-[var(--karbon-text-4)] uppercase w-12 pt-1">${escape_html(size)}</span> <!--[-->`);
					const each_array_6 = ensure_array_like(colors);
					for (let $$index_5 = 0, $$length = each_array_6.length; $$index_5 < $$length; $$index_5++) {
						let color = each_array_6[$$index_5];
						Checkbox($$renderer, {
							name: `${stringify(size)}-${stringify(color)}`,
							color,
							size,
							checked: true
						});
					}
					$$renderer.push(`<!--]--></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Sizes × Colors",
				code: `<Checkbox name="sm-emerald" color="emerald" size="sm" checked />
<Checkbox name="lg-violet" color="violet" size="lg" checked />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> <hr class="my-10 border-[var(--karbon-border)]"/> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="space-y-4">`);
				Toggle($$renderer, {
					name: "notif",
					label: "Notifications",
					get checked() {
						return toggle1;
					},
					set checked($$value) {
						toggle1 = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				Toggle($$renderer, {
					name: "dark",
					label: "Mode sombre",
					get checked() {
						return toggle2;
					},
					set checked($$value) {
						toggle2 = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				Toggle($$renderer, {
					name: "disabled-on",
					label: "Desactive (on)",
					checked: true,
					disabled: true
				});
				$$renderer.push(`<!----> `);
				Toggle($$renderer, {
					name: "disabled-off",
					label: "Desactive (off)",
					disabled: true
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Toggle — Basic",
				code: `<Toggle name="notif" label="Notifications" bind:checked={val} />
<Toggle name="dark" label="Mode sombre" bind:checked={val} />
<Toggle name="dis" label="Desactive" checked disabled />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="space-y-4">`);
				Toggle($$renderer, {
					name: "email-notif",
					label: "Notifications email",
					description: "Recevoir un email a chaque nouvelle connexion.",
					checked: true
				});
				$$renderer.push(`<!----> `);
				Toggle($$renderer, {
					name: "2fa",
					label: "Authentification 2FA",
					description: "Ajouter une couche de securite supplementaire."
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Toggle avec description",
				code: `<Toggle name="email-notif" label="Notifications email"
  description="Recevoir un email a chaque connexion." checked />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="space-y-4">`);
				Toggle($$renderer, {
					name: "icon-on",
					label: "Avec icones (on)",
					checked: true,
					showIcons: true
				});
				$$renderer.push(`<!----> `);
				Toggle($$renderer, {
					name: "icon-off",
					label: "Avec icones (off)",
					showIcons: true
				});
				$$renderer.push(`<!----> `);
				Toggle($$renderer, {
					name: "icon-lg",
					label: "Large avec icones",
					size: "lg",
					checked: true,
					showIcons: true,
					color: "emerald"
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Avec icones",
				code: `<Toggle name="icon-on" label="Avec icones" checked showIcons />
<Toggle name="icon-lg" label="Large" size="lg" checked showIcons color="emerald" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="flex flex-wrap gap-4"><!--[-->`);
				const each_array_7 = ensure_array_like(colors);
				for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
					let color = each_array_7[$$index_7];
					Toggle($$renderer, {
						name: `toggle-${stringify(color)}`,
						label: color,
						color,
						checked: true
					});
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Toggle Colors",
				code: `<Toggle name="toggle-emerald" label="emerald" color="emerald" checked />
<Toggle name="toggle-violet" label="violet" color="violet" checked />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="flex flex-wrap items-start gap-6">`);
				Toggle($$renderer, {
					name: "toggle-sm",
					label: "Small",
					size: "sm",
					checked: true,
					color: "violet"
				});
				$$renderer.push(`<!----> `);
				Toggle($$renderer, {
					name: "toggle-md",
					label: "Medium",
					size: "md",
					checked: true,
					color: "violet"
				});
				$$renderer.push(`<!----> `);
				Toggle($$renderer, {
					name: "toggle-lg",
					label: "Large",
					size: "lg",
					checked: true,
					color: "violet"
				});
				$$renderer.push(`<!----></div>`);
			}
			DemoSection($$renderer, {
				title: "Toggle Sizes",
				code: `<Toggle name="toggle-sm" label="Small" size="sm" checked color="violet" />
<Toggle name="toggle-md" label="Medium" size="md" checked color="violet" />
<Toggle name="toggle-lg" label="Large" size="lg" checked color="violet" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="space-y-4"><!--[-->`);
				const each_array_8 = ensure_array_like([
					"sm",
					"md",
					"lg"
				]);
				for (let $$index_9 = 0, $$length = each_array_8.length; $$index_9 < $$length; $$index_9++) {
					let size = each_array_8[$$index_9];
					$$renderer.push(`<div class="flex flex-wrap gap-4"><span class="text-xs font-semibold text-[var(--karbon-text-4)] uppercase w-12 pt-1">${escape_html(size)}</span> <!--[-->`);
					const each_array_9 = ensure_array_like(colors);
					for (let $$index_8 = 0, $$length = each_array_9.length; $$index_8 < $$length; $$index_8++) {
						let color = each_array_9[$$index_8];
						Toggle($$renderer, {
							name: `t-${stringify(size)}-${stringify(color)}`,
							color,
							size,
							checked: true,
							showIcons: true
						});
					}
					$$renderer.push(`<!--]--></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Sizes × Colors (avec icones)",
				code: `<Toggle name="t-sm-emerald" color="emerald" size="sm" checked showIcons />
<Toggle name="t-lg-violet" color="violet" size="lg" checked showIcons />`,
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
