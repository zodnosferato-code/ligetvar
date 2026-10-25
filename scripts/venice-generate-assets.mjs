// Venice-only production runner. Credentials stay in server-side environment variables.
import {readFile,mkdir,writeFile,rename} from 'node:fs/promises';
import {resolve,dirname,join,relative} from 'node:path';
import {createHash} from 'node:crypto';
import {ASSETS,orderedAssets} from './venice/catalog.mjs';
import {imageRequest} from './venice/profile.mjs';
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
if(manifest.runs.some(r=>r.failure?.includes('/image/background-remove failed: HTTP 403'))){manifest.capabilities??={};manifest.capabilities.backgroundRemove={available:false,httpStatus:403};}
async function checkpoint(){const path=join(ROOT,'manifest.json');await writeFile(path+'.tmp',JSON.stringify(manifest,null,2)+'\n');await rename(path+'.tmp',path);}
async function reference(ref){
 const path=ref.startsWith('repo:')?resolve(ref.slice(5)):resolve(ROOT,ASSETS.find(a=>a.id===ref)?.file??'missing');
 if(ref.startsWith('repo:')&&!path.startsWith(resolve('assets/backgrounds')+'/')&&!path.startsWith(resolve('assets/references')+'/')&&!path.startsWith(resolve('assets/characters')+'/'))throw new Error('Repository reference must be a background, reference or character image');
 if(!ref.startsWith('repo:')&&!path.startsWith(ROOT+'/'))throw new Error('Invalid generated reference path');
 const bytes=await readFile(path);if(bytes.length>=25*1024*1024)throw new Error('Reference exceeds Venice input size');
 return {id:ref,sha256:digest(bytes),base64:bytes.toString('base64')};
}
let key;
async function call(endpoint,body){
 const res=await fetch(BASE+endpoint,{method:body?'POST':'GET',headers:{Authorization:'Bearer '+key,...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(240000)});
 if(!res.ok){await res.body?.cancel();const error=new Error('Venice '+endpoint+' failed: HTTP '+res.status);error.httpStatus=res.status;throw error;}
 const blurred=res.headers.get('x-venice-is-blurred')==='true';
 if(blurred)console.log('Venice returned a blurred image; accepting for review:',endpoint);
 res.blurred=blurred;
 return res;
}
try{
 key=process.env.IMAGE_GENERATOR_KEY;if(!key)throw new Error('IMAGE_GENERATOR_KEY is missing from the trusted runtime');
 const models=await (await call('/models?type=all')).json();
 const available=(models.data??[]).filter(m=>m.type==='image'||m.type==='inpaint');
 await writeFile(join(ROOT,'available-models.json'),JSON.stringify({checkedAt:new Date().toISOString(),models:available.map(m=>({id:m.id,type:m.type,model_spec:m.model_spec??null}))},null,2)+'\n');
 console.log('Available image/edit model IDs:',available.map(m=>m.id).join(', '));
 if(request.phase==='models'){run.status='completed';run.finishedAt=new Date().toISOString();await checkpoint();console.log('Model inventory saved; no image generation requested.');process.exit(0);}
 const find=id=>{const m=models.data?.find(m=>m.id===id);if(!m)throw new Error('Configured Venice model unavailable: '+id);return m;};
 const gen=find(request.generationModel),edit=find(request.editModel);
 const constraints=m=>m.model_spec?.constraints??m.constraints??{};
 // Validate every prompt and parameter before any billable request.
 for(const a of selected)imageRequest(a,a.refs.map(()=>'<validated-at-runtime>'),request,available);
 // Persist only model specifications and non-sensitive request metadata, never HTTP responses/headers.
 await writeFile(join(ROOT,'models.json'),JSON.stringify({checkedAt:new Date().toISOString(),models:[gen,edit].map(m=>({id:m.id,type:m.type,model_spec:m.model_spec??null}))},null,2)+'\n');
 if(request.phase==='refine'){
  const fixes=request.refinements??[];
  if(!fixes.length||fixes.length>request.maxNewImages)throw new Error('Refinement budget mismatch');
  for(const fix of fixes){
   const a=ASSETS.find(a=>a.id===fix.asset),previous=manifest.assets[fix.asset];if(!a||!previous)throw new Error('Missing refinement asset: '+fix.asset);
   if(previous.refinements?.some(r=>r.request===request.id)){run.reused.push(fix.asset);continue;}
   const path=join(ROOT,a.file),input=await readFile(path),inputHash=digest(input);
   if(inputHash!==fix.expectedSha256||inputHash!==previous.sha256)throw new Error('Refinement source changed: '+fix.asset);
   const revision=join(ROOT,'revisions',fix.asset,inputHash+'.png');await mkdir(dirname(revision),{recursive:true});await writeFile(revision,input);
   await writeFile(revision+'.json',JSON.stringify(previous,null,2)+'\n');
   const prepared=imageRequest({...a,method:'edit',refs:['reviewed-source'],prompt:fix.prompt},[input.toString('base64')],request,available);
   console.log('Refining reviewed candidate:',fix.asset);
   const res=await call(prepared.endpoint,prepared.body);const bytes=Buffer.from(await res.arrayBuffer()),info=pngInfo(bytes),sha256=digest(bytes);
   await writeFile(path,bytes);
   manifest.assets[fix.asset]={...previous,...info,sha256,bytes:bytes.length,status:a.transparent?'candidate-needs-alpha-and-visual-review':'candidate-awaiting-visual-review',refinements:[...(previous.refinements??[]),{request:request.id,model:prepared.model,prompt:fix.prompt,inputSha256:inputHash,outputSha256:sha256,createdAt:new Date().toISOString()}]};
   run.generated.push(fix.asset);await checkpoint();
  }
  run.status='completed-with-pending-review';run.finishedAt=new Date().toISOString();await checkpoint();console.log('Refinement candidates saved.');process.exit(0);
 }
 for(const a of selected){
  const refs=await Promise.all(a.refs.map(reference));
  const prepared=imageRequest(a,refs.map(r=>r.base64),request,available);
  const {model,endpoint,body,backgroundRemove}=prepared;
  const parameters={...body};delete parameters.image;delete parameters.images;
  const spec={id:a.id,model,method:a.method,prompt:a.prompt,refs:refs.map(({id,sha256})=>({id,sha256})),parameters,transparent:a.transparent,postprocess:backgroundRemove?'/image/background-remove':null};
  const signature=digest(JSON.stringify(spec));const previous=manifest.assets[a.id];
  if(previous){
   const existing=await readFile(join(ROOT,a.file));
   if(previous.signature!==signature||previous.sha256!==digest(existing))throw new Error('Existing candidate changed or has a different prompt/reference signature: '+a.id);
   run.reused.push(a.id);console.log('Reusing verified candidate:',a.id);continue;
  }
  if(run.generated.length>=request.maxNewImages)throw new Error('Explicit new-image budget reached before '+a.id);
  console.log('Generating',a.id,'with',model,'references:',refs.map(r=>r.id).join(', ')||'none');
  // Preserve raw billed output before alpha extraction so a failed extraction can resume without regenerating it.
  const rawPath=join(ROOT,'raw',a.id+'.png'),rawMeta=join(ROOT,'raw',a.id+'.json');
  let bytes,rawRecord;
  try{
   rawRecord=JSON.parse(await readFile(rawMeta,'utf8'));bytes=await readFile(rawPath);
   if(rawRecord.signature!==signature||rawRecord.sha256!==digest(bytes)){
    console.log('Raw signature stale for',a.id,'(prompt/model/refs changed); regenerating');
    bytes=null;
   }
  }catch(e){if(e.code!=='ENOENT')throw e;bytes=null;}
  let blurred=false;
  if(!bytes){
   const res=await call(endpoint,body);
   blurred=!!res.blurred;
   if(res.headers.get('content-type')?.includes('json')){
    const result=await res.json(),encoded=result.images?.[0];
    if(typeof encoded!=='string'||!encoded)throw new Error('Venice returned no base64 image for '+a.id);
    bytes=Buffer.from(encoded.replace(/^data:image\/[^;]+;base64,/,''),'base64');
   }else bytes=Buffer.from(await res.arrayBuffer());
   pngInfo(bytes);await mkdir(dirname(rawPath),{recursive:true});await writeFile(rawPath,bytes);await writeFile(rawMeta,JSON.stringify({signature,sha256:digest(bytes),model,blurred,createdAt:new Date().toISOString()},null,2)+'\n');
  }else console.log('Reusing billed raw output:',a.id);
  let alphaPending=false;
  if(backgroundRemove){
   if(manifest.capabilities?.backgroundRemove?.available===false)alphaPending=true;
   else try{console.log('Extracting alpha through Venice:',a.id);const extracted=await call('/image/background-remove',{image:bytes.toString('base64')});bytes=Buffer.from(await extracted.arrayBuffer());}
   catch(e){if(e.httpStatus!==403)throw e;manifest.capabilities??={};manifest.capabilities.backgroundRemove={available:false,httpStatus:403};alphaPending=true;console.log('Venice alpha endpoint unavailable; preserving opaque candidate for review.');}
  }
  const image=pngInfo(bytes);
  if(a.transparent&&!image.alphaChannel&&!alphaPending)throw new Error('Portrait has no alpha channel: '+a.id);
  const output=resolve(ROOT,a.file);if(!output.startsWith(ROOT+'/'))throw new Error('Invalid output path');
  await mkdir(dirname(output),{recursive:true});await writeFile(output,bytes);
  manifest.assets[a.id]={...spec,file:a.file,signature,sha256:digest(bytes),bytes:bytes.length,...image,status:(blurred?'candidate-blurred-awaiting-review':(alphaPending?'candidate-needs-alpha-and-visual-review':'candidate-awaiting-visual-review')),generatedAt:new Date().toISOString(),request:request.id};
  run.generated.push(a.id);await checkpoint();console.log('Saved candidate:',relative(process.cwd(),output),image.width+'x'+image.height);
 }
 run.status=run.generated.some(id=>manifest.assets[id].status.includes('needs-alpha'))?'completed-with-pending-alpha':'completed';run.finishedAt=new Date().toISOString();await checkpoint();
 console.log('Completed:',run.generated.length,'new images,',run.reused.length,'reused. Candidates await visual review.');
}catch(e){
 // Errors are deliberately limited to our messages, status codes and asset IDs. Never dump request bodies or provider responses.
 run.status='failed';run.finishedAt=new Date().toISOString();run.failure=String(e.message).replaceAll(key??'__no_key__','[redacted]');await checkpoint();console.error(run.failure);process.exitCode=1;
}
