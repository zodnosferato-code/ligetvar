# AGENT.md — Ligetvár projekt útmutató

Ez a fájl későbbi agenteknek (vagy fejlesztőknek) szól. A cél, hogy a fonalat fel lehessen venni és a munkát folytatni lehessen anélkül, hogy mindent újra kelljen kitalálni.

## Fő cél

Egy 16 hetes, pixelgrafikás randiszimulátor webes játék (később Tauri csomagolással). A játékos egy 34 éves tanár (Márton Kelényi), aki fakultatív misztikus gyógytornát tart a Ligetvári Főiskolán. Három felnőtt hallgatónő (Rebeka 20, Boglárka 19, Gréta 21) rejtett vágyaival kell közelebb kerülni. A téma a meghódítás és a vágyak beteljesítése.

**Fontos**: Az intim/szexuális tartalom a kódbázisban **csak kódolt formában** szerepelhet (lásd [06-intim-szotar.md](06-intim-szotar.md)). A build agent és az automatikus folyamatok nem láthatnak explicit szöveget. A jelentést csak ez a dokumentum és a tervezői jegyzetek ismerik.

## Hogyan kell tervezni és írni

1. **Olvasd el a dokumentumokat sorrendben**:
   - [01-mufaj.md](01-mufaj.md) → műfaj
   - [02-koncepcio.md](02-koncepcio.md) → keret, statok, végek
   - [03-karakterek.md](03-karakterek.md) → karakterlapok
   - [04-vizualis-biblia.md](04-vizualis-biblia.md) → vizuális kanon
   - [05-rendszerek.md](05-rendszerek.md) → mechanikák
   - [06-intim-szotar.md](06-intim-szotar.md) → kódolt intim témák
   - [07-sztori-keret.md](07-sztori-keret.md) → miért dolgoznak együtt
   - [08-jatekmenet-es-vegkimenetek.md](08-jatekmenet-es-vegkimenetek.md) → folyamat, végek, harag
   - [09-dialog-es-architektura.md](09-dialog-es-architektura.md) → 3 rész, dialógus, kódstruktúra
   - [10-vizualis-stilus.md](10-vizualis-stilus.md) → pixel + manga stílus
   - [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md) → **kötelező képgenerálási szabály** (konzisztencia, lehetőségek sávokban)
   - [12-jatekmenet-akciok.md](12-jatekmenet-akciok.md) → beszélgetés, hívás, pénzszerző minijátékok, korlátozott akciók
   - [13-jatek-hurok-es-esemenyek.md](13-jatek-hurok-es-esemenyek.md) → játékhurok, random események, kódolt meglepetések
   - [14-hangulatok-es-zene.md](14-hangulatok-es-zene.md) → hangulatok és végteleníthető instrumentális zene
   - [15-ajandekok.md](15-ajandekok.md) → ajándékok, árak, preferenciák, bizalom szerinti szemérmetlen ajándékok
   - [16-lokalizacio-es-kodolas.md](16-lokalizacio-es-kodolas.md) → lokalizáció, a motor kódoltan hivatkozik, nem ismeri az intim tartalmat
   - [17-szakaszinditas.md](17-szakaszinditas.md) → szakaszindítás a játék elején a megfelelő max értékekkel
   - [18-megvalositasi-terv.md](18-megvalositasi-terv.md) → hiányzó elemek megvalósítási terve
   - [19-flag-es-eszkalacio.md](19-flag-es-eszkalacio.md) → flag-lista és intim eszkalációs tábla
   - [20-kep-jelenet-lista.md](20-kep-jelenet-lista.md) → kép- és jelenetlista a sávokhoz
   - [21-referencia-turnaround-terv.md](21-referencia-turnaround-terv.md) → skálás turnaround modell sheet-ek és animált sprite alapok

2. **Írási szabályok**:
   - Minden dialógusban maximum 4 választás.
   - Minden dialógusban legyen nagyon jó / jó / rossz / nagyon rossz opció.
   - Az intim témák csak a szótár kódjait használják (`act_flash`, `desire_yield_control` stb.).
   - A kód UI nélkül headless tesztelhető legyen.
   - Moduláris, újrahasznosítható core logika.

3. **Helyek**:
   - Tanterem (fő hely, gyógytorna)
   - Tanár lakása (egyéni feladatok után)
   - Békás-tó sötétben (randihely, elágazó utak)

4. **Páros útvonal**: Boglárka + Gréta a járható pár. Rebeka + Gréta szűk. Rebeka + Boglárka nem.

