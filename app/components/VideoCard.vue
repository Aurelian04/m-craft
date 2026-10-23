<script setup lang="ts">
import { videoSrc, videoPoster, type Video } from '~/data/media'

// Clipul nu se descarcă până la apăsarea „Redă” (preload="none" + copertă). Fără sunet, fără autoplay.
const props = defineProps<{ video: Video }>()
const active = ref(false)
const el = ref<HTMLVideoElement | null>(null)

const duration = computed(() => {
  const s = Math.round(props.video.duration)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
})

async function play() {
  active.value = true
  await nextTick()
  el.value?.play().catch(() => {})
}
</script>

<template>
  <figure class="vc">
    <div class="vc__frame" :style="{ aspectRatio: `${video.w} / ${video.h}` }">
      <video
        v-if="active"
        ref="el"
        :src="videoSrc(video)"
        :poster="videoPoster(video)"
        controls
        playsinline
        muted
        preload="none"
        :width="video.w"
        :height="video.h"
      />
      <button v-else type="button" class="vc__poster" :aria-label="`Redă clipul: ${video.title}`" @click="play">
        <img :src="videoPoster(video)" alt="" :width="video.w" :height="video.h" loading="lazy" decoding="async">
        <span class="vc__play"><AppIcon name="play" /></span>
        <span class="vc__dur">{{ duration }}</span>
      </button>
    </div>
    <figcaption>{{ video.title }}</figcaption>
  </figure>
</template>

<style scoped>
.vc {
  margin: 0;
}

.vc__frame {
  position: relative;
  background: var(--concrete);
  overflow: hidden;
  border-radius: var(--r-md);
  isolation: isolate;
}

.vc__frame video,
.vc__poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vc__poster {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  cursor: pointer;
  background: none;
}

.vc__play {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  color: var(--ink);
  transition: background-color 0.15s;
}

.vc__play svg {
  width: 24px;
  height: 24px;
  margin-left: 3px;
}

.vc__poster:hover .vc__play {
  background: var(--amber);
}

.vc__dur {
  position: absolute;
  right: 6px;
  bottom: 6px;
  padding: 1px 6px;
  background: var(--paper);
  border-radius: var(--r-sm);
  font-size: 0.8rem;
  font-weight: 550;
}

figcaption {
  margin-top: 6px;
  font-size: 0.925rem;
  font-weight: 500;
  line-height: 1.35;
}

/* Culoare (docs/design/culoare.md) */
.vc__play { background: var(--amber); border: 1px solid var(--amber-line); color: var(--ink); }
.vc__poster:hover .vc__play { background: var(--paper); }
.vc__dur { background: var(--ink); color: #fff; }
figcaption { border-left: 3px solid var(--amber); padding-left: 8px; }
</style>
