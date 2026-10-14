# Képgenerálási szabály

Ez a dokumentum biztosítja, hogy minden generált kép konzisztens maradjon. Minden későbbi generálás (agent vagy kézi) ezt a szabályt követi.

## Kötelező stílus

- **Pixel art + japán manga**: kemény pixelek, nincs blur, nincs anti-aliasing, tiszta manga vonalvezetés.
- **Korlátozott paletta**: a [04-vizualis-biblia.md](04-vizualis-biblia.md) hex színei.
- **Felnőtt arányok**: nem chibi, nem gyerekarc, nem nagy fej.
- **Zárt, szerény ruházat**: nincs meztelenség, nincs fehérnemű, nincs dekoltázs.
- **Háttér**: lapos `#2c2830` referenciánál. Játékbeli hátterek külön készülnek.
- **Egy személy képenként**: soha ne generálj két lányt egy képen.

## Alap prompt (minden kép elején)

```text
Pixel art character reference, Japanese manga style, one adult woman, full body front view,
both feet visible, centered, standing. Crisp hard pixels, limited palette, no blur,
no anti-aliasing, no text, no watermark, no second person. Plain flat background #2c2830.
Fully clothed, modest, adult proportions, not a child, not chibi.
```

Ezután jön a lány specifikus blokkja a [04-vizualis-biblia.md](04-vizualis-biblia.md)-ből, majd a különbség (arckifejezés, póz, helyszín).

## Lányonkénti blokkok (kanonikus)

**Rebeka Dorn**
```text
Rebeka Dorn, age 20. Tall, 172 cm, curvy feminine hourglass, pale skin #f0d2c4.
Long straight black hair #1a1420 to the waist, one dull plum streak #6e3a52
on her left side. Sharp eyeliner, dark berry lipstick #6e2438, small beauty
mark under her left eye. Modest long-sleeved high-neck black midi dress #16141c
with only a small keyhole at the collar, silver ring choker #c9cdd4, long black
skirt, chunky black platform boots, one silver ring. Arrogant calm, chin slightly raised.
```

**Boglárka Fazekas**
```text
Boglarka Fazekas, age 19. Short, 158 cm, chubby soft round build, round face,
freckles #c48462, no glasses, no eyewear. Light brown hair #8a5a3a in a loose
braid over her right shoulder. Shy expression, eyes slightly lowered, face visible.
Oversized moss-green cardigan #5e7a58, cream high-neck dress #f4ead8 to mid-calf,
dark tights, brown canvas shoes #6b5344, both arms holding a closed hardcover
book #6a3a32 against her chest.
```

**Gréta Váradi**
```text
Greta Varadi, age 21. Slim, 168 cm, copper-red hair #c4542a in a high ponytail
with a yellow pencil #e2b84a stuck through the hair tie. Thin rectangular glasses
#2a2e33, light freckles across the nose, fair skin #f6d7c4, focused neutral mouth.
White button shirt #f7f4ee, dark forest-green knit vest #1f4a3a, charcoal
knee-length skirt #3a3e46, dark tights, simple black flats, short lanyard
with a blank ID card.
```

## Konzisztencia szabályok

1. Mindig az alap prompt + a lány teljes blokkja + csak a különbség a végén.
2. A haj, arcjel, testalkat és alapruha nem változhat, hacsak a jelenet kifejezetten nem kéri a ruha cseréjét.
3. Kulcsjelenetekhez: `Higher detail, slight fabric and hair movement, [helyszín], [póz].`
4. Ha a generált kép eltér a kanontól (pl. szemüveg Boglárkán, rossz hajszín), újra kell generálni, nem a leírást igazítani.
5. Referenciaképek a `references/` mappába kerülnek, és a [04-vizualis-biblia.md](04-vizualis-biblia.md) és [10-vizualis-stilus.md](10-vizualis-stilus.md) hivatkozik rájuk.

## Játékbeli felhasználás

- Referencia képek: részletes pixel-manga.
- Játékbeli sprite: 64–80 px magas, ugyanabból a promptból, csak kisebb.
- Kulcsjelenetek: magasabb kidolgozottság, enyhe mozgásérzet, később 2–4 frame animáció.

Minden agentnek ezt a dokumentumot kell követnie képgeneráláskor.
