# M-CRAFT: plan de culoare pentru tot site-ul

Plan complet: paletă, hartă pe pagini și componente, CSS de aplicat, priorități.

## 0. Diagnostic pe scurt

Site-ul de acum folosește practic trei suprafețe (crem `#faf8f3`, alb, beton `#e9e5dd`), un singur accent (chihlimbar) și un roșu-ruginiu pentru linkuri. Pe fiecare pagină, culoarea apare doar în linii de 2–6 px: borduri sub meniu, pătrățele din „Cum lucrăm”, butonul „Cere o ofertă”. Fotografiile sunt în mare parte gri și albe (șantier în execuție), deci nici ele nu aduc culoare. De aici impresia de „simplist”: totul este bej pe bej, cu linii subțiri.

Ideea propusă: **codul culorilor de pe șantier**. Fiecare serviciu primește culoarea materialului lui real (placa verde de gips-carton, faianța, betonul, țeava de instalații, placa roz/roșie antifoc, cărămida, XPS-ul roz, lemnul). Codul se folosește peste tot unde apare serviciul respectiv: carusel, grilă, meniu, pagina serviciului, proiecte, blog, footer. Astfel culoarea are o logică și nu pare o paletă aleatorie. Marca (chihlimbar + grafit) rămâne stăpână pe acțiuni (ofertă, apel) și pe două suprafețe mari: panoul din hero și benzile de ofertă.

Tot planul a fost testat pe build-ul din `dist`, cu CSS injectat prin puppeteer (machetă în `scratchpad/design-test/`, nu în repo). Paginile Acasă, Servicii › Amenajări interioare și Servicii › Fațade (mobil) arată coerent cu el. Observațiile din test sunt trecute la fiecare punct.

---

## 1. Paleta extinsă

### 1.1 Regula celor trei nuanțe

Fiecare culoare nouă are **exact trei nuanțe** și fiecare nuanță are un singur rol. Asta ține paleta sub control: nu se inventează nuanțe noi pe parcurs.

| Sufix | Rol | Text pe ea |
|---|---|---|
| `-d` (închis) | text colorat, linkuri, iconuri, bara activă, etichete pline cu text alb, borduri de 4–6 px | alb (≥ 6,5:1) |
| `-m` (mediu, „mostra”) | culoarea materialului: benzi, pătrățele-mostră, borduri groase decorative, placeholder fără foto | **niciodată text mic**; doar decor |
| `-t` (tentă) | fundal de secțiune, panou, card, chip | grafit `--ink` (≥ 10:1) și `--ink-2` (≥ 5,6:1) |

### 1.2 Culorile mărcii (rămân, cu ajustări)

| Nume | Hex | Ce se schimbă |
|---|---|---|
| Grafit | `#30312e` | neschimbat; text principal, butoane închise |
| Chihlimbar (logo) | `#dc9a34` | **`--amber` trece de la `#d88a16` la culoarea exactă din logo.** Grafitul pe el urcă de la 4,72:1 la **5,43:1**, deci textul pe panouri chihlimbar trece AA cu marjă. |
| Chihlimbar închis | `#7c5108` | nou: text „chihlimbar” pe alb sau pe tentă (6,91:1 pe alb) |
| Chihlimbar tentă | `#f8e6c6` | înlocuiește `--amber-soft` (`#f6e6cc`) |
| Margine chihlimbar | `#b07419` | bordura butonului principal: 3,69:1 față de fundal (≥ 3:1 cerut pentru controale) |

### 1.3 Culori noi (materiale de pe șantier)

Hex-urile sunt alese după materialele care se văd efectiv în fotografiile firmei: plăci verzi și roz-roșii de gips-carton, faianță verde, XPS roz, profile zincate, vată galbenă, cărămidă.

| # | Nume | `-d` | `-m` | `-t` | Material / de unde vine | Rol principal |
|---|---|---|---|---|---|---|
| 1 | **Teracotă** | `#9a4326` | `#cf6d47` | `#f5dfd3` | cărămidă, zidărie | culoarea a doua a mărcii: linkuri (înlocuiește `--rust`), bara utilitară, kicker; serviciul *Amenajări exterioare* |
| 2 | **Verde gips-carton** | `#2f6646` | `#8fbf98` | `#dcebdc` | placa verde rezistentă la umiditate | *Amenajări și renovări interioare*; secțiunea „M-CRAFT, din Vicov de Sus” |
| 3 | **Turcoaz faianță** | `#1b6763` | `#62aaa3` | `#d4eae6` | faianța verde-albăstruie din băi | *Gresie, faianță și parchet*; categoria „Băi” |
| 4 | **Gri beton** | `#4f585b` | `#a1a8a8` | `#e3e6e5` | șapă, placă de beton | *Șape autonivelante*; tipul „Pagină” în căutare |
| 5 | **Albastru țeavă** | `#215e98` | `#73a3d3` | `#dbe8f5` | țevi PEX/PPR, apă rece | *Instalații sanitare*; categoria „Instalații” |
| 6 | **Roșu antifoc** | `#a2323b` | `#e2898d` | `#f9dedc` | placa roz-roșie rezistentă la foc | *Instalații electrice* |
| 7 | **Roz XPS** | `#943961` | `#e7b3c6` | `#f8dfe9` | polistiren extrudat roz | *Fațade și termoizolații*; categoria „Izolații” |
| 8 | **Lemn** | `#76501f` | `#c99c60` | `#f0e2c9` | lemn de construcție, OSB, parchet | *Mentenanță*; categoria „Pardoseli” |
| 9 | **Albastru oțel** | `#3a5367` | `#93a6b6` | `#dfe7ee` | profile metalice zincate | secțiunile „Cum lucrăm”, pagini legale, categoria „Spații comerciale”, tipul „Articol” în căutare |
| — | Verde WhatsApp închis | `#157a3c` | (`#1f9e4f` rămâne pentru icon pe alb) | `#dff2e6` | — | buton WhatsApp plin (text alb) și tentă pentru butonul WhatsApp |

În machetă, `-m` pentru XPS a fost inițial `#eb9fbf` și a ieșit țipător pe placeholderul de la Fațade. Valoarea finală, mai stinsă, este `#e7b3c6`.

### 1.4 Contraste verificate (WCAG 2.x, calculate numeric)

Text pe tente (fundaluri de secțiune / card):

| Fundal | `--ink` `#30312e` | `--ink-2` `#565751` | `-d` propriu pe tentă |
|---|---|---|---|
| chihlimbar-t `#f8e6c6` | 10,67 | 5,95 | 5,64 (`#7c5108`) |
| teracotă-t `#f5dfd3` | 10,21 | 5,69 | 5,11 |
| verde-t `#dcebdc` | 10,57 | 5,89 | 5,45 |
| faianță-t `#d4eae6` | 10,42 | 5,81 | 5,28 |
| beton-t `#e3e6e5` | 10,42 | 5,81 | 5,81 |
| țeavă-t `#dbe8f5` | 10,52 | 5,86 | 5,41 |
| antifoc-t `#f9dedc` | 10,29 | 5,74 | 5,40 |
| xps-t `#f8dfe9` | 10,42 | 5,81 | 5,54 |
| lemn-t `#f0e2c9` | 10,24 | 5,71 | 5,59 |
| oțel-t `#dfe7ee` | 10,47 | 5,84 | 6,43 |
| wa-t `#dff2e6` | 11,21 | 6,25 | 4,63 (`#157a3c`) |

