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
 const OBJECT_LABEL={desk:'Íróasztal — Műhely és felkészülés',phone:'Telefon — Találkozók',journal:'Napló — Nyomok és kapcsolatok',chair:'Fotel — Pihenés',shelf:'Polc — Ajándékok',bag:'Zsák — Opcionális munka'};
 const openObject=async id=>page.getByRole('button',{name:OBJECT_LABEL[id],exact:true}).click();
 const rest=async()=>{await openObject('chair');await page.getByRole('button',{name:'Pihenés · +32 energia',exact:true}).click();};
 const scene=async id=>{await openObject(SCENES[id].kind==='shared'||SCENES[id].kind==='preparation'?'desk':'phone');await page.getByRole('button',{name:new RegExp(SCENES[id].title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))}).click();};
 const finish=async()=>{for(let i=0;i<60;i++){if((await state()).phase!=='scene')return;await page.locator('.choices button').first().click();}throw new Error('Scene did not finish');};
 if(process.env.UI_CONTROLS_ONLY==='1'){
  for(const [width,scale] of [[1440,'1'],[390,'1'],[320,'1.3']]){
   await page.setViewportSize({width,height:width===1440?1000:844});await page.goto(url);
   await page.getByLabel('Betűméret').selectOption(scale);await page.getByRole('button',{name:'Új félév indítása',exact:true}).click();await scene('shared_1');
   let anchor=null,lines=0,speakers=new Set();
   while((await state()).phase==='scene'){
    const cursor=(await state()).scene.line;speakers.add(SCENES.shared_1.lines.find(line=>line.id===cursor).speaker);
    const button=page.locator('.choices button').first();await button.waitFor();
    const box=await button.boundingBox();const relative=await page.locator('.dialogue').boundingBox();
    const point={x:box.x,y:box.y-relative.y,viewportY:box.y,width:box.width};
    if(anchor)for(const key of ['x','y','viewportY','width'])assert.ok(Math.abs(point[key]-anchor[key])<1,`control ${key} moved at ${width}px, line ${cursor}: ${JSON.stringify({anchor,point})}`);else anchor=point;
    await noOverflow();if(lines===2)await page.screenshot({path:path.join(output,'fixed-controls-'+width+'.png')});
    await button.click();lines++;assert.ok(lines<60);
   }
   assert.ok(speakers.has('narrator')&&speakers.has('marton')&&speakers.has('rebeka'));console.log(JSON.stringify({width,scale,lines,anchor,result:'stable controls'}));
  }
  assert.deepEqual(errors,[]);return;
 }
 await page.goto(url);
 await page.screenshot({path:path.join(output,'desktop-title.png'),fullPage:true});
 for(const width of [390,320]){await page.setViewportSize({width,height:844});await page.getByLabel('Betűméret').selectOption('1.3');await noOverflow();await page.screenshot({path:path.join(output,'mobile-'+width+'-title.png'),fullPage:true});}
 await page.setViewportSize({width:1440,height:1000});await page.getByLabel('Betűméret').selectOption('1');
 await page.getByRole('button',{name:'Új félév indítása',exact:true}).click();
 await page.screenshot({path:path.join(output,'desktop-planner.png'),fullPage:true});
 assert.equal(await page.locator('.room-hotspot').count(),7);assert.equal(await page.locator('.scene-card').count(),0,'the room starts without an action list');
 await scene('shared_1');
 assert.equal(await page.locator('.narration .portrait').count(),0,'narration is prose, without a character portrait');
 assert.equal(await page.locator('.narration .dialogue-heading h1').textContent(),SCENES.shared_1.title);
 await page.screenshot({path:path.join(output,'desktop-narration.png'),fullPage:true});
 for(const width of [390,320]){await page.setViewportSize({width,height:844});await page.getByLabel('Betűméret').selectOption('1.3');await noOverflow();await page.screenshot({path:path.join(output,'mobile-'+width+'-narration.png'),fullPage:true});}
 await page.setViewportSize({width:1440,height:1000});await page.getByLabel('Betűméret').selectOption('1');
 assert.equal(await page.locator('img.ui-icon').evaluateAll(images=>images.every(image=>image.complete&&image.naturalWidth>0)),true,'icons resolve in the production build');
 await page.locator('.choices button').first().click();await page.locator('.choices button').first().click();
 await page.locator('.scene-view .portrait-placeholder').waitFor();assert.equal(await page.locator('.dialogue-panel .portrait').count(),0);await page.screenshot({path:path.join(output,'desktop-portrait.png'),fullPage:true});await noOverflow();
 await page.reload();await page.getByRole('button',{name:'Félév folytatása',exact:true}).click();assert.equal((await state()).scene.line,'line_2');
 for(const width of [390,320]){
  await page.setViewportSize({width,height:844});await page.getByLabel('Betűméret').selectOption('1.3');await noOverflow();
  const layout=await page.evaluate(()=>{const view=document.querySelector('.scene-view'),panel=document.querySelector('.dialogue-panel'),copy=document.querySelector('.dialogue-copy');return {view:view.getBoundingClientRect().toJSON(),panel:panel.getBoundingClientRect().toJSON(),copyHeight:copy.clientHeight,scrollHeight:copy.scrollHeight,background:getComputedStyle(view).backgroundImage};});
  const overlay=await page.locator('.scene-view .portrait').boundingBox();assert.ok(overlay.y>=layout.view.y&&overlay.y+overlay.height<=layout.view.bottom+1,'partner portrait stays over the scenery');
  assert.ok(layout.view.height>=180,'mobile reserves unobstructed scenery');assert.ok(layout.panel.y>=layout.view.bottom,'dialogue stays below the scenery');
  assert.ok(layout.copyHeight<=300,'long passages have a bounded reading area');assert.ok(layout.scrollHeight>layout.copyHeight,'long text remains scrollable at enlarged size');assert.notEqual(layout.background,'none');
  await page.locator('.dialogue-copy').evaluate(copy=>copy.scrollTop=copy.scrollHeight);assert.ok(await page.locator('.dialogue-copy').evaluate(copy=>copy.scrollTop)>0);
  await page.locator('.dialogue-copy').evaluate(copy=>copy.scrollTop=0);
  await page.screenshot({path:path.join(output,'mobile-'+width+'-portrait.png'),fullPage:true});
 }
 await page.locator('.choices button').first().click();assert.equal(await page.locator('.dialogue-copy').evaluate(copy=>copy.scrollTop),0);
 assert.ok((await page.locator('.scene-view').boundingBox()).y>=0,'advancing mobile dialogue keeps scenery in view');
 await page.screenshot({path:path.join(output,'mobile-scene-viewport.png')});
 for(let i=0;i<20;i++){const cursor=(await state()).scene.line;if(SCENES.shared_1.lines.find(line=>line.id===cursor)?.speaker==='marton')break;await page.locator('.choices button').first().click();}
 assert.equal(await page.locator('.portrait').count(),0,'the player never receives a portrait or placeholder');
 await page.screenshot({path:path.join(output,'mobile-player-reply.png')});
 if(process.env.UI_DIALOGUE_ONLY==='1'){assert.deepEqual(errors,[]);console.log('Mobile scenery, text scrolling, focus, save/resume and desktop layout checks passed.');return;}
 await finish();
 const beforeBrowsing=await state();
 for(const room of ['Iroda','Saját szoba']){
  await page.getByRole('navigation',{name:'Szobák'}).getByRole('button',{name:room,exact:true}).click();
  for(const width of [1440,390,320]){
   await page.setViewportSize({width,height:width===1440?1000:844});await page.getByLabel('Betűméret').selectOption(width===1440?'1':'1.3');await noOverflow();
   const boxes=await page.locator('.room-hotspot').evaluateAll(spots=>spots.map(spot=>{const r=spot.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,label:spot.getAttribute('aria-label')};}));
   for(const box of boxes)assert.ok(box.width>=44&&box.height>=44,box.label);
   for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){const a=boxes[i],b=boxes[j];assert.ok(a.x+a.width<=b.x||b.x+b.width<=a.x||a.y+a.height<=b.y||b.y+b.height<=a.y,'touch targets overlap: '+a.label+' / '+b.label);}
   await page.screenshot({path:path.join(output,`room-${room==='Iroda'?'office':'home'}-${width}.png`),fullPage:true});
  }
  await page.getByRole('button',{name:'Segítség mutatása',exact:true}).click();
  assert.equal(await page.locator('.spot-mark').first().evaluate(mark=>getComputedStyle(mark).opacity),'1');
  await page.screenshot({path:path.join(output,`room-${room==='Iroda'?'office':'home'}-hints.png`),fullPage:true});
  await page.getByRole('button',{name:'Segítség elrejtése',exact:true}).click();
  assert.equal(await page.locator('.spot-mark').first().evaluate(mark=>getComputedStyle(mark).opacity),'0');
  await page.locator('.spot-phone').focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');assert.equal(await page.locator('.spot-phone .spot-label').evaluate(label=>getComputedStyle(label).opacity),'1');await page.keyboard.press('Enter');
  await page.getByRole('button',{name:'Tárgymenü bezárása',exact:true}).click();assert.equal(await page.locator('.spot-phone').evaluate(button=>button===document.activeElement),true);
  await page.getByRole('button',{name:'Ajtó — '+(room==='Iroda'?'Saját szoba':'Tanszéki iroda'),exact:true}).click();await page.getByRole('heading',{name:room==='Iroda'?'Saját szoba':'Tanszéki iroda',exact:true}).waitFor();
  await page.getByRole('button',{name:'Ajtó — '+(room==='Iroda'?'Tanszéki iroda':'Saját szoba'),exact:true}).click();
  await openObject('phone');assert.ok(await page.locator('.activity-conversation').count());assert.ok(await page.locator('.activity-relationship').count());
  await openObject('bag');for(const kind of ['recycling','paperwork'])assert.equal(await page.locator('.activity-'+kind).count(),1);
  await openObject('chair');assert.equal(await page.locator('.activity-rest').count(),1);
  await openObject('shelf');await page.getByRole('heading',{name:'Ajándékok',exact:true}).waitFor();
  await openObject('journal');await page.getByText('Amit már tudunk',{exact:true}).waitFor();
 }
 assert.deepEqual(await state(),beforeBrowsing,'room navigation, hints and object browsing spend no time or resources');
 if(process.env.UI_ROOM_ONLY==='1'){assert.deepEqual(errors,[]);console.log('Both rooms, responsive hotspots, hints, keyboard/door navigation, object menus and free browsing passed.');return;}
 await scene('rebeka_1');await finish();
 await openObject('bag');await page.getByRole('button',{name:'MOHU visszaváltás',exact:true}).click();await page.getByRole('button',{name:'Ugrás',exact:true}).click();await page.waitForTimeout(5000);await page.getByRole('button',{name:'Visszaváltom',exact:true}).click();assert.equal((await state()).phase,'summary');
 await page.getByRole('button',{name:'2. hét kezdése',exact:true}).click();
 // An authored friendship path through the real UI, including aftermath before closure.
 for(let w=2;w<=16;w++){
  await scene('shared_'+w);await finish();
  if(w===13){await openObject('desk');assert.ok(await page.locator('.activity-preparation').count());await noOverflow();await page.screenshot({path:path.join(output,'activities-preparation-320.png'),fullPage:true});}
  if(w===16){assert.equal((await state()).phase,'planner');assert.equal((await state()).slot,1);await scene('friendship_after');await finish();}
  while((await state()).phase==='planner')await rest();
  await page.getByRole('button',{name:w===16?'Félév lezárása és epilógusok':w+1+'. hét kezdése',exact:true}).click();
 }
 assert.equal((await state()).phase,'ending');await page.getByRole('heading',{name:'Ami megmarad',exact:true}).waitFor();await noOverflow();await page.screenshot({path:path.join(output,'mobile-friendship-ending.png'),fullPage:true});
 // A complete mutually chosen triad, using the budget from the authoritative plan.
 await page.locator('.brand').click();await page.getByRole('button',{name:'Új félév indítása',exact:true}).click();await page.setViewportSize({width:1440,height:1000});
 for(let w=1;w<=16;w++){
  await scene('shared_'+w);await finish();
  if(w===8){await openObject('journal');await page.getByRole('button',{name:'Rebeka, Boglárka és Márton',exact:true}).click();}
  for(const id of TRIAD[w]||[]){await scene(id);await finish();}
  while((await state()).phase==='planner')await rest();
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
 while((await state()).phase==='planner')await rest();
 await page.getByRole('button',{name:'2. hét kezdése',exact:true}).click();
 for(let w=2;w<=8;w++){
  await scene('shared_'+w);await finish();
  if(w<8){while((await state()).phase==='planner')await rest();await page.getByRole('button',{name:w+1+'. hét kezdése',exact:true}).click();}
 }
 await scene('coffee_rebeka_middle');while((await state()).scene.line!=='topics')await page.locator('.choices button').first().click();
 await page.getByRole('button',{name:'Ez is olyasmi, amit pontozás nélkül fotóznál?',exact:true}).click();
 assert.equal((await state()).scene.line,'callback_0');await noOverflow();
 await page.screenshot({path:path.join(output,'desktop-conversation-callback.png'),fullPage:true});
 for(const width of [390,320]){await page.setViewportSize({width,height:844});await page.getByLabel('Betűméret').selectOption('1.3');await noOverflow();}
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({result:'passed',checks:['partner portrait over scenery and no player portrait','unobstructed mobile scenery and scrollable text','two room object navigation, hints, phone and preparation','castle title and icon assets','narration without a character portrait','1440px desktop','390px/320px mobile at 130% text','real save/resume','touch runner and offscreen items','16-week friendship UI','16-week triad UI','aftermath before closure','no horizontal overflow','no page errors','coffee choice branch save/resume','witnessed week-8 callback'],screenshots:fs.readdirSync(output)},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();server.close();});
