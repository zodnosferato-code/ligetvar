/** An authored present disagreement; never invent a prior player offence. */
import {message,storedMessage} from './scene-localization.ts';
import type {rebekaConflictEn} from './locales/rebeka-conflict.en.ts';
import type {ActorId,Line,Scene} from './types.ts';
type Key=keyof typeof rebekaConflictEn;
const key=(id:string)=>('rebeka.conflict.'+id) as Key;
export function rewriteRebekaConflict(original:Scene):Scene {
 const s=structuredClone(original),title=message(key('title'));
 s.title=title.text;s.titleKey=title.textKey;s.journal=storedMessage(key('journal'));
 const oldChoices=s.lines.find(l=>l.id==='line_4')!.choices!;
 const beat=(id:string,speaker:ActorId,next?:string):Line=>({id,speaker,...message(key(id)),expression:speaker==='rebeka'?'vulnerable':'neutral',next,stage:id==='leave'?'exit':'table'});
 s.lines=[
  beat("line_0","narrator","line_1"),
  beat("line_1","rebeka","crossed"),
  beat("crossed","narrator","line_2"),
  beat("line_2","marton","correction"),
  beat("correction","rebeka","specific"),
  beat("specific","marton","sleeve"),
  beat("sleeve","rebeka","line_3"),
  beat("line_3","rebeka","answer"),
  beat("answer","marton","line_4"),
  beat("line_4","narrator"),
  beat("romance_repair","narrator"),
  beat("romance_repair_ask_space_0","marton","romance_repair_ask_space_1"),
  beat("romance_repair_ask_space_1","rebeka","romance_repair_ask_space_2"),
  beat("romance_repair_ask_space_2","marton","romance_repair_ask_space_3"),
  beat("romance_repair_ask_space_3","rebeka","romance_repair_end_0"),
  beat("romance_repair_name_fault_0","marton","romance_repair_name_fault_1"),
  beat("romance_repair_name_fault_1","rebeka","romance_repair_name_fault_2"),
  beat("romance_repair_name_fault_2","marton","romance_repair_name_fault_3"),
  beat("romance_repair_name_fault_3","rebeka","romance_repair_name_fault_4"),
  beat("romance_repair_name_fault_4","narrator","romance_repair_end_0"),
  beat("romance_repair_end_0","narrator","romance_repair_end_1"),
  beat("romance_repair_end_1","rebeka","not_finished"),
  beat("not_finished","marton","disagree"),
  beat("disagree","rebeka","leave"),
  beat("leave","narrator"),
  beat("withdraw_0","rebeka","withdraw_1"),
  beat("withdraw_1","marton","withdraw_2"),
  beat("withdraw_2","narrator"),
 ];
 s.stages={table:{label:storedMessage(key('stage.table')),location:'holdkor',background:'holdkor',participants:['marton','rebeka'],proximity:'apart'},exit:{label:storedMessage(key('stage.exit')),location:'holdkor',background:'holdkor',participants:['marton','rebeka'],proximity:'apart'}};
 s.lines.find(l=>l.id==='line_4')!.choices=oldChoices.map(c=>({...c,...message(key('choice.'+c.id)),reaction:storedMessage(key('reaction.'+c.id)),next:c.id==='repair'?'romance_repair':'withdraw_0'}));
 s.lines.find(l=>l.id==='romance_repair')!.choices=['ask_space','name_fault'].map(id=>({id,...message(key('choice.'+id)),reaction:'',next:'romance_repair_'+id+'_0'}));
 return s;
}
