import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import {activity,applyChoice,availableScenes,createInitial,currentLine,nextWeek,openScene,setDirection} from './logic.ts';
import {decodeSave} from './save.ts';
import type {GameState,Registry,RuntimeRules} from './types.ts';
interface Voyage extends GameState { arrived:boolean }
const rules:RuntimeRules<Voyage>={
 weeks:3,saveKey:'voyage',initial:name=>({version:7,name,week:1,slot:0,phase:'planner',scene:null,minigame:null,money:0,activityPoints:0,energy:50,exposure:0,bonds:{crew:0},direction:'north',decisions:{},evidence:{},completed:{},preparation:[],inventory:{},giftsWeek:[],journal:[],lastNote:'',arrived:false}),
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
  assert.equal(decodeSave(JSON.stringify(s),registry,rules).status,'ok');
  s=applyChoice(s,'continue',registry,rules);assert.ok(s.decisions['charted_'+week]);
  s=nextWeek(activity(activity(s,'rest',rules),'rest',rules),registry,rules);
 }
 assert.equal(s.phase,'ending');assert.equal(s.arrived,true);assert.equal(s.version,7);
 assert.equal(decodeSave(JSON.stringify(s),registry,rules).status,'ok');
});
test('direction policy and unsupported activities are supplied by content',()=>{
 const s=createInitial('Ada',rules);assert.equal(setDirection(s,'east',rules),s);assert.equal(setDirection(s,'south',rules).direction,'south');
 assert.equal(activity(s,'invented',rules),s);
 const r=structuredClone(registry);r.voyage_1.lines[0].choices=r.voyage_1.lines[0].choices!.filter(c=>c.requires);
 const blocked=openScene(s,'voyage_1',r);assert.deepEqual(currentLine(blocked,r)?.choices,[]);assert.equal(applyChoice(blocked,'continue',r,rules),blocked,'continue cannot bypass hidden decisions');
});
test('production engine has no campaign imports, identities, milestones or ending logic',()=>{
 for(const file of ['types.ts','logic.ts','save.ts']){
  const source=readFileSync('src/game/engine/'+file,'utf8');
  assert.doesNotMatch(source,/content\/|rebeka|boglarka|greta|marton|soma|triad|vampire|confrontation|institution|shared_8|ligetvar|hu-HU/);
 }
});
