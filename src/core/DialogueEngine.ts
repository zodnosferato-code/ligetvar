// DialogueEngine.ts — max 4 opció, hatások alkalmazása
// Headless, UI-független

import { GameState, applyEffect } from './GameState';

export type ChoiceQuality = 'very_good' | 'good' | 'bad' | 'very_bad';

export interface DialogueChoice {
  id: string;
  text: string;
  quality: ChoiceQuality;
  effect: {
    closeness?: number;
    trust?: number;
    anger?: number;
    risk?: number;
    flags?: string[];
  };
  reaction: string; // debug kiíráshoz
}

export interface DialogueNode {
  id: string;
  speaker: 'rebeka' | 'boglarka' | 'greta' | 'narrator';
  text: string;
  choices: DialogueChoice[]; // max 4
}

export class DialogueEngine {
  constructor(private state: GameState) {}

  getChoices(node: DialogueNode): DialogueChoice[] {
    if (node.choices.length > 4) {
      throw new Error('Maximum 4 choices allowed');
    }
    return node.choices;
  }

  selectChoice(node: DialogueNode, choiceId: string): { newState: GameState; reaction: string } {
    const choice = node.choices.find(c => c.id === choiceId);
    if (!choice) throw new Error('Choice not found');

    const girl = node.speaker === 'narrator' ? 'rebeka' : node.speaker; // egyszerűsítés
    const newState = applyEffect(this.state, girl as any, choice.effect);
    this.state = newState;

    return {
      newState,
      reaction: choice.reaction,
    };
  }

  getDebugReaction(reaction: string, state: GameState, girl: string): string {
    const g = state.girls[girl as keyof GameState['girls']];
    return `${girl}: ${reaction} | közelség ${g.closeness}, bizalom ${g.trust}, harag ${g.anger}`;
  }
}
