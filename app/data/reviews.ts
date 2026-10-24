// Recenzii reale ale clienților. Se adaugă doar recenzii furnizate de clienți sau preluate
// dintr-o sursă verificabilă (cu link). Nu se inventează nume, texte sau note.
export interface Review {
  author: string
  text: string
  /** de ex. 'Google', 'Facebook', 'Primită pe email' */
  source: string
  /** link către recenzia publică, dacă există */
  url?: string
  /** AAAA-LL */
  date?: string
  service?: string
}

export const reviews: Review[] = []
