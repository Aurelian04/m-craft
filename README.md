# M-Craft

Site de prezentare pentru o firmă de amenajări și renovări interioare. React + Vite + Tailwind CSS v4, fără backend.

## Pornire locală

```bash
npm install
npm run dev
```

Deschide `http://localhost:5173`.

## Ce mai trebuie completat

1. **Poze reale** — în `src/components/Gallery.jsx`, înlocuiește array-ul `PHOTOS` cu pozele reale. Cel mai simplu: pune fișierele în `public/images/` și referențiază-le ca `/images/nume-poza.jpg`.
2. **Video** — în `src/components/VideoSection.jsx`, editează array-ul `VIDEOS` cu link-urile clipurilor publice de pe Facebook. Clipurile cu muzică sub drepturi de autor nu pot fi încorporate (apar doar ca link).
3. **Formular de contact (EmailJS)** — creează cont gratuit pe emailjs.com, apoi completează în `src/components/ContactForm.jsx`:
   - `SERVICE_ID`
   - `TEMPLATE_ID`
   - `PUBLIC_KEY`

## Deploy pe Vercel

1. Urcă proiectul pe GitHub (`git init`, `git add .`, `git commit`, apoi push la un repo nou).
2. Pe vercel.com, "Add New Project" → alege repo-ul → Deploy (Vercel detectează automat Vite).
3. După deploy, în Vercel: Settings → Domains → adaugă domeniul cumpărat și urmează instrucțiunile DNS (de obicei un record A sau CNAME).

## Structură

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Services.jsx
│   ├── Gallery.jsx
│   ├── VideoSection.jsx
│   ├── ContactForm.jsx
│   └── Footer.jsx
├── App.jsx
├── main.jsx
└── index.css
```
