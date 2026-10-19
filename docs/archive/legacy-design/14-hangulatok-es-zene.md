> **Történeti dokumentum.** A redesignnal ütköző szabályokat a [Ligetvar-Redesign-Plan.md](Ligetvar-Redesign-Plan.md) és a jelenlegi [ENGINE.md](ENGINE.md) váltja fel. Karakterazonosság és asset-proveniencia megőrzendő; ez a szöveg nem aktív történetforrás. Új dialógusban legfeljebb négy kontextuális választás van, kötelező jó/rossz ranglétra nélkül.

# Hangulatok és végteleníthető instrumentális zene

A játék hangulatai és a hozzájuk tartozó loopolható instrumentális zenék. A zenék háttérben futnak, nem zavarják a párbeszédet, és végteleníthetők (seamless loop).

**Megjegyzés**: Jelenleg nincs zene-generáló eszköz a rendszerben. Ez a dokumentum a stílusokat és a követelményeket definiálja. A zenék később generálhatók (pl. Suno, Udio, vagy más AI zeneeszköz) vagy helyettesíthetők szabadon felhasználható loopokkal.

## Hangulatok és zenék

| Hangulat | Hol használjuk | Zene stílusa | Loop hossza | Megjegyzés |
| --- | --- | --- | --- | --- |
| **Nyugodt tanterem** | Gyógytorna, közös munka | Lágy ambient, lassú zongora + halk vonós, enyhe misztikus felhang | 60–90 mp | Alacsony hangerő, nem zavar |
| **Holdkör este** | Rebeka helye, alagsor | Sötét ambient, halk dob, éteri ének nélküli textúra, enyhe gót | 45–75 mp | Mélyebb, de nem ijesztő |
| **Könyvtár csend** | Boglárka helye | Nagyon halk, meleg ambient, halk gitár vagy kalimba | 60 mp | Szinte háttérzaj |
| **Tanszéki előtér** | Gréta helye, délelőtt | Enyhén ritmikus, tiszta, enyhe elektronikus vagy akusztikus | 50–70 mp | Rendezett, nem stresszes |
| **Lakás este** | Egyéni feladatok, privát | Meleg, intim ambient, halk zongora | 60–80 mp | Közelség érzete |
| **Békás-tó sötétben** | Randihely | Természetes hangok + lágy szintetizátor, enyhe misztikus | 70–100 mp | Elágazó utak hangulata |
| **Feszült / kockázat** | Magas kockázatnál | Enyhén disszonáns, halk, lassú | 40–60 mp | Nem ijesztő, csak feszült |
| **Vég (igaz)** | Igaz végkifejlet | Meleg, feloldó, lassú zongora + vonós | 90 mp | Pozitív, nyugodt |

## Technikai követelmények

- **Formátum**: OGG vagy MP3, 128–192 kbps.
- **Loop**: Seamless (nincs kattintás a végén).
- **Hangerő**: Normalizált, a párbeszéd alatt halkan szól.
- **Instrumentális**: Nincs ének, nincs szöveg.
- **Stílus**: Pixel-manga játékhoz illő, modern ambient / lo-fi / enyhe elektronikus.

## Javasolt fájlnevek

- `music/classroom_calm.ogg`
- `music/holdkor_night.ogg`
- `music/library_quiet.ogg`
- `music/office_morning.ogg`
- `music/apartment_evening.ogg`
- `music/bekas_to_dark.ogg`
- `music/tension_low.ogg`
- `music/ending_true.ogg`

## Használat a kódban

A zene a helyszín és a hangulat szerint változik. A core logika csak a hangulat flag-et adja át a UI-nak (`mood: "classroom_calm"`), a lejátszás a UI rétegen történik.

A dokumentum később bővíthető, ha konkrét zenék készülnek.
