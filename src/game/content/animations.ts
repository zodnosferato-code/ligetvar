/** GIF-like, offline animation assets. Planned clips never pretend to be visible artwork. */
export interface MomentClip {
 status:'planned'|'reviewed'; file:string|null; poster:string|null;
 description:string; width:number;height:number;durationMs:number;bytes:number;
}
export const MOMENT_CLIPS:Record<string,MomentClip>={
 virag_arm:{status:'planned',file:null,poster:null,description:'Virág felajánlott karba kapaszkodik, majd mosolyogva felnéz.',width:640,height:800,durationMs:1800,bytes:0},
 virag_kiss:{status:'planned',file:null,poster:null,description:'Kölcsönösen választott rövid csók, majd mosolygó eltávolodás; játékosnézet.',width:960,height:640,durationMs:2400,bytes:0},
 virag_cuddle:{status:'planned',file:null,poster:null,description:'Virág a játékos vállának dől a tóparti padon, finom hajmozdulattal.',width:960,height:640,durationMs:2400,bytes:0}
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
