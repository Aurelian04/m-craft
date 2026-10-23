<script setup lang="ts">
import { allPosts, visiblePosts, postUrl, postImages } from '~/data/posts'
import { getService, serviceUrl } from '~/data/services'
import { photo } from '~/data/media'

const route = useRoute()
const { showDrafts } = useRuntimeConfig().public
const post = allPosts.find((p) => p.slug === route.params.slug && (showDrafts || !p.draft))
if (!post) throw createError({ statusCode: 404, statusMessage: 'Articolul nu există', fatal: true })

const image = postImages[post.slug] ? photo(postImages[post.slug]!) : undefined
const services = post.relatedServices.map(getService).filter((s) => !!s)
const others = visiblePosts(showDrafts).filter((p) => p.slug !== post.slug).slice(0, 3)

usePageSeo({ title: post.seoTitle, description: post.seoDescription, image, noindex: post.draft })
</script>

<template>
  <div v-if="post" class="wrap page" :data-svc="post.relatedServices[0]">
    <Breadcrumbs :items="[{ name: 'Blog', path: '/blog/' }, { name: post.title }]" />
    <div class="layout">
      <article>
        <p v-if="post.draft" class="draft">Ciornă în verificare: articolul nu este încă publicat și nu este indexat.</p>
        <h1>{{ post.title }}</h1>
        <p class="lead">{{ post.excerpt }}</p>
        <figure v-if="image" class="fig">
          <Pic :photo="image" priority sizes="(max-width: 860px) 100vw, 720px" />
          <figcaption>{{ image.alt }} (fotografie dintr-o lucrare M-CRAFT)</figcaption>
        </figure>
        <ContentBlocks :blocks="post.body" />
      </article>

      <aside class="side">
        <div v-if="services.length" class="box">
          <h2>Servicii legate de subiect</h2>
          <ul>
            <li v-for="s in services" :key="s!.slug"><NuxtLink :to="serviceUrl(s!.slug)">{{ s!.name }}</NuxtLink></li>
          </ul>
        </div>
        <div class="box box--cta on-amber">
          <h2>Aveți o lucrare în plan?</h2>
          <ContactActions />
        </div>
        <div v-if="others.length" class="box">
          <h2>Alte articole</h2>
          <ul>
            <li v-for="o in others" :key="o.slug"><NuxtLink :to="postUrl(o.slug)">{{ o.title }}</NuxtLink></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-top: 20px;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 40px;
}

article {
  max-width: 760px;
}

h1 {
  margin-bottom: 10px;
}

.draft {
  display: inline-block;
  padding: 4px 10px;
  border: 1px dashed var(--rust);
  color: var(--rust);
  font-size: 0.875rem;
}

.fig {
  margin: 18px 0 24px;
}

.fig figcaption {
  font-size: 0.85rem;
  color: var(--ink-2);
  margin-top: 6px;
}

.side {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.box {
  background: var(--paper);
  border: 1px solid var(--line);
  padding: 14px 16px;
}

.box--cta {
  border-top: 3px solid var(--amber);
}

.box h2 {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.box ul {
  margin: 0;
  padding-left: 1.1em;
}

.box :deep(.actions) {
  flex-direction: column;
}

@media (max-width: 960px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

/* Culoare (docs/design/culoare.md) */
.fig :deep(img) { border-bottom: 6px solid var(--svc-d); }
article :deep(.prose h2) { border-top: 3px solid var(--svc-m); padding-top: 12px; }
.box:first-child { background: var(--svc-t); border-color: var(--svc-t); border-top: 4px solid var(--svc-d); }
.box--cta { background: var(--amber); border-color: var(--amber-line); }
.box:last-child:not(.box--cta) { border-top: 4px solid var(--otel-d); }
</style>
