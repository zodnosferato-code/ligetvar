## Képforrás szabály (kanonikus)

- **Egyetlen hivatalos forrás**: minden referencia, jelenet, háttér, ikon és karakterkép a **GitHub repóban** (`assets/`) él. Ez az egyetlen hely, ahonnan az engine, az agentek és a játék képeket tölt.
- **Drive csak archívum**: a Google Drive mappák (pl. „Ligetvár Character References Full”, „Ligetvár Scene Backgrounds”) csak biztonsági másolatot / archívumot jelentenek. Nem forrás, nem szinkronizálódik vissza, és nem használható generáláshoz vagy játékhoz.
- Új képet **először** a repóba kell commitolni (`assets/references/`, `assets/backgrounds/`, `assets/characters/` stb.). Drive-ra csak utólag, kézi archívumként másolható.
- Minden generálás és image-to-image művelet a repóban lévő képeket és a dokumentációt használja alapként.

## Kötelező stílus

- **Downscaled detailed pixel art + japán manga**: látható pixelrács, puha multi-tone shading és enyhe dithering, atmoszférikus világítás. Nem hard 8-bit, nem chibi, nincs blur, nincs anti-aliasing, nincs 3D. (Részletek: [04-vizualis-biblia.md](04-vizualis-biblia.md) zárt sablonja.)
- **Korlátozott de gazdag paletta**: a [04-vizualis-biblia.md](04-vizualis-biblia.md) hex színei.
- **Felnőtt arányok**: nem chibi, nem gyerekarc, nagy kifejező szemek, formás nőies test.
- **Egy személy képenként**: soha ne generálj két lányt egy képen.
- **Háttér**: referenciánál lapos `#2c2830`. Játékbeli jeleneteknél részletes pixeles kastélybelső (kőfal, íves ablak, fa gerenda, gyertyák, meleg fény).
- **POV**: jelenetek a játékos első személyű nézőpontjából (karakter a néző felé, játékos teste nem látszik).
- **Magasságskála**: 0–180 cm a referencia képeken, a lány pontos magasságát mutatja a fej tetején.
- **Teljes test**: ruhás és alsóneműs modell-lapok szemből, oldalról, hátulról (lásd 23-as dokumentum).

## Képek lehetőségei (sávok az előrehaladás szerint)

Az alábbi sávok **lehetőségek**, nem általános kötelező szabályok. A történések és a bizalmi szint előrehaladtával ezek a képtípusok elérhetővé válhatnak. Az intim képek csak később, ha a játékos eléri a megfelelő szintet.

| Sáv | Bizalom / hét (lehetőség) | Képtípus (lehetőség) | Példa |
| --- | --- | --- | --- |
| 1. Alap | 0–1, 1–4. hét | Teljes alapruha, szerény, mindennapi | Álló referencia, tanterem |
| 2. Sejtető | 2, 5–8. hét | Ruhadarabok lazítva, enyhe kivágás | Gallér nyitva, kardigán lecsúszva |
| 3. Közepes intim | 3, 9–12. hét | Részleges ruhalevétel, sejtető póz | Felső lazítva, harisnya, ülő póz |
| 4. Félmeztelen | 4, 13–15. hét | Egyes ruhadarabok le, fehérnemű | Felső le, melltartó, fekvő póz |
| 5. Intim | 5, 16. hét / vég | Magasabb szintű, privát | Pozícióváltás, vágykódok szerint |

Ezek a lehetőségek a játékos döntéseitől és a bizalmi szinttől függenek. Nem minden útvonalon jelenik meg minden sáv. Az intim képek (4–5. sáv) csak akkor elérhetők, ha a történet és a bizalom engedi. A kódban kódolt flag-ekkel hivatkozottak.

## Ruházat és intimitás fokozatai (lehetőségek)

