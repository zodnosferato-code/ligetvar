/** First meetings: self-authorship becomes freely chosen company. */
import {message,storedMessage} from './scene-localization.ts';
import type {boglarkaEarlyEn} from './locales/boglarka-early.en.ts';
import type {ActorId,Line,Scene} from './types.ts';
type Key=keyof typeof boglarkaEarlyEn;
const key=(id:string)=>('boglarka.early.'+id) as Key;
type Row=readonly [string,ActorId,string|null];
const graphs:Record<"one"|"two",readonly Row[]>={
 one:[
  ["line_0","narrator","line_1"],
  ["line_1","boglarka","read"],
  ["read","narrator","detail"],
  ["detail","boglarka","reply"],
  ["reply","marton","perhaps"],
  ["perhaps","boglarka","credit"],
  ["credit","narrator","line_2"],
  ["line_2","marton","line_3"],
  ["line_3","boglarka","line_4"],
  ["line_4","narrator",null],
  ["letter_0","boglarka","letter_1"],
  ["letter_1","marton","letter_2"],
  ["letter_2","boglarka","letter_3"],
  ["letter_3","marton","letter_4"],
  ["letter_4","boglarka","letter_5"],
  ["letter_5","narrator","end_0"],
  ["word_0","boglarka","word_1"],
  ["word_1","marton","word_2"],
  ["word_2","boglarka","word_3"],
  ["word_3","marton","word_4"],
  ["word_4","boglarka","word_5"],
  ["word_5","narrator","end_0"],
  ["end_0","boglarka","end_1"],
  ["end_1","marton","end_2"],
  ["end_2","narrator","leave"],
  ["leave","boglarka","exit"],
  ["exit","narrator",null],
  ["leave_0","boglarka","leave_1"],
  ["leave_1","narrator",null],
 ],
 two:[
  ["line_0","narrator","bookmark"],
  ["bookmark","boglarka","question"],
  ["question","marton","note"],
  ["note","boglarka","reading"],
  ["reading","marton","answer"],
  ["answer","boglarka","book_away"],
  ["book_away","narrator","line_1"],
  ["line_1","boglarka","line_2"],
  ["line_2","marton","line_3"],
  ["line_3","boglarka","line_4"],
  ["line_4","narrator",null],
  ["romance_attraction","boglarka",null],
  ["quiet_0","boglarka","quiet_1"],
  ["quiet_1","marton","quiet_2"],
  ["quiet_2","boglarka","quiet_3"],
  ["quiet_3","marton","quiet_4"],
  ["quiet_4","narrator","end_0"],
  ["share_0","boglarka","share_1"],
  ["share_1","marton","share_2"],
  ["share_2","boglarka","share_3"],
  ["share_3","marton","share_4"],
  ["share_4","boglarka","share_5"],
  ["share_5","narrator","end_0"],
  ["end_0","boglarka","end_1"],
  ["end_1","marton","end_2"],
  ["end_2","boglarka","leave"],
  ["leave","narrator",null],
  ["friend_0","boglarka","friend_1"],
  ["friend_1","narrator",null],
 ],
};
export function rewriteBoglarkaEarly(original:Scene):Scene {
 if(original.id!=='boglarka_1'&&original.id!=='boglarka_2')return original;
 const s=structuredClone(original),prefix=s.id==='boglarka_1'?'one':'two';
 const title=message(key(prefix+'.title'));s.title=title.text;s.titleKey=title.textKey;
 s.journal=storedMessage(key(prefix+'.journal'));
 const location={location:'library',background:'library',participants:['marton','boglarka'],proximity:'apart'} as const;
 s.stages={
  meeting:{...location,participants:[...location.participants],label:storedMessage(key(prefix==='one'?'stage.table':'stage.alcove'))},
  exit:{...location,participants:[...location.participants],label:storedMessage(key('stage.exit'))}
 };
 s.lines=graphs[prefix].map(([id,speaker,next]):Line=>({
  id,speaker,...message(key(prefix+'.'+id)),expression:speaker==='boglarka'?'amused':'neutral',
  stage:['exit','leave_1','friend_1'].includes(id)||(prefix==='two'&&id==='leave')?'exit':'meeting',...(next?{next}:{})
 }));
 // Original admission and consequential effects stay campaign-owned and unchanged.
 s.lines.find(l=>l.id==='line_4')!.choices=original.lines.find(l=>l.id==='line_4')!.choices!.map(c=>({
  ...c,...message(key('choice.'+prefix+'.'+c.id)),reaction:storedMessage(key('reaction.'+c.id)),
  next:prefix==='one'?({interest:'letter_0',ask:'word_0',leave:'leave_0'}[c.id]):c.id==='yes'?'romance_attraction':'friend_0'
 }));
 if(prefix==='two')s.lines.find(l=>l.id==='romance_attraction')!.choices=['quiet','share'].map(id=>({
  id,...message(key('choice.topic.'+id)),reaction:'',next:id+'_0',
  effect:{decisions:[id==='quiet'?'boglarka_quiet':'boglarka_listening']}
 }));
 if(prefix==='two')s.lines.find(l=>l.id==='line_3')!.expression='vulnerable';
 return s;
}
