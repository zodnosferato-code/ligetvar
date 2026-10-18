# Játékmotor — átdolgozott félév, v2

| Réteg | Aktív forrás | Szerep |
| --- | --- | --- |
| Állapot | `src/game/engine/types.ts` | verziózott félév, négy kapcsolódás, tanúsított döntések és bizonyítékok |
| Szabályok | `src/game/engine/logic.ts` | változatlan bemenetből új állapotot adó reducerek; sávok, előfeltételek, hatások, lezárás |
| Történet | `src/game/content/catalog.ts` | 45 magyar jelenet; egyetlen aktív jelenetregiszter |
| Ellenőrzés | `src/game/content/validate.ts` | hivatkozások, szövegek, választások, előfeltétel- és folytatási ciklusok, közös történet elérhetősége |
| Képmanifest | `src/game/content/assets.ts` | pontos helyszín, ruhás átmeneti portré, biztonságos semleges tartalék, jelölt helyőrző |
| Mentés | `src/game/engine/save.ts`, `store.ts` | v2 validálás és külön kulcs; Zustand/localStorage integráció |
| UI | `src/game/ui/` | heti tervező, nagy portrés dialógus, mobil fejléc, napló, összegzés, epilógus |
| Hang | `src/game/audio.ts` | megőrzött zenei rendszer, új állapothoz igazítva; hanghiba nem gátolja a történetet |

## Heti hurok

A `slot=0` a garantált közös alkalom. Pénz, energia, véletlen és románc nem akadályozza. Az `1` és `2` szabad sáv, a `3` heti összegzés. Csak a közös alkalom befejezése és mindhárom sáv felhasználása után váltható hét. Jelenet közbeni sorváltás nem kerül újabb sávba. Külön automatikus gyógytorna nincs; a közös jelenetek tartalmazzák a műhelyt.

A személyes jelenet költsége 8 energia, a közös alkalom +4, az új hét +24, a pihenő +32. Alacsony energia nem zárja el a történetet. A 15. heti konfrontáció támogatott felkészüléssel további 8, hiányos felkészüléssel 28 energiát vesz el. Az opcionális munkák külön szabad sávot használnak, a vásárlás és találkozó nem igényel műszakot. Ajándék személyenként hetente egyszer adható, legfeljebb csekély kapcsolódási bónusszal.

Az előfeltétel explicit jelenet-, bizonyíték- és döntéshivatkozás; összetett alternatívákhoz `anyOf` használható. A személyes alkalmak az ajánlott héttől a 14. hét végéig pótolhatók. T7 kizárólag a 14. héten; személyes utóbeszélgetések kizárólag a 16. héten. A UI kiírja a tényleges határidőt. A kihagyott alkalom nem teljesül automatikusan.

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

`npm test` / `npm run test:engine` / `npm run test:headless`: ugyanaz a Node headless készlet. `npm run typecheck`: TypeScript. `npm run build`: Vite production build. A régi `src/core/`, JSON-összefésülők és Jest belépési pont megszűntek a hasznos ellenőrzések átültetése után. A történeti JSON és lokalizáció megmaradt forrás/proveniencia céljára, aktív import nélkül. A tényleges eredményeket a [haladási napló](docs/REDESIGN-PROGRESS.md) rögzíti.
