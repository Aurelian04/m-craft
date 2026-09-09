export default function Footer() {
  return (
    <footer className="bg-charcoal-soft py-8 text-concrete/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 font-body text-sm md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} M-Craft. Toate drepturile rezervate.</p>
        <a href="tel:+40700000000" className="hover:text-amber">
          +40 700 000 000
        </a>
      </div>
    </footer>
  )
}
