import assert from 'node:assert/strict';
import {test} from 'node:test';
import {SCENES} from './catalog.ts';
import {viragScenes,viragEpilogue} from './virag.ts';
import {activity,applyChoice,createInitial,currentLine,nextWeek,openScene,evaluateEnding} from './runtime.ts';
import {decodeSave,encodeSave} from './saves.ts';
import {gameView} from './view.ts';
import {MOMENT_CLIPS,momentSource,validateClip} from './animations.ts';
import type {GameState} from './types.ts';
function finish(s:GameState,last=false){
 for(let i=0;s.phase==='scene'&&i<80;i++){const l=currentLine(s,SCENES)!;s=applyChoice(s,l.choices?(last?l.choices.at(-1)!:l.choices[0]).id:'continue',SCENES);}
 assert.notEqual(s.phase,'scene');return s;
}
function campaign(last=false,visit?:(s:GameState,id:string)=>void){
 let s=createInitial('Márton');
 for(let week=1;week<=16;week++){
  s=finish(openScene(s,'shared_'+week,SCENES));
  for(const scene of viragScenes.filter(x=>x.week===week)){
   visit?.(s,scene.id);const before=s;s=openScene(s,scene.id,SCENES);assert.notEqual(s,before,scene.id);s=finish(s,last);
  }
  while(s.phase==='planner')s=activity(s,'rest');s=nextWeek(s,SCENES);
 }
 assert.equal(evaluateEnding(s).threat,'resolved');return s;
}
test('Virág: every reachable branch saves/resumes and charges exactly one slot',()=>{
 const visited=new Set<string>();
 campaign(false,(start,id)=>{
  const queue=[openScene(start,id,SCENES)];
  while(queue.length){const state=queue.pop()!;const decoded=decodeSave(encodeSave(state),SCENES);assert.equal(decoded.status,'ok');if(decoded.status!=='ok')throw Error();
   const l=currentLine(state,SCENES)!;visited.add(id+'/'+l.id);assert.deepEqual(state.decisions,start.decisions);
   const view=gameView(state);assert.equal(view.scene?.lineId,l.id);
   if(l.moment){assert.equal(view.scene?.moment?.rendered,false);assert.equal(view.scene?.moment?.file,null);}
   for(const c of l.choices?.map(x=>x.id)??['continue']){const n=applyChoice(decoded.state,c,SCENES);assert.notEqual(n,state);if(n.phase==='scene')queue.push(n);else{assert.equal(n.slot,start.slot+1);assert.ok(n.completed[id]);assert.deepEqual(n.bonds,start.bonds);assert.equal(openScene(n,id,SCENES),n);assert.equal(decodeSave(encodeSave(n),SCENES).status,'ok');}}
  }
 });
 assert.equal(visited.size,viragScenes.reduce((n,x)=>n+x.lines.length,0));
});
test('Virág: repeated refusal preserves all eight chapters and successful cases without touch',()=>{
 const s=campaign(true);assert.ok(s.completed.virag_8);for(const key of ['virag_arm','virag_beside','virag_kissed','virag_cuddle','virag_future_date'])assert.equal(s.decisions[key],undefined);
 assert.ok(s.decisions.virag_future_declined);assert.match(viragEpilogue(s),/sikeresen lezárul/);
 assert.match(viragEpilogue(createInitial('')),/sikeresen lezárul/);
 const yes=campaign();assert.ok(yes.decisions.virag_kissed);assert.ok(yes.decisions.virag_cuddle);assert.ok(yes.decisions.virag_future_date);
 for(const scene of viragScenes)assert.deepEqual(scene.participants,['marton','virag']);
});
test('GIF-like moments require safe reviewed files, budgets and independent static posters',()=>{
 Object.values(MOMENT_CLIPS).forEach(c=>{validateClip(c);assert.equal(momentSource(c,false,false),null);});
 const clip={...MOMENT_CLIPS.virag_arm,status:'reviewed' as const,file:'animations/virag/arm.webp',poster:'animations/virag/arm-poster.webp',bytes:500000};validateClip(clip);
 assert.equal(momentSource(clip,false,false),clip.file);assert.equal(momentSource(clip,true,false),clip.poster);assert.equal(momentSource(clip,false,true),clip.poster);
 for(const change of [{bytes:1500001},{file:'https://example.com/a.gif'},{poster:clip.file},{durationMs:5000},{width:1400}])assert.throws(()=>validateClip({...clip,...change}));
});
