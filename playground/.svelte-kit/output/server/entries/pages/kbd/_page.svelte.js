import { T as escape_html, a as ensure_array_like } from "../../../chunks/server.js";
import { i as Kbd } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/kbd/+page.svelte
function _page($$renderer) {
	$$renderer.push(`<h1 class="text-3xl font-bold mb-2">Kbd</h1> <p class="text-[var(--karbon-text-3)] mb-8">Affichage de raccourcis clavier et combinaisons de touches.</p> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="flex flex-wrap items-center gap-4">`);
			Kbd($$renderer, { keys: ["Esc"] });
			$$renderer.push(`<!----> `);
			Kbd($$renderer, { keys: ["Tab"] });
			$$renderer.push(`<!----> `);
			Kbd($$renderer, { keys: ["Enter"] });
			$$renderer.push(`<!----> `);
			Kbd($$renderer, { keys: ["Space"] });
			$$renderer.push(`<!----> `);
			Kbd($$renderer, { keys: ["Backspace"] });
			$$renderer.push(`<!----> `);
			Kbd($$renderer, { keys: ["Delete"] });
			$$renderer.push(`<!----></div>`);
		}
		DemoSection($$renderer, {
			title: "Single Keys",
			description: "Touches individuelles.",
			code: `<Kbd keys={['Esc']} />
<Kbd keys={['Tab']} />
<Kbd keys={['Enter']} />
<Kbd keys={['Space']} />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3"><div class="flex items-center gap-4">`);
			Kbd($$renderer, { keys: ["Ctrl", "C"] });
			$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">Copier</span></div> <div class="flex items-center gap-4">`);
			Kbd($$renderer, { keys: ["Ctrl", "V"] });
			$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">Coller</span></div> <div class="flex items-center gap-4">`);
			Kbd($$renderer, { keys: ["Ctrl", "X"] });
			$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">Couper</span></div> <div class="flex items-center gap-4">`);
			Kbd($$renderer, { keys: ["Ctrl", "Z"] });
			$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">Annuler</span></div> <div class="flex items-center gap-4">`);
			Kbd($$renderer, { keys: [
				"Ctrl",
				"Shift",
				"Z"
			] });
			$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">Retablir</span></div> <div class="flex items-center gap-4">`);
			Kbd($$renderer, { keys: ["Ctrl", "S"] });
			$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">Sauvegarder</span></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Key Combinations",
			description: "Combinaisons de touches courantes.",
			code: `<Kbd keys={['Ctrl', 'C']} />
<Kbd keys={['Ctrl', 'V']} />
<Kbd keys={['Ctrl', 'Shift', 'Z']} />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3"><div class="flex items-center gap-4">`);
			Kbd($$renderer, { keys: ["Ctrl", "K"] });
			$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">Recherche rapide</span></div> <div class="flex items-center gap-4">`);
			Kbd($$renderer, { keys: ["Alt", "Tab"] });
			$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">Changer de fenetre</span></div> <div class="flex items-center gap-4">`);
			Kbd($$renderer, { keys: [
				"Ctrl",
				"Shift",
				"P"
			] });
			$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">Palette de commandes</span></div> <div class="flex items-center gap-4">`);
			Kbd($$renderer, { keys: ["F11"] });
			$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">Plein ecran</span></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Navigation",
			description: "Raccourcis de navigation.",
			code: `<Kbd keys={['Ctrl', 'K']} />
<Kbd keys={['Alt', 'Tab']} />
<Kbd keys={['Ctrl', 'Shift', 'P']} />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="space-y-3"><div class="flex items-center gap-4">`);
			Kbd($$renderer, { keys: ["⌘", "C"] });
			$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">Copier (Mac)</span></div> <div class="flex items-center gap-4">`);
			Kbd($$renderer, { keys: ["⌘", "V"] });
			$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">Coller (Mac)</span></div> <div class="flex items-center gap-4">`);
			Kbd($$renderer, { keys: [
				"⌘",
				"⇧",
				"S"
			] });
			$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">Sauvegarder sous (Mac)</span></div> <div class="flex items-center gap-4">`);
			Kbd($$renderer, { keys: [
				"⌥",
				"⌘",
				"I"
			] });
			$$renderer.push(`<!----> <span class="text-sm text-[var(--karbon-text-3)]">DevTools (Mac)</span></div></div>`);
		}
		DemoSection($$renderer, {
			title: "Mac-style Keys",
			description: "Symboles Mac pour les modificateurs.",
			code: `<Kbd keys={['⌘', 'C']} />
<Kbd keys={['⌘', '⇧', 'S']} />
<Kbd keys={['⌥', '⌘', 'I']} />`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<p class="text-sm text-[var(--karbon-text-2)] leading-relaxed">Appuyez sur `);
			Kbd($$renderer, { keys: ["Ctrl", "K"] });
			$$renderer.push(`<!----> pour ouvrir la recherche, puis utilisez `);
			Kbd($$renderer, { keys: ["↑"] });
			$$renderer.push(`<!----> et `);
			Kbd($$renderer, { keys: ["↓"] });
			$$renderer.push(`<!----> pour naviguer. Validez avec `);
			Kbd($$renderer, { keys: ["Enter"] });
			$$renderer.push(`<!----> ou annulez avec `);
			Kbd($$renderer, { keys: ["Esc"] });
			$$renderer.push(`<!---->.</p>`);
		}
		DemoSection($$renderer, {
			title: "Inline Usage",
			description: "Utilisation dans du texte courant.",
			code: `<p>Appuyez sur <Kbd keys={['Ctrl', 'K']} /> pour ouvrir la recherche.</p>`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!----> `);
	{
		function children($$renderer) {
			$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl"><!--[-->`);
			const each_array = ensure_array_like([
				{
					keys: ["Ctrl", "B"],
					desc: "Gras"
				},
				{
					keys: ["Ctrl", "I"],
					desc: "Italique"
				},
				{
					keys: ["Ctrl", "U"],
					desc: "Souligne"
				},
				{
					keys: ["Ctrl", "A"],
					desc: "Tout selectionner"
				},
				{
					keys: ["Ctrl", "F"],
					desc: "Rechercher"
				},
				{
					keys: ["Ctrl", "H"],
					desc: "Remplacer"
				},
				{
					keys: ["Ctrl", "P"],
					desc: "Imprimer"
				},
				{
					keys: ["Ctrl", "N"],
					desc: "Nouveau"
				}
			]);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let shortcut = each_array[$$index];
				$$renderer.push(`<div class="flex items-center justify-between p-2.5 rounded-lg border border-[var(--karbon-border)]"><span class="text-sm text-[var(--karbon-text-2)]">${escape_html(shortcut.desc)}</span> `);
				Kbd($$renderer, { keys: shortcut.keys });
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		DemoSection($$renderer, {
			title: "Cheatsheet",
			description: "Grille de raccourcis formatage.",
			code: `<Kbd keys={['Ctrl', 'B']} /> Gras
<Kbd keys={['Ctrl', 'I']} /> Italique
<Kbd keys={['Ctrl', 'U']} /> Souligne`,
			children,
			$$slots: { default: true }
		});
	}
	$$renderer.push(`<!---->`);
}
//#endregion
export { _page as default };
