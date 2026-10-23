// Site static (nuxt generate), găzduit pe Cloudflare Pages. Nu are nevoie de server Node.
// Cloudflare Pages setează CF_PAGES_BRANCH la build; producția se construiește din „main”.
const branch = process.env.CF_PAGES_BRANCH
const isPreviewBuild = !!branch && branch !== 'main'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },

  // Fonturi găzduite local (fără Google Fonts), cu subseturile latin + latin-ext pentru diacritice.
  css: [
    '@fontsource/big-shoulders-display/600',
    '@fontsource/big-shoulders-display/700',
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
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },
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
      // Domeniul de producție (confirmat în documentul de tracking Google Ads). Se poate suprascrie cu NUXT_PUBLIC_SITE_URL.
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://m-craft.ro',
      // Ciornele (articole draft, note „De validat”) apar doar în preview, la `nuxt dev` sau cu SHOW_DRAFTS=1.
      showDrafts: isPreviewBuild || process.env.SHOW_DRAFTS === '1' || process.env.NODE_ENV === 'development',
      // Cheia Web3Forms a proiectului M-CRAFT (publică prin design).
      web3formsKey: '7c14d1a3-6229-40e0-b216-0b9c40990f67',
      // Google Ads (docs: Google_Ads_Tracking_M_Craft.docx). Gol = niciun script Google.
      googleTagId: 'AW-18515496319',
      googleAdsConversions: {
        lead: 'AW-18515496319/36uzCMXbi54dEP-a8PxE', // formular trimis cu succes
        call: 'AW-18515496319/pO5FCMLbi54dEP-a8PxE', // click pe telefon
        whatsapp: '', // nu există încă o conversie WhatsApp în cont
      },
      conversionValue: 1.0,
      conversionCurrency: 'RON',
      // 'basic': tagul Google se încarcă doar după „Accept” (cerința din brief).
      // 'advanced': tagul se încarcă pe toate paginile cu consimțământ refuzat implicit (pinguri fără cookie-uri).
      consentMode: 'basic',
    },
  },

  experimental: {
    defaults: {
      nuxtLink: { trailingSlash: 'append' },
    },
  },

  nitro: {
    preset: 'static',
    // Cloudflare Pages publică directorul dist (setarea proiectului de la versiunea cu Vite)
    output: { publicDir: 'dist' },
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
