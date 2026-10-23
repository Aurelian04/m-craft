<script setup lang="ts">
import { company, whatsappUrl } from '~/data/company'
import { reviews } from '~/data/reviews'

usePageSeo({
  title: 'Recenzii clienți',
  description: 'Recenziile clienților M-CRAFT pentru lucrări de renovare și amenajare din județul Suceava. Publicăm doar recenzii reale, cu sursa lor.',
  noindex: reviews.length === 0,
})
</script>

<template>
  <div class="wrap page">
    <Breadcrumbs :items="[{ name: 'Recenzii' }]" />
    <h1>Recenzii</h1>

    <template v-if="reviews.length">
      <p class="lead">Recenzii primite de la clienți, cu sursa fiecăreia.</p>
      <ReviewList :reviews="reviews" />
    </template>

    <div v-else class="empty">
      <p class="lead">
        Pe această pagină publicăm doar recenzii reale ale clienților noștri, cu sursa lor. Deocamdată nu am publicat
        nicio recenzie pe site.
      </p>
      <p>
        Dacă am lucrat pentru dumneavoastră și doriți să ne lăsați o părere, ne-o puteți trimite pe
        <a :href="`mailto:${company.email}?subject=${encodeURIComponent('Recenzie M-CRAFT')}`">email</a> sau pe
        <a :href="whatsappUrl('Bună ziua! Aș dori să las o recenzie pentru lucrarea făcută de M-CRAFT.')" target="_blank" rel="noopener">WhatsApp</a>.
        O publicăm doar cu acordul dumneavoastră și cu numele pe care ni-l indicați.
      </p>
      <p>Între timp, puteți vedea <NuxtLink to="/proiecte/">fotografii din lucrările noastre</NuxtLink>.</p>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-top: 20px;
}

h1 {
  margin-bottom: 10px;
}

.empty {
  max-width: 70ch;
  padding: 18px 20px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-left: 6px solid var(--amber);
}

/* Culoare (docs/design/culoare.md) */
.empty { background: var(--chihlimbar-t); border: 0; border-left: 6px solid var(--amber); }
</style>
