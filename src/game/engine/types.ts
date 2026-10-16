export type GirlId = "rebeka" | "boglarka" | "greta";
export type SlotName = "morning" | "afternoon" | "evening";
export type RouteId =
  | "none"
  | "alone"
  | "rebeka"
  | "boglarka"
  | "greta"
  | "boglarka_greta"
  | "rebeka_greta";

export type LocationId =
  | "apartment"
  | "classroom"
  | "courtyard"
  | "department"
  | "holdkor"
  | "library"
  | "bekas"
  | "bookshop"
  | "cinema"
  | "peron"
  | "construction"
  | "mohu";

export type PhaseName =
  | "planner"
  | "scene"
  | "minigame"
  | "shop"
  | "phone"
  | "summary"
  | "route"
  | "ending"
  | "dossier";

export type GirlPhase =
  | "unknown"
  | "introduced"
  | "warming"
  | "private"
  | "intimate_early"
  | "route_candidate"
  | "route_locked"
  | "broken"
  | "fulfilled";

export type Quality = "very_good" | "good" | "bad" | "very_bad";
export type NodeKind = "story" | "repeat" | "ambient" | "cold" | "refuse";

export interface Effect {
  closeness?: number;
  trust?: number;
  anger?: number;
  risk?: number;
  presence?: number;
  insight?: number;
  calm?: number;
  money?: number;
  energy?: number;
  flags?: string[];
  world?: string[];
  soothe?: boolean;
}

export interface ChoiceRequires {
  insight?: number;
  calm?: number;
  presence?: number;
  trust?: number;
}

export interface Choice {
  id: string;
  text: string;
  quality: Quality;
  effect: Effect;
  reaction: string;
  requires?: ChoiceRequires;
  follow?: GirlId;
  /** Next line in the same visit. From the part 1 dialogue files. */
  followNode?: string;
}

export interface DialogueNode {
  id: string;
  speaker: GirlId | "narrator";
  text: string;
  choices: Choice[];
  kind: NodeKind;
  journal?: string;
  /** Extra energy cost applied to every choice. Narrator nodes default to 0. */
  cost?: number;
  /** Display-only name for a narrator-driven NPC; it never creates romance stats. */
  speakerLabel?: string;
  /** Optional image caption shown in a labelled placeholder when art is not available. */
  artCaption?: string;
}

export interface StoryEvent {
  id: string;
  node: string;
  girl: GirlId;
  locations: LocationId[];
  part: 1 | 2;
  priority: number;
  minWeek?: number;
  maxWeek?: number;
  minTrust?: number;
  minClose?: number;
}

export interface ActionDef {
  id: string;
  label: string;
  detail: string;
  slots: SlotName[];
  icon: string;
  kind: "visit" | "job" | "stat" | "minigame" | "date";
  location: LocationId;
  node?: string;
  girl?: GirlId;
  cost?: number;
  risk?: number;
  once?: boolean;
}

export interface GiftDef {
  id: string;
  name: string;
  price: number;
  blurb: string;
}

export interface GirlStats {
  closeness: number;
  trust: number;
  anger: number;
  flags: string[];
}

export interface SceneState {
  node: DialogueNode;
  location: LocationId;
  source: string;
  expression?: string;
}

export interface Snap {
  money: number;
  risk: number;
  closeness: Record<GirlId, number>;
  trust: Record<GirlId, number>;
}

export interface GameState {
  version: 1;
  name: string;
  week: number;
  slot: 0 | 1 | 2;
  phase: PhaseName;
  money: number;
  energy: number;
  presence: number;
  insight: number;
  calm: number;
  risk: number;
  girls: Record<GirlId, GirlStats>;
  flags: string[];
  route: RouteId;
  inventory: Record<string, number>;
  talkCounts: Record<GirlId, number>;
  giftsWeek: Record<GirlId, number>;
  seen: string[];
  journal: string[];
  invite: GirlId | null;
  scene: SceneState | null;
  minigame: "mohu" | "brick" | null;
  doingPhysio: boolean;
  rolled: boolean;
  giftMeeting: boolean;
  lastNote: string;
  mohuWeek: number;
  brickWeek: number;
  bekasThisWeek: boolean;
  riskSoothed: boolean;
  strain: number;
  workShifts: number;
  snap: Snap;
  dossier: GirlId | null;
}

export const GIRLS: GirlId[] = ["rebeka", "boglarka", "greta"];

export const SAVE_KEY = "ligetvar-save-v1";

export function emptyGirl(): GirlStats {
  return { closeness: 0, trust: 0, anger: 0, flags: [] };
}

export function takeSnap(state: Pick<GameState, "money" | "risk" | "girls">): Snap {
  return {
    money: state.money,
    risk: state.risk,
    closeness: {
      rebeka: state.girls.rebeka.closeness,
      boglarka: state.girls.boglarka.closeness,
      greta: state.girls.greta.closeness,
    },
    trust: {
      rebeka: state.girls.rebeka.trust,
      boglarka: state.girls.boglarka.trust,
      greta: state.girls.greta.trust,
    },
  };
}
