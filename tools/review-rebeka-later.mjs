/** Scripted public-CLI review of Rebeka's connected commitment/aftermath. */
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {once} from 'node:events';
import {mkdtemp,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const directory=await mkdtemp(join(tmpdir(),'ligetvar-later-'));
const cases=[
 {id:'early-window-curious',first:'ask',attraction:'curious',place:'outside'},
 {id:'early-leave',first:'leave',earlyDecline:true},
 {id:'early-friend',friend:true,earlyDecline:true},
 {id:'conflict-other',conflictReply:'name_fault',place:'outside'},
 {id:'conflict-withdraw',conflictDecline:true},
 {id:'late-date-conflict',dateWeek:49,conflictWeek:49,conflictNight:true,commitWeek:50,place:'outside'},
 {id:'ordinary-outside',future:'ritual',topic:'ordinary',place:'outside',restart:true},
 {id:'invite-private-talk',future:'open',topic:'invite',place:'room',physical:'talk',restart:true},
 {id:'kiss-stop',place:'room',physical:'kiss',intimacy:'stop',slow:true,restart:true},
 {id:'mutual-intimacy',place:'room',physical:'kiss',intimacy:'intimate',restart:true},
 {id:'private-depart',place:'room',physical:'leave'},
 {id:'kiss-depart',place:'room',physical:'kiss',intimacy:'leave'},
 {id:'courtyard-depart',place:'leave',slow:true},
 {id:'late-coffee',coffee:true,topic:'coffee',place:'outside'},
 {id:'supported',prepared:true,place:'outside'},
 {id:'withdraw',withdraw:true,slow:true,restart:true},
 {id:'commit-decline',decline:true},
 {id:'latest-commit-night',commitWeek:50,night:true,future:'open',topic:'invite',place:'outside'}
];
const results=[];
const caseFlag=process.argv.indexOf('--case'),selectedCase=caseFlag<0?null:process.argv[caseFlag+1];
if(caseFlag>=0&&!cases.some(c=>c.id===selectedCase))throw Error('Unknown review case');
for(const c of cases.filter(c=>!selectedCase||c.id===selectedCase)){
 let child,reader,response,serial=0,restarts=0;const save=join(directory,c.id+'.json'),observed=[],context=[],requests=[];
 async function boot(){child=spawn(process.execPath,['--experimental-strip-types','src/game/cli/main.ts','--json','--locale','en','--save',save],{stdio:['pipe','pipe','inherit']});reader=createInterface({input:child.stdout})[Symbol.asyncIterator]();response=JSON.parse((await reader.next()).value);assert.equal(response.ok,true);}
 async function send(cmd,extra={}){const request={id:++serial,cmd,expectedRevision:response.revision,...extra};child.stdin.write(JSON.stringify(request)+'\n');response=JSON.parse((await reader.next()).value);assert.equal(response.ok,true,JSON.stringify(response.error));if(cmd==='act')requests.push({week:response.view.week,action:extra.action});return response.view;}
 const act=action=>send('act',{action});
 async function stop(){const exited=once(child,'exit');await send('quit');child.stdin.end();assert.equal((await exited)[0],0);}
 async function restart(){const before=structuredClone(response.view);await stop();await boot();assert.deepEqual(response.view,before);restarts++;}
 async function scene(id){
  await act({type:'scene',id});
  while(response.view.phase==='scene'){
   const v=response.view,s=v.scene;
   if(id.startsWith('rebeka_'))context.push({week:v.week,date:v.calendar.iso,period:v.period,scene:id,line:s.lineId,text:s.text});
   if(id.startsWith('rebeka_')){
    const en=structuredClone(v),revision=response.revision;
    await send('locale',{locale:'hu'});const hu=structuredClone(response.view);
    assert.deepEqual(hu.actions.map(a=>a.action),en.actions.map(a=>a.action));assert.notEqual(hu.scene.text,en.scene.text,s.lineId);assert.equal(response.revision,revision);
    await send('locale',{locale:'en'});assert.deepEqual(response.view,en);
    const choices=en.actions.filter(a=>a.action.type==='choice'&&a.action.id!=='continue');
    observed.push({scene:id,week:v.week,date:v.calendar.iso,period:v.period,line:s.lineId,en:s.text,hu:hu.scene.text,stage:s.staging,choices:choices.map(a=>({id:a.action.id,en:a.label,hu:hu.actions.find(h=>h.action.id===a.action.id).label}))});
    if(c.restart&&(choices.length||s.lineId==='kiss_1'||s.lineId==='withdraw_0'||s.lineId==='after_fade'))await restart();
    if(s.lineId==='line_1'&&id==='rebeka_5'||s.lineId==='line_3'&&id==='rebeka_6')assert.ok(en.scene.text.includes('Álex $& {playerName}'));
   }
   const wanted=id==='rebeka_1'?{line_2:c.first??'interest'}[s.lineId]
    :id==='rebeka_2'?{line_4:c.friend?'friend':'yes',romance_attraction:c.attraction??'honest'}[s.lineId]
    :id==='rebeka_3'?{romance_closeness:c.slow?'slow_touch':'hand',date_destination:'head_home'}[s.lineId]
    :id==='rebeka_4'?{line_4:c.conflictDecline?'withdraw':'repair',romance_repair:c.conflictReply??'ask_space'}[s.lineId]
    :id==='rebeka_5'?{line_4:c.decline?'withdraw':'commit',romance_future:c.future??'ritual'}[s.lineId]
    :id==='rebeka_6'?{line_4:c.withdraw?'withdraw':'continue_together',after_topic:c.topic??'rest',after_invite:c.place,room_choice:c.physical,intimacy_choice:c.intimacy}[s.lineId]:undefined;
   const action=wanted?v.actions.find(a=>a.action.id===wanted)?.action:v.actions[0].action;assert.ok(action,`${c.id}/${id}/${s.lineId}/${wanted}`);await act(action);
  }
 }
 await boot();await send('new',{name:'Álex $& {playerName}'});const done=new Set();
 for(let w=1;w<=52;w++){
  const required=response.view.actions.find(a=>a.action.type==='scene'&&a.action.id.startsWith('shared_'));if(required)await scene(required.action.id);
  if(w===32&&!c.earlyDecline)await act({type:'direction',id:'rebeka'});
  while(response.view.phase==='planner'){
   const v=response.view;
   const planned=[...(c.prepared&&w===46?['prepare_backup']:[]),...(c.prepared&&w===48?['prepare_signals']:[]),...(c.coffee&&w===51?['coffee_rebeka_late']:[]),'rebeka_1','rebeka_2','rebeka_3','rebeka_4','rebeka_5','rebeka_6'];
   const desired=planned.find(id=>!done.has(id)&&v.actions.some(a=>a.action.type==='scene'&&a.action.id===id)&&(id!=='rebeka_3'||w>=(c.dateWeek??16))&&(id!=='rebeka_4'||w>=(c.conflictWeek??40)&&(!c.conflictNight||v.period==='night'))&&(id!=='rebeka_5'||w>=(c.commitWeek??48)&&(!c.night||v.period==='night')));
   if(desired){await scene(desired);done.add(desired);}else await act({type:'activity',kind:'rest'});
  }
  await act({type:'advance'});
 }
 assert.equal(response.view.phase,'ending');assert.equal(response.view.ending.relationship,c.earlyDecline?'friendship':c.withdraw||c.decline||c.conflictDecline?'estranged':'rebeka');
 assert.equal(response.view.ending.cost,c.prepared?'supported':'exhausting');
 const after=observed.filter(x=>x.scene==='rebeka_6'),ids=after.map(x=>x.line);
 if(c.withdraw||c.decline||c.conflictDecline||c.earlyDecline)assert.ok(!ids.includes('kiss_1')&&!ids.includes('room_0')&&!ids.includes('fade_1'));
 assert.equal(ids.includes('fade_1'),c.intimacy==='intimate');assert.equal(ids.includes('kiss_1'),c.physical==='kiss');
 if(!c.coffee)assert.ok(!after.flatMap(x=>x.choices).some(x=>x.id==='coffee'));
 if(c.prepared)assert.ok(done.has('prepare_backup')&&done.has('prepare_signals'));
 const summary={id:c.id,policy:c,release:response.release,buildId:response.buildId,restarts,ending:response.view.ending,scenes:[...done],observed,context,requests};
 await stop();results.push(summary);console.log(JSON.stringify({case:c.id,ending:summary.ending.relationship,cost:summary.ending.cost,lines:observed.length,restarts}));
}
if(process.argv[2])await writeFile(process.argv[2],JSON.stringify({method:'Scripted public JSON CLI, newest revisions, fresh saves; no author inspection/save editing. Per-node English/Hungarian switching and real process restart. Not blind play or visual acceptance.',results},null,2)+'\n');
