<script setup lang="ts">
import { company, whatsappUrl, defaultWhatsappText } from '~/data/company'
import { services } from '~/data/services'

// Cerere de ofertă trimisă prin Web3Forms. Mesajul de succes apare doar la răspunsul real al serviciului.
const props = defineProps<{ service?: string; compact?: boolean }>()

const route = useRoute()
const { web3formsKey } = useRuntimeConfig().public
const { track } = useTracking()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  locality: '',
  service: props.service ?? '',
  message: '',
  botcheck: false,
})
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const errorText = ref('')

const serviceName = computed(() => services.find((s) => s.slug === form.service)?.name ?? (form.service === 'alta' ? 'Altă lucrare' : ''))
const waText = computed(() => services.find((s) => s.slug === form.service)?.whatsappText ?? defaultWhatsappText)

// Paginile sunt generate static, deci ?serviciu= din adresă se citește abia în browser.
onMounted(() => {
  const q = route.query.serviciu
  if (!props.service && typeof q === 'string' && services.some((s) => s.slug === q)) form.service = q
})

async function submit() {
  if (status.value === 'sending') return
  status.value = 'sending'
  errorText.value = ''
  try {
    // FormData (multipart) e o cerere „simplă”, fără preflight CORS, pe care Web3Forms o acceptă din browser
    const data = new FormData()
    const fields: Record<string, string> = {
      access_key: web3formsKey,
      subject: `Cerere de ofertă${serviceName.value ? `: ${serviceName.value}` : ''} – site M-CRAFT`,
      from_name: 'Site M-CRAFT',
      replyto: form.email,
      Nume: form.name,
      Email: form.email,
      Telefon: form.phone || '-',
      'Localitatea lucrării': form.locality,
      Serviciu: serviceName.value || '-',
      Mesaj: form.message,
      Pagina: route.path,
    }
    for (const [k, v] of Object.entries(fields)) data.append(k, v)
    if (form.botcheck) data.append('botcheck', 'on')
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data, headers: { Accept: 'application/json' } })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || !json.success) throw new Error(json.message || `HTTP ${res.status}`)
    status.value = 'sent'
    track('lead', { service: form.service || undefined })
    Object.assign(form, { name: '', email: '', phone: '', locality: '', message: '' })
  } catch (e) {
    // datele completate rămân în formular
    errorText.value = e instanceof Error ? e.message : ''
    status.value = 'error'
  }
}
</script>

<template>
  <form class="qf" :class="{ 'qf--compact': compact }" novalidate @submit.prevent="($event.target as HTMLFormElement).reportValidity() && submit()">
    <input v-model="form.botcheck" type="checkbox" name="botcheck" class="qf__hp" tabindex="-1" autocomplete="off" aria-hidden="true">

    <div class="qf__row">
      <label class="qf__field">
        <span>Nume <abbr title="obligatoriu">*</abbr></span>
        <input v-model.trim="form.name" type="text" name="name" autocomplete="name" required maxlength="120">
      </label>
      <label class="qf__field">
        <span>Telefon <small>(opțional)</small></span>
        <input v-model.trim="form.phone" type="tel" name="phone" autocomplete="tel" inputmode="tel" maxlength="30">
      </label>
    </div>
    <div class="qf__row">
      <label class="qf__field">
        <span>Email <abbr title="obligatoriu">*</abbr></span>
        <input v-model.trim="form.email" type="email" name="email" autocomplete="email" required maxlength="160">
      </label>
      <label class="qf__field">
        <span>Localitatea lucrării <abbr title="obligatoriu">*</abbr></span>
        <input v-model.trim="form.locality" type="text" name="locality" autocomplete="address-level2" required maxlength="80" placeholder="ex. Vicov de Sus">
      </label>
    </div>
    <label class="qf__field">
      <span>Serviciul dorit</span>
      <select v-model="form.service" name="service">
        <option value="">Alegeți (opțional)</option>
        <option v-for="s in services" :key="s.slug" :value="s.slug">{{ s.name }}</option>
        <option value="alta">Altă lucrare</option>
      </select>
    </label>
    <label class="qf__field">
      <span>Mesaj <abbr title="obligatoriu">*</abbr></span>
      <textarea v-model="form.message" name="message" rows="5" required maxlength="4000" />
      <small class="qf__hint">Ne ajută să știm: ce lucrare doriți, suprafața aproximativă, starea actuală a spațiului și perioada în care ați vrea să înceapă.</small>
    </label>

    <div class="qf__submit">
      <button type="submit" class="btn btn--primary" :disabled="status === 'sending'">
        {{ status === 'sending' ? 'Se trimite…' : 'Trimite cererea' }}
      </button>
      <p class="qf__privacy">
        Folosim datele doar pentru a vă răspunde la această cerere. Detalii în
        <NuxtLink to="/politica-de-confidentialitate/">Politica de confidențialitate</NuxtLink>.
      </p>
    </div>

    <div aria-live="polite">
      <p v-if="status === 'sent'" class="qf__msg qf__msg--ok band band--left">
        <AppIcon name="check" />
        Mulțumim! Cererea a fost trimisă. Vă răspundem pe email sau la telefon.
      </p>
      <div v-else-if="status === 'error'" class="qf__msg qf__msg--err band band--left">
        <p>
          Cererea nu a putut fi trimisă<template v-if="errorText"> ({{ errorText }})</template>. Datele completate au rămas în formular;
          puteți încerca din nou sau ne puteți contacta direct:
        </p>
        <div class="qf__alt">
          <a :href="company.phone.href" class="btn btn--outline btn--sm" @click="track('call')"><AppIcon name="phone" />{{ company.phone.display }}</a>
          <a :href="whatsappUrl(waText)" class="btn btn--wa btn--sm" target="_blank" rel="noopener" @click="track('whatsapp')"><AppIcon name="whatsapp" />WhatsApp</a>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.qf {
  display: grid;
  gap: 12px;
}

