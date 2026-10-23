import { services, serviceUrl } from '~/data/services'
import { visiblePosts, postUrl } from '~/data/posts'
import { media } from '~/data/media'

// Căutare internă, locală. Indexează doar conținutul propriu al paginilor (fără meniu sau footer).
// Ponderi: titlu 10, cuvinte-cheie 6, conținut 1. Funcționează cu și fără diacritice.
export const SEARCH_WEIGHTS = { title: 10, keywords: 6, content: 1 }

export interface SearchDoc {
  type: 'Serviciu' | 'Articol' | 'Proiect' | 'Pagină'
  title: string
  url: string
  keywords: string[]
  content: string
}

export function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[şș]/g, 's')
    .replace(/[ţț]/g, 't')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function buildIndex(showDrafts: boolean): SearchDoc[] {
  const docs: SearchDoc[] = []
  for (const s of services) {
    docs.push({
      type: 'Serviciu',
      title: s.name,
      url: serviceUrl(s.slug),
      keywords: [...s.keywords, s.h1],
      content: [
        s.intro,
        ...s.sections.flatMap((x) => [x.title, ...x.paragraphs, ...(x.bullets ?? [])]),
        ...s.options.map((o) => `${o.title}. ${o.text}`),
        ...s.faq.map((f) => `${f.q} ${f.a}`),
      ].join(' '),
    })
  }
  for (const p of visiblePosts(showDrafts)) {
    docs.push({
      type: 'Articol',
      title: p.title,
      url: postUrl(p.slug),
      keywords: p.tags,
      content: [p.excerpt, ...p.body.map((b) => ('text' in b ? b.text : b.items.join(' ')))].join(' '),
    })
  }
  for (const pr of media.projects) {
    docs.push({
      type: 'Proiect',
      title: pr.title,
      url: `/proiecte/#${pr.id}`,
      keywords: pr.works,
      content: [pr.summary, ...media.photos.filter((p) => p.project === pr.id).map((p) => p.alt)].join(' '),
    })
  }
  docs.push(
    { type: 'Pagină', title: 'Contact și cerere de ofertă', url: '/contact/', keywords: ['contact', 'ofertă', 'telefon', 'whatsapp', 'email', 'adresă'], content: 'Telefon, WhatsApp, email, formular de cerere de ofertă, date firmă, hartă, zona deservită: județul Suceava.' },
    { type: 'Pagină', title: 'Despre M-CRAFT', url: '/despre-noi/', keywords: ['despre', 'firmă', 'Vicov de Sus'], content: 'Firmă de construcții și renovări din Vicov de Sus, județul Suceava. Case, apartamente, spații comerciale mici.' },
    { type: 'Pagină', title: 'Video', url: '/video/', keywords: ['video', 'clipuri', 'filmări'], content: media.videos.map((v) => v.title).join(' ') },
  )
  return docs
}

export interface SearchHit {
  doc: SearchDoc
  score: number
  snippet: string
}

function snippet(content: string, terms: string[]) {
  const norm = normalize(content)
  let at = -1
  for (const t of terms) {
    at = norm.indexOf(t)
    if (at >= 0) break
  }
  if (at < 0) return content.slice(0, 180) + (content.length > 180 ? '…' : '')
  const start = Math.max(0, content.lastIndexOf(' ', Math.max(0, at - 70)) + 1)
  const end = Math.min(content.length, at + 150)
  return (start > 0 ? '…' : '') + content.slice(start, end).trim() + (end < content.length ? '…' : '')
}

export function useSiteSearch() {
  const { showDrafts } = useRuntimeConfig().public
  const index = buildIndex(showDrafts).map((d) => ({
    doc: d,
    title: normalize(d.title),
    keywords: normalize(d.keywords.join(' ')),
    content: normalize(d.content),
  }))

  function search(q: string): SearchHit[] {
    const terms = normalize(q)
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length >= 2)
    if (!terms.length) return []
    const hits: SearchHit[] = []
    for (const it of index) {
      let score = 0
      let matched = 0
      for (const t of terms) {
        let s = 0
        if (it.title.includes(t)) s += SEARCH_WEIGHTS.title
        if (it.keywords.includes(t)) s += SEARCH_WEIGHTS.keywords
        const n = it.content.split(t).length - 1
        if (n) s += SEARCH_WEIGHTS.content * Math.min(n, 5)
        if (s) matched++
        score += s
      }
      // toate cuvintele căutate trebuie să apară undeva în document
      if (matched === terms.length && score > 0) hits.push({ doc: it.doc, score, snippet: snippet(it.doc.content, terms) })
    }
    return hits.sort((a, b) => b.score - a.score)
  }

  return { search }
}
