/** Bind the current save format to the campaign's schema checks. */
import * as codec from '../engine/save.ts';
import {RULES} from './rules.ts';
import type {GameState,Registry} from './types.ts';
export type {StorageLike} from '../engine/save.ts';
export const decodeSave=(raw:string|null,r:Registry)=>codec.decodeSave(raw,r,RULES);
export const readSave=(storage:codec.StorageLike,r:Registry)=>codec.readSave(storage,r,RULES);
export const persist=(storage:codec.StorageLike,s:GameState)=>codec.persist(storage,s,RULES);
