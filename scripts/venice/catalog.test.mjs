import assert from 'node:assert/strict';
import {test} from 'node:test';
import {existsSync} from 'node:fs';
import {ASSETS,PILOT,orderedAssets} from './catalog.mjs';
import {SCENES} from '../../src/game/content/catalog.ts';
test('every displayed character and location has a production candidate',()=>{
 for(const scene of Object.values(SCENES)){
  assert.ok(ASSETS.some(a=>a.kind==='background'&&a.id===scene.background),scene.id);
  for(const line of scene.lines){
   if(['marton','narrator'].includes(line.speaker))continue;
   const supported=ASSETS.filter(a=>a.kind==='portrait'&&a.actor===line.speaker);
   assert.ok(supported.some(a=>a.expression==='neutral'),line.speaker);
   if(['rebeka','boglarka','greta'].includes(line.speaker))assert.ok(supported.some(a=>a.expression===line.expression),line.speaker+'/'+line.expression);
  }
 }
});
test('generation graph is ordered, inputs exist, and pilot is bounded',()=>{
 assert.equal(new Set(ASSETS.map(a=>a.id)).size,ASSETS.length);assert.equal(new Set(ASSETS.map(a=>a.file)).size,ASSETS.length);
 const ordered=orderedAssets(ASSETS.map(a=>a.id)),seen=new Set();
 for(const asset of ordered){for(const ref of asset.refs)if(ref.startsWith('repo:'))assert.ok(existsSync(ref.slice(5)),ref);else assert.ok(seen.has(ref),ref);seen.add(asset.id);}
 assert.deepEqual(orderedAssets(PILOT).map(a=>a.id),PILOT);
 assert.throws(()=>orderedAssets(['unknown']),/Unknown asset/);
});
