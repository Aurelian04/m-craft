<script setup lang="ts">
import { company, whatsappUrl, defaultWhatsappText } from '~/data/company'
import { services, serviceUrl } from '~/data/services'
import { media, photo, photos, servicePhotos } from '~/data/media'
import { reviews } from '~/data/reviews'

const hero = photos(media.home.hero)
const recent = photos(media.home.recent)
const about = photos(media.home.about)
const homeVideos = media.home.videos.map((id) => media.videos.find((v) => v.id === id)).filter((v) => !!v)
const projectTitle = (id: string) => media.projects.find((p) => p.id === id)?.title ?? ''

const cards = services.map((s) => ({ ...s, cover: servicePhotos(s.slug).cover }))
const { track } = useTracking()
const recentOpen = ref<number | null>(null)

usePageSeo({
  title: 'M-CRAFT – renovări și amenajări în Vicov de Sus și județul Suceava',
  rawTitle: true,
  description: 'Renovări interioare, gips-carton, glet, gresie și faianță, instalații și izolații pentru case, apartamente și spații comerciale din județul Suceava.',
  image: hero[0],
})
</script>

<template>
  <div>
    <!-- Hero: text pe panou deschis, fotografii reale alăturate -->
    <section class="hero">
      <div class="wrap hero__grid">
        <div class="hero__text">
          <span class="kicker">Vicov de Sus · județul Suceava</span>
          <h1>Renovări și amenajări în Suceava.</h1>
          <p class="lead">
            Pereți și tavane din gips-carton, glet și zugrăveli, gresie și faianță, instalații pentru băi și bucătării.
            Lucrăm în case, apartamente și spații comerciale mici din județ.
          </p>
          <div class="hero__cta">
            <NuxtLink to="/contact/#oferta" class="btn btn--primary">Cere o ofertă</NuxtLink>
            <NuxtLink to="/proiecte/" class="btn btn--outline">Vezi lucrările</NuxtLink>
          </div>
          <div class="hero__contact">
            <a :href="company.phone.href" @click="track('call')"><AppIcon name="phone" />{{ company.phone.display }}</a>
            <a :href="whatsappUrl(defaultWhatsappText)" target="_blank" rel="noopener" @click="track('whatsapp')"><AppIcon name="whatsapp" class="wa" />Scrieți-ne pe WhatsApp</a>
          </div>
        </div>
        <div class="hero__photos">
          <Pic v-if="hero[0]" :photo="hero[0]" priority sizes="(max-width: 860px) 100vw, 40vw" ratio="4 / 5" class="hero__main" />
          <Pic v-if="hero[1]" :photo="hero[1]" sizes="(max-width: 860px) 50vw, 20vw" ratio="4 / 5" class="hero__side" />
          <Pic v-if="hero[2]" :photo="hero[2]" sizes="(max-width: 860px) 50vw, 20vw" ratio="4 / 5" class="hero__side" />
        </div>
      </div>
    </section>

    <!-- Servicii: rezumat vizual -->
    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <div>
            <h2>Servicii</h2>
            <p>Fiecare serviciu are o pagină cu detalii despre lucrare, ce influențează oferta și întrebări frecvente.</p>
          </div>
          <NuxtLink to="/servicii/" class="more-link">Toate serviciile →</NuxtLink>
        </div>
        <div class="svc-grid">
          <NuxtLink v-for="s in cards" :key="s.slug" v-reveal :to="serviceUrl(s.slug)" class="svc-card">
            <Pic v-if="s.cover" :photo="s.cover" sizes="(max-width: 640px) 50vw, 25vw" ratio="3 / 2" alt="" />
            <div v-else class="svc-card__ph" aria-hidden="true"><span /></div>
            <div class="svc-card__body">
              <h3>{{ s.name }}</h3>
              <p>{{ s.summary }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Despre + zona deservită -->
    <section class="section section--concrete">
      <div class="wrap about">
        <div v-reveal class="about__text">
          <h2>M-CRAFT, din Vicov de Sus</h2>
          <p>
            Suntem o firmă de construcții și renovări cu sediul în Vicov de Sus. Lucrăm pentru proprietari de case și apartamente
            și pentru spații comerciale mici, de la compartimentări și tavane din gips-carton până la finisaje, placări și instalații.
          </p>
          <p>
            Fotografiile de pe site sunt din lucrările noastre, multe surprinse în timpul execuției: așa se vede cum arată
            structura, izolația și straturile de finisaj înainte să fie acoperite.
          </p>
          <div class="area">
            <h3>Unde lucrăm</h3>
            <p>
              În județul Suceava, cu sediul în Vicov de Sus. Pentru o lucrare în altă localitate din județ, spuneți-ne unde este
              și despre ce lucrare e vorba.
            </p>
          </div>
          <NuxtLink to="/despre-noi/" class="more-link">Despre noi →</NuxtLink>
        </div>
        <div class="about__photos">
          <Pic v-for="p in about" :key="p.id" :photo="p" sizes="(max-width: 860px) 33vw, 18vw" ratio="3 / 4" />
        </div>
      </div>
    </section>

    <!-- Lucrări recente -->
    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <div>
            <h2>Lucrări recente</h2>
            <p>Imagini din lucrările noastre, în diferite etape de execuție.</p>
          </div>
          <NuxtLink to="/proiecte/" class="more-link">Toate proiectele →</NuxtLink>
        </div>
        <div class="recent">
          <button v-for="(p, i) in recent" :key="p.id" v-reveal type="button" class="recent__item" @click="recentOpen = i">
            <Pic :photo="p" sizes="(max-width: 640px) 50vw, 25vw" ratio="1 / 1" :alt="p.alt" />
            <span class="recent__cap">{{ projectTitle(p.project) }}</span>
          </button>
        </div>
        <Lightbox v-model="recentOpen" :photos="recent" />
      </div>
    </section>

    <!-- Animație 3D + proces -->
    <section class="section section--paper">
      <div class="wrap">
        <div class="section-head">
          <div>
            <h2>Cum se construiește o încăpere, strat cu strat</h2>
            <p>Ordinea lucrărilor contează: fiecare strat are nevoie de un suport pregătit corect.</p>
          </div>
        </div>
        <RoomAssembly />
        <h2 class="process-title">Cum lucrăm</h2>
        <ProcessSteps />
      </div>
    </section>

    <!-- Video -->
    <section class="section">
      <div class="wrap video-row">
        <div class="video-row__text">
          <h2>De la structură la finisaj</h2>
          <p>Clipuri scurte filmate pe șantier: glet, vopsire, compartimentări și tavane din gips-carton.</p>
          <NuxtLink to="/video/" class="more-link">Toate clipurile →</NuxtLink>
        </div>
        <VideoCard v-for="v in homeVideos" :key="v!.id" :video="v!" />
      </div>
    </section>

    <!-- Recenzii: doar dacă există recenzii reale -->
    <section v-if="reviews.length" class="section section--concrete">
      <div class="wrap">
        <div class="section-head">
          <h2>Recenzii</h2>
          <NuxtLink to="/recenzii/" class="more-link">Toate recenziile →</NuxtLink>
        </div>
        <ReviewList :reviews="reviews.slice(0, 3)" />
      </div>
    </section>

    <!-- Cerere de ofertă -->
    <section id="oferta" class="section section--concrete">
      <div class="wrap quote">
        <div>
          <h2>Cere o ofertă</h2>
          <p class="muted">Descrieți pe scurt lucrarea. Vă răspundem pe email sau la telefon.</p>
          <QuoteForm />
        </div>
        <aside class="quote__side">
          <h3>Preferați să vorbim direct?</h3>
          <ContactActions :show-quote="false" />
          <p class="muted">Pe WhatsApp puteți trimite și fotografii ale spațiului.</p>
          <p class="muted">Email: <a :href="`mailto:${company.email}`">{{ company.email }}</a></p>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding-block: 24px 8px;
}

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: 24px;
  align-items: stretch;
}

