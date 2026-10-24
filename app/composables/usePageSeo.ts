import { company } from '~/data/company'
import { photoSrc, type Photo } from '~/data/media'

interface PageSeo {
  title: string
  description: string
  /** fotografia pentru Open Graph */
  image?: Photo
  noindex?: boolean
  /** titlul complet, fără sufixul „| M-CRAFT” */
  rawTitle?: boolean
}

export function usePageSeo(seo: PageSeo) {
  const route = useRoute()
  const { siteUrl } = useRuntimeConfig().public
  const abs = (path: string) => (siteUrl ? new URL(path, siteUrl).href : undefined)

  const fullTitle = seo.rawTitle ? seo.title : `${seo.title} | ${company.brand}`
  const path = route.path.endsWith('/') ? route.path : `${route.path}/`
  const canonical = abs(path)
  const ogImage = seo.image ? abs(photoSrc(seo.image, seo.image.widths.at(-1)!)) : abs('/og-image.jpg')

  useHead({
    title: fullTitle,
    link: canonical ? [{ rel: 'canonical', href: canonical }] : [],
  })
  useSeoMeta({
    description: seo.description,
    ogTitle: fullTitle,
    ogDescription: seo.description,
    ogType: 'website',
    ogLocale: 'ro_RO',
    ogSiteName: company.brand,
    ogUrl: canonical,
    ogImage,
    ogImageAlt: seo.image?.alt,
    twitterCard: 'summary_large_image',
    robots: seo.noindex ? 'noindex, follow' : undefined,
  })
}

/** Date structurate: listă de breadcrumbs */
export function useBreadcrumbLd(items: { name: string; path: string }[]) {
  const { siteUrl } = useRuntimeConfig().public
  if (!siteUrl) return
  useHead({
    script: [
      {
        type: 'application/ld+json',
        key: 'ld-breadcrumbs',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((it, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: it.name,
            item: new URL(it.path, siteUrl).href,
          })),
        }),
      },
    ],
  })
}
