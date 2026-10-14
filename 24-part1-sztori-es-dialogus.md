# Part 1 — Közös szakasz (1–8. hét)

A játék első fele. Mindhárom lány elérhető. A cél: bemutatkozás, bizalomépítés, egyéni feladatok indítása, korai intim lehetőségek, és a 8. hét végi útvonalválasztás előkészítése. A dialógusok a `dialogues/part1/` JSON-okban, a szövegek a `locales/hu.json`-ban.

## Heti vázlat

### 1–2. hét — Bemutatkozás
- **Tanterem (gyógytorna):** Mindhárom lány jelen van. Rebeka dokumentál, Boglárka jegyzetel, Gréta jelenlétit vezet.
- **Saját helyek:** Rebeka Holdkör (este), Boglárka könyvtár (délután), Gréta tanszék (délelőtt).
- Bemutatkozó dialógusok → `rebeka_kor`, `boglarka_margo`, `greta_lista` jelzők lehetségesek.
- Összefonódás: a tanteremben Gréta megkéri Boglárkát a jelenléti aláírásra; Rebeka megjegyzi, hogy Boglárka margója „nem teljesen haszontalan”.

### 3–4. hét — Korai ismétlések és feladatok
- Ismételhető beszélgetések a saját helyeken (`rebeka_nappali_feny`, `boglarka_repeat_konyvtar`, `greta_repeat_lista`).
- Egyéni feladat indítása: Rebeka fotóanyag, Boglárka kutatási jegyzet, Gréta admin dokumentum.
- Korai `act_flash` lehetséges a tanteremben (bizalom 1+).
- Összefonódás: egy délutáni sávban Boglárka és Gréta egyszerre a tanteremben; a játékos választása mindkettőre hat (pl. türelmes válasz Boglárkának → Gréta észreveszi a pontosságot). Új közös tantermi node-ok (`*_tanterem_kozos`).

### 5–6. hét — Lakáslátogatások és mélyülés
- Az egyéni feladatok a tanár lakásába vezetnek (esti vagy délutáni sáv).
- Privát beszélgetések: Rebeka a fotó szimbolikájáról, Boglárka a folklórról, Gréta a dokumentumokról.
- `act_kiss_light` lehetséges privát helyen (bizalom 2+).
- Összefonódás: a lakáson egy lány után a másik jön (véletlen vagy feltételes); a játékosnak óvatosan kell kezelnie a helyzetet (kockázat, ha összekeveri őket).

### 7–8. hét — Útvonalzár előkészítése
- Mélyebb beszélgetések (`*_het8_elokeszites`), ajándékok hatása.
- Lehetőség a `par_oszinte` kimondására (Boglárka + Gréta esetében).
- 8. hét vége: döntés — egy lány, pár, vagy senki. A kívül maradt lányok háttérbe húzódnak. Útvonalválasztó node (`dialogue.route.choice`).
- Összefonódás: egy közös tantermi jelenet, ahol a játékos válasza láthatóan hat mindháromra (pl. határ-mondat előkészítése).

## Lányonkénti dialógusívek (Part 1)

### Rebeka
1. Intro (Holdkör / tanterem) → `rebeka_kor`
2. Fotódokumentáció kérdései
3. Korai ismételhető (nappali fény) → `rebeka_feny`
4. Lakáslátogatás (szimbolika) → `rebeka_foto`
5. Közös tantermi reakció
6. Korai flash / enyhe csók lehetőség
7. 7–8. hét útvonalzár előkészítés → `rebeka_route_candidate`

### Boglárka
1. Intro (könyvtár) → `boglarka_margo`
2. Jegyzetek és folklór
3. Korai ismételhető (könyvtár)
4. Lakáslátogatás (kutatási anyag)
5. Közös tantermi reakció
6. Lassú közeledés, testérzékenység óvatos kezelése
7. 7–8. hét útvonalzár előkészítés → `boglarka_route_candidate`

### Gréta
1. Intro (admin hiba) → `greta_lista`
2. Dokumentumok pontosítása
3. Korai ismételhető (lista)
4. Lakáslátogatás (iratátadás) → `greta_hiba`
5. Közös tantermi reakció
6. „Nem vizsga” / szabály beszélgetés előkészítése
7. 7–8. hét útvonalzár előkészítés → `greta_route_candidate`

## Összefonódási pontok

- **Tanterem közös:** Minden hét gyógytornáján mindhárom jelen van. Új `*_tanterem_kozos` node-ok. A játékos választása (pl. türelmes vs. siető) mindháromra enyhe hatást gyakorol.
- **Boglárka + Gréta:** Külön sávok, de a tanteremben vagy a folyosón összefuthatnak. Ha a játékos mindkettővel jól bánik, nő a páros lehetőség.
- **Rebeka + mások:** Rebeka ritkán észreveszi Boglárkát; ha a játékos dicséri Boglárka munkáját Rebeka előtt, Rebeka hidegebben reagál.
- **Kockázat:** Ha a játékos más előtt említi az egyik lányt, nő a pletyka-kockázat.

## Játszhatóság félkész állapotban

- A `dialogues/part1/*.json` fájlok 7–8 node-ot tartalmaznak lányonként (intro, ismételhető, feladat, lakás, közös tanterem, intim, 7–8. hét).
- A `part1-kozos.ts` a node-okat sorrendben vagy flag / fázis alapján futtathatja (`GirlStateMachine`).
- A lokalizáció (`locales/hu.json`) tartalmazza az összes szöveget, beleértve az útvonalválasztót.
- A 8. hét végén egy egyszerű választó dialógus (egy lány / Boglárka+Gréta pár / senki) zárja a részt (`dialogue.route.*`).
- A Part 2 és 3 később jön; a félkész játék a közös szakasz végéig játszható, és a választás mentésre kerül.

A részletes dialógusnode-ok a JSON fájlokban, a szövegek a lokalizációban vannak. Az állapotgép fázisai (`introduced` → `warming` → `private` → `intimate_early` → `route_candidate`) a dialógusok hatásaiból természetesen előrehaladnak.
