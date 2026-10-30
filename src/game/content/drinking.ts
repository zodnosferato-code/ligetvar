/** Optional seasonal drinking and party nights. No forced alcohol, no rewards. */
import {scene,say,option} from './authoring.ts';
import {message,storedMessage} from './scene-localization.ts';
import type {MessageKey} from './localization.ts';
import type {ActorId,Scene,LocationId} from './types.ts';

type Night={id:'autumn'|'winter'|'spring'|'summer';week:number;deadline:number;location:LocationId;periods:('day'|'night')[];voices:[ActorId,ActorId]};
const key=(id:Night['id'],name:string)=>('drinking.'+id+'.'+name) as MessageKey;
function night({id,week,deadline,location,periods,voices}:Night):Scene {
 const choices=['toast','talk','leave'];
 const text=(name:string)=>message(key(id,name));
 const result=scene('drinking_'+id,text('title'),'conversation',week,deadline,location,
  ['marton','rebeka','boglarka','greta'],[
   say('narrator',text('arrival')),
   say(voices[0],text('open'),'amused'),
   say(voices[1],text('reply'),'amused'),
   say('narrator',text('question'),'neutral',choices.map(cid=>({
    ...option(cid,text(cid+'.choice'),storedMessage(key(id,'reaction')),{decisions:['drinking_'+id+'_'+cid]}),next:cid+'_0'
   })))
  ],{scenes:['shared_1'],calendar:{seasons:[id]}},[],storedMessage(key(id,'journal')),undefined,periods);
 for(const cid of choices){
  const speakers:ActorId[]=cid==='leave'?['greta','narrator']:['boglarka','rebeka','narrator'];
  result.lines.push(...speakers.map((speaker,i)=>({id:cid+'_'+i,speaker,expression:speaker==='narrator'?'neutral' as const:'amused' as const,
   ...text(cid+'.'+i),...(i<speakers.length-1?{next:cid+'_'+(i+1)}:{})})));
 }
 return result;
}
export const drinking:Scene[]=[
 night({id:'autumn',week:7,deadline:8,location:'courtyard',periods:['night'],voices:['greta','rebeka']}),
 night({id:'winter',week:15,deadline:15,location:'library',periods:['day','night'],voices:['boglarka','marton']}),
 night({id:'spring',week:26,deadline:28,location:'courtyard',periods:['night'],voices:['rebeka','greta']}),
 night({id:'summer',week:35,deadline:37,location:'bekas',periods:['night'],voices:['greta','boglarka']})
];
