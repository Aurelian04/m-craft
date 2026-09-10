import { useState } from 'react'

// Cheie de acces Web3Forms. Se obține gratuit pe https://web3forms.com:
// introduci adresa de email pe care trebuie să ajungă cererile, confirmi
// printr-un click în email și primești cheia. E ok să fie vizibilă în cod.
const ACCESS_KEY = 'YOUR_ACCESS_KEY'

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const data = new FormData(e.target)
    data.append('access_key', ACCESS_KEY)
    data.append('subject', 'Cerere de ofertă nouă — site M-Craft')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.message || 'Trimitere eșuată')
      setStatus('sent')
      e.target.reset()
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-charcoal py-24 text-concrete">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Cere o ofertă
        </h2>
        <p className="mt-3 font-body text-concrete/70">
          Spune-ne pe scurt ce vrei să renovezi sau să amenajezi și te contactăm în cel mai scurt timp.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
          {/* Honeypot anti-spam — ascuns pentru utilizatori, completat doar de boți */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="name" className="font-body text-sm text-concrete/70">
              Nume
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-sm border border-concrete/20 bg-charcoal-soft px-4 py-3 font-body text-concrete outline-none focus:border-amber"
            />
          </div>

          <div>
            <label htmlFor="email" className="font-body text-sm text-concrete/70">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-sm border border-concrete/20 bg-charcoal-soft px-4 py-3 font-body text-concrete outline-none focus:border-amber"
            />
          </div>

          <div>
            <label htmlFor="phone" className="font-body text-sm text-concrete/70">
              Telefon
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="mt-1 w-full rounded-sm border border-concrete/20 bg-charcoal-soft px-4 py-3 font-body text-concrete outline-none focus:border-amber"
            />
          </div>

          <div>
            <label htmlFor="message" className="font-body text-sm text-concrete/70">
              Ce lucrări ai nevoie? (cameră, suprafață, termen dorit)
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-1 w-full rounded-sm border border-concrete/20 bg-charcoal-soft px-4 py-3 font-body text-concrete outline-none focus:border-amber"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-2 rounded-sm bg-amber px-6 py-3 font-body font-semibold text-charcoal transition-colors hover:bg-amber-light disabled:opacity-60"
          >
            {status === 'sending' ? 'Se trimite...' : 'Trimite cererea'}
          </button>

          {status === 'sent' && (
            <p className="font-body text-sm text-amber-light">
              Mulțumim! Am primit mesajul și revenim curând.
            </p>
          )}
          {status === 'error' && (
            <p className="font-body text-sm text-rust">
              A apărut o eroare. Încearcă din nou sau sună direct.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
