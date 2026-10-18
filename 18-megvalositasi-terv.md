> **Történeti dokumentum.** A redesignnal ütköző szabályokat a [Ligetvar-Redesign-Plan.md](Ligetvar-Redesign-Plan.md) és a jelenlegi [ENGINE.md](ENGINE.md) váltja fel. Karakterazonosság és asset-proveniencia megőrzendő; ez a szöveg nem aktív történetforrás. Új dialógusban legfeljebb négy kontextuális választás van, kötelező jó/rossz ranglétra nélkül.

# Megvalósítási terv — hiányzó elemek

Ez a dokumentum a teljes értékű, szexuális tartalommal dolgozó randiszimulátor hiányzó részeinek tervét és prioritását tartalmazza. A tartalom továbbra is kódoltan és lokalizáltan kezelendő.

## Prioritások

1. **Flag és eszkalációs rendszer** (alap a többihez)
2. **Intim jelenetláncok és események**
3. **Végkifejletek és páros útvonal részletei**
4. **Dialógus séma és minta dialógusok**
5. **Kép- és jelenetlista a sávokhoz**
6. **Lokalizációs kulcsok és minta szövegek**

## 1. Flag és eszkalációs rendszer

- Új dokumentum: flag-lista (pl. `flag_rebeka_kiss_light`, `flag_greta_gift_handcuff`, `flag_pair_boglarka_greta`).
- Eszkalációs tábla lányonként: melyik kód milyen flag és bizalom után jöhet.
- A GameState-be flag tárolás.

## 2. Intim jelenetláncok és események

- Lányonkénti eszkalációs lánc (pl. Rebeka: flash → kiss_light → touch → desire_fulfill).
- Hely szerinti események (tanterem, lakás, Békás-tó).
- Feltételek: bizalom, flag, ajándék, heti sáv.
- Bővítés a 13-jatek-hurok-es-esemenyek.md-hez.

## 3. Végkifejletek és páros útvonal

- Egyéni végek: desire_fulfill feltételei lányonként.
- Páros vég (Boglárka+Gréta): közös jelenetek és feltételek.
- Bővítés a 08-jatekmenet-es-vegkimenetek.md-hez.

## 4. Dialógus séma és minták

- JSON séma a dialógusokhoz (kulcs, 4 opció, hatások).
- 1–2 minta dialógus lányonként (part1, intim kódokkal).
- A lokalizációban a tényleges szöveg.

## 5. Kép- és jelenetlista

- Lányonkénti lista a sávokhoz (1–5) és a hozzátartozó kódokhoz.
- Bővítés a 11-kepgeneralasi-szabaly.md-hez vagy új dokumentum.

## 6. Lokalizációs kulcsok

- Minta `locales/hu.json` a kódokhoz.
- A motor továbbra is csak kulcsokat lát.

## Megvalósítási sorrend

1. Flag-lista és eszkalációs tábla (ez a dokumentum után).
2. Jelenetláncok és események bővítése.
3. Végkifejletek részletei.
4. Dialógus séma + minták.
5. Képlista.
6. Lokalizációs minta.

A terv a meglévő dokumentumokra épül, és a kódolt elvet tartja.
