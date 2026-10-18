> **Történeti dokumentum.** A redesignnal ütköző szabályokat a [Ligetvar-Redesign-Plan.md](Ligetvar-Redesign-Plan.md) és a jelenlegi [ENGINE.md](ENGINE.md) váltja fel. Karakterazonosság és asset-proveniencia megőrzendő; ez a szöveg nem aktív történetforrás. Új dialógusban legfeljebb négy kontextuális választás van, kötelező jó/rossz ranglétra nélkül.

# Ikonok és gombok — definíció és generálási terv

Minden ikon és gomb a játékban **előre legenerált kép** (pixel art, a 04-vizualis-biblia.md stílusában). Nincs futásidejű rajzolás, nincs SVG, nincs betűtípus-alapú ikon — minden vizuális elem egy kész, rácsos pixelgrafika, amit a 11-kepgeneralasi-szabaly.md szerint generálunk.

## Stílus-sablon (minden ikonhoz)

```text
Pixel art, Japanese manga style, hard crisp pixels, limited flat colors from the
canonical palette (#2c2830 dark background, #f0d2c4 skin, #6e2438 berry, #c4542a copper,
#8a5a3a brown, #c9cdd4 silver, #16141c black), clean lineart, no blur, no anti-aliasing,
no soft shading, no 3D, no realistic rendering, no text, no watermark.
```

## Méretek

- **Kis ikon** (UI, lista, státusz): 16×16 px
- **Közepes ikon** (gomb, akció): 32×32 px
- **Nagy ikon** (kiemelt elem, ajándék részlet): 48×48 px
- Minden méret egész számú nagyítással jelenik meg a telefonon (portré, 1×/2×/3×).

## Főképernyő (hub) — tárgyak a háttérben

A főképernyő (lakosztály vagy tanszéki iroda) **nem** véletlenszerűen elhelyezett ikonokat használ. A háttérképbe belerajzolt tárgyak maguk a kattintható gombok. Minden tárgyhoz tartozik egy dedikált ikon, amely hover/fókusz/nyitott állapotban jelenik meg.

| Hotspot | Háttérben lévő tárgy | Dedikált ikon | Akciócsoport |
| --- | --- | --- | --- |
| `door` | Faajtó (bal fal) | `icon_door` | Kilépés / helyválasztás |
| `book` | Nyitott könyv / jegyzet | `icon_book` | Tanulás, feladat |
| `rest` | Fotel / szék | `icon_chair` | Pihenés |
| `bag` | Zsák / táska | `icon_bottles` | Pénzszerző / csomag |
| `phone` | Régi telefon | `icon_phone` | Hívás |
| `shelf` | Könyvespolc / irattartó | `icon_shelf` | Bolt / ajándék |

- A tárgyak a háttérkép részét képezik (pixel art, ugyanaz a stílus).
- A hotspot átlátszó réteg a tárgy fölött; alapból láthatatlan, hover/fókusz/nyitott állapotban mutatja a dedikált ikont és keretet.
- A menü (ha több akció tartozik a tárgyhoz) a dedikált akcióikonokat használja.
- Nincs véletlenszerű ikonelhelyezés a háttér fölött.

## Ikoncsoportok

### 1. Akcióikonok (a 12-jatekmenet-akciok.md akcióihoz)

| Kulcs | Leírás | Méret |
| --- | --- | --- |
| `icon_talk` | Beszélgetés / hívás — száj vagy telefon | 32×32 |
| `icon_gift` | Ajándék átadása — doboz masnival | 32×32 |
| `icon_call` | Telefonhívás — kagyló | 32×32 |
| `icon_money_bottle` | MOHU palackgyűjtés — üvegpalack | 32×32 |
| `icon_money_build` | Építkezés — tégla | 32×32 |
| `icon_money_paper` | Iratrendezés / korrektúra — iratköteg | 32×32 |
| `icon_study` | Tanulás / olvasás — könyv | 32×32 |
| `icon_rest` | Pihenés — ágy vagy pohár tea | 32×32 |
| `icon_date` | Randihely (9. héttől) — szív vagy csillag | 32×32 |
| `icon_gym` | Gyógytorna — nyújtás póz | 32×32 |
| `icon_task` | Egyéni feladat — jegyzetfüzet ceruzával | 32×32 |

### 2. Státuszikonok (a 02-koncepcio.md statjaihoz)

| Kulcs | Leírás | Méret |
| --- | --- | --- |
| `icon_stat_presence` | Jelenlét — szem vagy fénykör | 16×16 |
| `icon_stat_insight` | Éleslátás — szemüveg vagy nagyító | 16×16 |
| `icon_stat_calm` | Nyugalom — lehulló levél vagy csendes tó | 16×16 |
| `icon_stat_money` | Pénz — forint érme | 16×16 |
| `icon_stat_energy` | Energia / sáv — villám vagy óra | 16×16 |
| `icon_stat_anger` | Harag — szikra vagy vörös jelzés | 16×16 |

### 3. Hely ikonok (a 07-sztori-keret.md helyszíneihez)

| Kulcs | Leírás | Méret |
| --- | --- | --- |
| `icon_place_classroom` | Tanterem — asztal székkel | 32×32 |
| `icon_place_apartment` | Lakás — ajtó vagy ablak | 32×32 |
| `icon_place_library` | Könyvtár — polc könyvekkel | 32×32 |
| `icon_place_courtyard` | Udvar / park — fa | 32×32 |
| `icon_place_lake` | Békás-tó — béka vagy tópart | 32×32 |
| `icon_place_city` | Város / bolt — épület | 32×32 |
| `icon_place_holdkor` | Holdkör — kör szimbólum | 32×32 |

