import {calendarFor} from './calendar.ts';
import {presentText,sceneTitle} from './scene-localization.ts';
import {formatFt} from './format.ts';
import {DEFAULT_LOCALE,translator,type Locale} from './localization.ts';
/** Player-visible observation. Never serialize the private game state here. */
import {MOMENT_CLIPS} from './animations.ts';
import {viragEpilogue} from './virag.ts';
import {SCENES,EVIDENCE} from './catalog.ts';
import * as R from './runtime.ts';
import {ACTOR_NAME,backgroundFor,portraitFor,type ArtAsset} from './assets.ts';
import {describeAsset} from './asset-descriptions.ts';
import {GIFTS,GIFT_NOTES} from './gifting.ts';
import {MOVE_LIMIT,puzzleDone,puzzleReward} from './puzzles.ts';
import {institutions,relationships,threatText} from './epilogues.ts';
import type {GameState} from './types.ts';
import type {GameAction} from './actions.ts';
export interface VisibleAsset {role:'background'|'portrait'|'moment';file:string|null;description:string;requestedExpression?:string;fallback?:boolean;lighting?:string;missingVariant?:string}
function asset(role:VisibleAsset['role'],a:ArtAsset):VisibleAsset{return {role,file:a.file,description:describeAsset(a),...(a.missingVariant?{missingVariant:a.missingVariant}:{})};}
export function gameView(s:GameState,locale:Locale=DEFAULT_LOCALE){
 const t=translator(locale);
 const actions:{label:string;action:GameAction}[]=[],assets:VisibleAsset[]=[];
 const line=R.currentLine(s,SCENES,locale),scene=s.scene?SCENES[s.scene.id]:null;
 if(scene&&line){
  const staging=R.sceneStage(s,scene,locale),lighting=R.sceneLighting(s,scene);assets.push({...asset('background',backgroundFor(staging.background,lighting,s.week)),lighting});
  const clip=line.moment?MOMENT_CLIPS[line.moment]:undefined;
  if(clip?.status==='reviewed')assets.push({role:'moment',file:clip.file,description:clip.description});
  else if(!['marton','narrator'].includes(line.speaker)){
   const p=portraitFor(line.speaker,line.expression,s.week,scene.outfits?.[line.speaker]);
   assets.push({...asset('portrait',p),requestedExpression:line.expression,fallback:!!p.file&&line.expression!=='neutral'&&!p.file.includes('/'+line.expression+'-')});
  }
  for(const c of line.choices??[])actions.push({label:c.text,action:{type:'choice',id:c.id}});
  if(!line.choices?.length)actions.push({label:line.next?t('ui.continue'):t('ui.scene.finish'),action:{type:'choice',id:'continue'}});
 }
 if(s.phase==='planner'){
  const night=R.currentPeriod(s)==='night';assets.push({...asset('background',backgroundFor(night?'apartment':'department',night?'night':'day',s.week)),lighting:night?'night':'day'});
  for(const x of R.availableScenes(s,SCENES))actions.push({label:sceneTitle(x,locale)+(x.cost?t('hub.scene.price',{money:formatFt(x.cost.money,locale),points:x.cost.points}):''),action:{type:'scene',id:x.id}});
  for(const kind of ['rest','recycling','archive'] as const)if(R.activityAvailable(s,kind))actions.push({label:{rest:t('ui.activity.rest'),recycling:t('cli.recycling'),archive:t('cli.archive')}[kind],action:{type:'activity',kind}});
  if(R.canChooseDirection(s)&&!R.isCommitted(s))for(const id of Object.keys(R.ROUTES) as (keyof typeof R.ROUTES)[])if(id!==s.direction)actions.push({label:t(`route.${id}`),action:{type:'direction',id}});
 }
 if(s.phase==='summary')actions.push({label:s.week===16?t('cli.end'):t('cli.nextWeek'),action:{type:'advance'}});
 const p=s.puzzle;
 if(s.phase==='minigame'&&p){
  if(puzzleDone(p))actions.push({label:t('cli.claim'),action:{type:'claim'}});
  else if(p.kind==='archive'&&p.selected.length===2)actions.push({label:t('puzzle.next'),action:{type:'next-pair'}});
  else for(let i=0;i<p.board.length;i++)if(p.kind==='recycling'||!p.matched.includes(i)&&!p.selected.includes(i))actions.push({label:t('cli.tile',{index:i}),action:{type:'tile',index:i}});
  if(p.moves===0&&!p.selected.length)actions.push({label:t('cli.cancelJob'),action:{type:'cancel-job'}});
 }
 const ending=s.phase==='ending'?R.evaluateEnding(s):null;
 return {
  calendar:calendarFor(s.week),phase:s.phase,week:s.week,slot:s.slot,period:R.currentPeriod(s),money:s.money,activityPoints:s.activityPoints,energy:s.energy,direction:s.direction,lastNote:presentText(s.lastNote,s.name,locale),
  scene:scene&&line?{id:scene.id,title:sceneTitle(scene,locale),location:t(`location.${R.sceneStage(s,scene,locale).location}`),staging:R.sceneStage(s,scene,locale),lineId:line.id,speakerId:line.speaker,speaker:line.speaker==='marton'?s.name:line.speaker==='narrator'?t('actor.narrator'):ACTOR_NAME[line.speaker],expression:line.expression,text:line.text,moment:line.moment?{id:line.moment,...MOMENT_CLIPS[line.moment],rendered:MOMENT_CLIPS[line.moment].status==='reviewed'}:null}:null,
  assets,actions,
  puzzle:p?{kind:p.kind,instructions:p.kind==='archive'?t('cli.memory.instructions'):t('cli.recycling.instructions'),width:p.kind==='archive'?4:5,movesLeft:MOVE_LIMIT[p.kind]-p.moves,score:p.score,reward:puzzleReward(p),done:puzzleDone(p),selected:p.selected,matched:p.matched,tiles:p.board.map((v,i)=>p.kind==='archive'&&!p.selected.includes(i)&&!p.matched.includes(i)?null:v),legend:p.kind==='archive'?[t('puzzle.card.key'),t('puzzle.card.letter'),t('puzzle.card.moon'),t('puzzle.card.tower'),t('puzzle.card.book'),t('puzzle.card.map'),t('puzzle.card.seal'),t('puzzle.card.pen')]:[t('cli.object.green'),t('cli.object.blue'),t('cli.object.copper'),t('cli.object.purple')]}:null,
  journal:s.journal.map(j=>({...j,text:presentText(j.text,s.name,locale)})),evidence:Object.entries(s.evidence).map(([id,witness])=>({id,text:presentText(EVIDENCE[id].text,s.name,locale),...witness})),bonds:s.bonds,exposure:s.exposure,
  gifts:{inventory:s.inventory,shop:Object.entries(GIFTS).map(([id,g])=>({id,name:g.name,price:g.price,description:g.description,canBuy:s.phase==='planner'&&s.slot>0&&s.slot<3&&s.money>=g.price})),notes:GIFT_NOTES,deliveries:['remote','inPerson'],alreadyGifted:s.giftsWeek,replies:s.giftHistory.map(h=>({...h,item:GIFTS[h.gift].name,noteText:GIFT_NOTES[h.note],portrait:asset('portrait',portraitFor(h.girl,h.expression,h.week))}))},
  recap:s.phase==='summary'?s.journal.filter(j=>j.week===s.week).map(j=>({...j,text:presentText(j.text,s.name,locale)})):null,
  ending:ending?{...ending,viragText:viragEpilogue(s),institutionText:ending.institution?institutions[ending.institution]:'',relationshipText:relationships[ending.relationship??'unresolved'],threatText:threatText(ending.cost)}:null,
 };
}
export type GameView=ReturnType<typeof gameView>;

