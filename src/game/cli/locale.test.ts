import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Session} from './session.ts';
import type {GameAction} from '../content/actions.ts';
import {decodeSave} from '../content/saves.ts';
import {SCENES} from '../content/catalog.ts';

function memory(){let raw:string|null=null,writes=0;return {read:()=>raw,write:(next:string)=>{raw=next;writes++;},writes:()=>writes};}
test('locale switches at title and rejects unsupported locales without changing session state',()=>{
 const file=memory(),session=new Session(file);
 assert.equal(session.execute({cmd:'locale',locale:'en'}).locale,'en');
 assert.equal(session.execute({cmd:'look'}).view,null);
 assert.equal(session.revision,0);assert.equal(file.writes(),0);
 for(const locale of ['de','',null,42]){
  const response=session.execute({cmd:'locale',locale});
  assert.equal(response.ok,false);assert.equal(response.locale,'en');assert.equal(session.revision,0);
 }
});
test('live locale changes preserve bytes, revisions, actions and hidden puzzle cards throughout a semester',()=>{
 const file=memory(),session=new Session(file),phases=new Set<string>();
 session.execute({cmd:'new',name:'Locale test',expectedRevision:0});
 function switchBoth(){
  const before=session.execute({cmd:'look'}).view!,raw=file.read(),writes=file.writes(),revision=session.revision;
  phases.add(before.phase);
  const english=session.execute({cmd:'locale',locale:'en'});
  assert.equal(english.ok,true);assert.equal(english.locale,'en');
  assert.equal(english.revision,revision);assert.equal(file.read(),raw);assert.equal(file.writes(),writes);
  const after=english.view!;
  assert.deepEqual(after.actions.map(a=>a.action),before.actions.map(a=>a.action));
  assert.deepEqual(after.puzzle?.tiles,before.puzzle?.tiles);
  assert.deepEqual(after.puzzle?.selected,before.puzzle?.selected);
  assert.deepEqual(after.scene,before.scene);
  assert.deepEqual(after.evidence,before.evidence);assert.deepEqual(after.journal,before.journal);
  const hungarian=session.execute({cmd:'locale',locale:'hu'});
  assert.deepEqual(hungarian.view,before);assert.equal(file.read(),raw);
 }
 function act(action:GameAction){
  const response=session.execute({cmd:'act',action,expectedRevision:session.revision});
  assert.equal(response.ok,true,JSON.stringify(response));return response.view!;
 }
 for(let week=1;week<=16;week++){
  switchBoth();let view=act({type:'scene',id:'shared_'+week});switchBoth();
  let guard=200;
  while(view.phase==='scene'&&guard--)view=act(view.actions[0].action);
  assert.ok(guard>0);
  if(week===1){
   view=act({type:'activity',kind:'archive'});switchBoth();
   view=act({type:'tile',index:0});switchBoth();
   const en=session.execute({cmd:'locale',locale:'en'}).view!;
   assert.match(en.puzzle!.instructions,/Turn over/);
   assert.equal(en.puzzle!.tiles.filter(v=>v!==null).length,1);
   session.execute({cmd:'locale',locale:'hu'});
   // Complete the move budget while selecting only visible legal actions.
   while(!view.puzzle!.done){
    view=act(view.actions[0].action);
   }
   switchBoth();view=act({type:'claim'});
  }
  while(view.phase==='planner')view=act({type:'activity',kind:'rest'});
  switchBoth();view=act({type:'advance'});
 }
 switchBoth();
 assert.deepEqual([...phases].sort(),['ending','minigame','planner','scene','summary']);
 assert.equal(decodeSave(file.read(),SCENES).status,'ok');
 const replay=new Session(memory());for(const row of session.transcript as any[])assert.equal(replay.execute(row.request).ok,true);
 assert.deepEqual(replay.execute({cmd:'look'}).view,session.execute({cmd:'look'}).view);
 assert.equal(replay.revision,session.revision);
});
test('save feedback follows the selected locale without modifying invalid save bytes',()=>{
 const file={read:()=>'{"version":3}',write:()=>{throw Error('must not write');}};
 const session=new Session(file,false,null,'en');
 const en=session.execute({cmd:'load',expectedRevision:0}) as any;
 assert.match(en.error.message,/can no longer be used/);
 session.execute({cmd:'locale',locale:'hu'});
 const hu=session.execute({cmd:'load',expectedRevision:0}) as any;
 assert.match(hu.error.message,/már nem használható/);assert.equal(file.read(),'{"version":3}');
});
