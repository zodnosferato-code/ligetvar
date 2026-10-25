/** Shared player actions for browser and CLI. No persistence or presentation. */
import * as R from './runtime.ts';
import {SCENES} from './catalog.ts';
import {GIRLS,type GameState,type GirlId,type RouteId} from './types.ts';
import {GIFT_NOTES,type GiftNote,type Delivery} from './gifting.ts';
export type GameAction=
 |{type:'scene'|'choice'|'buy';id:string}
 |{type:'direction';id:RouteId}
 |{type:'activity';kind:'rest'|'recycling'|'archive'}
 |{type:'tile';index:number}
 |{type:'gift';girl:GirlId;id:string;note:GiftNote;delivery:Delivery}
 |{type:'advance'|'claim'|'next-pair'|'cancel-job'|'read-replies'};
export function isGameAction(value:unknown):value is GameAction{
 if(!value||typeof value!=='object'||Array.isArray(value))return false;
 const a=value as Record<string,unknown>;
 switch(a.type){
  case 'scene':case 'choice':case 'buy':return typeof a.id==='string';
  case 'direction':return typeof a.id==='string'&&Object.hasOwn(R.ROUTES,a.id);
  case 'activity':return ['rest','recycling','archive'].includes(a.kind as string);
  case 'tile':return Number.isInteger(a.index)&&Number(a.index)>=0&&Number(a.index)<25;
  case 'gift':return GIRLS.includes(a.girl as GirlId)&&typeof a.id==='string'&&typeof a.note==='string'&&Object.hasOwn(GIFT_NOTES,a.note)&&['remote','inPerson'].includes(a.delivery as string);
  case 'advance':case 'claim':case 'next-pair':case 'cancel-job':case 'read-replies':return true;
  default:return false;
 }
}
export function applyAction(s:GameState,a:GameAction):GameState{
 if(!isGameAction(a))return s;
 switch(a.type){
  case 'scene':return R.openScene(s,a.id,SCENES);
  case 'choice':return R.applyChoice(s,a.id,SCENES);
  case 'buy':return R.buyGift(s,a.id);
  case 'direction':return !R.canChooseDirection(s)||R.isCommitted(s)||s.direction===a.id?s:R.setDirection(s,a.id);
  case 'activity':return R.activity(s,a.kind);
  case 'tile':return R.movePuzzle(s,a.index);
  case 'gift':return R.giveGift(s,a.girl,a.id,a.note,a.delivery);
  case 'advance':return R.nextWeek(s,SCENES);
  case 'claim':return R.finishPuzzle(s);
  case 'next-pair':return s.puzzle?.kind==='archive'&&s.puzzle.selected.length===2?R.nextPair(s):s;
  case 'cancel-job':return s.phase==='minigame'&&s.puzzle?.moves===0&&s.puzzle.selected.length===0?{...s,phase:'planner',minigame:null,puzzle:null}:s;
  case 'read-replies':return s.giftHistory.some(h=>!h.read)?{...s,giftHistory:s.giftHistory.map(h=>({...h,read:true}))}:s;
 }
}
