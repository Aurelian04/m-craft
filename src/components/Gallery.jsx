import { useState } from 'react'

// Placeholder images — replace src with real project photos in /public/images
const PHOTOS = [
  { src: 'https://placehold.co/800x600/2b251f/ece7dd?text=Proiect+1', alt: 'Proiect 1' },
  { src: 'https://placehold.co/800x600/2b251f/ece7dd?text=Proiect+2', alt: 'Proiect 2' },
  { src: 'https://placehold.co/800x600/2b251f/ece7dd?text=Proiect+3', alt: 'Proiect 3' },
  { src: 'https://placehold.co/800x600/2b251f/ece7dd?text=Proiect+4', alt: 'Proiect 4' },
  { src: 'https://placehold.co/800x600/2b251f/ece7dd?text=Proiect+5', alt: 'Proiect 5' },
  { src: 'https://placehold.co/800x600/2b251f/ece7dd?text=Proiect+6', alt: 'Proiect 6' },
]

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section id="proiecte" className="bg-concrete-dark py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-charcoal md:text-5xl">
          Proiecte finalizate
        </h2>
        <p className="mt-3 max-w-xl font-body text-steel">
          O parte din lucrările executate în ultimii ani.
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
