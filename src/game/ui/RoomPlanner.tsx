import {useEffect,useRef,type CSSProperties} from 'react';
import {useState} from 'react';
import {SCENES} from '../content/catalog.ts';
import {BACKGROUNDS,LOCATIONS,assetUrl} from '../content/assets.ts';
import {availableScenes,GIFTS,ROUTES,formatFt,isCommitted,canChooseDirection} from '../content/runtime.ts';
import {GIRLS,type RouteId,type Scene} from '../content/types.ts';
import {useGame} from '../store.ts';
import {ActivityCard,Icon} from './controls.tsx';
import {Journal} from './Journal.tsx';

export type RoomId='office'|'home';
type ObjectId='desk'|'phone'|'journal'|'chair'|'shelf'|'bag';
const OBJECTS:Record<ObjectId,{label:string;title:string;icon:'book'|'heart'|'rest'|'gift'|'bottles'|'insight'|'phone'}>={
 desk:{label:'Íróasztal — Műhely és felkészülés',title:'Műhely és felkészülés',icon:'insight'},
 phone:{label:'Telefon — Találkozók',title:'Találkozó egyeztetése',icon:'phone'},
 journal:{label:'Napló — Nyomok és kapcsolatok',title:'Napló és kapcsolatok',icon:'book'},
 chair:{label:'Fotel — Pihenés',title:'Egy csendes óra',icon:'rest'},
 shelf:{label:'Polc — Ajándékok',title:'Ajándékok',icon:'gift'},
 bag:{label:'Zsák — Opcionális munka',title:'Egy kis munka',icon:'bottles'}
};
// Coordinates are percentages of the uncropped source image. Every hotspot has a 44px minimum target.
const ROOMS={
 office:{title:'Tanszéki iroda',background:BACKGROUNDS.department.file!,door:[17,42],objects:{desk:[51,73],phone:[84,79],journal:[68,85],chair:[74,55],shelf:[92,33],bag:[17,86]}},
 home:{title:'Saját szoba',background:BACKGROUNDS.apartment.file!,door:[21,43],objects:{desk:[76,59],phone:[85,26],journal:[92,52],chair:[44,73],shelf:[92,81],bag:[8,76]}}
} as const;
const SHORT_LABEL:Record<ObjectId,string>={desk:'Műhely',phone:'Telefon',journal:'Napló',chair:'Pihenés',shelf:'Ajándék',bag:'Munka'};

