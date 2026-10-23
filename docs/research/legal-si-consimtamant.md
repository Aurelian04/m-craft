# Legal și consimțământ: research pentru site-ul M-CRAFT

Documentare făcută la 2026-10-23, pentru textele din `app/data/legal/` (`termeni.ts`, `confidentialitate.ts`, `cookie.ts`). Nu este o verificare juridică finală: textele și concluziile de mai jos trebuie revizuite de un jurist înainte de publicare.

Ce s-a schimbat față de politica veche (`docs/politica-veche.html`, datată 20.10.2026):
- găzduirea este pe Vercel, nu pe Cloudflare;
- fonturile sunt găzduite local, deci Google Fonts a fost scos dintre destinatari;
- au fost adăugate Google Maps (doar la click), linkurile tel: și WhatsApp, căutarea locală și formularul cu localitate și serviciu;
- pictograma SOL nu se mai folosește: platforma SOL a fost închisă (vezi mai jos);
- perioada de 2 ani pentru cereri a fost înlocuită cu o propunere de 12 luni, marcată „De validat”;
- denumirea firmei a fost preluată din brief (M CRAFT CONSTRUCTII SRL), nu din politica veche (M-CRAFT CONSTRUCȚII S.R.L.).

---

## ANPC / SAL

### Cadrul actual

| Act | Ce prevede | Sursă |
|---|---|---|
| Ordinul ANPC nr. 449/2022 | Art. 1: placheta SAL în spațiile fizice de vânzare/prestare. Art. 2 alin. (1): comercianții care administrează **site-uri de vânzări, preluare comenzi online și/sau publicitate pentru produse, servicii** [...] afișează pictograma din anexa nr. 2 **pe prima pagină a site-ului**. Art. 3: excepție pentru sectoarele cu entități SAL specifice. | https://legislatie.just.ro/Public/DetaliiDocument/264844 |
| Ordinul ANPC nr. 270 din 7 aprilie 2026 (MO nr. 420 din 19 mai 2026) | Modifică Ordinul 449/2022 după închiderea SOL. Art. 2 alin. (2) nou: pictograma are **250 (L) x 50 (H) pixeli** și link extern către platforma SAL **reclamatiisal.anpc.ro**. Art. 2 alin. (3): placheta și pictograma se descarcă gratuit de pe site-ul ANPC. Anexele 1 și 2 sunt înlocuite. | https://legislatie.just.ro/Public/DetaliiDocumentAfis/310590 |
| Regulamentul (UE) 2024/3228 | Abrogă Regulamentul (UE) 524/2013. Platforma europeană SOL/ODR a fost închisă definitiv la 20 iulie 2025 (reclamații noi acceptate până la 20 martie 2025). | https://eur-lex.europa.eu/eli/reg/2024/3228/oj |

Surse secundare consultate, folosite doar pentru context: https://cms.law/en/svk/legal-updates/the-odr-platform-is-closing-what-businesses-need-to-know și https://github.com/dhongu/l10n-romania/pull/653 (implementare open-source, care citează Ordinul 270/2026 și confirmă că vechiul link `anpc.ro/ce-este-sal/` dă 404 pe noul site ANPC).

Paginile vechi de comunicat ANPC (`anpc.ro/ordin-privind-modificarea-ordinului-...-449-2022...`, `anpc.ro/comunicat-sal/`, `anpc.ro/anpc-dezvolta-sistemul-sal-...`) răspundeau cu 404 la 2026-10-23, după relansarea site-ului ANPC. Textul ordinului a fost verificat pe Portalul Legislativ.

### Se aplică unui site de servicii fără vânzare online?

Da, cu o probabilitate ridicată. Art. 2 alin. (1) acoperă explicit site-urile de **publicitate pentru servicii**, nu doar comerțul electronic. Un site de prezentare cu cerere de ofertă intră aici. Construcțiile și amenajările nu au o entitate SAL sectorială (sectoarele cu entități specifice sunt cele financiar-bancare, energie, comunicații etc.), deci excepția din art. 3 nu pare aplicabilă.

**SOL:** după 20 iulie 2025 nu mai există obligația de a afișa pictograma sau linkul SOL. Ordinul 270/2026 elimină referințele la SOL. Linkul vechi `ec.europa.eu/consumers/odr` duce acum la o pagină de relocare: **nu-l mai afișați**.

