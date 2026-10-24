// Consimțământul pentru măsurare și publicitate (Google). Valori: 'accepted' | 'refused' | null (nealeasă).
// Valoarea implicită pentru Google e „denied” (scriptul inline din nuxt.config).

const STORAGE_KEY = 'cookie-consent'

type Choice = 'accepted' | 'refused'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'accepted' || v === 'refused' ? v : null
  } catch {
    return null
  }
}

export function useConsent() {
  const choice = useState<Choice | null>('consent-choice', () => null)
  const bannerOpen = useState('consent-banner', () => false)
  const settingsOpen = useState('consent-settings', () => false)

  function init() {
    choice.value = readChoice()
    bannerOpen.value = choice.value === null
  }

  function set(value: Choice) {
    choice.value = value
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // stocarea poate fi blocată; alegerea rămâne valabilă pentru vizita curentă
    }
    const state = value === 'accepted' ? 'granted' : 'denied'
    // ad_personalization rămâne refuzat: site-ul nu folosește remarketing.
    window.gtag?.('consent', 'update', {
      ad_storage: state,
      ad_user_data: state,
      analytics_storage: state,
    })
    bannerOpen.value = false
    settingsOpen.value = false
    if (value === 'accepted') loadGoogleTag()
    else clearGoogleCookies()
  }

  function openSettings() {
    settingsOpen.value = true
  }

  return { choice, bannerOpen, settingsOpen, init, set, openSettings }
}

/** La retragerea acordului: șterge cookie-urile Google (_gcl_*, _ga*) puse anterior pe acest domeniu. */
function clearGoogleCookies() {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0]!.trim())
    .filter((n) => /^(_gcl|_ga)/.test(n))
  const host = location.hostname
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
  for (const n of names) {
    for (const d of domains) {
      document.cookie = `${n}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`
    }
  }
}

let tagLoaded = false

/** Încarcă Google tag dacă există un ID: în modul „basic” doar după acord, în „advanced” mereu (cu consimțământ refuzat implicit). */
export function loadGoogleTag() {
  const { googleTagId, consentMode } = useRuntimeConfig().public
  if (tagLoaded || (consentMode !== 'advanced' && readChoice() !== 'accepted')) return
  if (!googleTagId) return
  tagLoaded = true
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}`
  document.head.appendChild(s)
  window.gtag('js', new Date())
  window.gtag('config', googleTagId)
}

export function isTagActive() {
  return tagLoaded
}
