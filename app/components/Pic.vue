<script setup lang="ts">
import { photoSrc, photoSrcset, type Photo } from '~/data/media'

const props = withDefaults(
  defineProps<{
    photo: Photo
    sizes?: string
    /** imaginea principală a paginii: se încarcă imediat */
    priority?: boolean
    /** raport impus (ex. '4 / 3'); fără el se păstrează proporția originală */
    ratio?: string
    /** poziția decupajului când e impus un raport */
    position?: string
    alt?: string
  }>(),
  { sizes: '100vw', priority: false, ratio: undefined, position: 'center', alt: undefined },
)

const fallback = computed(() => {
  const ws = props.photo.widths
  return photoSrc(props.photo, ws[Math.min(1, ws.length - 1)]!)
})
</script>

<template>
  <img
    class="pic"
    :src="fallback"
    :srcset="photoSrcset(photo)"
    :sizes="sizes"
    :width="photo.w"
    :height="photo.h"
    :alt="alt ?? photo.alt"
    :loading="priority ? 'eager' : 'lazy'"
    :fetchpriority="priority ? 'high' : undefined"
    decoding="async"
    :style="ratio ? { aspectRatio: ratio, objectPosition: position } : undefined"
    :class="{ 'pic--crop': ratio }"
  >
</template>

<style scoped>
.pic {
  width: 100%;
  height: auto;
  background: var(--concrete);
}

.pic--crop {
  object-fit: cover;
}
</style>
