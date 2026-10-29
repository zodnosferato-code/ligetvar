// Example agent: talks only to the public JSON CLI, never reads private state.
import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {once} from 'node:events';
import {fileURLToPath} from 'node:url';
const args=process.argv.slice(2),option=(name,fallback)=>args.includes(name)?args[args.indexOf(name)+1]:fallback;
const includeSeasons=args.includes('--seasons'),seasonalChoice=option('--seasonal-choice','first'),timelineChoice=option('--timeline-choice','separate');
if(!['first','second','leave'].includes(seasonalChoice)||!['separate','check'].includes(timelineChoice))throw new Error('Use --seasonal-choice first|second|leave and --timeline-choice separate|check.');
const includeHolidays=args.includes('--holidays'),holidayChoice=option('--holiday-choice','join'),playedEvents=new Set();
if(!['join','leave'].includes(holidayChoice))throw new Error('Use --holiday-choice join|leave.');
const route=option('--route','friendship'),save=option('--save',null),transcript=option('--transcript',null);
if(!save||!['friendship','rebeka','boglarka','greta','triad','withdraw'].includes(route))throw new Error('Use --save NEW_PATH --route friendship|rebeka|boglarka|greta|triad|withdraw [--transcript NEW_PATH].');
const root=fileURLToPath(new URL('../',import.meta.url));
let child=spawn(process.execPath,['--experimental-strip-types','src/game/cli/main.ts','--json','--locale',option('--locale','hu'),'--save',save],{cwd:root,stdio:['pipe','pipe','inherit']});
let lines=createInterface({input:child.stdout})[Symbol.asyncIterator]();
const next=async()=>{const row=await lines.next();if(row.done)throw new Error('CLI exited unexpectedly.');return JSON.parse(row.value);};
let response=await next(),commands=0;
async function send(cmd,extra={}){child.stdin.write(JSON.stringify({id:++commands,cmd,expectedRevision:response.revision,...extra})+'\n');response=await next();if(!response.ok)throw new Error(JSON.stringify(response.error));return response.view;}
const act=action=>send('act',{action});
// Optional editorial policies still select only offered public actions.
const overrides=new Map(args.flatMap((arg,i)=>arg==='--choice'?[args[i+1].split('=')]:[]));
const restartAt=new Set(args.flatMap((arg,i)=>arg==='--restart-at'?[args[i+1]]:[]));
let restarts=0;
async function restart(){
 const previous=response.view;
 if(transcript)await send('transcript',{path:transcript+'.part'+restarts+'.json'});
 const closed=once(child,'exit');await send('quit');child.stdin.end();await closed;
 child=spawn(process.execPath,['--experimental-strip-types','src/game/cli/main.ts','--json','--locale',option('--locale','hu'),'--save',save],{cwd:root,stdio:['pipe','pipe','inherit']});
 lines=createInterface({input:child.stdout})[Symbol.asyncIterator]();response=await next();
 if(!response.ok||JSON.stringify(previous)!==JSON.stringify(response.view))throw new Error('Restart changed public view');
 restarts++;
}

