import type {GiftNote,Delivery} from './content/gifting.ts';
import {create} from 'zustand';
import {SCENES} from './content/catalog.ts';
import {activity,applyChoice,buyGift,createInitial,giveGift,nextWeek,openScene,finishPuzzle,movePuzzle,nextPair,setDirection} from './content/runtime.ts';
import {persist,readSave} from './content/saves.ts';
import {type GameState,type GirlId,type RouteId} from './content/types.ts';
interface GameStore{
 mode:'title'|'play';state:GameState;hasSave:boolean;saveMessage:string;
 boot:()=>void;start:(name:string)=>void;resume:()=>void;toTitle:()=>void;
 scene:(id:string)=>void;pick:(id:string)=>void;advance:()=>void;direction:(id:RouteId)=>void;
 activity:(kind:'rest'|'recycling'|'archive')=>void;finishJob:()=>void;movePuzzle:(index:number)=>void;nextPair:()=>void;cancelJob:()=>void;buy:(id:string)=>void;gift:(girl:GirlId,id:string,note?:GiftNote,delivery?:Delivery)=>void;readGifts:()=>void;
}
export const useGame=create<GameStore>((set,get)=>{
 const update=(state:GameState)=>{if(state===get().state)return;let saved=false;try{saved=persist(localStorage,state);}catch{}set({state,hasSave:saved||get().hasSave,saveMessage:saved?'':'A mentés nem sikerült. A játék ezen a lapon folytatható, de bezárás előtt ellenőrizd a böngésző tárhelyét.'});};
 return {
 mode:'title',state:createInitial(''),hasSave:false,saveMessage:'',
 boot:()=>{let result:ReturnType<typeof readSave>={status:'invalid'};try{result=readSave(localStorage,SCENES);}catch{}set({hasSave:result.status==='ok',saveMessage:result.status==='invalid'?'A mentés sérült vagy nem illik a történethez; nem töltöttük be.':result.status==='unsupported'?'Ez a mentésverzió nem támogatott; nem töltöttük be.':''});},
 start:name=>{update(createInitial(name));set({mode:'play'});},
 resume:()=>{let result:ReturnType<typeof readSave>={status:'invalid'};try{result=readSave(localStorage,SCENES);}catch{}if(result.status==='ok')set({state:result.state,mode:'play'});else set({hasSave:false,saveMessage:'A mentés nem tölthető be. Nem indítottunk új játékot a helyére.'});},
 toTitle:()=>set({mode:'title'}),
 scene:id=>update(openScene(get().state,id,SCENES)),pick:id=>update(applyChoice(get().state,id,SCENES)),advance:()=>update(nextWeek(get().state,SCENES)),direction:id=>update(setDirection(get().state,id)),
 activity:kind=>update(activity(get().state,kind)),finishJob:()=>update(finishPuzzle(get().state)),movePuzzle:index=>update(movePuzzle(get().state,index)),nextPair:()=>update(nextPair(get().state)),
 cancelJob:()=>{const s=get().state;if(s.phase==='minigame'&&s.puzzle?.moves===0&&s.puzzle.selected.length===0)update({...s,phase:'planner',minigame:null,puzzle:null});},buy:id=>update(buyGift(get().state,id)),gift:(girl,id,note,delivery)=>update(giveGift(get().state,girl,id,note,delivery)),readGifts:()=>update({...get().state,giftHistory:get().state.giftHistory.map(h=>({...h,read:true}))})
 };});
