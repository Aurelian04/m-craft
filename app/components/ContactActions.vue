<script setup lang="ts">
import { company, whatsappUrl, defaultWhatsappText } from '~/data/company'

const props = withDefaults(
  defineProps<{
    whatsappText?: string
    /** slug-ul serviciului, pentru preselectare în formular și măsurare */
    service?: string
    /** unde duce „Cere o ofertă” */
    quoteHref?: string
    showQuote?: boolean
  }>(),
  { whatsappText: defaultWhatsappText, service: undefined, quoteHref: undefined, showQuote: true },
)

const { track } = useTracking()
const quoteTo = computed(() => props.quoteHref ?? (props.service ? `/contact/?serviciu=${props.service}#oferta` : '/contact/#oferta'))
</script>

<template>
  <div class="actions">
    <NuxtLink v-if="showQuote" :to="quoteTo" class="btn btn--primary">Cere o ofertă</NuxtLink>
    <a :href="company.phone.href" class="btn btn--outline" @click="track('call', { service })">
      <AppIcon name="phone" />
      <span>{{ company.phone.display }}</span>
    </a>
    <a :href="whatsappUrl(whatsappText)" class="btn btn--wa" target="_blank" rel="noopener" @click="track('whatsapp', { service })">
      <AppIcon name="whatsapp" />
      <span>WhatsApp</span>
    </a>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 520px) {
  .actions .btn {
    flex: 1 1 100%;
  }
}
</style>
