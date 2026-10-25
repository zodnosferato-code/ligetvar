// Development-browser verification: production scenes plus synthetic media (never production art).
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const fs=require('node:fs'),assert=require('node:assert/strict');
const fixtures={'gif': 'R0lGODlhIAAgAIEAAChkrAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQAKAAAACwAAAAAIAAgAAAINQABCBxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJUmRAACH5BAEoAAEALAAAAAAgACAAgXm31AAAAAAAAAAAAAg1AAEIHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMlSZEAAOw==', 'png': 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAALUlEQVR4nGPUSFnDQEvARFPTRy0YtWDUglELRi0YtWDUglELRi0YtWDUAioCAFUcAXjtYU6UAAAAAElFTkSuQmCC'};
let server,browser;const harness='verify-moment-check-temp';
(async()=>{
 const {createServer}=await import('vite');
 const R=await import('../src/game/content/runtime.ts'),{SCENES}=await import('../src/game/content/catalog.ts'),{viragScenes}=await import('../src/game/content/virag.ts'),{encodeSave}=await import('../src/game/content/saves.ts');
 const finish=s=>{for(let i=0;s.phase==='scene'&&i<80;i++){const l=R.currentLine(s,SCENES);s=R.applyChoice(s,l.choices?.[0].id??'continue',SCENES);}return s;};
 const starts={};let state=R.createInitial('Márton');for(let w=1;w<=14;w++){state=finish(R.openScene(state,'shared_'+w,SCENES));for(const x of viragScenes.filter(x=>x.week===w)){starts[x.id]=R.openScene(state,x.id,SCENES);state=finish(starts[x.id]);}while(state.phase==='planner')state=R.activity(state,'rest');state=R.nextWeek(state,SCENES);}
 fs.writeFileSync(harness+'.html',`<html lang="hu"><body><div id="root"></div><script type="module" src="/${harness}.tsx"></script></body></html>`);
 fs.writeFileSync(harness+'.tsx',`import React from 'react';import {createRoot} from 'react-dom/client';import {Moment} from './src/game/ui/Moment.tsx';import './src/game/ui/stage.css';createRoot(document.getElementById('root')!).render(<div style={{position:'relative',width:'100%',height:400}}><Moment clip={{status:'reviewed',file:'animations/test/loop.gif',poster:'animations/test/poster.png',description:'Synthetic two-colour animation fixture',width:32,height:32,durationMs:800,bytes:200}}/></div>);`);
 server=await createServer({server:{host:'127.0.0.1',port:0},plugins:[{name:'synthetic-moment-fixtures',configureServer(dev){dev.middlewares.use((req,res,next)=>{if(req.url.includes('/animations/test/')){const gif=req.url.endsWith('.gif');res.setHeader('Content-Type',gif?'image/gif':'image/png');res.end(Buffer.from(fixtures[gif?'gif':'png'],'base64'));}else next();});}}]});await server.listen();
 const url='http://127.0.0.1:'+server.httpServer.address().port+'/ligetvar/';
 for(const width of [320,390,1440]){
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage',...(process.env.CHROMIUM_SERVERLESS==='1'?['--single-process','--no-zygote','--use-gl=angle','--use-angle=swiftshader']:[])]});
  const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const x of viragScenes){await page.goto(url);await page.evaluate(raw=>localStorage.setItem('ligetvar-save',raw),encodeSave(starts[x.id]));await page.reload();await page.getByRole('button',{name:'Félév folytatása',exact:true}).click();
   if(x.id==='virag_4')await page.screenshot({path:'/tmp/virag-'+width+'.png',fullPage:true});
   let steps=0;while(await page.locator('.dialogue').count()){
    assert.ok(++steps<80);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,x.id+'/'+width);
    if(steps===2){await page.reload();await page.getByRole('button',{name:'Félév folytatása',exact:true}).click();}
    await page.locator('.choices button').first().click();
   }
   const done=await page.evaluate(()=>JSON.parse(localStorage.getItem('ligetvar-save')).state);assert.ok(done.completed[x.id]);assert.equal(done.slot,starts[x.id].slot+1);
  }
  await page.goto(url+harness+'.html');await page.locator('.moment-clip img').evaluate(i=>i.decode());assert.match(await page.locator('img').getAttribute('src'),/loop.gif$/);
  await page.getByRole('button',{name:'Animáció megállítása',exact:true}).click();assert.match(await page.locator('img').getAttribute('src'),/poster.png$/);
  await page.getByRole('button',{name:'Animáció indítása',exact:true}).click();assert.match(await page.locator('img').getAttribute('src'),/loop.gif$/);
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('.moment-clip img').src.endsWith('poster.png'));assert.equal(await page.locator('.moment-clip button').count(),0);
  let animations=0;page.on('request',r=>{if(r.url().endsWith('loop.gif'))animations++;});await page.reload();await page.locator('.moment-clip img').evaluate(i=>i.decode());assert.equal(animations,0);
  await page.emulateMedia({reducedMotion:'no-preference'});await page.route('**/animations/test/loop.gif',r=>r.abort());await page.reload();await page.waitForFunction(()=>document.querySelector('.moment-clip img')?.src.endsWith('poster.png'));await page.locator('img').evaluate(i=>i.decode());
  await page.route('**/animations/test/poster.png',r=>r.abort());await page.reload();await page.getByRole('status').waitFor();
  assert.deepEqual(errors,[]);await page.close();await browser.close();browser=null;
 }
 console.log('Virág: eight scenes, reload, one-slot completion and responsive layout; GIF playback/poster/pause/reduced-motion/failure checks passed at 320/390/1440px. Synthetic media only.');
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();if(server)await server.close();for(const ext of ['.html','.tsx'])fs.rmSync(harness+ext,{force:true});});
