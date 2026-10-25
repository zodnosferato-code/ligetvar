/** Build only parameters advertised by the selected Venice models. */
export function imageRequest(asset,images,request,models){
 const model=asset.method==='generate'?request.generationModel:request.editModel;
 const selected=models.find(m=>m.id===model);if(!selected)throw new Error('Configured Venice model unavailable: '+model);
 const limits=selected.model_spec?.constraints??selected.constraints??{};
 if(asset.prompt.length>(limits.promptCharacterLimit??7500))throw new Error('Prompt exceeds model limit: '+asset.id);
 const nativeAlpha=asset.transparent&&limits.supportsTransparentBackground===true;
 const shared={prompt:asset.prompt,safe_mode:true};
 if(nativeAlpha)shared.transparent_background=true;
 if(limits.aspectRatios){
  let ratio=asset.aspect;
  if(!limits.aspectRatios.includes(ratio)){
   const preferred=['auto','3:4','2:3','4:3','1:1','9:16'];
   ratio=preferred.find(r=>limits.aspectRatios.includes(r))||limits.aspectRatios[0];
   console.log('Aspect',asset.aspect,'unsupported on',model+'; using',ratio,'for',asset.id);
  }
  shared.aspect_ratio=ratio;
 }
 if(limits.resolutions?.includes(request.resolution))shared.resolution=request.resolution;
 if(limits.qualities?.includes(request.quality))shared.quality=request.quality;
 if(asset.method==='generate'){
  if(!limits.aspectRatios){
   const sizes={'4:5':[1024,1280],'16:9':[1280,720],'3:2':[1152,768],'3:4':[1024,1365],'2:3':[1024,1536],'4:3':[1365,1024],'1:1':[1024,1024],'9:16':[720,1280]};
   const [width,height]=sizes[asset.aspect]??sizes['4:5'];
   if(!width||!height)throw new Error('No supported pixel size: '+asset.id);
   const divisor=limits.widthHeightDivisor??1;if(width%divisor||height%divisor)throw new Error('Pixel size violates model divisor');
   Object.assign(shared,{width,height});
  }
  if(limits.steps)shared.steps=limits.steps.default;
  return {model,backgroundRemove:asset.transparent&&!nativeAlpha,endpoint:'/image/generate',body:{...shared,model,format:'png',return_binary:false,variants:1,hide_watermark:true,embed_exif_metadata:false,negative_prompt:'chibi, child, loli, baby, multiple girls, multiple people, character sheet, reference sheet, turnaround, comic, panels, grid, border, ornament, text, Japanese text, Chinese text, watermark, signature, pixel art, photorealistic, lowres, blurry, extra limbs'}};
 }
 if(images.length!==asset.refs.length||!images.length)throw new Error('Missing input references: '+asset.id);
 const body={...shared,output_format:'png'};
 return asset.method==='edit'?{model,backgroundRemove:asset.transparent&&!nativeAlpha,endpoint:'/image/edit',body:{...body,model,image:images[0]}}:{model,backgroundRemove:asset.transparent&&!nativeAlpha,endpoint:'/image/multi-edit',body:{...body,modelId:model,images}};
}