Culorile `-d` folosite ca text sau ca fundal pentru text alb:

| Culoare | pe alb | pe crem `#faf8f3` | alb pe ea |
|---|---|---|---|
| teracotă `#9a4326` | 6,55 | 6,17 | 6,55 |
| verde `#2f6646` | 6,75 | 6,36 | 6,75 |
| faianță `#1b6763` | 6,63 | 6,25 | 6,63 |
| beton `#4f585b` | 7,29 | 6,87 | 7,29 |
| țeavă `#215e98` | 6,73 | 6,34 | 6,73 |
| antifoc `#a2323b` | 6,87 | 6,48 | 6,87 |
| xps `#943961` | 6,96 | 6,56 | 6,96 |
| lemn `#76501f` | 7,15 | 6,74 | 7,15 |
| oțel `#3a5367` | 8,04 | 7,57 | 8,04 |
| chihlimbar-d `#7c5108` | 6,91 | 6,51 | 6,91 |
| wa-d `#157a3c` | 5,41 | — | 5,41 |

Alte perechi:

- **Teracotă `#9a4326` ca link** pe orice fundal din paletă: minimum **5,11:1** (pe toate tentele, pe beton `#e9e5dd` 5,22, pe `#ddd7cb` 4,57). Linkurile își păstrează aceeași culoare peste tot, fără excepții pe secțiuni colorate.
- Grafit pe chihlimbar `#dc9a34`: **5,43**. Grafit pe hover-ul chihlimbar `#e6ab52`: 6,43.
- `--ink-2` pe chihlimbar plin: 2,63 la `#d88a16`, deci **interzis**: pe panouri chihlimbar tot textul este `--ink`.
- **Alb pe chihlimbar: 2,78, interzis** (regula din brief se păstrează).
- `--ink-3` `#6e6f68` pe chihlimbar-t: 4,14, deci **nu** se folosește `--ink-3` pe tente (în legenda 3D, rândurile inactive rămân pe alb, 5,08).
- `--ink-2` pe `#ddd7cb` (bara de jos a footerului): 5,09.
- Bordura butonului principal `#b07419` față de fundal: 3,69 pe crem, 3,20 pe chihlimbar-t (≥ 3:1, ok pentru limita unui control).
- Culorile `-m` nu poartă niciodată text mic și nu sunt singurul indiciu al unei stări. Ele sunt decor (benzi, mostre). Starea activă se arată mereu și prin fundal `-d` cu text alb, prin grosime sau prin `aria-pressed` vizibil.

---

## 2. Reguli de compoziție (ca să nu devină haos)

1. **Codul de serviciu este singurul motiv pentru care apare o culoare de material.** Verdele apare doar lângă „interioare”, turcoazul doar lângă „gresie/faianță” și așa mai departe. Excepții, fixe pe tot site-ul: oțel = „cum lucrăm / tehnic / legal”, teracotă = a doua culoare a mărcii, chihlimbar = ofertă și acțiune.
2. **Ritmul secțiunilor pe o pagină: maximum o tentă diferită la două secțiuni.** Între două secțiuni colorate rămâne o secțiune pe crem `--bg`. Două tente nu se pun niciodată una lângă alta, cu excepția benzii de ofertă (chihlimbar-t) urmate de footer (beton), separate de banda de mostre.
3. **Chihlimbarul plin apare pe suprafață mare doar de două ori pe site:** panoul din hero (Acasă) și caseta CTA de pe Despre noi (plus panoul de pe 404). În rest apare pe butoane, pe bara de jos de pe mobil, pe butonul de redare video și pe bordurile active.
4. **Benzile de ofertă (`#oferta`) sunt mereu chihlimbar-t `#f8e6c6`**, pe toate paginile. Utilizatorul învață că zona galbenă înseamnă „cerere de ofertă”.
5. Tot ce e nou este solid: fundaluri plate, borduri de 3–8 px, pătrățele de 10 px. Fără gradiente, umbre sau colțuri rotunjite (`--radius: 2px` rămâne). Umbrele mici existente (dropdown, banner cookie, butonul WhatsApp) se **elimină** și se înlocuiesc cu borduri.
6. Fotografiile rămân neatinse: culoarea se pune *lângă* ele (bandă sub poză, legendă colorată), niciodată peste ele.

### Semnătura vizuală: „banda de mostre”

O bandă de 8 px compusă din cele 8 culori `-m` ale serviciilor, în ordinea din meniu, ca un mostrar de culori de la depozitul de materiale. Apare **doar în două locuri**, ca să rămână o semnătură și să nu devină ornament: deasupra footerului și, pe mobil, sub header (unde bara utilitară e ascunsă). Se face din 8 `<span>`-uri cu fundal plin, nu din gradient.

---

## 3. Implementare: fundația (`app/assets/css/main.css`)

### 3.1 Tokeni noi în `:root`

Înlocuiți valorile existente pentru `--amber`, `--amber-soft`, `--rust`, `--focus` și adăugați restul:

```css
:root {
  /* marcă */
  --amber: #dc9a34;          /* era #d88a16; = logo */
  --amber-hover: #e6ab52;
  --amber-line: #b07419;     /* bordura butonului principal */
  --amber-soft: #f8e6c6;     /* = --chihlimbar-t */
  --rust: #9a4326;           /* = --teracota-d; păstrat ca alias pentru componentele existente */
  --focus: #9a4326;

  --chihlimbar-d: #7c5108; --chihlimbar-m: #dc9a34; --chihlimbar-t: #f8e6c6;
  --teracota-d: #9a4326;   --teracota-m: #cf6d47;   --teracota-t: #f5dfd3;
  --verde-d: #2f6646;      --verde-m: #8fbf98;      --verde-t: #dcebdc;
  --faianta-d: #1b6763;    --faianta-m: #62aaa3;    --faianta-t: #d4eae6;
  --beton-d: #4f585b;      --beton-m: #a1a8a8;      --beton-t: #e3e6e5;
  --teava-d: #215e98;      --teava-m: #73a3d3;      --teava-t: #dbe8f5;
  --antifoc-d: #a2323b;    --antifoc-m: #e2898d;    --antifoc-t: #f9dedc;
  --xps-d: #943961;        --xps-m: #e7b3c6;        --xps-t: #f8dfe9;
  --lemn-d: #76501f;       --lemn-m: #c99c60;       --lemn-t: #f0e2c9;
  --otel-d: #3a5367;       --otel-m: #93a6b6;       --otel-t: #dfe7ee;

  --wa: #1f9e4f;           /* rămâne pentru iconul pe alb */
  --wa-d: #157a3c;         /* fundal plin cu text alb (5,41:1) */
  --wa-t: #dff2e6;

  /* culoarea „curentă” de serviciu; implicit = marca */
  --svc-d: var(--chihlimbar-d);
  --svc-m: var(--amber);
  --svc-t: var(--chihlimbar-t);
}
```

### 3.2 Codul de serviciu (tot în `main.css`, global, nu scoped)

Oriunde un element are `data-svc="<slug>"`, el și copiii lui primesc trei variabile. Componentele folosesc doar `var(--svc-d|m|t)`.

