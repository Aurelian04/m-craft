import type { Service } from '../types'
import interioare from './interioare'
import exterioare from './exterioare'
import fatade from './fatade'
import instalatiiSanitare from './instalatii-sanitare'
import instalatiiElectrice from './instalatii-electrice'
import mentenanta from './mentenanta'
import pardoseliPlacari from './pardoseli-placari'
import sapeAutonivelante from './sape-autonivelante'

/** Ordinea din meniu, carusel și pagina Servicii */
export const services: Service[] = [
  interioare,
  pardoseliPlacari,
  sapeAutonivelante,
  instalatiiSanitare,
  instalatiiElectrice,
  exterioare,
  fatade,
  mentenanta,
]

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}

export const serviceUrl = (slug: string) => `/servicii/${slug}/`
