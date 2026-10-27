/** Explicit locale, shared by browser and CLI; never mutate game state to translate. */
import {hu} from './locales/hu.ts';
import {en} from './locales/en.ts';
export type Locale='hu'|'en';
export type MessageKey=keyof typeof hu;
export const DEFAULT_LOCALE:Locale='hu';
export const catalogs={hu,en};
export function placeholders(message:string):string[]{
 return [...new Set([...message.matchAll(/\{([A-Za-z][A-Za-z0-9_]*)\}/g)].map(match=>match[1]))].sort();
}
export function translate(key:MessageKey,params:Record<string,string|number>={},locale:Locale=DEFAULT_LOCALE):string{
 const message=catalogs[locale][key];
 return message.replace(/\{([A-Za-z][A-Za-z0-9_]*)\}/g,(_,name:string)=>{
  if(!Object.hasOwn(params,name))throw new Error('Missing translation parameter: '+key+'.'+name);
  return String(params[name]);
 });
}
