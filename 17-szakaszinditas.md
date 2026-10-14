# Szakaszindítás

A játék elején a játékos kiválaszthatja, melyik szakaszból akar indulni. A kiválasztott szakasznak megfelelő maximális értékekkel kezd (bizalom, közelség, pénz, jelzők stb.).

Ez lehetővé teszi a későbbi részek gyors elérését tesztelésre vagy újrajátszásra.

## Szakaszok

| Szakasz | Hét | Leírás | Max értékek induláskor |
| --- | --- | --- | --- |
| 1. Kezdő | 1 | Alapértelmezett | Bizalom 0, közelség 0, pénz 0, nincs jelző |
| 2. Korai | 5 | Sejtető szakasz | Bizalom max 2, közelség 20–30, pénz 30 000 Ft, korai jelzők |
| 3. Közepes | 9 | Útvonalzár után | Bizalom max 3, közelség 40–50, pénz 60 000 Ft, zárt útvonal |
| 4. Késői | 13 | Magas bizalom | Bizalom max 4, közelség 60–70, pénz 90 000 Ft, intim lehetőségek |
| 5. Vég | 16 | Végkifejlet | Bizalom max 5, közelség 80+, pénz 120 000 Ft, teljes jelzők |

## Szabályok

- A választás a játék indításakor történik (menü).
- A kiválasztott szakasz beállítja a kezdeti értékeket a maximálisra a szakasz szerint.
- A lányok bizalma és közelsége a szakasznak megfelelően indul (nem feltétlenül max minden lánynál, de a felső határ adott).
- A páros útvonal és a jelzők a szakasznak megfelelően vannak beállítva.
- Teszteléshez és újrajátszáshoz használható. A normál játék az 1. szakaszból indul.

## Implementáció

- A GameState inicializálásakor egy `startStage` paraméter.
- A szakaszok egy konfigurációs objektumban vannak definiálva.
- Headless tesztelhető: különböző szakaszokból induló állapot ellenőrzése.

A rendszer a meglévő bizalom-, közelség- és heti struktúrára épül ([05-rendszerek.md](05-rendszerek.md), [08-jatekmenet-es-vegkimenetek.md](08-jatekmenet-es-vegkimenetek.md)).
