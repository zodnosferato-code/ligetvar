import type { Effect, Ending, GameState, GirlId, Registry, Requirements, RouteId, Scene } from './types.ts';
export function clamp(n:number,min:number,max:number){return Math.max(min,Math.min(max,n));}
export function formatFt(n:number){return n.toLocaleString('hu-HU')+' Ft';}
export function createInitial(name:string):GameState{return {
 version:2,name:name.trim().slice(0,32)||'Márton Kelényi',week:1,slot:0,phase:'planner',scene:null,minigame:null,money:105000,energy:78,exposure:0,
 bonds:{marton_rebeka:0,marton_boglarka:0,marton_greta:0,rebeka_boglarka:0},direction:'friendship',decisions:{},evidence:{},completed:{},preparation:[],
 disclosure:'limited',inventory:{},giftsWeek:[],jobsWeek:{mohu:0,brick:0},journal:[],confrontation:null,institution:null,lastNote:'Minden héten egy közös alkalom és két szabad sáv.'
};}
export function meets(s:GameState,r:Requirements):boolean{return (!r.anyOf||r.anyOf.some(x=>meets(s,x)))&&(r.scenes??[]).every(x=>x in s.completed)&&(r.evidence??[]).every(x=>x in s.evidence)&&(r.decisions??[]).every(x=>x in s.decisions)&&(r.notDecisions??[]).every(x=>!(x in s.decisions))&&(!r.directions||r.directions.includes(s.direction));}
export function sharedFor(r:Registry,w:number){return Object.values(r).find(x=>x.kind==='shared'&&x.week===w);}
export function sceneAvailable(s:GameState,x:Scene){return s.phase==='planner'&&!(x.id in s.completed)&&s.week>=x.week&&s.week<=x.deadline&&(s.slot===0?x.kind==='shared'&&x.week===s.week:s.slot<3&&x.kind!=='shared')&&meets(s,x.requires);}
export function availableScenes(s:GameState,r:Registry){return Object.values(r).filter(x=>sceneAvailable(s,x)).sort((a,b)=>a.deadline-b.deadline||a.week-b.week||a.id.localeCompare(b.id));}
export function openScene(s:GameState,id:string,r:Registry):GameState{const x=r[id];return x&&sceneAvailable(s,x)?{...s,phase:'scene',scene:{id,line:x.entry,pending:[]},lastNote:''}:s;}
export function currentLine(s:GameState,r:Registry){return s.scene?r[s.scene.id]?.lines.find(l=>l.id===s.scene!.line):undefined;}
export function applyEffect(s:GameState,e:Effect,scene:string){
 for(const [k,v] of Object.entries(e.bonds??{})){const key=k as keyof typeof s.bonds;s.bonds[key]=clamp(s.bonds[key]+v!,0,100);}
 for(const id of e.decisions??[])s.decisions[id]={scene,week:s.week};
 for(const id of e.preparation??[])if(!s.preparation.includes(id))s.preparation.push(id);
 s.exposure=clamp(s.exposure+(e.exposure??0),0,100);
 if(e.direction)s.direction=e.direction;if(e.disclosure)s.disclosure=e.disclosure;
}
function spendSlot(s:GameState){s.slot=(s.slot+1) as GameState['slot'];s.phase=s.slot===3?'summary':'planner';}
export function applyChoice(s:GameState,id:string,r:Registry):GameState{
 if(s.phase!=='scene'||!s.scene)return s;const x=r[s.scene.id],l=currentLine(s,r);if(!x||!l)return s;
 const c=l.choices?.find(c=>c.id===id);if(l.choices?.length?!c:id!=='continue')return s;
 const n=structuredClone(s);if(c?.effect)n.scene!.pending.push(c.effect);n.lastNote=c?.reaction??'';
 const target=c?.next??l.next;if(target){n.scene!.line=target;return n;}
 for(const e of n.scene!.pending)applyEffect(n,e,x.id);if(x.onComplete)applyEffect(n,x.onComplete,x.id);
 n.completed[x.id]=n.week;for(const key of x.evidence)n.evidence[key]={scene:x.id,week:n.week};
 n.journal.push({scene:x.id,week:n.week,text:x.journal});n.energy=clamp(n.energy+(x.kind==='shared'?4:-8),0,100);
 if(x.resolution==='confrontation'){
  n.confrontation=n.preparation.includes('backup')&&n.preparation.includes('signals')?'supported':'exhausting';
  n.energy=clamp(n.energy-(n.confrontation==='supported'?8:28),0,100);
  n.lastNote=n.confrontation==='supported'?'A vámpír meghalt. A gyakorlás és a segítők megóvták a csoportot, a bizonyítékok megmaradtak.':'A vámpír meghalt. A segítők közbeléptek, de többen kimerültek, és a feljegyzések egy része megsérült.';
 }
 if(x.resolution==='institution')n.institution=n.disclosure==='private'?'suppressed':n.disclosure==='public'&&n.confrontation==='supported'?'acknowledged':'incomplete';
 n.scene=null;spendSlot(n);return n;
}
export function nextWeek(s:GameState,r:Registry):GameState{
 const required=sharedFor(r,s.week);if(s.phase!=='summary'||s.slot!==3||!required||!(required.id in s.completed))return s;
 if(s.week===16)return s.confrontation&&s.institution?{...s,phase:'ending'}:s;
 if(!sharedFor(r,s.week+1))return s;
 return {...s,week:s.week+1,slot:0,phase:'planner',energy:clamp(s.energy+24,0,100),money:s.money+60000,giftsWeek:[],jobsWeek:{mohu:0,brick:0},lastNote:'Új hét. A még határidőn belüli alkalmak pótolhatók.'};
}
export function setDirection(s:GameState,direction:RouteId):GameState{
 if(s.week<8||s.phase!=='planner'||!('shared_8' in s.completed))return s;
 if(['rebeka_commit','boglarka_commit','greta_commit'].some(id=>id in s.decisions))return {...s,lastNote:'A vállalt kapcsolati irányt a tervező nem írhatja át újabb személyes beszélgetés nélkül.'};
 return {...s,direction,lastNote:'Szándékot jelöltél, nem döntöttél más helyett. A vállalás külön beszélgetést igényel.'};
}
export function activity(s:GameState,kind:'rest'|'talk'|'mohu'|'brick'):GameState{
 if(s.phase!=='planner'||s.slot<1||s.slot>2)return s;
 if(kind==='mohu'||kind==='brick')return {...s,phase:'minigame',minigame:kind};
 const n=structuredClone(s);n.energy=clamp(n.energy+(kind==='rest'?32:-4),0,100);
 n.lastNote=kind==='rest'?'Nyugodt délután. A pihenő nem helyettesít személyes döntést.':'Kávé a műhely után. Az ismételt beszélgetés nem ad elköteleződési mérföldkövet.';
 spendSlot(n);return n;
}
export function resolveJob(s:GameState,kind:'mohu'|'brick',rawPay:number):GameState{
 if(s.phase!=='minigame'||s.minigame!==kind||!Number.isFinite(rawPay))return s;
 const n=structuredClone(s),count=++n.jobsWeek[kind],rate=kind==='mohu'?(count===1?1:count===2?.6:.35):count===1?1:.7,pay=Math.round(clamp(rawPay,0,20000)*rate);
 n.money+=pay;n.energy=clamp(n.energy-(kind==='mohu'?18:22),0,100);n.minigame=null;n.lastNote='Opcionális munka: '+formatFt(pay)+'. Sem találkozó, sem vásárlás nem függ műszaktól.';spendSlot(n);return n;
}
export const GIFTS={photo:{name:'Fotófüzet',price:2500,girl:'rebeka'},tea:{name:'Tea',price:1200,girl:'boglarka'},notes:{name:'Jegyzetfüzet',price:1800,girl:'greta'}} as const;
export function buyGift(s:GameState,id:string):GameState{const g=GIFTS[id as keyof typeof GIFTS];return !g||s.phase!=='planner'||s.money<g.price?s:{...s,money:s.money-g.price,inventory:{...s.inventory,[id]:(s.inventory[id]??0)+1},lastNote:'A tárgy nem helyettesít személyes döntést.'};}
export function giveGift(s:GameState,girl:GirlId,id:string):GameState{
 if(s.phase!=='planner'||!GIFTS[id as keyof typeof GIFTS]||!(s.inventory[id]>0)||s.giftsWeek.includes(girl))return s;
 const n=structuredClone(s);n.inventory[id]--;n.giftsWeek.push(girl);const key=('marton_'+girl) as keyof typeof n.bonds;
 n.bonds[key]=clamp(n.bonds[key]+(GIFTS[id as keyof typeof GIFTS].girl===girl?2:0),0,100);n.lastNote='Átadva. Egy ajándék hetente; vállalást és jóvátételt csak a megfelelő beszélgetés hoz.';return n;
}
export function evaluateEnding(s:GameState):Ending{
 if(!s.confrontation||!s.institution||s.week!==16||s.slot!==3||s.phase!=='ending')return {threat:s.confrontation?'resolved':'pending',cost:s.confrontation,institution:s.institution,relationship:null};
 const yes=(id:string)=>id in s.decisions;let relationship:Ending['relationship']='friendship';
 if(s.direction==='triad')relationship=['triad_marton_yes','triad_rebeka_yes','triad_boglarka_yes','rb_rebeka_yes','rb_boglarka_yes','triad_evening','triad_aftermath'].every(yes)&&['rebeka','boglarka'].every(g=>[g+'_commit',g+'_yes','marton_'+g+'_yes',g+'_repair'].every(yes))?'triad':'unresolved';
 else if(s.direction!=='friendship'){const g=s.direction;relationship=yes(g+'_withdraw')?'estranged':[g+'_commit',g+'_yes','marton_'+g+'_yes',g+'_repair',g+'_aftermath'].every(yes)?g:'unresolved';}
 return {threat:'resolved',cost:s.confrontation,institution:s.institution,relationship};
}
