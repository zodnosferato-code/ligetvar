import assert from 'node:assert/strict';
import {test} from 'node:test';
import {SCENES} from './catalog.ts';
import {createInitial,openScene,currentLine,applyChoice,activity,nextWeek,setDirection} from './runtime.ts';
import {gameView} from './view.ts';
import {encodeSave,decodeSave} from './saves.ts';
import type {GameState} from './types.ts';
function finish(s:GameState):GameState {while(s.phase==='scene')s=applyChoice(s,currentLine(s,SCENES)!.choices?.[0].id??'continue',SCENES);return s;}
function start(target:string,week:number,night:boolean):GameState {
 let s=createInitial('Álex $& {playerName}');
 while(s.week<=50){
  if(s.slot===0){const shared=Object.values(SCENES).find(x=>x.kind==='shared'&&x.week===s.week)!;s=finish(openScene(s,shared.id,SCENES));}
  if(s.week===32)s=setDirection(s,'greta');
  while(s.phase==='planner'){
   for(const id of ['greta_1','greta_2','greta_3','greta_4']){
    if(id===target)break;
    if(s.phase==='planner'&&!s.completed[id]&&s.week>=SCENES[id].week)s=finish(openScene(s,id,SCENES));
   }
   if(s.phase!=='planner')break;
   if(s.week===week){
    if(night&&s.slot===1){s=activity(s,'rest');continue;}
    const n=openScene(s,target,SCENES);assert.equal(n.scene?.id,target);return n;
   }
   s=activity(s,'rest');
  }
  s=nextWeek(s,SCENES);
 }
 throw Error('Not reached');
}
for(const [target,early] of [['greta_4',43],['greta_5',48]] as const)
 for(const week of [early,50])for(const night of [false,true])test(`${target} week${week} ${night?'night':'day'}: every branch resumes and translates atomically`,()=>{
  const initial=start(target,week,night),pending=[{s:initial,path:[] as string[]}];let terminals=0;
  while(pending.length){
   const {s,path}=pending.pop()!,decoded=decodeSave(encodeSave(s),SCENES);assert.equal(decoded.status,'ok');if(decoded.status!=='ok')throw Error('Save invalid');
   const en=gameView(s,'en'),hu=gameView(s,'hu'),line=currentLine(s,SCENES)!;
   assert.deepEqual(en,gameView(decoded.state,'en'));assert.notEqual(en.scene!.text,hu.scene!.text,line.id);
   assert.deepEqual(en.actions.map(a=>a.action),hu.actions.map(a=>a.action));
   assert.equal(s.completed[target],undefined);assert.deepEqual(s.evidence,initial.evidence);
   assert.equal(en.scene!.staging.proximity,'apart');
   if(target==='greta_5'&&line.id==='line_4')assert.ok(en.scene!.text.includes(initial.name));
   for(const choice of line.choices??[{id:'continue'}]){
    const n=applyChoice(s,choice.id,SCENES),p=[...path,choice.id];
    if(n.phase==='scene')pending.push({s:n,path:p});else{
     terminals++;const withdraw=p.includes('withdraw');assert.equal(n.slot,initial.slot+1);assert.ok(n.completed[target]);
     assert.equal(Boolean(n.decisions.greta_withdraw),withdraw);
     assert.equal(n.bonds.marton_greta-initial.bonds.marton_greta,withdraw?0:target==='greta_4'?8:12);
     if(target==='greta_4')assert.equal(Boolean(n.decisions.greta_repair),!withdraw);
     else {
      assert.equal(Boolean(n.decisions.greta_commit),!withdraw);
      assert.equal(Boolean(n.decisions.greta_future_ordinary),p.includes('ritual'));
      assert.equal(Boolean(n.decisions.greta_future_ask),p.includes('open'));
     }
     assert.equal(decodeSave(encodeSave(n),SCENES).status,'ok');
     assert.notEqual(gameView(n,'en').journal.at(-1)!.text,gameView(n,'hu').journal.at(-1)!.text);
    }
   }
  }
  assert.equal(terminals,3);
 });