.hero__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 28px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-left: 6px solid var(--amber);
}

.hero__text h1 {
  margin-bottom: 14px;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.hero__contact {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 22px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}

.hero__contact a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ink);
  font-weight: 600;
  text-decoration: none;
}

.hero__contact a:hover {
  text-decoration: underline;
}

.hero__contact svg {
  width: 20px;
  height: 20px;
}

.hero__contact .wa {
  color: var(--wa);
}

.hero__photos {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  max-height: 470px;
}

.hero__main {
  grid-row: 1 / 3;
  height: 100% !important;
}

.hero__side {
  height: 100% !important;
  min-height: 0;
}

.svc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.svc-card {
  display: flex;
  flex-direction: column;
  background: var(--paper);
  border: 1px solid var(--line);
  color: var(--ink);
  text-decoration: none;
  transition: border-color 0.15s ease;
}

.svc-card:hover {
  border-color: var(--amber);
  color: var(--ink);
}

.svc-card:hover h3 {
  text-decoration: underline;
  text-decoration-color: var(--amber);
}

.svc-card__ph {
  aspect-ratio: 3 / 2;
  background: var(--concrete);
  display: grid;
  place-items: center;
}

.svc-card__ph span {
  width: 52px;
  height: 52px;
  border-left: 7px solid var(--amber);
  border-bottom: 7px solid var(--amber);
}

