# Karakterek

Az életkor kanonikus. Egyik lány sem fiatalabb 19-nél. A főiskola 18 éves kortól vesz fel hallgatót, de ők már nem az első napjukat töltik tizennyolc évesen: Boglárka 19, Rebeka 20, Gréta 21. Más hallgató nem választható. A háttérben mozgó embereknek nincs romantikus jelenetük.

A testalkat a sziluett miatt van leírva, hogy a képek ne essenek szét. Az intim háttér és a vágyak a [06-intim-szotar.md](06-intim-szotar.md) kódjaival vannak leírva, hogy a build agent a kódbázison dolgozhasson anélkül, hogy explicit tartalommal kellene foglalkoznia.

A jövőbeli képgenerálás a [04-vizualis-biblia.md](04-vizualis-biblia.md) promptját használja, ezt a lapot pedig a személyiséghez.

## Márton Kelényi

A játékos karaktere. Alapnév, átnevezhető. 34 éves. Tanulmányi vezető, heti egy műhely. Sötét, egyszerű ruha, nem öltöny-karikatúra: ing, sötét mellény, nincs nyakkendő. Az arca még nincs lerögzítve, és addig nem generálunk hozzá képet, amíg a vonásai nincsenek külön jóváhagyva.

Nem mentő és nem ragadozó a szöveg alapállása. A választások eldöntik, hogy csendes, hiú vagy óvatos. A `hatar` jelző akkor születik, ha egyszer, a lány előtt, kimondja: a műhely és a beosztása nem tartozás. Enélkül nincs igaz vég.

A három lány az elején nem a rajongói. Rebeka unja a tanárokat. Boglárka kerüli a tekintetét. Gréta a szabályt nézi, nem az embert.

## Rebeka Dorn

Referencia: [references/rebeka-dorn.jpg](references/rebeka-dorn.jpg)

| | |
| --- | --- |
| Kor | 20 |
| Év | másodéves, média |
| Magasság | 172 cm, a három közül a legmagasabb |
| Alkat | nőies, hangsúlyos derék és csípő, egyenes tartás |
| Haj | derékig érő, egyenes fekete haj, a bal oldalán tompa szilvakék tincs |
| Arc | sápadt, éles szemfestés, sötét bogyószínű száj, anyajegy a bal szeme alatt |
| Testjel | vékony, régi sebhely a hasán (jobb oldal, derékvonal felett), amit szégyel és eltakar |
| Alapruha | hosszú ujjú, magas nyakú fekete midiruha, a gallérnál kis kulcslyuk, ezüst karika-nyakék, fekete platformcsizma, egy ezüst gyűrű |
| Hang | lassú, pontos, ritkán emeli meg. Nem káromkodik dísznek. |
| Intim | `exp_limited` · `desire_yield_control`, `desire_private_intense`, `theme_power_forbidden`, `theme_no_audience` |

**Ki ő.** A Holdkör este az alagsorban ül össze: fekete ruha, olcsó gyertya, vers és éjszakai fotó. Diákkör, nem szervezet és nem toborzó szekta. Rebeka úgy viselkedik, mintha az övé lenne. Gőgös, és a gőg dolgozik: ha átlagosnak látják, unatkozó és kegyetlen tud lenni a mondatban. Nem bánt fizikailag senkit, és nem vezet be senkit semmilyen valós gyakorlatba. A sötétség nála ízlés és páncél.

A családja rendes, világos lakás, ahol az ő ruhája „fázis”. Ezt egyszer, későn mondja el, és utálja, ha sajnálják érte.

**Intim háttér (kódolt).** `exp_limited`. A rejtett preferenciák a szótár szerint: `desire_yield_control`, `desire_private_intense`, `theme_power_forbidden`, `theme_no_audience`.

**Sebhely.** Vékony, régi hegesedés a hasán. Gyerekkori balesetből maradt. Eltakarja, és ha valaki meglátja vagy megemlíti, hideggé válik. A történet része: a bizalommal és a `desire_private_intense` / elfogadás mentén oldódik (nem kell „meggyógyítani”, csak elfogadni).

