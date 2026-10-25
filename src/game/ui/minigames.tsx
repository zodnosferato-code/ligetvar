import {useEffect,useRef} from 'react';
import {useGame} from '../store.ts';
import {newPuzzle,puzzleDone,puzzleReward,MOVE_LIMIT,cluster} from '../content/puzzles.ts';
import {formatFt} from '../content/format.ts';
const BOTTLES=['●','▲','■','◆'],NAMES=['Zöld üveg','Kék palack','Réz doboz','Lila üveg'];
const CARDS=['Kulcs','Levél','Hold','Torony','Könyv','Térkép','Pecsét','Toll'];
const SYMBOLS=['⚿','✉','☾','♜','▤','⌘','✿','✎'];
export function PuzzleGame(){
 const g=useGame(),s=g.state,kind=s.minigame!,p=s.puzzle??newPuzzle(kind,s.week),done=puzzleDone(p),reward=puzzleReward(p),memory=kind==='brick';
 const after=s.slot===2?'heti összegzés':'éjszaka';
 const title=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{title.current?.focus({preventScroll:true});title.current?.scrollIntoView({block:'start'});},[]);
 const started=p.moves>0||p.selected.length>0;
 return <main className="puzzle panel" aria-labelledby="puzzle-title">
  <p className="eyebrow">Nappali műszak · nincs időmérő · 12 energia</p>
  <h1 id="puzzle-title" ref={title} tabIndex={-1}>{memory?'Archívumpárok':'Palackmozaik'}</h1>
  <p>{memory?'Keresd meg a 8 párt. Fordíts fel két lapot, aztán lépj tovább.':'Koppints 2 vagy több szomszédos, azonos jelre. Nagy csoport = több pont.'}</p>
  <div className="puzzle-stats" aria-live="polite"><strong>{MOVE_LIMIT[kind]-p.moves} lépés maradt</strong><span>{memory?`${p.score} / 8 pár`:`${p.score} / 180 célpont`}</span><span>{formatFt(reward.money)} + {reward.points} programpont</span></div>

  <div className={'puzzle-board '+(memory?'archive-board':'bottle-board')} role="group" aria-label={memory?'Iratpárosító tábla':'Palackcsoportok'}>
   {p.board.map((value,i)=>{
    const face=!memory||p.selected.includes(i)||p.matched.includes(i),matched=memory&&p.matched.includes(i),group=memory?0:cluster(p.board,i).length;
    return <button key={i} type="button" className={'puzzle-tile '+(memory?'archive-tile':'bottle-'+value)+(matched?' is-matched':'')+(memory&&!face?' is-hidden':'')} disabled={done||matched||memory&&(p.selected.length===2||p.selected.includes(i))} onClick={()=>g.movePuzzle(i)} aria-label={memory?`${i+1}. lap: ${face?CARDS[value]:'lefordítva'}${matched?', megtalált pár':''}`:`${Math.floor(i/5)+1}. sor ${i%5+1}. oszlop: ${NAMES[value]}, ${group} darabos csoport`}>
     <span aria-hidden="true">{face?(memory?SYMBOLS[value]:BOTTLES[value]):'?'}</span>{memory&&<small>{face?CARDS[value]:'Lap '+(i+1)}</small>}
    </button>;
   })}
  </div>
  {memory&&p.selected.length===2&&!done&&<div className="pair-feedback" role="status"><p>{p.board[p.selected[0]]===p.board[p.selected[1]]?'Megvan a pár!':'Ez a két jel eltér. Jegyezd meg a helyüket.'}</p><button className="primary" onClick={g.nextPair}>Következő pár</button></div>}
  <details className="puzzle-help"><summary>Szabályok, jutalom és mentés</summary>
  <p className="muted">Teljesítsd a műszakot: 8 000–20 000 Ft és 3–6 programpont. A jutalom átvétele után {after} következik. Az első lépéstől minden lépés mentődik; később folytathatod.</p>
  <p>{memory?'Egy pár felfordítása egy lépés. Nincs időkorlát: a két lapot a Következő pár gombig nézheted.':'Csak az oldalukon érintkező darabok alkotnak csoportot. Az üres helyekre új darabok csúsznak. Egy magányos darabra koppintás nem használ lépést.'}</p></details>
  {!memory&&!done&&<p className="muted">Pontozás: 2 darab = 2 pont · 3 = 6 · 5 = 20 · 10 = 90. Az egyedül álló darabra koppintás nem használ lépést.</p>}
  {done?<section className="puzzle-result" aria-live="polite"><h2>Műszak kész</h2><p>{memory?`${p.score} iratpárt rendeztél.`:`${p.score} pontot gyűjtöttél.`} Jutalmad: <strong>{formatFt(reward.money)} és {reward.points} programpont.</strong></p><p>A telefon különleges alkalmai 4 vagy 6 programpontba kerülnek. A pénzből ajándékot és programot választhatsz.</p><button className="primary" onClick={g.finishJob}>Jutalom átvétele · {after}</button></section>:!started?<button onClick={g.cancelJob}>Vissza · még nem kezdtem el</button>:<p className="muted">A műszak folyamatban van. A címoldalra visszalépve vagy az ablakot bezárva később ugyaninnen folytathatod.</p>}
 </main>;
}
