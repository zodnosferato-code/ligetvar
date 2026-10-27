import {message} from './scene-localization.ts';
import type {Scene} from './types.ts';
import {say,option,shared} from './authoring.ts';
export const spine:Scene[]=[
 shared(1,message('scene.opening.title'),'classroom',['marton','rebeka','boglarka','greta','soma'],[
  say('narrator',message('scene.opening.arrival')),
  say('greta',message('scene.opening.gretaIntroduction')),
  say('rebeka',message('scene.opening.rebekaIntroduction'),'amused'),
  say('boglarka',message('scene.opening.boglarkaIntroduction')),
  say('marton',message('scene.opening.exerciseInstructions'),'neutral',[
   option('demonstrate',message('scene.opening.choice.demonstrate'),'Gréta elteszi a jelenléti ívet. Rebeka leengedi a gépet; Boglárka elindítja a stoppert.'),
   option('observe',message('scene.opening.choice.observe'),'Boglárka előbb figyel, aztán maga áll be a körbe. Senkit nem kell rábeszélni.')]),
  say('narrator',message('scene.opening.exerciseResult')),
  say('soma',message('scene.opening.somaIntroduction'),'displeased'),
  say('marton',message('scene.opening.martonReply')),
  say('narrator',message('scene.opening.departure'))
 ],['grounding'],'Megismertem a három hallgatót és Somát. Az önkéntes földelőgyakorlat segít észrevenni a figyelem elkalandozását.'),
 shared(2,'Egy hiányzó este','department',['marton','soma','greta','rebeka','boglarka','denes'],[
  say('greta','Soma tegnap nem jött el a leltárra. Ma reggel négy órányi munkát készített el húsz perc alatt. A kimaradt időpont ettől még kimaradt.'),
  say('soma','Néha elég rájönni, hogyan figyeljenek végre rád. Ma felhívtak az ösztöndíjbizottságtól. A rossz kávét is jobb kedvvel iszom.','amused'),
  say('rebeka','Lilla tegnap estétől ma délig nem válaszolt. Most visszajött, de nem bír felmenni a lépcsőn. Nem kérek tőle képet.'),
  say('denes','Megvizsgáltam. Kimerült, sérülést nem találtam. Elindult a könyvtárból, a következő emléke pedig a reggeli busz. Most pihenésre van szüksége.'),
  say('boglarka','Külön írom, amit ő mond, és amit mi feltételezünk. Az üres helyet a jegyzetben nem tölthetjük ki helyette.'),
  say('marton','Előbb megkérdezzük, akar-e beszélni velünk.','neutral',[
   option('ask','Dénesen keresztül kérek egy rövid, visszautasítható beszélgetést.','Dénes vállalja, hogy megkérdezi. Az egészségi adatok nála maradnak.'),
   option('space','Adok neki egy napot; jelezzük, hogy meghallgatjuk, ha szeretné.','Lilla másnap üzen: tíz percet vállal, fénykép nélkül.')]),
  say('narrator','Soma lendülete és Lilla hiányzó estéje egyelőre két külön tény. Földelést felajánlhatnak, elveszett emlékek visszaadását nem ígérik.')
 ],['returned_lilla'],'Lilla kimerülten tért vissza, és hiányzik egy estéje. Soma elmulasztott egy találkozót, majd feltűnően energikusan tért vissza. Az okot még nem ismerjük.'),
 shared(3,'Tíz perc, felvétel nélkül','library',['marton','lilla','rebeka','boglarka','greta'],[
  say('lilla','Tíz perc. Az arcomat ne fényképezzétek le, a hangomat se tegyétek sehova. Nem szeretném, hogy az egész épület engem nézzen.'),
  say('rebeka','A gép a táskában marad. Ha később kell kép a helyszínről, előbb megmutatom neked.'),
  say('marton','Bármikor abbahagyhatjuk.','neutral',[
   option('listen','A saját szavaiddal mondd, ameddig jólesik.','Lilla maga választja ki, honnan kezdi.'),
   option('timeline','Csak az utolsó biztos időpontot keressük meg.','Gréta megmutatja a naplót; Lilla javítja a dátumot.')]),
  say('lilla','Fél kilenc volt. Valaki azt mondta: „Maradt még egy hely neked.” Azt hittem, a szakkörre hívnak. Ugyanezt hallottam a lépcsőn is. A következő dolog a reggeli busz volt.'),
  say('boglarka','A „valaki hívott” nem jelenti, hogy tudjuk, ki volt. Az ismétlődő mondatot idézetként jelölöm; a beszélőt ismeretlenül hagyom.'),
  say('greta','A kártyanaplóban 20:34 áll, utána 6:12. Ez két biztos pont. A közötte lévő rész még nincs meg.'),
  say('lilla','Ennyi elég. A nevem helyett legyen L. a közös jegyzetben.'),
  say('narrator','Becsukják a füzetet. Van egy pontos idézetük és két időpontjuk, de nincs bizonyítékuk a tettesre.')
 ],['phrase','time_gap'],'Lilla engedélyével rögzítettük az ismételt mondatot és a hiányzó időt. A hang gazdája ismeretlen.',{evidence:['grounding','returned_lilla']}),
 shared(4,'A képek és a névsor','library',['marton','rebeka','boglarka','greta','julia'],[
  say('narrator','Rebeka a helyszínképeket, Gréta a kártyanaplót hozza. Boglárka külön lapra teszi az idézeteket. Júlia csak a tanúk által megosztható változatot kapja meg.'),
  say('rebeka','A gépem órája hét percet siet. Ha ezt nem javítom, úgy látszik, mintha Lilla az eltűnése után is itt lett volna.'),
  say('greta','A belépési rendszer óráját aznap állították be. Az időpontokat ehhez igazítom.'),
  say('boglarka','Az „elvitték” szót húzzuk ki. Azt tudjuk, hogy bement a folyosóra. Azt még nem, hogy kivel és miért.'),
  say('julia','A helyi történetekben van hívogató hang, de a hasonlóság nem bizonyíték. A pontos lejegyzés többet ér egy hangzatos párhuzamnál.'),
  say('marton','Külön maradjon a tény és a feltételezés.','neutral',[
   option('separate','Közösen javítsuk az időrendet, az eredetiket megőrizve.','A hétperces eltérést és a javítás szerzőjét is rögzítitek.'),
   option('check','Előbb mindenki ellenőrizze a saját forrását.','Gréta három oszlopot nyit, és jelöli a bizonytalanságokat.')]),
  say('narrator','A három külön hozzájárulásból összeáll a könyvtártól a lezárt lépcsőig vezető út. Az ajtón túl továbbra is hiányzik az este.')
 ],['timeline'],'A korrigált fényképidő, az eredeti idézet és a belépési napló a lezárt lépcsőig vezet.',{evidence:['phrase','time_gap']}),
 shared(5,'Ugyanaz a mondat','holdkor',['marton','rebeka','boglarka','greta'],[
  say('narrator','A vetítőt keresik. A szomszédos, üres tárolóból ismerős hang szól: „Maradt még egy hely neked.”'),
  say('rebeka','Ez az én hangom. De én nem mondtam semmit.','displeased'),
  say('marton','Ne induljatok a hang után. Saját lélegzet, talp a kövön, tekintet az órán.','neutral',[
   option('ground','Végigvezetem a már megtanult földelést.','A csoport visszatalál a saját tempójához.'),
   option('withdraw','Előbb visszalépünk a világos lépcsőhöz.','Biztonságos távolságból is megfigyelhető az ismétlés.')]),
  say('boglarka','Ugyanazzal a szünettel mondja. A kérdésemre nem válaszol. Ez ismétlés, nem beszélgetés.'),
  say('greta','A tároló kulcsa nálam van. Nem nyitjuk ki egyedül. Jelzek Áronnak.'),
  say('narrator','A hang harmadszor is ugyanott vesz levegőt. Mire Áron leér, elhallgat. A földelés a figyelmüket hozta vissza; a hang forrását nem mutatta meg.')
 ],['borrowed_voice'],'Egy üres helyiségből szólt Rebeka hallott mondata. A hang nem tudott új választ adni; a földelés segített ellenállni.',{evidence:['grounding','phrase','timeline']}),
 shared(6,'Az ajánlat ára','courtyard',['marton','soma','denes','rebeka','boglarka','greta'],[
  say('soma','Megkaptam a vendégelőadói lehetőséget. Régebben egy szót sem hagytak végigmondani. Most mindenki talál rám időt.','amused'),
  say('greta','A meghívó valódi. Az előkészítő találkozó éjszakára került. Ez nem szokásos.'),
  say('denes','Egy másik hallgató is visszatért. A nevét nem adhatom tovább. Elismerést ígértek a munkájáért; ezért ment el. Utána órák estek ki.'),
  say('boglarka','Az indoka érthető. Az, hogy elment, nem beleegyezés olyasmibe, amiről nem tudott.'),
  say('rebeka','Nem használom az arcát. A helyszín képét is ő választhatja ki, ha szeretné.'),
  say('marton','A két esetet személyes adatok nélkül vetjük össze.','neutral',[
   option('protect','Az állapotok és az engedélyezett időpontok elégségesek.','Dénes mindkét esetnél ugyanazt a szokatlan kimerülést igazolja.'),
   option('consent','Kérjünk külön engedélyt a csoporttal megosztott részletekre.','Az időpontok megoszthatók, a személyes üzenetek magánügyek maradnak.')]),
  say('narrator','Az egyikük társaságot, a másikuk elismerést keresett. A kimerülés és az elveszett idő mégis közös.')
 ],['pattern'],'Két visszatérő embernél azonos a kimerülés és a kieső idő mintája, eltérő személyes indítékok mellett.',{evidence:['borrowed_voice']}),
 shared(7,'A hiányos leírás','library',['marton','rebeka','boglarka','greta','julia','aron'],[
  say('aron','Felügyelettel hozzáférhettek a régi kísérleti anyagokhoz. Másolatot jegyzőkönyv mellett készítünk.'),
  say('greta','Soma neve szerepel annál a kötetnél, amelyikből kitéptek egy lapot. A félév előtt kérte ki.'),
  say('julia','A korábbi tanúk sikertelen sötétmágiai kísérletekről beszélnek. Ezek nem bizonyítanak korábbi vámpírtámadásokat.'),
  say('boglarka','A megmaradt rész önként végzett átalakulást ír le. Kölcsönzött életerőt említ; befejezés nélkül az állapot instabil.'),
  say('rebeka','A lap szélén ugyanaz a pinceablak van, mint egy régi képen. A kör vége viszont leszakadt.'),
  say('marton','A hiány is része a bizonyítéknak.','neutral',[
   option('copy','Az egész megmaradt oldalt másoljuk, a hiánnyal együtt.','Áron hitelesíti, Júlia jelöli a bizonytalan olvasatot.'),
   option('index','Az oldalszám alapján keressük a hiányzó mellékletet.','Egy régi karbantartási jegyzékhez jut az utalás.')]),
  say('narrator','A leírás magyarázhatja a kimerülést. A befejezés helyét és módját még nem ismerik. Rebeka és Boglárka egymással egyeztet új időpontot.')
 ],['ritual_fragment','archive_access'],'Soma kikérte az önkéntes, életerőt kölcsönző átalakulás hiányos leírását. A régi ügyek sikertelen kísérletek voltak.',{evidence:['pattern']}),
 shared(8,'Kinek mondjuk el?','classroom',['marton','rebeka','boglarka','greta','denes','julia'],[
  say('greta','Az esetek dátumai és Soma távollétei fedik egymást. Kell még tőle független megerősítés.'),
  say('denes','A tanúk adatai nálam maradnak. A segítségük nem függ attól, kivel vagytok személyes kapcsolatban.'),
  say('julia','Én a hiányzó szöveget keresem. Áron hozzáférést biztosít. Most a tervezett tájékoztatásról kell döntenünk.'),
  say('marton','Az érintettek beleegyezése minden változatban szükséges.','neutral',[
   option('public','Ellenőrzött, engedélyezett bizonyítékokra épülő nyilvános beszámolót készítünk.','A tanúk neve nem lesz a nyilvánosság ára.',{disclosure:'public'}),
   option('limited','Egyelőre korlátozott hozzáférésű jelentést készítünk.','Dénes és Júlia külön példányt őriz.',{disclosure:'limited'}),
   option('private','A csoport és a segítők között tartjuk az ügyet.','Ez védheti a magánszférát, de megkönnyítheti az intézményi hallgatást.',{disclosure:'private'})]),
  say('rebeka','A közös munka attól még közös, ha a magánéletünk másfelé megy. A nyomozást ne egy kapcsolat oldja meg.'),
  say('boglarka','A szándék sem kész kapcsolat. Elmondhatjuk, merre mennénk, de külön kell beszélnünk róla.'),
  say('narrator','A tervezőben személyes irány választható: egyéni közeledés, óvatos közös lehetőség vagy barátság. Ez nem jelent mások helyett kimondott igent.')
 ],['investigation_plan'],'Szétosztottuk a nyomozás feladatait és döntöttünk a tájékoztatásról. A romantikus irány egyelőre szándék.',{evidence:['archive_access','ritual_fragment']}),
 shared(9,'Független ellenőrzés','department',['marton','greta','rebeka','boglarka','aron','denes'],[
  say('aron','Az érintett engedélyével ellenőriztem a meghívót: Soma intézményi címéről küldték. A más által vezetett belépési napló ugyanazt az estét mutatja.'),
  say('greta','Két külön rendszer, két külön kezelő. Az eredetik mellé tesszük a javításokat.'),
  say('rebeka','A tanú a helyszínképen azonosította a lépcsőt. Magát nem akarta a sorozatba.'),
  say('boglarka','A meghívó, a helyszín és a napló egymástól függetlenül mutat Somára. Ez már több, mint időbeli egybeesés.'),
  say('denes','Kimerült tanúval nem rendezünk szembesítést. A következő lépésben a segítők mennek.'),
  say('marton','Az állításaink mögött maradjon ellenőrizhető forrás.','neutral',[
   option('document','Áronnal hitelesített másolatot kérünk.','A tanú saját példányt kap.'),
   option('review','Júliával külön is átnézetjük az összefüggést.','Az ellenőrzés nem függ a személyes útvonaltól.')]),
  say('narrator','Soma neve először kerül a jegyzet ellenőrzött részébe. A szándékát még tőle vagy további iratokból kell megtudni.')
 ],['identity'],'Független meghívó-, belépési és helyszínadatok Somához kötik az eseteket.',{evidence:['investigation_plan','timeline']}),
 shared(10,'A könnyű siker','department',['marton','soma'],[
  say('narrator','Soma új plakátot hoz. A vendégelőadáson az ő neve áll az első sorban.'),
  say('soma','Ha nem bolygatod az archívumot, a műhelyed megkapja a pénzt és a termet. Végre azt csinálhatod, amihez értesz.'),
  say('marton','Mit tettél a leírással?'),
  say('soma','Végigcsináltam. Magamtól, tudatosan. Elegem volt abból, hogy mindenki tehetségesebbnek és kívánatosabbnak látszik nálam. Most észrevesznek. Már csak be kell fejeznem.','displeased'),
  say('marton','Az elismerés nem indok arra, hogy mások erejét elvedd.','neutral',[
   option('refuse','A műhely jövőjét nem cserélem hallgatásra.','Soma leteszi a plakátot. Az ajánlatot nem fogadod el.'),
   option('question','Ez nem válasz arra, mi történt az eltűnt emberekkel.','Soma elhárítja a kérdést. Megállapodást nem ígérsz.')]),
  say('soma','Nem tudok bármit akaratni velük. Aki semmit nem akar tőlem, azt egy szép mondattal nem tartom ott. De mindig van valami, amire az ember vágyik.'),
  say('narrator','Távozása után Márton leírja a beszélgetést. A tudatos átalakulás beismerés; a hatalom korlátait még ellenőrizni kell.')
 ],['deliberate_transformation'],'Soma beismerte a tudatos átalakulást. Sikerért és figyelemért tette, a befejezésre készül.',{evidence:['identity','ritual_fragment']}),
 shared(11,'A nemet nem írja felül','courtyard',['marton','soma','julia','denes','greta'],[
  say('narrator','Júlia és Dénes felügyeli a találkozót; a kijáratok szabadok. Soma az archívumi másolatokat akarja vissza.'),
  say('soma','Gréta, nálam nem maradnál mások táblázatai mögött. Hozd ide az iratokat, és beszéljünk a te nevedről is.'),
  say('greta','Szeretném, hogy elismerjék a munkámat. Attól még nem adom oda, ami nem csak az enyém. Nem megyek veled.'),
  say('narrator','Soma figyelme magára vonja a tekintetet. Gréta a lélegzetét számolja, és a kijáratnál marad. A nemet nem váltja igenre a hatás.'),
  say('marton','Gréta döntését nem tárgyaljuk újra.','neutral',[
   option('support','Lezárom a beszélgetést, és együtt megyünk vissza.','Dénes ellenőrzi Gréta állapotát. Az ajánlat vonzó része és az elutasítás egyszerre volt valós.'),
   option('witness','Júlia rögzítse pontosan az elutasítást.','A felerősített figyelem nem írta át az akaratot.')]),
  say('julia','A rajongás és az ambíció erősítése veszélyes, de nem szeretet teremtése. Ezt most már nem csak a leírásból tudjuk.')
 ],['fascination_limit'],'Felügyelet mellett láttuk: a figyelem és ambíció erősítése ellenére hatásos marad az elutasítás. A vámpír nem teremthet szerelmet.',{evidence:['deliberate_transformation','grounding']}),
 shared(12,'A kitépett lap másolata','library',['marton','boglarka','rebeka','greta','julia','aron'],[
  say('aron','A régi karbantartási mellékletnél volt egy másodpéldány. Megvan a hiányzó lap, nem Soma hozta vissza.'),
  say('boglarka','A kölcsönzött életerőt helyhez kötött horgony tartja össze. A nyitott rítus horgonyának megszakítása végzetes összeomlást okoz az átalakultnak.'),
  say('julia','Ez ennek az instabil átalakulásnak a feltétele, nem általános vámpírellenes fegyver. A pontos helyet és időt is tudnunk kell.'),
  say('greta','Soma a tizenötödik hétre kért éjszakai hozzáférést. Van határidőnk.'),
  say('rebeka','A rajzon három padlóba süllyesztett rögzítés van. Az archív fotókon keresem meg, melyik helyiségben volt ilyen.'),
  say('marton','A következményt nem hallgatjuk el.','neutral',[
   option('explain','Mindenki értse, hogy Soma belehalhat a rítus megszakításába.','Senki nem kap hamis ígéretet veszélytelen megoldásról.'),
   option('help','Dénest és Áront is bevonjuk a kivonulás tervébe.','A szakmai segítség románctól függetlenül jár.')]),
  say('narrator','Külön helyeken őrzik a teljes másolatot. A végső gyengeség és az időpont még a konfrontáció előtt ismertté vált.')
 ],['anchor_rule','completion_date'],'Megvan a teljes leírás: a nyitott horgony megszakítása halálos összeomlást okoz. Soma a 15. hétre készül.',{evidence:['ritual_fragment','fascination_limit']}),
 shared(13,'A régi gépészeti kamra','chamber',['marton','rebeka','boglarka','greta','aron'],[
  say('narrator','Áron nappal nyitja ki a kamrát. Régi vezetékek futnak a falon, a szerelőakna körül három rögzítés látszik.'),
  say('rebeka','Ugyanaz a repedés, mint az archív fotón. Nem szép kép kell: a méretarány és a három pont legyen rajta.'),
  say('boglarka','A kör kötés, nem ajtó vagy puszta jelkép. A három rögzítést együtt kell megszakítani, amíg a folyamat nyitott.'),
  say('greta','Ez a kijárat a szolgálati lépcsőre vezet. Soma nem zárhatja le külön. A másik irány zsákutca.'),
  say('aron','A rítus idején itt leszek. A kijárat akkor sem marad őrizetlen, ha ti nem bírjátok.'),
  say('marton','Most ellenőrizzük a helyet; idő előtt nem bolygatjuk a horgonyt.','neutral',[
   option('map','Felrajzolom a távolságot és a kijáratot.','A visszavonulási út mindenkinek ismert.'),
   option('record','A képek mellé közösen írunk pontos leírást.','A helyszín rögzítése nem függ a személyes iránytól.')]),
  say('narrator','A kamra a kastély valós alaprajzának része lett. Mindenki megkeresi a kijáratot, mielőtt visszazárják az ajtót.')
 ],['chamber_location'],'Azonosítottuk a kamrát, a három rögzítést és a szolgálati kijáratot.',{evidence:['anchor_rule','completion_date']}),
 shared(14,'A terv, aminek ára van','classroom',['marton','rebeka','boglarka','greta','denes','julia','aron'],[
  say('narrator','Krétával jelölik a kamra méreteit. A visszatérő tanúk biztonságos helyen maradnak.'),
  say('denes','A külön próba és a segítői beosztás javít az esélyeken. Ha kimaradnak, akkor is közbelépünk, csak nagyobb lehet a veszteség.'),
  say('julia','A nyitott állapotot a három rögzítés egyszerre változó fénye jelzi. A leírást a kamra megfigyelése is alátámasztja.'),
  say('aron','Soma tudja, hogy lent jártunk. Visszakérte a kulcsokat, de a felügyeletet nem mondtam le.'),
  say('marton','Aki nem vállalja a veszélyt, más feladatot kap. A felkészülés nem szerelmi bizonyíték.','neutral',[
   option('share','Megosztom a feladatokat, és elfogadom a segítséget.','A szerepek világosak; a szabad sávokban még lehet külön gyakorolni.'),
   option('protect','Én a horgonyhoz megyek, a többiek a saját határukról döntenek.','Dénes nem ígér sérthetetlenséget. Az ellátás közös ügy.')]),
  say('greta','A magánéleti ígéreteinket se a riadalom vigye helyettünk tovább.'),
  say('narrator','Ez az utolsó hét a konfrontáció előtti személyes alkalmak pótlására. A két szabad sávban felkészülés, találkozó vagy pihenés választható.')
 ],['intervention_plan'],'Megbeszéltük a nyitott rítus jelét, a feladatokat és a kijárat védelmét. A segítség nem személyes kapcsolatért jár.',{evidence:['chamber_location','anchor_rule']}),
 shared(15,'A megszakított befejezés','chamber',['marton','soma','denes','julia','aron','rebeka','boglarka','greta'],[
  say('narrator','A három rögzítés egyszerre világosodik ki. Soma a kör közepén áll. A kijáratnál Áron vár, Dénes mellette. A tanúk nem kerültek ide.'),
  say('soma','Végre nem könyörgök azért, hogy figyeljenek rám. Hagyd befejezni. Holnapra mindenki a sikerem kezdeteként emlékszik erre.'),
  say('marton','Az elveszett esték és az elvett erő nem a te sikered. A leírást ismerjük. A kötés most nyitott.'),
  say('narrator','Soma hallott hangon hívja a csoportot a lépcső felé. Ugyanaz a mondat ismétlődik. Márton a földelésre emlékeztet, Dénes a megingó emberekhez lép. A hang nem dönthet helyettük.'),
  say('marton','Most kell megszakítani a három kötést.','neutral',[
   option('signal','Jelzek a segítőknek, együtt oldjuk a rögzítéseket.','Áron a kijáratot biztosítja, Júlia a nyitott állapotot ellenőrzi.'),
   option('anchor','A horgonyhoz lépek, és fedezetet kérek.','Dénes átveszi, aki nem bírja tovább. A három rögzítés megszakad.')]),
  say('narrator','A kör fénye megszűnik. Soma saját hangján próbál megszólalni, aztán a kölcsönzött életerő széthullik. A teste mozdulatlanná válik. Dénes ellenőrzi, majd kimondja: meghalt.'),
  say('julia','Most kifelé. Az iratok csak akkor jönnek velünk, ha értük menni nem veszélyeztet senkit.'),
  say('narrator','A külön felkészülés határozza meg, mennyi erő és bizonyíték marad náluk. A vámpír meghalt. A felépülés és a felelősség kérdése előttük áll.')
 ],['vampire_dead'],'Megszakítottuk a horgonyt. Soma instabil átalakulása összeomlott, a vámpír meghalt. A segítők mindenkit kivezettek.',{evidence:['intervention_plan','borrowed_voice','fascination_limit']}),
 shared(16,'A megmaradt idő','department',['marton','rebeka','boglarka','greta','denes','julia','aron'],[
  say('denes','Lilla jobban van, de még hamar elfárad. A hiányzó emlékeket nem erőltetjük vissza. Mindenki más ütemben épül fel.'),
  say('julia','A bizonytalan és sérült részleteket annak jelöltem. Nem készítünk szebb történetet a tények helyére.'),
  say('aron','A vezetés várja a jelentést. A korábbi tájékoztatási döntést most megerősíthetitek vagy módosíthatjátok.'),
  say('marton','A tanúk magánadatait egyik változat sem adja oda.','neutral',[
   option('public','Az ellenőrzött, engedélyezett bizonyítékok alapján nyilvános elismerést kérek.','A bizonyítékok megőrzése számít abban, mennyit ismer el a főiskola.',{disclosure:'public'}),
   option('limited','Korlátozott jelentést adunk, saját példányt is megőrizve.','Áron átvételi igazolást kér. A főiskola részleges magyarázatot adhat.',{disclosure:'limited'}),
   option('private','A személyes védelmet választom, nyilvános ügy nélkül.','Az ellátás folytatódik. Az intézmény könnyebben hallgathat a lényegéről.',{disclosure:'private'})]),
  say('rebeka','Nem a kamra képével akarom lezárni a sorozatot. Kell egy délután, amikor nem bizonyítékot keresünk.'),
  say('boglarka','A nevemet írom a kész szövegre. Hogy kinek mutatom meg először, már nem a nyomozás feladata.'),
  say('greta','Két szabad sávunk még van. A jelentés nem zárja be helyettünk a félévet.'),
  say('narrator','Az intézményi választ rögzítik. A személyes utóbeszélgetésekre és a baráti találkozóra még a végső epilógus előtt sor kerülhet.')
 ],['aftermath'],'Rendeztük a bizonyítékokat és a jelentést. A személyes utóbeszélgetésekre még két szabad sáv van.',{evidence:['vampire_dead']})
];
spine[14].resolution='confrontation';spine[15].resolution='institution';

