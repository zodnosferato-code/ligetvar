import {useEffect,useRef,type CSSProperties} from 'react';
import {useState} from 'react';
import {SCENES} from '../content/catalog.ts';
import {BACKGROUNDS,LOCATIONS,assetUrl} from '../content/assets.ts';
import {availableScenes,currentPeriod,meets,GIFTS,ROUTES,formatFt,isCommitted,canChooseDirection} from '../content/runtime.ts';
import {GIRLS,type RouteId,type Scene} from '../content/types.ts';
import {useGame} from '../store.ts';
import {ActivityCard,Icon} from './controls.tsx';
import {Journal} from './Journal.tsx';

export type RoomId='office'|'home';
type ObjectId='desk'|'phone'|'journal'|'chair'|'shelf'|'bag';
type PanelId=ObjectId|'travel';
const OBJECTS:Record<ObjectId,{label:string;title:string;icon:'book'|'heart'|'rest'|'gift'|'bottles'|'insight'|'phone'}>={
 desk:{label:'Műhely és felkészülés',title:'Műhely és felkészülés',icon:'insight'},
 phone:{label:'Telefon — Találkozók',title:'Találkozó egyeztetése',icon:'phone'},
 journal:{label:'Napló — Nyomok és kapcsolatok',title:'Napló és kapcsolatok',icon:'book'},
 chair:{label:'Fotel — Pihenés',title:'Egy csendes óra',icon:'rest'},
 shelf:{label:'Polc — Ajándékok',title:'Ajándékok',icon:'gift'},
 bag:{label:'Zsák — Opcionális munka',title:'Egy kis munka',icon:'bottles'}
};
// Coordinates are percentages of the uncropped source image. Every hotspot has a 44px minimum target.
const ROOMS={
 office:{title:'Tanszéki iroda',background:BACKGROUNDS.department.file!,door:[17,42],fallbacks:[] as ObjectId[],objects:{desk:[51,73],phone:[84,79],journal:[68,85],chair:[74,55],shelf:[92,33],bag:[17,86]}},
 home:{title:'Hálószoba',background:BACKGROUNDS.apartment.file!,door:[21,43],fallbacks:[] as ObjectId[],objects:{desk:[64,22],phone:[85,37],journal:[76,59],chair:[44,73],shelf:[92,81],bag:[8,76]}}
} as const;
const SHORT_LABEL:Record<ObjectId,string>={desk:'Műhely',phone:'Telefon',journal:'Napló',chair:'Pihenés',shelf:'Ajándék',bag:'Munka'};

