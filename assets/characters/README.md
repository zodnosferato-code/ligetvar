# Karakter képi assetek

> **Állapot:** Aktív. | **Cél:** Karakterképek helyőrzői és egyeztetett art brief.

**Kanonikus forrás**: a játék képi assetei az `assets/` mappában vannak; a runtime azokat a fájlokat tölti be, amelyeket a `src/game/content/assets.ts` manifest felsorol.

A jelenetek a játékos első személyű nézőpontjából készülnek. A meglévő háttérképek hangulatát a felhasználó megfelelőnek tartja; új vagy frissített háttérnél őrizzük meg ezt a hangulatot, és hagyjunk jól olvasható helyet a karakternek leülni a játékossal szemben.

A jelenlegi art brief: nem pixel art, részletgazdag anime illusztráció, tiszta cel-shadinggel. Az új karakterképek készüljenek újra, de őrizzék meg a felismerhető kulcsjegyeket (például hajszínt, sziluettet vagy jellegzetes részletet). A háttér tartsa meg a meglévő gótikus hangulatot visszafogott modern főiskolai tárgyakkal; a nézőpont a játékos ülőhelye legyen, a lánynak természetes ülőhellyel szemben. A pontos karakterenkénti jegyeket és képkivágást a stílusminta előtt véglegesítsük.

A korábbi karakterképek, vizuális lockok és generálási promptok az `assets/archive/characters/` alatt maradtak meg. Ezek nem aktív források. A jelenlegi jóváhagyott portrék az `assets/characters/` alatt, az aktív kiválasztás pedig a `src/game/content/assets.ts` manifestben található. Soma semleges képe az 1. héten, vámpírportréja a 2. héttől jelenik meg; mindkettőt Miki véglegesítette. Áron végleges, idősebb portréja szintén aktív.
