const STEPS = [
  {
    n: '01',
    title: 'Vizită & ofertă',
    text: 'Venim în locuință, măsurăm, discutăm ce vrei să renovezi sau să amenajezi și îți facem o ofertă clară pe fiecare lucrare, fără costuri ascunse.',
  },
  {
    n: '02',
    title: 'Plan & finisaje',
    text: 'Stabilim ordinea lucrărilor și alegem împreună finisajele — gresie, faianță, parchet, vopsele — în funcție de buget și termene.',
  },
  {
    n: '03',
    title: 'Execuție',
    text: 'Compartimentări, gips-carton, glet, zugrăveli și montaj. Lucrăm curat, protejăm suprafețele și te ținem la curent cu stadiul.',
  },
  {
    n: '04',
    title: 'Predare',
    text: 'Facem curățenie după noi, verificăm fiecare detaliu împreună cu tine și rămânem disponibili pentru orice retuș ulterior.',
  },
]

export default function Services() {
  return (
    <section id="servicii" className="mx-auto max-w-6xl px-5 py-24">
      <h2 className="font-display text-4xl font-extrabold tracking-tight text-charcoal md:text-5xl">
        Cum lucrăm
      </h2>
      <p className="mt-3 max-w-xl font-body text-steel">
        Patru etape simple, de la prima vizită până la locuința gata de mutat.
      </p>

      <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {STEPS.map((step) => (
          <div key={step.n} className="flex gap-5 border-t border-charcoal/15 pt-6">
            <span className="font-display text-3xl font-extrabold text-amber">
              {step.n}
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-charcoal">
                {step.title}
              </h3>
              <p className="mt-2 font-body text-steel">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
