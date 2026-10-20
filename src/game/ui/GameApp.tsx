import {Component,useEffect,useRef,useState,type CSSProperties,type ReactNode} from 'react';
import {SCENES} from '../content/catalog.ts';
import {ACTOR_NAME,SHORT,BACKGROUNDS,LOCATIONS,assetUrl,portraitFor} from '../content/assets.ts';
import {currentLine,currentPeriod,sceneLighting,evaluateEnding,formatFt} from '../content/runtime.ts';
import {institutions,relationships} from '../content/epilogues.ts';
import {useGame} from '../store.ts';
import {moodFor,setMood,toggleMute,unlockAudio} from '../audio.ts';
import {MohuGame,TriviaGame} from './minigames.tsx';
import {Icon} from './controls.tsx';
import {Journal} from './Journal.tsx';
import {RoomPlanner} from './RoomPlanner.tsx';
class Boundary extends Component<{children:ReactNode},{error:string}>{
 state={error:''};static getDerivedStateFromError(e:Error){return {error:e.message};}
 render(){return this.state.error?<main className="panel" role="alert"><h1>A játék hibát jelzett</h1><p>{this.state.error}</p><p>A mentés nem törlődött.</p><button onClick={()=>location.reload()}>Újratöltés</button></main>:this.props.children;}
}
export function GameApp(){return <Boundary><Game/></Boundary>;}
function Game(){
 const g=useGame(),s=g.state,[muted,setMuted]=useState(false),[scale,setScale]=useState(1);
 useEffect(()=>{g.boot();},[]);useEffect(()=>{if(g.mode==='play')setMood(moodFor(s));},[g.mode,s]);
 return <div className="game" style={{'--text-scale':scale} as CSSProperties}>
 <header className="masthead"><a className="brand" href="#" onClick={e=>{e.preventDefault();g.toTitle();}}><span className="brand-seal"><Icon name="book"/></span><span className="brand-copy">Ligetvár<small>Őszi félév</small></span></a><div className="tools"><label>Betűméret <select aria-label="Betűméret" value={scale} onChange={e=>setScale(Number(e.target.value))}><option value={1}>100%</option><option value={1.15}>115%</option><option value={1.3}>130%</option></select></label><button onClick={()=>setMuted(toggleMute())}><Icon name="sound"/>{muted?'Hang be':'Hang ki'}</button></div></header>
 {g.saveMessage&&<p className="notice" role="alert">{g.saveMessage}</p>}
 {g.mode==='title'?<Title/>:<><div className="status"><strong><Icon name="book"/>{s.week}. hét / 16</strong><span>{s.phase==='ending'?'Félév lezárva':s.slot===0?'Közös történet':s.slot<3?(currentPeriod(s)==='night'?'Éjszakai tevékenység':'Nappali tevékenység'):'Heti összegzés'}</span><span><Icon name="energy"/>Energia {s.energy}/100</span><span><Icon name="money"/>{formatFt(s.money)}</span></div>
 {s.phase==='scene'?<Dialogue/>:s.phase==='planner'?<RoomPlanner key={s.week+'-'+s.slot}/>:s.phase==='summary'?<Summary/>:s.phase==='ending'?<Ending/>:<section className="panel"><h1>Opcionális munka</h1>{s.minigame==='mohu'?<MohuGame onDone={g.finishJob} onCancel={g.cancelJob}/>:<TriviaGame onDone={g.finishJob} onCancel={g.cancelJob}/>}</section>}
 {s.phase!=='scene'&&s.phase!=='ending'&&s.lastNote&&<p className="notice" role="status">{s.lastNote}</p>}{s.phase!=='planner'&&<Journal/>}</>}
 <footer>Átmeneti ruhás képek és jelölt képhelyőrzők. Az új manga készlet még nem végleges.</footer></div>;
}
function Title(){
 const g=useGame(),[name,setName]=useState('Márton Kelényi');
 const audio=()=>{try{unlockAudio();}catch{/* Audio is optional. */}};
 return <main className="title panel" style={{backgroundImage:'linear-gradient(90deg,rgba(24,14,21,.96),rgba(24,14,21,.82) 55%,rgba(24,14,21,.22)),url("'+assetUrl('backgrounds/courtyard.jpg')+'")'}}><div className="title-copy"><div className="title-crest" aria-hidden="true"><Icon name="heart"/></div><p className="eyebrow">Romantika · rejtély · tizenhat hét</p><h1>Ami a kastélyban marad</h1><p>Egy különös műhely, három eltérő közelség és esték, amelyekre valaki nem emlékszik. A nyomozás barátságban is végigjátszható.</p>
 <label className="name">A neved<input maxLength={32} value={name} onChange={e=>setName(e.target.value)}/></label><div className="actions">{g.hasSave&&<button className="primary" onClick={()=>{audio();g.resume();}}><Icon name="book"/>Félév folytatása</button>}<button onClick={()=>{audio();g.start(name);}}><Icon name="door"/>Új félév indítása</button></div>
 {g.hasLegacy&&<aside className="notice"><strong>A régi mentés megmaradt.</strong><p>Az átdolgozott történet új félévet igényel. Régi útvonalak, döntések és mérföldkövek nem vihetők át. Az új játék csak a v2 mentést írja.</p><button onClick={()=>{const n=g.importName();if(n)setName(n);}}>Csak a régi játékosnév átvétele</button></aside>}
 <p className="muted">Minden héten egy közös jelenet, egy nappali és egy éjszakai tevékenység. A személyes jelenetek valódi határidőig pótolhatók; a folytatás nem kerül újabb sávba.</p></div></main>;
}
function Dialogue(){
 const g=useGame(),s=g.state,x=SCENES[s.scene!.id],l=currentLine(s,SCENES)!,portrait=portraitFor(l.speaker,l.expression),bg=BACKGROUNDS[x.background],lighting=sceneLighting(s,x),narration=l.speaker==='narrator',showPortrait=l.speaker!=='narrator'&&l.speaker!=='marton',heading=useRef<HTMLHeadingElement>(null),stage=useRef<HTMLElement>(null),copy=useRef<HTMLDivElement>(null),[hasMoreText,setHasMoreText]=useState(false);
 useEffect(()=>{if(window.matchMedia('(max-width:700px)').matches)stage.current?.scrollIntoView({block:'start'});},[x.id,l.id]);
 useEffect(()=>{heading.current?.focus({preventScroll:true});const element=copy.current;if(!element)return;element.scrollTop=0;const measure=()=>setHasMoreText(element.scrollHeight>element.clientHeight+1);measure();const observer=new ResizeObserver(measure);observer.observe(element);return ()=>observer.disconnect();},[x.id,l.id]);
 return <main ref={stage} className={'dialogue lighting-'+lighting+(narration?' narration':'')+(!showPortrait?' no-portrait':'')} style={bg.file?{'--scene-background':'url("'+assetUrl(bg.file)+'")'} as CSSProperties:undefined}>
 <div className="scene-meta"><span>{LOCATIONS[x.location]} · {lighting==='day'?'Nappal':lighting==='evening'?'Este':'Éjjel'}</span><span>{x.title}</span></div><div className="scene-view">{showPortrait&&<figure className={'portrait actor-'+l.speaker}>{portrait.file?<div className="portrait-frame"><img src={assetUrl(portrait.file)} alt={ACTOR_NAME[l.speaker]}/></div>:<div className="portrait-placeholder" aria-label={portrait.note}><span aria-hidden="true">{SHORT[l.speaker][0]}</span><p>Portré készül</p></div>}</figure>}</div>{!bg.file&&<p className="art-label">{bg.note}</p>}
 <div className="dialogue-layout">
 <section className="dialogue-panel"><div className="dialogue-heading">{!narration&&<p className="eyebrow">{x.participants.filter(p=>p!=='marton'&&p!=='narrator').map(p=>SHORT[p]).join(' · ')}</p>}<h1 ref={heading} tabIndex={-1}>{narration?x.title:l.speaker==='marton'?s.name:ACTOR_NAME[l.speaker]}</h1></div>
 <div className="dialogue-copy" ref={copy} role="region" aria-label="Jelenet szövege" tabIndex={0}>{s.lastNote&&<p className="reaction" role="status">{s.lastNote}</p>}<p className="spoken">{l.text}</p></div><small className="reading-hint" aria-hidden={!hasMoreText}>{hasMoreText?'Görgess a teljes szöveghez ↓':' '}</small><div className="choices">{l.choices?.length?l.choices.map(c=><button key={c.id} onClick={()=>g.pick(c.id)}>{c.text}</button>):<button className="primary" onClick={()=>g.pick('continue')}><Icon name={l.next?'book':'door'}/>{l.next?'Tovább':'Alkalom befejezése'}</button>}</div></section></div></main>;
}
function Summary(){
 const g=useGame(),s=g.state;return <main className="panel"><p className="eyebrow">Csak a megtörtént események</p><h1>{s.week}. heti összegzés</h1>{s.journal.filter(j=>j.week===s.week).map(j=><p key={j.scene}>{j.text}</p>)}{s.week===14&&<p className="notice">A konfrontáció előtti személyes alkalmak határideje lejárt. A nyomozás folytatódik.</p>}<button className="primary" onClick={g.advance}>{s.week===16?'Félév lezárása és epilógusok':s.week+1+'. hét kezdése'}</button></main>;
}
function Ending(){
 const e=evaluateEnding(useGame(x=>x.state));return <main className="panel ending"><p className="eyebrow">A félév után</p><h1>Ami megmarad</h1><h2>1. A veszély</h2><p>A vámpír meghalt a megszakított átalakulásban. {e.cost==='supported'?'A gyakorlás és a segítők jelenléte csökkentette a kimerülést, a bizonyítékok megmaradtak.':'A segítők megállították a rítust, de a csoport súlyosan kimerült, és iratok sérültek meg.'} Lilla és a többiek fokozatosan épülnek fel; az emlékek nem térnek vissza egyszerre.</p><h2>2. A főiskola</h2><p>{e.institution?institutions[e.institution]:''}</p><h2>3. A kapcsolatok</h2><p>{relationships[e.relationship??'unresolved']}</p><button onClick={()=>useGame.getState().toTitle()}>Vissza a címoldalra</button></main>;
}
