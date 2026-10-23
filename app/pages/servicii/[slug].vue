<script setup lang="ts">
import { company } from '~/data/company'
import { getService, serviceUrl } from '~/data/services'
import { media, servicePhotos } from '~/data/media'
import { visiblePosts, postUrl } from '~/data/posts'

const route = useRoute()
const slug = route.params.slug as string
const service = getService(slug)
if (!service) throw createError({ statusCode: 404, statusMessage: 'Serviciul nu există', fatal: true })

const { cover, gallery } = servicePhotos(slug)
const galleryPhotos = gallery.filter((p) => p.id !== cover?.id)
const related = service.related.map(getService).filter((s) => !!s)
const projects = media.projects.filter((p) => p.services.includes(slug))
const { showDrafts } = useRuntimeConfig().public
const posts = visiblePosts(showDrafts).filter((p) => p.relatedServices.includes(slug)).slice(0, 3)

usePageSeo({ title: service.seoTitle, description: service.seoDescription, image: cover })

const { siteUrl } = useRuntimeConfig().public
if (siteUrl) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        key: 'ld-service',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.name,
          serviceType: service.name,
          description: service.seoDescription,
          url: `${siteUrl}${serviceUrl(slug)}`,
          areaServed: { '@type': 'AdministrativeArea', name: 'Județul Suceava' },
          provider: { '@id': `${siteUrl}/#firma` },
        }),
      },
    ],
  })
}
</script>

<template>
  <div v-if="service" :data-svc="slug">
    <section class="intro">
      <div class="wrap">
        <Breadcrumbs :items="[{ name: 'Servicii', path: '/servicii/' }, { name: service.name }]" />
        <div class="intro__grid" :class="{ 'intro__grid--nophoto': !cover }">
          <div class="intro__text">
            <h1>{{ service.h1 }}</h1>
            <p class="lead">{{ service.intro }}</p>
            <ContactActions :service="slug" :whatsapp-text="service.whatsappText" />
            <p class="intro__area"><AppIcon name="pin" />Lucrări în județul Suceava · sediul în Vicov de Sus</p>
          </div>
          <figure v-if="cover" class="intro__photo">
            <Pic :photo="cover" priority sizes="(max-width: 860px) 100vw, 40vw" ratio="4 / 3" />
            <figcaption>{{ cover.alt }}</figcaption>
          </figure>
          <aside v-else class="intro__factors">
            <h2>Ce influențează oferta</h2>
            <ul>
              <li v-for="f in service.quoteFactors.slice(0, 5)" :key="f">{{ f }}</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>

    <div class="wrap body">
      <article class="main">
        <section v-for="sec in service.sections" :key="sec.title" class="block prose">
          <h2>{{ sec.title }}</h2>
          <p v-for="(p, i) in sec.paragraphs" :key="i">{{ p }}</p>
          <ul v-if="sec.bullets">
            <li v-for="(b, i) in sec.bullets" :key="i">{{ b }}</li>
          </ul>
        </section>

        <section class="block">
          <h2>Materiale și variante</h2>
          <dl class="options">
            <div v-for="o in service.options" :key="o.title">
              <dt>{{ o.title }}</dt>
              <dd>{{ o.text }}</dd>
            </div>
          </dl>
        </section>

        <section class="block">
          <h2>Ce influențează oferta și durata</h2>
          <ul class="factors">
            <li v-for="f in service.quoteFactors" :key="f">{{ f }}</li>
          </ul>
        </section>

        <section v-if="galleryPhotos.length" class="block">
          <h2>Fotografii din lucrările noastre</h2>
          <p class="muted">Imagini reale de pe șantierele M-CRAFT; cele mai multe arată lucrarea în execuție.</p>
          <PhotoGallery :photos="galleryPhotos" :columns="3" />
        </section>

        <section class="block">
          <h2>Întrebări frecvente</h2>
          <FaqList :items="service.faq" ld />
        </section>
      </article>

      <aside class="side">
        <div class="side__box">
          <h2>Cere o ofertă</h2>
          <p>Spuneți-ne ce lucrare aveți și unde. Puteți trimite și fotografii pe WhatsApp.</p>
          <ContactActions :service="slug" :whatsapp-text="service.whatsappText" quote-href="#oferta" />
          <p class="side__mail">Email: <a :href="`mailto:${company.email}`">{{ company.email }}</a></p>
        </div>
        <nav v-if="related.length" class="side__box" aria-label="Servicii asociate">
          <h2>Servicii asociate</h2>
          <ul class="side__links">
            <li v-for="r in related" :key="r!.slug" :data-svc="r!.slug">
              <NuxtLink :to="serviceUrl(r!.slug)">{{ r!.name }}</NuxtLink>
            </li>
          </ul>
        </nav>
        <nav v-if="posts.length" class="side__box" aria-label="Articole">
          <h2>De citit</h2>
          <ul class="side__links">
            <li v-for="p in posts" :key="p.slug">
              <NuxtLink :to="postUrl(p.slug)">{{ p.title }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </aside>
    </div>

    <section v-if="projects.length" class="section section--svc">
      <div class="wrap">
        <div class="section-head">
          <h2>Proiecte în care apare această lucrare</h2>
          <NuxtLink to="/proiecte/" class="more-link">Toate proiectele →</NuxtLink>
        </div>
        <ProjectCards :projects="projects.slice(0, 4)" />
      </div>
    </section>

    <section id="oferta" class="section section--chihlimbar">
      <div class="wrap quote">
        <div>
          <h2>Cerere de ofertă: {{ service.name.toLowerCase() }}</h2>
          <p class="muted">Serviciul este deja selectat. Completați localitatea și câteva detalii despre lucrare.</p>
        </div>
        <QuoteForm :service="slug" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.intro {
  padding-block: 20px 28px;
  border-bottom: 1px solid var(--line);
}

.intro__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 28px;
  align-items: center;
}

