<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { search } = useSiteSearch()

const q = ref(typeof route.query.q === 'string' ? route.query.q : '')
const term = computed(() => (typeof route.query.q === 'string' ? route.query.q.trim() : ''))
const results = computed(() => (term.value ? search(term.value) : []))

watch(term, (t) => (q.value = t))

function submit() {
  router.push({ path: '/cautare/', query: q.value.trim() ? { q: q.value.trim() } : {} })
}

usePageSeo({
  title: 'Căutare pe site',
  description: 'Căutați în serviciile, proiectele și articolele M-CRAFT.',
  noindex: true,
})
</script>

<template>
  <div class="wrap page">
    <Breadcrumbs :items="[{ name: 'Căutare' }]" />
    <h1>Căutare pe site</h1>
    <form class="sf" role="search" @submit.prevent="submit">
      <label for="q" class="visually-hidden">Termen de căutare</label>
      <input id="q" v-model="q" type="search" name="q" placeholder="ex. gresie baie, tavan gips carton, sapa" autocomplete="off">
      <button type="submit" class="btn btn--dark"><AppIcon name="search" />Caută</button>
    </form>
    <p class="hint">Căutarea include serviciile, proiectele și articolele de pe acest site și funcționează și fără diacritice.</p>

    <ClientOnly>
      <div v-if="term" aria-live="polite">
        <p class="count">
          <template v-if="results.length">{{ results.length }} rezultate pentru „{{ term }}”</template>
          <template v-else>Nu am găsit nimic pentru „{{ term }}”. Încercați un cuvânt mai scurt sau un alt termen, de exemplu „gresie”, „glet” sau „baie”.</template>
        </p>
        <ol v-if="results.length" class="res">
          <li v-for="r in results" :key="r.doc.url" :data-type="r.doc.type">
            <span class="res__type">{{ r.doc.type }}</span>
            <h2><NuxtLink :to="r.doc.url">{{ r.doc.title }}</NuxtLink></h2>
            <p>{{ r.snippet }}</p>
          </li>
        </ol>
      </div>
    </ClientOnly>

  </div>
</template>

<style scoped>
.page {
  padding-top: 20px;
  max-width: 900px;
}

h1 {
  margin-bottom: 14px;
}

.sf {
  display: flex;
  gap: 8px;
}

.sf input {
  flex: 1;
  min-height: 48px;
  padding: 10px 14px;
  border: 1px solid #b9b2a5;
  background: var(--paper);
  font: inherit;
  color: var(--ink);
}

.sf input:focus {
  outline: 2px solid var(--focus);
  border-color: var(--focus);
}

.hint,
.count {
  font-size: 0.9rem;
  color: var(--ink-2);
  margin-top: 8px;
}

.count {
  margin-top: 22px;
}

.res {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
}

.res li {
  margin: 0;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.res__type {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--rust);
  margin-bottom: 2px;
}

.res h2 {
  font-size: 1.3rem;
  margin-bottom: 4px;
}

.res h2 a {
  color: var(--ink);
}

.res p {
  font-size: 0.925rem;
  color: var(--ink-2);
  margin: 0;
}

/* Culoare (docs/design/culoare.md) */
.res li { padding-left: 14px; border-left: 4px solid var(--type-m, var(--line)); }
.res li[data-type='Serviciu'] { --type-d: var(--chihlimbar-d); --type-m: var(--amber); --type-t: var(--chihlimbar-t); }
.res li[data-type='Proiect'] { --type-d: var(--teracota-d); --type-m: var(--teracota-m); --type-t: var(--teracota-t); }
.res li[data-type='Articol'] { --type-d: var(--otel-d); --type-m: var(--otel-m); --type-t: var(--otel-t); }
.res li[data-type='Pagină'] { --type-d: var(--beton-d); --type-m: var(--beton-m); --type-t: var(--beton-t); }
.res__type { padding: 1px 8px; background: var(--type-t); color: var(--type-d); }
.res h2 a { text-decoration-color: var(--type-d); }
.sf { padding: 14px; background: var(--chihlimbar-t); border-top: 4px solid var(--amber); }
.sf input { border-color: #958b7a; }
</style>
