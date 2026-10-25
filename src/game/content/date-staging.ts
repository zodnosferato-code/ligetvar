/** One date, several places. Staging is explicit per node, so branch merges and reloads are deterministic. */
import type {ActorId,Expression,GirlId,Line,LocationId,Scene,SceneStage} from './types.ts';
type Beat=[ActorId,string,Expression?];
const places:Record<GirlId,{location:LocationId;label:string;invite:string;move:string;settle:string;kiss:string;leave:string}>= {
 rebeka:{location:'holdkor',label:'Üres vetítőterem',
  invite:'A Holdkörben már vége a vetítésnek. El kell tennem a saját gépemet; utána leülhetnénk még kettesben. Van kedved velem jönni?',
  move:'Visszasétáltok a Holdkörhöz. A többiek már elmentek; a sötétítőfüggönyök még a vetítéshez behúzva maradtak. Rebeka elteszi a vetítőt, aztán két széket fordít egymás felé; az ajtót nem zárja kulcsra.',
  settle:'Most nincs közönség. Egy kicsit örülök neki. Egy kicsit meg nem tudom, hová tegyem a kezem.',
  kiss:'Igen. Most kivételesen nem készültem hozzá jó mondattal.',
  leave:'Rebeka felveszi a kabátját. Együtt indultok vissza a tó felé, ahol az utatok kettéválik.'},
 boglarka:{location:'library',label:'Csendes könyvtár',
  invite:'Még vissza kell vinnem a könyvet. Ilyenkor már üres az olvasó, de zárásig van időnk. Bejössz velem? Ott talán meg tudom mutatni azt a számot is.',
  move:'Az udvarról együtt mentek be a könyvtárba. Boglárka visszateszi a könyvet, majd az üres olvasóban helyet mutat maga mellett.',
  settle:'Nem baj, ha csak ülünk egy kicsit. Jó, hogy most nem kell lehalkítanom minden személyes mondatot, amikor valaki elmegy mellettünk.',
  kiss:'Szeretném. Csak lassan. Hadd érjek oda én is.',
  leave:'Boglárka elteszi a telefonját. Zárás előtt együtt mentek ki az udvarra; a kapuig még elkíséritek egymást.'},
 greta:{location:'courtyard',label:'Az udvar csendes padja',
  invite:'Hazafelé megállhatnánk a kastélyudvarban. Van ott egy szélvédett pad; ilyenkor általában senki sem ül kint. Még nem szeretném befejezni a beszélgetést.',
  move:'A tóparti sétányról a kastélyudvarba mentek. A pad körül most üres az udvar. Gréta leül, és maga mellett hagy helyet; a kabátját a saját ölébe teszi.',
  settle:'Ez most egészen jó kitérő. Nem nyertünk vele időt, és semmit sem intéztünk el.',
  kiss:'Igen. Most én is közelebb szeretnék jönni.',
  leave:'Gréta feláll, és megvárja, amíg begombolod a kabátodat. A tó felé vezető úton együtt mentek vissza az elágazásig.'}
};
export function dateConclusion(s:Scene,girl:GirlId,farewell:Beat[]):string {
 const p=places[girl],base:SceneStage={label:'Közös séta',location:s.location,background:s.background,participants:s.participants,proximity:'apart'};
 const quiet:SceneStage={...base,label:p.label,location:p.location,background:p.location,proximity:'beside'};
 s.stages={start:base,start_beside:{...base,proximity:'beside'},private:quiet,private_close:{...quiet,proximity:'close'}};
 function add(id:string,beats:Beat[],stage:string,next?:string){
  s.lines.push(...beats.map(([speaker,text,expression='neutral'],i):Line=>({id:id+'_'+i,speaker,text,expression,stage,next:i+1<beats.length?id+'_'+(i+1):next})));
  return id+'_0';
 }
 const goodbye=add('date_goodbye',[...farewell,['narrator','Elköszöntök, és külön indultok haza. A mai találkozó véget ér; a következő alkalmat már nem kell most eldöntenetek.']],'start');
 const back=add('date_return',[['narrator',p.leave]],'start',goodbye);
 const kiss=add('date_kiss',[
  [girl,p.kiss,'affectionate'],
  ['narrator','Megvárjátok egymás mozdulatát, aztán röviden megcsókoljátok egymást. Amikor elhúzódtok, nem siettek újabb érintéssel kitölteni a csendet.'],
  [girl,girl==='rebeka'?'Ezt most ne elemezzük. Jó volt.':girl==='boglarka'?'Örülök, hogy megkérdezted. Így én is ki tudtam mondani.':'Jó itt veled. Maradjunk még egy percig.','affectionate']
 ],'private_close',back);
 const quietEnd=add('date_quiet',[
  [girl,'Rendben. Jó így melletted ülni.','affectionate'],
  ['narrator','Beszélgettek még egy kicsit. A közelséghez most nem tartozik újabb érintés; egyikőtök sem próbálja megváltoztatni a másik válaszát.']
 ],'private',back);
 s.lines.push({id:'date_private_choice',speaker:'marton',expression:'neutral',stage:'private',text:'Még van egy kis közös időnk.',choices:[
  {id:'kiss',text:'Szeretnélek megcsókolni. Te is szeretnéd?',reaction:'',localRequires:[girl==="boglarka"?'boglarka_date_kiss':girl+'_date_hand'],effect:{decisions:[girl+'_date_romantic_kiss']},next:kiss},
  {id:'stay_close',text:'Maradjunk még így, beszélgetve.',reaction:'',next:quietEnd},
  {id:'head_home',text:'Jó volt veled. Most indulnék haza.',reaction:'',next:back}
 ]});
 const together=add('date_together',[
  ['narrator',p.move],[girl,p.settle,'vulnerable']
 ],'private','date_private_choice');
 const remembered=add('date_remembered',[
  [girl,girl==='boglarka'?'Az előbbi csók után is izgulok. Jólesik, csak szerettem volna kimondani.':'Még egy kicsit foghatom a kezed, amíg odaérünk?', 'affectionate'],
  ['narrator',girl==='boglarka'?'Egymás mellett indultok el.':'Bólintasz. Kézen fogva teszitek meg az utat; amikor megérkeztek és leültök, elengeditek egymás kezét.']
 ],'start_beside',together);
 s.lines.push({id:'date_destination',speaker:girl,expression:'affectionate',stage:'start',text:p.invite,choices:[
  {id:'quiet_place',text:'Szívesen. Menjünk oda, és beszélgessünk még.',reaction:'',next:together},
  {id:'together',text:girl==='boglarka'?'Én is izgulok még az előbbi csók után. Szívesen veled megyek.':'Menjünk. Az úton is szívesen fognám a kezed.',reaction:'',localRequires:[girl==='boglarka'?'boglarka_date_kiss':girl+'_date_hand'],next:remembered},
  {id:'stay_outside',text:'Ma inkább maradnék kint. Kísérjük el egymást egy darabon.',reaction:'',next:goodbye},
  {id:'head_home',text:'Örülök a meghívásnak, de mára elköszönnék.',reaction:'',next:goodbye}
 ]});
 const decline=add('date_declined',[
  [girl,'Köszönöm, hogy megmondtad. Akkor mára elköszönök.'],
  ['narrator','Hagytok egymásnak egy kis teret, aztán külön indultok el. Nem kell a visszautasítást újabb romantikus gesztussal feloldani.']
 ],'start');
 const refusal=s.lines.find(l=>l.id==='line_4')!.choices!.find(c=>c.id==='slow')!;
 refusal.next=decline;refusal.reaction='';
 return 'date_destination';
}