### Grafica oficială (verificată la 2026-10-23)

Pagina ANPC de unde se descarcă: https://www.anpc.ro/sal

| Fișier | URL | Ce conține (verificat) |
|---|---|---|
| Pictograma SAL online (PNG) | https://www.anpc.ro/download/sal/SAL-PICTOGRAMA.png | PNG de **201 x 50 px**, 4,5 KB |
| Pictograma SAL (TIF, rezoluție mare) | https://www.anpc.ro/download/sal/pictogramaSAL.tif | TIF de 680 x 169 px, 1,4 MB |
| Placheta fizică (PDF, pentru sediu sau punct de lucru) | http://www.anpc.ro/uploads/page-attachments/Anexa-1-placheta-corectata-3.pdf | model de minimum 16 x 16 cm |

Notă: serverul ANPC răspunde cu 403 la cereri fără user-agent de browser. Descărcați fișierele din browser și puneți-le în proiect (de exemplu `public/anpc/sal.png`). Nu faceți hotlink către anpc.ro.

Proporția graficii oficiale este de aproximativ 4:1, iar ordinul cere o casetă de 250 x 50 px (5:1). Imaginea nu se poate întinde la 250 x 50 fără deformare.

### Recomandare concretă de implementare

1. **Unde:** în footer, deci pe toate paginile, inclusiv pe prima pagină, așa cum cere art. 2 alin. (1). Pictograma trebuie să fie vizibilă fără interacțiune: nu o ascundeți într-un meniu pliat și nu o încărcați „lazy” sub un buton.
2. **Imagine:** fișierul oficial `SAL-PICTOGRAMA.png`, salvat local. Pentru ecrane retina, puteți exporta din TIF-ul oficial o variantă de 402 x 100 px. Nu modificați culorile sau textul graficii.
3. **Dimensiune:** casetă de **250 x 50 px**, cu imaginea centrată și nedeformată. Pe mobil, păstrați 250 x 50 (încape în orice lățime de minimum 282 px, cu 16 px de margine pe fiecare parte).
   ```html
   <a href="https://reclamatiisal.anpc.ro/" target="_blank" rel="noopener noreferrer"
      aria-label="ANPC – Soluționarea alternativă a litigiilor (se deschide într-o filă nouă)">
     <img src="/anpc/sal.png" srcset="/anpc/sal.png 1x, /anpc/sal@2x.png 2x"
          width="250" height="50" style="width:250px;height:50px;object-fit:contain"
          alt="Soluționarea alternativă a litigiilor – ANPC" loading="eager" decoding="async">
   </a>
   ```
4. **Link de destinație:** `https://reclamatiisal.anpc.ro/`, link extern, deschis în filă nouă.
5. **Fără SOL:** nicio pictogramă SOL și niciun link `ec.europa.eu/consumers/odr`.
6. **Text:** în Termeni și condiții există deja secțiunea despre reclamații și SAL, cu linkul către platformă și mențiunea despre închiderea SOL.
7. **Placheta fizică:** se aplică doar dacă firma are un spațiu deschis publicului (art. 1). Nu ține de website.
8. **Conformitate vizuală:** imaginea nu are nevoie de banner de cookie-uri, pentru că este găzduită local și nu contactează ANPC până la click.

---

## Google Consent Mode v2 (mod de bază)

Surse oficiale:
- implementare: https://developers.google.com/tag-platform/security/guides/consent
- concepte (de bază și avansat, parametri): https://developers.google.com/tag-platform/security/concepts/consent-mode
- depanare: https://developers.google.com/tag-platform/security/guides/consent-debugging
- conversii Google Ads (snippet de eveniment): https://support.google.com/google-ads/answer/6331314
- conversii la click: https://support.google.com/google-ads/answer/6331304
- politica Google Ads privind PII: https://support.google.com/adspolicy/answer/6020956
- cookie-urile Google Ads: https://business.safety.google/adscookies/
- cookie-urile GA4: https://support.google.com/analytics/answer/11397207

### Cei 4 parametri obligatorii (v2)

