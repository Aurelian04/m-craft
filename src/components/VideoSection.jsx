// Clipuri găzduite direct pe site (public/videos). Pentru a adăuga/schimba
// un clip: pune fișierul .mp4 și o imagine poster .jpg în public/videos/ și
// adaugă o intrare în array-ul de mai jos.
const VIDEOS = [
  { src: '/videos/renovare-01.mp4', poster: '/videos/renovare-01.jpg' },
  { src: '/videos/renovare-02.mp4', poster: '/videos/renovare-02.jpg' },
]

export default function VideoSection() {
  return (
    <section id="video" className="mx-auto max-w-6xl px-5 py-24">
      <h2 className="font-display text-4xl font-extrabold tracking-tight text-charcoal md:text-5xl">
        De la gri la gata de mutat
      </h2>
      <p className="mt-3 max-w-xl font-body text-steel">
        Câteva clipuri din renovări recente.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {VIDEOS.map((video) => (
          <div key={video.src} className="w-full max-w-[320px]">
            <div className="relative aspect-[9/16] overflow-hidden rounded-sm bg-charcoal">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={video.src}
                poster={video.poster}
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
