# Ligetvár — tervezési dokumentumok

> **Agenteknek**: Olvasd el először az [AGENT.md](AGENT.md) fájlt. Ott van a fő cél, a folyamatkövetés (mi van kész), és az útmutató a folytatáshoz.

Munkacím: **Ligetvár**. Egy féléves, pixelgrafikás randiszimulátor. Webes játék, később Tauri-héjjal Windowsra és Linuxra csomagolva. Ez a mappa csak tervezés. Játékkód még nincs.

A választható szereplők felnőttek. A főiskola 18 éves kortól vesz fel hallgatót. A három lány 19, 20 és 21 éves. A játék romantikus. A téma a lányok meghódítása és a rejtett vágyaik beteljesítése. Az intim témák a [06-intim-szotar.md](06-intim-szotar.md) kódjaival vannak jelölve, hogy a build agent a kódbázison dolgozhasson anélkül, hogy explicit tartalommal kellene foglalkoznia.

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
| [10-vizualis-stilus.md](10-vizualis-stilus.md) | Pixel + japán manga stílus, Rebeka referencia képek, kulcsjelenetek |
| [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md) | Kötelező képgenerálási szabály a konzisztencia érdekében |
| [12-jatekmenet-akciok.md](12-jatekmenet-akciok.md) | Beszélgetés, hívás, pénzszerző minijátékok (MOHU, építkezés), korlátozott akciók |
| [13-jatek-hurok-es-esemenyek.md](13-jatek-hurok-es-esemenyek.md) | Játékhurok, eseménytípusok, random események, kódolt intim meglepetések |
| [14-hangulatok-es-zene.md](14-hangulatok-es-zene.md) | Hangulatok és végteleníthető instrumentális zene |
| [15-ajandekok.md](15-ajandekok.md) | Ajándékok, árak, preferenciák, bizalom szerinti szemérmetlen ajándékok |
| [16-lokalizacio-es-kodolas.md](16-lokalizacio-es-kodolas.md) | Lokalizáció és kódolt hivatkozás: a motor nem ismeri az intim tartalmat |
| [17-szakaszinditas.md](17-szakaszinditas.md) | Szakaszindítás a játék elején a megfelelő maximális értékekkel |
| [18-megvalositasi-terv.md](18-megvalositasi-terv.md) | Hiányzó elemek megvalósítási terve |
| [19-flag-es-eszkalacio.md](19-flag-es-eszkalacio.md) | Flag-lista és intim eszkalációs tábla |

Referenciaképek:

- [references/rebeka-dorn.jpg](references/rebeka-dorn.jpg)
- [references/boglarka-fazekas.jpg](references/boglarka-fazekas.jpg)
- [references/greta-varadi.jpg](references/greta-varadi.jpg)

A képek azonossági horgonyok (arc, haj, ruha, testalkat). A végleges játékbeli sprite-ok szigorúbb, rácsos pixelgrafikák lesznek, ezekről a lapokról. A kanonikus leírás a képpel együtt érvényes: ha a kép és a szöveg ütközik, a [04-vizualis-biblia.md](04-vizualis-biblia.md) „Eltérések” része mondja meg, melyik nyer.

## Kód

A core logika a `src/` mappában van. UI nélkül headless tesztelhető (`npm test`).
