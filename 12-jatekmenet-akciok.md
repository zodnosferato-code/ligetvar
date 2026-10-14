# Játékmenet — Beszélgetés, hívás, pénzszerzés és korlátozott akciók

A játékos heti 3 szabad sávban (délelőtt, délután, este) választhat akciót. Az akciók **nem végtelenek** egy nap / héten. A történetnek megfelelően a lányok bejöhetnek maguktól, vagy a játékos hívhatja őket.

## Hogyan beszél a játékos a nőkkel

### Alap módok
- **Hívás / meghívás**: A térképről vagy a tanteremből a játékos meghívhat egy lányt egy sávra (ha elérhető és a bizalom engedi). Ez egy sávot fogyaszt.
- **Magától bejön**: A történetnek megfelelően (egyéni feladat, gyógytorna, kulcsesemény) a lány magától megjelenik a tanteremben vagy a lakásban. Ez nem fogyaszt extra sávot, de a beszélgetés igen.
- **Találkozás a helyén**: A játékos elmegy a lány szokásos helyére (könyvtár, Holdkör, előtér). Ha ott van, beszélgetés indul.

Minden beszélgetés a dialógusrendszer szerint megy: max 4 opció, very_good / good / bad / very_bad hatásokkal a közelségre, bizalomra, haragra.

### Korlátok
- Hetente lányonként maximum 2–3 értelmes beszélgetés ad pontot.
- Magas harag vagy alacsony bizalom esetén a lány elutasíthatja a hívást vagy hamarabb elmegy.

## Pénzszerzési lehetőségek

A pénz ajándékra és randihelyekre kell. Az akciók sávot fogyasztanak. A minijátékok **szórakoztatóak**, régi egyszerű játékokra alapozva.

### 1. MOHU visszaváltás — Pac-Man stílusú gyűjtögető
- **Alap**: Klasszikus Pac-Man / maze chase. A játékos egy egyszerű labirintusban (udvar, park, kampusz széle) mozog, és összegyűjti a szétszórt palackokat és dobozokat.
- **Tárgyak**:
  - Üveg palack: 75–125 Ft (változó érték)
  - Műanyag palack: 75–125 Ft
  - Energiaitalos doboz: magasabb érték (150–200 Ft), ritkább
- **Versenytárs**: Egy hajléktalan gyűjtögető is a labirintusban jár. Ő is szedi a palackokat. Ha eléred, elveheti a közeledben lévőket, vagy lassít. Elkerülhető, de feszültséget ad.
- Mechanika: Pixeles labirintus, 4 irányú mozgás. A tárgyak értéket adnak. Rövid power-up: gyorsabb mozgás vagy a versenytárs ideiglenes lelassítása.
- Jutalom: Az összegyűjtött tárgyak értéke. Egy sávban 800–1800 Ft reális a teljesítmény és a versenytárs elkerülése szerint.
- Korlát: hetente 2–3 alkalommal érdemes, utána csökken a hozam.
- Szórakoztatás: klasszikus gyűjtögetés + feszült verseny a hajléktalannal, rövid és addiktív.

### 2. Fizikai munka — építkezés minijáték — Space Invaders stílus
- **Alap**: Space Invaders-szerű. A játékos téglákat (vagy építőanyagot) „lő” vagy rak le, hogy falat építsen, miközben „ellenségek” (pl. hibás téglák vagy idő) jönnek.
- Mechanika: Egyszerű oldalirányú mozgatás + lövés/rakás. A cél egy bizonyos magasságú fal építése időre.
- Jutalom: 12 000–18 000 Ft egy sávra a teljesítmény szerint (magasabb, mint a palack).
- Hatás: Jelenlét vagy Nyugalom stat enyhe változása.
- Korlát: hetente maximum 1–2 alkalom, utána fáradtság.
- Szórakoztatás: klasszikus, rövid, kielégítő.

### Egyéb meglévő pénzforrások (a rendszerekből)
- Tanulmányi vezetői fizetés: 60 000 Ft / hét (automatikus).
- Iratrendezés, külsős előadás, esti korrektúra (lásd [05-rendszerek.md](05-rendszerek.md)).

## Egyéb tipikus akciók ebben a stílusban

A műfaj (Tokimeki Memorial, Persona-szerű időbeosztás, Stardew-szerű ajándék) alapján:

| Akció | Sáv | Hatás | Megjegyzés |
| --- | --- | --- | --- |
| Beszélgetés / hívás | 1 | közelség, bizalom, harag | max 4 opció |
| Ajándék átadása | 0 (találkozáson) | ízlés szerint | hetente 1 értelmes |
| Gyógytorna (kötelező) | háttér | stat, találkozás | heti egyszer |
| Egyéni feladat | 1 | közelség, lakáslátogatás | történethez kötött |
| Munka (palack / építkezés / irat) | 1 | pénz | korlátozott hetente |
| Stat emelés (olvasás, pihenés) | 1 | Jelenlét / Éleslátás / Nyugalom | |
| Randihely (9. héttől) | 1 | közelség, kockázat | pénzbe kerül |
| Pihenés / semmittevés | 1 | harag csökkenés, Nyugalom | |

## Napi / heti korlátok

- Hetente 3 szabad sáv (délelőtt, délután, este).
- Egy sáv = egy fő akció.
- A gyógytorna és a fizetés nem fogyaszt sávot.
- Túl sok munka egy héten fáradtságot okoz (következő beszélgetések enyhén rosszabbak).
- A lányok órarendje korlátozza, mikor érhetők el.

A rendszer a meglévő [05-rendszerek.md](05-rendszerek.md) és [08-jatekmenet-es-vegkimenetek.md](08-jatekmenet-es-vegkimenetek.md) szabályaira épül. A minijátékok később külön modulban implementálhatók, headless tesztelhetően (a pontszám és a jutalom kiszámítható UI nélkül is).
