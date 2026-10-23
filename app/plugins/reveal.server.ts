// Pe server directiva nu face nimic; conținutul e randat vizibil.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {})
})
