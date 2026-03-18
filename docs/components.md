# UI Components

30 components available in both `@karbonjs/ui-svelte` and `@karbonjs/ui-react`.

All components use Tailwind CSS + `--karbon-*` CSS variables for theming.

## Button

```svelte
<Button>Click me</Button>
<Button variant="danger" size="lg">Delete</Button>
<Button loading loadingText="Saving...">Save</Button>
<Button arrow fullWidth>Submit form</Button>
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost' \| 'outline'` | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `loading` | `boolean` | `false` |
| `loadingText` | `string` | `''` |
| `arrow` | `boolean` | `false` |
| `fullWidth` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `type` | `'button' \| 'submit'` | `'button'` |

## Form Components

### FormInput

```svelte
<FormInput name="email" type="email" label="EMAIL" placeholder="you@example.com" variant="dark" />
<FormInput name="password" type="password" label="MOT DE PASSE" />
<FormInput name="search" clearable bind:value={query} />
```

### Select

```svelte
<Select
  name="country"
  label="Pays"
  placeholder="Choisir..."
  options={[
    { value: 'fr', label: 'France' },
    { value: 'be', label: 'Belgique' },
  ]}
/>
```

### Checkbox / Toggle / Radio

```svelte
<Checkbox name="terms" label="J'accepte les CGU" description="Requis pour continuer" />
<Toggle name="notifications" label="Notifications" />
<Radio
  name="plan"
  label="Offre"
  options={[
    { value: 'free', label: 'Gratuit', description: '0€/mois' },
    { value: 'pro', label: 'Pro', description: '9€/mois' },
  ]}
/>
```

### Textarea

```svelte
<Textarea name="bio" label="Biographie" maxlength={500} showCount rows={6} />
```

### Slider

```svelte
<Slider name="volume" min={0} max={100} value={75} label="Volume" />
```

### DatePicker

```svelte
<DatePicker name="birthday" label="Date de naissance" variant="dark" />
```

### ColorPicker

```svelte
<ColorPicker name="theme" label="Couleur du thème" />
```

## Card

```svelte
<Card title="Titre" variant="elevated" padding="lg" hoverable>
  <p>Contenu de la card</p>
</Card>

<Card>
  {#snippet header()}
    <h3>Custom header</h3>
  {/snippet}
  <p>Content</p>
  {#snippet footer()}
    <Button>Action</Button>
  {/snippet}
</Card>
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'ghost'` | `'default'` |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| `hoverable` | `boolean` | `false` |
| `title` | `string` | — |

## Modal

```svelte
<Modal
  bind:open={showModal}
  title="Confirmation"
  size="lg"
  backdrop="blur"
  onclose={() => showModal = false}
>
  <p>Modal content</p>
  {#snippet footer()}
    <Button onclick={() => showModal = false}>Fermer</Button>
  {/snippet}
</Modal>
```

| Prop | Type | Default |
|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` |
| `backdrop` | `'blur' \| 'dark' \| 'transparent' \| 'none'` | `'none'` |
| `closable` | `boolean` | `true` |
| `closeOnOverlay` | `boolean` | `true` |

## Dialog

```svelte
<Dialog
  bind:open={showDelete}
  title="Supprimer cet article ?"
  description="Cette action est irréversible."
  variant="danger"
  backdrop="blur"
  confirmLabel="Supprimer"
  onconfirm={handleDelete}
  oncancel={() => showDelete = false}
/>
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `'info' \| 'warning' \| 'danger' \| 'success'` | `'info'` |
| `backdrop` | `'blur' \| 'dark' \| 'transparent' \| 'none'` | `'none'` |
| `confirmLabel` / `cancelLabel` | `string` | `'Confirmer'` / `'Annuler'` |
| `loading` | `boolean` | `false` |

## Toast

```svelte
<Toast
  message="Article sauvegardé !"
  variant="success"
  position="top-right"
  duration={4000}
  bind:visible={showToast}
  ondismiss={() => showToast = false}
/>
```

## ImgBox

Full-screen image viewer with zoom, pan, gallery navigation.

```svelte
<ImgBox
  images={['photo1.jpg', 'photo2.jpg']}
  captions={['Photo 1', 'Photo 2']}
  bind:open={showGallery}
  backdrop="dark"
  onclose={() => showGallery = false}
/>
```

## Image

```svelte
<Image src="photo.jpg" hover="zoom" rounded="lg" aspect="video" />
<Image src="photo.jpg" imgbox fallback="/placeholder.jpg" />
```

## ImgZoom

Magnifier zoom on hover/click. Supports separate HD source.

```svelte
<ImgZoom src="thumb.jpg" zoomSrc="full-hd.jpg" zoom={3} trigger="click" />
```

## Carousel

```svelte
<Carousel images={['a.jpg', 'b.jpg', 'c.jpg']} autoplay={5000} loop />
```

## Dropdown

```svelte
<Dropdown
  items={[
    { label: 'Éditer', value: 'edit' },
    { label: 'Dupliquer', value: 'duplicate' },
    { divider: true },
    { label: 'Supprimer', value: 'delete', danger: true },
  ]}
  onselect={(v) => handleAction(v)}
>
  {#snippet trigger()}
    <Button variant="ghost">Actions</Button>
  {/snippet}
</Dropdown>
```

## Accordion

```svelte
<Accordion
  items={[
    { id: '1', title: 'Question 1', content: 'Réponse 1' },
    { id: '2', title: 'Question 2', content: 'Réponse 2' },
  ]}
  multiple
/>
```

## Tabs

```svelte
<Tabs
  tabs={[
    { id: 'general', label: 'Général' },
    { id: 'security', label: 'Sécurité' },
  ]}
  bind:active={currentTab}
>
  {#snippet children({ tab })}
    {#if tab.id === 'general'}
      <p>General settings</p>
    {:else}
      <p>Security settings</p>
    {/if}
  {/snippet}
</Tabs>
```

## Other Components

### Badge

```svelte
<Badge variant="success">En ligne</Badge>
<Badge variant="danger">Hors ligne</Badge>
```

### AlertMessage

```svelte
<AlertMessage type="error" message="Quelque chose a mal tourné" />
<AlertMessage type="success">Opération réussie !</AlertMessage>
```

### Avatar

```svelte
<Avatar src="/photo.jpg" name="David Martin" size="lg" />
<Avatar name="David Martin" size="md" /> <!-- shows "DM" -->
```

### Progress

```svelte
<Progress value={75} variant="success" size="md" showLabel />
```

### Skeleton

```svelte
<Skeleton variant="text" lines={3} />
<Skeleton variant="circle" width="4rem" />
<Skeleton variant="rect" height="12rem" />
```

### Breadcrumb

```svelte
<Breadcrumb items={[
  { label: 'Accueil', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'Mon article' },
]} />
```

### Tooltip

```svelte
<Tooltip text="Raccourci: Ctrl+S" position="bottom">
  <Button>Sauvegarder</Button>
</Tooltip>
```

### Divider

```svelte
<Divider />
<Divider label="ou" />
```

### Kbd

```svelte
<Kbd keys={['Ctrl', 'S']} />
<Kbd keys={['⌘', 'K']} />
```

### PageHeader / EmptyState / DataTable / Pagination

```svelte
<PageHeader title="Articles" description="Gérez vos publications" />
<EmptyState title="Aucun article" description="Créez votre premier article" />
<DataTable>
  <thead><tr><th>Titre</th><th>Date</th></tr></thead>
  <tbody><tr><td>Article 1</td><td>14 mars</td></tr></tbody>
</DataTable>
<Pagination page={1} total={100} perPage={10} baseUrl="/articles" />
```
