# Állapotgép — Lányonként

Minden lánynak van egy egyszerű állapotgépe (`GirlStateMachine`), amely a meglévő `GirlStats` + flag rendszerre épül. Nem helyettesíti a számokat és a flag-eket, hanem magasabb szintű fázist ad belőlük.

## Fázisok

| Fázis | Jelentés | Tipikus feltétel |
| --- | --- | --- |
| `unknown` | Még nem találkozott | closeness = 0 |
| `introduced` | Intro lefutott | closeness > 0 |
| `warming` | Ismételhető beszélgetések, feladatok | intro flag vagy closeness ≥10 |
| `private` | Lakáslátogatás lehetséges | feladat-flag vagy trust ≥2 |
| `intimate_early` | Flash / enyhe csók elérhető | flash vagy kiss_light flag |
| `route_candidate` | 7–8. hét, jelölt | week ≥7, trust ≥2, closeness ≥40 |
| `route_locked` | 9. héttől a kiválasztott útvonalon | week ≥9 és a route megegyezik |
| `broken` | Törés | anger ≥4 vagy risk ≥80 |
| `fulfilled` | Végállapot | desire_fulfill flag |

## Használat

```ts
const machine = new GirlStateMachine(
  'rebeka',
  () => state.girls.rebeka,
  () => state.week,
  () => state.risk,
  () => state.route
);

const phase = machine.current();
const canKiss = machine.canEscalate('kiss_light');
```

## Előnyök a félkész játszhatósághoz

- A dialógusok és események a fázisra hivatkozhatnak (`if (machine.current() === 'private')`) ahelyett, hogy sok flag-et ellenőriznének.
- Az összefonódások (pl. Boglárka + Gréta) könnyebben kezelhetők: mindkettő fázisa látható.
- A 8. hét útvonalzáránál a `route_candidate` fázis mutatja, ki kerülhet be.
- Debugban egyetlen `describe()` hívás elég.

A fázisok a meglévő adatokból számítódnak, nem kell külön tárolni. Ha később komplexebb átmenetek kellenek (pl. explicit állapotváltó események), a gép könnyen bővíthető.
