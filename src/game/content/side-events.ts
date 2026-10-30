import type {Scene,SceneStage} from './types.ts';
import {scene as makeScene} from './authoring.ts';

/** Optional low-commitment one-off encounters for Lilla and Dr. Sárközi Júlia.
 * English canonical source. Assets (CGs, moments) planned; fall back to portraits + text.
 * Never gates investigation or endings. Preference flags and gallery unlocks on affirmative completion. */

const stagesLilla: Record<string, SceneStage> = {
  invite: {label: 'library corner', location: 'library', background: 'library', participants: ['marton', 'lilla'], lighting: 'evening', proximity: 'beside'},
  private: {label: 'quiet apartment', location: 'apartment', background: 'apartment', participants: ['marton', 'lilla'], lighting: 'night', proximity: 'close', risk: false},
  after: {label: 'after', location: 'apartment', background: 'apartment', participants: ['marton', 'lilla'], lighting: 'night', proximity: 'beside'}
};

const stagesJulia: Record<string, SceneStage> = {
  invite: {label: 'library after hours', location: 'library', background: 'library', participants: ['marton', 'julia'], lighting: 'evening', proximity: 'beside'},
  private: {label: 'alcove', location: 'library', background: 'library', participants: ['marton', 'julia'], lighting: 'night', proximity: 'close', risk: false},
  after: {label: 'tea', location: 'library', background: 'library', participants: ['marton', 'julia'], lighting: 'night', proximity: 'beside'}
};

function lillaSensory(): Scene {
  const s = makeScene(
    'lilla_sensory_1',
    'Lilla · Sensory reclaiming',
    'conversation',
    12, 40, 'library',
    ['marton', 'lilla'],
    [
      {speaker: 'narrator', text: 'Lilla waits near the quieter stacks, cardigan open over her blouse. She looks at your hands, then at you.', expression: 'vulnerable'},
      {speaker: 'lilla', text: 'After the missing time, ordinary touch feels thin. I want something slow and deliberate that stays. Warm hands, cool air, and you saying I am here. Are you willing?', expression: 'vulnerable', choices: [
        {id: 'yes', text: 'Yes. I am here with you.', reaction: 'Lilla nods once, relief and focus in the same breath.', next: 'line_2', effect: {decisions: ['lilla_sensory_yes'], preferences: ['sensory-grounding', 'verbal-presence'], gallery: ['lilla_sensory_cg1']}},
        {id: 'reconsider', text: 'I need a moment. Not tonight.', reaction: 'Lilla steps back, no pressure.', next: 'line_7'},
        {id: 'no', text: 'Not like that. We can just talk.', reaction: 'Lilla accepts it cleanly.', next: 'line_7'}
      ]},
      {speaker: 'lilla', text: 'Come closer. Warm your hands first. Then start at my neck, slow. Tell me what you feel.', expression: 'affectionate'},
      {speaker: 'narrator', text: 'You map her skin with deliberate pressure. She breathes with the motion. The blank of missing hours shrinks under the new memory.', expression: 'neutral'},
      {speaker: 'lilla', text: 'You are here. This is now. Keep going until the cool air and your hands are both clear.', expression: 'vulnerable'},
      {speaker: 'narrator', text: 'You hold still when she asks. The affirmation is quiet, repeated, until her shoulders drop.', expression: 'neutral'},
      {speaker: 'lilla', text: 'Thank you. That is enough. The blank is smaller.', expression: 'affectionate'},
      {speaker: 'narrator', text: 'You sit together a while longer. No promises beyond this evening. She buttons the cardigan again before you leave.', expression: 'neutral'},
      {speaker: 'lilla', text: 'Another evening, then. The stacks are still here if you want company without the rest.', expression: 'neutral'},
      {speaker: 'narrator', text: 'You leave the library together for a short walk to the door. Nothing more is asked or given.', expression: 'neutral'}
    ],
    {scenes: ['shared_3'], evidence: ['returned_lilla']},
    [],
    'A quiet evening with Lilla. Slow, deliberate touch and spoken presence made the missing time feel smaller.',
    {decisions: ['lilla_sensory_seen']},
    ['night']
  );
  s.stages = stagesLilla;
  s.lighting = 'evening';
  s.lines[0].stage = 'invite';
  s.lines[1].stage = 'invite';
  s.lines[2].stage = 'private'; s.lines[2].moment = 'lilla_sensory_touch';
  s.lines[3].stage = 'private';
  s.lines[4].stage = 'private';
  s.lines[5].stage = 'private'; s.lines[5].moment = 'lilla_sensory_hold';
  s.lines[6].stage = 'after';
  s.lines[7].stage = 'invite';
  s.lines[8].stage = 'invite';
  return s;
}

