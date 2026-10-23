// Site static (nuxt generate), găzduit pe Vercel. Nu are nevoie de server Node.
const vercelEnv = process.env.VERCEL_ENV // 'production' | 'preview' | 'development' | undefined
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },

  // Fonturi găzduite local (fără Google Fonts), cu subseturile latin + latin-ext pentru diacritice.
  css: [
    '@fontsource/big-shoulders-display/700',
    '@fontsource/big-shoulders-display/800',
    '@fontsource-variable/work-sans/wght',
    '~/assets/css/main.css',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'ro' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'theme-color', content: '#FAF8F3' },
        { name: 'color-scheme', content: 'light' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      script: [
        {
          // Google Consent Mode v2: totul refuzat implicit, înainte de orice tag Google.
          // Tagul Google se încarcă abia după „Accept” (vezi plugins/consent.client.ts).
          key: 'consent-default',
          tagPosition: 'head',
          innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{if(localStorage.getItem('cookie-consent')==='accepted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',analytics_storage:'granted'});}}catch(e){}`,
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      // Domeniul final nu e încă stabilit. Pe Vercel se folosește domeniul de producție al proiectului.
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || (productionHost ? `https://${productionHost}` : ''),
      // Articolele marcate draft apar doar în preview și local, niciodată în producție.
      showDrafts: vercelEnv !== 'production',
      // Cheia Web3Forms a proiectului M-CRAFT (publică prin design).
      web3formsKey: '7c14d1a3-6229-40e0-b216-0b9c40990f67',
      // Google tag: se completează când există contul. Gol = niciun script Google.
      googleTagId: '', // ex. 'AW-123456789' sau 'G-XXXXXXX'
      googleAdsConversions: {
        lead: '', // 'AW-123456789/etichetă' pentru cererea trimisă
        call: '', // click pe telefon
        whatsapp: '', // click pe WhatsApp
      },
    },
  },

  experimental: {
    defaults: {
      nuxtLink: { trailingSlash: 'append' },
    },
  },

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt'],
      failOnError: true,
      // o pagină pe rând: pe Windows, scrierile paralele în cache-ul de payload pot eșua (EPERM)
      concurrency: 1,
    },
  },

  typescript: {
    strict: true,
  },
})