```css
[data-svc='interioare']           { --svc-d: var(--verde-d);    --svc-m: var(--verde-m);    --svc-t: var(--verde-t); }
[data-svc='pardoseli-placari']    { --svc-d: var(--faianta-d);  --svc-m: var(--faianta-m);  --svc-t: var(--faianta-t); }
[data-svc='sape-autonivelante']   { --svc-d: var(--beton-d);    --svc-m: var(--beton-m);    --svc-t: var(--beton-t); }
[data-svc='instalatii-sanitare']  { --svc-d: var(--teava-d);    --svc-m: var(--teava-m);    --svc-t: var(--teava-t); }
[data-svc='instalatii-electrice'] { --svc-d: var(--antifoc-d);  --svc-m: var(--antifoc-m);  --svc-t: var(--antifoc-t); }
[data-svc='exterioare']           { --svc-d: var(--teracota-d); --svc-m: var(--teracota-m); --svc-t: var(--teracota-t); }
[data-svc='fatade']               { --svc-d: var(--xps-d);      --svc-m: var(--xps-m);      --svc-t: var(--xps-t); }
[data-svc='mentenanta']           { --svc-d: var(--lemn-d);     --svc-m: var(--lemn-m);     --svc-t: var(--lemn-t); }
```

Varianta mai curată pe termen lung este un câmp `color` în `Service` (`app/data/types.ts`) și în fiecare `app/data/services/*.ts`. Selectorul pe slug de mai sus funcționează însă fără nicio modificare de date.

### 3.3 Clase utilitare noi

```css
/* Secțiuni colorate full-bleed (ca .section--concrete) */
.section--verde      { background: var(--verde-t); }
.section--otel       { background: var(--otel-t); }
.section--teracota   { background: var(--teracota-t); }
.section--chihlimbar { background: var(--chihlimbar-t); }
.section--svc        { background: var(--svc-t); }

/* Panou chihlimbar plin: tot textul grafit, butonul principal devine grafit */
.on-amber { background: var(--amber); color: var(--ink); }
.on-amber :is(h1, h2, h3, p, .lead, .muted, .kicker) { color: var(--ink); }
.on-amber a:not(.btn) { color: var(--ink); text-decoration-color: var(--ink); }
.on-amber .btn--primary { background: var(--ink); border-color: var(--ink); color: #fff; }
.on-amber .btn--primary:hover { background: #44453f; color: #fff; }
.on-amber :is(.btn--outline, .btn--wa) { background: var(--paper); border-color: var(--ink); color: var(--ink); }

/* Banda de mostre */
.strip { display: grid; grid-template-columns: repeat(8, 1fr); height: 8px; }
.strip > span { background: var(--svc-m); }

/* Pătrățel-mostră înaintea unui link de serviciu (liste) */
.swatch-list { list-style: none; padding-left: 0; }
.swatch-list > li[data-svc] { display: flex; gap: 10px; align-items: baseline; }
.swatch-list > li[data-svc]::before {
  content: ''; flex: none; width: 10px; height: 10px;
  background: var(--svc-m); outline: 1px solid var(--svc-d); outline-offset: -1px;
}
```

### 3.4 Reguli globale modificate

```css
::selection { background: var(--amber); color: var(--ink); }

a { color: var(--rust); text-decoration-color: var(--amber); }   /* sublinierea devine chihlimbar */
a:hover { color: var(--ink); text-decoration-color: var(--rust); }

.kicker {                                   /* eticheta de deasupra titlurilor */
  color: var(--teracota-d);
  padding-left: 10px;
  border-left: 4px solid var(--amber);
  line-height: 1.2;
}

.btn--primary        { background: var(--amber); color: var(--ink); border-color: var(--amber-line); }
.btn--primary:hover  { background: var(--amber-hover); color: var(--ink); }
.btn--outline:hover  { background: var(--chihlimbar-t); }
.btn--wa             { background: var(--wa-t); color: var(--ink); border-color: var(--wa-d); }
.btn--wa svg         { color: var(--wa-d); }
.btn--wa:hover       { background: #c9e9d4; border-color: var(--wa-d); color: var(--ink); }   /* 10,03:1 */

.note { background: var(--chihlimbar-t); border-left: 4px solid var(--amber); }

.prose ul li::marker,
.prose ol li::marker { color: var(--svc-d); }
```

În machetă, butonul WhatsApp devine verde-pal cu bordură verde pe toate paginile (ContactActions, formular, meniul mobil). E o schimbare mică, dar repetată peste tot, deci se vede imediat.

### 3.5 Atributele `data-svc` de adăugat în template-uri

Fără aceste atribute, codul de serviciu nu are de unde să se aplice. Sunt modificări de o linie, fără logică nouă:

| Fișier | Element | Atribut |
|---|---|---|
| `app/components/ServiceCarousel.vue` | `<NuxtLink class="svc">` | `:data-svc="s.slug"` |
| `app/components/AppHeader.vue` | `<NuxtLink class="dd__item">`, `<li>` din `.mob__sub` | `:data-svc="s.slug"` |
| `app/pages/index.vue` | `<NuxtLink class="svc-card">` | `:data-svc="s.slug"` |
| `app/pages/index.vue` | `<button class="recent__item">` | `:data-svc="projectSvc(p.project)"`, cu `const projectSvc = (id) => media.projects.find(p => p.id === id)?.services[0]` |
| `app/pages/servicii/index.vue` | `<li class="row">` | `:data-svc="s.slug"` |
| `app/pages/servicii/[slug].vue` | `<div v-if="service">` (rădăcina) | `:data-svc="slug"` |
| `app/pages/servicii/[slug].vue` | `<li>` din `.side__links` (servicii asociate) | `:data-svc="r!.slug"`; `<ul>` primește și clasa `swatch-list` |
| `app/components/ProjectCards.vue` | `<NuxtLink class="pc__card">` | `:data-svc="p.services[0]"` |
| `app/pages/proiecte.vue` | `<section class="proj">` | `:data-svc="g.services[0]"` |
| `app/pages/proiecte.vue` | butoanele din `.filters` | `:data-cat="c.id"` (și `data-cat="toate"` pe „Toate”) |
| `app/pages/video.vue` | `<section class="grp">` | `:data-svc="media.projects.find(p => p.id === g.id)?.services[0]"` |
| `app/pages/despre-noi.vue` | `<li>` din `ul.svc` | `:data-svc="s.slug"`; `<ul>` primește clasa `swatch-list` |
| `app/pages/blog/index.vue` | `<li>` din `.posts` | `:data-svc="p.relatedServices[0]"` |
| `app/pages/blog/[slug].vue` | `<div class="wrap page">` | `:data-svc="post.relatedServices[0]"` |
| `app/pages/cautare.vue` | `<li>` din `.res` | `:data-type="r.doc.type"` |
| `app/components/AppFooter.vue` | `<li>` din lista „Servicii” | `:data-svc="s.slug"`; `<ul>` primește clasa `swatch-list` |
| `app/error.vue` | `<li>` din `ul.svc` | `:data-svc="s.slug"` |
| `app/components/RoomAssembly.vue` | `<li>` din legendă | `:data-layer="s.id"` |

Banda de mostre (în `AppFooter.vue`, primul copil din `<footer>`; în `AppHeader.vue`, după `.bar`, doar pe mobil):

```vue
<div class="strip" aria-hidden="true"><span v-for="s in services" :key="s.slug" :data-svc="s.slug" /></div>
```

---

## 4. Harta culorii, componentă cu componentă (cu CSS-ul exact)

