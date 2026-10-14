# Ligetvár — tervezési dokumentumok

> **Agenteknek**: Olvasd el először az [AGENT.md](AGENT.md) fájlt. Ott van a fő cél, a folyamatkövetés (mi van kész), és az útmutató a folytatáshoz.

Munkacím: **Ligetvár**. Egy féléves, pixelgrafikás randiszimulátor. Webes játék, később Tauri-héjjal Windowsra és Linuxra csomagolva. A tervezés ebben a mappában van. A játszható motor a [ENGINE.md](ENGINE.md) szerint a `src/game/` alatt él.

A választható szereplők felnőttek. A főiskola 18 éves kortól vesz fel hallgatót. A három lány 19, 20 és 21 éves. A játék romantikus. A téma a lányok meghódítása és a rejtett vágyaik beteljesítése. Az intim témák a [06-intim-szotar.md](06-intim-szotar.md) kódjaival vannak jelölve, hogy a build agent a kódbázison dolgozhasson anélkül, hogy explicit tartalommal kellene foglalkoznia.

## Futtatás és deploy

```bash
npm install
npm run dev          # helyi fejlesztés (Vite)
npm run build        # production build → dist/
npm run test:engine  # headless motor tesztek (Node 22+)
```

**GitHub Pages**: A `.github/workflows/deploy-pages.yml` automatikusan deployolja a `main` ágat. A repó Settings → Pages → Source: **GitHub Actions** kell legyen.

**Tesztek**: A `.github/workflows/test.yml` minden push/PR-n futtatja a `npm run test:engine` parancsot.

| Dokumentum | Miről szól |
| --- | --- |
| [AGENT.md](AGENT.md) | Projekt útmutató, fő cél, folyamatkövetés, szabályok későbbi agenteknek |
| [01-mufaj.md](01-mufaj.md) | Hogyan működik egy alap randiszimulátor, és miben más, mint egy visual novel |
| [02-koncepcio.md](02-koncepcio.md) | Ligetvár köre, statjai, féléve, végkifejletei |
| [03-karakterek.md](03-karakterek.md) | A főhős és a három lány karakterlapja |
| [04-vizualis-biblia.md](04-vizualis-biblia.md) | Pixelstílus, paletta, és a prompt, amivel később ugyanazok maradnak |
| [05-rendszerek.md](05-rendszerek.md) | Tizenhat hetes félév, páros útvonal, pénz, online ajándék, bizalmi érintés, későbbi randihelyek |
| [06-intim-szotar.md](06-intim-szotar.md) | Intim témák kódolt szótára (build-agent kompatibilis) |
| [07-sztori-keret.md](07-sztori-keret.md) | Misztikus gyógytorna, közös munka okai, közeledési útok, helyszínek |
| [08-jatekmenet-es-vegkimenetek.md](08-jatekmenet-es-vegkimenetek.md) | Játékmenet, sztorifolyás, végkimenetek, páros útvonal, ajándék és harag rendszer |
| [09-dialog-es-architektura.md](09-dialog-es-architektura.md) | 3 részes struktúra, dialógusrendszer (max 4 opció), moduláris headless kód |
| [10-vizualis-stilus.md](10-vizualis-stilus.md) | Pixel + japán manga stílus, kulcsjelenetek |
| [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md) | Kötelező képgenerálási szabály a konzisztencia érdekében |
| [12-jatekmenet-akciok.md](12-jatekmenet-akciok.md) | Beszélgetés, hívás, pénzszerző minijátékok (MOHU runner, kérdőív), korlátozott akciók |
| [13-jatek-hurok-es-esemenyek.md](13-jatek-hurok-es-esemenyek.md) | Játékhurok, eseménytípusok, random események, kódolt intim meglepetések |
| [14-hangulatok-es-zene.md](14-hangulatok-es-zene.md) | Hangulatok és végteleníthető instrumentális zene |
| [15-ajandekok.md](15-ajandekok.md) | Ajándékok, árak, preferenciák, bizalom szerinti szemérmetlen ajándékok |
| [16-lokalizacio-es-kodolas.md](16-lokalizacio-es-kodolas.md) | Lokalizáció és kódolt hivatkozás: a motor nem ismeri az intim tartalmat |
| [17-szakaszinditas.md](17-szakaszinditas.md) | Szakaszindítás a játék elején a megfelelő maximális értékekkel |
| [18-megvalositasi-terv.md](18-megvalositasi-terv.md) | Hiányzó elemek megvalósítási terve |
| [19-flag-es-eszkalacio.md](19-flag-es-eszkalacio.md) | Flag-lista és intim eszkalációs tábla |
| [20-kep-jelenet-lista.md](20-kep-jelenet-lista.md) | Kép- és jelenetlista a sávokhoz és kódokhoz |
| [21-referencia-turnaround-terv.md](21-referencia-turnaround-terv.md) | Skálás turnaround modell sheet-ek (elől/oldal/hátul, ruhás + alsóneműs) és animált sprite alapok |
| [22-arckifejezesek.md](22-arckifejezesek.md) | Cserélhető arcok leírása lányonként |
| [23-teljes-test-referencia.md](23-teljes-test-referencia.md) | Teljes test referencia képek terve |
| [24-part1-sztori-es-dialogus.md](24-part1-sztori-es-dialogus.md) | Part 1 sztori és dialógus vázlat |
| [25-allapotgep.md](25-allapotgep.md) | Lány állapotgép (unknown → route_candidate) |
| [26-jelenet-felallitas.md](26-jelenet-felallitas.md) | Jelenetfelállítás, kamera-perspektíva, telefonos megjelenítés |
| [27-ikonok-es-gombok.md](27-ikonok-es-gombok.md) | Ikonok és gombok definíciója — mind előre legenerált pixel kép |
| [28-kiegeszitok.md](28-kiegeszitok.md) | Kiegészítők (könyv, nyaklánc, ceruza stb.) — nem karakter-részek |
| [29-bovitett-dialogusok-es-portrek.md](29-bovitett-dialogusok-es-portrek.md) | Bővített dialógusok és portréváltások |

A képek (sprite-ok, ikonok, jelenetek) a ground up-ból lesznek generálva a [04-vizualis-biblia.md](04-vizualis-biblia.md), [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md), [27-ikonok-es-gombok.md](27-ikonok-es-gombok.md) és [28-kiegeszitok.md](28-kiegeszitok.md) alapján.

## Kód

A játszható, headless motor a `src/game/engine/` alatt van. Futtatás Node 22-vel:

```bash
npm run test:engine
```

A felület a `src/game/ui/` alatt van (Vite + React). A párbeszédek a `src/game/content/catalog.ts` katalógusban vannak, a `dialogues/part1/` és a `locales/hu.json` minta marad.

Részletek: [ENGINE.md](ENGINE.md).
