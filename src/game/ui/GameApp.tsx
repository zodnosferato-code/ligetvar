import {Component,useEffect,useRef,useState,type CSSProperties,type ReactNode} from 'react';
import {SCENES,EVIDENCE} from '../content/catalog.ts';
import {ACTOR_NAME,SHORT,BACKGROUNDS,LOCATIONS,assetUrl,portraitFor} from '../content/assets.ts';
import {availableScenes,currentLine,evaluateEnding,formatFt,GIFTS} from '../engine/logic.ts';
import {GIRLS,type RouteId} from '../engine/types.ts';
import {useGame} from '../store.ts';
import {moodFor,setMood,toggleMute,unlockAudio} from '../audio.ts';
import {MohuGame,TriviaGame} from './minigames.tsx';
const ROUTES:Record<RouteId,string>={friendship:'Barátság',rebeka:'Rebeka',boglarka:'Boglárka',greta:'Gréta',triad:'Rebeka, Boglárka és Márton'};
class Boundary extends Component<{children:ReactNode},{error:string}>{
 state={error:''};static getDerivedStateFromError(e:Error){return {error:e.message};}
 render(){return this.state.error?<main className="panel" role="alert"><h1>A játék hibát jelzett</h1><p>{this.state.error}</p><p>A mentés nem törlődött.</p><button onClick={()=>location.reload()}>Újratöltés</button></main>:this.props.children;}
}
export function GameApp(){return <Boundary><Game/></Boundary>;}
function Game(){
 const g=useGame(),s=g.state,[muted,setMuted]=useState(false),[scale,setScale]=useState(1);
 useEffect(()=>{g.boot();},[]);useEffect(()=>{if(g.mode==='play')setMood(moodFor(s));},[g.mode,s]);
 return <div className="game" style={{'--text-scale':scale} as CSSProperties}>
 <header className="masthead"><a className="brand" href="#" onClick={e=>{e.preventDefault();g.toTitle();}}>Ligetvár<span>Őszi félév</span></a><div className="tools"><label>Betűméret <select aria-label="Betűméret" value={scale} onChange={e=>setScale(Number(e.target.value))}><option value={1}>100%</option><option value={1.15}>115%</option><option value={1.3}>130%</option></select></label><button onClick={()=>setMuted(toggleMute())}>{muted?'Hang be':'Hang ki'}</button></div></header>
 {g.saveMessage&&<p className="notice" role="alert">{g.saveMessage}</p>}
 {g.mode==='title'?<Title/>:<><div className="status"><strong>{s.week}. hét / 16</strong><span>{s.phase==='ending'?'Félév lezárva':s.slot===0?'Közös történet':s.slot<3?s.slot+'. szabad sáv / 2':'Heti összegzés'}</span><span>Energia {s.energy}/100</span><span>{formatFt(s.money)}</span></div>
 {s.phase==='scene'?<Dialogue/>:s.phase==='planner'?<Planner/>:s.phase==='summary'?<Summary/>:s.phase==='ending'?<Ending/>:<section className="panel"><h1>Opcionális munka</h1>{s.minigame==='mohu'?<MohuGame onDone={g.finishJob} onCancel={g.cancelJob}/>:<TriviaGame onDone={g.finishJob} onCancel={g.cancelJob}/>}</section>}
 {s.phase!=='scene'&&s.phase!=='ending'&&s.lastNote&&<p className="notice" role="status">{s.lastNote}</p>}<Journal/></>}
 <footer>Átmeneti ruhás képek és jelölt képhelyőrzők. Az új manga készlet még nem végleges.</footer></div>;
}
function Title(){
 const g=useGame(),[name,setName]=useState('Márton Kelényi');
 const audio=()=>{try{unlockAudio();}catch{/* Audio is optional. */}};
 return <main className="title panel"><p className="eyebrow">Romantika · rejtély · tizenhat hét</p><h1>Ami a kastélyban marad</h1><p>Egy különös műhely, három eltérő közelség és esték, amelyekre valaki nem emlékszik. A nyomozás barátságban is végigjátszható.</p>
 <label className="name">A neved<input maxLength={32} value={name} onChange={e=>setName(e.target.value)}/></label><div className="actions">{g.hasSave&&<button className="primary" onClick={()=>{audio();g.resume();}}>Félév folytatása</button>}<button onClick={()=>{audio();g.start(name);}}>Új félév indítása</button></div>
 {g.hasLegacy&&<aside className="notice"><strong>A régi mentés megmaradt.</strong><p>Az átdolgozott történet új félévet igényel. Régi útvonalak, döntések és mérföldkövek nem vihetők át. Az új játék csak a v2 mentést írja.</p><button onClick={()=>{const n=g.importName();if(n)setName(n);}}>Csak a régi játékosnév átvétele</button></aside>}
 <p className="muted">Minden héten egy közös jelenet és két szabad sáv. A személyes jelenetek valódi határidőig pótolhatók; a folytatás nem kerül újabb sávba.</p></main>;
}
function Planner(){
 const g=useGame(),s=g.state,available=availableScenes(s,SCENES),committed=['rebeka_commit','boglarka_commit','greta_commit'].some(id=>id in s.decisions);
 const blocked=Object.values(SCENES).filter(x=>x.kind!=='shared'&&x.week<=s.week&&x.deadline>=s.week&&!(x.id in s.completed)&&!available.includes(x));
 return <main><div className="section-heading"><div><p className="eyebrow">A hét terve</p><h1>{s.slot===0?'A közös történet következik':'Mire szánod ezt az időt?'}</h1></div><p>{s.slot===0?'Ez az alkalom pénztől, energiától és románctól függetlenül elérhető.':'Két szabad sávod van. A korábbi találkozók határidőig pótolhatók.'}</p></div>
 <div className="scene-grid">{available.map(x=><button className="scene-card" key={x.id} onClick={()=>g.scene(x.id)}><span className="eyebrow">{x.kind==='shared'?'Közös történet':x.kind==='preparation'?'Felkészülés':'Személyes alkalom'}</span><strong>{x.title}</strong><span>{LOCATIONS[x.location]}</span><small>{x.week<s.week?'Pótolható · ':''}Határidő: {x.deadline}. hét vége</small></button>)}</div>
 {s.slot>0&&<><section className="panel"><h2>Szabad idő</h2><div className="actions"><button onClick={()=>g.activity('rest')}>Pihenés · +32 energia</button><button onClick={()=>g.activity('talk')}>Kávé a műhely után</button><button onClick={()=>g.activity('mohu')}>MOHU visszaváltás</button><button onClick={()=>g.activity('brick')}>Iratellenőrzés</button></div><p className="muted">A munka önkéntes. Hetente +24 energia jár; a személyes jelenet költsége 8. Ismételt beszélgetés és ajándék nem helyettesít személyes vállalást.</p></section>
 {s.week>=8&&'shared_8' in s.completed&&<section className="panel"><h2>{committed?'Vállalt irány':'Jelenlegi szándék'}: {ROUTES[s.direction]}</h2><p>{committed?'A személyesen vállalt irányt a tervező nem írja át. A folytatásról az utóbeszélgetésben dönthettek.':'Ez szándék, nem mások helyett tett vállalás. Elutasított közös kapcsolat után is választhatsz kölcsönösen akart egyéni irányt vagy barátságot.'}</p><div className="actions">{Object.entries(ROUTES).map(([id,label])=><button key={id} disabled={committed} aria-pressed={s.direction===id} onClick={()=>g.direction(id as RouteId)}>{label}</button>)}</div></section>}
 <details className="panel"><summary>Ajándékok · nincs műszakfeltétel</summary><p>A vásárlás és átadás nem foglal sávot. Személyenként hetente egy ajándék; mérföldkövet nem ad.</p>{Object.entries(GIFTS).map(([id,x])=><div className="gift" key={id}><span>{x.name} · {formatFt(x.price)} · nálad: {s.inventory[id]??0}</span><button disabled={s.money<x.price} onClick={()=>g.buy(id)}>Megveszem</button>{GIRLS.map(girl=><button key={girl} disabled={!(s.inventory[id]>0)||s.giftsWeek.includes(girl)} onClick={()=>g.gift(girl,id)}>{ROUTES[girl]}</button>)}</div>)}</details></>}
 {blocked.length>0&&<details className="panel"><summary>Korábbi beszélgetést vagy döntést igénylő alkalmak ({blocked.length})</summary>{blocked.map(x=><p key={x.id}><strong>{x.title}</strong> · határidő: {x.deadline}. hét.<small>{[...(x.requires.scenes??[]).filter(id=>!(id in s.completed)).map(id=>SCENES[id]?.title),...(x.requires.decisions??[]).filter(id=>!(id in s.decisions)).map(()=> 'Személyes igen vagy jóvátétel szükséges'),...(x.requires.directions&&!x.requires.directions.includes(s.direction)?['Másik szándékot igényel']:[])].join(' · ')||(x.requires.anyOf?'Egyéni szándék vagy mindhárom résztvevő közös igenje szükséges.':'A közös alkalom után választható.')}</small></p>)}</details>}</main>;
}
function Dialogue(){
 const g=useGame(),s=g.state,x=SCENES[s.scene!.id],l=currentLine(s,SCENES)!,portrait=portraitFor(l.speaker,l.expression),bg=BACKGROUNDS[x.background],heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{heading.current?.focus();},[x.id,l.id]);
 return <main className={'dialogue lighting-'+x.lighting} style={bg.file?{backgroundImage:'linear-gradient(90deg,rgba(15,20,25,.2),rgba(15,20,25,.7)),url("'+assetUrl(bg.file)+'")'}:undefined}>
 <div className="scene-meta"><span>{LOCATIONS[x.location]} · {x.lighting==='day'?'Nappal':x.lighting==='evening'?'Este':'Éjjel'}</span><span>{x.title}</span></div>{!bg.file&&<p className="art-label">{bg.note}</p>}
 <div className="dialogue-layout"><figure className={'portrait actor-'+l.speaker}>{portrait.file?<div className="portrait-frame"><img src={assetUrl(portrait.file)} alt={ACTOR_NAME[l.speaker]+' — átmeneti ruhás arckép'}/></div>:<div className="portrait-placeholder"><span>{l.speaker==='narrator'?'L':SHORT[l.speaker][0]}</span><p>{l.speaker==='narrator'?'Elbeszélés':portrait.note}</p></div>}<figcaption>{portrait.file?'Átmeneti portré':l.speaker==='narrator'?'':'Portréhelyőrző'}</figcaption></figure>
 <section className="dialogue-panel"><div className="dialogue-heading"><p className="eyebrow">{x.participants.filter(p=>p!=='marton').map(p=>SHORT[p]).join(' · ')}</p><h1 ref={heading} tabIndex={-1}>{l.speaker==='marton'?s.name:ACTOR_NAME[l.speaker]}</h1></div>
 {s.lastNote&&<p className="reaction" role="status">{s.lastNote}</p>}<p className="spoken">{l.text}</p><div className="choices">{l.choices?.length?l.choices.map(c=><button key={c.id} onClick={()=>g.pick(c.id)}>{c.text}</button>):<button className="primary" onClick={()=>g.pick('continue')}>{l.next?'Tovább':'Alkalom befejezése'}</button>}</div></section></div></main>;
}
function Summary(){
 const g=useGame(),s=g.state;return <main className="panel"><p className="eyebrow">Csak a megtörtént események</p><h1>{s.week}. heti összegzés</h1>{s.journal.filter(j=>j.week===s.week).map(j=><p key={j.scene}>{j.text}</p>)}{s.week===14&&<p className="notice">A konfrontáció előtti személyes alkalmak határideje lejárt. A nyomozás folytatódik.</p>}<button className="primary" onClick={g.advance}>{s.week===16?'Félév lezárása és epilógusok':s.week+1+'. hét kezdése'}</button></main>;
}
const institutions={
 acknowledged:'A főiskola nyilvánosan elismeri az esetet. Az engedélyezett tanúvallomásokat a megőrzött iratokkal együtt adják át. A felépüléshez külön támogatást biztosítanak.',
 incomplete:'A főiskola részleges tájékoztatást ad. A sérült vagy visszatartott bizonyítékok miatt több kérdés nyitva marad.',
 suppressed:'A vezetés belső üggyé szűkíti az esetet. A csoport megőrzi az engedélyezett feljegyzéseket; a hivatalos közlés hallgat a lényegéről.'
};
const relationships:Record<string,string>={
 rebeka:'Rebeka maga választ képet a kiállításához. Nem a tanár elismerését kéri: Mártonnal olyan időt keresnek, amelyben egyiküknek sem kell szerepelnie. Ami a nézők elé kerül, arról ő dönt.',
 boglarka:'Boglárka a saját neve alatt adja le a tanulmányát. Nem rejti el Márton nevét, de a kapcsolatot sem a dolgozat magyarázza. Ő mondja ki, hogyan szeretne együtt maradni.',
 greta:'Gréta befejezetlen táblázatot hagy az irodában. Márton a tó felé várja, lista nélkül. A találkozót azért írják be, mert akarják, nem mert hasznosnak kell lenniük.',
 triad:'Rebeka és Boglárka egymásnak mutatják meg először a készülő kép–szöveg párost. Márton teát főz. Külön időpontjaik és közös estéik is vannak. Mindhárman kimondták, hogy ezt szeretnék; az egyeztetést egyikük sem tekinti egyszer s mindenkorra letudott feladatnak.',
 friendship:'Barátként találkoznak újra. Rebeka képet hoz, Boglárka szöveget, Gréta ezúttal csak önmagát. A közösen végigvitt ügy nem követelt szerelmet.',
 unresolved:'Maradt közelség és kimondatlan kérdés. A hiányzó beszélgetést nem helyettesíti a közös veszély emléke. A félév kapcsolat ígérete nélkül zárul.',
 estranged:'A visszalépést tiszteletben tartották. A közös nyomozás megmarad, a magánéleti találkozások elmaradnak. Senki nem tartozik érzelmekkel azért, mert segítséget kapott.'
};
function Ending(){
 const e=evaluateEnding(useGame(x=>x.state));return <main className="panel ending"><p className="eyebrow">A félév után</p><h1>Ami megmarad</h1><h2>1. A veszély</h2><p>A vámpír meghalt a megszakított átalakulásban. {e.cost==='supported'?'A gyakorlás és a segítők jelenléte csökkentette a kimerülést, a bizonyítékok megmaradtak.':'A segítők megállították a rítust, de a csoport súlyosan kimerült, és iratok sérültek meg.'} Lilla és a többiek fokozatosan épülnek fel; az emlékek nem térnek vissza egyszerre.</p><h2>2. A főiskola</h2><p>{e.institution?institutions[e.institution]:''}</p><h2>3. A kapcsolatok</h2><p>{relationships[e.relationship??'unresolved']}</p><button onClick={()=>useGame.getState().toTitle()}>Vissza a címoldalra</button></main>;
}
function Journal(){
 const s=useGame(x=>x.state);return <aside className="journal"><details><summary>Napló és ismert nyomok · {Object.keys(s.evidence).length}</summary><div className="journal-grid"><section><h2>Amit már tudunk</h2>{Object.entries(s.evidence).map(([id,r])=><p key={id}>{EVIDENCE[id]?.text}<small>{r.week}. hét · {SCENES[r.scene]?.title}</small></p>)}{!Object.keys(s.evidence).length&&<p>Még nincs rögzített felfedezés.</p>}</section><section><h2>Kapcsolódások</h2><p>Márton–Rebeka: {s.bonds.marton_rebeka}<br/>Márton–Boglárka: {s.bonds.marton_boglarka}<br/>Rebeka–Boglárka: {s.bonds.rebeka_boglarka}<br/>Márton–Gréta: {s.bonds.marton_greta}</p><p>A számok nem helyettesítik az igent. Magánéleti kitettség: {s.exposure}/100.</p><h2>Megtörtént alkalmak</h2>{s.journal.map(j=><p key={j.scene}><small>{j.week}. hét</small>{j.text}</p>)}</section></div></details></aside>;
}
