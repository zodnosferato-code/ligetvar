/** Content-owned references; the reducer continues to receive source-language strings. */
import {DEFAULT_LOCALE,translate,type Locale,type MessageKey} from './localization.ts';
import type {Line,Scene} from './types.ts';
export interface TextReference {text:string;textKey:MessageKey}
export function message(textKey:MessageKey):TextReference{return {text:translate(textKey),textKey};}
export function sceneTitle(scene:Scene,locale:Locale=DEFAULT_LOCALE):string{
 return scene.titleKey?translate(scene.titleKey,{},locale):scene.title;
}
export function presentLine(line:Line,locale:Locale=DEFAULT_LOCALE):Line{
 return {...line,text:line.textKey?translate(line.textKey,{},locale):line.text,
  ...(line.choices?{choices:line.choices.map(choice=>({...choice,text:choice.textKey?translate(choice.textKey,{},locale):choice.text}))}:{})};
}
