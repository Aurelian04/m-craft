import { useState } from 'react'
import logo from '../assets/logo.svg'

const LINKS = [
  { href: '#servicii', label: 'Servicii' },
  { href: '#proiecte', label: 'Proiecte' },
  { href: '#video', label: 'Video' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-charcoal text-concrete">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#" className="flex items-center">
          <img
            src={logo}
            alt="M-Craft — Construcții & Renovări"
            className="h-14 w-auto md:h-[4.5rem]"
          />
        </a>

        <nav className="hidden gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-concrete/80 transition-colors hover:text-amber"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="tel:+40757211551"
          className="hidden rounded-sm bg-amber px-4 py-2 font-body text-sm font-semibold text-charcoal transition-colors hover:bg-amber-light md:inline-block"
        >
          Sună acum
        </a>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Deschide meniul"
          aria-expanded={open}
        >
          <span className={`h-0.5 w-6 bg-concrete transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-concrete transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-concrete transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-concrete/10 px-5 pb-4 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 font-body text-sm text-concrete/80"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+40757211551"
            className="mt-2 rounded-sm bg-amber px-4 py-2 text-center font-body text-sm font-semibold text-charcoal"
          >
            Sună acum
          </a>
        </nav>
      )}
    </header>
  )
}