Toate blocurile de mai jos merg în `<style scoped>` al fișierului indicat. Fiecare înlocuiește regula cu același selector, iar unde regula e nouă se adaugă. Valorile care nu apar aici rămân neschimbate.

### 4.1 `app/components/AppHeader.vue`: bara utilitară, header, meniu, dropdown, meniu mobil

| Element | Acum | Propus |
|---|---|---|
| Bara utilitară | beton, text gri | **teracotă plin `#9a4326`, text alb (6,55:1)**: o fâșie de cărămidă deasupra logo-ului |
| Meniu, element activ | linie chihlimbar de 2 px | fundal chihlimbar-t + linie chihlimbar de 3 px |
| Dropdown servicii | listă albă uniformă | fiecare serviciu cu bordură stânga de 4 px în culoarea lui; hover pe tenta lui; subsol chihlimbar-t |
| Meniu mobil, sublista servicii | linie chihlimbar | pătrățel-mostră în fața fiecărui serviciu; blocul de contact pe chihlimbar-t |

```css
.util { background: var(--teracota-d); color: #fff; }
.util__area svg { color: #fff; }
.util__links a { color: #fff; }
.util__links a:hover { color: #fff; text-decoration: underline; text-decoration-color: var(--amber); }

.main-nav a:hover { border-bottom-color: var(--amber); }
.main-nav a.on { background: var(--chihlimbar-t); border-bottom: 3px solid var(--amber); }

.dd { box-shadow: none; border: 1px solid var(--line); border-top: 4px solid var(--amber); }
.main-nav .dd__item { border-left: 4px solid var(--svc-m); }
.main-nav .dd__item:hover { background: var(--svc-t); border-left-color: var(--svc-d); }
.dd__item img { border-bottom: 3px solid var(--svc-d); }
.dd__foot { background: var(--chihlimbar-t); margin: 8px -10px -10px; padding: 10px 18px; border-top: 0; }

.mob__sub { border-left: 0; padding-left: 0; }
.mob__sub li[data-svc] a { display: flex; gap: 10px; align-items: center; }
.mob__sub li[data-svc] a::before { content: ''; flex: none; width: 12px; height: 12px; background: var(--svc-m); outline: 1px solid var(--svc-d); outline-offset: -1px; }
.mob__contact { background: var(--chihlimbar-t); padding: 14px; border-top: 4px solid var(--amber); }

/* banda de mostre sub header, doar pe mobil (unde .util e ascunsă) */
.strip--mob { display: none; }
@media (max-width: 860px) {
  .strip--mob { display: grid; height: 6px; }
  .mob { inset: calc(var(--header-h) + 7px) 0 0; }
}
```

### 4.2 `app/components/ServiceCarousel.vue`: caruselul de servicii

Fiecare card ia tenta serviciului, cu o bordură stânga plină în culoarea închisă. Caruselul devine primul „mostrar” pe care îl vede vizitatorul, pe fiecare pagină. Testat în machetă: rândul arată ca o paletă de mostre și se citește foarte bine.

```css
.svc { background: var(--svc-t); border: 1px solid var(--svc-t); border-left: 5px solid var(--svc-d); }
.svc:hover { border-color: var(--svc-d); }
.svc__img--none { background: var(--svc-m); }
.ctrl button:hover { background: var(--amber); border-color: var(--amber-line); }
.ctrl button[aria-pressed='true'] { background: var(--chihlimbar-t); }
```

În `<template>`, placeholderul SVG fără foto: `fill="var(--amber)"` devine `fill="var(--svc-d)"` (pe ambele `<rect>`).

### 4.3 `app/pages/index.vue`: Acasă

**Ritmul secțiunilor (de sus în jos):** crem (hero cu panou chihlimbar) → crem (grila de servicii colorată) → **verde-t** (Despre) → crem (Lucrări recente) → **oțel-t** (3D + Cum lucrăm) → crem (Video) → **teracotă-t** (Recenzii, când există) → **chihlimbar-t** (Ofertă) → banda de mostre → footer beton.

Clase în template:

- hero: `<div class="hero__text on-amber">`;
- „M-CRAFT, din Vicov de Sus”: `section--concrete` devine `section--verde`;
- 3D + proces: `section--paper` devine `section--otel`;
- recenzii: `section--concrete` devine `section--teracota`;
- ofertă: `section--concrete` devine `section--chihlimbar`.

**Hero.** Panoul de text devine chihlimbar plin (`#dc9a34`), cu text grafit (5,43:1), „Cere o ofertă” grafit cu text alb (13,09:1) și „Vezi lucrările” alb cu bordură grafit. E cea mai mare schimbare vizibilă: marca se vede din primul ecran, inclusiv pe mobil, unde panoul ocupă tot primul ecran.

```css
.hero__text { background: var(--amber); border: 0; border-left: 0; }
.hero__contact { border-top: 1px solid var(--amber-line); }
.hero__contact .wa { color: var(--ink); }   /* verde pe chihlimbar nu are contrast; iconul devine grafit */
```

**Grila de servicii.** Fiecare card e o „mostră”: corpul pe tenta serviciului, o bandă de 5 px în culoarea închisă sub fotografie, iar placeholderul fără foto (Șape, Fațade) pe culoarea materialului. Titlul și textul rămân grafit (≥ 5,6:1 pe orice tentă).

```css
.svc-card { background: var(--svc-t); border: 1px solid var(--svc-t); }
.svc-card > :first-child { border-bottom: 5px solid var(--svc-d); }
.svc-card:hover { border-color: var(--svc-d); }
.svc-card:hover h3 { text-decoration-color: var(--svc-d); }
.svc-card__ph { background: var(--svc-m); }
.svc-card__ph span { border-color: var(--svc-d); }
```

**Despre (verde-t).**

```css
.area { background: var(--paper); border-left: 4px solid var(--verde-d); }
```

**Lucrări recente: legendele.** Fiecare legendă ia tenta serviciului principal al proiectului, cu o linie de sus de 4 px în culoarea închisă. Așa, sub fotografiile gri apare culoare fără să atingem poza.

```css
.recent__cap { background: var(--svc-t); border-top: 4px solid var(--svc-d); }
```

**3D + Cum lucrăm (oțel-t).** Panoul 3D rămâne alb. Scena primește un fundal chihlimbar-t, iar straturile primesc culorile materialelor reale din paletă. Vezi 4.4.

**Video.** Vezi 4.13 (`VideoCard.vue`).

**Ofertă (chihlimbar-t).**

```css
.quote__side { border: 1px solid var(--line); border-top: 4px solid var(--wa-d); }
```

### 4.4 `app/components/RoomAssembly.vue`: animația 3D

Straturile devin „mostrele” din paletă, deci ilustrația și legenda vorbesc aceeași limbă de culoare. Legenda primește bara stângă în culoarea stratului.

