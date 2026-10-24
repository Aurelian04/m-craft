<script setup lang="ts">
// Pictograma SAL (Ordinul ANPC 449/2022, modificat prin Ordinul 270/2026): 250 x 50 px, link către platforma SAL.
// Este o informare către consumatori, nu un premiu sau o certificare a firmei.
// Grafica oficială: https://www.anpc.ro/sal (păstrată local în public/anpc).
</script>

<template>
  <a class="anpc" href="https://reclamatiisal.anpc.ro/" target="_blank" rel="noopener noreferrer">
    <img src="/anpc/anpc-sal.png" width="250" height="50" alt="ANPC – Soluționarea alternativă a litigiilor (SAL)" loading="lazy">
  </a>
</template>

<style scoped>
.anpc {
  display: inline-block;
  line-height: 0;
}

.anpc img {
  width: 250px;
  height: 50px;
  object-fit: contain;
}
</style>
