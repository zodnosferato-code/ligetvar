/** Optional adult side story. Decisions record individual invitations, never blanket consent. */
import type {Choice,GameState,Line,LocationId,Scene} from './types.ts';
const line=(id:string,speaker:Line['speaker'],text:string,next?:string,choices?:Choice[]):Line=>({id,speaker,text,next,choices,expression:speaker==='virag'?'amused':'neutral'});
const choice=(id:string,text:string,next:string,reaction:string,decision?:string):Choice=>({id,text,next,reaction,...(decision?{effect:{decisions:[decision]}}:{})});
function chapter(n:number,title:string,week:number,location:LocationId,lines:Line[],journal:string):Scene{
 return {id:'virag_'+n,title,kind:'conversation',week,deadline:14,periods:['day','night'],location,background:location,lighting:'day',participants:['marton','virag'],requires:n===1?{}:{scenes:['virag_'+(n-1)]},evidence:[],journal,entry:lines[0].id,lines,contentStatus:'authored'};
}
export const viragScenes:Scene[]=[
 chapter(1,'Virág · Az elveszett elsőéves',2,'hallway',[
  line('arrival','narrator','Rövid, élénkkék hajú, apró termetű fiatal nő fordítja meg a térképet a folyosón. Rakott szoknyája, galléros blúza és vállra vetett kardigánja gondosan összeállított egyetemista öltözék. A tanácstalan tekintethez feltűnően biztos hang társul.','help'),
  line('help','virag','Bocsánat! A gazdasági iroda merre van? A nyilak szerint vagy eltévedtem, vagy a könyvelés a falban lakik. Virág vagyok. Tizenkilenc. És hivatalosan nagyon elveszett.','invite'),
  line('invite','virag','Mutasd meg, és meghívlak valamire. Vagy mondd azt, hogy randi: rövidebb szó, jobban hangzik.',undefined,[
   choice('flirt','Randi? Kezdjük egy sétával.','near','Virág mosolya kiszélesedik.','virag_first_flirt'),
   choice('directions','Elmondom az utat, de randit nem ígérek.','directions_reply','Virág megjegyzi az útvonalat.'),
   choice('leave','Most nem érek rá.','leave_reply','Virág félrelép az útból.')]),
  line('near','virag','Szabad? — a karodra mutat. — A térképem megbízhatatlan, de legalább jó társaságot választottam.',undefined,[choice('arm','Nyújtom a karom.','arm','Könnyedén beléd karol.','virag_arm'),choice('space','Sétáljunk inkább egymás mellett.','space','Virág visszahúzza a kezét.')]),
  line('arm','narrator','Virág beléd karol, és néhány lépésig közel marad. Az iroda előtt elenged, mielőtt belépne.','bye'),
  line('space','virag','Rendben. A szellemes társalgás szerencsére érintés nélkül is veszélyes.','bye'),
  line('directions_reply','virag','Az útbaigazítást elfogadom. A randiajánlatomat később újrafogalmazom, hátha csak a címe nem tetszett.','bye'),
  line('leave_reply','virag','Akkor menj. Legközelebb jobb időzítéssel és rosszabb kifogással jövök.','bye'),
  line('bye','narrator','Virág az iroda felé indul. A nyitott ajtónál már egy beszerzési hirdetmény azonosítóját jegyzi fel, nem a térképet nézi. Te folytatod a napodat.')
 ],'Megismertem a tizenkilenc éves Virágot. Útbaigazítást és rögtön találkozót kért; a gazdasági iroda hirdetményét figyelte.'),
 chapter(2,'Virág · A névjegy hátoldala',3,'courtyard',[
  line('start','virag','Megtaláltam az irodát. Téged is. Mindkettő siker, de csak az egyiknek örülök ennyire. Üljünk le?','reveal'),
  line('reveal','virag','Mielőtt megint eljátszom az elsőévest: nem vagyok a hallgatód. A Mérceháló országos hírügynökség junior riportere vagyok. Egyetemi korrupcióval foglalkozunk; szerkesztő és jogász is ellenőrzi, amit leadok.','reason'),
  line('reason','marton','A térkép színjáték volt. Engem pedig bejáratnak néztél.','answer'),
  line('answer','virag','Igen. Könnyebben beszélnek egy csinos, elveszett lánnyal, mint egy riporterrel. Az eltűnések körül hallott hallgatás hozott ide, de engem most a visszatartott ösztöndíjak és a papíron kész felújítás érdekel. A mosolyom is munkaeszköz volt. Nem csak az.','choice'),
  line('choice','virag','Kérj számon, ha akarsz. De a meghívásom valódi: veled akarok találkozni.',undefined,[
   choice('play','Látom a játékodat. Egyelőre benne vagyok.','play_reply','Virág nem próbálja ártatlannak mutatni magát.','virag_knows_game'),
   choice('challenge','Ne kezeld az érdeklődésemet belépőkártyának.','challenge_reply','Virág elkomolyodik.','virag_called_out'),
   choice('no_date','Ma nincs randi. A névjegyet megnézem.','no_reply','Virág leteszi a névjegyet.')]),
  line('play_reply','virag','Ez sokkal érdekesebb, mint amikor valaki nem veszi észre. Bizalmas adatot nem kérek randibelépőnek. Nyilvános iratot viszont olvasnál velem?','bye'),
  line('challenge_reply','virag','Jogos. A munkámhoz kérek segítséget, a közelségedet pedig szeretném. Nem ugyanaz. És nem lesz attól ugyanaz, hogy gyorsan beszélek.','bye'),
  line('no_reply','virag','Ma nem. Felírtam — a mai dátum mellé, nem örök törvénynek. A könyvtárban megtalálsz, ha kíváncsi leszel az iratokra.','bye'),
  line('bye','narrator','A névjegyen szerkesztőségi elérhetőség szerepel. Virág összecsukja a jegyzetfüzetet, rád mosolyog, és elindul a könyvtár felé; nem tart vissza.')
 ],'Virág felfedte, hogy a fiktív Mérceháló hírügynökség riportere, nem hallgatóm. Ösztöndíjak és felújítási szerződések ügyében keres belső összefüggéseket.'),
 chapter(3,'Virág · Szabad Hullám',4,'library',[
  line('start','narrator','Virág két nyilvános kimutatást tesz az asztalra. Az egyikben kifizetett ösztöndíj szerepel, a másikban ugyanaz az összeg függő tétel. A melléd tett széket még nem húzza közelebb.','clue'),
  line('clue','virag','Eltérés, nem kész vád. Kell a könyvelési időszak, a döntés és a tényleges utalás dátuma. Tudom, csalódás: néha a hangos nő is elolvassa a lábjegyzetet.','movement'),
  line('movement','marton','És az a kék hullám a füzeteden?','explain'),
  line('explain','virag','Szabad Hullám. A mi kicsi, új feminista körünk. Szerintünk egy nő kezdeményezhet, élvezheti a vonzerejét, és választhat nyitott kapcsolatot. Nem kell szerénynek hazudnia magát. Ez az én irányzatom, nem minden nő nevében beszélek.','debate'),
  line('debate','virag','A szabadság nem attól szabadság, hogy mindig én kapom, amit akarok. De kérdezni sokszor merek. Például: közelebb húzhatom a székem?',undefined,[
   choice('beside','Gyere közelebb, együtt olvasunk.','beside','Virág melléd ül.','virag_beside'),
   choice('debate','A nyitottság működhet, de a manipuláció nem lesz egyenlőség.','debate_reply','Virág leteszi a tollat.','virag_debate'),
   choice('distance','Innen is látom.','distance','Virág a helyén marad.')]),
  line('beside','virag','Így a lábjegyzet és te is jobb helyen vagytok. — A válla egy pillanatra a tiédhez ér, majd az eltérő dátumra mutat. — Ezt kell kikérnünk.','bye'),
  line('debate_reply','virag','Igaz. Attól, hogy nőként élek a befolyásommal, még elszámolhatok vele rosszul. Ezt ne hagyd annyiban csak azért, mert tetszem. Már ha tetszem.','bye'),
  line('distance','virag','Kár. A táblázatnak ettől még neki kell esnünk. Majd személyesebb betűméretet választok.','bye'),
  line('bye','narrator','Közösen megfogalmazzátok a nyilvános adatigénylést. Virág elküldi a szerkesztőségnek, visszatolja a széket, és az ajtónál külön köszöntök el.')
 ],'Nyilvános ösztöndíjkimutatások eltérését ellenőriztük. Virág beszélt saját Szabad Hullám irányzatáról; adatigénylés készül, még nincs bizonyított visszaélés.'),
 chapter(4,'Virág · A randi apró betűje',6,'bekas',[
  line('start','virag','Ma a tó a helyszín, és nem azért, mert közbeszerzési eljárásban nyert. Hoztam kávét. Igen, még mindig próbálkozom.','case'),
  line('case','virag','Megjött a válasz: az ösztöndíjpénzt egy közvetítőnél tartották, miközben teljesítettként jelentették. A felújításnál ugyanaz a kapcsolattartó szerepel. A szerkesztőm ellenőrizteti a céges kapcsolatot.','date'),
  line('date','marton','Egy randin is mindig lesz ügyirat?','honest'),
  line('honest','virag','Eleinte biztosan. Hozzád is azért mentem oda, mert hasznos lehettél. Most már az is érdekel, miért mosolyogsz akkor is, amikor átlátsz rajtam.','kiss'),
  line('kiss','virag','Megcsókolnál? Egyenes kérdés. Meglepő, tudom.',undefined,[
   choice('kiss_yes','Igen. Közelebb hajolok.','kissed','Virág kimondja: „Én is szeretném.”','virag_kissed'),
   choice('tease','Még udvarolhatsz egy kicsit.','tease_reply','Virág felnevet.'),
   choice('kiss_no','Nem szeretnék csókot.','no','Virág hátrébb húzódik.')]),
  line('kissed','narrator','Virág közelebb hajol, és röviden megcsókoljátok egymást. Amikor elváltok, most először nem tölti ki rögtön a csendet.','after'),
  line('after','virag','Na jó. Ehhez tényleg nem kell sajtóközlemény.','bye'),
  line('tease_reply','virag','Felháborító munkaterhelés. Vállalom. Kezdem azzal, hogy öt percig nem mondom ki: közvetítő cég.','bye'),
  line('no','virag','Rendben. A rossz vicceimről nem mondtam le, de ezt a kérdést mára lezártuk.','bye'),
  line('bye','narrator','Megisszátok a kávét. Virág elteszi a poharakat, a sétány elágazásánál integet, és a saját útján indul haza.')
 ],'A tóparti találkozón az ösztöndíjak közvetítőjéről beszéltünk. Virág nyíltan kezdeményezett; a találkozó külön hazautazással zárult.'),
 chapter(5,'Virág · A behajtott lap',8,'courtyard',[
  line('start','narrator','Virág egy kinyomtatott jegyzetet hajt félbe, de a neved melletti mondatot még látod: „belső hozzáférés, személyes szimpátia”.','caught'),
  line('caught','marton','Ez lennék én a munkatervedben?','admit'),
  line('admit','virag','Ez volt az első terv. És nem húztam ki, amikor már meg kellett volna. Szerettem, hogy segítesz; kényelmes volt úgy tenni, mintha a kettő nem keveredne.','response'),
  line('response','virag','Nem fogom az irányzatom mögé rejteni. Ezt én csináltam.',undefined,[
   choice('aware','Tudtam, hogy használni akarsz. Attól még számon tartom.','aware','Virág bólint.','virag_accountable'),
   choice('hurt','Tetszhetsz nekem, és ettől még fájhat ez.','hurt','Virág most nem vág közbe.','virag_accountable'),
   choice('break','Ma fejezzük be ezt a találkozót.','break','Virág összecsukja a mappát.','virag_pause')]),
  line('aware','virag','Rendben. A szerkesztőmnek jelzem az összeférhetetlenséget; más ellenőrzi a tőled kapott összefüggéseket. Téged nem idézlek külön engedély nélkül. A meghívásaim viszont továbbra is kellemetlenül őszinték lesznek.','bye'),
  line('hurt','virag','Hallom. Nem kérek egy mosollyal felmentést. Más riporter ellenőrzi a forrásrészt, én pedig nem írhatom meg rólad, mit érzel. Azt legfeljebb megkérdezhetem.','bye'),
  line('break','virag','Jó. Ma elmegyek. Legközelebb valószínűleg megint udvarolni fogok, de ezt a beszélgetést nem fogom úgy kezelni, mintha meg sem történt volna.','bye'),
  line('bye','narrator','Virág átírja a jegyzet fejlécét: „forráskezelés külön ellenőrzéssel”. A papírt elteszi, és elköszön. A történtek nem tűnnek el egy szellemes mondattól.')
 ],'Láttam Virág eredeti, engem hozzáférésként kezelő jegyzetét. Vállalta a felelősséget; a forrásellenőrzést más riporterre bízza.'),
 chapter(6,'Virág · Amit a számok elárulnak',10,'library',[
  line('start','virag','A bókom ma az, hogy hiányoztál. A hírem pedig az, hogy a független ellenőrzés ugyanoda jutott. Egyiket sem kérem a másikért cserébe.','facts'),
  line('facts','virag','Az ösztöndíjközvetítő és a felújító cég tényleges tulajdonosa ugyanaz a vezetői rokon. A nyilvános cégadatot két szerződés és az átadás hiánya támasztja alá. A jogász szerint ezt már meg lehet kérdezni a vezetéstől, állításról állításra.','missing'),
  line('missing','marton','És az eltűnések?','limit'),
  line('limit','virag','Azok okát nem bizonyítják ezek az iratok. A panaszok eltussolását igen: a vezetés a támogatás jó hírére hivatkozva nem továbbította őket. Erről írok. A többit nem találom ki a hangzatos címért.','invitation'),
  line('invitation','virag','Most elrakom az aktát. Van kedved kint velem sétálni? Ha megint nemet mondasz, legalább a könyvtár előtt fogok drámaian sóhajtani.',undefined,[
   choice('walk','Sétáljunk.','walked','Virág feláll, megvár az ajtónál.','virag_walk'),
   choice('stay','Még a válaszadás határidejét nézzük meg.','work','Virág visszalapoz.'),
   choice('go','Mára ennyi.','goodbye','Virág elteszi a lapokat.')]),
  line('walked','virag','Most nincs térképem. Az első alkalommal sem kellett igazán. De a karod azért tetszett, amikor felajánlottad — vagy amikor elképzeltem, hogy felajánlod.','outside'),
  line('outside','narrator','Kiléptek az udvarra. Virág melletted sétál a kapuig; most nem ér hozzád kérdés nélkül. A kapunál külön indultok tovább.'),
  line('work','virag','Hét munkanap. És igen, a kérdéseket ugyanabban a levélben kapják meg, nem romantikus részletekbe rejtve. Azok neked maradnak.','goodbye'),
  line('goodbye','narrator','Virág elküldi a végleges kérdéssort a szerkesztőjének. Elköszöntök; a válasz és a cikk ellenőrzése a szerkesztőség feladata marad.')
 ],'Független ellenőrzés kapcsolta össze a két korrupciós ügyet. A panaszok elhallgatásáról van adat; az eltűnések természetfeletti okára ebből nem következtetünk.'),
 chapter(7,'Virág · Zárt füzet, nyitott kérdés',12,'bekas',[
  line('start','virag','A vezetés válasza megjött, a cikket ellenőrizték. Ma nincs mit kiszednem belőled. Mégis idehívtalak. Ebből lassan kellemetlen következtetéseket kell levonnom.','offer'),
  line('offer','virag','Nem ígérek kizárólagosságot, és nem is várom el. Nekem a nyitott kapcsolat őszinte megállapodás: nem titokban kerülök meg valaki másnak tett ígéretet. A Szabad Hullám sem varázsszó mások helyett.','ask'),
  line('ask','virag','Szeretnélek látni, ügyirat nélkül is. Most pedig szívesen odabújnék melléd. Mit szeretnél?',undefined,[
   choice('cuddle','Bújj ide. A további találkozókról is beszéljünk.','cuddled','Virág megvárja, amíg helyet csinálsz.','virag_cuddle'),
   choice('slow','Beszéljünk, érintés nélkül.','slow','Virág melletted marad, kis távolsággal.'),
   choice('decline','Nem szeretnék kapcsolatot ígérni.','declined','Virág nem kér ígéretet.')]),
  line('cuddled','narrator','Virág a válladnak dől. Egy ideig csendben nézitek a vizet. A közelség ezúttal nem egy újabb kérdés előjátéka.','future'),
  line('future','virag','Akkor legközelebb is megkérdezem, mit szeretnél. De remélem, közben megengedett lesz egy-két elviselhetetlen bók.','bye'),
  line('slow','virag','Rendben. A gyorsaságom nem kötelező menetrend. Attól még kitartóan foglak szépnek nevezni, amíg meg nem unod a szókincsemet.','bye'),
  line('declined','virag','Ne ígérj. Én sem fogok helyetted. Találkozni azért szeretnék még veled — igen, ez újabb meghívás volt.','bye'),
  line('bye','narrator','Virág feláll a padról, és megvárja, hogy te is összeszedd a holmid. A sétány végén elköszöntök; egyikőtök sem nevezte a másik döntését végleges tulajdonjognak.')
 ],'Virág ügyiratok nélküli találkozót kezdeményezett. A nyitott kapcsolatról saját vágyként beszélt, nem mások ígéreteit felülíró szabályként.'),
 chapter(8,'Virág · Címlap után',13,'courtyard',[
  line('start','narrator','Virág a megjelent cikksorozatot mutatja. A visszatartott ösztöndíjakat elutalták, a valótlan felújítási teljesítést visszavonták, a panaszok eltussolását dokumentálták. A felelős vezetőt leváltották; a hatósági utóeljárás külön folytatódik.','solved'),
  line('solved','virag','Mindhárom kérdésre megvan az ellenőrzött válasz. Nem minden korrupció szűnt meg az országban, de ez az ügy nem maradt egy fiókban. A szerkesztőm most először nem azt mondta: „korodhoz képest”. Csak azt: „jó munka”.','credit'),
  line('credit','marton','Mit írtál rólam?','answer'),
  line('answer','virag','Semmit, amit nem engedélyeztél. A neved nincs benne. A független ellenőrzés elég volt. Magamnak viszont megjegyeztem néhány dolgot. Például azt, hogy még mindig szeretnélek elhívni.','last'),
  line('last','virag','Vacsora? Nincs fedősztori. Aztán eldöntjük, meddig maradunk.',undefined,[
   choice('again','Legyen egy újabb randi.','yes','Virág öröme ezúttal nem szerep.','virag_future_date'),
   choice('maybe','Hívj fel. Aznap eldöntöm.','maybe','Virág felnevet.','virag_future_open'),
   choice('no','Ma nem megyek veled.','no','Virág bólint.','virag_future_declined')]),
  line('yes','virag','Végre egy időpont, amelynek nincs köze a közérdekű adatokhoz. Azért pontos leszek. Valószínűleg.','bye'),
  line('maybe','virag','Kíméletlenül jelen időben élsz. Tetszik. Majd felhívlak, és rossz viccel kezdek.','bye'),
  line('no','virag','Akkor ma ünneplek a szerkesztőséggel. A bókot itt hagyom: jó volt téged megismerni. A következő meghívásomon még dolgozom.','bye'),
  line('bye','narrator','Virág eltűnik a kapun túl, kék haja még egyszer kivillan a sál fölött. A munkája sikerült. Ami köztetek alakul, azt nem az újság címlapja dönti el.')
 ],'Virág cikksorozata lezárta az ösztöndíj-, felújítási és panaszeltussolási nyomozást. A szakmai siker nem függött a köztünk választott közelségtől.')
];
viragScenes[0].periods=['day'];
viragScenes[0].lines.find(l=>l.id==='arm')!.moment='virag_arm';
viragScenes[3].lines.find(l=>l.id==='kissed')!.moment='virag_kiss';
viragScenes[6].lines.find(l=>l.id==='cuddled')!.moment='virag_cuddle';
// Stage is explicit on each node, including refusal and merge nodes.
for(const x of viragScenes){
 const destinations:Record<string,LocationId>=x.id==='virag_6'?{outside:'courtyard'}:{};
 const near=new Set(['arm','beside','kissed','after','cuddled','future']);
 x.stages=Object.fromEntries(x.lines.map(l=>[l.id,{label:x.title,location:destinations[l.id]??x.location,background:destinations[l.id]??x.background,participants:x.participants,proximity:near.has(l.id)?'close' as const:'apart' as const}]));
 for(const l of x.lines){l.stage=l.id;if(['admit','reason','facts','limit','explain','offer'].includes(l.id))l.expression='neutral';if(['hurt','caught'].includes(l.id))l.expression='vulnerable';}
}
/** Public end-of-semester report: successful even if the player skipped the route. */
export function viragEpilogue(s:GameState):string{
 const report='A Mérceháló félév végi cikksorozatában Virág feltárja a visszatartott ösztöndíjak, a valótlan felújítási teljesítések és az elhallgatott panaszok ügyét. A pénzeket kiutalják, a hibás teljesítést visszavonják, a felelős vezetőt leváltják. Riporteri nyomozása sikeresen lezárul; a hatósági utóeljárás folytatódik.';
 if(!s.completed.virag_1)return report;
 return report+' '+(s.decisions.virag_future_date?'Virág egy következő randira hív, most már fedősztori nélkül.':s.decisions.virag_future_open?'Virág telefonál: az új találkozóról akkor döntötök, nem előre.':'Virág újabb játékos meghívást küld. Márton válasza továbbra is az övé; Virág szakmai sikere ettől független.');
}