async function scene(id){
 let view=await act({type:'scene',id});
 for(let i=0;view.phase==='scene'&&i<200;i++){
  const node=id+'/'+view.scene.lineId;
  if(restartAt.delete(node)){
   const oldLocale=response.locale,prior=JSON.stringify(view);
   await send('locale',{locale:oldLocale==='en'?'hu':'en'});
   await send('locale',{locale:oldLocale});
   if(JSON.stringify(response.view)!==prior)throw new Error('Locale roundtrip changed view');
   await restart();view=response.view;
  }
  const choices=view.actions.filter(a=>a.action.type==='choice'&&a.action.id!=='continue');
  const chosen=overrides.has(node)?choices.find(a=>a.action.id===overrides.get(node))
   : id.startsWith('seasonal_')&&choices.length
   ? (seasonalChoice==='leave'?choices.find(a=>a.action.id==='leave'):choices[seasonalChoice==='second'?1:0])
   : id==='shared_4'?choices.find(a=>a.action.id===timelineChoice)
   : includeHolidays&&id.startsWith('holiday_')&&holidayChoice==='leave'?choices.find(a=>a.action.id==='leave')
   : route==='withdraw'&&id==='rebeka_6'?choices.find(a=>a.action.id==='withdraw'):null;
  if(overrides.has(node)&&!chosen)throw new Error('Requested choice unavailable: '+node);
  view=await act((chosen??view.actions[0]).action);
 }
 if(view.phase==='scene')throw new Error('Scene budget exceeded');
 if(id.startsWith('holiday_')||id.startsWith('seasonal_'))playedEvents.add(id);
 return view;
}
try{
 if(response.view)throw new Error('Use a fresh save path; this example will not overwrite existing progress.');
 await send('new',{name:'CLI route tester'});
 const person=route==='withdraw'?'rebeka':route;
 const triad={1:['rebeka_1'],2:['boglarka_1'],3:['rebeka_2'],4:['triad_1','boglarka_2'],5:['triad_2'],6:['rebeka_3'],7:['boglarka_3','triad_3'],8:['triad_4'],9:['rebeka_4'],10:['boglarka_4'],11:['triad_5'],12:['triad_6'],13:['rebeka_5','boglarka_5'],14:['triad_7'],16:['triad_8']};
 const plan=person==='triad'?triad:person==='friendship'?{16:['friendship_after']}:{2:[person+'_1'],5:[person+'_2'],7:[person+'_3'],10:[person+'_4'],13:[person+'_5'],16:[person+'_6']};
 const storyWeeks=response.view.calendar.storyWeeks;
 const calendarPlan=Object.fromEntries(Object.entries(plan).map(([chapter,ids])=>[storyWeeks[Number(chapter)-1],ids]));
 if(args.includes('--date-week')&&person==='greta'){const dateWeek=Number(option('--date-week','28'));if(!Number.isInteger(dateWeek)||dateWeek<28||dateWeek>49)throw new Error('Complete-route date week must be 28–49; week50 leaves no commitment slot.');delete calendarPlan[storyWeeks[6]];if(dateWeek>=43){delete calendarPlan[43];delete calendarPlan[48];calendarPlan[dateWeek]=['greta_3','greta_4'];calendarPlan[Math.max(48,dateWeek+1)]=['greta_5'];}else calendarPlan[dateWeek]=['greta_3'];}
 if(args.includes('--greta-year')){
  if(person!=='greta')throw new Error('--greta-year requires --route greta');
  const privateWeek=Number(option('--private-week','29')),companyWeek=Number(option('--company-week','33'));
  if(!Number.isInteger(privateWeek)||privateWeek<28||privateWeek>32||!Number.isInteger(companyWeek)||companyWeek<33||companyWeek>37)throw new Error('Use private week28–32 and company week33–37.');
  calendarPlan[privateWeek]=[...(calendarPlan[privateWeek]??[]),'greta_private'];
  calendarPlan[companyWeek]=[...(calendarPlan[companyWeek]??[]),'greta_company'];
 }
 for(let week=1;week<=response.view.totalWeeks;week++){
  let v=response.view;const required=v.actions.find(a=>a.action.type==='scene'&&a.action.id.startsWith('shared_'));
  if(required)v=await scene(required.action.id);
  if(week===storyWeeks[7]&&person!=='friendship')v=await act({type:'direction',id:person});
  for(const id of calendarPlan[week]??[]){if(args.includes('--night-personal')&&id.startsWith('greta_')&&v.period==='day')v=await act({type:'activity',kind:'rest'});if(!v.actions.some(a=>a.action.type==='scene'&&a.action.id===id))v=await act({type:'activity',kind:'rest'});v=await scene(id);}
  while(v.phase==='planner'){const holiday=v.actions.find(a=>a.action.type==='scene'&&((includeHolidays&&a.action.id.startsWith('holiday_'))||(includeSeasons&&a.action.id.startsWith('seasonal_'))));v=holiday?await scene(holiday.action.id):await act({type:'activity',kind:'rest'});}
  await act({type:'advance'});
 }
 const expected=route==='withdraw'||overrides.get('greta_6/line_4')==='withdraw'?'estranged':route;
 if(response.view.phase!=='ending'||response.view.ending.relationship!==expected)throw new Error('Wrong ending');
 if(transcript)await send('transcript',{path:transcript});
 const coverage=await send('coverage'); // Current view is returned alongside coverage.
 console.log(JSON.stringify({route,commands,restarts,phase:coverage.phase,ending:coverage.ending.relationship,holidayScenes:[...playedEvents].filter(id=>id.startsWith('holiday_')),seasonalScenes:[...playedEvents].filter(id=>id.startsWith('seasonal_')),week:coverage.week,totalWeeks:coverage.totalWeeks,playedLines:response.coverage.playedLines.length,release:response.release,save}));
 await send('quit');child.stdin.end();
 const [code]=await once(child,'exit');if(code!==0)throw new Error('CLI exit '+code);
}catch(error){child.kill();throw error;}
