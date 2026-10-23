<script setup lang="ts">
import { media, photo, projectPhotos, projectVideos } from '~/data/media'
import { getService, serviceUrl } from '~/data/services'

const filter = ref<string>('toate')
const cats = media.categories
  .map((c) => ({ ...c, count: media.photos.filter((p) => p.categories.includes(c.id)).length }))
  .filter((c) => c.count > 0)

const groups = computed(() =>
  media.projects
    .map((pr) => {
      const all = projectPhotos(pr.id)
      const shown = filter.value === 'toate' ? all : all.filter((p) => p.categories.includes(filter.value))
      return { ...pr, shown, videos: projectVideos(pr.id) }
    })
    .filter((g) => g.shown.length > 0),
)

const total = computed(() => groups.value.reduce((n, g) => n + g.shown.length, 0))

usePageSeo({
  title: 'Proiecte: lucrări de renovare și amenajare în execuție',
  description: 'Fotografii reale din lucrările M-CRAFT: tavane și pereți din gips-carton, glet, băi placate, instalații, izolații și spații comerciale, grupate pe proiecte.',
  image: photo(media.projects[0]!.cover),
})
</script>

<template>
  <div class="wrap page">
    <Breadcrumbs :items="[{ name: 'Proiecte' }]" />
    <header class="head">
      <h1>Proiecte</h1>
      <p class="lead">
        Fotografii din lucrările noastre, grupate pe proiecte. Cele mai multe sunt făcute în timpul execuției și arată
        etapele intermediare: structura, izolația, placările și straturile de finisaj.
      </p>
    </header>

    <div class="filters" role="group" aria-label="Filtrează fotografiile">
      <button type="button" data-cat="toate" :aria-pressed="filter === 'toate'" @click="filter = 'toate'">
        Toate <span>{{ media.photos.length }}</span>
      </button>
      <button v-for="c in cats" :key="c.id" type="button" :data-cat="c.id" :aria-pressed="filter === c.id" @click="filter = c.id">
        {{ c.label }} <span>{{ c.count }}</span>
      </button>
    </div>
    <p class="count" aria-live="polite">{{ total }} fotografii în {{ groups.length }} proiecte</p>

    <section v-for="g in groups" :id="g.id" :key="g.id" class="proj" :data-svc="g.services[0]">
      <div class="proj__head">
        <div>
          <h2>{{ g.title }}</h2>
          <p>{{ g.summary }}</p>
        </div>
        <dl class="proj__meta">
          <dt>Lucrări vizibile</dt>
          <dd>
            <ul>
              <li v-for="w in g.works" :key="w">{{ w }}</li>
            </ul>
          </dd>
          <dt>Servicii</dt>
          <dd>
            <template v-for="(s, i) in g.services" :key="s">
              <NuxtLink v-if="getService(s)" :to="serviceUrl(s)">{{ getService(s)!.name }}</NuxtLink><template v-if="i < g.services.length - 1">, </template>
            </template>
          </dd>
          <template v-if="g.videos.length">
            <dt>Video</dt>
            <dd><NuxtLink :to="`/video/#${g.id}`">{{ g.videos.length }} clipuri</NuxtLink></dd>
          </template>
        </dl>
      </div>

      <div v-if="g.before_after?.length && filter === 'toate'" class="ba">
        <figure v-for="(pair, i) in g.before_after" :key="i">
          <div class="ba__pair">
            <div>
              <Pic :photo="photo(pair[0])!" sizes="(max-width: 640px) 50vw, 25vw" />
              <span>Înainte</span>
            </div>
            <div>
              <Pic :photo="photo(pair[1])!" sizes="(max-width: 640px) 50vw, 25vw" />
              <span>După</span>
            </div>
          </div>
          <figcaption>{{ pair[2] }}</figcaption>
        </figure>
      </div>

      <PhotoGallery :photos="g.shown" :columns="4" />
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

.filters {
  position: sticky;
  top: calc(var(--header-h) + 32px);
  z-index: 5;
  display: flex;
  gap: 6px;
  overflow-x: auto;
  margin: 18px 0 6px;
  padding: 8px 0;
  background: var(--bg);
  border-bottom: 1px solid var(--line);
  scrollbar-width: thin;
}