export function RoomPlanner(){
 const g=useGame(),s=g.state,available=availableScenes(s,SCENES),[selected,setSelected]=useState<PanelId|null>(null),heading=useRef<HTMLHeadingElement>(null),hotspots=useRef<Partial<Record<PanelId,HTMLButtonElement>>>({}),destinationHeading=useRef<HTMLHeadingElement>(null);
 const night=currentPeriod(s)==='night',room:RoomId=night?'home':'office',current=ROOMS[room],[destination,setDestination]=useState<keyof typeof LOCATIONS|null>(null);
 const visibleObjects:ObjectId[]=room==='home'?['phone','journal','chair','shelf']:['desk','phone','journal','chair','shelf','bag'];
 const hub=night?'apartment':'department';
 const upcoming=s.slot===1?availableScenes({...s,slot:2},SCENES).filter(x=>!available.includes(x)):[];
 const cost=night?'Éjszakai sáv → heti összegzés':'Nappali sáv → éjszaka';
 const destinations=(Object.keys(LOCATIONS) as (keyof typeof LOCATIONS)[]).filter(id=>id===hub||available.some(scene=>scene.location===id));
 useEffect(()=>{if(selected){heading.current?.focus({preventScroll:true});heading.current?.scrollIntoView({block:'center'});}},[selected]);
 useEffect(()=>{if(destination){destinationHeading.current?.focus({preventScroll:true});destinationHeading.current?.scrollIntoView({block:'center'});}},[destination]);
 const open=(id:PanelId)=>{setDestination(null);setSelected(id);};
 const close=()=>{const previous=selected;setSelected(null);if(previous)hotspots.current[previous]?.focus();};
 const sceneCard=(x:Scene)=><ActivityCard key={x.id} kind={x.kind} title={x.title} description={LOCATIONS[x.location]} detail={(x.kind==='shared'?'Közös alkalom → nappali sáv':cost)+' · Határidő: '+x.deadline+'. hét vége'} onClick={()=>g.scene(x.id)}/>;
 const workshops=available.filter(x=>x.kind==='shared'||x.kind==='preparation');
 const meetings=available.filter(x=>x.kind==='relationship'),coffee=available.filter(x=>x.kind==='conversation');
 const blocked=Object.values(SCENES).filter(x=>(x.kind==='relationship'||x.kind==='conversation')&&x.week<=s.week&&x.deadline>=s.week&&!(x.id in s.completed)&&!meets(s,x.requires));
 const committed=isCommitted(s);
 return <main className="room-planner">
  <div className="room-toolbar"><div><p className="eyebrow">{s.week}. hét · {s.slot===0?'Heti közös alkalom':night?'Éjszakai tevékenység':'Nappali tevékenység'}</p><h1>{current.title}</h1></div></div>
  <ol className="week-rhythm" aria-label="A hét menete">{['Közös alkalom','Nappal','Éjszaka','Összegzés'].map((label,index)=><li key={label} aria-current={s.slot===index?'step':undefined} className={s.slot>index?'is-complete':''}><span aria-hidden="true">{s.slot>index?'✓':index+1}</span>{label}</li>)}</ol>
  <p className="room-guidance">{s.slot===0?'Először a heti közös alkalom következik; az íróasztalnál vagy az ajtónál indíthatod el.':night?'Válassz éjszakai találkozót, beszélgetést vagy alvást. Munka és felkészülés nappal érhető el.':'Egy nappali tevékenység után az éjszakai hálószobába érkezel.'} Napló, ajándék és böngészés: ingyenes.</p>
  <div className={'hub-room room-'+room}>
   <img className="hub-art" src={assetUrl(current.background)} alt={room==='office'?'Kastélybeli iroda íróasztallal, telefonnal, füzettel, fotellel, polccal, zsákkal és ajtóval.':'Kastélyszoba fali telefonnal, asztali könyvvel, fotellel, könyvespolccal, zsákkal és ajtóval.'}/>
   {visibleObjects.map(id=><button key={id} ref={button=>{hotspots.current[id]=button??undefined;}} className={'room-hotspot spot-'+id+(current.fallbacks.includes(id)?' is-fallback':'')} style={{'--spot-x':current.objects[id][0]+'%','--spot-y':current.objects[id][1]+'%'} as CSSProperties} aria-label={id==='chair'&&night?'Fotel — Alvás és pihenés':OBJECTS[id].label} aria-expanded={selected===id} aria-controls="room-actions" onClick={()=>open(id)}>{current.fallbacks.includes(id)&&<span className="spot-mark" aria-hidden="true"><Icon name={OBJECTS[id].icon}/></span>}<span className="spot-label" aria-hidden="true">{id==='chair'&&night?'Alvás':SHORT_LABEL[id]}</span></button>)}
   <button ref={button=>{hotspots.current.travel=button??undefined;}} className="room-hotspot spot-door" style={{'--spot-x':current.door[0]+'%','--spot-y':current.door[1]+'%'} as CSSProperties} aria-label="Ajtó — Úticélok" aria-expanded={selected==='travel'} aria-controls="room-actions" onClick={()=>open('travel')}><span className="spot-label" aria-hidden="true">Elindulok</span></button>
  </div>
  {selected&&<section className="room-actions panel" id="room-actions" aria-labelledby="room-actions-title"><div className="room-actions-heading"><h2 id="room-actions-title" ref={heading} tabIndex={-1}><Icon name={selected==='travel'?'door':OBJECTS[selected].icon}/>{selected==='travel'?'Hová indulsz?':OBJECTS[selected].title}</h2><button aria-label="Tárgymenü bezárása" onClick={close}>Bezárás</button></div>
   {selected==='travel'&&<><p>Válassz helyszínt, majd egy elérhető alkalmat. A böngészés ingyenes; az alkalom befejezése használja a heti sávot.</p><div className="destination-grid">{destinations.map(id=><button className="destination-card" key={id} aria-pressed={destination===id} onClick={()=>setDestination(id)}><Icon name="door"/><strong>{id==='apartment'?'Hálószoba':LOCATIONS[id]}</strong><small>{id==='department'?(night?'Éjszakai találkozók':'Nappali tervező'):id==='apartment'?'Éjszakai központ':available.filter(scene=>scene.location===id).length+' elérhető alkalom'}</small></button>)}</div>{destination&&<section className="destination-detail" aria-label="Kiválasztott úti cél"><h3 ref={destinationHeading} tabIndex={-1}>{destination==='apartment'?'Hálószoba':LOCATIONS[destination]}</h3>{destination===hub&&<p className="muted">Ez a jelenlegi központod. A tárgyakhoz a menü bezárásával térhetsz vissza.</p>}<div className="scene-grid">{available.filter(scene=>scene.location===destination).map(sceneCard)}</div>{!available.some(scene=>scene.location===destination)&&<p className="muted">Ezen a helyszínen most nincs külön történeti vagy személyes alkalom.</p>}</section>}</>}
   {selected==='desk'&&<><p>{s.slot===0?'A közös alkalom mindig elérhető, pénztől és energiától függetlenül.':'A felkészülés a nappali sávot használja. Utána az éjszakai tevékenységek következnek.'}</p><div className="scene-grid">{workshops.map(sceneCard)}</div>{!workshops.length&&<p className="muted">Erre a hétre nincs további felkészülési alkalom.</p>}</>}
   {selected==='phone'&&<><p>Egyeztess találkozót, majd indulj el a megadott helyszínre. A kiválasztott alkalom egy szabad sávot használ; a telefon megnyitása ingyenes.</p>{s.slot===0?<p className="notice">Előbb a heti közös alkalom következik. Az ajtó úti céljai között vagy az iroda íróasztalánál indíthatod el.</p>:<><h3>Személyes találkozók</h3><div className="scene-grid">{meetings.map(sceneCard)}</div>{!meetings.length&&<p className="muted">Most nincs új személyes alkalom.</p>}<h3>Kávé és beszélgetés</h3><div className="scene-grid">{coffee.map(sceneCard)}</div>{!coffee.length&&<p className="muted">Az időszak beszélgetéseit már láttad. Később új témák nyílnak.</p>}</>}
    {!!blocked.length&&<details><summary>Később elérhető találkozók ({blocked.length})</summary>{blocked.map(x=><p key={x.id}>{x.title}<small>Határidő: {x.deadline}. hét · Korábbi közös alkalom, beszélgetés vagy személyes döntés szükséges.</small></p>)}</details>}</>}
   {selected==='chair'&&<><p>{night?'Alvás és pihenés: az éjszakai sávot használja, legfeljebb +32 energia. Utána a heti összegzés következik.':'Csendes pihenés: a nappali sávot használja, legfeljebb +32 energia. Utána az éjszakai tevékenységek következnek.'}</p>{s.slot===0?<p className="notice">Előbb a heti közös alkalom következik. Az ajtónál a tantermet választhatod.</p>:<div className="scene-grid"><ActivityCard kind="rest" title={night?'Alvás · +32 energia':'Pihenés · +32 energia'} description="Lassíts le, és nyerd vissza az erődet." detail={cost+' · feltöltődés'} onClick={()=>g.activity('rest')}/></div>}</>}
   {selected==='bag'&&<><p>Nappali munka egy kis pénzért. Találkozóhoz vagy vásárláshoz nem kötelező dolgoznod.</p>{s.slot===0?<p className="notice">Előbb a heti közös alkalom következik. Az ajtónál a tantermet választhatod.</p>:<div className="scene-grid"><ActivityCard kind="recycling" title="MOHU visszaváltás" description="Palackok visszaváltása egy ügyességi játékban." detail={cost+' · pénzkereset'} onClick={()=>g.activity('mohu')}/><ActivityCard kind="paperwork" title="Iratellenőrzés" description="Tedd próbára a tudásod az iratok rendezésekor." detail={cost+' · pénzkereset'} onClick={()=>g.activity('brick')}/></div>}</>}
   {selected==='shelf'&&<><p>A vásárlás és átadás nem foglal sávot. Személyenként hetente egy ajándék; személyes vállalást nem ad.</p>{s.slot===0?<p className="notice">Az ajándékokkal a közös alkalom után foglalkozhatsz.</p>:Object.entries(GIFTS).map(([id,x])=><div className="gift" key={id}><span>{x.name} · {formatFt(x.price)} · nálad: {s.inventory[id]??0}</span><button disabled={s.money<x.price} onClick={()=>g.buy(id)}>Megveszem</button>{GIRLS.map(girl=><button key={girl} disabled={!(s.inventory[id]>0)||s.giftsWeek.includes(girl)} onClick={()=>g.gift(girl,id)}>{ROUTES[girl]}</button>)}</div>)}</>}
   {selected==='journal'&&<><Journal open/>{canChooseDirection(s)&&<section><h3>{committed?'Vállalt irány':'Jelenlegi szándék'}: {ROUTES[s.direction]}</h3><p>{committed?'A személyesen vállalt irányt itt már nem írhatod át; a folytatásról az utóbeszélgetésben dönthettek.':'Ez szándék, nem mások helyett tett vállalás.'}</p><div className="actions">{Object.entries(ROUTES).map(([id,label])=><button key={id} disabled={committed} aria-pressed={s.direction===id} onClick={()=>g.direction(id as RouteId)}>{label}</button>)}</div></section>}</>}
  </section>}
  {!!upcoming.length&&<aside className="panel upcoming-night"><h2>Éjszakára tervezhető</h2><p>Ezek az alkalmak az éjszakai sávban nyílnak meg. Előbb válassz nappali tevékenységet.</p>{upcoming.map(x=><p key={x.id}><strong>{x.title}</strong><small>{LOCATIONS[x.location]} · Határidő: {x.deadline}. hét vége</small></p>)}</aside>}
 </main>;
}
