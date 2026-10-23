<script setup lang="ts">
import { company, fullAddress } from '~/data/company'

// Harta Google se încarcă doar la cerere; până atunci browserul nu contactează Google.
// Pinul e poziționat după adresă (fără coordonate introduse manual).
const shown = ref(false)
const query = encodeURIComponent(`${company.address.street}, ${company.address.locality} ${company.address.postalCode}, Suceava, România`)
const src = `https://www.google.com/maps?q=${query}&output=embed`
const link = `https://www.google.com/maps/search/?api=1&query=${query}`
</script>

<template>
  <div class="map band band--top">
    <iframe v-if="shown" :src="src" title="Hartă: sediul M-CRAFT" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
    <div v-else class="map__ph">
      <AppIcon name="pin" />
      <p><strong>Sediul firmei</strong><br>{{ fullAddress }}</p>
      <button type="button" class="btn btn--outline btn--sm" @click="shown = true">Afișează harta</button>
      <small>Harta este furnizată de Google Maps și se încarcă doar după ce apăsați butonul.</small>
      <a :href="link" target="_blank" rel="noopener">Deschide în Google Maps</a>
    </div>
  </div>
</template>

<style scoped>
.map {
  aspect-ratio: 4 / 3;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--concrete);
}

.map iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.map__ph {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  text-align: center;
}

.map__ph svg {
  width: 32px;
  height: 32px;
  color: var(--rust);
}

.map__ph p {
  margin: 0;
}

.map__ph small {
  color: var(--ink-2);
  max-width: 36ch;
}

/* Culoare (docs/design/culoare.md) */
.map { background: var(--otel-t); border-top-color: var(--otel-d); --band: var(--otel-d); --band-w: 3px; }
.map__ph svg { color: var(--teracota-d); }
</style>
