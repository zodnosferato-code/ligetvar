import {useEffect,useRef} from 'react';
import {useGame} from '../store.ts';
import {puzzleDone,puzzleReward,MOVE_LIMIT} from '../content/puzzles.ts';
import {formatFt} from '../content/format.ts';
const BOTTLES=['●','▲','■','◆'],NAMES=['Zöld üveg','Kék palack','Réz doboz','Lila üveg'];
const CARDS=['Kulcs','Levél','Hold','Torony','Könyv','Térkép','Pecsét','Toll'];
const SYMBOLS=['⚿','✉','☾','♜','▤','⌘','✿','✎'];
export function PuzzleGame(){
 const g=useGame(),s=g.state,kind=s.minigame!,p=s.puzzle!,done=puzzleDone(p),reward=puzzleReward(p),memory=kind==='archive';
 const after='éjszaka';
 const title=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{title.current?.focus({preventScroll:true});title.current?.scrollIntoView({block:'start'});},[]);
 const started=p.moves>0||p.selected.length>0;
 return <main className="puzzle panel" aria-labelledby="puzzle-title">
  <p className="eyebrow">Nappali műszak · nincs időmérő · 12 energia</p>
  <h1 id="puzzle-title" ref={title} tabIndex={-1}>{memory?'Archívumpárok':'Újrahasznosítás'}</h1>
  <p>{memory?'Keresd meg a 8 párt. Fordíts fel két lapot, aztán lépj tovább.':'Cserélj két szomszédos darabot: legyen 3 egyforma egy sorban!'}</p>
  <div className="puzzle-stats" aria-live="polite"><strong>{MOVE_LIMIT[kind]-p.moves} lépés maradt</strong><span>{memory?`${p.score} / 8 pár`:`${p.score} / 1200 célpont`}</span><span>{formatFt(reward.money)} + {reward.points} programpont</span></div>

  <div className={'puzzle-board '+(memory?'archive-board':'bottle-board')} role="group" aria-label={memory?'Iratpárosító tábla':'Palackcsoportok'}>
   {p.board.map((value,i)=>{
    const face=!memory||p.selected.includes(i)||p.matched.includes(i),matched=memory&&p.matched.includes(i);
    return <button key={i} type="button" className={'puzzle-tile '+(memory?'archive-tile':'bottle-'+value)+(p.selected.includes(i)?' is-selected':'')+(matched?' is-matched':'')+(memory&&!face?' is-hidden':'')} disabled={done||matched||memory&&(p.selected.length===2||p.selected.includes(i))} onClick={()=>g.movePuzzle(i)} aria-pressed={!memory?p.selected.includes(i):undefined} aria-label={memory?`${i+1}. lap: ${face?CARDS[value]:'lefordítva'}${matched?', megtalált pár':''}`:`${Math.floor(i/5)+1}. sor ${i%5+1}. oszlop: ${NAMES[value]}`}>
     <span aria-hidden="true">{face?(memory?SYMBOLS[value]:BOTTLES[value]):'?'}</span>{memory&&<small>{face?CARDS[value]:'Lap '+(i+1)}</small>}
    </button>;
   })}
  </div>
  {memory&&p.selected.length===2&&!done&&<div className="pair-feedback" role="status"><p>{p.board[p.selected[0]]===p.board[p.selected[1]]?'Megvan a pár!':'Ez a két jel eltér. Jegyezd meg a helyüket.'}</p><button className="primary" onClick={g.nextPair}>Következő pár</button></div>}
  {!memory&&!done&&<p className="muted" role="status">{p.selected.length?'Most válassz egy szomszédos darabot.':'Válassz két szomszédos darabot. Csak a sikeres csere használ lépést.'}</p>}
  <details className="puzzle-help"><summary>Szabályok, jutalom és mentés</summary>
  <p className="muted">Teljesítsd a műszakot: 8 000–20 000 Ft és 3–6 programpont. A jutalom átvétele után {after} következik. Az első lépéstől minden lépés mentődik; később folytathatod.</p>
  <p>{memory?'Egy pár felfordítása egy lépés. Nincs időkorlát: a két lapot a Következő pár gombig nézheted.':'Koppints egy darabra, majd a szomszédjára. Legalább három azonos jel kell vízszintesen vagy függőlegesen. A sikertelen csere ingyenes. A lehulló darabok újabb egyezései 2×, majd 3× pontot érnek. Ha nincs lehetséges csere, a tábla automatikusan újrakeveredik.'}</p></details>
  {done?<section className="puzzle-result" aria-live="polite"><h2>Műszak kész</h2><p>{memory?`${p.score} iratpárt rendeztél.`:`${p.score} pontot gyűjtöttél.`} Jutalmad: <strong>{formatFt(reward.money)} és {reward.points} programpont.</strong></p><p>A telefon különleges alkalmai 4 vagy 6 programpontba kerülnek. A pénzből ajándékot és programot választhatsz.</p><button className="primary" onClick={g.finishJob}>Jutalom átvétele · {after}</button></section>:!started?<button onClick={g.cancelJob}>Vissza · még nem kezdtem el</button>:<p className="muted">A műszak folyamatban van. A címoldalra visszalépve vagy az ablakot bezárva később ugyaninnen folytathatod.</p>}
 </main>;
}
