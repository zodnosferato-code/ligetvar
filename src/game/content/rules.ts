/** Ligetvár's campaign rules. The engine never imports this module. */
import type {RuntimeRules} from '../engine/types.ts';
import {clamp} from '../engine/logic.ts';
import {formatFt} from './format.ts';
import {GIRLS,LEGACY_SAVE_KEY,SAVE_KEY,type Effect,type Ending,type GameState,type GirlId,type RouteId} from './types.ts';
export const ROUTES:Record<RouteId,string>={friendship:'Barátság',rebeka:'Rebeka',boglarka:'Boglárka',greta:'Gréta',triad:'Rebeka, Boglárka és Márton'};
export const GIFTS={photo:{name:'Fotófüzet',price:2500,girl:'rebeka',person:'rebeka',bonus:2},tea:{name:'Tea',price:1200,girl:'boglarka',person:'boglarka',bonus:2},notes:{name:'Jegyzetfüzet',price:1800,girl:'greta',person:'greta',bonus:2}} as const;
export function isCommitted(s:GameState){return GIRLS.some(g=>g+'_commit' in s.decisions);}
export function canChooseDirection(s:GameState){return s.week>=8&&s.phase==='planner'&&'shared_8' in s.completed;}
export function evaluateEnding(s:GameState):Ending{
 if(!s.confrontation||!s.institution||s.week!==16||s.slot!==3||s.phase!=='ending')return {threat:s.confrontation?'resolved':'pending',cost:s.confrontation,institution:s.institution,relationship:null};
 const yes=(id:string)=>id in s.decisions;let relationship:Ending['relationship']='friendship';
 if(s.direction==='triad')relationship=['triad_marton_yes','triad_rebeka_yes','triad_boglarka_yes','rb_rebeka_yes','rb_boglarka_yes','triad_evening','triad_aftermath'].every(yes)&&['rebeka','boglarka'].every(g=>[g+'_commit',g+'_yes','marton_'+g+'_yes',g+'_repair'].every(yes))?'triad':'unresolved';
 else if(s.direction!=='friendship'){const g=s.direction;relationship=yes(g+'_withdraw')?'estranged':[g+'_commit',g+'_yes','marton_'+g+'_yes',g+'_repair',g+'_aftermath'].every(yes)?g:'unresolved';}
 return {threat:'resolved',cost:s.confrontation,institution:s.institution,relationship};
}
export const RULES:RuntimeRules<GameState>={
 schedule:{slots:{1:'day',2:'night'},activities:{rest:['day','night'],mohu:['day'],brick:['day']}},
 weeks:16,saveKey:SAVE_KEY,legacySaveKey:LEGACY_SAVE_KEY,
 initial:name=>({version:2,name:name.trim().slice(0,32)||'Márton Kelényi',week:1,slot:0,phase:'planner',scene:null,minigame:null,money:105000,energy:78,exposure:0,
  bonds:{marton_rebeka:0,marton_boglarka:0,marton_greta:0,rebeka_boglarka:0},direction:'friendship',decisions:{},evidence:{},completed:{},preparation:[],disclosure:'limited',inventory:{},giftsWeek:[],jobsWeek:{mohu:0,brick:0},journal:[],confrontation:null,institution:null,lastNote:'Minden héten egy közös alkalom, egy nappali és egy éjszakai tevékenység.'}),
 economy:{sharedEnergy:4,sceneEnergy:-8,weeklyEnergy:24,weeklyMoney:60000,restEnergy:32,gifts:GIFTS,jobs:{mohu:{energy:18,maxPay:20000,rates:[1,.6,.35]},brick:{energy:22,maxPay:20000,rates:[1,.7]}}},
 notes:{initial:'Minden héten egy közös alkalom, egy nappali és egy éjszakai tevékenység.',newWeek:'Új hét. A még határidőn belüli alkalmak pótolhatók.',rest:'Nyugodt pihenés. A pihenő nem helyettesít személyes döntést.',purchase:'A tárgy nem helyettesít személyes döntést.',gift:'Átadva. Egy ajándék hetente; vállalást és jóvátételt csak a megfelelő beszélgetés hoz.',job:pay=>'Opcionális munka: '+formatFt(pay)+'. Sem találkozó, sem vásárlás nem függ műszaktól.'},
 applyEffect:(s,e)=>{const effect=e as Effect;if(effect.disclosure)s.disclosure=effect.disclosure;},
 completeScene:(s,x)=>{
  if(x.resolution==='confrontation'){
   s.confrontation=s.preparation.includes('backup')&&s.preparation.includes('signals')?'supported':'exhausting';
   s.energy=clamp(s.energy-(s.confrontation==='supported'?8:28),0,100);
   s.lastNote=s.confrontation==='supported'?'A vámpír meghalt. A gyakorlás és a segítők megóvták a csoportot, a bizonyítékok megmaradtak.':'A vámpír meghalt. A segítők közbeléptek, de többen kimerültek, és a feljegyzések egy része megsérült.';
  }
  if(x.resolution==='institution')s.institution=s.disclosure==='private'?'suppressed':s.disclosure==='public'&&s.confrontation==='supported'?'acknowledged':'incomplete';
 },
 canFinish:s=>!!s.confrontation&&!!s.institution,
 directionChange:(s,direction)=>!Object.hasOwn(ROUTES,direction)||!canChooseDirection(s)?{allowed:false}:isCommitted(s)?{allowed:false,note:'A vállalt kapcsolati irányt a tervező nem írhatja át újabb személyes beszélgetés nélkül.'}:{allowed:true,note:'Szándékot jelöltél, nem döntöttél más helyett. A vállalás külön beszélgetést igényel.'},
 validateState:(s,r)=>{
  if(!Object.hasOwn(ROUTES,s.direction)||!['public','limited','private'].includes(s.disclosure)||!['supported','exhausting',null].includes(s.confrontation)||!['acknowledged','incomplete','suppressed',null].includes(s.institution)||!s.giftsWeek.every(g=>GIRLS.includes(g as GirlId)))return false;
  const confrontation=Object.values(r).find(x=>x.resolution==='confrontation'),institution=Object.values(r).find(x=>x.resolution==='institution');
  return !!s.confrontation===!!(confrontation&&confrontation.id in s.completed)&&!!s.institution===!!(institution&&institution.id in s.completed);
 }
};
