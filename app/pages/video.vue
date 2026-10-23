<script setup lang="ts">
import { media, photo } from '~/data/media'

const groups = media.projects
  .map((p) => ({ ...p, videos: media.videos.filter((v) => v.project === p.id) }))
  .filter((g) => g.videos.length)

usePageSeo({
  title: 'Video: clipuri din lucrările de renovare și amenajare',
  description: 'Clipuri filmate pe șantierele M-CRAFT: glet și vopsire, compartimentări și tavane din gips-carton, băi, holuri cu gresie și spații comerciale.',
  image: photo(groups[0]!.cover),
})
</script>

<template>
  <div class="wrap page">
    <Breadcrumbs :items="[{ name: 'Video' }]" />
    <header class="head">
      <h1>Video: de la gri la gata de finisat</h1>
      <p class="lead">
        Clipuri scurte filmate de echipă în timpul lucrărilor. Clipurile pornesc doar când apăsați „Redă” și nu au sonor.
      </p>
    </header>

    <section v-for="g in groups" :id="g.id" :key="g.id" class="grp" :data-svc="g.services[0]">
      <div class="grp__head">
        <h2>{{ g.title }}</h2>
        <NuxtLink :to="`/proiecte/#${g.id}`" class="more-link">Fotografiile proiectului →</NuxtLink>
      </div>
      <div class="grid-v">
        <VideoCard v-for="v in g.videos" :key="v.id" :video="v" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  padding-top: 20px;
}

.head h1 {
  margin-bottom: 8px;
}

.grp {
  margin-top: 26px;
  padding-top: 18px;
  border-top: 3px solid var(--ink);
  scroll-margin-top: calc(var(--header-h) + 50px);
}

.grp__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 6px 20px;
  margin-bottom: 14px;
}

.grp__head h2 {
  font-size: 1.5rem;
}

.grid-v {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px;
  align-items: start;
}

@media (max-width: 480px) {
  .grid-v {
    grid-template-columns: 1fr 1fr;
  }
}

/* Culoare (docs/design/culoare.md) */
.grp { border-top: 6px solid var(--svc-m); padding-top: 0; }
.grp__head { background: var(--svc-t); padding: 10px 14px; margin-bottom: 14px; }
.grp__head .more-link { color: var(--svc-d); }
</style>