.intro__text h1 {
  margin-bottom: 12px;
}

.intro__text .lead {
  margin-bottom: 18px;
}

.intro__area {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  font-size: 0.9rem;
  color: var(--ink-2);
}

.intro__area svg {
  width: 16px;
  height: 16px;
  color: var(--rust);
}

.intro__photo {
  margin: 0;
}

.intro__photo figcaption {
  font-size: 0.85rem;
  color: var(--ink-2);
  margin-top: 6px;
}

.intro__factors {
  background: var(--paper);
  border: 1px solid var(--line);
  border-left: 6px solid var(--amber);
  padding: 18px 20px;
}

.intro__factors h2 {
  font-size: 1.35rem;
  margin-bottom: 8px;
}

.intro__factors ul {
  margin: 0;
}

.body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 40px;
  padding-block: 32px;
}

.block + .block {
  margin-top: 34px;
  padding-top: 26px;
  border-top: 1px solid var(--line);
}

.block > h2 {
  margin-bottom: 12px;
}

.block .muted {
  margin-bottom: 12px;
}

.options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  margin: 0;
  border-top: 1px solid var(--line);
}

.options > div {
  padding: 12px 16px 12px 0;
  border-bottom: 1px solid var(--line);
}

.options > div:nth-child(even) {
  padding-left: 16px;
  border-left: 1px solid var(--line);
}

.options dt {
  font-weight: 600;
  margin-bottom: 2px;
}

.options dd {
  margin: 0;
  color: var(--ink-2);
  font-size: 0.95rem;
}

.factors {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px 24px;
  list-style: none;
  padding: 0;
}

.factors li {
  margin: 0;
  padding-left: 18px;
  position: relative;
}

.factors li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 8px;
  height: 8px;
  background: var(--amber);
}

.side {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.side__box {
  background: var(--paper);
  border: 1px solid var(--line);
  padding: 16px;
}

.side__box:first-child {
  position: sticky;
  top: calc(var(--header-h) + 44px);
  border-top: 3px solid var(--amber);
}

.side__box h2 {
  font-size: 1.3rem;
  margin-bottom: 8px;
}

.side__box p {
  font-size: 0.925rem;
  color: var(--ink-2);
}

.side__box :deep(.actions) {
  flex-direction: column;
}

.side__box :deep(.actions .btn) {
  width: 100%;
}

.side__mail {
  margin-top: 10px;
  word-break: break-word;
}

.side__links {
  list-style: none;
  margin: 0;
  padding: 0;
}

.side__links li {
  margin: 0;
  border-top: 1px solid var(--line);
}

.side__links a {
  display: block;
  padding: 8px 0;
  color: var(--ink);
  text-decoration: none;
  font-weight: 500;
}

.side__links a:hover {
  color: var(--rust);
}

.quote {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.4fr);
  gap: 32px;
}

.quote h2 {
  margin-bottom: 8px;
}

@media (max-width: 1024px) {
  .body {
    grid-template-columns: 1fr;
  }

  .side__box:first-child {
    position: static;
  }

  .side {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}

@media (max-width: 860px) {
  .intro__grid,
  .quote {
    grid-template-columns: 1fr;
  }

  .intro__photo {
    order: -1;
  }
}

@media (max-width: 600px) {
  .options,
  .factors {
    grid-template-columns: 1fr;
  }

  .options > div:nth-child(even) {
    padding-left: 0;
    border-left: 0;
  }
}

/* Culoare (docs/design/culoare.md) */
.intro { background: var(--svc-t); border-bottom: 0; }
.intro__area svg { color: var(--svc-d); }
.intro__photo :deep(img) { border-bottom: 6px solid var(--svc-d); }
.intro__factors { border-left: 6px solid var(--svc-d); }

.block + .block { border-top: 3px solid var(--svc-m); }

.options { border-top: 0; gap: 8px; }
.options > div,
.options > div:nth-child(even) { background: var(--svc-t); border: 0; border-top: 4px solid var(--svc-d); padding: 12px 14px; }
.options dt { color: var(--svc-d); }

.factors { background: var(--chihlimbar-t); padding: 16px 18px; border-left: 6px solid var(--amber); }
.factors li::before { background: var(--chihlimbar-d); }

.side__box:first-child { background: var(--chihlimbar-t); border-color: var(--chihlimbar-t); border-top: 4px solid var(--amber); }
.side__box[aria-label='Articole'] { border-top: 4px solid var(--otel-d); }
.side__links li[data-svc] a { display: flex; gap: 10px; align-items: baseline; }
.side__links li[data-svc] a::before { content: ''; flex: none; width: 10px; height: 10px; background: var(--svc-m); outline: 1px solid var(--svc-d); outline-offset: -1px; }
.side__links a:hover { color: var(--svc-d); }
</style>
