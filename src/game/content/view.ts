/** Player-visible observation. Never serialize the private game state here. */
import {MOMENT_CLIPS} from './animations.ts';
import {viragEpilogue} from './virag.ts';
import {SCENES,EVIDENCE} from './catalog.ts';
import * as R from './runtime.ts';
import {ACTOR_NAME,LOCATIONS,backgroundFor,portraitFor,type ArtAsset} from './assets.ts';
import {describeAsset} from './asset-descriptions.ts';
import {GIFTS,GIFT_NOTES} from './gifting.ts';
import {MOVE_LIMIT,puzzleDone,puzzleReward} from './puzzles.ts';
import {institutions,relationships,threatText} from './epilogues.ts';
import type {GameState} from './types.ts';
import type {GameAction} from './actions.ts';
export interface VisibleAsset {role:'background'|'portrait'|'moment';file:string|null;description:string;requestedExpression?:string;fallback?:boolean;lighting?:string}
function asset(role:VisibleAsset['role'],a:ArtAsset):VisibleAsset{return {role,file:a.file,description:describeAsset(a)};}
export function gameView(s:GameState){
 const actions:{label:string;action:GameAction}[]=[],assets:VisibleAsset[]=[];
 const line=R.currentLine(s,SCENES),scene=s.scene?SCENES[s.scene.id]:null;
 if(scene&&line){
  const staging=R.sceneStage(s,scene),lighting=R.sceneLighting(s,scene);assets.push({...asset('background',backgroundFor(staging.background,lighting)),lighting});
  const clip=line.moment?MOMENT_CLIPS[line.moment]:undefined;
  if(clip?.status==='reviewed')assets.push({role:'moment',file:clip.file,description:clip.description});
  else if(!['marton','narrator'].includes(line.speaker)){
   const p=portraitFor(line.speaker,line.expression,scene.week);
   assets.push({...asset('portrait',p),requestedExpression:line.expression,fallback:!!p.file&&line.expression!=='neutral'&&!p.file.includes('/'+line.expression+'-')});
  }
  for(const c of line.choices??[])actions.push({label:c.text,action:{type:'choice',id:c.id}});
  if(!line.choices?.length)actions.push({label:line.next?'Tovább':'Alkalom befejezése',action:{type:'choice',id:'continue'}});
 }
 if(s.phase==='planner'){
  const night=R.currentPeriod(s)==='night';assets.push({...asset('background',backgroundFor(night?'apartment':'department',night?'night':'day')),lighting:night?'night':'day'});
  for(const x of R.availableScenes(s,SCENES))actions.push({label:x.title+(x.cost?` · ${x.cost.money} Ft + ${x.cost.points} programpont`:''),action:{type:'scene',id:x.id}});
  for(const kind of ['rest','recycling','archive'] as const)if(R.activityAvailable(s,kind))actions.push({label:{rest:'Pihenés',recycling:'Újrahasznosítás · 12 energia · nappali sáv',archive:'Archívumpárok · 12 energia · nappali sáv'}[kind],action:{type:'activity',kind}});
  if(R.canChooseDirection(s)&&!R.isCommitted(s))for(const id of Object.keys(R.ROUTES) as (keyof typeof R.ROUTES)[])if(id!==s.direction)actions.push({label:R.ROUTES[id],action:{type:'direction',id}});
 }
 if(s.phase==='summary')actions.push({label:s.week===16?'Félév lezárása':'Következő hét',action:{type:'advance'}});
 const p=s.puzzle;
 if(s.phase==='minigame'&&p){
  if(puzzleDone(p))actions.push({label:'Jutalom átvétele',action:{type:'claim'}});
  else if(p.kind==='archive'&&p.selected.length===2)actions.push({label:'Következő pár',action:{type:'next-pair'}});
  else for(let i=0;i<p.board.length;i++)if(p.kind==='recycling'||!p.matched.includes(i)&&!p.selected.includes(i))actions.push({label:`${i}. mező`,action:{type:'tile',index:i}});
  if(p.moves===0&&!p.selected.length)actions.push({label:'Mégsem dolgozom',action:{type:'cancel-job'}});
 }
 const ending=s.phase==='ending'?R.evaluateEnding(s):null;
 return {
  phase:s.phase,week:s.week,slot:s.slot,period:R.currentPeriod(s),money:s.money,activityPoints:s.activityPoints,energy:s.energy,direction:s.direction,lastNote:s.lastNote,
  scene:scene&&line?{id:scene.id,title:scene.title,location:LOCATIONS[R.sceneStage(s,scene).location],staging:R.sceneStage(s,scene),lineId:line.id,speakerId:line.speaker,speaker:line.speaker==='marton'?s.name:ACTOR_NAME[line.speaker],expression:line.expression,text:line.text,moment:line.moment?{id:line.moment,...MOMENT_CLIPS[line.moment],rendered:MOMENT_CLIPS[line.moment].status==='reviewed'}:null}:null,
  assets,actions,
  puzzle:p?{kind:p.kind,instructions:p.kind==='archive'?'Fordíts fel két lapot, majd válaszd a Következő pár gombot. 18 párpróba, nincs időkorlát.':'Válassz két szomszédos mezőt: legalább három azonos jel kell egy sorban vagy oszlopban. 12 sikeres csere; a hibás csere ingyenes.',width:p.kind==='archive'?4:5,movesLeft:MOVE_LIMIT[p.kind]-p.moves,score:p.score,reward:puzzleReward(p),done:puzzleDone(p),selected:p.selected,matched:p.matched,tiles:p.board.map((v,i)=>p.kind==='archive'&&!p.selected.includes(i)&&!p.matched.includes(i)?null:v),legend:p.kind==='archive'?['Kulcs','Levél','Hold','Torony','Könyv','Térkép','Pecsét','Toll']:['Zöld üvegpalack','Kék műanyag palack','Rézszínű italosdoboz','Lila üvegpalack']}:null,
  journal:s.journal,evidence:Object.entries(s.evidence).map(([id,witness])=>({id,text:EVIDENCE[id].text,...witness})),bonds:s.bonds,exposure:s.exposure,
  gifts:{inventory:s.inventory,shop:Object.entries(GIFTS).map(([id,g])=>({id,name:g.name,price:g.price,description:g.description,canBuy:s.phase==='planner'&&s.slot>0&&s.slot<3&&s.money>=g.price})),notes:GIFT_NOTES,deliveries:['remote','inPerson'],alreadyGifted:s.giftsWeek,replies:s.giftHistory.map(h=>({...h,item:GIFTS[h.gift].name,noteText:GIFT_NOTES[h.note],portrait:asset('portrait',portraitFor(h.girl,h.expression,h.week))}))},
  recap:s.phase==='summary'?s.journal.filter(j=>j.week===s.week):null,
  ending:ending?{...ending,viragText:viragEpilogue(s),institutionText:ending.institution?institutions[ending.institution]:'',relationshipText:relationships[ending.relationship??'unresolved'],threatText:threatText(ending.cost)}:null,
 };
}
export type GameView=ReturnType<typeof gameView>;
