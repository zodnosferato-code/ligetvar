# Játékmotor — átdolgozott félév, v2

> **Status:** Active. | **Purpose:** Runtime architecture, scheduling, saves, and ending rules.

| Réteg | Aktív forrás | Szerep |
| --- | --- | --- |
| Állapot | `src/game/engine/types.ts`, `src/game/content/types.ts` | általános motorállapot és külön kampányséma, a v2 mentési alak megőrzésével |
| Motor | `src/game/engine/logic.ts` | általános reducerek, sávok, előfeltételek, célzott hatások; történeti azonosítók nélkül |
| Kampányszabályok | `src/game/content/rules.ts`, `runtime.ts` | kezdeti állapot, 16 hét, gazdaság, kapcsolati irányok, konfrontáció, intézmény és végértékelés |
| Történet | `src/game/content/catalog.ts` | 60 magyar jelenet; külön TypeScript modulokból összeállított egyetlen regiszter |
| Ellenőrzés | `src/game/content/validate.ts` | hivatkozások, szövegek, választások, előfeltétel- és folytatási ciklusok, közös történet elérhetősége |
| Képmanifest | `src/game/content/assets.ts` | megőrzött átmeneti háttérképek, portréhelyőrzők; új karakterképek jóváhagyásra várnak |
| Mentés | `src/game/engine/save.ts`, `content/saves.ts`, `store.ts` | általános kodek, kampányséma-ellenőrzés és v2 kulcs; Zustand/localStorage integráció |
| UI | `src/game/ui/` | pergamenes, szilva–réz kastélyromantikus felület; tárgyakkal vezérelt iroda/saját szoba tervező; nagy portrés dialógus; portré nélküli elbeszélés; mobil fejléc, napló, összegzés, epilógus |
| Hang | `src/game/audio.ts` | megőrzött zenei rendszer, új állapothoz igazítva; hanghiba nem gátolja a történetet |

## Tárgyakkal vezérelt tervező

A `RoomPlanner.tsx` két, teljes képként megjelenített hátteret használ a meglévő manifestből: iroda és saját szoba. A százalékos tárgykoordináták a vágatlan képre vonatkoznak. A mentett heti sáv választja a központot: közös alkalom előtt és nappal az iroda, éjszaka a hálószoba. Nincs időt megkerülő szobaválasztó. Az ajtó „Hová indulsz?” úti célmenüt nyit: az aktuális központ és minden olyan helyszín elérhető, ahol az aktuális sávban játszható jelenet van. Másik központba eső személyes jelenet elindítható, de ettől a tervező ideje nem változik. A cél kiválasztása ingyenes; egy jelenet sávköltségét továbbra is annak befejezése számolja el. A tárgyak körvonala és műveleti címkéje mindig látható, elrejtő kapcsoló nélkül. Megfelelő háttértárgy hiányában a szoba `fallbacks` listája kijelöli a külön, címkézett ikongombbal megjelenő műveletet. A hálószobában az asztali könyv a napló; ott nincs műhely- vagy munkavezérlő. A nappali műhely/felkészülés és munka az irodában van, az éjszakai központ a telefon, pihenés, napló és ajándékok tárgyait kínálja. Billentyűzetes fókusznál a címke és fókuszkeret mindig látható; a mobil célterületek legalább 44×44 pixelesek és nem fedik egymást.

| Tárgy | Megnyitott műveletek |
| --- | --- |
| Irodai íróasztal | Garantált közös alkalom és elérhető felkészülés |
| Ajtó | Úti célok és az aktuális napszakban elérhető jelenetek |
| Telefon | Elérhető személyes találkozók és kávés beszélgetések; a kiválasztott jelenet a saját helyszínén indul |
| Jegyzetfüzet / könyvek | Napló, ismert bizonyítékok, kapcsolatok és választható személyes irány |
| Fotel | Pihenés |
| Polc | Ajándékok vásárlása és átadása |
| Zsák | Palackmozaik és Archívumpárok |

A felhasználó 2026-10-21-i választása rögzített nappali/éjszakai sávokra cseréli a korábbi, csak szobaszerepet jelölő megoldást. A sorrend: `slot=0` garantált közös alkalom → `slot=1` nappali tevékenység → `slot=2` éjszakai tevékenység → `slot=3` heti összegzés. Nem hét napon át futó óraszimuláció: a félév továbbra is 16 közös + 32 szabad alkalom. A közös jelenetek saját megvilágítása és belső időugrásai megmaradnak.

