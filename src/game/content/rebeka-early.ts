/** Two connected activities leading to the existing first date. */
import {message,storedMessage} from './scene-localization.ts';
import type {rebekaEarlyEn} from './locales/rebeka-early.en.ts';
import type {ActorId,Line,Scene} from './types.ts';
type Key=keyof typeof rebekaEarlyEn;
const key=(id:string)=>('rebeka.early.'+id) as Key;
export function rewriteRebekaEarly(original:Scene):Scene {
 const s=structuredClone(original),one=s.id==='rebeka_1',prefix=one?'one':'two',title=message(key(prefix+'.title'));
 s.title=title.text;s.titleKey=title.textKey;s.journal=storedMessage(key(prefix+'.journal'));
 const old=s.lines.find(l=>l.id===(one?'line_2':'line_4'))!.choices!;
 const beat=(id:string,speaker:ActorId,next?:string):Line=>({id,speaker,...message(key(prefix+'.'+id)),expression:speaker==='rebeka'?'amused':'neutral',next,stage:one?'table':id==='leave'||id==='friend_1'?'exit':id==='line_0'||id.startsWith('film_')?'screen':'talk'});
 s.lines=one?ONE(beat):TWO(beat);
 s.stages=one?{table:{label:storedMessage(key('stage.table')),location:'classroom',background:'classroom',participants:['marton','rebeka'],proximity:'apart'}}:
 {screen:{label:storedMessage(key('stage.screen')),location:'holdkor',background:'holdkor',participants:['marton','rebeka'],proximity:'apart',lighting:'evening'},talk:{label:storedMessage(key('stage.talk')),location:'holdkor',background:'holdkor',participants:['marton','rebeka'],proximity:'apart',lighting:'evening'},exit:{label:storedMessage(key('stage.exit')),location:'holdkor',background:'holdkor',participants:['marton','rebeka'],proximity:'apart'}};
 s.lines.find(l=>l.id===(one?'line_2':'line_4'))!.choices=old.map(c=>({...c,...message(key('choice.'+prefix+'.'+c.id)),reaction:storedMessage(key('reaction.'+c.id)),next:one?({interest:'motion_0',ask:'window_0',leave:'leave_0'}[c.id]):c.id==='yes'?'romance_attraction':'friend_0'}));
 if(!one)s.lines.find(l=>l.id==='romance_attraction')!.choices=['honest','curious'].map(id=>({id,...message(key('choice.topic.'+id)),reaction:'',effect:{decisions:[id==='honest'?'rebeka_unpolished':'rebeka_small_moment']},next:'romance_attraction_'+id+'_0'}));
 return s;
}
type Builder=(id:string,speaker:ActorId,next?:string)=>Line;
function ONE(beat:Builder):Line[]{return [
 beat("line_0","narrator","line_1"),
 beat("line_1","rebeka","question"),
 beat("question","marton","warning"),
 beat("warning","rebeka","jury"),
 beat("jury","narrator","line_2"),
 beat("line_2","narrator"),
 beat("motion_0","rebeka","motion_1"),
 beat("motion_1","marton","motion_2"),
 beat("motion_2","rebeka","motion_3"),
 beat("motion_3","marton","motion_4"),
 beat("motion_4","rebeka","motion_5"),
 beat("motion_5","narrator","line_3"),
 beat("window_0","rebeka","window_1"),
 beat("window_1","marton","window_2"),
 beat("window_2","rebeka","window_3"),
 beat("window_3","marton","window_4"),
 beat("window_4","rebeka","line_3"),
 beat("line_3","rebeka","line_4"),
 beat("line_4","marton","last"),
 beat("last","rebeka","line_5"),
 beat("line_5","narrator"),
 beat("leave_0","rebeka","leave_1"),
 beat("leave_1","narrator"),
];}
function TWO(beat:Builder):Line[]{return [
 beat("line_0","narrator","film_0"),
 beat("film_0","rebeka","film_1"),
 beat("film_1","marton","film_2"),
 beat("film_2","rebeka","film_3"),
 beat("film_3","narrator","line_1"),
 beat("line_1","rebeka","worse"),
 beat("worse","marton","hesitation"),
 beat("hesitation","rebeka","line_2"),
 beat("line_2","marton","line_3"),
 beat("line_3","rebeka","line_4"),
 beat("line_4","narrator"),
 beat("romance_attraction","narrator"),
 beat("romance_attraction_honest_0","marton","romance_attraction_honest_1"),
 beat("romance_attraction_honest_1","rebeka","romance_attraction_honest_2"),
 beat("romance_attraction_honest_2","marton","romance_attraction_honest_3"),
 beat("romance_attraction_honest_3","rebeka","romance_attraction_end_0"),
 beat("romance_attraction_curious_0","marton","romance_attraction_curious_1"),
 beat("romance_attraction_curious_1","rebeka","romance_attraction_curious_2"),
 beat("romance_attraction_curious_2","marton","romance_attraction_curious_3"),
 beat("romance_attraction_curious_3","rebeka","romance_attraction_end_0"),
 beat("romance_attraction_end_0","rebeka","romance_attraction_end_1"),
 beat("romance_attraction_end_1","marton","leave"),
 beat("leave","narrator"),
 beat("friend_0","rebeka","friend_1"),
 beat("friend_1","narrator"),
];}
