<script setup lang="ts">
import { company, whatsappUrl, defaultWhatsappText } from '~/data/company'
import { services, serviceUrl } from '~/data/services'
import { servicePhotos, photoSrc } from '~/data/media'

const route = useRoute()
const { track } = useTracking()

const dropdownOpen = ref(false)
const mobileOpen = ref(false)
const mobileServicesOpen = ref(false)
const dropdownRoot = ref<HTMLElement | null>(null)

const nav = [
  { to: '/', label: 'Acasă' },
  { to: '/proiecte/', label: 'Proiecte' },
  { to: '/despre-noi/', label: 'Despre noi' },
  { to: '/blog/', label: 'Blog' },
  { to: '/contact/', label: 'Contact' },
]

const serviceThumbs = computed(() =>
  services.map((s) => {
    const cover = servicePhotos(s.slug).cover
    return { ...s, thumb: cover ? photoSrc(cover, cover.widths[0]!) : null }
  }),
)

function isActive(to: string) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to.replace(/\/$/, ''))
}

watch(() => route.fullPath, () => {
  dropdownOpen.value = false
  mobileOpen.value = false
})

watch(mobileOpen, (open) => {
  if (import.meta.client) document.documentElement.style.overflow = open ? 'hidden' : ''
})

function onDocClick(e: MouseEvent) {
  if (dropdownOpen.value && dropdownRoot.value && !dropdownRoot.value.contains(e.target as Node)) dropdownOpen.value = false
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    dropdownOpen.value = false
    mobileOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})

const searchQuery = ref('')
function submitSearch() {
  const q = searchQuery.value.trim()
  navigateTo({ path: '/cautare/', query: q ? { q } : {} })
}
</script>

<template>
  <header class="hdr">
    <div class="util">
      <div class="wrap util__in">
        <span class="util__area">
          <AppIcon name="pin" />
          Vicov de Sus · lucrări în județul Suceava
        </span>
        <nav class="util__links" aria-label="Linkuri secundare">
          <NuxtLink to="/video/">Video</NuxtLink>
          <NuxtLink to="/recenzii/">Recenzii</NuxtLink>
          <a :href="`mailto:${company.email}`">{{ company.email }}</a>
          <a :href="whatsappUrl(defaultWhatsappText)" target="_blank" rel="noopener" @click="track('whatsapp')">WhatsApp</a>
        </nav>
      </div>
    </div>

    <div class="bar">
      <div class="wrap bar__in">
        <NuxtLink to="/" class="logo" aria-label="M-CRAFT, pagina principală">
          <img src="/brand/logo-header.png" alt="M-CRAFT" width="593" height="132">
        </NuxtLink>

        <nav class="main-nav" aria-label="Navigare principală">
          <ul>
            <li>
              <NuxtLink to="/" :class="{ on: isActive('/') }">Acasă</NuxtLink>
            </li>
            <li ref="dropdownRoot" class="has-dd" @mouseleave="dropdownOpen = false">
              <div class="dd-trigger" @mouseenter="dropdownOpen = true">
                <NuxtLink to="/servicii/" :class="{ on: isActive('/servicii/') }">Servicii</NuxtLink>
                <button
                  type="button"
                  class="dd-toggle"
                  :aria-expanded="dropdownOpen"
                  aria-controls="dd-servicii"
                  aria-label="Deschide lista serviciilor"
                  @click="dropdownOpen = !dropdownOpen"
                >
                  <AppIcon name="chevron-down" />
                </button>
              </div>
              <div v-show="dropdownOpen" id="dd-servicii" class="dd band band--top">
                <ul class="dd__list">
                  <li v-for="s in serviceThumbs" :key="s.slug">
                    <NuxtLink :to="serviceUrl(s.slug)" class="dd__item band band--left" :data-svc="s.slug">
                      <img v-if="s.thumb" :src="s.thumb" alt="" width="64" height="48" loading="lazy">
                      <span>
                        <strong>{{ s.name }}</strong>
                        <small>{{ s.summary }}</small>
                      </span>
                    </NuxtLink>
                  </li>
                </ul>
                <div class="dd__foot">
                  <NuxtLink to="/servicii/">Toate serviciile</NuxtLink>
                  <NuxtLink to="/contact/">Cere o ofertă</NuxtLink>
                </div>
              </div>
            </li>
            <li v-for="item in nav.slice(1)" :key="item.to">
              <NuxtLink :to="item.to" :class="{ on: isActive(item.to) }">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <form class="search" role="search" @submit.prevent="submitSearch">
          <label for="hdr-search" class="visually-hidden">Caută pe site</label>
          <input id="hdr-search" v-model="searchQuery" type="search" placeholder="Caută pe site" autocomplete="off">
          <button type="submit" aria-label="Caută"><AppIcon name="search" /></button>
        </form>

        <NuxtLink to="/contact/#oferta" class="btn btn--outline btn--sm hdr-quote">Cere ofertă</NuxtLink>
        <a :href="company.phone.href" class="btn btn--primary btn--sm call" @click="track('call')">
          <AppIcon name="phone" />
          <span>Sună acum</span>
        </a>

        <NuxtLink to="/cautare/" class="icon-btn only-mobile" aria-label="Caută pe site">
          <AppIcon name="search" />
        </NuxtLink>
        <button
          type="button"
          class="icon-btn only-mobile"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-menu"
          :aria-label="mobileOpen ? 'Închide meniul' : 'Deschide meniul'"
          @click="mobileOpen = !mobileOpen"
        >
          <AppIcon :name="mobileOpen ? 'close' : 'menu'" />
        </button>
      </div>
    </div>

    <div class="strip strip--mob" aria-hidden="true"><span v-for="s in services" :key="s.slug" :data-svc="s.slug" /></div>

    <div v-show="mobileOpen" id="mobile-menu" class="mob">
      <nav aria-label="Meniu mobil">
        <NuxtLink to="/" class="mob__link">Acasă</NuxtLink>
        <div class="mob__row">
          <NuxtLink to="/servicii/" class="mob__link">Servicii</NuxtLink>
          <button
            type="button"
            class="mob__expand"
            :aria-expanded="mobileServicesOpen"
            aria-controls="mob-servicii"
            @click="mobileServicesOpen = !mobileServicesOpen"
          >
            <span>{{ mobileServicesOpen ? 'Ascunde lista' : 'Vezi lista' }}</span>
            <AppIcon name="chevron-down" :class="{ flip: mobileServicesOpen }" />
          </button>
        </div>
        <ul v-show="mobileServicesOpen" id="mob-servicii" class="mob__sub">
          <li v-for="s in services" :key="s.slug" :data-svc="s.slug">
            <NuxtLink :to="serviceUrl(s.slug)">{{ s.name }}</NuxtLink>
          </li>
        </ul>
        <NuxtLink v-for="item in nav.slice(1)" :key="item.to" :to="item.to" class="mob__link">{{ item.label }}</NuxtLink>
        <NuxtLink to="/video/" class="mob__link mob__link--sec">Video</NuxtLink>
        <NuxtLink to="/recenzii/" class="mob__link mob__link--sec">Recenzii</NuxtLink>
      </nav>
      <div class="mob__contact band band--top">
        <a :href="company.phone.href" class="btn btn--primary" @click="track('call')"><AppIcon name="phone" />{{ company.phone.display }}</a>
        <a :href="whatsappUrl(defaultWhatsappText)" class="btn btn--wa" target="_blank" rel="noopener" @click="track('whatsapp')"><AppIcon name="whatsapp" />WhatsApp</a>
        <a :href="`mailto:${company.email}`" class="btn btn--outline"><AppIcon name="mail" />{{ company.email }}</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg);
}

