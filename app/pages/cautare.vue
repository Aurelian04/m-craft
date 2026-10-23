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
          <li v-for="r in results" :key="r.doc.url">
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
</style>
