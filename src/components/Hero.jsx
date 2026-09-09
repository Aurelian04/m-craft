export default function Hero() {
  return (
    <section className="blueprint-grid relative overflow-hidden bg-charcoal text-concrete">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-amber">
          Construcții &amp; renovări
        </p>

        <h1 className="mt-4 max-w-3xl font-display text-6xl font-extrabold leading-[0.95] tracking-tight md:text-8xl">
          Construim ce
          <br />
          rămâne în picioare.
        </h1>

        <p className="mt-6 max-w-xl font-body text-lg text-concrete/75">
          De la fundație până la finisaje: case, extinderi și renovări
          executate la termen, cu materiale verificate și o echipă care
          răspunde la telefon.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="rounded-sm bg-amber px-6 py-3 font-body font-semibold text-charcoal transition-colors hover:bg-amber-light"
          >
            Cere ofertă gratuită
          </a>
          <a
            href="#proiecte"
            className="rounded-sm border border-concrete/30 px-6 py-3 font-body font-semibold text-concrete transition-colors hover:border-amber hover:text-amber"
          >
            Vezi proiecte
          </a>
        </div>
      </div>
    </section>
  )
}
