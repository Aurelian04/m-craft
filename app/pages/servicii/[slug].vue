<script setup lang="ts">
import { company, whatsappUrl } from '~/data/company'
import { getService, serviceUrl } from '~/data/services'
import { media, servicePhotos } from '~/data/media'
import { visiblePosts, postUrl } from '~/data/posts'

// Pagina de serviciu e și pagina de aterizare a reclamelor: sus doar ce caută omul venit din anunț
// (ce facem, unde, cum ne contactează), apoi dovada (poze), oferta, iar detaliile tehnice la click.
const route = useRoute()
const slug = route.params.slug as string
const service = getService(slug)
if (!service) throw createError({ statusCode: 404, statusMessage: 'Serviciul nu există', fatal: true })

const { cover, gallery } = servicePhotos(slug)
const proof = gallery.filter((p) => p.id !== cover?.id).slice(0, 4)
const includes = service.options.slice(0, 5).map((o) => o.title)
const related = service.related.map(getService).filter((s) => !!s)
const projects = media.projects.filter((p) => p.services.includes(slug))
const { showDrafts } = useRuntimeConfig().public
const posts = visiblePosts(showDrafts).filter((p) => p.relatedServices.includes(slug)).slice(0, 3)

const { track } = useTracking()

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
    <!-- Sus: ce facem, unde, cum ne contactați -->
    <section class="intro">
      <div class="wrap">
        <Breadcrumbs :items="[{ name: 'Servicii', path: '/servicii/' }, { name: service.name }]" />
        <div class="intro__grid" :class="{ 'intro__grid--nophoto': !cover }">
          <div class="intro__text">
            <h1>{{ service.h1 }}</h1>
            <p class="lead">{{ service.summary }}</p>
            <ul class="includes" aria-label="Ce include">
              <li v-for="item in includes" :key="item"><AppIcon name="check" />{{ item }}</li>
            </ul>
            <ContactActions :service="slug" :whatsapp-text="service.whatsappText" quote-href="#oferta" />
            <p class="intro__area"><AppIcon name="pin" />Lucrări în județul Suceava · sediul în Vicov de Sus</p>
          </div>
          <figure v-if="cover" class="intro__photo">
            <Pic :photo="cover" priority sizes="(max-width: 860px) 100vw, 40vw" ratio="4 / 3" />
            <figcaption>{{ cover.alt }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- Dovada: fotografii reale, înaintea explicațiilor -->
    <section v-if="proof.length" class="section proof">
      <div class="wrap">
        <div class="section-head">
          <div>
            <h2>Din lucrările noastre</h2>
            <p>Fotografii reale de pe șantierele M-CRAFT, multe făcute în timpul execuției.</p>
          </div>
          <NuxtLink to="/proiecte/" class="more-link">Toate proiectele →</NuxtLink>
        </div>
        <PhotoGallery :photos="proof" :columns="4" />
      </div>
    </section>

    <!-- Oferta: pe scurt ce contează și formularul -->
    <section id="oferta" class="section section--chihlimbar">
      <div class="wrap quote">
        <div class="quote__info">
          <h2>Cere o ofertă</h2>
          <p class="muted">Serviciul este deja selectat. Lăsați-ne numele, localitatea și un telefon sau email.</p>
          <h3>Ce influențează oferta</h3>
          <ul class="factors">
            <li v-for="f in service.quoteFactors.slice(0, 5)" :key="f">{{ f }}</li>
          </ul>
          <h3>Ce urmează</h3>
          <NextSteps compact />
          <p class="quote__direct">
            Preferați să vorbim direct?
            <a :href="company.phone.href" @click="track('call', { service: slug })">{{ company.phone.display }}</a>
            sau
            <a :href="whatsappUrl(service.whatsappText)" target="_blank" rel="noopener" @click="track('whatsapp', { service: slug })">WhatsApp</a>
          </p>
        </div>
        <QuoteForm :service="slug" />
      </div>
    </section>

    <!-- Detaliile tehnice: rămân în pagină, dar se deschid la click -->
    <section class="section">
      <div class="wrap details">
        <h2>Detalii despre lucrare</h2>
        <p class="lead details__intro">{{ service.intro }}</p>
        <div class="acc">
          <details v-for="sec in service.sections" :key="sec.title">
            <summary>{{ sec.title }}</summary>
            <div class="acc__body prose">
              <p v-for="(p, i) in sec.paragraphs" :key="i">{{ p }}</p>
              <ul v-if="sec.bullets">
                <li v-for="(b, i) in sec.bullets" :key="i">{{ b }}</li>
              </ul>
            </div>
          </details>
          <details>
            <summary>Materiale și variante</summary>
            <dl class="acc__body options">
              <div v-for="o in service.options" :key="o.title">
                <dt>{{ o.title }}</dt>
                <dd>{{ o.text }}</dd>
              </div>
            </dl>
          </details>
          <details>
            <summary>Ce influențează oferta și durata</summary>
            <ul class="acc__body factors factors--full">
              <li v-for="f in service.quoteFactors" :key="f">{{ f }}</li>
            </ul>
          </details>
        </div>

        <h2 class="faq-title">Întrebări frecvente</h2>
        <FaqList :items="service.faq" ld />
      </div>
    </section>

    <section v-if="projects.length" class="section section--svc">
      <div class="wrap">
        <div class="section-head">
          <h2>Proiecte în care apare această lucrare</h2>
          <NuxtLink to="/proiecte/" class="more-link">Toate proiectele →</NuxtLink>
        </div>
        <ProjectCards :projects="projects.slice(0, 4)" />
      </div>
    </section>

    <!-- Final: formularul din nou, plus legături utile -->
    <section id="oferta-final" class="section section--chihlimbar">
      <div class="wrap quote">
        <div class="quote__info">
          <h2>Aveți o lucrare de acest tip?</h2>
          <p class="muted">Trimiteți cererea sau sunați-ne. Vă contactăm pentru detalii și pregătim oferta.</p>
          <ContactActions :service="slug" :whatsapp-text="service.whatsappText" :show-quote="false" />
          <nav v-if="related.length" class="more" aria-label="Servicii asociate">
            <h3>Servicii asociate</h3>
            <ul class="swatch-list">
              <li v-for="r in related" :key="r!.slug" :data-svc="r!.slug">
                <NuxtLink :to="serviceUrl(r!.slug)">{{ r!.name }}</NuxtLink>
              </li>
            </ul>
          </nav>
          <nav v-if="posts.length" class="more" aria-label="Articole">
            <h3>De citit</h3>
            <ul>
              <li v-for="p in posts" :key="p.slug">
                <NuxtLink :to="postUrl(p.slug)">{{ p.title }}</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <QuoteForm :service="slug" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.intro {
  padding-block: 20px 28px;
  background: var(--svc-t);
}

.intro__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 28px;
  align-items: center;
}

