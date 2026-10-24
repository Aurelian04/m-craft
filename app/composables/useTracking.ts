// Evenimente de măsurare, fără date personale (nume, email, telefon, mesaj nu se trimit niciodată).
// Un click pe telefon sau WhatsApp nu dovedește că apelul sau mesajul a avut loc; de aceea sunt evenimente separate.

type Action = 'lead' | 'call' | 'whatsapp'

const eventNames: Record<Action, string> = {
  lead: 'generate_lead',
  call: 'click_telefon',
  whatsapp: 'click_whatsapp',
}

export function useTracking() {
  const config = useRuntimeConfig().public

  function track(action: Action, context?: { service?: string }) {
    if (!import.meta.client || !isTagActive()) return
    const params: Record<string, string> = { page_path: window.location.pathname }
    if (context?.service) params.service = context.service
    window.gtag('event', eventNames[action], params)
    const sendTo = config.googleAdsConversions[action]
    if (sendTo) {
      window.gtag('event', 'conversion', {
        send_to: sendTo,
        value: config.conversionValue,
        currency: config.conversionCurrency,
        transport_type: 'beacon', // pleacă și dacă pagina deschide imediat aplicația de telefon
      })
    }
  }

  return { track }
}
