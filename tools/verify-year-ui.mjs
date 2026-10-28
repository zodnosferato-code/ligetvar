// Server-rendered UI contract smoke check; this does not replace browser/layout review.
import {build} from 'esbuild';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
const dir=await mkdtemp(join(tmpdir(),'ligetvar-year-ui-'));
try {
 const outfile=join(dir,'smoke.mjs');
 await build({stdin:{resolveDir:process.cwd(),loader:'tsx',contents:`
 import assert from 'node:assert/strict';
 import {renderToStaticMarkup} from 'react-dom/server';
 import {GameApp} from './src/game/ui/GameApp.tsx';
 import {useGame} from './src/game/store.ts';
 import {SCENES} from './src/game/content/catalog.ts';
 import {CALENDAR,storyIdAt} from './src/game/content/calendar.ts';
 import {activity,applyChoice,createInitial,currentLine,nextWeek,openScene} from './src/game/content/runtime.ts';
 import {decodeSave,encodeSave} from './src/game/content/saves.ts';
 // Present a real earned state to React's server snapshot and choose stable, unanimated markup.
 let locale='en';
 globalThis.localStorage={getItem:(key:string)=>key==='ligetvar-locale'?locale:key==='ligetvar-transitions'?'off':null,setItem:()=>{},removeItem:()=>{},clear:()=>{},key:()=>null,length:0};
 let state=createInitial('UI test'),checks=0;
 function render(){Object.assign(useGame.getInitialState(),{mode:'play',state,saveNotice:null});useGame.setState({mode:'play',state,saveNotice:null});return renderToStaticMarkup(<GameApp/>);}
 for(let week=1;week<=CALENDAR.weeks;week++){
  const id=storyIdAt(week);
  if(id){state=openScene(state,id,SCENES);while(state.phase==='scene')state=applyChoice(state,currentLine(state,SCENES)!.choices?.[0].id??'continue',SCENES);}
  assert.equal(decodeSave(encodeSave(state),SCENES).status,'ok');
  if(week===4||week===6){
   for(locale of ['en','hu']){
    const markup=render();assert.match(markup,/52/);assert.ok(!markup.includes('undefined'));
    const rhythm=markup.match(/<ol class="week-rhythm"[\\s\\S]*?<\\/ol>/)![0];
    assert.equal((rhythm.match(/<li /g)||[]).length,id?4:3);
    assert.equal((rhythm.match(/aria-current="step"/g)||[]).length,1);checks++;
   }
  }
  state=activity(activity(state,'rest'),'rest');
  if(week===52){locale='en';const markup=render();assert.match(markup,/Complete year and read epilogues/);assert.ok(!markup.includes('Start week 53'));checks++;}
  state=nextWeek(state,SCENES);
 }
 locale='en';assert.match(render(),/After the year/);checks++;
 console.log(JSON.stringify({checks,week:state.week,phase:state.phase,scope:'server-rendered markup; no browser layout certification'}));
 `},bundle:true,platform:'node',format:'esm',jsx:'automatic',outfile,logLevel:'silent',banner:{js:"import {createRequire} from 'node:module';const require=createRequire(import.meta.url);"},define:{__BUILD_ID__:'null','process.env.NODE_ENV':'"production"'}});
 await import(pathToFileURL(outfile).href);
}finally{await rm(dir,{recursive:true,force:true});}
