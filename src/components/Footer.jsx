export default function Footer({ onCookieSettings }) {
  return (
    <footer className="bg-charcoal-soft py-8 text-concrete/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 font-body text-sm md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} M-Craft. Toate drepturile rezervate.</p>
        <a href="tel:+40757211551" className="hover:text-amber">
          +40 757 211 551
        </a>
        <div className="flex gap-4">
          <a href="/politica-confidentialitate.html" className="hover:text-amber">
            Politica de confidențialitate
          </a>
          <button onClick={onCookieSettings} className="hover:text-amber">
            Setări cookie-uri
          </button>
        </div>
      </div>
    </footer>
  )
}
