<script setup lang="ts">
import type { PostBlock } from '~/data/types'

defineProps<{ blocks: PostBlock[] }>()
</script>

<template>
  <div class="prose">
    <template v-for="(b, i) in blocks" :key="i">
      <h2 v-if="b.type === 'h2'">{{ b.text }}</h2>
      <h3 v-else-if="b.type === 'h3'">{{ b.text }}</h3>
      <p v-else-if="b.type === 'p'">{{ b.text }}</p>
      <ul v-else-if="b.type === 'ul'">
        <li v-for="(it, j) in b.items" :key="j">{{ it }}</li>
      </ul>
      <ol v-else-if="b.type === 'ol'">
        <li v-for="(it, j) in b.items" :key="j">{{ it }}</li>
      </ol>
      <p v-else-if="b.type === 'note'" class="note">{{ b.text }}</p>
    </template>
  </div>
</template>
