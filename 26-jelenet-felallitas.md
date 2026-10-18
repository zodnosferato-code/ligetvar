> **Történeti dokumentum.** A redesignnal ütköző szabályokat a [Ligetvar-Redesign-Plan.md](Ligetvar-Redesign-Plan.md) és a jelenlegi [ENGINE.md](ENGINE.md) váltja fel. Karakterazonosság és asset-proveniencia megőrzendő; ez a szöveg nem aktív történetforrás. Új dialógusban legfeljebb négy kontextuális választás van, kötelező jó/rossz ranglétra nélkül.

# Jelenetfelállítás és kamera-perspektíva

Ez a dokumentum rögzíti, hogyan épülnek fel a játék jelenetei vizuálisan: milyen nézőpontból látjuk a lányokat, és hogyan jelennek meg a telefonon. A korábbi dokumentumok (04, 10, 20) a képgenerálási szabályokat és a sávokat írják le; ez a dokumentum a **kamera és a jelenet felépítését** határozza meg.

## Főképernyő (hub)

A főképernyő háttérképe (lakosztály vagy tanszéki iroda) tartalmazza a kattintható tárgyakat (ajtó, könyv, fotel, zsák, telefon, polc).  
Ezek a tárgyak a gombok — nem véletlenszerűen elhelyezett lebegő ikonok.  
Minden tárgyhoz tartozik egy dedikált ikon (lásd [27-ikonok-es-gombok.md](27-ikonok-es-gombok.md)), amely csak hover/fókusz/nyitott állapotban jelenik meg. A hotspot átlátszó réteg a tárgy fölött.

## Alapelv: láthatatlan főszereplő

A mi karakterünk (a játékos) **soha nem jelenik meg** a képen. A játékos a saját szemszögéből nézi a jelenetet — mintha ő maga állna a helyszínen.

## Alapnézet: szemből / enyhén diagonálisan

- A lány **szemben áll velünk**, vagy enyhén diagonálisan (féloldalasan), a mi perspektívánkból.
- Ez a nézet a kétszereplős dialógusok alapja: a tekintet, az arckifejezés és a testtartás közvetlenül a játékoshoz szól.
- A lány arca és szeme a kép fókuszában van; a tekintet iránya és a mimika viszi a jelenetet.

## Tartaléknézet: oldalnézet

- Csoportos jeleneteknél (pl. tanterem, ahol több szereplő vagy a térbeli elrendezés fontos) az **oldalnézet** használható.
- Az oldalnézet jobban mutatja a helyszínt és a szereplők egymáshoz viszonyított helyzetét, de kevésbé közvetlen, mint a szembenézet.
- Szabály: alapból szembenézet; oldalnézet csak akkor, ha a jelenet térbeli vagy csoportos információt hordoz.

## Telefonos megjelenítés

- **Portré-orientáció** (függőleges), egy kézzel játszható.
- A lány portréja a kép felső/középső részén, nagy és jól látható.
- Szövegdoboz alul, a névvel; a választások egymás alatt, legalább 48 px magas gombokkal (ujjbarát, nem kell célzni).
- A dialógusok rövid mondatai pont erre valók: telefonon a hosszú bekezdések fárasztóak.
- Háttér: 320×180 natív felbontás, egész számú nagyítással (a 10-vizualis-stilus.md szerint).

## Jelenet felépítése (egy tipikus dialógus-jelenet)

1. **Háttér** — a helyszín (terem, lakás, udvar), a 04-vizualis-biblia.md színeivel.
2. **Lány sprite** — 64–80 px magas, cserélhető arc (a 22-arckifejezes.md szerint), szemből vagy enyhén diagonálisan.
3. **Szövegdoboz** — alul, név + mondat, lokalizált kulccsal.
4. **Választások** — max. 4 db, egymás alatt, effect-ekkel (closeness, trust, anger, risk, flags).
5. **Állapotgép frissítés** — a választás hatása a GirlStateMachine fázisait viszi előre.

## Érzelmi állapot jelzése

A lány érzelmi állapota ebben a nézetben a következőkből olvasható:

- **Tekintet iránya** — ránk néz, elfordul, lefelé néz (félénkség).
- **Testtartás** — kihúzott, görnyedt, enyhén elfordult.
- **Arc** — a 22-arckifejezes.md-ben definiált cserélhető arcok (semleges, mosoly, szigorú, zavart, stb.).
- **Apró mozgások** — kulcsjelenetekben 2–4 frame-es animáció (haj, ruha, kéz).

## Összefoglaló szabályok

- A főszereplő láthatatlan; a lány szemből vagy enyhén diagonálisan, a mi szemszögünkből.
- Oldalnézet csak csoportos/térbeli jelenetekhez.
- Telefonon portré, nagy ujjbarát gombok, rövid mondatok.
- Minden kép a 04-vizualis-biblia.md kanonikus blokkjával generálódik.

Kapcsolódó dokumentumok: [04-vizualis-biblia.md](04-vizualis-biblia.md), [10-vizualis-stilus.md](10-vizualis-stilus.md), [20-kep-jelenet-lista.md](20-kep-jelenet-lista.md), [22-arckifejezesek.md](22-arckifejezesek.md), [09-dialog-es-architektura.md](09-dialog-es-architektura.md).