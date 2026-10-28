import {scene,say} from './authoring.ts';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {CALENDAR,chapterWeek,storyIdAt} from './calendar.ts';
import {SCENES,EVIDENCE} from './catalog.ts';
import {BACKGROUNDS} from './assets.ts';
import {validateRegistry} from './validate.ts';
import {activity,applyChoice,buyGift,createInitial,currentLine,evaluateEnding,finishPuzzle,giveGift,movePuzzle,nextPair,nextWeek,openScene,setDirection} from './runtime.ts';
import {decodeSave,encodeSave} from './saves.ts';
import {enterMandatoryScene} from './flow.ts';
import {gameView} from './view.ts';
import type {GameState} from './types.ts';
function complete(s:GameState,id:string){
 s=openScene(s,id,SCENES);assert.equal(s.scene?.id,id,id+" at week "+s.week+" slot "+s.slot);
 for(let guard=0;s.phase==='scene';guard++){
  assert.ok(guard<150);assert.equal(decodeSave(encodeSave(s),SCENES).status,'ok');
  s=applyChoice(s,currentLine(s,SCENES)!.choices?.[0].id??'continue',SCENES);
 }
 return s;
}
function job(s:GameState){
 s=activity(s,'archive');assert.equal(s.phase,'minigame');
 for(let v=0;v<8;v++){
  const pair=s.puzzle!.board.flatMap((x,i)=>x===v?[i]:[]);
  s=movePuzzle(movePuzzle(s,pair[0]),pair[1]);if(v<7)s=nextPair(s);
 }
 return finishPuzzle(s);
}
test('a complete year has 104 ordinary activity slots, 16 mandatory events and no unearned ending',()=>{
 let s=createInitial('Year tester'),activitySlots=0,ordinaryWeeks=0,shared=0;
 for(let week=1;week<=CALENDAR.weeks;week++){
  assert.equal(s.week,week);assert.equal(evaluateEnding(s).relationship,null);
  assert.equal(gameView(s,'en').totalWeeks,52);assert.equal(nextWeek(s,SCENES),s);
  const id=storyIdAt(week);
  if(id){assert.equal(s.slot,0);assert.equal(enterMandatoryScene(s).scene?.id,id);s=complete(s,id);shared++;}
  else{
   ordinaryWeeks++;assert.equal(s.slot,1);assert.equal(enterMandatoryScene(s),s);
   assert.equal(decodeSave(encodeSave({...s,slot:0}),SCENES).status,'invalid');
   assert.equal(gameView(s).actions.some(a=>a.action.type==='scene'&&SCENES[a.action.id].kind==='shared'),false);
  }
  if(week<CALENDAR.confrontation)assert.equal(s.confrontation,null);
  if(week<CALENDAR.aftermath)assert.equal(s.institution,null);
  assert.equal(s.slot,1);
  s=activity(s,'rest');activitySlots++;assert.equal(s.slot,2);
  assert.equal(decodeSave(encodeSave(s),SCENES).status,'ok');
  s=activity(s,'rest');activitySlots++;assert.equal(s.slot,3);
  assert.equal(s.phase,'summary');assert.equal(decodeSave(encodeSave(s),SCENES).status,'ok');
  s=nextWeek(s,SCENES);
 }
 assert.equal(activitySlots,104);assert.equal(shared,16);assert.equal(ordinaryWeeks,36);
 assert.equal(s.week,52);assert.equal(s.phase,'ending');assert.equal(s.confrontation,'exhausting');
 assert.equal(s.completed.shared_15,51);assert.equal(s.completed.shared_16,52);
 assert.equal(evaluateEnding(s).relationship,'friendship');assert.equal(decodeSave(encodeSave(s),SCENES).status,'ok');
});
test('year-long weekly gift histories beyond the former 48-delivery cap remain resumable',()=>{
 let s=createInitial('Gift tester');
 for(let week=1;week<=CALENDAR.weeks;week++){
  const id=storyIdAt(week);if(id)s=complete(s,id);
  // One earned shift funds this week's three inexpensive gifts; no reward injection.
  s=job(s);
  for(const girl of ['rebeka','boglarka','greta'] as const){s=buyGift(s,'tea');s=giveGift(s,girl,'tea');}
  assert.equal(s.giftHistory.length,week*3);
  const restored=decodeSave(encodeSave(s),SCENES);assert.equal(restored.status,'ok');
  if(restored.status!=='ok')throw Error('Year gift history rejected');s=restored.state;
  s=nextWeek(activity(s,'rest'),SCENES);
 }
 assert.equal(s.giftHistory.length,156);assert.deepEqual(s.decisions,{});
 assert.equal(s.phase,'ending');assert.equal(evaluateEnding(s).relationship,'friendship');
});
test('year registry rejects missing mandatory events, extra unscheduled events and early final milestones',()=>{
 assert.equal(chapterWeek(15),51);assert.throws(()=>chapterWeek(17),/Unknown story chapter/);
 const missing=structuredClone(SCENES);delete missing.shared_5;
 assert.throws(()=>validateRegistry(missing,EVIDENCE,new Set(Object.keys(BACKGROUNDS))));
 const extra=structuredClone(SCENES);extra.unscheduled={...extra.shared_4,id:'unscheduled',week:4,deadline:4,evidence:[]};
 assert.throws(()=>validateRegistry(extra,EVIDENCE,new Set(Object.keys(BACKGROUNDS))),/Unscheduled shared/);
 const early=structuredClone(SCENES);early.shared_15.resolution=undefined;early.shared_14.resolution='confrontation';
 assert.throws(()=>validateRegistry(early,EVIDENCE,new Set(Object.keys(BACKGROUNDS))),/Ending order/);
 let s=createInitial('Guard');
 for(let week=1;week<6;week++){
  const id=storyIdAt(week);if(id)s=complete(s,id);
  while(s.phase==='planner')s=activity(s,'rest');
  if(week===5){const broken={...SCENES};delete broken.shared_4;assert.equal(nextWeek(s,broken),s);}
  s=nextWeek(s,SCENES);
 }
 assert.equal(s.week,6);assert.equal(s.slot,0);
});
test('the year calendar rejects semester saves without attempting migration',()=>{
 const saved=JSON.parse(encodeSave(createInitial('Old game')));
 saved.gameVersion='0.6.2';saved.contentCompatibilityVersion=5;
 const before=JSON.stringify(saved),decoded=decodeSave(before,SCENES);
 assert.equal(decoded.status,'unsupported');if(decoded.status==='unsupported')assert.equal(decoded.reason,'content');
 assert.equal(JSON.stringify(saved),before);
});

