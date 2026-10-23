<script setup lang="ts">
// Ilustrație 3D (CSS 3D, fără biblioteci): colțul unei încăperi care se asamblează pe straturi.
// Pornește când ajunge în ecran, rulează o singură dată, apoi rămâne asamblată.
// La „mișcare redusă” sau fără suport 3D se afișează direct starea finală.
const stages = [
  { id: 'sapa', label: 'Șapă', text: 'Stratul de egalizare peste placa de beton.' },
  { id: 'gresie', label: 'Gresie', text: 'Pardoseala, montată pe șapa uscată.' },
  { id: 'structura', label: 'Structură metalică', text: 'Profilele pentru peretele de gips-carton.' },
  { id: 'placare', label: 'Gips-carton', text: 'Plăcile înșurubate pe structură.' },
  { id: 'faianta', label: 'Faianță', text: 'Placarea peretelui în zona umedă.' },
  { id: 'finisaj', label: 'Glet și vopsea', text: 'Finisajul pereților și plinta.' },
] as const

const STEP_MS = 1100
const root = ref<HTMLElement | null>(null)
const stage = ref<number>(stages.length) // pe server și fără JS: încăperea completă
const running = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
let io: IntersectionObserver | undefined

function play() {
  clearTimeout(timer)
  running.value = true
  stage.value = 0
  const next = () => {
    stage.value++
    if (stage.value < stages.length) timer = setTimeout(next, STEP_MS)
    else running.value = false
  }
  timer = setTimeout(next, 400)
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const has3d = CSS.supports('transform-style', 'preserve-3d')
  if (reduced || !has3d || !('IntersectionObserver' in window)) return
  stage.value = 0
  io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      io?.disconnect()
      play()
    }
  }, { threshold: 0.35 })
  if (root.value) io.observe(root.value)
})

onBeforeUnmount(() => {
  clearTimeout(timer)
  io?.disconnect()
})

const on = (id: (typeof stages)[number]['id']) => stage.value > stages.findIndex((s) => s.id === id)
const tiles = Array.from({ length: 36 }, (_, i) => i)
const wallTiles = Array.from({ length: 24 }, (_, i) => i)
const studs = [0, 1, 2, 3, 4, 5]
</script>

<template>
  <figure ref="root" class="ra">
    <div class="ra__scene" aria-hidden="true">
      <div class="room">
        <!-- placa de beton -->
        <div class="slab" />
        <div class="screed" :class="{ in: on('sapa') }" />
        <div class="floor-tiles" :class="{ in: on('gresie') }">
          <span v-for="t in tiles" :key="t" :style="{ transitionDelay: `${(t % 6 + Math.floor(t / 6)) * 35}ms` }" />
        </div>

        <!-- peretele din stânga: structură, plăci, finisaj -->
        <div class="wall wall--left">
          <div class="wall__studs" :class="{ in: on('structura') }">
            <span v-for="s in studs" :key="s" :style="{ transitionDelay: `${s * 70}ms` }" />
            <i />
            <i />
          </div>
          <div class="wall__boards" :class="{ in: on('placare') }">
            <span v-for="s in 3" :key="s" :style="{ transitionDelay: `${s * 110}ms` }" />
          </div>
          <div class="wall__paint" :class="{ in: on('finisaj') }" />
          <div class="skirting" :class="{ in: on('finisaj') }" />
        </div>

        <!-- peretele din spate: zidărie, faianță parțială -->
        <div class="wall wall--back">
          <div class="wall__plaster" :class="{ in: on('placare') }" />
          <div class="wall__tiles" :class="{ in: on('faianta') }">
            <span v-for="t in wallTiles" :key="t" :style="{ transitionDelay: `${(t % 4 + Math.floor(t / 4)) * 40}ms` }" />
          </div>
          <div class="wall__paint wall__paint--back" :class="{ in: on('finisaj') }" />
        </div>
      </div>
    </div>

    <figcaption class="ra__legend">
      <ul>
        <li v-for="(s, i) in stages" :key="s.id" :class="{ done: stage > i, now: running && stage === i + 1 }">
          <strong>{{ s.label }}</strong>
          <span>{{ s.text }}</span>
        </li>
      </ul>
      <div class="ra__foot">
        <small>Ilustrație animată a ordinii straturilor într-o încăpere. Nu reprezintă o lucrare executată.</small>
        <button v-if="!running && stage >= stages.length" type="button" class="ra__replay" @click="play">Reia animația</button>
      </div>
    </figcaption>
  </figure>
</template>

<style scoped>
.ra {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 20px;
  align-items: center;
  margin: 0;
  background: var(--paper);
  border: 1px solid var(--line);
  padding: 16px;
}

.ra__scene {
  height: 330px;
  display: grid;
  place-items: center;
  perspective: 1400px;
  perspective-origin: 50% 30%;
  overflow: hidden;
  background: var(--bg);
}

/* Geometrie: podea 240x240 în planul XY; pereții se ridică din marginea din spate și din stânga. */
.room {
  --s: 240px;
  --h: 150px;
  position: relative;
  width: var(--s);
  height: var(--s);
  transform-style: preserve-3d;
  transform: translateY(84px) rotateX(58deg) rotateZ(42deg);
}

.room > div,
.wall > div {
  position: absolute;
  transform-style: preserve-3d;
}

