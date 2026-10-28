import {CALENDAR} from '../content/calendar.ts';
import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import {SCENES} from '../content/catalog.ts';
import {assetUrl,backgroundFor} from '../content/assets.ts';
import {currentPeriod,sceneLighting,sceneStage} from '../content/runtime.ts';
import {sceneTitle} from '../content/scene-localization.ts';
import type {GameState} from '../content/types.ts';
import {useLocale,useTranslation} from './Locale.tsx';

export type TransitionMode='background'|'card'|'off';
export function readTransitionMode():TransitionMode{
 try{const value=localStorage.getItem('ligetvar-transitions');if(value==='card'||value==='off')return value;}catch{}
 return 'background';
}
function destination(s:GameState){
 const scene=s.phase==='scene'&&s.scene?SCENES[s.scene.id]:undefined;
 const stage=scene?sceneStage(s,scene):undefined;
 const lighting=scene?sceneLighting(s,scene):(s.phase==='summary'||currentPeriod(s)==='night')?'night':'day';
 return {key:[s.week,s.slot,s.phase,scene?.id,stage?.location,stage?.background,lighting].join('/'),scene,stage,lighting,
  background:backgroundFor(stage?.background??(lighting==='night'?'apartment':'department'),lighting)};
}
/** Presentation only: closing/skipping never consumes a choice or a time slot. */
export function Transition({state,mode,children}:{state:GameState;mode:TransitionMode;children:React.ReactNode}){
 const t=useTranslation(),{locale}=useLocale(),target=destination(state),previous=useRef(''),[active,setActive]=useState(false),skip=useRef<HTMLButtonElement>(null),content=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{
  if(mode==='off'){setActive(false);previous.current=target.key;return;}
  if(previous.current!==target.key){previous.current=target.key;setActive(state.phase!=='minigame');}
 },[target.key,mode,state.phase]);
 useEffect(()=>{
  if(!active)return;
  const focused=document.activeElement;
  skip.current?.focus({preventScroll:true});
  const close=()=>setActive(false),keyboard=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();close();}};
  document.addEventListener('keydown',keyboard);
  const timer=mode==='card'?undefined:window.setTimeout(close,window.matchMedia('(prefers-reduced-motion: reduce)').matches?250:1800);
  return ()=>{window.clearTimeout(timer);document.removeEventListener('keydown',keyboard);if(focused instanceof HTMLElement&&focused.isConnected)focused.focus({preventScroll:true});};
 },[active,target.key,mode]);
 useEffect(()=>{if(!active){const target=content.current?.querySelector<HTMLElement>('h1,button');if(target){target.tabIndex=-1;target.focus({preventScroll:true});}}},[active]);
 return <><div ref={content} {...(active?{inert:''}:{})} aria-hidden={active||undefined}>{children}</div>{active&&mode!=='off'&&<section key={target.key} className={'chapter-transition transition-'+mode+' lighting-'+target.lighting} onKeyDown={event=>{if(event.key==='Tab'){event.preventDefault();skip.current?.focus();}}} role="dialog" aria-modal="true" aria-labelledby="transition-title">
 {mode==='background'&&target.background.file&&<img className="transition-background" src={assetUrl(target.background.file)} alt=""/>}
 <div className="transition-copy"><p className="eyebrow">{t('ui.week.progress',{week:state.week,total:CALENDAR.weeks})} · {t(target.lighting==='night'?'ui.light.night':target.lighting==='evening'?'ui.light.evening':'ui.light.day')}</p><span className="transition-ornament" aria-hidden="true">✦</span>
 <h1 id="transition-title">{target.scene?sceneTitle(target.scene,locale):state.phase==='summary'?t('ui.summary'):state.phase==='ending'?t('ui.closed'):t(target.lighting==='night'?'ui.activity.night':'ui.activity.day')}</h1>
 {target.stage&&<p>{t(`location.${target.stage.location}`)}</p>}
 <button ref={skip} className="primary" onClick={()=>setActive(false)}>{t('ui.transition.skip')}</button></div>
 </section>}</>;
}
