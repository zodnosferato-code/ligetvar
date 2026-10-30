import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import {activity,applyChoice,availableScenes,createInitial,currentLine,nextWeek,openScene,setDirection} from './logic.ts';
import {decodeSave,encodeSave} from './save.ts';
import type {GameState,Registry,RuntimeRules} from './types.ts';
interface Voyage extends GameState { arrived:boolean }
const rules:RuntimeRules<Voyage>={
 weeks:3,saveKey:'voyage',saveVersions:{gameVersion:'1.0.0',saveSchemaVersion:1,contentCompatibilityVersion:1},initial:name=>({name,week:1,slot:0,phase:'planner',scene:null,minigame:null,money:0,activityPoints:0,energy:50,exposure:0,bonds:{crew:0},direction:'north',decisions:{},evidence:{},completed:{},preparation:[],inventory:{},giftsWeek:[],journal:[],lastNote:'',arrived:false,preferences:[],gallery:[]}),
 economy:{sharedEnergy:0,sceneEnergy:-2,weeklyEnergy:10,weeklyMoney:0,restEnergy:20,gifts:{},jobs:{}},notes:{initial:'',newWeek:'',rest:'',purchase:'',job:()=>''},
 canFinish:s=>s.arrived,directionChange:(_s,d)=>({allowed:d==='south'}),validateState:s=>typeof s.arrived==='boolean',completeScene:(s,x)=>{if(x.resolution==='landfall')s.arrived=true;}
};
const registry:Registry=Object.fromEntries([1,2,3].map(week=>['voyage_'+week,{id:'voyage_'+week,title:'Deck',kind:'shared',week,deadline:week,participants:['navigator'],location:'deck',background:'deck',lighting:'day',requires:{},evidence:[],journal:'Log',entry:'start',contentStatus:'fixture',resolution:week===3?'landfall':undefined,lines:[{id:'start',speaker:'navigator',text:'Choose',expression:'neutral',choices:[{id:'north',text:'North',reaction:'',next:'north',effect:{decisions:['charted_'+week]}},{id:'secret',text:'Unknown chart',reaction:'',requires:{decisions:['unseen']},next:'north'}]},{id:'north',speaker:'navigator',text:'Sailing',expression:'neutral'}]}]));
test('a three-week unrelated campaign runs, saves and finishes through injected rules',()=>{
 let s=createInitial('Ada',rules);
 for(let week=1;week<=3;week++){
  assert.equal(availableScenes(s,registry)[0].id,'voyage_'+week);
  s=openScene(s,'voyage_'+week,registry);
  assert.equal(applyChoice(s,'secret',registry,rules),s,'inaccessible choice cannot be invoked by ID');
  assert.deepEqual(currentLine(s,registry)?.choices?.map(c=>c.id),['north']);
  s=applyChoice(s,'north',registry,rules);assert.equal(s.decisions['charted_'+week],undefined);
  assert.equal(decodeSave(encodeSave(s,rules),registry,rules).status,'ok');
  s=applyChoice(s,'continue',registry,rules);assert.ok(s.decisions['charted_'+week]);
  s=nextWeek(activity(activity(s,'rest',rules),'rest',rules),registry,rules);
 }
 assert.equal(s.phase,'ending');assert.equal(s.arrived,true);
 assert.equal(decodeSave(encodeSave(s,rules),registry,rules).status,'ok');
});
// ... remaining tests unchanged ...
