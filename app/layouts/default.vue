<template>
  <div class="site">
    <a href="#continut" class="skip-link">Sari la conținut</a>
    <AppHeader />
    <ServiceCarousel />
    <main id="continut" tabindex="-1">
      <slot />
    </main>
    <AppFooter />
    <FloatingContact />
    <CookieConsent />
  </div>
</template>