5. **Képgenerálás**: Mindig a [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md) és a [21-referencia-turnaround-terv.md](21-referencia-turnaround-terv.md) szerint. Alap prompt + lány haj/arc/test blokk + ruházat/póz utasítás. Egy lány képenként. A képsávok **lehetőségek** (1. alap → 5. intim), nem kötelező szabályok. Az intim képek csak később, magas bizalomnál jelenhetnek meg. Ha eltér a kanontól, újra generáld. Turnaround referenciák skálával, elől/oldal/hátul, ruhás és alsóneműs.

6. **Akciók és pénzszerzés**: Lásd [12-jatekmenet-akciok.md](12-jatekmenet-akciok.md). Heti 3 sáv, korlátozott akciók.
   - **MOHU**: Pac-Man stílusú gyűjtögető labirintus. Üveg/műanyag palack 75–125 Ft, energiaitalos doboz 150–200 Ft. Versenytárs: hajléktalan gyűjtögető.
   - **Építkezés**: Időre menő falrakás. Sör boost: gyorsabb lerakás, de nehezebb jól lerakni (trade-off).
   - Hívás vagy magától bejövés a történet szerint.

7. **Játékhurok és események**: Lásd [13-jatek-hurok-es-esemenyek.md](13-jatek-hurok-es-esemenyek.md). Random események és kódolt intim meglepetések a bizalmi szint és flag szerint.

8. **Zene**: Lásd [14-hangulatok-es-zene.md](14-hangulatok-es-zene.md). Hangulatok és végteleníthető instrumentális loopok.

9. **Ajándékok**: Lásd [15-ajandekok.md](15-ajandekok.md). Árak, preferenciák lányonként, bizalom szerint változó szemérmetlen ajándékok.

10. **Lokalizáció**: Lásd [16-lokalizacio-es-kodolas.md](16-lokalizacio-es-kodolas.md). A motor csak kulcsokat és kódokat használ, a tényleges szöveg a lokalizációs fájlokban van.

11. **Szakaszindítás**: Lásd [17-szakaszinditas.md](17-szakaszinditas.md). A játék elején választható szakasz a megfelelő maximális értékekkel.

12. **Flag és eszkaláció**: Lásd [19-flag-es-eszkalacio.md](19-flag-es-eszkalacio.md). Flag-ek és lányonkénti eszkalációs láncok.

## Folyamatkövetés (mi van kész)

Frissítsd ezt a táblázatot, amikor valamit befejezel.

| Komponens | Állapot | Megjegyzés |
| --- | --- | --- |
| Koncepció és karakterek | Kész | 01–08 dokumentumok |
| Intim szótár (kódolt) | Kész | 06-intim-szotar.md |
| Sztorikeret + helyszínek | Kész | 07-sztori-keret.md |
| Játékmenet + végek + harag | Kész | 08-jatekmenet-es-vegkimenetek.md (részletezve) |
| 3 részes architektúra | Kész | 09-dialog-es-architektura.md |
| Vizuális stílus (pixel + manga) | Kész | 10-vizualis-stilus.md |
| Képgenerálási szabály | Kész | 11-kepgeneralasi-szabaly.md (sávok lehetőségek, intim később) |
| Akciók és pénzszerzés | Kész | 12-jatekmenet-akciok.md (MOHU Pac-Man + versenytárs, építkezés időre + sör boost) |
| Játékhurok és események | Kész | 13-jatek-hurok-es-esemenyek.md (jelenetláncokkal bővítve) |
| Hangulatok és zene | Kész | 14-hangulatok-es-zene.md (definíció, loopok) |
| Ajándékok | Kész | 15-ajandekok.md (árak, preferenciák, bizalom szerinti intim) |
| Lokalizáció és kódolás | Kész | 16-lokalizacio-es-kodolas.md (motor nem ismeri az intim tartalmat) |
| Szakaszindítás | Kész | 17-szakaszinditas.md (választható szakasz max értékekkel) |
| Megvalósítási terv | Kész | 18-megvalositasi-terv.md |
| Flag és eszkaláció | Kész | 19-flag-es-eszkalacio.md (flag-ek, lányonkénti láncok) |
| Kép- és jelenetlista | Kész | 20-kep-jelenet-lista.md |
| Turnaround referencia terv | Kész | 21-referencia-turnaround-terv.md |
| Core kód (GameState, DialogueEngine) | Kész | `src/game/engine/` — a `src/core/` váz megmaradt |
| Part1 script példa | Minta | `src/scripts/part1-kozos.ts`, a játék a katalógust használja |
| Dialógus JSON-ok (part1) | Minta | `dialogues/part1/*.json` |
| Part2 és Part3 scripte | A motorban | Part 2 csomópontok a katalógus `STORY` listájában, a vég a `evaluateEnding` |
| Teljes dialógusrendszer | Kész | Max 4 opció, very_good/good/bad/very_bad, `src/game/content/catalog.ts` |
| UI (pixel, szövegdoboz) | Kész | `src/game/ui/` — tervező, jelenet, bolt, telefon, minijáték |
| Tesztek (headless) | Kész | `npm run test:engine` — 10 teszt az útvonalra, ajándékra, végre |
| Végkifejletek implementációja | Kész | igaz, csendes, törött, páros, egyedül, botrány |
| Referenciaképek feltöltése | Részleges | arcok, teljes alak, hátterek, ikonok az `assets/` alatt |
| Zenefájlok | Kész | `music/*.mp3`, nyolc instrumentális loop, a UI a helyszínhez köti |
| Lokalizációs minta | Kész | `locales/hu.json`. A játszható katalógus magyar szöveget tárol, nem kulcsot |

