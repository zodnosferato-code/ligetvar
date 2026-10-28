import {useState} from 'react';
import type {ActorId,LocationId,Scene} from '../content/types.ts';
import {ACTOR_NAME,portraitFor} from '../content/assets.ts';
import {sceneTitle} from '../content/scene-localization.ts';
import {AssetImage} from './AssetImage.tsx';
import {useLocale,useTranslation} from './Locale.tsx';
const PLACES:Record<LocationId,{x:number;y:number;icon:string}>={department:{x:22,y:26,icon:'✒'},classroom:{x:50,y:22,icon:'▤'},library:{x:78,y:26,icon:'▥'},hallway:{x:50,y:45,icon:'♜'},apartment:{x:18,y:61,icon:'☾'},courtyard:{x:53,y:68,icon:'♧'},holdkor:{x:81,y:60,icon:'◉'},chamber:{x:82,y:84,icon:'⚙'},bekas:{x:23,y:86,icon:'≈'}};
export function CastleMap({scenes,week,onScene}:{scenes:Scene[];week:number;onScene:(id:string)=>void}){
 const t=useTranslation(),{locale}=useLocale(),[place,setPlace]=useState<LocationId|null>(null);
 const available=scenes.filter(x=>x.location===place);
 return <section className="castle-map-panel"><div className="castle-map" role="group" aria-label={locale==='hu'?'Kastélytérkép':'Castle map'}><div className="map-castle" aria-hidden="true">♜</div>{Object.entries(PLACES).map(([id,p])=>{const count=scenes.filter(x=>x.location===id).length;return <button key={id} style={{left:p.x+'%',top:p.y+'%'}} className="map-pin" aria-pressed={place===id} title={t(`location.${id as LocationId}`)} onClick={()=>setPlace(id as LocationId)}><span aria-hidden="true">{p.icon}</span><small>{t(`location.${id as LocationId}`)}</small>{count>0&&<b>{count}</b>}</button>;})}</div>{place&&<section className="map-meetings" aria-live="polite"><h3>{t(`location.${place}`)}</h3>{!available.length&&<p>{t('hub.noScenes')}</p>}{available.map(scene=>{const cast=scene.participants.filter(a=>a!=='marton'&&a!=='narrator');return <button className="meeting-token" key={scene.id} onClick={()=>onScene(scene.id)}><span className="meeting-faces">{cast.map(actor=><AssetImage key={actor} file={portraitFor(actor as ActorId,'neutral',week,scene.outfits?.[actor]).file} label={ACTOR_NAME[actor]}/>)}</span><span><strong>{sceneTitle(scene,locale)}</strong><small>{cast.map(a=>ACTOR_NAME[a]).join(' · ')}</small></span><span aria-hidden="true">→</span></button>;})}</section>}</section>;
}
