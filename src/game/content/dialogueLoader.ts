import type { Choice, DialogueNode, GirlId } from "../engine/types.ts";

export type RawDialogueChoice = {
  id: string;
  text_key: string;
  quality: Choice["quality"];
  effect: Choice["effect"];
  reaction: string;
  follow_node?: string;
};

export type RawDialogueNode = {
  id: string;
  speaker: GirlId | "narrator";
  text_key: string;
  choices: RawDialogueChoice[];
};

/** Single adapter for every authored character-dialogue JSON file. */
export function loadDialogueNode(
  raw: RawDialogueNode,
  lines: Record<string, string>,
  previous?: DialogueNode,
): DialogueNode {
  return {
    id: raw.id,
    speaker: raw.speaker,
    text: lines[raw.text_key] ?? raw.text_key,
    kind: previous?.kind ?? (raw.id.includes("repeat") ? "repeat" : "story"),
    journal: previous?.journal,
    cost: raw.id.endsWith("_react") ? 0 : previous?.cost,
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
