# Lokalizáció és kódolt hivatkozás

A játékmotor a szövegeket lokalizáltan olvassa. A motor maga **nem ismeri** az intim / szexuális tartalmat. Minden ilyen témát kódoltan hivatkozik, a tényleges szöveg a lokalizációs fájlokban van.

## Elv

- A core kód (GameState, DialogueEngine, EventSystem stb.) csak kulcsokat és kódokat használ.
- Példa kulcsok: `dialogue.rebeka.trust3.kiss_light`, `event.flash.classroom`, `gift.intimate.handcuff`.
- A lokalizációs fájlok (pl. `locales/hu.json`, `locales/en.json`) tartalmazzák a tényleges szöveget.
- Az intim tartalom a lokalizációban van leírva, de a kód csak a kulcsot látja.

## Példa

**Kód (motor)**:
```ts
showDialogue("rebeka", "act_kiss_light");
// vagy
triggerEvent("event.act_flash");
```

**Lokalizáció (`locales/hu.json`)**:
```json
{
  "dialogue.rebeka.act_kiss_light": "Rebeka közelebb lép, és egy rövid, enyhe csókot ad.",
  "event.act_flash": "A mozgás közben a ruha egy pillanatra megvillan."
}
```

A motor csak a kulcsot kezeli, a szöveget a lokalizációs rendszer adja vissza.

## Szabályok

- Minden dialógus, esemény, ajándékleírás és intim téma kulcsokkal hivatkozott.
- A kulcsok a [06-intim-szotar.md](06-intim-szotar.md) kódjaira épülnek (`act_kiss_light`, `desire_yield_control` stb.).
- A lokalizációs fájlok külön vannak, és nem részei a core logikának.
- A build agent a kódot és a kulcsokat látja, a tényleges intim szöveget nem.
- Új nyelv hozzáadása csak új lokalizációs fájlt igényel.

## Implementációs javaslat

- Egy egyszerű `Localization` modul: `get(key: string): string`.
- A DialogueEngine és az EventSystem csak kulcsokat ad át.
- A UI réteg hívja a lokalizációt, és jeleníti meg a szöveget.
- Headless tesztekben a kulcsok ellenőrizhetők, a szöveg nem szükséges.

Ez biztosítja, hogy a játékmotor tiszta maradjon, és a tartalom a lokalizációban kezelhető legyen.
