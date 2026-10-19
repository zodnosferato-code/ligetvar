/** Content authoring helpers. No scene text or campaign rules belong in the engine. */
import type { ActorId, Choice, Effect, Expression, Line, LocationId, Requirements, Scene } from './types.ts';
type Spoken={speaker:ActorId;text:string;expression?:Expression;choices?:Choice[]};
export const say=(speaker:ActorId,text:string,expression:Expression='neutral',choices?:Choice[]):Spoken=>({speaker,text,expression,choices});
export const option=(id:string,text:string,reaction:string,effect?:Effect):Choice=>({id,text,reaction,effect});
export function scene(id:string,title:string,kind:Scene['kind'],week:number,deadline:number,location:LocationId,participants:ActorId[],spoken:Spoken[],requires:Requirements={},evidence:string[]=[],journal=title,onComplete?:Effect):Scene {
 const lines:Line[]=spoken.map((l,i)=>({...l,id:'line_'+i,expression:l.expression??'neutral',...(i<spoken.length-1?{next:'line_'+(i+1)}:{})}));
 return {id,title,kind,week,deadline,location,background:location,lighting:location==='holdkor'?'night':'day',participants,requires,evidence,journal,entry:'line_0',lines,contentStatus:'authored',onComplete};
}
export const shared=(week:number,title:string,location:LocationId,participants:ActorId[],lines:Spoken[],evidence:string[],journal:string,extra:Requirements={}):Scene=>scene('shared_'+week,title,'shared',week,week,location,participants,lines,{...extra,scenes:week>1?['shared_'+(week-1)]:[]},evidence,journal);
