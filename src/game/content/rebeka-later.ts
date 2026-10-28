/** Connected Rebeka commitment/aftermath pass. Content only; scheduling stays in foundations. */
import {message,storedMessage} from './scene-localization.ts';
import type {rebekaLaterEn} from './locales/rebeka-later.en.ts';
import type {ActorId,Choice,Line,Scene,SceneStage} from './types.ts';
type Key=keyof typeof rebekaLaterEn;
const key=(suffix:string)=>('rebeka.later.'+suffix) as Key;
function line(id:string,speaker:ActorId,suffix:string,next:string|undefined,stage:string):Line {
 return {id,speaker,...message(key(suffix)),expression:speaker==='rebeka'?'vulnerable':'neutral',next,stage};
}
function choice(id:string,suffix:string,next:string,extra:Partial<Choice>={}):Choice {
 return {id,...message(key('choice.'+suffix)),reaction:'',next,...extra};
}
function stage(label:string,location:SceneStage['location'],proximity:SceneStage['proximity']='apart',participants:ActorId[]=['marton','rebeka']):SceneStage {
 return {label:storedMessage(key('stage.'+label)),location,background:location,participants,proximity};
}
export function rewriteRebekaLater(original:Scene):Scene {
 if(original.id!=='rebeka_5'&&original.id!=='rebeka_6')return original;
 const s=structuredClone(original),commit=s.id==='rebeka_5',prefix=commit?'commit':'after';
 const title=message(key(prefix+'.title'));s.title=title.text;s.titleKey=title.textKey;
 s.journal=storedMessage(key(prefix+'.journal'));
 const originalChoices=s.lines.find(l=>l.id==='line_4')!.choices!;
 s.lines=commit?COMMIT_LINES():AFTER_LINES();
 s.stages={courtyard:stage('courtyard','courtyard'),beside:stage('beside','courtyard','beside')};
 if(!commit)Object.assign(s.stages,{room:stage('room','apartment'),resting:stage('room','apartment','beside'),close:stage('close','apartment','close'),leaving:stage('leaving','apartment'),homeward:stage('homeward','courtyard','apart',['marton'])});
 const decision=s.lines.find(l=>l.id==='line_4')!;
 decision.choices=originalChoices.map(c=>({...c,...message(key('choice.'+prefix+'.'+c.id)),reaction:storedMessage(key('reaction.'+(c.id==='withdraw'?'withdraw':commit?'commit':'continue'))),next:c.id==='withdraw'?(commit?'commit_decline':'withdraw_0'):(commit?'romance_future':'after_topic')}));
 if(commit){
  s.lines.find(l=>l.id==='romance_future')!.choices=[
   choice('ritual','future.ritual','romance_future_ritual_0',{effect:{decisions:['rebeka_future_ordinary']}}),
   choice('open','future.open','romance_future_open_0',{effect:{decisions:['rebeka_future_ask']}})];
 }else{
  s.lines.find(l=>l.id==='after_topic')!.choices=[
   choice('ordinary','after.ordinary','ordinary_0',{requires:{decisions:['rebeka_future_ordinary']}}),
   choice('invite','after.invite','invite_0',{requires:{decisions:['rebeka_future_ask']}}),
   choice('coffee','after.coffee','coffee_0',{requires:{scenes:['coffee_rebeka_late']}}),
   choice('rest','after.rest','rest_0')];
  s.lines.find(l=>l.id==='after_invite')!.choices=[choice('room','place.room','room_0'),choice('outside','place.outside','outside_0'),choice('leave','place.leave','goodbye')];
  s.lines.find(l=>l.id==='room_choice')!.choices=[choice('kiss','physical.kiss','kiss_0'),choice('talk','physical.talk','talk_0'),choice('leave','physical.leave','room_depart')];
  s.lines.find(l=>l.id==='intimacy_choice')!.choices=[choice('intimate','intimacy.yes','fade_0'),choice('stop','intimacy.stop','stop_0'),choice('leave','intimacy.leave','room_depart')];
 }
 // The choice prompt is narration; no player voice claims an unchosen action.
 for(const id of ['line_4','romance_future']){const l=s.lines.find(l=>l.id===id);if(l)l.speaker='narrator';}
 return s;
}
function COMMIT_LINES():Line[]{return [
 line("line_0","narrator","commit.line_0","list","courtyard"),
 line("list","marton","commit.list","defence","courtyard"),
 line("defence","rebeka","commit.defence","offer","courtyard"),
 line("offer","marton","commit.offer","hesitate","courtyard"),
 line("hesitate","rebeka","commit.hesitate","line_1","courtyard"),
 line("line_1","rebeka","commit.line_1","line_2","courtyard"),
 line("line_2","marton","commit.line_2","answer","courtyard"),
 line("answer","rebeka","commit.answer","admission","courtyard"),
 line("admission","marton","commit.admission","line_3","courtyard"),
 line("line_3","rebeka","commit.line_3","line_4","courtyard"),
 line("line_4","marton","commit.line_4",undefined,"courtyard"),
 line("romance_future","marton","commit.romance_future",undefined,"beside"),
 line("romance_future_ritual_0","rebeka","commit.romance_future_ritual_0","romance_future_ritual_1","beside"),
 line("romance_future_ritual_1","marton","commit.romance_future_ritual_1","romance_future_ritual_2","beside"),
 line("romance_future_ritual_2","rebeka","commit.romance_future_ritual_2","commit_leave","beside"),
 line("romance_future_open_0","rebeka","commit.romance_future_open_0","romance_future_open_1","beside"),
 line("romance_future_open_1","marton","commit.romance_future_open_1","romance_future_open_2","beside"),
 line("romance_future_open_2","rebeka","commit.romance_future_open_2","commit_leave","beside"),
 line("commit_leave","narrator","commit.commit_leave",undefined,"courtyard"),
 line("commit_decline","rebeka","commit.commit_decline","commit_decline_end","courtyard"),
 line("commit_decline_end","narrator","commit.commit_decline_end",undefined,"courtyard"),
];}
function AFTER_LINES():Line[]{return [
 line("line_0","narrator","after.line_0","bike","courtyard"),
 line("bike","rebeka","after.bike","bicycle","courtyard"),
 line("bicycle","marton","after.bicycle","laugh","courtyard"),
 line("laugh","narrator","after.laugh","line_1","courtyard"),
 line("line_1","rebeka","after.line_1","line_2","courtyard"),
 line("line_2","marton","after.line_2","line_3","courtyard"),
 line("line_3","rebeka","after.line_3","line_4","courtyard"),
 line("line_4","narrator","after.line_4",undefined,"courtyard"),
 line("after_topic","narrator","after.after_topic",undefined,"beside"),
 line("ordinary_0","marton","after.ordinary_0","ordinary_1","beside"),
 line("ordinary_1","rebeka","after.ordinary_1","after_invite","beside"),
 line("invite_0","marton","after.invite_0","invite_1","beside"),
 line("invite_1","rebeka","after.invite_1","after_invite","beside"),
 line("coffee_0","rebeka","after.coffee_0","coffee_1","beside"),
 line("coffee_1","marton","after.coffee_1","after_invite","beside"),
 line("rest_0","rebeka","after.rest_0","rest_1","beside"),
 line("rest_1","marton","after.rest_1","rest_2","beside"),
 line("rest_2","rebeka","after.rest_2","after_invite","beside"),
 line("after_invite","rebeka","after.after_invite",undefined,"beside"),
 line("outside_0","narrator","after.outside_0","outside_1","beside"),
 line("outside_1","rebeka","after.outside_1","goodbye","beside"),
 line("room_0","narrator","after.room_0","room_choice","room"),
 line("room_choice","rebeka","after.room_choice",undefined,"room"),
 line("kiss_0","marton","after.kiss_0","kiss_1","room"),
 line("kiss_1","narrator","after.kiss_1","intimacy_choice","close"),
 line("intimacy_choice","rebeka","after.intimacy_choice",undefined,"close"),
 line("fade_0","marton","after.fade_0","fade_1","close"),
 line("fade_1","narrator","after.fade_1","after_fade","close"),
 line("after_fade","narrator","after.after_fade","room_leave","resting"),
 line("stop_0","marton","after.stop_0","stop_1","close"),
 line("stop_1","rebeka","after.stop_1","quiet_0","room"),
 line("talk_0","marton","after.talk_0","talk_1","room"),
 line("talk_1","rebeka","after.talk_1","quiet_0","room"),
 line("quiet_0","marton","after.quiet_0","quiet_1","room"),
 line("quiet_1","rebeka","after.quiet_1","quiet_2","room"),
 line("quiet_2","narrator","after.quiet_2","room_leave","room"),
 line("room_depart","marton","after.room_depart","room_leave","room"),
 line("room_leave","narrator","after.room_leave","homeward","leaving"),
 line("homeward","narrator","after.homeward",undefined,"homeward"),
 line("goodbye","narrator","after.goodbye",undefined,"courtyard"),
 line("withdraw_0","rebeka","after.withdraw_0","withdraw_1","courtyard"),
 line("withdraw_1","marton","after.withdraw_1","withdraw_2","courtyard"),
 line("withdraw_2","narrator","after.withdraw_2",undefined,"courtyard"),
];}
