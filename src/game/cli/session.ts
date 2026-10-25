import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {RELEASE} from '../release.ts';
import {SCENES} from '../content/catalog.ts';
import {createInitial} from '../content/runtime.ts';
import {applyAction,isGameAction} from '../content/actions.ts';
import {gameView} from '../content/view.ts';
import {decodeSave,encodeSave,saveMessage} from '../content/saves.ts';
import type {GameState} from '../content/types.ts';
import {writeNewFile,type SaveFile} from './files.ts';
export const PROTOCOL_VERSION=1;
export const HELP={
 gameplay:'new [name], look, actions, choose <number>, scene <id>, choice <id>, continue, direction <id>, rest, job <recycling|archive>, tile <zero-based index>, next-pair, claim, cancel-job, buy <gift-id>, gift <girl> <gift-id> <note> <remote|inPerson>, read-replies, advance',
 inspection:'journal, replies, shop, ending, coverage',
 files:'save, load, import <path>, export <new-path>, transcript <new-path>, findings <new-path>',
 proofreading:'note <category> <suggested correction>; author-only: catalog, inspect <scene-id>',
 other:'help, quit; new and import require replace:true in JSON (or --replace in text) to replace an existing game.',
 machine:'One JSON object per line: {id,cmd,expectedRevision?,action?,...}. Use cmd:act with a GameAction. Mutations new/act/load/import require expectedRevision from the last response. All output includes protocolVersion, release, revision, ok and view. Game text is Hungarian; command names are English.',
};
interface Request {id?:string|number;cmd:string;expectedRevision?:number;[key:string]:unknown}
interface Finding {sceneId:string;lineId:string|null;choiceId?:string;category:string;observedText:string;suggestion:string;source:'played'|'author';gameVersion:string}
export class Session {
 private state:GameState|null=null;
 revision=0;author:boolean;file:SaveFile;buildId:string|null;transcript:unknown[]=[];findings:Finding[]=[];
 private lines=new Set<string>();private observedText=new Map<string,string>();private choices=new Set<string>();private inspected=new Set<string>();private authorScene:string|null=null;
 constructor(file:SaveFile,author=false,buildId:string|null=null){this.file=file;this.author=author;this.buildId=buildId;}
 private observe(){const view=this.state?gameView(this.state):null;if(view?.scene){const id=view.scene.id+'/'+view.scene.lineId;this.lines.add(id);this.observedText.set(id,view.scene.text);}return view;}
 private response(id:Request['id'],ok:boolean,extra:Record<string,unknown>={}){
  return {id:id??null,protocolVersion:PROTOCOL_VERSION,release:RELEASE,buildId:this.buildId,revision:this.revision,mode:this.author?'author':'play',locale:'hu',ok,...extra,view:this.observe()};
 }
 private commit(state:GameState){
  const raw=encodeSave(state),valid=decodeSave(raw,SCENES);if(valid.status!=='ok')throw new Error('The action produced an invalid save.');
  this.file.write(raw);this.state=state;this.revision++;this.authorScene=null;
 }
 execute(input:unknown):ReturnType<Session['response']>{
  const q=input as Request;
  const fail=(code:string,message:string,details?:unknown)=>this.response(q?.id,false,{error:{code,message,...(details===undefined?{}:{details})}});
  if(!q||typeof q!=='object'||Array.isArray(q)||typeof q.cmd!=='string'||q.id!==undefined&&!['string','number'].includes(typeof q.id))return fail('BAD_REQUEST','Expected a JSON object with a string cmd and optional string/number id.');
  if(['new','act','load','import'].includes(q.cmd)&&q.expectedRevision!==this.revision)return fail('STALE_REVISION','Send the current expectedRevision; no state was changed.');
  const before=this.observe();let response:ReturnType<Session['response']>;
  try{
   switch(q.cmd){
    case 'help':return this.response(q.id,true,{help:HELP});
    case 'look':case 'actions':case 'journal':case 'replies':case 'shop':case 'ending':return this.response(q.id,true);
    case 'new':
     if(q.name!==undefined&&typeof q.name!=='string')return fail('BAD_REQUEST','name must be a string.');
     if((this.state||this.file.read()!==null)&&q.replace!==true)return fail('REPLACE_REQUIRED','Use replace:true to start over; the existing save was not changed.');
     this.commit(createInitial(String(q.name??'')));this.lines.clear();this.observedText.clear();this.choices.clear();break;
    case 'act':{
     if(!this.state)return fail('NO_GAME','Start a new game or load a current save.');
     if(!isGameAction(q.action))return fail('BAD_ACTION','Invalid action shape. Use the actions in the view or help.');
     const next=applyAction(this.state,q.action);
     if(next===this.state||JSON.stringify(next)===JSON.stringify(this.state))return fail('ACTION_UNAVAILABLE','That action is unavailable now (phase, prerequisites, funds, inventory or board). Use the current actions, shop and replies; no resources were spent.');
     this.commit(next);if(q.action.type==='choice'&&before?.scene)this.choices.add(before.scene.id+'/'+before.scene.lineId+'/'+q.action.id);break;
    }
    case 'load':case 'import':{
     if(q.cmd==='import'&&typeof q.path!=='string')return fail('BAD_REQUEST','path is required.');
     if(q.cmd==='import'&&(this.state||this.file.read()!==null)&&q.replace!==true)return fail('REPLACE_REQUIRED','Use replace:true to import over this session.');
     const raw=q.cmd==='load'?this.file.read():readFileSync(String(q.path),'utf8');const loaded=decodeSave(raw,SCENES);
     if(loaded.status!=='ok')return fail('SAVE_'+loaded.status.toUpperCase(),saveMessage(loaded),loaded);
     if(q.cmd==='import')this.commit(loaded.state);else{this.state=loaded.state;this.revision++;this.authorScene=null;}
     break;
    }
    case 'save':if(!this.state)return fail('NO_GAME','No active game.');this.file.write(encodeSave(this.state));return this.response(q.id,true,{saved:true});
    case 'export':case 'transcript':case 'findings':{
     if(typeof q.path!=='string'||!q.path)return fail('BAD_REQUEST','A new destination path is required.');
     if(q.cmd==='export'&&!this.state)return fail('NO_GAME','No active game.');
     const content=q.cmd==='export'?encodeSave(this.state!):JSON.stringify({protocolVersion:PROTOCOL_VERSION,release:RELEASE,buildId:this.buildId,mode:this.author?'author':'play',entries:q.cmd==='transcript'?this.transcript:this.findings},null,2);
     writeNewFile(q.path,content+'\n');return this.response(q.id,true,{written:q.path});
    }
    case 'coverage':return this.response(q.id,true,{coverage:{playedLines:[...this.lines].sort(),playedChoices:[...this.choices].sort(),inspectedScenes:[...this.inspected].sort(),scope:'this session; inspecting does not count as playing'}});
    case 'catalog':if(!this.author)return fail('AUTHOR_ONLY','Restart with --author for spoiler-filled inspection.');return this.response(q.id,true,{catalog:Object.values(SCENES).map(s=>({id:s.id,title:s.title,week:s.week,deadline:s.deadline,lines:s.lines.length})),omniscient:true});
    case 'inspect':{
     if(!this.author)return fail('AUTHOR_ONLY','Restart with --author for spoiler-filled inspection.');
     if(typeof q.sceneId!=='string'||!Object.hasOwn(SCENES,q.sceneId))return fail('BAD_REQUEST','Unknown scene ID.');
     this.authorScene=q.sceneId;this.inspected.add(q.sceneId);return this.response(q.id,true,{scene:SCENES[q.sceneId],visuals:SCENES[q.sceneId].lines.map(l=>({lineId:l.id,assets:gameView({...createInitial(''),phase:'scene',week:SCENES[q.sceneId as string].week,slot:SCENES[q.sceneId as string].periods?.[0]==='night'?2:1,scene:{id:q.sceneId as string,line:l.id,pending:[]}}).assets})),omniscient:true});
    }
    case 'note':{
     const sceneId=typeof q.sceneId==='string'?q.sceneId:before?.scene?.id??this.authorScene;
     const source=this.author&&sceneId===this.authorScene?'author':'played';
     const lineId=typeof q.lineId==='string'?q.lineId:before?.scene?.id===sceneId?before.scene.lineId:null;
     if(!sceneId||!Object.hasOwn(SCENES,sceneId))return fail('BAD_REQUEST','A current or explicitly inspected scene is required.');
     if(source==='played'&&(!lineId||!this.lines.has(sceneId+'/'+lineId)))return fail('NOT_OBSERVED','Only played lines or explicitly inspected author scenes can be annotated.');
     const line=lineId?SCENES[sceneId].lines.find(l=>l.id===lineId):null;
     if(lineId&&!line)return fail('BAD_REQUEST','Unknown line.');
     const choice=typeof q.choiceId==='string'?line?.choices?.find(c=>c.id===q.choiceId):null;
     if(q.choiceId!==undefined&&(!choice||source==='played'&&!this.choices.has(sceneId+'/'+lineId+'/'+q.choiceId)))return fail('NOT_OBSERVED','Choice not played or unknown.');
     if(typeof q.category!=='string'||typeof q.suggestion!=='string'||!q.suggestion.trim()||q.suggestion.length>10000)return fail('BAD_REQUEST','category and a non-empty suggestion (max 10000 characters) are required.');
     this.findings.push({sceneId,lineId,category:q.category,suggestion:q.suggestion,observedText:choice?.text??(source==='played'?this.observedText.get(sceneId+'/'+lineId):line?.text)??SCENES[sceneId].title,source,gameVersion:RELEASE.gameVersion,...(choice?{choiceId:choice.id}:{})});return this.response(q.id,true,{finding:this.findings.at(-1)});
    }
    case 'quit':return this.response(q.id,true,{quit:true});
    default:return fail('UNKNOWN_COMMAND','Unknown command. Use help.');
   }
   response=this.response(q.id,true);
   this.transcript.push({request:q,before,after:response,stateDigest:this.state?createHash('sha256').update(encodeSave(this.state)).digest('hex'):null});
   return response;
  }catch(error){return fail('IO_OR_STATE_ERROR',error instanceof Error?error.message:'Operation failed; no state was committed.');}
 }
}
