import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SCENES} from './catalog.ts';
import {applyChoice,activity,availableScenes,createInitial,currentLine,nextWeek,openScene} from './runtime.ts';
import {encodeSave,decodeSave} from './saves.ts';
import {gameView} from './view.ts';
import type {GameState} from './types.ts';

function finish(s:GameState){let guard=150;while(s.phase==='scene'&&guard--)s=applyChoice(s,currentLine(s,SCENES)!.choices?.[0].id??'continue',SCENES);assert.ok(guard>0);return s;}
function at(week:number,beforeShared=false){
 let s=createInitial('Álex $& {playerName}');
 for(let w=1;w<=week;w++){
  if(w===week&&beforeShared)return s;
  const required=availableScenes(s,SCENES).find(x=>x.kind==='shared');if(required)s=finish(openScene(s,required.id,SCENES));
  if(w===week)return s;
  while(s.phase==='planner')s=activity(s,'rest');s=nextWeek(s,SCENES);
 }
 throw Error('Unreachable week');
}
for(const [id,week,branches] of [['folklore_luca',11,['wheat','tree','leave']],['folklore_ivan',39,['song','bench','leave']]] as const){
 for(const branch of branches)test(id+'/'+branch+': bilingual per-node saves, completion-only decisions, one normal slot',()=>{
  const before=id==='folklore_ivan'?activity(at(week),'rest'):at(week);let s=openScene(before,id,SCENES),guard=60,sawName=false;assert.equal(s.scene?.id,id);
  const visited=new Set<string>();
  while(s.phase==='scene'&&guard--){
   visited.add(s.scene!.line);assert.deepEqual(s.decisions,before.decisions);assert.deepEqual(s.evidence,before.evidence);
   const raw=encodeSave(s),en=gameView(s,'en'),hu=gameView(s,'hu');
   assert.notEqual(en.scene!.text,hu.scene!.text);assert.deepEqual(en.actions.map(a=>a.action),hu.actions.map(a=>a.action));
   assert.ok(!en.scene!.text.includes('@message:'));if(id==='folklore_luca'&&s.scene!.line==='offer'){sawName=true;assert.ok(en.scene!.text.includes(s.name));assert.ok(hu.scene!.text.includes(s.name));}
   assert.equal(encodeSave(s),raw,'language switching must not mutate the save');
   const decoded=decodeSave(raw,SCENES);assert.equal(decoded.status,'ok');if(decoded.status!=='ok')throw Error('resume');
   assert.deepEqual(gameView(decoded.state,'en'),en);
   s=applyChoice(decoded.state,currentLine(s,SCENES)!.choices?.length?branch:'continue',SCENES);
  }
  assert.ok(guard>0);if(id==='folklore_luca')assert.ok(sawName);
  assert.ok(visited.has(branch+'_0'));for(const other of branches.filter(x=>x!==branch))assert.ok(!visited.has(other+'_0'));
  assert.equal(s.slot,before.slot+1);assert.equal(s.completed[id],week);assert.deepEqual(s.evidence,before.evidence);assert.deepEqual(s.bonds,before.bonds);
  assert.deepEqual(Object.keys(s.decisions).filter(d=>!before.decisions[d]),[id+'_'+branch]);
  assert.notEqual(gameView(s,'en').journal.at(-1)!.text,gameView(s,'hu').journal.at(-1)!.text);
  assert.equal(openScene(s,id,SCENES),s);assert.equal(decodeSave(encodeSave(s),SCENES).status,'ok');
 });
 test(id+': whole window, expiry, period guards and independent season guards',()=>{
  const scene=SCENES[id];
  for(const week of [scene.week,scene.deadline])assert.ok(availableScenes(id==='folklore_ivan'?activity(at(week),'rest'):at(week),SCENES).some(x=>x.id===id));
  for(const week of [scene.week-1,scene.deadline+1])assert.equal(openScene(id==='folklore_ivan'?activity(at(week),'rest'):at(week),id,SCENES).scene,null);
  const day=at(week),night=activity(day,'rest'),wrongPeriod=id==='folklore_ivan'?day:night;assert.equal(openScene(wrongPeriod,id,SCENES),wrongPeriod);
  const wrong=id==='folklore_luca'?at(39):activity(at(11),'rest'),registry=structuredClone(SCENES);registry[id].week=1;registry[id].deadline=52;
  assert.equal(openScene(wrong,id,registry),wrong,'calendar gate must hold even with widened numeric windows');
  const active=openScene(id==='folklore_ivan'?night:day,id,SCENES),forged={...active,week:wrong.week};
  assert.equal(applyChoice(forged,'continue',registry),forged);assert.equal(decodeSave(encodeSave(forged),registry).status,'invalid');
 });
}