```css
.ra__scene { background: var(--chihlimbar-t); }
.slab { background: #9ea6a7; box-shadow: 0 0 0 1px #8b9394; }   /* beton */
.slab::before { background: #8b9394; }
.screed { background: #c9cecd; }                                  /* șapă */
.floor-tiles span { background: #e9d6b8; border-color: #d4bc97; } /* gresie bej-lemn */
.wall--back { background: var(--teracota-m); }                    /* zidărie de cărămidă */
.wall__studs span { background: var(--otel-m); }                  /* profile zincate */
.wall__studs i { background: #7d91a2; }
.wall__boards span { background: var(--verde-m); border-color: #79ad84; } /* placă verde, zona umedă */
.wall__plaster { background: #e8e2d6; }
.wall__tiles span { background: var(--faianta-m); }               /* faianță */
.wall__paint { background: #f4ead8; }                             /* vopsea caldă */
/* .skirting rămâne var(--amber) */

.ra__legend li { border-left-width: 6px; }
.ra__legend li[data-layer='sapa']      { --lay: var(--beton-m);   --lay-t: var(--beton-t); }
.ra__legend li[data-layer='gresie']    { --lay: #d4bc97;          --lay-t: var(--lemn-t); }
.ra__legend li[data-layer='structura'] { --lay: var(--otel-m);    --lay-t: var(--otel-t); }
.ra__legend li[data-layer='placare']   { --lay: var(--verde-m);   --lay-t: var(--verde-t); }
.ra__legend li[data-layer='faianta']   { --lay: var(--faianta-m); --lay-t: var(--faianta-t); }
.ra__legend li[data-layer='finisaj']   { --lay: var(--amber);     --lay-t: var(--chihlimbar-t); }
.ra__legend li.done { border-left-color: var(--lay); }
.ra__legend li.now  { background: var(--lay-t); }
.ra__replay:hover { background: var(--amber); border-color: var(--amber-line); }
```

Atenție, verificat în machetă: **nu** adăugați `::before` pe `li`-urile legendei. Sunt `display: grid` și un pseudo-element strică coloanele. Culoarea se pune doar pe bordură. Rândurile inactive rămân `--ink-3` pe alb (5,08:1), fără tentă.

### 4.5 `app/components/ProcessSteps.vue`: „Cum lucrăm”

Apare pe Acasă (pe oțel-t), pe Servicii și pe Despre noi (tot pe oțel-t). Pătratele devin mai mari, iar etapele primesc o progresie de culoare de la discuție la predare (chihlimbar → teracotă → oțel → verde). E o secvență, deci culoarea are sens de ordine, fără numerotare.

```css
.steps { border-top: 3px solid var(--ink); }
.steps li::before { width: 18px; height: 18px; top: -10px; }
.steps li:nth-child(1)::before { background: var(--amber); }
.steps li:nth-child(2)::before { background: var(--teracota-d); }
.steps li:nth-child(3)::before { background: var(--otel-d); }
.steps li:nth-child(4)::before { background: var(--verde-d); }
.steps p { color: var(--ink-2); }   /* 5,84:1 pe oțel-t */
```

### 4.6 `app/pages/servicii/index.vue`: lista de servicii

Fiecare rând are o bordură stânga de 6 px în culoarea materialului, iar la hover rândul se umple cu tenta. Placeholderul fără foto ia culoarea materialului. Secțiunea „Cum lucrăm” de jos devine full-bleed oțel-t: scoateți-o din `.wrap page` și puneți `class="section section--otel"` cu un `.wrap` în interior.

```css
.list { border-top: 4px solid var(--amber); }
.row { border-left: 6px solid var(--svc-m); padding-left: 14px; transition: background-color 0.15s ease; }
.row:hover { background: var(--svc-t); border-left-color: var(--svc-d); }
.row__ph { background: var(--svc-m); }
.row__ph span { border-color: var(--svc-d); }
.row__body h2 a:hover { text-decoration-color: var(--svc-d); }
.row__topics li + li::before { color: var(--svc-d); }
```

### 4.7 `app/pages/servicii/[slug].vue`: pagina de serviciu

Toată pagina „poartă” culoarea materialului, prin `data-svc` pe rădăcină. Testat pe Interioare (verde) și pe Fațade (roz XPS): pagina se recunoaște din prima privire, iar textul rămâne perfect lizibil.

| Zonă | Culoare |
|---|---|
| Intro (breadcrumb, H1, butoane, foto) | fundal full-bleed `--svc-t`; sub fotografie o bandă de 6 px `--svc-d` |
| Intro fără foto (Fațade, Șape) | caseta „Ce influențează oferta”: alb, bordură stânga de 6 px `--svc-d` |
| Separatori între secțiuni de conținut | 3 px `--svc-m` (în loc de 1 px gri) |
| Bulinele listelor | `--svc-d` (din regula globală `.prose li::marker`) |
| „Materiale și variante” | fiecare variantă e o mostră: fundal `--svc-t`, linie de sus de 4 px `--svc-d`, titlu `--svc-d` |
| „Ce influențează oferta și durata” | panou chihlimbar-t, bordură stânga chihlimbar (ofertă = chihlimbar) |
| FAQ | butonul +/− pe `--svc-d` cu semn alb; întrebarea deschisă pe `--svc-t` |
| Sidebar „Cere o ofertă” | chihlimbar-t, linie de sus de 4 px chihlimbar |
| Sidebar „Servicii asociate” | pătrățel-mostră pentru fiecare serviciu (în culoarea *lui*) |
| Sidebar „De citit” | linie de sus de 4 px oțel |
| „Proiecte în care apare…” | fundal `--svc-t` (reia culoarea din intro și închide pagina) |
| Cererea de ofertă | chihlimbar-t |

Template: `section--paper` (proiecte) devine `section--svc`, iar `section--concrete` (ofertă) devine `section--chihlimbar`.

```css
.intro { background: var(--svc-t); border-bottom: 0; }
.intro__area svg { color: var(--svc-d); }
.intro__photo :deep(img) { border-bottom: 6px solid var(--svc-d); }
.intro__factors { border-left: 6px solid var(--svc-d); }

.block + .block { border-top: 3px solid var(--svc-m); }

.options { border-top: 0; gap: 8px; }
.options > div,
.options > div:nth-child(even) { background: var(--svc-t); border: 0; border-top: 4px solid var(--svc-d); padding: 12px 14px; }
.options dt { color: var(--svc-d); }   /* ≥ 5,1:1 pe tenta proprie */

.factors { background: var(--chihlimbar-t); padding: 16px 18px; border-left: 6px solid var(--amber); }
.factors li::before { background: var(--chihlimbar-d); }

.side__box:first-child { background: var(--chihlimbar-t); border-color: var(--chihlimbar-t); border-top: 4px solid var(--amber); }
.side__box[aria-label='Articole'] { border-top: 4px solid var(--otel-d); }
.side__links li[data-svc] a { display: flex; gap: 10px; align-items: baseline; }
.side__links li[data-svc] a::before { content: ''; flex: none; width: 10px; height: 10px; background: var(--svc-m); outline: 1px solid var(--svc-d); outline-offset: -1px; }
.side__links a:hover { color: var(--svc-d); }
```

`app/components/FaqList.vue` (moștenește `--svc-*` de la pagină; în afara paginilor de serviciu ia implicit chihlimbarul):

```css
summary::after { background: var(--svc-d); border-color: var(--svc-d); color: #fff; font-weight: 700; }
details[open] { background: var(--svc-t); }
details[open] summary,
details[open] p { padding-inline: 12px; }
summary:hover { color: var(--svc-d); }
```

`app/components/ProjectCards.vue` (folosit pe paginile de serviciu):

```css
.pc__card { background: var(--paper); border: 1px solid var(--paper); border-bottom: 5px solid var(--svc-m); }
.pc__card:hover { border-color: var(--svc-d); }
.pc__body p { color: var(--ink-2); }
```

`app/components/PhotoGallery.vue`: neschimbat (fotografiile sunt conținutul).

### 4.8 `app/pages/proiecte.vue`: proiecte