.util {
  background: var(--concrete);
  font-size: 0.85rem;
  color: var(--ink-2);
}

.util__in {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 32px;
  gap: 16px;
}

.util__area {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.util__area svg {
  width: 15px;
  height: 15px;
  color: var(--rust);
}

.util__links {
  display: flex;
  gap: 18px;
}

.util__links a {
  color: var(--ink-2);
  text-decoration: none;
}

.util__links a:hover {
  color: var(--ink);
  text-decoration: underline;
}

.bar {
  border-bottom: 1px solid var(--line);
  background: var(--bg);
}

.bar__in {
  display: flex;
  align-items: center;
  gap: 20px;
  height: var(--header-h);
}

.logo img {
  height: 38px;
  width: auto;
}

.main-nav {
  margin-right: auto;
}

.main-nav > ul {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.main-nav li + li {
  margin: 0;
}

.main-nav a {
  display: block;
  padding: 8px 10px;
  color: var(--ink);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  border-radius: var(--r-sm) var(--r-sm) 0 0;
}

.main-nav a:hover,
.main-nav a.on {
  border-bottom-color: var(--amber);
}

.has-dd {
  position: relative;
}

.dd-trigger {
  display: flex;
  align-items: center;
}

.dd-trigger a {
  padding-right: 2px;
}

.dd-toggle {
  display: grid;
  place-items: center;
  width: 28px;
  height: 36px;
  background: none;
  border: 0;
  border-radius: var(--r-sm);
  cursor: pointer;
}

.dd-toggle svg {
  width: 16px;
  height: 16px;
  transition: transform 0.15s;
}

.dd-toggle[aria-expanded='true'] svg {
  transform: rotate(180deg);
}

.dd {
  position: absolute;
  top: 100%;
  left: -12px;
  width: min(720px, 90vw);
  background: var(--paper);
  border: 1px solid var(--line);
  border-top: 3px solid var(--amber);
  border-radius: var(--r-lg);
  overflow: hidden;
  box-shadow: 0 8px 18px rgb(48 49 46 / 0.08);
  padding: 10px;
}

.dd__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.dd__list li {
  margin: 0;
}

.main-nav .dd__item {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px;
  border: 0;
  border-radius: var(--r-md);
}

.main-nav .dd__item:hover {
  background: var(--bg);
}

.dd__item img {
  width: 64px;
  height: 48px;
  object-fit: cover;
  flex: none;
  background: var(--concrete);
  border-radius: var(--r-sm);
}

.dd__item strong {
  display: block;
  font-weight: 550;
  line-height: 1.3;
}

.dd__item small {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--ink-2);
  font-size: 0.8rem;
}

.dd__foot {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--line);
  margin-top: 8px;
  padding: 8px 8px 0;
}

