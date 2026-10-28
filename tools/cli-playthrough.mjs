// Example agent: talks only to the public JSON CLI, never reads private state.
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {once} from 'node:events';
import {fileURLToPath} from 'node:url';
const args=process.argv.slice(2),option=(name,fallback)=>args.includes(name)?args[args.indexOf(name)+1]:fallback;
const route=option('--route','friendship'),save=option('--save',null),transcript=option('--transcript',null);
if(!save||!['friendship','rebeka','boglarka','greta','triad','withdraw'].includes(route))throw new Error('Use --save NEW_PATH --route friendship|rebeka|boglarka|greta|triad|withdraw [--transcript NEW_PATH].');
const root=fileURLToPath(new URL('../',import.meta.url));
const child=spawn(process.execPath,['--experimental-strip-types','src/game/cli/main.ts','--json','--save',save],{cwd:root,stdio:['pipe','pipe','inherit']});
const lines=createInterface({input:child.stdout})[Symbol.asyncIterator]();
const next=async()=>{const row=await lines.next();if(row.done)throw new Error('CLI exited unexpectedly.');return JSON.parse(row.value);};
let response=await next(),commands=0;
async function send(cmd,extra={}){child.stdin.write(JSON.stringify({id:++commands,cmd,expectedRevision:response.revision,...extra})+'\n');response=await next();if(!response.ok)throw new Error(JSON.stringify(response.error));return response.view;}
const act=action=>send('act',{action});
async function scene(id){let view=await act({type:'scene',id});for(let i=0;view.phase==='scene'&&i<200;i++){const action=(route==='withdraw'&&id==='rebeka_6'?view.actions.find(a=>a.action.id==='withdraw'):null)??view.actions[0];view=await act(action.action);}if(view.phase==='scene')throw new Error('Scene budget exceeded');return view;}
try{
 if(response.view)throw new Error('Use a fresh save path; this example will not overwrite existing progress.');
 await send('new',{name:'CLI route tester'});
 const person=route==='withdraw'?'rebeka':route;
 const triad={1:['rebeka_1'],2:['boglarka_1'],3:['rebeka_2'],4:['triad_1','boglarka_2'],5:['triad_2'],6:['rebeka_3'],7:['boglarka_3','triad_3'],8:['triad_4'],9:['rebeka_4'],10:['boglarka_4'],11:['triad_5'],12:['triad_6'],13:['rebeka_5','boglarka_5'],14:['triad_7'],16:['triad_8']};
 const plan=person==='triad'?triad:person==='friendship'?{16:['friendship_after']}:{2:[person+'_1'],5:[person+'_2'],7:[person+'_3'],10:[person+'_4'],13:[person+'_5'],16:[person+'_6']};
 const storyWeeks=response.view.calendar.storyWeeks;
 const calendarPlan=Object.fromEntries(Object.entries(plan).map(([chapter,ids])=>[storyWeeks[Number(chapter)-1],ids]));
 for(let week=1;week<=response.view.totalWeeks;week++){
  let v=response.view;const required=v.actions.find(a=>a.action.type==='scene'&&a.action.id.startsWith('shared_'));
  if(required)v=await scene(required.action.id);
  if(week===storyWeeks[7]&&person!=='friendship')v=await act({type:'direction',id:person});
  for(const id of calendarPlan[week]??[]){if(!v.actions.some(a=>a.action.type==='scene'&&a.action.id===id))v=await act({type:'activity',kind:'rest'});v=await scene(id);}
  while(v.phase==='planner')v=await act({type:'activity',kind:'rest'});
  await act({type:'advance'});
 }
 const expected=route==='withdraw'?'estranged':route;
 if(response.view.phase!=='ending'||response.view.ending.relationship!==expected)throw new Error('Wrong ending');
 if(transcript)await send('transcript',{path:transcript});
 const coverage=await send('coverage'); // Current view is returned alongside coverage.
 console.log(JSON.stringify({route,commands,phase:coverage.phase,ending:coverage.ending.relationship,week:coverage.week,totalWeeks:coverage.totalWeeks,playedLines:response.coverage.playedLines.length,release:response.release,save}));
 await send('quit');child.stdin.end();
 const [code]=await once(child,'exit');if(code!==0)throw new Error('CLI exit '+code);
}catch(error){child.kill();throw error;}
