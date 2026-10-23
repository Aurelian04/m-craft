<script setup lang="ts">
import { company, fullAddress, whatsappUrl, defaultWhatsappText } from '~/data/company'
import { services, serviceUrl } from '~/data/services'

const { openSettings } = useConsent()
const { track } = useTracking()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="ftr">
    <div class="strip" aria-hidden="true"><span v-for="s in services" :key="s.slug" :data-svc="s.slug" /></div>
    <div class="wrap ftr__grid">
      <div class="ftr__brand">
        <NuxtLink to="/" aria-label="M-CRAFT, pagina principală">
          <img src="/logo.svg" alt="M-CRAFT" width="369" height="128" class="ftr__logo" loading="lazy">
        </NuxtLink>
        <p>{{ company.tagline }}</p>
        <ul class="ftr__contact">
          <li>
            <a :href="company.phone.href" @click="track('call')"><AppIcon name="phone" />{{ company.phone.display }}</a>
          </li>
          <li>
            <a :href="whatsappUrl(defaultWhatsappText)" target="_blank" rel="noopener" @click="track('whatsapp')"><AppIcon name="whatsapp" class="wa" />WhatsApp</a>
          </li>
          <li>
            <a :href="`mailto:${company.email}`"><AppIcon name="mail" />{{ company.email }}</a>
          </li>
        </ul>
      </div>

      <nav aria-label="Servicii">
        <h2 class="ftr__h">Servicii</h2>
        <ul class="ftr__list swatch-list">
          <li v-for="s in services" :key="s.slug" :data-svc="s.slug">
            <NuxtLink :to="serviceUrl(s.slug)">{{ s.name }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <nav aria-label="Linkuri utile">
        <h2 class="ftr__h">Linkuri utile</h2>
        <ul class="ftr__list">
          <li><NuxtLink to="/proiecte/">Proiecte</NuxtLink></li>
          <li><NuxtLink to="/video/">Video</NuxtLink></li>
          <li><NuxtLink to="/despre-noi/">Despre noi</NuxtLink></li>
          <li><NuxtLink to="/recenzii/">Recenzii</NuxtLink></li>
          <li><NuxtLink to="/blog/">Blog</NuxtLink></li>
          <li><NuxtLink to="/contact/">Contact</NuxtLink></li>
          <li><NuxtLink to="/cautare/">Căutare</NuxtLink></li>
        </ul>
      </nav>

      <div>
        <h2 class="ftr__h">Date firmă</h2>
        <dl class="ftr__legal">
          <dt>Denumire</dt>
          <dd>{{ company.legalName }}</dd>
          <dt>CUI</dt>
          <dd>{{ company.cui }}</dd>
          <dt>Reg. Com.</dt>
          <dd>{{ company.regCom }}</dd>
          <dt>Sediu</dt>
          <dd>{{ fullAddress }}</dd>
        </dl>
      </div>
    </div>

    <div class="wrap ftr__bottom">
      <p>© {{ year }} {{ company.legalName }}</p>
      <ul class="ftr__policies">
        <li><NuxtLink to="/termeni-si-conditii/">Termeni și condiții</NuxtLink></li>
        <li><NuxtLink to="/politica-de-confidentialitate/">Politica de confidențialitate</NuxtLink></li>
        <li><NuxtLink to="/politica-cookie/">Politica de cookie-uri</NuxtLink></li>
        <li><button type="button" class="linkish" @click="openSettings">Setări cookie-uri</button></li>
      </ul>
      <AnpcLinks />
    </div>
  </footer>
</template>

<style scoped>
.ftr {
  margin-top: var(--section);
  background: var(--concrete);
  border-top: 3px solid var(--amber);
  font-size: 0.925rem;
}

.ftr__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 0.8fr 1.2fr;
  gap: 28px;
  padding-block: 36px 24px;
}

.ftr__logo {
  height: 44px;
  width: auto;
  margin-bottom: 12px;
}

.ftr__brand p {
  color: var(--ink-2);
  max-width: 38ch;
}

.ftr__h {
  font-size: 1.15rem;
  margin-bottom: 10px;
}

.ftr__list,
.ftr__contact,
.ftr__policies {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ftr__list li + li {
  margin-top: 4px;
}

.ftr a {
  color: var(--ink);
  text-decoration: none;
}

.ftr a:hover {
  text-decoration: underline;
}

.ftr__contact {
  margin-top: 12px;
}

.ftr__contact a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 550;
  padding-block: 3px;
}

.ftr__contact svg {
  width: 18px;
  height: 18px;
}

.ftr__contact .wa {
  color: var(--wa);
}

.ftr__legal {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4px 12px;
  margin: 0;
}

.ftr__legal dt {
  color: var(--ink-2);
}

.ftr__legal dd {
  margin: 0;
}

.ftr__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 24px;
  border-top: 1px solid var(--concrete-2);
  padding-block: 16px 24px;
  color: var(--ink-2);
}

.ftr__bottom > p {
  margin: 0;
}

.ftr__policies {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  margin-right: auto;
}

.ftr__policies li {
  margin: 0;
}

.linkish {
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  color: var(--ink);
}

.linkish:hover {
  text-decoration: underline;
}

@media (max-width: 960px) {
  .ftr__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .ftr__grid {
    grid-template-columns: 1fr;
    gap: 22px;
  }
}

/* Culoare (docs/design/culoare.md) */
.ftr { border-top: 0; }
.ftr__h { display: inline-block; padding-bottom: 2px; border-bottom: 3px solid var(--amber); }
.ftr__list.swatch-list > li + li { margin-top: 6px; }
.ftr__contact li:nth-child(1) svg { color: var(--chihlimbar-d); }
.ftr__contact .wa { color: var(--wa-d); }
.ftr__contact li:nth-child(3) svg { color: var(--teracota-d); }
.ftr__legal dt { color: var(--teracota-d); }
.ftr__bottom {
  max-width: none;
  background: var(--concrete-2);
  border-top: 0;
  padding-inline: max(var(--gutter), calc((100% - var(--wrap)) / 2 + var(--gutter)));
}
</style>
