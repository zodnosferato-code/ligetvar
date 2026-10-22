/** Romantic writing pass. Keep existing scene/line/choice IDs for in-progress v2 saves. */
import type {ActorId,Choice,Expression,GirlId,Line,Scene} from './types.ts';
type Beat=[ActorId,string,Expression?];
type Reply={id:string;text:string;beats:Beat[];memory?:string;requires?:Choice['requires']};
function add(s:Scene,prefix:string,beats:Beat[],next?:string):string{
 s.lines.push(...beats.map(([speaker,text,expression='neutral'],i)=>({id:prefix+'_'+i,speaker,text,expression,next:i+1<beats.length?prefix+'_'+(i+1):next})));
 return prefix+'_0';
}
function after(s:Scene,id:string,prefix:string,beats:Beat[]){
 const line=s.lines.find(l=>l.id===id)!;line.next=add(s,prefix,beats,line.next);
}
function menu(s:Scene,id:string,text:string,replies:Reply[],next?:string):string{
 s.lines.push({id,speaker:'marton',expression:'neutral',text,choices:replies.map(r=>({id:r.id,text:r.text,reaction:'',requires:r.requires,effect:r.memory?{decisions:[r.memory]}:undefined,next:add(s,id+'_'+r.id,r.beats,next)}))});
 return id;
}
function follow(s:Scene,lineId:string,choiceId:string,next:string){
 const c=s.lines.find(l=>l.id===lineId)!.choices!.find(c=>c.id===choiceId)!;c.next=next;c.reaction='';
}
const attraction:Record<GirlId,{intro:Beat[];replies:Reply[];end:Beat[]}>= {
 rebeka:{intro:[
  ['rebeka','Egész idefelé azon gondolkodtam, milyen rossz viccel kezdem. Aztán mind olyan jól sikerült, hogy egyiket sem merem használni.','amused'],
  ['marton','Most is mondhatsz valamit komolyan.'],
  ['rebeka','Az sokkal kínosabb. Például hogy megnéztem, jössz-e, pedig én írtam neked. Háromszor.','vulnerable']
 ],replies:[
  {id:'honest',text:'Én meg túl korán elindultam, aztán kerültem egyet, hogy ne derüljön ki.',memory:'rebeka_unpolished',beats:[
   ['rebeka','Na jó. Akkor két nagyon higgadt ember ül itt.','amused'],['marton','A műhely előtt könnyebb megszólalnom, mint most. Ott legalább tudom, mi következik.'],['rebeka','Én se tudom. De ne kezdj el úgy beszélni, mintha ez is gyakorlat volna.'],['marton','Szeretném, ha lenne következő találkozónk. Ezt tudom.'],['rebeka','Így már elhiszem.']
  ]},
  {id:'curious',text:'Mikor kezdted várni, hogy ketten maradjunk?',memory:'rebeka_small_moment',beats:[
   ['rebeka','Amikor a múltkor visszajöttél az ajtóból, mert nem hallottad, mit mondtam.'],['marton','Azt hittem, a képről kérdezel.'],['rebeka','A buszról kérdeztem. Ettől rosszabb. Egy teljes délutános okos beszélgetés után egy busz miatt gondoltam rád hazáig.','vulnerable'],['marton','Én arra emlékszem, hogy akkor már nem siettél el.']
  ]}
 ],end:[['rebeka','Legközelebb is kérdezz. Akkor is, ha előbb valami szemtelenséget mondok.'],['narrator','A vetítés már véget ért. Rebeka még marad, és ezúttal nem keres újabb képet, amelyet ürügyül mutathatna.']]},
 boglarka:{intro:[
  ['narrator','Boglárka a két csészét egymás mellé teszi, aztán a tiedet közelebb tolja.'],['boglarka','A meghívás fejben sokkal rövidebb volt. Ott te rögtön tudtad, miért van két csésze.','amused'],['marton','Én néha azt is félreértem, amihez használati utasítást adnak.'],['boglarka','Akkor most kivételesen nem hagyom a mondat végét a képzeletedre.','vulnerable']
 ],replies:[
  {id:'quiet',text:'A közös csöndet is várom. Veled nem érzem, hogy rögtön ki kell töltenem.',memory:'boglarka_quiet',beats:[
   ['boglarka','Én néha igen. Csak közben még keresem a megfelelő mondatot.'],['marton','Akkor honnan tudjam, mikor várjak?'],['boglarka','Megmondom, hogy még gondolkodom. Te meg ne indulj el közben megmenteni a beszélgetést.','amused'],['narrator','Egy ideig mindketten isznak. Boglárka most nem néz a könyvtári órára.']
  ]},
  {id:'share',text:'Én attól tartok, hogy túl sokat beszélek, amikor szeretnék jó benyomást kelteni.',memory:'boglarka_listening',beats:[
   ['boglarka','Észrevettem. Néha már a második példánál lenne válaszom.','amused'],['marton','Szólhatsz.'],['boglarka','Most szólok. Tetszik, amikor lelkes vagy. De azt is szeretném látni, mi történik, ha nem készülhetsz fel rám.'],['marton','Valószínűleg sokkal többször megállok mondat közben.'],['boglarka','Abban már van gyakorlatom.']
  ]}
 ],end:[['boglarka','A következő teát már nem fogom véletlenül túl soknak főzni. Meghívlak rá.'],['narrator','Boglárka kimondja az időpontot. Nem teszi hozzá, hogy csak akkor, ha amúgy is erre jársz.']]},
 greta:{intro:[
  ['greta','Majdnem azt írtam, hogy egyeztetnünk kell. Pedig egyetlen dolgot sem kell egyeztetnünk.'],['marton','Akkor mi állt végül az üzenetben?'],['greta','Hogy van-e kedved kijönni hozzám. Háromszor töröltem vissza. Egy teremcseréről gyorsabban döntök.','amused']
 ],replies:[
  {id:'ordinary',text:'Mihez lenne kedved most, ha nem kellene jó házigazdának lenned?',memory:'greta_no_plan',beats:[
   ['greta','Enni valamit. Aztán panaszkodni a cipőmre. Ez elég kiábrándító kezdet?'],['marton','Nekem a cipőre még nem volt tervem.'],['greta','Helyes. Ne oldd meg. Csak érts egyet, hogy rosszul választottam.','amused'],['narrator','Gréta leül melléd a lépcsőre. Az üres naptármezőt elteszi; már nem kell megmutatnia, hogy ráér.']
  ]},
  {id:'admit',text:'Néha én is munkát találok ki, hogy legyen okom valakit marasztalni.',memory:'greta_shared_habit',beats:[
   ['greta','Tehát az a múltkori ötperces megbeszélés…'],['marton','A végén már megkérdezhettem volna, maradsz-e egy kávéra.'],['greta','Igen. A negyedik napirendi pontnál már gyanús volt.','amused'],['marton','Maradsz most?'],['greta','Igen. Sokkal jobb meghívás.']
  ]}
 ],end:[['greta','Ezt most nem írom be a teljesített feladatok közé. De örülök, hogy kijöttél.'],['narrator','Amikor elindultok, Gréta nem a tanszék felé fordul. Előbb még megmutatja, merre szokott kerülni.']]}
};
const dates:Record<GirlId,{intro:Beat[];replies:Reply[];touch:Reply[];end:Beat[]}>= {
 rebeka:{intro:[
  ['marton','Nem hoztál gépet.'],['rebeka','Ne örülj előre. Így sokkal nehezebb lesz úgy tennem, mintha azért bámulnálak.','amused'],['narrator','A poharat két kézzel fogja, pedig már nem forró. Amikor mellé állsz, rád pillant, aztán a sétányra.']
 ],replies:[
  {id:'callback',text:'Most sem kell tökéletes mondat. Én is kerültem, emlékszel?',requires:{decisions:['rebeka_unpolished']},beats:[['rebeka','Két nagyon higgadt ember. Emlékszem.','amused'],['marton','Most is izgulok. Csak már nem akarom eltitkolni.'],['rebeka','Kár. Épp készültem valami rettenetesen magabiztosat mondani. Így kénytelen leszek bevallani, hogy én is.','vulnerable']]},
  {id:'wish',text:'Milyen lenne egy este, amit csak magadnak választanál?',beats:[['rebeka','Rossz film. Közepes pizza. Valaki, aki nem akarja megjavítani az ízlésemet.'],['marton','Vitatkozni szabad?'],['rebeka','Muszáj. De ne engem próbálj megnyerni azzal, hogy mindenben igazat adsz.'],['marton','A pizzában már most nem értünk egyet.'],['rebeka','Végre egy komoly akadály.','amused']]},
  {id:'fear',text:'Nekem az a nehéz, hogy ne akarjam rögtön bebizonyítani, jó választás vagyok.',beats:[['rebeka','Én meg egy jó mondatot szeretnék, amitől egész hazáig rám gondolsz.'],['marton','Ez eddig működött.'],['rebeka','Tudom. Csak nem akarok minden alkalommal jobbat kitalálni.','vulnerable'],['marton','Akkor ma sétáljunk egyet akkor is, ha elfogynak.']]}
 ],touch:[
  {id:'hand',text:'Igen, szeretném megfogni a kezed.',memory:'rebeka_date_hand',beats:[['narrator','Rebeka szabad kezét nyújtja. Előbb óvatosan, aztán biztosabban kulcsolja az ujjait a tieid közé.'],['rebeka','Most valami nagyon rossz viccet kellene mondanom.'],['marton','Ráér.'],['narrator','Bólint, és néhány lépésig csak a kavics ropogása hallatszik.']]},
  {id:'slow_touch',text:'Szeretnék veled randizni, de ma még csak sétálnék.',memory:'rebeka_date_slow',beats:[['rebeka','Rendben. Akkor ma a séta. Nem kell előjegyzést kérnem a kezedre.','amused'],['marton','A következő találkozót azért szeretném.'],['rebeka','Azt én is. Az első rossz film kiválasztásáról még úgyis vitánk lesz.']]}
 ],end:[['rebeka','A következőnél én választok filmet. Te meg szólj közben, ha unatkozol. Ezt most komolyan mondom.'],['narrator','A sétány végén lassít, mielőtt elbúcsúztok. Aztán ő mondja ki: jó volt veled. Nem tesz mögé csípős megjegyzést.']]},
 boglarka:{intro:[
  ['boglarka','A könyvet csak azért hoztam, hogy legyen mit a táskámba tenni. Nagyon rendes alibi. Egy szót sem olvastam belőle.','amused'],['marton','Mióta vársz?'],['boglarka','Annyira korán jöttem, hogy egyszer már kimentem a kapuig. Ezt megtarthatod magadnak.']
 ],replies:[
  {id:'callback',text:'Most is gondolkodsz, vagy jólesik a csönd?',requires:{decisions:['boglarka_quiet']},beats:[['boglarka','Most azon gondolkodom, milyen jó, hogy megkérdezted.'],['marton','Akkor várok.'],['boglarka','Egyébként egy koncertre szeretnélek elhívni. Ez volt a hosszú gondolat. A jegyeket még nem vettem meg helyetted.','amused']]},
  {id:'music',text:'Mit mutatnál meg magadból, amihez nem könyvet hoznál?',beats:[['boglarka','A zenéimet. De az egyiknél meg kell ígérned, hogy nem elemzed a szöveget.'],['marton','Ennyire rossz?'],['boglarka','Ennyire szeretem. Nem akarok rögtön érvelni mellette.'],['narrator','Elmondja a szám címét. A refrént csak félhangosan kezdi el, aztán kineveti magát.'],['marton','Most már meg szeretném hallgatni.']]},
  {id:'self',text:'Én képes vagyok előre elpróbálni egy egyszerű meghívást is.',beats:[['boglarka','És működik?'],['marton','Addig, amíg a másik nem mond valamit, amire nem készültem.'],['boglarka','Akkor most azt mondom, hogy örülök, hogy izgulsz. Nem rosszindulatból. Ettől kevésbé érzem úgy, hogy vizsgázom.','vulnerable'],['marton','Ma én sem szeretnék vizsgáztatni.']]}
 ],touch:[
  {id:'kiss',text:'Szeretném, hogy megcsókolj.',memory:'boglarka_date_kiss',beats:[['narrator','Boglárka közelebb hajol, és röviden megcsókolja az arcodat. Hátrébb húzódva rád néz, nem a könyvére.'],['boglarka','Ezt kevésbé volt nehéz megtenni, mint megkérdezni.','affectionate'],['marton','Jólesett.'],['boglarka','Akkor ezt a részt nem fogom újrafogalmazni.','amused']]},
  {id:'slow_touch',text:'A randit szeretném. A csókkal még várnék.',memory:'boglarka_date_slow',beats:[['boglarka','Jó. Akkor maradok ezen az oldalon, és megmutatom a koncertet.'],['marton','Örülök, hogy megkérdezted.'],['boglarka','Én is. Legalább nem kell az egész utat azon töltenem, hogy találgassak.']]}
 ],end:[['boglarka','A következő találkozóra is elhozhatom a könyvet. De már nem kell majd úgy tennem, hogy miatta hívtalak.'],['narrator','Búcsúzáskor Boglárka mondja ki előbb, mikor ér rá újra. Megvárja a válaszodat; nem kínál rögtön kibúvót.']]},
 greta:{intro:[
  ['greta','Majdnem hoztam ennivalót mindkettőnknek. Aztán eszembe jutott, hogy meg is kérdezhetem, mit szeretsz.'],['marton','Én meg azt hittem, legalább az útvonalat rám bízod.'],['greta','Azt majd kiérdemled. Mármint nem így… Na jó, ebből a mondatból most nem jövök ki elegánsan.','amused']
 ],replies:[
  {id:'callback',text:'Ma a cipődre is panaszkodhatsz. Továbbra sem oldom meg.',requires:{decisions:['greta_no_plan']},beats:[['greta','Ma a kényelmesben jöttem. Remélem, nem csak a panaszaimért hívtál.','amused'],['marton','Lassan ki kell derítenünk, miről tudunk még beszélni.'],['greta','Akkor mesélek az első túrámról. Eltévedtem. Ezt a térképeim láttán senki nem hiszi el.']]},
  {id:'lost',text:'Volt már olyan kirándulásod, amin minden rosszul sikerült?',beats:[['greta','Az elsőn az ellenkező irányba indultam. Két órán át magyaráztam a többieknek, miért jó ez így.'],['marton','És jó volt?'],['greta','A végén igen. Csak előbb be kellett vallanom, hogy fogalmam sincs, hol vagyunk.'],['marton','Ma is jöhet egy rossz kanyar.'],['greta','Akkor nem kérsz majd helyzetjelentést?','amused']]},
  {id:'share',text:'Szeretném, ha ma te is kérdeznél rólam. Én is könnyen elbújok a munka mögé.',beats:[['greta','Jó. Mikor csináltál utoljára valamit, amiben ügyetlen voltál?'],['marton','Főzni próbáltam. A recept azt írta, egyszerű. Személyes sértésnek vettem.'],['greta','Én is. A receptek túl magabiztosak.','amused'],['narrator','Gréta nem ajánlja fel, hogy legközelebb megcsinálja helyetted. Inkább megkérdezi, mi lett belőle.']]}
 ],touch:[
  {id:'hand',text:'Szeretnék közelebb sétálni hozzád. Megfoghatom a kezed?',memory:'greta_date_hand',beats:[['greta','Igen. Ezt a kerülőt ketten is elférjük.','affectionate'],['narrator','Feléd nyújtja a kezét. A hídnál lassít, hogy ne kelljen egymás mögé lépnetek.'],['greta','Na, most már tudom, miért volt érdemes félretenni a telefont.']]},
  {id:'slow_touch',text:'Ma még csak sétálnék veled. Jólesik, hogy ráérünk.',memory:'greta_date_slow',beats:[['greta','Akkor sétálunk. Nem kell ma mindent bepótolni.'],['narrator','Gréta a korlátra támaszkodik. Egy biciklist engedtek el, aztán folytatja a félbehagyott történetét.'],['greta','Egyébként itt szoktam visszafordulni. Ma nem sietek.']]}
 ],end:[['greta','Legközelebb hozhatunk valamit enni. Egyikünknek sem kell vendéglátást rendeznie.'],['marton','A recept kiválasztását még megbeszéljük.'],['greta','Jogos. Az egyszerűvel óvatosak leszünk.','amused']]}
};
const later:Record<GirlId,{conflict:Beat[];repair:Reply[];settle:Beat[];commit:Beat[];future:Reply[];after:Beat[]}>= {
 rebeka:{conflict:[
  ['rebeka','A tóparton azt mondtad, nem kell megmutatnom. Aztán visszahallottam magamat a bemutatódban. Ugyanazzal a mondattal.','displeased'],['marton','Jól hangzott, és könnyű volt átvennem. Nem álltam meg megkérdezni.'],['rebeka','Tudom, hogy jól hangzott. Én mondtam. Most meg azt figyelem, mit mondhatok neked anélkül, hogy később valahol visszaköszönne.','vulnerable']
 ],repair:[
  {id:'ask_space',text:'Szeretnél most egy kis távolságot, vagy maradjak beszélgetni?',beats:[['rebeka','Maradj. Csak ne kérdezd meg ötpercenként, hogy akkor most már jó-e.'],['marton','Nem kérek gyors választ. A bemutatót ma kijavítom.'],['rebeka','És ne írd bele, hogy miattam. Ne kelljen a többiek előtt megvédenem, miért lett volna ez magánügy.']]},
  {id:'name_fault',text:'Attól féltem, nélküle lapos lesz a bemutató. Ettől még nem volt az én mondatom.',beats:[['rebeka','Igen. Ez legalább nem olyan, mintha véletlenül belesétált volna a diába.'],['marton','Megmondom, hogy saját történet helyett másét használtam. A részleteket nem adom tovább.'],['rebeka','Ezt szeretném. Aztán hagyj egy kis időt, hogy újra eszembe jusson valami, amit szívesen elmondok neked.']]}
 ],settle:[['narrator','Márton kiveszi a mondatot a vázlatból, és elküldi a javított változatot. Rebeka megnézi, de nem mondja rögtön, hogy minden rendben.'],['rebeka','Most még haragszom. Ettől még szeretném, ha legközelebb találkoznánk. Csak ne próbálj addig egyetlen nagy gesztussal meggyőzni.']],
 commit:[['rebeka','Tegnap majdnem elküldtem egy képet. Aztán rájöttem, nincs hozzá semmi különös mondanivalóm. Csak veled akartam beszélni.'],['marton','Elküldhetted volna így is.'],['rebeka','Tudom. Most már talán el is hiszem. A bemutató azóta sem került vissza a régi szöveggel. Figyeltem.','vulnerable']],
 future:[
  {id:'ritual',text:'Legyen egy esténk, amikor akkor is találkozunk, ha nincs mit megmutatnunk.',memory:'rebeka_future_ordinary',beats:[['rebeka','A rossz film ettől még jöhet?'],['marton','Jöhet. De nem kell megmentened az estét, ha egyikünknek sincs nagy története.'],['rebeka','Kedden ráérek. Nem fogom azt mondani, hogy csak arra jártam.','affectionate']]},
  {id:'open',text:'A következő találkozón megkérdezem, mire vágysz. Azt is elmondom, én mire.',memory:'rebeka_future_ask',beats:[['rebeka','Akkor én most kezdem: szeretném, ha néha te hívnál el. Nem csak rábólintanál arra, amit kitaláltam.'],['marton','Legközelebb én készülök egy ötlettel.'],['rebeka','Jó. Attól még szabad lesz rossznak neveznem.','amused']]}
 ],after:[['rebeka','Az előbb valaki gratulált a képekhez. Már majdnem azt mondtam, minden megérte. Pedig nem. Vannak részek, amiket szívesen kihagytam volna.'],['marton','Nem kell jó történetté rendezned miattam.'],['rebeka','Ma tényleg nincs kedvem. Egy rossz filmet viszont végig tudnék szidni veled.','affectionate']]},
 boglarka:{conflict:[
  ['boglarka','Láttam, hogy tudod, mire gondolok. Még örültem is. Aztán már te mondtad, én meg ott álltam melletted.','displeased'],['marton','Azt hittem, megkönnyítem, ha sürgetnek.'],['boglarka','Nehéz volt. De el akartam mondani. Most neked köszönték meg, én meg megint majdnem csatlakoztam hozzájuk.','vulnerable']
 ],repair:[
  {id:'signal',text:'Hogyan jelezd legközelebb, ha közbevágok? A javítás most az én dolgom.',beats:[['boglarka','Azt fogom mondani, hogy még nem fejeztem be. Nem titkos jel kell hozzá.'],['marton','Akkor megállok. Nem kell megindokolnod.'],['boglarka','És ha nem kérek segítséget, attól még lehet nehéz. A kettőt szeretném én különválasztani.']]},
  {id:'own_it',text:'Szerettem volna, hogy hasznosnak láss. Közben kiszorítottalak a saját munkádból.',beats:[['boglarka','Azt szeretem, amikor figyelsz rám. Nem kell hozzá megnyerned helyettem egy vitát.'],['marton','A következő alkalom előtt tisztázom, kinek az értelmezése hangzott el.'],['boglarka','Ott leszek. A szövegét viszont előbb szeretném elolvasni. A nevemben most se fogalmazzunk túl gyorsan.']]}
 ],settle:[['narrator','Márton megírja a helyesbítést. Boglárka egy mondatot kihúz, a saját megfogalmazását írja a helyére; ez a változat megy a csoportnak.'],['boglarka','Nem attól leszünk közel, hogy mindig ugyanarra jutunk. Legközelebb lehet, hogy vitatkozom is veled.','vulnerable'],['marton','Szeretném végighallgatni.']],
 commit:[['boglarka','A megbeszélésen tegnap nem segítettél ki. Észrevetted, milyen sokáig kerestem azt a szót?'],['marton','Igen.'],['boglarka','Én meg azt, hogy kivártad. Utána már azt is ki mertem mondani, amiben nem értettem egyet veled. Jó volt úgy kijönni, hogy nem kellett visszamennem a saját mondatomért.','amused']],
 future:[
  {id:'ritual',text:'Válasszunk egy estét, amikor zenét mutatunk egymásnak.',memory:'boglarka_future_music',beats:[['boglarka','Az első számot én választom. Még mindig nincs hozzá szövegelemzés.'],['marton','A második az enyém. Lehet, hogy nem fog tetszeni.'],['boglarka','Akkor végre kölcsönös lesz a kockázat.','amused']]},
  {id:'open',text:'Szeretném, ha te is elhívnál oda, ahová egyébként egyedül mennél.',memory:'boglarka_future_invite',beats:[['boglarka','Akkor a koncert. Előre szólok, elöl szeretnék állni. Nem fogok végig csendben ülni.'],['marton','Ezt jó tudni rólad.'],['boglarka','Van még néhány dolog. Nem mindet ma mondom el.','affectionate']]}
 ],after:[['boglarka','Elküldtem a tanulmányt. Utána tíz percig néztem az elküldött üzeneteket, hátha magától visszajön.'],['marton','Nem jött?'],['boglarka','Nem. Meglepően jól bírja nélkülem. Én viszont ma szeretnék valakivel lenni. Veled.','affectionate']]},
 greta:{conflict:[
  ['greta','Úgy jöttem ide, hogy végre elmesélek valamit. Amikor megláttam a dossziét, rögtön azon gondolkodtam, mennyi idő alatt csinálom meg.','displeased'],['marton','Azért tettem ide, mert tudtam, hogy te megoldod.'],['greta','Épp ez az. Néha én is ebbe kapaszkodom. Ha szükség van rám, biztos van helyem. De nem szeretném, ha csak így jutnék el hozzád.','vulnerable']
 ],repair:[
  {id:'listen',text:'Meséld el, amivel érkeztél. Az iratot most elteszem.',beats:[['greta','A túráról akartam. Elmentem arra a hosszabb útra. Egyedül. Azt hittem, ezt fogod először megkérdezni.'],['marton','Milyen volt?'],['greta','Várj. Előbb tényleg tedd el azt a dossziét. Aztán szeretném elmesélni rendesen.']]},
  {id:'share_fault',text:'Nekem kényelmes volt rád bízni. A szabad esténket is az én munkámhoz igazítottam.',beats:[['greta','Igen. És én majdnem azt mondtam, hogy persze. Ezért vagyok most ilyen mérges.'],['marton','A határidős ügyet átadom, a többit holnap végzem el. Nem téged kérlek meg, hogy szervezd át.'],['greta','Jó. Most szeretném egyszer csak azt eldönteni, merre menjünk.']]}
 ],settle:[['narrator','Márton elteszi az iratot, és elküldi az átadáshoz szükséges üzenetet. Gréta egy részletre majdnem rákérdez, aztán inkább felveszi a kabátját.'],['greta','Még fogom figyelni, tényleg vársz-e akkor is, ha üres kézzel jövök. Ma kezdhetjük.']],
 commit:[['greta','Tegnap kerestek a teremcserével. Már nyúltam a telefonért, aztán láttam, hogy továbbadtad.'],['marton','Megoldották.'],['greta','Igen. Kicsit sértette a hiúságomat, mennyire könnyen. Aztán rájöttem, hogy még mindig van kedvem átjönni hozzád. Ez a része tetszett.','amused']],
 future:[
  {id:'ritual',text:'Legyen időnk arra is, hogy együtt rontsunk el valami új receptet.',memory:'greta_future_cooking',beats:[['greta','Ha én kezdek vezényelni, szólj. Kivéve, ha épp odaégetsz valamit.'],['marton','Ott elfogadom a segítséget.'],['greta','A bevásárlást felezzük. Aztán meglátjuk, mennyire szeretjük a saját főztünket.','affectionate']]},
  {id:'open',text:'A következő szabad esténket én kezdeményezem. Neked csak választanod kell, van-e kedved.',memory:'greta_future_invite',beats:[['greta','És ha valami egészen másra lenne kedvem?'],['marton','Akkor azt is mondd el.'],['greta','Jó. Lehet, hogy csak beülök melléd, és elkérem a takaró felét. Arra ne készíts programot.','amused']]}
 ],after:[['greta','Furcsa úgy eljönni, hogy nem nálam van a pótkulcs. Kétszer megálltam a folyosón.'],['marton','Vissza szeretnél menni?'],['greta','Nem. Csak még szokom, hogy valami nélkülem is rendben lehet. Most pedig örülnék, ha megkérdeznéd, mit ennék. Ma van válaszom.','affectionate']]}
};
function expandIndividual(s:Scene,girl:GirlId,stage:number){
 const a=attraction[girl],d=dates[girl],p=later[girl];
 if(stage===2){
  s.lines.find(l=>l.id==='line_4')!.text='Én is szeretnék őszintén válaszolni.';
  after(s,'line_0','romance_hesitation',a.intro);
  const end=add(s,'romance_attraction_end',a.end);
  const topics=menu(s,'romance_attraction','Mi az, amit eddig nem mondtam el?',a.replies,end);
  follow(s,'line_4','yes',topics);
 }
 if(stage===3){
  // The invitation is an invitation to a date; touch gets a separate, later answer.
  if(girl==='rebeka')s.lines.find(l=>l.id==='line_1')!.text='Én hívtalak. Most csak sétálni szeretnék veled. Randi legyen, ne újabb ürügy arra, hogy képekről beszéljünk.';
  if(girl==='boglarka')s.lines.find(l=>l.id==='line_3')!.text='Nem a tanulmányról akarok beszélgetni, és nem megköszönni jöttem valamit. Most rád vagyok kíváncsi.';
  s.lines.find(l=>l.id==='line_2')!.text='Örülök, hogy elhívtál. Én is ezért jöttem.';
  s.lines.find(l=>l.id==='line_4')!.text='Szeretnék világos választ adni a randira.';
  after(s,'line_3','romance_date_intro',d.intro);
  const end=add(s,'romance_date_end',d.end);
  const touch=menu(s,'romance_closeness',girl==='boglarka'?'Boglárka közelebb hajol. „Megcsókolhatom az arcodat?”':girl==='rebeka'?'Rebeka rád néz. „Megfoghatom a kezed?”':'A hídnál egymás mellé lépünk. Jólesik, hogy nem sietünk.',d.touch,end);
  s.lines.find(l=>l.id==='romance_closeness')!.speaker='narrator';
  const topics=menu(s,'romance_date_topic','Végre nem a műhelyről beszélünk.',d.replies,touch);
  follow(s,'line_4','yes',topics);
 }
 if(stage===4){
  s.lines.find(l=>l.id==='line_2')!.text='Szeretném megérteni, mi történt köztünk, mielőtt válaszolok.';
  s.lines.find(l=>l.id==='line_4')!.text='Nem szeretném egy bocsánatkéréssel elintézni.';
  after(s,'line_1','romance_conflict',p.conflict);
  const end=add(s,'romance_repair_end',p.settle);
  const topics=menu(s,'romance_repair','Hogyan kezdjük újra ezt a beszélgetést?',p.repair,end);
  follow(s,'line_4','repair',topics);
 }
 if(stage===5){
  after(s,'line_0','romance_changed',p.commit);
  s.lines.find(l=>l.id==='line_3')!.text=girl==='rebeka'?'Én szeretném. Ha valami nem jó köztünk, mondd meg. Azt is, ha éppen velem van bajod.':girl==='boglarka'?'Én ezt választom. Szeretnék helyet az életedben, amiről beszélhetünk, akkor is, ha valamiben nem értünk egyet.':'Én szeretném. Lesznek napok, amikor megint mindent elvállalok. Akkor se csak azért keress, hogy lebeszélj róla.';
  // Contextual wording keeps single-route promises separate from the triad's terms.
  const terms=menu(s,'romance_terms','Milyen kapcsolatot vállalunk?',[
   {id:'shared_terms',text:'A külön időnket is megtartjuk a közös kapcsolatban.',requires:{directions:['triad'],decisions:['triad_marton_yes','triad_rebeka_yes','triad_boglarka_yes']},beats:[[girl,'Igen. A kettőnk idejét nem kell mindig hármas találkozóvá alakítanunk. És amit közösen döntünk el, azt nem írjuk felül kettesben.','affectionate']]},
   {id:'our_terms',text:'Beszéljük meg, mikor találkozunk, és mit szeretnénk megosztani másokkal.',beats:[[girl,'Szeretném, hogy akinek fontos, annak elmondhassam, hogy együtt vagyunk. A személyes részleteinket viszont ne kelljen továbbadnom.'],['marton','A munkahelyi következményeket nem rád bízom. A közös időnknek helyet csinálok.']]}
  ],'line_4');
  s.lines.find(l=>l.id==='line_3')!.next=terms;
  s.lines.find(l=>l.id==='line_4')!.text='A hétköznapokban is szeretnék időt vállalni erre.';
  const end=add(s,'romance_commit_end',[[girl,'Örülök, hogy kimondtad. Most maradhatnánk még egy kicsit?','affectionate'],['narrator','A következő találkozót még ott megbeszélitek. Nem egy újabb feladat mellé kerül a naptárban.']]);
  const topics=menu(s,'romance_future','Minek csináljunk először helyet?',p.future,end);
  follow(s,'line_4','commit',topics);
 }
 if(stage===6){
  after(s,'line_0','romance_after',p.after);
  const end=add(s,'romance_after_end',[[girl,'Akkor ezt most tényleg írjuk be. A többit majd ott elmesélem.','affectionate'],['narrator','Még maradt bizonytalanság a következő hetekben. A találkozót ettől függetlenül megbeszélitek; ma egyikőtöknek sem kell ennél többet ígérnie.']]);
  const callback:Reply={id:'remember',text:girl==='rebeka'?'A keddi esténkhez mit szólnál? Most sincs szükség nagy történetre.':girl==='boglarka'?'Elhozzuk a zenéinket, ahogy megbeszéltük?':'Kipróbáljuk azt a receptet, amit együtt akartunk elrontani?',requires:{decisions:[girl==='rebeka'?'rebeka_future_ordinary':girl==='boglarka'?'boglarka_future_music':'greta_future_cooking']},beats:[[girl,girl==='rebeka'?'Jó. A film már megvan. Egészen vállalhatatlan.':girl==='boglarka'?'Már összeírtam három számot. Ebből kettőt tényleg meg is mutatok.':'Igen. De most egy olyan étellel kezdjük, amiből lehet szendvicset csinálni, ha elrontjuk.','amused']]};
  const topics=menu(s,'romance_after_plan','Mi legyen a következő közös alkalom?',[
   callback,
   {id:'company',text:'Ma csendesebb találkozóra vágyom. Lehetnénk együtt program nélkül?',beats:[[girl,girl==='rebeka'?'Igen. Ma még a filmet sem kell végignézni.':girl==='boglarka'?'Igen. Hozok teát. Aztán nem kell eldöntenünk előre, miről beszélünk.':'Igen. Előbb eszünk valamit, aztán maradhatunk csak úgy.','affectionate'],['marton','Jólesik, hogy ezt is kérhetem.']]},
   {id:'outing',text:'Van kedved egy rövid sétához? Te választhatod, mikor forduljunk vissza.',beats:[[girl,girl==='rebeka'?'Ha közben meglátok valamit, megállhatunk. De gépet ma nem hozok.':girl==='boglarka'?'Van. És ha már elindultunk, lehet, hogy mesélek valamiről, aminek semmi köze a kastélyhoz.':'Van. A hosszabb útra most nem ígérek semmit. A hídig szívesen megyek.','affectionate']]}
  ],end);
  follow(s,'line_4','continue_together',topics);
 }
}
function expandTriad(s:Scene){
 if(s.id==='triad_3'){
  after(s,'line_4','romance_rb_private',[
   ['boglarka','A múltkor megjegyeztem, melyik képnél nevettél. Aztán visszamentem megnézni.'],['rebeka','És? Rettenetes az ízlésem?','amused'],['boglarka','A kép tényleg rossz volt. Azt szerettem, ahogy nevettél.'],['narrator','Rebeka a cipője orrával végigtol egy kavicsot a kövön. Ezúttal nem vág rögtön vissza.'],['rebeka','Nehéz erre valami elviselhetetlenül szellemeset mondani.','vulnerable'],['boglarka','Nem muszáj.'],['rebeka','Akkor inkább azt mondom, hogy örülök, hogy visszamentél.'],['boglarka','Jövő héten megmutatod, neked melyik tetszett?'],['rebeka','Meg. De utána valami olyat is csináljunk, amihez egyikünknek sincs kész véleménye.']
  ]);
 }
 if(s.id==='triad_4'){
  after(s,'line_4','romance_rb_kiss',[
   ['narrator','Boglárka közelebb húzódik. Rebeka megszorítja a kezét, és kivárja, amíg ráemeli a tekintetét. A csók rövid; utána egyikük sem fordul rögtön el.'],['rebeka','Most elfelejtettem, mit akartam mondani.'],['boglarka','Azt hiszem, ez először történt meg, mióta ismerlek.','amused'],['rebeka','Ne szokj hozzá.'],['boglarka','Nem sietek.'],['narrator','Rebeka felnevet, majd a homlokát egy pillanatra Boglárkáéhoz érinti. A következő találkozót most is ketten beszélik meg.'],['boglarka','Mártonról is szeretnék majd beszélni. De most hadd maradjon ez egy kicsit kettőnké.'],['rebeka','Jó. Most még én is itt szeretnék maradni veled.','affectionate']
  ]);
  s.lines.find(l=>l.id==='line_5')!.text='Mielőtt elindulnak, megbeszélik, hogy a közös lehetőségről csak akkor beszélnek Mártonnal, ha mindketten akarják. Az egymásnak mondott igenük független az ő válaszától.';
 }
 if(s.id==='triad_7'){
  after(s,'line_3','romance_evening_pause',[
   ['narrator','Boglárka eltolja az üres tányért, és Rebeka felé fordítja a székét. Rebeka a haját igazítja, aztán észreveszi, hogy nézi.'],['rebeka','Van még szósz az arcomon?'],['boglarka','Nincs. Csak jó most rád nézni.','affectionate'],['rebeka','Ezt megtehetnéd úgy is, hogy nem hozol zavarba.'],['boglarka','Úgy kevésbé lenne szórakoztató.','amused']
  ]);
  const end=add(s,'romance_evening_end',[
   ['narrator','A mosatlan egyelőre a konyhában marad. A következő külön és közös találkozót is megbeszélitek, aztán már senki nem nézi az órát.'],['boglarka','A teát viszont most én csinálom. Paprika nélkül.','amused']
  ]);
  const topics=menu(s,'romance_evening','Még maradnék veletek.',[
   {id:'honest',text:'Amikor ketten összenevettek, néha nem tudom, hogyan csatlakozzak.',memory:'triad_named_insecurity',beats:[
    ['rebeka','Ezt miért csak most mondod?'],['marton','Mert nem akarom, hogy minden kettőtök közötti pillanat rólam kezdjen szólni.'],['boglarka','Nem is kell. De attól még elmondhatod, hogy hiányzunk.'],['rebeka','És lehet, hogy valamelyik viccről lemaradsz. Ahogy én is, amikor ti valami könyvről beszéltek.'],['marton','Akkor most nem kell rögtön kijavítanunk ezt az érzést.'],['boglarka','Nem. De ma ideülhetsz közelebb, ha szeretnél.','affectionate']
   ]},
   {id:'ask_evening',text:'Mire vágytok a vacsora után? Én szívesen maradnék a kanapén.',memory:'triad_ordinary_closeness',beats:[
    ['rebeka','Rossz filmet akartam választani. De Boglárka szerint a címét még nem sikerült meggyőzően megvédenem.'],['boglarka','Azt mondtad, borzalmas.'],['rebeka','Elismerő hangsúllyal.','amused'],['marton','Felőlem kezdjük el. Ha nem tetszik, beszélgetünk közben.'],['boglarka','Én mellétek ülnék. A takarót viszont osszuk el, mielőtt elkezdődik.','affectionate'],['narrator','Mindhárman helyet kerestek. Rebeka rákérdez, jó-e így; Boglárka közelebb húzódik. Senkinek sem kell ugyanannyira fáradtnak vagy ugyanannyira beszédesnek lennie.']
   ]},
   {id:'quiet',text:'Szeretlek benneteket látni így. Ma inkább csak hallgatnálak titeket.',memory:'triad_quiet_evening',beats:[
    ['rebeka','Ezt később megbánod. Még a desszertről is eltér a véleményünk.'],['boglarka','Mert a desszert nem lehet még egy adag csípős tészta.','amused'],['marton','Ebben talán most én is állást foglalnék.'],['narrator','A vita hamar egy régebbi közös bevásárlásra kanyarodik. Nem kérnek tőled döntőbírói választ, de amikor kérdezel, helyet hagynak a történetednek is.']
   ]}
  ],end);
  s.lines.find(l=>l.id==='line_5')!.next=topics;
 }
 if(s.id==='triad_8'){
  after(s,'line_3','romance_triad_after',[
   ['boglarka','Most néha arra is elfáradok, hogy válaszoljak egy üzenetre. Ettől még várom, hogy írjatok.'],['rebeka','Én meg néha kétszer írok, aztán dühös vagyok magamra. Azt hiszem, könnyebb rám fogni, hogy türelmetlen vagyok.','vulnerable'],['marton','Én is keresem, mikor kérdezek túl sokat. Nem mindig fogom eltalálni.'],['boglarka','Akkor mondjuk meg. A rövid válaszom ne legyen rögtön rossz hír.'],['rebeka','Jó. De néha egy annyit, hogy megkaptam, szeretnék. Ennyit kérek most.']
  ]);
  const end=add(s,'romance_triad_after_end',[
   ['rebeka','Legközelebb nem én főzök. Ezt még a nagy meghatottság előtt rögzítsük.','amused'],['boglarka','Felírtam. Egyébként jó, hogy újra ezen tudunk vitatkozni.','affectionate'],['narrator','A következő estét megbeszélitek. Nem kell úgy tennetek, mintha minden könnyű lenne; ma elég, hogy mindhárman szeretnétek eljönni.']
  ]);
  const topics=menu(s,'romance_triad_next','Hogyan találkozzunk legközelebb?',[
   {id:'callback',text:'Most könnyebb kimondanom, ha hiányoztok, mint a vacsoránál.',requires:{decisions:['triad_named_insecurity']},beats:[['rebeka','Ez már jobb kezdés, mint amikor úgy tettél, mintha csak a szószt figyelnéd.','amused'],['boglarka','Szeretném, ha akkor is szólnál, amikor nincs ilyen nagy ügy mögöttünk.'],['marton','Akkor kezdem a jövő héttel. Szeretnélek látni mindkettőtöket.']]},
   {id:'rest',text:'Lehetne megint közös vacsora, most egészen egyszerűen?',beats:[['boglarka','Lehet. De nem kell mindhármunknak mosolyogni hozzá egész este.'],['rebeka','És nem főzök vigasztalásból három fogást. Főleg az előző teljesítményem után.'],['marton','Hozok kenyeret. A többit együtt eldöntjük.']]},
   {id:'separate',text:'A külön találkozóinkat is beszéljük meg. Mindkettőtökkel szeretnék időt.',beats:[['rebeka','Boglárkával már megbeszéltünk egy délutánt. Veled is szeretnék egyet.','affectionate'],['boglarka','Én is. És maradjon a közös este. Most nem akarom az egyiket a másik helyett választani.'],['marton','Nézzük meg, mikor jó mindhármunknak, aztán a külön alkalmakat is.']]}
  ],end);
  follow(s,'line_5','continue_together',topics);
 }
}
export function expandRomance(original:Scene):Scene{
 const match=/^(rebeka|boglarka|greta)_([2-6])$/.exec(original.id);
 if(!match&&!['triad_3','triad_4','triad_7','triad_8'].includes(original.id))return original;
 const s=structuredClone(original);
 if(match)expandIndividual(s,match[1] as GirlId,Number(match[2]));else expandTriad(s);
 return s;
}
