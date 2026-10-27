import {useTranslation} from './Locale.tsx';
import {useEffect,useState} from 'react';
import {assetUrl} from '../content/assets.ts';
import {momentSource,type MomentClip} from '../content/animations.ts';
/** Swap out the animated resource entirely when stopped: hiding a GIF does not pause decoding. */
export function Moment({clip}:{clip:MomentClip}){
 const t=useTranslation();
 const [reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [paused,setPaused]=useState(false),[failed,setFailed]=useState(false),[posterFailed,setPosterFailed]=useState(false);
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)'),change=()=>setReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
 const stopped=paused||reduced||failed,source=momentSource(clip,stopped,reduced);
 if(!source)return null;
 return <div className="moment-clip">
  {posterFailed?<p role="status">{t('ui.animation.failed',{description:clip.description})}</p>:<img src={assetUrl(source)} width={clip.width} height={clip.height} alt={clip.description} onError={()=>{if(stopped)setPosterFailed(true);else setFailed(true);}}/>}
  {!reduced&&!failed&&!posterFailed&&<button type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?t('ui.animation.start'):t('ui.animation.stop')}</button>}
 </div>;
}
