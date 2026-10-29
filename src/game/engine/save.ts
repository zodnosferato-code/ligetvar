import {periodAllowed,storyDue,calendarRequirementsMatch,meets} from './logic.ts';
import type {GameState,Registry,RuntimeRules,Scene,Schedule} from './types.ts';
export interface StorageLike{getItem(key:string):string|null;setItem(key:string,value:string):void}
export interface SaveMetadata {gameVersion:string;saveSchemaVersion:number;contentCompatibilityVersion:number;buildId?:string}
export type SaveResult<S extends GameState=GameState>=
 |{status:'ok';state:S;metadata:SaveMetadata}
 |{status:'missing'|'invalid'|'unavailable'}
 |{status:'unsupported';reason:'pre_envelope'|'schema'|'content'|'newer';saved:Partial<SaveMetadata>&{legacyVersion?:number};current:SaveMetadata};
export const encodeSave=<S extends GameState>(state:S,rules:RuntimeRules<S>)=>JSON.stringify({...rules.saveVersions,state});
const object=(x:unknown):x is Record<string,any>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const strings=(x:unknown):x is string[]=>Array.isArray(x)&&x.every(v=>typeof v==='string');
/** Pending effects must describe one playable path to the saved cursor, in order.
 * Effects remain deferred, so global requirements use the unchanged scene-entry state.
 * A visited (line, effect-count) pair also bounds traversal of cyclic fixture graphs.
 */