| Parametru | Ce controlează | Efect când este `denied` |
|---|---|---|
| `ad_storage` | stocarea pentru publicitate (cookie-uri) | nu se scriu și nu se citesc cookie-uri de publicitate; IP trunchiat |
| `ad_user_data` | trimiterea datelor utilizatorului către Google pentru publicitate | fără `user_id` și fără enhanced conversions |
| `ad_personalization` | publicitatea personalizată (remarketing) | remarketingul nu primește date |
| `analytics_storage` | stocarea pentru analiză (cookie-uri GA) | GA nu citește și nu scrie cookie-uri first-party |

### Mod de bază și mod avansat

- **Mod de bază (cerut aici):** tagurile Google sunt blocate până la interacțiunea cu bannerul. Dacă utilizatorul nu acceptă, **nu se transmite nimic către Google, nici starea consimțământului**. Modelarea conversiilor folosește un model general, mai puțin detaliat.
- **Mod avansat:** tagul se încarcă de la început, cu valorile implicite `denied`, și trimite pinguri fără cookie-uri (starea consimțământului și măsurători fără cookie-uri). Modelarea folosește un model specific contului de publicitate.
- Documentația de depanare notează că blocarea tagului până la consimțământ reduce precizia conversiilor modelate. Este compromisul acceptat prin alegerea modului de bază.

### Ordinea corectă

Regula documentației: `consent default` se apelează **înainte** de orice `config` sau `event`. Ordinea este: snippetul `default`, apoi tagul Google (`gtag/js` și `config`), apoi `update` la acțiunea utilizatorului. Consimțământul nu este salvat automat de Google: site-ul trebuie să-l păstreze (aici, în `localStorage`, cheia `cookie-consent`) și să trimită din nou `update` la fiecare încărcare de pagină.

În modul de bază, scriptul `gtag/js` se injectează doar după Accept:

```js
// 1. La încărcarea fiecărei pagini (inline în <head>, fără niciun request extern):
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});

// 2. La Accept (sau la încărcare, dacă localStorage['cookie-consent'] arată acord dat):
function grantAndLoad() {
  gtag('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',   // vezi nota despre remarketing din lista de validat
    analytics_storage: 'granted'     // doar dacă se folosește GA4
  });
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX';
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
  // gtag('config', 'G-XXXXXXXXXX'); // opțional, GA4
}

// 3. La Refuz sau la retragerea acordului din „Setări cookie-uri”:
gtag('consent', 'update', {
  ad_storage: 'denied', ad_user_data: 'denied',
  ad_personalization: 'denied', analytics_storage: 'denied'
});
// + nu mai injecta scriptul la paginile următoare; opțional șterge cookie-urile _gcl_* / _ga*
```

Observații:
- `wait_for_update` contează mai ales în modul avansat sau cu un CMP asincron. Aici e inofensiv și respectă cerința din brief.
- `ads_data_redaction` are efect doar când `ad_storage` este `denied` și tagul este încărcat. În modul de bază nu este necesar.
- Nu folosiți `url_passthrough`: în modul de bază nu are efect înainte de consimțământ și ar adăuga parametri în URL după acord.
- Fără `region`: valorile `denied` se aplică tuturor vizitatorilor.
- Verificare: cu Tag Assistant, înainte de Accept trebuie să apară „Could not connect” (tagul e blocat). După Accept, în secțiunea Consent trebuie să apară `default` cu `denied` și `update` cu `granted`. În DevTools, fila Network nu trebuie să conțină `googletagmanager.com`, `google.com` sau `doubleclick.net` înainte de Accept.

### Conversiile Google Ads (`send_to`)

Sintaxa oficială: `send_to` este `ID-ul contului/eticheta conversiei`.

```js
// Cerere trimisă cu succes – doar după răspunsul Web3Forms { success: true }
gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/ETICHETA_FORMULAR' });

// Click pe telefon / WhatsApp
gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/ETICHETA_TELEFON' });
gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/ETICHETA_WHATSAPP' });
```

