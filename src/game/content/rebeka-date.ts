/** Final pass over the assembled first date, including the staging insertion. */
import {message,storedMessage} from './scene-localization.ts';
import type {MessageKey} from './localization.ts';
import type {Scene} from './types.ts';
const key=(id:string)=>('rebeka.date.'+id) as MessageKey;
export function rewriteRebekaDate(scene:Scene):Scene {
 if(scene.id!=='rebeka_3')return scene;
 const s=structuredClone(scene);
 const title=message(key('title'));s.title=title.text;s.titleKey=title.textKey;
 s.journal=storedMessage(key('journal'));
 for(const line of s.lines){
  Object.assign(line,message(key(line.id)));
  for(const c of line.choices??[]){
   Object.assign(c,message(key(line.id+'.'+c.id)));
   c.reaction=line.id==='line_4'?storedMessage(key('reaction.'+c.id)):'';
  }
 }
 s.lines.find(l=>l.id==='romance_closeness_slow_touch_2')!.speaker='narrator';
 s.lines.find(l=>l.id==='date_private_choice')!.speaker='narrator';
 // The indoor curtains change light, not the saved day/night period.
 for(const [id,stage] of Object.entries(s.stages!)){
  stage.label=storedMessage(key('stage.'+id));
  if(id.startsWith('private'))stage.lighting='evening';
 }
 return s;
}
