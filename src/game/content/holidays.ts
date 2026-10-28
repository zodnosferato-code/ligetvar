/** Optional seasonal meetings. Calendar admission is enforced by the shared engine. */
import {holidayWeek,type HolidayId} from './calendar.ts';
import {scene,say,option} from './authoring.ts';
import {message,storedMessage} from './scene-localization.ts';
import type {MessageKey} from './localization.ts';
import type {ActorId,Scene} from './types.ts';
const key=(event:HolidayId,name:string)=>('holiday.'+event+'.'+name) as MessageKey;
function holiday(event:HolidayId):Scene {
 const halloween=event==='halloween',week=holidayWeek(event);
 const branches=halloween?['story','shadows','leave']:['verse','tea','leave'];
 const opening:ActorId[]=halloween?['narrator','rebeka','boglarka','greta','narrator']:['narrator','boglarka','rebeka','greta','narrator'];
 const names=halloween?['arrival','rebeka','boglarka','greta','question']:['arrival','boglarka','rebeka','greta','question'];
 const x=scene('holiday_'+event,message(key(event,'title')),'conversation',week,week,halloween?'holdkor':'library',['marton','rebeka','boglarka','greta'],opening.map((actor,i)=>say(actor,message(key(event,names[i])),'neutral',i===4?branches.map(id=>({...option(id,message(key(event,id+'.choice')),storedMessage(key(event,'reaction')),{decisions:[event+'_'+id]}),next:id+'_0'})):undefined)),{scenes:['shared_1'],calendar:{events:[event]}},[],storedMessage(key(event,'journal')),undefined,halloween?['night']:['day','night']);
 delete x.lines.at(-1)!.next;
 const voices:Record<string,ActorId[]>={story:['boglarka','marton','narrator','narrator'],shadows:['rebeka','boglarka','narrator','narrator'],verse:['boglarka','rebeka','narrator','narrator'],tea:['boglarka','rebeka','narrator','narrator'],leave:halloween?['rebeka','boglarka','narrator']:['boglarka','rebeka','narrator']};
 for(const id of branches)for(const [i,actor] of voices[id].entries())x.lines.push({id:id+'_'+i,speaker:actor,expression:actor==='narrator'?'neutral':'amused',...message(key(event,id+'.'+i)),...(i<voices[id].length-1?{next:id+'_'+(i+1)}:{})});
 x.outfits={rebeka:event,boglarka:event,greta:event};
 return x;
}
export const holidays:Scene[]=[holiday('halloween'),holiday('christmas')];