- `value` și `currency` (de exemplu `currency: 'RON'`) sunt opționale. Fără prețuri pe site, pot lipsi.
- Pentru linkuri care navighează în aceeași filă (`tel:`), documentația folosește `event_callback` cu navigare după trimitere (`gtag_report_conversion(url)`). Practic: pentru `tel:` lăsați navigarea normală și trimiteți evenimentul la `click`, sau folosiți `event_callback` cu un timeout de rezervă (circa 1 s) ca să nu blocați apelul. Pentru `wa.me` deschis în filă nouă, evenimentul la `click` este suficient.
- Trimiteți evenimentele **doar dacă există acord** (`gtag` e oricum ignorat fără script, dar nu puneți în coadă evenimente care ar pleca după un Accept ulterior; verificați starea înainte de `gtag('event', ...)`).
- GA4 (opțional): `gtag('event', 'generate_lead')` pentru formular și evenimente proprii pentru click-uri (de exemplu `click_phone`, `click_whatsapp`), fără parametri cu date personale.

**Ce NU trebuie trimis** (politica Google Ads interzice transmiterea PII prin taguri de conversie și remarketing, inclusiv accidental prin URL):
- numele, emailul, telefonul, localitatea, serviciul ales sau mesajul din formular, nici ca parametri ai evenimentului, nici în URL (de exemplu `?email=...` pe pagina de mulțumire);
- `user_id`, enhanced conversions sau `user_data` (ar cere `ad_user_data` și acord explicit pentru date de contact; nu sunt descrise în politică);
- numărul de telefon al vizitatorului (nu e cunoscut oricum) sau textul precompletat WhatsApp, dacă ar conține date personale;
- termenii din căutarea internă.

### Cookie-uri Google (din documentația Google, pentru politica de cookie-uri)

| Cookie | Produs | Durată |
|---|---|---|
| `_gcl_au` | Google Ads (și alte produse de publicitate) | 90 de zile |
| `_gcl_aw`, `_gcl_gs`, `_gcl_gb` | Google Ads | 90 de zile |
| `IDE` (doubleclick.net) | publicitate | 13 luni în SEE și Regatul Unit |
| `test_cookie` (doubleclick.net) | funcționalitate | 15 minute |
| `NID` (google.com) | Google Ads, securitate, preferințe (și Google Maps) | 6 luni |
| `_ga`, `_ga_<container-id>` | GA4 | 2 ani |

---

## Web3Forms

Surse:
- API: https://docs.web3forms.com/getting-started/api-reference
- documentație completă: https://docs.web3forms.com/llms-full.txt
- honeypot: https://docs.web3forms.com/getting-started/customizations/spam-protection/spam-protection.md
- FAQ: https://docs.web3forms.com/getting-started/faq
- politica de confidențialitate (actualizată la 13 iulie 2026): https://web3forms.com/privacy
- DPA (v1.0, 13 iulie 2026): https://web3forms.com/dpa
- prețuri și limite: https://web3forms.com/pricing

Notă: `web3forms.com` răspunde cu 403 la unele unelte automate. Paginile de confidențialitate, DPA și prețuri au fost citite cu un user-agent de browser.

### Comportamentul API
- `POST https://api.web3forms.com/submit`, cu JSON (`Content-Type: application/json`, `Accept: application/json`) sau form-data. Corpul trebuie să conțină câmpul `access_key`.
- Câmpuri utile: `email` (devine automat reply-to), `subject`, `from_name`, `replyto`. Celelalte câmpuri sunt trimise în email așa cum sunt (`nume`, `telefon`, `localitate`, `serviciu`, `mesaj`).
- Răspunsuri: `200` cu `success: true`; `400` cu `success: false` și `message`; `429` la prea multe cereri (IP blocat temporar, deblocare automată după o oră); `500` cu `statusCode`/`error`. Conversia Google Ads se declanșează **doar** la `success: true`.
- `redirect` se folosește doar fără JavaScript. Pe planul gratuit, redirecționarea trebuie să rămână pe același domeniu.
- Utilizarea din server (SSR/API route) cere plan plătit și IP pe lista albă. Trimiterea se face deci din browser.