function reachableCursor(s:GameState,x:Scene,schedule?:Schedule):boolean {
 const cursor=s.scene!;
 const effects=cursor.pending.map(e=>JSON.stringify(e));
 const lines=new Map(x.lines.map(l=>[l.id,l]));
 const queue:[string,number][]=[[x.entry,0]],seen=new Map<string,Set<number>>();
 while(queue.length){
  const [id,count]=queue.pop()!;
  if(seen.get(id)?.has(count))continue;
  if(!seen.has(id))seen.set(id,new Set());seen.get(id)!.add(count);
  if(id===cursor.line&&count===effects.length)return true;
  const line=lines.get(id);if(!line)continue;
  if(!line.choices){if(line.next)queue.push([line.next,count]);continue;}
  for(const choice of line.choices){
   if(choice.requires&&!meets(s,choice.requires,schedule))continue;
   if(!(choice.localRequires??[]).every(d=>cursor.pending.slice(0,count).some(e=>e.decisions?.includes(d))))continue;
   const next=choice.next??line.next;if(!next)continue;
   if(choice.effect){
    if(count<effects.length&&JSON.stringify(choice.effect)===effects[count])queue.push([next,count+1]);
   }else queue.push([next,count]);
  }
 }
 return false;
}
export function decodeSave<S extends GameState>(raw:string|null,r:Registry,rules:RuntimeRules<S>):SaveResult<S>{
 if(raw===null)return {status:'missing'};
 try{
  const data=JSON.parse(raw);if(!object(data))return {status:'invalid'};
  const current=rules.saveVersions;
  if(!('saveSchemaVersion' in data)&&!('state' in data)&&Number.isSafeInteger(data.version)&&data.version>0)return {status:'unsupported',reason:'pre_envelope',saved:{legacyVersion:data.version},current};
  if(typeof data.gameVersion!=='string'||!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(data.gameVersion)||!['saveSchemaVersion','contentCompatibilityVersion'].every(k=>Number.isSafeInteger(data[k])&&data[k]>0)||(data.buildId!==undefined&&(typeof data.buildId!=='string'||data.buildId.length>128)))return {status:'invalid'};
  const metadata:SaveMetadata={gameVersion:data.gameVersion,saveSchemaVersion:data.saveSchemaVersion,contentCompatibilityVersion:data.contentCompatibilityVersion,...(data.buildId!==undefined?{buildId:data.buildId}:{})};
  if(metadata.saveSchemaVersion!==current.saveSchemaVersion||metadata.contentCompatibilityVersion!==current.contentCompatibilityVersion){
   const reason=metadata.saveSchemaVersion>current.saveSchemaVersion||metadata.contentCompatibilityVersion>current.contentCompatibilityVersion?'newer':metadata.saveSchemaVersion!==current.saveSchemaVersion?'schema':'content';
   return {status:'unsupported',reason,saved:metadata,current};
  }
  const s=data.state;if(!object(s))return {status:'invalid'};
  const valid=typeof s.name==='string'&&s.name.length<=32&&Number.isInteger(s.week)&&s.week>=1&&s.week<=rules.weeks
   &&Number.isInteger(s.slot)&&s.slot>=0&&s.slot<=3&&['planner','scene','summary','ending','minigame'].includes(s.phase)
   &&typeof s.direction==='string'
   &&typeof s.lastNote==='string'&&['money','energy','exposure'].every(k=>Number.isFinite(s[k])&&s[k]>=0)&&s.energy<=100&&s.exposure<=100
   &&Number.isSafeInteger(s.activityPoints)&&s.activityPoints>=0
   &&object(s.bonds)&&Object.keys(rules.initial('').bonds).every(k=>Number.isFinite(s.bonds[k])&&s.bonds[k]>=0&&s.bonds[k]<=100)
   &&['completed','evidence','decisions','inventory'].every(k=>object(s[k]))&&strings(s.preparation)&&strings(s.giftsWeek)
   &&Object.values(s.inventory).every(n=>Number.isInteger(n)&&Number(n)>=0)
   &&Array.isArray(s.journal)&&s.journal.every((j:any)=>object(j)&&typeof j.text==='string'&&r[j.scene]&&j.week===s.completed[j.scene]);
  if(!valid)return {status:'invalid'};
  for(const [id,week] of Object.entries(s.completed)){
   const x=r[id];if(!x||!calendarRequirementsMatch(Number(week),x.requires,rules.schedule)||!Number.isInteger(week)||Number(week)<x.week||Number(week)>x.deadline||Number(week)>s.week)return {status:'invalid'};
   if(!x.evidence.every(id=>s.evidence[id]?.scene===x.id&&s.evidence[id]?.week===week))return {status:'invalid'};
   if(!(x.requires.scenes??[]).every(id=>id in s.completed&&s.completed[id]<=Number(week)))return {status:'invalid'};
   if(!(x.requires.evidence??[]).every(id=>s.evidence[id]?.week<=Number(week)))return {status:'invalid'};
  }
  for(const record of [...Object.values(s.decisions),...Object.values(s.evidence)] as any[])if(!object(record)||!r[record.scene]||record.week!==s.completed[record.scene])return {status:'invalid'};
  for(const [id,record] of Object.entries(s.evidence) as [string,any][])if(!r[record.scene].evidence.includes(id))return {status:'invalid'};
  for(const [id,record] of Object.entries(s.decisions) as [string,any][]){
   const x=r[record.scene];if(![x.onComplete,...x.lines.flatMap(l=>(l.choices??[]).filter(c=>!c.requires||calendarRequirementsMatch(record.week,c.requires,rules.schedule)).map(c=>c.effect))].some(e=>e?.decisions?.includes(id)))return {status:'invalid'};
  }
  if(s.journal.length!==Object.keys(s.completed).length||new Set(s.journal.map((j:any)=>j.scene)).size!==s.journal.length)return {status:'invalid'};
  const shared=Object.values(r).find(x=>x.kind==='shared'&&x.week===s.week);
  for(let w=1;w<s.week;w++){const x=Object.values(r).find(x=>x.kind==='shared'&&x.week===w);if(storyDue(w,rules.schedule)&&(!x||!(x.id in s.completed)))return {status:'invalid'};}
  if(storyDue(s.week,rules.schedule)){
   if(!shared||(s.slot>0&&!(shared.id in s.completed))||(s.slot===0&&shared.id in s.completed))return {status:'invalid'};
  }else if(s.slot===0||shared)return {status:'invalid'};
  if((s.phase==='summary'||s.phase==='ending')!==(s.slot===3))return {status:'invalid'};
  if(!rules.validateState(s as S,r))return {status:'invalid'};
  if(s.phase==='ending'&&(s.week!==rules.weeks||!rules.canFinish(s as S)))return {status:'invalid'};
  if(s.phase==='scene'){
   if(!object(s.scene)||!r[s.scene.id]||s.scene.id in s.completed||!r[s.scene.id].lines.some(l=>l.id===s.scene.line)||!Array.isArray(s.scene.pending))return {status:'invalid'};
   const x=r[s.scene.id],allowed=x.lines.flatMap(l=>(l.choices??[]).filter(c=>!c.requires||calendarRequirementsMatch(s.week,c.requires,rules.schedule)).map(c=>JSON.stringify(c.effect)));
   if(!s.scene.pending.every((e:any)=>object(e)&&allowed.includes(JSON.stringify(e))))return {status:'invalid'};
   if(!meets(s as S,x.requires,rules.schedule)||!periodAllowed(s as S,x.periods,rules.schedule)||s.week<x.week||s.week>x.deadline||(s.slot===0)!==(x.kind==='shared'))return {status:'invalid'};
   if(!reachableCursor(s as S,x,rules.schedule))return {status:'invalid'};
  }else if(s.scene!==null)return {status:'invalid'};
  if(s.phase==='minigame'?!(s.minigame in rules.economy.jobs)||s.slot<1||s.slot>2||!periodAllowed(s as S,rules.schedule?.activities[s.minigame],rules.schedule):s.minigame!==null)return {status:'invalid'};
  return {status:'ok',state:s as S,metadata};
 }catch{return {status:'invalid'};}
}
export function persist<S extends GameState>(storage:StorageLike,s:S,rules:RuntimeRules<S>){try{storage.setItem(rules.saveKey,encodeSave(s,rules));return true;}catch{return false;}}
