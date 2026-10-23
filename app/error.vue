<script setup lang="ts">
import type { NuxtError } from '#app'
import { services, serviceUrl } from '~/data/services'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

useHead({ title: notFound.value ? 'Pagina nu a fost găsită | M-CRAFT' : 'Eroare | M-CRAFT', meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <NuxtLayout>
    <div class="wrap page">
      <div class="err on-amber">
      <h1>{{ notFound ? 'Pagina nu a fost găsită' : 'A apărut o eroare' }}</h1>
      <p class="lead">
        {{ notFound ? 'Adresa poate fi greșită sau pagina a fost mutată.' : 'Încercați din nou peste câteva momente.' }}
        Puteți continua de aici:
      </p>
      <div class="links">
        <NuxtLink to="/" class="btn btn--primary" @click="clearError({ redirect: '/' })">Pagina principală</NuxtLink>
        <NuxtLink to="/servicii/" class="btn btn--outline">Servicii</NuxtLink>
        <NuxtLink to="/contact/" class="btn btn--outline">Contact</NuxtLink>
      </div>
      </div>
      <ul class="svc">
        <li v-for="s in services" :key="s.slug" :data-svc="s.slug"><NuxtLink :to="serviceUrl(s.slug)">{{ s.name }}</NuxtLink></li>
      </ul>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.page {
  padding-block: 40px;
}

h1 {
  margin-bottom: 10px;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 24px;
}

.svc {
  columns: 2 240px;
}

/* Culoare (docs/design/culoare.md) */
.err { padding: 24px; }
.err .links { margin-bottom: 0; }
.svc { list-style: none; padding: 0; margin-top: 24px; display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 8px; columns: auto; }
.svc li { margin: 0; }
.svc a { display: block; padding: 10px 12px; background: var(--svc-t); border-left: 5px solid var(--svc-d); color: var(--ink); text-decoration: none; font-weight: 600; }
.svc a:hover { border-left-width: 9px; }
</style>
