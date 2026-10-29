/** Optional Gréta meetings, using actual calendar weeks and witnessed history. */
import {scene} from './authoring.ts';
import {message,storedMessage} from './scene-localization.ts';
import type {gretaYearEn} from './locales/greta-year.en.ts';
import type {ActorId,Choice,Line,Scene,SceneStage} from './types.ts';
type Key=keyof typeof gretaYearEn;
const key=(id:string)=>('greta.year.'+id) as Key;
type Row=readonly [string,ActorId,string,string|null];
const graphs:Record<'private'|'company',readonly Row[]>={
  "private": [
    ["arrival", "narrator", "lake", "boat"],
    ["boat", "greta", "lake", "answer"],
    ["answer", "marton", "lake", "launch"],
    ["launch", "narrator", "lake", "activity"],
    ["activity", "greta", "lake", null],
    ["repair", "marton", "lake", "repair_reply"],
    ["repair_reply", "greta", "lake", "dry"],
    ["ugly", "marton", "lake", "ugly_reply"],
    ["ugly_reply", "greta", "lake", "dry"],
    ["dry", "narrator", "lake", "want"],
    ["want", "greta", "lake", "reply"],
    ["reply", "marton", "lake", "invite"],
    ["invite", "greta", "lake", null],
    ["outside", "greta", "lake", "outside_time"],
    ["outside_time", "narrator", "lake", "lake_end"],
    ["lake_end", "narrator", "lake", null],
    ["room", "narrator", "room", "room_reply"],
    ["room_reply", "greta", "room", "room_choice"],
    ["room_choice", "marton", "room", null],
    ["kiss_yes", "greta", "room", "kiss"],
    ["kiss", "narrator", "close", "further"],
    ["further", "greta", "close", null],
    ["fade", "narrator", "close", "later"],
    ["later", "narrator", "room", "later_reply"],
    ["later_reply", "greta", "room", "later_answer"],
    ["later_answer", "marton", "room", "room_end"],
    ["stop", "greta", "room", "talk"],
    ["talk", "marton", "room", "talk_reply"],
    ["talk_reply", "greta", "room", "talk_answer"],
    ["talk_answer", "marton", "room", "talk_end"],
    ["talk_end", "greta", "room", "room_end"],
    ["room_end", "narrator", "room", null]
  ],
  "company": [
    ["arrival", "narrator", "court", "food"],
    ["food", "greta", "court", "history"],
    ["history", "narrator", "court", null],
    ["intimate", "greta", "court", "share"],
    ["quiet", "greta", "court", "share"],
    ["outside", "greta", "court", "share"],
    ["present", "marton", "court", "present_reply"],
    ["present_reply", "greta", "court", "share"],
    ["share", "greta", "court", null],
    ["savour", "marton", "court", "savour_reply"],
    ["savour_reply", "narrator", "court", "pleasure"],
    ["menu", "marton", "court", "menu_reply"],
    ["menu_reply", "greta", "court", "menu_answer"],
    ["menu_answer", "marton", "court", "menu_eat"],
    ["menu_eat", "narrator", "court", "pleasure"],
    ["pleasure", "greta", "court", "hand_offer"],
    ["hand_offer", "greta", "court", null],
    ["hand", "narrator", "beside", "hand_reply"],
    ["hand_reply", "greta", "beside", "leave"],
    ["company", "greta", "court", "company_answer"],
    ["company_answer", "marton", "court", "leave"],
    ["leave", "narrator", "court", null]
  ]
};
function meeting(part:'private'|'company'):Scene {
 const isPrivate=part==='private';
 const s=scene('greta_'+part,message(key(part+'.title')),'relationship',isPrivate?28:33,isPrivate?32:37,isPrivate?'bekas':'courtyard',['marton','greta'],[],
  {scenes:[isPrivate?'greta_3':'greta_private'],decisions:['greta_invitation'],notDecisions:['greta_withdraw']},[],storedMessage(key(part+'.journal')));
 s.entry='arrival';
 s.lines=graphs[part].map(([id,speaker,stage,next]):Line=>({id,speaker,stage,...message(key(part+'.'+id)),expression:speaker==='greta'?'amused':'neutral',...(next?{next}:{})}));
 const stage=(id:string,location:SceneStage['location'],proximity:SceneStage['proximity']='apart'):SceneStage=>({label:storedMessage(key('stage.'+id)),location,background:location,participants:['marton','greta'],proximity});
 s.stages=isPrivate?{lake:stage('lake','bekas'),room:stage('room','apartment'),close:stage('close','apartment','close')}:{court:stage('court','courtyard'),beside:stage('beside','courtyard','beside')};
 const choice=(line:string,id:string,next:string,decisions:string[]=[]):Choice=>({id,...message(key(part+'.'+line+'.'+id)),next,reaction:'',...(decisions.length?{effect:{decisions}}:{})});
 const menu=(id:string,choices:Choice[])=>{s.lines.find(l=>l.id===id)!.choices=choices;};
 if(isPrivate){
  menu('activity',[choice('activity','repair','repair'),choice('activity','ugly','ugly')]);
  menu('invite',[choice('invite','room','room',['greta_private_visit']),choice('invite','outside','outside',['greta_private_outside']),choice('invite','leave','lake_end',['greta_private_declined'])]);
  menu('room_choice',[choice('room_choice','kiss','kiss_yes',['greta_private_kiss']),choice('room_choice','talk','talk',['greta_private_company']),choice('room_choice','leave','room_end',['greta_private_declined'])]);
  menu('further',[choice('further','intimate','fade',['greta_midpoint_intimate']),choice('further','stop','stop',['greta_private_stopped','greta_private_company']),choice('further','leave','room_end',['greta_private_declined'])]);
  for(const id of ['want','further'])s.lines.find(l=>l.id===id)!.expression='vulnerable';
 }else{
  const recall=(id:string,decision:string)=>({...choice('history',id,id),requires:{decisions:[decision]}});
  menu('history',[
   recall('intimate','greta_midpoint_intimate'),
   recall('quiet','greta_private_company'),
   recall('outside','greta_private_outside'),
   choice('history','present','present')
  ]);
  menu('share',[choice('share','savour','savour',['greta_company_savour']),choice('share','menu','menu',['greta_company_menu'])]);
  menu('hand_offer',[choice('hand_offer','hand','hand',['greta_company_hand']),choice('hand_offer','company','company'),choice('hand_offer','leave','leave')]);
 }
 return s;
}
export const gretaYear:Scene[]=[meeting('private'),meeting('company')];
