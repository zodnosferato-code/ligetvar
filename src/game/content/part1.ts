import type { Choice, DialogueNode, GirlId, LocationId, StoryEvent } from "../engine/types.ts";
import hu from "../../../locales/hu.json" with { type: "json" };
import rebeka from "../../../dialogues/part1/rebeka.json" with { type: "json" };
import boglarka from "../../../dialogues/part1/boglarka.json" with { type: "json" };
import greta from "../../../dialogues/part1/greta.json" with { type: "json" };

type RawChoice = {
  id: string;
  text_key: string;
  quality: Choice["quality"];
  effect: Choice["effect"];
  reaction: string;
  follow_node?: string;
};

type RawNode = {
  id: string;
  speaker: GirlId | "narrator";
  text_key: string;
  choices: RawChoice[];
};

const lines = hu as Record<string, string>;

function line(key: string) {
  return lines[key] ?? key;
}

function toNode(raw: RawNode, previous?: DialogueNode): DialogueNode {
  return {
    id: raw.id,
    speaker: raw.speaker,
    text: line(raw.text_key),
    kind: previous?.kind ?? (raw.id.includes("repeat") ? "repeat" : "story"),
    journal: previous?.journal,
    cost: raw.id.endsWith("_react") ? 0 : previous?.cost,
    choices: raw.choices.map((choice) => ({
      id: choice.id,
      text: line(choice.text_key),
      quality: choice.quality,
      effect: choice.effect,
      reaction: choice.reaction,
      followNode: choice.follow_node,
    })),
  };
}

// Explicit scene scheduling — do not rely on ID substring matching.
// Each important scene has its own location, week window, trust requirement and priority.
const SCENE_META: Record<string, { locations: LocationId[]; minWeek: number; minTrust?: number; maxWeek?: number; priority: number }> = {
  // Rebeka
  rebeka_foto: { locations: ["holdkor", "classroom"], minWeek: 2, priority: 16 },
  rebeka_nappali: { locations: ["holdkor", "classroom"], minWeek: 2, priority: 16 },
  rebeka_lakas: { locations: ["apartment"], minWeek: 3, minTrust: 2, priority: 30 },
  rebeka_intimate: { locations: ["apartment", "holdkor"], minWeek: 7, maxWeek: 8, minTrust: 3, priority: 55 },
  rebeka_yield: { locations: ["apartment", "holdkor"], minWeek: 7, maxWeek: 8, minTrust: 3, priority: 55 },
  // Boglárka
  boglarka_jegyzet: { locations: ["library"], minWeek: 2, priority: 16 },
  boglarka_lakas: { locations: ["apartment"], minWeek: 3, minTrust: 2, priority: 30 },
  boglarka_explore: { locations: ["apartment"], minWeek: 7, maxWeek: 8, minTrust: 3, priority: 55 },
  boglarka_praise: { locations: ["apartment"], minWeek: 7, maxWeek: 8, minTrust: 3, priority: 55 },
  // Gréta
  greta_dokumentum: { locations: ["department"], minWeek: 2, priority: 16 },
  greta_lakas: { locations: ["apartment"], minWeek: 3, minTrust: 2, priority: 30 },
  greta_rule: { locations: ["apartment", "department"], minWeek: 7, maxWeek: 8, minTrust: 3, priority: 55 },
  greta_yield: { locations: ["apartment", "department"], minWeek: 7, maxWeek: 8, minTrust: 3, priority: 55 },
};

function beat(id: string): { locations: LocationId[]; minWeek: number; minTrust?: number; maxWeek?: number; priority: number } | null {
  if (id.endsWith("_react") || id.endsWith("_intro")) return null;
  if (SCENE_META[id]) return SCENE_META[id];
  // Fallback for any future scenes (prefer explicit entry above)
  return { locations: ["classroom"], minWeek: 2, priority: 14 };
}

export function mergePart1(nodes: Record<string, DialogueNode>, story: StoryEvent[]) {
  const packs = [rebeka, boglarka, greta] as Array<{ nodes: RawNode[] }>;
  for (const pack of packs) {
    for (const raw of pack.nodes) {
      const previous = nodes[raw.id];
      nodes[raw.id] = toNode(raw, previous);
      const where = beat(raw.id);
      if (!where || previous) continue;
      const girl = raw.speaker as GirlId;
      story.push({
        id: raw.id,
        node: raw.id,
        girl,
        locations: where.locations,
        part: 1,
        priority: where.priority,
        minWeek: where.minWeek,
        maxWeek: where.maxWeek,
        minTrust: where.minTrust,
      });
    }
  }
}
