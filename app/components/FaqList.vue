<script setup lang="ts">
import type { Faq } from '~/data/types'

const props = defineProps<{ items: Faq[]; ld?: boolean }>()

// FAQPage doar pentru întrebările reale din pagină
if (props.ld) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        key: 'ld-faq',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: props.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }),
      },
    ],
  })
}
</script>

<template>
  <div class="faq">
    <details v-for="(f, i) in items" :key="i">
      <summary>{{ f.q }}</summary>
      <p>{{ f.a }}</p>
    </details>
  </div>
</template>

<style scoped>
.faq {
  border-top: 1px solid var(--line);
}

details {
  border-bottom: 1px solid var(--line);
}

summary {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 13px 0;
  font-weight: 600;
  cursor: pointer;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

summary::after {
  content: '+';
  flex: none;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  font-weight: 500;
  line-height: 1;
}

details[open] summary::after {
  content: '−';
  background: var(--amber-soft);
}

details p {
  margin: 0 0 14px;
  color: var(--ink-2);
  max-width: 75ch;
}
</style>