.slab {
  inset: -8px;
  background: #b9b3a8;
  transform: translateZ(-14px);
  box-shadow: 0 0 0 1px #a39d92;
}

.slab::before {
  /* grosimea plăcii, vizibilă pe muchiile din față */
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 14px;
  background: #a39d92;
  transform-origin: bottom;
  transform: rotateX(-90deg);
}

.screed {
  inset: 0;
  background: #cfc9bd;
  transform: translateZ(-4px);
  opacity: 0;
  transition: opacity 0.5s ease, transform 0.6s ease;
}

.screed.in {
  opacity: 1;
  transform: translateZ(0);
}

.floor-tiles {
  inset: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2px;
  padding: 1px;
  transform: translateZ(1px);
}

.floor-tiles span {
  background: #e4ddd0;
  border: 1px solid #d5ccbc;
  opacity: 0;
  transform: translateZ(24px);
  transition: opacity 0.3s ease, transform 0.35s ease;
}

.floor-tiles.in span {
  opacity: 1;
  transform: none;
}

.wall {
  width: var(--s);
  height: var(--h);
  transform-style: preserve-3d;
}

/* Ambii pereți pornesc din colțul din spate (0,0) și se ridică pe axa Z.
   Peretele din spate: pe latura de sus a podelei. Peretele din stânga: pe latura stângă,
   cu fața spre interiorul încăperii. */
.wall--back {
  top: calc(-1 * var(--h));
  left: 0;
  transform-origin: 50% 100%;
  transform: rotateX(-90deg);
  background: #c9a68f; /* zidărie */
}

.wall--left {
  top: calc(-1 * var(--h));
  left: calc(-1 * var(--s));
  transform-origin: 100% 100%;
  transform: rotateZ(-90deg) rotateX(-90deg);
  background: transparent;
  outline: 1px dashed #b9b2a5;
}

.wall__studs {
  inset: 0;
}

.wall__studs span {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6px;
  background: #a7adb2;
  opacity: 0;
  transform: translateY(-30px);
  transition: opacity 0.3s ease, transform 0.4s ease;
}

.wall__studs span:nth-child(1) { left: 0; }
.wall__studs span:nth-child(2) { left: 19%; }
.wall__studs span:nth-child(3) { left: 39%; }
.wall__studs span:nth-child(4) { left: 59%; }
.wall__studs span:nth-child(5) { left: 79%; }
.wall__studs span:nth-child(6) { right: 0; }

.wall__studs i {
  position: absolute;
  left: 0;
  right: 0;
  height: 6px;
  background: #959ba0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.wall__studs i:first-of-type { top: 0; }
.wall__studs i:last-of-type { bottom: 0; }

.wall__studs.in span,
.wall__studs.in i {
  opacity: 1;
  transform: none;
}

.wall__boards {
  inset: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  transform: translateZ(4px);
}

.wall__boards span {
  background: #ecebe6;
  border: 1px solid #d9d7cf;
  opacity: 0;
  transform: translateZ(30px);
  transition: opacity 0.35s ease, transform 0.45s ease;
}

.wall__boards.in span {
  opacity: 1;
  transform: none;
}

.wall__plaster {
  inset: 0;
  background: #e7e3da;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.wall__plaster.in {
  opacity: 1;
}

.wall__tiles {
  left: 54%;
  right: 0;
  top: 18%;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 2px;
  padding: 2px;
  transform: translateZ(2px);
}

.wall__tiles span {
  background: #a9c3bd;
  opacity: 0;
  transform: translateZ(20px);
  transition: opacity 0.3s ease, transform 0.35s ease;
}

.wall__tiles.in span {
  opacity: 1;
  transform: none;
}

.wall__paint {
  inset: 0;
  background: #f4efe6;
  opacity: 0;
  transform: translateZ(6px);
  transition: opacity 0.7s ease;
}

.wall__paint--back {
  right: 46%;
  transform: translateZ(3px);
}

.wall__paint.in {
  opacity: 1;
}

.skirting {
  left: 0;
  right: 0;
  bottom: 0;
  height: 8px;
  background: var(--amber);
  transform: translateZ(8px);
  opacity: 0;
  transition: opacity 0.5s ease 0.3s;
}

.skirting.in {
  opacity: 1;
}

/* Legendă */
.ra__legend ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ra__legend li {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 8px;
  margin: 0;
  padding: 7px 0 7px 12px;
  border-left: 3px solid var(--line);
  color: var(--ink-3);
  transition: border-color 0.3s ease, color 0.3s ease;
}

.ra__legend li.done {
  border-left-color: var(--amber);
  color: var(--ink);
}

.ra__legend li.now {
  background: var(--amber-soft);
}

.ra__legend strong {
  font-weight: 600;
}

.ra__legend span {
  font-size: 0.9rem;
}

.ra__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 10px;
}

.ra__foot small {
  color: var(--ink-2);
  font-size: 0.8rem;
}

.ra__replay {
  border: 1px solid var(--line);
  background: var(--paper);
  padding: 6px 10px;
  font-size: 0.875rem;
  cursor: pointer;
}

.ra__replay:hover {
  border-color: var(--ink);
}

@media (max-width: 860px) {
  .ra {
    grid-template-columns: 1fr;
  }

  .ra__scene {
    height: 280px;
  }

  .room {
    --s: 200px;
    --h: 140px;
  }
}

@media (max-width: 480px) {
  .ra__legend li {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
