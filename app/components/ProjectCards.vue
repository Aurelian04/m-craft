<script setup lang="ts">
import { photo, projectPhotos, projectVideos, type Project } from '~/data/media'

defineProps<{ projects: Project[] }>()
</script>

<template>
  <div class="pc">
    <NuxtLink v-for="p in projects" :key="p.id" :to="`/proiecte/#${p.id}`" class="pc__card" :data-svc="p.services[0]">
      <Pic v-if="photo(p.cover)" :photo="photo(p.cover)!" sizes="(max-width: 640px) 100vw, 25vw" ratio="4 / 3" alt="" />
      <div class="pc__body">
        <h3>{{ p.title }}</h3>
        <p>
          {{ projectPhotos(p.id).length }} fotografii<template v-if="projectVideos(p.id).length"> · {{ projectVideos(p.id).length }} clipuri</template>
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.pc {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.pc__card {
  background: var(--bg);
  border: 1px solid var(--line);
  color: var(--ink);
  text-decoration: none;
}

.pc__card:hover {
  border-color: var(--amber);
  color: var(--ink);
}

.pc__body {
  padding: 10px 12px 12px;
}

.pc__body h3 {
  font-size: 1.1rem;
  margin-bottom: 4px;
}

.pc__body p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--ink-2);
}

@media (max-width: 960px) {
  .pc {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .pc {
    grid-template-columns: 1fr;
  }
}

/* Culoare (docs/design/culoare.md) */
.pc__card { background: var(--paper); border: 1px solid var(--paper); border-bottom: 5px solid var(--svc-m); }
.pc__card:hover { border-color: var(--svc-d); }
</style>
