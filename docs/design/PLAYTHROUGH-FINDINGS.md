# Playthrough findings

> **Status:** Baseline run completed, 28 October 2026; no dialogue fixes applied. | **Purpose:** Preserve observations for later scene planning and deliberate revision.

Tested runtime: main `e191733f3865260de4b3397982b928540bb500d2`. Independent worker uses normal JSON CLI observations, custom name **Alex Test**, no author mode or route walkthrough. Completed week 16 on Rebeka's route; week-8 restart/resume passed. See [full report](PLAYTHROUGH-REPORT-2026-10-28.md) for 25 findings, 29 played scenes / 316 observed lines, evidence and methodological limits. Findings below cover encountered branches only.

| ID | Observed reference | Finding | Later revision direction |
| --- | --- | --- | --- |
| NAME-01 | shared_1 / line_0, opening_questions_4 | Prose hardcodes Márton Kelényi although headings use Alex Test. | Render chosen-name variable consistently; verify translations and save/resume. |
| DIALOGUE-01 | shared_1 / line_4 | Exercise answer lacks the preceding question it appears to answer. | Restore a natural bridge or make instruction self-contained. |
| DIALOGUE-02 | shared_1 / line_7 | Defensive refusal to sell workshop results follows a funding complaint without adequate setup. | Reconcile motive and response with the planned scene. |
| PLOT-01 | shared_1 / soma_departure_2, line_8 | Ominous basement remark and restricted-archive departure spotlight Soma early. | Align with master plot's background role and late reveal. |
| TIME-01 | shared_2 / choice space reaction and following branch | Reaction jumps to next day's message, then returns to today and repeats the message later. | Establish one coherent chronology. |
| STAGE-01 | rebeka_3 / romance_closeness_hand_3–6 and date_destination | Hand-holding choice leads to unchosen further intimacy; public location, clothing/prop continuity and later proximity reset conflict; draft alternatives remain. | Review choice scope, fade-to-black, staging and continuity against specification before rewriting. |

Strengths to preserve: shared_1 opening_questions_0–4 banter; shared_3 seating action.

Gameplay observations so far: archive memory puzzle completed using revealed-card memory, reward 20,000 Ft / 6 points. One premature request for rebeka_3 in week 5 was rejected without state change; worker recovered from offered actions. No blocking failure during the completed route. These earlier observations are preserved; the linked final report supplies completed-run results.

Follow [NARRATIVE-WORKFLOW.md](NARRATIVE-WORKFLOW.md). Append later evidence with tested commit and branch; do not overwrite the baseline or claim unplayed coverage.

## shared_1 pilot validation — 28 October 2026

Post-change evidence, separate from the unchanged baseline above. Implemented against main `9bd7f60a3484155dc20c976b8cf6095309c98faf`, released as 0.6.1/schema 4/content 4. Only shared_1 narrative revised. See the [refined scene specification](SCENE-OUTLINE.md#refined-pilot-specification-shared_1--28-october-2026) and [localization checkpoint](../LOCALIZATION.md#english-first-shared_1-pilot--28-october-2026).

- `npm ci`: passed, complete asset checkout available.
- `npm test`: 86 engine/content tests and 26 CLI tests passed. Both opening branches switch languages and encode/decode saves at every node; custom-name cases cover both locales, dollar replacement syntax, braces, accents and HTML-like literal input. Effects, evidence, slot consumption and stable action IDs are checked. Unknown persisted reference keys are rejected. The CLI semester switching test now compares event identity independently of translated display text.
- `npm run typecheck` and `npm run build`: passed.
- Actual public JSON CLI: four runs (`demonstrate`/`observe` × English/Hungarian), 23 reached nodes each. Each run switches both ways without revision change, restarts the process at `opening_questions_4`, resumes identically, completes the scene, checks the custom name and translated journal, and switches the completed journal's language. No author mode or state injection. This is deliberate branch verification, not a blind literary playthrough.
- Full-route regression: repository `tools/cli-playthrough.mjs --route friendship` reached the actual week-16 friendship ending, 229 commands and 163 played lines. This scripted first-choice route is not all-romance/refusal/weak-preparation acceptance.
- Assembled-scene review: source plus opening expansion inspected; all 28 nodes reference the new bilingual pilot. Both reachable 23-node paths retain information order. English and Hungarian were reviewed together for voice and meaning; no independent human literary acceptance is claimed.
- Browser review attempted: Vite bound to 127.0.0.1, but the separate cloud browser returned `ERR_CONNECTION_REFUSED`. No successful interactive visual/mobile review or animation review is claimed.

Remaining findings (recorded, not patched): shared_2 still spotlights Soma's absence/energy and inventory continuity; later narrative/journals/epilogues still hardcode Márton; later persisted prose and descriptions remain partly Hungarian; later identity/confession timing remains the old runtime. All baseline later-scene findings remain open. The pilot fixes NAME-01/DIALOGUE-01/DIALOGUE-02/PLOT-01 only within shared_1.

Remaining creative questions: user acceptance of the two rewritten branches; the previously unresolved visible magical workshop effect, late clue chain and broader relationship pacing require later scoped decisions. No new magical effect, clue, character departure, art or scheduling change was introduced here. The game still defaults to Hungarian pending the whole-game migration.
