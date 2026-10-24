// v-reveal: apariție scurtă pentru elementele care intră în ecran la derulare.
export default defineNuxtPlugin((nuxtApp) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const io = reduced || !('IntersectionObserver' in window)
    ? null
    : new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io?.unobserve(e.target)
          }
        }
      }, { rootMargin: '0px 0px -8% 0px' })

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement) {
      if (!io) return
      if (el.getBoundingClientRect().top < window.innerHeight) return
      el.classList.add('reveal')
      io.observe(el)
    },
    unmounted(el: HTMLElement) {
      io?.unobserve(el)
    },
  })
})