| Element | Propus |
|---|---|
| Filtre | fiecare categorie are culoarea ei (linie de jos de 4 px `-m`); cea apăsată se umple cu `-d` și text alb (≥ 6,6:1); „Toate” apăsat rămâne grafit |
| Antetul fiecărui proiect | linie de sus de 6 px în culoarea serviciului principal (în loc de 3 px grafit) |
| Panoul „Lucrări vizibile / Servicii / Video” | fundal `--svc-t`, bordură stânga de 5 px `--svc-d`, etichete `dt` în `--svc-d` |
| Etichete Înainte / După | „Înainte” grafit cu text alb (13,09:1); „După” chihlimbar cu text grafit (5,43:1): contrastul de culoare spune povestea |

Maparea categoriilor pe materiale: Interioare = verde gips-carton; Spații comerciale = oțel; Tavane din gips-carton = chihlimbar (vata galbenă de deasupra tavanelor din fotografii); Băi = faianță; Pardoseli = lemn; Instalații = țeavă; Izolații = XPS; Exterioare = teracotă; Construcții = beton.

Observație: 8 din 12 proiecte au serviciul principal „interioare”, deci verdele va domina pe această pagină. E corect (reflectă portofoliul real), iar filtrele colorate de sus și celelalte 4 proiecte (turcoaz, lemn, albastru) aduc varietatea.

```css
[data-cat='toate']              { --cat-d: var(--ink);          --cat-m: var(--ink); }
[data-cat='interioare']         { --cat-d: var(--verde-d);      --cat-m: var(--verde-m); }
[data-cat='comercial']          { --cat-d: var(--otel-d);       --cat-m: var(--otel-m); }
[data-cat='tavane-gips-carton'] { --cat-d: var(--chihlimbar-d); --cat-m: var(--amber); }
[data-cat='bai']                { --cat-d: var(--faianta-d);    --cat-m: var(--faianta-m); }
[data-cat='pardoseli']          { --cat-d: var(--lemn-d);       --cat-m: var(--lemn-m); }
[data-cat='instalatii']         { --cat-d: var(--teava-d);      --cat-m: var(--teava-m); }
[data-cat='izolatii']           { --cat-d: var(--xps-d);        --cat-m: var(--xps-m); }
[data-cat='exterioare']         { --cat-d: var(--teracota-d);   --cat-m: var(--teracota-m); }
[data-cat='constructii']        { --cat-d: var(--beton-d);      --cat-m: var(--beton-m); }

.filters button { border-bottom: 4px solid var(--cat-m); }
.filters button:hover { border-color: var(--cat-d); }
.filters button[aria-pressed='true'] { background: var(--cat-d); border-color: var(--cat-d); color: #fff; }
.filters button[aria-pressed='true'] span { color: #fff; }

.proj { border-top: 6px solid var(--svc-m); }
.proj__meta { background: var(--svc-t); border: 0; border-left: 5px solid var(--svc-d); }
.proj__meta dt { color: var(--svc-d); }
.proj__meta a { color: var(--ink); text-decoration-color: var(--svc-d); }

.ba__pair > div:first-child span { background: var(--ink); color: #fff; border: 0; }
.ba__pair > div:last-child span { background: var(--amber); color: var(--ink); border: 0; }
```

### 4.9 `app/pages/video.vue`: video

Fiecare grup (proiect) primește linia de sus de 6 px în culoarea serviciului principal, iar titlul grupului stă pe o bandă îngustă `--svc-t`.

```css
.grp { border-top: 6px solid var(--svc-m); padding-top: 0; }
.grp__head { background: var(--svc-t); padding: 10px 14px; margin-bottom: 14px; }
.grp__head .more-link { color: var(--svc-d); }
```

`app/components/VideoCard.vue` (Acasă și Video): butonul de redare devine chihlimbar plin (icon grafit, 5,43:1), iar durata devine etichetă grafit cu text alb.

```css
.vc__play { background: var(--amber); border: 1px solid var(--amber-line); color: var(--ink); }
.vc__poster:hover .vc__play { background: var(--paper); }
.vc__dur { background: var(--ink); color: #fff; }
figcaption { border-left: 3px solid var(--amber); padding-left: 8px; }
```

### 4.10 `app/pages/despre-noi.vue`: despre noi

Ritm: crem (intro + fișa firmei pe chihlimbar-t) → **teracotă-t** (Pentru cine / Ce lucrăm) → **oțel-t** (Cum se desfășoară o colaborare) → alb (galerie) → crem cu CTA **chihlimbar plin**.

Template: `section--concrete` devine `section--teracota`; secțiunea cu `ProcessSteps` primește `section--otel`; `<div class="wrap cta">` devine `<div class="wrap cta on-amber">`; `<ul class="svc">` devine `<ul class="svc swatch-list">`.

```css
.facts { background: var(--chihlimbar-t); border: 0; border-top: 4px solid var(--amber); }
.facts > div + div { border-top: 1px solid #ead2a8; }
.facts dt { color: var(--teracota-d); font-weight: 600; }   /* 5,64:1 pe chihlimbar-t */

.who li::marker { color: var(--teracota-d); }
.svc { columns: 2; }
.svc a { color: var(--ink); text-decoration-color: var(--svc-d); }

.org > div { background: var(--paper); padding: 14px 16px; border-top: 4px solid var(--otel-d); }
.org p { color: var(--ink-2); }

.cta { border: 0; }   /* fundalul și culorile vin din .on-amber */
```

### 4.11 `app/pages/recenzii.vue` și `app/components/ReviewList.vue`

```css
/* recenzii.vue */
.empty { background: var(--chihlimbar-t); border: 0; border-left: 6px solid var(--amber); }

/* ReviewList.vue: alternare ritmică a liniei de sus, trei culori de marcă */
.rv li { border-top: 4px solid var(--amber); }
.rv li:nth-child(3n + 2) { border-top-color: var(--teracota-d); }
.rv li:nth-child(3n) { border-top-color: var(--verde-d); }
.rv__meta strong { color: var(--teracota-d); }
```

### 4.12 Blog: `app/pages/blog/index.vue` și `app/pages/blog/[slug].vue`

Articolele sunt acum ciorne (nu apar în producție), dar layoutul trebuie pregătit. Fiecare articol ia culoarea primului serviciu asociat: bandă sub fotografie, link „Citește articolul” în culoarea respectivă și o etichetă cu numele serviciului (opțional: `<span class="post__tag">{{ getService(p.relatedServices[0])?.shortName }}</span>`).

```css
/* blog/index.vue */
.post :deep(img) { border-bottom: 5px solid var(--svc-m); }
.post:hover { border-color: var(--svc-d); }
.post__tag { align-self: start; margin-bottom: 6px; padding: 1px 8px; background: var(--svc-t); color: var(--svc-d); font-size: 0.8rem; font-weight: 600; }
.post__more { color: var(--svc-d); }
.empty { background: var(--chihlimbar-t); border: 0; border-left: 6px solid var(--amber); }

/* blog/[slug].vue */
.fig :deep(img) { border-bottom: 6px solid var(--svc-d); }
article :deep(.prose h2) { border-top: 3px solid var(--svc-m); padding-top: 12px; }
.box:first-child { background: var(--svc-t); border-color: var(--svc-t); border-top: 4px solid var(--svc-d); }
.box--cta { background: var(--amber); border-color: var(--amber-line); }   /* + clasa on-amber în template */
.box:last-child:not(.box--cta) { border-top: 4px solid var(--otel-d); }
```