.main-nav .dd__foot a {
  padding: 4px 0;
  color: var(--rust);
  font-weight: 550;
  border: 0;
}

.search {
  display: flex;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  background: var(--paper);
  height: 38px;
}

.search input {
  border: 0;
  background: none;
  width: 150px;
  padding: 0 8px;
  font: inherit;
  font-size: 0.9rem;
  color: var(--ink);
}

.search input:focus {
  outline: none;
}

.search:focus-within {
  outline: 2px solid var(--focus);
  outline-offset: 1px;
}

.search button {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: var(--r-sm);
  background: none;
  cursor: pointer;
}

.search svg,
.icon-btn svg {
  width: 20px;
  height: 20px;
}

.icon-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
}

.only-mobile {
  display: none;
}

.mob {
  position: fixed;
  inset: calc(var(--header-h) + 1px) 0 0;
  background: var(--bg);
  overflow-y: auto;
  padding: 8px var(--gutter) 24px;
  border-top: 1px solid var(--line);
}

.mob__link {
  display: block;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
  text-decoration: none;
  font-weight: 550;
  font-size: 1.05rem;
}

.mob__link--sec {
  font-weight: 500;
  color: var(--ink-2);
}

.mob__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--line);
}

.mob__row .mob__link {
  border: 0;
  flex: 1;
}

.mob__expand {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  padding: 0 12px;
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  background: var(--paper);
  font-size: 0.9rem;
  cursor: pointer;
}

.mob__expand svg {
  width: 16px;
  height: 16px;
}

.flip {
  transform: rotate(180deg);
}

.mob__sub {
  list-style: none;
  margin: 0;
  padding: 4px 0 8px 14px;
  border-bottom: 1px solid var(--line);
  border-left: 3px solid var(--amber);
}

.mob__sub li {
  margin: 0;
}

.mob__sub a {
  display: block;
  padding: 9px 0;
  color: var(--ink);
  text-decoration: none;
}

.mob__contact {
  display: grid;
  gap: 8px;
  margin-top: 18px;
}

@media (max-width: 1180px) {
  .search {
    display: none;
  }
}

@media (max-width: 980px) {
  .util__links a:nth-child(3) {
    display: none;
  }

  .main-nav a {
    padding-inline: 7px;
  }
}

@media (max-width: 860px) {
  :global(:root) {
    --header-h: 60px;
  }

  .util {
    display: none;
  }

  .main-nav {
    display: none;
  }

  .call span {
    display: none;
  }

  .call {
    margin-left: auto;
    width: 44px;
    min-height: 44px;
    padding: 0;
  }

  .only-mobile {
    display: grid;
  }

  .bar__in {
    gap: 8px;
  }

  .logo img {
    height: 30px;
  }
}

@media (max-width: 1100px) {
  .hdr-quote {
    display: none;
  }
}

/* Culoare (docs/design/culoare.md) */
.util { background: var(--teracota-d); color: #fff; }
.util__area svg { color: #fff; }
.util__links a { color: #fff; }
.util__links a:hover { color: #fff; text-decoration: underline; text-decoration-color: var(--amber); }

.main-nav a:hover { border-bottom-color: var(--amber); }
.main-nav a.on { background: var(--chihlimbar-t); border-bottom: 3px solid var(--amber); }

.dd { box-shadow: none; border: 1px solid var(--line); border-top-color: var(--amber); --band: var(--amber); --band-w: 3px; padding-top: 13px; }
.main-nav .dd__item { --band: var(--svc-m); padding-left: 12px; }
.main-nav .dd__item:hover { background: var(--svc-t); --band: var(--svc-d); }
.dd__item img { border-bottom: 3px solid var(--svc-d); border-radius: var(--r-sm) var(--r-sm) calc(var(--r-sm) / 2) calc(var(--r-sm) / 2); }
.dd__foot { background: var(--chihlimbar-t); margin: 8px -10px -10px; padding: 10px 18px; border-top: 0; }

.mob__sub { border-left: 0; padding-left: 0; }
.mob__sub li[data-svc] a { display: flex; gap: 10px; align-items: center; }
.mob__sub li[data-svc] a::before { content: ''; flex: none; width: 12px; height: 12px; background: var(--svc-m); outline: 1px solid var(--svc-d); outline-offset: -1px; border-radius: calc(var(--r-sm) / 2); }
.mob__contact { background: var(--chihlimbar-t); padding: 18px 14px 14px; --band: var(--amber); border-radius: var(--r-lg); }

.strip--mob { display: none; }
@media (max-width: 860px) {
  .strip--mob { display: grid; height: 6px; }
  .mob { inset: calc(var(--header-h) + 7px) 0 0; }
}
</style>
