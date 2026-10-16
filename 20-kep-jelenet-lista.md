# Kép- és jelenetlista a sávokhoz

Ez a dokumentum a [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md) sávaira és a [19-flag-es-eszkalacio.md](19-flag-es-eszkalacio.md) kódjaira épül. A sávok **lehetőségek**, nem kötelezőek. Az intim képek csak magas bizalomnál és privát helyen jelenhetnek meg. Minden kép egy lány, a kanonikus blokk szerint.

## Sávok (emlékeztető)

| Sáv | Bizalom / hét | Képtípus |
| --- | --- | --- |
| 1. Alap | 0–1, 1–4. hét | Teljes alapruha, szerény |
| 2. Sejtető | 2, 5–8. hét | Ruhadarabok lazítva |
| 3. Közepes intim | 3, 9–12. hét | Részleges ruhalevétel, sejtető póz |
| 4. Félmeztelen | 4, 13–15. hét | Egyes ruhadarabok le, fehérnemű |
| 5. Intim | 5, 16. hét / vég | Magasabb szintű, privát (vágykódok szerint) |

## Lányonkénti lista (példák a kódokhoz)

### Rebeka Dorn
| Sáv | Hely | Kód / flag | Példa leírás (generáláshoz) |
| --- | --- | --- | --- |
| 1 | Tanterem | — | Álló, alapruha, Holdkör előtt |
| 2 | Tanterem / udvar | `act_flash` | Gallér lazítva, sejtető mozgás |
| 3 | Lakás | `act_kiss_light` | Ülő, felső lazítva |
| 4 | Lakás | `act_touch` | Félmeztelen, fekvő |
| 5 | Békás-tó / lakás | `desire_fulfill` | Privát, `desire_yield_control` |

### Boglárka Fazekas
| Sáv | Hely | Kód / flag | Példa leírás |
| --- | --- | --- | --- |
| 1 | Könyvtár | — | Ülő, alapruha, könyvvel |
| 2 | Tanterem | `act_kiss_light` | Kardigán lecsúsza |
| 3 | Lakás | `desire_slow_explore` | Ülő, sejtető |
| 4 | Lakás | `act_touch` | Félmeztelen, lassú |
| 5 | Békás-tó | `desire_fulfill` | Privát, `desire_body_praise` |

### Gréta Váradi
| Sáv | Hely | Kód / flag | Példa leírás |
| --- | --- | --- | --- |
| 1 | Tanszék | — | Álló, alapruha |
| 2 | Tanterem | `act_flash` | Mellény lazítva |
| 3 | Lakás | `act_kiss_light` | Ülő, sejtető |
| 4 | Lakás | `desire_yield_control` | Félmeztelen (bilincs ajándék után) |
| 5 | Lakás / tó | `desire_fulfill` | Privát, `desire_rule_break` |

## Páros jelenetek
- Csak Boglárka + Gréta, külön képek (soha egy képen két lány).
- Sáv 3–5, lakás / tó, `flag_pair_boglarka_greta` után.

A generálás mindig a [11-kepgeneralasi-szabaly.md](11-kepgeneralasi-szabaly.md) alap prompt + lány blokk + ruházat/póz utasítás szerint történik. A kódban a képek flag-ekkel vagy kulcsokkal hivatkozottak.


## Háttérjelenetek (assets/backgrounds/)

Az alábbi előre generált jelenetképek szolgálnak alapként. Mind tartalmaz közeli ülő- vagy fekvőhelyet a kamerához:

| Fájl | Helyszín | Ülő/fekvőhely |
| --- | --- | --- |
| classroom.jpg | Tanterem | Nagy asztal az előtérben |
| library.jpg | Könyvtár | Rejtett sarok asztal az előtérben (nincs ágy) |
| apartment.jpg | Lakás | Ágy az előtérben |
| department.jpg | Tanszék | Kanapé/szék |
| courtyard.jpg | Udvar / Holdkör | Pad az előtérben |

Karakter- és intim jeleneteket ezekre kell kompozitálni. A hely közel a kamerához, játékos POV-ból.
