import "../../chunks/index-server.js";
import { C as attr, T as escape_html, a as ensure_array_like, c as stringify, d as html, h as getContext, l as unsubscribe_stores, n as attr_style, s as store_get, t as attr_class } from "../../chunks/server.js";
import "../../chunks/client.js";
//#region ../node_modules/.pnpm/@sveltejs+kit@2.55.0_@svelt_c024ab466717478ce4c6cde38c1686d2/node_modules/@sveltejs/kit/src/runtime/app/stores.js
/**
* A function that returns all of the contextual stores. On the server, this must be called during component initialization.
* Only use this if you need to defer store subscription until after the component has mounted, for some reason.
*
* @deprecated Use `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))
*/
var getStores = () => {
	const stores$1 = getContext("__svelte__");
	return {
		page: { subscribe: stores$1.page.subscribe },
		navigating: { subscribe: stores$1.navigating.subscribe },
		updated: stores$1.updated
	};
};
/**
* A readable store whose value contains page data.
*
* On the server, this store can only be subscribed to during component initialization. In the browser, it can be subscribed to at any time.
*
* @deprecated Use `page` from `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))
* @type {import('svelte/store').Readable<import('@sveltejs/kit').Page>}
*/
var page = { subscribe(fn) {
	return getStores().page.subscribe(fn);
} };
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { children } = $$props;
		let currentTheme = "midnight";
		const themes = [
			"default",
			"midnight",
			"aurora",
			"minimal",
			"corporate",
			"sunset",
			"ocean",
			"forest",
			"neon",
			"rose"
		];
		const i = (d) => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
		const icons = {
			home: i("<path d=\"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/>"),
			palette: i("<circle cx=\"13.5\" cy=\"6.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"17.5\" cy=\"10.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"8.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"6.5\" cy=\"12\" r=\".5\" fill=\"currentColor\"/><path d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.1-.7-.4-1-.3-.3-.4-.7-.4-1.1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-5.5-4.5-10-10-10z\"/>"),
			sun: i("<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2\"/><path d=\"M12 20v2\"/><path d=\"m4.93 4.93 1.41 1.41\"/><path d=\"m17.66 17.66 1.41 1.41\"/><path d=\"M2 12h2\"/><path d=\"M20 12h2\"/><path d=\"m6.34 17.66-1.41 1.41\"/><path d=\"m19.07 4.93-1.41 1.41\"/>"),
			click: i("<path d=\"m4 4 7.07 17 2.51-7.39L21 11.07z\"/>"),
			type: i("<polyline points=\"4 7 4 4 20 4 20 7\"/><line x1=\"9\" x2=\"15\" y1=\"20\" y2=\"20\"/><line x1=\"12\" y1=\"4\" x2=\"12\" y2=\"20\"/>"),
			list: i("<path d=\"M3 6h18\"/><path d=\"M3 12h18\"/><path d=\"M3 18h18\"/>"),
			check: i("<path d=\"m9 11 3 3L22 4\"/><path d=\"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11\"/>"),
			text: i("<path d=\"M17 6.1H3\"/><path d=\"M21 12.1H3\"/><path d=\"M15.1 18H3\"/>"),
			sliders: i("<line x1=\"4\" x2=\"4\" y1=\"21\" y2=\"14\"/><line x1=\"4\" x2=\"4\" y1=\"10\" y2=\"3\"/><line x1=\"12\" x2=\"12\" y1=\"21\" y2=\"12\"/><line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"3\"/><line x1=\"20\" x2=\"20\" y1=\"21\" y2=\"16\"/><line x1=\"20\" x2=\"20\" y1=\"12\" y2=\"3\"/>"),
			circle: i("<circle cx=\"12\" cy=\"12\" r=\"10\"/>"),
			table: i("<path d=\"M12 3v18\"/><rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/><path d=\"M3 9h18\"/><path d=\"M3 15h18\"/>"),
			hash: i("<line x1=\"4\" x2=\"20\" y1=\"9\" y2=\"9\"/><line x1=\"4\" x2=\"20\" y1=\"15\" y2=\"15\"/><line x1=\"10\" x2=\"8\" y1=\"3\" y2=\"21\"/><line x1=\"16\" x2=\"14\" y1=\"3\" y2=\"21\"/>"),
			tag: i("<path d=\"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.43 2.43 0 0 0 3.42 0l6.58-6.58a2.43 2.43 0 0 0 0-3.42z\"/><circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/>"),
			alert: i("<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/>"),
			bar: i("<path d=\"M18 20V10\"/><path d=\"M12 20V4\"/><path d=\"M6 20v-6\"/>"),
			user: i("<path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/>"),
			bone: i("<path d=\"M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z\"/>"),
			msg: i("<path d=\"M7.9 20A9 9 0 1 0 4 16.1L2 22z\"/>"),
			layers: i("<path d=\"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84z\"/><path d=\"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65\"/><path d=\"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65\"/>"),
			helpCircle: i("<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"/><path d=\"M12 17h.01\"/>"),
			bell: i("<path d=\"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9\"/><path d=\"M10.3 21a1.94 1.94 0 0 0 3.4 0\"/>"),
			image: i("<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/><circle cx=\"9\" cy=\"9\" r=\"2\"/><path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\"/>"),
			tabs: i("<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"/><path d=\"M2 8h20\"/>"),
			chevDown: i("<path d=\"m6 9 6 6 6-6\"/>"),
			link: i("<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/>"),
			chevRight: i("<path d=\"m9 18 6-6-6-6\"/>"),
			card: i("<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/><path d=\"M3 9h18\"/>"),
			minus: i("<path d=\"M5 12h14\"/>"),
			pin: i("<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>"),
			inbox: i("<polyline points=\"22 12 16 12 14 15 10 15 8 12 2 12\"/><path d=\"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"/>"),
			carousel: i("<rect width=\"12\" height=\"18\" x=\"6\" y=\"3\" rx=\"2\"/><path d=\"M2 9v6\"/><path d=\"M22 9v6\"/>"),
			edit: i("<path d=\"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"/><path d=\"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z\"/>"),
			kbd: i("<path d=\"M10 8h.01\"/><path d=\"M12 12h.01\"/><path d=\"M14 8h.01\"/><path d=\"M16 12h.01\"/><path d=\"M18 8h.01\"/><path d=\"M6 8h.01\"/><path d=\"M7 16h10\"/><path d=\"M8 12h.01\"/><rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\"/>")
		};
		const nav = [
			{
				label: "Accueil",
				href: "/",
				icon: icons.home
			},
			{
				group: "Foundation",
				items: [{
					label: "Couleurs",
					href: "/colors",
					icon: icons.palette
				}, {
					label: "Themes",
					href: "/themes",
					icon: icons.sun
				}]
			},
			{
				group: "Actions",
				items: [{
					label: "Button",
					href: "/button",
					icon: icons.click
				}, {
					label: "ButtonBrand",
					href: "/buttonbrand",
					icon: icons.link
				}]
			},
			{
				group: "Formulaires",
				items: [
					{
						label: "Input",
						href: "/input",
						icon: icons.type
					},
					{
						label: "Select",
						href: "/select",
						icon: icons.list
					},
					{
						label: "Checkbox & Toggle",
						href: "/checkbox",
						icon: icons.check
					},
					{
						label: "Textarea",
						href: "/textarea",
						icon: icons.text
					},
					{
						label: "Slider",
						href: "/slider",
						icon: icons.sliders
					},
					{
						label: "Radio",
						href: "/radio",
						icon: icons.circle
					}
				]
			},
			{
				group: "Data",
				items: [{
					label: "DataTable",
					href: "/datatable",
					icon: icons.table
				}, {
					label: "Pagination",
					href: "/pagination",
					icon: icons.hash
				}]
			},
			{
				group: "Feedback",
				items: [
					{
						label: "Badge",
						href: "/badge",
						icon: icons.tag
					},
					{
						label: "Alert",
						href: "/alert",
						icon: icons.alert
					},
					{
						label: "Progress",
						href: "/progress",
						icon: icons.bar
					},
					{
						label: "Avatar",
						href: "/avatar",
						icon: icons.user
					},
					{
						label: "Skeleton",
						href: "/skeleton",
						icon: icons.bone
					},
					{
						label: "Tooltip",
						href: "/tooltip",
						icon: icons.msg
					}
				]
			},
			{
				group: "Overlay",
				items: [
					{
						label: "Modal",
						href: "/modal",
						icon: icons.layers
					},
					{
						label: "Dialog",
						href: "/dialog",
						icon: icons.helpCircle
					},
					{
						label: "Toast",
						href: "/toast",
						icon: icons.bell
					},
					{
						label: "ImgBox",
						href: "/imgbox",
						icon: icons.image
					}
				]
			},
			{
				group: "Navigation",
				items: [
					{
						label: "Tabs",
						href: "/tabs",
						icon: icons.tabs
					},
					{
						label: "Accordion",
						href: "/accordion",
						icon: icons.chevDown
					},
					{
						label: "Breadcrumb",
						href: "/breadcrumb",
						icon: icons.link
					},
					{
						label: "Dropdown",
						href: "/dropdown",
						icon: icons.chevRight
					}
				]
			},
			{
				group: "Layout",
				items: [
					{
						label: "Card",
						href: "/card",
						icon: icons.card
					},
					{
						label: "Divider",
						href: "/divider",
						icon: icons.minus
					},
					{
						label: "PageHeader",
						href: "/pageheader",
						icon: icons.pin
					},
					{
						label: "EmptyState",
						href: "/emptystate",
						icon: icons.inbox
					}
				]
			},
			{
				group: "Media",
				items: [
					{
						label: "Image",
						href: "/image",
						icon: icons.image
					},
					{
						label: "ImageCompare",
						href: "/imagecompare",
						icon: icons.image
					},
					{
						label: "Carousel",
						href: "/carousel",
						icon: icons.carousel
					}
				]
			},
			{
				group: "Editeur",
				items: [{
					label: "RichTextEditor",
					href: "/editor",
					icon: icons.edit
				}, {
					label: "CodeBlock",
					href: "/codeblock",
					icon: icons.kbd
				}]
			},
			{
				group: "Divers",
				items: [{
					label: "Kbd",
					href: "/kbd",
					icon: icons.kbd
				}]
			}
		];
		function isActive(href) {
			return store_get($$store_subs ??= {}, "$page", page).url?.pathname === href;
		}
		$$renderer.push(`<div class="flex h-screen overflow-hidden bg-[var(--karbon-bg)] text-[var(--karbon-text)]"><aside class="shrink-0 h-full overflow-y-auto border-r border-[var(--karbon-border)] bg-[var(--karbon-bg-2)] transition-all duration-200"${attr_style(`width: ${stringify("260px")}`)}><div class="p-4 border-b border-[var(--karbon-border)]"><div class="flex items-center gap-2"><span class="text-xl font-bold">⚡</span> <div><div class="font-bold text-sm">KarbonJS</div> <div class="text-[10px] text-[var(--karbon-text-4)]">v0.2.5 — Playground</div></div></div></div> <div class="p-3 border-b border-[var(--karbon-border)]"><div class="flex items-center gap-2"><select class="flex-1 text-xs rounded-lg px-2.5 py-1.5 pr-7 outline-none cursor-pointer" style="background: var(--karbon-bg-card); border: 1px solid var(--karbon-border); color: var(--karbon-text); background-image: url('data:image/svg+xml,&lt;svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%239ca3af%22 stroke-width=%222%22>&lt;path d=%22m6 9 6 6 6-6%22/>&lt;/svg>'); background-repeat: no-repeat; background-position: right 8px center; appearance: none;"><!--[-->`);
		const each_array = ensure_array_like(themes);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let theme = each_array[$$index];
			$$renderer.option({
				value: theme,
				selected: theme === currentTheme
			}, ($$renderer) => {
				$$renderer.push(`${escape_html(theme)}`);
			});
		}
		$$renderer.push(`<!--]--></select> <button class="shrink-0 p-2 rounded-lg cursor-pointer transition-all" style="background: var(--karbon-bg-card); border: 1px solid var(--karbon-border); color: var(--karbon-text-2);" aria-label="Toggle dark mode">`);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`);
		$$renderer.push(`<!--]--></button></div></div> <nav class="p-2 text-sm"><!--[-->`);
		const each_array_1 = ensure_array_like(nav);
		for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
			let item = each_array_1[$$index_2];
			if ("href" in item) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<a${attr("href", item.href)}${attr_class(`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors mb-0.5 ${stringify(isActive(item.href) ? "bg-[var(--karbon-primary)]/15 text-[var(--karbon-primary)]" : "text-[var(--karbon-text-2)] hover:bg-[var(--karbon-nav-hover-bg)]")}`)}><span class="shrink-0 opacity-60">${html(item.icon)}</span> <span class="font-medium">${escape_html(item.label)}</span></a>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="mt-4 mb-1 px-3"><span class="text-[10px] font-semibold uppercase tracking-widest text-[var(--karbon-text-4)]">${escape_html(item.group)}</span></div> <!--[-->`);
				const each_array_2 = ensure_array_like(item.items);
				for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
					let sub = each_array_2[$$index_1];
					$$renderer.push(`<a${attr("href", sub.href)}${attr_class(`flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-colors mb-0.5 ${stringify(isActive(sub.href) ? "bg-[var(--karbon-primary)]/15 text-[var(--karbon-primary)] font-semibold" : "text-[var(--karbon-text-2)] hover:bg-[var(--karbon-nav-hover-bg)]")}`)}><span class="shrink-0 opacity-50">${html(sub.icon)}</span> <span>${escape_html(sub.label)}</span></a>`);
				}
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></nav></aside> <main class="flex-1 overflow-y-auto"><header class="sticky top-0 z-10 flex items-center gap-3 px-6 py-3 border-b border-[var(--karbon-border)] bg-[var(--karbon-bg)]/80 backdrop-blur-lg"><button class="p-1.5 rounded-md text-[var(--karbon-text-3)] hover:bg-[var(--karbon-nav-hover-bg)] cursor-pointer transition-colors" aria-label="Toggle sidebar"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg></button> <span class="text-sm font-medium text-[var(--karbon-text-2)]">Theme: <span class="text-[var(--karbon-primary)] font-semibold">${escape_html(currentTheme)}</span> · ${escape_html("Dark")}</span></header> <div class="p-6 md:p-8 max-w-5xl">`);
		children($$renderer);
		$$renderer.push(`<!----></div></main></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _layout as default };
