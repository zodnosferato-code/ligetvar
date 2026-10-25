import {test} from 'node:test';
import assert from 'node:assert/strict';
import {decodeSave as decodeWithRules} from '../engine/save.ts';
import {RULES} from './rules.ts';
import {SCENES} from './catalog.ts';
import {createInitial} from './runtime.ts';
import {SAVE_KEY} from './types.ts';
import {decodeSave,encodeSave,persist,readSave,saveMessage} from './saves.ts';
import {RELEASE,GAME_VERSION} from '../release.ts';
const state=createInitial('Version test');
const envelope=()=>JSON.parse(encodeSave(state));
function storage(entries:Record<string,string>={}){
 const data=new Map(Object.entries(entries));return {data,getItem:(key:string)=>data.get(key)??null,setItem:(key:string,value:string)=>{data.set(key,value);}};
}
test('release metadata is written once outside state; matching epochs permit other releases',()=>{
 const raw=envelope();assert.equal(raw.gameVersion,GAME_VERSION);assert.equal('version' in raw.state,false);
 for(const gameVersion of ['0.1.0','0.2.1','9.0.0']){
  const result=decodeSave(JSON.stringify({...raw,gameVersion,buildId:'other-build'}),SCENES);
  assert.equal(result.status,'ok');if(result.status==='ok'){assert.deepEqual(result.state,state);assert.equal(result.metadata.gameVersion,gameVersion);}
 }
});
test('schema/content breaks and newer epochs report metadata before interpreting state',()=>{
 for(const [field,value,reason] of [['saveSchemaVersion',RELEASE.saveSchemaVersion-1,'schema'],['contentCompatibilityVersion',RELEASE.contentCompatibilityVersion+1,'newer'],['saveSchemaVersion',RELEASE.saveSchemaVersion+1,'newer']] as const){
  const result=decodeSave(JSON.stringify({...envelope(),[field]:value,state:'not interpreted'}),SCENES);
  assert.equal(result.status,'unsupported');if(result.status==='unsupported'){assert.equal(result.reason,reason);assert.equal(result.current.gameVersion,GAME_VERSION);assert.ok(saveMessage(result).includes(GAME_VERSION));}
 }
});
test('unsupported raw saves are detected without migration and missing/corrupt differ',()=>{
 assert.equal(decodeSave(null,SCENES).status,'missing');
 for(const raw of ['', '{','null','{}',JSON.stringify({...envelope(),gameVersion:7}),JSON.stringify({...envelope(),saveSchemaVersion:0}),JSON.stringify({...envelope(),state:null})])assert.equal(decodeSave(raw,SCENES).status,'invalid');
 for(const version of [1,2,3]){const result=decodeSave(JSON.stringify({version}),SCENES);assert.equal(result.status,'unsupported');if(result.status==='unsupported'){assert.equal(result.reason,'pre_envelope');assert.equal(result.saved.gameVersion,undefined);assert.match(saveMessage(result),/már nem használható/);}}
});
test('stable current key wins; corrupt/incompatible current saves never fall back',()=>{
 const retired={'ligetvar-save-v1':'{"version":1}','ligetvar-save-v2':'{"version":2}','ligetvar-save-v3':'{"version":3}'};
 const s=storage(retired),before=[...s.data];const old=readSave(s,SCENES);
 assert.equal(old.status,'unsupported');if(old.status==='unsupported')assert.equal(old.saved.legacyVersion,3);assert.deepEqual([...s.data],before);
 assert.equal(persist(s,state),true);assert.equal(readSave(s,SCENES).status,'ok');for(const [key,value] of before)assert.equal(s.data.get(key),value);
 for(const raw of ['', '{',JSON.stringify({...envelope(),saveSchemaVersion:99})]){s.data.set(SAVE_KEY,raw);const unchanged=[...s.data];assert.notEqual(readSave(s,SCENES).status,'ok');assert.deepEqual([...s.data],unchanged);}
});
test('historical keys are detection-only even if they contain an envelope; storage errors are distinct',()=>{
 assert.equal(readSave(storage({'ligetvar-save-v3':encodeSave(state)}),SCENES).status,'unsupported');
 assert.equal(readSave(storage(),SCENES).status,'missing');
 const inaccessible={getItem:()=>{throw new Error('denied');},setItem:()=>{throw new Error('denied');}};
 assert.equal(readSave(inaccessible,SCENES).status,'unavailable');assert.equal(persist(inaccessible,state),false);
});

test('content-only break is distinguished from a schema break',()=>{
 const result=decodeWithRules(encodeSave(state),SCENES,{...RULES,saveVersions:{...RELEASE,contentCompatibilityVersion:RELEASE.contentCompatibilityVersion+1}});
 assert.equal(result.status,'unsupported');if(result.status==='unsupported')assert.equal(result.reason,'content');
});

test('pre-staging content saves are rejected without interpreting or overwriting them',()=>{
 const raw=JSON.stringify({...envelope(),gameVersion:'0.3.0',contentCompatibilityVersion:1});
 const saved=storage({[SAVE_KEY]:raw});
 const result=readSave(saved,SCENES);assert.equal(result.status,'unsupported');
 if(result.status==='unsupported'){assert.equal(result.reason,'content');assert.match(saveMessage(result),/már nem használható/);}
 assert.equal(saved.data.get(SAVE_KEY),raw);
});
