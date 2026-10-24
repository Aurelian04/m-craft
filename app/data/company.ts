// Datele firmei: singura sursă. Componentele le citesc de aici.

export const company = {
  brand: 'M-CRAFT',
  legalName: 'M CRAFT CONSTRUCTII SRL',
  cui: '55628151',
  regCom: 'J2026055606006',
  address: {
    street: 'Str. George Călinescu nr. 10',
    locality: 'Vicov de Sus',
    county: 'județul Suceava',
    region: 'Suceava',
    postalCode: '727610',
    country: 'RO',
  },
  phone: {
    display: '+40 757 211 551',
    href: 'tel:+40757211551',
  },
  whatsapp: {
    display: '+40 757 211 551',
    number: '40757211551',
  },
  email: 'mcraftconstruct@gmail.com',
  area: 'județul Suceava',
  /** Prezentare scurtă, folosită în footer și meta */
  tagline: 'Renovări, amenajări interioare și exterioare, finisaje și instalații pentru case, apartamente și spații comerciale din județul Suceava.',
} as const

export const fullAddress = `${company.address.street}, ${company.address.locality}, ${company.address.county}, ${company.address.postalCode}`

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${company.whatsapp.number}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export const defaultWhatsappText = 'Bună ziua! Aș dori o ofertă pentru o lucrare. Lucrarea este în [localitate].'
