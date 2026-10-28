/** Optional ordinary company between the winter holidays and the late investigation. */
import {scene,say,option} from './authoring.ts';
import {message,storedMessage} from './scene-localization.ts';
import type {MessageKey} from './localization.ts';
import type {ActorId,Scene,LocationId} from './types.ts';

type Gathering={season:'spring'|'summer';week:number;deadline:number;location:LocationId;branches:[string,string];voices:[ActorId,ActorId,ActorId]};
const key=(season:Gathering['season'],name:string)=>('seasonal.'+season+'.'+name) as MessageKey;
function gathering({season,week,deadline,location,branches,voices}:Gathering):Scene {
 const choices=[...branches,'leave'];
 const text=(name:string)=>message(key(season,name));
 const result=scene('seasonal_'+season,text('title'),'conversation',week,deadline,location,
  ['marton','rebeka','boglarka','greta'],[
   say('narrator',text('arrival')),
   say('greta',text('greta'),'amused'),
   say('rebeka',text('rebeka'),'amused'),
   say('boglarka',text('boglarka'),'amused'),
   say('narrator',text('question'),'neutral',choices.map(id=>({
    ...option(id,text(id+'.choice'),storedMessage(key(season,'reaction')),{decisions:['seasonal_'+season+'_'+id]}),next:id+'_0'
   })))
  ],{scenes:['shared_1'],calendar:{seasons:[season]}},[],storedMessage(key(season,'journal')),undefined,['day']);
 for(const [index,id] of choices.entries()){
  const speakers:ActorId[]=id==='leave'?['greta','narrator']:[voices[index], 'narrator',voices[2],'narrator'];
  result.lines.push(...speakers.map((speaker,i)=>({id:id+'_'+i,speaker,expression:speaker==='narrator'?'neutral' as const:'amused' as const,
   ...text(id+'.'+i),...(i<speakers.length-1?{next:id+'_'+(i+1)}:{})})));
 }
 return result;
}
export const seasonal:Scene[]=[
 gathering({season:'spring',week:23,deadline:25,location:'courtyard',branches:['sow','names'],voices:['boglarka','rebeka','greta']}),
 gathering({season:'summer',week:37,deadline:39,location:'bekas',branches:['stones','picnic'],voices:['greta','rebeka','boglarka']})
];