**Mit akar.** Hogy valaki ne ijedjen meg, és ne is próbálja felülmúlni az ő sötétségét. A verseny unalmas. A nyugalom ritka.

**Mitől fél.** Hogy a kör nélkül, nappali fényen, nincs benne semmi, ami érdekes. Hogy a sebhelyet undorítónak vagy gyengének látják. És hogy a tanulmányi vezető csak egy történetet keres, amit később elmesélhet.

**Viszony az elején.** Lekezeli. „Tanár úr” hidegen, soha nem becézi. Ha valaki Rebinek hívja, kijavítja. A főhős beosztása inkább ellenérv, mint izgalom: szerinte a tanárok akkor bátrak, amikor nincs közönség.

**Beszéd.** Rövid mondatok. Kérdést kérdéssel tol vissza. Dicséretet gúnynak hall, hacsak nem nagyon konkrét. A jó választás nem az, hogy „különleges vagy”, hanem hogy egy adott fotójáról vagy mondatáról megmondod, mi működik benne.

**Hol van.** Este, a Holdkörben. Délelőtt nem elérhető: alszik, vagy úgy tesz. Délután néha az udvaron, de az már útvonal-esemény, nem ismételhető.

**Bemutatkozó jelző.** `rebeka_kor` — egyszer végnézed, hogy a kört rendezi, és nem veszed el tőle a terem kulcsát.

**Útvonaljelzők, amik kellenek az igaz véghez.**

- `rebeka_feny` — nappal találkoztok, a festék és a kör nélkül
- `rebeka_foto` — megmutat egy képet, amit nem a körnek készített
- `rebeka_seb` — a sebhelyet meglátod és nem undorodsz / nem sajnálod nyíltan; elfogadó maradsz
- `hatar` — a közös határ-mondat

**Törésjelző.** `rebeka_kozonseg` — a főhős más előtt henceg a Holdkörrel vagy vele. Ezt nem bocsátja meg. A sebhely nyilvános említése is ide vezethet.

**Vége, egy-egy sorban.** Igaz: a kör ajtaja mögötted csukódik, és ő kint marad veled a folyosón. Csendes: visszahív a következő estre, a szokott helyére, a szokott hangján. Törés: a pletykát ő viszi végig, hidegen és pontosan, mielőtt te tehetnéd.

**Arckifejezések későbbi sprite-hoz.** semleges gőg, félmosoly, unalom, düh (csendes), meglepetés, őszinte és rövid zavar, lesütött szem festék nélkül.

## Boglárka Fazekas

Referencia: [references/boglarka-fazekas.jpg](references/boglarka-fazekas.jpg)

| | |
| --- | --- |
| Kor | 19 |
| Év | elsőéves, irodalom |
| Magasság | 150 cm, a három közül a legalacsonyabb |
| Alkat | viszonylag telt, puha, nagyobb mellbőség, kerek arc és váll |
| Haj | világosbarna, laza copf a jobb vállán |
| Arc | kerek, szeplős, nincs szemüvege, a szeme gyakran lefelé tart, de az arca látszik |
| Alapruha | túl nagy mohazöld kardigán, ekrü magas nyakú ruha a lábszár közepéig, sötét harisnya, barna vászoncipő, mindkét kézzel egy csukott keménytáblás könyv |
| Hang | halkan kezd, és ha biztonságban van, szárazabb és viccesebb, mint bárki várná |
| Intim | `exp_none` · `desire_slow_explore`, `desire_body_praise`, `theme_power_forbidden` |

**Ki ő.** Új a főiskolán, és úgy foglal helyet, mintha a székét kérné kölcsön. Sokat eszik egyedül, sokat olvas, a margóra ír. A telt alkatát nem poénnak használja a szöveg, és más szereplő poénja sem marad válasz nélkül: ha a főhős erre céloz, a bizalom nem nő, a közelség eshet.

A könyvtár mélyén ül, nem a bejáratnál. A fülhallgató a nyakában van, ritkán a fülében. Elsőéves, tehát a kampuszt még tanulja. Nem naiv: pontosan tudja, ki a tanulmányi vezető, és ez eleinte ijeszti.

**Intim háttér (kódolt).** `exp_none`. A rejtett preferenciák a szótár szerint: `desire_slow_explore`, `desire_body_praise`, `theme_power_forbidden`.

