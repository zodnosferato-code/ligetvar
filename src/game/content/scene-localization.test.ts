import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SCENES} from './catalog.ts';
import {catalogs,translate,type MessageKey} from './localization.ts';
import {sceneTitle,presentLine} from './scene-localization.ts';
import {openingHu} from './locales/opening.hu.ts';
import {createInitial,openScene,applyChoice} from './runtime.ts';
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
 const scene=SCENES.shared_2,source=JSON.stringify(SCENES);
 assert.equal(sceneTitle(scene,'en'),scene.title);
 assert.equal(presentLine(scene.lines[0],'en').text,scene.lines[0].text);
 for(const line of SCENES.shared_1.lines)presentLine(line,'en');
 assert.equal(JSON.stringify(SCENES),source);
});
