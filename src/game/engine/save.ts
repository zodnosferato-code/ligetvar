import type {GameState,Registry,RuntimeRules} from './types.ts';
export interface StorageLike{getItem(key:string):string|null;setItem(key:string,value:string):void}
export type SaveResult<S extends GameState=GameState>={status:'ok';state:S}|{status:'missing'|'unsupported'|'invalid'};
const object=(x:unknown):x is Record<string,any>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const strings=(x:unknown):x is string[]=>Array.isArray(x)&&x.every(v=>typeof v==='string');
export function decodeSave<S extends GameState>(raw:string|null,r:Registry,rules:RuntimeRules<S>):SaveResult<S>{
 if(!raw)return {status:'missing'};
 try{
  const s=JSON.parse(raw);if(!object(s))return {status:'invalid'};if(s.version!==rules.initial('').version)return {status:'unsupported'};
  const valid=typeof s.name==='string'&&s.name.length<=32&&Number.isInteger(s.week)&&s.week>=1&&s.week<=rules.weeks
   &&Number.isInteger(s.slot)&&s.slot>=0&&s.slot<=3&&['planner','scene','summary','ending','minigame'].includes(s.phase)
   &&typeof s.direction==='string'
   &&typeof s.lastNote==='string'&&['money','energy','exposure'].every(k=>Number.isFinite(s[k])&&s[k]>=0)&&s.energy<=100&&s.exposure<=100
   &&object(s.bonds)&&Object.keys(rules.initial('').bonds).every(k=>Number.isFinite(s.bonds[k])&&s.bonds[k]>=0&&s.bonds[k]<=100)
   &&['completed','evidence','decisions','inventory','jobsWeek'].every(k=>object(s[k]))&&strings(s.preparation)&&strings(s.giftsWeek)
   &&Object.keys(rules.economy.jobs).every(k=>Number.isInteger(s.jobsWeek[k])&&s.jobsWeek[k]>=0)
   &&Object.values(s.inventory).every(n=>Number.isInteger(n)&&Number(n)>=0)
   &&Array.isArray(s.journal)&&s.journal.every((j:any)=>object(j)&&typeof j.text==='string'&&r[j.scene]&&j.week===s.completed[j.scene]);
  if(!valid)return {status:'invalid'};
  for(const [id,week] of Object.entries(s.completed)){
   const x=r[id];if(!x||!Number.isInteger(week)||Number(week)<x.week||Number(week)>x.deadline||Number(week)>s.week)return {status:'invalid'};
   if(!x.evidence.every(id=>s.evidence[id]?.scene===x.id&&s.evidence[id]?.week===week))return {status:'invalid'};
   if(!(x.requires.scenes??[]).every(id=>id in s.completed&&s.completed[id]<=Number(week)))return {status:'invalid'};
   if(!(x.requires.evidence??[]).every(id=>s.evidence[id]?.week<=Number(week)))return {status:'invalid'};
  }
  for(const record of [...Object.values(s.decisions),...Object.values(s.evidence)] as any[])if(!object(record)||!r[record.scene]||record.week!==s.completed[record.scene])return {status:'invalid'};
  for(const [id,record] of Object.entries(s.evidence) as [string,any][])if(!r[record.scene].evidence.includes(id))return {status:'invalid'};
  for(const [id,record] of Object.entries(s.decisions) as [string,any][]){
   const x=r[record.scene];if(![x.onComplete,...x.lines.flatMap(l=>(l.choices??[]).map(c=>c.effect))].some(e=>e?.decisions?.includes(id)))return {status:'invalid'};
  }
  if(s.journal.length!==Object.keys(s.completed).length||new Set(s.journal.map((j:any)=>j.scene)).size!==s.journal.length)return {status:'invalid'};
  const shared=Object.values(r).find(x=>x.kind==='shared'&&x.week===s.week);
  for(let w=1;w<s.week;w++){const x=Object.values(r).find(x=>x.kind==='shared'&&x.week===w);if(!x||!(x.id in s.completed))return {status:'invalid'};}
  if(!shared||(s.slot>0&&!(shared.id in s.completed))||(s.slot===0&&shared.id in s.completed))return {status:'invalid'};
  if((s.phase==='summary'||s.phase==='ending')!==(s.slot===3))return {status:'invalid'};
  if(!rules.validateState(s as S,r))return {status:'invalid'};
  if(s.phase==='ending'&&(s.week!==rules.weeks||!rules.canFinish(s as S)))return {status:'invalid'};
  if(s.phase==='scene'){
   if(!object(s.scene)||!r[s.scene.id]||s.scene.id in s.completed||!r[s.scene.id].lines.some(l=>l.id===s.scene.line)||!Array.isArray(s.scene.pending))return {status:'invalid'};
   const x=r[s.scene.id],allowed=x.lines.flatMap(l=>(l.choices??[]).map(c=>JSON.stringify(c.effect)));
   if(!s.scene.pending.every((e:any)=>object(e)&&allowed.includes(JSON.stringify(e))))return {status:'invalid'};
   if(s.week<x.week||s.week>x.deadline||(s.slot===0)!==(x.kind==='shared'))return {status:'invalid'};
  }else if(s.scene!==null)return {status:'invalid'};
  if(s.phase==='minigame'?!(s.minigame in rules.economy.jobs)||s.slot<1||s.slot>2:s.minigame!==null)return {status:'invalid'};
  return {status:'ok',state:s as S};
 }catch{return {status:'invalid'};}
}
export function readSave<S extends GameState>(storage:StorageLike,r:Registry,rules:RuntimeRules<S>):SaveResult<S>{try{return decodeSave(storage.getItem(rules.saveKey),r,rules);}catch{return {status:'invalid'};}}
export function persist<S extends GameState>(storage:StorageLike,s:S,rules:RuntimeRules<S>){try{storage.setItem(rules.saveKey,JSON.stringify(s));return true;}catch{return false;}}
export function legacyName(storage:StorageLike,key:string,version:number):string|null{try{const s=JSON.parse(storage.getItem(key)??'null');return s?.version===version&&typeof s.name==='string'?s.name.trim().slice(0,32):null;}catch{return null;}}