| Tevékenység | Mikor? | Időköltség |
| --- | --- | --- |
| Garantált közös alkalom | Heti első sáv; saját történeti napszak | Közös sáv, befejezéskor |
| Palackmozaik, Archívumpárok | Nappal | Nappali sáv, az eredmény elfogadásakor |
| Felkészülés | Nappal | Nappali sáv; a két alkalom külön hétre tervezendő |
| Személyes találkozó, kávé | Nappal vagy éjszaka | Az aktuális szabad sáv |
| T7/T8 közös este | Éjszaka; változatlan 14./16. heti határidő | Éjszakai sáv |
| Pihenés / alvás | Nappal / éjszaka | Az aktuális szabad sáv, legfeljebb +32 energia |
| Napló, irány, vásárlás, ajándék, menük és úti célok böngészése | Meglévő előfeltételeik szerint | Ingyenes |

A kampány `RULES.schedule` adatai mondják meg a sávok napszakát és az aktivitások megengedett időszakait; a generikus motor nem importál történeti adatot. A jelenet opcionális `periods` mezője adja a napszak-korlátot. Az `availableScenes`, `openScene` és `activity` ugyanazt a szabályt ellenőrzi, tehát közvetlen reducerhívás sem indít éjszakai munkát. Más kampány számára a schedule elhagyható. A két napszakban elérhető jelenetek világítása nappal `day`, éjszaka `evening`; a szövegek érintett délután-hivatkozásai idősemlegesek. A T7/T8 esti világítást kap. A tervező mindig a sávból áll helyre, újratöltéskor is. Nappal külön előnézet jelzi a már teljesített előfeltételű, csak éjszaka indítható estéket.

A párbeszéd sorközi folytatása, munka megnyitása vagy megszakítása nem léptet időt; a befejezés pontosan egy sávot használ. A kötelező jelenet nem hagyható ki. Nincs új meghívás-, óra-, vagy mentésmező. A v2 mentések megmaradnak, az 1./2. sáv nappalnak/éjszakának számít. A korábban már megkezdett, az új szabály szerinti napszakon kívüli jelenet vagy munkajáték befejezhető: a mentésbetöltő és a befejezés szándékosan nem alkalmaz utólagos napszak-kaput. Megszakított régi éjszakai munka újra már csak nappal indítható.

## Portrék és jelenetkompozíció

A beszélgetőpartner képe külön réteg a helyszínháttéren, nem a pergamenes szövegdoboz része. A portré aránytartó, vágás nélküli, átlátszó hátterű kép; a motor aktuális NPC-beszélője és kifejezése választja ki. A jelenleg hiányzó végleges NPC-képet kis, jelölt helyőrző képviseli. Márton/játékos saját megszólalásánál nincs kép, üres portrékeret vagy monogramos helyőrző. Az elbeszélés szintén kép nélküli próza.

Asztali nézetben a portré a háttér bal oldali területén, a szöveg mellette jelenik meg. Mobilon a helyszín külön, jól látható felső területén van a portré; a teljes szélességű szöveg és a választások alatta maradnak. Az arckép nem takarhat szöveget vagy választást. A hosszú mobil szöveg külön görgethető, a játékos neve csak szöveges beszélőnévként szerepel. E szabályok a felhasználó 2026-10-20-i irányát rögzítik; nem igényelnek mentésformátum-változást.

A párbeszéd vezérlői azonos méretű fejléc- és szövegterület után, állandó első gombsorban jelennek meg. A narrátor-, NPC- és játékosforduló ugyanazt a panelgeometriát használja; a görgetési jelzés helye akkor is foglalt, ha nincs jelzés. A hosszabb szöveg a saját területén görgethető. Több válasz az első gombsor alatt bővülhet, így minden választás elérhető marad; a rövid vagy hosszú szöveg nem mozdítja el a Tovább gombot.

## Motor és tartalom határa

A motor nem importál a `content/` könyvtárból. A `RuntimeRules` szerződésen át kapja a kezdeti állapotot, a hetek számát, a gazdasági adatokat, a mentési kulcsokat és a kampányhoz tartozó hatás-, jelenetbefejezési, irányváltási és validálási szabályokat. A motor önálló, háromhetes, más szereplőkkel és más végfeltétellel futó tesztkampánnyal is ellenőrzött. A `content/runtime.ts` a Ligetvár alkalmazási belépési pontja; nem régi tartalmi adapter.

