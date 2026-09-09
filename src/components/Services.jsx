const STEPS = [
  {
    n: '01',
    title: 'Consultanță & ofertă',
    text: 'Venim la fața locului, discutăm ce vrei să construiești sau renovezi și îți facem o ofertă clară, fără costuri ascunse.',
  },
  {
    n: '02',
    title: 'Proiect & materiale',
    text: 'Stabilim planul de execuție și alegem materialele împreună cu tine, în funcție de buget și termene.',
  },
  {
    n: '03',
    title: 'Execuție',
    text: 'Echipa noastră execută lucrarea conform planului, cu actualizări periodice despre stadiul șantierului.',
  },
  {
    n: '04',
    title: 'Predare',
    text: 'Predăm lucrarea finalizată, curățăm șantierul și rămânem disponibili pentru orice întrebare ulterioară.',
  },
]

export default function Services() {
  return (
    <section id="servicii" className="mx-auto max-w-6xl px-5 py-24">
      <h2 className="font-display text-4xl font-extrabold tracking-tight text-charcoal md:text-5xl">
        Cum lucrăm
      </h2>
      <p className="mt-3 max-w-xl font-body text-steel">
        Patru etape simple, de la prima discuție până la predarea cheii.
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
