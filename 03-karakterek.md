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

### Jellem
Gőgös, pontos, hideg. A sötétség nála ízlés és páncél. Nem tűri a gúnyt vagy a felülmúlást. Rövid mondatok, kérdés kérdéssel. Ha átlagosnak látják, kegyetlen tud lenni a szóval.

### Problémák (6)
1. A Holdkör nélkül érdektelennek érzi magát nappali fényen.
2. A sebhelyét szégyelli, undorítónak vagy gyengének látná.
3. Attól fél, hogy a tanár csak egy történetet keres belőle.
4. A gőgje miatt nehezen enged közel senkit.
5. Nem bírja a közönséget (`theme_no_audience`).
6. A családi „fázis”-bánásmód érinti.

### Szexuális vágyak (kódolt, 4)
- `desire_yield_control` — kontroll átadása, sebezhetőség méltósággal.
- `desire_private_intense` — intenzív, privát, közönség nélkül.
- `theme_power_forbidden` — a tiltott / hatalmi helyzet izgalma (csak ha nem élnek vissza vele).
- `theme_no_audience` — csak zárt térben.

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
| Alkat | viszonylag telt, puha, nagyobb mellbőség, kerek arc és váll |
| Haj | világosbarna, laza copf a jobb vállán |
| Arc | kerek, szeplős, nincs szemüvege, a szeme gyakran lefelé tart, de az arca látszik |
| Alapruha | túl nagy mohazöld kardigán, ekrü magas nyakú ruha a lábszár közepéig, sötét harisnya, barna vászoncipő, mindkét kézzel egy csukott keménytáblás könyv |
| Hang | halkan kezd, és ha biztonságban van, szárazabb és viccesebb, mint bárki várná |
| Intim | `exp_none` · `desire_slow_explore`, `desire_body_praise`, `theme_power_forbidden` |

### Jellem
Félénk, megfigyelő, precíz a mondataiban. A könyv és a kardigán páncél. Ha biztonságban van, száraz humorú. Türelmet kíván.

### Problémák (6)
1. A testét (alacsony, telt, nagyobb mellbőség) szégyelli, eltakarja.
2. Attól fél, hogy csak addig érdekes, amíg senki nem néz oda.
3. A mondatait gyakran elvágják, vagy nem várják meg.
4. Az új hely (főiskola) ijeszti.
5. A tanár beosztása gyanús neki.
6. Nem akarja, hogy a teste legyen az első, amit számon tartanak.

### Szexuális vágyak (kódolt, 3)
- `desire_slow_explore` — lassú, biztonságos felfedezés.
- `desire_body_praise` — a test elfogadása és dicsérete.
- `theme_power_forbidden` — enyhe hatalmi izgalom, de óvatosan.

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
| Alkat | karcsú, egyenes |
| Haj | rézvörös, magas lófarok, egy sárga ceruza átdugva a hajgumín |
| Arc | vékony, téglalap szemüveg, halvány szeplő az orron, összeszedett, majdnem szigorú száj |
| Alapruha | fehér ing, sötét erdőzöld kötött mellény, térdig érő grafitszoknya, sötét harisnya, fekete lapos cipő, rövid nyakpánt üres belépőkártyával |
| Hang | gyors, tagolt, a végén gyakran ellenőrzi, hogy pontos volt-e |
| Intim | `exp_none` · `desire_rule_break`, `desire_yield_control`, `theme_power_forbidden` |

### Jellem
Precíz, szabálykövető, stréber. A lista és a pontosság biztonság. Távolságtartó, de nem félénk. A kivétel gyanús neki.

### Problémák (5)
1. Csak a teljesítménye miatt maradnak vele.
2. A kivétel (ha egy szabály rá nem vonatkozik) gyanús.
3. Nehezen enged el a kontrollt.
4. A tanár beosztása miatt minden kedvességet kivételnek lát.
5. Nem tudja kérni, hogy „csak úgy” maradjanak.

### Szexuális vágyak (kódolt, 3)
- `desire_rule_break` — a szabályok elengedése.
- `desire_yield_control` — kontroll átadása.
- `theme_power_forbidden` — a hatalmi helyzet enyhe izgalma.

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
