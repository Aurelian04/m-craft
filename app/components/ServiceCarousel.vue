<script setup lang="ts">
import { services, serviceUrl } from '~/data/services'
import { servicePhotos } from '~/data/media'

// Carusel compact cu toate serviciile, imediat sub header.
// Avansează lent (un card la 6 s), se oprește la interacțiune și nu pornește deloc la „mișcare redusă”.
const INTERVAL = 6000

const track = ref<HTMLElement | null>(null)
const playing = ref(false)
const paused = ref(false) // pauză temporară (hover, focus, atingere)
const reduced = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

const items = services.map((s) => ({ ...s, cover: servicePhotos(s.slug).cover }))

function step(dir: 1 | -1) {
  const el = track.value
  if (!el) return
  const card = el.querySelector<HTMLElement>('.svc')
  const w = card ? card.offsetWidth + 10 : 240
  const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
  if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: reduced.value ? 'auto' : 'smooth' })
  else el.scrollBy({ left: dir * w, behavior: reduced.value ? 'auto' : 'smooth' })
}

function start() {
  stop()
  timer = setInterval(() => {
    if (!paused.value && document.visibilityState === 'visible') step(1)
  }, INTERVAL)
}

function stop() {
  if (timer) clearInterval(timer)
  timer = undefined
}

function toggle() {
  playing.value = !playing.value
  if (playing.value) start()
  else stop()
}

function manual(dir: 1 | -1) {
  step(dir)
  if (playing.value) start() // repornește intervalul după o acțiune manuală
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') {
    e.preventDefault()
    manual(1)
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    manual(-1)
  }
}

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduced.value) {
    playing.value = true
    start()
  }
})
onBeforeUnmount(stop)
</script>

<template>
  <section class="carousel" aria-roledescription="carusel" aria-label="Serviciile M-CRAFT">
    <div class="wrap carousel__in">
      <div
        ref="track"
        class="track"
        tabindex="0"
        aria-label="Lista serviciilor; folosiți săgețile stânga și dreapta"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
        @focusin="paused = true"
        @focusout="paused = false"
        @touchstart.passive="paused = true"
        @keydown="onKey"
      >
        <NuxtLink v-for="s in items" :key="s.slug" :to="serviceUrl(s.slug)" class="svc" :data-svc="s.slug">
          <Pic v-if="s.cover" :photo="s.cover" sizes="88px" ratio="1 / 1" alt="" class="svc__img" />
          <svg v-else class="svc__img svc__img--none" viewBox="0 0 52 52" aria-hidden="true">
            <rect x="12" y="10" width="5" height="32" fill="var(--svc-d)" />
            <rect x="12" y="37" width="28" height="5" fill="var(--svc-d)" />
          </svg>
          <span class="svc__name">{{ s.shortName }}</span>
        </NuxtLink>
      </div>
      <div class="ctrl">
        <button type="button" aria-label="Serviciul anterior" @click="manual(-1)"><AppIcon name="chevron-left" /></button>
        <button
          v-if="!reduced"
          type="button"
          :aria-label="playing ? 'Oprește derularea automată' : 'Pornește derularea automată'"
          :aria-pressed="!playing"
          @click="toggle"
        >
          <AppIcon :name="playing ? 'pause' : 'play'" />
        </button>
        <button type="button" aria-label="Serviciul următor" @click="manual(1)"><AppIcon name="chevron-right" /></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel {
  background: var(--paper);
  border-bottom: 1px solid var(--line);
}

.carousel__in {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-block: 8px;
}

.track {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  flex: 1;
  min-width: 0;
}

.track::-webkit-scrollbar {
  display: none;
}

.svc {
  flex: 0 0 auto;
  width: 228px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--ink);
  text-decoration: none;
  scroll-snap-align: start;
  transition: border-color 0.15s ease;
}

.svc:hover {
  border-color: var(--amber);
  color: var(--ink);
}

.svc__img {
  width: 52px !important;
  height: 52px;
  flex: none;
}

.svc__img--none {
  background: var(--concrete);
}

.svc__name {
  font-weight: 600;
  font-size: 0.925rem;
  line-height: 1.25;
}

.ctrl {
  display: flex;
  gap: 4px;
  flex: none;
}

.ctrl button {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--line);
  background: var(--paper);
  cursor: pointer;
}

.ctrl button:hover {
  border-color: var(--ink);
}

.ctrl svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 640px) {
  .svc {
    width: 190px;
  }

  .ctrl button {
    width: 40px;
    height: 44px;
  }
}

/* Culoare (docs/design/culoare.md) */
.svc { background: var(--svc-t); border: 1px solid var(--svc-t); border-left: 5px solid var(--svc-d); }
.svc:hover { border-color: var(--svc-d); }
.svc__img--none { background: var(--svc-m); }
.ctrl button:hover { background: var(--amber); border-color: var(--amber-line); }
.ctrl button[aria-pressed='true'] { background: var(--chihlimbar-t); }
</style>