.qf__hp {
  position: absolute;
  left: -9999px;
}

.qf__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.qf__field {
  display: grid;
  gap: 4px;
  font-size: 0.925rem;
  font-weight: 550;
}

.qf__field small {
  font-weight: 400;
  color: var(--ink-2);
}

.qf__field abbr {
  text-decoration: none;
  color: var(--rust);
}

.qf input,
.qf select,
.qf textarea {
  width: 100%;
  min-height: 46px;
  padding: 10px 12px;
  border: 1px solid #b9b2a5;
  border-radius: var(--r-md);
  background: var(--paper);
  color: var(--ink);
  font: inherit;
  font-weight: 400;
}

.qf textarea {
  resize: vertical;
  min-height: 120px;
}

.qf input:focus,
.qf select:focus,
.qf textarea:focus {
  outline: 2px solid var(--focus);
  outline-offset: 0;
  border-color: var(--focus);
}

.qf__hint {
  font-size: 0.85rem;
}

.qf__submit {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 16px;
}

.qf__privacy {
  margin: 0;
  font-size: 0.85rem;
  color: var(--ink-2);
  max-width: 48ch;
}

.qf__msg {
  margin: 0;
  padding: 12px 14px 12px 17px;
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  background: var(--paper);
}

.qf__msg--ok {
  display: flex;
  gap: 8px;
  align-items: center;
  border-left-color: var(--wa);
  --band: var(--wa);
  --band-w: 3px;
  font-weight: 550;
}

.qf__msg--ok svg {
  width: 20px;
  height: 20px;
  color: var(--wa);
  flex: none;
}

.qf__msg--err {
  border-left-color: var(--rust);
  --band: var(--rust);
  --band-w: 3px;
}

.qf__alt {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 600px) {
  .qf__row {
    grid-template-columns: 1fr;
  }
}

/* Culoare (docs/design/culoare.md) */
.qf__field abbr { color: var(--teracota-d); }
.qf input,
.qf select,
.qf textarea { border-color: #958b7a; }
.qf input:focus,
.qf select:focus,
.qf textarea:focus { outline-color: var(--teracota-d); border-color: var(--teracota-d); }
.qf__msg--ok { background: var(--wa-t); border-left-color: var(--wa-d); --band: var(--wa-d); }
.qf__msg--ok svg { color: var(--wa-d); }
.qf__msg--err { background: var(--antifoc-t); border-left-color: var(--antifoc-d); --band: var(--antifoc-d); }
</style>
