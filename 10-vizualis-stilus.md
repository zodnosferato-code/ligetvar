# Vizuális stílus — Downscaled Detailed Pixel Art + japán manga

A játék **downscaled detailed pixel art** stílusú (látható pixelrács, puha többtónusú shading, manga arányok). Nem tiszta 8-bit hard-edge, nem chibi. A referenciaképek és kulcsjelenetek részletesebbek; a játékbeli sprite-ok kisebbek (64–80 px magasak). Kulcsfontosságú jelenetek magasabb kidolgozottságú képeket kaphatnak.

## Alapelvek

- **Downscaled detailed pixel art + manga**: látható pixelek, puha multi-tone shading és enyhe dithering, atmoszférikus világítás. Nincs blur, nincs anti-aliasing, nincs 3D.
- **Korlátozott de gazdag paletta**: a [04-vizualis-biblia.md](04-vizualis-biblia.md) hex színei, meleg gyertyafény + hűvös ablakfény.
- **Felnőtt arányok**: nem chibi, nem gyerekarc, nagy kifejező szemek, formás nőies test.
- **Háttér**: részletes pixeles kastélybelső (kőfal, íves ablak, fa gerenda, gyertyák).
- **POV**: jelenetek a játékos első személyű nézőpontjából.
- **Kulcsjelenetek**: magasabb részletesség, enyhe mozgásérzet (haj, ruha, kéz).

## Kastélyarchitektúra (hátterekhez)

A Ligetvár egy 19. századi magyar romantikus/neogótikus kastély, amelyet főiskolává alakítottak. Minden háttér ezt tükrözi:

- **Régi szerkezet látható**: kőfalak (szürke/barna tömör tömbök), csúcsíves íves ablakok (neogót), fagerendás mennyezet, magas termek, tornyok a külsőn, belső udvar.
- **Modern nyomok**: egyszerű modern bútorok (asztalok, székek, számítógép, lámpák, radiátorok vagy modern fűtés), de nem dominálnak. Nincs üveg-acél modern épület, nincs japán elem (pagoda, lantern-stílusú keleti).
- **Főhős terei**: irodája és lakása a kastélyban van. Iroda: modern íróasztal + kőfal + íves ablak. Lakás: kanapé/ágy + könyvek + kastélykilátás.
- **Színek**: sötét kő, meleg fa, lámpafény (sárga/narancs), esti lila-kék ablakfény. Illeszkedjen a lányok palettájához.

Hátterek generálásakor mindig hangsúlyozd: "19th century Hungarian Romantic/Neo-Gothic castle converted to college, stone walls, pointed arched windows, wooden beams, modern furniture mixed in, traces of old structure visible."

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

Kulcsjelenethez a végére: `Higher detail, slight fabric and hair movement, candle-lit classroom in a 19th century Hungarian castle, mystical healing gymnastics pose.`

A többi lány (Boglárka, Gréta) később ugyanezzel a stílussal generálható.
