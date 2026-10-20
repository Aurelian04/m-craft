export default function CookieBanner({ visible, setVisible }) {
  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-charcoal px-5 py-4 text-concrete">
      <p>
        Acest website folosește cookie-uri pentru a măsura eficiența reclamelor. Detalii în{' '}
        <a href="/politica-confidentialitate.html" className="underline hover:text-amber">
          Politica de confidențialitate
        </a>
        .
      </p>
      <div className="mt-3 flex gap-3">
        <button
          onClick={() => {
            setVisible(false)
            localStorage.setItem('cookie-consent', 'accepted')
            window.gtag('consent', 'update', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted',
            })
          }}
          className="bg-amber px-5 py-2 font-semibold text-charcoal"
        >
          Accept
        </button>

        <button
          onClick={() => {
            setVisible(false)
            localStorage.setItem('cookie-consent', 'refused')
            window.gtag('consent', 'update', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
            })
          }}
          className="border border-concrete px-5 py-2"
        >
          Refuz
        </button>
      </div>
    </div>
  )
}
