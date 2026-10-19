> **Történeti dokumentum.** A redesignnal ütköző szabályokat a [Ligetvar-Redesign-Plan.md](Ligetvar-Redesign-Plan.md) és a jelenlegi [ENGINE.md](ENGINE.md) váltja fel. Karakterazonosság és asset-proveniencia megőrzendő; ez a szöveg nem aktív történetforrás. Új dialógusban legfeljebb négy kontextuális választás van, kötelező jó/rossz ranglétra nélkül.

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

A pénz ajándékra és randihelyekre kell. Az akciók sávot fogyasztanak. A minijátékok **szórakoztatóak**.

### 1. MOHU visszaváltás — infinite runner
- **Alap**: Oldalsó infinite runner. A játékos ugrik (Space / fel nyíl) a palackokért, elkerüli a veszélyeket.
- **Tárgyak**: Üveg/műanyag palack 75–125 Ft, energiaitalos doboz magasabb. Veszélyek (sötét alakok) levonnak pontot.
- Jutalom: Az összegyűjtött érték szerint, egy sávban 800–1800 Ft reális.
- Korlát: hetente 2–3 alkalommal érdemes.
- Szórakoztatás: egyszerű vezérlés, telefonbarát, feszültség a veszélyekkel.

### 2. Tanári munka — trivia / iratellenőrzés
- **Alap**: A tanszéki feladatok része. Kérdőívek javítása média, folklór és adminisztrációs témákban.
- Mechanika: Időzített vagy egyszerű választásos kérdések. Helyes válasz pénzt ad (1000–1500 Ft / kérdés).
- Jutalom: A helyes válaszok összege. Illeszkedik a tanári szerephez.
- Korlát: hetente maximum 1–2 alkalom.
- Szórakoztatás: tudás + a karakterek világához kötött kérdések.

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
| Munka (palack / trivia / irat) | 1 | pénz | korlátozott hetente |
| Stat emelés (olvasás, pihenés) | 1 | Jelenlét / Éleslátás / Nyugalom | |
| Randihely (9. héttől) | 1 | közelség, kockázat | pénzbe kerül |
| Pihenés / semmittevés | 1 | harag csökkenés, Nyugalom | |

## Napi / heti korlátok

- Hetente 3 szabad sáv (délelőtt, délután, este).
- Egy sáv = egy fő akció.
- A gyógytorna és a fizetés nem fogyaszt sávot.
- Négy kemény sáv után pihenő kell. Kemény sáv a látogatás, a munka, a minijáték és a randi. A fotel lenullázza.
- Randi és a Polc egy műszakot kér előbb: MOHU vagy kérdőív. A látogatás ettől nem függ.
- A közös szakaszban a lány saját helyén van jelenet a 2. héttől. Lakás bizalom 2-től. A 7–8. héten bizalom 3-nál egy mélyebb jelenet is elfér, utána ez a rész zár. A vágy beteljesítése a zárt útvonal 14. hete.
- Túl sok munka egy héten fáradtságot okoz (következő beszélgetések enyhén rosszabbak).
- A lányok órarendje korlátozza, mikor érhetők el.

A rendszer a meglévő [05-rendszerek.md](05-rendszerek.md) és [08-jatekmenet-es-vegkimenetek.md](08-jatekmenet-es-vegkimenetek.md) szabályaira épül. A minijátékok a `src/game/ui/minigames.tsx`-ben vannak.
