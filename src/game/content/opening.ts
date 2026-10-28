import {storedMessage,message,type TextReference} from './scene-localization.ts';
/** Authored opening scene expansion. */
import type {ActorId,Expression,Line,Scene} from './types.ts';
type Beat=[ActorId,string|TextReference,Expression?];
function chain(prefix:string,beats:Beat[],next?:string):Line[]{return beats.map(([speaker,text,expression='neutral'],i)=>({id:prefix+'_'+i,speaker,...(typeof text==='string'?{text}:text),expression,next:i<beats.length-1?prefix+'_'+(i+1):next}));}
function after(s:Scene,id:string,prefix:string,beats:Beat[]){const l=s.lines.find(l=>l.id===id)!;const added=chain(prefix,beats,l.next);l.next=added[0].id;s.lines.push(...added);}
function branch(s:Scene,id:string,choice:string,prefix:string,beats:Beat[],terminal=false){const l=s.lines.find(l=>l.id===id)!,c=l.choices!.find(c=>c.id===choice)!;const added=chain(prefix,beats,terminal?undefined:l.next);c.next=added[0].id;s.lines.push(...added);}
export function expandOpening(original:Scene):Scene{
 const s=structuredClone(original);
 if(s.id==='shared_1'){
  after(s,'line_3','opening_questions',[
   ['greta',message('scene.opening.clearDoorway')],
   ['rebeka',message('scene.opening.cameraJoke'),'amused'],
   ['greta',message('scene.opening.tripPrevention')],
   ['boglarka',message('scene.opening.localSequenceJoke'),'amused'],
   ['narrator',message('scene.opening.crookedCircle')]
  ]);
  branch(s,'line_4','demonstrate','opening_demonstrate',[
   ['marton',message('scene.opening.demonstrateStart')],
   ['rebeka',message('scene.opening.dangerousOffer'),'amused'],
   ['marton',message('scene.opening.noticeFailure')],
   ['boglarka',message('scene.opening.clockJoke')],
   ['greta',message('scene.opening.timing')]
  ]);
  branch(s,'line_4','observe','opening_observe',[
   ['marton',message('scene.opening.observeStart')],
   ['rebeka',message('scene.opening.failedDemonstration')],
   ['marton',message('scene.opening.honestReview')],
   ['boglarka',message('scene.opening.watchClock')],
   ['greta',message('scene.opening.voluntaryParticipation')]
  ]);
  after(s,'line_7','soma_departure',[
   ['soma',message('scene.opening.somaReport'),'neutral'],
   ['greta',message('scene.opening.faultyLamp')],
   ['soma',message('scene.opening.cellarRemark')],
   ['narrator',message('scene.opening.keys')]
  ]);
 }
 if(s.id==='shared_4'){
  branch(s,'line_5','separate','timeline_separate',[
   ['narrator',message('scene.timeline.separate.0')],
   ['rebeka',message('scene.timeline.separate.1')],
   ['narrator',message('scene.timeline.separate.2')]
  ]);
  branch(s,'line_5','check','timeline_check',[
   ['greta',message('scene.timeline.check.0')],
   ['rebeka',message('scene.timeline.check.1'),'amused'],
   ['narrator',message('scene.timeline.check.2')]
  ]);
 }
 if(s.id==='shared_2'){
  after(s,'line_0','missing_inventory',[
   ['marton',message('scene.missing.lastContact')],
   ['greta',message('scene.missing.waiting')],
   ['rebeka',message('scene.missing.nothingToSee'),'amused'],
   ['greta',message('scene.missing.lockDoor')],
   ['boglarka',message('scene.missing.twentyMinutes')],
   ['greta',message('scene.missing.witness')]
  ]);
  branch(s,'line_5','ask','lilla_contact',[
   ['marton',message('scene.missing.contactDetails')],
   ['denes',message('scene.missing.silence')],
   ['rebeka',message('scene.missing.leaveCamera')],
   ['greta',message('scene.missing.bookRoom')],
   ['boglarka',message('scene.missing.bench')],
   ['narrator',message('scene.missing.cancelBooking')]
  ]);
  branch(s,'line_5','space','lilla_space',[
   ['rebeka',message('scene.missing.curiosity')],
   ['greta',message('scene.missing.tellWorkshop')],
   ['boglarka',message('scene.missing.dontKnow')],
   ['marton',message('scene.missing.offerHelp')],
   ['denes',message('scene.missing.letSleep')],
   ['narrator',message('scene.missing.message')]
  ]);
 }
 if(s.id==='shared_2'){
  const group:ActorId[]=['marton','rebeka','boglarka','greta'];
  s.stages={
   gathering:{label:storedMessage('scene.missing.stage.gathering'),location:'department',background:'department',participants:group,proximity:'apart'},
   private:{label:storedMessage('scene.missing.stage.private'),location:'department',background:'department',participants:[...group,'denes'],proximity:'apart'},
   reply:{label:storedMessage('scene.missing.stage.reply'),location:'department',background:'department',participants:['marton'],proximity:'apart'}
  };
  for(const line of s.lines)line.stage=line.id==='line_6'?'reply':line.id==='line_0'||line.id.startsWith('missing_inventory_')?'gathering':'private';
 }
 if(s.id==='shared_3'){
  after(s,'line_1','interview_seating',[
   ['greta',message('scene.interview.window')],
   ['lilla',message('scene.interview.door')],
   ['narrator',message('scene.interview.chair')],
   ['boglarka',message('scene.interview.keywords')],
   ['lilla',message('scene.interview.poster')],
   ['rebeka',message('scene.interview.labels')]
  ]);
  branch(s,'line_2','listen','interview_listen',[
   ['lilla',message('scene.interview.returnBook')],
   ['marton',message('scene.interview.clearMemory')],
   ['lilla',message('scene.interview.scanner')],
   ['boglarka',message('scene.interview.detail')],
   ['lilla',message('scene.interview.stairs')]
  ]);
  branch(s,'line_2','timeline','interview_timeline',[
   ['greta',message('scene.interview.checkTimes')],
   ['lilla',message('scene.interview.wednesday')],
   ['greta',message('scene.interview.correctDate')],
   ['rebeka',message('scene.interview.scripture')],
   ['greta',message('scene.interview.recognise')],
   ['lilla',message('scene.interview.familiarVoice')]
  ]);
  after(s,'line_6','interview_finish',[
   ['greta',message('scene.interview.tenMinutes')],
   ['lilla',message('scene.interview.waitDenes')],
   ['rebeka',message('scene.interview.noPublication')],
   ['lilla',message('scene.interview.decideLater')],
   ['narrator',message('scene.interview.crossedWords')]
  ]);
 }
 if(s.id==='shared_3'){
  const group:ActorId[]=['marton','lilla','rebeka','boglarka','greta'];
  s.stages={conversation:{label:storedMessage('scene.interview.stage.conversation'),location:'library',background:'library',participants:group,proximity:'apart'},
   waiting:{label:storedMessage('scene.interview.stage.waiting'),location:'library',background:'library',participants:group.filter(id=>id!=='rebeka'),proximity:'apart'}};
  for(const line of s.lines)line.stage=line.id==='line_7'?'waiting':'conversation';
 }
 if(s.id==='rebeka_1'){
  s.lines[1].text='A Holdkör szerint arc nélkül nincs történet. Szerintem csak könnyebb ráfogni valakire egyet. Na, melyiket mentenéd meg a háromból? A „mind érdekes” nem válasz.';
  s.lines[4].text='A műhelyben én adom a feladatot. Itt te mondod meg, mit kezdesz a véleményemmel.';
  after(s,'line_1','rebeka_scrutiny',[
   ['marton','Azért kell választanom, mert neked is nehéz, vagy mert tudni akarod, mellébeszélek-e?'],
   ['rebeka','Miért ne lehetne mindkettő?','amused'],
   ['narrator','Rebeka a hátlapjára fordítja az egyik fotót. Alul zsűrimegjegyzés látszik: technikailag bizonytalan. A hüvelykujja eltakarja a szerző nevét.'],
   ['marton','Ezt valaki már elbírálta.'],
   ['rebeka','Az ember attól még nézhet rá újra. Vagy a tanszéken csak egyszer lehet véleménye?']
  ]);
  branch(s,'line_2','interest','rebeka_motion',[
   ['rebeka','Az egész körben ez az egy kép nem éles. Természetesen erre sikerült ráírniuk, hogy bizonytalan.'],
   ['marton','A kéz gazdája akart rajta maradni?'],
   ['rebeka','Nem. Megmutattam neki. Azt mondta, így igen.'],
   ['marton','Akkor ez nem csak technikai döntés volt.'],
   ['rebeka','Vigyázz, még a végén érted, miért nem élesítem ki. Utána már nehezebb lesz okos tanácsot adni.','amused'],
   ['narrator','Közelebb tolja a kontaktmásolatot. A vállatok még nem ér össze; nem is húzódik arrébb, amikor fölé hajolsz.']
  ]);
  branch(s,'line_2','ask','rebeka_window',[
   ['rebeka','Mert a harmadik gyakorlatnál mindenki arrafelé nézett. A képen mégsem tudod, mi volt odakint.'],
   ['marton','Volt valami?'],
   ['rebeka','Egy levél. Vagy egy varjú. Én is néztem, úgyhogy a döntő pillanatról természetesen lemaradtam.'],
   ['marton','Ezért lett az ablak a kép közepe?'],
   ['rebeka','Ezért nem teszek úgy, mintha mindent elkaptam volna. Elég sokan csinálják már.'],
   ['narrator','Az ablakos képet külön teszi. Egy pillanatig azt hiszed, neked adja, aztán a saját mappájába csúsztatja.']
  ]);
  branch(s,'line_2','leave','rebeka_leave',[
   ['rebeka','Legalább nem tettél úgy, mintha ráérnél. A képek nem szaladnak el. Én néha igen.'],
   ['marton','Köszönöm, hogy megmutattad őket.'],
   ['narrator','Rebeka összeszedi a lapokat. Nem kér új időpontot, és Márton sem csinál ígéretet egy udvarias búcsúból.']
  ],true);
 }
 if(s.id==='boglarka_1'){
  after(s,'line_1','boglarka_margins',[
   ['marton','Megmutatod, hol változott meg a szöveg?'],
   ['boglarka','Itt. Az eredeti adatközlő azt mondta, talán. Az átiratban ebből bizonyosan lett. Nagyon sikeres szó: egy tollvonással megszűnt tőle minden kétség.','amused'],
   ['marton','És a neved?'],
   ['boglarka','A köszönetnyilvánításban elfért. A munkám kevésbé.'],
   ['narrator','Nem emeli fel a hangját. A lapot viszont most úgy fordítja feléd, hogy az ujját a saját neve mellett tartja.'],
   ['boglarka','Nem kell helyettem felhívnod senkit. Előbb szeretném rendesen megírni, miért kérek javítást.']
  ]);
  branch(s,'line_4','interest','boglarka_versions',[
   ['boglarka','Az első változatban háromszor is azt írom, hogy elnézést. A másodikban már csak egyszer. Ez jelentős stilisztikai fejlődés.','amused'],
   ['marton','Mi maradna, ha azt is kivennéd?'],
   ['boglarka','A mondat, amit közölni szeretnék. Kínos, milyen kevés munkám lenne utána.'],
   ['narrator','Kihúzza a szót, aztán egy percig nem ír semmit. Márton kivárja.'],
   ['boglarka','A gyűjtés az enyém. A helyneveket is én ellenőriztem. Ezt nem kérdezni akarom tőlük.'],
   ['marton','Ez már levélkezdésnek is jó.'],
   ['boglarka','Igen. Azt hiszem, most először én is elolvasnám.']
  ]);
  branch(s,'line_4','ask','boglarka_word',[
   ['boglarka','A „talán”-hoz. Nem túl hősies válasz.'],
   ['marton','Miért épp ahhoz?'],
   ['boglarka','Mert aki mondta, nem volt biztos benne. Hetven év után én sem leszek biztosabb helyette attól, hogy nyomtatott betűvel írom.'],
   ['marton','A nevedet mégis biztosan szeretnéd ráírni.'],
   ['boglarka','A kételyeimre legalább hadd legyen szerzői jogom.','amused'],
   ['narrator','A csészéje már üres. Nem áll fel; elővesz egy negyedik lapot is, amelyet eddig a táskában tartott.'],
   ['boglarka','Ezt még senkinek sem mutattam. Az első bekezdés valószínűleg túl hosszú. A harmadiknál viszont ne bólogass csak azért, hogy kedves legyél.']
  ]);
  branch(s,'line_4','leave','boglarka_leave',[
   ['boglarka','Akkor azt adom. A többit nem kell az ajtóban elintéznünk.'],
   ['narrator','Kiveszi a kért könyvet a saját lapjai alól. Nem mentegetőzik azért, hogy a beszélgetés végére most ő tesz pontot.']
  ],true);
 }
 if(s.id==='greta_1'){
  after(s,'line_1','greta_calendar',[
   ['greta','Pénteken elindultam volna, aztán valaki rossz kulcsot vett fel. Mire megtaláltam a pótot, már sötétedett.'],
   ['marton','Egyedül csak te tudsz pótkulcsot keresni?'],
   ['greta','Nem. Csak nálam biztosan meglesz. Ez a mondat szokott minden pénteket megenni.'],
   ['narrator','A térképen határozott vonal vezet a tóhoz. Gréta a körmét a kanyarhoz teszi, mintha az útvonalnak is bizonyítania kellene, hogy belefér a napba.'],
   ['greta','Ne ajánld fel, hogy megtanítasz nemet mondani. A szót ismerem. Azt kéne kibírnom, ami utána történik.']
  ]);
  branch(s,'line_4','interest','greta_map',[
   ['greta','Az iratokat ne rakd a felső fiókba, az a hétfői... Jó. Bocsánat. Már megint én csinálom.'],
   ['marton','Megkérdezem, ha elakadok. Most mutasd a kerülőt.'],
   ['greta','Itt megy mindenki a rövid úton. Itt meg van egy elhajlott fűz, alatta le lehet ülni. Onnan nem látszik az épület.'],
   ['marton','Ezért szereted?'],
   ['greta','Részben. Másrészt a kacsák nem mondják, hogy csak egy percre zavarnak.','amused'],
   ['narrator','Márton elveszi az iratokat. Gréta egyszer még utánuk nyúl, aztán inkább a térképet hajtja félbe.'],
   ['greta','Ha mész egyszer, a második hídon fordulj. Az elsőnél az ember még meggondolja magát és visszasiet dolgozni.']
  ]);
  branch(s,'line_4','ask','greta_lakeside',[
   ['greta','A fűznél. Vagy feljebb, ahol köves a part. Attól függ, mennyire elegem van az emberekből.'],
   ['marton','Ma melyiket választanád?'],
   ['greta','A fűzet. Ez most nem személyes sértés, mielőtt megsértődsz.','amused'],
   ['marton','Ott elfér két ember is?'],
   ['greta','Elfér. De aki stopperrel jön, az állva marad.'],
   ['narrator','Elhúzza a térképet a teremfoglalás alól. Most először van az asztalon úgy, hogy semmi nem takarja.'],
   ['greta','Jövő péntekre nem írok be helyette semmit. Ezt most hallottad. Ha én felejtem el, emlékeztethetsz.']
  ]);
  branch(s,'line_4','leave','greta_leave',[
   ['greta','Rendben. Itt a kulcs. A térképet akkor elteszem, mielőtt azt is valami feladatnak nézem.'],
   ['narrator','A kulcsot átadja, a félbehagyott túrát nem kell megmagyaráznia. Márton becsukja maga mögött az irodaajtót.']
  ],true);
 }
 return s;
}

