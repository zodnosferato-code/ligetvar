import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SCENES} from './catalog.ts';
import {activity,applyChoice,availableScenes,buyGift,createInitial,currentLine,finishPuzzle,giveGift,movePuzzle,nextPair,nextWeek,openScene} from './runtime.ts';
import {legalSwap,matches,cluster,newPuzzle,puzzleDone,puzzleMove,puzzleReward,validPuzzle} from './puzzles.ts';
import {decodeSave} from './saves.ts';
import {GIRLS,type GameState} from './types.ts';
function complete(s:GameState,id:string){s=openScene(s,id,SCENES);assert.equal(s.scene?.id,id);let limit=100;while(s.phase==='scene'&&limit--){const l=currentLine(s,SCENES)!;s=applyChoice(s,l.choices?.[0].id??'continue',SCENES);}assert.ok(limit>0);return s;}
function restWeek(s:GameState){while(s.phase==='planner')s=activity(s,'rest');return nextWeek(s,SCENES);}
function solvedJob(s:GameState){s=activity(s,'brick');for(let v=0;v<8;v++){const indices=s.puzzle!.board.flatMap((x,i)=>x===v?[i]:[]);s=movePuzzle(s,indices[0]);s=movePuzzle(s,indices[1]);if(v<7)s=nextPair(s);}return s;}
test('both puzzles have finite move budgets, deterministic boards and bounded meaningful rewards',()=>{
 for(let week=1;week<=16;week++)for(const kind of ['mohu','brick'] as const){
  let p=newPuzzle(kind,week);assert.deepEqual(p,newPuzzle(kind,week));assert.ok(validPuzzle(p));let turns=0;
  while(!puzzleDone(p)&&kind==='mohu'){
   const [a,b]=legalSwap(p.board);p=puzzleMove(puzzleMove(p,a),b);assert.equal(matches(p.board).length,0);assert.ok(validPuzzle(p));assert.ok(++turns<=12);
  }
  const reward=puzzleReward(p);assert.ok(reward.money>=8000&&reward.money<=20000);assert.ok(reward.points>=3&&reward.points<=6);
 }
});
test('bottle groups cannot wrap rows, invalid taps are free and larger groups are worth more',()=>{
 const board=Array.from({length:25},(_,i)=>i%4);board[4]=3;board[5]=3;board[3]=0;board[9]=0;board[0]=0;board[6]=0;board[10]=0;
 assert.deepEqual(cluster(board,4),[4]);const p={...newPuzzle('mohu',1),mode:undefined,board};assert.equal(puzzleMove(p,4),p);assert.equal(puzzleMove(p,-1),p);
 const all={...p,board:Array(25).fill(0)},n=puzzleMove(all,12);assert.equal(n.score,600);assert.equal(n.moves,1);assert.equal(n.board.length,25);assert.deepEqual(puzzleReward(n),{money:20000,points:6});
});
test('memory pairs stay visible until acknowledged; double taps and third-card peeks do not consume turns',()=>{
 const s=activity(complete(createInitial(''),'shared_1'),'brick'),p=s.puzzle!;
 const same=p.board.findIndex((v,i)=>i!==0&&v===p.board[0]);let n=movePuzzle(s,0);assert.equal(movePuzzle(n,0),n);n=movePuzzle(n,same);
 assert.equal(n.puzzle!.moves,1);assert.equal(n.puzzle!.score,1);assert.equal(movePuzzle(n,2),n);
 n=nextPair(n);assert.equal(n.puzzle!.selected.length,0);assert.equal(movePuzzle(n,0),n);
});
test('reward claims require completion and pay once, using exactly one daytime slot',()=>{
 const start=complete(createInitial(''),'shared_1'),active=activity(start,'brick');assert.equal(finishPuzzle(active),active);
 const solved=solvedJob(start),paid=finishPuzzle(solved);assert.equal(paid.money,start.money+20000);assert.equal(paid.activityPoints,6);assert.equal(paid.energy,start.energy-12);assert.equal(paid.slot,2);assert.equal(paid.puzzle,null);assert.equal(finishPuzzle(paid),paid);assert.equal(activity(paid,'brick'),paid);
 assert.equal(decodeSave(JSON.stringify(paid),SCENES).status,'ok');
});
test('puzzle state survives every move and a half-revealed pair survives reload',()=>{
 let s=activity(complete(createInitial(''),'shared_1'),'brick');
 for(let v=0;v<8;v++){
  const pair=s.puzzle!.board.flatMap((x,i)=>x===v?[i]:[]);
  for(const i of pair){s=movePuzzle(s,i);const decoded=decodeSave(JSON.stringify(s),SCENES);assert.equal(decoded.status,'ok');if(decoded.status==='ok')assert.deepEqual(decoded.state,s);}
  if(v<7)s=nextPair(s);
 }
 assert.ok(puzzleDone(s.puzzle!));
});
test('all six optional outings are affordable with jobs, charge once and record actual favours',()=>{
 for(const girl of GIRLS){
  let s=complete(createInitial(''),'shared_1');s=finishPuzzle(solvedJob(s));
  if(girl==='rebeka')s=complete(s,girl+'_1');else s=activity(s,'rest');
  s=nextWeek(s,SCENES);s=complete(s,'shared_2');if(girl!=='rebeka')s=complete(s,girl+'_1');
  const id='outing_'+girl+'_1',original=s;
  assert.equal(openScene({...s,activityPoints:3},id,SCENES).phase,'planner');assert.equal(openScene({...s,money:0},id,SCENES).phase,'planner');
  s=openScene(s,id,SCENES);assert.equal(s.money,original.money-4000);assert.equal(s.activityPoints,2);assert.equal(openScene(s,id,SCENES),s);
  while(s.phase==='scene'){
   const restored=decodeSave(JSON.stringify(s),SCENES);assert.equal(restored.status,'ok');const line=currentLine(s,SCENES)!;s=applyChoice(s,line.choices?.[0].id??'continue',SCENES);
  }
  assert.equal(s.activityPoints,2);assert.equal(s.slot,original.slot+1);assert.equal(openScene(s,id,SCENES),s);
  s=restWeek(s);s=complete(s,'shared_3');s=finishPuzzle(solvedJob(s));s=complete(s,'outing_'+girl+'_2');
  assert.ok(s.decisions['keepsake_'+girl]);assert.equal(s.activityPoints,2);assert.equal(s.decisions[girl+'_commit'],undefined);assert.equal(decodeSave(JSON.stringify(s),SCENES).status,'ok');
 }
});
test('optional outings are visible only with their witnessed prerequisites and sufficient funds',()=>{
 let s=complete(createInitial(''),'shared_1');s.activityPoints=50;s=restWeek(s);s=complete(s,'shared_2');assert.ok(!availableScenes(s,SCENES).some(x=>x.cost));
 s=complete(s,'rebeka_1');assert.ok(availableScenes(s,SCENES).some(x=>x.id==='outing_rebeka_1'));assert.ok(!availableScenes(s,SCENES).some(x=>x.id==='outing_rebeka_2'));
});
test('personal delivery keeps distinct visible replies, consumes one gift and enforces weekly and repeat limits',()=>{
 let s=complete(createInitial(''),'shared_1');s.money=100000;
 for(const [girl,gift] of [['rebeka','photo'],['boglarka','tea'],['greta','notes']] as const){
  s=buyGift(s,gift);const before=s;s=giveGift(s,girl,gift,'thanks','remote');assert.equal(s.slot,before.slot);assert.equal(s.inventory[gift],0);assert.equal(s.bonds[`marton_${girl}`],2);assert.equal(s.giftHistory!.at(-1)!.read,false);assert.equal(giveGift(s,girl,gift),s);
 }
 assert.equal(new Set(s.giftHistory!.map(h=>h.reaction)).size,3);assert.deepEqual(s.decisions,{});assert.equal(decodeSave(JSON.stringify(s),SCENES).status,'ok');
 s=restWeek(s);s=complete(s,'shared_2');s=buyGift(s,'photo');s=giveGift(s,'rebeka','photo');assert.equal(s.bonds.marton_rebeka,2);assert.equal(s.giftHistory!.at(-1)!.bonus,0);
 s=buyGift(s,'thermos');s=giveGift(s,'boglarka','thermos');assert.equal(s.bonds.marton_boglarka,2);assert.match(s.giftHistory!.at(-1)!.reaction,/ritkábban/);
});
test('invalid recipients, delivery modes and gifts cannot spend inventory; shared-slot shopping is blocked',()=>{
 let s=createInitial('');assert.equal(buyGift(s,'photo'),s);s=complete(s,'shared_1');s=buyGift(s,'photo');assert.equal(buyGift(s,'__proto__'),s);
 assert.equal(giveGift(s,'soma' as never,'photo'),s);assert.equal(giveGift(s,'rebeka','photo','invented' as never),s);assert.equal(giveGift(s,'rebeka','missing'),s);
});
test('old v2 saves keep balances; malformed added fields are rejected',()=>{
 const s=complete(createInitial(''),'shared_1');s.money=105000;delete s.activityPoints;delete s.puzzle;delete s.giftHistory;
 const decoded=decodeSave(JSON.stringify(s),SCENES);assert.equal(decoded.status,'ok');if(decoded.status==='ok'){assert.equal(decoded.state.money,105000);assert.deepEqual(decoded.state.completed,s.completed);}
 for(const activityPoints of [-1,1.5,'9'])assert.equal(decodeSave(JSON.stringify({...s,activityPoints}),SCENES).status,'invalid');
 assert.equal(decodeSave(JSON.stringify({...s,puzzle:{kind:'brick'}}),SCENES).status,'invalid');assert.equal(decodeSave(JSON.stringify({...s,giftHistory:[{girl:'soma'}]}),SCENES).status,'invalid');
});

test('recycling swaps save selection, reject row wrapping and resolve cascades deterministically',()=>{
 const p=newPuzzle('mohu',1),[a,b]=legalSwap(p.board),selected=puzzleMove(p,a);
 assert.ok(validPuzzle(selected));assert.equal(selected.moves,0);
 const n=puzzleMove(selected,b);assert.equal(n.moves,1);assert.ok(n.score>=30);assert.deepEqual(n,puzzleMove(selected,b));assert.equal(matches(n.board).length,0);assert.ok(legalSwap(n.board).length);
 const wrap=puzzleMove(puzzleMove(p,4),5);assert.equal(wrap.moves,0);assert.deepEqual(wrap.board,p.board);assert.deepEqual(wrap.selected,[5]);
 const same=puzzleMove(selected,a);assert.equal(same.moves,0);assert.deepEqual(same.selected,[]);
 let s=activity(complete(createInitial(''),'shared_1'),'mohu');s=movePuzzle(s,a);const decoded=decodeSave(JSON.stringify(s),SCENES);assert.equal(decoded.status,'ok');if(decoded.status==='ok')assert.deepEqual(decoded.state.puzzle,s.puzzle);
});
