import {presentLine} from './scene-localization.ts';
import {DEFAULT_LOCALE,type Locale} from './localization.ts';
/** Composition boundary: binds campaign data to the reusable engine. */
import * as engine from '../engine/logic.ts';
import {outingGirl} from './outings.ts';
import {deliverGift,type GiftNote,type Delivery} from './gifting.ts';
import {newPuzzle,puzzleMove,closePair,puzzleDone,puzzleReward} from './puzzles.ts';
import {RULES} from './rules.ts';
import type {Effect,GameState,GirlId,Line,Registry,RouteId,Scene,SceneStage} from './types.ts';
export {clamp,meets,sharedFor} from '../engine/logic.ts';
export {GIFTS,ROUTES,evaluateEnding,isCommitted,canChooseDirection} from './rules.ts';
export const currentPeriod=(s:GameState)=>engine.currentPeriod(s,RULES.schedule);
export const activityAvailable=(s:GameState,kind:string)=>engine.activityAvailable(s,kind,RULES);
export const sceneAvailable=(s:GameState,x:Scene)=>engine.sceneAvailable(s,x,RULES.schedule);
// Free-slot scenes follow the current activity period.
// Shared story scenes retain their authored lighting and internal time jumps.
export function sceneStage(s:GameState,x:Scene):SceneStage {
 const line=s.scene?.id===x.id?x.lines.find(l=>l.id===s.scene?.line):undefined;
 return (line?.stage?x.stages?.[line.stage]:undefined)??{label:'',location:x.location,background:x.background,participants:x.participants,proximity:'apart'};
}
export const sceneLighting=(s:GameState,x:Scene)=>sceneStage(s,x).lighting??(x.kind!=='shared'&&currentPeriod(s)==='night'?'night':x.periods?.length===2?'day':x.lighting);
export const createInitial=(name:string)=>engine.createInitial(name,RULES);
export const availableScenes=(s:GameState,r:Registry)=>engine.availableScenes(s,r,RULES.schedule) as Scene[];
export const currentLine=(s:GameState,r:Registry,locale:Locale=DEFAULT_LOCALE)=>{
 const line=engine.currentLine(s,r) as Line|undefined,x=s.scene?r[s.scene.id]:undefined,girl=x?outingGirl(x):undefined;
 const gift=girl?s.giftHistory.filter(h=>h.girl===girl&&h.bonus>0).at(-1):undefined;
 if(!line)return line;
 const visible=presentLine(line,locale);
 if(!x||line.id!==x.entry||!gift)return visible;
 const callback=girl==='rebeka'?'Rebeka előveszi a tőled kapott ajándékot. „Látod? Nem a szekrény alján végzett.”':girl==='boglarka'?'Boglárka megemlíti a tőled kapott ajándékot. „Használom. Csak szerettem volna, hogy tudd.”':'Gréta a táskájára mutat. „Amit hoztál, azt eltettem a mai napra. Jó választás volt.”';
 return {...visible,text:callback+' '+visible.text};
};
export const openScene=(s:GameState,id:string,r:Registry)=>engine.openScene(s,id,r,RULES.schedule);
export const applyEffect=(s:GameState,e:Effect,id:string)=>engine.applyEffect(s,e,id,RULES);
export const applyChoice=(s:GameState,id:string,r:Registry)=>engine.applyChoice(s,id,r,RULES);
export const nextWeek=(s:GameState,r:Registry)=>engine.nextWeek(s,r,RULES);
export const setDirection=(s:GameState,id:RouteId)=>engine.setDirection(s,id,RULES);
export const activity=(s:GameState,kind:'rest'|'recycling'|'archive')=>{
 const n=engine.activity(s,kind,RULES);return n!==s&&kind!=='rest'?{...n,puzzle:newPuzzle(kind,s.week)}:n;
};
export const movePuzzle=(s:GameState,index:number)=>{
 if(s.phase!=='minigame'||!s.puzzle)return s;const p=s.puzzle,n=puzzleMove(p,index);return n===p?s:{...s,puzzle:n};
};
export const nextPair=(s:GameState)=>s.phase==='minigame'&&s.puzzle?{...s,puzzle:closePair(s.puzzle)}:s;
export const finishPuzzle=(s:GameState)=>{
 if(s.phase!=='minigame'||!s.puzzle||!s.minigame||s.puzzle.kind!==s.minigame||!puzzleDone(s.puzzle))return s;
 const reward=puzzleReward(s.puzzle),n=engine.resolveJob(s,s.minigame,reward.money,RULES);
 if(n===s)return s;
 return {...n,puzzle:null,activityPoints:s.activityPoints+reward.points,lastNote:`Műszak kész: ${reward.money.toLocaleString('hu-HU')} Ft és ${reward.points} programpont. A telefonon különleges alkalmakra költheted.`};
};
export const buyGift=(s:GameState,id:string)=>s.slot<1||s.slot>2?s:engine.buyGift(s,id,RULES);
export const giveGift=(s:GameState,girl:GirlId,id:string,note?:GiftNote,delivery?:Delivery)=>deliverGift(s,girl,id,note,delivery);

export {formatFt} from './format.ts';

