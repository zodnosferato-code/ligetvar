# Engine integráció — szexuális jelenetek

A szexuális találkozók be vannak szőve a történetbe és a dialógusokba, és a játékmotor használja őket.

## Hogyan működik

1. **Dialógus JSON-ok** (`dialogues/part1/*.json`): Tartalmazzák az intim node-okat (rebeka_intimate_private, rebeka_yield_control, boglarka_slow_explore, boglarka_body_praise, greta_rule_break, greta_yield stb.).
2. **Lokalizáció** (`locales/hu.json`): Explicit szövegek a light-tól az intimig.
3. **Motor** (`src/game/content/part1.ts`): A `mergePart1` betölti a JSON-okat a katalógusba. A `beat()` függvény ütemezi:
   - flash/kiss: 4–6. hét, alacsonyabb trust, tanterem/lakás
   - intimate/yield/slow_explore/body_praise/rule_break: **9+. hét, minTrust 4**, lakás vagy Békás-tó
4. **Flag-ek**: A választások flag-eket állítanak (flag_rebeka_intimate, flag_rebeka_yield stb.), amelyeket a `girlPhase()` és a végkimenetek használnak a desire_fulfill eléréséhez.
5. **Katalógus** (`catalog.ts`): A hard-coded node-ok + a JSON-ok egyesülnek. A játék a STORY eseményekből választ helyszín és trust alapján.

A 31-szexuális-jelenetek-terv.md leírja a full light-to-hardcore ívet. A hardcore fulfill node-ok (pl. rebeka_desire_fulfill) később part2/3-ba vagy további JSON bővítéssel adhatók hozzá ugyanígy.

A motor headless tesztelhető: `npm run test:engine`.
