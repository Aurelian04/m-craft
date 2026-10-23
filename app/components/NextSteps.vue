<script setup lang="ts">
// Ce se întâmplă după ce clientul ne contactează: explicat simplu, fără numere decorative și fără promisiuni de termen.
defineProps<{ compact?: boolean }>()
const steps = [
  { title: 'Ne spuneți ce lucrare aveți', text: 'Prin telefon, WhatsApp sau formular: tipul lucrării și localitatea. Fotografiile spațiului ne ajută mult.' },
  { title: 'Clarificăm detaliile', text: 'Vă punem întrebările necesare pentru ofertă: suprafețe, starea actuală, materialele dorite.' },
  { title: 'Primiți oferta', text: 'Cu lucrările și materialele discutate. Decideți apoi dacă mergem mai departe.' },
]
</script>

<template>
  <ol class="ns" :class="{ 'ns--compact': compact }" aria-label="Ce urmează după ce ne contactați">
    <li v-for="s in steps" :key="s.title">
      <strong>{{ s.title }}</strong>
      <span>{{ s.text }}</span>
    </li>
  </ol>
</template>

<style scoped>
.ns {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.ns li {
  margin: 0;
  padding: 12px 14px;
  background: var(--paper);
  border-radius: var(--r-md);
  border-top: 4px solid var(--amber);
  display: grid;
  gap: 4px;
}

.ns li:nth-child(2) {
  border-top-color: var(--teracota-d);
}

.ns li:nth-child(3) {
  border-top-color: var(--verde-d);
}

.ns strong {
  font-weight: 600;
  line-height: 1.3;
}

.ns span {
  font-size: 0.9rem;
  color: var(--ink-2);
}

.ns--compact {
  grid-template-columns: 1fr;
}

.ns--compact li {
  padding: 8px 12px;
}

@media (max-width: 760px) {
  .ns {
    grid-template-columns: 1fr;
  }
}
</style>