**Testés szégyen.** Az alacsonyabb, teltebb alkat és a nagyobb mellbőség miatt gyakran eltakarja magát a kardigánnal és a könyvvel. A történet része: a lassú bizalomépítés és a `desire_body_praise` / `desire_slow_explore` mentén oldódik az, hogy nem kell szégyellnie a testét.

**Mit akar.** Olyan beszélgetést, ami nem vizsga és nem udvariasság. Hogy a mondatát végighallgassák, akkor is, ha lassan éri utol.

**Mitől fél.** Hogy csak addig fér hozzá a figyelem, amíg senki nem néz oda. És hogy a teste az első, amit egy idegen számon tart.

**Viszony az elején.** „Elnézést” és félreállás. A könyvet magasabban fogja, ha valaki megáll a sora végén. A főhős korát nem problémázza; a beosztását igen. Akkor enged közelebb, ha a főhős nem a tanszék nevében beszél.

**Beszéd.** Hosszú mondat, amit gyakran elvág egy „mindegy”. A jó válasz megvárja a mondat végét. A türelmetlenség itt törés felé visz, még ha udvarias is.

**Hol van.** Délután, a könyvtárban. Este nem marad: a kollégiumba megy, ahová a játék nem követi. Délelőtt szemináriumon ül, nem elérhető.

**Bemutatkozó jelző.** `boglarka_margó` — elolvashatod, amit egy kölcsönkönyv margójára írt, és visszaadod anélkül, hogy felolvasnád neki hangosan.

**Útvonaljelzők.**

- `boglarka_nev` — te soha nem Boginak hívod; valaki más igen, és te nem neveted el
- `boglarka_udvar` — egyszer kijön a könyvtárból veled az udvarra, még ha csak öt percre is
- `boglarka_test` — a testét dicséred vagy elfogadod anélkül, hogy objektumként kezelnéd (`desire_body_praise`)
- `hatar`

**Törésjelző.** `boglarka_szem` — a főhős a teste elé beszéli a személyét, vagy a többiek előtt hozakodik elő vele, mielőtt ő készen állna.

**Vége.** Igaz: az udvaron nem fordítja el az arcát, amikor valaki elmegy mellettetek. Csendes: a könyvtárban marad a helyetek, és a félév után is csak oda hív. Törés: a könyv feljön a mellkasáig, és többé nem ül abba a sarokba, amíg te a házban vagy.

**Arckifejezések.** szégyenlős semleges, kis mosoly, elpirulás, ijedtség, őszinte nevetés (ritka), megbántottság, elszántság.

## Gréta Váradi

Referencia: [references/greta-varadi.jpg](references/greta-varadi.jpg)

| | |
| --- | --- |
| Kor | 21 |
| Év | harmadéves, alkalmazott médiaelemzés, tanszéki demonstrátor |
| Magasság | 168 cm |
| Alkat | karcsú, egyenes |
| Haj | rézvörös, magas lófarok, egy sárga ceruza átdugva a hajgumín |
| Arc | vékony, téglalap szemüveg, halvány szeplő az orron, összeszedett, majdnem szigorú száj |
| Alapruha | fehér ing, sötét erdőzöld kötött mellény, térdig érő grafitszoknya, sötét harisnya, fekete lapos cipő, rövid nyakpánt üres belépőkártyával |
| Hang | gyors, tagolt, a végén gyakran ellenőrzi, hogy pontos volt-e |
| Intim | `exp_none` · `desire_rule_break`, `desire_yield_control`, `theme_power_forbidden` |

**Ki ő.** A tanszék óráit fejből tudja, a teremkulcsot ő veszi fel, a jelenléti ívet ő hiányolja. Stréber, és ezt nem szégyelli: a pontosság az, amiben biztonságban van. Szociálisan nem ügyetlen bohóc. Ügyetlen akkor, amikor a beszélgetésnek nincs feladata. A viccet érti, csak későn nevet, mintha ellenőrizné, szabad-e.

A vörös haj és a szemüveg a jel. Nem visel kardigánt, nem visel feketét alapnak, nem sminkeli magát Rebeka módjára. A ceruza mindig a hajában van, akkor is, ha nem ír.

