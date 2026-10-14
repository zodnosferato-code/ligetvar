# Hogyan működik egy alap randiszimulátor

Ez a lap a műfaj működését rögzíti, nem a Ligetvár jeleneteit. A végén ki van mondva, mit veszünk át belőle.

## Két rokon, de nem azonos műfaj

**Visual novel.** Elsősorban történet. A játékos olvassa a jelenetet, néha választ, és a választás más ágra, más végkifejletre visz. Kevés a „játék” a szavak között. A szereplő iránti pont gyakran csak láthatatlan rendező: eldönti, melyik útvonal nyílik meg. A történet íve a szerzőé.

**Randiszimulátor.** Elsősorban viszonykezelés. A játékosnak véges ideje van egy naptáron (nap, hét, félév, iskolaévek). Ezt az időt helyszínekre, tevékenységekre és beszélgetésekre költi. A cél egy kiválasztott szereplő vonzalmának felépítése, mielőtt lejár az idő. Ha senkihez nem kerül elég közel, az vereség, nem csak „egy szomorúbb fejezet”.

A kettő keverhető. Sok játék visual novelként néz ki (háttér, sprite, szövegdoboz), és randiszimulátorként viselkedik (naptár, stat, idő). A Ligetvár ilyen hibrid: a jelenetek megírt párbeszédek, a közöttük lévő döntés az, mire költöd a hetet.

A műfaj alapját a *Tokimeki Memorial* (1994) tette le: több év, napi beosztás, saját statok és több szereplő rejtett vagy látható vonzalma. A *Persona* társas kapcsolatai ugyanezt a logikát használják egy nagyobb játék belsejében: egy időpont egy ember, a rang küszöbe nyitja a következő jelenetet.

## Amit a játékos valójában csinál

Egy kör így áll össze:

1. A naptár ad egy időpontot. Délelőtt, délután, este, vagy egy hét néhány szabad sávja.
2. A játékos helyet vagy tevékenységet választ. Nem minden szereplő van mindenhol, minden sávban.
3. Ha ott van valaki, jelenet indul: néhány sor, majd egy választás.
4. A választás számokat és jelzőket módosít.
5. Elfogynak a sávok, telik az idő, új események nyílnak vagy záródnak be.
6. A határidőn (szünet, félév vége, ballagás) a számok és a jelzők eldöntik a végkifejletet.

A „közelebb kerülni” tehát nem egyetlen jó mondat. Ismételt, időbe kerülő döntések sora. Aki minden hetet egy lánynál tölt, lemarad a saját statjairól vagy a kockázatról. Aki csak statot fejleszt, barátság nélkül ér a félév végére.

## Affekció, a műfaj középmutatója

Minden választható szereplőnek van egy vonzalomértéke. A párbeszéd ágai hozzáadnak vagy levonnak belőle. Két felhasználása van:

- **Visual novelben** rendezőeszköz. A közös szakasz végén a szkript összehasonlítja a pontokat, és a legmagasabb felé ágazik. A játékos gyakran nem is látja a számot.
- **Randiszimulátorban** maga a játék. A játékos tudatosan ezt növeli, korlátozott idő alatt. Ilyenkor a mérő látható, vagy erős visszajelzést kap (arc, egy sor, egy halk hang), még ha a pontos szám rejtett is.

A pont önmagában kevés. A jobb játékok szétválasztják:

- **Közelség** — mennyit voltatok együtt, mennyire figyel rád.
- **Bizalom vagy hangulat** — milyen *minőségű* ez a közelség. Lehet magas a pont egy rossz okból (nyomulós, kihasználó, csak a titok izgalma), és ettől más végkifejlet jár.
- **Kapu** — egy jelenet nem a 40. pontnál indul automatikusan, hanem ha a közelség megvan, és egy korábbi jelző is igaz, és a naptár megfelelő hete van.

A Ligetvárban a közelség látható, a bizalom fokozatai ritkábbak és a történetet nyitják, a kockázat külön tengely.

## Idő, a szűkös erőforrás

A naptár nélkül a randiszimulátor visual novellé laposodik: bármikor újra beszélgethetsz, amíg a mérő tele nem lesz. Az idő teszi döntéssé a látogatást.

Tipikus megoldások:

- Fix időszak: egy hónap, egy félév, három iskolaév.
- Napi vagy heti sávok. Egy sáv egy tevékenység.
- A szereplők saját órarendje. A könyvtáros típus délután a könyvtárban van, este már nem.
- Ismételhető „lógás” kevés pontot ad. Az egyszeri, megírt esemény sokat, és csak egyszer történik meg.

A vereség gyakran nem az, hogy rosszat mondtál, hanem hogy elfogyott a félév, mielőtt a viszony megérett volna.

## Jelzők és események

A **jelző** (flag) igaz vagy hamis állapot. „Látta a rajzát.” „Megígérte, hogy nem szól senkinek.” „A folyosón más is hallotta.” A pont ezt nem tudja kifejezni.

Egy történetesemény akkor indul, ha a feltételei egyszerre igazak. Példa, nem Ligetvár-jelenet:

- 4. hét vagy később
- az adott lány közelsége legalább 30
- a bizalma legalább 2. fokozat
- a „közös szeminárium” jelző még hamis
- este van, és a helyszín a tanszéki folyosó

Ha a feltétel teljesül, az esemény lejátszódik, és többé nem ismétlődik. Ha a játékos sosem megy oda abban a sávban, a jelző kimarad, és a későbbi igaz végkifejlet zárva marad. Ezért kell több mentés, vagy egy újrajátszás, ami a már látott szöveget átugorja.

