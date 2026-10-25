/** Story-agnostic runtime contracts. IDs and rules are supplied by content. */
export type ActivityPeriod='day'|'night';
export interface Schedule { slots:Partial<Record<0|1|2,ActivityPeriod>>; activities:Record<string,readonly ActivityPeriod[]> }
export type ActorId=string;
export type BondId=string;
export type RouteId=string;
export type LocationId=string;
export type Expression='neutral'|'amused'|'displeased'|'vulnerable'|'affectionate';
export interface Requirements { scenes?:string[]; evidence?:string[]; decisions?:string[]; notDecisions?:string[]; directions?:string[]; anyOf?:Requirements[] }
export interface Effect { bonds?:Record<string,number|undefined>; decisions?:string[]; preparation?:string[]; exposure?:number; direction?:string }
export interface SceneStage { label:string; location:LocationId; background:LocationId; participants:ActorId[]; lighting?:'day'|'evening'|'night'; proximity:'apart'|'beside'|'close' }
export interface Choice { localRequires?:string[]; requires?:Requirements; id:string; text:string; next?:string; effect?:Effect; reaction:string }
export interface Line { stage?:string; id:string; speaker:string; expression:Expression; text:string; next?:string; choices?:Choice[] }
export interface Scene {
 stages?:Record<string,SceneStage>;
 cost?:{money:number;points:number};
 id:string; title:string; kind:'shared'|'relationship'|'preparation'|'conversation'; week:number; deadline:number;
 periods?:readonly ActivityPeriod[];
 participants:string[]; location:string; background:string; lighting:'day'|'evening'|'night'; requires:Requirements;
 evidence:string[]; journal:string; entry:string; lines:Line[]; onComplete?:Effect; contentStatus:'authored'|'fixture'; resolution?:string;
}
export type Registry=Record<string,Scene>;
export interface Evidence { id:string; text:string; scene:string }
export interface SceneCursor { id:string; line:string; pending:Effect[] }
export interface WitnessedDecision { scene:string; week:number }
export interface GameState {
 name:string; week:number; slot:0|1|2|3; phase:'planner'|'scene'|'summary'|'ending'|'minigame';
 activityPoints:number;
 scene:SceneCursor|null; minigame:string|null; money:number; energy:number; exposure:number;
 bonds:Record<string,number>; direction:string; decisions:Record<string,WitnessedDecision>; evidence:Record<string,WitnessedDecision>;
 completed:Record<string,number>; preparation:string[]; inventory:Record<string,number>; giftsWeek:string[];
 journal:{scene:string;week:number;text:string}[]; lastNote:string;
}
export interface Gift { name:string; price:number }
export interface Job { energy:number; maxPay:number }
export interface RuntimeRules<S extends GameState> {
 schedule?:Schedule;
 weeks:number; saveKey:string; saveVersions:{gameVersion:string;saveSchemaVersion:number;contentCompatibilityVersion:number;buildId?:string}; initial:(name:string)=>S;
 economy:{sharedEnergy:number;sceneEnergy:number;weeklyEnergy:number;weeklyMoney:number;restEnergy:number;gifts:Record<string,Gift>;jobs:Record<string,Job>};
 notes:{initial:string;newWeek:string;rest:string;purchase:string;job:(pay:number)=>string};
 applyEffect?:(state:S,effect:Effect)=>void;
 completeScene?:(state:S,scene:Scene)=>void;
 canFinish:(state:S)=>boolean;
 directionChange:(state:S,direction:string)=>{allowed:boolean;note?:string};
 validateState:(state:S,registry:Registry)=>boolean;
}
