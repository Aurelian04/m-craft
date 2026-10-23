<script setup lang="ts">
const props = defineProps<{ items: { name: string; path?: string }[] }>()

const all = computed(() => [{ name: 'Acasă', path: '/' }, ...props.items])
useBreadcrumbLd(all.value.map((i) => ({ name: i.name, path: i.path ?? useRoute().path })))
</script>

<template>
  <nav class="crumbs" aria-label="Breadcrumb">
    <ol>
      <li v-for="(it, i) in all" :key="i">
        <NuxtLink v-if="it.path && i < all.length - 1" :to="it.path">{{ it.name }}</NuxtLink>
        <span v-else aria-current="page">{{ it.name }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.crumbs ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0 0 12px;
  padding: 0;
  font-size: 0.875rem;
  color: var(--ink-2);
}

.crumbs li {
  margin: 0;
}

.crumbs li + li::before {
  content: '/';
  margin: 0 8px;
  color: var(--line);
}

.crumbs a {
  color: var(--ink-2);
}

.crumbs a:hover {
  color: var(--ink);
}

/* Culoare (docs/design/culoare.md) */
.crumbs li + li::before { color: var(--amber); font-weight: 700; }
.crumbs a { text-decoration-color: var(--amber); }
.crumbs [aria-current] { color: var(--ink); font-weight: 600; }
</style>