A jelzők típusai, amiket érdemes szétválasztani:

- **történet** — látta-e a kulcsjelenetet
- **választás** — mit mondott egy konkrét kérdésre
- **világ** — más szereplő tud-e a dologról
- **zár** — eldőlt-e már, kinek az útvonalán vagyunk

## Útvonalak

Két bevett szerkezet van.

**Tudatos választás.** A bevezető után a játékos eldönti, kivel foglalkozik. Onnantól a többiek háttérbe húzódnak. A további választások nem azt döntik el, kibe vagy szerelmes, hanem hogy a vége jó, közepes vagy rossz lesz-e.

**Pontverseny.** Sokáig mindenki elérhető. A közös szakasz végén az kap útvonalat, akinél a pont a legmagasabb, és átlép egy küszöböt. Holtversenynél vagy a küszöböt elért szereplők közül választ a játékos, vagy a játék dönt.

A közös szakasz feladata, hogy mindhárom embert megmutassa, mielőtt a félév leszűkül. A Ligetvárban a szűkülés nem mindig egyetlen lány: két összeillő személyiség páros útvonalra mehet. Ezt a [05-rendszerek.md](05-rendszerek.md) köti, nem a műfaj általános leírása.

## Végkifejletek

Szereplőnként legalább három vége szokott lenni:

- **Igaz vég.** A közelség magas, a bizalom teljes, a kötelező jelzők megvannak, és a melléktengely (itt: a botrány kockázata) nem borult fel.
- **Csendes vagy közepes vég.** Van viszony, de hiányzik a bizalom, a nyilvános vállalás, vagy egy kulcsjelző. Nem büntetés: egy másik, befejezetlenebb élet.
- **Törés.** Egy súlyos választás, vagy a kockázat elszabadulása. A viszony megszakad, esetleg a főhős állása is.

Külön van az **egyedül** vég: senki küszöbe nem teljesült. Randiszimulátorban ez a tényleges vereség.

Az igaz véget nem egyetlen utolsó mondat adja. A félév során gyűjtött bizalom teszi lehetővé az utolsó jelenetet, és az utolsó jelenet választása csak akkor számít, ha a kapu nyitva van.

## Amit a játékos lát

A műfaj képe szinte mindig ugyanaz, azért, mert az olvasást kell szolgálnia:

- helyszín, pixeles háttér
- a szereplő sprite-ja, arckifejezés cserélhető
- névtábla és szövegdoboz
- választógombok, amikor dönteni kell
- a naptár és a közelség valahol a képernyő szélén, nem a szöveg fölött
- térkép vagy helyszínlista a sávok között

A szövegdoboz mellé ezek a funkciók kellenek, különben a játék újrajátszhatatlan:

- mentés és betöltés, több hellyel
- visszaolvasás (mi hangzott el az imént)
- már olvasott szöveg átugrása
- automata lapozás
- hang ki-be

Kulcsjelenethez álló kép (CG) járhat: nem minden sorhoz, csak oda, ahol a viszony tényleg elfordul. A CG a játékos jutalma, és egy galériában később visszanézhető.

## Amit a játék tárol

Egy futás állapota:

- naptári pozíció (hét, sáv)
- közelség szereplőnként
- bizalomfokozat szereplőnként
- a főhős saját statjai
- a kockázat
- a jelzők halmaza
- melyik útvonal zárt be, ha már bezárt
- látott-e egy ismételhető szöveget, az átugráshoz

A mentésnek verziószáma van, hogy egy későbbi tartalomfrissítés ne törje el a régi fájlt. Weben ez a böngésző tárhelye. Tauri alatt ugyanaz a játékállapot egy fájlba kerülhet a gépen. A szabályok nem változnak, csak a mentés helye.

## Mit vesz át a Ligetvár

Randiszimulátor, visual novel jelenetekkel.

- Egy félév, heti sávok, órarend.
- Látható közelség, ritkább bizalomkapuk, külön kockázat.
- Rövid közös szakasz, utána egy lány útvonala.
- Szereplőnként igaz, csendes és tört vég, plusz az egyedül vég.
- Pixeles háttér, cserélhető arckifejezés, szövegdoboz, mentés.

Amit szándékosan nem vesz át: három teljes iskolaév, tucatnyi stat, rejtett pontverseny, és minden olyan vég, ami szexjelenetre fut. A cél a félév alatt felépített közelség, nem egy erotikus játék.

## Források

A fenti felosztás ezekre a leírásokra támaszkodik, nem egyetlen játék másolata:

- [Dating sim — Wikipedia](https://en.wikipedia.org/wiki/Dating_sim): naptár, statisztika, vonzalom, fix játékidő.
- [Affection Systems in Visual Novels Explained — VN Paths](https://vnpaths.com/affection-systems-in-visual-novels-explained/): a pont mint útvonal-rendező a visual novelben, és mint játék a randiszimulátorban.
- [What Is the Difference Between a Visual Novel and a Dating Sim? — VN Paths](https://vnpaths.com/what-is-the-difference-between-a-visual-novel-and-a-dating-sim/): *Tokimeki Memorial* mint a naptár- és stat-alapú minta.
- [Paths to Character Routes — Lemma Soft Forums](https://lemmasoft.renai.us/forums/viewtopic.php?t=34847): tudatos útvonalválasztás szemben a közös szakasz végi pontversennyel.
- [What makes a Japanese dating sim — Date 'em Ups](https://dateemups.com/dating-sim-definition/): akkor randiszimulátor, ha a célhoz stratégia kell, nem csak olvasás.
