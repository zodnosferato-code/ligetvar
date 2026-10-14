// Headless teszt példa
import { createInitialState } from '../core/GameState';
import { DialogueEngine, DialogueNode } from '../core/DialogueEngine';

describe('DialogueEngine', () => {
  it('applies very_good effect', () => {
    const state = createInitialState();
    const engine = new DialogueEngine(state);

    const node: DialogueNode = {
      id: 'test',
      speaker: 'boglarka',
      text: 'test',
      choices: [
        {
          id: 'vg',
          text: 'very good',
          quality: 'very_good',
          effect: { closeness: 8, trust: 1 },
          reaction: 'mosoly',
        },
      ],
    };

    const result = engine.selectChoice(node, 'vg');
    expect(result.newState.girls.boglarka.closeness).toBe(8);
    expect(result.newState.girls.boglarka.trust).toBe(1);
    expect(result.reaction).toBe('mosoly');
  });

  it('rejects more than 4 choices', () => {
    const state = createInitialState();
    const engine = new DialogueEngine(state);
    const node: DialogueNode = {
      id: 'too_many',
      speaker: 'greta',
      text: 'test',
      choices: Array(5).fill({
        id: 'x',
        text: 'x',
        quality: 'good',
        effect: {},
        reaction: '',
      }),
    };
    expect(() => engine.getChoices(node)).toThrow('Maximum 4 choices allowed');
  });
});
