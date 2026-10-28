import {test} from 'node:test';
import assert from 'node:assert/strict';
import {PATHS,PLACE_DETAILS,walkingRoute,type PlaceId} from './geography.ts';
test('suite to secluded lake respects the approved 15–20 minute walk',()=>{
 const route=walkingRoute('apartment','bekas');assert.equal(route.metres,1015);assert.equal(route.minutes,17);
 assert.deepEqual(route.via,['apartment','department','hallway','courtyard','bekas']);
});
test('all places are reachable; paths cannot be shorter than their spatial endpoints',()=>{
 for(const id of Object.keys(PLACE_DETAILS) as PlaceId[])assert.ok(Number.isFinite(walkingRoute('courtyard',id).minutes));
 for(const [a,b,length,time] of PATHS){const p=PLACE_DETAILS[a],q=PLACE_DETAILS[b];assert.ok(length>=Math.hypot(p.east-q.east,p.north-q.north),`${a}–${b}`);assert.ok(time>0);assert.equal(walkingRoute(a,b).minutes,walkingRoute(b,a).minutes);}
});
test('lake-to-Holdkör date round trip needs walking time and village remains remote',()=>{
 assert.equal(walkingRoute('bekas','holdkor').minutes,12);
 assert.equal(walkingRoute('courtyard','village').minutes,53);
 assert.equal(walkingRoute('courtyard','hill').minutes,34);
});
