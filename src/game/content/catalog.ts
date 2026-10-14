// Minimal stub so the engine and tests load until the full catalog is restored.
import type { ActionDef, DialogueNode, GirlId, LocationId } from "../engine/types";

export const GIRL_NAME: Record<GirlId, string> = {
  rebeka: "Rebeka Dorn",
  boglarka: "Boglárka Fazekas",
  greta: "Gréta Váradi",
};

export const REQUIRED_FLAGS: Record<GirlId, string[]> = {
  rebeka: ["rebeka_kor", "rebeka_feny", "rebeka_foto"],
  boglarka: ["boglarka_margo"],
  greta: ["greta_lista"],
};

export const NODES: Record<string, DialogueNode> = {
  empty: {
    id: "empty",
    speaker: "narrator",
    text: "Nincs több.",
    choices: [],
    kind: "ambient",
  },
  rebeka_intro: {
    id: "rebeka_intro",
    speaker: "rebeka",
    text: "A Holdkör ma este ül össze. Te is jössz, tanár úr?",
    kind: "story",
    choices: [
      { id: "very_good", text: "Csak ha te rendezed a kört.", quality: "very_good", effect: { closeness: 6, trust: 1, flags: ["rebeka_kor"] }, reaction: "elegedett_felmosoly" },
      { id: "good", text: "Ha van hely, megnézem.", quality: "good", effect: { closeness: 2 }, reaction: "semleges" },
      { id: "bad", text: "A tanárok nem szoktak ilyen helyekre járni.", quality: "bad", effect: { closeness: -2, anger: 1 }, reaction: "hideg_tekintet" },
      { id: "very_bad", text: "Majd elmesélem a tanszéken.", quality: "very_bad", effect: { closeness: -5, anger: 2, risk: 10 }, reaction: "duhos_csend" },
    ],
  },
  rebeka_repeat_0: {
    id: "rebeka_repeat_0",
    speaker: "rebeka",
    text: "Ismétlés.",
    kind: "repeat",
    choices: [
      { id: "very_good", text: "Rendben.", quality: "very_good", effect: { closeness: 8 }, reaction: "felmosoly" },
      { id: "good", text: "Ok.", quality: "good", effect: { closeness: 1 }, reaction: "semleges" },
    ],
  },
  rebeka_repeat_1: {
    id: "rebeka_repeat_1",
    speaker: "rebeka",
    text: "Ismétlés 2.",
    kind: "repeat",
    choices: [
      { id: "good", text: "Ok.", quality: "good", effect: { closeness: 2 }, reaction: "semleges" },
    ],
  },
};

export const STORY: Array<{
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
}> = [
  {
    id: "rebeka_intro",
    node: "rebeka_intro",
    girl: "rebeka",
    locations: ["holdkor"],
    part: 1,
    priority: 10,
    minWeek: 1,
  },
];

export const ACTIONS: ActionDef[] = [
  {
    id: "holdkor",
    label: "Holdkör",
    detail: "Rebeka helye",
    slots: ["evening"],
    icon: "icon_place_holdkor",
    kind: "visit",
    location: "holdkor",
    girl: "rebeka",
  },
  {
    id: "proof",
    label: "Korrektúra",
    detail: "Esti munka",
    slots: ["evening"],
    icon: "icon_task",
    kind: "job",
    location: "department",
    node: "empty",
  },
];

export function assertCatalog() {
  // Stub: real validation comes with the full catalog.
}

export function jobNode() {
  return NODES.empty;
}

export function physioNode(present: { id: GirlId; label: string }[]) {
  return {
    ...NODES.empty,
    text: `Gyógytorna. Jelen: ${present.map((p) => p.label).join(", ") || "senki"}.`,
  };
}

export function rumorNode() {
  return {
    ...NODES.empty,
    text: "Pletyka a tanszéken.",
  };
}
