import type { LegalDoc } from '../types'

const doc: LegalDoc = {
  slug: 'politica-cookie',
  title: 'Politica de cookie-uri',
  seoDescription:
    'Ce informații stochează acest website în browser, când se încarcă tagul Google și harta Google Maps și cum vă schimbați sau ștergeți alegerea privind cookie-urile.',
  updated: '2026-10-23',
  body: [
    {
      type: 'p',
      text: 'Această pagină explică ce informații stochează acest website în browserul dumneavoastră și ce servicii externe se încarcă, în ce condiții. Ea se aplică în baza art. 4 din Legea nr. 506/2004 privind prelucrarea datelor cu caracter personal și protecția vieții private în sectorul comunicațiilor electronice și a Regulamentului (UE) 2016/679 (GDPR). Operatorul website-ului este M CRAFT CONSTRUCTII SRL, cu datele de contact din Politica de confidențialitate.',
    },

    { type: 'h2', text: 'Ce sunt cookie-urile și stocarea locală' },
    {
      type: 'p',
      text: 'Cookie-urile sunt fișiere mici de text pe care un website le salvează în browser și le poate citi la vizitele următoare. Stocarea locală (localStorage) este o zonă din browser în care un website poate păstra informații, fără ca acestea să fie trimise automat la server. Legea tratează la fel ambele tehnologii: ele pot fi folosite fără acordul dumneavoastră doar când sunt strict necesare pentru un serviciu cerut de dumneavoastră.',
    },

    { type: 'h2', text: 'Ce se întâmplă înainte să alegeți' },
    {
      type: 'p',
      text: 'Până când apăsați „Accept”, website-ul nu încarcă tagul Google și nu plasează cookie-uri de măsurare sau de publicitate. Toate opțiunile pornesc ca refuzate. Fonturile și videoclipurile sunt găzduite pe acest website, așa că încărcarea lor nu contactează servicii externe. Căutarea internă rulează local, în browser, și nu salvează cookie-uri.',
    },

    { type: 'h2', text: 'Ce stocăm ca să ținem minte alegerea dumneavoastră' },
    {
      type: 'p',
      text: 'După ce apăsați „Accept”, „Refuz” sau salvați opțiunile din „Setări”, website-ul păstrează alegerea în stocarea locală a browserului, sub cheia cookie-consent. Fără ea, bannerul ar apărea la fiecare pagină. Această informație este strict necesară pentru a respecta alegerea dumneavoastră, de aceea nu cere consimțământ. Ea rămâne în browser până când o schimbați sau ștergeți datele website-ului și nu este trimisă către noi sau către terți.',
    },
    {
      type: 'note',
      text: 'De validat de firmă: confirmați cu dezvoltatorul dacă alegerea din cookie-consent are o durată de valabilitate (de exemplu, reafișarea bannerului după 6 sau 12 luni). Dacă are, menționați durata aici.',
    },

    { type: 'h2', text: 'Cookie-urile Google, plasate doar după „Accept”' },
    {
      type: 'p',
      text: 'Folosim Google Ads pentru reclame. Dacă apăsați „Accept”, website-ul încarcă tagul Google, iar acesta poate plasa cookie-uri care arată dacă o vizită sau un contact a pornit de la o reclamă. Măsurăm doar trei acțiuni: trimiterea cu succes a unei cereri de ofertă, click pe numărul de telefon și click pe linkul WhatsApp. Către Google nu trimitem datele completate în formular (nume, email, telefon, localitate, mesaj).',
    },
    {
      type: 'p',
      text: 'Cookie-urile pe care Google le poate plasa în acest caz includ, potrivit documentației Google:',
    },
    {
      type: 'ul',
      items: [
        '_gcl_au (Google Ads): leagă vizitele de reclamele afișate, pentru măsurarea conversiilor; durată: 90 de zile.',
        '_gcl_aw și _gcl_gs (Google Ads): păstrează informații despre click-ul pe o reclamă, când ajungeți pe website dintr-o reclamă; durată: 90 de zile.',
        'cookie-uri pe domenii Google, de exemplu IDE (doubleclick.net, publicitate și măsurare; 13 luni în SEE și Regatul Unit) sau test_cookie (verifică dacă browserul acceptă cookie-uri; 15 minute).',
      ],
    },
    {
      type: 'p',
      text: 'Lista exactă și duratele pot varia în funcție de setările Google și de modul în care ați ajuns pe website. Informațiile actualizate sunt publicate de Google la https://business.safety.google/adscookies/. Prelucrarea datelor de către Google este descrisă la https://policies.google.com/privacy.',
    },
    {
      type: 'note',
      text: 'De validat de firmă: dacă se folosește și Google Analytics 4, adăugați aici cookie-urile _ga (deosebește vizitatorii; 2 ani) și _ga_<ID> (păstrează starea sesiunii; 2 ani) și mențiunea că statisticile se activează tot doar după „Accept”. Dacă nu se folosește GA4, ștergeți această notă.',
    },
    {
      type: 'p',
      text: 'Folosim modul de consimțământ Google (Consent Mode), în varianta de bază: dacă refuzați sau nu alegeți nimic, tagul Google nu se încarcă deloc, iar browserul nu trimite către Google nici măcar starea consimțământului.',
    },
    {
      type: 'note',
      text: 'De validat de firmă: textul descrie doar măsurarea conversiilor. Dacă nu folosiți remarketing (reclame personalizate pentru cei care au vizitat website-ul), cereți dezvoltatorului să lase ad_personalization pe „denied” și după „Accept”. Dacă folosiți remarketing, spuneți acest lucru explicit în banner și în această secțiune.',
    },

    { type: 'h2', text: 'Harta Google Maps' },
    {
      type: 'p',
      text: 'Harta nu se încarcă automat. Până când apăsați „Afișează harta”, browserul nu contactează Google. După click, harta este încărcată direct de la Google, care primește adresa IP și date despre browser și poate citi sau plasa propriile cookie-uri (de exemplu NID, folosit pentru preferințe și securitate, cu o durată de 6 luni). Pentru hartă se aplică politica de confidențialitate Google.',
    },
    {
      type: 'note',
      text: 'De validat de firmă: confirmați cu dezvoltatorul dacă alegerea „Afișează harta” este reținută între pagini sau vizite. Dacă este reținută, menționați aici unde se salvează și cum se anulează.',
    },

    { type: 'h2', text: 'Linkurile de telefon și WhatsApp' },
    {
      type: 'p',
      text: 'Linkurile de telefon și WhatsApp doar deschid aplicația corespunzătoare de pe dispozitivul dumneavoastră și nu plasează cookie-uri pe acest website. Dacă ați acceptat măsurarea, click-ul este înregistrat ca eveniment, fără numărul dumneavoastră de telefon. În aplicația WhatsApp și pe paginile wa.me se aplică politicile WhatsApp și Meta.',
    },

    { type: 'h2', text: 'Cum vă schimbați alegerea' },
    {
      type: 'p',
      text: 'Puteți schimba oricând alegerea din linkul „Setări cookie-uri” din subsolul fiecărei pagini. Retragerea consimțământului este la fel de simplă ca acordarea lui și nu afectează prelucrarea făcută înainte de retragere.',
    },
    {
      type: 'p',
      text: 'După ce retrageți acordul, tagul Google nu mai este încărcat la paginile următoare. Cookie-urile plasate deja de Google rămân însă în browser până expiră sau până le ștergeți, așa cum este explicat mai jos.',
    },
    {
      type: 'note',
      text: 'De validat de firmă: confirmați cu dezvoltatorul ce se întâmplă la retragerea acordului (trimiterea comenzii consent update cu valori refuzate și, eventual, ștergerea cookie-urilor _gcl_ de pe domeniul website-ului). Dacă website-ul le șterge automat, actualizați paragraful de mai sus.',
    },

    { type: 'h2', text: 'Cum ștergeți cookie-urile și datele website-ului' },
    {
      type: 'p',
      text: 'Puteți șterge cookie-urile și stocarea locală din setările browserului, de obicei din secțiunea de confidențialitate și securitate, prin opțiunea de ștergere a datelor de navigare sau a datelor salvate de site-uri. Majoritatea browserelor permit și ștergerea datelor pentru un singur website, din meniul afișat lângă adresa din bara browserului.',
    },
    {
      type: 'ul',
      items: [
        'Chrome: Setări, Confidențialitate și securitate, Șterge datele de navigare.',
        'Firefox: Setări, Confidențialitate și securitate, Cookie-uri și date ale site-urilor.',
        'Safari (macOS): Setări, Confidențialitate, Gestionează datele site-urilor web.',
        'Safari (iPhone și iPad): Setări, Apps, Safari, Avansat, Date site-uri web.',
        'Edge: Setări, Confidențialitate, căutare și servicii, Șterge datele de navigare.',
      ],
    },
    {
      type: 'p',
      text: 'Denumirile meniurilor pot diferi ușor în funcție de versiunea browserului. Dacă ștergeți datele acestui website, se șterge și alegerea salvată sub cheia cookie-consent, iar bannerul va apărea din nou. Puteți, de asemenea, să blocați cookie-urile terțe din setările browserului.',
    },

    { type: 'h2', text: 'Modificarea acestei politici' },
    {
      type: 'p',
      text: 'Actualizăm această politică atunci când se schimbă serviciile folosite de website sau legislația. Versiunea în vigoare este cea publicată pe această pagină, iar data ultimei actualizări este afișată mai sus. Pentru întrebări ne puteți scrie la mcraftconstruct@gmail.com.',
    },
  ],
}

export default doc
