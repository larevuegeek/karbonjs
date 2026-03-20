<script lang="ts">
  import { DataTable, Button, Badge, CodeBlock } from '@karbonjs/ui-svelte';
  import DemoSection from '$lib/DemoSection.svelte';

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
    name: ['Alice Martin', 'Bob Dupont', 'Claire Morel', 'David Petit', 'Emma Laurent', 'Frank Bernard', 'Grace Thomas', 'Hugo Robert', 'Iris Durand', 'Jules Moreau'][i % 10],
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'Editeur', 'Moderateur', 'Utilisateur'][i % 4],
    status: i % 5 !== 0,
    visits: Math.floor(Math.random() * 5000),
    created: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  }));

  const columns = [
    { key: 'avatar', label: '', type: 'image' as const, width: '50px' },
    { key: 'name', label: 'Nom', sortable: true, sticky: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true, filterable: true, options: ['Admin', 'Editeur', 'Moderateur', 'Utilisateur'] },
    { key: 'status', label: 'Actif', type: 'boolean' as const, align: 'center' as const, width: '80px' },
    { key: 'visits', label: 'Visites', type: 'number' as const, sortable: true, align: 'right' as const },
    { key: 'created', label: 'Inscription', type: 'date' as const, sortable: true },
    { key: 'actions', label: '', type: 'actions' as const, width: '120px', align: 'right' as const },
  ];

  let selectedUsers = $state<any[]>([]);
  let loadingDemo = $state(false);

  function simulateLoading() {
    loadingDemo = true;
    setTimeout(() => loadingDemo = false, 2000);
  }
</script>

<h1 class="text-3xl font-bold mb-2">DataTable</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Tableau de donnees complet avec tri, recherche, filtres, selection, pagination et export.</p>

<div class="rounded-xl p-6 mb-8" style="background:var(--karbon-bg-2);border:1px solid var(--karbon-border);">
  <h2 class="text-lg font-semibold mb-3">Utilisation</h2>
  <CodeBlock code={usageCode} language="svelte" title="Example.svelte" lineCopy />
</div>

<!-- Full featured -->
<DemoSection title="Complet" description="Toutes les fonctionnalites : tri, recherche, filtres, selection, pagination, export." code={`<DataTable
  data={users}
  {columns}
  selectable searchable
  perPage={10} showPerPage exportable
  striped color="violet"
/>`}>
  {#snippet children()}
    <DataTable
      data={users}
      {columns}
      selectable
      searchable
      perPage={10}
      showPerPage
      exportable
      exportFilename="utilisateurs"
      striped
      color="violet"
      onselect={(s) => selectedUsers = s}
      onrowclick={(row) => console.log('Click:', row)}
    >
      {#snippet cell(col, row, i)}
        {#if col.key === 'name'}
          <span class="font-medium" style="color: var(--karbon-text);">{row.name}</span>
        {:else if col.key === 'role'}
          <span class="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium"
            style="background: color-mix(in srgb, {row.role === 'Admin' ? 'var(--karbon-red-500)' : row.role === 'Editeur' ? 'var(--karbon-violet-500)' : row.role === 'Moderateur' ? 'var(--karbon-blue-500)' : 'var(--karbon-emerald-500)'} 15%, transparent); color: {row.role === 'Admin' ? 'var(--karbon-red-400)' : row.role === 'Editeur' ? 'var(--karbon-violet-400)' : row.role === 'Moderateur' ? 'var(--karbon-blue-400)' : 'var(--karbon-emerald-400)'};"
          >{row.role}</span>
        {:else if col.key === 'actions'}
          <div class="flex items-center justify-end gap-1">
            <Button size="2xs" variant="ghost" onclick={(e) => { e.stopPropagation() }}>Editer</Button>
            <Button size="2xs" variant="ghost" color="red" onclick={(e) => { e.stopPropagation() }}>Sup.</Button>
          </div>
        {:else if col.type === 'image'}
          {#if row[col.key]}<img src={row[col.key]} alt="" class="h-8 w-8 rounded-full object-cover" />{/if}
        {:else if col.type === 'boolean'}
          {#if row[col.key]}
            <span class="inline-flex items-center justify-center w-5 h-5 rounded-full" style="background:color-mix(in srgb,var(--karbon-success) 15%,transparent);color:var(--karbon-success);"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          {:else}
            <span class="inline-flex items-center justify-center w-5 h-5 rounded-full" style="background:color-mix(in srgb,var(--karbon-danger) 15%,transparent);color:var(--karbon-danger);"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></span>
          {/if}
        {:else if col.type === 'date'}
          {new Date(row[col.key]).toLocaleDateString('fr-FR')}
        {:else if col.type === 'number'}
          {Number(row[col.key]).toLocaleString('fr-FR')}
        {:else}
          {row[col.key]}
        {/if}
      {/snippet}
    </DataTable>

    {#if selectedUsers.length > 0}
      <div class="mt-3 p-3 rounded-lg text-xs" style="background: var(--karbon-bg-2); color: var(--karbon-text-2);">
        {selectedUsers.length} utilisateur{selectedUsers.length > 1 ? 's' : ''} selectionne{selectedUsers.length > 1 ? 's' : ''}: {selectedUsers.map(u => u.name).join(', ')}
      </div>
    {/if}
  {/snippet}
</DemoSection>

<!-- Compact -->
<DemoSection title="Compact" description="Mode compact avec moins de padding." code={`<DataTable
  data={users.slice(0, 5)}
  columns={columns}
  compact hoverable
/>`}>
  {#snippet children()}
    <DataTable
      data={users.slice(0, 5)}
      columns={[
        { key: 'name', label: 'Nom', sortable: true },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
      ]}
      compact
      hoverable
    />
  {/snippet}
</DemoSection>

<!-- Loading -->
<DemoSection title="Loading" description="Etat de chargement avec skeleton." code={`<DataTable
  data={[]}
  columns={columns}
  loading={true}
  hoverable
/>`}>
  {#snippet children()}
    <Button size="sm" variant="flat" color="violet" onclick={simulateLoading} class="mb-3">Simuler chargement</Button>
    <DataTable
      data={loadingDemo ? [] : users.slice(0, 5)}
      columns={[
        { key: 'name', label: 'Nom' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Actif', type: 'boolean' },
      ]}
      loading={loadingDemo}
      hoverable
    />
  {/snippet}
</DemoSection>

<!-- Colors -->
<DemoSection title="Colors" description="Couleurs de selection et tri." code={`<DataTable
  data={users}
  columns={columns}
  selectable
  color="emerald"
  compact
/>`}>
  {#snippet children()}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each ['emerald', 'violet', 'cyan', 'pink'] as c}
        <DataTable
          data={users.slice(0, 3)}
          columns={[
            { key: 'name', label: 'Nom', sortable: true },
            { key: 'role', label: 'Role' },
          ]}
          selectable
          color={c}
          compact
        />
      {/each}
    </div>
  {/snippet}
</DemoSection>

<!-- Empty -->
<DemoSection title="Empty State" description="Affichage quand il n'y a aucune donnee." code={`<DataTable
  data={[]}
  columns={columns}
  searchable
/>`}>
  {#snippet children()}
    <DataTable
      data={[]}
      columns={[
        { key: 'name', label: 'Nom' },
        { key: 'email', label: 'Email' },
      ]}
      searchable
    />
  {/snippet}
</DemoSection>
