/** Untimed, deterministic puzzles. Every meaningful move is stored with the campaign. */
export type PuzzleKind='mohu'|'brick';
export interface PuzzleState {kind:PuzzleKind;board:number[];seed:number;moves:number;score:number;selected:number[];matched:number[]}
export const MOVE_LIMIT={mohu:12,brick:18};
function random(seed:number){return (Math.imul(seed,1664525)+1013904223)>>>0;}
export function newPuzzle(kind:PuzzleKind,week:number):PuzzleState{
 let seed=week*7919+(kind==='mohu'?71:197),board:number[]=[];
 if(kind==='mohu')for(let i=0;i<25;i++){seed=random(seed);board.push((seed>>>16)%4);}
 else {board=Array.from({length:16},(_,i)=>i%8);for(let i=15;i>0;i--){seed=random(seed);const j=(seed>>>16)%(i+1);[board[i],board[j]]=[board[j],board[i]];}}
 return {kind,board,seed,moves:0,score:0,selected:[],matched:[]};
}
export function cluster(board:number[],start:number){
 if(!Number.isInteger(start)||start<0||start>=25)return [];
 const found=new Set<number>(),pending=[start];
 while(pending.length){const i=pending.pop()!;if(found.has(i)||board[i]!==board[start])continue;found.add(i);const x=i%5,y=Math.floor(i/5);if(x>0)pending.push(i-1);if(x<4)pending.push(i+1);if(y>0)pending.push(i-5);if(y<4)pending.push(i+5);}
 return [...found];
}
export const puzzleDone=(p:PuzzleState)=>p.moves>=MOVE_LIMIT[p.kind]||(p.kind==='brick'?p.matched.length===16:!p.board.some((_,i)=>cluster(p.board,i).length>=2));
export function puzzleReward(p:PuzzleState){const quality=Math.min(1,p.score/(p.kind==='mohu'?180:8));return {money:8000+Math.round(12000*quality/100)*100,points:3+Math.floor(3*quality)};}
export function puzzleMove(p:PuzzleState,index:number):PuzzleState{
 if(puzzleDone(p)||!Number.isInteger(index)||index<0||index>=p.board.length)return p;
 if(p.kind==='brick'){
  if(p.selected.length===2||p.selected.includes(index)||p.matched.includes(index))return p;
  const selected=[...p.selected,index];if(selected.length===1)return {...p,selected};
  const match=p.board[selected[0]]===p.board[index];
  return {...p,selected,moves:p.moves+1,score:p.score+(match?1:0),matched:match?[...p.matched,...selected]:p.matched};
 }
 const group=cluster(p.board,index);if(group.length<2)return p;
 const removed=new Set(group),board=[...p.board];let seed=p.seed;
 for(let x=0;x<5;x++){
  const column=Array.from({length:5},(_,y)=>y*5+x).filter(i=>!removed.has(i)).map(i=>p.board[i]);
  while(column.length<5){seed=random(seed);column.unshift((seed>>>16)%4);}
  column.forEach((value,y)=>board[y*5+x]=value);
 }
 return {...p,board,seed,moves:p.moves+1,score:p.score+group.length*(group.length-1),selected:[]};
}
export const closePair=(p:PuzzleState)=>p.kind==='brick'&&p.selected.length===2?{...p,selected:[]}:p;
export function validPuzzle(p:unknown):p is PuzzleState{
 if(!p||typeof p!=='object')return false;const x=p as PuzzleState;
 return ['mohu','brick'].includes(x.kind)&&Array.isArray(x.board)&&x.board.length===(x.kind==='mohu'?25:16)&&x.board.every(v=>Number.isInteger(v)&&v>=0&&v<(x.kind==='mohu'?4:8))
 &&Number.isInteger(x.seed)&&x.seed>=0&&x.seed<=0xffffffff&&Number.isInteger(x.moves)&&x.moves>=0&&x.moves<=MOVE_LIMIT[x.kind]&&Number.isInteger(x.score)&&x.score>=0&&x.score<=(x.kind==='mohu'?7200:8)
 &&[x.selected,x.matched].every(a=>Array.isArray(a)&&new Set(a).size===a.length&&a.every(i=>Number.isInteger(i)&&i>=0&&i<x.board.length))&&x.selected.length<=2&&x.matched.length%2===0
 &&(x.kind==='mohu'?x.selected.length===0&&x.matched.length===0:x.score===x.matched.length/2&&x.moves>=x.score&&x.matched.every((i,j)=>x.board[i]===x.board[x.matched[j^1]])&&(x.selected.length!==2||x.moves>0)&&(x.selected.length!==1||!x.matched.includes(x.selected[0]))&&Array.from({length:8},(_,v)=>x.board.filter(n=>n===v).length===2).every(Boolean));
}
