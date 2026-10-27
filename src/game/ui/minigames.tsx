import {useEffect,useRef,useState} from 'react';
import {useGame} from '../store.ts';
import {puzzleDone,puzzleReward,MOVE_LIMIT,recyclingPlayback,legalSwap,type RecyclingFrame} from '../content/puzzles.ts';
import {formatFt} from '../content/format.ts';
import {RECYCLING_ATLAS_URL} from '../content/assets.ts';
import './recycling.css';
const NAMES=['Zöld üveg','Kék palack','Réz doboz','Lila üveg'];
const CARDS=['Kulcs','Levél','Hold','Torony','Könyv','Térkép','Pecsét','Toll'];
const SYMBOLS=['⚿','✉','☾','♜','▤','⌘','✿','✎'];
export function PuzzleGame(){
 const g=useGame(),s=g.state,kind=s.minigame!,p=s.puzzle!,done=puzzleDone(p),reward=puzzleReward(p),memory=kind==='archive';
 const [frames,setFrames]=useState<RecyclingFrame[]>([]),[hint,setHint]=useState<number[]>([]);
 const lock=useRef(false),frame=frames[0],busy=!!frame;
 const [feedback,setFeedback]=useState('');
 const displayScore=p.score-frames.reduce((sum,f)=>sum+f.points,0)+(frame?.points??0);
 useEffect(()=>{
  if(!frame){lock.current=false;return;}
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const timer=window.setTimeout(()=>setFrames(current=>current.slice(1)),reduced?70:frame.phase==='clear'?420:320);
  return ()=>window.clearTimeout(timer);
 },[frame]);
 const move=(index:number)=>{
  if(lock.current)return;
  setHint([]);
  const playback=memory?[]:recyclingPlayback(p,index);
  if(playback.length){lock.current=true;setFrames(playback);setFeedback(playback.some(f=>f.phase==='clear')?`+${playback.reduce((n,f)=>n+f.points,0)} pont`:'Ez a csere nem ad hármast. Nem fogyott lépés.');}
  g.movePuzzle(index);
 };
 const after='éjszaka';
 const title=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{title.current?.focus({preventScroll:true});title.current?.scrollIntoView({block:'start'});},[]);
 const started=p.moves>0||p.selected.length>0;
 return <main className="puzzle panel" aria-labelledby="puzzle-title">
  <p className="eyebrow">Nappali műszak · nincs időmérő · 12 energia</p>
  <h1 id="puzzle-title" ref={title} tabIndex={-1}>{memory?'Archívumpárok':'Újrahasznosítás'}</h1>
  <p>{memory?'Keresd meg a 8 párt. Fordíts fel két lapot, aztán lépj tovább.':'Cserélj két szomszédos darabot: legyen 3 egyforma egy sorban!'}</p>
  <div className="puzzle-stats" aria-live="polite"><strong>{MOVE_LIMIT[kind]-p.moves} lépés maradt</strong><span>{memory?`${p.score} / 8 pár`:`${displayScore} / 1200 célpont`}</span><span>{formatFt(reward.money)} + {reward.points} programpont</span></div>

  {!memory&&<div className="recycling-feedback" role="status" aria-live="polite">{frame?.phase==='clear'?`+${frame.points} pont${frame.chain>1?` · ${Math.min(frame.chain,3)}× lánc!`:''}`:frame?.phase==='shuffle'?'Új lehetőségek: tábla újrakeverve.':feedback||'Gyűjts össze legalább három egyforma tárgyat!'}</div>}
  <div aria-busy={busy} className={'puzzle-board '+(memory?'archive-board':'bottle-board')} role="group" aria-label={memory?'Iratpárosító tábla':'Palackcsoportok'}>
   {(frame?.board??p.board).map((value,i)=>{
    const face=!memory||p.selected.includes(i)||p.matched.includes(i),matched=memory&&p.matched.includes(i);
    return <button key={i} type="button" className={'puzzle-tile '+(memory?'archive-tile':'bottle-'+value)+(p.selected.includes(i)?' is-selected':'')+(matched?' is-matched':'')+(memory&&!face?' is-hidden':'')+(frame?.indices.includes(i)?' phase-'+frame.phase:'')+(hint.includes(i)?' is-hint':'')} style={{'--from-x':((frame?.offsets[i]??0)%5)*100+'%','--from-y':Math.trunc((frame?.offsets[i]??0)/5)*100+'%'} as React.CSSProperties} disabled={busy||done||matched||memory&&(p.selected.length===2||p.selected.includes(i))} onClick={()=>move(i)} aria-pressed={!memory?p.selected.includes(i):undefined} aria-label={memory?`${i+1}. lap: ${face?CARDS[value]:'lefordítva'}${matched?', megtalált pár':''}`:`${Math.floor(i/5)+1}. sor ${i%5+1}. oszlop: ${NAMES[value]}`}>
     <span key={frame?frames.length: 'idle'} aria-hidden="true" className={!memory?'recycling-piece motion-'+(frame?.phase??'idle'):undefined}>{memory?(face?SYMBOLS[value]:'?'):<span className={'recycling-object object-'+value} style={{backgroundImage:`url(${RECYCLING_ATLAS_URL})`}}/>}</span>{memory&&<small>{face?CARDS[value]:'Lap '+(i+1)}</small>}
    </button>;
   })}
  </div>
  {memory&&p.selected.length===2&&!done&&<div className="pair-feedback" role="status"><p>{p.board[p.selected[0]]===p.board[p.selected[1]]?'Megvan a pár!':'Ez a két jel eltér. Jegyezd meg a helyüket.'}</p><button className="primary" onClick={g.nextPair}>Következő pár</button></div>}
  {!memory&&!done&&<button className="recycling-hint" disabled={busy} onClick={()=>{setHint(legalSwap(p.board));setFeedback('A két megjelölt tárgyat cseréld fel. A segítség ingyenes.');}}>Mutass egy cserét</button>}
  {!memory&&!done&&<p className="muted" role="status">{p.selected.length?'Most válassz egy szomszédos darabot.':'Válassz két szomszédos darabot. Csak a sikeres csere használ lépést.'}</p>}
  <details className="puzzle-help"><summary>Szabályok, jutalom és mentés</summary>
  <p className="muted">Teljesítsd a műszakot: 8 000–20 000 Ft és 3–6 programpont. A jutalom átvétele után {after} következik. Az első lépéstől minden lépés mentődik; később folytathatod.</p>
  <p>{memory?'Egy pár felfordítása egy lépés. Nincs időkorlát: a két lapot a Következő pár gombig nézheted.':'Koppints egy darabra, majd a szomszédjára. Legalább három azonos jel kell vízszintesen vagy függőlegesen. A sikertelen csere ingyenes. A lehulló darabok újabb egyezései 2×, majd 3× pontot érnek. Ha nincs lehetséges csere, a tábla automatikusan újrakeveredik.'}</p></details>
  {done&&!busy?<section className="puzzle-result" aria-live="polite"><h2>Műszak kész</h2><p>{memory?`${p.score} iratpárt rendeztél.`:`${p.score} pontot gyűjtöttél.`} Jutalmad: <strong>{formatFt(reward.money)} és {reward.points} programpont.</strong></p><p>A telefon különleges alkalmai 4 vagy 6 programpontba kerülnek. A pénzből ajándékot és programot választhatsz.</p><button className="primary" onClick={g.finishJob}>Jutalom átvétele · {after}</button></section>:!started&&!busy?<button onClick={g.cancelJob}>Vissza · még nem kezdtem el</button>:<p className="muted">A műszak folyamatban van. A címoldalra visszalépve vagy az ablakot bezárva később ugyaninnen folytathatod.</p>}
 </main>;
}
