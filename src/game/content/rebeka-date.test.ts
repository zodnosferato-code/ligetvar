import assert from 'node:assert/strict';
import {test} from 'node:test';
import {SCENES} from './catalog.ts';
import {createInitial,openScene,currentLine,applyChoice,activity,nextWeek,sceneStage} from './runtime.ts';
import {gameView} from './view.ts';
import {encodeSave,decodeSave} from './saves.ts';
import {CONTENT_COMPATIBILITY_VERSION} from '../release.ts';
import type {GameState} from './types.ts';
function finish(s:GameState):GameState {
 while(s.phase==='scene')s=applyChoice(s,currentLine(s,SCENES)!.choices?.[0].id??'continue',SCENES);
 return s;
}
function start(week=16,night=false):GameState {
 let s=createInitial('Álex $& {playerName}');
 while(s.week<=week){
  if(s.slot===0){const shared=Object.values(SCENES).find(x=>x.kind==='shared'&&x.week===s.week);assert.ok(shared);s=finish(openScene(s,shared.id,SCENES));}
  if(s.phase==='planner'){
   for(const id of ['rebeka_1','rebeka_2'])if(!s.completed[id]&&s.week>=SCENES[id].week)s=finish(openScene(s,id,SCENES));
   if(s.week===week){if(night&&s.slot===1)s=activity(s,'rest');return openScene(s,'rebeka_3',SCENES);}
   while(s.phase==='planner')s=activity(s,'rest');
  }
  s=nextWeek(s,SCENES);
 }
 throw Error('No date');
}
test('Rebeka date: every assembled branch keeps pace, names, locale, staging and atomic completion',()=>{
 const initial=start(),pending=[{s:initial,choices:[] as string[]}];let terminals=0;
 while(pending.length){
  const {s,choices}=pending.pop()!;
  const saved=decodeSave(encodeSave(s),SCENES);assert.equal(saved.status,'ok');
  if(saved.status!=='ok')throw Error('Invalid save');
  const line=currentLine(saved.state,SCENES)!;
  const en=gameView(saved.state,'en'),hu=gameView(saved.state,'hu');
  assert.notEqual(en.scene!.text,hu.scene!.text,line.id);
  assert.deepEqual(en.actions.map(a=>a.action),hu.actions.map(a=>a.action));
  assert.deepEqual(gameView(s,'en'),en);
  if(line.id==='line_3')for(const v of [en,hu])assert.ok(v.scene!.text.includes(s.name));
  assert.equal(sceneStage(s,SCENES.rebeka_3).proximity==='close',line.id.startsWith('date_kiss_'));
  if(choices.includes('slow_touch')){
   assert.ok(!currentLine(s,SCENES)!.choices?.some(c=>c.id==='kiss'||c.id==='together'));
   assert.ok(!line.id.startsWith('date_kiss_')&&!line.id.startsWith('romance_closeness_hand_'));
  }
  if(line.id==='date_destination')assert.equal(sceneStage(s,SCENES.rebeka_3).location,'bekas');
  if(line.id==='date_private_choice')assert.equal(sceneStage(s,SCENES.rebeka_3).location,'holdkor');
  for(const id of line.choices?.map(c=>c.id)??['continue']){
   const n=applyChoice(saved.state,id,SCENES),path=[...choices,id];
   if(n.phase==='scene')pending.push({s:n,choices:path});
   else {
    terminals++;assert.ok(n.completed.rebeka_3);assert.equal(n.slot,initial.slot+1);
    assert.deepEqual(n.evidence,initial.evidence);
    assert.equal(n.bonds.marton_rebeka-initial.bonds.marton_rebeka,path.includes('slow')?0:10);
    assert.equal(Boolean(n.decisions.rebeka_date_romantic_kiss),path.includes('kiss'));
    assert.equal(Boolean(n.decisions.rebeka_withdraw),path.includes('slow'));
    assert.equal(gameView(n,'en').journal.at(-1)!.text.includes(s.name),true);
    assert.equal(decodeSave(encodeSave(n),SCENES).status,'ok');
   }
  }
 }
 assert.equal(terminals,37);
});
for(const week of [16,50])for(const night of [false,true])test(`Rebeka date: legal window ${week} / ${night?'night':'day'}`,()=>{
 const s=start(week,night);assert.equal(s.phase,'scene');assert.equal(s.scene!.id,'rebeka_3');
 const v=gameView(s,'en');assert.equal(v.period,night?'night':'day');
 assert.equal(sceneStage(s,SCENES.rebeka_3).location,'bekas');
 assert.ok(finish(s).completed.rebeka_3);
});
test('pre-rewrite content epoch is rejected without migration',()=>{
 const envelope=JSON.parse(encodeSave(createInitial('Tester')));
 envelope.contentCompatibilityVersion=CONTENT_COMPATIBILITY_VERSION-1;
 assert.equal(decodeSave(JSON.stringify(envelope),SCENES).status,'unsupported');
});
