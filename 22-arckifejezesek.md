# Arckifejezések — Animációhoz

Minden lánynak van egy alap arckifejezés-listája. Minden kifejezésnek van legalább egy alváltozata (pl. aranyos / pajkos / szomorkás). Ezek a sprite-okhoz és a dialógus-arckifejezésekhez használhatók.

A stílus a [04-vizualis-biblia.md](04-vizualis-biblia.md) zárt sablonját követi.

## Rebeka Dorn

| Alap kifejezés | Alváltozatok | Mikor használjuk |
| --- | --- | --- |
| Semleges gőg | hideg, enyhén gúnyos | Alap, tanterem, Holdkör |
| Félmosoly | pajkos, elégedett | Jó válasz, fotó dicsérete |
| Unalom | fáradt, elutasító | Rossz válasz, átlagosnak látják |
| Düh (csendes) | sértett, hideg düh | Hencegés, sebhely említése |
| Meglepetés | enyhe, zavarba jött | Váratlan jó mondat |
| Őszinte zavar | lesütött szem, festék nélkül | Nappali fény, sebhely elfogadása |
| Nyugalom | lágy, bizalmas | Magas bizalom, privát |
| Intenzív | sötét, sebezhető | `desire_private_intense` |

## Boglárka Fazekas

| Alap kifejezés | Alváltozatok | Mikor használjuk |
| --- | --- | --- |
| Szégyenlős semleges | lefelé néző, eltakaró | Alap, könyvtár |
| Kis mosoly | aranyos, óvatos | Jó válasz, margó |
| Elpirulás | enyhe, erős | Test említése, dicséret |
| Ijedtség | meglepett, visszahúzódó | Váratlan közelés |
| Őszinte nevetés | ritka, nyílt | Biztonságos helyzet |
| Megbántottság | szomorkás, elzáró | Testre célozás, türelmetlenség |
| Elszántság | csendes, erős | `boglarka_udvar`, határ |
| Lágy bizalom | meleg, elfogadó | Magas bizalom, `desire_body_praise` |

## Gréta Váradi

| Alap kifejezés | Alváltozatok | Mikor használjuk |
| --- | --- | --- |
| Koncentrált semleges | pontos, üzleti | Alap, adminisztráció |
| Kis elégedett mosoly | kontrollált, enyhe | Jó munka, lista javítva |
| Összevont szemöldök | gyanakvó, pontosító | Hiba, kivétel |
| Meglepetés | enyhe, zavar | Váratlan őszinteség |
| Zavar (elpirul) | beszélő, csendes | Kontroll elengedése |
| Düh (fegyelmezett) | hideg, határozott | Eszközként használják |
| Nevetés (elkapott) | ritka, rövid | Nincs feladat a beszélgetésben |
| Elengedett | lágy, szabály nélkül | Magas bizalom, `desire_rule_break` |

## Használat a kódban

- Minden dialógus sorhoz tartozhat egy `expression` kulcs (pl. `rebeka_halfsmile_playful`).
- A sprite-rendszer a kifejezés + alváltozat kombinációt várja.
- Alapból a semleges jelenik meg, ha nincs megadva.

Ez a lista bővíthető, de a fenti kifejezések fedik a jelenlegi játékmenetet és a 2/3 teljesülési rendszert.
