<script setup lang="ts">
import { company, fullAddress, whatsappUrl, defaultWhatsappText } from '~/data/company'

const { track } = useTracking()

usePageSeo({
  title: 'Contact și cerere de ofertă',
  description: 'Cereți o ofertă pentru renovări și amenajări în județul Suceava: telefon și WhatsApp +40 757 211 551, email mcraftconstruct@gmail.com sau formularul online.',
})
</script>

<template>
  <div class="wrap page">
    <Breadcrumbs :items="[{ name: 'Contact' }]" />
    <h1>Contact și cerere de ofertă</h1>
    <p class="lead">Ne puteți suna, scrie pe WhatsApp sau email, ori puteți completa formularul de mai jos.</p>

    <div class="channels">
      <a :href="company.phone.href" class="ch" @click="track('call')">
        <AppIcon name="phone" />
        <span><small>Telefon</small><strong>{{ company.phone.display }}</strong></span>
      </a>
      <a :href="whatsappUrl(defaultWhatsappText)" class="ch ch--wa" target="_blank" rel="noopener" @click="track('whatsapp')">
        <AppIcon name="whatsapp" />
        <span><small>WhatsApp (puteți trimite și fotografii)</small><strong>{{ company.whatsapp.display }}</strong></span>
      </a>
      <a :href="`mailto:${company.email}`" class="ch">
        <AppIcon name="mail" />
        <span><small>Email</small><strong>{{ company.email }}</strong></span>
      </a>
    </div>

    <div class="grid">
      <section id="oferta" class="form-col">
        <h2>Formular de cerere de ofertă</h2>
        <QuoteForm />
      </section>

      <aside class="info">
        <section class="box">
          <h2>Zona în care lucrăm</h2>
          <p>Lucrăm în județul Suceava. Sediul firmei este în Vicov de Sus.</p>
        </section>
        <section class="box">
          <h2>Date firmă</h2>
          <dl>
            <dt>Denumire</dt>
            <dd>{{ company.legalName }}</dd>
            <dt>CUI</dt>
            <dd>{{ company.cui }}</dd>
            <dt>Nr. Reg. Com.</dt>
            <dd>{{ company.regCom }}</dd>
            <dt>Sediu social</dt>
            <dd>{{ fullAddress }}</dd>
          </dl>
        </section>
        <MapEmbed />
      </aside>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-top: 20px;
}

h1 {
  margin-bottom: 8px;
}

.channels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0 28px;
}

.ch {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-top: 3px solid var(--amber);
  color: var(--ink);
  text-decoration: none;
}

.ch:hover {
  border-color: var(--ink);
  border-top-color: var(--amber);
  color: var(--ink);
}

.ch svg {
  width: 26px;
  height: 26px;
  flex: none;
}

.ch--wa {
  border-top-color: var(--wa);
}

.ch--wa svg {
  color: var(--wa);
}

.ch small {
  display: block;
  color: var(--ink-2);
  font-size: 0.8rem;
}

.ch strong {
  font-size: 1.05rem;
  word-break: break-word;
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 32px;
}

.form-col h2 {
  margin-bottom: 14px;
  scroll-margin-top: 120px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.box {
  background: var(--paper);
  border: 1px solid var(--line);
  padding: 14px 16px;
}

.box h2 {
  font-size: 1.25rem;
  margin-bottom: 6px;
}

.box dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4px 12px;
  margin: 0;
  font-size: 0.925rem;
}

.box dt {
  color: var(--ink-2);
}

.box dd {
  margin: 0;
}

@media (max-width: 900px) {
  .channels,
  .grid {
    grid-template-columns: 1fr;
  }
}

/* Culoare (docs/design/culoare.md) */
.ch { background: var(--chihlimbar-t); border: 0; border-top: 4px solid var(--amber); }
.ch:hover { background: #f3d8a8; border-top-color: var(--amber-line); }
.ch--wa { background: var(--wa-t); border-top-color: var(--wa-d); }
.ch--wa:hover { background: #c9e9d4; border-top-color: var(--wa-d); }
.ch--wa svg { color: var(--wa-d); }
.ch:last-child { background: var(--teracota-t); border-top-color: var(--teracota-d); }
.ch:last-child:hover { background: #efcdbb; }
.ch:last-child svg { color: var(--teracota-d); }

.form-col { background: var(--chihlimbar-t); padding: 20px; border-top: 4px solid var(--amber); }

.box { border-top: 4px solid var(--otel-d); }
.box:first-child { background: var(--verde-t); border-color: var(--verde-t); border-top-color: var(--verde-d); }
.box dt { color: var(--otel-d); }
</style>
