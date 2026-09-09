// Link-uri către clipurile publice de pe Facebook (pagină, profil sau Reels).
// Pentru a adăuga/schimba un clip: pune aici URL-ul complet, exact cum apare
// în bara de adrese când deschizi clipul pe facebook.com.
//
// ATENȚIE: clipul trebuie să fie PUBLIC și fără muzică sub drepturi de autor.
// Reels-urile cu piese licențiate nu pot fi încorporate (Facebook afișează
// „Indisponibilă — poate include conținut deținut de altcineva"). În cazul ăsta
// clipul tot apare pe site ca link către Facebook.
const VIDEOS = [
  'https://www.facebook.com/reel/1082080091447487',
  'https://www.facebook.com/reel/4770269166538457',
]

function fbEmbedSrc(url) {
  const params = new URLSearchParams({
    href: url,
    show_text: 'false',
    width: '320',
    autoplay: 'false',
  })
  return `https://www.facebook.com/plugins/video.php?${params.toString()}`
}

export default function VideoSection() {
  return (
    <section id="video" className="mx-auto max-w-6xl px-5 py-24">
      <h2 className="font-display text-4xl font-extrabold tracking-tight text-charcoal md:text-5xl">
        De la gri la gata de mutat
      </h2>
      <p className="mt-3 max-w-xl font-body text-steel">
        Câteva clipuri din renovări recente, direct de pe pagina noastră de Facebook.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {VIDEOS.map((url) => (
          <div key={url} className="w-full max-w-[320px]">
            <div className="relative aspect-[9/16] overflow-hidden rounded-sm bg-charcoal">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={fbEmbedSrc(url)}
                title="Clip renovare interioară M-Craft"
                style={{ border: 'none' }}
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-body text-sm text-steel hover:text-amber"
            >
              Vezi pe Facebook ↗
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
