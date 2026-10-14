# Karakterek (bővített, szexuális fókuszú)

Az életkor kanonikus. Egyik lány sem fiatalabb 19-nél. A főiskola 18 éves kortól vesz fel hallgatót, de ők már nem az első napjukat töltik tizennyolc évesen: Boglárka 19, Rebeka 20, Gréta 21. Más hallgató nem választható. A háttérben mozgó embereknek nincs romantikus jelenetük.

A testalkat a sziluett miatt van leírva, hogy a képek ne essenek szét. Az intim háttér és a vágyak a [06-intim-szotar.md](06-intim-szotar.md) kódjaival vannak leírva, de a történet és a dialógusok explicit szexuális tartalommal vannak kidolgozva a játék céljának megfelelően.

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
| Magasság | 175 cm, a három közül a legmagasabb |
| Alkat | nőies, hangsúlyos derék és csípő, egyenes tartás, hosszú lábak, formás fenék, közepes mellbőség ami a magas nyakú ruha alatt is sejthető |
| Haj | derékig érő, egyenes fekete haj, a bal oldalán tompa szilvakék tincs, gyakran a szemébe esik |
| Arc | sápadt, éles szemfestés, sötét bogyószínű száj, anyajegy a bal szeme alatt, hideg de intenzív tekintet |
| Testjel | vékony, régi sebhely a hasán (jobb oldal, derékvonal felett), amit szégyel és eltakar, de intim pillanatokban megmutatható |
| Alapruha | hosszú ujjú, magas nyakú fekete midiruha, a gallérnál kis kulcslyuk ami a dekoltázst sejti, ezüst karika-nyakék, fekete platformcsizma, egy ezüst gyűrű. Mozgás közben a ruha a csípőjére feszül. |
| Hang | lassú, pontos, ritkán emeli meg. Nem káromkodik dísznek. Intim helyzetben halkabb, lélegzetesebb. |
| Intim | `exp_limited` · `desire_yield_control`, `desire_private_intense`, `theme_power_forbidden`, `theme_no_audience` |

### Jellem
Gőgös, pontos, hideg. A sötétség nála ízlés és páncél. Nem tűri a gúnyt vagy a felülmúlást. Rövid mondatok, kérdés kérdéssel. Ha átlagosnak látják, kegyetlen tud lenni a szóval. Privátban szeretné átadni a kontrollt, hogy a páncél lehulljon.

### Problémák (6)
1. A Holdkör nélkül érdektelennek érzi magát nappali fényen.
2. A sebhelyét szégyelli, undorítónak vagy gyengének látná.
3. Attól fél, hogy a tanár csak egy történetet keres belőle.
4. A gőgje miatt nehezen enged közel senkit.
5. Nem bírja a közönséget (`theme_no_audience`).
6. A családi „fázis”-bánásmód érinti.

### Szexuális vágyak (kódolt + explicit)
- `desire_yield_control` — kontroll átadása, sebezhetőség méltósággal. Szereti, ha a partner vezet, ő pedig enged, és a testét szabadon használhatják.
- `desire_private_intense` — intenzív, privát, közönség nélkül. Mély csókok, erős érintés, orgazmusig vezető szex sötétben.
- `theme_power_forbidden` — a tiltott / hatalmi helyzet izgalma (csak ha nem élnek vissza vele). A tanár-diák viszony izgatja.
- `theme_no_audience` — csak zárt térben. A nyilvánosság undorítja.

### Teljesülési szabály
A problémák + vágyak összesen 10 elem. Ha legalább **7** (kétharmad) teljesül (flag vagy jelenet által), és megvan a `hatar` + magas bizalom, akkor lépünk a végállapotba (`desire_fulfill`).

### Útvonaljelzők (példák a teljesüléshez)
- `rebeka_kor`, `rebeka_feny`, `rebeka_foto`, `rebeka_seb`, `flag_rebeka_desire_fulfill` stb.

## Boglárka Fazekas

Referencia: [references/boglarka-fazekas.jpg](references/boglarka-fazekas.jpg)

| | |
| --- | --- |
| Kor | 19 |
| Év | elsőéves, irodalom |
| Magasság | 150 cm, a három közül a legalacsonyabb |
| Alkat | viszonylag telt, puha, nagyobb mellbőség ami a kardigán alatt is kiemelkedik, kerek arc és váll, puha has, formás csípő és combok |
| Haj | világosbarna, laza copf a jobb vállán, gyakran kibomlik |
| Arc | kerek, szeplős, nincs szemüvege, a szeme gyakran lefelé tart, de az arca látszik, könnyen elpirul |
| Alapruha | túl nagy mohazöld kardigán, ekrü magas nyakú ruha a lábszár közepéig, sötét harisnya, barna vászoncipő, mindkét kézzel egy csukott keménytáblás könyv. A kardigán gyakran lecsúszik a válláról. |
| Hang | halkan kezd, és ha biztonságban van, szárazabb és viccesebb, mint bárki várná. Intim helyzetben remegő, halk nyögésekkel. |
| Intim | `exp_none` · `desire_slow_explore`, `desire_body_praise`, `theme_power_forbidden` |

### Jellem
Félénk, megfigyelő, precíz a mondataiban. A könyv és a kardigán páncél. Ha biztonságban van, száraz humorú. Türelmet kíván. A testét szégyelli, de vágyik a dicséretre és a lassú felfedezésre.