.svc-card__body {
  padding: 12px 14px 14px;
}

.svc-card h3 {
  font-size: 1.2rem;
  margin-bottom: 4px;
}

.svc-card p {
  font-size: 0.9rem;
  color: var(--ink-2);
  margin: 0;
}

.about {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 32px;
  align-items: center;
}

.about__text h2 {
  margin-bottom: 12px;
}

.area {
  margin: 16px 0;
  padding: 12px 16px;
  background: var(--paper);
  border-left: 3px solid var(--rust);
}

.area h3 {
  font-size: 1.15rem;
  margin-bottom: 4px;
}

.about__photos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.recent {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.recent__item {
  position: relative;
  padding: 0;
  border: 0;
  background: none;
  cursor: zoom-in;
  overflow: hidden;
  text-align: left;
}

.recent__item :deep(img) {
  transition: transform 0.3s ease;
}

.recent__item:hover :deep(img) {
  transform: scale(1.03);
}

.recent__cap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 6px 8px;
  background: var(--paper);
  color: var(--ink);
  font-size: 0.8rem;
  line-height: 1.3;
  border-top: 2px solid var(--amber);
}

.process-title {
  margin: 36px 0 22px;
}

.video-row {
  display: grid;
  grid-template-columns: 1.2fr repeat(3, 1fr);
  gap: 16px;
  align-items: start;
}

.video-row__text h2 {
  margin-bottom: 10px;
}

.video-row__text p {
  color: var(--ink-2);
}

.quote {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 32px;
}

.quote h2 {
  margin-bottom: 6px;
}

.quote__side {
  align-self: start;
  background: var(--paper);
  border: 1px solid var(--line);
  padding: 20px;
}

.quote__side h3 {
  margin-bottom: 12px;
}

.quote__side p {
  margin-top: 12px;
  font-size: 0.925rem;
}

@media (max-width: 1024px) {
  .svc-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .video-row {
    grid-template-columns: repeat(3, 1fr);
  }

  .video-row__text {
    grid-column: 1 / -1;
  }
}

@media (max-width: 860px) {
  .hero__grid,
  .about,
  .quote {
    grid-template-columns: 1fr;
  }

  .hero__text {
    padding: 20px;
  }

  .hero__photos {
    max-height: 360px;
  }

  .svc-grid,
  .recent {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .video-row {
    grid-template-columns: 1fr 1fr;
  }

  .video-row > :last-child {
    display: none;
  }

  .svc-card__body {
    padding: 10px;
  }

  .svc-card h3 {
    font-size: 1.05rem;
  }
}
</style>
