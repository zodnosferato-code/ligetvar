import type {Scene, SceneStage} from './types.ts';
import {scene as makeScene} from './authoring.ts';

/** Optional later-year INT2 private continuation for Gréta.
 * English canonical source. Assets (CGs, moments) planned; fall back to portraits + text.
 * Never gates investigation or endings. Preference flags and gallery unlocks on affirmative completion.
 * Available after the dance intimate path; mutual, with reconsideration/refusal. */

const stages: Record<string, SceneStage> = {
  invite: {label: 'apartment evening', location: 'apartment', background: 'apartment', participants: ['marton', 'greta'], lighting: 'evening', proximity: 'beside'},
  private: {label: 'close', location: 'apartment', background: 'apartment', participants: ['marton', 'greta'], lighting: 'night', proximity: 'close', risk: false},
  after: {label: 'after', location: 'apartment', background: 'apartment', participants: ['marton', 'greta'], lighting: 'night', proximity: 'beside'}
};

function gretaPrivate(): Scene {
  const s = makeScene(
    'greta_private_1',
    'Gréta · Precise presence',
    'relationship',
    40, 48, 'apartment',
    ['marton', 'greta'],
    [
      {speaker: 'narrator', text: 'Gréta has left her bag by the door. Glasses still on, vest open over the blouse. She looks at your hands, then at the space between you.', expression: 'vulnerable'},
      {speaker: 'greta', text: 'The dancing was allowed to be imperfect. This can be the same. Slow, deliberate, and you can stop whenever. I want to map where the awkwardness becomes something else. Are you willing?', expression: 'vulnerable', choices: [
        {id: 'yes', text: 'Yes. Precise and present.', reaction: 'Gréta’s shoulders drop a fraction. She nods once.', next: 'line_2', effect: {decisions: ['greta_private_yes'], preferences: ['precise-presence'], gallery: ['greta_private_cg1']}},
        {id: 'reconsider', text: 'Not tonight. Another evening.', reaction: 'Gréta steps back, no pressure.', next: 'line_7'},
        {id: 'no', text: 'Just company is enough.', reaction: 'Gréta closes her vest and sits.', next: 'line_8'}
      ]},
      {speaker: 'greta', text: 'Start at the wrist. Slow. Tell me once if the count is wrong.', expression: 'affectionate'},
      {speaker: 'narrator', text: 'You follow the request. The contact is careful, mapping skin and breath. Her glasses stay on. When she tenses she corrects with a quiet word, then eases.', expression: 'vulnerable'},
      {speaker: 'greta', text: 'There. That is the place. Hold still.', expression: 'affectionate'},
      {speaker: 'narrator', text: 'The hold is quiet. No performance. When she releases, her breath is even.', expression: 'neutral'},
      {speaker: 'greta', text: 'Thank you. That stayed. No further obligation is created.', expression: 'neutral'},
      {speaker: 'narrator', text: 'You sit with ordinary tea. The evening ends without new claims.', expression: 'neutral'},
      {speaker: 'narrator', text: 'She gathers her bag. The offer closes with the evening.', expression: 'neutral'},
      {speaker: 'greta', text: 'Company is still welcome. The rest can wait.', expression: 'neutral'}
    ],
    {decisions: ['greta_dance_intimate'], notDecisions: ['greta_withdraw']},
    [],
    'A later private hour with Gréta. Slow, precise mapping; no new commitment beyond the evening.',
    {decisions: ['greta_private_seen']},
    ['night']
  );
  s.stages = stages;
  s.lighting = 'evening';
  s.lines[0].stage = 'invite';
  s.lines[1].stage = 'invite';
  s.lines[2].stage = 'private'; s.lines[2].moment = 'greta_precise_touch';
  s.lines[3].stage = 'private';
  s.lines[4].stage = 'private'; s.lines[4].moment = 'greta_precise_hold';
  s.lines[5].stage = 'private';
  s.lines[6].stage = 'after';
  s.lines[7].stage = 'invite';
  s.lines[8].stage = 'invite';
  return s;
}

export const gretaIntimacy: Scene[] = [gretaPrivate()];