A ruházat és a meztelenség a bizalmi szint és a jelenet szerint változhat (lehetőségként):

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
Adult proportions, not a child, not chibi. Accurate height scale 0-180 cm showing exact height.
```

Ezután jön a lány specifikus blokkja, majd a ruházat/póz/intimitás utasítás.

## Lányonkénti blokkok (kanonikus — haj, arc, test)

A haj, arcjel és testalkat **mindig** ez marad. A ruha változhat. Részletes teljes test leírás: [23-teljes-test-referencia.md](23-teljes-test-referencia.md).

**Rebeka Dorn**
```text
Rebeka Dorn, age 20. Tall, exactly 175 cm, curvy feminine hourglass, pale skin #f0d2c4.
Long straight black hair #1a1420 to the waist, one dull plum streak #6e3a52
on her left side. Sharp eyeliner, dark berry lipstick #6e2438, small beauty
mark under her left eye. Thin old scar on the right side of her abdomen
(just above the waistline), which she is ashamed of and usually covers.
Silver ring choker #c9cdd4, one silver ring.
```

**Boglárka Fazekas**
```text
Boglarka Fazekas, age 19. Short, exactly 150 cm, relatively fuller build with larger bust
(bra two sizes larger), soft round face and shoulders, freckles #c48462, no glasses.
Light brown hair #8a5a3a in a loose braid over her right shoulder.
```

**Gréta Váradi**
```text
Greta Varadi, age 21. Slim, exactly 168 cm, copper-red hair #c4542a in a high ponytail
with a few loose strands. Thin rectangular glasses
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
2. A haj, arcjel és testalkat soha nem változhat. Rebeka 175 cm és sebhelye, Boglárka 150 cm-es teltebb alkata kanonikus.
3. Ruhadarabok csak akkor kerülnek le, ha a jelenet (bizalmi szint és lehetőség) kifejezetten kéri.
4. Ha a generált kép eltér a kanontól (rossz haj, szemüveg Boglárkán stb.), újra kell generálni.
5. Referenciaképek a `references/` mappába kerülnek, lehetőségenként csoportosítva.
6. Magasságskála mindig 0–180 cm, pontosan a lány magasságát mutatja.
7. Teljes test referenciák a [23-teljes-test-referencia.md](23-teljes-test-referencia.md) szerint.

## Játékbeli felhasználás

- 1–2. sáv: mindennapi és korai jelenetek lehetőségei.
- 3. sáv: közepes intim lehetőségek, 9. héttől.
- 4–5. sáv: félmeztelen és intim képek lehetőségei csak magas bizalomnál és privát helyeken.
- Kulcsjelenetek: magasabb kidolgozottság, enyhe mozgásérzet, később 2–4 frame animáció.

Minden agentnek ezt a dokumentumot kell követnie képgeneráláskor. Az intim témák a kódban továbbra is a [06-intim-szotar.md](06-intim-szotar.md) kódjait használják. A sávok lehetőségek, nem kötelező szabályok.

## Játékos POV és jelenetleírás

Minden játékbeli jelenet a **játékos (Márton) első személyű nézőpontjából** van. A képgeneráló eszközöknek ezt figyelembe kell venniük:

- Első személyű nézet: a kamera a játékos szeme.
- A karakter a néző felé néz vagy a néző irányába fordul.
- A játékos teste, keze, ruhája **nem látszik** a képen (kivéve ha explicit interakció, pl. kézfogás, de akkor is csak a kéz részlete).
- A háttér és a környezet a játékos szemszögéből látható.
- A jelenet leírásában mindig szerepeljen a helyszín részletes leírása (kastély stílus, világítás, bútorok, ablakok stb.).

### Részletes karakter vizuális blokk (AI konzisztenciához)

A karakterleírásoknak elég részletesnek kell lenniük ahhoz, hogy egy képgeneráló AI ugyanazt a karaktert konzisztensen reprodukálja több képen is. Használd a zárt stílus-sablont + a pontos arc/test blokkot minden alkalommal.

