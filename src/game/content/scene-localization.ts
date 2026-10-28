/** Content-owned presentation and persisted message references. */
import {catalogs,DEFAULT_LOCALE,translate,type Locale,type MessageKey} from './localization.ts';
import type {Line,Scene} from './types.ts';
export interface TextReference {text:string;textKey:MessageKey}
// Authoring retains templates; chosen names are supplied only at presentation time.
export function message(textKey:MessageKey):TextReference{return {text:catalogs.hu[textKey],textKey};}
export function playerText(text:string,name:string):string{
 return text.replace(/\{playerName\}/g,()=>name);
}
const REFERENCE='@message:';
export function storedMessage(key:MessageKey):string{return REFERENCE+key;}
export function validStoredText(text:string):boolean{
 return !text.startsWith(REFERENCE)||Object.hasOwn(catalogs.en,text.slice(REFERENCE.length));
}
export function presentText(text:string,name:string,locale:Locale=DEFAULT_LOCALE):string{
 if(text.startsWith(REFERENCE)){
  const key=text.slice(REFERENCE.length) as MessageKey;
  if(!Object.hasOwn(catalogs.en,key))throw new Error('Unknown stored message: '+key);
  return translate(key,{playerName:name},locale);
 }
 return playerText(text,name);
}
export function sceneTitle(scene:Scene,locale:Locale=DEFAULT_LOCALE):string{
 return scene.titleKey?translate(scene.titleKey,{},locale):scene.title;
}
export function presentLine(line:Line,locale:Locale=DEFAULT_LOCALE,name?:string):Line{
 const render=(text:string,key?:MessageKey)=>{
  const template=key?catalogs[locale][key]:text;
  // Standalone author inspection may retain the variable; runtime always supplies a name.
  return name===undefined?template:playerText(template,name);
 };
 return {...line,text:render(line.text,line.textKey),
  ...(line.choices?{choices:line.choices.map(choice=>({...choice,text:render(choice.text,choice.textKey),reaction:name===undefined?choice.reaction:presentText(choice.reaction,name,locale)}))}:{})};
}
