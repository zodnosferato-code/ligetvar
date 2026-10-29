import {Modal} from './Modal.tsx';
import {storyIdAt} from '../content/calendar.ts';
import {CastleMap} from './CastleMap.tsx';
import {AssetImage} from './AssetImage.tsx';
import {backgroundFor} from '../content/assets.ts';
import {sceneTitle} from '../content/scene-localization.ts';
import {useTranslation,useLocale} from './Locale.tsx';
import {useRef,type CSSProperties} from 'react';
import {useState} from 'react';
import {SCENES} from '../content/catalog.ts';
import {BACKGROUNDS} from '../content/assets.ts';
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
 phone:{label:t('hub.phone'),title:t('hub.short.phone'),icon:'phone'},
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

 const g=useGame(),s=g.state,available=availableScenes(s,SCENES),[phoneTab,setPhoneTab]=useState<'meetings'|'outings'|'replies'>('meetings'),[selected,setSelected]=useState<PanelId|null>(null),hotspots=useRef<Partial<Record<PanelId,HTMLButtonElement>>>({});
 const night=currentPeriod(s)==='night',room:RoomId=night?'home':'office',current=ROOMS[room];
 const visibleObjects:ObjectId[]=room==='home'?['phone','journal','chair','shelf']:['desk','phone','journal','chair','shelf','bag'];
 const hub=night?'apartment':'department';
 const upcoming=s.slot===1?availableScenes({...s,slot:2},SCENES).filter(x=>!available.includes(x)):[];
 const cost=night?t('hub.cost.night'):t('hub.cost.day');

 const open=(id:PanelId)=>{setPhoneTab('meetings');setSelected(id);};
 const close=()=>{const previous=selected;setSelected(null);if(previous)hotspots.current[previous]?.focus();};
 const sceneCard=(x:Scene)=><ActivityCard key={x.id} kind={x.kind} title={sceneTitle(x,locale)} description={t(`location.${x.location}`)} detail={t('hub.scene.detail',{cost:x.kind==='shared'?t('hub.cost.shared'):cost,price:x.cost?t('hub.scene.price',{money:formatFt(x.cost.money,locale),points:x.cost.points}):'',week:x.deadline})} onClick={()=>g.scene(x.id)}/>;
 const workshops=available.filter(x=>x.kind==='shared'||x.kind==='preparation');
 const meetings=available.filter(x=>x.kind==='relationship'),coffee=available.filter(x=>x.kind==='conversation'&&!x.cost);
 const blocked=Object.values(SCENES).filter(x=>(x.kind==='relationship'||x.kind==='conversation')&&x.week<=s.week&&x.deadline>=s.week&&!(x.id in s.completed)&&!x.cost&&!meets(s,x.requires));
 const phoneCount=available.filter(x=>x.kind==='relationship'||x.kind==='conversation').length;
 const counts:Partial<Record<PanelId,number>>={phone:phoneCount,desk:workshops.length,travel:available.length};
 const badge=(id:PanelId)=>counts[id]?<span className="availability-badge" aria-label={t('hub.availableCount',{count:counts[id]!})}>{counts[id]}</span>:null;
 const committed=isCommitted(s),hasShared=!!storyIdAt(s.week);
 const rhythm=[...(hasShared?[t('hub.rhythm.shared')]:[]),t('hub.rhythm.day'),t('hub.rhythm.night'),t('hub.rhythm.recap')];
 const specials=Object.values(SCENES).filter(x=>x.cost&&x.week<=s.week&&x.deadline>=s.week&&!(x.id in s.completed));
 return <main className="room-planner">
  <div className="room-toolbar"><div><h1>{current.title}</h1></div></div>
  <div className={'hub-room room-'+room} role="group" aria-label={t('hub.actions')}>
   <AssetImage className="hub-art" file={backgroundFor(hub,night?'night':'day',s.week).file} label={current.title}/>
   {visibleObjects.map(id=><button key={id} ref={button=>{hotspots.current[id]=button??undefined;}} className={'room-hotspot spot-'+id+(current.fallbacks.includes(id)?' is-fallback':'')} style={{'--spot-x':current.objects[id][0]+'%','--spot-y':current.objects[id][1]+'%'} as CSSProperties} aria-label={(id==='chair'&&night?t('hub.chair.night'):OBJECTS[id].label)+(counts[id]?' · '+t('hub.availableCount',{count:counts[id]!}):'')} aria-expanded={selected===id} aria-controls="room-actions" onClick={()=>open(id)}>{<span className="spot-mark" aria-hidden="true"><Icon name={OBJECTS[id].icon}/></span>}<span className="spot-label" aria-hidden="true">{id==='chair'&&night?t('hub.sleep'):SHORT_LABEL[id]}</span>{badge(id)}</button>)}
   <button ref={button=>{hotspots.current.travel=button??undefined;}} className="room-hotspot spot-door" style={{'--spot-x':current.door[0]+'%','--spot-y':current.door[1]+'%'} as CSSProperties} aria-label={t('hub.door')+(counts.travel?' · '+t('hub.availableCount',{count:counts.travel}):'')} aria-expanded={selected==='travel'} aria-controls="room-actions" onClick={()=>open('travel')}><span className="spot-mark" aria-hidden="true"><Icon name="door"/></span><span className="spot-label" aria-hidden="true">{t('hub.leave')}</span>{badge('travel')}</button>
  </div>
  {selected&&<Modal className="room-actions" title={selected==='travel'?t('hub.where'):OBJECTS[selected].title} onClose={close}><div id="room-actions">
   {selected==='travel'&&<><p>{t('hub.travel.help')}</p><CastleMap scenes={available} week={s.week} onScene={g.scene}/></>}
   {selected==='desk'&&<><p>{s.slot===0?t('hub.shared.available'):t('hub.preparation.help')}</p><div className="scene-grid">{workshops.map(sceneCard)}</div>{!workshops.length&&<p className="muted">{t('hub.preparation.empty')}</p>}</>}
   {selected==='phone'&&<><div className="phone-tabs" role="group" aria-label={t('hub.phone')}>{(['meetings','outings','replies'] as const).map(tab=><button key={tab} aria-pressed={phoneTab===tab} onClick={()=>setPhoneTab(tab)}>{t(`hub.phone.${tab}`)}{tab==='replies'&&s.giftHistory.some(h=>!h.read)?' •':''}</button>)}</div>{phoneTab==='replies'&&<GiftReplies/>}{phoneTab==='outings'&&<><h3>{t('hub.specials',{points:s.activityPoints})}</h3><p>{t('hub.special.help')}</p>{specials.map(x=><div key={x.id}>{available.includes(x)?sceneCard(x):<p><strong>{sceneTitle(x,locale)}</strong><small>{t('hub.special.price',{money:formatFt(x.cost!.money,locale),points:x.cost!.points,week:x.deadline})}</small><small>{!meets(s,x.requires)?t('hub.requires',{scenes:(x.requires.scenes??[]).map(id=>sceneTitle(SCENES[id],locale)).join(', ')}):s.slot===0?t('hub.shared.first'):t('hub.shortfall',{money:Math.max(0,x.cost!.money-s.money),points:Math.max(0,x.cost!.points-s.activityPoints)})}</small></p>}</div>)}</>}{phoneTab==='meetings'&&<><p>{t('hub.phone.help')}</p>{s.slot===0?<p className="notice">{t('hub.shared.desk')}</p>:<><h3>{t('hub.meetings')}</h3><div className="scene-grid">{meetings.map(sceneCard)}</div>{!meetings.length&&<p className="muted">{t('hub.meetings.empty')}</p>}<h3>{t('hub.coffee')}</h3><div className="scene-grid">{coffee.map(sceneCard)}</div>{!coffee.length&&<p className="muted">{t('hub.coffee.empty')}</p>}</>}
    {!!blocked.length&&<details><summary>{t('hub.blocked',{count:blocked.length})}</summary>{blocked.map(x=><p key={x.id}>{sceneTitle(x,locale)}<small>{t('hub.blocked.detail',{week:x.deadline})}</small></p>)}</details>}</>}</>}
   {selected==='chair'&&<><p>{night?t('hub.rest.night'):t('hub.rest.day')}</p>{s.slot===0?<p className="notice">{t('hub.shared.classroom')}</p>:<div className="scene-grid"><ActivityCard kind="rest" title={night?t('hub.sleep.energy'):t('hub.rest.energy')} description={t('hub.rest.description')} detail={t('hub.rest.detail',{cost})} onClick={()=>g.activity('rest')}/></div>}</>}
   {selected==='bag'&&<><p>{t('hub.jobs.help')}</p>{s.slot===0?<p className="notice">{t('hub.shared.classroom')}</p>:<div className="scene-grid"><ActivityCard kind="recycling" title={t('puzzle.recycling')} description={t('hub.recycling.description')} detail={t('hub.job.detail',{cost})} onClick={()=>g.activity('recycling')}/><ActivityCard kind="paperwork" title={t('puzzle.archive')} description={t('hub.archive.description')} detail={t('hub.job.detail',{cost})} onClick={()=>g.activity('archive')}/></div>}</>}
   {selected==='shelf'&&(s.slot===0?<p className="notice">{t('hub.shared.first')}</p>:<GiftShop/>)}
   {selected==='journal'&&<><Journal open/>{canChooseDirection(s)&&<section><h3>{t('hub.direction',{status:committed?t('hub.direction.committed'):t('hub.direction.intended'),route:t(`route.${s.direction}`)})}</h3><p>{committed?t('hub.direction.locked'):t('hub.direction.help')}</p><div className="actions">{(Object.keys(ROUTES) as RouteId[]).map(id=><button key={id} disabled={committed} aria-pressed={s.direction===id} onClick={()=>g.direction(id as RouteId)}>{t(`route.${id}`)}</button>)}</div></section>}</>}
  </div></Modal>}
  {!!upcoming.length&&<aside className="tonight-preview"><Icon name="heart"/><div><strong>{t('hub.upcoming')}</strong><p>{upcoming.map(x=>sceneTitle(x,locale)).join(' · ')}</p></div></aside>}
  <details className="hub-help"><summary>{t('hub.help')}</summary>  <ol className="week-rhythm" style={{'--rhythm-steps':rhythm.length} as CSSProperties} aria-label={t('hub.rhythm')}>{rhythm.map((label,index)=><li key={label} aria-current={s.slot===index+(hasShared?0:1)?'step':undefined} className={s.slot>index+(hasShared?0:1)?'is-complete':''}><span aria-hidden="true">{s.slot>index+(hasShared?0:1)?'✓':index+1}</span>{label}</li>)}</ol>
  <p className="room-guidance">{s.slot===0?t('hub.guide.shared'):night?t('hub.guide.night'):t('hub.guide.day')}  {t('hub.guide.free')}</p>

  </details>
 </main>;
}


