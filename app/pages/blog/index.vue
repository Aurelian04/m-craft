<script setup lang="ts">
import { visiblePosts, postUrl, postImages } from '~/data/posts'
import { photo } from '~/data/media'
import { getService } from '~/data/services'

const { showDrafts } = useRuntimeConfig().public
const posts = visiblePosts(showDrafts)

usePageSeo({
  title: 'Blog: ghiduri pentru renovare și finisaje',
  description: 'Articole despre pregătirea unei renovări, ordinea lucrărilor, alegerea finisajelor, parchet, gresie și faianță și șape autonivelante.',
  noindex: posts.every((p) => p.draft),
})
</script>

<template>
  <div class="wrap page">
    <Breadcrumbs :items="[{ name: 'Blog' }]" />
    <header class="head">
      <h1>Blog</h1>
      <p class="lead">Ghiduri practice pentru cei care pregătesc o renovare: ce se decide înainte, în ce ordine se lucrează și ce trebuie verificat.</p>
    </header>

    <p v-if="!posts.length" class="empty">Articolele sunt în pregătire și vor fi publicate după verificare.</p>

    <ul v-else class="posts">
      <li v-for="p in posts" :key="p.slug" v-reveal :data-svc="p.relatedServices[0]">
        <NuxtLink :to="postUrl(p.slug)" class="post">
          <Pic v-if="postImages[p.slug] && photo(postImages[p.slug]!)" :photo="photo(postImages[p.slug]!)!" sizes="(max-width: 640px) 100vw, 30vw" ratio="16 / 10" alt="" />
          <div class="post__body">
            <span v-if="p.draft" class="draft">Ciornă, nepublicată</span>
            <span v-if="getService(p.relatedServices[0] ?? '')" class="post__tag">{{ getService(p.relatedServices[0]!)!.shortName }}</span>
            <h2>{{ p.title }}</h2>
            <p>{{ p.excerpt }}</p>
            <span class="post__more">Citește articolul →</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page {
  padding-top: 20px;
}

.head {
  margin-bottom: 22px;
}

.head h1 {
  margin-bottom: 8px;
}

.posts {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.posts li {
  margin: 0;
}

.post {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--paper);
  border: 1px solid var(--line);
  color: var(--ink);
  text-decoration: none;
}

.post:hover {
  border-color: var(--amber);
  color: var(--ink);
}

.post__body {
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.post h2 {
  font-size: 1.35rem;
  margin-bottom: 6px;
}

.post p {
  color: var(--ink-2);
  font-size: 0.95rem;
}

.post__more {
  margin-top: auto;
  padding-top: 8px;
  color: var(--rust);
  font-weight: 600;
}

.draft,
.empty {
  font-size: 0.8rem;
}

.draft {
  align-self: start;
  margin-bottom: 6px;
  padding: 1px 6px;
  border: 1px dashed var(--rust);
  color: var(--rust);
}

.empty {
  font-size: 1rem;
  padding: 16px;
  background: var(--paper);
  border: 1px solid var(--line);
}

@media (max-width: 960px) {
  .posts {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .posts {
    grid-template-columns: 1fr;
  }
}

/* Culoare (docs/design/culoare.md) */
.post :deep(img) { border-bottom: 5px solid var(--svc-m); }
.post:hover { border-color: var(--svc-d); }
.post__tag { align-self: start; margin-bottom: 6px; padding: 1px 8px; background: var(--svc-t); color: var(--svc-d); font-size: 0.8rem; font-weight: 600; }
.post__more { color: var(--svc-d); }
.empty { background: var(--chihlimbar-t); border: 0; border-left: 6px solid var(--amber); }
</style>
