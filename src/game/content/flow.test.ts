import assert from 'node:assert/strict';
import {test} from 'node:test';
import {enterMandatoryScene} from './flow.ts';
import {SCENES} from './catalog.ts';
import {createInitial,applyChoice,currentLine,nextWeek} from './runtime.ts';
test('mandatory arrival is automatic, free and idempotent on start and resume',()=>{
 const start={...createInitial('Miki'),money:0,energy:0};
 const next=enterMandatoryScene(start);
 assert.equal(next.phase,'scene');assert.equal(next.scene?.id,'shared_1');
 assert.equal(next.money,0);assert.equal(next.energy,0);assert.equal(next.slot,0);
 assert.deepEqual(next.completed,{});assert.equal(enterMandatoryScene(next),next);
 assert.equal(start.phase,'planner');
});
test('next week enters its required scene; discretionary slots remain player controlled',()=>{
 let state=enterMandatoryScene(createInitial('Miki'));
 while(state.phase==='scene'){
  const line=currentLine(state,SCENES)!;
  state=applyChoice(state,line.choices?.[0]?.id??'continue',SCENES);
 }
 assert.equal(state.slot,1);assert.equal(enterMandatoryScene(state),state);
 const summary={...state,phase:'summary' as const,slot:3 as const};
 const arrival=enterMandatoryScene(nextWeek(summary,SCENES));
 assert.equal(arrival.week,2);assert.equal(arrival.scene?.id,'shared_2');assert.equal(arrival.slot,0);
});
test('unmet prerequisites are not bypassed and active choices are preserved',()=>{
 const state={...createInitial('Miki'),week:16};
 assert.equal(enterMandatoryScene(state),state);
 const active=enterMandatoryScene(createInitial('Miki'));
 assert.equal(enterMandatoryScene({...active,scene:{...active.scene!,pending:[{decisions:['sample']}]}}).scene?.pending.length,1);
});
