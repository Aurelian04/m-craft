<script setup lang="ts">
import { company, fullAddress } from '~/data/company'
import { services, serviceUrl } from '~/data/services'
import { photo, photos } from '~/data/media'

const { track } = useTracking()
const pics = photos(['s5-2926', 's6-3109', 's3-2630', 's1-2434', 's8-3298', 's2-2526'])

usePageSeo({
  title: 'Despre M-CRAFT, firmă de renovări din Vicov de Sus',
  description: 'M-CRAFT este o firmă de construcții și renovări din Vicov de Sus, județul Suceava. Lucrăm pentru case, apartamente și spații comerciale mici.',
  image: photo('s5-2926'),
})
</script>

<template>
  <div>
    <div class="wrap page">
      <Breadcrumbs :items="[{ name: 'Despre noi' }]" />
      <div class="intro">
        <div>
          <h1>Despre M-CRAFT</h1>
          <p class="lead">
            M-CRAFT este o firmă de construcții și renovări cu sediul în Vicov de Sus, județul Suceava.
            Lucrăm la amenajări interioare și exterioare, finisaje, placări și instalații, pentru clienți din județ.
          </p>
          <p>
            Pe site am pus fotografii din lucrările noastre așa cum au fost făcute pe șantier, în timpul execuției.
            Ele arată etapele care la final nu se mai văd: structura metalică a pereților și tavanelor, izolația,
            tratarea rosturilor, pregătirea băilor pentru placare.
          </p>
        </div>
        <dl class="facts band band--top">
          <div>
            <dt>Firma</dt>
            <dd>{{ company.legalName }}</dd>
          </div>
          <div>
            <dt>Sediu</dt>
            <dd>{{ fullAddress }}</dd>
          </div>
          <div>
            <dt>Zona în care lucrăm</dt>
            <dd>Județul Suceava</dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>
              <a :href="company.phone.href" @click="track('call')">{{ company.phone.display }}</a> · <a :href="`mailto:${company.email}`">{{ company.email }}</a>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <section class="section section--teracota">
      <div class="wrap cols">
        <div>
          <h2>Pentru cine lucrăm</h2>
          <ul class="who">
            <li><strong>Proprietari de apartamente</strong> care renovează una sau mai multe încăperi, baia ori bucătăria.</li>
            <li><strong>Proprietari de case</strong>, de la casa nouă care are nevoie de compartimentări, tavane și finisaje, până la renovarea unei case vechi.</li>
            <li><strong>Spații comerciale mici</strong>: magazine, birouri sau săli care trebuie compartimentate și finisate.</li>
          </ul>
        </div>
        <div>
          <h2>Ce lucrăm</h2>
          <ul class="svc swatch-list">
            <li v-for="s in services" :key="s.slug" :data-svc="s.slug">
              <NuxtLink :to="serviceUrl(s.slug)">{{ s.name }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section section--otel">
      <div class="wrap">
        <h2 class="mb">Cum se desfășoară o colaborare</h2>
        <ProcessSteps />
        <div class="org">
          <div>
            <h3>Înainte de ofertă</h3>
            <p>
              Ne ajută să știm tipul lucrării, localitatea, suprafața aproximativă și cum arată spațiul acum.
              Fotografiile trimise pe WhatsApp sau pe email scurtează mult discuția inițială.
            </p>
          </div>
          <div>
            <h3>În timpul lucrării</h3>
            <p>
              Ordinea lucrărilor se stabilește de la început, ca fiecare etapă să pornească pe un suport pregătit:
              instalațiile înaintea închiderii pereților, șapa uscată înaintea pardoselii, gletul înaintea vopselei.
            </p>
          </div>
          <div>
            <h3>La final</h3>
            <p>Lucrarea se verifică împreună cu beneficiarul înainte de predare.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--paper">
      <div class="wrap">
        <div class="section-head">
          <h2>Din lucrările noastre</h2>
          <NuxtLink to="/proiecte/" class="more-link">Toate proiectele →</NuxtLink>
        </div>
        <PhotoGallery :photos="pics" :columns="3" />
      </div>
    </section>

    <section class="section">
      <div class="wrap cta on-amber">
        <div>
          <h2>Aveți o lucrare în județul Suceava?</h2>
          <p class="muted">Spuneți-ne ce și unde. Vă răspundem cu întrebările necesare pentru ofertă.</p>
        </div>
        <ContactActions />
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  padding-top: 20px;
  padding-bottom: 28px;
}

.intro {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 32px;
  align-items: start;
}

.intro h1 {
  margin-bottom: 10px;
}

.facts {
  margin: 0;
  background: var(--paper);
  border: 1px solid var(--line);
  border-top: 3px solid var(--amber);
  border-radius: var(--r-lg);
}

.facts > div {
  padding: 10px 14px;
}

.facts > div + div {
  border-top: 1px solid var(--line);
}

.facts dt {
  font-size: 0.85rem;
  color: var(--ink-2);
}

.facts dd {
  margin: 0;
  font-weight: 500;
}

.cols {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 32px;
}

.cols h2,
.mb {
  margin-bottom: 14px;
}

.mb {
  margin-bottom: 22px;
}

.who {
  padding-left: 1.1em;
}

.who li + li {
  margin-top: 8px;
}

.svc {
  columns: 2;
  padding-left: 1.1em;
}

.org {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 28px;
}

.org h3 {
  margin-bottom: 6px;
}

.org p {
  color: var(--ink-2);
}

.cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-left: 6px solid var(--amber);
  border-radius: var(--r-lg);
}

.cta h2 {
  margin-bottom: 4px;
}

@media (max-width: 860px) {
  .intro,
  .cols,
  .org {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .svc {
    columns: 1;
  }
}

/* Culoare (docs/design/culoare.md) */
.facts { background: var(--chihlimbar-t); border: 0; --band: var(--amber); padding-top: 4px; }
.facts > div + div { border-top: 1px solid #ead2a8; }
.facts dt { color: var(--teracota-d); font-weight: 550; }
.who li::marker { color: var(--teracota-d); }
.svc { columns: 2; }
.svc a { color: var(--ink); text-decoration-color: var(--svc-d); }
.org > div { position: relative; overflow: hidden; background: var(--paper); padding: 18px 16px 14px; border-radius: var(--r-lg); }
.org > div::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 4px; background: var(--otel-d); }
.cta { border: 0; }
</style>
