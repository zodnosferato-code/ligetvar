import {CALENDAR,chapterWeek,storyIdAt} from '../content/calendar.ts';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Session} from './session.ts';
import {SCENES} from '../content/catalog.ts';
import {createInitial} from '../content/runtime.ts';
import {decodeSave,encodeSave} from '../content/saves.ts';
import {applyAction,type GameAction} from '../content/actions.ts';
import {gameView} from '../content/view.ts';
import {ASSET_DESCRIPTIONS} from '../content/asset-descriptions.ts';
import {BACKGROUNDS,BACKGROUND_VARIANTS,PORTRAITS,portraitFor} from '../content/assets.ts';
import {statSync,mkdtempSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
function memory(raw:string|null=null){return {read:()=>raw,write:(next:string)=>{raw=next;}};}
function play(){const file=memory(),s=new Session(file);assert.equal(s.execute({cmd:'new',name:'Test',expectedRevision:0}).ok,true);return {s,file};}
function act(s:Session,action:GameAction){const result=s.execute({cmd:'act',action,expectedRevision:s.revision});assert.ok(result.ok,JSON.stringify(result));return result.view!;}
function scene(s:Session,id:string,withdraw=false){let v=act(s,{type:'scene',id});let limit=200;while(v.phase==='scene'&&limit--){const a=withdraw?v.actions.find(x=>x.action.type==='choice'&&x.action.id==='withdraw')??v.actions[0]:v.actions[0];v=act(s,a.action);}assert.ok(limit>0);return v;}
const triad:Record<number,string[]>={1:['rebeka_1'],2:['boglarka_1'],3:['rebeka_2'],4:['triad_1','boglarka_2'],5:['triad_2'],6:['rebeka_3'],7:['boglarka_3','triad_3'],8:['triad_4'],9:['rebeka_4'],10:['boglarka_4'],11:['triad_5'],12:['triad_6'],13:['rebeka_5','boglarka_5'],14:['triad_7'],16:['triad_8']};
for(const route of ['friendship','rebeka','boglarka','greta','triad','withdraw'] as const)test('CLI campaign reaches ending through player commands: '+route,()=>{
 const {s,file}=play(),person=route==='withdraw'?'rebeka':route;
 const plan:Record<number,string[]>=person==='triad'?triad:person==='friendship'?{16:['friendship_after']}:{2:[person+'_1'],5:[person+'_2'],7:[person+'_3'],10:[person+'_4'],13:[person+'_5'],16:[person+'_6']};
 const calendarPlan=Object.fromEntries(Object.entries(plan).map(([chapter,ids])=>[chapterWeek(Number(chapter)),ids]));
 for(let week=1;week<=CALENDAR.weeks;week++){
  let v=s.execute({cmd:'look'}).view!;const required=storyIdAt(week);if(required)v=scene(s,required);
  if(week===CALENDAR.direction&&person!=='friendship')v=act(s,{type:'direction',id:person});
  for(const id of calendarPlan[week]??[]){if(v.slot===1&&SCENES[id].periods?.length===1&&SCENES[id].periods?.[0]==='night')v=act(s,{type:'activity',kind:'rest'});v=scene(s,id,route==='withdraw'&&id.endsWith('_6'));}
  while(v.phase==='planner')v=act(s,{type:'activity',kind:'rest'});
  const loaded=decodeSave(file.read(),SCENES);assert.equal(loaded.status,'ok');if(loaded.status==='ok')assert.deepEqual(gameView(loaded.state),v);
  v=act(s,{type:'advance'});
  if(week===CALENDAR.weeks){assert.equal(v.phase,'ending');assert.equal(v.ending!.relationship,route==='withdraw'?'estranged':person);}
 }
});
test('shared browser/CLI actions match and invalid or stale actions are atomic',()=>{
 const {s,file}=play();let state=createInitial('Test');
 for(const action of [{type:'scene',id:'shared_1'},...Array.from({length:8},()=>({type:'choice',id:'continue'}))] as GameAction[]){
  const next=applyAction(state,action),raw=file.read(),revision=s.revision;
  const result=s.execute({cmd:'act',action,expectedRevision:revision});
  if(next===state)assert.equal(result.ok,false);else{state=next;assert.deepEqual(result.view,gameView(state));}
  const stale=s.execute({cmd:'act',action,expectedRevision:-1});assert.equal(stale.ok,false);
  if(next===state&&!result.ok)assert.equal(file.read(),raw);
 }
 const raw=file.read();assert.equal(s.execute({cmd:'act',action:{type:'choice',id:'hidden'},expectedRevision:s.revision}).ok,false);assert.equal(file.read(),raw);
});
test('memory board never reveals hidden cards, resumes half a pair and pays once',()=>{
 const {s,file}=play();scene(s,'shared_1');let v=act(s,{type:'activity',kind:'archive'});assert.ok(v.puzzle!.tiles.every(x=>x===null));
 v=act(s,{type:'tile',index:0});assert.equal(v.puzzle!.tiles.filter(x=>x!==null).length,1);
 const resumed=new Session(file);assert.equal(resumed.execute({cmd:'load',expectedRevision:0}).ok,true);assert.deepEqual(resumed.execute({cmd:'look'}).view,v);
 // A real player solver: remembers only cards that have been revealed in observations.
 const known=new Map<number,number>();let limit=200;
 while(!v.puzzle!.done&&limit--){
  const p=v.puzzle!;p.tiles.forEach((value,i)=>{if(value!==null)known.set(i,value);});
  if(p.selected.length===2){v=act(resumed,{type:'next-pair'});continue;}
  const free=p.tiles.map((_,i)=>i).filter(i=>!p.matched.includes(i)&&!p.selected.includes(i));
  const first=p.selected[0];
  let index=first===undefined?free.find(i=>known.has(i)&&free.some(j=>i!==j&&known.get(j)===known.get(i))):free.find(i=>known.get(i)===known.get(first));
  index??=free.find(i=>!known.has(i))??free[0];v=act(resumed,{type:'tile',index});
 }
 assert.ok(limit>0);v=act(resumed,{type:'claim'});assert.equal(v.slot,2);const raw=file.read();assert.equal(resumed.execute({cmd:'act',action:{type:'claim'},expectedRevision:resumed.revision}).ok,false);assert.equal(file.read(),raw);
});
test('recycling, gifts and paid outings survive the current envelope',()=>{
 const {s,file}=play();scene(s,'shared_1');let v=act(s,{type:'activity',kind:'recycling'});
 // Recycling is fully visible; derive legal swaps from the displayed board only.
 for(let move=0;move<12;move++){
  const b=v.puzzle!.tiles as number[];let pair:number[]=[];
  outer:for(let a=0;a<25;a++)for(const z of [a+1,a+5]){if(z>=25||z===a+1&&a%5===4)continue;const n=[...b];[n[a],n[z]]=[n[z],n[a]];for(let i=0;i<25;i++)if(i%5<3&&n[i]===n[i+1]&&n[i]===n[i+2]||i<15&&n[i]===n[i+5]&&n[i]===n[i+10]){pair=[a,z];break outer;}}
  assert.equal(pair.length,2);act(s,{type:'tile',index:pair[0]});v=act(s,{type:'tile',index:pair[1]});
 }
 v=act(s,{type:'claim'});assert.ok(v.activityPoints>=3);
 act(s,{type:'buy',id:'photo'});v=act(s,{type:'gift',girl:'rebeka',id:'photo',note:'thanks',delivery:'remote'});assert.equal(v.gifts.replies.length,1);assert.match(v.gifts.replies[0].reaction,/füzet/);
 scene(s,'rebeka_1');act(s,{type:'advance'});scene(s,'shared_2');
 // If the first shift was below four points, earn another shift before the outing.
 v=s.execute({cmd:'look'}).view!;
 if(v.activityPoints<4){act(s,{type:'activity',kind:'archive'});for(let i=0;i<18;i++){v=s.execute({cmd:'look'}).view!;if(v.puzzle!.done)break;const indices=v.puzzle!.tiles.map((_,n)=>n).filter(n=>!v.puzzle!.matched.includes(n));act(s,{type:'tile',index:indices[0]});act(s,{type:'tile',index:indices[1]});v=s.execute({cmd:'look'}).view!;if(!v.puzzle!.done)act(s,{type:'next-pair'});}act(s,{type:'claim'});}
 v=s.execute({cmd:'look'}).view!;const money=v.money,points=v.activityPoints;
 v=act(s,{type:'scene',id:'outing_rebeka_1'});assert.equal(v.money,money-4000);assert.equal(v.activityPoints,points-4);
 assert.equal(s.execute({cmd:'load',expectedRevision:s.revision}).ok,true);assert.equal(s.execute({cmd:'look'}).view!.money,money-4000);assert.equal(decodeSave(file.read(),SCENES).status,'ok');
});
test('author inspection is separate; findings and transcripts retain stable IDs',()=>{
 const {s}=play();assert.equal(s.execute({cmd:'catalog'}).ok,false);assert.equal(s.execute({cmd:'inspect',sceneId:'shared_15'}).ok,false);
 const author=new Session(memory(),true);author.execute({cmd:'inspect',sceneId:'shared_15'});assert.equal(author.execute({cmd:'look'}).view,null);
 const coverage=author.execute({cmd:'coverage'}) as any;assert.deepEqual(coverage.coverage.playedLines,[]);assert.deepEqual(coverage.coverage.inspectedScenes,['shared_15']);
 scene(s,'shared_1');const line='shared_1/'+SCENES.shared_1.entry;
 assert.ok((s.execute({cmd:'coverage'}) as any).coverage.playedLines.includes(line));
 const dir=mkdtempSync(join(tmpdir(),'ligetvar-report-'));
 try{assert.equal(author.execute({cmd:'note',category:'wording',suggestion:'Review phrasing.'}).ok,true);const path=join(dir,'findings.json');assert.equal(author.execute({cmd:'findings',path}).ok,true);assert.equal(JSON.parse(readFileSync(path,'utf8')).entries[0].source,'author');assert.equal(author.execute({cmd:'findings',path}).ok,false);}finally{rmSync(dir,{recursive:true,force:true});}
});
test('all runtime image descriptions exist and resolved fallback is honest',()=>{
 const all=[...Object.values(BACKGROUNDS),...Object.values(BACKGROUND_VARIANTS).flatMap(x=>Object.values(x)),...Object.values(PORTRAITS).flatMap(x=>Object.values(x)),portraitFor('soma','neutral',2)];
 for(const a of all)if(a?.file){assert.ok(ASSET_DESCRIPTIONS[a.file],a.file);assert.ok(statSync('assets/'+a.file).size>0,a.file);}
 assert.equal(portraitFor('greta','affectionate').file,portraitFor('greta','neutral').file);
});
test('failed persistence rolls back state/revision and incompatible load leaves bytes intact',()=>{
 const initial=encodeSave(createInitial('A'));let raw=initial;
 const s=new Session({read:()=>raw,write:()=>{throw new Error('disk full');}});s.execute({cmd:'load',expectedRevision:0});const before=s.execute({cmd:'look'});
 const result=s.execute({cmd:'act',action:{type:'scene',id:'shared_1'},expectedRevision:s.revision});assert.equal(result.ok,false);assert.equal(result.revision,before.revision);assert.deepEqual(result.view,before.view);assert.equal(raw,initial);
 raw='{"version":3}';const load=s.execute({cmd:'load',expectedRevision:s.revision});assert.equal(load.ok,false);assert.deepEqual(load.view,before.view);assert.equal(raw,'{"version":3}');
});
test('transcripts replay deterministically and current browser envelopes interchange with CLI files',()=>{
 const {s,file}=play();scene(s,'shared_1');act(s,{type:'activity',kind:'recycling'});act(s,{type:'tile',index:0});
 const replayFile=memory(),replay=new Session(replayFile);
 for(const entry of s.transcript as any[])assert.equal(replay.execute(entry.request).ok,true);
 assert.equal(replayFile.read(),file.read());assert.deepEqual(replay.transcript,s.transcript);
 const dir=mkdtempSync(join(tmpdir(),'ligetvar-interchange-'));
 try{
  const path=join(dir,'export.json');assert.equal(s.execute({cmd:'export',path}).ok,true);assert.equal(decodeSave(readFileSync(path,'utf8'),SCENES).status,'ok');
  const target=memory(),imported=new Session(target);assert.equal(imported.execute({cmd:'import',path,expectedRevision:0}).ok,true);assert.equal(target.read(),file.read());
  const before=target.read();assert.equal(imported.execute({cmd:'new',expectedRevision:1}).ok,false);assert.equal(target.read(),before);
 }finally{rmSync(dir,{recursive:true,force:true});}
});