.intro__grid--nophoto {
  grid-template-columns: minmax(0, 1fr);
  max-width: 820px;
}

.intro__text h1 {
  margin-bottom: 10px;
}

.intro__text .lead {
  margin-bottom: 12px;
}

.includes {
  list-style: none;
  padding: 0;
  margin: 0 0 18px;
  display: grid;
  gap: 6px;
}

.includes li {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 0;
  font-weight: 500;
}

.includes svg {
  flex: none;
  width: 18px;
  height: 18px;
  align-self: center;
  color: var(--svc-d);
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
  color: var(--svc-d);
}

.intro__photo {
  margin: 0;
}

.intro__photo :deep(img) {
  border-bottom: 6px solid var(--svc-d);
  border-radius: var(--r-lg) var(--r-lg) var(--r-sm) var(--r-sm);
}

.intro__photo figcaption {
  font-size: 0.85rem;
  color: var(--ink-2);
  margin-top: 6px;
}

.proof {
  padding-bottom: calc(var(--section) - 8px);
}

.quote {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.35fr);
  gap: 32px;
  align-items: start;
}

.quote h2 {
  margin-bottom: 6px;
}

.quote__info h3 {
  font-size: 1.15rem;
  margin: 18px 0 8px;
}

.quote__direct {
  margin-top: 16px;
  font-weight: 550;
}

.factors {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 4px;
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
  border-radius: 2px;
  background: var(--chihlimbar-d);
}

.factors--full {
  grid-template-columns: repeat(2, 1fr);
  gap: 6px 24px;
}

.details {
  max-width: 900px;
}

.details > h2 {
  margin-bottom: 8px;
}

.details__intro {
  margin-bottom: 16px;
}

.acc {
  display: grid;
  gap: 8px;
}

.acc details {
  background: var(--paper);
  border: 1px solid var(--line);
  border-left: 5px solid var(--svc-m);
  border-radius: var(--r-md);
}

.acc details[open] {
  border-left-color: var(--svc-d);
}

.acc summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 13px 16px;
  font-weight: 600;
  cursor: pointer;
  list-style: none;
}

.acc summary::-webkit-details-marker {
  display: none;
}

.acc summary::after {
  content: 'Deschide';
  flex: none;
  font-size: 0.8rem;
  font-weight: 550;
  color: var(--svc-d);
  padding: 2px 10px;
  border-radius: var(--r-sm);
  background: var(--svc-t);
}

.acc details[open] summary::after {
  content: 'Închide';
}

.acc summary:hover {
  color: var(--svc-d);
}

.acc__body {
  padding: 0 16px 14px;
}

.options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin: 0;
}

.options > div {
  background: var(--svc-t);
  border-radius: var(--r-md);
  padding: 12px 14px;
}

.options dt {
  font-weight: 550;
  color: var(--svc-d);
  margin-bottom: 2px;
}

.options dd {
  margin: 0;
  color: var(--ink-2);
  font-size: 0.95rem;
}

.faq-title {
  margin: 34px 0 12px;
}

.more {
  margin-top: 20px;
}

.more h3 {
  font-size: 1.15rem;
  margin-bottom: 6px;
}

.more ul {
  margin: 0;
}

.more a {
  color: var(--ink);
  text-decoration-color: var(--svc-d);
}

@media (max-width: 860px) {
  .intro__grid,
  .quote {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .options,
  .factors--full {
    grid-template-columns: 1fr;
  }
}
</style>
