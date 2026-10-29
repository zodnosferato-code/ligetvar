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
function dated(week=28):GameState {
 let s=until(createInitial('Álex $& {playerName}'),2);s=finish(openScene(s,'greta_1',SCENES));
 s=until(s,10);s=finish(openScene(s,'greta_2',SCENES));
 s=until(s,week);return finish(openScene(s,'greta_3',SCENES),{hand_offer:'slow_touch',bench:'talk'});
}
const offered=(s:GameState,id:string)=>gameView(s,'en').actions.some(a=>a.action.type==='scene'&&a.action.id===id);
// Walk every public branch from naturally reached states, not edited saves.
function branches(initial:GameState,id:string):GameState[]{
 const pending=[openScene(initial,id,SCENES)],terminals:GameState[]=[];
 while(pending.length){
  const s=pending.pop()!,decoded=decodeSave(encodeSave(s),SCENES);assert.equal(decoded.status,'ok');if(decoded.status!=='ok')throw Error('Save');
  const en=gameView(s,'en'),hu=gameView(s,'hu'),l=currentLine(s,SCENES)!;
  assert.deepEqual(gameView(decoded.state,'en'),en);assert.notEqual(en.scene!.text,hu.scene!.text);
  assert.deepEqual(en.actions.map(a=>a.action),hu.actions.map(a=>a.action));
  assert.notEqual(sceneStage(s,SCENES[id],'en').label,sceneStage(s,SCENES[id],'hu').label);
  assert.deepEqual(s.decisions,initial.decisions);assert.deepEqual(s.bonds,initial.bonds);assert.deepEqual(s.evidence,initial.evidence);
  assert.ok(!s.completed[id]);
  if(l.id==='want')assert.ok(en.scene!.text.includes(initial.name));
  const local=new Set(s.scene!.pending.flatMap(e=>e.decisions??[]));
  if(id==='greta_private'&&l.stage==='close')assert.ok(local.has('greta_private_kiss'));
  if(id==='greta_private'&&['fade','later','later_reply','later_answer'].includes(l.id))assert.ok(local.has('greta_midpoint_intimate'));
  if(id==='greta_company'&&l.id==='history'){
   const choices=en.actions.filter(a=>a.action.type==='choice').map(a=>(a.action as {id:string}).id);
   for(const [c,d] of [['intimate','greta_midpoint_intimate'],['quiet','greta_private_company'],['outside','greta_private_outside']])assert.equal(choices.includes(c),Boolean(s.decisions[d]));
   assert.ok(choices.includes('present'));
  }
  for(const action of en.actions.filter(a=>a.action.type==='choice')){
   const n=applyChoice(decoded.state,(action.action as {id:string}).id,SCENES);
   if(n.phase==='scene')pending.push(n);else{
    assert.equal(n.slot,initial.slot+1);assert.equal(n.week,initial.week);assert.deepEqual(n.bonds,initial.bonds);assert.deepEqual(n.evidence,initial.evidence);
    assert.equal(n.direction,initial.direction);assert.equal(n.exposure,initial.exposure);
    assert.ok(n.completed[id]);assert.equal(decodeSave(encodeSave(n),SCENES).status,'ok');
    assert.notDeepEqual(gameView(n,'en').journal,gameView(n,'hu').journal);
    for(const [d,w] of Object.entries(n.decisions))if(!initial.decisions[d])assert.deepEqual(w,{scene:id,week:n.week});
    if(id==='greta_private'){
     assert.equal(Number(Boolean(n.decisions.greta_midpoint_intimate))+Number(Boolean(n.decisions.greta_private_company))+Number(Boolean(n.decisions.greta_private_outside))+Number(Boolean(n.decisions.greta_private_declined)),1);
     if(n.decisions.greta_midpoint_intimate){assert.ok(n.decisions.greta_private_visit);assert.ok(n.decisions.greta_private_kiss);}
     assert.ok(!n.decisions.greta_commit);assert.ok(!n.decisions.greta_withdraw);
    }
    terminals.push(n);
   }
  }
 }
 return terminals;
}
for(const [week,night] of [[28,true],[29,false],[32,false],[32,true]] as const)test(`Gréta midpoint all branches at ${week}/${night?'night':'day'} persist only chosen history`,()=>{
 let s=dated();if(week>28)s=until(s,week);if(night&&s.slot===1)s=activity(s,'rest');
 assert.ok(offered(s,'greta_private'));assert.equal(s.direction,'friendship');
 assert.equal(branches(s,'greta_private').length,14);
});
for(const [week,night] of [[33,false],[33,true],[37,false],[37,true]] as const)test(`Gréta company ${week}/${night?'night':'day'} recalls each private outcome without assuming sex`,()=>{
 for(const s of branches(dated(),'greta_private')){
  let n=until(s,week);if(night)n=activity(n,'rest');assert.ok(offered(n,'greta_company'));
  const terminal=branches(n,'greta_company');assert.ok(terminal.length>=6);
  for(const end of terminal){
   assert.equal(Boolean(end.decisions.greta_midpoint_intimate),Boolean(s.decisions.greta_midpoint_intimate));
   assert.equal(Number(Boolean(end.decisions.greta_company_savour))+Number(Boolean(end.decisions.greta_company_menu)),1);
  }
 }
});
test('Gréta additions respect admission/deadlines, date refusal and optional existing progression',()=>{
 let s=until(createInitial('Tester'),28);assert.ok(!offered(s,'greta_private'));assert.ok(!offered(s,'greta_company'));
 s=dated(32);assert.ok(offered(s,'greta_private'));s=until(s,33);assert.ok(!offered(s,'greta_private'));assert.ok(!offered(s,'greta_company'));
 // Skipped additions never gate the original disagreement.
 s=until(s,43);assert.ok(offered(s,'greta_4'));
 let refused=until(createInitial('Tester'),2);refused=finish(openScene(refused,'greta_1',SCENES));refused=until(refused,10);refused=finish(openScene(refused,'greta_2',SCENES));refused=until(refused,28);refused=finish(openScene(refused,'greta_3',SCENES),{line_4:'slow'});assert.ok(!offered(refused,'greta_private'));
 const privateEnd=finish(openScene(dated(),'greta_private',SCENES),{invite:'leave'});
 assert.ok(offered(until(privateEnd,33),'greta_company'));assert.ok(!offered(until(privateEnd,38),'greta_company'));
});
