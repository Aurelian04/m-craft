<script setup lang="ts">
// Etapele colaborării, denumite (fără numere decorative).
const steps = [
  { title: 'Discuție și evaluare', text: 'Aflăm tipul lucrării, localitatea, suprafața aproximativă și starea actuală a spațiului. Fotografiile trimise pe WhatsApp ne ajută să înțelegem situația.' },
  { title: 'Ofertă și organizare', text: 'Stabilim lucrările incluse, materialele și ordinea de execuție, astfel încât fiecare etapă să pornească pe un suport pregătit.' },
  { title: 'Execuție', text: 'Realizăm operațiunile stabilite și vă ținem la curent pe parcurs, inclusiv când apar situații care cer o decizie.' },
  { title: 'Verificare și predare', text: 'Verificăm lucrarea împreună cu dumneavoastră înainte de predare.' },
]
</script>

<template>
  <ol class="steps">
    <li v-for="s in steps" :key="s.title">
      <h3>{{ s.title }}</h3>
      <p>{{ s.text }}</p>
    </li>
  </ol>
</template>

<style scoped>
.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 3px solid var(--ink);
}

.steps li {
  margin: 0;
  padding: 14px 16px 4px 0;
  position: relative;
}

.steps li + li {
  padding-left: 16px;
  border-left: 1px solid var(--line);
}

.steps li::before {
  content: '';
  position: absolute;
  top: -9px;
  left: 0;
  width: 15px;
  height: 15px;
  background: var(--amber);
}

.steps li + li::before {
  left: 16px;
}

.steps h3 {
  font-size: 1.2rem;
  margin-bottom: 6px;
}

.steps p {
  color: var(--ink-2);
  font-size: 0.95rem;
}

@media (max-width: 860px) {
  .steps {
    grid-template-columns: 1fr 1fr;
    row-gap: 16px;
  }

  .steps li:nth-child(3) {
    padding-left: 0;
    border-left: 0;
  }

  .steps li:nth-child(3)::before {
    left: 0;
  }
}

@media (max-width: 520px) {
  .steps {
    grid-template-columns: 1fr;
    border-top: 0;
    border-left: 3px solid var(--ink);
  }

  .steps li,
  .steps li + li {
    padding: 4px 0 8px 18px;
    border-left: 0;
  }

  .steps li::before,
  .steps li + li::before {
    top: 8px;
    left: -9px;
  }
}

/* Culoare (docs/design/culoare.md) */
.steps li::before { width: 18px; height: 18px; top: -10px; }
.steps li:nth-child(1)::before { background: var(--amber); }
.steps li:nth-child(2)::before { background: var(--teracota-d); }
.steps li:nth-child(3)::before { background: var(--otel-d); }
.steps li:nth-child(4)::before { background: var(--verde-d); }
</style>