### 4.13 `app/pages/contact.vue`: contact

Cele trei canale devin trei culori clare: **telefon = chihlimbar**, **WhatsApp = verde**, **email = teracotă**. Formularul stă pe chihlimbar-t (aceeași regulă: zona galbenă = ofertă). „Zona în care lucrăm” e pe verde-t, „Date firmă” are linie de oțel.

```css
.ch { background: var(--chihlimbar-t); border: 0; border-top: 4px solid var(--amber); }
.ch:hover { background: #f3d8a8; border-top-color: var(--amber-line); }   /* ink pe #f3d8a8 = 9,47:1 */
.ch--wa { background: var(--wa-t); border-top-color: var(--wa-d); }
.ch--wa:hover { background: #c9e9d4; border-top-color: var(--wa-d); }
.ch--wa svg { color: var(--wa-d); }
.ch:last-child { background: var(--teracota-t); border-top-color: var(--teracota-d); }
.ch:last-child:hover { background: #efcdbb; }
.ch:last-child svg { color: var(--teracota-d); }
.ch small { color: var(--ink-2); }   /* ≥ 5,6:1 pe toate trei */

.form-col { background: var(--chihlimbar-t); padding: 20px; border-top: 4px solid var(--amber); }

.box { border-top: 4px solid var(--otel-d); }
.box:first-child { background: var(--verde-t); border-color: var(--verde-t); border-top-color: var(--verde-d); }
.box dt { color: var(--otel-d); }
```

`app/components/MapEmbed.vue`:

```css
.map { background: var(--otel-t); border-top: 4px solid var(--otel-d); }
.map__ph svg { color: var(--teracota-d); }
```

### 4.14 `app/components/QuoteForm.vue`: formularul

Formularul stă mereu pe chihlimbar-t, iar câmpurile rămân albe. Se schimbă doar accentele.

```css
.qf__field abbr { color: var(--teracota-d); }               /* 5,11:1 pe chihlimbar-t */
.qf input, .qf select, .qf textarea { border-color: #958b7a; } /* limita câmpului: 3,36:1 față de alb (acum #b9b2a5 = 2,11, sub 3:1) */
.qf input:focus, .qf select:focus, .qf textarea:focus { outline-color: var(--teracota-d); border-color: var(--teracota-d); }
.qf__msg--ok { background: var(--wa-t); border-left-color: var(--wa-d); }
.qf__msg--ok svg { color: var(--wa-d); }
.qf__msg--err { background: var(--antifoc-t); border-left-color: var(--antifoc-d); }
```

### 4.15 `app/pages/cautare.vue`: căutare

Tipul rezultatului devine o etichetă plină, iar fiecare rezultat are o bordură stânga în aceeași culoare: **Serviciu = chihlimbar, Proiect = teracotă, Articol = oțel, Pagină = beton**.

```css
.res li { padding-left: 14px; border-left: 4px solid var(--type-m, var(--line)); }
.res li[data-type='Serviciu'] { --type-d: var(--chihlimbar-d); --type-m: var(--amber);      --type-t: var(--chihlimbar-t); }
.res li[data-type='Proiect']  { --type-d: var(--teracota-d);   --type-m: var(--teracota-m); --type-t: var(--teracota-t); }
.res li[data-type='Articol']  { --type-d: var(--otel-d);       --type-m: var(--otel-m);     --type-t: var(--otel-t); }
.res li[data-type='Pagină']   { --type-d: var(--beton-d);      --type-m: var(--beton-m);    --type-t: var(--beton-t); }
.res__type { padding: 1px 8px; background: var(--type-t); color: var(--type-d); }   /* ≥ 5,1:1 */
.res h2 a { text-decoration-color: var(--type-d); }
.sf { padding: 14px; background: var(--chihlimbar-t); border-top: 4px solid var(--amber); }
.sf input { border-color: #958b7a; }   /* limita câmpului 3,36:1 față de alb */
```

### 4.16 Pagini legale: `app/components/LegalPage.vue` și `app/components/ContentBlocks.vue`

Paginile legale rămân sobre, dar primesc culoarea „tehnică” (oțel), fără să concureze cu paginile comerciale.

```css
/* LegalPage.vue */
.upd { display: inline-block; padding: 2px 10px; background: var(--otel-t); color: var(--otel-d); }
.page :deep(.prose h2) { border-top: 3px solid var(--otel-m); padding-top: 12px; }
.page :deep(.prose li::marker) { color: var(--otel-d); }
```

`.note` vine din regula globală (chihlimbar-t).

### 4.17 `app/components/Breadcrumbs.vue`

```css
.crumbs li + li::before { color: var(--amber); font-weight: 700; }
.crumbs a { text-decoration-color: var(--amber); }
.crumbs [aria-current] { color: var(--ink); font-weight: 600; }
```

### 4.18 `app/components/AppFooter.vue`: footer luminos, cu personalitate

Rămâne luminos (beton `#e9e5dd`), dar primește: **banda de mostre** de 8 px sus (în locul liniei chihlimbar de 3 px), titluri de coloană subliniate cu chihlimbar, lista de servicii cu pătrățele-mostră (un mic index de culori al site-ului), iconuri de contact colorate pe canal și o bară de jos pe beton închis `#ddd7cb`, întinsă pe toată lățimea.

```css
.ftr { border-top: 0; }
.ftr__h { display: inline-block; padding-bottom: 2px; border-bottom: 3px solid var(--amber); }
.ftr__list.swatch-list > li + li { margin-top: 6px; }
.ftr__contact li:nth-child(1) svg { color: var(--chihlimbar-d); }
.ftr__contact .wa { color: var(--wa-d); }
.ftr__contact li:nth-child(3) svg { color: var(--teracota-d); }
.ftr__legal dt { color: var(--teracota-d); }   /* 5,22:1 pe beton */
.ftr__bottom {
  max-width: none;
  background: var(--concrete-2);
  border-top: 0;
  padding-inline: max(var(--gutter), calc((100% - var(--wrap)) / 2 + var(--gutter)));
}
```

(`ftr__bottom` are acum `.wrap`. Varianta mai curată este un `<div class="ftr__base">` full-bleed cu `.wrap` în interior; efectul e același.)

### 4.19 `app/components/CookieConsent.vue`

```css
.cc { background: var(--chihlimbar-t); border-top: 4px solid var(--amber); box-shadow: none; }
.cc__text a { color: var(--teracota-d); }
.ccd { border-top: 4px solid var(--amber); }
.ccd::backdrop { background: rgb(248 230 198 / 0.9); }   /* chihlimbar-t, rămâne luminos */
.opt__fixed { padding: 1px 8px; background: var(--verde-t); color: var(--verde-d); }
```

Butoanele „Accept” și „Refuz” rămân identice (grafit); egalitatea vizuală e cerință legală.

### 4.20 `app/components/FloatingContact.vue`: Sună / WhatsApp

Butonul WhatsApp devine **verde plin `#157a3c` cu text și icon alb (5,41:1)**, recunoscut imediat. Pe mobil, bara de jos stă pe chihlimbar-t, cu linie chihlimbar sus, iar „Sună” rămâne chihlimbar. Umbra dispare.

