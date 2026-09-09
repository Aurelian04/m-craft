import { useState } from 'react'
import emailjs from '@emailjs/browser'

// Fill these in after creating a free account at emailjs.com
const SERVICE_ID = 'YOUR_SERVICE_ID'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
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
