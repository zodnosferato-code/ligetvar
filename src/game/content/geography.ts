/** Authoring geography: metres along usable paths, not straight-line map distances.
 * Walking minutes are scene continuity guidance, never weekly activity-slot costs.
 * See docs/design/CASTLE-GEOGRAPHY.md for architecture, ecology and route restrictions.
 */
import type {LocationId} from './types.ts';
export type PlaceId=LocationId|'gate'|'residences'|'workshop'|'forest'|'hill'|'village';
export const PLACE_DETAILS:Record<PlaceId,{east:number;north:number;elevation:number;floor:number;description:string}>={
 courtyard:{east:0,north:0,elevation:220,floor:0,description:'Sheltered court south of the main castle; linden, arcade and bench.'},
 hallway:{east:0,north:35,elevation:220,floor:0,description:'Ground-floor main-castle entrance gallery and principal stair.'},
 department:{east:-30,north:45,elevation:225,floor:1,description:'West-wing first-floor study-director office.'},
 apartment:{east:-35,north:70,elevation:230,floor:2,description:'West-wing second-floor staff suite; bedroom faces the western trees.'},
 library:{east:40,north:55,elevation:220,floor:0,description:'East-wing double-height library with a gallery, entered at ground level.'},
 classroom:{east:35,north:110,elevation:220,floor:0,description:'Former north-wing ballroom divided into teaching rooms.'},
 holdkor:{east:140,north:-50,elevation:211,floor:-1,description:'Cellar screening room beneath the converted eastern granary.'},
 chamber:{east:75,north:15,elevation:216,floor:-1,description:'Service chamber beneath the attached east service annex; separate east service exit.'},
 gate:{east:0,north:-300,elevation:212,floor:0,description:'Southern gatehouse and campus arrival court.'},
 residences:{east:210,north:-200,elevation:213,floor:0,description:'Student residences in converted stable and steward-house ranges.'},
 workshop:{east:-180,north:-100,elevation:218,floor:0,description:'Former riding hall, now the mystical gymnastics workshop.'},
 bekas:{east:650,north:350,elevation:196,floor:0,description:'Békás Lake southwest landing and bench, below the castle terrace.'},
 forest:{east:0,north:600,elevation:240,floor:0,description:'Northern boundary stile; continuous oak-hornbeam forest beyond.'},
 hill:{east:-650,north:1000,elevation:325,floor:0,description:'Wooded ridge lookout; no castle-sized summit fortress.'},
 village:{east:300,north:-3100,elevation:185,floor:0,description:'Village square beyond the southern forest road.'},
};
// Undirected, ordinary pedestrian routes. No undocumented tunnel or lakeside shortcut.
export const PATHS:readonly (readonly [PlaceId,PlaceId,number,number])[]=[
 ['apartment','department',55,2],['department','hallway',65,2],['hallway','courtyard',45,1],
 ['hallway','library',60,1],['hallway','classroom',95,2],['library','chamber',85,3],
 ['courtyard','holdkor',180,4],['courtyard','gate',330,5],['gate','residences',260,4],
 ['courtyard','workshop',240,4],['courtyard','bekas',850,12],['holdkor','bekas',780,12],
 ['courtyard','forest',720,12],['forest','hill',1050,22],['gate','village',3200,48],
];
export function walkingRoute(from:PlaceId,to:PlaceId):{metres:number;minutes:number;via:PlaceId[]} {
 const queue=[{place:from,metres:0,minutes:0,via:[from]}];const seen=new Set<PlaceId>();
 while(queue.length){
  queue.sort((a,b)=>a.minutes-b.minutes||a.metres-b.metres);
  const current=queue.shift()!;if(seen.has(current.place))continue;
  if(current.place===to)return {metres:current.metres,minutes:current.minutes,via:current.via};
  seen.add(current.place);
  for(const [a,b,metres,minutes] of PATHS){const next=a===current.place?b:b===current.place?a:null;
   if(next&&!seen.has(next))queue.push({place:next,metres:current.metres+metres,minutes:current.minutes+minutes,via:[...current.via,next]});
  }
 }
 throw new Error(`No pedestrian route: ${from} → ${to}`);
}
