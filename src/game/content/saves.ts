/** Campaign save envelope, discovery and user-facing load feedback. No migrations. */
import {translate,DEFAULT_LOCALE} from './localization.ts';
import type {Locale} from './localization.ts';
import * as codec from '../engine/save.ts';
import {RULES} from './rules.ts';
import type {GameState,Registry} from './types.ts';
export type {StorageLike,SaveMetadata} from '../engine/save.ts';
export type SaveResult=codec.SaveResult<GameState>;
export const encodeSave=(s:GameState)=>codec.encodeSave(s,RULES);
export const decodeSave=(raw:string|null,r:Registry)=>codec.decodeSave(raw,r,RULES);
// Detection only, newest first. Do not load or modify these formats.
const RETIRED_KEYS=['ligetvar-save-v3','ligetvar-save-v2','ligetvar-save-v1'];
export function readSave(storage:codec.StorageLike,r:Registry):SaveResult{
 try{
  const current=storage.getItem(RULES.saveKey);
  if(current!==null)return decodeSave(current,r);
  for(const key of RETIRED_KEYS){
   const raw=storage.getItem(key);if(raw===null)continue;
   // The storage key itself establishes an unsupported historical format.
   // Parse metadata only; never revive the payload as a current save.
   let legacyVersion=Number(key.slice(-1));
   try{const parsed=JSON.parse(raw);if(Number.isSafeInteger(parsed?.version)&&parsed.version>0)legacyVersion=parsed.version;}catch{/* It remains an unusable historical slot. */}
   return {status:'unsupported',reason:'pre_envelope',saved:{legacyVersion},current:RULES.saveVersions};
  }
  return {status:'missing'};
 }catch{return {status:'unavailable'};}
}
export const persist=(storage:codec.StorageLike,s:GameState)=>codec.persist(storage,s,RULES);
export function saveMessage(result:SaveResult,locale:Locale=DEFAULT_LOCALE):string{
 if(result.status==='unsupported'){
  const saved=result.saved.gameVersion??translate('save.unknownVersion',{},locale);
  const format=result.saved.saveSchemaVersion??result.saved.legacyVersion;
  const versions=translate('save.versions',{saved,format:format?translate('save.format',{format},locale):'',current:result.current.gameVersion},locale);
  return translate(result.reason==='newer'?'save.newer':'save.incompatible',{versions},locale);
 }
 if(result.status==='invalid')return translate('save.invalid',{},locale);
 if(result.status==='unavailable')return translate('save.unavailable',{},locale);
 if(result.status==='missing')return translate('save.missing',{},locale);
 return '';
}
