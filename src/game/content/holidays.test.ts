import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calendarFor,holidayWeek,type HolidayId} from './calendar.ts';
import {SCENES,EVIDENCE} from './catalog.ts';
import {holidays} from './holidays.ts';
import {applyChoice,activity,availableScenes,createInitial,currentLine,nextWeek,openScene,meets} from './runtime.ts';
import {encodeSave,decodeSave} from './saves.ts';
import {gameView} from './view.ts';
import {backgroundFor,portraitFor,EVENT_BACKGROUNDS,SEASONAL_BACKGROUNDS,OUTFIT_PORTRAITS,BACKGROUNDS} from './assets.ts';
import {validateRegistry} from './validate.ts';
import type {GameState} from './types.ts';
function finish(s:GameState){let guard=150;while(s.phase==='scene'&&guard--)s=applyChoice(s,currentLine(s,SCENES)!.choices?.[0].id??'continue',SCENES);assert.ok(guard>0);return s;}
function at(week:number){
 let s=createInitial('Holiday tester');
 for(let w=1;w<=week;w++){
  const required=availableScenes(s,SCENES).find(x=>x.kind==='shared');if(required)s=finish(openScene(s,required.id,SCENES));
  if(w===week)return s;
  while(s.phase==='planner')s=activity(s,'rest');s=nextWeek(s,SCENES);
 }
 throw Error('Unreachable');
}
test('holidays belong to their actual seven-day window and do not spill into adjacent weeks',()=>{
 assert.equal(holidayWeek('halloween'),5);assert.equal(holidayWeek('christmas'),13);
 for(const id of ['halloween','christmas'] as HolidayId[]){
  const week=holidayWeek(id);assert.equal(calendarFor(week).event,id);assert.ok(calendarFor(week).events.includes(id));
  assert.ok(!calendarFor(week-1).events.includes(id));assert.ok(!calendarFor(week+1).events.includes(id));
 }
 assert.equal(meets(at(5),{calendar:{seasons:['autumn'],events:['halloween']}}),true);
 assert.equal(meets(at(5),{calendar:{seasons:['winter'],events:['halloween']}}),false);
});
for(const event of ['halloween','christmas'] as HolidayId[])for(const branch of event==='halloween'?['story','shadows','leave']:['verse','tea','leave'])test(event+' / '+branch+': both locales resume at every node, complete once and grant no romance or evidence',()=>{
 let s=at(holidayWeek(event));if(event==='halloween')s=activity(s,'rest');
 const start=s,before=structuredClone(s),id='holiday_'+event;s=openScene(s,id,SCENES);assert.equal(s.scene?.id,id);
 let guard=60,sawChoice=false;
 while(s.phase==='scene'&&guard--){
  assert.deepEqual(s.decisions,before.decisions);assert.deepEqual(s.evidence,before.evidence);
  const hu=gameView(s,'hu'),en=gameView(s,'en');assert.equal(en.calendar.event,event);
  assert.notEqual(en.scene!.text,hu.scene!.text);assert.deepEqual(en.actions.map(a=>a.action),hu.actions.map(a=>a.action));
  assert.ok(en.assets.some(a=>a.role==='background'&&a.missingVariant?.includes('/'+event+'/')));
  const decoded=decodeSave(encodeSave(s),SCENES);assert.equal(decoded.status,'ok');if(decoded.status!=='ok')throw Error('Holiday save rejected');
  assert.deepEqual(gameView(decoded.state,'en'),en);
  const line=currentLine(s,SCENES)!;if(line.choices?.length)sawChoice=true;
  s=applyChoice(decoded.state,line.choices?.length?branch:'continue',SCENES);
 }
 assert.ok(guard>0);assert.ok(sawChoice);assert.equal(s.slot,start.slot+1);assert.equal(s.completed[id],holidayWeek(event));
 assert.ok(s.decisions[event+'_'+branch]);assert.deepEqual(s.bonds,start.bonds);assert.deepEqual(s.evidence,start.evidence);
 assert.notEqual(gameView(s,'en').journal.at(-1)!.text,gameView(s,'hu').journal.at(-1)!.text);
 assert.equal(openScene(s,id,SCENES),s);assert.equal(decodeSave(encodeSave(s),SCENES).status,'ok');
 // A forged witnessed date must not evade the calendar condition, even if all records agree.
 const forged=structuredClone(s);forged.completed[id]--;forged.journal.find(x=>x.scene===id)!.week--;
 for(const d of Object.values(forged.decisions))if(d.scene===id)d.week--;
 assert.equal(decodeSave(encodeSave(forged),SCENES).status,'invalid');
});
test('daytime Halloween, off-calendar direct actions and active holiday saves outside their event fail',()=>{
 const day=at(5);assert.equal(openScene(day,'holiday_halloween',SCENES),day);
 const wrong=at(6),registry=structuredClone(SCENES);registry.holiday_halloween.week=1;registry.holiday_halloween.deadline=52;
 assert.equal(openScene(wrong,'holiday_halloween',registry),wrong,'calendar admission matters independently of numeric windows');
 let active=openScene(activity(day,'rest'),'holiday_halloween',SCENES);active={...active,week:4};
 assert.equal(decodeSave(encodeSave(active),registry).status,'invalid');
 assert.equal(applyChoice(active,'continue',registry),active,'direct continuation cannot bypass event admission');
 assert.equal(availableScenes(at(14),SCENES).some(x=>x.id==='holiday_christmas'),false);
});
test('holiday art wins; missing or unreviewed variants fall back through season and base with explicit identity',()=>{
 const eventArt={file:'event.webp',status:'reviewed' as const,note:'fixture'},seasonArt={file:'season.webp',status:'reviewed' as const,note:'fixture'};
 EVENT_BACKGROUNDS['courtyard/christmas/night']=eventArt;
 SEASONAL_BACKGROUNDS['courtyard/winter/night']=seasonArt;
 OUTFIT_PORTRAITS.rebeka={christmas:{amused:eventArt},winter:{amused:seasonArt}};
 try{
  assert.equal(backgroundFor('courtyard','night',13),eventArt);assert.equal(portraitFor('rebeka','amused',13),eventArt);
  assert.equal(portraitFor('rebeka','amused',13,'winter'),seasonArt);
  assert.equal(portraitFor('rebeka','amused',13,'everyday').missingVariant,undefined);
  EVENT_BACKGROUNDS['courtyard/christmas/night']={...eventArt,status:'transitional'};
  delete OUTFIT_PORTRAITS.rebeka!.christmas;
  const background=backgroundFor('courtyard','night',13),portrait=portraitFor('rebeka','amused',13);
  assert.equal(background.file,'season.webp');assert.equal(background.missingVariant,'courtyard/christmas/night');
  assert.equal(portrait.file,'season.webp');assert.equal(portrait.missingVariant,'rebeka/christmas/amused');
  assert.equal(portraitFor('marton','amused',13).file,null);
 }finally{delete EVENT_BACKGROUNDS['courtyard/christmas/night'];delete SEASONAL_BACKGROUNDS['courtyard/winter/night'];delete OUTFIT_PORTRAITS.rebeka;}
});
test('registry rejects misspelled, empty, impossible and mandatory-story calendar conditions',()=>{
 for(const calendar of [{events:['hallowen']},{seasons:['monsoon']},{events:[]},{events:['halloween'],seasons:['summer']}]){
  const registry=structuredClone(SCENES);registry.holiday_halloween.requires.calendar=calendar;
  assert.throws(()=>validateRegistry(registry,EVIDENCE,new Set(Object.keys(BACKGROUNDS))),/calendar condition/);
 }
 const registry=structuredClone(SCENES);registry.shared_1.requires.calendar={seasons:['autumn']};
 assert.throws(()=>validateRegistry(registry,EVIDENCE,new Set(Object.keys(BACKGROUNDS))),/blocks shared/);
 const invalidOutfit=structuredClone(SCENES);invalidOutfit.holiday_halloween.outfits={rebeka:'missing_costume' as never};
 assert.throws(()=>validateRegistry(invalidOutfit,EVIDENCE,new Set(Object.keys(BACKGROUNDS))),/Invalid scene outfit/);
 assert.equal(holidays.length,2);
});
