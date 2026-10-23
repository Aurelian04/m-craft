<script setup lang="ts">
import { services, serviceUrl } from '~/data/services'
import { servicePhotos } from '~/data/media'

const rows = services.map((s) => ({ ...s, cover: servicePhotos(s.slug).cover }))

usePageSeo({
  title: 'Servicii de renovare, amenajări și instalații în Suceava',
  description: 'Amenajări interioare și exterioare, fațade, gresie, faianță și parchet, șape autonivelante, instalații sanitare și electrice, mentenanță în județul Suceava.',
  image: rows[0]?.cover,
})
</script>

<template>
  <div class="wrap page">
    <Breadcrumbs :items="[{ name: 'Servicii' }]" />
    <header class="head">
      <h1>Servicii</h1>
      <p class="lead">
        Lucrări de renovare și amenajare pentru case, apartamente și spații comerciale din județul Suceava.
        Alegeți serviciul pentru detalii despre lucrare, materiale, ce influențează oferta și întrebări frecvente.
      </p>
    </header>

    <ul class="list">
      <li v-for="s in rows" :key="s.slug" v-reveal class="row">
        <NuxtLink :to="serviceUrl(s.slug)" class="row__img" tabindex="-1" aria-hidden="true">
          <Pic v-if="s.cover" :photo="s.cover" sizes="(max-width: 700px) 100vw, 260px" ratio="4 / 3" alt="" />
          <span v-else class="row__ph"><span /></span>
        </NuxtLink>
        <div class="row__body">
          <h2><NuxtLink :to="serviceUrl(s.slug)">{{ s.name }}</NuxtLink></h2>
          <p>{{ s.summary }}</p>
          <ul class="row__topics">
            <li v-for="sec in s.sections.slice(0, 4)" :key="sec.title">{{ sec.title }}</li>
          </ul>
        </div>
        <div class="row__cta">
          <NuxtLink :to="serviceUrl(s.slug)" class="btn btn--outline btn--sm">Detalii</NuxtLink>
          <NuxtLink :to="`/contact/?serviciu=${s.slug}#oferta`" class="btn btn--primary btn--sm">Cere o ofertă</NuxtLink>
        </div>
      </li>
    </ul>

    <section class="section">
      <h2 class="steps-title">Cum lucrăm</h2>
      <ProcessSteps />
    </section>
  </div>
</template>

<style scoped>
.page {
  padding-top: 20px;
}

.head {
  margin-bottom: 22px;
}

.head h1 {
  margin-bottom: 8px;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 3px solid var(--ink);
}

.row {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) auto;
  gap: 20px;
  align-items: center;
  margin: 0;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.row__ph {
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 3;
  background: var(--concrete);
}

.row__ph span {
  width: 44px;
  height: 44px;
  border-left: 6px solid var(--amber);
  border-bottom: 6px solid var(--amber);
}

.row__body h2 {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.row__body h2 a {
  color: var(--ink);
  text-decoration: none;
}

.row__body h2 a:hover {
  text-decoration: underline;
  text-decoration-color: var(--amber);
}

.row__body p {
  color: var(--ink-2);
  margin-bottom: 6px;
}

.row__topics {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.85rem;
  color: var(--ink-2);
}

.row__topics li {
  margin: 0;
}

.row__topics li + li::before {
  content: '·';
  margin-right: 14px;
  color: var(--amber);
  font-weight: 700;
}

.row__cta {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.steps-title {
  margin-bottom: 22px;
}

@media (max-width: 900px) {
  .row {
    grid-template-columns: 160px minmax(0, 1fr);
  }

  .row__cta {
    grid-column: 2;
    flex-direction: row;
  }
}

@media (max-width: 560px) {
  .row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .row__cta {
    grid-column: auto;
  }

  .row__cta .btn {
    flex: 1;
  }
}
</style>
