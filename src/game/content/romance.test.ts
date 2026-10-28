import {nextStory as nextWeek} from './test-calendar.ts';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {SCENES} from './catalog.ts';
import {encodeSave,decodeSave} from './saves.ts';
import {activity,applyChoice,createInitial,currentLine,evaluateEnding,openScene,setDirection} from './runtime.ts';
import type {GameState,GirlId,RouteId} from './types.ts';
const triadPlan:Record<number,string[]>={1:['rebeka_1'],2:['boglarka_1'],3:['rebeka_2'],4:['triad_1','boglarka_2'],5:['triad_2'],6:['rebeka_3'],7:['boglarka_3','triad_3'],8:['triad_4'],9:['rebeka_4'],10:['boglarka_4'],11:['triad_5'],12:['triad_6'],13:['rebeka_5','boglarka_5'],14:['triad_7'],16:['triad_8']};
type Picker=(scene:string,line:string,ids:string[])=>string;
function finish(s:GameState,pick?:Picker):GameState{
 for(let i=0;i<150;i++){
  if(s.phase!=='scene')return s;
  const l=currentLine(s,SCENES)!;const ids=l.choices?.map(c=>c.id)??['continue'];
  s=applyChoice(s,pick?.(s.scene!.id,l.id,ids)??ids[0],SCENES);
 }
 throw new Error('Scene did not terminate');
}
function campaign(route:RouteId,pick?:Picker,before?:(s:GameState,id:string)=>void){
 const plan=route==='triad'?triadPlan:{2:[route+'_1'],5:[route+'_2'],7:[route+'_3'],10:[route+'_4'],13:[route+'_5'],16:[route+'_6']} as Record<number,string[]>;
 let s=createInitial('Márton');
 for(let w=1;w<=16;w++){
  s=finish(openScene(s,'shared_'+w,SCENES));
  if(w===8)s=setDirection(s,route);
  for(const id of plan[w]??[]){
   if(s.slot===1&&SCENES[id].periods?.[0]==='night'&&SCENES[id].periods?.length===1)s=activity(s,'rest');
   before?.(s,id);const opened=openScene(s,id,SCENES);assert.notEqual(opened,s,id);s=finish(opened,pick);
  }
  while(s.phase==='planner')s=activity(s,'rest');
  s=nextWeek(s,SCENES);
 }
 assert.equal(s.phase,'ending');return s;
}
for(const girl of ['rebeka','boglarka','greta'] as GirlId[])test(girl+': slower physical pace preserves full romance and equal bond',()=>{
 const normal=campaign(girl);
 const slow=campaign(girl,(_s,line,ids)=>line==='romance_closeness'?'slow_touch':ids[0]);
 assert.equal(evaluateEnding(normal).relationship,girl);assert.equal(evaluateEnding(slow).relationship,girl);
 assert.equal(normal.bonds['marton_'+girl as keyof typeof normal.bonds],slow.bonds['marton_'+girl as keyof typeof slow.bonds]);
 assert.ok(slow.decisions[girl+'_date_slow']);assert.ok(slow.decisions[girl+'_invitation']);
 assert.equal(slow.decisions[girl+'_withdraw'],undefined);
});
test('every new romantic branch saves, resumes and completes atomically in one slot',()=>{
 const starts=new Map<string,GameState>();
 for(const route of ['rebeka','boglarka','greta','triad'] as const)campaign(route,undefined,(s,id)=>{if(id==='rebeka_6'||SCENES[id].lines.some(l=>l.id.startsWith('romance_')))starts.set(id,s);});
 assert.equal(starts.size,19);
 for(const [id,start] of starts){
  const pending=[openScene(start,id,SCENES)];let terminals=0;
  while(pending.length){
   const s=pending.pop()!;
   assert.equal(s.slot,start.slot);assert.deepEqual(s.decisions,start.decisions,'no decisions before completion: '+id);
   const decoded=decodeSave(encodeSave(s),SCENES);assert.equal(decoded.status,'ok',id+'/'+s.scene?.line);
   if(decoded.status!=='ok')throw new Error('Save rejected');
   const l=currentLine(s,SCENES)!;
   for(const choice of l.choices?.map(c=>c.id)??['continue']){
    const n=applyChoice(decoded.state,choice,SCENES);
    if(n.phase==='scene')pending.push(n);
    else {terminals++;assert.equal(n.slot,start.slot+1);assert.ok(n.completed[id]);assert.equal(n.journal.length,start.journal.length+1);assert.equal(decodeSave(encodeSave(n),SCENES).status,'ok');}
   }
  }
  assert.ok(terminals>=(SCENES[id].lines.some(l=>l.choices)?2:1),id+' completes each kind of branch');
 }
});
test('romantic memories appear only after their witnessed scene, with unconditional alternatives',()=>{
 let sawCallback=false;
 campaign('rebeka',undefined,(s,id)=>{
  if(id!=='rebeka_3')return;
  const opened=openScene(s,id,SCENES);opened.scene!.line='romance_date_topic';
  assert.ok(currentLine(opened,SCENES)!.choices!.some(c=>c.id==='callback'));
  const without=structuredClone(opened);delete without.decisions.rebeka_unpolished;
  assert.ok(!currentLine(without,SCENES)!.choices!.some(c=>c.id==='callback'));
  assert.ok(currentLine(without,SCENES)!.choices!.length>=2);
  assert.equal(applyChoice(without,'callback',SCENES),without);sawCallback=true;
 });
 assert.ok(sawCallback);
});

