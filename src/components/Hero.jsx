export default function Hero() {
  return (
    <section className="blueprint-grid relative overflow-hidden bg-charcoal text-concrete">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-amber">
          Amenajări &amp; renovări interioare
        </p>

        <h1 className="mt-4 max-w-3xl font-display text-6xl font-extrabold leading-[0.95] tracking-tight md:text-8xl">
          Interioare
          <br />
          făcute ca la carte.
        </h1>

        <p className="mt-6 max-w-xl font-body text-lg text-concrete/75">
          Renovări complete de apartamente și case: gips-carton, zugrăveli,
          gresie și faianță, parchet, instalații și finisaje — executate curat,
          la termen, cu o echipă care răspunde la telefon.
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
