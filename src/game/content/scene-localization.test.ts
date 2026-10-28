import {nextStory as nextWeek} from './test-calendar.ts';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SCENES} from './catalog.ts';
import {catalogs,translate,type MessageKey} from './localization.ts';
import {sceneTitle,presentLine} from './scene-localization.ts';
import {investigationHu} from './locales/investigation.hu.ts';
import {openingHu} from './locales/opening.hu.ts';
import {createInitial,openScene,applyChoice,activity} from './runtime.ts';
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
  assert.equal(line.text,catalogs.hu[line.textKey]);
  const en=presentLine(line,'en');assert.notEqual(en.text,line.text,line.id);
  for(const choice of line.choices??[]){
   assert.ok(choice.textKey,choice.id);used.add(choice.textKey);
   assert.equal(choice.text,translate(choice.textKey));
   assert.equal(en.choices!.find(c=>c.id===choice.id)!.text,translate(choice.textKey,{playerName:'Reader'},'en'));
  }
 }
 assert.deepEqual([...used].sort(),Object.keys(openingHu).filter(k=>!k.includes('.reaction.')&&!k.endsWith('.journal')&&!k.endsWith('.knowledge')).sort());
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
   assert.equal(line.text,catalogs.hu[line.textKey]);
   assert.notEqual(presentLine(line,'en').text,line.text);
   for(const choice of line.choices??[]){
    assert.ok(choice.textKey);used.add(choice.textKey);
    assert.equal(choice.text,translate(choice.textKey));
    assert.notEqual(translate(choice.textKey,{playerName:'Reader'},'en'),choice.text);
   }
  }
 }
 assert.deepEqual([...used].sort(),Object.keys(investigationHu).filter(k=>!k.includes('.reaction.')&&!k.endsWith('.journal')&&!k.includes('.knowledge')&&!k.includes('.stage.')).sort());
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

for(const branch of ['demonstrate','observe'])for(const locale of ['en','hu'] as const)
 test(`pilot ${branch} ${locale}: literal chosen name, references, journal and resume`,()=>{
  const name='Álex $& {playerName} <b>';
  let state=openScene(createInitial(name),'shared_1',SCENES),guard=60;
  const rendered:string[]=[];
  while(state.phase==='scene'&&guard--){
   const before=encodeSave(state),view=gameView(state,locale);
   rendered.push(view.scene!.text,view.lastNote,...view.actions.map(a=>a.label));
   assert.ok(!view.scene!.text.includes('Márton'));
   if(view.scene!.speakerId==='marton')assert.equal(view.scene!.speaker,name);
   assert.equal(encodeSave(state),before);
   const restored=decodeSave(before,SCENES);assert.equal(restored.status,'ok');
   if(restored.status!=='ok')throw Error('resume');
   assert.deepEqual(gameView(restored.state,locale),view);
   assert.deepEqual(gameView(restored.state,locale==='en'?'hu':'en').actions.map(a=>a.action),view.actions.map(a=>a.action));
   state=applyChoice(restored.state,view.actions.some(a=>a.action.type==='choice'&&a.action.id===branch)?branch:'continue',SCENES);
  }
  assert.ok(guard>0);assert.ok(rendered[0].includes(name));
  if(branch==='demonstrate')assert.ok(rendered.some(text=>text.includes('offer, '+name)||text.includes('ajánlat, '+name)));
  assert.equal(state.journal[0].text,'@message:scene.opening.journal');
  const view=gameView(state,locale);
  assert.ok(view.journal[0].text.includes(name));assert.ok(!view.journal[0].text.includes('@message:'));
  assert.ok(!view.evidence[0].text.includes('@message:'));
  assert.deepEqual(state.bonds,createInitial(name).bonds);assert.deepEqual(state.decisions,{});
  assert.deepEqual(Object.keys(state.evidence),['grounding']);
  const old=JSON.parse(encodeSave(state));old.contentCompatibilityVersion=3;
  assert.equal(decodeSave(JSON.stringify(old),SCENES).status,'unsupported');
  const summary={...state,slot:3 as const,phase:'summary' as const};
  assert.equal(gameView(summary,locale).recap![0].text,view.journal[0].text);
 });

test('unknown persisted message references are rejected before rendering',()=>{
 const state=createInitial('Reader');
 state.lastNote='@message:scene.opening.unknown';
 assert.equal(decodeSave(encodeSave(state),SCENES).status,'invalid');
});

for(const contact of ['ask','space'])for(const interview of ['listen','timeline'])
 test(`opening continuity ${contact}/${interview}: name, staging and earned knowledge`,()=>{
  const name='Álex $& {playerName}';
  let state=createInitial(name);
  for(let week=1;week<=3;week++){
   const id='shared_'+week,branch=week===1?'observe':week===2?contact:interview;
   state=openScene(state,id,SCENES);let guard=80;
   while(state.phase==='scene'&&guard--){
    const raw=encodeSave(state),en=gameView(state,'en'),hu=gameView(state,'hu');
    assert.equal(encodeSave(state),raw);
    assert.ok(!en.scene!.text.includes('Márton'));
    assert.ok(!hu.scene!.text.includes('Márton'));
    assert.ok(!en.scene!.text.includes('@message:'));
    assert.ok(!en.lastNote.includes('@message:'));
    if(week===2){
     assert.ok(!en.assets.some(a=>a.role==='portrait'&&a.file?.includes('/soma/')));
     assert.ok(!en.scene!.staging.participants.includes('soma'));
     assert.equal(state.evidence.returned_lilla,undefined);
    }
    if(week===3){assert.equal(state.evidence.phrase,undefined);assert.equal(state.evidence.time_gap,undefined);}
    if(week===2&&state.scene!.line==='line_6'||week===3&&state.scene!.line==='line_0'){
     assert.ok(en.scene!.text.includes(name));assert.ok(hu.scene!.text.includes(name));
    }
    const restored=decodeSave(raw,SCENES);assert.equal(restored.status,'ok');
    if(restored.status!=='ok')throw Error('resume');
    assert.deepEqual(gameView(restored.state,'en'),en);
    const line=SCENES[id].lines.find(l=>l.id===state.scene!.line)!;
    state=applyChoice(restored.state,line.choices?.length?branch:'continue',SCENES);
   }
   assert.ok(guard>0);assert.equal(state.slot,1);
   assert.ok(gameView(state,'en').journal.every(j=>!j.text.includes('@message:')));
   if(week<3)state=nextWeek(activity(activity(state,'rest'),'rest'),SCENES);
  }
  assert.deepEqual(Object.keys(state.evidence).sort(),['grounding','phrase','returned_lilla','time_gap']);
  assert.deepEqual(state.bonds,createInitial(name).bonds);assert.deepEqual(state.decisions,{});
  state=nextWeek(activity(activity(state,'rest'),'rest'),SCENES);
  assert.equal(openScene(state,'shared_4',SCENES).scene?.id,'shared_4');
 });

test('pre-continuation content saves require a fresh semester',()=>{
 const saved=JSON.parse(encodeSave(createInitial('Reader')));saved.contentCompatibilityVersion=4;
 const result=decodeSave(JSON.stringify(saved),SCENES);
 assert.equal(result.status,'unsupported');
 if(result.status==='unsupported')assert.equal(result.reason,'content');
});
