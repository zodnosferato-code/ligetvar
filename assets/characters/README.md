# Karakter képi assetek

**Kanonikus forrás**: a játék képi assetei az `assets/` mappában vannak; a runtime azokat a fájlokat tölti be, amelyeket a `src/game/content/assets.ts` manifest felsorol.

A jelenetek a játékos első személyű nézőpontjából készülnek. A meglévő háttérképek hangulatát a felhasználó megfelelőnek tartja; új vagy frissített háttérnél őrizzük meg ezt a hangulatot, és hagyjunk jól olvasható helyet a karakternek leülni a játékossal szemben.

A végleges képi stílus még egyeztetés alatt van. A kért irány: nem pixel art, részletgazdag anime illusztráció. A konkrét vonalvezetést, festési módot, palettát és képkivágást az art register és a jóváhagyott stílusminta rögzíti majd.

A korábbi, már nem aktív képi referenciák az `assets/archive/` alatt vannak. Ne hasznhasználd ezeket automatikusan stílus- vagy karakterkanonként; a végleges generáláshoz az egyeztetett karakter-lockokat és az elfogadott referenciákat használd.
