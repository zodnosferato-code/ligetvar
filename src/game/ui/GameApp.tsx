import {CALENDAR} from '../content/calendar.ts';
import {Calendar} from './Calendar.tsx';
import {Modal} from './Modal.tsx';
import {AssetImage} from './AssetImage.tsx';
import {calendarFor} from '../content/calendar.ts';
import {Transition,readTransitionMode,type TransitionMode} from './Transition.tsx';
import {presentText,sceneTitle} from '../content/scene-localization.ts';
import {LocaleProvider,useLocale} from './Locale.tsx';
import type {Translator} from '../content/localization.ts';
import {saveMessage} from '../content/saves.ts';
import {useTranslation} from './Locale.tsx';
import {Component,useEffect,useRef,useState,type CSSProperties,type ReactNode} from 'react';
import {GAME_VERSION,BUILD_ID} from '../release.ts';
import {Moment} from './Moment.tsx';
import {MOMENT_CLIPS} from '../content/animations.ts';
import {viragEpilogue} from '../content/virag.ts';
import {SCENES} from '../content/catalog.ts';
import {ACTOR_NAME,SHORT,backgroundFor,assetUrl,portraitFor} from '../content/assets.ts';
import {currentLine,currentPeriod,sceneStage,sceneLighting,evaluateEnding,formatFt} from '../content/runtime.ts';
import {institutions,relationships,threatText} from '../content/epilogues.ts';
import {useGame} from '../store.ts';
import {moodFor,setMood,toggleMute,unlockAudio} from '../audio.ts';
import {GiftReplies} from './Gifts.tsx';
import {PuzzleGame} from './minigames.tsx';
import {Icon} from './controls.tsx';
import {Journal} from './Journal.tsx';
import {RoomPlanner} from './RoomPlanner.tsx';
class Boundary extends Component<{children:ReactNode;t:Translator},{error:string}>{
 state={error:''};static getDerivedStateFromError(e:Error){return {error:e.message};}
 render(){const t=this.props.t;return this.state.error?<main className="panel" role="alert"><h1>{t('ui.error.title')}</h1><p>{this.state.error}</p><p>{t('ui.error.saveSafe')}</p><button onClick={()=>location.reload()}>{t('ui.reload')}</button></main>:this.props.children;}
}
export function GameApp(){return <LocaleProvider><LocalizedGame/></LocaleProvider>;}
function LocalizedGame(){const t=useTranslation();return <Boundary t={t}><Game/></Boundary>;}
function Game(){
 const t=useTranslation();
 const {locale,setLocale}=useLocale();
 const g=useGame(),s=g.state,[muted,setMuted]=useState(false),[scale,setScale]=useState(1),[transitionMode,setTransitionMode]=useState<TransitionMode>(readTransitionMode),[settings,setSettings]=useState(false);
 useEffect(()=>{g.boot();},[]);useEffect(()=>{if(g.mode==='play')setMood(moodFor(s));},[g.mode,s]);
 return <div className="game" style={{'--text-scale':scale} as CSSProperties}>
 <header className="masthead"><a className="brand" href="#" onClick={e=>{e.preventDefault();g.toTitle();}}><span className="brand-seal"><Icon name="book"/></span><span className="brand-copy">Ligetvár<small>{t('ui.semester')}</small></span></a><button className="settings-toggle" aria-haspopup="dialog" onClick={()=>setSettings(true)}>{t('ui.settings')}</button></header>
 {settings&&<Modal title={t('ui.settings')} onClose={()=>setSettings(false)}><div className="tools"><label>{t('ui.transition.label')} <select value={transitionMode} onChange={e=>{const value=e.target.value as TransitionMode;setTransitionMode(value);try{localStorage.setItem('ligetvar-transitions',value);}catch{}}}><option value="background">{t('ui.transition.background')}</option><option value="card">{t('ui.transition.card')}</option><option value="off">{t('ui.transition.off')}</option></select></label><label>{t('locale.label')} <select aria-label={t('locale.label')} value={locale} onChange={e=>setLocale(e.target.value as 'hu'|'en')}><option value="hu">Magyar</option><option value="en">English</option></select></label><label>{t('ui.fontSize')} <select aria-label={t('ui.fontSize')} value={scale} onChange={e=>setScale(Number(e.target.value))}><option value={1}>100%</option><option value={1.15}>115%</option><option value={1.3}>130%</option></select></label><button onClick={()=>setMuted(toggleMute())}><Icon name="sound"/>{muted?t('ui.sound.on'):t('ui.sound.off')}</button></div>{locale==='en'&&<p className="muted">{t('locale.partial')}</p>}<p className="muted">{t('ui.artNotice')}</p></Modal>}
 {g.saveNotice&&<p className="notice" role="alert">{g.saveNotice==='write-failed'?t('save.writeFailed'):saveMessage(g.saveNotice,locale)}</p>}
 {g.mode==='title'?<Title/>:<Transition state={s} mode={transitionMode}><PlayBar/>
 {s.phase==='scene'?<Dialogue/>:s.phase==='planner'?<RoomPlanner key={s.week+'-'+s.slot}/>:s.phase==='summary'?<Summary/>:s.phase==='ending'?<Ending/>:<PuzzleGame/>}
 {s.phase==='planner'&&s.giftHistory.some(h=>!h.read)&&<Modal title={t('gifts.newReply')} onClose={g.readGifts}><GiftReplies unreadOnly/></Modal>}
 {s.phase==='planner'&&s.lastNote&&<p className="notice" role="status">{presentText(s.lastNote,s.name,locale)}</p>}</Transition>}
 </div>;
}
function PlayBar(){
 const t=useTranslation(),{locale}=useLocale(),s=useGame(x=>x.state),[panel,setPanel]=useState<'status'|'journal'|null>(null),c=calendarFor(s.week);
 const date=new Intl.DateTimeFormat(locale,{month:'short',day:'numeric',timeZone:'UTC'}).format(new Date(c.iso+'T12:00:00Z'));
 const period=s.phase==='ending'?t('ui.closed'):s.slot===0?t('ui.activity.shared'):s.slot<3?(currentPeriod(s)==='night'?t('ui.activity.night'):t('ui.activity.day')):t('ui.summary');
 return <><nav className="play-bar" aria-label={t('ui.status')}><button className="status-toggle" aria-label={t('ui.status')+' · '+date+' · '+period} onClick={()=>setPanel('status')} aria-haspopup="dialog"><time dateTime={c.iso}>{date}</time><span>{period}</span><span aria-hidden="true">⌄</span></button>{s.phase!=='planner'&&<button onClick={()=>setPanel('journal')} aria-haspopup="dialog">{t('hub.short.journal')}</button>}</nav>
 {panel&&<Modal title={t(panel==='status'?'ui.status':'hub.journal.title')} onClose={()=>setPanel(null)}>{panel==='journal'?<Journal open/>:<><p>{t('ui.week.progress',{week:s.week,total:CALENDAR.weeks})} · {period}</p><div className="status-details"><p><Icon name="energy"/>{t('ui.energy',{energy:s.energy})}</p><p><Icon name="money"/>{formatFt(s.money,locale)}</p><p>{t('ui.points',{points:s.activityPoints})}</p></div><Calendar week={s.week}/></>}</Modal>}</>;
}
function Title(){
 const t=useTranslation();
 const g=useGame(),[name,setName]=useState('Márton Kelényi');
 const audio=()=>{try{unlockAudio();}catch{/* Audio is optional. */}};
 return <main className="title panel" style={{backgroundImage:'linear-gradient(90deg,rgba(24,14,21,.96),rgba(24,14,21,.82) 55%,rgba(24,14,21,.22)),url("'+assetUrl('backgrounds/courtyard.jpg')+'")'}}><div className="title-copy"><div className="title-crest" aria-hidden="true"><Icon name="heart"/></div><p className="eyebrow">{t('ui.title.tagline')}</p><p className="muted" title={BUILD_ID??undefined}>Ligetvár {GAME_VERSION}</p><h1>{t('ui.title.heading')}</h1><p>{t('ui.title.intro')}</p>
 <label className="name">{t('ui.name')}<input maxLength={32} value={name} onChange={e=>setName(e.target.value)}/></label><div className="actions">{g.savePresent&&<button disabled={!g.hasSave} className="primary" onClick={()=>{audio();g.resume();}}><Icon name="book"/>{t('ui.resume')}</button>}<button onClick={()=>{audio();g.start(name);}}><Icon name="door"/>{t('ui.new')}</button></div>
 {g.confirmNewGame&&<Modal title={t('ui.new')} onClose={g.cancelNewGame}><p>{t('ui.new.confirm')}</p><button onClick={()=>{audio();g.start(name,true);}}>{t('ui.new.yes')}</button><button onClick={g.cancelNewGame}>{t('ui.cancel')}</button></Modal>}
 <p className="muted">{t('ui.title.schedule')}</p></div></main>;
}
function Dialogue(){
 const t=useTranslation();const {locale}=useLocale();
 const g=useGame(),s=g.state,x=SCENES[s.scene!.id],l=currentLine(s,SCENES,locale)!,portrait=portraitFor(l.speaker,l.expression,s.week,x.outfits?.[l.speaker]),staging=sceneStage(s,x,locale),lighting=sceneLighting(s,x),bg=backgroundFor(staging.background,lighting,s.week),narration=l.speaker==='narrator',showPortrait=l.speaker!=='narrator'&&l.speaker!=='marton',heading=useRef<HTMLHeadingElement>(null),stage=useRef<HTMLElement>(null),copy=useRef<HTMLDivElement>(null),[hasMoreText,setHasMoreText]=useState(false);
 useEffect(()=>{if(window.matchMedia('(max-width:700px)').matches)stage.current?.scrollIntoView({block:'start'});},[x.id,l.id]);
 useEffect(()=>{heading.current?.focus({preventScroll:true});const element=copy.current;if(!element)return;element.scrollTop=0;const measure=()=>setHasMoreText(element.scrollHeight>element.clientHeight+1);measure();const observer=new ResizeObserver(measure);observer.observe(element);return ()=>observer.disconnect();},[x.id,l.id]);
 const clip=l.moment?MOMENT_CLIPS[l.moment]:undefined;
 return <main ref={stage} data-stage={l.stage??''} data-proximity={staging.proximity} data-outdoors={['courtyard','bekas'].includes(staging.location)} data-event={calendarFor(s.week).event??undefined} data-season={calendarFor(s.week).season} data-weather={calendarFor(s.week).weather} className={'dialogue lighting-'+lighting+(bg.lightingBaked?' lighting-baked':'')+(narration?' narration':'')+(!showPortrait?' no-portrait':'')} style={bg.file?{'--scene-background':'url("'+assetUrl(bg.file)+'")'} as CSSProperties:undefined}>
 <AssetImage className="season-background" file={bg.file} label={t(`location.${staging.location}`)}/>{bg.missingVariant&&<small className="variant-pending">◇ {bg.missingVariant}</small>}<div className="scene-meta"><span>{t(`location.${staging.location}`)} · {lighting==='day'?t('ui.light.day'):lighting==='evening'?t('ui.light.evening'):t('ui.light.night')}</span><span>{staging.label||sceneTitle(x,locale)}</span></div><div className="scene-view">{clip?.status==='reviewed'?<Moment key={x.id+'/'+l.id} clip={clip}/>:showPortrait&&<figure className={'portrait actor-'+l.speaker}>{portrait.file?<div className="portrait-frame"><AssetImage file={portrait.file} label={ACTOR_NAME[l.speaker]}/></div>:<div className="portrait-placeholder" aria-label={portrait.note}><span aria-hidden="true">{SHORT[l.speaker][0]}</span><p>{t('ui.portrait.pending')}</p></div>}{portrait.missingVariant&&<small className="variant-pending">◇ {portrait.missingVariant}</small>}</figure>}</div>{!bg.file&&<p className="art-label">{bg.note}</p>}
 <div className="dialogue-layout">
 <section className="dialogue-panel"><div className="dialogue-heading">{!narration&&<p className="eyebrow">{staging.participants.filter(p=>p!=='marton'&&p!=='narrator').map(p=>SHORT[p]).join(' · ')}</p>}<h1 ref={heading} tabIndex={-1}>{narration?sceneTitle(x,locale):l.speaker==='marton'?s.name:ACTOR_NAME[l.speaker]}</h1></div>
 <div className="dialogue-copy" ref={copy} role="region" aria-label={t('ui.scene.text')} tabIndex={0}>{s.lastNote&&<p className="reaction" role="status">{presentText(s.lastNote,s.name,locale)}</p>}<p className="spoken">{l.text}</p></div><small className="reading-hint" aria-hidden={!hasMoreText}>{hasMoreText?t('ui.scene.scroll'):' '}</small><div className="choices">{l.choices?.length?l.choices.map(c=><button key={c.id} onClick={()=>g.pick(c.id)}>{c.text}</button>):<button className="primary" onClick={()=>g.pick('continue')}><Icon name={l.next?'book':'door'}/>{l.next?t('ui.continue'):t('ui.scene.finish')}</button>}</div></section></div></main>;
}
function Summary(){
 const t=useTranslation();const {locale}=useLocale();
 const g=useGame(),s=g.state;return <main className="panel"><p className="eyebrow">{t('ui.summary.witnessed')}</p><h1>{t('ui.summary.heading',{week:s.week})}</h1>{s.journal.filter(j=>j.week===s.week).map(j=><p key={j.scene}>{presentText(j.text,s.name,locale)}</p>)}{s.week===CALENDAR.lastPersonal&&<p className="notice">{t('ui.summary.deadline')}</p>}<button className="primary" onClick={g.advance}>{s.week===CALENDAR.weeks?t('ui.end'):t('ui.week.start',{week:s.week+1})}</button></main>;
}
function Ending(){
 const t=useTranslation();
 const s=useGame(x=>x.state),e=evaluateEnding(s);return <main className="panel ending"><p className="eyebrow">{t('ui.ending.after')}</p><h1>{t('ui.ending.heading')}</h1><h2>{t('ui.ending.threat')}</h2><p>{threatText(e.cost)}</p><h2>{t('ui.ending.college')}</h2><p>{e.institution?institutions[e.institution]:''}</p><h2>{t('ui.ending.relationships')}</h2><p>{relationships[e.relationship??'unresolved']}</p><h2>{t('ui.ending.report')}</h2><p>{viragEpilogue(s)}</p><button onClick={()=>useGame.getState().toTitle()}>{t('ui.title.back')}</button></main>;
}
