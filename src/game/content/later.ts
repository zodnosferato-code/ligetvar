import type { DialogueNode, GirlId, LocationId, StoryEvent } from "../engine/types.ts";
import hu from "../../../locales/hu.json" with { type: "json" };
import rebeka2 from "../../../dialogues/part2/rebeka.json" with { type: "json" };
import boglarka2 from "../../../dialogues/part2/boglarka.json" with { type: "json" };
import greta2 from "../../../dialogues/part2/greta.json" with { type: "json" };
import rebeka3 from "../../../dialogues/part3/rebeka.json" with { type: "json" };
import boglarka3 from "../../../dialogues/part3/boglarka.json" with { type: "json" };
import greta3 from "../../../dialogues/part3/greta.json" with { type: "json" };

type RawChoice = {
  id: string;
  text_key: string;
  quality: DialogueNode["choices"][number]["quality"];
  effect: DialogueNode["choices"][number]["effect"];
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

function girlOf(id: string): GirlId {
  if (id.startsWith("rebeka")) return "rebeka";
  if (id.startsWith("boglarka")) return "boglarka";
  return "greta";
}

function homeOf(girl: GirlId): LocationId {
  if (girl === "rebeka") return "holdkor";
  if (girl === "boglarka") return "library";
  return "department";
}

function toNode(raw: RawNode): DialogueNode {
  return {
    id: raw.id,
    speaker: raw.speaker,
    text: lines[raw.text_key] ?? raw.text_key,
    kind: "story",
    cost: raw.id.endsWith("_react") ? 0 : undefined,
    choices: raw.choices.map((choice) => ({
      id: choice.id,
      text: lines[choice.text_key] ?? choice.text_key,
      quality: choice.quality,
      effect: choice.effect,
      reaction: choice.reaction,
      followNode: choice.follow_node,
    })),
  };
}

function schedule(id: string, girl: GirlId): Omit<StoryEvent, "id" | "node" | "girl" | "part"> | null {
  if (id.endsWith("_react") || id.includes("ending")) return null;
  const home = homeOf(girl);
  if (id.endsWith("part2_intro")) return { locations: [home, "classroom"], minWeek: 10, minTrust: 3, priority: 72 };
  if (id.includes("desire_fulfill")) return { locations: ["apartment", home], minWeek: 15, minTrust: 5, minClose: 65, priority: 90 };
  if (id.includes("bekas")) return { locations: ["bekas", home], minWeek: 13, minTrust: 4, priority: 66 };
  return { locations: ["apartment", home, "classroom"], minWeek: 12, minTrust: 4, priority: 64 };
}

export function mergeLater(nodes: Record<string, DialogueNode>, story: StoryEvent[]) {
  const routed = [rebeka2, boglarka2, greta2] as Array<{ nodes: RawNode[] }>;
  for (const pack of routed) {
    for (const raw of pack.nodes) {
      nodes[raw.id] = toNode(raw);
      const girl = girlOf(raw.id);
      const where = schedule(raw.id, girl);
      if (!where || raw.speaker === "narrator") continue;
      story.push({ id: raw.id, node: raw.id, girl, part: 2, ...where });
    }
  }
  const endings = [rebeka3, boglarka3, greta3] as Array<{ nodes: RawNode[] }>;
  for (const pack of endings) {
    for (const raw of pack.nodes) nodes[raw.id] = toNode(raw);
  }
}
