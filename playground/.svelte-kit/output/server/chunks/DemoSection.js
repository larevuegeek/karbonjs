import { T as escape_html, c as stringify, n as attr_style } from "./server.js";
import "./src.js";
//#region src/lib/DemoSection.svelte
function DemoSection($$renderer, $$props) {
	let { title, description = "", code = "", language = "svelte", children } = $$props;
	$$renderer.push(`<div class="rounded-xl mb-8 overflow-hidden" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><div class="px-6 pt-5 pb-1"><h2 class="text-lg font-semibold" style="color:var(--karbon-text);">${escape_html(title)}</h2> `);
	if (description) {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<p class="text-xs mt-0.5" style="color:var(--karbon-text-3);">${escape_html(description)}</p>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></div> <div class="px-6 py-4">`);
	children($$renderer);
	$$renderer.push(`<!----></div> `);
	if (code) {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div style="border-top:1px solid var(--karbon-border);"><button type="button" class="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium cursor-pointer transition-colors"${attr_style(`color:var(--karbon-text-3);background:${stringify("transparent")};`)}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> ${escape_html("Afficher le code")} <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${attr_style(`transition:transform 0.2s;${stringify("")}`)}><path d="m6 9 6 6 6-6"></path></svg></button> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></div>`);
}
//#endregion
export { DemoSection as t };
