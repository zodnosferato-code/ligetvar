import assert from 'node:assert/strict';
import {test} from 'node:test';
import {SCENES} from './catalog.ts';
import {foundations} from './relationships.ts';
import {createInitial,openScene,currentLine,applyChoice,activity,nextWeek,sceneStage} from './runtime.ts';
import {gameView} from './view.ts';
import {encodeSave,decodeSave} from './saves.ts';
import type {GameState} from './types.ts';
function finish(s:GameState):GameState {while(s.phase==='scene')s=applyChoice(s,currentLine(s,SCENES)!.choices?.[0].id??'continue',SCENES);return s;}
function start(id:'boglarka_1'|'boglarka_2',week:number,night=false):GameState {
 let s=createInitial('Álex $& {playerName}');
 while(s.week<=week){
  if(s.slot===0){const x=Object.values(SCENES).find(x=>x.kind==='shared'&&x.week===s.week);assert.ok(x);s=finish(openScene(s,x.id,SCENES));}
  while(s.phase==='planner'){
   if(id==='boglarka_2'&&!s.completed.boglarka_1)s=finish(openScene(s,'boglarka_1',SCENES));
   if(s.phase!=='planner')break;
   if(s.week===week){if(night&&s.slot===1){s=activity(s,'rest');continue;}return openScene(s,id,SCENES);}
   s=activity(s,'rest');
  }
  s=nextWeek(s,SCENES);
 }
 throw Error('Not reached');
}
for(const target of ['boglarka_1','boglarka_2'] as const)for(const week of [target==='boglarka_1'?2:6,50])for(const night of [false,true])test(`${target}: all branches ${week}/${night?'night':'day'}, locale and resume preserve witnessed effects`,()=>{
 const initial=start(target,week,night),pending=[initial];let terminals=0;const memories=new Set<string>();
 const original=foundations.find(s=>s.id===target)!;
 assert.deepEqual(SCENES[target].requires,original.requires);
 assert.equal(gameView(initial,'en').period,night?'night':'day');
 for(const c of SCENES[target].lines.find(l=>l.id==='line_4')!.choices!)assert.deepEqual(c.effect,original.lines.find(l=>l.id==='line_4')!.choices!.find(x=>x.id===c.id)!.effect);
 while(pending.length){
  const s=pending.pop()!,d=decodeSave(encodeSave(s),SCENES);assert.equal(d.status,'ok');if(d.status!=='ok')throw Error('Invalid save');
  const l=currentLine(s,SCENES)!,en=gameView(s,'en'),hu=gameView(s,'hu');
  assert.deepEqual(gameView(d.state,'en'),en);assert.notEqual(en.scene!.text,hu.scene!.text);assert.deepEqual(en.actions.map(a=>a.action),hu.actions.map(a=>a.action));
  assert.notEqual(sceneStage(s,SCENES[target],'en').label,sceneStage(s,SCENES[target],'hu').label);
  assert.equal(sceneStage(s,SCENES[target]).proximity,'apart');assert.ok(!s.completed[target]);
  assert.deepEqual(s.decisions,initial.decisions);assert.deepEqual(s.bonds,initial.bonds);assert.deepEqual(s.evidence,initial.evidence);
  if(l.id===(target==='boglarka_1'?'line_1':'line_3'))assert.ok(en.scene!.text.includes(initial.name));
  for(const c of l.choices??[{id:'continue'}]){
   const n=applyChoice(d.state,c.id,SCENES);
   if(n.phase==='scene')pending.push(n);
   else{
    terminals++;assert.equal(n.slot,initial.slot+1);assert.deepEqual(n.evidence,initial.evidence);assert.equal(decodeSave(encodeSave(n),SCENES).status,'ok');assert.ok(n.completed[target]);
    const withdrawn=Boolean(n.decisions.boglarka_withdraw);
    if(target==='boglarka_1'){
     assert.equal(Boolean(n.decisions.boglarka_interest),!withdrawn);
     assert.ok([0,6,8].includes(n.bonds.marton_boglarka-initial.bonds.marton_boglarka));
    }else{
     assert.equal(Boolean(n.decisions.boglarka_attraction),!withdrawn);
     assert.equal(Boolean(n.decisions.marton_boglarka_attraction_yes),!withdrawn);
     assert.equal(Number(Boolean(n.decisions.boglarka_quiet))+Number(Boolean(n.decisions.boglarka_listening)),withdrawn?0:1);
     assert.equal(n.bonds.marton_boglarka-initial.bonds.marton_boglarka,withdrawn?0:10);
     if(n.decisions.boglarka_quiet)memories.add('quiet');if(n.decisions.boglarka_listening)memories.add('share');
    }
    const v=gameView(n,'en'),h=gameView(n,'hu');assert.notDeepEqual(v.journal,h.journal);
   }
  }
 }
 assert.equal(terminals,3);if(target==='boglarka_2')assert.deepEqual([...memories].sort(),['quiet','share']);
});
