<script setup lang="ts">
import type { Review } from '~/data/reviews'

defineProps<{ reviews: Review[] }>()
</script>

<template>
  <ul class="rv">
    <li class="band band--top" v-for="(r, i) in reviews" :key="i">
      <blockquote>
        <p>{{ r.text }}</p>
      </blockquote>
      <p class="rv__meta">
        <strong>{{ r.author }}</strong>
        <span v-if="r.date"> · {{ r.date }}</span>
        ·
        <a v-if="r.url" :href="r.url" target="_blank" rel="noopener">{{ r.source }}</a>
        <span v-else>{{ r.source }}</span>
      </p>
    </li>
  </ul>
</template>

<style scoped>
.rv {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.rv li {
  margin: 0;
  background: var(--paper);
  border: 1px solid var(--line);
  border-top: 3px solid var(--amber);
  border-radius: var(--r-lg);
  padding: 16px;
}

blockquote {
  margin: 0 0 10px;
}

.rv__meta {
  font-size: 0.875rem;
  color: var(--ink-2);
  margin: 0;
}

/* Culoare (docs/design/culoare.md) */
.rv li { --band: var(--amber); --band-w: 3px; border-top: 1px solid var(--band); padding-top: 19px; }
.rv li:nth-child(3n + 2) { --band: var(--teracota-d); }
.rv li:nth-child(3n) { --band: var(--verde-d); }
.rv__meta strong { color: var(--teracota-d); }
</style>
