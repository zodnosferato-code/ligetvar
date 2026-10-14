# Játékhurok és események

A játék alapvető hurka, az eseménytípusok, a random események és a kódolt intim meglepetések. Az intim témák a [06-intim-szotar.md](06-intim-szotar.md) kódjait használják. A flag-ek és az eszkaláció a [19-flag-es-eszkalacio.md](19-flag-es-eszkalacio.md) szerint.

## Alap játékhurok

Egy hét menete:

1. **Hét kezdete** — fizetés érkezik (automatikus), állapot frissül (harag enyhe csökkenés, ha nem volt rossz esemény).
2. **3 szabad sáv** (délelőtt, délután, este) — a játékos választ akciót:
   - Beszélgetés / hívás
   - Munka (MOHU, építkezés, irat stb.)
   - Stat emelés / pihenés
   - Egyéni feladat
3. **Kötelező gyógytorna** — heti egyszer, háttérben (nem fogyaszt sávot). Itt találkozhat a lányokkal.
4. **Eseményellenőrzés** — a sáv végén vagy a hét végén random / feltételes események.
5. **Hét vége** — összegzés, kockázat ellenőrzés, útvonalzár a 8. héten.

A hurok a 16. hétig ismétlődik. A 9. héttől a zárt útvonal jelenetei prioritást kapnak.

## Eseménytípusok

| Típus | Mikor | Hatás |
| --- | --- | --- |
| **Szkriptelt** | Kötelező a történet szerint (bemutatkozás, jelzők) | Közelség, bizalom, jelzők |
| **Ismételhető** | Szabad sávban, ha a lány ott van | Kis közelség |
| **Feltételes** | Bizalom / közelség / jelző küszöb | Kulcsjelenet, lakáslátogatás |
| **Random** | Sáv vagy hét végén, eséllyel | Változó |
| **Meglepetés** | Magas bizalomnál vagy ritka | Erős pozitív vagy intim |

## Random események

Ezek a hét során vagy a sáv végén történhetnek (alacsony eséllyel, hogy ne legyen túl gyakori).

### Általános random
- **Pletyka** — valaki összeköti a neveket → kockázat +5–10.
- **Eső az udvaron** — váratlan találkozás Boglárkával vagy Grétával.
- **Holdkör meghívás** — Rebeka hív egy estre (ha a `rebeka_kor` jelző megvan).
- **Adminisztratív hiba** — Gréta kér segítséget → lehetőség a `greta_lista` jelzőre.
- **Könyvtári csend** — Boglárka tovább marad, ha a játékos is ott van.

### Meglepetések (pozitív)
- **Váratlan ajándék** — a lány ad valamit (közelség +4).
- **Közös munka siker** — az egyéni feladat jobban sikerül → bizalom +1.
- **Esti látogatás** — a lány magától jön a lakásra egy feladat után.

## Szexuális meglepetések (kódolt)

Ezek ritkák, magas bizalomnál (3+) és privát helyen történhetnek. A kódban csak a kódok szerepelnek. A flag-ek a [19-flag-es-eszkalacio.md](19-flag-es-eszkalacio.md) szerint frissülnek.

| Esemény | Feltétel | Kód | Hatás |
| --- | --- | --- | --- |
| Villantás gyógytorna közben | bizalom 1–2, tanterem | `act_flash` | közelség +2, flag |
| Váratlan enyhe csók | bizalom 2–3, lakás vagy Békás-tó | `act_kiss_light` | közelség +4, bizalom +1, flag |
| Ruhadarab lazítása | bizalom 3+, privát | sejtető kép + `desire_*` flag | közelség +6 |
| Félmeztelen meglepetés | bizalom 4+, lakás | félmeztelen kép + `act_touch_intimate` | közelség +8, vágykód nyílás |

Példák:
- **Rebeka**: a Holdkör után a folyosón egy rövid `act_kiss_light`, ha nincs közönség (`theme_no_audience`).
- **Boglárka**: a könyvtár sarkában a kardigán lecsúsza, `desire_body_praise` téma nyílik.
- **Gréta**: zárt ajtónál az irodában a mellény kigombolódik, `desire_rule_break` flag.

Ezek az események nem kötelezőek, és a játékos választhat, hogy elfogadja vagy elutasítja (elutasítás nem büntet, ha udvarias).

## Lányonkénti intim jelenetláncok (eszkaláció a 19 szerint)

A láncok a [19-flag-es-eszkalacio.md](19-flag-es-eszkalacio.md) tábláira épülnek. Minden lépés feltételes (bizalom + előző flag), és helyhez kötött.

### Rebeka Dorn
1. `act_flash` — tanterem, bizalom 1+ (gyógytorna közben)
2. `act_kiss_light` — tanterem/lakás, flag_rebeka_flash + bizalom 2+
3. `act_touch` / `act_touch_intimate` — lakás, flag_rebeka_kiss_light + bizalom 3+
4. `desire_fulfill` (`desire_yield_control` + `desire_private_intense`) — lakás / Békás-tó, flag + bizalom 4–5 + `hatar`

### Boglárka Fazekas
1. `act_kiss_light` — tanterem/könyvtár, bizalom 2+
2. `desire_slow_explore` — lakás, flag_boglarka_kiss_light + bizalom 3+
3. `act_touch` — lakás, flag_boglarka_slow_explore + bizalom 4+
4. `desire_fulfill` (`desire_slow_explore` + `desire_body_praise`) — Békás-tó, flag + bizalom 5, lassú tempó

### Gréta Váradi
1. `act_flash` — tanterem, bizalom 1+
2. `act_kiss_light` — tanterem, flag_greta_flash + bizalom 2+
3. `desire_yield_control` — lakás, flag_greta_kiss_light + bizalom 3+ + bilincs ajándék (`flag_gift_handcuff_rebeka` mintájára)
4. `desire_fulfill` — lakás / tó, flag_greta_yield_control + bizalom 4–5

### Páros (Boglárka + Gréta)
- Mindkettő bizalom 3+, `flag_pair_boglarka_greta` aktív.
- Közös jelenetek a lakásban vagy a tónál, kódoltan (`par_oszinte` előfeltétel).
- Nincs hármas jelenet.

## Események implementációja

- A core logikában egy `EventSystem` kezeli a feltételeket és a random esélyt.
- Minden eseménynek van `id`, `condition` (bizalom + flag), `effect` és `dialogue` (vagy kép flag).
- Headless tesztelhető: mock randommal ellenőrizhető, hogy a feltételek helyesen működnek.
- Az intim események csak a kódokat és a kép flag-eket használják.

A hurok és az események a meglévő sáv- és bizalomrendszerre épülnek ([05-rendszerek.md](05-rendszerek.md), [12-jatekmenet-akciok.md](12-jatekmenet-akciok.md)). Az eszkaláció a [19-flag-es-eszkalacio.md](19-flag-es-eszkalacio.md) táblái szerint.
