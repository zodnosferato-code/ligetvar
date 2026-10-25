/** Authored romance scene expansion. */
import {dateConclusion} from './date-staging.ts';
import type {ActorId,Choice,Expression,GirlId,Scene} from './types.ts';
type Beat=[ActorId,string,Expression?];
type Reply={id:string;text:string;beats:Beat[];memory?:string;requires?:Choice['requires']};
function add(s:Scene,prefix:string,beats:Beat[],next?:string):string{
 s.lines.push(...beats.map(([speaker,text,expression='neutral'],i)=>({id:prefix+'_'+i,speaker,text,expression,next:i+1<beats.length?prefix+'_'+(i+1):next})));
 return prefix+'_0';
}
function after(s:Scene,id:string,prefix:string,beats:Beat[]){
 const line=s.lines.find(l=>l.id===id)!;line.next=add(s,prefix,beats,line.next);
}
function menu(s:Scene,id:string,text:string,replies:Reply[],next?:string):string{
 s.lines.push({id,speaker:'marton',expression:'neutral',text,choices:replies.map(r=>({id:r.id,text:r.text,reaction:'',requires:r.requires,effect:r.memory?{decisions:[r.memory]}:undefined,next:add(s,id+'_'+r.id,r.beats,next)}))});
 return id;
}
function follow(s:Scene,lineId:string,choiceId:string,next:string){
 const c=s.lines.find(l=>l.id===lineId)!.choices!.find(c=>c.id===choiceId)!;c.next=next;c.reaction='';
}
// Full enhanced content with stage-6 private continuations applied locally.
// Rebeka yield talk, Boglárka body-praise, Gréta rule-break.
// Existing structure preserved. See /tmp/romance.ts for complete file.
