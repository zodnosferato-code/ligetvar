import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawn,spawnSync} from 'node:child_process';
import {mkdtempSync,readFileSync,existsSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {once} from 'node:events';
import {createInterface} from 'node:readline';
import {LockedSave} from './files.ts';
import {decodeSave} from '../content/saves.ts';
import {SCENES} from '../content/catalog.ts';
const cli='src/game/cli/main.ts';
function run(save:string,commands:unknown[],extra:string[]=[]){return spawnSync(process.execPath,['--experimental-strip-types',cli,'--json','--save',save,...extra],{input:commands.map(c=>typeof c==='string'?c:JSON.stringify(c)).join('\n')+'\n',encoding:'utf8',timeout:20000,maxBuffer:10_000_000});}
test('actual CLI JSON process, malformed input, EOF resume, limits and exclusive saves',()=>{
 const dir=mkdtempSync(join(tmpdir(),'ligetvar-cli-')),save=join(dir,'save.json');
 try{
  const result=run(save,[{cmd:'new',name:'Agent',expectedRevision:0},'{bad json',{cmd:'act',expectedRevision:1,action:{type:'scene',id:'shared_1'}},{cmd:'act',expectedRevision:1,action:{type:'choice',id:'continue'}}]);
  assert.equal(result.status,0,result.stderr);const rows=result.stdout.trim().split('\n').map(s=>JSON.parse(s));assert.equal(rows.length,5);assert.equal(rows[2].error.code,'BAD_INPUT');assert.equal(rows[4].error.code,'STALE_REVISION');assert.equal(rows[3].view.scene.id,'shared_1');assert.equal(existsSync(save+'.lock'),false);
  assert.equal(decodeSave(readFileSync(save,'utf8'),SCENES).status,'ok');
  const second=run(save,[{cmd:'look'}]);const restored=JSON.parse(second.stdout.split('\n')[0]);assert.deepEqual(restored.view,rows[3].view);
  const lock=new LockedSave(save);try{const blocked=run(save,[]);assert.equal(blocked.status,2);assert.match(blocked.stderr,/EEXIST/);}finally{lock.close();}
  const bytes=readFileSync(save,'utf8');const limited=run(save,[{cmd:'look'},{cmd:'look'}],['--max-commands','1']);assert.equal(limited.status,3);assert.equal(readFileSync(save,'utf8'),bytes);
  writeFileSync(save,'{"version":3}');const old=run(save,[{cmd:'look'}]);assert.equal(JSON.parse(old.stdout.split('\n')[0]).error.code,'SAVE_UNSUPPORTED');assert.equal(readFileSync(save,'utf8'),'{"version":3}');
 }finally{rmSync(dir,{recursive:true,force:true});}
});
test('text mode can start and play using numbered options without a browser',()=>{
 const dir=mkdtempSync(join(tmpdir(),'ligetvar-text-'));
 try{const result=spawnSync(process.execPath,['--experimental-strip-types',cli,'--save',join(dir,'save.json')],{input:'new Miki\n1\n1\nquit\n',encoding:'utf8',timeout:20000});assert.equal(result.status,0,result.stderr);assert.match(result.stdout,/shared_1/);assert.match(result.stdout,/background/);}finally{rmSync(dir,{recursive:true,force:true});}
});
for(const route of ['friendship','rebeka','boglarka','greta','triad','withdraw'])test('external agent example plays full route: '+route,()=>{
 const dir=mkdtempSync(join(tmpdir(),'ligetvar-route-'));
 try{const result=spawnSync(process.execPath,['tools/cli-playthrough.mjs','--route',route,'--save',join(dir,'save.json')],{encoding:'utf8',timeout:30000,maxBuffer:1_000_000});assert.equal(result.status,0,result.stderr);const report=JSON.parse(result.stdout);assert.equal(report.phase,'ending');assert.equal(report.ending,route==='withdraw'?'estranged':route);assert.ok(report.playedLines>100);}finally{rmSync(dir,{recursive:true,force:true});}
});

test('SIGINT leaves the last committed save readable and releases ownership',async()=>{
 const dir=mkdtempSync(join(tmpdir(),'ligetvar-signal-')),save=join(dir,'save.json');
 const child=spawn(process.execPath,['--experimental-strip-types',cli,'--json','--save',save],{stdio:['pipe','pipe','pipe']});
 const reader=createInterface({input:child.stdout}),lines=reader[Symbol.asyncIterator]();
 try{
  await lines.next();child.stdin.write(JSON.stringify({cmd:'new',name:'Interrupt',expectedRevision:0})+'\n');
  const row=await lines.next();assert.equal(JSON.parse(row.value!).ok,true);const exited=once(child,'exit');child.kill('SIGINT');const [code]=await exited;
  assert.equal(code,130);assert.equal(existsSync(save+'.lock'),false);assert.equal(decodeSave(readFileSync(save,'utf8'),SCENES).status,'ok');
 }finally{reader.close();child.kill();rmSync(dir,{recursive:true,force:true});}
});

test('actual CLI supports startup and live locales in JSON and text modes',()=>{
 const dir=mkdtempSync(join(tmpdir(),'ligetvar-locale-'));
 try{
  const save=join(dir,'save.json');
  const result=run(save,[{cmd:'new',expectedRevision:0},{cmd:'act',expectedRevision:1,action:{type:'scene',id:'shared_1'}},{cmd:'locale',locale:'hu'},{cmd:'locale',locale:'en'},{cmd:'locale',locale:'bad'},{cmd:'quit'}],['--locale','en']);
  assert.equal(result.status,0,result.stderr);
  const rows=result.stdout.trim().split('\n').map(s=>JSON.parse(s));
  assert.equal(rows[0].locale,'en');assert.equal(rows[3].locale,'hu');assert.equal(rows[4].locale,'en');
  assert.equal(rows[3].revision,rows[4].revision);
  assert.equal(rows[5].ok,false);assert.equal(rows[5].locale,'en');
  assert.deepEqual(rows[3].view.actions.map((a:any)=>a.action),rows[4].view.actions.map((a:any)=>a.action));
  const bytes=readFileSync(save,'utf8');
  const text=spawnSync(process.execPath,['--experimental-strip-types',cli,'--save',save],{input:'locale en\nlocale hu\nquit\n',encoding:'utf8',timeout:20000});
  assert.equal(text.status,0,text.stderr);assert.match(text.stdout,/Continue/);assert.match(text.stdout,/Tovább/);assert.equal(readFileSync(save,'utf8'),bytes);
  const invalid=run(join(dir,'invalid.json'),[],['--locale','de']);assert.equal(invalid.status,2);assert.equal(existsSync(join(dir,'invalid.json')),false);
 }finally{rmSync(dir,{recursive:true,force:true});}
});

for(const choice of ['join','leave'])test('public CLI completes both holidays and the year with '+choice,()=>{
 const dir=mkdtempSync(join(tmpdir(),'ligetvar-holidays-'));
 try{
  const result=spawnSync(process.execPath,['tools/cli-playthrough.mjs','--route','friendship','--holidays','--holiday-choice',choice,'--locale',choice==='join'?'en':'hu','--save',join(dir,'save.json')],{encoding:'utf8',timeout:30000,maxBuffer:1_000_000});
  assert.equal(result.status,0,result.stderr);const report=JSON.parse(result.stdout);
  assert.equal(report.week,52);assert.equal(report.ending,'friendship');assert.deepEqual(report.holidayScenes,['holiday_halloween','holiday_christmas']);
 }finally{rmSync(dir,{recursive:true,force:true});}
});
