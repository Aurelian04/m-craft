# Notă de predare: noul site M-CRAFT

Branch: `redesign`. `main` și site-ul actual nu au fost modificate.

## Ce conține

- **Pagini (26):**
  - Acasă, Servicii, 8 pagini de serviciu, Proiecte, Video, Despre noi, Recenzii;
  - Blog, cu 6 articole în ciornă;
  - Contact, Căutare;
  - Termeni și condiții, Politica de confidențialitate, Politica de cookie-uri;
  - pagină 404.
- **Header:**
  - header sticky, cu bară de linkuri secundare (Video, Recenzii, email, WhatsApp);
  - meniul „Servicii” se deschide ca dropdown. Pe mobil, linkul „Servicii” e separat de butonul „Vezi lista”;
  - căutare și buton „Sună acum”.
- **Caruselul serviciilor**, sub header:
  - avansează lent, cu pauză la interacțiune, buton de oprire, tastatură (săgeți) și swipe;
  - nu pornește deloc la „mișcare redusă”.
- **Animație 3D (CSS 3D, fără biblioteci):**
  - încăperea se asamblează pe straturi: șapă, gresie, structură metalică, gips-carton, faianță, glet și vopsea;
  - pornește când intră în ecran;
  - e marcată ca ilustrație, nu ca lucrare a firmei;
  - la mișcare redusă, apare direct starea finală.
- **Fotografii și clipuri:** 108 fotografii și 17 clipuri reale, grupate în 12 proiecte, cu filtre pe categorii și un lightbox luminos (taste ← → și Esc).
- **Formular:**
  - trimite prin Web3Forms, cu cheia existentă a proiectului;
  - are honeypot anti-spam, validare și stările „Se trimite”, succes și eroare;
  - la eroare datele rămân completate și apar butoanele de telefon și WhatsApp;
  - serviciul se preselectează din pagina de serviciu.
- **Buton de contact persistent:** pe mobil, bară Sună/WhatsApp; pe desktop, buton WhatsApp. Se ascunde cât e deschis bannerul de cookie-uri și cât se scrie în formular.
- **Cookie-uri:**
  - banner cu Accept, Refuz și Setări, cu „Setări cookie-uri” și în footer;
  - Consent Mode v2 refuzat implicit, iar tagul Google se încarcă doar după acord;
  - la retragerea acordului se șterg cookie-urile `_gcl_*` și `_ga*`.
- **SEO:**
  - titlu și descriere unice pe fiecare pagină, un singur H1, breadcrumbs;
  - canonical, sitemap.xml, robots.txt și Open Graph;
  - date structurate GeneralContractor, Service, FAQPage și BreadcrumbList.
- **Footer:** pictograma SAL de 250 x 50 px, cu link la reclamatiisal.anpc.ro, conform Ordinului ANPC 270/2026. Platforma europeană SOL a fost închisă în iulie 2025 și nu mai apare.

## Ce am verificat

- Build static fără erori, verificarea TypeScript (`nuxt typecheck`) fără erori și nicio eroare de hidratare sau de consolă pe paginile testate.
- Screenshot-uri pe desktop (1366 px) și pe mobil (390 px): temă luminoasă, culori solide, layout compact, fără numerotări decorative.
- **Căutare:**
  - „șapă”, „şapă” (cu sedilă) și „sapa” dau aceleași 12 rezultate;
  - o căutare fără potriviri afișează un mesaj clar.
- **Consimțământ:**
  - nicio cerere către Google înainte de alegere și nici după „Refuz”;
  - după „Accept” se încarcă tagul și se trimite `consent update`. Testul s-a făcut cu un ID fictiv `AW-000000000`, folosit doar la test și absent din cod.
- **Formular:**
  - câmpurile goale nu se trimit;
  - eroarea simulată afișează mesajul și păstrează datele;
  - o **trimitere reală** a reușit. A ajuns pe mcraftconstruct@gmail.com un mesaj „TEST site nou M-CRAFT (vă rugăm ignorați)”.
  - Web3Forms blochează browserele automate de test („HeadlessChrome”). Browserele reale nu sunt afectate.
- **Video:** niciun MP4 nu se descarcă până la apăsarea „Redă”. Clipurile sunt fără sunet și cu controale vizibile.
- **Tastatură:** dropdown-ul se deschide cu Enter și se închide cu Esc, iar lightbox-ul se navighează cu săgeți și se închide cu Esc.
- **Mișcare redusă:** caruselul nu mai rulează singur, animația 3D apare în starea finală și nu există animații de apariție.

