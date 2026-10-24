<script setup lang="ts">
import { photoSrc, photoSrcset, stageLabel, type Photo } from '~/data/media'

// Vizualizator luminos: închidere vizibilă, săgeți, Escape, swipe pe mobil.
const props = defineProps<{ photos: Photo[] }>()
const index = defineModel<number | null>({ required: true })

const dialog = ref<HTMLDialogElement | null>(null)
const current = computed(() => (index.value === null ? null : props.photos[index.value]))

watch(index, async (i) => {
  await nextTick()
  if (i !== null && !dialog.value?.open) dialog.value?.showModal()
  if (i === null && dialog.value?.open) dialog.value.close()
})

function go(d: 1 | -1) {
  if (index.value === null) return
  index.value = (index.value + d + props.photos.length) % props.photos.length
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') go(1)
  else if (e.key === 'ArrowLeft') go(-1)
}

let x0: number | null = null
function touchStart(e: TouchEvent) {
  x0 = e.touches[0]?.clientX ?? null
}
function touchEnd(e: TouchEvent) {
  if (x0 === null) return
  const dx = (e.changedTouches[0]?.clientX ?? x0) - x0
  if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  x0 = null
}
</script>

<template>
  <dialog
    ref="dialog"
    class="lb"
    aria-label="Vizualizare fotografie"
    @close="index = null"
    @keydown="onKey"
    @click.self="index = null"
  >
    <div v-if="current" class="lb__in" @touchstart.passive="touchStart" @touchend="touchEnd">
      <div class="lb__top">
        <span class="lb__count">{{ (index ?? 0) + 1 }} / {{ photos.length }}</span>
        <button type="button" class="lb__close" autofocus @click="index = null">
          <AppIcon name="close" />
          <span>Închide</span>
        </button>
      </div>
      <figure class="lb__fig">
        <img
          :src="photoSrc(current, current.widths.at(-1)!)"
          :srcset="photoSrcset(current)"
          sizes="(max-width: 900px) 100vw, 1100px"
          :alt="current.alt"
          :width="current.w"
          :height="current.h"
        >
        <figcaption>
          {{ current.alt }}
          <span v-if="stageLabel[current.stage]" class="lb__stage">{{ stageLabel[current.stage] }}</span>
        </figcaption>
      </figure>
      <button v-if="photos.length > 1" type="button" class="lb__nav lb__nav--prev" aria-label="Fotografia anterioară" @click="go(-1)">
        <AppIcon name="chevron-left" />
      </button>
      <button v-if="photos.length > 1" type="button" class="lb__nav lb__nav--next" aria-label="Fotografia următoare" @click="go(1)">
        <AppIcon name="chevron-right" />
      </button>
    </div>
  </dialog>
</template>

<style scoped>
.lb {
  width: 100vw;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: var(--bg);
  color: var(--ink);
}

.lb::backdrop {
  background: var(--bg);
}

.lb__in {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px 16px 16px;
}

.lb__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.lb__count {
  font-size: 0.9rem;
  color: var(--ink-2);
}

.lb__close {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid var(--ink);
  border-radius: var(--r-md);
  background: var(--paper);
  font-weight: 550;
  cursor: pointer;
}

.lb__close svg {
  width: 18px;
  height: 18px;
}

.lb__fig {
  flex: 1;
  min-height: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.lb__fig img {
  flex: 1;
  min-height: 0;
  width: auto;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  background: var(--concrete);
  border-radius: var(--r-md);
}

.lb__fig figcaption {
  max-width: 80ch;
  text-align: center;
  font-size: 0.925rem;
  color: var(--ink-2);
}

.lb__stage {
  display: inline-block;
  margin-left: 8px;
  padding: 0 6px;
  border: 1px solid var(--line);
  border-radius: var(--r-sm);
  font-size: 0.8rem;
}

.lb__nav {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  display: grid;
  place-items: center;
  width: 48px;
  height: 64px;
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  background: var(--paper);
  cursor: pointer;
}

.lb__nav:hover {
  border-color: var(--ink);
}

.lb__nav svg {
  width: 24px;
  height: 24px;
}

.lb__nav--prev {
  left: 16px;
}

.lb__nav--next {
  right: 16px;
}

@media (max-width: 700px) {
  .lb__nav {
    top: auto;
    bottom: 64px;
    translate: none;
    width: 44px;
    height: 44px;
  }
}

/* Culoare (docs/design/culoare.md) */
.lb__close { background: var(--amber); border-color: var(--amber-line); }
.lb__nav:hover { background: var(--amber); border-color: var(--amber-line); }
.lb__stage { background: var(--chihlimbar-t); border-color: var(--amber); color: var(--chihlimbar-d); }
.lb__count { color: var(--teracota-d); font-weight: 550; }
</style>
