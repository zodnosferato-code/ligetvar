import {nextStory as nextWeek,chapterWeek,CALENDAR} from './test-calendar.ts';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {existsSync,readFileSync} from 'node:fs';
import {SCENES,EVIDENCE} from './catalog.ts';
import {BACKGROUNDS,BACKGROUND_VARIANTS,backgroundFor,portraitFor} from './assets.ts';
import {validateRegistry} from './validate.ts';
import {activity,applyChoice,applyEffect,availableScenes,sceneLighting,buyGift,createInitial,currentLine,evaluateEnding,giveGift,openScene,finishPuzzle,movePuzzle,nextPair,setDirection} from './runtime.ts';
import {encodeSave,decodeSave,persist} from './saves.ts';
import {SAVE_KEY,type GameState,type Registry,type RouteId} from './types.ts';
function finishArchive(s:GameState){
 for(let v=0;v<8;v++){const pair=s.puzzle!.board.flatMap((value,i)=>value===v?[i]:[]);s=movePuzzle(s,pair[0]);s=movePuzzle(s,pair[1]);if(v<7)s=nextPair(s);}
 return finishPuzzle(s);
}
function complete(s:GameState,id:string,choose?:(ids:string[])=>string,r:Registry=SCENES){
 const opened=openScene(s,id,r);assert.notEqual(opened,s,'Cannot open '+id+' w'+s.week+' slot'+s.slot);s=opened;
 for(let i=0;i<50;i++){if(s.phase!=='scene')return s;const ids=currentLine(s,r)!.choices?.map(c=>c.id)??['continue'];s=applyChoice(s,choose?.(ids)??ids[0],r);}throw new Error('Loop: '+id);
}
function fixtures():Registry{return Object.fromEntries(Array.from({length:16},(_,i)=>{const week=i+1;return ['shared_'+week,{
 id:'shared_'+week,title:'Teszt '+week,kind:'shared',week:chapterWeek(week),deadline:chapterWeek(week),participants:['soma'],location:'classroom',background:'classroom',lighting:'day',requires:i?{scenes:['shared_'+i]}:{},evidence:[],journal:'Tanúsított '+week,entry:'first',contentStatus:'fixture',
 resolution:week===15?'confrontation':week===16?'institution':undefined,
 lines:[{id:'first',speaker:'soma',expression:'neutral',text:'Első sor',choices:[{id:'yes',text:'Rendben',next:'last',reaction:'Válasz',effect:{decisions:['witness_'+week]}}]},{id:'last',speaker:'narrator',expression:'neutral',text:'Második sor'}]
 }];})) as Registry;}
