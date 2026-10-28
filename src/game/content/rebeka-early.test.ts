import assert from 'node:assert/strict';
import {test} from 'node:test';
import {SCENES} from './catalog.ts';
import {createInitial,openScene,currentLine,applyChoice,activity,nextWeek,sceneStage} from './runtime.ts';
import {gameView} from './view.ts';
import {encodeSave,decodeSave} from './saves.ts';
import type {GameState} from './types.ts';
function finish(s:GameState):GameState {while(s.phase==='scene')s=applyChoice(s,currentLine(s,SCENES)!.choices?.[0].id??'continue',SCENES);return s;}
function start(id:'rebeka_1'|'rebeka_2',week:number,night=false):GameState {
 let s=createInitial('Álex $& {playerName}');
 while(s.week<=week){
  if(s.slot===0){const x=Object.values(SCENES).find(x=>x.kind==='shared'&&x.week===s.week);assert.ok(x);s=finish(openScene(s,x.id,SCENES));}
  while(s.phase==='planner'){
   if(id==='rebeka_2'&&!s.completed.rebeka_1)s=finish(openScene(s,'rebeka_1',SCENES));
   if(s.phase!=='planner')break;
   if(s.week===week){if(night&&s.slot===1){s=activity(s,'rest');continue;}return openScene(s,id,SCENES);}
   s=activity(s,'rest');
  }
  s=nextWeek(s,SCENES);
 }
 throw Error('Not reached');
}
for(const target of ['rebeka_1','rebeka_2'] as const)test(`${target}: three viable paths, locale/resume and no unchosen attraction or touch`,()=>{
 const initial=start(target,target==='rebeka_1'?1:3),pending=[initial];let terminals=0;
 while(pending.length){
  const s=pending.pop()!,d=decodeSave(encodeSave(s),SCENES);assert.equal(d.status,'ok');if(d.status!=='ok')throw Error('Invalid save');
  const l=currentLine(s,SCENES)!,en=gameView(s,'en'),hu=gameView(s,'hu');
  assert.deepEqual(gameView(d.state,'en'),en);assert.notEqual(en.scene!.text,hu.scene!.text);assert.deepEqual(en.actions.map(a=>a.action),hu.actions.map(a=>a.action));
  assert.equal(sceneStage(s,SCENES[target]).proximity,'apart');assert.ok(!s.completed[target]);
  assert.ok(!s.decisions.rebeka_attraction&&!s.decisions.rebeka_unpolished&&!s.decisions.rebeka_small_moment);
  if(l.id===(target==='rebeka_1'?'line_1':'line_3'))assert.ok(en.scene!.text.includes(initial.name));
  for(const c of l.choices??[{id:'continue'}]){
   const n=applyChoice(d.state,c.id,SCENES);
   if(n.phase==='scene')pending.push(n);
   else{
    terminals++;assert.equal(n.slot,initial.slot+1);assert.deepEqual(n.evidence,initial.evidence);assert.equal(decodeSave(encodeSave(n),SCENES).status,'ok');
    assert.ok(n.completed[target]);
    if(target==='rebeka_2'){
     const withdrawn=Boolean(n.decisions.rebeka_withdraw);assert.equal(Boolean(n.decisions.rebeka_attraction),!withdrawn);
     assert.equal(Number(Boolean(n.decisions.rebeka_unpolished))+Number(Boolean(n.decisions.rebeka_small_moment)),withdrawn?0:1);
     assert.equal(n.bonds.marton_rebeka-initial.bonds.marton_rebeka,withdrawn?0:10);
    }
   }
  }
 }
 assert.equal(terminals,3);
});
for(const id of ['rebeka_1','rebeka_2'] as const)for(const week of [id==='rebeka_1'?1:3,50])for(const night of [false,true])test(`${id}: actual window ${week}/${night?'night':'day'}`,()=>{
 const s=start(id,week,night);assert.equal(s.scene!.id,id);assert.equal(gameView(s,'en').period,night?'night':'day');assert.ok(finish(s).completed[id]);
});