function lillaSensory2(): Scene {
  const s = makeScene(
    'lilla_sensory_2',
    'Lilla · Second grounding',
    'conversation',
    20, 40, 'library',
    ['marton', 'lilla'],
    [
      {speaker: 'narrator', text: 'Lilla finds you again near the stacks. The cardigan is open once more.', expression: 'vulnerable'},
      {speaker: 'lilla', text: 'The last time helped. I would like another slow evening if you are still willing. Same rules: you stop when I ask, and you tell me I am here.', expression: 'vulnerable', choices: [
        {id: 'yes', text: 'Yes. I am still here.', reaction: 'Lilla’s shoulders drop a little.', next: 'line_2', effect: {decisions: ['lilla_sensory_2_yes'], preferences: ['sensory-grounding'], gallery: ['lilla_sensory_cg1']}},
        {id: 'no', text: 'Not tonight.', reaction: 'Lilla nods and steps back.', next: 'line_5'}
      ]},
      {speaker: 'lilla', text: 'Start at the collarbones this time. Slower. Say it again when I need it.', expression: 'affectionate'},
      {speaker: 'narrator', text: 'You follow her requests. The new memory settles more firmly than the first.', expression: 'neutral'},
      {speaker: 'lilla', text: 'Thank you. That is enough for now.', expression: 'affectionate'},
      {speaker: 'narrator', text: 'You walk to the door together. No further promise is made.', expression: 'neutral'}
    ],
    {scenes: ['lilla_sensory_1'], decisions: ['lilla_sensory_yes']},
    [],
    'A second quiet evening with Lilla. The blank feels smaller still.',
    {},
    ['night']
  );
  s.stages = stagesLilla;
  s.lines[0].stage = 'invite';
  s.lines[1].stage = 'invite';
  s.lines[2].stage = 'private';
  s.lines[3].stage = 'private';
  s.lines[4].stage = 'after';
  s.lines[5].stage = 'invite';
  return s;
}

