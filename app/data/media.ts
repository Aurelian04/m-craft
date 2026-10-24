// Fotografiile și clipurile reale ale firmei. Fișierul media.json e generat de
// scripts/media/build_media.py din selecția din scripts/media/selection.json.
import data from './media.json'

export interface Photo {
  id: string
  w: number
  h: number
  /** lățimile generate, crescător */
  widths: number[]
  alt: string
  project: string
  services: string[]
  categories: string[]
  stage: 'in_executie' | 'finalizat' | 'neclar'
}

export interface Video {
  id: string
  project: string
  title: string
  description: string
  w: number
  h: number
  duration: number
  services: string[]
}

export interface Project {
  id: string
  title: string
  summary: string
  /** ce se vede în fotografii, ca listă scurtă */
  works: string[]
  cover: string
  services: string[]
  /** perechi reale înainte/după din aceeași lucrare: [înainte, după, explicație] */
  before_after: [string, string, string][]
}

interface MediaData {
  photos: Photo[]
  videos: Video[]
  projects: Project[]
  /** fotografia principală și galeria pentru fiecare serviciu (id-uri) */
  services: Record<string, { cover: string | null; gallery: string[] }>
  home: { hero: string[]; recent: string[]; about: string[]; videos: string[] }
  categories: { id: string; label: string }[]
}

// JSON-ul generat nu păstrează tipurile literale (stage, perechi), de aceea conversia explicită
export const media = data as unknown as MediaData

const byId = new Map(media.photos.map((p) => [p.id, p]))

export function photo(id: string): Photo | undefined {
  return byId.get(id)
}

export function photos(ids: string[]): Photo[] {
  return ids.map((id) => byId.get(id)).filter((p): p is Photo => !!p)
}

export const photoSrc = (p: Photo, w: number) => `/media/foto/${p.id}-${w}.webp`

export function photoSrcset(p: Photo) {
  return p.widths.map((w) => `${photoSrc(p, w)} ${w}w`).join(', ')
}

export const videoSrc = (v: Video) => `/media/video/${v.id}.mp4`
export const videoPoster = (v: Video) => `/media/video/${v.id}.webp`

export function servicePhotos(slug: string) {
  const entry = media.services[slug]
  return {
    cover: entry?.cover ? photo(entry.cover) : undefined,
    gallery: photos(entry?.gallery ?? []),
  }
}

export function projectPhotos(projectId: string) {
  return media.photos.filter((p) => p.project === projectId)
}

export function projectVideos(projectId: string) {
  return media.videos.filter((v) => v.project === projectId)
}

export const stageLabel: Record<Photo['stage'], string> = {
  in_executie: 'În execuție',
  finalizat: 'Finalizat',
  neclar: '',
}