A `content/epilogues.ts` tartalmazza a végszövegeket. A felület a tartalmi belépési pontot hívja. A történet szerkesztéséhez a motor átírása nem szükséges.

## Heti hurok

A `slot=0` a garantált közös alkalom. Pénz, energia, véletlen és románc nem akadályozza. Az `1` nappali, a `2` éjszakai szabad sáv, a `3` heti összegzés. Csak a közös alkalom befejezése és mindhárom sáv felhasználása után váltható hét. Jelenet közbeni sorváltás nem kerül újabb sávba. Külön automatikus gyógytorna nincs; a közös jelenetek tartalmazzák a műhelyt.

A személyes jelenet költsége 8 energia, a közös alkalom +4, az új hét +24, a pihenő +32. Alacsony energia nem zárja el a történetet. A 15. heti konfrontáció támogatott felkészüléssel további 8, hiányos felkészüléssel 28 energiát vesz el. Az opcionális munkák külön szabad sávot használnak, a vásárlás és találkozó nem igényel műszakot. Ajándék személyenként hetente egyszer adható, legfeljebb csekély kapcsolódási bónusszal.

Az előfeltétel explicit jelenet-, bizonyíték- és döntéshivatkozás; összetett alternatívákhoz `anyOf` használható. A személyes alkalmak az ajánlott héttől a 14. hét végéig pótolhatók. T7 kizárólag a 14. héten; személyes utóbeszélgetések kizárólag a 16. héten. A UI kiírja a tényleges határidőt. A kihagyott alkalom nem teljesül automatikusan.

## Elágazó és kontextuális beszélgetések

A `Choice.next` eltérő szövegcsomópontra vezet. A `Choice.requires` korábban tanúsított döntéshez, jelenethez vagy bizonyítékhoz kötheti egy válasz megjelenését. Az el nem érhető választást a reducer közvetlen azonosítóval sem fogadja el. A válasz hatása az ág végéig függőben marad; közben menthető és folytatható. Az új nyitóágak megőrzik a korábbi `line_*` azonosítókat és választási hatásokat a v2 kurzorokhoz.

A kilenc opcionális kávés beszélgetés három időszakot fed le: 1–7., 8–14. és 15–16. hét. Karakterenként és időszakonként egyszer játszhatók, egy szabad sávba és 8 energiába kerülnek. A középső visszautaló választás csak a korábbi megfelelő témát befejező játékosnak jelenik meg. Romantikus vállalást vagy kapcsolatpontot nem adnak, és a nyomozás nem igényli őket. A régi, csak állapotüzenetet adó `talk` tevékenység megszűnt.

A `romance.ts` kibővíti a három egyéni útvonal 2–6. jelenetét és a T3/T4/T7/T8 jeleneteket. A randira és az érintésre külön válaszolunk: a `slow_touch` ugyanazt a romantikus folytatást és kapcsolódást engedi, mint a közelség elfogadása. A visszautasítás továbbra is külön választás. A személyes beszélgetés emlékei csak jelenetbefejezéskor kerülnek a meglévő tanúsított döntések közé; később feltételes válaszok idézik fel őket, mindig feltétel nélküli alternatívával. Nem keletkezik új mentésmező, kötelező alkalom vagy sávköltség. A korábbi v2 jelenet-, sor- és választásazonosítók megmaradnak; a már befejezett jelenetek nem játszódnak újra automatikusan.

## Tanúsított tudás és döntés

A jelenetben a választási hatás a kurzor `pending` listájában vár. Csak a végső sor befejezése írja a `completed`, `evidence`, `decisions` és `journal` mezőket. A napló és heti összegzés ezekből épül, nem a naptári hétszámból. A hatás név szerint céloz kapcsolódást, soha nem örökli az előző beszélő romantikus statját.

A 8. héttől választott irány szándék, nem elköteleződés. Az első személyes vállalás után a tervező már nem írja át az irányt; a folytatásról az utóbeszélgetésben lehet visszalépni. A hármas út önálló női vonzalmat, külön beszélgetéseket, hármas egyeztetést és mindhárom fél igenjét igényli, továbbá mindkét egyéni jóvátételt/vállalást. Elutasított T5/T6 után közösen akart egyéni irány vagy barátság választható. A számok, kávé és ajándékok ezeket nem pótolják.

