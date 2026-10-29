/** Connected early Gréta meetings; original progression remains unchanged. */
import {message,storedMessage} from './scene-localization.ts';
import type {gretaEarlyEn} from './locales/greta-early.en.ts';
import type {ActorId,Line,Scene} from './types.ts';
type Key=keyof typeof gretaEarlyEn;
const key=(id:string)=>('greta.early.'+id) as Key;
type Row=readonly [string,ActorId,string|null];
const graphs:Record<'one'|'two',readonly Row[]>={
 one:[
  ["line_0","narrator","line_1"],
  ["line_1","greta","duck"],
  ["duck","marton","answer"],
  ["answer","greta","map"],
  ["map","narrator","line_2"],
  ["line_2","marton","line_3"],
  ["line_3","greta","line_4"],
  ["line_4","narrator",null],
  ["route_0","greta","route_1"],
  ["route_1","marton","route_2"],
  ["route_2","greta","route_3"],
  ["route_3","marton","route_4"],
  ["route_4","greta","end_0"],
  ["water_0","greta","water_1"],
  ["water_1","marton","water_2"],
  ["water_2","greta","water_3"],
  ["water_3","marton","water_4"],
  ["water_4","greta","end_0"],
  ["end_0","greta","end_1"],
  ["end_1","marton","end_2"],
  ["end_2","greta","pack"],
  ["pack","narrator","exit"],
  ["exit","narrator",null],
  ["leave_0","greta","leave_1"],
  ["leave_1","narrator",null]
 ],
 two:[
  ["line_0","narrator","snack"],
  ["snack","greta","reply"],
  ["reply","marton","split"],
  ["split","narrator","uneven"],
  ["uneven","greta","counter"],
  ["counter","marton","eat"],
  ["eat","narrator","line_1"],
  ["line_1","greta","line_2"],
  ["line_2","marton","line_3"],
  ["line_3","greta","line_4"],
  ["line_4","narrator",null],
  ["romance_attraction","greta",null],
  ["ordinary_0","greta","ordinary_1"],
  ["ordinary_1","marton","ordinary_2"],
  ["ordinary_2","greta","ordinary_3"],
  ["ordinary_3","marton","ordinary_4"],
  ["ordinary_4","greta","end_0"],
  ["admit_0","greta","admit_1"],
  ["admit_1","marton","admit_2"],
  ["admit_2","greta","admit_3"],
  ["admit_3","marton","admit_4"],
  ["admit_4","greta","end_0"],
  ["end_0","narrator","end_1"],
  ["end_1","greta","end_2"],
  ["end_2","marton","end_3"],
  ["end_3","greta","pack"],
  ["pack","narrator","exit"],
  ["exit","narrator",null],
  ["friend_0","greta","friend_1"],
  ["friend_1","narrator","friend_exit"],
  ["friend_exit","narrator",null]
 ]
};
export function rewriteGretaEarly(original:Scene):Scene {
 if(original.id!=='greta_1'&&original.id!=='greta_2')return original;
 const s=structuredClone(original),prefix=s.id==='greta_1'?'one':'two';
 const title=message(key(prefix+'.title'));s.title=title.text;s.titleKey=title.textKey;
 s.journal=storedMessage(key(prefix+'.journal'));
 const location=prefix==='one'?'department':'courtyard';
 const stage={location,background:location,participants:['marton','greta'],proximity:'apart'} as const;
 s.stages={meeting:{...stage,participants:[...stage.participants],label:storedMessage(key(prefix==='one'?'stage.office':'stage.courtyard'))},exit:{...stage,participants:[...stage.participants],label:storedMessage(key(prefix==='one'?'stage.door':'stage.gallery'))}};
 s.lines=graphs[prefix].map(([id,speaker,next]):Line=>({id,speaker,...message(key(prefix+'.'+id)),expression:speaker==='greta'?'amused':'neutral',stage:['exit','leave_1','friend_exit'].includes(id)?'exit':'meeting',...(next?{next}:{})}));
 s.lines.find(l=>l.id==='line_4')!.choices=original.lines.find(l=>l.id==='line_4')!.choices!.map(c=>({...c,...message(key('choice.'+prefix+'.'+c.id)),reaction:storedMessage(key('reaction.'+c.id)),next:prefix==='one'?({interest:'route_0',ask:'water_0',leave:'leave_0'}[c.id]):c.id==='yes'?'romance_attraction':'friend_0'}));
 if(prefix==='two'){
  s.lines.find(l=>l.id==='romance_attraction')!.choices=['ordinary','admit'].map(id=>({id,...message(key('choice.topic.'+id)),reaction:'',next:id+'_0',effect:{decisions:[id==='ordinary'?'greta_no_plan':'greta_shared_habit']}}));
  for(const id of ['line_1','line_3','friend_0'])s.lines.find(l=>l.id===id)!.expression='vulnerable';
 }
 return s;
}
