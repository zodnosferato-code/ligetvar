# Játékmenet, sztorifolyás és végkimenetek

A félév struktúrája, a közeledés menete, a lehetséges végek, a páros útvonal, az ajándékrendszer és a megharagudás mechanikája. Az intim témák a [06-intim-szotar.md](06-intim-szotar.md) kódjait használják.

## Sztorifolyás áttekintése

A játék egy 16 hetes félévet fog át. A főhős heti egyszer misztikus gyógytornát tart a tanteremben. A három lány a közös munka miatt rendszeresen jelen van, és a játékos szabad sávjaiban (délelőtt / délután / este) választhat, kivel és hol foglalkozik.

A játék elejétől minimális szexuális interakciók lehetségesek (`act_flash`, `act_kiss_light`). A haladással egyre mélyebbre hatolunk a lányok vágyaiban (`act_touch_intimate`, `act_desire_fulfill`).

### 1–8. hét — Közös szakasz
- Mindhárom lány elérhető a saját helyein és a tanteremben.
- Ismételhető beszélgetések + bemutatkozó események.
- Egyéni feladatok indíthatók (fotóanyag, kutatási jegyzet, admin dokumentum), amelyek a tanár lakásába vezetnek.
- Ajándékok és közelség/bizalom építése.
- Korai `act_flash` (gyógytorna közben) és `act_kiss_light` (privát helyen) már lehetséges bizalom 1–3 között.
- A 8. hét végén döntés: egy lány, egy összeillő pár, vagy senki.

### 9–15. hét — Zárt útvonal
- Csak a kiválasztott lány (vagy pár) útvonala fut.
- Kulcsjelenetek a tanteremben, a lakásban és a Békás-tónál.
- Mélyebb aktusok (`act_kiss_deep`, `act_touch_intimate`) és a vágykódok szerint mélyebb intim témák nyílhatnak (bizalom 4–5-nél).
- A kívül maradt lány háttérbe húzódik.

### 16. hét — Vég
- Igaz, csendes, tört, páros vagy egyedül vég a feltételek szerint. Az igaz vég az `act_desire_fulfill`-t tartalmazza.

## Végkimenetek

| Típus | Feltétel (röviden) | Mit jelent |
| --- | --- | --- |
| **Igaz** | közelség ≥80, bizalom 5, a lány problémái+vágyai legalább 2/3-a teljesült, kockázat <60, `hatar` | A vágyak beteljesülnek (`act_desire_fulfill` a kódok szerint). A viszony a félév után is folytatódik. |
| **Csendes** | közelség ≥55, bizalom ≥3, de a 2/3 vagy egy más igaz-vég feltétel hiányzik | Van viszony, de nem teljes. Korai aktusok megvoltak, de a mély vágyak nem. |
| **Törés** | kockázat ≥80 vagy a lány saját törésjelzője | A viszony megszakad. A lány visszavonul, esetleg pletykát indít vagy áthelyezi a munkáját. |
| **Páros igaz** | mindkettő bizalma 5, közelség ≥75/80, mindkettő 2/3-a teljesült, `par_oszinte`, `hatar`, alacsony kockázat | Mindkét lány tudja és elfogadja. Külön-külön beteljesülnek a vágyaik. |
| **Páros csendes** | egyikük igaz, a másik nem tört, de a páros feltételek nem teljesülnek | A szó szintjén együtt maradnak, de a félév után eltávolodnak. |
| **Egyedül** | senki nem érte el a küszöböt | A gyógytorna lezajlott, senki nem került közel. |

### Egyéni igaz végek — 2/3 szabály

A pontos listák a [03-karakterek.md](03-karakterek.md)-ben vannak. Összefoglalva:

**Rebeka Dorn** (10 elem, legalább 7 kell)
- Problémák: Holdkör nélküli érdektelenség, sebhely, tanár-mint-történet, gőg, közönség, családi fázis.
- Vágyak: `desire_yield_control`, `desire_private_intense`, `theme_power_forbidden`, `theme_no_audience`.
- Hely: lakás vagy Békás-tó.

**Boglárka Fazekas** (9 elem, legalább 6 kell)
- Problémák: testszégyen, láthatatlanság, elvágott mondatok, új hely, beosztás gyanúja, test mint első dolog.
- Vágyak: `desire_slow_explore`, `desire_body_praise`, `theme_power_forbidden`.
- Hely: Békás-tó vagy lakás, lassú tempó.

