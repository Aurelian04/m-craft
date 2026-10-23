# M-CRAFT: website de prezentare

Site-ul firmei M CRAFT CONSTRUCTII SRL (Vicov de Sus, județul Suceava): servicii de renovare și amenajare, proiecte cu fotografii reale, video, blog, contact și cerere de ofertă.

Tehnologie: Nuxt 4 (Vue 3), TypeScript, CSS simplu (fără framework de CSS), fonturi găzduite local. Site-ul este **generat static** (`nuxt generate`) și nu are nevoie de server Node.

## Pornire locală

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # build static în .output/public
npm run typecheck
```

## Publicare (Vercel)

`vercel.json` configurează build-ul: `npm run generate`, cu ieșirea în `.output/public`. Branch-ul `main` merge în producție, iar celelalte branch-uri primesc automat câte un preview.

- Domeniul: se setează variabila `NUXT_PUBLIC_SITE_URL` (de ex. `https://domeniu.ro`). Fără ea, pe Vercel se folosește domeniul de producție al proiectului (`VERCEL_PROJECT_PRODUCTION_URL`). Din domeniu se generează canonical, sitemap, Open Graph și datele structurate.
- Articolele de blog marcate `draft: true` și notele „De validat de firmă” din paginile legale apar doar local și în preview, niciodată în producție.

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
