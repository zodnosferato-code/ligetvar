import {test} from 'node:test';
import assert from 'node:assert/strict';
import {catalogs,placeholders,translate} from './localization.ts';
import {saveMessage} from './saves.ts';
test('English keys and placeholders exactly match the Hungarian source',()=>{
 assert.deepEqual(Object.keys(catalogs.en).sort(),Object.keys(catalogs.hu).sort());
 for(const key of Object.keys(catalogs.hu) as (keyof typeof catalogs.hu)[]){
  assert.deepEqual(placeholders(catalogs.en[key]),placeholders(catalogs.hu[key]),key);
  assert.ok(catalogs.en[key].trim(),key);
 }
});
test('interpolation preserves user values literally and rejects missing values',()=>{
 assert.equal(translate('save.format',{format:'$&{current}'}),' (formátum: $&{current})');
 assert.throws(()=>translate('save.format'),/Missing translation parameter/);
});
test('save feedback defaults to Hungarian and can be rendered in English without mutation',()=>{
 const result={status:'unsupported',reason:'newer',saved:{gameVersion:'99.0',saveSchemaVersion:99},current:{gameVersion:'0.6.0',saveSchemaVersion:4,contentCompatibilityVersion:3}} as const;
 const before=JSON.stringify(result);
 assert.match(saveMessage(result),/Mentés: 99.0/);
 assert.match(saveMessage(result,'en'),/newer, unsupported/);
 assert.equal(JSON.stringify(result),before);
 for(const status of ['missing','invalid','unavailable'] as const){
  assert.notEqual(saveMessage({status},'en'),saveMessage({status}));
 }
 assert.equal(saveMessage({status:'missing'},'en'),'No save is available to continue.');
});
