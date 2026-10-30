/** GIF-like, offline animation assets. Planned clips never pretend to be visible artwork. */
export interface MomentClip {
 status:'planned'|'reviewed'; file:string|null; poster:string|null;
 description:string; width:number;height:number;durationMs:number;bytes:number;
}
export const MOMENT_CLIPS:Record<string,MomentClip>={
 virag_wink:{status:'reviewed',file:'animations/virag/wink-v1.webp',poster:'animations/virag/wink-poster.webp',description:'Virág félmosollyal rád néz, majd játékosan kacsint. Kék pixie frizura, fehér blúz, bordó kardigán.',width:640,height:800,durationMs:2400,bytes:355362},
 virag_arm:{status:'reviewed',file:'animations/virag/arm-v1.webp',poster:'animations/virag/arm-poster.webp',description:'Virág felajánlott karba kapaszkodik, majd mosolyogva feléz.',width:640,height:800,durationMs:1800,bytes:91510},
 virag_kiss:{status:'reviewed',file:'animations/virag/kiss-v1.webp',poster:'animations/virag/kiss-poster.webp',description:'Kölcsönösen választott rövid csók, majd mosolygó eltávolodás; játékosnézet.',width:640,height:800,durationMs:2400,bytes:31032},
 virag_cuddle:{status:'reviewed',file:'animations/virag/cuddle-v1.webp',poster:'animations/virag/cuddle-poster.webp',description:'Virág a játékos vállának dől a tóparti padon, finom hajmozdulattal.',width:640,height:800,durationMs:2400,bytes:41604},
 lilla_sensory_touch:{status:'planned',file:null,poster:null,description:'Slow deliberate hands mapping Lilla\'s neck and collarbones; warm skin, cool air, focused expression.',width:960,height:640,durationMs:2200,bytes:0},
 lilla_sensory_hold:{status:'planned',file:null,poster:null,description:'Still hold with verbal presence; Lilla\'s shoulders drop, soft post-touch expression.',width:960,height:640,durationMs:1800,bytes:0},
 julia_guided_pace:{status:'planned',file:null,poster:null,description:'Júlia in partial professional attire directing pace and breath; calm precise gesture.',width:960,height:640,durationMs:2000,bytes:0},
 julia_guided_hold:{status:'planned',file:null,poster:null,description:'Quiet hold after instruction; Júlia\'s clinical tone softens, one hand resting.',width:960,height:640,durationMs:1600,bytes:0}
};
export function validateClip(clip:MomentClip):void{
 if(!clip.description.trim()||!Number.isInteger(clip.width)||!Number.isInteger(clip.height)||clip.width<1||clip.height<1||clip.width>1280||clip.height>1280||clip.durationMs<500||clip.durationMs>4000)throw new Error('Invalid moment metadata');
 const safe=(p:string)=>/^animations\/[a-z0-9_/-]+\.(webp|gif|png)$/.test(p)&&!p.includes('..');
 if(clip.status==='reviewed'){
  if(!clip.file||!clip.poster||!safe(clip.file)||!safe(clip.poster)||! /\.(webp|gif)$/.test(clip.file)||clip.file===clip.poster||!Number.isInteger(clip.bytes)||clip.bytes<=0||clip.bytes>1_500_000)throw new Error('Invalid reviewed moment files/budget');
 }else if(clip.file!==null||clip.poster!==null||clip.bytes!==0)throw new Error('Planned moment must not publish files');
}
export function momentSource(clip:MomentClip,paused:boolean,reducedMotion:boolean):string|null{
 return clip.status==='reviewed'?(paused||reducedMotion?clip.poster:clip.file):null;
}
