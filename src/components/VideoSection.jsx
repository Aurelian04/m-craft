export default function VideoSection() {
  return (
    <section id="video" className="mx-auto max-w-6xl px-5 py-24">
      <h2 className="font-display text-4xl font-extrabold tracking-tight text-charcoal md:text-5xl">
        Șantierul, în mișcare
      </h2>
      <p className="mt-3 max-w-xl font-body text-steel">
        Un scurt clip de pe unul din proiectele recente.
      </p>

      <div className="mt-10 aspect-video w-full overflow-hidden rounded-sm bg-charcoal">
        {/* Replace VIDEO_ID with the real YouTube video ID */}
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/VIDEO_ID"
          title="Prezentare șantier Mihai Construct"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  )
}
