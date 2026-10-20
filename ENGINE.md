# Játékmotor — átdolgozott félév, v2

> **Status:** Active. | **Purpose:** Runtime architecture, scheduling, saves, and ending rules.

| Réteg | Aktív forrás | Szerep |
| --- | --- | --- |
| Állapot | `src/game/engine/types.ts`, `src/game/content/types.ts` | általános motorállapot és külön kampányséma, a v2 mentési alak megőrzésével |
| Motor | `src/game/engine/logic.ts` | általános reducerek, sávok, előfeltételek, célzott hatások; történeti azonosítók nélkül |
| Kampányszabályok | `src/game/content/rules.ts`, `runtime.ts` | kezdeti állapot, 16 hét, gazdaság, kapcsolati irányok, konfrontáció, intézmény és végértékelés |
| Történet | `src/game/content/catalog.ts` | 54 magyar jelenet; külön TypeScript modulokból összeállított egyetlen regiszter |
| Ellenőrzés | `src/game/content/validate.ts` | hivatkozások, szövegek, választások, előfeltétel- és folytatási ciklusok, közös történet elérhetősége |
| Képmanifest | `src/game/content/assets.ts` | megőrzött átmeneti háttérképek, portréhelyőrzők; új karakterképek jóváhagyásra várnak |
| Mentés | `src/game/engine/save.ts`, `content/saves.ts`, `store.ts` | általános kodek, kampányséma-ellenőrzés és v2 kulcs; Zustand/localStorage integráció |
| UI | `src/game/ui/` | pergamenes, szilva–réz kastélyromantikus felület; ikonokkal jelölt heti tervező; nagy portrés dialógus; portré nélküli elbeszélés; mobil fejléc, napló, összegzés, epilógus |
| Hang | `src/game/audio.ts` | megőrzött zenei rendszer, új állapothoz igazítva; hanghiba nem gátolja a történetet |

## Portrék és jelenetkompozíció

A beszélgetőpartner képe külön réteg a helyszínháttéren, nem a pergamenes szövegdoboz része. A portré aránytartó, vágás nélküli, átlátszó hátterű kép; a motor aktuális NPC-beszélője és kifejezése választja ki. A jelenleg hiányzó végleges NPC-képet kis, jelölt helyőrző képviseli. Márton/játékos saját megszólalásánál nincs kép, üres portrékeret vagy monogramos helyőrző. Az elbeszélés szintén kép nélküli próza.

Asztali nézetben a portré a háttér bal oldali területén, a szöveg mellette jelenik meg. Mobilon a helyszín külön, jól látható felső területén van a portré; a teljes szélességű szöveg és a választások alatta maradnak. Az arckép nem takarhat szöveget vagy választást. A hosszú mobil szöveg külön görgethető, a játékos neve csak szöveges beszélőnévként szerepel. E szabályok a felhasználó 2026-10-20-i irányát rögzítik; nem igényelnek mentésformátum-változást.

A párbeszéd vezérlői azonos méretű fejléc- és szövegterület után, állandó első gombsorban jelennek meg. A narrátor-, NPC- és játékosforduló ugyanazt a panelgeometriát használja; a görgetési jelzés helye akkor is foglalt, ha nincs jelzés. A hosszabb szöveg a saját területén görgethető. Több válasz az első gombsor alatt bővülhet, így minden választás elérhető marad; a rövid vagy hosszú szöveg nem mozdítja el a Tovább gombot.

## Motor és tartalom határa

A motor nem importál a `content/` könyvtárból. A `RuntimeRules` szerződésen át kapja a kezdeti állapotot, a hetek számát, a gazdasági adatokat, a mentési kulcsokat és a kampányhoz tartozó hatás-, jelenetbefejezési, irányváltási és validálási szabályokat. A motor önálló, háromhetes, más szereplőkkel és más végfeltétellel futó tesztkampánnyal is ellenőrzött. A `content/runtime.ts` a Ligetvár alkalmazási belépési pontja; nem régi tartalmi adapter.

A `content/epilogues.ts` tartalmazza a végszövegeket. A felület a tartalmi belépési pontot hívja. A történet szerkesztéséhez a motor átírása nem szükséges.

## Heti hurok

A `slot=0` a garantált közös alkalom. Pénz, energia, véletlen és románc nem akadályozza. Az `1` és `2` szabad sáv, a `3` heti összegzés. Csak a közös alkalom befejezése és mindhárom sáv felhasználása után váltható hét. Jelenet közbeni sorváltás nem kerül újabb sávba. Külön automatikus gyógytorna nincs; a közös jelenetek tartalmazzák a műhelyt.

A személyes jelenet költsége 8 energia, a közös alkalom +4, az új hét +24, a pihenő +32. Alacsony energia nem zárja el a történetet. A 15. heti konfrontáció támogatott felkészüléssel további 8, hiányos felkészüléssel 28 energiát vesz el. Az opcionális munkák külön szabad sávot használnak, a vásárlás és találkozó nem igényel műszakot. Ajándék személyenként hetente egyszer adható, legfeljebb csekély kapcsolódási bónusszal.

Az előfeltétel explicit jelenet-, bizonyíték- és döntéshivatkozás; összetett alternatívákhoz `anyOf` használható. A személyes alkalmak az ajánlott héttől a 14. hét végéig pótolhatók. T7 kizárólag a 14. héten; személyes utóbeszélgetések kizárólag a 16. héten. A UI kiírja a tényleges határidőt. A kihagyott alkalom nem teljesül automatikusan.

## Elágazó és kontextuális beszélgetések

A `Choice.next` eltérő szövegcsomópontra vezet. A `Choice.requires` korábban tanúsított döntéshez, jelenethez vagy bizonyítékhoz kötheti egy válasz megjelenését. Az el nem érhető választást a reducer közvetlen azonosítóval sem fogadja el. A válasz hatása az ág végéig függőben marad; közben menthető és folytatható. Az új nyitóágak megőrzik a korábbi `line_*` azonosítókat és választási hatásokat a v2 kurzorokhoz.

A kilenc opcionális kávés beszélgetés három időszakot fed le: 1–7., 8–14. és 15–16. hét. Karakterenként és időszakonként egyszer játszhatók, egy szabad sávba és 8 energiába kerülnek. A középső visszautaló választás csak a korábbi megfelelő témát befejező játékosnak jelenik meg. Romantikus vállalást vagy kapcsolatpontot nem adnak, és a nyomozás nem igényli őket. A régi, csak állapotüzenetet adó `talk` tevékenység megszűnt.

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
