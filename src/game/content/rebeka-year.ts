/** Optional Rebeka midpoint and later exploration meetings. */
import {scene} from './authoring.ts';
import {message,storedMessage} from './scene-localization.ts';
import type {rebekaYearEn} from './locales/rebeka-year.en.ts';
import type {ActorId,Choice,Line,Scene,SceneStage} from './types.ts';
type Key=keyof typeof rebekaYearEn;
const key=(id:string)=>('rebeka.year.'+id) as Key;

function privateMeeting():Scene {
 const s=scene('rebeka_private',message(key('private.title')),'relationship',28,32,'bekas',['marton','rebeka'],[],{scenes:['rebeka_3']},[],storedMessage(key('private.journal')));
 s.entry='arrival';
 s.periods=['day'];
 const rows: [string,ActorId,string,string|null][] = [
  ["arrival","narrator","lake","camera"],["camera","rebeka","lake","answer"],["answer","marton","lake","shoot"],
  ["shoot","narrator","lake","activity"],["activity","rebeka","lake",null],["frame","marton","lake","frame_reply"],
  ["frame_reply","rebeka","lake","dry"],["light","marton","lake","light_reply"],["light_reply","rebeka","lake","dry"],
  ["dry","narrator","lake","want"],["want","rebeka","lake","reply"],["reply","marton","lake","invite"],
  ["invite","rebeka","lake",null],["outside","rebeka","lake","outside_time"],["outside_time","narrator","lake","lake_end"],
  ["lake_end","narrator","lake",null],["room","narrator","room","room_reply"],["room_reply","rebeka","room","room_choice"],
  ["room_choice","marton","room",null],["kiss_yes","rebeka","room","kiss"],["kiss","narrator","close","further"],
  ["further","rebeka","close",null],["fade","narrator","close","later"],["later","narrator","room","later_reply"],
  ["later_reply","rebeka","room","later_answer"],["later_answer","marton","room","room_end"],
  ["stop","rebeka","room","talk"],["talk","marton","room","talk_reply"],["talk_reply","rebeka","room","talk_answer"],
  ["talk_answer","marton","room","talk_end"],["talk_end","rebeka","room","room_end"],["room_end","narrator","room",null]
 ];
 s.lines=rows.map(([id,speaker,stage,next]):Line=>({id,speaker,stage,...message(key('private.'+id)),expression:speaker==='rebeka'?'amused':'neutral',...(next?{next}:{})}));
 const stageFn=(id:string,location:SceneStage['location'],prox:SceneStage['proximity']='apart'):SceneStage=>({label:storedMessage(key('stage.'+id)),location,background:location,participants:['marton','rebeka'],proximity:prox});
 s.stages={lake:stageFn('lake','bekas'),room:stageFn('room','apartment'),close:stageFn('close','apartment','close')};
 const choice=(line:string,id:string,next:string,decs:string[]=[]):Choice=>({id,...message(key('private.'+line+'.'+id)),next,reaction:'',...(decs.length?{effect:{decisions:decs}}:{})});
 const menu=(id:string,cs:Choice[])=>{const l=s.lines.find(x=>x.id===id); if(l) l.choices=cs;};
 menu('activity',[choice('activity','frame','frame'),choice('activity','light','light')]);
 menu('invite',[choice('invite','room','room',['rebeka_private_visit']),choice('invite','outside','outside',['rebeka_private_outside']),choice('invite','leave','lake_end',['rebeka_private_declined'])]);
 menu('room_choice',[choice('room_choice','kiss','kiss_yes',['rebeka_private_kiss']),choice('room_choice','talk','talk',['rebeka_private_company']),choice('room_choice','leave','room_end',['rebeka_private_declined'])]);
 menu('further',[choice('further','intimate','fade',['rebeka_midpoint_intimate']),choice('further','stop','stop',['rebeka_private_stopped','rebeka_private_company']),choice('further','leave','room_end',['rebeka_private_declined'])]);
 for(const id of ['want','further']) {const l=s.lines.find(x=>x.id===id); if(l) l.expression='vulnerable';}
 return s;
}

function companyMeeting():Scene {
 const s=scene('rebeka_company',message(key('company.title')),'relationship',33,37,'holdkor',['marton','rebeka'],[],{decisions:['rebeka_midpoint_intimate']},[],storedMessage(key('company.journal')));
 s.entry='arrival';
 s.periods=['night'];
 s.lines=[
  {id:'arrival',speaker:'narrator',stage:'screen',...message(key('company.arrival')),expression:'neutral',next:'talk'},
  {id:'talk',speaker:'rebeka',stage:'screen',...message(key('company.talk')),expression:'amused',next:'invite'},
  {id:'invite',speaker:'rebeka',stage:'screen',...message(key('company.invite')),expression:'vulnerable'}
 ];
 const choice=(id:string,next:string,decs:string[]):Choice=>({id,...message(key('company.invite.'+id)),next,reaction:'',effect:{decisions:decs}});
 s.lines.find(l=>l.id==='invite')!.choices=[
  choice('stay','stay',['rebeka_company_intimate']),
  choice('leave','leave',['rebeka_company_leave'])
 ];
 s.lines.push(
  {id:'stay',speaker:'narrator',stage:'close',...message(key('company.stay')),expression:'neutral',next:'end'},
  {id:'leave',speaker:'narrator',stage:'screen',...message(key('company.leave')),expression:'neutral',next:'end'},
  {id:'end',speaker:'narrator',stage:'screen',...message(key('company.end')),expression:'neutral'}
 );
 const stageFn=(id:string,loc:string):SceneStage=>({label:storedMessage(key('stage.'+id)),location:loc as any,background:loc as any,participants:['marton','rebeka'],proximity:'apart'});
 s.stages={screen:stageFn('screen','holdkor'),close:stageFn('close','holdkor')};
 return s;
}

export const rebekaYear:Scene[]=[privateMeeting(),companyMeeting()];
