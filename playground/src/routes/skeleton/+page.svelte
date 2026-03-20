<script lang="ts">
  import { Skeleton } from '@karbonjs/ui-svelte';
</script>

<h1 class="text-3xl font-bold mb-2">Skeleton</h1>
<p class="text-[var(--karbon-text-3)] mb-8">Squelettes de chargement avec variants text, circle et rect.</p>

<!-- Text variant -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Text</h2>
  <div class="space-y-4 max-w-md">
    <Skeleton variant="text" />
    <Skeleton variant="text" width="75%" />
    <Skeleton variant="text" width="50%" />
  </div>
</section>

<!-- Multi-line text -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Multi-line Text</h2>
  <div class="max-w-md">
    <Skeleton variant="text" lines={3} />
  </div>
  <div class="max-w-md mt-4">
    <Skeleton variant="text" lines={5} />
  </div>
</section>

<!-- Circle variant -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Circle</h2>
  <div class="flex items-center gap-4">
    <Skeleton variant="circle" height="2rem" />
    <Skeleton variant="circle" height="3rem" />
    <Skeleton variant="circle" height="4rem" />
    <Skeleton variant="circle" height="5rem" />
  </div>
</section>

<!-- Rect variant -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Rect</h2>
  <div class="space-y-4">
    <Skeleton variant="rect" height="4rem" />
    <Skeleton variant="rect" height="8rem" width="50%" />
    <Skeleton variant="rect" height="12rem" />
  </div>
</section>

<!-- Card skeleton example -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Card Skeleton</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each [1, 2, 3] as _}
      <div class="rounded-xl border border-[var(--karbon-border)] p-4 space-y-3">
        <Skeleton variant="rect" height="8rem" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" lines={2} />
        <div class="flex items-center gap-3 pt-2">
          <Skeleton variant="circle" height="2.5rem" />
          <div class="flex-1 space-y-1">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- Profile skeleton -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Profile Skeleton</h2>
  <div class="flex items-start gap-4 max-w-sm">
    <Skeleton variant="circle" height="4rem" />
    <div class="flex-1 space-y-2">
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="50%" />
      <Skeleton variant="text" lines={3} />
    </div>
  </div>
</section>

<!-- Table skeleton -->
<section class="mb-10">
  <h2 class="text-xl font-semibold mb-4">Table Skeleton</h2>
  <div class="rounded-xl border border-[var(--karbon-border)] overflow-hidden">
    <div class="p-3 bg-[var(--karbon-bg-2)]">
      <Skeleton variant="text" width="30%" />
    </div>
    {#each [1, 2, 3, 4, 5] as _}
      <div class="flex items-center gap-4 px-4 py-3 border-t border-[var(--karbon-border)]">
        <Skeleton variant="circle" height="2rem" />
        <div class="flex-1"><Skeleton variant="text" /></div>
        <Skeleton variant="text" width="80px" />
        <Skeleton variant="text" width="60px" />
      </div>
    {/each}
  </div>
</section>