.filters button {
  flex: none;
  min-height: 40px;
  padding: 6px 12px;
  border: 1px solid var(--line);
  background: var(--paper);
  font-weight: 500;
  cursor: pointer;
}

.filters button span {
  color: var(--ink-2);
  font-size: 0.85rem;
  margin-left: 4px;
}

.filters button:hover {
  border-color: var(--ink);
}

.filters button[aria-pressed='true'] {
  background: var(--ink);
  border-color: var(--ink);
  color: #fff;
}

.filters button[aria-pressed='true'] span {
  color: #d8d4cb;
}

.count {
  font-size: 0.875rem;
  color: var(--ink-2);
}

.proj {
  padding-block: 26px;
  border-top: 3px solid var(--ink);
  margin-top: 18px;
  scroll-margin-top: calc(var(--header-h) + 100px);
}

.proj__head {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 24px;
  margin-bottom: 16px;
}

.proj__head h2 {
  margin-bottom: 8px;
}

.proj__head p {
  color: var(--ink-2);
  max-width: 70ch;
}

.proj__meta {
  margin: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 14px;
  align-content: start;
  font-size: 0.925rem;
  background: var(--paper);
  border: 1px solid var(--line);
  padding: 12px 14px;
}

.proj__meta dt {
  font-weight: 600;
}

.proj__meta dd {
  margin: 0;
}

.proj__meta ul {
  margin: 0;
  padding-left: 1.1em;
}

.proj__meta li + li {
  margin-top: 0;
}

.ba {
  margin-bottom: 16px;
}

.ba figure {
  margin: 0;
  max-width: 640px;
}

.ba__pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.ba__pair > div {
  position: relative;
}

.ba__pair span {
  position: absolute;
  left: 0;
  top: 0;
  padding: 2px 8px;
  background: var(--paper);
  font-weight: 600;
  font-size: 0.85rem;
  border-bottom: 2px solid var(--amber);
}

.ba figcaption {
  font-size: 0.875rem;
  color: var(--ink-2);
  margin-top: 6px;
}

@media (max-width: 860px) {
  .proj__head {
    grid-template-columns: 1fr;
  }

  .filters {
    top: var(--header-h);
  }
}

/* Culoare (docs/design/culoare.md) */
[data-cat='toate'] { --cat-d: var(--ink); --cat-m: var(--ink); }
[data-cat='interioare'] { --cat-d: var(--verde-d); --cat-m: var(--verde-m); }
[data-cat='comercial'] { --cat-d: var(--otel-d); --cat-m: var(--otel-m); }
[data-cat='tavane-gips-carton'] { --cat-d: var(--chihlimbar-d); --cat-m: var(--amber); }
[data-cat='bai'] { --cat-d: var(--faianta-d); --cat-m: var(--faianta-m); }
[data-cat='pardoseli'] { --cat-d: var(--lemn-d); --cat-m: var(--lemn-m); }
[data-cat='instalatii'] { --cat-d: var(--teava-d); --cat-m: var(--teava-m); }
[data-cat='izolatii'] { --cat-d: var(--xps-d); --cat-m: var(--xps-m); }
[data-cat='exterioare'] { --cat-d: var(--teracota-d); --cat-m: var(--teracota-m); }
[data-cat='constructii'] { --cat-d: var(--beton-d); --cat-m: var(--beton-m); }

.filters button { border-bottom: 4px solid var(--cat-m); }
.filters button:hover { border-color: var(--cat-d); }
.filters button[aria-pressed='true'] { background: var(--cat-d); border-color: var(--cat-d); color: #fff; }
.filters button[aria-pressed='true'] span { color: #fff; }

.proj { border-top: 6px solid var(--svc-m); }
.proj__meta { background: var(--svc-t); border: 0; border-left: 5px solid var(--svc-d); }
.proj__meta dt { color: var(--svc-d); }
.proj__meta a { color: var(--ink); text-decoration-color: var(--svc-d); }

.ba__pair > div:first-child span { background: var(--ink); color: #fff; border: 0; }
.ba__pair > div:last-child span { background: var(--amber); color: var(--ink); border: 0; }
</style>
