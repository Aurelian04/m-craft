// Tipurile de conținut ale site-ului. Textele stau în app/data, nu în componente.

export interface TextSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export interface Faq {
  q: string
  a: string
}

export interface Service {
  slug: string
  /** Denumirea din meniu și din listări */
  name: string
  /** Denumire scurtă pentru carusel (max ~28 caractere) */
  shortName: string
  h1: string
  /** max ~60 caractere, fără „| M-CRAFT” (se adaugă automat) */
  seoTitle: string
  /** 140–160 caractere */
  seoDescription: string
  /** 2–3 fraze, concrete */
  intro: string
  /** O frază pentru carduri și listări */
  summary: string
  /** Descrierea lucrărilor, situații în care sunt necesare, explicații utile */
  sections: TextSection[]
  /** Materiale sau variante relevante (fără mărci) */
  options: { title: string; text: string }[]
  /** Ce influențează oferta și durata */
  quoteFactors: string[]
  faq: Faq[]
  /** Slug-uri de servicii asociate */
  related: string[]
  /** Text WhatsApp precompletat; conține „[localitate]” */
  whatsappText: string
  /** Cuvinte-cheie pentru căutarea internă */
  keywords: string[]
}

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'note'; text: string }

export interface Post {
  slug: string
  title: string
  seoTitle: string
  seoDescription: string
  excerpt: string
  /** true până la verificarea de către firmă */
  draft: boolean
  tags: string[]
  relatedServices: string[]
  body: PostBlock[]
}

export interface LegalDoc {
  slug: string
  title: string
  seoDescription: string
  /** Data versiunii, ISO (AAAA-LL-ZZ) */
  updated: string
  body: PostBlock[]
}
