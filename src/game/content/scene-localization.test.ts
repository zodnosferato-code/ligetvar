import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SCENES} from './catalog.ts';
import {catalogs,translate,type MessageKey} from './localization.ts';
import {sceneTitle,presentLine} from './scene-localization.ts';
import {investigationHu} from './locales/investigation.hu.ts';
import {openingHu} from './locales/opening.hu.ts';
import {createInitial,openScene,applyChoice,activity,nextWeek} from './runtime.ts';
import {gameView} from './view.ts';
import {encodeSave,decodeSave} from './saves.ts';

test('opening title, every line and both choices have complete catalog references',()=>{
 const scene=SCENES.shared_1,used=new Set<MessageKey>();
 assert.ok(scene.titleKey);used.add(scene.titleKey);
 assert.equal(sceneTitle(scene),scene.title);
 assert.equal(sceneTitle(scene,'en'),'The First Workshop');
 assert.equal(scene.lines.length,28);
 for(const line of scene.lines){
  assert.ok(line.textKey,line.id);used.add(line.textKey);
  assert.equal(line.text,translate(line.textKey));
  const en=presentLine(line,'en');assert.notEqual(en.text,line.text,line.id);
  for(const choice of line.choices??[]){
   assert.ok(choice.textKey,choice.id);used.add(choice.textKey);
   assert.equal(choice.text,translate(choice.textKey));
   assert.equal(en.choices!.find(c=>c.id===choice.id)!.text,translate(choice.textKey,{},'en'));
  }
 }
 assert.deepEqual([...used].sort(),Object.keys(openingHu).sort());
 for(const key of used)assert.ok(catalogs.en[key].trim());
});

for(const branch of ['demonstrate','observe'])test(`opening ${branch}: switching and save/resume at every line preserve gameplay`,()=>{
 let state=openScene(createInitial('Reader'),'shared_1',SCENES),guard=60,sawChoice=false;
 while(state.phase==='scene'&&guard--){
  const before=JSON.stringify(state),hu=gameView(state,'hu'),en=gameView(state,'en');
  assert.notEqual(en.scene!.text,hu.scene!.text);
  assert.equal(en.scene!.lineId,hu.scene!.lineId);
  assert.deepEqual(en.actions.map(a=>a.action),hu.actions.map(a=>a.action));
  assert.equal(JSON.stringify(state),before);
  assert.deepEqual(gameView(state,'hu'),hu);
  const restored=decodeSave(encodeSave(state),SCENES);assert.equal(restored.status,'ok');
  if(restored.status!=='ok')throw Error('Expected current save');
  assert.deepEqual(gameView(restored.state,'en'),en);
  const line=SCENES.shared_1.lines.find(l=>l.id===state.scene!.line)!;
  const id=line.choices?.length?branch:'continue';
  if(line.choices?.length){sawChoice=true;assert.notEqual(en.actions.find(a=>a.action.type==='choice'&&a.action.id===branch)!.label,hu.actions.find(a=>a.action.type==='choice'&&a.action.id===branch)!.label);}
  const next=applyChoice(state,id,SCENES);
  assert.notDeepEqual(next,state);
  assert.deepEqual(applyChoice(restored.state,id,SCENES),next);
  state=next;
 }
 assert.ok(guard>0);assert.ok(sawChoice);assert.equal(state.completed.shared_1,1);
 assert.equal(state.slot,1);assert.ok(state.evidence.grounding);
});

test('unextracted scenes retain source text and presentation never mutates the registry',()=>{
 const scene=SCENES.shared_4,source=JSON.stringify(SCENES);
 assert.equal(sceneTitle(scene,'en'),scene.title);
 assert.equal(presentLine(scene.lines[0],'en').text,scene.lines[0].text);
 for(const line of SCENES.shared_1.lines)presentLine(line,'en');
 assert.equal(JSON.stringify(SCENES),source);
});

test('weeks 2–3 have complete dialogue, title and choice references',()=>{
 const used=new Set<MessageKey>();
 for(const id of ['shared_2','shared_3']){
  const scene=SCENES[id];assert.ok(scene.titleKey);used.add(scene.titleKey);
  assert.notEqual(sceneTitle(scene,'en'),scene.title);
  for(const line of scene.lines){
   assert.ok(line.textKey,id+':'+line.id);used.add(line.textKey);
   assert.equal(line.text,translate(line.textKey));
   assert.notEqual(presentLine(line,'en').text,line.text);
   for(const choice of line.choices??[]){
    assert.ok(choice.textKey);used.add(choice.textKey);
    assert.equal(choice.text,translate(choice.textKey));
    assert.notEqual(translate(choice.textKey,{},'en'),choice.text);
   }
  }
 }
 assert.deepEqual([...used].sort(),Object.keys(investigationHu).sort());
});
for(const [id,branches] of [['shared_2',['ask','space']],['shared_3',['listen','timeline']]] as const)
 for(const branch of branches)test(id+' '+branch+': locale and resumed actions preserve gameplay',()=>{
  let state=createInitial('Reader');
  const target=id==='shared_2'?2:3;
  while(state.week<target){
   state=openScene(state,'shared_'+state.week,SCENES);
   let setupGuard=80;
   while(state.phase==='scene'&&setupGuard--){
    const line=SCENES[state.scene!.id].lines.find(l=>l.id===state.scene!.line)!;
    state=applyChoice(state,line.choices?.[0]?.id??'continue',SCENES);
   }
   assert.ok(setupGuard>0);
   state=nextWeek(activity(activity(state,'rest'),'rest'),SCENES);
  }
  state=openScene(state,id,SCENES);assert.equal(state.phase,'scene');
  let guard=80,sawChoice=false;
  while(state.phase==='scene'&&guard--){
   const source=JSON.stringify(state),hu=gameView(state,'hu'),en=gameView(state,'en');
   assert.notEqual(hu.scene!.text,en.scene!.text);
   assert.deepEqual(hu.actions.map(a=>a.action),en.actions.map(a=>a.action));
   assert.equal(JSON.stringify(state),source);
   const restored=decodeSave(encodeSave(state),SCENES);assert.equal(restored.status,'ok');
   if(restored.status!=='ok')throw Error('Expected current save');
   assert.deepEqual(gameView(restored.state,'en'),en);
   const line=SCENES[id].lines.find(l=>l.id===state.scene!.line)!;
   const choice=line.choices?.length?branch:'continue';if(line.choices?.length)sawChoice=true;
   const next=applyChoice(state,choice,SCENES);assert.notDeepEqual(next,state);
   assert.deepEqual(applyChoice(restored.state,choice,SCENES),next);state=next;
  }
  assert.ok(guard>0);assert.ok(sawChoice);assert.equal(state.completed[id],target);
 });
