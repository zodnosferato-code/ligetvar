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

import {formatFt} from './format.ts';
import {LOCATIONS} from './assets.ts';
import {ROUTES} from './rules.ts';
import {createInitial,openScene} from './runtime.ts';
import {SCENES} from './catalog.ts';
import {gameView} from './view.ts';
test('location and route catalogs cover stable IDs and preserve Hungarian labels',()=>{
 for(const [id,label] of Object.entries(LOCATIONS))assert.equal(translate(`location.${id as keyof typeof LOCATIONS}`),label);
 for(const [id,label] of Object.entries(ROUTES))assert.equal(translate(`route.${id as keyof typeof ROUTES}`),label);
 assert.equal(translate('location.library',{},'en'),'Library');
 assert.equal(translate('route.friendship',{},'en'),'Friendship');
 assert.equal(formatFt(12345),formatFt(12345,'hu'));
 assert.equal(formatFt(12345,'en'),'12,345 HUF');
});
test('switching scene observations translates metadata without changing choices or state',()=>{
 const state=openScene(createInitial('Reader'),'shared_1',SCENES),before=JSON.stringify(state);
 const hu=gameView(state,'hu'),en=gameView(state,'en');
 assert.ok(en.scene);assert.notEqual(en.scene.location,hu.scene!.location);
 assert.equal(en.scene.speaker,'Narration');
 assert.deepEqual(en.actions.map(x=>x.action),hu.actions.map(x=>x.action));
 assert.notEqual(en.scene.text,hu.scene!.text);
 assert.equal(en.scene.title,'The First Workshop');
 assert.equal(JSON.stringify(state),before);
 assert.deepEqual(gameView(state,'hu'),hu);
});
