<script lang="ts">
  import { Avatar } from '@karbonjs/ui-svelte';

  const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'emerald', 'cyan', 'blue', 'violet', 'pink', 'slate', 'zinc'] as const;
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  const people = [
    { name: 'Alice Martin', img: 'https://picsum.photos/seed/karbon1/200/200' },
    { name: 'Bob Dupont', img: 'https://picsum.photos/seed/karbon2/200/200' },
    { name: 'Claire Petit', img: 'https://picsum.photos/seed/karbon3/200/200' },
    { name: 'David Moreau', img: 'https://picsum.photos/seed/karbon4/200/200' },
  ];
</script>

<h1 class="text-3xl font-bold mb-2">Avatar</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Avatars avec initiales, images, couleurs et tailles.</p>

<!-- With names (initials) -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Initials</h2>
  <div class="flex items-center gap-3">
    <Avatar name="Alice Martin" />
    <Avatar name="Bob Dupont" />
    <Avatar name="Claire" />
    <Avatar name="David Moreau" />
    <Avatar name="Eva Bernard" />
  </div>
</section>

<!-- With images -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">With Images</h2>
  <div class="flex items-center gap-3">
    {#each people as person}
      <Avatar src={person.img} name={person.name} />
    {/each}
  </div>
</section>

<!-- Sizes -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Sizes</h2>
  <div class="flex items-end gap-3">
    {#each sizes as size}
      <div class="flex flex-col items-center gap-1">
        <Avatar name="Alice Martin" {size} color="violet" />
        <span class="text-xs text-[var(--karbon-text-4)]">{size}</span>
      </div>
    {/each}
  </div>
</section>

<!-- Sizes with images -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Sizes with Images</h2>
  <div class="flex items-end gap-3">
    {#each sizes as size}
      <div class="flex flex-col items-center gap-1">
        <Avatar src="https://picsum.photos/seed/karbon5/200/200" name="Photo" {size} />
        <span class="text-xs text-[var(--karbon-text-4)]">{size}</span>
      </div>
    {/each}
  </div>
</section>

<!-- Colors -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Colors</h2>
  <div class="flex flex-wrap gap-3">
    {#each colors as color}
      <div class="flex flex-col items-center gap-1">
        <Avatar name="{color.charAt(0).toUpperCase()}{color.charAt(1)}" {color} />
        <span class="text-xs text-[var(--karbon-text-4)]">{color}</span>
      </div>
    {/each}
  </div>
</section>

<!-- Colors × Sizes -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Colors x Sizes (lg)</h2>
  <div class="flex flex-wrap gap-3">
    {#each colors as color}
      <Avatar name="{color.charAt(0).toUpperCase()}{color.charAt(1)}" {color} size="lg" />
    {/each}
  </div>
</section>

<!-- Fallback (broken image) -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Fallback (broken image)</h2>
  <div class="flex items-center gap-3">
    <Avatar src="https://broken-url.invalid/avatar.jpg" name="Fallback" color="red" />
    <span class="text-sm text-[var(--karbon-text-3)]">Image cassee - affiche les initiales</span>
  </div>
</section>
