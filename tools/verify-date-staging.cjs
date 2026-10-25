// Run after npm run build, with the same Playwright/Chromium settings as verify-leisure.cjs.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve('dist'),output=process.env.UI_OUTPUT_DIR||'/tmp/ligetvar-date-review';fs.mkdirSync(output,{recursive:true});
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.jpg':'image/jpeg','.mp3':'audio/mpeg'};
const server=http.createServer((req,res)=>{const relative=new URL(req.url,'http://localhost').pathname.replace(/^\/ligetvar\//,'');const file=path.resolve(root,relative||'index.html');if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(err,data)=>{if(err)res.writeHead(404).end();else res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(data);});});
let browser;
(async()=>{
 const R=await import('../src/game/content/runtime.ts'),{SCENES}=await import('../src/game/content/catalog.ts'),{encodeSave}=await import('../src/game/content/saves.ts');
 const advance=(s,target)=>{for(let i=0;i<100;i++){if(s.phase!=='scene'||s.scene.line===target)return s;const l=R.currentLine(s,SCENES);s=R.applyChoice(s,l.choices?.[0].id??'continue',SCENES);}throw new Error('Nonterminating scene');};
 const start=girl=>{let s=R.createInitial('Színpad próba');for(let w=1;w<=7;w++){s=advance(R.openScene(s,'shared_'+w,SCENES));if(w===2)s=advance(R.openScene(s,girl+'_1',SCENES));if(w===5)s=advance(R.openScene(s,girl+'_2',SCENES));if(w===7)return advance(R.openScene(s,girl+'_3',SCENES),'date_destination');while(s.phase==='planner')s=R.activity(s,'rest');s=R.nextWeek(s,SCENES);}throw new Error('Missing date');};
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port+'/ligetvar/';
 for(const width of [320,390,1440]){
  browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage',...(process.env.CHROMIUM_SERVERLESS==='1'?['--single-process','--no-zygote','--use-gl=angle','--use-angle=swiftshader']:[])]});
  const page=await browser.newPage({reducedMotion:'reduce',viewport:{width,height:width<500?844:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('ligetvar-save')).state);
  const next=()=>page.locator('.choices button').first().click();
  const check=async()=>{
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   const img=page.locator('.portrait img');await img.waitFor();await img.evaluate(i=>i.decode());
   const image=await img.boundingBox(),view=await page.locator('.scene-view').boundingBox(),panel=await page.locator('.dialogue-panel').boundingBox();
   assert.ok(image.x>=view.x-1&&image.x+image.width<=view.x+view.width+1&&image.y>=view.y-1&&image.y+image.height<=view.y+view.height+1,'portrait remains inside scenery');
   assert.ok(image.x+image.width<=panel.x+1||image.y+image.height<=panel.y+1,'portrait does not overlap dialogue');
  };
  for(const girl of ['rebeka','boglarka','greta']){
   await page.goto(url);await page.evaluate(raw=>localStorage.setItem('ligetvar-save',raw),encodeSave(start(girl)));await page.reload();await page.getByRole('button',{name:'Félév folytatása',exact:true}).click();
   await check();const original=await page.locator('.dialogue').getAttribute('style');
   await next();await next(); // invitation -> movement narration -> partner in new place
   assert.equal(await page.locator('.dialogue').getAttribute('data-stage'),'private');
   assert.notEqual(await page.locator('.dialogue').getAttribute('style'),original);await check();
   const beside=await page.locator('.portrait-frame').boundingBox();
   await next();await next(); // private options -> affirmative response to kiss request
   assert.equal(await page.locator('.dialogue').getAttribute('data-proximity'),'close');await check();
   const close=await page.locator('.portrait-frame').boundingBox();assert.ok(close.width>beside.width,JSON.stringify({girl,width,beside,close,style:await page.locator('.portrait-frame').evaluate(e=>({width:getComputedStyle(e).width,transition:getComputedStyle(e).transition}))}));
   await page.screenshot({path:path.join(output,`${girl}-${width}-close.png`),fullPage:true});
   const saved=await state();await page.reload();await page.getByRole('button',{name:'Félév folytatása',exact:true}).click();assert.deepEqual(await state(),saved);assert.equal(await page.locator('.dialogue').getAttribute('data-proximity'),'close');
   for(let i=0;i<50&&(await state()).phase==='scene';i++)await next();
   const done=await state();assert.equal(done.slot,2);assert.ok(done.decisions[girl+'_date_romantic_kiss']);
  }
  assert.deepEqual(errors,[]);await browser.close();browser=null;
 }
 console.log('All three date transitions, closeness, save/resume and one-slot completion passed at 320/390/1440px.');
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();server.close();});