```css
.fc__wa { background: var(--wa-d); border: 1px solid var(--wa-d); border-bottom: 1px solid var(--wa-d); color: #fff; box-shadow: none; }
.fc__wa svg { color: #fff; }
.fc__wa:hover { background: #12692f; color: #fff; border-color: #12692f; }   /* alb pe #12692f = 6,80:1 */

@media (max-width: 860px) {
  .fc { background: var(--chihlimbar-t); border-top: 3px solid var(--amber); }
  .fc__call { border-color: var(--amber-line); }
}
```

### 4.21 `app/components/Lightbox.vue`

Rămâne luminos (crem). Se adaugă doar accente.

```css
.lb__close { background: var(--amber); border-color: var(--amber-line); }
.lb__nav:hover { background: var(--amber); border-color: var(--amber-line); }
.lb__stage { background: var(--chihlimbar-t); border-color: var(--amber); color: var(--chihlimbar-d); }
.lb__count { color: var(--teracota-d); font-weight: 600; }
```

### 4.22 `app/error.vue`: pagina 404

Titlul și scurtătura stau pe un panou chihlimbar plin (`<div class="err on-amber">` în jurul `h1`, `.lead` și `.links`), iar serviciile apar ca mostre colorate: un mic catalog care invită la navigare.

```css
.err { padding: 24px; border-left: 0; }
.svc { list-style: none; padding: 0; margin-top: 24px; display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 8px; columns: auto; }
.svc li { margin: 0; }
.svc a { display: block; padding: 10px 12px; background: var(--svc-t); border-left: 5px solid var(--svc-d); color: var(--ink); text-decoration: none; font-weight: 600; }
.svc a:hover { border-left-width: 9px; }
```

### 4.23 Butoane și linkuri: rezumat

| Element | Fundal | Text | Bordură | Contrast |
|---|---|---|---|---|
| `.btn--primary` | `#dc9a34` | `#30312e` | `#b07419` | 5,43 |
| `.btn--primary` pe `.on-amber` | `#30312e` | `#fff` | `#30312e` | 13,09 |
| `.btn--outline` | alb (hover chihlimbar-t) | grafit | grafit | 13,09 / 10,67 |
| `.btn--wa` | `#dff2e6` | grafit, icon `#157a3c` | `#157a3c` | 11,21 |
| `.btn--dark` | grafit | alb | — | 13,09 |
| WhatsApp plutitor | `#157a3c` | alb | — | 5,41 |
| Link | — | `#9a4326`, subliniere `#dc9a34` | — | ≥ 5,11 pe orice fundal din paletă |

---

## 5. Priorități (ordinea de implementare după impact vizual)

| # | Schimbare | Fișiere | Efort | Impact |
|---|---|---|---|---|
| 1 | **Tokenii + codul de serviciu** (`:root`, `[data-svc]`, `.on-amber`, `.section--*`, butoane, linkuri). Fără ei nu merge nimic altceva. Singuri schimbă deja chihlimbarul, linkurile și butonul WhatsApp peste tot. | `main.css` | mic | mediu, global |
| 2 | **Caruselul de servicii colorat**: apare pe *toate* paginile, imediat sub header, deci fiecare pagină devine colorată din primul ecran | `ServiceCarousel.vue` | foarte mic | foarte mare |
| 3 | **Panoul chihlimbar din hero + grila de servicii pe tente** (Acasă) | `index.vue` | mic | foarte mare |
| 4 | **Pagina de serviciu în culoarea materialului** (intro pe tentă, mostre la „Materiale și variante”, FAQ, proiecte, ofertă) | `servicii/[slug].vue`, `FaqList.vue`, `ProjectCards.vue` | mediu | foarte mare: 8 pagini, fiecare cu identitate proprie |
| 5 | **Ritmul secțiunilor** pe Acasă și Despre noi (verde-t, oțel-t, teracotă-t, chihlimbar-t) + oferta mereu pe chihlimbar-t | `index.vue`, `despre-noi.vue`, `servicii/index.vue` | foarte mic (schimbări de clasă) | mare |
| 6 | Bara utilitară teracotă + meniul activ + dropdown colorat | `AppHeader.vue` | mic | mare pe desktop |
| 7 | Footer cu banda de mostre și lista-index de culori; bara mobilă cu WhatsApp verde plin | `AppFooter.vue`, `FloatingContact.vue` | mic | mediu–mare (mobil) |
| 8 | Proiecte: filtre colorate, antete și panouri pe culoarea serviciului, Înainte/După | `proiecte.vue` | mic | mare pe cea mai lungă pagină |
| 9 | Animația 3D în culorile materialelor + legenda colorată; „Cum lucrăm” cu progresie de culoare | `RoomAssembly.vue`, `ProcessSteps.vue` | mic | mediu |
| 10 | Contact (trei canale în trei culori), căutare (tipuri), video, blog, recenzii, legal, 404, cookie, lightbox, breadcrumb | restul | mic fiecare | finisaj |

Primii 5 pași aduc cam 80% din diferența percepută și se fac într-o singură zi de lucru.

---

## 6. Verificare după implementare

1. **Contrast:** toate perechile text/fundal din document sunt calculate numeric (formula WCAG a luminanței relative). Dacă se schimbă o valoare hex, recalculați. Regulă scurtă: pe orice `-t` se pune doar `--ink`, `--ink-2` sau `-d` *propriu*; pe `-m` nu se pune text; pe chihlimbar plin se pune doar `--ink`.
2. **Ce nu se face:** text alb pe chihlimbar (2,78); `--ink-2` pe chihlimbar plin (2,63); `--ink-3` pe tente (4,14 pe chihlimbar-t); `-m` ca unic indicator al unei stări.
3. **Ritm:** pe fiecare pagină, două secțiuni colorate nu stau una lângă alta (excepție: oferta chihlimbar-t → banda de mostre → footer).
4. **Capturi de verificat:** `/`, `/servicii/`, `/servicii/interioare/`, `/servicii/fatade/` (fără foto, deci placeholder roz XPS mai stins), `/proiecte/` cu un filtru apăsat, `/contact/`, `/cautare/?q=gresie`, 404, la 1366 și 390 px, cu banner cookie deschis și închis.
5. **Mobil:** banda de mostre de sub header adaugă 6 px la înălțimea headerului sticky. Verificați `scroll-padding-top` din `main.css` (`calc(var(--header-h) + 12px)` acoperă diferența) și poziția meniului mobil (`.mob { inset: calc(var(--header-h) + 7px) 0 0 }`).

## 7. Ce a confirmat macheta

Testul s-a făcut cu CSS injectat peste `dist` (`scratchpad/design-test/color.css` și `attrs.js`), la 1366 și 390 px:

- Acasă: hero-ul chihlimbar cu fotografiile alături arată ca un panou de șantier al firmei. Grila de servicii pe tente pastelate are aceeași luminozitate pentru toate culorile, deci arată ca un evantai de mostre, nu ca un curcubeu.
- Interioare (verde) și Fațade (roz XPS): pagina se recunoaște imediat. „Materiale și variante” ca mostre colorate rupe zidul de text care era cea mai „simplistă” zonă a site-ului.
- Pe mobil, bara Sună (chihlimbar) / WhatsApp (verde plin) pe chihlimbar-t e mult mai vizibilă decât varianta actuală alb pe alb.
- Corecturi făcute după test: XPS `-m` stins la `#e7b3c6`; fără `::before` în legenda 3D (strica grila); bordura câmpurilor de formular întărită la `#958b7a` (cea actuală nu atinge 3:1).
