import assert from 'node:assert/strict';
import {test} from 'node:test';
import {SCENES} from './catalog.ts';
import {createInitial,openScene,currentLine,applyChoice,activity,nextWeek,setDirection,sceneStage} from './runtime.ts';
import {gameView} from './view.ts';
import {encodeSave,decodeSave} from './saves.ts';
import type {GameState} from './types.ts';
function finish(s:GameState):GameState {while(s.phase==='scene')s=applyChoice(s,currentLine(s,SCENES)!.choices?.[0].id??'continue',SCENES);return s;}
function start(id:'rebeka_5'|'rebeka_6',week=48,night=false,coffee=false):GameState {
 let s=createInitial('Álex $& {playerName}');
 while(s.week<=52){
  if(s.slot===0){const shared=Object.values(SCENES).find(x=>x.kind==='shared'&&x.week===s.week);assert.ok(shared);s=finish(openScene(s,shared.id,SCENES));}
  if(s.week===32)s=setDirection(s,'rebeka');
  while(s.phase==='planner'){
   if(id==='rebeka_6'&&coffee&&s.week===51&&!s.completed.coffee_rebeka_late)s=finish(openScene(s,'coffee_rebeka_late',SCENES));
   if(s.phase!=='planner')break;
   for(const sid of ['rebeka_1','rebeka_2','rebeka_3','rebeka_4'])if(s.phase==='planner'&&!s.completed[sid]&&s.week>=SCENES[sid].week)s=finish(openScene(s,sid,SCENES));
   if(s.phase!=='planner')break;
   if(id==='rebeka_5'&&s.week===week){if(night&&s.slot===1){s=activity(s,'rest');continue;}return openScene(s,id,SCENES);}
   if(id==='rebeka_6'&&!s.completed.rebeka_5&&s.week===48)s=finish(openScene(s,'rebeka_5',SCENES));
   if(s.phase!=='planner')break;
   if(id==='rebeka_6'&&s.week===52){if(night&&s.slot===1){s=activity(s,'rest');continue;}return openScene(s,id,SCENES);}
   s=activity(s,'rest');
  }
  s=nextWeek(s,SCENES);
 }
 throw Error('Scene not reached');
}
for(const target of ['rebeka_5','rebeka_6'] as const)test(`${target}: exhaustive branches preserve refusal, physical scope, save/locale and atomic outcomes`,()=>{
 const initial=start(target),pending=[{s:initial,path:[] as string[]}];let terminals=0;
 while(pending.length){
  const {s,path}=pending.pop()!;
  const decoded=decodeSave(encodeSave(s),SCENES);assert.equal(decoded.status,'ok');if(decoded.status!=='ok')throw Error('Invalid save');
  const l=currentLine(decoded.state,SCENES)!,en=gameView(s,'en'),hu=gameView(s,'hu');
  assert.deepEqual(en,gameView(decoded.state,'en'));assert.notEqual(en.scene!.text,hu.scene!.text,l.id);assert.deepEqual(en.actions.map(a=>a.action),hu.actions.map(a=>a.action));
  assert.ok(!s.completed[target]);assert.ok(!s.decisions.rebeka_aftermath);
  if(target==='rebeka_6'){
   if(!path.includes('continue_together'))assert.equal(sceneStage(s,SCENES[target]).proximity,'apart');
   if(l.id==='kiss_1'||l.id==='intimacy_choice')assert.ok(path.includes('kiss'));
   if(l.id==='fade_1'||l.id==='after_fade')assert.ok(path.includes('intimate')&&path.includes('kiss')&&path.includes('room'));
   if(l.stage==='homeward')assert.deepEqual(sceneStage(s,SCENES[target]).participants,['marton']);
   assert.ok(!en.actions.some(a=>a.action.type==='choice'&&a.action.id==='coffee'));
  }
  for(const c of l.choices??[{id:'continue'}]){
   const n=applyChoice(decoded.state,c.id,SCENES),p=[...path,c.id];
   if(n.phase==='scene')pending.push({s:n,path:p});
   else{
    terminals++;assert.equal(n.slot,initial.slot+1);assert.deepEqual(n.evidence,initial.evidence);
    assert.equal(n.bonds.marton_rebeka-initial.bonds.marton_rebeka,p.includes('withdraw')?0:target==='rebeka_5'?12:6);
    assert.equal(Boolean(n.decisions.rebeka_withdraw),p.includes('withdraw'));
    if(target==='rebeka_6')assert.equal(Boolean(n.decisions.rebeka_aftermath),p.includes('continue_together'));
    assert.equal(decodeSave(encodeSave(n),SCENES).status,'ok');
    assert.ok(gameView(n,'en').journal.at(-1)!.text.includes(initial.name));
   }
  }
 }
 assert.equal(terminals,target==='rebeka_5'?3:15);
});
for(const week of [48,50])for(const night of [false,true])test(`commitment remains before confrontation at ${week}/${night?'night':'day'}`,()=>{
 const s=start('rebeka_5',week,night);assert.equal(s.week,week);assert.equal(gameView(s,'en').period,night?'night':'day');assert.ok(!s.evidence.vampire_dead);assert.ok(finish(s).completed.rebeka_5);
});
test('aftermath recalls only witnessed coffee, and private branch never changes weekly period',()=>{
 const s=start('rebeka_6',52,true,true);let n=s;
 while(n.phase==='scene'){
  const l=currentLine(n,SCENES)!;
  if(l.id==='after_topic')assert.ok(l.choices!.some(c=>c.id==='coffee'));
  assert.equal(gameView(n,'en').period,'night');
  n=applyChoice(n,l.id==='after_topic'?'coffee':l.id==='after_invite'?'room':l.id==='room_choice'?'talk':l.choices?.[0].id??'continue',SCENES);
 }
 assert.ok(n.completed.rebeka_6);
});
