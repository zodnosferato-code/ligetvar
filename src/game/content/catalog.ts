/** Sole active narrative source: typed scheduling, Hungarian dialogue and exact visual metadata. */
import type { ActorId, Choice, Effect, Evidence, Expression, Line, LocationId, Registry, Requirements, Scene } from '../engine/types.ts';
type Spoken={speaker:ActorId;text:string;expression?:Expression;choices?:Choice[]};
const say=(speaker:ActorId,text:string,expression:Expression='neutral',choices?:Choice[]):Spoken=>({speaker,text,expression,choices});
const option=(id:string,text:string,reaction:string,effect?:Effect):Choice=>({id,text,reaction,effect});
function scene(id:string,title:string,kind:Scene['kind'],week:number,deadline:number,location:LocationId,participants:ActorId[],spoken:Spoken[],requires:Requirements={},evidence:string[]=[],journal=title,onComplete?:Effect):Scene {
 const lines:Line[]=spoken.map((l,i)=>({...l,id:'line_'+i,expression:l.expression??'neutral',...(i<spoken.length-1?{next:'line_'+(i+1)}:{})}));
 return {id,title,kind,week,deadline,location,background:location,lighting:location==='holdkor'?'night':'day',participants,requires,evidence,journal,entry:'line_0',lines,contentStatus:'authored',onComplete};
}
const shared=(week:number,title:string,location:LocationId,participants:ActorId[],lines:Spoken[],evidence:string[],journal:string,extra:Requirements={}):Scene=>scene('shared_'+week,title,'shared',week,week,location,participants,lines,{...extra,scenes:week>1?['shared_'+(week-1)]:[]},evidence,journal);
const spine:Scene[]=[
 shared(1,'Az első műhely','classroom',['marton','rebeka','boglarka','greta','soma'],[
  say('narrator','Októberi eső kopog a radiátor fölötti ablakon. Márton Kelényi, harmincnégy éves tanár és tanulmányi felelős, elindítja a fakultatív műhelyt. A mozgásos figyelemgyakorlatot évek óta ismeri; most először tanítja Ligetváron.'),
  say('greta','Gréta Váradi vagyok, huszonegy. Az adminisztrációban segítek, de a gyakorlatot is szeretném megtanulni. A terembeosztásban csütörtök szerepel; ma kedd van. Ezt még az első késés előtt javítsuk ki.'),
  say('rebeka','Rebeka Dorn, húsz. Fotóesszét készítek a műhelyről. Azt állítod, észrevesszük, ha elterelik a figyelmünket? Mutass valamit, ami nem csak jól hangzik. Arcot egyelőre nem fényképezek.','amused'),
  say('boglarka','Fazekas Boglárka, tizenkilenc. A helyi mozdulatsorok eredetét kutatom. Pontosan mit figyelünk: az eltelt időt vagy azt, ahogy emlékezünk rá? A kettő nem feltétlenül egyezik.'),
  say('marton','A talpatok nyomását, három önként választott lélegzetet és a falióra járását. Ez nem vizsga.','neutral',[
   option('demonstrate','Megmutatom, aztán mindenki a saját tempójában próbálhatja.','Gréta elteszi a jelenléti ívet. Rebeka leengedi a gépet; Boglárka elindítja a stoppert.'),
   option('observe','Előbb figyelhettek is; csak az vegyen részt, aki szeretne.','Boglárka előbb figyel, aztán maga áll be a körbe. Senkit nem kell rábeszélni.')]),
  say('narrator','A gyakorlat végén ugyanazt a fél percet mérik. Rebeka észreveszi, hogy a folyosói zajra elfordult; a következő körben tudatosan visszahozza a figyelmét. A módszer segít észlelni a kiesést, nem tesz sérthetetlenné.'),
  say('soma','Végh Soma, egyetemi asszisztens. A raktári kulcsokat én hoztam. A saját kutatási előterjesztésemet harmadszor adták vissza. Ti legalább kaptatok termet.','displeased'),
  say('marton','Az eszközökért köszönöm. A műhely eredményét nem fogom senki pályázatához előre eladni.'),
  say('narrator','Soma a szűkített hozzáférésű archívum felé indul. Gréta kijavítja a dátumot. Rebeka képet kér az üres kör helyéről, Boglárka felírja a mozdulatsor forrását. Mindhárman más kérdéssel maradnak ott.')
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

const foundations:Scene[]=[
 scene('rebeka_1','Rebeka — A kép széle','relationship',1,14,'classroom',['marton','rebeka'],[
  say('narrator','Rebeka három képet tesz az üres tanterem asztalára: egy elmosódott kezet, a radiátor fölötti ablakot és a kör helyét a padlón.'),
  say('rebeka','A Holdkör szerint emberek nélkül nincs történet. Néha attól látszik valaki, amit nem mutatok meg róla. Melyiket hagynád bent?','amused'),
  say('marton','Mit szeretnél, hogy észrevegyek?','neutral',[
   option('interest','A kéz elmosódását. Benne van a mozdulat, mégsem mondja meg, kié.','Rebeka közelebb húzza a széket. „Végre valaki nem azt mondja, hogy élesítsek rajta.”',{bonds:{marton_rebeka:8},decisions:['rebeka_interest']}),
   option('ask','Az ablakot választanám. Te miért fényképezted le?','„Mert a fűtés zúgása közben mindenki kifelé nézett.” Megmutatja a következő képet is.',{bonds:{marton_rebeka:6},decisions:['rebeka_interest']}),
   option('leave','Most nem tudok igazán figyelni. Ezt inkább megmondom.','„Akkor ne játsszunk műkritikust.” A találkozó nem ígért közelséget.',{decisions:['rebeka_withdraw']})]),
  say('rebeka','A munkacím: Ami kívül marad. Nem kell rá bók. Szólj, ha a saját magyarázatom is túl kényelmes.','vulnerable'),
  say('marton','A műhelyt vezetem, de a képeidről nem én mondom ki az utolsó szót.'),
  say('narrator','Rebeka visszarendezi a fotókat. Egy negyediket is letesz: ugyanaz az ablak, egy elhagyott kávéscsészével. Nem feladatnak szánja.')
 ],{scenes:['shared_1']},[],'Rebeka megmutatta a fotóesszéjét. A kép és a magánélet határa az ő döntése maradt.'),
 scene('boglarka_1','Boglárka — A saját nevem','relationship',2,14,'library',['marton','boglarka'],[
  say('narrator','Boglárka három eltérő átiratot tesz az asztalra. Az egyikben a saját mondatai szerepelnek egy ismertebb kutató neve alatt.'),
  say('boglarka','Nem akarok rögtön botrányt. De attól, hogy csendben javítok, még nem azé, aki hangosabban mondja el.'),
  say('marton','Mit szeretnél kezdeni a gyűjtéssel?'),
  say('boglarka','Egy rövid tanulmányt. A nevemmel. Egyetlen olyan lábjegyzet nélkül, amit csak azért írok oda, hogy valaki ne sértődjön meg.','amused'),
  say('marton','Abban segítek, amire megkérsz.','neutral',[
   option('interest','Elolvasom a változatokat, aztán a saját érveidet kérem.','„A harmadik mondatnál ne bólogass olyan gyorsan.” A saját lapját teszi előre.',{bonds:{marton_boglarka:8},decisions:['boglarka_interest']}),
   option('ask','Melyik szóhoz ragaszkodsz leginkább?','Nem más tekintélyével indokolja a választ. Tovább marad a tervezettnél.',{bonds:{marton_boglarka:6},decisions:['boglarka_interest']}),
   option('leave','Ma csak a könyvért ugrottam be.','Boglárka elteszi a szöveget. A rövid találkozó nem ígért személyes folytatást.',{decisions:['boglarka_withdraw']})])
 ],{scenes:['shared_2']},[],'Boglárka a saját neve alatt szeretné kiadni a kutatását. A személyes figyelemről világos választ kapott.'),
 scene('greta_1','Gréta — A lista mögött','relationship',2,14,'department',['marton','greta'],[
  say('narrator','Gréta a teremfoglalást javítja. Az asztal szélén egy túraútvonal hever, ugyanolyan gondosan kiszínezve.'),
  say('greta','A „megbízható Gréta” lassan munkaköri leírás a nevem helyett. A rosszul jelzett ösvényeket jobban szeretem a táblázatoknál.'),
  say('marton','Melyik útra mennél most?'),
  say('greta','A tó körüli rövid körre. Nem teljesítmény. Csak kint vagyok.','amused'),
  say('marton','Az is érdekel, amit magadnak választasz.','neutral',[
   option('interest','Nézzük meg a térképet; az iratokat ma én zárom le.','Nem újabb feladatot ad. A kedvenc kerülőjét mutatja.',{bonds:{marton_greta:8},decisions:['greta_interest']}),
   option('ask','Hol szeretsz megállni a tónál?','„Ott, ahol nem kérdezik, hány lépést mentél.” Elmosolyodik.',{bonds:{marton_greta:6},decisions:['greta_interest']}),
   option('leave','Ma csak a teremkulcsért jöttem.','A kulcsot megkapod. A térképet Gréta magának tartja meg.',{decisions:['greta_withdraw']})])
 ],{scenes:['shared_2']},[],'Gréta a saját szabadidejéről beszélt. A személyes figyelmet nem az adminisztrációért kapta.')
];
const personal={
 rebeka:{
  name:'Rebeka',place:'holdkor' as LocationId,earliest:3,invite:6,
  attraction:['A vetítés után csak a ventilátor hallatszik. Rebeka a képernyő helyett most rád néz.','A képeimről könnyű veled beszélni. Ha flörtölök, azt hiszik, mindent elmondtam. Pedig tetszel, csak nem szeretném, ha ettől a műhelyben másnak lenne igaza.','Lassan szeretnék közelebb kerülni. Nem akarom egyszerre elmondani az egész történetet.'],
  invitation:['A tóparton Rebeka gép nélkül vár, két papírpohár kávéval.','Én hívtalak. Nem kép kell, és a Holdkörnek sem bizonyítunk semmit. Sétálnék veled. Megfoghatom a kezed? Bármikor mondhatjuk, hogy elég.','Jó itt veled. A következő kört nem kell senkinek megmutatnom.'],
  conflict:['A műhely bemutatójának vázlatában a tóparti beszélgetésetek egyik gondolata szerepel.','Azt hittem, ami ott elhangzott, nem lesz reklámszöveg. Nem írtad bele a nevemet, mégis tudom, melyik mondat az enyém.','Ne azt mondd, hogy nem úgy gondoltad. Azt mondd, mit csinálsz most másképp.'],
  repair:'Kiveszem a mondatot. A személyes részletek új felhasználásához külön kérdezek.',
  commitment:'A képeket eltehetem. Azt kérdezem, velem szeretnél-e lenni akkor is, ha nincs mit megmutatnom.',
  aftermath:'A kiállítás képét én választom. Utána viszont nem gratulálni szeretnélek látni, hanem hazasétálni veled.'
 },
 boglarka:{
  name:'Boglárka',place:'library' as LocationId,earliest:4,invite:7,
  attraction:['Boglárka két csészével érkezik. Az üres helyre most nem tesz füzetet.','A második teát neked hoztam. Nem azért, mert tanár vagy, és nem azért, hogy elolvasd a dolgozatomat.','Maradj tíz percig feladat nélkül. Azt hiszem, többet szeretnék a beszélgetéseinktől. Még nem tudom gyorsabban mondani.'],
  invitation:['Boglárka csukva teszi le a könyvet az udvari padra. Veled szemben ül le.','Egy vers miatt akartalak hívni. Aztán rájöttem, megint más mondata helyettem lenne bátor. Szeretnék randizni veled.','És megcsókolnám az arcodat, ha te is akarod. Nem a tanulmányról akarok beszélgetni, és nem megköszönni jöttem valamit.'],
  conflict:['Egy megbeszélésen Márton Boglárka helyett fejezett be egy magyarázatot. A könyvtárban Boglárka nem ül le rögtön.','Segíteni akartál, de mindenki megint téged hallott. Veled sem szeretnék lábjegyzet lenni.','A következő alkalommal várd ki a mondatomat. Akkor is, ha túl lassúnak tartasz.'],
  repair:'Jelzem a csoportnak, hogy az értelmezés a tied, és visszaadom a szót.',
  commitment:'A saját szavaimmal mondom: kapcsolatot szeretnék veled, nem meg nem nevezett mellékszálat valaki életében.',
  aftermath:'A tanulmányra felkerült a nevem. A következő szabad délutánom mellé a tiédet szeretném, a saját szavaimmal.'
 },
 greta:{
  name:'Gréta',place:'courtyard' as LocationId,earliest:5,invite:7,
  attraction:['Az udvaron eláll az eső. Gréta egy üres naptármezőt mutat.','Ezt szándékosan hagytam üresen. Az irodában könnyű azt mondani, hogy szükséged van rám. Itt is maradnál, ha nincs mit megoldanom?','A saját nevemben kérdezem. Vonzódom hozzád; eddig minden mondatot egy elintézendő ügy mögé rejtettem.'],
  invitation:['A tóparton Gréta telefonja felvillan. Ő lenémítja.','A jelentést holnap is leadhatom. A saját estém is számít. Legyen ez randi, ne tegyünk úgy, mintha hibát javítanánk közben.','A tó felé kerülőt választanék. Nem kell megmagyaráznom, miért az a leghatékonyabb út.'],
  conflict:['Márton még egy javítandó iratot tesz a közös délután elé. Gréta nem nyitja ki a dossziét.','Ha minden találkozónk előtt van még egy apró feladat, honnan tudjam, hogy engem vársz? Ne attól legyek fontos, hogy elvégzem, ami másnak nem jutott eszébe.','Ma maradjon itt az irat. Nem megnyugtatást kérek, hanem egy üres délutánt.'],
  repair:'Másnak adom a határidős ügyet; a többit holnap végzem el. Veled megyek.',
  commitment:'Szeretnélek akkor is látni, amikor semmi hasznosat nem csinálok. Erre akarok időt vállalni, nem tökéletesnek lenni.',
  aftermath:'A jelentés elkészült. Van még egy javítanivaló, de holnap megvár. Ma a tóhoz szeretnék menni veled.'
 }
};
for(const girl of ['rebeka','boglarka','greta'] as const){
 const p=personal[girl],bond=('marton_'+girl) as 'marton_rebeka'|'marton_boglarka'|'marton_greta';
 foundations.push(scene(girl+'_2',p.name+' — A kimondott vonzalom','relationship',p.earliest,14,p.place,['marton',girl],[
  say('narrator',p.attraction[0]),say(girl,p.attraction[1],'vulnerable'),say('marton','Mit szeretnél, hogy most ne értsek félre?'),say(girl,p.attraction[2]),
  say('marton','A vonzalom nem ad előnyt, és nem vesz el jogot a nemet mondásra.','neutral',[
   option('yes','Én is keresem ezeket a találkozókat. Szeretnélek közelebbről megismerni.','A kölcsönös vonzalom kimondható, a tempóról továbbra is külön dönthettek.',{bonds:{[bond]:10},decisions:[girl+'_attraction','marton_'+girl+'_attraction_yes']}),
   option('friend','Jó veled lenni, de baráti kapcsolatot szeretnék.','A határt tiszteletben tartjátok. A közös munka folytatódik, a közeledés nem.',{decisions:[girl+'_withdraw']})])
 ],{scenes:[girl+'_1'],decisions:[girl+'_interest'],notDecisions:[girl+'_withdraw']},[],p.name+' és Márton beszéltek a vonzalomról és a személyes tempóról.'));
 foundations.push(scene(girl+'_3',p.name+' — A saját meghívás','relationship',p.invite,14,girl==='boglarka'?'courtyard':'bekas',['marton',girl],[
  say('narrator',p.invitation[0]),say(girl,p.invitation[1],'affectionate'),say('marton','Ezért jöttem. A kezdeményezésedet komolyan veszem.'),say(girl,p.invitation[2]),
  say('marton','A mostani meghívásra válaszolok.','neutral',[
   option('yes','Én is szeretném. A mai időt egymásnak választjuk.','A meghívásra saját igent mondasz. A beszélgetés nem a következő nyomról folytatódik.',{bonds:{[bond]:10},decisions:[girl+'_invitation']}),
   option('slow','A közeledést nem szeretném romantikus irányban folytatni.','A visszautasítást nem teszitek a műhely közös témájává.',{decisions:[girl+'_withdraw']})])
 ],{scenes:[girl+'_2'],decisions:[girl+'_attraction'],notDecisions:[girl+'_withdraw']},[],p.name+' saját személyes meghívására világos választ adtunk.'));
 foundations.push(scene(girl+'_4',p.name+' — A valódi nézeteltérés','relationship',girl==='rebeka'?9:10,14,p.place,['marton',girl],[
  say('narrator',p.conflict[0]),say(girl,p.conflict[1],'displeased'),say('marton','A közelség nem jogosít fel arra, hogy helyetted vagy a magánéletedből beszéljek.'),say(girl,p.conflict[2]),
  say('marton','A javításnak legyen látható következménye.','neutral',[
   option('repair',p.repair,'A jóvátételt végrehajtod; nem egy ajándékkal próbálod kiváltani.',{bonds:{[bond]:8},decisions:[girl+'_repair']}),
   option('withdraw','Nem tudom ezt vállalni. Inkább megállok a kapcsolatunkban.','A személyes folytatás véget ér. A nyomozásban továbbra is együttműködtök.',{decisions:[girl+'_withdraw']})])
 ],{scenes:[girl+'_3'],decisions:[girl+'_invitation'],notDecisions:[girl+'_withdraw']},[],p.name+' és Márton a saját konfliktusukról döntöttek; a jóvátételnek valódi következménye volt.'));
 foundations.push(scene(girl+'_5',p.name+' — Amit vállalunk','relationship',13,14,'courtyard',['marton',girl],[
  say('narrator','A csendes udvaron most nem a következő veszélyről beszéltek. A korábbi jóvátételnek azóta is érvényt kellett szerezni.'),
  say(girl,p.commitment,'vulnerable'),say('marton','Nem ígérek olyat, amit más helyett kellene eldöntenem.'),
  say(girl,'Én ezt választom. Külön időt, őszinteséget és újra megbeszélhető határokat szeretnék. Ha közös kapcsolatot választunk, nem teszünk titkos kizárólagossági ígéretet.','affectionate'),
  say('marton','A vállalásomhoz a saját időmből és a kényelmes titkolózásból is engednem kell.','neutral',[
   option('commit','Én is ezt a kapcsolatot szeretném, a közösen megbeszélt feltételekkel.','Mindketten saját igent mondtatok. A vállalt irányt a tervező többé nem írhatja át.',{decisions:[girl+'_commit',girl+'_yes','marton_'+girl+'_yes'],bonds:{[bond]:12},exposure:5}),
   option('withdraw','Nem akarok elköteleződést ígérni. Itt megállok.','A döntés fájhat, de nem kell hibássá tenni érte valakit.',{decisions:[girl+'_withdraw']})])
 ],{scenes:[girl+'_4'],decisions:[girl+'_repair',girl+'_invitation'],notDecisions:[girl+'_withdraw'],anyOf:girl==='greta'?[{directions:['greta']}]:[{directions:[girl]},{directions:['triad'],decisions:['triad_marton_yes','triad_rebeka_yes','triad_boglarka_yes']}]},[],p.name+' és Márton személyesen döntöttek arról, mit vállalnak.'));
 foundations.push(scene(girl+'_6',p.name+' — A következő délután','relationship',16,16,girl==='greta'?'bekas':'courtyard',['marton',girl],[
  say('narrator','A kamra után először találkoztok újabb ellenőrizendő nyom nélkül. A csendet nem siettetitek.'),
  say(girl,p.aftermath,'affectionate'),say('marton','Az együtt átélt veszély nem dönti el helyettünk, hogyan maradunk együtt.'),
  say(girl,'Én a kapcsolatunkat szeretném folytatni. A közös időt magamért is választom, nem azért, mert tartozom neked.'),
  say('marton','A féléven túli választ is kimondom.','neutral',[
   option('continue_together','Szeretnék veled maradni, a rendes napokon is.','Megbeszélitek a következő találkozót, még a félév lezárása előtt.',{decisions:[girl+'_aftermath'],bonds:{[bond]:6}}),
   option('withdraw','A történtek után sem szeretném folytatni a kapcsolatot.','A közös nyomozás nem lesz szerelmi tartozás.',{decisions:[girl+'_withdraw']})])
 ],{scenes:['shared_16',girl+'_5'],decisions:[girl+'_commit'],notDecisions:[girl+'_withdraw'],directions:[girl]},[],p.name+' és Márton a veszély után, a félév lezárása előtt döntöttek a személyes folytatásról.'));
}
const triad:Scene[]=[
 scene('triad_1','T1 — Kinek a mondata?','relationship',4,14,'library',['marton','rebeka','boglarka'],[
  say('narrator','Rebeka képaláírása: „Boglárka a kastély régi hangját keresi.” Boglárka maga elé húzza a lapot.'),
  say('boglarka','Jól hangzik, de nem ezt csinálom. Nem vagyok a képedhez odatett misztikus lány. Azt kutatom, ki és mikor írta le a történetet.','displeased'),
  say('rebeka','A kép nem tud három bekezdést elmondani. Nem akartalak elvenni a munkádtól, de nem akarok puszta dolgozatmellékletet sem.','displeased'),
  say('marton','Mindkét munkának van saját nyelve. Nem döntöm el helyettetek, melyik számít.'),
  say('rebeka','A következő változatot ketten csináljuk meg. Ne Márton legyen a döntőbíró.'),
  say('boglarka','Előbb megmutatom, melyik szóval van bajom. Aztán meghallgatom, te mit akarsz megtartani.')
 ],{scenes:['shared_4','rebeka_1','boglarka_1']},[],'Rebeka és Boglárka vitája közös javítás tervével zárult.',{bonds:{rebeka_boglarka:5},decisions:['rb_dispute']}),
 scene('triad_2','T2 — Közös javítás','relationship',5,14,'library',['marton','rebeka','boglarka'],[
  say('narrator','Az új képaláírás mellett két név áll. A fotó nagyobb helyet kapott, a forrásjelölés olvashatóbb lett.'),
  say('rebeka','Boglárka mondata nélkül a kép elhitetné, hogy mindent értünk. Így maradt benne kérdés. Ez jobb.'),
  say('boglarka','Nélküled meg úgy írtam volna le a folyosót, mintha csak levéltári tétel lenne. Most látni, miért állt ott meg valaki.'),
  say('marton','A két szerző neve maradjon elöl. Én termet szerveztem.'),
  say('rebeka','Kedden nélküled is összeülünk. Nem titokból. Most mi ketten dolgozunk rajta.','amused'),
  say('boglarka','Hozok rendes teát. Az automata ezért a szövegért nem kap több pénzt.','amused')
 ],{scenes:['triad_1']},[],'A kép–szöveg párost közösen javították, önálló következő találkozót terveztek.',{bonds:{rebeka_boglarka:8},decisions:['rb_correction']}),
 scene('triad_3','T3 — Márton nélkül','relationship',7,14,'courtyard',['rebeka','boglarka'],[
  say('narrator','Ez a beszélgetés Márton nélkül zajlik. A két nő később maga dönti el, mit mesél el belőle. A másolatok leadása után ülnek az udvarra.'),
  say('rebeka','Azt hittem, utálsz a felirat miatt. Kiderült, csak nem hagyod, hogy egy szép mondatban elintézzelek.'),
  say('boglarka','Nem utáltalak. Idegesített, hogy úgy nézel, mintha már tudnád, melyik oldalam mutat jól.'),
  say('rebeka','Most nem tudom. Képet sem akarok rólad. Csak maradnék.','vulnerable'),
  say('boglarka','Én is. És jó, hogy ezt nem Mártonnak kell közvetítenie.'),
  say('narrator','Egy rossz kiállításról és egy befejezetlen könyvről beszélnek. Nem egy útvonal jutalma a délután: a saját kíváncsiságuk tartja ott őket.')
 ],{scenes:['triad_2','shared_7']},[],'Rebeka és Boglárka önálló beszélgetésben került közelebb egymáshoz.',{bonds:{rebeka_boglarka:10},decisions:['rb_private']}),
 scene('triad_4','T4 — Két külön igen','relationship',8,14,'courtyard',['rebeka','boglarka'],[
  say('narrator','A következő találkozón sincs ott Márton. Boglárka két poharat hoz, füzet nélkül.'),
  say('boglarka','Amikor téged várlak, nem csak az anyag miatt örülök. Vonzódom hozzád. Ezt nem Mártonról kérdezve mondom.','vulnerable'),
  say('rebeka','Én is hozzád akarok közel lenni. Nem cseréből vagy kiegészítésként. Megfoghatom a kezed?','affectionate'),
  say('boglarka','Igen. Megcsókolnálak, ha te is szeretnéd.'),
  say('rebeka','Szeretném.','affectionate'),
  say('narrator','A rövid csók után megbeszélik, hogy a közös lehetőségről csak akkor beszélnek Mártonnal, ha mindketten akarják. Az egymásnak mondott igenük független az ő válaszától.')
 ],{scenes:['triad_3','shared_8']},[],'Rebeka és Boglárka kölcsönösen kimondta önálló romantikus vonzalmát.',{bonds:{rebeka_boglarka:15},decisions:['rb_rebeka_yes','rb_boglarka_yes']}),
 scene('triad_5','T5 — Külön is elmondjuk','relationship',11,14,'classroom',['marton','rebeka','boglarka'],[
  say('narrator','Két egymást követő beszélgetés ugyanazon a délutánon. Először Rebeka marad, aztán elmegy, és Boglárka érkezik. Egyikük sem szóvivő.'),
  say('rebeka','Boglárkával közel kerültünk egymáshoz. Veled is szeretnék kapcsolatot, titkos verseny nélkül arról, kinek jut több idő rád.'),
  say('marton','Nem kérek kizárólagosságot, miközben közös lehetőségről beszélünk.'),
  say('narrator','Később Boglárka ugyanoda ül, de saját mondataival kezdi.'),
  say('boglarka','Szeretem, ahogy Rebeka figyel rám. Téged is szeretnélek tovább megismerni. Nem leszek egy párhoz utólag hozzárakott ember.'),
  say('marton','Külön is elmondhassuk a feltételeinket.','neutral',[
   option('discuss','Szeretném a közös beszélgetést. Mások helyett nem ígérek választ.','Mindketten saját nevükben vállalják a beszélgetést. Ez még nem végleges igen.',{decisions:['triad_separate_talks']}),
   option('decline','Nem szeretnék közös kapcsolatot. Egyéni irányról vagy barátságról tudok beszélni.','Ez nem teszi semmissé a nők egymásnak tett választását.',{decisions:['triad_declined'],direction:'friendship'})])
 ],{scenes:['triad_4','shared_11','rebeka_4','boglarka_4'],decisions:['rb_rebeka_yes','rb_boglarka_yes','rebeka_repair','boglarka_repair'],directions:['triad']},[],'Külön beszélgetésben hallgattuk meg a két nő igényeit; a közös kapcsolat nem automatikus.'),
 scene('triad_6','T6 — Hárman, egy asztalnál','relationship',12,14,'apartment',['marton','rebeka','boglarka'],[
  say('narrator','Az asztalon nincsenek nyomozási iratok. Nem az kap szót, aki több bizonyítékot hozott.'),
  say('rebeka','Szeretném ezt a kapcsolatot kettőtökkel. Külön estéket is akarok mindkettőtökkel. Szóljunk a féltékenységről; a képeim nyilvánosságáról továbbra is én döntök.','affectionate'),
  say('boglarka','Én is szeretném, mindkettőtökkel. Az egyeztetett idő ne mindig az enyémből rövidüljön. Ha változtatunk, beszéljünk, ne találgassunk.','affectionate'),
  say('marton','Az intézményi következményekből rám több jut. Nem használom a helyzetemet csend vagy közelség kérésére. A külön és közös időt egyeztetjük.'),
  say('rebeka','Mi elmondtuk a saját igenünket. A te válaszod is legyen valódi, akkor is, ha nem az.'),
  say('marton','A saját nevemben döntök.','neutral',[
   option('yes','Én is szeretném, ezekkel az újra megbeszélhető határokkal.','Mindhárom résztvevő saját igenje elhangzott. Az egyéni jóvátétel és vállalás ettől külön is fontos.',{decisions:['triad_marton_yes','triad_rebeka_yes','triad_boglarka_yes'],bonds:{marton_rebeka:5,marton_boglarka:5,rebeka_boglarka:5}}),
   option('decline','Nem tudom vállalni. Barátságot vagy külön megbeszélt egyéni irányt szeretnék.','Hiányzó igenből nem lesz közös kapcsolat. A tervezőben újragondolható a személyes irány.',{decisions:['triad_declined'],direction:'friendship'})])
 ],{scenes:['triad_5','shared_12'],decisions:['triad_separate_talks'],notDecisions:['triad_declined'],directions:['triad']},[],'Hármas beszélgetésben időről, féltékenységről, magánszféráról és visszalépésről beszéltünk.'),
 scene('triad_7','T7 — Egy rendes este','relationship',14,14,'apartment',['marton','rebeka','boglarka'],[
  say('narrator','A tészta túlfőtt. Rebeka túl sok paprikát tett a szószba; Boglárka ezt nem engedi művészi döntésnek nevezni.'),
  say('boglarka','Az első rendes házirend: az erős paprika nem a bátorság próbája.','amused'),
  say('rebeka','Legközelebb te főzöl. Én nem írok képaláírást a vacsorához.','amused'),
  say('marton','Több kenyeret veszek. A keddet pedig valóban üresen hagytam, nem csak átcímkéztem a munkát.'),
  say('rebeka','Jó, hogy ma nem a veszély bizonyítja, hogy együtt vagyunk.'),
  say('boglarka','Az iratokat holnap visszavesszük. Most maradjunk még egy teára.','affectionate')
 ],{scenes:['triad_6','rebeka_5','boglarka_5','shared_14'],decisions:['triad_marton_yes','triad_rebeka_yes','triad_boglarka_yes','rebeka_commit','boglarka_commit'],notDecisions:['rebeka_withdraw','boglarka_withdraw'],directions:['triad']},[],'Egy közönséges közös estén nem a veszély tartotta össze a kapcsolatot.',{bonds:{marton_rebeka:5,marton_boglarka:5,rebeka_boglarka:8},decisions:['triad_evening']}),
 scene('triad_8','T8 — A következő rendes este','relationship',16,16,'apartment',['marton','rebeka','boglarka'],[
  say('narrator','A kamra után ugyanahhoz az asztalhoz ülnek. Van rendes kenyér. Senki nem tesz úgy, mintha az elmúlt hétnek nem volna súlya.'),
  say('rebeka','A sorozatomat lezárom, a kapcsolatot nem szeretném. Boglárkával külön is tervezek időt, és veled is, Márton. A közös estékről közösen döntsünk.','affectionate'),
  say('boglarka','Én is folytatni szeretném veletek. Elkészült a szövegem, de a következő találkozó nem jutalom érte. Magamnak választom.','affectionate'),
  say('marton','A vállalást a rendes napokon kell betartani.'),
  say('rebeka','Ma az is belefér, hogy fáradtak vagyunk. Ez nem újabb próba.'),
  say('marton','A félév utáni időre is válaszolok.','neutral',[
   option('continue_together','Szeretnék veletek maradni, külön és közösen is időt vállalva.','Mindhárman megerősítettétek a folytatást. Az egyetlen alkalom mindkét személyes utóbeszélgetést is rendezi.',{decisions:['triad_aftermath','rebeka_aftermath','boglarka_aftermath'],bonds:{marton_rebeka:6,marton_boglarka:6,rebeka_boglarka:6}}),
   option('withdraw','Nem szeretném folytatni a közös kapcsolatot.','Egy korábbi ígéret nem tartja életben a közös kapcsolatot.',{decisions:['rebeka_withdraw','boglarka_withdraw'],direction:'friendship'})])
 ],{scenes:['shared_16','triad_7'],decisions:['rebeka_commit','boglarka_commit','triad_marton_yes','triad_rebeka_yes','triad_boglarka_yes'],directions:['triad']},[],'A közös utóbeszélgetésben mindhárom résztvevő megszólalt, egyetlen sávban rendezték a folytatást.')
];
const optional:Scene[]=[
 scene('prepare_backup','Segítők és másolatok','preparation',12,14,'department',['marton','denes','julia','aron'],[
  say('narrator','Nem új nyomot keresnek: az ismert adatokból készül használható beosztás.'),
  say('denes','Megbeszéljük, kit hol várok. Az alapsegítség így is jár; a beosztás gyorsabbá teszi.'),
  say('julia','Két hiteles másolatot őrzök külön. A bizonyíték nem egyetlen példányon múlik.'),
  say('aron','A kulcs és a kijárat ellenőrzését aláírtam. A visszajelzés nem Soma asztalán marad.'),
  say('marton','Egy délután most kisebb ár, mint utólag összerakni, kinek kellett volna szólnunk.')
 ],{scenes:['shared_12']},[],'Előkészítettük a segítői beosztást és a külön bizonyítékmásolatokat.',{preparation:['backup']}),
 scene('prepare_signals','A jelzés próbája','preparation',13,14,'classroom',['marton','rebeka','boglarka','greta','denes'],[
  say('narrator','A három rögzítés helyét jelölik a teremben. Varázslat helyett a mozdulat és a visszavonulás jele számít.'),
  say('greta','Ha nem halljuk egymást, ezt követjük. Aki elvéti, azzal újrakezdjük.'),
  say('boglarka','A földelést ismerjük. Most azt próbáljuk, hogyan emlékeztessük rá egymást nyomás alatt.'),
  say('rebeka','Egyszer szándékosan rossz helyre nézek. Lássuk, észreveszitek-e.'),
  say('denes','Észrevettük. Még egyszer, lassabban. A segítség nem a hibátlanság jutalma.')
 ],{scenes:['shared_13']},[],'Begyakoroltuk a jelzéseket és a visszavonulást.',{preparation:['signals']}),
 scene('friendship_after','Nem kell többnek nevezni','relationship',16,16,'courtyard',['marton','rebeka','boglarka','greta'],[
  say('narrator','A padra most nem tanúvallomások kerülnek. Gréta péksüteményt, Boglárka termoszt, Rebeka képet hoz az üres műhelyről.'),
  say('rebeka','Ez a kép csak nekünk van. Nem kell bizonyítania, hogy hősök voltunk.'),
  say('boglarka','A közös történet attól még történet, hogy nem lesz mindenkiből szerelmes.'),
  say('greta','A szerdát szabadon hagytam. Egy kávé is számít.'),
  say('marton','Szeretném megtartani ezt a barátságot. Köszönöm, hogy a saját dolgotokat is belehoztátok.'),
  say('narrator','A következő alkalomnak nincs nyomozási feladata. A barátság a félév után is folytatódhat.')
 ],{scenes:['shared_16'],directions:['friendship']},[],'Barátként terveztünk új találkozót; a nyomozás nem követelt szerelmet.',{decisions:['friendship_aftermath']})
];
const all=[...spine,...foundations,...triad,...optional];
if(new Set(all.map(s=>s.id)).size!==all.length)throw new Error('Duplicate scene ID');
export const SCENES:Registry=Object.fromEntries(all.map(s=>[s.id,s]));
const knowledge:Record<string,string>={
 grounding:'Az önkéntes földelés segít észrevenni a figyelem eltérítését, de nem állítja helyre az emlékeket.',
 returned_lilla:'Lilla kimerülten tért vissza egy hiányzó este után.',
 phrase:'„Maradt még egy hely neked.” Lilla kétszer hallotta; a beszélő még ismeretlen.',
 time_gap:'Lilla emlékei és a kártyaadatok között többórás, megmagyarázatlan rés van.',
 timeline:'A korrigált fotóidő és a kártyanapló a lezárt lépcsőig vezeti a nyomot.',
 borrowed_voice:'A hang hallott mondatot ismétel, új választ nem ad.',
 pattern:'Két visszatérő embernél ugyanaz a kimerülés és időhiány jelentkezik.',
 ritual_fragment:'Önkéntes, életerőt kölcsönző átalakulás; befejezés nélkül instabil.',
 archive_access:'Soma kölcsönözte a leírást. A régi ügyek nem korábbi bizonyított vámpírtámadások.',
 investigation_plan:'Dénes védi a tanúkat, Júlia a szöveget, Áron a hozzáférést ellenőrzi.',
 identity:'Független meghívó-, helyszín- és belépési adatok mutatnak Somára.',
 deliberate_transformation:'Soma saját döntésből, sikerért és vonzerőért hajtotta végre az átalakulást.',
 fascination_limit:'A hatás felerősíti a figyelmet és az ambíciót, de nem teremthet szerelmet, és nem írja át az elutasítást.',
 anchor_rule:'A nyitott rítus horgonyának három kötését megszakítva halálos összeomlás következik be.',
 completion_date:'A rítus befejezését a tizenötödik hétre tervezi.',
 chamber_location:'A gépészeti kamrában megvan a három rögzítés és a szolgálati kijárat.',
 intervention_plan:'Az egyszerre változó fény jelzi a nyitott rítust; a segítők a kijáratot és ellátást biztosítják.',
 vampire_dead:'A horgony megszakadt, Soma átalakulása összeomlott. Dénes megállapította a vámpír halálát.',
 aftermath:'A bizonyítékokat rendeztük. A felépülés fokozatos; a személyes utóbeszélgetések még előttünk állnak.'
};
export const EVIDENCE:Record<string,Evidence>=Object.fromEntries(all.flatMap(s=>s.evidence.map(id=>[id,{id,scene:s.id,text:knowledge[id]}])));
