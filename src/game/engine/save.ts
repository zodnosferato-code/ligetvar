import {createInitial} from './logic.ts';
import {LEGACY_SAVE_KEY,SAVE_KEY,type GameState,type Registry} from './types.ts';
export interface StorageLike{getItem(key:string):string|null;setItem(key:string,value:string):void}
export type SaveResult={status:'ok';state:GameState}|{status:'missing'|'unsupported'|'invalid'};
const object=(x:unknown):x is Record<string,any>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const strings=(x:unknown):x is string[]=>Array.isArray(x)&&x.every(v=>typeof v==='string');
export function decodeSave(raw:string|null,r:Registry):SaveResult{
 if(!raw)return {status:'missing'};
 try{
  const s=JSON.parse(raw);if(!object(s))return {status:'invalid'};if(s.version!==2)return {status:'unsupported'};
  const valid=typeof s.name==='string'&&s.name.length<=32&&Number.isInteger(s.week)&&s.week>=1&&s.week<=16
   &&Number.isInteger(s.slot)&&s.slot>=0&&s.slot<=3&&['planner','scene','summary','ending','minigame'].includes(s.phase)
   &&['friendship','rebeka','boglarka','greta','triad'].includes(s.direction)&&['public','limited','private'].includes(s.disclosure)
   &&['supported','exhausting',null].includes(s.confrontation)&&['acknowledged','incomplete','suppressed',null].includes(s.institution)
   &&typeof s.lastNote==='string'&&['money','energy','exposure'].every(k=>Number.isFinite(s[k])&&s[k]>=0)&&s.energy<=100&&s.exposure<=100
   &&object(s.bonds)&&Object.keys(createInitial('').bonds).every(k=>Number.isFinite(s.bonds[k])&&s.bonds[k]>=0&&s.bonds[k]<=100)
   &&['completed','evidence','decisions','inventory','jobsWeek'].every(k=>object(s[k]))&&strings(s.preparation)&&strings(s.giftsWeek)
   &&s.giftsWeek.every((g:string)=>['rebeka','boglarka','greta'].includes(g))&&['mohu','brick'].every(k=>Number.isInteger(s.jobsWeek[k])&&s.jobsWeek[k]>=0)
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
  const confrontation=Object.values(r).find(x=>x.resolution==='confrontation'),institution=Object.values(r).find(x=>x.resolution==='institution');
  if(!!s.confrontation!==!!(confrontation&&confrontation.id in s.completed)||!!s.institution!==!!(institution&&institution.id in s.completed))return {status:'invalid'};
  if(s.phase==='ending'&&(s.week!==16||!s.confrontation||!s.institution))return {status:'invalid'};
  if(s.phase==='scene'){
   if(!object(s.scene)||!r[s.scene.id]||s.scene.id in s.completed||!r[s.scene.id].lines.some(l=>l.id===s.scene.line)||!Array.isArray(s.scene.pending))return {status:'invalid'};
   const x=r[s.scene.id],allowed=x.lines.flatMap(l=>(l.choices??[]).map(c=>JSON.stringify(c.effect)));
   if(!s.scene.pending.every((e:any)=>object(e)&&allowed.includes(JSON.stringify(e))))return {status:'invalid'};
   if(s.week<x.week||s.week>x.deadline||(s.slot===0)!==(x.kind==='shared'))return {status:'invalid'};
  }else if(s.scene!==null)return {status:'invalid'};
  if(s.phase==='minigame'?!['mohu','brick'].includes(s.minigame)||s.slot<1||s.slot>2:s.minigame!==null)return {status:'invalid'};
  return {status:'ok',state:s as GameState};
 }catch{return {status:'invalid'};}
}
export function readSave(storage:StorageLike,r:Registry):SaveResult{try{return decodeSave(storage.getItem(SAVE_KEY),r);}catch{return {status:'invalid'};}}
export function persist(storage:StorageLike,s:GameState){try{storage.setItem(SAVE_KEY,JSON.stringify(s));return true;}catch{return false;}}
export function legacyName(storage:StorageLike):string|null{try{const s=JSON.parse(storage.getItem(LEGACY_SAVE_KEY)??'null');return s?.version===1&&typeof s.name==='string'?s.name.trim().slice(0,32):null;}catch{return null;}}
