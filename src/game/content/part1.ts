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
    cost: previous?.cost,
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

function beat(id: string): { locations: LocationId[]; minWeek: number; minTrust?: number; maxWeek?: number; priority: number } | null {
  if (id.endsWith("_react") || id.endsWith("_intro")) return null;
  if (id.includes("het8")) return { locations: ["classroom"], minWeek: 7, maxWeek: 8, priority: 75 };
  if (id.includes("kiss")) return { locations: ["apartment"], minWeek: 6, minTrust: 2, priority: 45 };
  if (id.includes("flash")) return { locations: ["classroom"], minWeek: 4, minTrust: 1, priority: 32 };
  if (id.includes("lakas")) return { locations: ["apartment"], minWeek: 3, minTrust: 2, priority: 30 };
  if (id.includes("tanterem")) return { locations: ["classroom"], minWeek: 2, priority: 18 };
  if (id.includes("konyvtar") || id.includes("jegyzet")) return { locations: ["library"], minWeek: 2, priority: 16 };
  if (id.includes("dokumentum") || id.includes("irat") || id.includes("lista")) return { locations: ["department"], minWeek: 2, priority: 16 };
  if (id.includes("nappali") || id.includes("foto")) return { locations: ["holdkor", "classroom"], minWeek: 2, priority: 16 };
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
