/** Composition boundary: binds campaign data to the reusable engine. */
import * as engine from '../engine/logic.ts';
import {RULES} from './rules.ts';
import type {Effect,GameState,GirlId,Line,Registry,RouteId,Scene} from './types.ts';
export {clamp,meets,sharedFor} from '../engine/logic.ts';
export {GIFTS,ROUTES,evaluateEnding,isCommitted,canChooseDirection} from './rules.ts';
export const currentPeriod=(s:GameState)=>engine.currentPeriod(s,RULES.schedule);
export const activityAvailable=(s:GameState,kind:string)=>engine.activityAvailable(s,kind,RULES);
export const sceneAvailable=(s:GameState,x:Scene)=>engine.sceneAvailable(s,x,RULES.schedule);
export const sceneLighting=(s:GameState,x:Scene)=>x.periods?.length===2?(currentPeriod(s)==='night'?'evening':'day'):x.lighting;
export const createInitial=(name:string)=>engine.createInitial(name,RULES);
export const availableScenes=(s:GameState,r:Registry)=>engine.availableScenes(s,r,RULES.schedule) as Scene[];
export const currentLine=(s:GameState,r:Registry)=>engine.currentLine(s,r) as Line|undefined;
export const openScene=(s:GameState,id:string,r:Registry)=>engine.openScene(s,id,r,RULES.schedule);
export const applyEffect=(s:GameState,e:Effect,id:string)=>engine.applyEffect(s,e,id,RULES);
export const applyChoice=(s:GameState,id:string,r:Registry)=>engine.applyChoice(s,id,r,RULES);
export const nextWeek=(s:GameState,r:Registry)=>engine.nextWeek(s,r,RULES);
export const setDirection=(s:GameState,id:RouteId)=>engine.setDirection(s,id,RULES);
export const activity=(s:GameState,kind:'rest'|'mohu'|'brick')=>engine.activity(s,kind,RULES);
export const resolveJob=(s:GameState,id:'mohu'|'brick',pay:number)=>engine.resolveJob(s,id,pay,RULES);
export const buyGift=(s:GameState,id:string)=>engine.buyGift(s,id,RULES);
export const giveGift=(s:GameState,girl:GirlId,id:string)=>engine.giveGift(s,girl,id,'marton_'+girl,RULES);

export {formatFt} from './format.ts';
