import {Modal} from './Modal.tsx';
import {useTranslation,useLocale} from './Locale.tsx';
import {useEffect,useRef,useState} from 'react';
import {useGame} from '../store.ts';
import {puzzleDone,puzzleReward,MOVE_LIMIT,recyclingPlayback,legalSwap,type RecyclingFrame} from '../content/puzzles.ts';
import {formatFt} from '../content/format.ts';
import {RECYCLING_ATLAS_URL} from '../content/assets.ts';
import './recycling.css';

export function PuzzleGame(){
 const t=useTranslation();const {locale}=useLocale();
const NAMES=[t('puzzle.object.green'),t('puzzle.object.blue'),t('puzzle.object.copper'),t('puzzle.object.purple')];
const CARDS=[t('puzzle.card.key'),t('puzzle.card.letter'),t('puzzle.card.moon'),t('puzzle.card.tower'),t('puzzle.card.book'),t('puzzle.card.map'),t('puzzle.card.seal'),t('puzzle.card.pen')];
const SYMBOLS=['⚿','✉','☾','♜','▤','⌘','✿','✎'];
 const g=useGame(),s=g.state,kind=s.minigame!,p=s.puzzle!,done=puzzleDone(p),reward=puzzleReward(p),memory=kind==='archive';
 const [frames,setFrames]=useState<RecyclingFrame[]>([]),[hint,setHint]=useState<number[]>([]);
 const lock=useRef(false),frame=frames[0],busy=!!frame;
 const [feedback,setFeedback]=useState<'idle'|'invalid'|'hint'|number>('idle');
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
  if(playback.length){lock.current=true;setFrames(playback);setFeedback(playback.some(f=>f.phase==='clear')?playback.reduce((n,f)=>n+f.points,0):'invalid');}
  g.movePuzzle(index);
 };
 const title=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{title.current?.focus({preventScroll:true});title.current?.scrollIntoView({block:'start'});},[]);
 const started=p.moves>0||p.selected.length>0;
 return <main className="puzzle panel" aria-labelledby="puzzle-title">
  <h1 id="puzzle-title" ref={title} tabIndex={-1}>{memory?t('puzzle.archive'):t('puzzle.recycling')}</h1>
  <p>{memory?t('puzzle.archive.help'):t('puzzle.recycling.help')}</p>
  <div className="puzzle-stats" aria-live="polite"><strong>{t('puzzle.moves',{count:MOVE_LIMIT[kind]-p.moves})}</strong><span>{memory?t('puzzle.pairs',{score:p.score}):t('puzzle.target',{score:displayScore})}</span></div>

  {!memory&&<div className="recycling-feedback" role="status" aria-live="polite">{frame?.phase==='clear'?frame.chain>1?t('puzzle.chain',{points:frame.points,chain:Math.min(frame.chain,3)}):t('puzzle.points',{points:frame.points}):frame?.phase==='shuffle'?t('puzzle.shuffle'):typeof feedback==='number'?t('puzzle.points',{points:feedback}):feedback==='invalid'?t('puzzle.swap.failed'):feedback==='hint'?t('puzzle.hint.feedback'):t('puzzle.collect')}</div>}
  <div aria-busy={busy} className={'puzzle-board '+(memory?'archive-board':'bottle-board')} role="group" aria-label={memory?t('puzzle.archive.board'):t('puzzle.recycling.board')}>
   {(frame?.board??p.board).map((value,i)=>{
    const face=!memory||p.selected.includes(i)||p.matched.includes(i),matched=memory&&p.matched.includes(i);
    return <button key={i} type="button" className={'puzzle-tile '+(memory?'archive-tile':'bottle-'+value)+(p.selected.includes(i)?' is-selected':'')+(matched?' is-matched':'')+(memory&&!face?' is-hidden':'')+(frame?.indices.includes(i)?' phase-'+frame.phase:'')+(hint.includes(i)?' is-hint':'')} style={{'--from-x':((frame?.offsets[i]??0)%5)*100+'%','--from-y':Math.trunc((frame?.offsets[i]??0)/5)*100+'%'} as React.CSSProperties} disabled={busy||done||matched||memory&&(p.selected.length===2||p.selected.includes(i))} onClick={()=>move(i)} aria-pressed={!memory?p.selected.includes(i):undefined} aria-label={memory?t('puzzle.card.label',{index:i+1,face:face?CARDS[value]:t('puzzle.facedown'),matched:matched?t('puzzle.matched'):''}):t('puzzle.cell.label',{row:Math.floor(i/5)+1,column:i%5+1,name:NAMES[value]})}>
     <span key={frame?frames.length: 'idle'} aria-hidden="true" className={!memory?'recycling-piece motion-'+(frame?.phase??'idle'):undefined}>{memory?(face?SYMBOLS[value]:'?'):<span className={'recycling-object object-'+value} style={{backgroundImage:`url(${RECYCLING_ATLAS_URL})`}}/>}</span>{memory&&<small>{face?CARDS[value]:t('puzzle.card.number',{index:i+1})}</small>}
    </button>;
   })}
  </div>
  {memory&&p.selected.length===2&&!done&&<div className="pair-feedback" role="status"><p>{p.board[p.selected[0]]===p.board[p.selected[1]]?t('puzzle.match'):t('puzzle.mismatch')}</p><button className="primary" onClick={g.nextPair}>{t('puzzle.next')}</button></div>}
  {!memory&&!done&&<button className="recycling-hint" disabled={busy} onClick={()=>{setHint(legalSwap(p.board));setFeedback('hint');}}>{t('puzzle.hint')}</button>}
  {!memory&&!done&&<p className="muted" role="status">{p.selected.length?t('puzzle.select.next'):t('puzzle.select')}</p>}
  <details className="puzzle-help"><summary>{t('puzzle.rules')}</summary>
  <p className="muted">{t('puzzle.reward.help')}</p>
  <p>{memory?t('puzzle.memory.rules'):t('puzzle.recycling.rules')}</p></details>
  {done&&!busy?<Modal className="puzzle-result" title={t('puzzle.done')} onClose={g.finishJob} dismissible={false}><p>{t(memory?'puzzle.result.pairs':'puzzle.result.points',{score:p.score})} <strong>{t('puzzle.result.reward',{money:formatFt(reward.money,locale),points:reward.points})}</strong></p><button className="primary" onClick={g.finishJob}>{t('puzzle.claim')}</button></Modal>:!started&&!busy?<button onClick={g.cancelJob}>{t('puzzle.cancel')}</button>:null}
 </main>;
}


