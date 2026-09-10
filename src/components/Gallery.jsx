import { useState } from 'react'

// Real project photos live in /public/images
const PHOTOS = [
  { src: '/images/interior-01.jpg', alt: 'Renovare spațiu interior — finisaje și pardoseală' },
  { src: '/images/comercial-01.jpg', alt: 'Amenajare spațiu comercial — pereți din gips-carton' },
  { src: '/images/interior-02.jpg', alt: 'Baie placată cu faianță tip onyx' },
  { src: '/images/comercial-02.jpg', alt: 'Tavan din gips-carton într-un spațiu comercial' },
  { src: '/images/interior-03.jpg', alt: 'Hol amenajat cu gresie și tâmplărie' },
  { src: '/images/comercial-03.jpg', alt: 'Spațiu comercial în amenajare — structură tavan' },
]

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section id="proiecte" className="bg-concrete-dark py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-charcoal md:text-5xl">
          Interioare finalizate
        </h2>
        <p className="mt-3 max-w-xl font-body text-steel">
          O parte din apartamentele, casele și spațiile comerciale amenajate în ultimii ani.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
          {PHOTOS.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute right-6 top-6 font-display text-3xl text-concrete hover:text-amber"
            onClick={() => setActive(null)}
            aria-label="Închide"
          >
            &times;
          </button>
          <img
            src={PHOTOS[active].src}
            alt={PHOTOS[active].alt}
            className="max-h-[85vh] max-w-full rounded-sm object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