## Lipsesc sau trebuie confirmate înainte de publicare

### Materiale
- **Fotografii pentru Fațade și Șape autonivelante:** nu există nicio fotografie a acestor lucrări. Paginile funcționează fără galerie (nu apar cadre goale), dar ar fi mult mai credibile cu imagini reale.
- **Fotografii cu lucrări finalizate:** toate cele 192 de fotografii primite arată lucrări în execuție, nimic terminat. Fotografiile cu încăperi gata ar ajuta mult prima pagină și paginile de serviciu.
- **Parchet:** nu există fotografii de parchet montat.
- **Logo-ul:** cererea pomenea un logo atașat, dar nu l-am primit separat. Am refăcut vectorial logo-ul existent în repo (colțar chihlimbar + „M-CRAFT” în Big Shoulders Display), cu contururi reale, nu text cu font web, într-o variantă pentru fundal deschis. Favicon-ul folosește colțarul și litera M. Dacă există un fișier original al logo-ului, trebuie comparat.
- **Recenzii:** nu există recenzii reale. Pagina explică asta și nu apare nicio recenzie pe prima pagină.
- **Confidențialitate în clipuri:** clipurile cu fețe recognoscibile sau logo-uri ale altor firme (de ex. o vestă „zafit”, logo Lidl prin vitrină) au fost excluse. Pentru a le folosi e nevoie de acordul persoanelor.

### Confirmări de la firmă (detaliate în `docs/research/*.md`)
- **Instalații electrice:**
  - firma are sau colaborează cu un electrician autorizat ANRE?
  - pagina nu afirmă nicio autorizare și e scrisă ca ghid pentru client;
  - fără confirmare, pagina rămâne informativă sau se scoate din meniu.
- **Ce execută efectiv firma:** instalații sanitare (trasee, probe de presiune), fațade ETICS complete, hidroizolații de terasă, parchet (laminat, stratificat, masiv), șape autonivelante, mentenanță.
- **Legislație:**
  - Legea 50/1991 a fost înlocuită de Codul amenajării teritoriului, urbanismului și construcțiilor (Legea 169/2026), după research;
  - textele formulează prudent, dar trebuie verificate;
  - paginile legale sunt un draft documentat, nu o verificare juridică finală.
- **Blog:** cele 6 articole sunt marcate `draft: true` și nu apar în producție până nu sunt verificate. Pentru publicare: `draft: false` în fișierul articolului.
- **Note din paginile legale:** cele care încep cu „De validat de firmă” apar doar în preview.
- **Denumirea exactă din ONRC:** „M CRAFT CONSTRUCTII SRL” (folosită) sau „M-CRAFT CONSTRUCȚII S.R.L.”.

### Accesuri și configurări
- **Găzduire:** site-ul e publicat pe **Cloudflare Pages** (proiectul `m-craft`). Ultimul deploy Vercel e din 11.09.2026, deci configurația Vercel a fost scoasă. Preview-ul branch-ului este la https://redesign.m-craft.pages.dev.
- **Domeniul final:** se setează `NUXT_PUBLIC_SITE_URL` în Cloudflare Pages (variabilele de producție).
- **Google Ads:** ID-ul `AW-…` și etichetele celor 3 conversii, plus `G-…` dacă se folosește GA4. Se completează în `nuxt.config.ts`.
- **Cloudflare:** de verificat dacă DPA-ul Cloudflare se aplică contului (politica de confidențialitate numește Cloudflare ca furnizor de găzduire).
- **Web3Forms:**
  - de acceptat DPA-ul;
  - de setat perioada de păstrare a trimiterilor;
  - de verificat dacă limita gratuită de 250 de trimiteri pe lună ajunge.
- **Harta:** pinul se poziționează după adresă, fără coordonate introduse manual. Trebuie verificat pe preview că Google Maps arată locul corect.

## Surse

- `docs/research/servicii-a.md`: interioare, pardoseli și placări, șape, mentenanță.
- `docs/research/servicii-b.md`: exterioare, fațade, instalații sanitare și electrice.
- `docs/research/blog.md`: articolele.
- `docs/research/legal-si-consimtamant.md`: GDPR, cookie-uri, ANPC/SAL, Consent Mode, Web3Forms.
