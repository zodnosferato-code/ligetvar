# Vizuális stílus — Pixel grafika + japán manga

A játék pixelgrafikás, japán manga stílusú (tiszta vonalak, kemény pixelek, korlátozott paletta). A referenciaképek részletesebbek, a játékbeli sprite-ok kisebbek (64–80 px magasak). Kulcsfontosságú jelenetek magasabb kidolgozottságú „mozgó” (animált vagy több frame-es) képeket kaphatnak.

## Alapelvek

- **Pixel art + manga**: kemény pixelek, nincs blur, nincs anti-aliasing, tiszta manga vonalvezetés.
- **Korlátozott paletta**: a [04-vizualis-biblia.md](04-vizualis-biblia.md) hex színei.
- **Felnőtt arányok**: nem chibi, nem gyerekarc.
- **Zárt ruházat**: az alapruha szerény, nincs meztelenség.
- **Kulcsjelenetek**: magasabb felbontás, több részlet, enyhe mozgásérzet (haj, ruha, kéz). Ezek később animálhatók (2–4 frame).

## Rebeka Dorn referencia képek (generált)

A következő képek a kanonikus leírás alapján készültek:

1. **Teljes alak referencia** — álló, szemből, fekete midiruha, platformcsizma, szilvatincs.
2. **Arc közeli** — félmosoly, anyajegy, sötét száj, szilvatincs.
3. **Kulcsjelenet (magasabb kidolgozottság)** — tanterem, gyógytorna, enyhe mozgás a ruhán és karon, gyertyafény, manga-pixel hibrid.

Ezek a képek a helyi generálásból származnak. A repóba később feltölthetők a `references/` mappába (pl. `rebeka-full-pixel.jpg`, `rebeka-portrait-pixel.jpg`, `rebeka-scene-classroom.jpg`).

## Játékbeli megjelenés

- Háttér: 320×180 natív, egész számú nagyítás.
- Sprite: 64–80 px magas, cserélhető arc.
- Kulcsjelenetek: nagyobb, részletesebb képek vagy rövid animációk (haj lobog, ruha mozdul).
- Szövegdoboz alul, név, max 4 választás.

## Prompt sablon (Rebeka)

```text
Pixel art character reference, Japanese manga style, one adult woman, full body front view,
both feet visible, centered, standing. Crisp hard pixels, limited palette, no blur,
no anti-aliasing, no text, no watermark. Plain flat background #2c2830.
Fully clothed, modest, adult proportions, not chibi.
Rebeka Dorn, age 20. Tall 172 cm, curvy feminine hourglass, pale skin #f0d2c4.
Long straight black hair #1a1420 to the waist, one dull plum streak #6e3a52 on left side.
Sharp eyeliner, dark berry lipstick #6e2438, small beauty mark under left eye.
Modest long-sleeved high-neck black midi dress #16141c with small keyhole at collar,
silver ring choker #c9cdd4, chunky black platform boots, one silver ring.
Arrogant calm, chin slightly raised.
```

Kulcsjelenethez a végére: `Higher detail, slight fabric and hair movement, candle-lit classroom, mystical healing gymnastics pose.`

A többi lány (Boglárka, Gréta) később ugyanezzel a stílussal generálható.
