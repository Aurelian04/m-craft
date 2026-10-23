import { services } from '../../app/data/services'
import { allPosts } from '../../app/data/posts'
import { reviews } from '../../app/data/reviews'

// Sitemap generat la build. Paginile fără conținut indexabil (căutare, ciorne, recenzii goale) sunt excluse.
export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig().public
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  const paths = [
    '/',
    '/servicii/',
    ...services.map((s) => `/servicii/${s.slug}/`),
    '/proiecte/',
    '/video/',
    '/despre-noi/',
    ...(reviews.length ? ['/recenzii/'] : []),
    ...(allPosts.some((p) => !p.draft) ? ['/blog/'] : []),
    ...allPosts.filter((p) => !p.draft).map((p) => `/blog/${p.slug}/`),
    '/contact/',
    '/termeni-si-conditii/',
    '/politica-de-confidentialitate/',
    '/politica-cookie/',
  ]
  const urls = siteUrl ? paths.map((p) => `  <url><loc>${new URL(p, siteUrl).href}</loc></url>`).join('\n') : ''
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
})
