# @karbonjs/ui-react

30 ready-to-use React components for Karbon applications. Styled with Tailwind CSS and `@karbonjs/ui-core` design tokens. Compatible with React 18, 19, and Next.js.

## Install

```bash
npm install @karbonjs/ui-react
```

Peer dependency: `react ^18.0.0 || ^19.0.0`

## Setup

Import the design tokens CSS in your app entry point:

```css
@import '@karbonjs/ui-core/css';
```

## Components

### Button

```tsx
import { Button, ButtonBrand } from '@karbonjs/ui-react'

<Button variant="primary" size="md" onClick={handleClick}>Save</Button>
<Button variant="outline" loading>Loading...</Button>
<ButtonBrand brand="github" href="https://github.com" />
```

### Form

```tsx
import { Input, Select, Checkbox, Toggle, Textarea, Radio, Slider, DatePicker, ColorPicker } from '@karbonjs/ui-react'

<Input label="Email" type="email" value={email} onChange={setEmail} error="Invalid email" />
<Select label="Country" options={countries} value={country} onChange={setCountry} />
<Checkbox label="Accept terms" checked={accepted} onChange={setAccepted} />
<Toggle label="Dark mode" checked={dark} onChange={setDark} />
<Textarea label="Bio" value={bio} onChange={setBio} maxLength={500} />
<Radio name="plan" options={plans} value={plan} onChange={setPlan} />
<Slider min={0} max={100} value={volume} onChange={setVolume} />
<DatePicker label="Date" value={date} onChange={setDate} />
<ColorPicker label="Color" value={color} onChange={setColor} />
```

### Data

```tsx
import { DataTable, Pagination } from '@karbonjs/ui-react'

<DataTable columns={cols} rows={data} sortable striped />
<Pagination total={100} perPage={10} page={1} onChange={handlePage} />
```

### Layout

```tsx
import { Card, PageHeader, EmptyState } from '@karbonjs/ui-react'

<PageHeader title="Articles" subtitle="Manage your content" />
<Card title="Stats" variant="elevated">{children}</Card>
<EmptyState icon="inbox" title="No results" description="Try another search" />
```

### Overlay

```tsx
import { Modal, Dialog, Toast, ImgBox } from '@karbonjs/ui-react'

<Modal open={showModal} onClose={() => setShowModal(false)} title="Confirm">
  <p>Are you sure?</p>
</Modal>

<Dialog open={showDialog} title="Delete?" confirmLabel="Delete" variant="danger"
  onConfirm={handleDelete} onCancel={() => setShowDialog(false)} />

<Toast message="Saved!" type="success" />

<ImgBox images={gallery} open={showLightbox} startIndex={0}
  onClose={() => setShowLightbox(false)} />
```

### Image

```tsx
import { Image, ImgZoom, ImageCompare } from '@karbonjs/ui-react'

<Image src="/photo.jpg" alt="Photo" lazy rounded />
<ImgZoom src="/detail.jpg" alt="Zoom on hover" />
<ImageCompare before="/before.jpg" after="/after.jpg" />
```

### Navigation & Feedback

```tsx
import { Tabs, Breadcrumb, Dropdown, Accordion } from '@karbonjs/ui-react'
import { Badge, AlertMessage, Progress, Tooltip, Avatar } from '@karbonjs/ui-react'
import { Skeleton, Divider, Kbd, Carousel, CodeBlock } from '@karbonjs/ui-react'

<Tabs items={[{ label: 'Tab 1', value: 'tab1' }]} active="tab1" onChange={handleTab} />
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

> The React version of the Rich Text Editor is coming soon.

## TypeScript

All components export their prop types:

```tsx
import type { ButtonProps, ModalProps, DataTableProps, Column } from '@karbonjs/ui-react'
```

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

## Theming

All components use `--karbon-*` CSS variables from `@karbonjs/ui-core`. Import a built-in theme or create your own:

```css
@import '@karbonjs/ui-core/css';
@import '@karbonjs/ui-core/themes/ocean.css';
```

Available themes: `default`, `ocean`, `forest`, `sunset`, `midnight`, `aurora`, `neon`, `rose`, `corporate`, `minimal`.

## License

MIT
