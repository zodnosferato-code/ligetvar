// part1-kozos.ts — 1–8. hét közös szakasz
// A dialógusok külön JSON-ból jönnek

import { GameState, createInitialState } from '../core/GameState';
import { DialogueEngine, DialogueNode } from '../core/DialogueEngine';

export function runPart1(initial: GameState = createInitialState()): GameState {
  let state = initial;
  const engine = new DialogueEngine(state);

  // Példa dialógus (később JSON-ból)
  const exampleNode: DialogueNode = {
    id: 'rebeka_intro',
    speaker: 'rebeka',
    text: 'A Holdkör ma este ül össze. Te is jössz, tanár úr?',
    choices: [
      {
        id: 'very_good',
        text: 'Csak ha te rendezed a kört, és nem veszed el a kulcsot.',
        quality: 'very_good',
        effect: { closeness: 6, trust: 1, flags: ['rebeka_kor'] },
        reaction: 'elégedett félmosoly',
      },
      {
        id: 'good',
        text: 'Ha van hely, megnézem.',
        quality: 'good',
        effect: { closeness: 2 },
        reaction: 'semleges',
      },
      {
        id: 'bad',
        text: 'A tanárok nem szoktak ilyen helyekre járni.',
        quality: 'bad',
        effect: { closeness: -2, anger: 1 },
        reaction: 'hideg tekintet',
      },
      {
        id: 'very_bad',
        text: 'Majd elmesélem a tanszéken, milyen érdekes körötök van.',
        quality: 'very_bad',
        effect: { closeness: -5, anger: 2, risk: 10 },
        reaction: 'dühös csend',
      },
    ],
  };

  const result = engine.selectChoice(exampleNode, 'very_good');
  return result.newState;
}
