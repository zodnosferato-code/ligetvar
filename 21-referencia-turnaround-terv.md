# Referencia turnaround és modell sheet terv

Ez a dokumentum a későbbi konzisztens sprite-generáláshoz és animációhoz szükséges referencia képek tervét tartalmazza. A cél: minden lány ugyanabban a pózban, előlről, oldalról és hátulról, ruhában és alsóneműben (anatomy reference), hogy később image-to-image vagy prompt-only generálás is konzisztens legyen.

A meglévő [04-vizualis-biblia.md](04-vizualis-biblia.md), [10-vizualis-stilus.md](10-vizualis-stilus.md) és [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md) szabályai érvényesek. A haj, arcjel és testalkat soha nem változhat.

## Követelmények

- **Ugyanaz a póz**: neutral A-pose (karok enyhén el a testtől), álló, mindkét láb látszik.
- **Nézetek**: elől (front), oldal (profile), hátul (back).
- **Ruházat**:
  - Teljes alapruha (kanonikus).
  - Alsónemű (bra + panties) modell sheet célból, nem szexuális póz. (Teljes meztelenség generálása a jelenlegi eszközökkel korlátozott, ezért ez a praktikus alternatíva.)
- **Stílus**: kemény pixel, manga vonal, korlátozott paletta, lapos #2c2830 háttér, nincs blur, anti-aliasing, szöveg.
- **Egy lány képenként**.

## Generálási sorrend és használat

1. **Alap front ruhás** — ez a fő horgony. Ha jó, használd referenciaként (image prompt vagy leírás) a többi nézethez.
2. **Front alsóneműs** — anatomy lock.
3. **Oldal és hátul ruhás**, majd alsóneműs.
4. **Sprite alapok**: a front ruhásból kisebb, játékméretű (64–80 px magas) idle frame. Ebből később 2–4 frame-es animáció (enyhe haj/ruha mozgás, légzés).

### Prompt sablon (turnaround)

```text
Pixel art character reference sheet, Japanese manga style, one adult woman age [age],
full body [front/side/back] view standing in neutral A-pose (arms slightly away),
both feet visible, centered. Flat dark background #2c2830. Crisp hard pixels, limited palette, no blur,
no anti-aliasing, no text, no watermark, no second person.
[Fully clothed modest / Wearing only simple neutral undergarments (bra and panties)
for anatomical reference, modest non-sexual pose.]
[Girl specific block from 04/11]
```

A lány blokkok a [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md)-ből.

## Fájl elnevezés javaslat (references/turnaround/)

- `rebeka-front-clothed.png`
- `rebeka-front-underwear.png`
- `rebeka-side-clothed.png`
- `rebeka-back-clothed.png`
- És ugyanígy boglarka-*, greta-*.
- Sprite: `rebeka-idle-front.png` stb.

## Animált sprite terv

- Alap: 1 frame idle (front, ruhás).
- Bővítés: 2–4 frame (enyhe súlyáthelyezés, haj lobogás, ruha redő).
- Későbbi expressziók: a [04-vizualis-biblia.md](04-vizualis-biblia.md) listája szerint, ugyanabból a promptból csak az utolsó mondat cserélődik.
- Kulcsjelenetek: magasabb részletesség, a sávok szerint ([20-kep-jelenet-lista.md](20-kep-jelenet-lista.md)).

## Referencia képek felhasználása később

- Image-to-image vagy reference strength magas a turnaround képekkel, hogy a testarány, haj és arcjel megmaradjon.
- Új pózoknál: „Same person, same hair, same face marks, same body proportions as reference. Change only pose/clothing as specified.”
- Ha eltér a kanontól (rossz magasság, szemüveg Boglárkán stb.), újra kell generálni.

A generált példák (front ruhás, oldal, hátul, alsóneműs) a jelenlegi munkamenetben készültek, és a `references/turnaround/` mappába tölthetők fel később. A teljes meztelen verzió helyett az alsóneműs modell sheet ajánlott a praktikus konzisztencia miatt.

Frissítsd az [AGENT.md](AGENT.md) folyamatkövetést, ha a képek feltöltésre kerülnek.
