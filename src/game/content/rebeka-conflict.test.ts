import assert from 'node:assert/strict';
import {test} from 'node:test';
import {SCENES} from './catalog.ts';
import {createInitial,openScene,currentLine,applyChoice,activity,nextWeek,sceneStage} from './runtime.ts';
import {gameView} from './view.ts';
import {encodeSave,decodeSave} from './saves.ts';
import type {GameState} from './types.ts';
function finish(s:GameState):GameState {while(s.phase==='scene')s=applyChoice(s,currentLine(s,SCENES)!.choices?.[0].id??'continue',SCENES);return s;}
function start(week=40,night=false):GameState {
 let s=createInitial('Álex $& {playerName}');
 while(s.week<=week){
  if(s.slot===0){const x=Object.values(SCENES).find(x=>x.kind==='shared'&&x.week===s.week);assert.ok(x);s=finish(openScene(s,x.id,SCENES));}
  while(s.phase==='planner'){
   for(const id of ['rebeka_1','rebeka_2','rebeka_3'])if(s.phase==='planner'&&!s.completed[id]&&s.week>=SCENES[id].week)s=finish(openScene(s,id,SCENES));
   if(s.phase!=='planner')break;
   if(s.week===week){if(night&&s.slot===1){s=activity(s,'rest');continue;}return openScene(s,'rebeka_4',SCENES);}
   s=activity(s,'rest');
  }
  s=nextWeek(s,SCENES);
 }
 throw Error('Not reached');
}
test('Rebeka disagreement: all branches resume bilingually, no forced touch or premature repair',()=>{
 const initial=start(),pending=[initial];let terminals=0;
 while(pending.length){
  const s=pending.pop()!,decoded=decodeSave(encodeSave(s),SCENES);assert.equal(decoded.status,'ok');if(decoded.status!=='ok')throw Error('Invalid save');
  const en=gameView(s,'en'),hu=gameView(s,'hu'),l=currentLine(s,SCENES)!;
  assert.deepEqual(gameView(decoded.state,'en'),en);assert.notEqual(en.scene!.text,hu.scene!.text);assert.deepEqual(en.actions.map(a=>a.action),hu.actions.map(a=>a.action));
  assert.equal(sceneStage(s,SCENES.rebeka_4).proximity,'apart');assert.ok(!s.decisions.rebeka_repair&&!s.completed.rebeka_4);
  if(l.id==='line_3')assert.ok(en.scene!.text.includes(initial.name));
  for(const c of l.choices??[{id:'continue'}]){
   const n=applyChoice(decoded.state,c.id,SCENES);
   if(n.phase==='scene')pending.push(n);
   else{terminals++;assert.equal(n.slot,initial.slot+1);assert.deepEqual(n.evidence,initial.evidence);assert.ok(n.completed.rebeka_4);assert.notEqual(Boolean(n.decisions.rebeka_repair),Boolean(n.decisions.rebeka_withdraw));assert.equal(n.bonds.marton_rebeka-initial.bonds.marton_rebeka,n.decisions.rebeka_repair?8:0);assert.equal(decodeSave(encodeSave(n),SCENES).status,'ok');}
  }
 }
 assert.equal(terminals,3);
});
for(const week of [40,50])for(const night of [false,true])test(`Rebeka disagreement legal window ${week}/${night?'night':'day'}`,()=>{
 const s=start(week,night);assert.equal(s.scene!.id,'rebeka_4');assert.equal(gameView(s,'en').period,night?'night':'day');assert.ok(!s.evidence.vampire_dead);assert.ok(finish(s).completed.rebeka_4);
});
