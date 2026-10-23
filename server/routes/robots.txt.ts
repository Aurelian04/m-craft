export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig().public
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return ['User-agent: *', 'Disallow: /cautare/', 'Allow: /', siteUrl ? `Sitemap: ${new URL('/sitemap.xml', siteUrl).href}` : '']
    .filter(Boolean)
    .join('\n') + '\n'
})
