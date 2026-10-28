/** Test-only bridge: progress through ordinary weeks between named story chapters. */
import {activity,nextWeek as advanceWeek} from './runtime.ts';
import {CALENDAR,chapterWeek} from './calendar.ts';
import type {GameState,Registry} from './types.ts';
export {CALENDAR,chapterWeek};
export function nextStory(s:GameState,r:Registry):GameState {
 let next=advanceWeek(s,r),guard=CALENDAR.weeks;
 while(next!==s&&next.phase!=='ending'&&next.slot!==0&&guard--){
  while(next.phase==='planner')next=activity(next,'rest');
  const after=advanceWeek(next,r);
  if(after===next)throw new Error('Campaign stalled between story chapters');
  next=after;
 }
 if(guard<=0)throw new Error('Campaign calendar loop');
 return next;
}
