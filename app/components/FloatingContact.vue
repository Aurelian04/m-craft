<script setup lang="ts">
import { company, whatsappUrl, defaultWhatsappText } from '~/data/company'
import { getService } from '~/data/services'

// Acces rapid la apel și WhatsApp. Pe mobil: bară jos (cu spațiu rezervat în pagină);
// pe desktop: un singur buton WhatsApp. Se ascunde cât e deschis bannerul de cookie-uri
// sau cât se completează un câmp de formular, ca să nu acopere controalele.
const route = useRoute()
const { bannerOpen, settingsOpen } = useConsent()
const { track } = useTracking()
const typing = ref(false)

const service = computed(() => {
  const m = route.path.match(/^\/servicii\/([^/]+)/)
  return m ? getService(m[1]!) : undefined
})
const waText = computed(() => service.value?.whatsappText ?? defaultWhatsappText)
const hidden = computed(() => bannerOpen.value || settingsOpen.value || typing.value)

function onFocus(e: FocusEvent) {
  const t = e.target as HTMLElement
  typing.value = !!t.closest('input, textarea, select')
}

onMounted(() => {
  document.addEventListener('focusin', onFocus)
  document.addEventListener('focusout', () => (typing.value = false))
})
</script>

<template>
  <div class="fc" :class="{ 'fc--hidden': hidden }">
    <a :href="company.phone.href" class="fc__call" @click="track('call', { service: service?.slug })">
      <AppIcon name="phone" />
      <span>Sună</span>
    </a>
    <a
      :href="whatsappUrl(waText)"
      class="fc__wa"
      target="_blank"
      rel="noopener"
      aria-label="Scrieți-ne pe WhatsApp"
      @click="track('whatsapp', { service: service?.slug })"
    >
      <AppIcon name="whatsapp" />
      <span>WhatsApp</span>
    </a>
  </div>
</template>

<style scoped>
.fc {
  position: fixed;
  z-index: 60;
  right: 18px;
  bottom: 18px;
  transition: opacity 0.15s, visibility 0.15s;
}

.fc--hidden {
  opacity: 0;
  visibility: hidden;
}

.fc__call {
  display: none;
}

.fc__wa {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-bottom: 3px solid var(--wa);
  color: var(--ink);
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 12px rgb(48 49 46 / 0.12);
}

.fc__wa svg {
  width: 28px;
  height: 28px;
  color: var(--wa);
}

/* pe desktop doar iconul, ca să nu acopere conținutul */
.fc__wa span {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.fc__wa:hover {
  color: var(--ink);
  border-color: var(--wa);
}

@media (max-width: 860px) {
  .fc {
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--paper);
    border-top: 1px solid var(--line);
    padding: 6px var(--gutter) calc(6px + env(safe-area-inset-bottom));
    gap: 8px;
  }

  .fc__call,
  .fc__wa {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    height: 46px;
    width: auto;
    font-weight: 600;
    text-decoration: none;
    box-shadow: none;
  }

  .fc__call {
    background: var(--amber);
    color: var(--ink);
    border: 1px solid #c57b0c;
  }

  .fc__call svg {
    width: 20px;
    height: 20px;
  }

  .fc__wa {
    width: auto;
    border-bottom-width: 1px;
  }

  .fc__wa span {
    position: static;
    width: auto;
    height: auto;
    clip: auto;
  }

  /* spațiu rezervat ca bara să nu acopere finalul paginii */
  :global(body) {
    padding-bottom: calc(60px + env(safe-area-inset-bottom));
  }
}

/* Culoare (docs/design/culoare.md) */
.fc__wa { background: var(--wa-d); border: 1px solid var(--wa-d); color: #fff; box-shadow: none; }
.fc__wa svg { color: #fff; }
.fc__wa:hover { background: #12692f; color: #fff; border-color: #12692f; }
@media (max-width: 860px) {
  .fc { background: var(--chihlimbar-t); border-top: 3px solid var(--amber); }
  .fc__call { border-color: var(--amber-line); }
  .fc__wa svg { color: #fff; }
}
</style>
