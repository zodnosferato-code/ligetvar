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

test('measured map polylines preserve route lengths and building clearance',async()=>{
 const {readFile}=await import('node:fs/promises');
 const plan=JSON.parse(await readFile(new URL('../../../docs/design/maps/estate-plan.json',import.meta.url),'utf8'));
 for(const room of plan.rooms){
  const building=plan.buildings.find((b:any)=>b.id===room.building);
  const xs=building.polygon.map((p:number[])=>p[0]),ys=building.polygon.map((p:number[])=>p[1]);
  for(const [x,y] of room.polygon)assert.ok(x>=Math.min(...xs)&&x<=Math.max(...xs)&&y>=Math.min(...ys)&&y<=Math.max(...ys),room.id);
 }
 for(const path of plan.paths){
  const edge=PATHS.find(([a,b])=>a===path.fromPlace&&b===path.toPlace);assert.ok(edge);
  assert.equal(edge[2],path.lengthMetres);assert.equal(edge[3],path.minutes);
  let distance=0;
  for(let i=1;i<path.centreline.length;i++){
   const [x,y]=path.centreline[i-1], [xx,yy]=path.centreline[i];const length=Math.hypot(xx-x,yy-y);distance+=length;
   // Half-metre clearance samples catch accidental routing through unrelated buildings.
   for(let j=0;j<=Math.ceil(length*2);j++){
    const t=j/Math.ceil(length*2),px=x+(xx-x)*t,py=y+(yy-y)*t;
    for(const building of plan.buildings){
     if(((path.toPlace==='holdkor'||path.fromPlace==='holdkor')&&building.id==='granary')||(path.toPlace==='workshop'&&building.id==='riding_hall')||(path.toPlace==='residences'&&building.id==='stable_residence'))continue;
     const xs=building.polygon.map((p:number[])=>p[0]),ys=building.polygon.map((p:number[])=>p[1]);
     assert.ok(!(px>Math.min(...xs)+.1&&px<Math.max(...xs)-.1&&py>Math.min(...ys)+.1&&py<Math.max(...ys)-.1),`${path.fromPlace}–${path.toPlace} crosses ${building.id}`);
    }
   }
  }
  assert.ok(Math.abs(distance-path.lengthMetres)<.01,`${path.fromPlace}–${path.toPlace} metric length`);
 }
 for(const [id,place] of Object.entries(PLACE_DETAILS))assert.deepEqual(plan.places[id],{east:place.east,north:place.north,elevation:place.elevation,floor:place.floor});
});
