<script setup lang="ts">
const { choice, bannerOpen, settingsOpen, set, init } = useConsent()

// după hidratare, ca HTML-ul generat static să coincidă cu prima randare din browser
onMounted(() => {
  init()
  loadGoogleTag()
})

const measure = ref(false)
const dialog = ref<HTMLDialogElement | null>(null)

watch(settingsOpen, async (open) => {
  measure.value = choice.value === 'accepted'
  await nextTick()
  if (open) dialog.value?.showModal()
  else dialog.value?.close()
})

function save() {
  set(measure.value ? 'accepted' : 'refused')
}
</script>

<template>
  <div>
    <section v-if="bannerOpen && !settingsOpen" class="cc" aria-label="Cookie-uri" role="region">
      <div class="wrap cc__in">
        <p class="cc__text">
          Folosim cookie-uri Google doar dacă sunteți de acord, ca să măsurăm dacă reclamele noastre aduc cereri de ofertă.
          Site-ul și contactarea noastră funcționează la fel și dacă refuzați.
          <NuxtLink to="/politica-cookie/">Politica de cookie-uri</NuxtLink>
        </p>
        <div class="cc__btns">
          <button type="button" class="btn btn--dark btn--sm" @click="set('accepted')">Accept</button>
          <button type="button" class="btn btn--dark btn--sm" @click="set('refused')">Refuz</button>
          <button type="button" class="btn btn--outline btn--sm" @click="settingsOpen = true">Setări</button>
        </div>
      </div>
    </section>

    <dialog ref="dialog" class="ccd" aria-labelledby="ccd-title" @close="settingsOpen = false">
      <form method="dialog" @submit.prevent="save">
        <h2 id="ccd-title">Setări cookie-uri</h2>
        <div class="opt">
          <div>
            <h3>Strict necesare</h3>
            <p>Memorarea alegerii dumneavoastră privind cookie-urile (în browser). Nu pot fi dezactivate.</p>
          </div>
          <span class="opt__fixed">Mereu active</span>
        </div>
        <div class="opt">
          <div>
            <h3><label for="cc-measure">Măsurare și publicitate (Google)</label></h3>
            <p>Ne arată dacă vizitatorii veniți din reclamele Google trimit o cerere, sună sau scriu pe WhatsApp. Nu se transmit numele, telefonul sau mesajul dumneavoastră.</p>
          </div>
          <input id="cc-measure" v-model="measure" type="checkbox" class="switch">
        </div>
        <p class="ccd__links">
          Detalii în <NuxtLink to="/politica-cookie/" @click="settingsOpen = false">Politica de cookie-uri</NuxtLink> și
          <NuxtLink to="/politica-de-confidentialitate/" @click="settingsOpen = false">Politica de confidențialitate</NuxtLink>.
        </p>
        <div class="ccd__btns">
          <button type="submit" class="btn btn--dark btn--sm">Salvează alegerea</button>
          <button type="button" class="btn btn--outline btn--sm" @click="set('accepted')">Accept tot</button>
          <button type="button" class="btn btn--outline btn--sm" @click="set('refused')">Refuz tot</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<style scoped>
.cc {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 80;
  background: var(--paper);
  border-top: 3px solid var(--amber);
  box-shadow: 0 -4px 14px rgb(48 49 46 / 0.08);
}

.cc__in {
  display: flex;
  align-items: center;
  gap: 16px 24px;
  padding-block: 14px;
}

.cc__text {
  margin: 0;
  font-size: 0.925rem;
}

.cc__btns {
  display: flex;
  gap: 8px;
  flex: none;
}

.cc__btns .btn {
  min-width: 96px;
}

.ccd {
  width: min(560px, calc(100vw - 24px));
  border: 1px solid var(--line);
  border-top: 3px solid var(--amber);
  background: var(--paper);
  color: var(--ink);
  padding: 22px;
}

.ccd::backdrop {
  background: rgb(233 229 221 / 0.85);
}

.ccd h2 {
  font-size: 1.6rem;
  margin-bottom: 12px;
}

.opt {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 16px;
  padding-block: 12px;
  border-top: 1px solid var(--line);
}

.opt h3 {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.opt p {
  font-size: 0.9rem;
  color: var(--ink-2);
  margin: 0;
}

.opt__fixed {
  font-size: 0.85rem;
  color: var(--ink-2);
  white-space: nowrap;
}

.switch {
  appearance: none;
  flex: none;
  width: 46px;
  height: 26px;
  border: 1px solid var(--ink);
  background: var(--concrete);
  position: relative;
  cursor: pointer;
  margin-top: 2px;
}

.switch::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  background: var(--ink);
  transition: transform 0.15s;
}

.switch:checked {
  background: var(--amber);
}

.switch:checked::after {
  transform: translateX(20px);
}

.ccd__links {
  font-size: 0.875rem;
  color: var(--ink-2);
  border-top: 1px solid var(--line);
  padding-top: 12px;
}

.ccd__btns {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 760px) {
  .cc__in {
    flex-direction: column;
    align-items: stretch;
  }

  .cc__btns .btn {
    flex: 1;
    min-width: 0;
  }
}

/* Culoare (docs/design/culoare.md) */
.cc { background: var(--chihlimbar-t); border-top: 4px solid var(--amber); box-shadow: none; }
.cc__text a { color: var(--teracota-d); }
.ccd { border-top: 4px solid var(--amber); }
.ccd::backdrop { background: rgb(248 230 198 / 0.9); }
.opt__fixed { padding: 1px 8px; background: var(--verde-t); color: var(--verde-d); }
</style>
