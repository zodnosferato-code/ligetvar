import type { Effect, GameState, Registry, Requirements, RuntimeRules, Scene, Schedule } from './types.ts';
export function clamp(n:number,min:number,max:number){return Math.max(min,Math.min(max,n));}
export function createInitial<S extends GameState>(name:string,rules:RuntimeRules<S>):S{return rules.initial(name);}
export function calendarMatches(week:number,condition:Requirements["calendar"],schedule?:Schedule):boolean {
 if(!condition)return true;const context=schedule?.calendar?.(week);
 return !!context&&(!condition.seasons||condition.seasons.includes(context.season))&&(!condition.events||condition.events.some(event=>context.events.includes(event)));
}
export function calendarRequirementsMatch(week:number,r:Requirements,schedule?:Schedule):boolean {return calendarMatches(week,r.calendar,schedule)&&(!r.anyOf||r.anyOf.some(branch=>calendarRequirementsMatch(week,branch,schedule)));}
export function meets(s:GameState,r:Requirements,schedule?:Schedule):boolean{return (!r.anyOf||r.anyOf.some(x=>meets(s,x,schedule)))&&(r.scenes??[]).every(x=>x in s.completed)&&(r.evidence??[]).every(x=>x in s.evidence)&&(r.decisions??[]).every(x=>x in s.decisions)&&(r.notDecisions??[]).every(x=>!(x in s.decisions))&&(!r.directions||r.directions.includes(s.direction))&&calendarMatches(s.week,r.calendar,schedule);}
export function sharedFor(r:Registry,w:number){return Object.values(r).find(x=>x.kind==='shared'&&x.week===w);}
export function storyDue(week:number,schedule?:Schedule){return !schedule?.storyWeeks||schedule.storyWeeks.includes(week);}
export function currentPeriod(s:GameState,schedule?:Schedule){return s.slot<3?schedule?.slots[s.slot as 0|1|2]??null:null;}
export function periodAllowed(s:GameState,periods:Scene['periods'],schedule?:Schedule){const period=currentPeriod(s,schedule);return !periods||!schedule||!!period&&periods.includes(period);}
export function activityAvailable<S extends GameState>(s:S,kind:string,rules:RuntimeRules<S>){return s.phase==='planner'&&s.slot>=1&&s.slot<=2&&(kind==='rest'||Object.hasOwn(rules.economy.jobs,kind))&&periodAllowed(s,rules.schedule?.activities[kind],rules.schedule);}
export function sceneAvailable(s:GameState,x:Scene,schedule?:Schedule){return s.phase==='planner'&&!(x.id in s.completed)&&s.week>=x.week&&s.week<=x.deadline&&(s.slot===0?x.kind==='shared'&&x.week===s.week:s.slot<3&&x.kind!=='shared')&&(!x.cost||(s.money>=x.cost.money&&s.activityPoints>=x.cost.points))&&meets(s,x.requires,schedule)&&periodAllowed(s,x.periods,schedule);}
export function availableScenes(s:GameState,r:Registry,schedule?:Schedule){return Object.values(r).filter(x=>sceneAvailable(s,x,schedule)).sort((a,b)=>a.deadline-b.deadline||a.week-b.week||a.id.localeCompare(b.id));}
export function openScene<S extends GameState>(s:S,id:string,r:Registry,schedule?:Schedule):S{const x=r[id];return x&&sceneAvailable(s,x,schedule)?{...s,money:s.money-(x.cost?.money??0),activityPoints:s.activityPoints-(x.cost?.points??0),phase:'scene',scene:{id,line:x.entry,pending:[]},lastNote:''}:s;}
export function currentLine(s:GameState,r:Registry,schedule?:Schedule){const l=s.scene?r[s.scene.id]?.lines.find(l=>l.id===s.scene!.line):undefined;return l?.choices?{...l,choices:l.choices.filter(c=>(!c.requires||meets(s,c.requires,schedule))&&(c.localRequires??[]).every(id=>s.scene?.pending.some(e=>e.decisions?.includes(id))))}:l;}
export function applyEffect<S extends GameState>(s:S,e:Effect,scene:string,rules:RuntimeRules<S>){
 for(const [k,v] of Object.entries(e.bonds??{}))if(k in s.bonds&&v!==undefined)s.bonds[k]=clamp(s.bonds[k]+v,0,100);
 for(const id of e.decisions??[])s.decisions[id]={scene,week:s.week};
 for(const id of e.preparation??[])if(!s.preparation.includes(id))s.preparation.push(id);
 s.exposure=clamp(s.exposure+(e.exposure??0),0,100);
 if(e.direction)s.direction=e.direction;rules.applyEffect?.(s,e);
}
function spendSlot(s:GameState){s.slot=(s.slot+1) as GameState['slot'];s.phase=s.slot===3?'summary':'planner';}
export function applyChoice<S extends GameState>(s:S,id:string,r:Registry,rules:RuntimeRules<S>):S{
 if(s.phase!=='scene'||!s.scene)return s;const x=r[s.scene.id],l=currentLine(s,r,rules.schedule);if(!x||!l||!calendarRequirementsMatch(s.week,x.requires,rules.schedule))return s;
 const c=l.choices?.find(c=>c.id===id);if(l.choices?!c:id!=='continue')return s;
 const n=structuredClone(s);if(c?.effect)n.scene!.pending.push(c.effect);n.lastNote=c?.reaction??'';
 const target=c?.next??l.next;if(target){n.scene!.line=target;return n;}
 for(const e of n.scene!.pending)applyEffect(n,e,x.id,rules);if(x.onComplete)applyEffect(n,x.onComplete,x.id,rules);
 n.completed[x.id]=n.week;for(const key of x.evidence)n.evidence[key]={scene:x.id,week:n.week};
 n.journal.push({scene:x.id,week:n.week,text:x.journal});n.energy=clamp(n.energy+(x.kind==='shared'?rules.economy.sharedEnergy:rules.economy.sceneEnergy),0,100);
 rules.completeScene?.(n,x);n.scene=null;spendSlot(n);return n;
}
export function nextWeek<S extends GameState>(s:S,r:Registry,rules:RuntimeRules<S>):S{
 const required=sharedFor(r,s.week);if(s.phase!=='summary'||s.slot!==3||(storyDue(s.week,rules.schedule)&&(!required||!(required.id in s.completed))))return s;
 if(s.week===rules.weeks)return rules.canFinish(s)?{...s,phase:'ending'}:s;
 const due=storyDue(s.week+1,rules.schedule);
 if(due&&!sharedFor(r,s.week+1))return s;
 return {...s,week:s.week+1,slot:due?0:1,phase:'planner',energy:clamp(s.energy+rules.economy.weeklyEnergy,0,100),money:s.money+rules.economy.weeklyMoney,giftsWeek:[],lastNote:rules.notes.newWeek};
}
export function setDirection<S extends GameState>(s:S,direction:string,rules:RuntimeRules<S>):S{
 const result=rules.directionChange(s,direction);
 return result.allowed?{...s,direction,lastNote:result.note??''}:result.note?{...s,lastNote:result.note}:s;
}
export function activity<S extends GameState>(s:S,kind:string,rules:RuntimeRules<S>):S{
 if(!activityAvailable(s,kind,rules))return s;
 if(kind in rules.economy.jobs)return {...s,phase:'minigame',minigame:kind};
 if(kind!=='rest')return s;
 const n=structuredClone(s);n.energy=clamp(n.energy+rules.economy.restEnergy,0,100);n.lastNote=rules.notes.rest;spendSlot(n);return n;
}
export function resolveJob<S extends GameState>(s:S,kind:string,rawPay:number,rules:RuntimeRules<S>):S{
 const job=rules.economy.jobs[kind];if(!job||s.phase!=='minigame'||s.minigame!==kind||!periodAllowed(s,rules.schedule?.activities[kind],rules.schedule)||!Number.isFinite(rawPay))return s;
 const n=structuredClone(s),pay=Math.round(clamp(rawPay,0,job.maxPay));
 n.money+=pay;n.energy=clamp(n.energy-job.energy,0,100);n.minigame=null;n.lastNote=rules.notes.job(pay);spendSlot(n);return n;
}
export function buyGift<S extends GameState>(s:S,id:string,rules:RuntimeRules<S>):S{const g=Object.hasOwn(rules.economy.gifts,id)?rules.economy.gifts[id]:undefined;return !g||s.phase!=='planner'||s.money<g.price?s:{...s,money:s.money-g.price,inventory:{...s.inventory,[id]:(s.inventory[id]??0)+1},lastNote:rules.notes.purchase};}
