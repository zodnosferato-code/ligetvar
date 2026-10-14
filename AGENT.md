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
   - [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md) → **kötelező képgenerálási szabály** (konzisztencia, sejtető/félmeztelen, ruhaváltozás)
   - [12-jatekmenet-akciok.md](12-jatekmenet-akciok.md) → beszélgetés, hívás, pénzszerző minijátékok, korlátozott akciók
   - [13-jatek-hurok-es-esemenyek.md](13-jatek-hurok-es-esemenyek.md) → játékhurok, random események, kódolt meglepetések
   - [14-hangulatok-es-zene.md](14-hangulatok-es-zene.md) → hangulatok és végteleníthető instrumentális zene

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

5. **Képgenerálás**: Mindig a [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md) szerint. Alap prompt + lány haj/arc/test blokk + ruházat/póz utasítás. Egy lány képenként. Sejtető és félmeztelen képek megengedettek a bizalmi szint szerint. Ruhadarabok változhatnak vagy lekerülhetnek, pozíciók változhatnak. Ha eltér a kanontól, újra generáld.

6. **Akciók és pénzszerzés**: Lásd [12-jatekmenet-akciok.md](12-jatekmenet-akciok.md). Heti 3 sáv, korlátozott akciók. MOHU palack (50 Ft) és építkezés minijáték. Hívás vagy magától bejövés.

7. **Játékhurok és események**: Lásd [13-jatek-hurok-es-esemenyek.md](13-jatek-hurok-es-esemenyek.md). Random események és kódolt intim meglepetések a bizalmi szint szerint.

8. **Zene**: Lásd [14-hangulatok-es-zene.md](14-hangulatok-es-zene.md). Hangulatok és végteleníthető instrumentális loopok.

## Folyamatkövetés (mi van kész)

Frissítsd ezt a táblázatot, amikor valamit befejezel.

| Komponens | Állapot | Megjegyzés |
| --- | --- | --- |
| Koncepció és karakterek | Kész | 01–08 dokumentumok |
| Intim szótár (kódolt) | Kész | 06-intim-szotar.md |
| Sztorikeret + helyszínek | Kész | 07-sztori-keret.md |
| Játékmenet + végek + harag | Kész | 08-jatekmenet-es-vegkimenetek.md |
| 3 részes architektúra | Kész | 09-dialog-es-architektura.md |
| Vizuális stílus (pixel + manga) | Kész | 10-vizualis-stilus.md |
| Képgenerálási szabály | Kész | 11-kepgeneralasi-szabaly.md (sejtető, félmeztelen, pózíciók) |
| Akciók és pénzszerzés | Kész | 12-jatekmenet-akciok.md (MOHU, építkezés, hívás) |
| Játékhurok és események | Kész | 13-jatek-hurok-es-esemenyek.md (random, kódolt meglepetések) |
| Hangulatok és zene | Kész | 14-hangulatok-es-zene.md (definíció, loopok) |
| Core kód (GameState, DialogueEngine) | Alap kész | src/core/ — headless |
| Part1 script példa | Alap kész | src/scripts/part1-kozos.ts |
| Dialógus JSON-ok (part1) | Nincs | dialogues/part1/*.json |
| Part2 és Part3 scripte | Nincs | src/scripts/ |
| Teljes dialógusrendszer | Nincs | JSON + motor összekötés |
| UI (pixel, szövegdoboz) | Nincs | Későbbi fázis |
| Tesztek (headless) | Alap kész | src/tests/dialogue.test.ts |
| Végkifejletek implementációja | Nincs | part3 |
| Referenciaképek feltöltése | Részleges | Rebeka generálva, még nem a repóban |
| Zenefájlok | Nincs | Definíció kész, generálás később |

## Következő lépések (javaslat)

1. Dialógus JSON séma és part1 dialógusok megírása a három lánynak (max 4 opció, very_good/good/bad/very_bad).
2. DialogueEngine összekötése a JSON-okkal.
3. Part2 és Part3 scripte alapjának elkészítése.
4. Bővített headless tesztek a végkimenetekre és a páros útvonalra.
5. Rebeka generált képeinek feltöltése a references/ mappába, majd Boglárka és Gréta generálása a szabály szerint.
6. Minijátékok (MOHU, építkezés) egyszerű implementációja.
7. EventSystem alapjának megírása a random és feltételes eseményekhez.
8. Zenefájlok generálása vagy beszerzése a definíció szerint.
9. Csak ezután UI.

## Szabályok agenteknek

- Ne írj explicit szexuális szöveget a kódba vagy a dialógusfájlokba. Csak a [06-intim-szotar.md](06-intim-szotar.md) kódjait használd.
- A core logika maradjon UI-független és headless tesztelhető.
- Frissítsd a fenti folyamatkövetési táblázatot, amikor egy részt befejezel.
- Ha új mechanikát adsz hozzá, dokumentáld a megfelelő .md fájlban és itt is hivatkozd.
- A páros útvonal szabályait (Boglárka+Gréta) tartsd be.
- **Képgenerálás**: Kötelezően a [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md) szerint. Alap prompt + lány haj/arc/test blokk + ruházat/póz. Egy személy képenként. Sejtető és félmeztelen képek, ruhadarabok lekerülése és pozícióváltás megengedett a bizalmi szint szerint. Konzisztencia a kanonikus leírással.
- **Akciók**: Heti 3 sáv, nem végtelen. Hívás vagy magától bejövés a történet szerint. Pénz: MOHU 50 Ft üveg + építkezés minijáték.
- **Események**: Random és feltételes események a [13-jatek-hurok-es-esemenyek.md](13-jatek-hurok-es-esemenyek.md) szerint. Intim meglepetések csak kódoltan.
- **Zene**: A [14-hangulatok-es-zene.md](14-hangulatok-es-zene.md) szerinti hangulatok és seamless loopok.

A projekt állapota: tervezés kész, core kód alapjai készek, képgenerálási szabály, akciórendszer, játékhurok és zene definíció dokumentálva, Rebeka vizuális referenciák generálva, dialógusok és a 3 rész teljes implementációja még hátra van.
