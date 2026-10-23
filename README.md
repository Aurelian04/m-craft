# M-CRAFT: website de prezentare

Site-ul firmei M CRAFT CONSTRUCTII SRL (Vicov de Sus, județul Suceava): servicii de renovare și amenajare, proiecte cu fotografii reale, video, blog, contact și cerere de ofertă.

Tehnologie: Nuxt 4 (Vue 3), TypeScript, CSS simplu (fără framework de CSS), fonturi găzduite local. Site-ul este **generat static** (`nuxt generate`) și nu are nevoie de server Node.

## Pornire locală

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build static în dist/
npm run typecheck
```

## Publicare (Cloudflare Pages)

Proiectul Cloudflare Pages `m-craft` construiește automat fiecare push:

- comanda de build e `npm run build` (care rulează `nuxt generate`), iar directorul publicat e `dist`;
- `main` merge în producție;
- celelalte branch-uri primesc un preview la `https://<branch>.m-craft.pages.dev`.

Configurații importante:

- **Domeniul:** în Cloudflare Pages, la *Settings → Environment variables (Production)*, se setează `NUXT_PUBLIC_SITE_URL`, de exemplu `https://domeniu.ro`. Din el se generează canonical, sitemap, Open Graph și datele structurate. Fără el, sitemap-ul rămâne gol.
- **Ciorne:** articolele marcate `draft: true` și notele „De validat de firmă” din paginile legale apar doar în preview (branch diferit de `main`), la `npm run dev` sau cu `SHOW_DRAFTS=1`.
- **Fișiere Cloudflare:** redirecționări în `public/_redirects`, antete de cache în `public/_headers`. Versiunea de Node e în `.nvmrc`.

## Unde se modifică conținutul

| Ce | Fișier |
|---|---|
| Datele firmei (telefon, email, adresă, CUI) | `app/data/company.ts` |
| Servicii (texte, FAQ, mesaj WhatsApp) | `app/data/services/<slug>.ts`, ordinea în `app/data/services/index.ts` |
| Articole de blog | `app/data/posts/<slug>.ts`, lista în `app/data/posts/index.ts` |
| Pagini legale | `app/data/legal/*.ts` |
| Recenzii (doar reale, cu sursă) | `app/data/reviews.ts` |
| Fotografii, clipuri, proiecte, ce poză apare la fiecare serviciu | `scripts/media/selection.json`, apoi regenerare (mai jos) |
| Măsurare Google (ID tag, conversii) | `nuxt.config.ts` → `runtimeConfig.public` |
| Cheia Web3Forms a formularului | `nuxt.config.ts` → `runtimeConfig.public.web3formsKey` |

## Fotografii și clipuri

Originalele stau în afara repo-ului (`C:\M-Craft\Selectie_finala`). Scriptul generează versiunile pentru web:

```bash
pip install pillow
python scripts/media/build_media.py "C:\M-Craft\Selectie_finala" <cale către ffmpeg>
```

- Fotografiile devin WebP la 480/960/1600 px, fără metadate EXIF/GPS. Clipurile devin MP4 H.264 de max. 540 px, fără sunet, cu copertă.
- Rezultatul ajunge în `public/media/` și `app/data/media.json`.
- Fișierele deja generate sunt sărite. Ffmpeg se poate lua din pachetul npm `ffmpeg-static`.

## Măsurare și cookie-uri

- Google Consent Mode v2: totul e refuzat implicit, iar tagul Google se încarcă doar după „Accept”. Fără un ID completat în `googleTagId`, nu se încarcă niciun script Google.
- Evenimentele `generate_lead` (cerere trimisă cu succes), `click_telefon` și `click_whatsapp` sunt separate și nu conțin date personale.
- Pentru Google Ads se completează etichetele de conversie în `googleAdsConversions`.

Detalii, surse și ce mai trebuie confirmat: `docs/PREDARE.md` și `docs/research/`.
