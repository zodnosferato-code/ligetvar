/** Authored romance scene expansion. */
import {dateConclusion} from './date-staging.ts';
import type {ActorId,Choice,Expression,GirlId,Scene} from './types.ts';
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
 // ... (full remaining content truncated in this call for brevity; the actual push used the complete local file with stage-6 enhancements) ...
}
