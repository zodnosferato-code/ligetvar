import {DEFAULT_LOCALE,isLocale,translator,type Locale} from '../content/localization.ts';
import {createInterface} from 'node:readline';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {Session,HELP,PROTOCOL_VERSION} from './session.ts';
import {LockedSave} from './files.ts';
import {GAME_VERSION} from '../release.ts';
function printHuman(response:ReturnType<Session['execute']>,showVisuals=true){
 const t=translator(response.locale);
 const r=response as ReturnType<Session['execute']>&Record<string,any>;
 if(!r.ok){console.log(`ERROR ${r.error.code}: ${r.error.message}`);return;}
 if(r.help){console.log(Object.values(HELP).join('\n'));return;}
 for(const key of ['catalog','scene','visuals','coverage','finding'])if(r[key])console.log(JSON.stringify(r[key],null,2));
 if(r.written)console.log(t('cli.written',{path:r.written}));
 if(response.locale==='en')console.log(t('locale.partial'));
 const v=r.view;if(!v){console.log(t('cli.noGame',{version:GAME_VERSION}));return;}
 console.log(t('cli.status',{week:v.week,phase:v.phase,period:v.period??'shared/recap',money:v.money,points:v.activityPoints,energy:v.energy,revision:r.revision}));
 if(showVisuals)for(const a of v.assets)console.log(`[${a.role}${a.fallback?' / neutral fallback':''}] ${a.description}`);
 if(v.scene)console.log(`${v.scene.title} [${v.scene.id}/${v.scene.lineId}]\n${v.scene.location}${v.scene.staging.label?' · '+v.scene.staging.label:''} [${v.scene.staging.proximity}]\n${v.scene.speaker}: ${v.scene.text}`);
 if(v.lastNote)console.log(v.lastNote);
 if(v.puzzle){console.log(v.puzzle.instructions);console.log(v.puzzle.legend.join(' | '));for(let row=0;row<v.puzzle.tiles.length;row+=v.puzzle.width)console.log(v.puzzle.tiles.slice(row,row+v.puzzle.width).map((x:number|null,i:number)=>`${row+i}:${x===null?'?':x}`).join('  '));console.log(t('cli.puzzle.status',{moves:v.puzzle.movesLeft,score:v.puzzle.score,money:v.puzzle.reward.money,points:v.puzzle.reward.points}));}
 if(v.recap)for(const j of v.recap)console.log(j.text);
 if(v.ending)console.log([v.ending.threatText,v.ending.institutionText,v.ending.relationshipText,v.ending.viragText].join('\n'));
 if(r.id==='journal')console.log(JSON.stringify({evidence:v.evidence,journal:v.journal,bonds:v.bonds},null,2));
 if(r.id==='shop')console.log(JSON.stringify({shop:v.gifts.shop,inventory:v.gifts.inventory,notes:v.gifts.notes},null,2));
 if(r.id==='replies'||v.gifts.replies.some((h:any)=>!h.read))for(const h of v.gifts.replies)console.log(`${h.girl} — ${h.item}: ${h.reaction}\n[portrait] ${h.portrait.description}`);
 v.actions.forEach((a:any,i:number)=>console.log(`${i+1}. ${a.label} — ${JSON.stringify(a.action)}`));
}
function humanRequest(line:string,session:Session){
 const parts=line.match(/"(?:[^"\\]|\\.)*"|[^\s]+/g)?.map(p=>p.startsWith('"')?JSON.parse(p):p)??[];
 let [cmd,...args]=parts;if(!cmd)cmd='look';
 const base={id:cmd,expectedRevision:session.revision};
 if(/^\d+$/.test(cmd)||cmd==='choose'){
  const n=Number(cmd==='choose'?args[0]:cmd),view=session.execute({cmd:'look'}).view;
  return {...base,cmd:'act',action:view?.actions[n-1]?.action};
 }
 if(cmd==='locale')return {...base,cmd,locale:args[0]};
 if(cmd==='new')return {...base,cmd,name:args.filter(x=>x!=='--replace').join(' '),replace:args.includes('--replace')};
 if(['scene','choice','direction','buy'].includes(cmd))return {...base,cmd:'act',action:{type:cmd,id:args[0]}};
 if(cmd==='continue')return {...base,cmd:'act',action:{type:'choice',id:'continue'}};
 if(cmd==='rest'||cmd==='job')return {...base,cmd:'act',action:{type:'activity',kind:cmd==='rest'?'rest':args[0]}};
 if(cmd==='tile')return {...base,cmd:'act',action:{type:'tile',index:Number(args[0])}};
 if(cmd==='gift')return {...base,cmd:'act',action:{type:'gift',girl:args[0],id:args[1],note:args[2]??'noticed',delivery:args[3]??'inPerson'}};
 if(['advance','claim','next-pair','cancel-job','read-replies'].includes(cmd))return {...base,cmd:'act',action:{type:cmd}};
 if(['import','export','transcript','findings'].includes(cmd))return {...base,cmd,path:args[0],replace:args.includes('--replace')};
 if(cmd==='inspect')return {...base,cmd,sceneId:args[0]};
 if(cmd==='note')return {...base,cmd,category:args[0],suggestion:args.slice(1).join(' ')};
 return {...base,cmd};
}
export async function main(argv=process.argv.slice(2)){
 let file:LockedSave|undefined;
 try{
  const options=new Set(['--json','--author','--help','--version']);let path:string|undefined,limit=10000,locale:Locale=DEFAULT_LOCALE;
  for(let i=0;i<argv.length;i++)if(argv[i]==='--save')path=argv[++i];else if(argv[i]==='--locale'){const value=argv[++i];if(!isLocale(value))throw new Error('--locale must be hu or en.');locale=value;}else if(argv[i]==='--max-commands')limit=Number(argv[++i]);else if(!options.has(argv[i]))throw new Error('Unknown option: '+argv[i]);
  if(argv.includes('--help')){console.log('Ligetvár CLI: --save PATH [--json] [--author] [--locale hu|en] [--max-commands N]\n'+Object.values(HELP).join('\n'));return;}
  if(argv.includes('--version')){console.log(`Ligetvár ${GAME_VERSION}; CLI protocol ${PROTOCOL_VERSION}`);return;}
  if(!path||!Number.isSafeInteger(limit)||limit<1)throw new Error('--save PATH and a positive command limit are required.');
  file=new LockedSave(path);const json=argv.includes('--json');
  let buildId:string|null=null;try{buildId=execFileSync('git',['rev-parse','HEAD'],{cwd:fileURLToPath(new URL('../../..',import.meta.url)),encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim();if(execFileSync('git',['status','--porcelain','--untracked-files=no'],{cwd:fileURLToPath(new URL('../../..',import.meta.url)),encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim())buildId+='-dirty';}catch{/* A source archive need not have Git. */}
  const session=new Session(file,argv.includes('--author'),buildId,locale);
  let lastVisuals='';
  const output=(response:ReturnType<Session['execute']>&{error?:unknown})=>{if(json)console.log(JSON.stringify(response));else{const signature=JSON.stringify(response.view?.assets??[]);printHuman(response,signature!==lastVisuals||response.id==='look');lastVisuals=signature;}};
  const initial=file.read()===null?session.execute({cmd:'look',id:'ready'}):session.execute({cmd:'load',id:'ready',expectedRevision:0});output(initial);
  const input=createInterface({input:process.stdin,output:json?undefined:process.stdout,terminal:!json&&!!process.stdin.isTTY});
  const stop=()=>{input.close();file?.close();process.exitCode=130;};process.once('SIGINT',stop);process.once('SIGTERM',stop);
  if(!json&&process.stdin.isTTY){input.setPrompt('ligetvar> ');input.prompt();}
  let count=0;
  try{for await(const line of input){
   if(!line.trim())continue;
   if(++count>limit){output({...session.execute({cmd:'look',id:'limit'}),ok:false,error:{code:'COMMAND_LIMIT',message:'Command budget exhausted; saved state is intact.'}});process.exitCode=3;break;}
   try{
    if(Buffer.byteLength(line,'utf8')>1000000)throw new Error('Input exceeds 1 MB.');
    const request=json?JSON.parse(line):humanRequest(line,session);const response=session.execute(request);output(response);
    if(request?.cmd==='quit'&&response.ok)break;
   }catch(error){output({...session.execute({cmd:'look'}),ok:false,error:{code:'BAD_INPUT',message:error instanceof Error?error.message:'Invalid input'}});}
   if(!json&&process.stdin.isTTY)input.prompt();
  }}finally{input.close();process.removeListener('SIGINT',stop);process.removeListener('SIGTERM',stop);}
 }catch(error){console.error(error instanceof Error?error.message:String(error));process.exitCode=2;}finally{file?.close();}
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))await main();