### 4. Ajándékikonok (a 15-ajandekok.md listájához)

Minden ajándéknak saját ikonja van, 32×32-es méretben. A kódolt kulcs egyezik az ajándék azonosítójával:

| Kulcs | Leírás |
| --- | --- |
| `gift_book` | Klasszikus könyv |
| `gift_tea` | Tea válogatás — doboz teával |
| `gift_pen` | Toll / jegyzetfüzet |
| `gift_headphones` | Fülhallgató |
| `gift_candle` | Gyertya szett |
| `gift_scarf` | Fekete sál |
| `gift_flowers` | Virágcsokor |
| `gift_chocolate` | Csoki tábla |
| `gift_perfume` | Parfüm — flakon |
| `gift_silk` | Selyem kendő |
| `gift_stockings` | Csipke harisnya |
| `gift_earrings` | Csüngő fülbevaló |
| `gift_underwear_cotton` | Szerény pamut fehérnemű |
| `gift_underwear_lace_black` | Fekete csipke fehérnemű |
| `gift_underwear_red` | Piros merész fehérnemű |
| `gift_handcuffs` | Puha bőr bilincs |
| `gift_mask` | Szemfedő / maszk |
| `gift_collar` | Diszkrét nyakörv |
| `gift_oil` | Testolaj / masszázs olaj |

Megjegyzés: az intim ajándékok ikonjai diszkréten ábrázolják a tárgyat (doboz, csomagolás, sziluett), nem a tartalmat — a 06-intim-szotar.md kódjai maradnak a tartalom hivatkozásai.

### 5. UI gombok és elemek

| Kulcs | Leírás | Méret |
| --- | --- | --- |
| `btn_choice` | Választás gomb háttér — 9-slice keret | 32×32 |
| `btn_choice_hover` | Választás gomb, aktív/hover állapot | 32×32 |
| `btn_back` | Vissza gomb — nyíl | 32×32 |
| `btn_menu` | Menü gomb — három vonal | 32×32 |
| `btn_close` | Bezárás — X | 32×32 |
| `ui_dialogue_box` | Szövegdoboz keret — 9-slice | 64×32 |
| `ui_panel` | Panel háttér — 9-slice | 64×32 |
| `ui_divider` | Elválasztó vonal | 32×8 |
| `ui_heart_full` | Szív, teli (bizalom/közelség) | 16×16 |
| `ui_heart_empty` | Szív, üres | 16×16 |
| `ui_star` | Csillag (kiemelés, újdonság) | 16×16 |
| `ui_flag` | Flag jelzés | 16×16 |
| `ui_lock` | Zár (nem elérhető elem) | 16×16 |
| `ui_check` | Pipás jelölés (teljesült feladat) | 16×16 |

### 6. Minijáték elemek

| Kulcs | Leírás | Méret |
| --- | --- | --- |
| `mj_pacman` | MOHU játékos sprite | 16×16 |
| `mj_ghost` | Versenytárs (hajléktalan gyűjtő) | 16×16 |
| `mj_bottle_glass` | Üveg palack tárgy | 16×16 |
| `mj_bottle_plastic` | Műanyag palack tárgy | 16×16 |
| `mj_bottle_energy` | Energiaitalos doboz tárgy | 16×16 |
| `mj_powerup` | Power-up — csillag | 16×16 |
| `mj_brick` | Építkezés tégla | 16×16 |
| `mj_wall_good` | Jól lerakott fal szegmens | 16×16 |
| `mj_wall_bad` | Rosszul lerakott fal szegmens | 16×16 |
| `mj_beer` | Sörösüveg (boost) | 16×16 |

## Generálási sorrend

1. **Először a stílus-sablon tesztje**: 3–4 ikon generálása (pl. `icon_talk`, `icon_gift`, `ui_heart_full`), hogy a paletta és a vonalvezetés stimmeljen.
2. **Utána az akcióikonok** — ezek a leggyakrabban láthatók.
3. **Státuszikonok és hely ikonok**.
4. **Ajándékikonok** — a 15-ajandekok.md lista szerint, az intim ajándékok diszkréten.
5. **UI elemek** — 9-slice keretekhez a sarkok és élek külön generálandók.
6. **Minijáték elemek** — utoljára, mert a játékmenetük még változhat.

## Fájlnevek és mappa

- Mappa: `assets/icons/`
- Fájlnév: `<kulcs>.png` (pl. `icon_talk.png`)
- Minden ikonhoz opcionálisan egy `<kulcs>.txt` generálási prompt fájl a reprodukálhatóságért.

## Szabályok

- Minden ikon a 04-vizualis-biblia.md kanonikus blokkjával indul.
- Nincs szöveg az ikonon (a felirat a lokalizációból jön, lásd 16-lokalizacio-es-kodolas.md).
- Az intim ajándékok ikonjai tárgyakat ábrázolnak, nem tartalmat.
- 9-slice elemeknél a sarkok, élek és közép külön generálandók, hogy a méretezés tiszta maradjon.

Kapcsolódó dokumentumok: [04-vizualis-biblia.md](04-vizualis-biblia.md), [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md), [12-jatekmenet-akciok.md](12-jatekmenet-akciok.md), [15-ajandekok.md](15-ajandekok.md), [26-jelenet-felallitas.md](26-jelenet-felallitas.md).