test('the year fits triad, all Virág chapters, all outings, preparation, earned work and nine coffees',()=>{
 const plan:Record<number,string[]>={};
 const add=(week:number,...ids:string[])=>{plan[week]=[...(plan[week]??[]),...ids];};
 const chapters:Record<number,string[]>={1:['rebeka_1'],2:['boglarka_1'],3:['rebeka_2'],4:['triad_1','boglarka_2'],5:['triad_2'],6:['rebeka_3'],7:['boglarka_3','triad_3'],8:['triad_4'],9:['rebeka_4'],10:['boglarka_4'],11:['triad_5'],12:['prepare_backup','triad_6'],13:['rebeka_5','boglarka_5'],14:['prepare_signals','triad_7'],16:['triad_8']};
 for(const [chapter,ids] of Object.entries(chapters))add(chapterWeek(Number(chapter)),...ids);
 for(const [index,week] of [2,3,7,16,32,43,47,49].entries())add(week,'virag_'+(index+1));
 plan[2]=['virag_1','boglarka_1'];
 for(const week of [4,5,8,9,11])add(week,'job');add(4,'greta_1');
 for(const [index,week] of [12,13,14,15,17,18].entries())add(week,['outing_rebeka_1','outing_rebeka_2','outing_boglarka_1','outing_boglarka_2','outing_greta_1','outing_greta_2'][index]);
 for(const [index,girl] of ['rebeka','boglarka','greta'].entries()){
  add(19+index,'coffee_'+girl+'_early');add(33+index,'coffee_'+girl+'_middle');
 }
 add(51,'coffee_rebeka_late','coffee_boglarka_late');
 // Reserve daytime for Gréta's last coffee and nighttime for the triad aftermath.
 plan[52]=['coffee_greta_late',...plan[52]];
 let s=createInitial('Full-year itinerary'),activities=0;
 for(let week=1;week<=CALENDAR.weeks;week++){
  const required=storyIdAt(week);if(required)s=complete(s,required);
  if(week===CALENDAR.direction)s=setDirection(s,'triad');
  for(const id of plan[week]??[]){
   assert.equal(s.phase,'planner','itinerary capacity at week '+week);
   if(id==='job')s=job(s);
   else{
    const x=SCENES[id];
    if(s.slot===1&&x.periods?.length===1&&x.periods[0]==='night')s=activity(s,'rest');
    s=complete(s,id);
   }
   activities++;
  }
  while(s.phase==='planner')s=activity(s,'rest');
  assert.equal(decodeSave(encodeSave(s),SCENES).status,'ok');s=nextWeek(s,SCENES);
 }
 assert.equal(activities,49);assert.equal(s.activityPoints,0);
 assert.equal(s.confrontation,'supported');assert.equal(s.completed.virag_8,49);
 assert.equal(evaluateEnding(s).relationship,'triad');
 for(const x of Object.values(SCENES).filter(x=>x.cost||x.id.startsWith('coffee_')||x.id.startsWith('virag_')))assert.ok(s.completed[x.id],x.id);
});


test('new content accepts actual year weeks and can run inside a previously ordinary week',()=>{
 const added=scene('year_expansion_smoke','A new activity','conversation',4,4,'courtyard',['marton'],[say('marton','A spare chair.')]);
 assert.equal(added.week,4);assert.equal(added.deadline,4);
 const later=scene('later_expansion_smoke','Later activity','conversation',20,27,'library',['marton'],[say('marton','A book.')]);
 assert.equal(later.week,20);assert.equal(later.deadline,27);
 const registry={...SCENES,[added.id]:added,[later.id]:later};
 validateRegistry(registry,EVIDENCE,new Set(Object.keys(BACKGROUNDS)));
 let s=createInitial('Expansion');
 for(let week=1;week<4;week++){s=complete(s,storyIdAt(week)!);s=nextWeek(activity(activity(s,'rest'),'rest'),registry);}
 assert.equal(s.week,4);assert.equal(s.slot,1);
 s=openScene(s,added.id,registry);assert.equal(s.phase,'scene');
 s=applyChoice(s,'continue',registry);assert.equal(s.slot,2);assert.equal(s.completed[added.id],4);
 assert.equal(decodeSave(encodeSave(s),registry).status,'ok');
});
