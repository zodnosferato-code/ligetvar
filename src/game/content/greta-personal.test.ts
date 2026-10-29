import assert from 'node:assert/strict';
import {test} from 'node:test';
import {SCENES} from './catalog.ts';
import {createInitial,openScene,currentLine,applyChoice,activity,nextWeek,setDirection,sceneStage} from './runtime.ts';
import {gameView} from './view.ts';
import {encodeSave,decodeSave} from './saves.ts';
import type {GameState} from './types.ts';
function finish(s:GameState):GameState {while(s.phase==='scene')s=applyChoice(s,currentLine(s,SCENES)!.choices?.[0].id??'continue',SCENES);return s;}
function start(target:'greta_3'|'greta_6',week=28,night=false,coffee=false):GameState {
 let s=createInitial('Álex $& {playerName}');
 while(s.week<=52){
  if(s.slot===0){const shared=Object.values(SCENES).find(x=>x.kind==='shared'&&x.week===s.week);assert.ok(shared);s=finish(openScene(s,shared.id,SCENES));}
  if(s.week===32)s=setDirection(s,'greta');
  while(s.phase==='planner'){
   if(target==='greta_6'&&coffee&&s.week===51&&!s.completed.coffee_greta_late)s=finish(openScene(s,'coffee_greta_late',SCENES));
   if(s.phase!=='planner')break;
   for(const id of ['greta_1','greta_2','greta_3','greta_4','greta_5']){
    if(id===target)break;
    if(s.phase==='planner'&&!s.completed[id]&&s.week>=SCENES[id].week)s=finish(openScene(s,id,SCENES));
   }
   if(s.phase!=='planner')break;
   if(s.week===(target==='greta_6'?52:week)){
    if(night&&s.slot===1){s=activity(s,'rest');continue;}
    const opened=openScene(s,target,SCENES);assert.equal(opened.scene?.id,target);return opened;
   }
   s=activity(s,'rest');
  }
  s=nextWeek(s,SCENES);
 }
 throw Error('Scene not reached');
}
for(const target of ['greta_3','greta_6'] as const)test(`${target}: exhaustive choice scope, persistence, bilingual names and atomic outcomes`,()=>{
 const initial=start(target),pending=[{s:initial,path:[] as string[]}];let terminals=0;
 while(pending.length){
  const {s,path}=pending.pop()!,decoded=decodeSave(encodeSave(s),SCENES);
  assert.equal(decoded.status,'ok');if(decoded.status!=='ok')throw Error('Save rejected');
  const l=currentLine(s,SCENES)!,en=gameView(s,'en'),hu=gameView(s,'hu');
  assert.deepEqual(en,gameView(decoded.state,'en'));assert.notEqual(en.scene!.text,hu.scene!.text,l.id);
  assert.deepEqual(en.actions.map(a=>a.action),hu.actions.map(a=>a.action));
  assert.equal(s.completed[target],undefined);assert.deepEqual(s.evidence,initial.evidence);
  if(l.id===(target==='greta_3'?'line_3':'want'))for(const v of [en,hu])assert.ok(v.scene!.text.includes(s.name));
  if(target==='greta_3'){
   if(path.includes('slow_touch')){
    assert.ok(!l.choices?.some(c=>c.id==='kiss'));
    assert.notEqual(sceneStage(s,SCENES[target]).proximity,'close');
   }
   if(l.id==='kiss')assert.ok(path.includes('hand')&&path.includes('kiss'));
   if(l.id==='bench')assert.equal(sceneStage(s,SCENES[target]).location,'courtyard');
  }else{
   if(!path.includes('continue_together'))assert.equal(sceneStage(s,SCENES[target]).proximity,'apart');
   if(l.id==='fade'||l.id==='later')assert.ok(path.includes('room')&&path.includes('kiss')&&path.includes('intimate'));
   if(l.id==='future'){
    assert.ok(!en.actions.some(a=>a.action.type==='choice'&&a.action.id==='ask'));
    assert.ok(en.actions.some(a=>a.action.type==='choice'&&a.action.id==='ordinary'));
   }
  }
  for(const c of l.choices??[{id:'continue'}]){
   const n=applyChoice(decoded.state,c.id,SCENES),p=[...path,c.id];
   if(n.phase==='scene')pending.push({s:n,path:p});else{
    terminals++;const withdrew=p.includes(target==='greta_3'?'slow':'withdraw');
    assert.equal(n.slot,initial.slot+1);assert.ok(n.completed[target]);assert.deepEqual(n.evidence,initial.evidence);
    assert.equal(n.bonds.marton_greta-initial.bonds.marton_greta,withdrew?0:target==='greta_3'?10:6);
    assert.equal(Boolean(n.decisions.greta_withdraw),withdrew);
    if(target==='greta_6')assert.equal(Boolean(n.decisions.greta_aftermath),p.includes('continue_together'));
    assert.equal(decodeSave(encodeSave(n),SCENES).status,'ok');assert.ok(gameView(n,'en').journal.at(-1)!.text.includes(initial.name));
   }
  }
 }
 assert.equal(terminals,15);
});
for(const week of [28,50])for(const night of [false,true])test(`Gréta date actual calendar ${week}/${night?'night':'day'}`,()=>{
 const s=start('greta_3',week,night);assert.equal(s.week,week);assert.equal(gameView(s,'en').period,night?'night':'day');assert.ok(finish(s).completed.greta_3);
});
