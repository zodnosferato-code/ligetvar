import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calendarFor,YEAR_DATES} from './calendar.ts';
import {backgroundFor,portraitFor,OUTFIT_PORTRAITS,SEASONAL_BACKGROUNDS} from './assets.ts';
test('academic year is ordered, spans all seasons and selects event clothing',()=>{
 assert.equal(new Set(YEAR_DATES).size,16);
 assert.deepEqual([...YEAR_DATES].sort(),YEAR_DATES);
 assert.equal(new Set(YEAR_DATES.map((_,i)=>calendarFor(i+1).season)).size,4);
 assert.equal(calendarFor(6).outfit,'christmas');
 assert.equal(calendarFor(7).outfit,'winter');
 assert.equal(calendarFor(14).outfit,'summer');
 assert.equal(calendarFor(99).chapter,16);
});
test('missing variants retain usable base art and expose their requested identity',()=>{
 assert.ok(backgroundFor('courtyard','night',6).file);
 assert.equal(backgroundFor('courtyard','night',6).missingVariant,'courtyard/winter/snow/night');
 assert.equal(portraitFor('rebeka','neutral',6).missingVariant,'rebeka/christmas/neutral');
 assert.equal(portraitFor('marton','neutral',6).file,null);
});
test('reviewed event and seasonal variants override fallback without erasing expression',()=>{
 const art={file:'test.webp',status:'reviewed' as const,note:'test'};
 OUTFIT_PORTRAITS.rebeka={christmas:{amused:art}};
 SEASONAL_BACKGROUNDS['courtyard/winter/snow/night']=art;
 try{assert.equal(portraitFor('rebeka','amused',6),art);assert.equal(backgroundFor('courtyard','night',6),art);assert.ok(portraitFor('rebeka','neutral',6).missingVariant);}
 finally{delete OUTFIT_PORTRAITS.rebeka;delete SEASONAL_BACKGROUNDS['courtyard/winter/snow/night'];}
});
