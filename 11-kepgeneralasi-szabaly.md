# Képgenerálási szabály

Ez a dokumentum biztosítja, hogy minden generált kép konzisztens maradjon. Minden későbbi generálás (agent vagy kézi) ezt a szabályt követi.

## Kötelező stílus

- **Pixel art + japán manga**: kemény pixelek, nincs blur, nincs anti-aliasing, tiszta manga vonalvezetés.
- **Korlátozott paletta**: a [04-vizualis-biblia.md](04-vizualis-biblia.md) hex színei.
- **Felnőtt arányok**: nem chibi, nem gyerekarc, nem nagy fej.
- **Egy személy képenként**: soha ne generálj két lányt egy képen.
- **Háttér**: lapos `#2c2830` referenciánál. Játékbeli hátterek külön készülnek.

## Képek sávokba sorolása (előrehaladás szerint)

A képek a történések és a bizalmi szint előrehaladásával sávokba vannak sorolva. Az intim képek csak később jelennek meg.

| Sáv | Bizalom / hét | Képtípus | Példa |
| --- | --- | --- | --- |
| 1. Alap | 0–1, 1–4. hét | Teljes alapruha, szerény, mindennapi | Álló referencia, tanterem |
| 2. Sejtető | 2, 5–8. hét | Ruhadarabok lazítva, enyhe kivágás | Gallér nyitva, kardigán lecsúszva |
| 3. Közepes intim | 3, 9–12. hét | Részleges ruhalevétel, sejtető póz | Felső lazítva, harisnya, ülő póz |
| 4. Félmeztelen | 4, 13–15. hét | Egyes ruhadarabok le, fehérnemű | Felső le, melltartó, fekvő póz |
| 5. Intim | 5, 16. hét / vég | Magasabb szintű, privát | Pozícióváltás, vágykódok szerint |

Az intim képek (4–5. sáv) csak akkor jelennek meg a játékban, ha a bizalmi szint és a történet engedi. A kódban kódolt flag-ekkel hivatkozottak.

## Ruházat és intimitás fokozatai

A ruházat és a meztelenség a bizalmi szint és a jelenet szerint változhat:

| Szint | Leírás | Példa |
| --- | --- | --- |
| Alap | Teljes alapruha, szerény, zárt | Mindennapi megjelenés |
| Sejtető | Ruhadarabok lazítva, kivágások, áttetsző részek, de még fedett | Gallér nyitva, szoknya feljebb, kardigán lecsúszva |
| Félmeztelen | Egyes ruhadarabok lekerültek (felső, szoknya, harisnya), fehérnemű vagy részleges meztelenség | Felső le, melltartó, vagy deréktól felfelé meztelen |
| Intim | Magasabb szintű, a vágykódok szerint (kódoltan) | Privát jelenetek, pózícióváltások |

Ruhadarabok **változhatnak vagy lekerülhetnek**. Pozíciók változhatnak (álló, ülő, fekvő, mozgásban).

## Alap prompt (minden kép elején)

```text
Pixel art character reference, Japanese manga style, one adult woman, full body,
both feet visible if standing, centered. Crisp hard pixels, limited palette, no blur,
no anti-aliasing, no text, no watermark, no second person. Plain flat background #2c2830.
Adult proportions, not a child, not chibi.
```

Ezután jön a lány specifikus blokkja, majd a ruházat/póz/intimitás utasítás.

## Lányonkénti blokkok (kanonikus — haj, arc, test)

A haj, arcjel és testalkat **mindig** ez marad. A ruha változhat.

**Rebeka Dorn**
```text
Rebeka Dorn, age 20. Tall, 172 cm, curvy feminine hourglass, pale skin #f0d2c4.
Long straight black hair #1a1420 to the waist, one dull plum streak #6e3a52
on her left side. Sharp eyeliner, dark berry lipstick #6e2438, small beauty
mark under her left eye. Silver ring choker #c9cdd4, one silver ring.
```

**Boglárka Fazekas**
```text
Boglarka Fazekas, age 19. Short, 158 cm, chubby soft round build, round face,
freckles #c48462, no glasses. Light brown hair #8a5a3a in a loose braid over her right shoulder.
```

**Gréta Váradi**
```text
Greta Varadi, age 21. Slim, 168 cm, copper-red hair #c4542a in a high ponytail
with a yellow pencil #e2b84a stuck through the hair tie. Thin rectangular glasses
#2a2e33, light freckles across the nose, fair skin #f6d7c4.
```

## Ruházat és póz utasítások (a blokk után)

- **Alapruha**: az eredeti leírás a [04-vizualis-biblia.md](04-vizualis-biblia.md)-ből.
- **Sejtető**: `Suggestive clothing: [konkrét ruhadarab lazítva vagy kivágva], still mostly covered.`
- **Félmeztelen**: `Half-nude: [konkrét ruhadarab removed], [fehérnemű or partial], modest pose.`
- **Pozíció**: `Pose: standing / sitting on edge / lying on side / slight movement.`
- **Kulcsjelenet**: `Higher detail, slight fabric and hair movement, [helyszín].`

## Konzisztencia szabályok

1. Mindig az alap prompt + a lány haj/arc/test blokkja + ruházat/póz utasítás.
2. A haj, arcjel és testalkat soha nem változhat.
3. Ruhadarabok csak akkor kerülnek le, ha a jelenet (bizalmi szint és sáv) kifejezetten kéri.
4. Ha a generált kép eltér a kanontól (rossz haj, szemüveg Boglárkán stb.), újra kell generálni.
5. Referenciaképek a `references/` mappába kerülnek, sávonként csoportosítva.

## Játékbeli felhasználás

- 1–2. sáv: mindennapi és korai jelenetek.
- 3. sáv: közepes intim, 9. héttől.
- 4–5. sáv: félmeztelen és intim képek csak magas bizalomnál és privát helyeken.
- Kulcsjelenetek: magasabb kidolgozottság, enyhe mozgásérzet, később 2–4 frame animáció.

Minden agentnek ezt a dokumentumot kell követnie képgeneráláskor. Az intim témák a kódban továbbra is a [06-intim-szotar.md](06-intim-szotar.md) kódjait használják.