**Rebeka Dorn kiegészítő részletek:**
- Szemszín: sötétbarna/fekete, éles eyeliner.
- Orr: egyenes, keskeny.
- Ajak: telt, sötét bogyószínű rúzs.
- Bőr: sápadt, sima, #f0d2c4.
- Test: 175 cm, óraüveg, hangsúlyos derék, formás fenék, közepes mell.

**Boglárka Fazekas kiegészítő részletek:**
- Szemszín: barna, nagy, gyakran lefelé néz.
- Orr: kicsi, szeplős.
- Ajak: természetes, puha rózsaszín.
- Bőr: világos, szeplős orron és arcon, #f5e0d0 környéke.
- Test: 150 cm, puha nőies formák, nagyobb formás mellbőség, formás csípő, **nem túlsúlyos**, vonzó saját módján (cukor, aranyos, puha).

**Gréta Váradi kiegészítő részletek:**
- Szemszín: zöldesbarna, téglalap szemüveg mögött.
- Orr: egyenes, halvány szeplős.
- Ajak: vékony, természetes szín.
- Bőr: világos, #f2d5c0 környéke.
- Test: 168 cm, karcsú sportos, formás kisebb mellek, hosszú lábak, feszes fenék.
- Haj: rézvörös magas lófarok, **nincs ceruza a hajban**.

## Helyszín részletes leírás (minden jelenethez)

Minden jelenet promptjába be kell építeni a helyszín részletes leírását:

- **Kastély általános**: 19. századi magyar romantikus/neo-gótikus kastély, kőfalak, hegyes íves ablakok, fagerendák, modern bútorok keveredve a régi struktúrával. Meleg lámpafény, esti lila-kék ablakfény.
- **Tanterem**: fa padok, tábla, íves ablakok, gyertyafény vagy lámpa.
- **Könyvtár**: magas fapolcok, olvasóasztalok, íves ablakok, csendes, meleg fény.
- **Lakás/iroda**: modern íróasztal + kőfal + íves ablak, kanapé/ágy, könyvek, kastélykilátás.
- **Holdkör / udvar**: esti kastélyudvar vagy alagsor, gyertyák, kőfalak.

A jelenetek leírásánál mindig pontosítsd a világítást, a bútorokat, a karakter ruháját és pózát, valamint a játékos POV-t.


## Jelenetképek mint alap (kötelező)

Az `assets/backgrounds/` mappában lévő előre elkészített jelenetképek az alapok. Minden képgeneráló AI-nak ezeket kell használnia bázisként:

- `classroom.jpg` — tanterem, nagy asztal/pad az előtérben, közel a kamerához
- `library.jpg` — könyvtár, kanapé/olvasóhely az előtérben
- `apartment.jpg` — lakás/hálószoba, ágy az előtérben, közel a kamerához
- `department.jpg` — tanszék/iroda, kanapé/szék az előtérben
- `courtyard.jpg` — udvar/Holdkör, pad az előtérben

**Szabályok a jelenetekhez:**
- A jelenetképek üresek (nincs karakter).
- Mindig legyen egy világosan azonosítható ülő- vagy fekvőhely az előtérben, közel a kamerához (asztal, pad, ágy, kanapé, pad).
- A karaktereket ezekre a helyekre kell elhelyezni (ülő, fekvő, vagy álló közvetlenül mögöttük).
- Jövőbeli szexuális / intim jeleneteket ezekre az alapokra kell rajzolni / kompozitálni (a nő az ülő- vagy fekvőhelyen, közel a kamerához, játékos POV-ból).
- A stílus a zárt downscaled detailed pixel art sablon marad.
- Játékos POV: első személy, karakter a néző felé vagy a néző irányába, játékos teste nem látszik.

Generáláskor mindig hivatkozz a megfelelő background fájlra mint bázisra, és tartsd meg a közeli ülő/fekvő helyet.