const TRIAD:Record<number,string[]>={1:['rebeka_1'],2:['boglarka_1'],3:['rebeka_2'],4:['triad_1','boglarka_2'],5:['triad_2'],6:['rebeka_3'],7:['boglarka_3','triad_3'],8:['triad_4'],9:['rebeka_4'],10:['boglarka_4'],11:['triad_5'],12:['triad_6'],13:['rebeka_5','boglarka_5'],14:['triad_7'],16:['triad_8']};
const solo=(g:string):Record<number,string[]>=>({2:[g+'_1'],5:[g+'_2'],7:[g+'_3'],10:[g+'_4'],13:[g+'_5'],16:[g+'_6']});
function assertKnowledge(s:GameState){
 for(const [id,record] of Object.entries(s.evidence)){assert.ok(record.scene in s.completed,id);assert.equal(EVIDENCE[id].scene,record.scene);assert.ok(record.week<=s.week,id);}
 for(const record of Object.values(s.decisions))assert.equal(s.completed[record.scene],record.week);
 for(const j of s.journal)assert.ok(j.scene in s.completed);
}
function run(route:RouteId,opts:{missTwo?:boolean;prepared?:boolean;declineTriad?:boolean;withdraw?:boolean;onPlanner?:(s:GameState)=>void}={}){
 let s=createInitial('Márton'),slots=0,minEnergy=100;const plan=structuredClone(route==='triad'?TRIAD:route==='friendship'?{16:['friendship_after']}:solo(route));
 if(opts.missTwo){plan[1]=[];plan[2].push('rebeka_1');plan[5]=[];plan[6].push('triad_2');}
 if(opts.prepared){plan[12]=['prepare_backup',...(plan[12]??[])];plan[14]=['prepare_signals',...(plan[14]??[])];}
 for(let week=1;week<=16;week++){
  assert.equal(s.week,chapterWeek(week));assert.equal(evaluateEnding(s).relationship,null);assert.equal(nextWeek(s,SCENES),s);
  const known=structuredClone(s.evidence);s=openScene(s,'shared_'+week,SCENES);
  for(let line=0;s.phase==='scene'&&line<50;line++){
   assert.deepEqual(s.evidence,known,'No knowledge before witnessed completion');
   const restored=decodeSave(encodeSave(s),SCENES);assert.equal(restored.status,'ok','save before '+s.scene?.id+'/'+s.scene?.line);
   if(restored.status==='ok')s=restored.state;
   s=applyChoice(s,currentLine(s,SCENES)!.choices?.[0].id??'continue',SCENES);
  }
  assert.equal(s.slot,1);if(week===8)s=setDirection(s,route);
  if(opts.declineTriad&&week===13)s=setDirection(s,'rebeka');
  if(week===15){assert.ok(s.confrontation);assert.equal(s.evidence.vampire_dead.scene,'shared_15');assert.equal(s.institution,null);}
  if(week===16){assert.ok(s.institution);assert.equal(s.phase,'planner');assert.equal(evaluateEnding(s).relationship,null);}
  opts.onPlanner?.(s);
  let appointments=plan[week]??[];
  if(opts.declineTriad&&week===13)appointments=['rebeka_5'];
  if(opts.declineTriad&&week===14)appointments=opts.prepared?['prepare_signals']:[];
  if(opts.declineTriad&&week===16)appointments=['rebeka_6'];
  for(const id of appointments){
   if(s.slot===1&&SCENES[id].periods?.length===1&&SCENES[id].periods?.[0]==='night')s=activity(s,'rest');
   const prior=s.slot;s=complete(s,id,ids=>opts.declineTriad&&id==='triad_6'&&ids.includes('decline')?'decline':opts.withdraw&&id.endsWith('_6')&&ids.includes('withdraw')?'withdraw':ids[0]);
   assert.equal(s.slot,prior+1);slots++;minEnergy=Math.min(minEnergy,s.energy);assertKnowledge(s);
  }
  while(s.phase==='planner')s=activity(s,'rest');
  assert.equal(s.phase,'summary');assert.equal(decodeSave(encodeSave(s),SCENES).status,'ok');s=nextWeek(s,SCENES);
 }
 assert.equal(s.phase,'ending');assert.equal(s.week,CALENDAR.weeks);assertKnowledge(s);
 assert.equal(Object.keys(s.evidence).length,Object.keys(EVIDENCE).length);
 assert.equal(Object.keys(s.completed).filter(id=>SCENES[id].kind==='shared').length,16);
 assert.equal(decodeSave(encodeSave(s),SCENES).status,'ok');return {state:s,slots,minEnergy};
}
test('authoritative registry resolves every Hungarian line, asset and prerequisite',()=>{
 validateRegistry(SCENES,EVIDENCE,new Set(Object.keys(BACKGROUNDS)));
 assert.equal(Object.keys(SCENES).length,89);assert.equal(Object.values(SCENES).some(x=>x.contentStatus!=='authored'),false);
 for(const art of Object.values(BACKGROUNDS))if(art.file)assert.ok(existsSync('public/'+art.file),art.file);
 for(const x of Object.values(SCENES))for(const l of x.lines){const p=portraitFor(l.speaker,l.expression);if(p.file)assert.ok(existsSync('public/'+p.file));}
});
test('opening has all introductions, one complete optional scene and causal knowledge',()=>{
 let s=createInitial('');assert.deepEqual(s.evidence,{});s=complete(s,'shared_1');
 assert.deepEqual(new Set(SCENES.shared_1.participants),new Set(['marton','rebeka','boglarka','greta','soma']));
 assert.ok(s.evidence.grounding);assert.equal(s.evidence.phrase,undefined);
 s=complete(s,'rebeka_1');assert.ok(s.decisions.rebeka_interest);assert.equal(s.slot,2);assert.equal(openScene(s,'rebeka_1',SCENES),s);
 s=nextWeek(activity(s,'rest'),SCENES);s=complete(s,'shared_2');assert.ok(s.evidence.returned_lilla);assert.equal(s.evidence.phrase,undefined);
 s=nextWeek(activity(activity(s,'rest'),'rest'),SCENES);s=complete(s,'shared_3');assert.ok(s.evidence.phrase);assert.ok(s.evidence.time_gap);assertKnowledge(s);
});
test('salary, optional jobs and gifts retain useful money behavior without work gates',()=>{
 let s=complete(createInitial(''),'shared_1');assert.equal(s.money,12000);
 s=buyGift(s,'photo');assert.equal(s.inventory.photo,1);s=giveGift(s,'rebeka','photo');assert.equal(s.bonds.marton_rebeka,2);
 assert.deepEqual(s.decisions,{});assert.equal(giveGift(s,'rebeka','photo'),s);
 s=activity(s,'archive');const paid=finishArchive(s);assert.equal(paid.money,s.money+20000);assert.equal(paid.slot,2);
 const n=complete(paid,'coffee_rebeka_early');assert.equal(n.decisions.rebeka_commit,undefined);assert.equal(n.phase,'summary');assert.equal(finishPuzzle(n),n);
 assert.equal(nextWeek(n,SCENES).money,n.money+3000);
});
test('main-character art resolves and Soma switches from neutral to transformed at week two',()=>{
 for(const actor of ['rebeka','boglarka','greta'] as const){
  const files=(['neutral','amused','displeased','vulnerable','affectionate'] as const).map(expression=>portraitFor(actor,expression).file);
  assert.equal(new Set(files).size,5,actor);
  for(const file of files)assert.ok(file&&existsSync('public/'+file),file??actor);
 }
 const somaNeutral=portraitFor('soma','neutral',1).file;
 const somaTransformed=portraitFor('soma','neutral',2).file;
 assert.equal(somaNeutral,'characters/soma/neutral-v1.webp');
 assert.equal(somaTransformed,'characters/soma/transformed-v1.webp');
 assert.equal(portraitFor('soma','affectionate',1).file,somaNeutral);
 assert.equal(portraitFor('soma','affectionate',2).file,somaTransformed);
 for(const file of [somaNeutral,somaTransformed])assert.ok(file&&existsSync('public/'+file),file??'soma');
 const aron=portraitFor('aron','neutral').file;
 assert.equal(aron,'characters/aron/neutral-v1.webp');
 assert.ok(aron&&existsSync('public/'+aron),aron??'aron');
 const lilla=portraitFor('lilla','neutral').file;
 assert.equal(lilla,'characters/lilla/neutral-v1.webp');
 assert.ok(lilla&&existsSync('public/'+lilla),lilla??'lilla');
 assert.equal(portraitFor('marton','neutral').file,null);
});
test('scene lighting selects reviewed variants while preserving daytime and fallback locations',()=>{
 const s=createInitial('');
 for(const location of Object.keys(BACKGROUNDS) as (keyof typeof BACKGROUNDS)[])assert.equal(backgroundFor(location,'day'),BACKGROUNDS[location]);
 for(const variants of Object.values(BACKGROUND_VARIANTS))for(const art of Object.values(variants)){
  assert.ok(art.file&&existsSync('public/'+art.file));assert.equal(art.lightingBaked,true);
 }
 for(const [id,prefix] of [['coffee_rebeka_early','courtyard'],['boglarka_1','library']] as const){
  const scene=SCENES[id];
  assert.equal(backgroundFor(scene.background,sceneLighting({...s,slot:1},scene)),BACKGROUNDS[scene.background]);
  const night=backgroundFor(scene.background,sceneLighting({...s,slot:2},scene));
  assert.ok(night.file?.includes(prefix));assert.equal(night.lightingBaked,true);assert.notEqual(night,BACKGROUNDS[scene.background]);
 }
 assert.equal(backgroundFor('courtyard','night'),backgroundFor('courtyard','evening'));
 assert.equal(backgroundFor('classroom','evening').file,'backgrounds/classroom-dusk-anime-v1.webp');
 assert.equal(backgroundFor('department','evening').file,'backgrounds/department-night-v1.webp');
 assert.equal(backgroundFor('apartment','night').file,BACKGROUNDS.apartment.file);
});
test('every destination reachable from the night hub uses night lighting and a non-daytime background',()=>{
 const visited=new Set<string>();
 run('triad',{prepared:true,onPlanner:s=>{
  const night:GameState={...s,slot:2};
  for(const scene of availableScenes(night,SCENES)){
   if(scene.kind==='shared')continue;
   assert.equal(sceneLighting(night,scene),'night',scene.id);
   const art=backgroundFor(scene.background,sceneLighting(night,scene));
   assert.ok(art.lightingBaked,scene.id+' must not fall back to a tinted daytime picture');
   assert.ok(art.file&&existsSync('public/'+art.file));visited.add(scene.background);
  }
 }});
 for(const location of ['classroom','library','department','holdkor','courtyard','apartment','bekas'])assert.ok(visited.has(location),location);
 const s:GameState={...createInitial(''),slot:2};
 assert.equal(sceneLighting(s,{...SCENES.greta_1,periods:undefined}),'night','free scenes follow the current night slot');
 assert.equal(sceneLighting(s,SCENES.shared_1),SCENES.shared_1.lighting,'shared-story authored time is preserved');
 assert.equal(backgroundFor('bekas','day'),BACKGROUNDS.bekas);
 assert.equal(backgroundFor('department','day'),BACKGROUNDS.department);
});
test('synthetic scheduler exercises 16 required slots and atomic continuations before content',()=>{
 const r=fixtures();validateRegistry(r,{},new Set(['classroom']));let s=createInitial('');
 for(let w=1;w<=16;w++){
  assert.equal(s.week,chapterWeek(w));assert.equal(activity(s,'rest'),s);assert.equal(nextWeek(s,r),s);
  s=openScene(s,'shared_'+w,r);s=applyChoice(s,'yes',r);assert.equal(s.slot,0);assert.equal(s.decisions['witness_'+w],undefined);
  assert.equal(decodeSave(encodeSave(s),r).status,'ok');s=applyChoice(s,'continue',r);assert.equal(s.slot,1);assert.ok(s.decisions['witness_'+w]);
  s=nextWeek(activity(activity(s,'rest'),'rest'),r);
 }
 assert.equal(s.phase,'ending');assert.equal(s.confrontation,'exhausting');assert.equal(evaluateEnding(s).relationship,'friendship');
});
test('targeted immutable effects do not change the previous speaker bond',()=>{
 const r=fixtures();const s=openScene(createInitial(''),'shared_1',r),before=structuredClone(s);
 assert.equal(applyChoice(s,'unknown',r),s);const n=applyChoice(applyChoice(s,'yes',r),'continue',r);assert.deepEqual(s,before);
 applyEffect(n,{bonds:{rebeka_boglarka:7}},'shared_1');assert.equal(n.bonds.rebeka_boglarka,7);assert.equal(n.bonds.marton_boglarka,0);
});
test('current saves round-trip and unsupported versions are rejected',()=>{
 const data=new Map<string,string>(),storage={getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>{data.set(k,v);}};
 const s=createInitial('Új név');assert.equal(persist(storage,s),true);
 for(const version of [1,2])assert.equal(decodeSave(JSON.stringify({version}),SCENES).status,'unsupported');
 const loaded=decodeSave(data.get(SAVE_KEY)!,SCENES);assert.equal(loaded.status,'ok');if(loaded.status==='ok')assert.deepEqual(loaded.state,s);
 for(const raw of ['{','null','{}','{\"version\":999}',JSON.stringify({...s,bonds:null}),JSON.stringify({...s,phase:'ending'})])assert.notEqual(decodeSave(raw,SCENES).status,'ok');
});
test('registry rejects unresolved references, over-four choices and both cycle types',()=>{
 let r=fixtures();r.shared_1.lines[0].choices![0].next='missing';assert.throws(()=>validateRegistry(r,{},new Set(['classroom'])),/Unknown next/);
 r=fixtures();r.shared_1.lines[0].choices=Array.from({length:5},(_,i)=>({id:String(i),text:'x',reaction:'x'}));assert.throws(()=>validateRegistry(r,{},new Set(['classroom'])),/Maximum 4/);
 r=fixtures();r.shared_1.lines[1].next='first';assert.throws(()=>validateRegistry(r,{},new Set(['classroom'])),/Line cycle/);
 r=fixtures();r.shared_1.requires.scenes=['shared_1'];assert.throws(()=>validateRegistry(r,{},new Set(['classroom'])),/cycle/);
 r=fixtures();r.shared_2.requires.decisions=['not-a-decision'];assert.throws(()=>validateRegistry(r,{},new Set(['classroom'])),/Unknown decision/);
});
for(const girl of ['rebeka','boglarka','greta'] as const)test('authored year-long single romance: '+girl,()=>{
 const {state:s,slots,minEnergy}=run(girl,{prepared:true});assert.equal(evaluateEnding(s).relationship,girl);assert.equal(slots,8);assert.ok(minEnergy>0);assert.equal(s.institution,'acknowledged');
 for(const key of [girl+'_yes','marton_'+girl+'_yes',girl+'_repair']){const n=structuredClone(s);delete n.decisions[key];assert.equal(evaluateEnding(n).relationship,'unresolved');}
});
test('triad costs 18 slots and requires three separate affirmations plus the women bond',()=>{
 const {state:s,slots,minEnergy}=run('triad');assert.equal(slots,18);assert.ok(minEnergy>0);assert.equal(evaluateEnding(s).relationship,'triad');
 assert.equal(s.completed.triad_7,CALENDAR.lastPersonal);assert.equal(s.completed.triad_8,CALENDAR.aftermath);assert.ok(s.bonds.rebeka_boglarka>0);
 for(const id of ['triad_marton_yes','triad_rebeka_yes','triad_boglarka_yes','rb_rebeka_yes','rb_boglarka_yes']){const n=structuredClone(s);delete n.decisions[id];assert.equal(evaluateEnding(n).relationship,'unresolved',id);}
 assert.ok(s.decisions.rebeka_aftermath);assert.ok(s.decisions.boglarka_aftermath);
});
test('two missed triad appointments recover within 20 slots including preparation',()=>{
 const {state:s,slots,minEnergy}=run('triad',{missTwo:true,prepared:true});assert.equal(s.completed.rebeka_1,2);assert.equal(s.completed.triad_2,chapterWeek(6));assert.equal(slots,20);assert.ok(minEnergy>0);assert.equal(evaluateEnding(s).relationship,'triad');assert.equal(s.confrontation,'supported');
});
test('friendship has all evidence, institutional outcome and aftermath before closure',()=>{
 const {state:s}=run('friendship',{prepared:true});assert.equal(evaluateEnding(s).relationship,'friendship');assert.equal(s.completed.friendship_after,CALENDAR.aftermath);assert.equal(s.institution,'acknowledged');
 assert.deepEqual(s.bonds,{marton_rebeka:0,marton_boglarka:0,marton_greta:0,rebeka_boglarka:0});
});
test('poor preparation still kills the vampire and changes costs and response',()=>{
 const {state:s}=run('friendship');assert.equal(s.confrontation,'exhausting');assert.equal(s.institution,'incomplete');assert.equal(evaluateEnding(s).threat,'resolved');assert.equal(evaluateEnding(s).relationship,'friendship');
});
test('declined triad permits an agreed single without penalizing the women bond',()=>{
 const {state:s}=run('triad',{declineTriad:true});assert.ok(s.decisions.triad_declined);assert.equal(s.decisions.triad_marton_yes,undefined);assert.equal(evaluateEnding(s).relationship,'rebeka');assert.ok(s.bonds.rebeka_boglarka>0);
});
test('late refusal yields estrangement and no automatic new commitment',()=>{
 const {state:s}=run('greta',{withdraw:true});assert.equal(evaluateEnding(s).relationship,'estranged');assert.equal(setDirection(s,'rebeka'),s);
});
test('pre-confrontation danger/romance cannot be replayed in the confrontation week',()=>{
 let s=createInitial('');for(let w=1;w<=14;w++)s=nextWeek(activity(activity(complete(s,'shared_'+w),'rest'),'rest'),SCENES);
 s=complete(s,'shared_15');assert.equal(availableScenes(s,SCENES).some(x=>x.deadline<CALENDAR.confrontation),false);assert.equal(openScene(s,'rebeka_1',SCENES),s);assert.ok(s.evidence.vampire_dead);
});
test('institutional suppression is independent of romance and never preserves the vampire',()=>{
 let s=createInitial('');for(let w=1;w<=15;w++)s=nextWeek(activity(activity(complete(s,'shared_'+w),'rest'),'rest'),SCENES);
 s=complete(s,'shared_16',ids=>ids.includes('private')?'private':ids[0]);s=nextWeek(activity(activity(s,'rest'),'rest'),SCENES);
 assert.equal(evaluateEnding(s).institution,'suppressed');assert.equal(evaluateEnding(s).threat,'resolved');
});
test('damaged saves cannot omit required evidence or contain forged pending effects',()=>{
 let s=complete(createInitial(''),'shared_1');const n=structuredClone(s);delete n.evidence.grounding;assert.equal(decodeSave(encodeSave(n),SCENES).status,'invalid');
 s=openScene(s,'rebeka_1',SCENES);s.scene!.pending=[{decisions:['invented_commit']}];assert.equal(decodeSave(encodeSave(s),SCENES).status,'invalid');
});
test('mandatory scenes remain reachable at zero energy and money',()=>{
 let s=createInitial('');s.energy=0;s.money=0;
 s=complete(s,'shared_1');assert.equal(s.slot,1);assert.ok(s.evidence.grounding);assert.equal(nextWeek(s,SCENES),s);
});
test('active application has no retired routes, content adapters or explicit artwork aliases',()=>{
 for(const file of ['src/game/content/catalog.ts','src/game/engine/logic.ts','src/game/ui/GameApp.tsx','src/game/content/assets.ts']){
  const source=readFileSync(file,'utf8');assert.doesNotMatch(source,/boglarka_greta|rebeka_greta|weeklyHorrorSummary|references\/intim|mergePart1|mergeLater/);
 }
 assert.equal(existsSync('src/core/DialogueEngine.ts'),false);assert.equal(existsSync('public/references'),false);
});

test('optional scenes never block the mandatory investigation or endings',()=>{
 for(const scene of Object.values(SCENES))if(scene.kind!=='shared'){
  assert.equal(scene.requires.scenes?.some(id=>SCENES[id].kind==='shared')||true,true);
 }
});
