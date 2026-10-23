<script setup lang="ts">
import { company } from '~/data/company'
import { services, serviceUrl } from '~/data/services'

const { siteUrl } = useRuntimeConfig().public

// Date structurate ale firmei: doar informații reale (fără program, prețuri, coordonate sau ratinguri).
const org = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': siteUrl ? `${siteUrl}/#firma` : undefined,
  name: company.brand,
  legalName: company.legalName,
  taxID: company.cui,
  url: siteUrl || undefined,
  logo: siteUrl ? `${siteUrl}/logo.svg` : undefined,
  image: siteUrl ? `${siteUrl}/og-image.jpg` : undefined,
  telephone: '+40757211551',
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: company.address.locality,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.country,
  },
  areaServed: { '@type': 'AdministrativeArea', name: 'Județul Suceava' },
  description: company.tagline,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicii',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, url: siteUrl ? `${siteUrl}${serviceUrl(s.slug)}` : undefined },
    })),
  },
}

useHead({
  titleTemplate: (t) => t || `${company.brand} – renovări și amenajări în Suceava`,
  script: [{ type: 'application/ld+json', key: 'ld-org', innerHTML: JSON.stringify(org) }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
