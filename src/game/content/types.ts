import type {PuzzleState} from './puzzles.ts';
import type {GiftReceipt} from './gifting.ts';
import type {GameState as CoreState,ActivityPeriod} from '../engine/types.ts';
export const GIRLS=['rebeka','boglarka','greta'] as const;
export type GirlId=typeof GIRLS[number];
export type ActorId=GirlId|'marton'|'soma'|'denes'|'julia'|'aron'|'lilla'|'narrator';
export type BondId='marton_rebeka'|'marton_boglarka'|'marton_greta'|'rebeka_boglarka';
export type RouteId='friendship'|GirlId|'triad';
export type LocationId='classroom'|'library'|'department'|'holdkor'|'courtyard'|'apartment'|'bekas'|'chamber';
export type Expression='neutral'|'amused'|'displeased'|'vulnerable'|'affectionate';
export const SAVE_KEY='ligetvar-save-v3';
export interface Requirements { scenes?:string[]; evidence?:string[]; decisions?:string[]; notDecisions?:string[]; directions?:RouteId[]; anyOf?:Requirements[] }
export interface Effect { bonds?:Partial<Record<BondId,number>>; decisions?:string[]; preparation?:string[]; exposure?:number; direction?:RouteId; disclosure?:'public'|'limited'|'private' }
export interface Choice { requires?:Requirements; id:string; text:string; next?:string; effect?:Effect; reaction:string }
export interface Line { id:string; speaker:ActorId; expression:Expression; text:string; next?:string; choices?:Choice[] }
export interface Scene {
 cost?:{money:number;points:number};
 periods?:readonly ActivityPeriod[];
 id:string; title:string; kind:'shared'|'relationship'|'preparation'|'conversation'; week:number; deadline:number;
 participants:ActorId[]; location:LocationId; background:LocationId; lighting:'day'|'evening'|'night';
 requires:Requirements; evidence:string[]; journal:string; entry:string; lines:Line[]; onComplete?:Effect; contentStatus:'authored'|'fixture';
 resolution?:'confrontation'|'institution';
}
export type Registry=Record<string,Scene>;
export interface Evidence { id:string; text:string; scene:string }
export interface SceneCursor { id:string; line:string; pending:Effect[] }
export interface WitnessedDecision { scene:string; week:number }
export interface Ending {
 threat:'resolved'|'pending'; cost:'supported'|'exhausting'|null;
 institution:'acknowledged'|'incomplete'|'suppressed'|null;
 relationship:'triad'|GirlId|'friendship'|'unresolved'|'estranged'|null;
}
export interface GameState extends CoreState {
 puzzle:PuzzleState|null; giftHistory:GiftReceipt[];
 version:3; name:string; week:number; slot:0|1|2|3; phase:'planner'|'scene'|'summary'|'ending'|'minigame';
 scene:SceneCursor|null; minigame:'recycling'|'archive'|null; money:number; energy:number; exposure:number;
 bonds:Record<BondId,number>; direction:RouteId; decisions:Record<string,WitnessedDecision>;
 evidence:Record<string,WitnessedDecision>; completed:Record<string,number>; preparation:string[];
 disclosure:'public'|'limited'|'private'; inventory:Record<string,number>; giftsWeek:GirlId[];
 journal:{scene:string;week:number;text:string}[];
 confrontation:Ending['cost']; institution:Ending['institution']; lastNote:string;
}
