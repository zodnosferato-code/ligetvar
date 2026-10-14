# Flag és eszkalációs rendszer

A flag-ek nyomon követik az intim előrehaladást. A kódban kódoltan vannak tárolva. Az eszkalációs tábla megmutatja, melyik kód milyen feltétel után érhető el.

## Flag-lista (példák)

| Flag | Leírás | Lány |
| --- | --- | --- |
| flag_rebeka_flash | act_flash megtörtént | Rebeka |
| flag_rebeka_kiss_light | act_kiss_light megtörtént | Rebeka |
| flag_rebeka_touch | act_touch megtörtént | Rebeka |
| flag_rebeka_desire_fulfill | desire_fulfill elért | Rebeka |
| flag_boglarka_kiss_light | act_kiss_light | Boglárka |
| flag_boglarka_slow_explore | desire_slow_explore | Boglárka |
| flag_greta_kiss_light | act_kiss_light | Gréta |
| flag_greta_yield_control | desire_yield_control | Gréta |
| flag_pair_boglarka_greta | páros útvonal aktív | Boglárka + Gréta |
| flag_gift_handcuff_rebeka | bilincs ajándék elfogadva | Rebeka |

## Eszkalációs tábla (lehetőségek)

### Rebeka Dorn (desire_yield_control, exp_none)
| Lépés | Kód | Feltétel | Hely |
| --- | --- | --- | --- |
| 1 | act_flash | bizalom 1+ | tanterem |
| 2 | act_kiss_light | flag_rebeka_flash, bizalom 2+ | tanterem / lakás |
| 3 | act_touch | flag_rebeka_kiss_light, bizalom 3+ | lakás |
| 4 | desire_fulfill | flag_rebeka_touch, bizalom 4–5, ajándék vagy flag | lakás / Békás-tó |

### Boglárka Fazekas (desire_slow_explore, exp_none)
| Lépés | Kód | Feltétel | Hely |
| --- | --- | --- | --- |
| 1 | act_kiss_light | bizalom 2+ | tanterem |
| 2 | desire_slow_explore | flag_boglarka_kiss_light, bizalom 3+ | lakás |
| 3 | act_touch | flag_boglarka_slow_explore, bizalom 4+ | lakás |
| 4 | desire_fulfill | flag + bizalom 5, lassú tempó | Békás-tó |

### Gréta Váradi (desire_yield_control, exp_limited)
| Lépés | Kód | Feltétel | Hely |
| --- | --- | --- | --- |
| 1 | act_flash | bizalom 1+ | tanterem |
| 2 | act_kiss_light | flag_greta_flash, bizalom 2+ | tanterem |
| 3 | desire_yield_control | flag_greta_kiss_light, bizalom 3+, bilincs ajándék | lakás |
| 4 | desire_fulfill | flag_greta_yield_control, bizalom 4–5 | lakás / tó |

### Páros (Boglárka + Gréta)
- Mindkettő bizalom 3+, flag_pair_boglarka_greta.
- Közös jelenetek a lakásban vagy a tónál (kódoltan).

A flag-ek a GameState-ben tárolódnak. A dialógusok és események ezeket ellenőrzik. A tényleges szöveg a lokalizációban van.
