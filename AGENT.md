# AGENT.md — Ligetvár projekt útmutató

> **Redesign authority (18 October 2026):** [Ligetvar-Redesign-Plan.md](Ligetvar-Redesign-Plan.md) governs new story, art, and engine work. Its section 10 defines cleanup, engine prerequisites, the 16-week activity budget, and completion gates. Conflicting rules below describe the legacy version, not requirements for the redesign. The redesigned runtime is not yet implemented; [ENGINE.md](ENGINE.md) documents the current engine. Keep at most four choices, but replace the mandatory good/bad ranking ladder with contextual choices when implementing redesigned scenes.

Ez a fájl későbbi agenteknek (vagy fejlesztőknek) szól. A cél, hogy a fonalat fel lehessen venni és a munkát folytatni lehessen anélkül, hogy mindent újra kelljen kitalálni.

## Képek forrása

- **GitHub a kanonikus forrás**. Minden kép a `assets/` alatt él a repóban. Innen tölt az engine és minden agent.
- **Google Drive csak archívum**. Nem forrás, nem használható generáláshoz vagy játékhoz. Új képet először a repóba kell commitolni.

Egy 16 hetes, pixelgrafikás randiszimulátor webes játék (később Tauri csomagolással). A játékos egy 34 éves tanár (Márton Kelényi), aki fakultatív misztikus gyógytornát tart a Ligetvári Főiskolán. Három felnőtt hallgatónő (Rebeka 20, Boglárka 19, Gréta 21) rejtett vágyaival kell közelebb kerülni. A téma a meghódítás és a vágyak beteljesítése. **A szexuális tartalom fontos, a beszélgetések és a képi illusztrációk szexik.**

**Fontos**: Az intim/szexuális tartalom a kódbázisban **csak kódolt formában** szerepelhet (lásd [06-intim-szotar.md](06-intim-szotar.md)). A build agent és az automatikus folyamatok nem láthatnak explicit szöveget. A jelentést csak ez a dokumentum és a tervezői jegyzetek ismerik. A dialógusok és a 30-as dokumentum azonban explicit tartalmat tartalmaznak a játék céljának megfelelően.

## Hogyan kell tervezni és írni

1. **Olvasd el a dokumentumokat sorrendben**:
   - [01-mufaj.md](01-mufaj.md) → műfaj
   - [02-koncepcio.md](02-koncepcio.md) → keret, statok, végek
   - [03-karakterek.md](03-karakterek.md) → karakterlapok (bővített, szexuális fókusz)
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
   - [21-referencia-turnaround-terv.md](21-referencia-turnaround-terv.md) → turnaround modell sheet-ek és animált sprite alapok
   - [30-bovitett-sztori-es-intim-jelenetek.md](30-bovitett-sztori-es-intim-jelenetek.md) → explicit sztori és intim jelenetek

2. **Írási szabályok**:
   - Minden dialógusban maximum 4 választás.
   - Minden dialógusban legyen nagyon jó / jó / rossz / nagyon rossz opció.
   - Az intim témák csak a szótár kódjait használják (`act_flash`, `desire_yield_control` stb.), de a lokalizáció explicit.
   - A kód UI nélkül headless tesztelhető legyen.
   - Moduláris, újrahasznosítható core logika.

A többi rész változatlan. A folyamatkövetés: Karakterek és dialógusok szexuális fókusszal bővítve (03, dialogues/part1, locales/hu.json, 30-as doc).
