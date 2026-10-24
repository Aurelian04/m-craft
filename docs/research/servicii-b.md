# Note de predare: servicii B

Fișiere: `app/data/services/exterioare.ts`, `fatade.ts`, `instalatii-sanitare.ts`, `instalatii-electrice.ts`.
Research făcut la 23.10.2026. Mărcile apar doar aici, nu în textele site-ului.

## Schimbare legislativă importantă

**Legea nr. 50/1991 nu mai este în vigoare.** A fost abrogată de Codul amenajării teritoriului, urbanismului și construcțiilor (CATUC), Legea nr. 169/2026, publicată în M. Of. nr. 661 din 10.08.2026, în vigoare din 25.08.2026. Codul are trei regimuri: lucrări fără formalități (art. 299, după surse secundare), lucrări pe bază de notificare și lucrări cu autorizație de construire. Nu am găsit textul oficial integral online. Ce am folosit vine din surse secundare, așa că paginile spun doar ce e sigur și trimit clientul la urbanismul primăriei.

- https://actualdecluj.ro/codul-urbanismului-explicat-ce-se-intampla-cu-actele-si-autorizatiile-deja-depuse-inainte-de-25-august-cand-intra-in-vigoare-noul-act-normativ/ : intrarea în vigoare pe 25.08.2026, abrogarea Legii 50/1991 și 350/2001, regimul tranzitoriu.
- https://kapal.ro/ghiduri/codul-urbanismului : rezumatul celor trei regimuri. Reparațiile de finisaje exterioare fără schimbarea fațadei și a culorilor nu cer formalități (art. 299). Reabilitarea energetică unitară a anvelopei la case individuale de cel mult 3 niveluri merge pe notificare (art. 294–298). Blocurile nu sunt tratate distinct.
- https://petcupartners.ro/codul-urbanismului-2026 : art. 299 (reparații fără schimbarea formei și aspectului, finisaje, instalații interioare).
- Legea 50/1991, forma din 10.06.2023 (PDF OAR: https://oar.archi/wp-content/uploads/2024/06/Legea-50_1991-privind-autorizarea-executarii-lucrarilor-de-constructii.pdf): art. 11 alin. (1) lit. b, g, h, j. Le-am folosit doar ca reper, pentru că legea este abrogată. Lit. j pct. 2 scutea de autorizație reabilitarea energetică a anvelopei la case individuale de cel mult 3 niveluri, iar CATUC pare să fi trecut-o pe notificare.

## Fațade (`fatade.ts`)

- EAD 040083-00-0404 înlocuiește ETAG 004 (Decizia UE 2020/1574, 29.10.2020): https://en.itec.cat/infoitec/certification/new-ead-040083-00-0404-supersedes-etag-004-for-the-ce-marking-of-etics-systems/ și https://www.nlfnorm.cz/en/ehn/6669
- SR EN 13499 (ETICS pe bază de EPS) și SR EN 13500 (ETICS pe bază de vată minerală). Sunt citate pe denumire și scop, textul standardelor nu l-am consultat.
- Ghid de aplicare Ceresit Ceretherm (https://dm.henkel-dam.com/is/content/henkel/ghid-aplicare-ceresit-ceretherm). De aici am luat: adezivul acoperă minimum 40% din placă (cordon pe perimetru și puncte); plăcile se montează decalat, „în țesere”, cu întrețesere la colțuri; diblurile se pun după circa 24 h, minimum 4 pe m² și minimum 8 pe m² în zonele de colț (2 m), cu numărul stabilit de proiectant; diblurile sunt obligatorii la muchii și peste 12 m; plasa se suprapune 10 cm; fâșiile diagonale la colțurile golurilor au minimum 35 x 20 cm; la parter se recomandă un strat suplimentar de plasă până la 2 m; aplicarea se face la +5…+25 °C, cu umiditate sub 80% și fără soare direct; plasa are minimum 145 g/m²; polistirenul lăsat neacoperit peste 14 zile se șlefuiește; la soclul neprotejat se reface hidroizolația dintre soclu și trotuar.
- Broșura Rockwool de instalare ETICS (https://www.rockwool.com/siteassets/rw-ro/etics/brosura-instalare-etics.pdf). De aici am luat: straturile sistemului; ferestrele se schimbă înainte de ETICS; rosturile se umplu cu același material izolant, nu cu spumă; stratul de armare se aplică ud pe ud; peste vata minerală merge tencuială siliconică sau silicatică; aplicarea se face la +5…+30 °C.
- Legea 196/2018 a asociațiilor de proprietari (PDF de la Primăria Miroslava: https://www.primariamiroslava.ro/wp-content/uploads/2023/02/Lege-196-2018.pdf). Art. 32 alin. (1)–(4): la blocuri, aspectul fațadei se modifică numai unitar, pe tot condominiul, pe baza unei documentații întocmite de arhitecți cu drept de semnătură, iar președintele asociației cere primăriei restricțiile de culoare și materiale. Art. 102 alin. (1) lit. i: modificarea aspectului proprietății comune fără respectarea legii se amendează cu 5.000–10.000 lei (în text nu am pus suma).
- Securitatea la incendiu (barierele din vată minerală la ETICS cu EPS): nu am găsit textul normativului P118 în vigoare, doar disputa despre proiectul de modificare (profit.ro). Pe pagină scrie doar că, la anumite clădiri, reglementările de securitate la incendiu cer bariere stabilite prin proiect.

## Amenajări exterioare (`exterioare.ts`)

- Normativul I9-2022, pct. 13.38 (https://legislatie.just.ro/Public/DetaliiDocumentAfis/262281): minimum 2 receptoare pe terasă (nu se aplică la balcoane). Pct. 13.39: baza burlanelor.
- Izolarea podului: bariera de vapori pe partea caldă, cu îmbinări lipite cu bandă, folie anticondens sau difuzie sub învelitoare, verificarea planșeului și a infiltrațiilor (ghiduri Hornbach: https://www.hornbach.ro/proiecte/izolarea-podului-sisteme-de-izolatie/ și https://www.hornbach.ro/proiecte/izolarea-tavanului-de-la-ultimul-etaj/). Grosimile nu le-am dat.
- Soclul cu XPS și hidroizolația dintre soclu și trotuar vin din ghidul Ceresit de mai sus.
- Trotuarul de gardă: nu am găsit în surse oficiale dimensiunile normate (lățime și pantă, P 7 pentru terenurile sensibile la umezire). Pe pagină scrie doar că se fac pantă spre exterior și rost etanșat față de soclu, iar lățimea se stabilește după teren și proiect.
- Am verificat regimul de autorizare la CATUC (vezi mai sus).

## Instalații sanitare (`instalatii-sanitare.ts`)

- Normativul I9-2022, aprobat prin Ordinul MDLPA nr. 2960/15.11.2022 (https://legislatie.just.ro/Public/DetaliiDocumentAfis/262281, ordinul la https://legislatie.just.ro/Public/DetaliiDocumentAfis/262177):
  - pct. 21.2–21.3: proba de etanșeitate se face înainte de montarea armăturilor, cu capetele obturate, la 1,5 x presiunea de regim și minimum 6 bar, timp de minimum 20 de minute, fără scădere de presiune;
  - pct. 21.4–21.5: proba de funcționare (minimum 6 h la rece) și proba la cald la 55–60 °C (nu le-am detaliat în text);
  - pct. 21.7–21.11: la canalizare, proba de etanșeitate prin umplere cu apă până la nivelul sifoanelor sau al obiectelor, de regulă minimum 24 h, și proba de funcționare cu verificarea pantelor;
  - Anexa 5.1, Tabel A5.1.1: pante pentru conductele de legătură. Chiuvetă, lavoar, cadă, sifon de pardoseală și mașină de spălat: normal 0,035, minim 0,025. WC: normal 0,020, minim 0,015 (Dn 100);
  - pct. 26.7: proces-verbal de lucrări ascunse (Anexa 10).
- Hidroizolația sub placări (EN 14891): fișele Penosil AquaBrake Fiber (https://penosil.com/ro/wp-content/uploads/sites/8/2020/06/4122_PENOSIL_Premium_AquaBrake_Fiber_TDS_ROM.pdf) și Baumit Baumacol Proof (https://maxbau.ro/cs-content/cs-docs/FT_BAUMACOL_PROOF-9532-.pdf). De aici am luat: două straturi, bandă la colțuri și îmbinări, placare după uscare (circa 24 h) și aplicare la peste +5 °C.
- Cadrele pentru rezervoarele îngropate: picioare reglabile, variante pentru zidărie și pentru gips-carton (fișele de produs Dedeman și Hornbach). Cotele de montaj le-am lăsat pe seama schiței producătorului.
- Legea 196/2018 art. 37 alin. (6): instalațiile comune se modifică pe baza unui referat tehnic, cu hotărârea AG luată cu 2/3 și cu autorizație. Am folosit-o la întrebarea despre coloane.

## Instalații electrice (`instalatii-electrice.ts`)

- Regulamentul ANRE pentru autorizarea electricienilor, aprobat prin Ordinul ANRE nr. 66/2023 (M. Of. 417/2023): https://legeaz.net/monitorul-oficial-417-2023/ordin-anre-66-2023
  - art. 1 alin. (1): proiectarea și executarea instalațiilor electrice se realizează de electricieni autorizați;
  - art. 8–9: gradele. Gradul I execută instalații interioare de cel mult 10 kW, sub 1 kV. IIA/IIB, IIIA/IIIB și IVA/IVB sunt pentru proiectare și execuție, la tensiuni crescătoare;
  - art. 35 lit. A: autorizația trebuie să fie vizată, iar instalațiile interioare de cel mult 30 kW pot fi făcute de gradele II–IV în condițiile din regulament;
  - art. 37 lit. b, d: lucrul se face în limita gradului și pe baza proiectelor întocmite de electricieni autorizați sau de operatori atestați;
  - art. 38: personalul calificat fără autorizație lucrează doar sub supravegherea unui electrician autorizat;
  - art. 45: operatorii de rețea pun sub tensiune instalația doar pe baza documentației întocmite de autorizați sau atestați.
- anre.ro: portalul spv.anre.ro oferă „liste publice” despre electricieni și atestate. Pe pagină scrie doar că „ANRE publică pe site informații despre autorizații”.
- Normativul I7-2011, forma consolidată din 12.07.2023 (https://legislatie.just.ro/Public/DetaliiDocumentAfis/286763):
  - 3.0.1.2–3.0.1.3: proiectele se verifică de verificatori atestați, iar punerea în funcțiune se face după controlul execuției;
  - 3.5.1: instalația se împarte în circuite după necesități;
  - 4.1.5.2.1: DDR de cel mult 30 mA la prizele de uz general de cel mult 20 A;
  - 5.2.2.8.4: traseele înglobate în pereți sunt orizontale sau verticale, iar în plafoane și planșee pot urma traseul cel mai scurt;
  - 5.2.6.3: conexiunile rămân accesibile pentru verificare (cu excepțiile listate);
  - 7.1.3.5: în încăperile cu cadă sau duș, toate circuitele au DDR de cel mult 30 mA (cu excepții). 7.1.4.3: aparatajul permis pe volume (în volumul 0 nimic, în volumul 2 accesorii fără prize, cu excepția TFJS);
  - 8.1.1: verificarea inițială se face în timpul montării și la final, înainte de punerea în funcțiune, de o persoană competentă, prin inspecție (înainte de punerea sub tensiune) și încercări (continuitate, rezistența izolației etc.), cu raport de verificare inițială și remedierea defectelor înainte de punerea în funcțiune.

## De confirmat cu firma

1. **Instalații electrice, cel mai important punct.** Are firma în echipă sau colaborează cu un electrician autorizat ANRE (ce grad, viză valabilă) ori cu un operator economic atestat? Pagina nu afirmă și nu sugerează că firma are autorizare ANRE. Este scrisă ca informație generală și nu spune că firma execută instalația. Dacă firma nu are electrician autorizat, pagina trebuie fie păstrată ca ghid informativ (eventual cu formularea „lucrările de construcții aferente: șlițuri, goluri, tavane”), fie scoasă din meniu. Dacă are, se poate adăuga o frază rezervată, după ce firma confirmă în scris.
2. **Instalații sanitare.** Execută firma efectiv trasee de apă și canalizare, rezervoare îngropate și probe de presiune? Ce materiale folosește de obicei (multistrat, PPR)? Pagina scrie lucrarea la modul general. Gazele naturale sunt excluse explicit.
3. **Fațade.** Ce sisteme folosește firma (EPS, EPS cu grafit, vată bazaltică) și ce tencuieli? Lucrează și la blocuri sau doar la case? Are schelă proprie? Pagina nu spune că firma se ocupă de acte.
4. **Exterioare.** Ce tip de hidroizolație folosește la terase (membrană bituminoasă sau lichidă)? Face și trotuare de gardă și scări? Fotografiile arată izolația acoperișului și a terasei, plus XPS pe pereți.
5. **Legislație.** Forma oficială a Legii 169/2026 (CATUC), cu articolele despre notificare și despre termoizolarea anvelopei, plus eventualele rectificări (Ministerul a recunoscut o „eroare materială” la o prevedere). Trebuie verificată și forma actuală a art. 32 din Legea 196/2018 după OUG 82/2025. Poate le verifică un jurist sau compartimentul de urbanism înainte de publicare.
6. **Normative.** Trebuie confirmat că I7-2011 (consolidat 2023) și Ordinul ANRE 66/2023 sunt încă formele în vigoare la publicare. Nu am găsit un I7 nou.
7. Denumirea din meniu pentru fațade: am pus „Fațade și termoizolații” (shortName „Fațade”). Se poate schimba dacă meniul cere altceva.
