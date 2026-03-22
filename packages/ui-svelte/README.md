# @karbonjs/ui-svelte

32 ready-to-use Svelte 5 components for Karbon applications. Styled with Tailwind CSS and `@karbonjs/ui-core` design tokens. Ships as source — no build step needed.

## Install

```bash
npm install @karbonjs/ui-svelte
```

Peer dependency: `svelte ^5.0.0`

## Setup

Import the design tokens CSS in your app entry point:

```css
@import '@karbonjs/ui-core/css';
```

## Components

### Button

```svelte
<script>
  import { Button, ButtonBrand } from '@karbonjs/ui-svelte'
</script>

<Button variant="primary" size="md" onclick={handleClick}>Save</Button>
<Button variant="outline" loading>Loading...</Button>
<ButtonBrand brand="github" href="https://github.com" />
```

### Form

```svelte
<script>
  import { Input, Select, Checkbox, Toggle, Textarea, Radio, Slider, DatePicker, ColorPicker } from '@karbonjs/ui-svelte'
</script>

<Input label="Email" type="email" bind:value={email} error="Invalid email" />
<Select label="Country" options={countries} bind:value={country} />
<Checkbox label="Accept terms" bind:checked={accepted} />
<Toggle label="Dark mode" bind:checked={dark} />
<Textarea label="Bio" bind:value={bio} maxlength={500} />
<Radio name="plan" options={plans} bind:value={plan} />
<Slider min={0} max={100} bind:value={volume} />
<DatePicker label="Date" bind:value={date} />
<ColorPicker label="Color" bind:value={color} />
```

### Data

```svelte
<script>
  import { DataTable, Pagination } from '@karbonjs/ui-svelte'
</script>

<DataTable columns={cols} rows={data} sortable striped />
<Pagination total={100} perPage={10} page={1} onchange={handlePage} />
```

### Layout

```svelte
<script>
  import { Card, PageHeader, EmptyState } from '@karbonjs/ui-svelte'
</script>

<PageHeader title="Articles" subtitle="Manage your content" />
<Card title="Stats" variant="elevated">{children}</Card>
<EmptyState icon="inbox" title="No results" description="Try another search" />
```

### Overlay

```svelte
<script>
  import { Modal, Dialog, Toast, ImgBox } from '@karbonjs/ui-svelte'
</script>

<Modal open={showModal} onclose={() => showModal = false} title="Confirm">
  <p>Are you sure?</p>
</Modal>

<Dialog open={showDialog} title="Delete?" confirmLabel="Delete" variant="danger"
  onconfirm={handleDelete} oncancel={() => showDialog = false} />

<Toast message="Saved!" type="success" />

<ImgBox images={gallery} open={showLightbox} startIndex={0}
  onclose={() => showLightbox = false} />
```

### Image

```svelte
<script>
  import { Image, ImgZoom, ImageCompare } from '@karbonjs/ui-svelte'
</script>

<Image src="/photo.jpg" alt="Photo" lazy rounded />
<ImgZoom src="/detail.jpg" alt="Zoom on hover" />
<ImageCompare before="/before.jpg" after="/after.jpg" />
```

### Navigation & Feedback

```svelte
<script>
  import { Tabs, Breadcrumb, Dropdown, Accordion } from '@karbonjs/ui-svelte'
  import { Badge, AlertMessage, Progress, Tooltip, Avatar } from '@karbonjs/ui-svelte'
  import { Skeleton, Divider, Kbd, Carousel, CodeBlock } from '@karbonjs/ui-svelte'
</script>

<Tabs items={[{ label: 'Tab 1', value: 'tab1' }]} active="tab1" onchange={handleTab} />
<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Articles' }]} />
<Dropdown items={menuItems} label="Actions" />
<Accordion items={[{ title: 'FAQ 1', content: 'Answer...' }]} />

<Badge variant="success">Published</Badge>
<AlertMessage type="warning" message="Check your input" />
<Progress value={75} max={100} />
<Tooltip content="More info"><span>Hover me</span></Tooltip>
<Avatar src="/avatar.jpg" alt="John" size="md" />

<Skeleton width="100%" height="1rem" />
<Divider label="or" />
<Kbd keys={['Ctrl', 'S']} />
<Carousel images={slides} autoplay interval={5000} />
<CodeBlock code={snippet} language="typescript" />
```

### Rich Text Editor

```svelte
<script>
  import { RichTextEditor } from '@karbonjs/ui-svelte'
</script>

<RichTextEditor bind:value={content} placeholder="Write something..." />
```

WYSIWYG editor with toolbar (bold, italic, links, lists, images, headings), media support, and XSS sanitization.

## Full Component List

| Category | Components |
|----------|-----------|
| **Button** | `Button`, `ButtonBrand` |
| **Form** | `Input`, `Select`, `Checkbox`, `Toggle`, `Textarea`, `Radio`, `Slider`, `DatePicker`, `ColorPicker` |
| **Data** | `DataTable`, `Pagination` |
| **Layout** | `Card`, `PageHeader`, `EmptyState` |
| **Overlay** | `Modal`, `Dialog`, `Toast`, `ImgBox` |
| **Image** | `Image`, `ImgZoom`, `ImageCompare` |
| **Navigation** | `Tabs`, `Breadcrumb`, `Dropdown`, `Accordion` |
| **Feedback** | `Badge`, `AlertMessage`, `Progress`, `Tooltip`, `Avatar` |
| **Misc** | `Skeleton`, `Divider`, `Kbd`, `Carousel`, `CodeBlock` |
| **Editor** | `RichTextEditor` |

## Theming

All components use `--karbon-*` CSS variables from `@karbonjs/ui-core`. Import a built-in theme or create your own:

```css
@import '@karbonjs/ui-core/css';
@import '@karbonjs/ui-core/themes/ocean.css';
```

Available themes: `default`, `ocean`, `forest`, `sunset`, `midnight`, `aurora`, `neon`, `rose`, `corporate`, `minimal`.

## License

MIT