### Honeypot `botcheck`
- Marcaj oficial: `<input type="checkbox" name="botcheck" class="hidden" style="display: none;">`. Câmpul trebuie să fie de tip checkbox și să se numească `botcheck`. Dacă e bifat, trimiterea e tratată ca spam.
- Documentația marchează honeypot-ul ca „depreciated” și „less effective” și recomandă un captcha (hCaptcha e disponibil și pe planul gratuit). Un captcha ar adăuga însă un serviciu terț, care ar trebui trecut în politici și, eventual, în banner. Recomandare: păstrați honeypot-ul. În plus, puteți adăuga o verificare locală (de exemplu, timpul minim de completare) și abia la nevoie un captcha.
- Pentru accesibilitate, honeypot-ul trebuie să aibă `tabindex="-1"` și `autocomplete="off"`, ca să nu-l atingă tastatura sau completarea automată, și să fie ascuns cu `display:none` (cititoarele de ecran îl ignoră).

### Limite (planul gratuit)
- 250 de trimiteri pe lună, formulare și domenii nelimitate, 1 destinatar pe formular, 2 adrese de email asociate.
- Istoricul din panou: 30 de zile (vizibilitate).
- „Restrict to Domains”, webhooks, autoresponder și atașamente: doar pe planurile plătite.

### Unde se stochează datele
- **Operator al serviciului:** Web3Creative (Kerala, India). Acționează ca **persoană împuternicită**, iar M-CRAFT este operatorul.
- **Stocare:** documentația actuală (politica de confidențialitate și DPA din 13 iulie 2026) arată că trimiterile **sunt stocate**: baza de date AWS, criptată, cu un TTL de până la **3 ani**. Perioada se poate seta pe formular între **7 zile și 3 ani**. FAQ-ul mai vechi spune că trimiterile nu sunt stocate și că serverele sunt în US-East. Pentru politică, contează documentele mai noi (privacy și DPA).
- **Subcontractanți (DPA, anexa 3):** Amazon Web Services (hosting, SES, SQS, DynamoDB, S3; „regiuni configurate”), Cloudflare (CDN, WAF, global), Hetzner (UE: Germania/Finlanda), CleanTalk și Akismet/Automattic (anti-spam, primesc IP-ul și emailul expeditorului; SUA/global), plus SparrowDesk și Microsoft Clarity (pentru suport și panoul clientului).
- **Transferuri:** DPA-ul încorporează SCC-urile 2021/914 (și addendumul UK) pentru transferurile din SEE. DPA-ul se acceptă electronic, prin folosirea serviciului.
- **Loguri:** șterse periodic (FAQ: la 2 luni).

### Cheia de acces în frontend
Este acceptabil. Documentația spune explicit că `access_key` este publică, nu este o cheie secretă și funcționează ca un alias pentru adresa de email. Riscul este spamul trimis pe emailul firmei. Atenuări: honeypot, filtrele anti-spam ale furnizorului și, pe planul Pro, „Restrict to Domains”. Puneți cheia într-o variabilă publică de mediu (de exemplu `NUXT_PUBLIC_WEB3FORMS_KEY`), nu direct în cod.

---

## Alte verificări folosite în texte

