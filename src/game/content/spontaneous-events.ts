import type {Scene, SceneStage} from './types.ts';
import {scene as makeScene} from './authoring.ts';

/** Short spontaneous follow-ups that become available once side-event preference flags exist.
 * Low-commitment, mutual, non-blocking. English source. Honest portrait+text fallbacks until assets.
 */

const stagesLillaSpont: Record<string, SceneStage> = {
  chance: {label: 'library stacks', location: 'library', background: 'library', participants: ['marton', 'lilla'], lighting: 'evening', proximity: 'beside'},
  brief: {label: 'quiet corner', location: 'library', background: 'library', participants: ['marton', 'lilla'], lighting: 'night', proximity: 'close', risk: false},
  after: {label: 'after', location: 'library', background: 'library', participants: ['marton', 'lilla'], lighting: 'night', proximity: 'beside'}
};

const stagesJuliaSpont: Record<string, SceneStage> = {
  chance: {label: 'after-hours desk', location: 'library', background: 'library', participants: ['marton', 'julia'], lighting: 'evening', proximity: 'beside'},
  brief: {label: 'alcove', location: 'library', background: 'library', participants: ['marton', 'julia'], lighting: 'night', proximity: 'close', risk: false},
  after: {label: 'notes', location: 'library', background: 'library', participants: ['marton', 'julia'], lighting: 'night', proximity: 'beside'}
};

function lillaSpontaneous(): Scene {
  const s = makeScene(
    'lilla_spontaneous_touch',
    'Lilla · Brief grounding',
    'conversation',
    16, 42, 'library',
    ['marton', 'lilla'],
    [
      {speaker: 'narrator', text: 'You pass the quieter stacks. Lilla is already there, cardigan open, one hand resting on a shelf.', expression: 'vulnerable'},
      {speaker: 'lilla', text: 'The last time stayed with me. If you have a few minutes and are still willing, I would like a short, deliberate touch. You can stop whenever. Are you free?', expression: 'vulnerable', choices: [
        {id: 'yes', text: 'Yes. I am here.', reaction: 'Lilla’s breath eases.', next: 'line_2', effect: {decisions: ['lilla_spontaneous_yes'], preferences: ['sensory-grounding'], gallery: ['lilla_sensory_cg1']}},
        {id: 'no', text: 'Not right now. Another evening.', reaction: 'Lilla nods and turns back to the shelf.', next: 'line_5'}
      ]},
      {speaker: 'lilla', text: 'Warm your hands. Start at the wrist, slow. Tell me once that I am here.', expression: 'affectionate'},
      {speaker: 'narrator', text: 'You follow the request. The contact is brief and exact. She closes her eyes for three breaths, then opens them.', expression: 'neutral'},
      {speaker: 'lilla', text: 'Thank you. That is enough. The blank is still smaller.', expression: 'affectionate'},
      {speaker: 'narrator', text: 'You walk the short distance to the main aisle together. No further invitation is made tonight.', expression: 'neutral'}
    ],
    {scenes: ['lilla_sensory_1'], decisions: ['lilla_sensory_yes']},
    [],
    'A brief spontaneous grounding with Lilla. Slow touch and spoken presence; no new commitment.',
    {decisions: ['lilla_spontaneous_seen']},
    ['night']
  );
  s.stages = stagesLillaSpont;
  s.lines[0].stage = 'chance';
  s.lines[1].stage = 'chance';
  s.lines[2].stage = 'brief'; s.lines[2].moment = 'lilla_sensory_touch';
  s.lines[3].stage = 'brief';
  s.lines[4].stage = 'after';
  s.lines[5].stage = 'chance';
  return s;
}

function juliaSpontaneous(): Scene {
  const s = makeScene(
    'julia_spontaneous_instruction',
    'Júlia · Brief direction',
    'conversation',
    18, 42, 'library',
    ['marton', 'julia'],
    [
      {speaker: 'narrator', text: 'After hours the desk is clear. Júlia looks up from her notebook, blazer open, glasses on.', expression: 'neutral'},
      {speaker: 'julia', text: 'The previous form held. If you want a short, precise instruction tonight, say yes. Otherwise we can leave the notes as they are.', expression: 'neutral', choices: [
        {id: 'yes', text: 'Yes. Direct me briefly.', reaction: 'Júlia gives a small nod.', next: 'line_2', effect: {decisions: ['julia_spontaneous_yes'], preferences: ['guided-instruction'], gallery: ['julia_guided_cg1']}},
        {id: 'no', text: 'The notes are enough tonight.', reaction: 'Júlia closes the notebook.', next: 'line_5'}
      ]},
      {speaker: 'julia', text: 'Kneel. Hands on thighs. One slower breath. Follow once, then stop when I say.', expression: 'neutral'},
      {speaker: 'narrator', text: 'Her direction is exact and short. Praise is a single quiet word. She adjusts nothing further.', expression: 'neutral'},
      {speaker: 'julia', text: 'Well done. That concludes it. Good evening.', expression: 'neutral'},
      {speaker: 'narrator', text: 'You leave separately. The offer closes with the evening; nothing is held against either of you.', expression: 'neutral'}
    ],
    {scenes: ['julia_guided_1'], decisions: ['julia_guided_yes']},
    [],
    'A brief spontaneous instruction with Dr. Sárközi. Calm, precise, no escalation.',
    {decisions: ['julia_spontaneous_seen']},
    ['night']
  );
  s.stages = stagesJuliaSpont;
  s.lines[0].stage = 'chance';
  s.lines[1].stage = 'chance';
  s.lines[2].stage = 'brief'; s.lines[2].moment = 'julia_guided_pace';
  s.lines[3].stage = 'brief';
  s.lines[4].stage = 'after';
  s.lines[5].stage = 'chance';
  return s;
}

export const spontaneousEvents: Scene[] = [lillaSpontaneous(), juliaSpontaneous()];
