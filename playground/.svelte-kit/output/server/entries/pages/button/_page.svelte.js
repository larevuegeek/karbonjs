import { T as escape_html, a as ensure_array_like } from "../../../chunks/server.js";
import { F as Button, _ as CodeBlock } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/button/+page.svelte
function _page($$renderer) {
	const usageCode = `import { Button } from '@karbonjs/ui-svelte'

<Button>Click me</Button>
<Button variant="flat" color="violet">Flat</Button>
<Button variant="bordered" shape="pill" size="lg">Large Pill</Button>
<Button color="red" variant="shadow">Delete</Button>
<Button arrow>Discover →</Button>
<Button loading loadingText="Loading...">Submit</Button>`;
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
	const variants = [
		"solid",
		"flat",
		"bordered",
		"outline",
		"light",
		"ghost",
		"shadow"
	];
	const shapes = [
		"sharp",
		"soft",
		"rounded",
		"pill"
	];
	const sizes = [
		"2xs",
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
		"2xl",
		"3xl"
	];
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Button</h1> <p class="text-[var(--karbon-text-3)] mb-8">Boutons interactifs avec variants, couleurs, formes et tailles.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
	CodeBlock($$renderer, {
		code: usageCode,
		language: "svelte",
		title: "Example.svelte",
		lineCopy: true
	});
	$$renderer.push(`<!----></div> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-3"><!--[-->`);
			const each_array = ensure_array_like(variants);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let variant = each_array[$$index];
				Button($$renderer, {
					variant,
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(variant)}`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Variants",
			description: "7 styles visuels.",
			code: `<Button variant="solid">Solid</Button>
<Button variant="flat">Flat</Button>
<Button variant="bordered">Bordered</Button>
<Button variant="outline">Outline</Button>
<Button variant="light">Light</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="shadow">Shadow</Button>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> <!--[-->`);
	const each_array_1 = ensure_array_like(variants);
	for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
		let variant = each_array_1[$$index_2];
		$$renderer.push(`<section class="mb-8"><h2 class="text-lg font-semibold mb-3 capitalize">${escape_html(variant)} × Colors</h2> <div class="flex flex-wrap gap-2"><!--[-->`);
		const each_array_2 = ensure_array_like(colors);
		for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
			let color = each_array_2[$$index_1];
			Button($$renderer, {
				color,
				variant,
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(color)}`);
				},
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!--]--></div></section>`);
	}
	$$renderer.push(`<!--]--> `);
	{
		function children($$renderer) {
			$$renderer.push(`<!--[-->`);
			const each_array_3 = ensure_array_like(shapes);
			for (let $$index_5 = 0, $$length = each_array_3.length; $$index_5 < $$length; $$index_5++) {
				let shape = each_array_3[$$index_5];
				$$renderer.push(`<div class="mb-4"><h3 class="text-sm font-semibold mb-2 capitalize" style="color:var(--karbon-text-2);">${escape_html(shape)}</h3> <div class="flex flex-wrap gap-2 mb-2"><!--[-->`);
				const each_array_4 = ensure_array_like(colors);
				for (let $$index_3 = 0, $$length = each_array_4.length; $$index_3 < $$length; $$index_3++) {
					let color = each_array_4[$$index_3];
					Button($$renderer, {
						color,
						shape,
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(color)}`);
						},
						$$slots: { default: true }
					});
				}
				$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-2"><!--[-->`);
				const each_array_5 = ensure_array_like(colors);
				for (let $$index_4 = 0, $$length = each_array_5.length; $$index_4 < $$length; $$index_4++) {
					let color = each_array_5[$$index_4];
					Button($$renderer, {
						color,
						shape,
						variant: "bordered",
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(color)}`);
						},
						$$slots: { default: true }
					});
				}
				$$renderer.push(`<!--]--></div></div>`);
			}
			$$renderer.push(`<!--]--> <h3 class="text-sm font-semibold mb-2" style="color:var(--karbon-text-2);">Circle</h3> <div class="flex flex-wrap gap-3 items-center">`);
			Button($$renderer, {
				shape: "circle",
				size: "sm",
				color: "violet",
				children: ($$renderer) => {
					$$renderer.push(`<!---->A`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				shape: "circle",
				size: "md",
				color: "emerald",
				children: ($$renderer) => {
					$$renderer.push(`<!---->+`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				shape: "circle",
				size: "lg",
				color: "blue",
				children: ($$renderer) => {
					$$renderer.push(`<!---->K`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				shape: "circle",
				size: "xl",
				color: "red",
				children: ($$renderer) => {
					$$renderer.push(`<!---->X`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				shape: "circle",
				size: "md",
				variant: "bordered",
				color: "cyan",
				children: ($$renderer) => {
					$$renderer.push(`<!---->?`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Shapes",
			description: "5 formes de bouton : sharp, soft, rounded, pill, circle.",
			code: `<Button shape="sharp">Sharp</Button>
