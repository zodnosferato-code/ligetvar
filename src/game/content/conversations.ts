/** Optional contextual conversations, separate from romance milestones. */
import type {ActorId,Choice,Effect,GirlId,Line,Requirements,Scene} from './types.ts';
type Beat=[ActorId,string];
interface Topic {id:string;text:string;reply:Beat[];effect?:Effect;requires?:Requirements}
function coffee(girl:GirlId,period:'early'|'middle'|'late',title:string,intro:Beat[],topics:Topic[],outro:Beat[]):Scene{
 const week=period==='early'?1:period==='middle'?8:15,deadline=period==='early'?7:period==='middle'?14:16;
 const lines:Line[]=[],add=(prefix:string,beats:Beat[],next?:string)=>{beats.forEach(([speaker,text],i)=>lines.push({id:prefix+'_'+i,speaker,text,expression:'neutral',next:i<beats.length-1?prefix+'_'+(i+1):next}));return prefix+'_0';};
 add('intro',intro,'topics');
 const choices:Choice[]=topics.map(t=>({id:t.id,text:t.text,reaction:'',next:add(t.id,t.reply,'outro_0'),effect:t.effect,requires:t.requires}));
 lines.push({id:'topics',speaker:'marton',text:'Még van idő a következő csésze előtt.',expression:'neutral',choices});add('outro',outro);
 return {periods:['day','night'],id:'coffee_'+girl+'_'+period,title,kind:'conversation',week,deadline,participants:['marton',girl],location:'courtyard',background:'courtyard',lighting:'day',requires:{scenes:['shared_'+(period==='early'?1:period==='middle'?8:15)]},evidence:[],journal:title+' — egy szabad alkalmat beszélgetéssel töltöttünk.',entry:'intro_0',lines,contentStatus:'authored'};
}
export const conversations:Scene[]=[
 coffee('rebeka','early','Rebeka — A rossz kávé védelmében',[
  ['narrator','Rebeka két poharat egyensúlyoz az udvari párkányon. Az egyikre filccel azt írta: bizonyíték.'],
  ['rebeka','Ezt az automatát egyszer lefotózom a saját áldozataival. Tíz év múlva műemlékvédelem alá kerül, és senki nem fogja elhinni, mit tett velünk.'],
  ['marton','Miért veszel mégis innen?'],
  ['rebeka','Mert a rendes kávéért tíz percet kell sétálni. Ez most nem jellemhiba, csak rossz prioritás.']
 ],[
  {id:'process',text:'Mit fotóznál akkor, ha senki nem pontozná?',effect:{decisions:['coffee_rebeka_process']},reply:[['rebeka','Parkolóházakat hajnalban. És embereket, akik elfelejtették, hogy valaki nézi őket.'],['marton','Az utóbbiakat megkérdeznéd?'],['rebeka','Előtte nem lehet. Utána viszont igen. Ha nemet mond, törlöm. Bosszantó tud lenni. Attól még törlöm.'],['narrator','A gépe a táskában marad. A válasz után egy ideig a kapunál veszekedő varjakat nézi.']]},
  {id:'challenge',text:'Lehet, hogy a kávét is csak rossz szögből nézed.',reply:[['rebeka','Ez rettenetes mondat. Én is mondhattam volna.'],['marton','Akkor visszaveszem, mielőtt kiállítod.'],['rebeka','Késő. A címe: Tanár védekezése kihűlt kávéval.'],['narrator','Feléd csúsztatja a kevésbé horpadt poharat. Most nem kér magyarázatot arra, miért nevetsz.']]},
  {id:'ordinary',text:'Mivel töltöd az időt, amikor nincs nálad fényképezőgép?',reply:[['rebeka','Elveszett tárgyakat keresek. Többnyire a fényképezőgépet.'],['marton','Komolyan kérdeztem.'],['rebeka','Tudom. Rossz filmeket nézek, aztán nagyon részletesen elmagyarázom, miért jók. Egyszer majd hozok egyet, és tönkreteszem vele az estédet.'],['marton','Készülök ellenérvekkel.']]}
 ],[['narrator','A kávé elfogy, az automatáról továbbra sem születik kedvező vélemény. Rebeka a saját poharát viszi a kukához, a tiédért nem nyúl.']]),
 coffee('boglarka','early','Boglárka — Egy könyv vége',[
  ['narrator','Boglárka vékony könyvet tart nyitva, de a szemével már nem követi a sort. A másik kezében termosz van.'],
  ['boglarka','Befejeztem. Most még úgy teszek, mintha olvasnám, mert addig nem kell eldöntenem, mit gondolok róla.'],
  ['marton','Ennyire rossz volt?'],
  ['boglarka','Nem. A rossz könyvről sokkal könnyebb véleményt mondani.']
 ],[
  {id:'ending',text:'Mi maradt benned az utolsó oldal után?',effect:{decisions:['coffee_boglarka_ending']},reply:[['boglarka','Egy mellékszereplő. Végig ő javította meg a többiek dolgait, aztán a végén elfelejtették hazaküldeni.'],['marton','Lehet, hogy nyitva hagyták a történetét.'],['boglarka','Lehet. De a többiekét gondosan becsukták. Nem minden elfelejtett ajtó művészi döntés.'],['narrator','Elteszi a könyvjelzőt. Most már nem tartja úgy a kötetet, mintha pajzs lenne köztetek.']]},
  {id:'tea',text:'A teából ajánlasz, vagy ahhoz is meg kell várni a kritikát?',reply:[['boglarka','Abból igen. Csak előre szólok, hogy nincs benne titkos népi összetevő. A boltban vettem.'],['marton','Csalódott vagyok.'],['boglarka','A víz helyi. Talán attól hallasz majd hangokat. Például azt, hogy csukd vissza a termoszt.'],['narrator','A szája sarka megrándul. A poharat azért kitölti, még mielőtt visszakérnéd.']]},
  {id:'quiet',text:'Maradhatunk úgy is, hogy még nem kell véleményt mondanod.',reply:[['boglarka','Jó. Ezt ritkán ajánlják fel. A legtöbben segítenek helyettem befejezni.'],['narrator','Egy ideig a kőlapok közül kinőtt füvet nézitek. Boglárka végül maga csukja be a könyvet.'],['boglarka','Azt hiszem, szerettem. Csak nem azt szerettem benne, amit a hátlap ígért.'],['marton','Akkor a hátlapnak lett vége hamarabb.']]}
 ],[['boglarka','Legközelebb rövidebbet hozok. Nem a beszélgetés miatt. A táskám miatt.'],['narrator','Nem teszi újra maga elé a könyvet. Még pár percig marad.']]),
 coffee('greta','early','Gréta — Húsz perc terv nélkül',[
  ['narrator','Gréta két szalvétát tesz a padra, aztán a telefonján elindítana egy időzítőt. Félúton megáll.'],
  ['greta','Húsz percem van. Nem, ezt rosszul kezdtem. Húsz percet ide akartam ülni.'],
  ['marton','Az időzítő is jön?'],
  ['greta','Ha gúnyolódsz, téged is felveszlek a listára. Nincs is nálam lista. Ez komoly előrelépés.']
 ],[
  {id:'detour',text:'Mi lenne, ha ma nem a legrövidebb úton mennél vissza?',effect:{decisions:['coffee_greta_detour']},reply:[['greta','Az, hogy a portás megkérdezi, eltévedtem-e. Mindig ugyanarra megyek.'],['marton','Akkor legalább új beszélgetéstek lenne.'],['greta','Vagy rábíznám valakire a kulcsot, és a nagy kapun kerülnék. Öt perccel hosszabb.'],['narrator','Megfordítja a telefont, kijelzővel lefelé. Az öt percből most nem csinál költségvetést.']]},
  {id:'organize',text:'Mi az, amit szeretsz megszervezni?',reply:[['greta','Túrát. De olyat, ahol az emberek tényleg odajönnek, és nem reggel kérdezik meg, lesz-e hegy.'],['marton','Ligetváron ez jogos kérdés.'],['greta','Ezért kezdtem tóval. Azt legalább nem kell feljebb építeni, hogy legyen értelme a bakancsnak.'],['narrator','Elneveti magát, aztán a szalvétán megmutat egy útelágazást. Ez a terv láthatóan örömet okoz neki.']]},
  {id:'nothing',text:'Mi lenne, ha most semmit nem intéznénk el?',reply:[['greta','Már elintéztük a leülést. Ne rontsuk le teljesen az eredményt.'],['marton','Abban egyetértünk, hogy maradunk?'],['greta','Igen. És ha keresnek, azt fogom mondani, hogy szüneten vagyok. Egyszer talán kérdőjel nélkül is menni fog.'],['narrator','A telefon rezzen. Gréta rápillant, de nem oldja fel.']]}
 ],[['greta','Ez jó volt. Kicsit bosszantó, hogy nem lett tőle semmi kész, de jó.'],['narrator','A két szalvétát felveszi. A következő napjára nem kapsz feladatot.']]),
 coffee('rebeka','middle','Rebeka — Egy kép a fiókból',[
  ['narrator','Rebeka egy apró nyomatot forgat. Nem a nyomozás képei közül való: a hajnali buszmegálló látszik rajta.'],
  ['rebeka','Ezt nem neveztem sehova. Mielőtt megkérdezed: nem minden titok segélykiáltás. Van, ami egyszerűen nincs kész.']
 ],[
  {id:'callback',text:'Ez is olyasmi, amit pontozás nélkül fotóznál?',requires:{decisions:['coffee_rebeka_process']},reply:[['rebeka','Emlékszel a parkolóházakra? Kicsit túl nagy mellénnyel mondtam. Reggel hatkor a buszmegállóig jutottam.'],['marton','Azért felkeltél.'],['rebeka','Igen. Senki nem kérte. Zavarba ejtő élmény.'],['narrator','A képet a szélénél tartja eléd. A nagyra törő tervből most nem csinál kudarcot.']]},
  {id:'show',text:'Megnézhetem, mielőtt mondok róla bármit?',reply:[['rebeka','Ez veszélyesen közel van a jó kezdéshez. Tessék.'],['narrator','Az esőfoltos üveg mögött valaki két tenyérrel melegít egy poharat. Az arcát a hajnali fény elrejti.'],['marton','A várakozás jobban látszik rajta, mint az ember.'],['rebeka','Most kivételesen pontosan ezt szerettem volna. Idegesítő, hogy nem tudok vitatkozni.']]},
  {id:'badfilm',text:'A rossz filmes estére még mindig készülhetek?',reply:[['rebeka','Már listám van. Az egyikben ugyanaz a kastély három különböző országban szerepel. Hazai pálya.'],['marton','Lehet közben beszélni?'],['rebeka','Kötelező. De a legrosszabb jelenetnél csendben kell maradnod, mert azt szeretem a legjobban.'],['narrator','Aztán elmeséli a jelenetet. A felénél már annyira nevet, hogy nem tudod meg, ki zuhan le a lépcsőn.']]}
 ],[['narrator','Rebeka visszateszi a nyomatot a borítékba. Nem adja oda; most már azt sem érzed elutasításnak, hogy megtartja.']]),
 coffee('boglarka','middle','Boglárka — A második csésze',[
  ['narrator','Boglárka a pad felé int a termoszával. A könyv ezúttal a táskában marad.'],
  ['boglarka','Van tíz perced? Nem kell hozzá semmit átnézni. Ezt előre mondom, különben biztos előkerül egy kézirat.']
 ],[
  {id:'callback',text:'Megkapta végül a mellékszereplő a saját befejezését?',requires:{decisions:['coffee_boglarka_ending']},reply:[['boglarka','A könyvben nem. A margón igen. Most egy kertje van, és nem engedi be a főhőst.'],['marton','Ez elég határozott folytatás.'],['boglarka','Csak ceruzával írtam. Az ember ne váljon rögtön zsarnokká a második kiadásban.'],['narrator','A termosz kupakját feléd fordítja. Nem kérdezi meg, emlékszel-e még a könyvre; a kérdéseddel már válaszoltál.']]},
  {id:'want',text:'Mihez lenne kedved, ha most nem hívna vissza a könyvtár?',reply:[['boglarka','Nem hív vissza. Csak én szoktam úgy tenni, mintha nélkülem megváltoznának a polcjelek.'],['marton','Akkor?'],['boglarka','Meghallgatnék egy koncertet. Olyat, ahol nem kell okosat mondani utána. Csak hogy melyik résznél nem tudtam nyugton maradni.'],['narrator','Az utolsó mondatot gyorsabban mondja. Aztán megnevez egy együttest, és most ő kérdezi, ismered-e.']]},
  {id:'joke',text:'A kéziratot elkobozhatjuk a találkozó végéig.',reply:[['boglarka','Azt nem. De lecsukhatjuk. A tulajdonviszonyokat szeretném rendben tartani.'],['marton','Szigorú feltételek.'],['boglarka','Várd meg a kölcsönzési szabályzatot. Külön fejezet a kéretlen piros toll.'],['narrator','Ezúttal nem nyeli el a nevetését. A saját viccén még egyszer elmosolyodik, amikor kitölti a teát.']]}
 ],[['boglarka','A következő csészénél mesélj te is valamit, amihez nem kell forrásjegyzék.'],['narrator','A kérdés után marad csönd. Boglárka most nem siet kitölteni.']]),
 coffee('greta','middle','Gréta — A kikapcsolt telefon',[
  ['narrator','Gréta már a padon ül. A telefon a táskájában van, a táska be van cipzározva.'],
  ['greta','Ma valaki más zárja az irodát. Kétszer ellenőriztem, hogy tudja-e. A harmadik üzenetet nem küldtem el. Szerintem ezt ünnepelni kell.']
 ],[
  {id:'callback',text:'A nagy kapun át jöttél, ahogy a kerülőt tervezted?',requires:{decisions:['coffee_greta_detour']},reply:[['greta','Igen. A portás tényleg megkérdezte, eltévedtem-e. Neked ezt nem kellett volna ilyen pontosan megjósolni.'],['marton','Mit mondtál?'],['greta','Hogy ma igen. Egész nap jókedve volt tőle.'],['narrator','Kinyújtja a lábát a pad előtt. A kerülőt már nem kezdi percekre bontani.']]},
  {id:'celebrate',text:'Mivel ünnepelnéd?',reply:[['greta','Sós pereccel. A közértben maradt kettő, de az egyik ferde.'],['marton','Az akadály?'],['greta','A ferde több sajtot kapott. Ezen már gondolkodtam.'],['narrator','Feláll, aztán nem indul el rögtön.'],['greta','Jössz? Ha nem, visszahozom. Ha igen, most én választok útvonalat.']]},
  {id:'hard',text:'Mi volt nehezebb: átadni a kulcsot vagy nem rákérdezni?',reply:[['greta','Nem rákérdezni. A kulcsot könnyű odaadni. A fejemben még fél óráig én nyitogattam az ajtókat.'],['marton','Most is?'],['greta','Most kevésbé. Beszélj még valamit. Lehetőleg olyat, amire nem az a válasz, hogy majd én megoldom.'],['narrator','Nem veszi elő a telefonját, amikor az irodaablakban felkapcsolódik a fény.']]}
 ],[['greta','Legközelebb nem fogom végig kommentálni, hogy szünetet tartok. Vagy legalább megpróbálom.'],['narrator','A padon töltött időnek ezúttal nincs jegyzőkönyve.']]),
 coffee('rebeka','late','Rebeka — Amit ma nem fényképezünk',[
  ['narrator','Rebeka a fényképezőgép szíját tekeri az ujjára. A lencsevédő a helyén van.'],
  ['rebeka','Ma mindenki azt kérdezi, megvan-e a kép. Van, aki szerint mindent meg kell mutatni. Milyen egyszerű, amikor más van rajta.']
 ],[
  {id:'rest',text:'Ma nem kell elővenned.',reply:[['rebeka','Tudom. Csak még várom, hogy valaki utánam szóljon, amiért kimarad valami.'],['marton','Akkor maradjon ki ez a pad.'],['rebeka','Jó. Borzasztóan közepes pad. Nem is érdemli meg.'],['narrator','Leteszi maga mellé a gépet, a táskájába nem teszi vissza. Ma ennyi megy.']]},
  {id:'ordinary',text:'Mesélj valamit, ami ma bosszantott, és semmi köze az ügyhöz.',reply:[['rebeka','Valaki elvitte a kedvenc bögrémet. Azt mondta, mind ugyanolyan fekete.'],['marton','Volt rajta valami jel?'],['rebeka','Nem. Ez benne a szörnyű. A felháborodásom teljesen megalapozatlan, és mégis ragaszkodom hozzá.'],['narrator','A nevetés rövid, de most nem kell utána rögtön megmagyaráznia semmit.']]}
 ],[['narrator','Amikor fölálltok, Rebeka a gépért nyúl. Nem készít búcsúképet.']]),
 coffee('boglarka','late','Boglárka — Egy hétköznapi szó',[
  ['narrator','Boglárka a termosz kupakját csavarja. Már elengedte, mégis tovább fordítja az ujjait.'],
  ['boglarka','Próbáltam mást olvasni. Valami olyat, amiben a pince csak pince. Meglepően szűk műfaj.']
 ],[
  {id:'listen',text:'Nem kell most rögtön sikerülnie.',reply:[['boglarka','Tudom. Csak türelmetlen vagyok magammal. Kívülről ez kevésbé látszik, mert közben nem beszélek.'],['marton','Mit csináljunk helyette?'],['boglarka','Üljünk. Aztán mesélj valami kicsit. Például hogy miért olyan rossz itt az automata.'],['narrator','A poharat most saját magának tölti először. Aztán megkérdezi, kérsz-e.']]},
  {id:'book',text:'Keressünk egy könyvet, amiben semmi különös nem történik.',reply:[['boglarka','Akkor ne a katalógus ajánlása alapján. Ott minden családi ebéd sorsfordító.'],['marton','Egy kertészeti könyv?'],['boglarka','Abban a kártevők. De elfogadom. Legalább valaki pontosan leírja, mi rágta meg a levelet.'],['narrator','Felír egy címet. Ezúttal nem tesz mellé határidőt.']]}
 ],[['boglarka','Köszönöm a beszélgetést. Nem tudom még szebben mondani, úgyhogy így hagyom.']]),
 coffee('greta','late','Gréta — Ma valaki más zár',[
  ['narrator','Gréta kabátban érkezik. A kezében nincs dosszié.'],
  ['greta','A kulcsot leadtam. A pótkulcsot is. Mielőtt megkérdeznéd, mindet.'],
  ['marton','Nem kérdeztem.'],
  ['greta','Magamnak válaszoltam. Kicsit hangosan sikerült.']
 ],[
  {id:'walk',text:'Menjünk addig, amíg jólesik.',reply:[['greta','Itt a tóhoz indulnék. Ha félúton visszafordulok, nem fogsz belőle következtetést levonni?'],['marton','Legfeljebb azt, hogy visszafordultunk.'],['greta','Kiváló. Végre egy jelentés, amit nem kell javítanom.'],['narrator','Lassan indul, és most nem számolja fel a távolságot attól, hogy lassan teszi.']]},
  {id:'sit',text:'A padhoz már elég messze eljutottál.',reply:[['greta','Tegnap ezt sértésnek vettem volna. Ma lehet, hogy igazad van.'],['narrator','Leül. A kabátját nem veszi le, de a vállát leengedi.'],['greta','Ha keresnek, holnap válaszolok. Ezt most nem kell megdicsérned. Csak hallottad.'],['marton','Hallottam.']]}
 ],[['narrator','A telefon egyszer sem kerül elő. Az iroda zárása ma valaki más napjának része.']])
];