### Problémák (6)
1. A testét (alacsony, telt, nagyobb mellbőség) szégyelli, eltakarja.
2. Attól fél, hogy csak addig érdekes, amíg senki nem néz oda.
3. A mondatait gyakran elvágják, vagy nem várják meg.
4. Az új hely (főiskola) ijeszti.
5. A tanár beosztása gyanús neki.
6. Nem akarja, hogy a teste legyen az első, amit számon tartanak.

### Szexuális vágyak (kódolt + explicit)
- `desire_slow_explore` — lassú, biztonságos felfedezés. Csókok, érintés a ruhán át, majd lassú vetkőzés, gyengéd szex.
- `desire_body_praise` — a test elfogadása és dicsérete. Hallani szeretné, hogy a mellbősége, a puha formái kívánatosak.
- `theme_power_forbidden` — enyhe hatalmi izgalom, de óvatosan. A tanár vezetése izgatja.

### Teljesülési szabály
Problémák + vágyak összesen 9 elem. Ha legalább **6** (kétharmad) teljesül, és megvan a `hatar` + magas bizalom, akkor lépünk a végállapotba.

### Útvonaljelzők
- `boglarka_margo`, `boglarka_nev`, `boglarka_udvar`, `boglarka_test` stb.

## Gréta Váradi

Referencia: [references/greta-varadi.jpg](references/greta-varadi.jpg)

| | |
| --- | --- |
| Kor | 21 |
| Év | harmadéves, alkalmazott médiaelemzés, tanszéki demonstrátor |
| Magasság | 168 cm |
| Alkat | karcsú, egyenes, sportos, kisebb de formás mellek, hosszú lábak, feszes fenék |
| Haj | rézvörös, magas lófarok, egy sárga ceruza átdugva a hajgumín, gyakran kibomlik |
| Arc | vékony, téglalap szemüveg, halvány szeplő az orron, összeszedett, majdnem szigorú száj, ami könnyen megnyílik |
| Alapruha | fehér ing, sötét erdőzöld kötött mellény, térdig érő grafitszoknya, sötét harisnya, fekete lapos cipő, rövid nyakpánt üres belépőkártyával. A mellény gyakran feszül a mellén. |
| Hang | gyors, tagolt, a végén gyakran ellenőrzi, hogy pontos volt-e. Intim helyzetben elakad, majd enged. |
| Intim | `exp_none` · `desire_rule_break`, `desire_yield_control`, `theme_power_forbidden` |

### Jellem
Precíz, szabálykövető, stréber. A lista és a pontosság biztonság. Távolságtartó, de nem félénk. A kivétel gyanús neki. Vágyik arra, hogy elengedje a kontrollt.

### Problémák (5)
1. Csak a teljesítménye miatt maradnak vele.
2. A kivétel (ha egy szabály rá nem vonatkozik) gyanús.
3. Nehezen enged el a kontrollt.
4. A tanár beosztása miatt minden kedvességet kivételnek lát.
5. Nem tudja kérni, hogy „csak úgy” maradjanak.

### Szexuális vágyak (kódolt + explicit)
- `desire_rule_break` — a szabályok elengedése. Szeretné, ha „tilos” dolgokat csinálnának vele.
- `desire_yield_control` — kontroll átadása. Bilincs, vezetés, passzív szerep.
- `theme_power_forbidden` — a hatalmi helyzet enyhe izgalma. A tanár-diák viszony.

### Teljesülési szabály
Problémák + vágyak összesen 8 elem. Ha legalább **6** (kétharmad) teljesül, és megvan a `hatar` + magas bizalom, akkor lépünk a végállapotba.

### Útvonaljelzők
- `greta_lista`, `greta_hiba`, `greta_nem_vizsga` stb.

## Általános teljesülési szabály (mindhárom lánynál)

Minden lánynak van egy listája a problémáiról és a kódolt vágyairól. Ezek összege a „teljesítendő elemek”. Ha a játékos legalább **kétharmadát** teljesíti (flag, jelenet, dialógus hatás), és megvan a magas bizalom + `hatar`, akkor nyílik a végállapot (`act_desire_fulfill`). A pontos számokat a fenti listák adják. A kódban ez egy egyszerű számláló vagy flag-halmaz ellenőrzés.

## Hogyan férnek össze

Nem barátnők. Rebeka Boglárkát láthatatlannak hiszi, amíg egyszer nincs igaza egy versről. Boglárka Grétát ijesztőnek látja, mert Gréta mindig tudja, hány perc van. Gréta Rebekát rendetlenségnek látja, és titokban irigyli, hogy Rebekának nem kell hasznosnak lennie.

A közös szakasz nyolc hét. Egy-egy súrlódás elég köztük, nem lesz belőle külön barátság-útvonal. Páros romantikus vég csak ott van, ahol a személyiség engedi, a [05-rendszerek.md](05-rendszerek.md) szerint: Boglárka és Gréta igen, Rebeka és Gréta nehezen, Rebeka és Boglárka nem. Mindhárom lány egyszerre senkivel nem jön össze.

## Amit egyikőjüknél sem csinál a szöveg

- Nem fiatalítja őket 19 alá, és nem beszél róluk gimnazistaként.
- Nem használja a testüket jutalomként vagy ugratásként a főhős szájából anélkül, hogy annak ára lenne a bizalomban.
- Az intim témák a [06-intim-szotar.md](06-intim-szotar.md) kódjaival vannak jelölve. Explicit jelenetek csak később, a megfelelő bizalmi szinten és útvonalon kerülhetnek be, és a kódbázis ettől függetlenül építhető.
- Nem keveri a jelmezt: Rebekán nincs kardigán és nincs szemüveg, Boglárkán nincs szemüveg és nincs platformcsizma, Grétán nincs fekete ruha és nincs copf.
