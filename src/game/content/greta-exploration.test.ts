import assert from 'node:assert/strict';
import {test} from 'node:test';
import {SCENES} from './catalog.ts';
import {createInitial,openScene,currentLine,applyChoice,activity,nextWeek,sceneStage} from './runtime.ts';
import {gameView} from './view.ts';
import {encodeSave,decodeSave} from './saves.ts';
import type {GameState} from './types.ts';
function finish(s:GameState,policy:Record<string,string>={}):GameState {
 while(s.phase==='scene'){const l=currentLine(s,SCENES)!;s=applyChoice(s,policy[l.id]??l.choices?.[0].id??'continue',SCENES);}return s;
}
function until(s:GameState,week:number):GameState {
 while(true){
  if(s.slot===0){const required=Object.values(SCENES).find(x=>x.kind==='shared'&&x.week===s.week)!;s=finish(openScene(s,required.id,SCENES));}
  if(s.week===week&&s.phase==='planner')return s;
  if(s.phase==='planner')s=activity(s,'rest');else s=nextWeek(s,SCENES);
 }
}
function company(privatePolicy:Record<string,string>={}):GameState {
 let s=until(createInitial('Álex $& {playerName}'),2);s=finish(openScene(s,'greta_1',SCENES));
 s=until(s,10);s=finish(openScene(s,'greta_2',SCENES));
 s=until(s,28);s=finish(openScene(s,'greta_3',SCENES),{hand_offer:'slow_touch',bench:'talk'});
 s=finish(openScene(s,'greta_private',SCENES),privatePolicy);
 return finish(openScene(until(s,33),'greta_company',SCENES),{history:'present',hand_offer:'company'});
}
const offered=(s:GameState,id:string)=>gameView(s,'en').actions.some(a=>a.action.type==='scene'&&a.action.id===id);
function branches(initial:GameState,id:'greta_dance'|'greta_sketch'):GameState[]{
 const pending=[openScene(initial,id,SCENES)],ends:GameState[]=[];
 while(pending.length){
  const s=pending.pop()!,decoded=decodeSave(encodeSave(s),SCENES);assert.equal(decoded.status,'ok');if(decoded.status!=='ok')throw Error('Save');
  const en=gameView(s,'en'),hu=gameView(s,'hu'),l=currentLine(s,SCENES)!;
  assert.deepEqual(gameView(decoded.state,'en'),en);assert.notEqual(en.scene!.text,hu.scene!.text);
  assert.deepEqual(en.actions.map(a=>a.action),hu.actions.map(a=>a.action));
  assert.notEqual(sceneStage(s,SCENES[id],'en').label,sceneStage(s,SCENES[id],'hu').label);
  assert.deepEqual(s.decisions,initial.decisions);assert.deepEqual(s.bonds,initial.bonds);assert.deepEqual(s.evidence,initial.evidence);assert.ok(!s.completed[id]);
  const local=new Set(s.scene!.pending.flatMap(e=>e.decisions??[]));
  const choices=en.actions.filter(a=>a.action.type==='choice').map(a=>(a.action as {id:string}).id);
  if(id==='greta_dance'){
   if(l.stage==='dance')assert.ok(local.has('greta_dance_steps'));
   if(l.stage==='close')assert.ok(local.has('greta_dance_kiss'));
   if(['again','first','fade','later','later_reply'].includes(l.id))assert.ok(local.has('greta_dance_intimate'));
   if(l.id==='room_choice')assert.ok(en.scene!.text.includes(initial.name));
   if(l.id==='further'){
    assert.equal(choices.includes('again'),Boolean(initial.decisions.greta_midpoint_intimate));
    assert.equal(choices.includes('first'),!initial.decisions.greta_midpoint_intimate);
    // Direct commands cannot bypass the witnessed-history choice gate.
    const blocked=initial.decisions.greta_midpoint_intimate?'first':'again';
    assert.deepEqual(applyChoice(s,blocked,SCENES),s);
   }
   if(l.id==='history'){
    assert.equal(choices.includes('familiar'),Boolean(initial.decisions.greta_midpoint_intimate));
    assert.equal(choices.includes('quiet'),Boolean(initial.decisions.greta_private_company));
   }
  }else{
   if(l.stage==='beside')assert.ok(local.has('greta_sketch_hand'));
   if(l.id==='history'){
    assert.equal(choices.includes('dance'),Boolean(initial.decisions.greta_dance_steps||initial.decisions.greta_dance_rhythm));
    assert.equal(choices.includes('later_private'),Boolean(initial.decisions.greta_dance_intimate));
    assert.equal(choices.includes('midpoint'),Boolean(initial.decisions.greta_midpoint_intimate));assert.ok(choices.includes('present'));
   }
  }
  for(const choice of choices){
   const n=applyChoice(decoded.state,choice,SCENES);
   if(n.phase==='scene')pending.push(n);else{
    assert.equal(n.slot,initial.slot+1);assert.equal(n.week,initial.week);assert.deepEqual(n.bonds,initial.bonds);assert.deepEqual(n.evidence,initial.evidence);
    assert.equal(n.direction,initial.direction);assert.equal(n.exposure,initial.exposure);assert.ok(n.completed[id]);
    assert.equal(decodeSave(encodeSave(n),SCENES).status,'ok');assert.notDeepEqual(gameView(n,'en').journal,gameView(n,'hu').journal);
    for(const [d,w] of Object.entries(n.decisions))if(!initial.decisions[d])assert.deepEqual(w,{scene:id,week:n.week});
    if(id==='greta_dance'){
     assert.equal(['greta_dance_intimate','greta_dance_company','greta_dance_declined'].filter(d=>n.decisions[d]).length,1);
     if(n.decisions.greta_dance_intimate){assert.ok(n.decisions.greta_dance_visit);assert.ok(n.decisions.greta_dance_kiss);}
     if(n.decisions.greta_dance_stopped){assert.ok(n.decisions.greta_dance_kiss);assert.ok(!n.decisions.greta_dance_intimate);}
    }else{
     assert.equal(['greta_sketch_portraits','greta_sketch_bench'].filter(d=>n.decisions[d]).length,1);
     assert.equal(['greta_sketch_exchange','greta_sketch_keep'].filter(d=>n.decisions[d]).length,1);
     assert.equal(Boolean(n.decisions.greta_dance_intimate),Boolean(initial.decisions.greta_dance_intimate));
    }
    assert.ok(!n.decisions.greta_commit);ends.push(n);
   }
  }
 }
 return ends;
}
for(const [week,night] of [[38,false],[38,true],[42,false],[42,true]] as const)test(`Gréta dance exhaustive history, branches and saves ${week}/${night?'night':'day'}`,()=>{
 const histories:Record<string,string>[]=[{},{room_choice:'talk'},{invite:'outside'},{invite:'leave'},{further:'stop'}];
 for(const history of histories){
  let s=until(company(history),week);if(night)s=activity(s,'rest');assert.ok(offered(s,'greta_dance'));
  assert.ok(branches(s,'greta_dance').length>=15);
 }
});
for(const [week,night] of [[44,false],[44,true],[47,false],[47,true]] as const)test(`Gréta sketch exhaustive callbacks and saves ${week}/${night?'night':'day'}`,()=>{
 const base=company({invite:'leave'}),dance=until(base,38);
 const histories=[base,
  finish(openScene(dance,'greta_dance',SCENES)),
  finish(openScene(dance,'greta_dance',SCENES),{offer:'rhythm',invite:'outside'}),
  finish(openScene(dance,'greta_dance',SCENES),{offer:'leave'}),
  company()];
 for(const history of histories){let s=until(history,week);if(night)s=activity(s,'rest');assert.ok(offered(s,'greta_sketch'));assert.ok(branches(s,'greta_sketch').length>=24);}
});
test('Later exploration windows, skipped dance and original progression stay independent',()=>{
 const base=company();assert.ok(!offered(until(base,37),'greta_dance'));assert.ok(!offered(until(base,43),'greta_dance'));
 assert.ok(!offered(until(base,43),'greta_sketch'));assert.ok(!offered(until(base,48),'greta_sketch'));
 assert.ok(offered(until(base,44),'greta_sketch'));assert.ok(offered(until(base,43),'greta_4'));
 const noCompany=until(createInitial('Tester'),44);assert.ok(!offered(noCompany,'greta_sketch'));
 const withdrawn=finish(openScene(until(base,43),'greta_4',SCENES),{line_4:'withdraw'});
 assert.ok(withdrawn.decisions.greta_withdraw);assert.ok(!offered(until(withdrawn,44),'greta_sketch'));
});