**Gréta Váradi** (8 elem, legalább 6 kell)
- Problémák: csak teljesítmény miatt, kivétel gyanúja, kontroll, beosztás, nem tud kérni.
- Vágyak: `desire_rule_break`, `desire_yield_control`, `theme_power_forbidden`.
- Hely: lakás vagy tó.

### Páros igaz vég (Boglárka + Gréta)
- Mindkettő eléri a saját 2/3-ot, bizalom 5, közelség ≥75/80, `flag_pair_boglarka_greta`, `par_oszinte`, `hatar`, kockázat <60.

## Két lány egyszerre — a járható pár

**Boglárka és Gréta** a fő, járható páros útvonal.

Miért ők:
- Külön sávokban élnek (Boglárka délután könyvtár/tanterem, Gréta délelőtt iroda/tanterem).
- Egyikük sem akar közönséget.
- Gréta akkor marad, ha az egyezség kimondott és következetes.
- Boglárka akkor marad, ha nem ő a titkolt második.

**Rebeka + Gréta** szűk pár (magasabb követelmények, könnyen törik).
**Rebeka + Boglárka** nem járható (Boglárka láthatatlannak érzi magát).

A páros útvonalon a 9–15. hét jelenetei felállva jönnek. Mindkettőnek ki kell mondani a `par_oszinte`-t a 8. hét vége előtt. Nincs hármas jelenet a kampuszon.

## Ajándék rendszer

A bolt (**Polc**) a térképről nyílik, nem fogyaszt sávot. Az ajándékot személyesen kell átadni.

### Alapszabályok
- Hetente egy ajándék egy lánynak ad pozitív hatást.
- A második ugyanazon a héten már csak udvarias sort ad.
- Rossz ízlésű vagy a testre célzott ajándék árt (bizalom csökken, törésjelző felé vihet).
- Az ajándék nem helyettesíti a beszélgetést vagy a jelzőket.

### Példák (a meglévő táblázatból)
- Rebeka: fekete töltőtoll, éjszakai fotófüzet.
- Boglárka: puha borítós regény, tea + könyvjelző.
- Gréta: jó notesz, ceruzabél + idézett cikk.
- Kerülendő: csokor virág első ajándéknak, bármi a testre célzott, plüss korán.

## Megharagudás rendszer

Ha a játékos rosszul válaszol, a lány haragszik. Ez nem azonnali törés, hanem fokozatos.

### Harag szintjei
| Szint | Mi történik | Hatás |
| --- | --- | --- |
| 0 | Normál | — |
| 1 | Enyhe zavar / félreállás | Közelség nem nő a következő 1–2 jelenetben |
| 2 | Hideg válaszok, rövid mondatok | Bizalom nem nő, közelség stagnál |
| 3 | Elkerüli a főhőst a következő sávban | Kockázat +5, ha nyilvános helyen történik |
| 4+ | Törésjelző aktiválódhat | Az útvonal törés felé megy |

### Tipikus rossz válaszok, amelyek haragot okoznak
- **Rebeka:** „Különleges vagy” (gúnyként hallja), hencegés a Holdkörrel mások előtt, próbálkozás a sötétsége felülmúlására.
- **Boglárka:** A testére célozás, a mondata elvágása, türelmetlenség, a neve gúnyolása mások előtt.
- **Gréta:** A demonstrátori helyére vagy a jegyeire hivatkozás, laza, hanyag beszéd, ha a főhős hibázik és el akarja titkolni.

### Javítás
- Egy jó, pontos válasz (amely az ő félelmére vagy munkájára vonatkozik) 1 szinttel csökkenti a haragot.
- Ajándék csak akkor segít, ha már 2 alatti a harag, és az ő ízlése.
- A harag hetente maximum 1 szinttel csökken magától, ha nincs új rossz válasz.

A rendszer a kódban egy egyszerű `anger` számmal (0–5) kezelhető lányonként. A build agent csak a számot és a flag-eket látja.

## Összefoglaló a kódbázisnak

- Heti 3 sáv + kötelező gyógytorna háttér.
- Közelség, bizalom, kockázat, harag, jelzők.
- Korai aktusok (`act_flash`, `act_kiss_light`) már a közös szakaszban.
- 8. hét végén útvonalzár (egyedül / egy lány / pár).
- Békás-tó, tanár lakása és tanterem a fő intim helyek.
- Minden intim téma kódolt string.
- Végállapot: a lány problémái + vágyai legalább 2/3-a teljesül (lásd [03-karakterek.md](03-karakterek.md)).
