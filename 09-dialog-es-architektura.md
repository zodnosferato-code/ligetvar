# Dialógusrendszer és architektúra

A játék 3 részre bontva. Minden részhez külön script és lányonként külön párbeszédek. A kód moduláris, UI nélkül headless tesztelhető, újrahasznosítható.

## A 3 rész

| Rész | Hetek | Script | Leírás |
| --- | --- | --- | --- |
| 1. Közös szakasz | 1–8 | `scripts/part1-kozos.ts` | Mindhárom lány elérhető. Bemutatkozás, ismételhető beszélgetések, egyéni feladatok, korai intim aktusok. |
| 2. Zárt útvonal | 9–15 | `scripts/part2-utvonal.ts` | Csak a kiválasztott lány (vagy pár). Kulcsjelenetek, mélyebb intim témák. |
| 3. Vég | 16 | `scripts/part3-veg.ts` | Igaz / csendes / tört / páros / egyedül végkimenetel. |

Minden rész külön dialógusfájlokat használ lányonként:
- `dialogues/part1/rebeka.json`
- `dialogues/part1/boglarka.json`
- `dialogues/part1/greta.json`
- És ugyanez a part2 és part3 mappákban.

## Párbeszéd opciók

Egyszerre maximum **4 választási lehetőség**.

Minden párbeszédben legyen:
- **Nagyon jó** (very_good) — erős pozitív hatás a közelségre / bizalomra, esetleg jelzőt ad.
- **Jó** (good) — enyhe pozitív.
- **Rossz** (bad) — enyhe negatív, harag növekedhet.
- **Nagyon rossz** (very_bad) — erős negatív, harag +1 vagy több, kockázat nőhet.

A választások hatása a lány értékeire (közelség, bizalom, harag, kockázat, jelzők) a dialógusdefinícióban van megadva.

## Debug

A játék debug módban a sarokban kiírja a lány aktuális reakcióját és az értékváltozást (pl. „Rebeka: közelség +4, harag 0”).

## Kódarchitektúra (headless tesztelhető)

A core logika UI nélkül futtatható és tesztelhető.

```
src/
  core/
    GameState.ts      // közelség, bizalom, harag, kockázat, jelzők
    DialogueEngine.ts // max 4 opció, hatások alkalmazása
    PartRunner.ts     // a 3 rész futtatása
  dialogues/          // JSON dialógusok
  scripts/            // part1, part2, part3
  tests/              // headless unit és integrációs tesztek
```

### Alapelvek
- **Moduláris**: a DialogueEngine és GameState független a UI-tól.
- **Újrahasznosítható**: ugyanaz a motor mindhárom részhez.
- **Jól tesztelhető**: headless futtatás, mock dialógusokkal, assert az értékváltozásokra.
- A UI később csak a DialogueEngine kimenetét jeleníti meg.

A intim témák továbbra is a [06-intim-szotar.md](06-intim-szotar.md) kódjait használják.
