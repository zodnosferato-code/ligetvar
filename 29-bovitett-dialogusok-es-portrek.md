# Bővített dialógusok és portréváltások (Part 1)

A Part 1 dialógusok jelentősen hosszabbak és komplexebbek lettek. A `locales/hu.json` szövegei most több mondatosak, természetesebbek, és a karakterek személyiségéhez (Rebeka gőgje, Boglárka szégyene, Gréta precizitása) illeszkednek.

## Portré / arckifejezés rendszer

A meglévő `reaction` mező a `22-arckifejezesek.md` arckifejezéseihez van kötve. A motor (vagy a UI) a `reaction` érték alapján váltja a portrét.

Példák:
- Boglárka: `szegyenos` → `elpirulas` → `kis_mosoly` → `lágy_bizalom`
- Rebeka: `semleges` / `elegedett_felmosoly` → `nyugalom` / `intenziv` / `hideg_tekintet`
- Gréta: `koncentrált` → `zavar_elpirul` → `kis_elegedett`

## Többnode-os láncok

A nagyon jó válasz (és a fotó, jegyzet, dokumentum, lakás jó válasza, illetve a csók és a villanás elfogadása) `follow_node` mezővel nyit egy reakciósort. A folytatás gomb saját `text_key`-t kap, nem a választás szövegét ismétli.

Láncok:

- Rebeka: intro, fotó, nappali fény, lakás, tanterem, villanás, csók, intimate_private, yield_control
- Boglárka: intro, jegyzet, lakás, tanterem, csók, slow_explore, body_praise
- Gréta: intro, dokumentum, lakás, tanterem, csók, rule_break, yield

A reakciósor alatt a portré színe, kerete és helyzete változik (elpirulás, hideg, meleg). Külön arclap még nincs: a `22-arckifejezesek.md` sprite-jai később cserélik a szűrőt.

## Használat

- A szövegek a `locales/hu.json`-ban vannak (hosszabb, gazdagabb).
- A node-ok és reakciók a `dialogues/part1/*.json`-ban.
- A UI a `reaction` alapján váltja a sprite-ot / portrét a `22-arckifejezesek.md` szerint.

A Part 2–3 dialógusok később ugyanebben a stílusban bővíthetők.
