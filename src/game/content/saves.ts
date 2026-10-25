/** Campaign save envelope, discovery and user-facing load feedback. No migrations. */
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
export function saveMessage(result:SaveResult):string{
 if(result.status==='unsupported'){
  const saved=result.saved.gameVersion??'ismeretlen játékverzió';
  const format=result.saved.saveSchemaVersion??result.saved.legacyVersion;
  const versions=`Mentés: ${saved}${format?` (formátum: ${format})`:''}. Jelenlegi játék: ${result.current.gameVersion}.`;
  return result.reason==='newer'?`${versions} A mentés újabb, nem támogatott formátumot vagy történetverziót használ. A folytatáshoz megfelelő játékverzió szükséges. A mentést nem módosítottuk.`:`${versions} Egy nem kompatibilis frissítés miatt ez a mentés már nem használható. Kezdj új félévet. A mentést nem módosítottuk.`;
 }
 if(result.status==='invalid')return 'A mentés sérült vagy hiányos; nem töltöttük be és nem módosítottuk. Új félévet indíthatsz.';
 if(result.status==='unavailable')return 'A böngésző mentéstárhelye nem érhető el. Ellenőrizd a tárhelyengedélyeket; a mentést nem módosítottuk.';
 if(result.status==='missing')return 'Nincs folytatható mentés.';
 return '';
}
