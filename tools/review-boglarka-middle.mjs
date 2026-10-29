/** Scripted public CLI review: observes every response; never edits or reads save payloads. */
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {once} from 'node:events';
import {mkdtemp,writeFile,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const cases=process.argv.includes('--withdrawals')?[
 {id:'disagreement-withdrawal',topic:'music',answer:'differ',pace:'slow_touch',destination:'head_home',withdraw4:true,restart:true},
 {id:'commitment-withdrawal',topic:'self',answer:'like',pace:'kiss',destination:'stay_outside',withdraw5:true,restart:true}
]:[
 {id:'music-kiss-fade',topic:'music',answer:'like',pace:'kiss',destination:'quiet_place',private:'kiss',future:'ritual',after:'music',place:'room',touch:'kiss',intimacy:'intimate',restart:true},
 {id:'quiet-disagree-talk',topic:'callback',answer:'differ',pace:'slow_touch',destination:'quiet_place',private:'stay_close',future:'ritual',after:'music',place:'room',touch:'talk',restart:true},
 {id:'nervous-kiss-reconsider',topic:'self',answer:'like',pace:'kiss',destination:'together',private:'kiss',future:'open',after:'concert',place:'room',touch:'kiss',intimacy:'stop',restart:true},
 {id:'slow-night-outside',topic:'music',answer:'differ',pace:'slow_touch',destination:'stay_outside',future:'open',after:'rest',place:'outside',night:true},
 {id:'early-depart-late-withdraw',topic:'self',answer:'differ',pace:'kiss',destination:'head_home',withdraw:true},
 {id:'private-talk-coffee',topic:'callback',answer:'like',pace:'kiss',destination:'quiet_place',private:'stay_close',coffee:true,after:'coffee',place:'room',touch:'talk'},
 {id:'private-date-depart',topic:'music',answer:'like',pace:'kiss',destination:'quiet_place',private:'head_home',after:'rest',place:'leave'},
 {id:'slow-private-depart',topic:'self',answer:'like',pace:'slow_touch',destination:'quiet_place',private:'head_home',after:'rest',place:'room',touch:'leave'},
 {id:'after-kiss-depart',topic:'music',answer:'differ',pace:'kiss',destination:'stay_outside',after:'rest',place:'room',touch:'kiss',intimacy:'leave'},
 {id:'date-refusal',decline:true},
 {id:'same-week-attraction',topic:'music',answer:'like',pace:'slow_touch',destination:'head_home',attractionWeek:28,after:'rest',place:'outside',night:true},
 {id:'late-summer',restart:true,topic:'self',answer:'differ',pace:'kiss',destination:'together',private:'stay_close',week:49,after:'rest',place:'outside',night:true},
 {id:'last-window-night',topic:'music',answer:'like',pace:'slow_touch',destination:'head_home',week:50,night:true},
 {id:'share-no-quiet-memory',topic:'music',answer:'like',pace:'kiss',destination:'quiet_place',private:'kiss',earlyTopic:'share',after:'rest',place:'leave'},
 {id:'late-coffee-same-week',topic:'callback',answer:'differ',pace:'slow_touch',destination:'quiet_place',private:'stay_close',coffeeWeek:52,after:'coffee',place:'outside',afterNight:true}
];
const directory=await mkdtemp(join(tmpdir(),'ligetvar-boglarka-')),results=[];
for(const c of cases){
 let child,lines,response,serial=0,restarts=0;const observed=[],context=[],requests=[],save=join(directory,c.id+'.json');
 async function boot(){
  child=spawn(process.execPath,['--experimental-strip-types','src/game/cli/main.ts','--json','--locale','en','--save',save],{stdio:['pipe','pipe','inherit']});
  lines=createInterface({input:child.stdout})[Symbol.asyncIterator]();response=JSON.parse((await lines.next()).value);assert.equal(response.ok,true);
 }
 async function send(cmd,extra={}){
  child.stdin.write(JSON.stringify({id:++serial,cmd,expectedRevision:response.revision,...extra})+'\n');
  response=JSON.parse((await lines.next()).value);assert.equal(response.ok,true,JSON.stringify(response.error));return response.view;
 }
 const act=action=>send('act',{action});
 async function stop(){const exited=once(child,'exit');await send('quit');child.stdin.end();assert.equal((await exited)[0],0);}
 async function restart(){const before=response.view;await stop();await boot();assert.deepEqual(response.view,before);restarts++;}
 async function scene(id){
  await act({type:'scene',id});
  while(response.view.phase==='scene'){
   const v=response.view,s=v.scene;
   if(id.startsWith('boglarka_')||id==='coffee_boglarka_late')context.push({week:v.week,period:v.period,scene:id,line:s.lineId,text:s.text,choices:v.actions.map(a=>({id:a.action.id,label:a.label}))});
   if(['boglarka_3','boglarka_4','boglarka_5','boglarka_6'].includes(id)){
    const en=structuredClone(v),revision=response.revision;await send('locale',{locale:'hu'});const hu=structuredClone(response.view);
    assert.deepEqual(hu.actions.map(a=>a.action),en.actions.map(a=>a.action));assert.equal(hu.scene.lineId,en.scene.lineId);assert.notEqual(hu.scene.text,en.scene.text);assert.equal(response.revision,revision);
    await send('locale',{locale:'en'});assert.deepEqual(response.view,en);
    observed.push({scene:id,week:v.week,date:v.calendar.iso,period:v.period,line:s.lineId,speaker:s.speakerId,en:s.text,hu:hu.scene.text,stage:s.staging,choices:en.actions.map(a=>({id:a.action.id,en:a.label,hu:hu.actions.find(h=>h.action.id===a.action.id).label}))});
    if(c.restart&&v.actions.some(a=>a.action.id!=='continue'))await restart();
    if(c.pace==='slow_touch'&&id==='boglarka_3'&&s.lineId==='date_private_choice')assert.ok(!v.actions.some(a=>a.action.id==='kiss'));
    if(c.earlyTopic==='share'&&s.lineId==='romance_date_topic')assert.ok(!v.actions.some(a=>a.action.id==='callback'));
    if(id==='boglarka_6'&&s.lineId==='romance_after_topic'){
     assert.equal(v.actions.some(a=>a.action.id==='coffee'),Boolean(c.coffee||c.coffeeWeek));
     assert.equal(v.actions.some(a=>a.action.id==='concert'),c.future==='open');
    }
   }
   const policy=id==='boglarka_3'?{line_4:c.decline?'slow':'yes',romance_date_topic:c.topic,music_answer:c.answer,romance_closeness:c.pace,date_destination:c.destination,date_private_choice:c.private}:
    id==='boglarka_6'?{line_4:c.withdraw?'withdraw':'continue_together',romance_after_topic:c.after,after_invite:c.place,room_choice:c.touch,intimacy_choice:c.intimacy}:
    id==='boglarka_4'?{line_4:c.withdraw4?'withdraw':'repair',romance_repair:c.answer==='differ'?'own_it':'signal'}:id==='boglarka_5'?{line_4:c.withdraw5?'withdraw':'commit',romance_future:c.future}:id==='boglarka_2'?{romance_attraction:c.earlyTopic}:{};
   const wanted=policy[s.lineId],action=wanted?v.actions.find(a=>a.action.id===wanted)?.action:v.actions[0].action;
   assert.ok(action,`${c.id}/${id}/${s.lineId}/${wanted}`);requests.push({week:v.week,scene:id,line:s.lineId,action});await act(action);
  }
 }
 await boot();await send('new',{name:'Álex $& {playerName}'});const target=c.week??28,done=new Set();
 for(let w=1;w<=52;w++){
  const shared=response.view.actions.find(a=>a.action.type==='scene'&&a.action.id.startsWith('shared_'));if(shared)await scene(shared.action.id);
  if(w===32&&!c.decline)await act({type:'direction',id:'boglarka'});
  while(response.view.phase==='planner'){
   const v=response.view;
   if(w===(c.coffeeWeek??(c.coffee?51:0))&&!done.has('coffee_boglarka_late')){await scene('coffee_boglarka_late');done.add('coffee_boglarka_late');continue;}
   const desired=['boglarka_1','boglarka_2','boglarka_3','boglarka_4','boglarka_5','boglarka_6'].find(id=>!done.has(id)&&v.actions.some(a=>a.action.type==='scene'&&a.action.id===id)&&
    (id!=='boglarka_2'||w>=(c.attractionWeek??6))&&(id!=='boglarka_3'||(w>=target&&(!c.night||v.period==='night')))&&(id!=='boglarka_6'||(!c.afterNight||v.period==='night')));
   if(desired){await scene(desired);done.add(desired);}else await act({type:'activity',kind:'rest'});
  }
  await act({type:'advance'});
 }
 assert.equal(response.view.phase,'ending');assert.equal(response.view.week,52);const ending=response.view.ending.relationship;
 assert.equal(ending,c.decline?'friendship':target===50?'unresolved':(c.withdraw||c.withdraw4||c.withdraw5)?'estranged':'boglarka');
 assert.equal(response.view.ending.threat,'resolved');
 const date=observed.find(x=>x.scene==='boglarka_3');assert.equal(date.week,target);assert.equal(date.period,c.night?'night':'day');
 results.push({id:c.id,policy:c,release:response.release,commands:serial,restarts,ending,outcome:response.view.ending,scenes:[...done],observed,context,requests});await stop();
 console.log(JSON.stringify({case:c.id,ending,date:date.date,lines:observed.length,restarts}));
}
let baseline;
if(process.argv[3]){
 const t=JSON.parse(await readFile(process.argv[3],'utf8')),seen=new Set();
 baseline={release:t.release,buildId:t.buildId,observed:[]};
 for(const e of t.entries){const v=e.after.view,s=v?.scene;if(!['boglarka_3','boglarka_4','boglarka_5','boglarka_6'].includes(s?.id)||seen.has(s.id+'/'+s.lineId))continue;seen.add(s.id+'/'+s.lineId);baseline.observed.push({week:v.week,date:v.calendar.iso,period:v.period,scene:s.id,line:s.lineId,text:s.text});}
}
// Pool repeated full observations while retaining every played occurrence and branch.
const views=[],contextViews=[],viewIndex=new Map(),contextIndex=new Map();
function pool(value,items,index){const key=JSON.stringify(value);if(!index.has(key)){index.set(key,items.length);items.push(value);}return index.get(key);}
for(const result of results){
 result.observed=result.observed.map(({week,date,period,...view})=>[week,date,period,pool(view,views,viewIndex)]);
 result.context=result.context.map(({week,period,...view})=>[week,period,pool(view,contextViews,contextIndex)]);
 result.requests=result.requests.filter(r=>r.action.id!=='continue');
}
if(process.argv[2])await writeFile(process.argv[2],JSON.stringify({format:2,columns:{observed:['week','date','period','viewsIndex'],context:['week','period','contextViewsIndex']},views,contextViews,method:'Scripted public JSON CLI, fresh saves, latest revision per action, per-node EN/HU switching, process restart, no author mode/save manipulation. No optional gatherings/preparation. One latest-window run cannot fit commitment and is intentionally unresolved.',baseline,results},null,2)+'\n');
