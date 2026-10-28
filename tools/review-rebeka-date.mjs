/** Public-CLI editorial regression. Never reads or modifies a save payload. */
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {once} from 'node:events';
import {mkdtemp,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const report=process.argv[2];
const cases=[
 {id:'hand-kiss',topic:'callback',pace:'hand',destination:'quiet_place',private:'kiss',restart:true},
 {id:'hand-walk-talk',topic:'wish',pace:'hand',destination:'together',private:'stay_close'},
 {id:'hand-private-depart',topic:'fear',pace:'hand',destination:'quiet_place',private:'head_home'},
 {id:'hand-outside',topic:'fear',pace:'hand',destination:'stay_outside'},
 {id:'hand-depart',topic:'wish',pace:'hand',destination:'head_home'},
 {id:'slow-talk',topic:'fear',pace:'slow_touch',destination:'quiet_place',private:'stay_close',restart:true},
 {id:'slow-private-depart',topic:'wish',pace:'slow_touch',destination:'quiet_place',private:'head_home'},
 {id:'slow-outside-night',topic:'callback',pace:'slow_touch',destination:'stay_outside',night:true},
 {id:'slow-depart',topic:'wish',pace:'slow_touch',destination:'head_home'},
 {id:'decline',decline:true},
 {id:'same-week',topic:'wish',pace:'slow_touch',destination:'head_home',attractionWeek:16,night:true},
 {id:'latest-romance',topic:'wish',pace:'hand',destination:'together',private:'kiss',week:49,night:true},
 {id:'late-withdrawal',topic:'wish',pace:'slow_touch',destination:'head_home',withdraw:true},
 {id:'latest-night',topic:'fear',pace:'slow_touch',destination:'head_home',week:50,night:true}
];
const directory=await mkdtemp(join(tmpdir(),'ligetvar-date-'));
const results=[];
for(const c of cases){
 let child,lines,response,serial=0,restarts=0;
 const save=join(directory,c.id+'.json'),observed=[],context=[],requests=[];
 async function boot(){
  child=spawn(process.execPath,['--experimental-strip-types','src/game/cli/main.ts','--json','--locale','en','--save',save],{stdio:['pipe','pipe','inherit']});
  lines=createInterface({input:child.stdout})[Symbol.asyncIterator]();response=JSON.parse((await lines.next()).value);
  assert.equal(response.ok,true);
 }
 async function send(cmd,extra={}){
  const request={id:++serial,cmd,expectedRevision:response.revision,...extra};
  child.stdin.write(JSON.stringify(request)+'\n');response=JSON.parse((await lines.next()).value);
  assert.equal(response.ok,true,JSON.stringify(response.error));
  if(cmd==='act')requests.push({week:response.view.week,action:extra.action});
  return response.view;
 }
 const act=action=>send('act',{action});
 async function stop(){const exited=once(child,'exit');await send('quit');child.stdin.end();assert.equal((await exited)[0],0);}
 async function restart(){const before=response.view;await stop();await boot();assert.deepEqual(response.view,before);restarts++;}
 async function scene(id){
  await act({type:'scene',id});
  while(response.view.phase==='scene'){
   let v=response.view;const s=v.scene;
   if(id.startsWith('rebeka_'))context.push({week:v.week,period:v.period,scene:id,line:s.lineId,text:s.text,choices:v.actions.map(a=>a.action)});
   if(id==='rebeka_3'){
    const en=structuredClone(v),revision=response.revision;
    await send('locale',{locale:'hu'});const hu=structuredClone(response.view);
    assert.deepEqual(hu.actions.map(a=>a.action),en.actions.map(a=>a.action));
    assert.equal(hu.scene.lineId,en.scene.lineId);assert.notEqual(hu.scene.text,en.scene.text);
    assert.equal(response.revision,revision);
    await send('locale',{locale:'en'});assert.deepEqual(response.view,en);
    if(s.lineId==='line_3')assert.ok(en.scene.text.includes('Álex $& {playerName}'));
    observed.push({week:v.week,date:v.calendar.iso,period:v.period,line:s.lineId,speaker:s.speakerId,en:s.text,hu:hu.scene.text,stage:s.staging,
     choices:en.actions.filter(a=>a.action.type==='choice').map(a=>({id:a.action.id,en:a.label,hu:hu.actions.find(h=>h.action.id===a.action.id).label}))});
    const choices=v.actions.filter(a=>a.action.id!=='continue');
    if(c.restart&&choices.length)await restart();
    if(c.pace==='slow_touch'&&s.lineId==='date_destination')assert.ok(!v.actions.some(a=>a.action.id==='together'));
    if(c.pace==='slow_touch'&&s.lineId==='date_private_choice')assert.ok(!v.actions.some(a=>a.action.id==='kiss'));
   }
   const wanted=c.withdraw&&id==='rebeka_6'&&v.actions.some(a=>a.action.id==='withdraw')?'withdraw':id==='rebeka_3'?{line_4:c.decline?'slow':'yes',romance_date_topic:c.topic,romance_closeness:c.pace,date_destination:c.destination,date_private_choice:c.private}[s.lineId]:undefined;
   const action=wanted?v.actions.find(a=>a.action.id===wanted)?.action:v.actions[0].action;
   assert.ok(action,`${c.id}/${s.lineId}/${wanted}`);
   await act(action);
  }
 }
 await boot();await send('new',{name:'Álex $& {playerName}'});
 const target=c.week??16,done=new Set();
 for(let w=1;w<=52;w++){
  let v=response.view;
  const shared=v.actions.find(a=>a.action.type==='scene'&&a.action.id.startsWith('shared_'));
  if(shared)await scene(shared.action.id);
  if(w===32&&!c.decline)await act({type:'direction',id:'rebeka'});
  while(response.view.phase==='planner'){
   v=response.view;
   const desired=['rebeka_1','rebeka_2','rebeka_3','rebeka_4','rebeka_5','rebeka_6'].find(id=>!done.has(id)&&v.actions.some(a=>a.action.type==='scene'&&a.action.id===id)&&
    (id!=='rebeka_2'||w>=(c.attractionWeek??3))&&(id!=='rebeka_3'||(w>=target&&(!c.night||v.period==='night'))));
   if(desired){await scene(desired);done.add(desired);}else await act({type:'activity',kind:'rest'});
  }
  await act({type:'advance'});
 }
 assert.equal(response.view.phase,'ending');assert.equal(response.view.week,52);
 const ending=response.view.ending.relationship;
 if(!c.decline&&target<50)assert.equal(ending,c.withdraw?'estranged':'rebeka');
 const date=observed[0];assert.equal(date.week,target);assert.equal(date.period,c.night?'night':'day');
 const summary={id:c.id,policy:c,release:response.release,buildId:response.buildId,commands:serial,restarts,ending,scenes:[...done],dateWeek:date.week,date:date.date,period:date.period,observed,context,requests};
 await stop();results.push(summary);
 console.log(JSON.stringify({case:c.id,ending,date:date.date,period:date.period,lines:observed.length,restarts}));
}
if(report)await writeFile(report,JSON.stringify({method:'Scripted public JSON CLI; fresh saves, latest revisions, no author mode or save manipulation; per-node locale parity; actual observed endings. Later unrevised scenes remain known defects.',results},null,2)+'\n');
