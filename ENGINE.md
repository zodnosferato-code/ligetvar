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
| UI | `src/game/ui/` | Iroda és lakosztály, jelenet, Polc, telefon, MOHU runner, kérdőív |
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

## Látható szabályok

Ezek a tervezőn és a Polcon ki vannak írva. A teszt is ezeket várja.

| Szabály | Mit csinál | Hol látszik |
| --- | --- | --- |
| Ismétlés | Az első beszélgetés ad pontot, a második feleannyit, a harmadik már nem. Bizalmat csak új jelenet nagyon jó válasza ad. | Tervező, 1–8. hét |
| Pihenő | Négy kemény sáv (látogatás, munka, minijáték, randi) után csak a fotel nyílik. A hétfő egyet enged. | Tervező, ha a fáradtság 3 vagy 4 |
| Műszak | Randi és a Polc zárva, amíg egy MOHU-kör vagy egy kérdőív le nem ment. A látogatás nem vár erre. | Tervező a 9. héttől, Polc |
| Közös szakasz | 2. héttől a saját helyén (fotó, jegyzet, dokumentum). Lakás bizalom 2-től. 7–8. héten bizalom 3-nál a mélyebb jelenet. A 9. héttől ezek zárnak. | A látogatás jelenete |
| Zárás | 8. hét vége. Közelség 30, bizalom 2, kockázat 80 alatt. Enélkül a 9. hét utáni mély jelenetek nem jönnek. | Útvonalzár |
| Mély jelenet | 9. héttől a zárt útvonalon, 11. héttől a teljes jelenetek, 14. héttől a vágy beteljesítése, ha a bizalom 4 és a közelség 55. | A saját helye vagy a lakosztály |

A lány arca alatt a fázisa áll: ismeretlen, bemutatkozott, melegszik, magán, közeli, jelölt, útvonal, beteljesült, törés.

Az intim lépcső flag-ekben él (`hatar`, `flag_desire_fulfill`). A párbeszéd nem tartalmaz explicit szöveget.

## Amit a motor szándékosan nem tárol külön

A fázis, a jelöltség és a végkimenetel mind számított. Új jelenet a katalógus `STORY` listájába kerül, új szabály a `logic.ts`-be, teszt a `logic.test.ts`-be.