test('naming insecurity on the shared evening keeps the triad and all three affirmations',()=>{
 const s=campaign('triad',(_scene,line,ids)=>line==='romance_evening'?'honest':ids[0]);
 assert.equal(evaluateEnding(s).relationship,'triad');assert.ok(s.decisions.triad_named_insecurity);
 for(const actor of ['marton','rebeka','boglarka'])assert.ok(s.decisions['triad_'+actor+'_yes']);
});

// Exercise the new stage graph through real earned campaign states, not edited save cursors.
for(const girl of ['rebeka','boglarka','greta'] as const)test(girl+': private destination, local memory, kiss and goodbye share one saved activity',async()=>{
 const {gameView}=await import('./view.ts');
 const {sceneStage}=await import('./runtime.ts');
 let start:GameState|undefined;
 campaign(girl,undefined,(s,id)=>{if(id===girl+'_3')start=s;});
 assert.ok(start);
 function until(s:GameState,target:string,slow=false):GameState {
  for(let i=0;i<100;i++){
   assert.equal(s.phase,'scene');if(s.scene!.line===target)return s;
   const l=currentLine(s,SCENES)!;
   s=applyChoice(s,slow&&l.id==='romance_closeness'?'slow_touch':l.choices?.[0].id??'continue',SCENES);
  }
  throw new Error('Missing node '+target);
 }
 const opened=openScene(start,girl+'_3',SCENES);
 const destination=until(opened,'date_destination');
 assert.ok(currentLine(destination,SCENES)!.choices!.some(c=>c.id==='together'));
 assert.equal(destination.decisions[girl+'_invitation'],undefined,'local choices do not certify global decisions');
 const expected={rebeka:'holdkor',boglarka:'library',greta:'courtyard'}[girl];
 const privateState=until(applyChoice(destination,'quiet_place',SCENES),'date_private_choice');
 const decoded=decodeSave(encodeSave(privateState),SCENES);assert.equal(decoded.status,'ok');
 if(decoded.status!=='ok')throw new Error('Save rejected');
 assert.equal(sceneStage(decoded.state,SCENES[girl+'_3']).location,expected);
 assert.equal(gameView(decoded.state).scene!.staging.location,expected);
 assert.notEqual(gameView(decoded.state).assets[0].file,gameView(destination).assets[0].file);
 assert.equal(decoded.state.slot,start.slot);
 const kissed=applyChoice(decoded.state,'kiss',SCENES);
 assert.equal(gameView(kissed).scene!.staging.proximity,'close');
 const returned=until(kissed,'date_goodbye_0');
 assert.equal(sceneStage(returned,SCENES[girl+'_3']).location,SCENES[girl+'_3'].location);
 const done=finish(returned);
 assert.equal(done.slot,start.slot+1);assert.ok(done.decisions[girl+'_date_romantic_kiss']);
 assert.equal(done.journal.length,start.journal.length+1);
 const slowDestination=until(opened,'date_destination',true);
 assert.ok(!currentLine(slowDestination,SCENES)!.choices!.some(c=>c.id==='together'));
 assert.equal(applyChoice(slowDestination,'together',SCENES),slowDestination);
 const slowPrivate=until(applyChoice(slowDestination,'quiet_place',SCENES),'date_private_choice');
 assert.ok(!currentLine(slowPrivate,SCENES)!.choices!.some(c=>c.id==='kiss'));
 assert.equal(applyChoice(slowPrivate,'kiss',SCENES),slowPrivate);
 const slowDone=finish(slowPrivate);
 assert.equal(slowDone.decisions[girl+'_date_romantic_kiss'],undefined);
 assert.equal(slowDone.bonds['marton_'+girl as keyof typeof slowDone.bonds],done.bonds['marton_'+girl as keyof typeof done.bonds]);
 for(const choice of ['head_home','stay_outside']){
  const goodbye=applyChoice(destination,choice,SCENES);
  assert.equal(goodbye.scene!.line,'date_goodbye_0');
  assert.equal(finish(goodbye).slot,start.slot+1);
 }
 const invitation=until(opened,'line_4');
 const declined=applyChoice(invitation,'slow',SCENES);
 assert.equal(declined.scene!.line,'date_declined_0');
 assert.equal(finish(declined).decisions[girl+'_invitation'],undefined);
});
