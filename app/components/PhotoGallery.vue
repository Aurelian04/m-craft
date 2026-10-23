<script setup lang="ts">
import type { Photo } from '~/data/media'

// Grilă de fotografii cu proporțiile originale (fără decupaje forțate), deschise în Lightbox.
withDefaults(defineProps<{ photos: Photo[]; columns?: 2 | 3 | 4 }>(), { columns: 3 })
const open = ref<number | null>(null)
</script>

<template>
  <div v-if="photos.length" class="gal" :class="`gal--${columns}`">
    <button
      v-for="(p, i) in photos"
      :key="p.id"
      type="button"
      class="gal__item"
      :aria-label="`Mărește: ${p.alt}`"
      @click="open = i"
    >
      <Pic :photo="p" :sizes="`(max-width: 640px) 50vw, ${Math.round(100 / columns)}vw`" />
    </button>
    <Lightbox v-model="open" :photos="photos" />
  </div>
</template>

<style scoped>
.gal {
  columns: 3 220px;
  column-gap: 8px;
}

.gal--2 {
  columns: 2 220px;
}

.gal--4 {
  columns: 4 180px;
}

.gal__item {
  display: block;
  width: 100%;
  margin: 0 0 8px;
  padding: 0;
  border: 0;
  background: none;
  cursor: zoom-in;
  break-inside: avoid;
  overflow: hidden;
}

.gal__item :deep(img) {
  transition: transform 0.3s ease, filter 0.3s ease;
}

.gal__item:hover :deep(img) {
  transform: scale(1.02);
}

@media (max-width: 640px) {
  .gal {
    columns: 2;
  }
}
</style>
