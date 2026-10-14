# Kiegészítők — vizuális definíció

A lányok alap karakteréhez tartozó ruházat és testjegyek a [03-karakterek.md](03-karakterek.md)-ben és a [04-vizualis-biblia.md](04-vizualis-biblia.md)-ben vannak rögzítve. Ez a dokumentum a **nem karakter-rész kiegészítőket** határozza meg: olyan tárgyakat, amiket hordhatnak vagy náluk lehetnek, de nem kötelező részük a sziluettnek vagy az alap megjelenésnek.

Ezek a kiegészítők:
- Változatosságot adnak a képeknek (jelenetek, hangulat, ajándékok).
- Nem változtatják meg a kanonikus arcot, hajszínt, alapruhát vagy testarányokat.
- A képgeneráláskor opcionálisan hozzáadhatók a prompt végéhez (lásd [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md)).
- A játékban flag-ekkel vagy jelenet-típusokkal kapcsolhatók (pl. ajándék átvétele után, vagy egy adott helyszínen).

## Általános szabályok

- Maximum 1–2 kiegészítő egy képen, hogy ne terhelje túl a pixel sprite-ot.
- A kiegészítő soha nem takarja el az arcot vagy a fő testarányokat.
- Színek a [04-vizualis-biblia.md](04-vizualis-biblia.md) palettájából.
- Nem cseréli le az alapruhát; csak kiegészíti.

## Rebeka Dorn

| Kiegészítő | Leírás | Mikor / miért |
| --- | --- | --- |
| Ezüst karika-nyakék | Vékony ezüst gyűrű a nyakon | Alap, de cserélhető finomabb vagy sötétebb változatra |
| Fekete töltőtoll | Vékony, fekete toll a kezében vagy a zsebben | Fotódokumentáció jeleneteknél |
| Éjszakai fotófüzet | Kis fekete notesz | Holdkör vagy lakásjeleneteknél |
| Vékony ezüst gyűrű | Egy gyűrű a jobb kezén | Alap, ajándékként cserélhető |
| Sötét gyertya | Kis gyertya a kezében | Holdkör jeleneteknél |
| Fekete sál | Laza sál a nyakán | Hidegebb időjárás vagy ajándék |

## Boglárka Fazekas

| Kiegészítő | Leírás | Mikor / miért |
| --- | --- | --- |
| Keménytáblás könyv | Csukott vagy nyitott könyv a kezében | Alap (könyvtár, tanterem), mindig nála lehet |
| Puha borítós regény | Vékonyebb könyv | Ajándék vagy olvasásjelenet |
| Tea csésze | Egyszerű csésze a kezében | Lakás vagy pihenés |
| Könyvjelző | Vékony szalag a könyvben | Jegyzetelés jeleneteknél |
| Túl nagy kardigán | Mohazöld, a vállán vagy a karján | Alap, de lecsúsztatható vagy lazább |
| Szeplős bőr hangsúly | Természetes, nem extra | Arc közeli képeken |

## Gréta Váradi

| Kiegészítő | Leírás | Mikor / miért |
| --- | --- | --- |
| Sárga ceruza | A hajgumóban vagy a kezében | Alap (demonstrátor), mindig nála lehet |
| Jó notesz | Téglalap alakú, rendezett | Admin / dokumentum jelenetek |
| Ceruzabél + idézett cikk | Kis papírdarab | Pontosítás jelenetek |
| Téglalap szemüveg | Vékony, sötét keret | Alap, de levethető rövid időre |
| Üres belépőkártya | Nyakpánton | Tanszék jelenetek |
| Fülhallgató | Nyakban vagy a fülén | Ajándék vagy munka közben |

## Használat a generálásban

A képgenerálási prompt végére opcionálisan:

```text
Optional accessory: [leírás a táblázatból], held or worn naturally, not obscuring face or body proportions.
```

Példa Rebekához Holdkör jelenethez:
```text
Optional accessory: thin silver ring choker and a small black notebook in her hand.
```

## Kapcsolódó dokumentumok

- [03-karakterek.md](03-karakterek.md) — alap karakterlapok
- [04-vizualis-biblia.md](04-vizualis-biblia.md) — stílus és arcok
- [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md) — generálási sablon
- [15-ajandekok.md](15-ajandekok.md) — ajándékok, amelyek kiegészítőként megjelenhetnek
- [27-ikonok-es-gombok.md](27-ikonok-es-gombok.md) — ikonok a kiegészítőkhöz