export function RoomPlanner({room,onRoomChange,hints,onHintsChange}:{room:RoomId;onRoomChange:(room:RoomId)=>void;hints:boolean;onHintsChange:(show:boolean)=>void}){
 const g=useGame(),s=g.state,available=availableScenes(s,SCENES),[selected,setSelected]=useState<ObjectId|null>(null),heading=useRef<HTMLHeadingElement>(null),hotspots=useRef<Partial<Record<ObjectId,HTMLButtonElement>>>({});
 const current=ROOMS[room],other:RoomId=room==='office'?'home':'office';
 useEffect(()=>{if(selected){heading.current?.focus({preventScroll:true});heading.current?.scrollIntoView({block:'center'});}},[selected]);
 const changeRoom=(next:RoomId)=>{setSelected(null);onRoomChange(next);};
 const open=(id:ObjectId)=>setSelected(id);
 const close=()=>{const previous=selected;setSelected(null);if(previous)hotspots.current[previous]?.focus();};
 const sceneCard=(x:Scene)=><ActivityCard key={x.id} kind={x.kind} title={x.title} description={LOCATIONS[x.location]} detail={(x.kind==='shared'?'Közös alkalom':'1 szabad sáv')+' · Határidő: '+x.deadline+'. hét vége'} onClick={()=>g.scene(x.id)}/>;
 const workshops=available.filter(x=>x.kind==='shared'||x.kind==='preparation');
 const meetings=available.filter(x=>x.kind==='relationship'),coffee=available.filter(x=>x.kind==='conversation');
 const blocked=Object.values(SCENES).filter(x=>(x.kind==='relationship'||x.kind==='conversation')&&x.week<=s.week&&x.deadline>=s.week&&!(x.id in s.completed)&&!available.includes(x));
 const committed=isCommitted(s);
 return <main className="room-planner">
  <div className="room-toolbar"><div><p className="eyebrow">{s.week}. hét · {s.slot===0?'A közös alkalom előtt':'Szabad idő'}</p><h1>{current.title}</h1></div><div className="room-navigation"><nav aria-label="Szobák"><button aria-pressed={room==='office'} onClick={()=>changeRoom('office')}>Iroda</button><button aria-pressed={room==='home'} onClick={()=>changeRoom('home')}>Saját szoba</button></nav><button className="hint-toggle" aria-pressed={hints} onClick={()=>onHintsChange(!hints)}><Icon name="insight"/>{hints?'Segítség elrejtése':'Segítség mutatása'}</button></div></div>
  <p className="room-guidance">{s.slot===0?'A közös alkalom az íróasztalnál vár.':'Érintsd meg a szoba tárgyait. A telefonon személyes találkozót egyeztethetsz.'} A körülnézés és a szobaváltás nem használ időt.</p>
  <div className={'hub-room'+(hints?' show-hints':'')}>
   <img className="hub-art" src={assetUrl(current.background)} alt={room==='office'?'Kastélybeli iroda íróasztallal, telefonnal, füzettel, fotellel, polccal, zsákkal és ajtóval.':'Kastélyszoba fali telefonnal, asztali könyvvel, fotellel, könyvespolccal, zsákkal és ajtóval.'}/>
   {(Object.keys(OBJECTS) as ObjectId[]).map(id=><button key={id} ref={button=>{hotspots.current[id]=button??undefined;}} className={'room-hotspot spot-'+id} style={{'--spot-x':current.objects[id][0]+'%','--spot-y':current.objects[id][1]+'%'} as CSSProperties} aria-label={OBJECTS[id].label} aria-expanded={selected===id} aria-controls="room-actions" onClick={()=>open(id)}><span className="spot-mark" aria-hidden="true"><Icon name={OBJECTS[id].icon}/></span><span className="spot-label" aria-hidden="true">{SHORT_LABEL[id]}</span></button>)}
   <button className="room-hotspot spot-door" style={{'--spot-x':current.door[0]+'%','--spot-y':current.door[1]+'%'} as CSSProperties} aria-label={'Ajtó — '+ROOMS[other].title} onClick={()=>changeRoom(other)}><span className="spot-mark" aria-hidden="true"><Icon name="door"/></span><span className="spot-label" aria-hidden="true">{ROOMS[other].title}</span></button>
  </div>
  {selected&&<section className="room-actions panel" id="room-actions" aria-labelledby="room-actions-title"><div className="room-actions-heading"><h2 id="room-actions-title" ref={heading} tabIndex={-1}><Icon name={OBJECTS[selected].icon}/>{OBJECTS[selected].title}</h2><button aria-label="Tárgymenü bezárása" onClick={close}>Bezárás</button></div>
   {selected==='desk'&&<><p>{s.slot===0?'A közös alkalom mindig elérhető, pénztől és energiától függetlenül.':'A következő közös alkalom a jövő héten lesz. Most a felkészülésre szánhatsz időt.'}</p><div className="scene-grid">{workshops.map(sceneCard)}</div>{!workshops.length&&<p className="muted">Erre a hétre nincs további felkészülési alkalom.</p>}</>}
   {selected==='phone'&&<><p>Egyeztess találkozót, majd indulj el a megadott helyszínre. A kiválasztott alkalom egy szabad sávot használ; a telefon megnyitása ingyenes.</p>{s.slot===0?<p className="notice">Előbb a heti közös alkalom következik. Az íróasztalnál indíthatod el.</p>:<><h3>Személyes találkozók</h3><div className="scene-grid">{meetings.map(sceneCard)}</div>{!meetings.length&&<p className="muted">Most nincs új személyes alkalom.</p>}<h3>Kávé és beszélgetés</h3><div className="scene-grid">{coffee.map(sceneCard)}</div>{!coffee.length&&<p className="muted">Az időszak beszélgetéseit már láttad. Később új témák nyílnak.</p>}</>}
    {!!blocked.length&&<details><summary>Később elérhető találkozók ({blocked.length})</summary>{blocked.map(x=><p key={x.id}>{x.title}<small>Határidő: {x.deadline}. hét · Korábbi közös alkalom, beszélgetés vagy személyes döntés szükséges.</small></p>)}</details>}</>}
   {selected==='chair'&&<><p>Egy óra a fotelben. Pihenés: egy szabad sáv, +32 energia.</p>{s.slot===0?<p className="notice">Előbb a heti közös alkalom következik az íróasztalnál.</p>:<div className="scene-grid"><ActivityCard kind="rest" title="Pihenés · +32 energia" description="Lassíts le, és nyerd vissza az erődet." detail="1 szabad sáv · feltöltődés" onClick={()=>g.activity('rest')}/></div>}</>}
   {selected==='bag'&&<><p>Önkéntes munka egy kis pénzért. Találkozóhoz vagy vásárláshoz nem kötelező dolgoznod.</p>{s.slot===0?<p className="notice">Előbb a heti közös alkalom következik az íróasztalnál.</p>:<div className="scene-grid"><ActivityCard kind="recycling" title="MOHU visszaváltás" description="Palackok visszaváltása egy ügyességi játékban." detail="1 szabad sáv · pénzkereset" onClick={()=>g.activity('mohu')}/><ActivityCard kind="paperwork" title="Iratellenőrzés" description="Tedd próbára a tudásod az iratok rendezésekor." detail="1 szabad sáv · pénzkereset" onClick={()=>g.activity('brick')}/></div>}</>}
   {selected==='shelf'&&<><p>A vásárlás és átadás nem foglal sávot. Személyenként hetente egy ajándék; személyes vállalást nem ad.</p>{s.slot===0?<p className="notice">Az ajándékokkal a közös alkalom után foglalkozhatsz.</p>:Object.entries(GIFTS).map(([id,x])=><div className="gift" key={id}><span>{x.name} · {formatFt(x.price)} · nálad: {s.inventory[id]??0}</span><button disabled={s.money<x.price} onClick={()=>g.buy(id)}>Megveszem</button>{GIRLS.map(girl=><button key={girl} disabled={!(s.inventory[id]>0)||s.giftsWeek.includes(girl)} onClick={()=>g.gift(girl,id)}>{ROUTES[girl]}</button>)}</div>)}</>}
   {selected==='journal'&&<><Journal open/>{canChooseDirection(s)&&<section><h3>{committed?'Vállalt irány':'Jelenlegi szándék'}: {ROUTES[s.direction]}</h3><p>{committed?'A személyesen vállalt irányt itt már nem írhatod át; a folytatásról az utóbeszélgetésben dönthettek.':'Ez szándék, nem mások helyett tett vállalás.'}</p><div className="actions">{Object.entries(ROUTES).map(([id,label])=><button key={id} disabled={committed} aria-pressed={s.direction===id} onClick={()=>g.direction(id as RouteId)}>{label}</button>)}</div></section>}</>}
  </section>}
 </main>;
}
