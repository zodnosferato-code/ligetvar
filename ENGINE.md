# Játékmotor

A játszható motor a `src/game/` alatt van. A korábbi `src/core/` váz megmarad, de a félév szabályait ez a motor futtatja. A logika UI nélkül, headless tesztelhető.

```bash
node --experimental-strip-types --test src/game/engine/logic.test.ts
```

## Rétegek

| Réteg | Fájl | Szerep |
| --- | --- | --- |
| Állapot | `src/game/engine/types.ts` | 16 hét, 3 sáv, pénz, energia, jelenlét, éleslátás, nyugalom, kockázat, lányonként közelség / bizalom / harag / flag |
| Szabályok | `src/game/engine/logic.ts` | Sáv, dialógus, ismétlés, ajándék, útvonalzár, hétváltás, végek |
| Tartalom | `src/game/content/catalog.ts` | Csomópontok, történetesemények, ajándékok, akciók. Max 4 választás. |
| UI | `src/game/ui/` | Tervező, jelenet, Polc, telefon, MOHU, építkezés |
| Mentés | `src/game/store.ts` | `localStorage`, kulcs `ligetvar-save-v1` |

A lány fázisa (`unknown` → `fulfilled`) nem tárolt mező. A `girlPhase()` a számokból, a flag-ekből, a hétből és az útvonalból számolja, a `25-allapotgep.md` szerint.

## Hurok

1. Tervező: a napszak akciói (látogatás, munka, stat, minijáték, randi).
2. Jelenet: max 4 választás, hatás, debug delta a `lastNote` mezőben.
3. Ismételt beszélgetés: az első ad pontot, a második feleannyit, a harmadik már nem.
4. Este, a harmadik sáv után: gyógytorna-jelenet, ha a harag engedi.
5. Hét vége: összefoglaló, majd hétfőn +60 000 Ft, energia, a heti számlálók nullázása.
6. 8. hét zárása: egyedül, egy lány, vagy járható pár. Rebeka + Boglárka nem zárható, és ha párként mondod, Boglárka bizalma kettővel esik.
7. 16. hét: igaz, csendes, törött, páros, távol, egyedül vagy botrány.

Az intim lépcső flag-ekben él (`hatar`, `flag_desire_fulfill`). A párbeszéd nem tartalmaz explicit szöveget.

## Amit a motor szándékosan nem tárol külön

A fázis, a jelöltség és a végkimenetel mind számított. Új jelenet a katalógus `STORY` listájába kerül, új szabály a `logic.ts`-be, teszt a `logic.test.ts`-be.
