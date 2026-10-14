# Bővített dialógusok és portréváltások (Part 1)

A Part 1 dialógusok jelentősen hosszabbak és komplexebbek lettek. A `locales/hu.json` szövegei most több mondatosak, természetesebbek, és a karakterek személyiségéhez (Rebeka gőgje, Boglárka szégyene, Gréta precizitása) illeszkednek.

## Portré / arckifejezés rendszer

A meglévő `reaction` mező a `22-arckifejezesek.md` arckifejezéseihez van kötve. A motor (vagy a UI) a `reaction` érték alapján váltja a portrét.

Példák:
- Boglárka: `szegyenos` → `elpirulas` → `kis_mosoly` → `lágy_bizalom`
- Rebeka: `semleges` / `elegedett_felmosoly` → `nyugalom` / `intenziv` / `hideg_tekintet`
- Gréta: `koncentrált` → `zavar_elpirul` → `kis_elegedett`

## Többnode-os láncok

A JSON-okba bekerültek köztes reakció node-ok (pl. `*_intro_vg_react`). A choice-okban `follow_node` mező jelzi a következő node-ot (a motorban a meglévő `follow` vagy hasonló mechanizmussal köthető).

Ez lehetővé teszi, hogy a portra a beszélgetés közben változzon (pl. szégyenlős → elpirulás a jó válaszra).

## Használat

- A szövegek a `locales/hu.json`-ban vannak (hosszabb, gazdagabb).
- A node-ok és reakciók a `dialogues/part1/*.json`-ban.
- A UI a `reaction` alapján váltja a sprite-ot / portrét a `22-arckifejezesek.md` szerint.

A Part 2–3 dialógusok később ugyanebben a stílusban bővíthetők.
