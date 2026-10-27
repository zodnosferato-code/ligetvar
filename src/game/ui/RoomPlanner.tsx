import {sceneTitle} from '../content/scene-localization.ts';
import {useTranslation,useLocale} from './Locale.tsx';
import {useEffect,useRef,type CSSProperties} from 'react';
import {useState} from 'react';
import {SCENES} from '../content/catalog.ts';
import {BACKGROUNDS,LOCATIONS,assetUrl} from '../content/assets.ts';
import {availableScenes,currentPeriod,meets,ROUTES,formatFt,isCommitted,canChooseDirection} from '../content/runtime.ts';
import {type RouteId,type Scene} from '../content/types.ts';
import {useGame} from '../store.ts';
import {ActivityCard,Icon} from './controls.tsx';
import {GiftShop,GiftReplies} from './Gifts.tsx';
import {Journal} from './Journal.tsx';

export type RoomId='office'|'home';
type ObjectId='desk'|'phone'|'journal'|'chair'|'shelf'|'bag';
type PanelId=ObjectId|'travel';

export function RoomPlanner(){
 const t=useTranslation();const {locale}=useLocale();
const OBJECTS:Record<ObjectId,{label:string;title:string;icon:'book'|'heart'|'rest'|'gift'|'bottles'|'insight'|'phone'}>={
 desk:{label:t('hub.workshop'),title:t('hub.workshop'),icon:'insight'},
 phone:{label:t('hub.phone'),title:t('hub.meeting'),icon:'phone'},
 journal:{label:t('hub.journal'),title:t('hub.journal.title'),icon:'book'},
 chair:{label:t('hub.chair'),title:t('hub.rest.title'),icon:'rest'},
 shelf:{label:t('hub.shelf'),title:t('hub.gifts'),icon:'gift'},
 bag:{label:t('hub.bag'),title:t('hub.work.title'),icon:'bottles'}
};
// Coordinates are percentages of the uncropped source image. Every hotspot has a 44px minimum target.
const ROOMS={
 office:{title:t('hub.office'),background:BACKGROUNDS.department.file!,door:[17,42],fallbacks:[] as ObjectId[],objects:{desk:[51,73],phone:[84,79],journal:[68,85],chair:[74,55],shelf:[92,33],bag:[17,86]}},
 home:{title:t('hub.bedroom'),background:BACKGROUNDS.apartment.file!,door:[21,43],fallbacks:[] as ObjectId[],objects:{desk:[64,22],phone:[85,37],journal:[76,59],chair:[44,73],shelf:[92,81],bag:[8,76]}}
} as const;
const SHORT_LABEL:Record<ObjectId,string>={desk:t('hub.short.workshop'),phone:t('hub.short.phone'),journal:t('hub.short.journal'),chair:t('hub.short.rest'),shelf:t('gifts.item'),bag:t('hub.short.work')};

 const g=useGame(),s=g.state,available=availableScenes(s,SCENES),[selected,setSelected]=useState<PanelId|null>(null),heading=useRef<HTMLHeadingElement>(null),hotspots=useRef<Partial<Record<PanelId,HTMLButtonElement>>>({}),destinationHeading=useRef<HTMLHeadingElement>(null);
 const night=currentPeriod(s)==='night',room:RoomId=night?'home':'office',current=ROOMS[room],[destination,setDestination]=useState<keyof typeof LOCATIONS|null>(null);
 const visibleObjects:ObjectId[]=room==='home'?['phone','journal','chair','shelf']:['desk','phone','journal','chair','shelf','bag'];
 const hub=night?'apartment':'department';
 const upcoming=s.slot===1?availableScenes({...s,slot:2},SCENES).filter(x=>!available.includes(x)):[];
 const cost=night?t('hub.cost.night'):t('hub.cost.day');
 const destinations=(Object.keys(LOCATIONS) as (keyof typeof LOCATIONS)[]).filter(id=>id===hub||available.some(scene=>scene.location===id));
 useEffect(()=>{if(selected){heading.current?.focus({preventScroll:true});heading.current?.scrollIntoView({block:'center'});}},[selected]);
 useEffect(()=>{if(destination){destinationHeading.current?.focus({preventScroll:true});destinationHeading.current?.scrollIntoView({block:'center'});}},[destination]);
 const open=(id:PanelId)=>{setDestination(null);setSelected(id);};
 const close=()=>{const previous=selected;setSelected(null);if(previous)hotspots.current[previous]?.focus();};
 const sceneCard=(x:Scene)=><ActivityCard key={x.id} kind={x.kind} title={sceneTitle(x,locale)} description={t(`location.${x.location}`)} detail={t('hub.scene.detail',{cost:x.kind==='shared'?t('hub.cost.shared'):cost,price:x.cost?t('hub.scene.price',{money:formatFt(x.cost.money,locale),points:x.cost.points}):'',week:x.deadline})} onClick={()=>g.scene(x.id)}/>;
 const workshops=available.filter(x=>x.kind==='shared'||x.kind==='preparation');
 const meetings=available.filter(x=>x.kind==='relationship'),coffee=available.filter(x=>x.kind==='conversation'&&!x.cost);
 const blocked=Object.values(SCENES).filter(x=>(x.kind==='relationship'||x.kind==='conversation')&&x.week<=s.week&&x.deadline>=s.week&&!(x.id in s.completed)&&!x.cost&&!meets(s,x.requires));
 const committed=isCommitted(s);
 const specials=Object.values(SCENES).filter(x=>x.cost&&x.week<=s.week&&x.deadline>=s.week&&!(x.id in s.completed));
 return <main className="room-planner">
  <div className="room-toolbar"><div><p className="eyebrow">{t('hub.period',{week:s.week,period:s.slot===0?t('hub.week.shared'):night?t('ui.activity.night'):t('ui.activity.day')})}</p><h1>{current.title}</h1></div></div>
  <ol className="week-rhythm" aria-label={t('hub.rhythm')}>{[t('hub.rhythm.shared'),t('hub.rhythm.day'),t('hub.rhythm.night'),t('hub.rhythm.recap')].map((label,index)=><li key={label} aria-current={s.slot===index?'step':undefined} className={s.slot>index?'is-complete':''}><span aria-hidden="true">{s.slot>index?'✓':index+1}</span>{label}</li>)}</ol>
  <p className="room-guidance">{s.slot===0?t('hub.guide.shared'):night?t('hub.guide.night'):t('hub.guide.day')}  {t('hub.guide.free')}</p>
  <div className={'hub-room room-'+room}>
   <img className="hub-art" src={assetUrl(current.background)} alt={room==='office'?t('hub.art.office'):t('hub.art.home')}/>
   {visibleObjects.map(id=><button key={id} ref={button=>{hotspots.current[id]=button??undefined;}} className={'room-hotspot spot-'+id+(current.fallbacks.includes(id)?' is-fallback':'')} style={{'--spot-x':current.objects[id][0]+'%','--spot-y':current.objects[id][1]+'%'} as CSSProperties} aria-label={id==='chair'&&night?t('hub.chair.night'):OBJECTS[id].label} aria-expanded={selected===id} aria-controls="room-actions" onClick={()=>open(id)}>{current.fallbacks.includes(id)&&<span className="spot-mark" aria-hidden="true"><Icon name={OBJECTS[id].icon}/></span>}<span className="spot-label" aria-hidden="true">{id==='chair'&&night?t('hub.sleep'):SHORT_LABEL[id]}</span></button>)}
   <button ref={button=>{hotspots.current.travel=button??undefined;}} className="room-hotspot spot-door" style={{'--spot-x':current.door[0]+'%','--spot-y':current.door[1]+'%'} as CSSProperties} aria-label={t('hub.door')} aria-expanded={selected==='travel'} aria-controls="room-actions" onClick={()=>open('travel')}><span className="spot-label" aria-hidden="true">{t('hub.leave')}</span></button>
  </div>
  {selected&&<section className="room-actions panel" id="room-actions" aria-labelledby="room-actions-title"><div className="room-actions-heading"><h2 id="room-actions-title" ref={heading} tabIndex={-1}><Icon name={selected==='travel'?'door':OBJECTS[selected].icon}/>{selected==='travel'?t('hub.where'):OBJECTS[selected].title}</h2><button aria-label={t('hub.close.label')} onClick={close}>{t('hub.close')}</button></div>
   {selected==='travel'&&<><p>{t('hub.travel.help')}</p><div className="destination-grid">{destinations.map(id=><button className="destination-card" key={id} aria-pressed={destination===id} onClick={()=>setDestination(id)}><Icon name="door"/><strong>{id==='apartment'?t('hub.bedroom'):t(`location.${id}`)}</strong><small>{id==='department'?(night?t('hub.night.meetings'):t('hub.day.planner')):id==='apartment'?t('hub.night.hub'):t('hub.available',{count:available.filter(scene=>scene.location===id).length})}</small></button>)}</div>{destination&&<section className="destination-detail" aria-label={t('hub.destination')}><h3 ref={destinationHeading} tabIndex={-1}>{destination==='apartment'?t('hub.bedroom'):t(`location.${destination}`)}</h3>{destination===hub&&<p className="muted">{t('hub.current')}</p>}<div className="scene-grid">{available.filter(scene=>scene.location===destination).map(sceneCard)}</div>{!available.some(scene=>scene.location===destination)&&<p className="muted">{t('hub.noScenes')}</p>}</section>}</>}
   {selected==='desk'&&<><p>{s.slot===0?t('hub.shared.available'):t('hub.preparation.help')}</p><div className="scene-grid">{workshops.map(sceneCard)}</div>{!workshops.length&&<p className="muted">{t('hub.preparation.empty')}</p>}</>}
   {selected==='phone'&&<><GiftReplies/><h3>{t('hub.specials',{points:s.activityPoints})}</h3><p>{t('hub.special.help')}</p>{specials.map(x=><div key={x.id}>{available.includes(x)?sceneCard(x):<p><strong>{sceneTitle(x,locale)}</strong><small>{t('hub.special.price',{money:formatFt(x.cost!.money,locale),points:x.cost!.points,week:x.deadline})}</small><small>{!meets(s,x.requires)?t('hub.requires',{scenes:(x.requires.scenes??[]).map(id=>sceneTitle(SCENES[id],locale)).join(', ')}):s.slot===0?t('hub.shared.first'):t('hub.shortfall',{money:Math.max(0,x.cost!.money-s.money),points:Math.max(0,x.cost!.points-s.activityPoints)})}</small></p>}</div>)}<h3>{t('hub.meeting')}</h3><p>{t('hub.phone.help')}</p>{s.slot===0?<p className="notice">{t('hub.shared.desk')}</p>:<><h3>{t('hub.meetings')}</h3><div className="scene-grid">{meetings.map(sceneCard)}</div>{!meetings.length&&<p className="muted">{t('hub.meetings.empty')}</p>}<h3>{t('hub.coffee')}</h3><div className="scene-grid">{coffee.map(sceneCard)}</div>{!coffee.length&&<p className="muted">{t('hub.coffee.empty')}</p>}</>}
    {!!blocked.length&&<details><summary>{t('hub.blocked',{count:blocked.length})}</summary>{blocked.map(x=><p key={x.id}>{sceneTitle(x,locale)}<small>{t('hub.blocked.detail',{week:x.deadline})}</small></p>)}</details>}</>}
   {selected==='chair'&&<><p>{night?t('hub.rest.night'):t('hub.rest.day')}</p>{s.slot===0?<p className="notice">{t('hub.shared.classroom')}</p>:<div className="scene-grid"><ActivityCard kind="rest" title={night?t('hub.sleep.energy'):t('hub.rest.energy')} description={t('hub.rest.description')} detail={t('hub.rest.detail',{cost})} onClick={()=>g.activity('rest')}/></div>}</>}
   {selected==='bag'&&<><p>{t('hub.jobs.help')}</p>{s.slot===0?<p className="notice">{t('hub.shared.classroom')}</p>:<div className="scene-grid"><ActivityCard kind="recycling" title={t('puzzle.recycling')} description={t('hub.recycling.description')} detail={t('hub.job.detail',{cost})} onClick={()=>g.activity('recycling')}/><ActivityCard kind="paperwork" title={t('puzzle.archive')} description={t('hub.archive.description')} detail={t('hub.job.detail',{cost})} onClick={()=>g.activity('archive')}/></div>}</>}
   {selected==='shelf'&&(s.slot===0?<p className="notice">{t('hub.shared.first')}</p>:<GiftShop/>)}
   {selected==='journal'&&<><Journal open/>{canChooseDirection(s)&&<section><h3>{t('hub.direction',{status:committed?t('hub.direction.committed'):t('hub.direction.intended'),route:t(`route.${s.direction}`)})}</h3><p>{committed?t('hub.direction.locked'):t('hub.direction.help')}</p><div className="actions">{(Object.keys(ROUTES) as RouteId[]).map(id=><button key={id} disabled={committed} aria-pressed={s.direction===id} onClick={()=>g.direction(id as RouteId)}>{t(`route.${id}`)}</button>)}</div></section>}</>}
  </section>}
  {!!upcoming.length&&<aside className="panel upcoming-night"><h2>{t('hub.upcoming')}</h2><p>{t('hub.upcoming.help')}</p>{upcoming.map(x=><p key={x.id}><strong>{sceneTitle(x,locale)}</strong><small>{t('hub.upcoming.detail',{location:t(`location.${x.location}`),week:x.deadline})}</small></p>)}</aside>}
 </main>;
}