<Button shape="soft">Soft</Button>
<Button shape="rounded">Rounded</Button>
<Button shape="pill">Pill</Button>
<Button shape="circle" size="md" color="violet">A</Button>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-end gap-3"><!--[-->`);
			const each_array_6 = ensure_array_like(sizes);
			for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
				let size = each_array_6[$$index_6];
				$$renderer.push(`<div class="flex flex-col items-center gap-1">`);
				Button($$renderer, {
					size,
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(size)}`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> <span class="text-[10px]" style="color:var(--karbon-text-4);">${escape_html(size)}</span></div>`);
			}
			$$renderer.push(`<!--]--></div> <div class="flex flex-wrap items-end gap-3 mt-4"><!--[-->`);
			const each_array_7 = ensure_array_like(sizes);
			for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
				let size = each_array_7[$$index_7];
				Button($$renderer, {
					size,
					shape: "pill",
					color: "violet",
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(size)}`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Sizes",
			description: "8 tailles de 2xs a 3xl.",
			code: `<Button size="2xs">2XS</Button>
<Button size="xs">XS</Button>
<Button size="sm">SM</Button>
<Button size="md">MD</Button>
<Button size="lg">LG</Button>
<Button size="xl">XL</Button>
<Button size="2xl">2XL</Button>
<Button size="3xl">3XL</Button>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-3">`);
			Button($$renderer, {
				loading: true,
				loadingText: "Chargement...",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Loading`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				disabled: true,
				children: ($$renderer) => {
					$$renderer.push(`<!---->Disabled`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				loading: true,
				variant: "bordered",
				color: "violet",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Loading`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				disabled: true,
				variant: "flat",
				color: "emerald",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Disabled`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "States",
			description: "Loading et disabled.",
			code: `<Button loading loadingText="Chargement...">Submit</Button>
<Button disabled>Disabled</Button>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-3">`);
			Button($$renderer, {
				arrow: true,
				children: ($$renderer) => {
					$$renderer.push(`<!---->Decouvrir`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				arrow: true,
				color: "emerald",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Commencer`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				arrow: true,
				color: "violet",
				variant: "bordered",
				children: ($$renderer) => {
					$$renderer.push(`<!---->En savoir plus`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				arrow: true,
				color: "cyan",
				variant: "flat",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Explorer`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				arrow: true,
				color: "blue",
				variant: "shadow",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Lancer`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Arrow Effect",
			description: "Effet fleche au survol.",
			code: `<Button arrow>Decouvrir</Button>
<Button arrow color="emerald">Commencer</Button>
<Button arrow color="violet" variant="bordered">En savoir plus</Button>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3 max-w-md">`);
			Button($$renderer, {
				fullWidth: true,
				children: ($$renderer) => {
					$$renderer.push(`<!---->Solid`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				fullWidth: true,
				variant: "bordered",
				color: "violet",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Bordered`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				fullWidth: true,
				variant: "shadow",
				color: "blue",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Shadow`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Full Width",
			description: "Bouton pleine largeur.",
			code: `<Button fullWidth>Solid</Button>
<Button fullWidth variant="bordered" color="violet">Bordered</Button>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap gap-3">`);
			Button($$renderer, {
				color: "red",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Supprimer`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				color: "red",
				variant: "flat",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Supprimer`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				color: "red",
				variant: "bordered",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Supprimer`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				color: "red",
				variant: "light",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Supprimer`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				color: "red",
				variant: "ghost",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Supprimer`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Button($$renderer, {
				color: "red",
				variant: "shadow",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Supprimer`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Danger",
			description: "Utilisez color='red' pour les actions destructives.",
			code: `<Button color="red">Supprimer</Button>
<Button color="red" variant="flat">Retirer</Button>
<Button color="red" variant="bordered">Revoquer</Button>
<Button color="red" variant="shadow">Confirmer</Button>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> <section class="mb-10"><h2 class="text-xl font-semibold mb-4">Cas d'usage</h2> <h3 class="text-sm font-semibold mb-3 text-[var(--karbon-text-3)] uppercase tracking-wider">Actions principales</h3> <div class="flex flex-wrap items-center gap-3 mb-6">`);
	Button($$renderer, {
		color: "emerald",
		shape: "pill",
		variant: "shadow",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Publier`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	Button($$renderer, {
		variant: "outline",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Enregistrer brouillon`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	Button($$renderer, {
		variant: "ghost",
		size: "sm",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Annuler`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----></div> <h3 class="text-sm font-semibold mb-3 text-[var(--karbon-text-3)] uppercase tracking-wider">Zone danger</h3> <div class="flex flex-wrap items-center gap-3 mb-6">`);
	Button($$renderer, {
		color: "red",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Supprimer le compte`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	Button($$renderer, {
		color: "red",
		variant: "flat",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Retirer`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	Button($$renderer, {
		color: "red",
		variant: "outline",
		size: "sm",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Revoquer`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----></div> <h3 class="text-sm font-semibold mb-3 text-[var(--karbon-text-3)] uppercase tracking-wider">CTA Marketing</h3> <div class="flex flex-wrap items-center gap-3 mb-6">`);
	Button($$renderer, {
		color: "violet",
		shape: "pill",
		variant: "shadow",
		size: "xl",
		arrow: true,
		children: ($$renderer) => {
			$$renderer.push(`<!---->Commencer gratuitement`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	Button($$renderer, {
		color: "blue",
		shape: "pill",
		variant: "outline",
		size: "lg",
		children: ($$renderer) => {
			$$renderer.push(`<!---->En savoir plus`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----></div> <h3 class="text-sm font-semibold mb-3 text-[var(--karbon-text-3)] uppercase tracking-wider">Toolbar</h3> <div class="flex items-center gap-1 p-1 rounded-lg" style="background: var(--karbon-bg-2); border: 1px solid var(--karbon-border);">`);
	Button($$renderer, {
		variant: "ghost",
		size: "xs",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Copier`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	Button($$renderer, {
		variant: "ghost",
		size: "xs",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Coller`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	Button($$renderer, {
		variant: "flat",
		color: "violet",
		size: "xs",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Formater`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	Button($$renderer, {
		variant: "ghost",
		size: "xs",
		color: "red",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Effacer`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----></div> <h3 class="text-sm font-semibold mb-3 mt-6 text-[var(--karbon-text-3)] uppercase tracking-wider">Social / Auth</h3> <div class="flex flex-col gap-2 max-w-xs">`);
	Button($$renderer, {
		fullWidth: true,
		shape: "pill",
		variant: "bordered",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Connexion avec Google`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	Button($$renderer, {
		fullWidth: true,
		shape: "pill",
		color: "blue",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Connexion avec Facebook`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	Button($$renderer, {
		fullWidth: true,
		shape: "pill",
		variant: "flat",
		color: "slate",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Continuer avec email`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----></div></section>`);
}
//#endregion
export { _page as default };
