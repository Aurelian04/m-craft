import type { Post } from '../types'
import alegereaFinisajelorInainteDeLucrari from './alegerea-finisajelor-inainte-de-lucrari'
import ordineaLucrarilorRenovareInterioara from './ordinea-lucrarilor-renovare-interioara'
import parchetLaminatStratificatSauMasiv from './parchet-laminat-stratificat-sau-masiv'
import pregatireaApartamentuluiPentruRenovare from './pregatirea-apartamentului-pentru-renovare'
import pregatireaSuportuluiPentruGresieSiFaianta from './pregatirea-suportului-pentru-gresie-si-faianta'
import sapaAutonivelantaRolSiCandENecesara from './sapa-autonivelanta-rol-si-cand-e-necesara'

// Fiecare articol stă în fișierul lui. Un articol nou se importă aici și se adaugă în listă.
export const allPosts: Post[] = [
  alegereaFinisajelorInainteDeLucrari,
  ordineaLucrarilorRenovareInterioara,
  parchetLaminatStratificatSauMasiv,
  pregatireaApartamentuluiPentruRenovare,
  pregatireaSuportuluiPentruGresieSiFaianta,
  sapaAutonivelantaRolSiCandENecesara,
].sort((a, b) => a.title.localeCompare(b.title, 'ro'))

/** Articolele vizibile: ciornele apar doar în preview și local (runtimeConfig.public.showDrafts). */
export function visiblePosts(showDrafts: boolean) {
  return allPosts.filter((p) => showDrafts || !p.draft)
}

export const postUrl = (slug: string) => `/blog/${slug}/`

/** Fotografii proprii folosite doar unde se potrivesc subiectului articolului */
export const postImages: Record<string, string> = {
  'pregatirea-apartamentului-pentru-renovare': 's3-2620',
  'ordinea-lucrarilor-renovare-interioara': 's5-2926',
  'alegerea-finisajelor-inainte-de-lucrari': 's2-2524',
  'pregatirea-suportului-pentru-gresie-si-faianta': 's4-2781',
}