**Intim háttér (kódolt).** `exp_none`. A rejtett preferenciák a szótár szerint: `desire_rule_break`, `desire_yield_control`, `theme_power_forbidden`.

**Mit akar.** Hogy egyszer ne a teljesítménye miatt maradjanak vele a teremben. Ezt nem tudja kérni.

**Mitől fél.** A kivétel. Ha egy szabály rá nem vonatkozik, gyanús. A főhős beosztása miatt minden kedvességet kivételnek lát, amíg az ellenkezője nincs bizonyítva.

**Viszony az elején.** Magáz, határidőket mond, és a szemébe néz, mert az illik. Nem félénk. Távolságtartó. Ha a főhős lazának próbál tűnni, Gréta azt hanyagságnak olvassa, és a bizalom nem mozdul.

**Beszéd.** „Konkrétan.” Szereti, ha egy kérésnek ideje és vége van. A jó választás vállal egy pontos megfigyelést a munkájáról, nem egy általános dicséretet. A rossz választás a jegyeire vagy a demonstrátori helyére céloz.

**Hol van.** Délelőtt, a tanszéki előtérben. Délután gyakran óra van, nem elérhető. Este hazamegy tanulni; az esti sáv az ő útvonalán később, megírt kivétel, nem a szokásos órarendje.

**Bemutatkozó jelző.** `greta_lista` — egy adminisztratív hibát vele együtt javítotok, és nem te írod alá helyette, hogy „majd elmegy”.

**Útvonaljelzők.**

- `greta_hiba` — egyszer te hibázol, kimondod, és nem kéred, hogy fedje el
- `greta_nem_vizsga` — egy beszélgetésnek nincs tanulsága és nincs következő lépése, és ő mégis marad
- `hatar`

**Törésjelző.** `greta_eszkoz` — a főhős a demonstrátori megbízására vagy a szakmaiságára hivatkozva kerít alkalmat a közeledésre.

**Vége.** Igaz: a ceruza a hajában marad, a lista le van téve, és nem keres következő napirendi pontot. Csendes: tisztelettel elköszön a szünet előtt, és a jövő félév órarendjét küldi el, semmi mást. Törés: a kulcsot visszateszi a szekrénybe, a jelentkezését demonstrátornak más tanárhoz viszi, és többé nem magyaráz.

**Arckifejezések.** koncentrált semleges, kis elégedett mosoly, összevont szemöldök, meglepetés, zavar (elpirul, de beszél), düh (fegyelmezett), nevetés, amit elkap.

## Hogyan férnek össze

Nem barátnők. Rebeka Boglárkát láthatatlannak hiszi, amíg egyszer nincs igaza egy versről. Boglárka Grétát ijesztőnek látja, mert Gréta mindig tudja, hány perc van. Gréta Rebekát rendetlenségnek látja, és titokban irigyli, hogy Rebekának nem kell hasznosnak lennie.

A közös szakasz nyolc hét. Egy-egy súrlódás elég köztük, nem lesz belőle külön barátság-útvonal. Páros romantikus vég csak ott van, ahol a személyiség engedi, a [05-rendszerek.md](05-rendszerek.md) szerint: Boglárka és Gréta igen, Rebeka és Gréta nehezen, Rebeka és Boglárka nem. Mindhárom lány egyszerre senkivel nem jön össze.

## Amit egyikőjüknél sem csinál a szöveg

- Nem fiatalítja őket 19 alá, és nem beszél róluk gimnazistaként.
- Nem használja a testüket jutalomként vagy ugratásként a főhős szájából anélkül, hogy annak ára lenne a bizalomban.
- Az intim témák a [06-intim-szotar.md](06-intim-szotar.md) kódjaival vannak jelölve. Explicit jelenetek csak később, a megfelelő bizalmi szinten és útvonalon kerülhetnek be, és a kódbázis ettől függetlenül építhető.
- Nem keveri a jelmezt: Rebekán nincs kardigán és nincs szemüveg, Boglárkán nincs szemüveg és nincs platformcsizma, Grétán nincs fekete ruha és nincs copf.
