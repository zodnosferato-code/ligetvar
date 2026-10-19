// Venice-only production runner. Credentials stay in server-side environment variables.
import {readFile,mkdir,writeFile,rename} from 'node:fs/promises';
import {resolve,dirname,join,relative} from 'node:path';
import {createHash} from 'node:crypto';
import {ASSETS,orderedAssets} from './venice/catalog.mjs';
const BASE='https://api.venice.ai/api/v1';
const ROOT=resolve('assets/generated/venice');
const digest=b=>createHash('sha256').update(b).digest('hex');
const request=JSON.parse(await readFile('art-jobs/venice/request.json','utf8'));
const selected=orderedAssets(request.assets);
const dryRun=process.argv.includes('--dry-run');
const pngInfo=bytes=>{
 if(bytes.length<1024||bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw new Error('Response is not a valid-sized PNG image');
 const width=bytes.readUInt32BE(16),height=bytes.readUInt32BE(20),colorType=bytes[25];
 if(width<256||height<256)throw new Error('Image dimensions are unexpectedly small');
 return {width,height,colorType,alphaChannel:colorType===4||colorType===6};
};
if(!Number.isInteger(request.maxNewImages)||request.maxNewImages<1||request.maxNewImages>ASSETS.length)throw new Error('Invalid explicit generation budget');
if(dryRun){console.log(JSON.stringify({request:request.id,phase:request.phase,maxNewImages:request.maxNewImages,allAssets:ASSETS.length,selected:selected.map(a=>({id:a.id,method:a.method,refs:a.refs,file:a.file}))},null,2));process.exit(0);}
await mkdir(ROOT,{recursive:true});
let manifest={schema:1,provider:'Venice AI',assets:{},runs:[]};
try{manifest=JSON.parse(await readFile(join(ROOT,'manifest.json'),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
const run={request:request.id,phase:request.phase,startedAt:new Date().toISOString(),status:'running',generated:[],reused:[]};manifest.runs.push(run);
async function checkpoint(){const path=join(ROOT,'manifest.json');await writeFile(path+'.tmp',JSON.stringify(manifest,null,2)+'\n');await rename(path+'.tmp',path);}
async function reference(ref){
 const path=ref.startsWith('repo:')?resolve(ref.slice(5)):resolve(ROOT,ASSETS.find(a=>a.id===ref)?.file??'missing');
 if(ref.startsWith('repo:')&&!path.startsWith(resolve('assets/backgrounds')+'/'))throw new Error('Repository reference must be a background image');
 if(!ref.startsWith('repo:')&&!path.startsWith(ROOT+'/'))throw new Error('Invalid generated reference path');
 const bytes=await readFile(path);if(bytes.length>=25*1024*1024)throw new Error('Reference exceeds Venice input size');
 return {id:ref,sha256:digest(bytes),base64:bytes.toString('base64')};
}
let key;
async function call(endpoint,body){
 const res=await fetch(BASE+endpoint,{method:body?'POST':'GET',headers:{Authorization:'Bearer '+key,...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(240000)});
 if(!res.ok){await res.body?.cancel();throw new Error('Venice '+endpoint+' failed: HTTP '+res.status);}
 if(res.headers.get('x-venice-is-blurred')==='true'){await res.body?.cancel();throw new Error('Venice returned a blurred image; candidate rejected');}
 return res;
}
try{
 key=process.env.IMAGE_GENERATOR_KEY;if(!key)throw new Error('IMAGE_GENERATOR_KEY is missing from the trusted runtime');
 const models=await (await call('/models?type=all')).json();
 const find=id=>{const m=models.data?.find(m=>m.id===id);if(!m)throw new Error('Configured Venice model unavailable: '+id);return m;};
 const gen=find(request.generationModel),edit=find(request.editModel);
 const constraints=m=>m.model_spec?.constraints??m.constraints??{};
 if(selected.some(a=>a.transparent)&&[gen,edit].some(m=>constraints(m).supportsTransparentBackground===false))throw new Error('Configured Venice model does not support transparent portraits');
 // Persist only model specifications and non-sensitive request metadata, never HTTP responses/headers.
 await writeFile(join(ROOT,'models.json'),JSON.stringify({checkedAt:new Date().toISOString(),models:[gen,edit].map(m=>({id:m.id,type:m.type,model_spec:m.model_spec??null}))},null,2)+'\n');
 for(const a of selected){
  const refs=await Promise.all(a.refs.map(reference));
  const model=a.method==='generate'?request.generationModel:request.editModel;
  const spec={id:a.id,model,method:a.method,prompt:a.prompt,refs:refs.map(({id,sha256})=>({id,sha256})),aspect:a.aspect,resolution:request.resolution,quality:request.quality,transparent:a.transparent};
  const signature=digest(JSON.stringify(spec));const previous=manifest.assets[a.id];
  if(previous){
   const existing=await readFile(join(ROOT,a.file));
   if(previous.signature!==signature||previous.sha256!==digest(existing))throw new Error('Existing candidate changed or has a different prompt/reference signature: '+a.id);
   run.reused.push(a.id);console.log('Reusing verified candidate:',a.id);continue;
  }
  if(run.generated.length>=request.maxNewImages)throw new Error('Explicit new-image budget reached before '+a.id);
  console.log('Generating',a.id,'with',model,'references:',refs.map(r=>r.id).join(', ')||'none');
  let endpoint,body;
  const shared={prompt:a.prompt,aspect_ratio:a.aspect,resolution:request.resolution,quality:request.quality,safe_mode:true,transparent_background:a.transparent,enhance_prompt:false};
  if(a.method==='generate'){endpoint='/image/generate';body={...shared,model,format:'png',return_binary:false,variants:1,hide_watermark:true,embed_exif_metadata:false};}
  else if(a.method==='edit'){endpoint='/image/edit';body={...shared,model,output_format:'png',image:refs[0].base64};}
  else{endpoint='/image/multi-edit';body={...shared,modelId:model,output_format:'png',images:refs.map(r=>r.base64)};}
  const res=await call(endpoint,body);let bytes;
  if(res.headers.get('content-type')?.includes('json')){
   const result=await res.json(),encoded=result.images?.[0];
   if(typeof encoded!=='string'||!encoded)throw new Error('Venice returned no base64 image for '+a.id);
   bytes=Buffer.from(encoded.replace(/^data:image\/[^;]+;base64,/,''),'base64');
  }else bytes=Buffer.from(await res.arrayBuffer());
  const image=pngInfo(bytes);
  if(a.transparent&&!image.alphaChannel)throw new Error('Portrait has no alpha channel: '+a.id);
  const output=resolve(ROOT,a.file);if(!output.startsWith(ROOT+'/'))throw new Error('Invalid output path');
  await mkdir(dirname(output),{recursive:true});await writeFile(output,bytes);
  manifest.assets[a.id]={...spec,file:a.file,signature,sha256:digest(bytes),bytes:bytes.length,...image,status:'candidate-awaiting-visual-review',generatedAt:new Date().toISOString(),request:request.id};
  run.generated.push(a.id);await checkpoint();console.log('Saved candidate:',relative(process.cwd(),output),image.width+'x'+image.height);
 }
 run.status='completed';run.finishedAt=new Date().toISOString();await checkpoint();
 console.log('Completed:',run.generated.length,'new images,',run.reused.length,'reused. Candidates await visual review.');
}catch(e){
 // Errors are deliberately limited to our messages, status codes and asset IDs. Never dump request bodies or provider responses.
 run.status='failed';run.finishedAt=new Date().toISOString();run.failure=String(e.message).replaceAll(key??'__no_key__','[redacted]');await checkpoint();console.error(run.failure);process.exitCode=1;
}
