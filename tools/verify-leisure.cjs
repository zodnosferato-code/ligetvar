// Focused mobile/desktop flow checks. Run after npm run build; requires Playwright Chromium.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const output=process.env.UI_OUTPUT_DIR||'/tmp/ligetvar-leisure-review';fs.mkdirSync(output,{recursive:true});
const root=path.resolve('dist'),mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.jpg':'image/jpeg','.mp3':'audio/mpeg'};
const server=http.createServer((req,res)=>{const relative=new URL(req.url,'http://localhost').pathname.replace(/^\/ligetvar\//,'');const file=path.resolve(root,relative||'index.html');if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(err,data)=>{if(err)res.writeHead(404).end();else res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(data);});});
let browser,currentPage;
(async()=>{
 const R=await import('../src/game/content/runtime.ts'),{SCENES}=await import('../src/game/content/catalog.ts'),{encodeSave}=await import('../src/game/content/saves.ts'),{legalSwap,puzzleDone}=await import('../src/game/content/puzzles.ts');
 const finish=(s,id)=>{s=R.openScene(s,id,SCENES);while(s.phase==='scene'){const l=R.currentLine(s,SCENES);s=R.applyChoice(s,l.choices?.[0].id??'continue',SCENES);}return s;};
 const initial=finish(R.createInitial('Mobil próba'),'shared_1');
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port+'/ligetvar/';
 const launch=()=>chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage',...(process.env.CHROMIUM_SERVERLESS==='1'?['--single-process','--no-zygote','--use-gl=angle','--use-angle=swiftshader']:[])],executablePath:process.env.CHROMIUM_EXECUTABLE_PATH||undefined});
 for(const width of (process.env.UI_WIDTHS||'320,390,1440').split(',').map(Number)){
  browser=await launch();
  const page=await browser.newPage({viewport:{width,height:width<500?844:1000},hasTouch:width<500}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  currentPage=page;
  const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('ligetvar-save')).state);
  const seed=async s=>{await page.goto(url);await page.evaluate(raw=>localStorage.setItem('ligetvar-save',raw),encodeSave(s));await page.reload();await page.getByRole('button',{name:'Félév folytatása',exact:true}).click();};
  const overflow=async()=>assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'overflow at '+width);
  // Versioning: old saves are visible, failed loads never replace them, and restarting is explicit.
  await page.goto(url);
  await page.evaluate(()=>{localStorage.clear();localStorage.setItem('ligetvar-save-v3','{"version":3,"name":"Old"}');});
  await page.reload();await page.getByText(/Ligetvár 0\.3\.0/).waitFor();
  await page.getByRole('alert').filter({hasText:'már nem használható'}).waitFor();
  assert.equal(await page.getByRole('button',{name:'Félév folytatása',exact:true}).isDisabled(),true);
  await overflow();await page.screenshot({path:path.join(output,`save-incompatible-${width}.png`),fullPage:true});
  await page.getByRole('button',{name:'Új félév indítása',exact:true}).click();
  assert.equal(await page.evaluate(()=>localStorage.getItem('ligetvar-save')),null);
  await page.getByRole('button',{name:'Mégsem',exact:true}).click();
  assert.equal(await page.evaluate(()=>localStorage.getItem('ligetvar-save')),null);
  await page.getByRole('button',{name:'Új félév indítása',exact:true}).click();
  await page.getByRole('button',{name:'Igen, új félévet kezdek',exact:true}).click();
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('ligetvar-save')));
  assert.equal(saved.gameVersion,'0.3.0');assert.equal(saved.saveSchemaVersion,4);assert.equal(saved.contentCompatibilityVersion,1);
  assert.equal(await page.evaluate(()=>localStorage.getItem('ligetvar-save-v3')),'{"version":3,"name":"Old"}');
  for(const [raw,message] of [['{','sérült vagy hiányos'],[JSON.stringify({...saved,contentCompatibilityVersion:99}),'újabb, nem támogatott']]){
   await page.evaluate(raw=>localStorage.setItem('ligetvar-save',raw),raw);await page.reload();
   await page.getByRole('alert').filter({hasText:message}).waitFor();
   assert.equal(await page.getByRole('button',{name:'Félév folytatása',exact:true}).isDisabled(),true);
   assert.equal(await page.evaluate(()=>localStorage.getItem('ligetvar-save')),raw);
  }
  for(const kind of ['recycling','archive']){
   await seed(initial);await page.locator('.spot-bag').click();await page.getByRole('button',{name:new RegExp(kind==='recycling'?'Újrahasznosítás':'Archívumpárok')}).click();
   const tiles=page.locator('.puzzle-tile');await tiles.first().waitFor();
   for(const b of await tiles.all()){const box=await b.boundingBox();assert.ok(box.width>=44&&box.height>=44,JSON.stringify({width,box}));}
   await overflow();await page.screenshot({path:path.join(output,`${kind}-${width}.png`),fullPage:true});
   if(kind==='recycling'){
    let s=await state();while(!puzzleDone(s.puzzle)){const [a,b]=legalSwap(s.puzzle.board);await tiles.nth(a).click();await tiles.nth(b).click();s=await state();}
   }else{
    let s=await state();await tiles.nth(0).click();const before=await state();await page.reload();await page.getByRole('button',{name:'Félév folytatása',exact:true}).click();assert.deepEqual((await state()).puzzle,before.puzzle);
    const mismatch=s.puzzle.board.findIndex(v=>v!==s.puzzle.board[0]);await tiles.nth(mismatch).click();await page.getByRole('button',{name:'Következő pár'}).click();
    for(let v=0;v<8;v++){s=await state();const pair=s.puzzle.board.flatMap((x,i)=>x===v?[i]:[]);await tiles.nth(pair[0]).click();await tiles.nth(pair[1]).click();if(v<7)await page.getByRole('button',{name:'Következő pár'}).click();}
   }
   await page.getByRole('button',{name:'Jutalom átvétele · éjszaka',exact:true}).click();const paid=await state();assert.equal(paid.slot,2);assert.ok(paid.activityPoints>=3);assert.ok(paid.money>=initial.money+8000);await overflow();
  }
  // Personal gift, immediate portrait reply, durable phone history.
  await page.locator('.spot-shelf').click();await page.getByLabel('Kinek választasz?').selectOption('rebeka');await page.getByLabel('Ajándék',{exact:true}).selectOption('photo');await page.getByRole('button',{name:/^Megveszem/ }).click();
  await page.getByLabel('Személyes üzenet').selectOption('thanks');await page.getByRole('button',{name:'Elküldöm · Rebeka',exact:true}).click();await page.getByRole('heading',{name:'Új személyes válasz',exact:true}).waitFor();
  assert.equal((await state()).giftHistory.length,1);await page.locator('.gift-reply img').evaluate(img=>img.decode());await overflow();await page.screenshot({path:path.join(output,`gift-${width}.png`),fullPage:true});
  await page.getByRole('button',{name:'Elolvastam a válaszokat'}).click();await page.locator('.spot-phone').click();assert.equal(await page.locator('.gift-reply').count(),1);
  // Build a legitimate earned-points save and exercise a paid scene admission.
  let s=initial;s=R.activity(s,'archive');for(let v=0;v<8;v++){const pair=s.puzzle.board.flatMap((x,i)=>x===v?[i]:[]);s=R.movePuzzle(s,pair[0]);s=R.movePuzzle(s,pair[1]);if(v<7)s=R.nextPair(s);}s=R.finishPuzzle(s);s=finish(s,'rebeka_1');s=R.nextWeek(s,SCENES);s=finish(s,'shared_2');
  await seed(s);await page.locator('.spot-phone').click();await overflow();await page.screenshot({path:path.join(output,`outings-${width}.png`),fullPage:true});
  await page.getByRole('button',{name:/Rebeka · A vállalhatatlan képek estéje/}).click();assert.equal((await state()).activityPoints,2);assert.equal((await state()).money,s.money-4000);
  await page.reload();await page.getByRole('button',{name:'Félév folytatása',exact:true}).click();assert.equal((await state()).activityPoints,2);
  while((await state()).phase==='scene')await page.locator('.choices button').first().click();assert.equal((await state()).slot,2);await overflow();assert.deepEqual(errors,[]);
  console.log(JSON.stringify({width,puzzles:'both complete',saveResume:'pass',versioning:'incompatible/corrupt/newer notices and explicit restart',gifts:'reply and history',outing:'charged once',overflow:false,errors:0}));await page.close();await browser.close();
 }
})().catch(async e=>{console.error(e);if(currentPage&&!currentPage.isClosed())await currentPage.screenshot({path:path.join(output,'failure.png'),fullPage:true}).catch(()=>{});process.exitCode=1;}).finally(async()=>{await browser?.close();server.close();});
