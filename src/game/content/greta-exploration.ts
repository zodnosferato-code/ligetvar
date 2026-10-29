/** Optional later-year meetings; all history is witnessed, not inferred. */
import {scene} from './authoring.ts';
import {message,storedMessage} from './scene-localization.ts';
import type {gretaExplorationEn} from './locales/greta-exploration.en.ts';
import type {ActorId,Choice,Line,Scene,SceneStage} from './types.ts';
type Part='dance'|'sketch';
type Key=keyof typeof gretaExplorationEn;
const key=(id:string)=>('greta.explore.'+id) as Key;
type Row=readonly [string,ActorId,string,string|null];
const graphs:Record<Part,readonly Row[]>={
 dance: [
  ["arrival", "narrator", "court", "request"],
  ["request", "greta", "court", "answer"],
  ["answer", "marton", "court", "history"],
  ["history", "greta", "court", null],
  ["familiar", "greta", "court", "offer"],
  ["quiet", "greta", "court", "offer"],
  ["snack", "marton", "court", "snack_reply"],
  ["snack_reply", "greta", "court", "offer"],
  ["offer", "greta", "court", null],
  ["steps", "narrator", "dance", "steps_reply"],
  ["steps_reply", "greta", "dance", "steps_answer"],
  ["steps_answer", "marton", "dance", "release"],
  ["release", "narrator", "court", "honest"],
  ["rhythm", "narrator", "court", "rhythm_reply"],
  ["rhythm_reply", "greta", "court", "rhythm_answer"],
  ["rhythm_answer", "marton", "court", "honest"],
  ["honest", "greta", "court", "reply"],
  ["reply", "marton", "court", "invite"],
  ["invite", "greta", "court", null],
  ["outside", "greta", "court", "outside_time"],
  ["outside_time", "narrator", "court", "court_end"],
  ["court_end", "narrator", "court", null],
  ["room", "narrator", "room", "room_choice"],
  ["room_choice", "greta", "room", null],
  ["kiss", "narrator", "close", "further"],
  ["further", "greta", "close", null],
  ["again", "greta", "close", "fade"],
  ["first", "greta", "close", "fade"],
  ["fade", "narrator", "close", "later"],
  ["later", "narrator", "room", "later_reply"],
  ["later_reply", "greta", "room", "room_end"],
  ["stop", "greta", "room", "talk"],
  ["talk", "marton", "room", "talk_reply"],
  ["talk_reply", "greta", "room", "talk_answer"],
  ["talk_answer", "marton", "room", "room_end"],
  ["room_end", "narrator", "room", null]
 ],
 sketch: [
  ["arrival", "narrator", "lake", "paper"],
  ["paper", "greta", "lake", "history"],
  ["history", "narrator", "lake", null],
  ["dance", "greta", "lake", "subject"],
  ["later_private", "greta", "lake", "subject"],
  ["midpoint", "greta", "lake", "subject"],
  ["present", "marton", "lake", "present_reply"],
  ["present_reply", "greta", "lake", "subject"],
  ["subject", "greta", "lake", null],
  ["portraits", "narrator", "lake", "portrait_reply"],
  ["portrait_reply", "greta", "lake", "portrait_answer"],
  ["portrait_answer", "marton", "lake", "pleasure"],
  ["bench", "narrator", "lake", "bench_reply"],
  ["bench_reply", "greta", "lake", "bench_answer"],
  ["bench_answer", "marton", "lake", "pleasure"],
  ["pleasure", "greta", "lake", "question"],
  ["question", "greta", "lake", null],
  ["sing", "marton", "lake", "sing_reply"],
  ["sing_reply", "greta", "lake", "keep"],
  ["read", "marton", "lake", "read_reply"],
  ["read_reply", "greta", "lake", "keep"],
  ["keep", "greta", "lake", null],
  ["exchange", "narrator", "lake", "hand_offer"],
  ["hers", "narrator", "lake", "hand_offer"],
  ["hand_offer", "greta", "lake", null],
  ["hand", "narrator", "beside", "hand_reply"],
  ["hand_reply", "greta", "beside", "release"],
  ["release", "narrator", "lake", "leave"],
  ["company", "marton", "lake", "company_reply"],
  ["company_reply", "greta", "lake", "company_end"],
  ["company_end", "narrator", "lake", "leave"],
  ["leave", "narrator", "lake", null]
 ]
};
function meeting(part:Part):Scene {
 const dance=part==='dance';
 const s=scene('greta_'+part,message(key(part+'.title')),'relationship',dance?38:44,dance?42:47,dance?'courtyard':'bekas',['marton','greta'],[],
  {scenes:['greta_company'],decisions:['greta_invitation'],notDecisions:['greta_withdraw']},[],storedMessage(key(part+'.journal')));
 s.entry='arrival';
 s.lines=graphs[part].map(([id,speaker,stage,next]):Line=>({id,speaker,stage,...message(key(part+'.'+id)),expression:speaker==='greta'?'amused':'neutral',...(next?{next}:{})}));
 const stage=(id:string,location:SceneStage['location'],proximity:SceneStage['proximity']='apart'):SceneStage=>({label:storedMessage(key('stage.'+id)),location,background:location,participants:['marton','greta'],proximity});
 s.stages=dance?{court:stage('court','courtyard'),dance:stage('dance','courtyard','close'),room:stage('room','apartment'),close:stage('close','apartment','close')}:{lake:stage('lake','bekas'),beside:stage('beside','bekas','beside')};
 const choice=(line:string,id:string,next:string,decisions:string[]=[]):Choice=>({id,...message(key(part+'.'+line+'.'+id)),next,reaction:'',...(decisions.length?{effect:{decisions}}:{})});
 const menu=(id:string,choices:Choice[])=>{s.lines.find(l=>l.id===id)!.choices=choices;};
 const recall=(id:string,decision:string)=>({...choice('history',id,id),requires:{decisions:[decision]}});
 if(dance){
  menu('history',[recall('familiar','greta_midpoint_intimate'),recall('quiet','greta_private_company'),choice('history','snack','snack')]);
  menu('offer',[choice('offer','steps','steps',['greta_dance_steps']),choice('offer','rhythm','rhythm',['greta_dance_rhythm']),choice('offer','leave','court_end',['greta_dance_declined'])]);
  menu('invite',[choice('invite','room','room',['greta_dance_visit']),choice('invite','outside','outside',['greta_dance_company']),choice('invite','leave','court_end',['greta_dance_declined'])]);
  menu('room_choice',[choice('room_choice','kiss','kiss',['greta_dance_kiss']),choice('room_choice','talk','talk',['greta_dance_company']),choice('room_choice','leave','room_end',['greta_dance_declined'])]);
  menu('further',[
   {...choice('further','again','again',['greta_dance_intimate']),requires:{decisions:['greta_midpoint_intimate']}},
   {...choice('further','first','first',['greta_dance_intimate']),requires:{notDecisions:['greta_midpoint_intimate']}},
   choice('further','stop','stop',['greta_dance_stopped','greta_dance_company']),choice('further','leave','room_end',['greta_dance_declined'])
  ]);
  for(const id of ['request','honest','further'])s.lines.find(l=>l.id===id)!.expression='vulnerable';
 }else{
  menu('history',[
   {...choice('history','dance','dance'),requires:{anyOf:[{decisions:['greta_dance_steps']},{decisions:['greta_dance_rhythm']}]}},
   recall('later_private','greta_dance_intimate'),recall('midpoint','greta_midpoint_intimate'),choice('history','present','present')
  ]);
  menu('subject',[choice('subject','portraits','portraits',['greta_sketch_portraits']),choice('subject','bench','bench',['greta_sketch_bench'])]);
  menu('question',[choice('question','sing','sing'),choice('question','read','read')]);
  menu('keep',[choice('keep','exchange','exchange',['greta_sketch_exchange']),choice('keep','hers','hers',['greta_sketch_keep'])]);
  menu('hand_offer',[choice('hand_offer','hand','hand',['greta_sketch_hand']),choice('hand_offer','company','company'),choice('hand_offer','leave','leave')]);
 }
 return s;
}
export const gretaExploration:Scene[]=[meeting('dance'),meeting('sketch')];
