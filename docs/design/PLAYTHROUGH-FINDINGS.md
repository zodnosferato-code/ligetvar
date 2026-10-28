# Playthrough findings

> **Status:** Baseline run in progress, 28 October 2026; no dialogue fixes applied. | **Purpose:** Preserve observations for later scene planning and deliberate revision.

Tested runtime: main `e191733f3865260de4b3397982b928540bb500d2`. Independent worker uses normal JSON CLI observations, custom name **Alex Test**, no author mode or route walkthrough. Reported progress: week 6; completion and save/resume not yet verified. Findings below cover encountered branches only.

| ID | Observed reference | Finding | Later revision direction |
| --- | --- | --- | --- |
| NAME-01 | shared_1 / line_0, opening_questions_4 | Prose hardcodes Márton Kelényi although headings use Alex Test. | Render chosen-name variable consistently; verify translations and save/resume. |
| DIALOGUE-01 | shared_1 / line_4 | Exercise answer lacks the preceding question it appears to answer. | Restore a natural bridge or make instruction self-contained. |
| DIALOGUE-02 | shared_1 / line_7 | Defensive refusal to sell workshop results follows a funding complaint without adequate setup. | Reconcile motive and response with the planned scene. |
| PLOT-01 | shared_1 / soma_departure_2, line_8 | Ominous basement remark and restricted-archive departure spotlight Soma early. | Align with master plot's background role and late reveal. |
| TIME-01 | shared_2 / choice space reaction and following branch | Reaction jumps to next day's message, then returns to today and repeats the message later. | Establish one coherent chronology. |
| STAGE-01 | rebeka_3 / romance_closeness_hand_3–6 and date_destination | Hand-holding choice leads to unchosen further intimacy; public location, clothing/prop continuity and later proximity reset conflict; draft alternatives remain. | Review choice scope, fade-to-black, staging and continuity against specification before rewriting. |

Strengths to preserve: shared_1 opening_questions_0–4 banter; shared_3 seating action.

Gameplay observations so far: archive memory puzzle completed using revealed-card memory, reward 20,000 Ft / 6 points. One premature request for rebeka_3 in week 5 was rejected without state change; worker recovered from offered actions. No reported blocking failure so far. These are interim observations, not a completed test result.

Follow [NARRATIVE-WORKFLOW.md](NARRATIVE-WORKFLOW.md). Append later evidence with tested commit and branch; do not overwrite the baseline or claim unplayed coverage.
