import {create} from 'zustand';
import {SCENES} from './content/catalog.ts';
import {activity,applyChoice,buyGift,createInitial,giveGift,nextWeek,openScene,resolveJob,setDirection} from './content/runtime.ts';
import {legacyName,persist,readSave} from './content/saves.ts';
import {LEGACY_SAVE_KEY,type GameState,type GirlId,type RouteId} from './content/types.ts';
interface GameStore{
 mode:'title'|'play';state:GameState;hasSave:boolean;hasLegacy:boolean;saveMessage:string;
 boot:()=>void;start:(name:string)=>void;resume:()=>void;toTitle:()=>void;importName:()=>string|null;
 scene:(id:string)=>void;pick:(id:string)=>void;advance:()=>void;direction:(id:RouteId)=>void;
 activity:(kind:'rest'|'mohu'|'brick')=>void;finishJob:(pay:number)=>void;cancelJob:()=>void;buy:(id:string)=>void;gift:(girl:GirlId,id:string)=>void;
}
export const useGame=create<GameStore>((set,get)=>{
 const update=(state:GameState)=>{if(state===get().state)return;let saved=false;try{saved=persist(localStorage,state);}catch{}set({state,hasSave:saved||get().hasSave,saveMessage:saved?'':'A mentés nem sikerült. A játék ezen a lapon folytatható, de bezárás előtt ellenőrizd a böngésző tárhelyét.'});};
 return {
 mode:'title',state:createInitial(''),hasSave:false,hasLegacy:false,saveMessage:'',
 boot:()=>{let result:ReturnType<typeof readSave>={status:'invalid'},hasLegacy=false;try{result=readSave(localStorage,SCENES);hasLegacy=!!localStorage.getItem(LEGACY_SAVE_KEY);}catch{}set({hasSave:result.status==='ok',hasLegacy,saveMessage:result.status==='invalid'?'A mentés sérült vagy nem illik a történethez; nem töltöttük be.':result.status==='unsupported'?'Ez a mentésverzió nem támogatott; nem töltöttük be.':''});},
 start:name=>{update(createInitial(name));set({mode:'play'});},
 resume:()=>{let result:ReturnType<typeof readSave>={status:'invalid'};try{result=readSave(localStorage,SCENES);}catch{}if(result.status==='ok')set({state:result.state,mode:'play'});else set({hasSave:false,saveMessage:'A mentés nem tölthető be. Nem indítottunk új játékot a helyére.'});},
 toTitle:()=>set({mode:'title'}),importName:()=>{try{return legacyName(localStorage);}catch{return null;}},
 scene:id=>update(openScene(get().state,id,SCENES)),pick:id=>update(applyChoice(get().state,id,SCENES)),advance:()=>update(nextWeek(get().state,SCENES)),direction:id=>update(setDirection(get().state,id)),
 activity:kind=>update(activity(get().state,kind)),finishJob:pay=>{const s=get().state;if(s.minigame)update(resolveJob(s,s.minigame,pay));},
 cancelJob:()=>{const s=get().state;if(s.phase==='minigame')update({...s,phase:'planner',minigame:null});},buy:id=>update(buyGift(get().state,id)),gift:(girl,id)=>update(giveGift(get().state,girl,id))
 };});
