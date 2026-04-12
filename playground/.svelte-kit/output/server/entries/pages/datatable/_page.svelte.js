import { C as attr, T as escape_html, a as ensure_array_like, c as stringify, n as attr_style } from "../../../chunks/server.js";
import { F as Button, _ as CodeBlock, n as DataTable } from "../../../chunks/src.js";
import { t as DemoSection } from "../../../chunks/DemoSection.js";
//#region src/routes/datatable/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const usageCode = `<script lang="ts">
  import { DataTable } from '@karbonjs/ui-svelte'

  const data = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Editeur' },
  ]

  const columns = [
    { key: 'name', label: 'Nom', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', filterable: true, options: ['Admin', 'Editeur'] },
  ]
<\/script>

<DataTable {data} {columns} searchable selectable perPage={10} color="violet" />`;
		const users = Array.from({ length: 47 }, (_, i) => ({
			id: i + 1,
			avatar: `https://picsum.photos/seed/user${i}/40/40`,
			name: [
				"Alice Martin",
				"Bob Dupont",
				"Claire Morel",
				"David Petit",
				"Emma Laurent",
				"Frank Bernard",
				"Grace Thomas",
				"Hugo Robert",
				"Iris Durand",
				"Jules Moreau"
			][i % 10],
			email: `user${i + 1}@example.com`,
			role: [
				"Admin",
				"Editeur",
				"Moderateur",
				"Utilisateur"
			][i % 4],
			status: i % 5 !== 0,
			visits: Math.floor(Math.random() * 5e3),
			created: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
		}));
		const columns = [
			{
				key: "avatar",
				label: "",
				type: "image",
				width: "50px"
			},
			{
				key: "name",
				label: "Nom",
				sortable: true,
				sticky: true
			},
			{
				key: "email",
				label: "Email",
				sortable: true
			},
			{
				key: "role",
				label: "Role",
				sortable: true,
				filterable: true,
				options: [
					"Admin",
					"Editeur",
					"Moderateur",
					"Utilisateur"
				]
			},
			{
				key: "status",
				label: "Actif",
				type: "boolean",
				align: "center",
				width: "80px"
			},
			{
				key: "visits",
				label: "Visites",
				type: "number",
				sortable: true,
				align: "right"
			},
			{
				key: "created",
				label: "Inscription",
				type: "date",
				sortable: true
			},
			{
				key: "actions",
				label: "",
				type: "actions",
				width: "120px",
				align: "right"
			}
		];
		let selectedUsers = [];
		let loadingDemo = false;
		function simulateLoading() {
			loadingDemo = true;
			setTimeout(() => loadingDemo = false, 2e3);
		}
		$$renderer.push(`<h1 class="text-3xl font-bold mb-2">DataTable</h1> <p class="text-[var(--karbon-text-3)] mb-8">Tableau de donnees complet avec tri, recherche, filtres, selection, pagination et export.</p> <div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);"><h2 class="text-lg font-semibold mb-3">Utilisation</h2> `);
		CodeBlock($$renderer, {
			code: usageCode,
			language: "svelte",
			title: "Example.svelte",
			lineCopy: true
		});
		$$renderer.push(`<!----></div> `);
		{
			function children($$renderer) {
				{
					function cell($$renderer, col, row, i) {
						if (col.key === "name") {
							$$renderer.push("<!--[0-->");
							$$renderer.push(`<span class="font-medium" style="color: var(--karbon-text);">${escape_html(row.name)}</span>`);
						} else if (col.key === "role") {
							$$renderer.push("<!--[1-->");
							$$renderer.push(`<span class="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium"${attr_style(`background: color-mix(in srgb, ${stringify(row.role === "Admin" ? "var(--karbon-red-500)" : row.role === "Editeur" ? "var(--karbon-violet-500)" : row.role === "Moderateur" ? "var(--karbon-blue-500)" : "var(--karbon-emerald-500)")} 15%, transparent); color: ${stringify(row.role === "Admin" ? "var(--karbon-red-400)" : row.role === "Editeur" ? "var(--karbon-violet-400)" : row.role === "Moderateur" ? "var(--karbon-blue-400)" : "var(--karbon-emerald-400)")};`)}>${escape_html(row.role)}</span>`);
						} else if (col.key === "actions") {
							$$renderer.push("<!--[2-->");
							$$renderer.push(`<div class="flex items-center justify-end gap-1">`);
							Button($$renderer, {
								size: "2xs",
								variant: "ghost",
								onclick: (e) => {
									e.stopPropagation();
								},
								children: ($$renderer) => {
									$$renderer.push(`<!---->Editer`);
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----> `);
							Button($$renderer, {
								size: "2xs",
								variant: "ghost",
								color: "red",
								onclick: (e) => {
									e.stopPropagation();
								},
								children: ($$renderer) => {
									$$renderer.push(`<!---->Sup.`);
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----></div>`);
						} else if (col.type === "image") {
							$$renderer.push("<!--[3-->");
							if (row[col.key]) {
								$$renderer.push("<!--[0-->");
								$$renderer.push(`<img${attr("src", row[col.key])} alt="" class="h-8 w-8 rounded-full object-cover"/>`);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						} else if (col.type === "boolean") {
							$$renderer.push("<!--[4-->");
							if (row[col.key]) {
								$$renderer.push("<!--[0-->");
								$$renderer.push(`<span class="inline-flex items-center justify-center w-5 h-5 rounded-full" style="background:color-mix(in srgb,var(--karbon-success) 15%,transparent);color:var(--karbon-success);"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>`);
							} else {
								$$renderer.push("<!--[-1-->");
								$$renderer.push(`<span class="inline-flex items-center justify-center w-5 h-5 rounded-full" style="background:color-mix(in srgb,var(--karbon-danger) 15%,transparent);color:var(--karbon-danger);"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></span>`);
							}
							$$renderer.push(`<!--]-->`);
						} else if (col.type === "date") {
							$$renderer.push("<!--[5-->");
							$$renderer.push(`${escape_html(new Date(row[col.key]).toLocaleDateString("fr-FR"))}`);
						} else if (col.type === "number") {
							$$renderer.push("<!--[6-->");
							$$renderer.push(`${escape_html(Number(row[col.key]).toLocaleString("fr-FR"))}`);
						} else {
							$$renderer.push("<!--[-1-->");
							$$renderer.push(`${escape_html(row[col.key])}`);
						}
						$$renderer.push(`<!--]-->`);
					}
					DataTable($$renderer, {
						data: users,
						columns,
						selectable: true,
						searchable: true,
						perPage: 10,
						showPerPage: true,
						exportable: true,
						exportFilename: "utilisateurs",
						striped: true,
						color: "violet",
						onselect: (s) => selectedUsers = s,
						onrowclick: (row) => console.log("Click:", row),
						cell,
						$$slots: { cell: true }
					});
				}
				$$renderer.push(`<!----> `);
				if (selectedUsers.length > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="mt-3 p-3 rounded-lg text-xs" style="background: var(--karbon-bg-2); color: var(--karbon-text-2);">${escape_html(selectedUsers.length)} utilisateur${escape_html(selectedUsers.length > 1 ? "s" : "")} selectionne${escape_html(selectedUsers.length > 1 ? "s" : "")}: ${escape_html(selectedUsers.map((u) => u.name).join(", "))}</div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			}
			DemoSection($$renderer, {
				title: "Complet",
				description: "Toutes les fonctionnalites : tri, recherche, filtres, selection, pagination, export.",
				code: `<DataTable
  data={users}
  {columns}
  selectable searchable
  perPage={10} showPerPage exportable
  striped color="violet"
/>`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				DataTable($$renderer, {
					data: users.slice(0, 5),
					columns: [
						{
							key: "name",
							label: "Nom",
							sortable: true
						},
						{
							key: "email",
							label: "Email"
						},
						{
							key: "role",
							label: "Role"
						}
					],
					compact: true,
					hoverable: true
				});
			}
			DemoSection($$renderer, {
				title: "Compact",
				description: "Mode compact avec moins de padding.",
				code: `<DataTable
  data={users.slice(0, 5)}
  columns={columns}
  compact hoverable
/>`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				Button($$renderer, {
					size: "sm",
					variant: "flat",
					color: "violet",
					onclick: simulateLoading,
					class: "mb-3",
					children: ($$renderer) => {
						$$renderer.push(`<!---->Simuler chargement`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				DataTable($$renderer, {
					data: loadingDemo ? [] : users.slice(0, 5),
					columns: [
						{
							key: "name",
							label: "Nom"
						},
						{
							key: "email",
							label: "Email"
						},
						{
							key: "role",
							label: "Role"
						},
						{
							key: "status",
							label: "Actif",
							type: "boolean"
						}
					],
					loading: loadingDemo,
					hoverable: true
				});
				$$renderer.push(`<!---->`);
			}
			DemoSection($$renderer, {
				title: "Loading",
				description: "Etat de chargement avec skeleton.",
				code: `<DataTable
  data={[]}
  columns={columns}
  loading={true}
  hoverable
/>`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
				const each_array = ensure_array_like([
					"emerald",
					"violet",
					"cyan",
					"pink"
				]);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let c = each_array[$$index];
					DataTable($$renderer, {
						data: users.slice(0, 3),
						columns: [{
							key: "name",
							label: "Nom",
							sortable: true
						}, {
							key: "role",
							label: "Role"
						}],
						selectable: true,
						color: c,
						compact: true
					});
				}
				$$renderer.push(`<!--]--></div>`);
			}
			DemoSection($$renderer, {
				title: "Colors",
				description: "Couleurs de selection et tri.",
				code: `<DataTable
  data={users}
  columns={columns}
  selectable
  color="emerald"
  compact
/>`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!----> `);
		{
			function children($$renderer) {
				DataTable($$renderer, {
					data: [],
					columns: [{
						key: "name",
						label: "Nom"
					}, {
						key: "email",
						label: "Email"
					}],
					searchable: true
				});
			}
			DemoSection($$renderer, {
				title: "Empty State",
				description: "Affichage quand il n'y a aucune donnee.",
				code: `<DataTable
  data={[]}
  columns={columns}
  searchable
/>`,
				children,
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _page as default };