## Lezárás

A `resolution` mező jelöli a konfrontációt és az intézményi döntést. A 15. héten minden végigjátszott út megszakítja a rítust és megöli a vámpírt. A külön segítői beosztás és jelzéspróba együtt támogatott kimenetelt ad; nélkülük a segítők közbelépnek, de nő a kimerülés és sérül a bizonyíték. A 16. heti jelentés nyilvános/korlátozott/belső közlésről dönt. Megőrzött bizonyítékkal nyilvános elismerés, másként részleges válasz vagy elhallgatás következik. Ez független a románctól.

Az intézményi jelenet után még két szabad sáv áll rendelkezésre. T8 egyetlen alkalomban tartalmazza a két személyes aftermath-állomást is. Az `evaluateEnding` addig nem ad végső kapcsolati epilógust, amíg a 16. heti összegzésből a játékos ténylegesen le nem zárja a félévet. Külön egyéni, hármas, baráti, rendezetlen és eltávolodó kapcsolat lehetséges. A magánéleti kitettség külön kijelzett mező, nem természetfeletti veszélypontszám.

## Mentési határ

- Kulcs: `ligetvar-save-v2`, `version: 2`. A v1 kulcsot a motor soha nem írja vagy törli.
- A régi félévet újra kell kezdeni. A címoldalon külön kérhető a v1 játékosnevének átvétele; hét, útvonal, stat és mérföldkő nem importálható.
- Ismeretlen verzió, hibás JSON, hiányos állapot, ismeretlen jelenet/kurzor, hamis bizonyítékforrás vagy érvénytelen folyamathatás nem tölthető be. Sikertelen folytatás nem írja felül a mentést új játékkal.
- Jelenet közben is menthető és folytatható. A mentés a kurzort és a még nem tanúsított hatásokat is őrzi.
- Írási hiba a felületen látható, a játék memóriában folytatható.

## Ellenőrzés

`npm test` / `npm run test:engine` / `npm run test:headless`: ugyanaz a Node headless készlet. `npm run typecheck`: TypeScript. `npm run build`: Vite production build. A régi `src/core/`, JSON-összefésülők és Jest belépési pont megszűntek a hasznos ellenőrzések átültetése után. A történeti JSON és lokalizáció a `docs/archive/legacy-narrative/` alatt maradt meg forrás/proveniencia céljára, aktív import nélkül. A tényleges eredményeket a [haladási napló](docs/REDESIGN-PROGRESS.md) rögzíti.

## Reviewed lighting variants — 22 October 2026

The UI passes effective `sceneLighting` to `backgroundFor` in the content asset manifest. Classroom evening selects dusk, library evening selects evening, and courtyard evening/night selects night (flexible night-slot scenes are labelled evening). Day selection and unavailable variants fall back to the base background. Reviewed variants set `lightingBaked`; their background bypasses the extra evening/night CSS tint on desktop and mobile. Other locations retain the CSS fallback. Engine and saves are unchanged.

### Night destination correction — 22 October 2026

Every non-shared scene in the saved night slot now resolves to `night`, including older scene definitions without `periods`. Shared-story scenes keep their authored lighting. `backgroundFor` first uses the exact variant, then the other late-day variant (evening/night), then the base. All seven currently reachable night destinations have real evening/night art: new lake/office night images, existing courtyard night and classroom/library late-day variants, and already-night apartment/Holdkör bases. Their `lightingBaked` flag avoids duplicate background tint. The daytime planner and its hotspots are unchanged; the office night image is used for dialogue only.

## Move-limited jobs and personal spending — 25 October 2026

The approved puzzle/points redesign is implemented. [Puzzles and economy](docs/LEISURE-ECONOMY.md) documents the authoritative amounts, six paid optional scenes, six gifts, visible delivery replies, saved puzzle moves and backwards-compatible optional v2 fields. Starting a paid scene atomically deducts money and activity points; completion still consumes one slot. Core story and relationship commitments retain their existing witnessed requirements. The phone now also displays gift replies and paid outings; this supersedes the earlier meetings-only phone description.