- **ANSPDCP** (https://www.dataprotection.ro/?page=contact&lang=ro, https://www.dataprotection.ro/?page=Plangeri_pagina_principala&lang=ro): B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, cod poștal 010336, București; tel. +40.318.059.211 / +40.318.059.212; anspdcp@dataprotection.ro. Plângerea se adresează direct ANSPDCP, cu date complete de identificare și dovezi. Condițiile sunt în Decizia ANSPDCP nr. 133/2018. Operatorul are 1 lună să răspundă, cu o prelungire posibilă de 2 luni.
- **Vercel** (https://vercel.com/legal/privacy-policy, actualizată la 1 iunie 2026; https://vercel.com/legal/dpa, în vigoare din 31 martie 2026): Vercel Inc. este persoană împuternicită pentru datele clienților și colectează loguri cu IP-ul vizitatorilor. Este certificată EU-U.S. DPF, iar DPA-ul include SCC (modulele 1–3). Sediul principal de prelucrare este în SUA. DPA-ul se aplică planurilor Pro și Enterprise.
- **Vercel – plan:** https://vercel.com/docs/limits/fair-use-guidelines – planul Hobby este „restricted to non-commercial personal use only”. Un site care face publicitate serviciilor unei firme are uz comercial, deci are nevoie de **Pro**.
- **Vercel – loguri:** https://vercel.com/docs/logs/runtime – loguri runtime păstrate 1 oră (Hobby), 1 zi (Pro) și 30 de zile (Pro cu Observability Plus).
- **Google – transferuri:** https://policies.google.com/privacy/frameworks (DPF și SCC). https://business.safety.google/controllerterms/ (v11, 7 mai 2026): pentru SEE, operatorul este Google Ireland Limited; DPF și SCC pentru operator. Google Ads (măsurarea conversiilor) intră, în general, sub condițiile operator-operator. GA4 intră sub condițiile de prelucrare (Data Processing Terms). Încadrarea se verifică la https://business.safety.google/services/.
- **Legea nr. 506/2004, art. 4:** stocarea sau accesarea informațiilor în echipamentul utilizatorului se face doar cu acordul lui, după informare clară. Fac excepție stocarea tehnică strict necesară pentru transmitere sau pentru un serviciu cerut expres. Cheia `cookie-consent` intră la excepție. Google Ads, GA4 și Maps cer acord.

---

## De validat de firmă înainte de publicare

1. **Revizuire juridică.** Textele sunt un draft bine documentat, nu o verificare juridică finală. Trebuie revizuite de un jurist sau de un consultant GDPR.
2. **Denumirea exactă a firmei,** conform certificatului ONRC: „M CRAFT CONSTRUCTII SRL” (din brief) sau „M-CRAFT CONSTRUCȚII S.R.L.” (din politica veche).
3. **Domeniul final.** Textele folosesc „acest website”. După confirmarea domeniului, completați-l dacă doriți și verificați că domeniul cookie-urilor `_gcl_*` este cel corect.
4. **GA4: da sau nu.** Dacă da, adăugați cookie-urile `_ga` și `_ga_<ID>` în politica de cookie-uri și Google ca persoană împuternicită (GA4) în politica de confidențialitate. Notele există deja în fișiere. Dacă nu, ștergeți notele și nu acordați `analytics_storage`.
5. **ID-urile Google:** `AW-XXXXXXXXX`, etichetele celor 3 conversii și, opțional, `G-XXXXXXXXXX`.
6. **Remarketing.** Dacă nu se folosește, lăsați `ad_personalization: 'denied'` și după Accept. Dacă se folosește, spuneți acest lucru explicit în banner și în politica de cookie-uri.
7. **Perioada de păstrare** a cererilor neconcretizate (propunere: 12 luni) și aplicarea ei efectivă în Gmail și WhatsApp.
8. **Web3Forms:**
   - setați perioada de păstrare a trimiterilor la minimum (7 zile) și treceți valoarea în politică;
   - acceptați explicit DPA-ul și păstrați o copie;
   - verificați că planul gratuit (250 de trimiteri pe lună) este suficient.
9. **Vercel:** proiect pe planul **Pro** (uz comercial), DPA aplicabil și perioada reală a logurilor.
10. **Email:** Gmail personal sau Google Workspace. Cu Workspace, Google devine persoană împuternicită cu DPA. Cu Gmail personal, nu există un DPA de tip B2B.
11. **DPO:** confirmați că nu există un responsabil desemnat.
12. **Implementare (de confirmat cu dezvoltatorul):**
    - tagul Google și `googletagmanager.com` nu apar în Network înainte de Accept;
    - `consent default` vine înainte de `config`;
    - conversia formularului se trimite doar la `success: true`;
    - niciun câmp din formular nu ajunge la Google;
    - durata alegerii `cookie-consent` (expiră sau nu);
    - Google Maps reține sau nu alegerea „Afișează harta”;
    - ce se întâmplă la retragerea acordului (`update` cu `denied` și ștergerea cookie-urilor `_gcl_*`).
13. **ANPC:**
    - pictograma SAL oficială, salvată local, într-o casetă de 250 x 50 px, în footer (deci și pe prima pagină);
    - link către `https://reclamatiisal.anpc.ro/`;
    - fără SOL;
    - placheta fizică, doar dacă există un spațiu deschis publicului.
14. **Paginile legale** sunt legate din footer și din formular: un text scurt lângă butonul de trimitere, cu link către Politica de confidențialitate, fără bifă obligatorie (temeiul este art. 6 alin. (1) lit. b).
