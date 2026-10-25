/** Untimed, deterministic puzzles. Every meaningful move is stored with the campaign. */
export type PuzzleKind='recycling'|'archive';
export interface PuzzleState {kind:PuzzleKind;board:number[];seed:number;moves:number;score:number;selected:number[];matched:number[]}
export const MOVE_LIMIT={recycling:12,archive:18};
function random(seed:number){return (Math.imul(seed,1664525)+1013904223)>>>0;}
export function newPuzzle(kind:PuzzleKind,week:number):PuzzleState{
 let seed=week*7919+(kind==='recycling'?71:197),board:number[]=[];
 if(kind==='recycling'){const ready=playableBoard(seed);board=ready.board;seed=ready.seed;}
 else {board=Array.from({length:16},(_,i)=>i%8);for(let i=15;i>0;i--){seed=random(seed);const j=(seed>>>16)%(i+1);[board[i],board[j]]=[board[j],board[i]];}}
 return {kind,board,seed,moves:0,score:0,selected:[],matched:[]};
}
/** Straight runs only: crossing matches count each tile once. */
export function matches(board:number[]){
 const found=new Set<number>();
 for(let i=0;i<25;i++)for(const step of [1,5]){
  if(step===1&&i%5>2||step===5&&i>=15)continue;
  if(board[i]===board[i+step]&&board[i]===board[i+2*step])for(let n=0;n<3;n++)found.add(i+n*step);
 }
 return [...found];
}
const adjacent=(a:number,b:number)=>Math.abs(a-b)===5||Math.floor(a/5)===Math.floor(b/5)&&Math.abs(a-b)===1;
export function legalSwap(board:number[]):number[] {
 for(let a=0;a<25;a++)for(const b of [a+1,a+5]){
  if(b>=25||!adjacent(a,b)||board[a]===board[b])continue;
  const copy=[...board];[copy[a],copy[b]]=[copy[b],copy[a]];
  if(matches(copy).length)return [a,b];
 }
 return [];
}
function playableBoard(seed:number){
 // Build without pre-existing matches; retry dead boards deterministically.
 for(let attempt=0;attempt<100;attempt++){
  const board:number[]=[];
  for(let i=0;i<25;i++){
   seed=random(seed);let value=(seed>>>16)%4;
   while(i%5>=2&&board[i-1]===value&&board[i-2]===value||i>=10&&board[i-5]===value&&board[i-10]===value)value=(value+1)%4;
   board.push(value);
  }
  if(legalSwap(board).length)return {board,seed};
 }
 // Guaranteed legal pattern, with no existing runs.
 return {board:[0,1,0,2,3,1,0,2,3,0,2,3,1,0,1,3,0,2,1,2,0,1,3,2,3],seed};
}
function matchMove(p:PuzzleState,index:number):PuzzleState{
 if(p.selected.length===0)return {...p,selected:[index]};
 const first=p.selected[0];
 if(first===index)return {...p,selected:[]};
 if(!adjacent(first,index))return {...p,selected:[index]};
 let board=[...p.board],seed=p.seed,score=p.score;
 [board[first],board[index]]=[board[index],board[first]];
 let removed=matches(board);
 if(!removed.length)return {...p,selected:[]};
 // A bounded cascade prevents pathological refill sequences from hanging the UI.
 for(let chain=1;removed.length&&chain<=20;chain++){
  score+=removed.length*10*Math.min(chain,3);
  for(let x=0;x<5;x++){
   const column=Array.from({length:5},(_,y)=>y*5+x).filter(i=>!removed.includes(i)).map(i=>board[i]);
   while(column.length<5){seed=random(seed);column.unshift((seed>>>16)%4);}
   column.forEach((value,y)=>board[y*5+x]=value);
  }
  removed=matches(board);
 }
 if(removed.length||!legalSwap(board).length){const ready=playableBoard(seed);board=ready.board;seed=ready.seed;}
 return {...p,board,seed,score,moves:p.moves+1,selected:[]};
}
export const puzzleDone=(p:PuzzleState)=>p.moves>=MOVE_LIMIT[p.kind]||(p.kind==='archive'&&p.matched.length===16);
export function puzzleReward(p:PuzzleState){const quality=Math.min(1,p.score/(p.kind==='recycling'?1200:8));return {money:8000+Math.round(12000*quality/100)*100,points:3+Math.floor(3*quality)};}
export function puzzleMove(p:PuzzleState,index:number):PuzzleState{
 if(puzzleDone(p)||!Number.isInteger(index)||index<0||index>=p.board.length)return p;
 if(p.kind==='archive'){
  if(p.selected.length===2||p.selected.includes(index)||p.matched.includes(index))return p;
  const selected=[...p.selected,index];if(selected.length===1)return {...p,selected};
  const match=p.board[selected[0]]===p.board[index];
  return {...p,selected,moves:p.moves+1,score:p.score+(match?1:0),matched:match?[...p.matched,...selected]:p.matched};
 }
 return matchMove(p,index);
}
export const closePair=(p:PuzzleState)=>p.kind==='archive'&&p.selected.length===2?{...p,selected:[]}:p;
export function validPuzzle(p:unknown):p is PuzzleState{
 if(!p||typeof p!=='object')return false;const x=p as PuzzleState;
 return ['recycling','archive'].includes(x.kind)&&Array.isArray(x.board)&&x.board.length===(x.kind==='recycling'?25:16)&&x.board.every(v=>Number.isInteger(v)&&v>=0&&v<(x.kind==='recycling'?4:8))
 &&Number.isInteger(x.seed)&&x.seed>=0&&x.seed<=0xffffffff&&Number.isInteger(x.moves)&&x.moves>=0&&x.moves<=MOVE_LIMIT[x.kind]&&Number.isInteger(x.score)&&x.score>=0&&x.score<=(x.kind==='recycling'?180000:8)
 &&[x.selected,x.matched].every(a=>Array.isArray(a)&&new Set(a).size===a.length&&a.every(i=>Number.isInteger(i)&&i>=0&&i<x.board.length))&&x.selected.length<=2&&x.matched.length%2===0
 &&(x.kind==='recycling'?x.selected.length<=1&&x.matched.length===0:x.score===x.matched.length/2&&x.moves>=x.score&&x.matched.every((i,j)=>x.board[i]===x.board[x.matched[j^1]])&&(x.selected.length!==2||x.moves>0)&&(x.selected.length!==1||!x.matched.includes(x.selected[0]))&&Array.from({length:8},(_,v)=>x.board.filter(n=>n===v).length===2).every(Boolean));
}
