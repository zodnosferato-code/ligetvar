import {CALENDAR,calendarFor} from './calendar.ts';
import {validStoredText} from './scene-localization.ts';
/** Ligetvár's campaign rules. The engine never imports this module. */
import {RELEASE} from '../release.ts';
import type {RuntimeRules} from '../engine/types.ts';
import {clamp} from '../engine/logic.ts';
import {formatFt} from './format.ts';
import {GIRLS,SAVE_KEY,type Effect,type Ending,type GameState,type GirlId,type RouteId} from './types.ts';
export const ROUTES:Record<RouteId,string>={friendship:'Barátság',rebeka:'Rebeka',boglarka:'Boglárka',greta:'Gréta',triad:'Rebeka, Boglárka és Márton'};
export {GIFTS} from './gifting.ts';
import {GIFTS,validGiftHistory} from './gifting.ts';
import {validPuzzle} from './puzzles.ts';
export function isCommitted(s:GameState){return GIRLS.some(g=>g+'_commit' in s.decisions);}
export function canChooseDirection(s:GameState){return s.week>=CALENDAR.direction&&s.phase==='planner'&&'shared_8' in s.completed;}
export function evaluateEnding(s:GameState):Ending{
 if(!s.confrontation||!s.institution||s.week!==CALENDAR.aftermath||s.slot!==3||s.phase!=='ending')return {threat:s.confrontation?'resolved':'pending',cost:s.confrontation,institution:s.institution,relationship:null};
 const yes=(id:string)=>id in s.decisions;let relationship:Ending['relationship']='friendship';
 if(s.direction==='triad')relationship=['triad_marton_yes','triad_rebeka_yes','triad_boglarka_yes','rb_rebeka_yes','rb_boglarka_yes','triad_evening','triad_aftermath'].every(yes)&&['rebeka','boglarka'].every(g=>[g+'_commit',g+'_yes','marton_'+g+'_yes',g+'_repair'].every(yes))?'triad':'unresolved';
 else if(s.direction!=='friendship'){const g=s.direction;relationship=yes(g+'_withdraw')?'estranged':[g+'_commit',g+'_yes','marton_'+g+'_yes',g+'_repair',g+'_aftermath'].every(yes)?g:'unresolved';}
 return {threat:'resolved',cost:s.confrontation,institution:s.institution,relationship};
}
export const RULES:RuntimeRules<GameState>={
 schedule:{calendar:calendarFor,storyWeeks:CALENDAR.storyWeeks,slots:{1:'day',2:'night'},activities:{rest:['day','night'],recycling:['day'],archive:['day']}},
 weeks:CALENDAR.weeks,saveKey:SAVE_KEY,saveVersions:RELEASE,
 initial:name=>({name:name.trim().slice(0,32)||'Márton Kelényi',week:1,slot:0,phase:'planner',scene:null,minigame:null,money:12000,activityPoints:0,puzzle:null,giftHistory:[],energy:78,exposure:0,
  bonds:{marton_rebeka:0,marton_boglarka:0,marton_greta:0,rebeka_boglarka:0},direction:'friendship',decisions:{},evidence:{},completed:{},preparation:[],disclosure:'limited',inventory:{},giftsWeek:[],journal:[],confrontation:null,institution:null,lastNote:'Egy év Ligetváron: heti egy nappali és egy éjszakai tevékenység, a kijelölt heteken közös történeti alkalommal.'}),
 economy:{sharedEnergy:4,sceneEnergy:-8,weeklyEnergy:24,weeklyMoney:3000,restEnergy:32,gifts:GIFTS,jobs:{recycling:{energy:12,maxPay:20000},archive:{energy:12,maxPay:20000}}},
 notes:{initial:'Egy év Ligetváron: heti egy nappali és egy éjszakai tevékenység, a kijelölt heteken közös történeti alkalommal.',newWeek:'Új hét. A még határidőn belüli alkalmak pótolhatók.',rest:'Nyugodt pihenés. A pihenő nem helyettesít személyes döntést.',purchase:'A tárgy nem helyettesít személyes döntést.',job:pay=>'Opcionális munka: '+formatFt(pay)+'. Sem találkozó, sem vásárlás nem függ műszaktól.'},
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
  if(!validStoredText(s.lastNote)||s.journal.some(j=>!validStoredText(j.text)))return false;
  if(s.phase==='minigame'?s.slot!==1||!validPuzzle(s.puzzle)||s.puzzle.kind!==s.minigame:s.puzzle!==null)return false;
  if(!validGiftHistory(s.giftHistory,s.week))return false;
  if(!Object.hasOwn(ROUTES,s.direction)||!['public','limited','private'].includes(s.disclosure)||!['supported','exhausting',null].includes(s.confrontation)||!['acknowledged','incomplete','suppressed',null].includes(s.institution)||!s.giftsWeek.every(g=>GIRLS.includes(g as GirlId)))return false;
  const confrontation=Object.values(r).find(x=>x.resolution==='confrontation'),institution=Object.values(r).find(x=>x.resolution==='institution');
  return !!s.confrontation===!!(confrontation&&confrontation.id in s.completed)&&!!s.institution===!!(institution&&institution.id in s.completed);
 }
};
