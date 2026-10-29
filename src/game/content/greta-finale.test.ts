import assert from 'node:assert/strict';
import {test} from 'node:test';
import {SCENES} from './catalog.ts';
import {createInitial,openScene,currentLine,applyChoice,activity,nextWeek,setDirection,sceneStage} from './runtime.ts';
import {gameView} from './view.ts';
import {encodeSave,decodeSave} from './saves.ts';
import type {GameState} from './types.ts';
function finish(s:GameState,policy:Record<string,string>={}):GameState {
 while(s.phase==='scene'){const l=currentLine(s,SCENES)!;s=applyChoice(s,policy[l.id]??l.choices?.[0].id??'continue',SCENES);}return s;
}
function until(s:GameState,week:number):GameState {
 while(true){
  if(s.slot===0)s=finish(openScene(s,Object.values(SCENES).find(x=>x.kind==='shared'&&x.week===s.week)!.id,SCENES));
  if(s.week===week&&s.phase==='planner')return s;
  s=s.phase==='planner'?activity(s,'rest'):nextWeek(s,SCENES);
 }
}
function finale(history:string,night:boolean):GameState {
 let s=until(createInitial('Álex $& {playerName}'),2);s=finish(openScene(s,'greta_1',SCENES));
 s=finish(openScene(until(s,10),'greta_2',SCENES));
 s=finish(openScene(until(s,28),'greta_3',SCENES),{hand_offer:'slow_touch',bench:'talk'});
 if(history!=='skipped')s=finish(openScene(until(s,29),'greta_private',SCENES),history==='midpoint'?{}:{invite:'outside'});
 s=setDirection(until(s,32),'greta');
 if(history!=='skipped')s=finish(openScene(until(s,33),'greta_company',SCENES),{history:'present',hand_offer:'company'});
 if(['dance','rhythm','declined'].includes(history))s=finish(openScene(until(s,38),'greta_dance',SCENES),history==='dance'?{}:history==='rhythm'?{offer:'rhythm',invite:'outside'}:{offer:'leave'});
 s=finish(openScene(until(s,43),'greta_4',SCENES));
 if(['sketch','midpoint','dance'].includes(history))s=finish(openScene(until(s,44),'greta_sketch',SCENES),{history:'present',keep:'hers',hand_offer:'company'});
 s=finish(openScene(until(s,48),'greta_5',SCENES));s=until(s,52);if(night)s=activity(s,'rest');
 assert.equal(s.confrontation,'exhausting');assert.ok(s.institution);return openScene(s,'greta_6',SCENES);
}
for(const history of ['skipped','midpoint','company','dance','rhythm','declined','sketch'])for(const night of [false,true])test(`Gréta finale: ${history}/${night?'night':'day'} recalls only witnessed moments and preserves endings`,()=>{
 const initial=finale(history,night),queue=[{s:initial,path:[] as string[]}];let endings=0;
 while(queue.length){
  const {s,path}=queue.pop()!,decoded=decodeSave(encodeSave(s),SCENES);assert.equal(decoded.status,'ok');if(decoded.status!=='ok')throw Error('Save');
  const en=gameView(s,'en'),hu=gameView(s,'hu'),l=currentLine(s,SCENES)!;
  assert.deepEqual(en,gameView(decoded.state,'en'));assert.notEqual(en.scene!.text,hu.scene!.text);
  assert.deepEqual(en.actions.map(a=>a.action),hu.actions.map(a=>a.action));
  assert.deepEqual(s.decisions,initial.decisions);assert.deepEqual(s.evidence,initial.evidence);
  const ids=l.choices?.map(c=>c.id)??['continue'];assert.ok(ids.length<=4);
  if(l.id==='future')assert.equal(ids.includes('remember'),history!=='skipped');
  if(l.id==='history'){
   assert.equal(ids.includes('sketch'),Boolean(initial.completed.greta_sketch));
   assert.equal(ids.includes('dance'),Boolean(initial.decisions.greta_dance_steps||initial.decisions.greta_dance_rhythm));
   assert.equal(ids.includes('private'),Boolean(initial.decisions.greta_midpoint_intimate||initial.decisions.greta_dance_intimate));
   assert.equal(ids.includes('company'),Boolean(initial.completed.greta_company));
  }
  if(l.id==='intimacy'){
   const previous=Boolean(initial.decisions.greta_midpoint_intimate||initial.decisions.greta_dance_intimate);
   assert.equal(ids.includes('again'),previous);assert.equal(ids.includes('intimate'),!previous);
   assert.deepEqual(applyChoice(s,previous?'intimate':'again',SCENES),s);
  }
  if(path.includes('withdraw')){assert.equal(sceneStage(s,SCENES.greta_6).proximity,'apart');assert.ok(!path.includes('remember'));}
  for(const id of ids){
   const n=applyChoice(decoded.state,id,SCENES),p=[...path,id];
   if(n.phase==='scene')queue.push({s:n,path:p});else{
    endings++;assert.equal(n.slot,initial.slot+1);assert.equal(n.week,52);assert.equal(decodeSave(encodeSave(n),SCENES).status,'ok');
    assert.equal(Boolean(n.decisions.greta_withdraw),p.includes('withdraw'));
    assert.equal(Boolean(n.decisions.greta_aftermath),!p.includes('withdraw'));
    assert.equal(n.bonds.marton_greta-initial.bonds.marton_greta,p.includes('withdraw')?0:6);
    assert.deepEqual(n.evidence,initial.evidence);
    let end=n;while(end.phase==='planner')end=activity(end,'rest');end=nextWeek(end,SCENES);
    assert.equal(gameView(end,'en').ending!.relationship,p.includes('withdraw')?'estranged':'greta');
   }
  }
 }
 assert.ok(endings>=15);
});

test('0.9.15 final-meeting cursors remain loadable after additive effect-free branches',()=>{
 const old=structuredClone(SCENES.greta_6);
 const added=new Set(['history','sketch_memory','sketch_reply','dance_memory','dance_reply','private_memory','private_reply','company_memory','company_reply','again']);
 old.lines=old.lines.filter(l=>!added.has(l.id));
 old.lines.find(l=>l.id==='future')!.choices=old.lines.find(l=>l.id==='future')!.choices!.filter(c=>c.id!=='remember');
 const intimacy=old.lines.find(l=>l.id==='intimacy')!;
 intimacy.choices=intimacy.choices!.filter(c=>c.id!=='again');delete intimacy.choices.find(c=>c.id==='intimate')!.requires;
 const registry={...SCENES,greta_6:old};
 for(const history of ['skipped','midpoint','dance']){
  const queue=[finale(history,false)];let checked=0;
  while(queue.length){
   const s=queue.pop()!;assert.equal(decodeSave(encodeSave(s),SCENES).status,'ok');checked++;
   const l=currentLine(s,registry)!;
   for(const c of l.choices??[{id:'continue'}]){const n=applyChoice(s,c.id,registry);if(n.phase==='scene')queue.push(n);else assert.equal(decodeSave(encodeSave(n),SCENES).status,'ok');}
  }
  assert.ok(checked>40);
 }
});
