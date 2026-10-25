import type {GiftNote,Delivery} from './content/gifting.ts';
import {create} from 'zustand';
import {SCENES} from './content/catalog.ts';
import {createInitial} from './content/runtime.ts';
import {applyAction,type GameAction} from './content/actions.ts';
import {persist,readSave,saveMessage} from './content/saves.ts';
import {type GameState,type GirlId,type RouteId} from './content/types.ts';
interface GameStore{
 mode:'title'|'play';state:GameState;hasSave:boolean;savePresent:boolean;confirmNewGame:boolean;saveMessage:string;
 boot:()=>void;start:(name:string,replace?:boolean)=>void;cancelNewGame:()=>void;resume:()=>void;toTitle:()=>void;
 scene:(id:string)=>void;pick:(id:string)=>void;advance:()=>void;direction:(id:RouteId)=>void;
 activity:(kind:'rest'|'recycling'|'archive')=>void;finishJob:()=>void;movePuzzle:(index:number)=>void;nextPair:()=>void;cancelJob:()=>void;buy:(id:string)=>void;gift:(girl:GirlId,id:string,note?:GiftNote,delivery?:Delivery)=>void;readGifts:()=>void;
}
export const useGame=create<GameStore>((set,get)=>{
 const update=(state:GameState)=>{if(state===get().state)return;let saved=false;try{saved=persist(localStorage,state);}catch{}set({state,hasSave:saved||get().hasSave,saveMessage:saved?'':'A mentés nem sikerült. A játék ezen a lapon folytatható, de bezárás előtt ellenőrizd a böngésző tárhelyét.'});};
 const act=(action:GameAction)=>update(applyAction(get().state,action));
 return {
 mode:'title',state:createInitial(''),hasSave:false,savePresent:false,confirmNewGame:false,saveMessage:'',
 boot:()=>{let result:ReturnType<typeof readSave>={status:'unavailable'};try{result=readSave(localStorage,SCENES);}catch{}set({hasSave:result.status==='ok',savePresent:result.status!=='missing',saveMessage:result.status==='missing'?'':saveMessage(result)});},
 start:(name,replace=false)=>{
  let result:ReturnType<typeof readSave>={status:'unavailable'};try{result=readSave(localStorage,SCENES);}catch{}
  if(result.status!=='missing'&&!replace){set({confirmNewGame:true});return;}
  update(createInitial(name));set({mode:'play',confirmNewGame:false,savePresent:true});
 },
 cancelNewGame:()=>set({confirmNewGame:false}),
 resume:()=>{let result:ReturnType<typeof readSave>={status:'unavailable'};try{result=readSave(localStorage,SCENES);}catch{}if(result.status==='ok')set({state:result.state,mode:'play',saveMessage:''});else set({hasSave:false,savePresent:result.status!=='missing',saveMessage:saveMessage(result)});},
 toTitle:()=>{set({mode:'title',confirmNewGame:false});get().boot();},
 scene:id=>act({type:'scene',id}),pick:id=>act({type:'choice',id}),advance:()=>act({type:'advance'}),direction:id=>act({type:'direction',id}),
 activity:kind=>act({type:'activity',kind}),finishJob:()=>act({type:'claim'}),movePuzzle:index=>act({type:'tile',index}),nextPair:()=>act({type:'next-pair'}),
 cancelJob:()=>act({type:'cancel-job'}),buy:id=>act({type:'buy',id}),gift:(girl,id,note='noticed',delivery='inPerson')=>act({type:'gift',girl,id,note,delivery}),readGifts:()=>act({type:'read-replies'})
 };});
