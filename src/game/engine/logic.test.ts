import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import {activity,applyChoice,availableScenes,createInitial,currentLine,nextWeek,openScene,setDirection} from './logic.ts';
import {decodeSave,encodeSave} from './save.ts';
import type {GameState,Registry,RuntimeRules} from './types.ts';
interface Voyage extends GameState { arrived:boolean }
const rules:RuntimeRules<Voyage>={
 weeks:3,saveKey:'voyage',saveVersions:{gameVersion:'1.0.0',saveSchemaVersion:1,contentCompatibilityVersion:1},initial:name=>({name,week:1,slot:0,phase:'planner',scene:null,minigame:null,money:0,activityPoints:0,energy:50,exposure:0,bonds:{crew:0},direction:'north',decisions:{},evidence:{},completed:{},preparation:[],inventory:{},giftsWeek:[],journal:[],lastNote:'',arrived:false}),
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

test('injected sparse story weeks allow ordinary weeks without bypassing required events',()=>{
 const sparseRules:RuntimeRules<Voyage>={...rules,schedule:{storyWeeks:[1,3],slots:{1:'day',2:'night'},activities:{rest:['day','night']}}};
 const sparse={voyage_1:registry.voyage_1,voyage_3:registry.voyage_3};
 let s=createInitial('Ada',sparseRules);
 s=applyChoice(applyChoice(openScene(s,'voyage_1',sparse,sparseRules.schedule),'north',sparse,sparseRules),'continue',sparse,sparseRules);
 s=nextWeek(activity(activity(s,'rest',sparseRules),'rest',sparseRules),sparse,sparseRules);
 assert.equal(s.week,2);assert.equal(s.slot,1);assert.equal(availableScenes(s,sparse,sparseRules.schedule).length,0);
 assert.equal(decodeSave(encodeSave(s,sparseRules),sparse,sparseRules).status,'ok');
 assert.equal(decodeSave(encodeSave({...s,slot:0},sparseRules),sparse,sparseRules).status,'invalid');
 s=activity(activity(s,'rest',sparseRules),'rest',sparseRules);
 assert.equal(nextWeek(s,{voyage_1:registry.voyage_1},sparseRules),s,'missing mandatory event must block advancement');
 s=nextWeek(s,sparse,sparseRules);assert.equal(s.week,3);assert.equal(s.slot,0);
 assert.equal(activity(s,'rest',sparseRules),s);
 s=applyChoice(applyChoice(openScene(s,'voyage_3',sparse,sparseRules.schedule),'north',sparse,sparseRules),'continue',sparse,sparseRules);
 s=nextWeek(activity(activity(s,'rest',sparseRules),'rest',sparseRules),sparse,sparseRules);
 assert.equal(s.phase,'ending');assert.equal(decodeSave(encodeSave(s,sparseRules),sparse,sparseRules).status,'ok');
});

test('calendar admission and choice gates use injected campaign context, including pending-save validation',()=>{
 const calendarRules:RuntimeRules<Voyage>={...rules,schedule:{slots:{1:'day',2:'night'},activities:{},calendar:week=>({season:week===1?'cold':'warm',events:week===1?['festival']:[]})}};
 const r=structuredClone(registry);r.voyage_1.requires={calendar:{seasons:['cold'],events:['festival']}};
 r.voyage_1.lines[0].choices!.push({id:'summer',text:'Warm route',reaction:'',next:'north',requires:{calendar:{seasons:['warm']}},effect:{decisions:['summer_only']}});
 const start=createInitial('Ada',calendarRules);
 assert.equal(openScene(start,'voyage_1',r),start,'calendar requirements fail closed without injected context');
 const s=openScene(start,'voyage_1',r,calendarRules.schedule);assert.equal(s.phase,'scene');
 assert.equal(currentLine(s,r,calendarRules.schedule)!.choices!.some(c=>c.id==='summer'),false);
 assert.equal(applyChoice(s,'summer',r,calendarRules),s);
 const forged=structuredClone(s);forged.scene!.pending=[{decisions:['summer_only']}];
 assert.equal(decodeSave(encodeSave(forged,calendarRules),r,calendarRules).status,'invalid');
 assert.equal(decodeSave(encodeSave(s,calendarRules),r,calendarRules).status,'ok');
});

test('active saves reject unplayed, duplicated and missing pending choices',()=>{
 const start=openScene(createInitial('Ada',rules),'voyage_1',registry);
 const chosen=applyChoice(start,'north',registry,rules);
 const check=(s:Voyage)=>decodeSave(encodeSave(s,rules),registry,rules).status;
 assert.equal(check(start),'ok');assert.equal(check(chosen),'ok');
 const early=structuredClone(start);early.scene!.pending=chosen.scene!.pending;
 assert.equal(check(early),'invalid','a later choice cannot be pending at the entry');
 const duplicate=structuredClone(chosen);duplicate.scene!.pending.push(...chosen.scene!.pending);
 assert.equal(check(duplicate),'invalid','one choice cannot grant its effect twice');
 const missing=structuredClone(chosen);missing.scene!.pending=[];
 assert.equal(check(missing),'invalid','the effect-free hidden route is not available');
});

test('active saves enforce scene admission without charging a paid visit twice',()=>{
 const start=openScene(createInitial('Ada',rules),'voyage_1',registry);
 for(const requires of [{scenes:['voyage_2']},{evidence:['unearned']},{decisions:['unseen']},{directions:['south']},{anyOf:[{decisions:['unseen']},{directions:['south']}]}]){
  const r=structuredClone(registry);r.voyage_1.requires=requires;
  assert.equal(decodeSave(encodeSave(start,rules),r,rules).status,'invalid');
 }
 let s=applyChoice(applyChoice(start,'north',registry,rules),'continue',registry,rules);
 const r=structuredClone(registry);
 r.visit={...structuredClone(r.voyage_1),id:'visit',kind:'relationship',requires:{scenes:['voyage_1'],decisions:['charted_1'],notDecisions:['unseen']},cost:{money:4,points:2}};
 s={...s,money:4,activityPoints:2};s=openScene(s,'visit',r);
 assert.equal(s.money,0);assert.equal(s.activityPoints,0);
 assert.equal(decodeSave(encodeSave(s,rules),r,rules).status,'ok','entry cost was already paid');
 r.visit.requires.notDecisions=['charted_1'];
 assert.equal(decodeSave(encodeSave(s,rules),r,rules).status,'invalid');
});

function pathFixture(){
 const r=structuredClone(registry),base={speaker:'navigator',text:'Sailing',expression:'neutral' as const};
 r.voyage_1.lines=[
  {...base,id:'start',choices:[{id:'north',text:'North',reaction:'',next:'fork',effect:{decisions:['north']}},{id:'south',text:'South',reaction:'',next:'fork',effect:{decisions:['south']}}]},
  {...base,id:'fork',next:'end',choices:[{id:'follow',text:'Follow',reaction:'',next:'local',localRequires:['north'],effect:{decisions:['followed']}},{id:'leave',text:'Leave',reaction:'',effect:{decisions:['left']}}]},
  {...base,id:'local',next:'end'},
  {...base,id:'end'},
 ];return r;
}
test('pending history follows one ordered branch and local requirements',()=>{
 const r=pathFixture(),start=openScene(createInitial('Ada',rules),'voyage_1',r);
 const north=applyChoice(start,'north',r,rules),south=applyChoice(start,'south',r,rules);
 const followed=applyChoice(north,'follow',r,rules);
 for(const s of [north,south,followed,applyChoice(followed,'continue',r,rules),applyChoice(south,'leave',r,rules)])assert.equal(decodeSave(encodeSave(s,rules),r,rules).status,'ok');
 for(const pending of [[...followed.scene!.pending].reverse(),[...south.scene!.pending,followed.scene!.pending[1]],[...north.scene!.pending,...south.scene!.pending]]){
  const bad=structuredClone(followed);bad.scene!.pending=pending;
  assert.equal(decodeSave(encodeSave(bad,rules),r,rules).status,'invalid');
 }
});

test('effect-free branches still obey global gates and preserve valid alternative paths',()=>{
 const r=pathFixture();r.voyage_1.lines[0].choices=[
  {id:'hidden',text:'Hidden',reaction:'',next:'local',requires:{directions:['south']}},
  {id:'safe',text:'Safe',reaction:'',next:'end'},
 ];
 const start=openScene(createInitial('Ada',rules),'voyage_1',r);
 const bad=structuredClone(start);bad.scene!.line='local';
 assert.equal(decodeSave(encodeSave(bad,rules),r,rules).status,'invalid');
 const safe=applyChoice(start,'safe',r,rules);
 assert.equal(decodeSave(encodeSave(safe,rules),r,rules).status,'ok');
 // An equivalent valid route is enough; the save does not record effect-free choices.
 r.voyage_1.lines[0].choices.push({id:'alternate',text:'Alternate',reaction:'',next:'local'});
 assert.equal(decodeSave(encodeSave(bad,rules),r,rules).status,'ok');
});

test('cursor validation terminates on effect-free cycles in injected graphs',()=>{
 const r=pathFixture();r.voyage_1.lines[0].choices=[{id:'loop',text:'Loop',reaction:'',next:'start'}];
 const bad=openScene(createInitial('Ada',rules),'voyage_1',r);bad.scene!.line='end';
 assert.equal(decodeSave(encodeSave(bad,rules),r,rules).status,'invalid');
});
