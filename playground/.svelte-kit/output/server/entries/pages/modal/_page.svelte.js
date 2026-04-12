import { T as escape_html, a as ensure_array_like, c as stringify } from "../../../chunks/server.js";
import { E as Badge, F as Button, N as Input, _ as CodeBlock, w as Modal } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/modal/+page.svelte
function _page($$renderer) {
	const usageCode = `<script lang="ts">
  import { Modal, Button } from '@karbonjs/ui-svelte'

  let open = $state(false)
<\/script>

<Button onclick={() => open = true}>Ouvrir</Button>

<Modal bind:open title="Titre" description="Description optionnelle" onclose={() => open = false}>
  {#snippet children()}
    <p>Contenu de la modal.</p>
  {/snippet}
  {#snippet footer()}
    <Button variant="ghost" onclick={() => open = false}>Annuler</Button>
    <Button onclick={() => open = false}>Confirmer</Button>
  {/snippet}
</Modal>`;
	const codeBasic = `<Modal bind:open title="Titre de la modal">
  {#snippet children()}
    <p>Contenu de la modal.</p>
  {/snippet}
  {#snippet footer()}
    <Button variant="ghost">Annuler</Button>
    <Button>Confirmer</Button>
  {/snippet}
</Modal>`;
	const codeIcon = `<Modal bind:open title="Nouvelle fonctionnalite" color="violet">
  {#snippet icon()}
    <svg>...</svg>
  {/snippet}
</Modal>`;
	const codeForm = `<Modal bind:open title="Creer un article" color="violet">
  {#snippet children()}
    <Input name="title" label="Titre" />
    <Input name="slug" label="Slug" />
  {/snippet}
</Modal>`;
	const codeScrollable = `<Modal bind:open title="Conditions generales">
  {#snippet children()}
    <!-- Long content scrolls automatically -->
    <p>Article 1 — Lorem ipsum...</p>
  {/snippet}
</Modal>`;
	let basic = false;
	let withDesc = false;
	let withIcon = false;
	let sizes = {
		xs: false,
		sm: false,
		md: false,
		lg: false,
		xl: false,
		full: false
	};
	let positions = {
		center: false,
		top: false,
		right: false,
		bottom: false
	};
	let backdrops = {
		blur: false,
		dark: false,
		light: false,
		transparent: false
	};
	let noClose = false;
	let form = false;
	let scrollable = false;
	let $$settled = true;
	let $$inner_renderer;
	function $$render_inner($$renderer) {
		$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Modal</h1> <p class="text-[var(--karbon-text-3)] mb-8">Fenetres modales avec animations, positions, backdrops, tailles et contenu riche.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
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
						$$renderer.push(`<!---->Ouvrir modal`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				{
					function children($$renderer) {
						$$renderer.push(`<p>Ceci est le contenu de la modal. Vous pouvez y mettre n'importe quel contenu.</p>`);
					}
					function footer($$renderer) {
						Button($$renderer, {
							variant: "ghost",
							onclick: () => basic = false,
							children: ($$renderer) => {
								$$renderer.push(`<!---->Annuler`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----> `);
						Button($$renderer, {
							onclick: () => basic = false,
							children: ($$renderer) => {
								$$renderer.push(`<!---->Confirmer`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!---->`);
					}
					Modal($$renderer, {
						title: "Titre de la modal",
						onclose: () => basic = false,
						get open() {
							return basic;
						},
						set open($$value) {
							basic = $$value;
							$$settled = false;
						},
						children,
						footer,
						$$slots: {
							default: true,
							footer: true
						}
					});
				}
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Basic",
				description: "Modal simple avec titre et footer.",
				code: codeBasic,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Button($$renderer, {
					variant: "flat",
					onclick: () => withDesc = true,
					children: ($$renderer) => {
						$$renderer.push(`<!---->Avec description`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				{
					function children($$renderer) {
						$$renderer.push(`<p>Contenu des parametres ici...</p>`);
					}
					function footer($$renderer) {
						Button($$renderer, {
							variant: "ghost",
							onclick: () => withDesc = false,
							children: ($$renderer) => {
								$$renderer.push(`<!---->Fermer`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----> `);
						Button($$renderer, {
							color: "emerald",
							onclick: () => withDesc = false,
							children: ($$renderer) => {
								$$renderer.push(`<!---->Sauvegarder`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!---->`);
					}
					Modal($$renderer, {
						title: "Parametres du compte",
						description: "Gerez vos informations personnelles et vos preferences.",
						onclose: () => withDesc = false,
						get open() {
							return withDesc;
						},
						set open($$value) {
							withDesc = $$value;
							$$settled = false;
						},
						children,
						footer,
						$$slots: {
							default: true,
							footer: true
						}
					});
				}
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Avec description",
				description: "Modal avec titre et description.",
				code: `<Modal
  bind:open
  title="Parametres du compte"
  description="Gerez vos informations."
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
					onclick: () => withIcon = true,
					children: ($$renderer) => {
						$$renderer.push(`<!---->Avec icone`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				{
					function icon($$renderer) {
						$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`);
					}
					function children($$renderer) {
						$$renderer.push(`<ul class="space-y-2"><li class="flex items-center gap-2">`);
						Badge($$renderer, {
							color: "emerald",
							size: "xs",
							variant: "dot",
							children: ($$renderer) => {
								$$renderer.push(`<!---->Nouveau`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----> Editeur WYSIWYG ameliore</li> <li class="flex items-center gap-2">`);
						Badge($$renderer, {
							color: "emerald",
							size: "xs",
							variant: "dot",
							children: ($$renderer) => {
								$$renderer.push(`<!---->Nouveau`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----> Explorateur de fichiers</li> <li class="flex items-center gap-2">`);
						Badge($$renderer, {
							color: "blue",
							size: "xs",
							variant: "dot",
							children: ($$renderer) => {
								$$renderer.push(`<!---->Ameliore`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----> Performance du dashboard</li></ul>`);
					}
					function footer($$renderer) {
						Button($$renderer, {
							variant: "ghost",
							onclick: () => withIcon = false,
							children: ($$renderer) => {
								$$renderer.push(`<!---->Plus tard`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----> `);
						Button($$renderer, {
							color: "violet",
							onclick: () => withIcon = false,
							children: ($$renderer) => {
								$$renderer.push(`<!---->Decouvrir`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!---->`);
					}
					Modal($$renderer, {
						title: "Nouvelle fonctionnalite",
						description: "Decouvrez les dernieres ameliorations de la plateforme.",
						color: "violet",
						onclose: () => withIcon = false,
						get open() {
							return withIcon;
						},
						set open($$value) {
							withIcon = $$value;
							$$settled = false;
						},
						icon,
						children,
						footer,
						$$slots: {
							icon: true,
							default: true,
							footer: true
						}
					});
				}
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Avec icone",
				description: "Modal avec icone dans le header.",
				code: codeIcon,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
				const each_array = ensure_array_like([
					"xs",
					"sm",
					"md",
					"lg",
					"xl",
					"full"
				]);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let sz = each_array[$$index];
					Button($$renderer, {
						variant: "outline",
						color: "slate",
						size: "sm",
						onclick: () => sizes = {
							...sizes,
							[sz]: true
						},
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(sz)}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					{
						function children($$renderer) {
							$$renderer.push(`<p>Cette modal utilise la taille <strong>${escape_html(sz)}</strong>.</p> <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`);
						}
						function footer($$renderer) {
							Button($$renderer, {
								variant: "ghost",
								onclick: () => sizes = {
									...sizes,
									[sz]: false
								},
								children: ($$renderer) => {
									$$renderer.push(`<!---->Fermer`);
								},
								$$slots: { default: true }
							});
						}
						Modal($$renderer, {
							open: sizes[sz],
							title: `Modal ${stringify(sz)}`,
							size: sz,
							onclose: () => sizes = {
								...sizes,
								[sz]: false
							},
							children,
							footer,
							$$slots: {
								default: true,
								footer: true
							}
						});
					}
					$$renderer.push(`<!---->`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Sizes",
				description: "6 tailles disponibles : xs, sm, md, lg, xl, full.",
				code: `<Modal open={open} title="Modal md" size="md" />
<Modal open={open} title="Modal lg" size="lg" />
<Modal open={open} title="Modal full" size="full" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
				const each_array_1 = ensure_array_like([
					"center",
					"top",
					"right",
					"bottom"
				]);
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let pos = each_array_1[$$index_1];
					Button($$renderer, {
						variant: "flat",
						color: "cyan",
						size: "sm",
						onclick: () => positions = {
							...positions,
							[pos]: true
						},
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(pos)}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					{
						function children($$renderer) {
							$$renderer.push(`<p>La modal est positionnee en <strong>${escape_html(pos)}</strong>.</p> `);
							if (pos === "right") {
								$$renderer.push("<!--[0-->");
								$$renderer.push(`<p class="mt-2">Le panel lateral est ideal pour les formulaires de detail, les parametres ou les previews.</p>`);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						}
						function footer($$renderer) {
							Button($$renderer, {
								variant: "ghost",
								onclick: () => positions = {
									...positions,
									[pos]: false
								},
								children: ($$renderer) => {
									$$renderer.push(`<!---->Fermer`);
								},
								$$slots: { default: true }
							});
						}
						Modal($$renderer, {
							open: positions[pos],
							title: `Position: ${stringify(pos)}`,
							position: pos,
							size: pos === "right" ? "sm" : "md",
							onclose: () => positions = {
								...positions,
								[pos]: false
							},
							children,
							footer,
							$$slots: {
								default: true,
								footer: true
							}
						});
					}
					$$renderer.push(`<!---->`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Positions",
				description: "4 positions : center, top, right, bottom.",
				code: `<Modal open={open} title="Position: top" position="top" />
<Modal open={open} title="Position: right" position="right" />
<Modal open={open} title="Position: bottom" position="bottom" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
				const each_array_2 = ensure_array_like([
					"blur",
					"dark",
					"light",
					"transparent"
				]);
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let bd = each_array_2[$$index_2];
					Button($$renderer, {
						variant: "flat",
						color: "pink",
						size: "sm",
						onclick: () => backdrops = {
							...backdrops,
							[bd]: true
						},
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(bd)}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					{
						function children($$renderer) {
							$$renderer.push(`<p>Backdrop <strong>${escape_html(bd)}</strong> applique.</p>`);
						}
						function footer($$renderer) {
							Button($$renderer, {
								variant: "ghost",
								onclick: () => backdrops = {
									...backdrops,
									[bd]: false
								},
								children: ($$renderer) => {
									$$renderer.push(`<!---->Fermer`);
								},
								$$slots: { default: true }
							});
						}
						Modal($$renderer, {
							open: backdrops[bd],
							title: `Backdrop: ${stringify(bd)}`,
							backdrop: bd,
							onclose: () => backdrops = {
								...backdrops,
								[bd]: false
							},
							children,
							footer,
							$$slots: {
								default: true,
								footer: true
							}
						});
					}
					$$renderer.push(`<!---->`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Backdrops",
				description: "4 styles de backdrop : blur, dark, light, transparent.",
				code: `<Modal open={open} title="Backdrop: blur" backdrop="blur" />
<Modal open={open} title="Backdrop: dark" backdrop="dark" />`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Button($$renderer, {
					variant: "flat",
					color: "red",
					onclick: () => noClose = true,
					children: ($$renderer) => {
						$$renderer.push(`<!---->Non fermable`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				{
					function children($$renderer) {
						$$renderer.push(`<p>Cette modal ne peut etre fermee qu'en cliquant sur le bouton ci-dessous.</p>`);
					}
					function footer($$renderer) {
						Button($$renderer, {
							color: "red",
							onclick: () => noClose = false,
							children: ($$renderer) => {
								$$renderer.push(`<!---->J'ai compris`);
							},
							$$slots: { default: true }
						});
					}
					Modal($$renderer, {
						title: "Action requise",
						closable: false,
						closeOnOverlay: false,
						onclose: () => noClose = false,
						get open() {
							return noClose;
						},
						set open($$value) {
							noClose = $$value;
							$$settled = false;
						},
						children,
						footer,
						$$slots: {
							default: true,
							footer: true
						}
					});
				}
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Non fermable",
				description: "Modal sans bouton de fermeture ni clic sur l'overlay.",
				code: `<Modal
  bind:open
  title="Action requise"
  closable={false}
  closeOnOverlay={false}
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
					onclick: () => form = true,
					children: ($$renderer) => {
						$$renderer.push(`<!---->Ouvrir formulaire`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				{
					function icon($$renderer) {
						$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg>`);
					}
					function children($$renderer) {
						$$renderer.push(`<div class="space-y-4">`);
						Input($$renderer, {
							name: "title",
							label: "Titre",
							placeholder: "Mon article...",
							color: "violet"
						});
						$$renderer.push(`<!----> `);
						Input($$renderer, {
							name: "slug",
							label: "Slug",
							placeholder: "mon-article",
							color: "violet"
						});
						$$renderer.push(`<!----> `);
						Input($$renderer, {
							name: "author",
							label: "Auteur",
							placeholder: "Votre nom",
							color: "violet"
						});
						$$renderer.push(`<!----></div>`);
					}
					function footer($$renderer) {
						Button($$renderer, {
							variant: "ghost",
							onclick: () => form = false,
							children: ($$renderer) => {
								$$renderer.push(`<!---->Annuler`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----> `);
						Button($$renderer, {
							color: "violet",
							onclick: () => form = false,
							children: ($$renderer) => {
								$$renderer.push(`<!---->Creer`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!---->`);
					}
					Modal($$renderer, {
						title: "Creer un article",
						description: "Remplissez les informations ci-dessous.",
						color: "violet",
						onclose: () => form = false,
						get open() {
							return form;
						},
						set open($$value) {
							form = $$value;
							$$settled = false;
						},
						icon,
						children,
						footer,
						$$slots: {
							icon: true,
							default: true,
							footer: true
						}
					});
				}
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Formulaire",
				description: "Modal avec formulaire et icone.",
				code: codeForm,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Button($$renderer, {
					variant: "flat",
					color: "blue",
					onclick: () => scrollable = true,
					children: ($$renderer) => {
						$$renderer.push(`<!---->Long contenu`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				{
					function children($$renderer) {
						$$renderer.push(`<!--[-->`);
						const each_array_3 = ensure_array_like(Array(20));
						for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
							each_array_3[i];
							$$renderer.push(`<p class="mb-3">Article ${escape_html(i + 1)} — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies.</p>`);
						}
						$$renderer.push(`<!--]-->`);
					}
					function footer($$renderer) {
						Button($$renderer, {
							variant: "ghost",
							onclick: () => scrollable = false,
							children: ($$renderer) => {
								$$renderer.push(`<!---->Refuser`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----> `);
						Button($$renderer, {
							color: "emerald",
							onclick: () => scrollable = false,
							children: ($$renderer) => {
								$$renderer.push(`<!---->Accepter`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!---->`);
					}
					Modal($$renderer, {
						title: "Conditions generales",
						onclose: () => scrollable = false,
						get open() {
							return scrollable;
						},
						set open($$value) {
							scrollable = $$value;
							$$settled = false;
						},
						children,
						footer,
						$$slots: {
							default: true,
							footer: true
						}
					});
				}
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Contenu scrollable",
				description: "Modal avec contenu long et scroll automatique.",
				code: codeScrollable,
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
