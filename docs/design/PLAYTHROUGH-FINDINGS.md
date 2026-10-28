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

## Opening continuation playtest — 28 October 2026

Working baseline `264e1de38c81d794ed0b91832ed59bf1e02a2456`; revised runtime 0.6.2/schema 4/content 5. This section supersedes the earlier pilot's open shared_2 spotlight/chronology findings for shared_2–3 only. The independent baseline report remains unchanged.

**Implemented:** English-first shared_2/shared_3 rewrites and Hungarian translation; refined entry/exit briefs; warmer photograph banter before a private update; mundane Soma lamp callback without his portrait; one next-morning reply arranging the next week's meeting; one connected account of the two hearings; Lilla's chosen chair and coffee ending. Repeated permission/privacy lectures are replaced by direct dialogue and action under the user's new writing direction. Both consequential contact/interview choices remain. No new supernatural clue, mechanic, schedule, art or later-scene rewrite.

**Validation actually run:**

- `npm ci` passed. Final `npm test`: 91 engine/content and 26 CLI tests passed; `npm run typecheck` and `npm run build` passed; `git diff --check` passed.
- Public JSON CLI, no author mode or state injection: all eight `ask`/`space` × `listen`/`timeline` × `en`/`hu` combinations. The first workshop used `demonstrate` for ask runs and `observe` for space runs. Each played 66 or 67 nodes across shared_1–3, switched both ways at every node without revision change, restarted the process at shared_3/line_2, resumed identically and reached the available shared_4 scene. Custom name `Álex $& {playerName}` rendered literally. Journals/reactions were resolved text and only grounding/returned_lilla/phrase/time_gap were earned.
- English ask/listen and Hungarian space/timeline CLI transcripts were read as assembled sequences, then both catalogs compared. Review corrected a lamp-date inconsistency, removed a joking photograph request that conflicted with the bagged camera, and aligned the space branch's actual contact timing with its label. These are assistant editorial checks, not independent human acceptance.
- Repository public-CLI route runner: `--route rebeka` reached week-16 `rebeka`; `--route withdraw` reached week-16 `estranged`. Each used 328 commands and 261 played lines. These are scripted route regressions, not blind literary playthroughs. The full test suite also covers all main romances, triad and poor preparation.
- Stage/cast metadata is explicit and resumable: Dénes joins only at his entrance, next-morning message has the player alone, Rebeka is absent after leaving for coffee. Stage labels resolve in both locales. Initial validator failures from empty stage labels were repaired with catalog references before the final passing suite.
- No new interactive browser/mobile visual review was performed. CLI coverage does not establish layout/animation acceptance; the previous cloud-browser connection limitation remains recorded above.

**Remaining findings:** shared_4 onward still has bureaucratic prose; later shared scenes still foreground Soma and identify/confess too early. First individual scenes and later journals/epilogues retain hardcoded player references and partial Hungarian content. Later romance continuity/intimacy findings in the baseline report remain open. These were not patched during route regression. Continue with first individual meeting briefs and deliberate rewrites, preserving the new natural-conversation direction and testing their connections to this opening.

No major story/character departure was needed. Human literary acceptance, visible magical workshop mechanics and the coordinated later clue/timing migration remain unresolved; this batch does not silently settle those decisions.
