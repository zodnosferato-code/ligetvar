> **Történeti dokumentum.** A redesignnal ütköző szabályokat a [Ligetvar-Redesign-Plan.md](Ligetvar-Redesign-Plan.md) és a jelenlegi [ENGINE.md](ENGINE.md) váltja fel. Karakterazonosság és asset-proveniencia megőrzendő; ez a szöveg nem aktív történetforrás. Új dialógusban legfeljebb négy kontextuális választás van, kötelező jó/rossz ranglétra nélkül.

# Intim szótár (build-agent kompatibilis)

Ez a lap a szexuális és intim témák kódolt neveit tartalmazza. A játék kódbázisában, a karakterlapokon és a szkriptekben csak ezek a kódok szerepelnek. A jelentésüket csak ez a dokumentum és a tervezői jegyzetek ismerik.

A build agent (vagy bármely automatikus kódgeneráló) a kódokat sima sztringekként, flag-ekként vagy állapotokként kezelheti anélkül, hogy explicit tartalommal kellene dolgoznia.

## Tapasztalati szintek

| Kód | Jelentés |
| --- | --- |
| `exp_none` | Szűz. Nincs korábbi szexuális tapasztalata. |
| `exp_limited` | Korlátozott tapasztalat. Volt 1–2 rövid, nem mély kapcsolat vagy alkalmi alkalom, de nem elégítő vagy formáló. |

## Korai és fokozatos intim aktusok

A játék elejétől kezdve minimális intim interakciók nyílnak (villantás, enyhe csók). A haladással egyre mélyebbre hatolunk a vágyakban.

| Kód | Jelentés | Mikor nyílik |
| --- | --- | --- |
| `act_flash` | Villantás (rövid, részleges látás ruhán vagy mozgáson keresztül, pl. gyógytorna közben). | Bizalom 1–2, már a közös szakaszban. |
| `act_kiss_light` | Enyhe csók (orca vagy rövid száj, nem mély). | Bizalom 2–3. |
| `act_kiss_deep` | Mélyebb csók. | Bizalom 4. |
| `act_touch_intimate` | Intimebb érintés a vágykódok szerint. | Bizalom 4–5, zárt útvonalon. |
| `act_desire_fulfill` | A lány rejtett vágyának beteljesítése (a saját kódjai szerint). | Bizalom 5, igaz vég kapuja. |

## Vágy- és témakódok

Ezek a rejtett vagy később megnyíló intim preferenciák. A jelenetekben és a kódban flag-ként vagy feltételként használhatók.

| Kód | Jelentés |
| --- | --- |
| `desire_yield_control` | A kontroll átadása. Szeretné, ha a másik vezetné, ő pedig sebezhető lehessen anélkül, hogy elveszítené a méltóságát. |
| `desire_slow_explore` | Lassú, biztonságos felfedezés. Türelmes, dicsérő vezetés, a test ne legyen szégyen. |
| `desire_rule_break` | Szabályok megtörése intimitásban. Elengedni a listákat, a precizitást, a kontrollt. |
| `desire_private_intense` | Intenzív, privát, sötét intimitás. Közönség nélkül, teljesítmény vagy páncél nélkül. |
| `desire_body_praise` | A test elfogadása és dicsérete. A szégyen oldása, hogy kívántnak érezze magát. |
| `theme_power_forbidden` | A tiltott / hatalmi helyzet izgalma (beosztás, kor, titok). Csak akkor pozitív, ha nem élnek vissza vele. |
| `theme_no_audience` | Csak közönség nélkül. Nyilvános érintés vagy beszélgetés rontja a bizalmat. |

## Használat a kódban és a szkriptekben

- Karakteradatokban: `sexual_exp: "exp_none"`, `desires: ["desire_slow_explore", "theme_power_forbidden"]`
- Aktusok: `available_acts: ["act_flash", "act_kiss_light"]` a bizalom szerint.
- Flag-ként: ha egy jelenet megnyitja az `act_flash` vagy `desire_yield_control` témát, a kód csak a stringet ellenőrzi.
- A build agent soha nem látja a fenti táblázat jelentését, csak a kódokat kezeli.

A tényleges explicit jeleneteket (ha később bekerülnek) külön, nem automatikus ágakon lehet megírni. A kód és a struktúra ettől függetlenül építhető.
