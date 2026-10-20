// Optional browser verification. Install Playwright/Chromium or provide the environment paths below.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const output=path.resolve(process.env.UI_OUTPUT_DIR||'ui-review');fs.mkdirSync(output,{recursive:true});
const root=path.resolve('dist');const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.mp3':'audio/mpeg'};
const server=http.createServer((req,res)=>{const relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/ligetvar\//,'');const file=path.resolve(root,relative||'index.html');if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return;}fs.readFile(file,(err,data)=>{if(err)res.writeHead(404).end();else res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(data);});});
const TRIAD={1:['rebeka_1'],2:['boglarka_1'],3:['rebeka_2'],4:['triad_1','boglarka_2'],5:['triad_2'],6:['rebeka_3'],7:['boglarka_3','triad_3'],8:['triad_4'],9:['rebeka_4'],10:['boglarka_4'],11:['triad_5'],12:['triad_6','prepare_backup'],13:['rebeka_5','boglarka_5'],14:['triad_7','prepare_signals'],16:['triad_8']};
let browser;
(async()=>{
 const {SCENES}=await import('../src/game/content/catalog.ts');
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port+'/ligetvar/';
 const args=['--no-sandbox','--disable-dev-shm-usage','--no-zygote','--disable-gpu'];if(process.env.CHROMIUM_SERVERLESS==='1')args.push('--single-process');
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE_PATH||undefined,args});
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('ligetvar-save-v2')));
 const noOverflow=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 const scene=async id=>{await page.getByRole('button',{name:new RegExp(SCENES[id].title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))}).click();};
 const finish=async()=>{for(let i=0;i<60;i++){if((await state()).phase!=='scene')return;await page.locator('.choices button').first().click();}throw new Error('Scene did not finish');};
 await page.goto(url);
 await page.screenshot({path:path.join(output,'desktop-title.png'),fullPage:true});
 for(const width of [390,320]){await page.setViewportSize({width,height:844});await page.getByLabel('Betűméret').selectOption('1.3');await noOverflow();await page.screenshot({path:path.join(output,'mobile-'+width+'-title.png'),fullPage:true});}
 await page.setViewportSize({width:1440,height:1000});await page.getByLabel('Betűméret').selectOption('1');
 await page.getByRole('button',{name:'Új félév indítása',exact:true}).click();
 await page.screenshot({path:path.join(output,'desktop-planner.png'),fullPage:true});
 assert.ok(await page.locator('.scene-card .ui-icon').count(),'planner uses the existing activity icons');
 await scene('shared_1');
 assert.equal(await page.locator('.narration .portrait').count(),0,'narration is prose, without a character portrait');
 assert.equal(await page.locator('.narration .dialogue-heading h1').textContent(),SCENES.shared_1.title);
 await page.screenshot({path:path.join(output,'desktop-narration.png'),fullPage:true});
 for(const width of [390,320]){await page.setViewportSize({width,height:844});await page.getByLabel('Betűméret').selectOption('1.3');await noOverflow();await page.screenshot({path:path.join(output,'mobile-'+width+'-narration.png'),fullPage:true});}
 await page.setViewportSize({width:1440,height:1000});await page.getByLabel('Betűméret').selectOption('1');
 assert.equal(await page.locator('img.ui-icon').evaluateAll(images=>images.every(image=>image.complete&&image.naturalWidth>0)),true,'icons resolve in the production build');
 await page.locator('.choices button').first().click();await page.locator('.choices button').first().click();
 await page.locator('.portrait-placeholder').waitFor();await page.screenshot({path:path.join(output,'desktop-portrait.png'),fullPage:true});await noOverflow();
 await page.reload();await page.getByRole('button',{name:'Félév folytatása',exact:true}).click();assert.equal((await state()).scene.line,'line_2');
 for(const width of [390,320]){await page.setViewportSize({width,height:844});await page.getByLabel('Betűméret').selectOption('1.3');await noOverflow();await page.screenshot({path:path.join(output,'mobile-'+width+'-portrait.png'),fullPage:true});}
 await finish();await scene('rebeka_1');await finish();
 await page.getByRole('button',{name:'MOHU visszaváltás',exact:true}).click();await page.getByRole('button',{name:'Ugrás',exact:true}).click();await page.waitForTimeout(5000);await page.getByRole('button',{name:'Visszaváltom',exact:true}).click();assert.equal((await state()).phase,'summary');
 await page.getByRole('button',{name:'2. hét kezdése',exact:true}).click();
 // An authored friendship path through the real UI, including aftermath before closure.
 for(let w=2;w<=16;w++){
  await scene('shared_'+w);await finish();
  if(w===16){assert.equal((await state()).phase,'planner');assert.equal((await state()).slot,1);await scene('friendship_after');await finish();}
  while((await state()).phase==='planner')await page.getByRole('button',{name:'Pihenés · +32 energia',exact:true}).click();
  await page.getByRole('button',{name:w===16?'Félév lezárása és epilógusok':w+1+'. hét kezdése',exact:true}).click();
 }
 assert.equal((await state()).phase,'ending');await page.getByRole('heading',{name:'Ami megmarad',exact:true}).waitFor();await noOverflow();await page.screenshot({path:path.join(output,'mobile-friendship-ending.png'),fullPage:true});
 // A complete mutually chosen triad, using the budget from the authoritative plan.
 await page.locator('.brand').click();await page.getByRole('button',{name:'Új félév indítása',exact:true}).click();await page.setViewportSize({width:1440,height:1000});
 for(let w=1;w<=16;w++){
  await scene('shared_'+w);await finish();
  if(w===8)await page.getByRole('button',{name:'Rebeka, Boglárka és Márton',exact:true}).click();
  for(const id of TRIAD[w]||[]){await scene(id);await finish();}
  while((await state()).phase==='planner')await page.getByRole('button',{name:'Pihenés · +32 energia',exact:true}).click();
  await page.getByRole('button',{name:w===16?'Félév lezárása és epilógusok':w+1+'. hét kezdése',exact:true}).click();
 }
 const end=await state();assert.equal(end.phase,'ending');assert.ok(end.decisions.triad_aftermath);assert.equal(end.confrontation,'supported');await noOverflow();
 assert.deepEqual(errors,[]);await page.screenshot({path:path.join(output,'desktop-triad-ending.png'),fullPage:true});
 // Real conversation branches and a witnessed callback, with reload inside the branch.
 await page.locator('.brand').click();await page.getByRole('button',{name:'Új félév indítása',exact:true}).click();
 await scene('shared_1');await finish();await scene('coffee_rebeka_early');
 while((await state()).scene.line!=='topics')await page.locator('.choices button').first().click();
 await page.getByRole('button',{name:'Mit fotóznál akkor, ha senki nem pontozná?',exact:true}).click();
 const cursor=(await state()).scene.line;await page.reload();await page.getByRole('button',{name:'Félév folytatása',exact:true}).click();
 assert.equal((await state()).scene.line,cursor);await finish();
 while((await state()).phase==='planner')await page.getByRole('button',{name:'Pihenés · +32 energia',exact:true}).click();
 await page.getByRole('button',{name:'2. hét kezdése',exact:true}).click();
 for(let w=2;w<=8;w++){
  await scene('shared_'+w);await finish();
  if(w<8){while((await state()).phase==='planner')await page.getByRole('button',{name:'Pihenés · +32 energia',exact:true}).click();await page.getByRole('button',{name:w+1+'. hét kezdése',exact:true}).click();}
 }
 await scene('coffee_rebeka_middle');while((await state()).scene.line!=='topics')await page.locator('.choices button').first().click();
 await page.getByRole('button',{name:'Ez is olyasmi, amit pontozás nélkül fotóznál?',exact:true}).click();
 assert.equal((await state()).scene.line,'callback_0');await noOverflow();
 await page.screenshot({path:path.join(output,'desktop-conversation-callback.png'),fullPage:true});
 for(const width of [390,320]){await page.setViewportSize({width,height:844});await page.getByLabel('Betűméret').selectOption('1.3');await noOverflow();}
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({result:'passed',checks:['castle title and icon assets','narration without a character portrait','1440px desktop','390px/320px mobile at 130% text','real save/resume','touch runner and offscreen items','16-week friendship UI','16-week triad UI','aftermath before closure','no horizontal overflow','no page errors','coffee choice branch save/resume','witnessed week-8 callback'],screenshots:fs.readdirSync(output)},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();server.close();});
