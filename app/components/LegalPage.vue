<script setup lang="ts">
import type { LegalDoc } from '~/data/types'

const props = defineProps<{ doc: LegalDoc }>()
const { showDrafts } = useRuntimeConfig().public

// Notele „De validat de firmă:” sunt pentru revizuire: apar doar în preview, nu în producție.
const blocks = computed(() =>
  props.doc.body.filter((b) => showDrafts || !(b.type === 'note' && b.text.startsWith('De validat'))),
)
const updated = new Date(props.doc.updated).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })

usePageSeo({ title: props.doc.title, description: props.doc.seoDescription })
</script>

<template>
  <div class="wrap page">
    <Breadcrumbs :items="[{ name: doc.title }]" />
    <h1>{{ doc.title }}</h1>
    <p class="upd">Ultima actualizare: {{ updated }}</p>
    <ContentBlocks :blocks="blocks" />
  </div>
</template>

<style scoped>
.page {
  padding-top: 20px;
}

h1 {
  margin-bottom: 4px;
}

.upd {
  color: var(--ink-2);
  font-size: 0.9rem;
  margin-bottom: 24px;
}

/* Culoare (docs/design/culoare.md) */
.upd { display: inline-block; padding: 2px 10px; background: var(--otel-t); color: var(--otel-d); border-radius: var(--r-sm); }
.page :deep(.prose h2) { border-top: 3px solid var(--otel-m); padding-top: 12px; }
.page :deep(.prose li::marker) { color: var(--otel-d); }
</style>