## Következő lépések (javaslat)

A motor játszható. Ami még nincs kész:

1. A katalógus szövegeit kulcsokra bontani, hogy a motor csak a `locales/` fájlokat lássa.
2. Zenefájlok a 14-es dokumentum hangulataihoz.
3. A `src/core/` váz nyugdíjazása, ha már senki nem hivatkozik rá.
4. Part 2–3 jelenetek bővítése ugyanabban a katalógusban, explicit szöveg nélkül.

## Szabályok agenteknek

- Ne írj explicit szexuális szöveget a kódba vagy a dialógusfájlokba. Csak a [06-intim-szotar.md](06-intim-szotar.md) kódjait használd.
- A core logika maradjon UI-független és headless tesztelhető.
- Frissítsd a fenti folyamatkövetési táblázatot, amikor egy részt befejezel.
- Ha új mechanikát adsz hozzá, dokumentáld a megfelelő .md fájlban és itt is hivatkozd.
- A páros útvonal szabályait (Boglárka+Gréta) tartsd be.
- **Képgenerálás**: Kötelezően a [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md) és [21-referencia-turnaround-terv.md](21-referencia-turnaround-terv.md) szerint. Alap prompt + lány haj/arc/test blokk + ruházat/póz. Egy személy képenként. Képsávok lehetőségek (1. alap → 5. intim), nem kötelezőek. Intim képek csak később. Konzisztencia a kanonikus leírással. Turnaround: skálás, elől/oldal/hátul, ruhás + alsóneműs.
- **Akciók**: Heti 3 sáv, nem végtelen. Hívás vagy magától bejövés a történet szerint. Pénz: MOHU (Pac-Man, 75–125 Ft palackok, energiaital, hajléktalan versenytárs) + építkezés (időre, sör boost trade-off).
- **Események**: Random és feltételes események a [13-jatek-hurok-es-esemenyek.md](13-jatek-hurok-es-esemenyek.md) szerint. Intim meglepetések csak kódoltan, flag szerint.
- **Zene**: A [14-hangulatok-es-zene.md](14-hangulatok-es-zene.md) szerinti hangulatok és seamless loopok.
- **Ajándékok**: A [15-ajandekok.md](15-ajandekok.md) szerinti árak és preferenciák. Szemérmetlen ajándékok csak magas bizalomnál.
- **Lokalizáció**: A motor csak kulcsokat és kódokat használ ([16-lokalizacio-es-kodolas.md](16-lokalizacio-es-kodolas.md)). A tényleges szöveg a lokalizációs fájlokban van.
- **Szakaszindítás**: A játék elején választható szakasz a [17-szakaszinditas.md](17-szakaszinditas.md) szerinti maximális értékekkel.
- **Flag és eszkaláció**: A [19-flag-es-eszkalacio.md](19-flag-es-eszkalacio.md) szerinti flag-ek és láncok.

A projekt állapota: a tervezés kész, a játszható motor a `src/game/` alatt van (félév, útvonal, ajándék, végek, UI, headless tesztek). A zene és a kulcsos lokalizáció még hátra van. A részletek az [ENGINE.md](ENGINE.md) fájlban vannak.
