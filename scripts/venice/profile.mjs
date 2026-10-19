/** Build only parameters advertised by the selected Venice models. */
export function imageRequest(asset,images,request,models){
 const model=asset.method==='generate'?request.generationModel:request.editModel;
 const selected=models.find(m=>m.id===model);if(!selected)throw new Error('Configured Venice model unavailable: '+model);
 const limits=selected.model_spec?.constraints??selected.constraints??{};
 if(asset.prompt.length>(limits.promptCharacterLimit??7500))throw new Error('Prompt exceeds model limit: '+asset.id);
 const nativeAlpha=asset.transparent&&limits.supportsTransparentBackground===true;
 const shared={prompt:asset.prompt,safe_mode:true};
 if(nativeAlpha)shared.transparent_background=true;
 if(limits.aspectRatios){if(!limits.aspectRatios.includes(asset.aspect))throw new Error('Unsupported aspect ratio: '+asset.id);shared.aspect_ratio=asset.aspect;}
 if(limits.resolutions?.includes(request.resolution))shared.resolution=request.resolution;
 if(limits.qualities?.includes(request.quality))shared.quality=request.quality;
 if(asset.method==='generate'){
  if(!limits.aspectRatios){
   const [width,height]=({'4:5':[1024,1280],'16:9':[1280,720],'3:2':[1152,768]})[asset.aspect]??[];
   if(!width||!height)throw new Error('No supported pixel size: '+asset.id);
   const divisor=limits.widthHeightDivisor??1;if(width%divisor||height%divisor)throw new Error('Pixel size violates model divisor');
   Object.assign(shared,{width,height});
  }
  if(limits.steps)shared.steps=limits.steps.default;
  return {model,backgroundRemove:asset.transparent&&!nativeAlpha,endpoint:'/image/generate',body:{...shared,model,format:'png',return_binary:false,variants:1,hide_watermark:true,embed_exif_metadata:false,negative_prompt:'pixel art, photorealistic, chibi, child, text, watermark, signature, lowres, blurry, extra limbs, duplicate people'}};
 }
 if(images.length!==asset.refs.length||!images.length)throw new Error('Missing input references: '+asset.id);
 const body={...shared,output_format:'png'};
 return asset.method==='edit'?{model,backgroundRemove:asset.transparent&&!nativeAlpha,endpoint:'/image/edit',body:{...body,model,image:images[0]}}:{model,backgroundRemove:asset.transparent&&!nativeAlpha,endpoint:'/image/multi-edit',body:{...body,modelId:model,images}};
}