function juliaGuided(): Scene {
  const s = makeScene(
    'julia_guided_1',
    'Júlia · Quiet instruction',
    'conversation',
    14, 40, 'library',
    ['marton', 'julia'],
    [
      {speaker: 'narrator', text: 'After hours the library is almost empty. Dr. Sárközi keeps her blazer open, glasses on, voice low.', expression: 'neutral'},
      {speaker: 'julia', text: 'I enjoy directing with precision. Position, pace, breath. If you want that, say yes clearly. If not, we can finish the catalogue notes and leave.', expression: 'neutral', choices: [
        {id: 'yes', text: 'Yes. Tell me what you want.', reaction: 'Júlia gives a small, approving nod.', next: 'line_2', effect: {decisions: ['julia_guided_yes'], preferences: ['guided-instruction', 'attire-partial'], gallery: ['julia_guided_cg1']}},
        {id: 'reconsider', text: 'Not tonight. The notes are enough.', reaction: 'Júlia closes her notebook without comment.', next: 'line_7'},
        {id: 'no', text: 'I prefer we stay with the work.', reaction: 'Júlia accepts the boundary at once.', next: 'line_7'}
      ]},
      {speaker: 'julia', text: 'Kneel. Hands on your thighs. Breathe with me — slower. Good. Now follow the pace I set.', expression: 'neutral'},
      {speaker: 'narrator', text: 'She remains partially dressed, one hand guiding your head or hand, the other resting. Her instructions stay calm and exact.', expression: 'neutral'},
      {speaker: 'julia', text: 'Correct form. Keep that rhythm. You are doing well.', expression: 'amused'},
      {speaker: 'narrator', text: 'The clinical tone softens only after the mutual yes has been repeated. She watches your breathing, adjusts once, then stills.', expression: 'neutral'},
      {speaker: 'julia', text: 'That was well done. Tea, or quiet? No further obligation.', expression: 'neutral'},
      {speaker: 'narrator', text: 'You share the quiet or the tea. She buttons the blazer again before the lights are turned down. The evening ends without escalation.', expression: 'neutral'},
      {speaker: 'julia', text: 'The notes can wait for another day. Good evening.', expression: 'neutral'},
      {speaker: 'narrator', text: 'You leave the library separately. The offer is closed for tonight; nothing is held against either of you.', expression: 'neutral'}
    ],
    {scenes: ['shared_4'], evidence: ['timeline']},
    [],
    'An after-hours hour with Dr. Sárközi. Calm, precise direction and quiet praise; no commitment beyond the evening.',
    {decisions: ['julia_guided_seen']},
    ['night']
  );
  s.stages = stagesJulia;
  s.lighting = 'evening';
  s.lines[0].stage = 'invite';
  s.lines[1].stage = 'invite';
  s.lines[2].stage = 'private'; s.lines[2].moment = 'julia_guided_pace';
  s.lines[3].stage = 'private';
  s.lines[4].stage = 'private';
  s.lines[5].stage = 'private'; s.lines[5].moment = 'julia_guided_hold';
  s.lines[6].stage = 'after';
  s.lines[7].stage = 'invite';
  s.lines[8].stage = 'invite';
  return s;
}

function juliaGuided2(): Scene {
  const s = makeScene(
    'julia_guided_2',
    'Júlia · Second instruction',
    'conversation',
    22, 40, 'library',
    ['marton', 'julia'],
    [
      {speaker: 'narrator', text: 'The library is quiet again. Júlia’s blazer is open, glasses still on.', expression: 'neutral'},
      {speaker: 'julia', text: 'The previous form was acceptable. Would you like further instruction tonight, or shall we simply finish the notes?', expression: 'neutral', choices: [
        {id: 'yes', text: 'Yes. Direct me again.', reaction: 'Júlia gives a brief nod.', next: 'line_2', effect: {decisions: ['julia_guided_2_yes'], preferences: ['guided-instruction'], gallery: ['julia_guided_cg1']}},
        {id: 'no', text: 'The notes are enough.', reaction: 'Júlia closes her notebook.', next: 'line_5'}
      ]},
      {speaker: 'julia', text: 'Same position. Slower breath this time. I will adjust once.', expression: 'neutral'},
      {speaker: 'narrator', text: 'Her direction remains calm and exact. Praise is sparse and precise.', expression: 'neutral'},
      {speaker: 'julia', text: 'Well done. That concludes the evening.', expression: 'neutral'},
      {speaker: 'narrator', text: 'You leave separately. No further obligation is created.', expression: 'neutral'}
    ],
    {scenes: ['julia_guided_1'], decisions: ['julia_guided_yes']},
    [],
    'A second after-hours hour with Dr. Sárközi. Quiet authority, no escalation.',
    {},
    ['night']
  );
  s.stages = stagesJulia;
  s.lines[0].stage = 'invite';
  s.lines[1].stage = 'invite';
  s.lines[2].stage = 'private';
  s.lines[3].stage = 'private';
  s.lines[4].stage = 'after';
  s.lines[5].stage = 'invite';
  return s;
}

export const sideEvents: Scene[] = [lillaSensory(), lillaSensory2(), juliaGuided(), juliaGuided2()];
