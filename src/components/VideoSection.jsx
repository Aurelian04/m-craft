export default function VideoSection() {
  return (
    <section id="video" className="mx-auto max-w-6xl px-5 py-24">
      <h2 className="font-display text-4xl font-extrabold tracking-tight text-charcoal md:text-5xl">
        De la gri la gata de mutat
      </h2>
      <p className="mt-3 max-w-xl font-body text-steel">
        Un scurt clip dintr-o renovare recentă, de la demolări la finisaje.
      </p>

      <div className="mt-10 aspect-video w-full overflow-hidden rounded-sm bg-charcoal">
        {/* Replace VIDEO_ID with the real YouTube video ID */}
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/VIDEO_ID"
          title="Prezentare renovare interioară M-Craft"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  )
}
