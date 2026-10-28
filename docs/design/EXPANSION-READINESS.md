# Story depth and expansion readiness


**Subsequent implementation:** The user approved a one-year campaign. [YEAR-CAMPAIGN.md](YEAR-CAMPAIGN.md) records the 52-week calendar, sparse mandatory events and new validation. The 16-week/32-slot constraints below describe the audited pre-expansion baseline; story-size measurements remain historical evidence, not a measure of newly written content.
> **Audit:** 28 October 2026. **Baseline:** main a69b656c9f2955d86824c527880dca64808e59b7; runtime 0.6.2/schema 4/content 5, unchanged from the [eight-route review](PLAYTHROUGH-MULTIROUTE-2026-10-28.md). Assessment and recommendations only; no schedule, mechanics or prose changed.

## Story size

The concern that the current game is too compressed for a substantial romance/mystery is supported by actual played text. The semester calendar creates sixteen weeks of labels, not sixteen weeks of developed experiences.

| Completed run | Observed scene-text words | Approximate reading minutes at an assumed 180–220 words/minute |
| --- | ---: | ---: |
| Friendship | 2,551 | 12–14 |
| Rebeka | 3,829 | 17–21 |
| Boglárka | 3,760 | 17–21 |
| Gréta | 3,664 | 17–20 |
| Triad | 5,923 | 27–33 |
| Optional exploration with Virág | 5,668 | 26–31 |

These are regex word counts of distinct observed scene/line text in the linked review's condensed evidence, including narration and repeated wording at different IDs. They exclude reactions, choice reading, menus, journals, endings, puzzles, deliberation and animation. The slower Rebeka run mixed English opening with Hungarian later text and is excluded from comparisons here. All reading times are arithmetic illustrations, not measured play times or language-specific research. They cannot establish enjoyment or a minimum acceptable game duration.

The assembled catalog contains **68 scenes / 1,007 nodes / 12,673 words of scene text**, using Hungarian presentation consistently. This total includes mutually exclusive branches and optional material that one route will not see. It is not the length of one playthrough. Choice labels add further text but do not substitute for developed scenes.

The shared spine is only 2,677 words across all branches. Shared_1–3 have 521/372/424 words across their branches; each later shared scene has 83–148 words. Thus the revised opening gives way to terse summaries. A first individual relationship route contributes roughly 1,100–1,300 words beyond the shared route in the sampled completions. Character milestones exist, but relatively little lived interaction connects them.

**Editorial recommendation:** expand experiences and consequences, rather than padding existing lines. Give the player ordinary time with each woman, shared enjoyable activities, a personal goal that develops across meetings, disagreement grounded in witnessed events, repair demonstrated later, and a changed post-crisis relationship. Integrate supernatural unease into these experiences rather than replacing romance with successive records briefings. Preserve the strong everyday humor listed in the multi-route report.

A possible production target is **12,000–20,000 route-visible scene words** for a substantial first single-romance pass, then reassessment by complete playthrough. This is a proposed planning range, not an approved requirement, industry standard, guaranteed duration or a target for every route to match. A good short story remains possible below it. For a desired multi-hour experience, choose a play-time/content budget explicitly and test it; sixteen week labels alone do not supply that budget.

## Technical readiness

| Expansion | Assessment | Evidence and required work |
| --- | --- | --- |
| More dialogue/branches in existing scenes | Ready within current model | Typed catalog, node transitions, prerequisites, local choice memory and staged scenes already support this. No engine line-count limit needs increasing. Preserve finite graphs, four-choice limit, save/text contracts and earned knowledge. |
| More optional story scenes | Supported, with scheduling work | Add catalog content, prerequisites, effects, deadlines, localization and route coverage. Every completed scene consumes a slot; simply registering scenes does not prove their combined schedule is feasible. |
| More locations used by scenes | Supported with coordinated registration | Generic engine uses string location IDs. Campaign LocationId union, BACKGROUNDS/LOCATIONS, locale keys, descriptions and any audio/art mappings must agree. Door destinations already derive from registered locations with available scenes. No reducer rewrite is inherently needed for another scene destination. |
| More places to explore freely | Not an existing general system | Current destinations open available scenes; there is no general persistent exploration/object-interaction layer for arbitrary destinations. New room hubs also need room/hotspot configuration and interaction rules. A background alone does not create a place with activities. |
| More activities implemented as authored scenes | Supported | Existing outing/conversation pattern supports an activity with branches, prerequisites and optional money/points cost. A new picnic or film evening can usually be content, without inventing a minigame. |
| New repeatable jobs or minigame mechanics | Requires extension | RuntimeRules has generic job data, but GameAction/isGameAction, content runtime, view action list, PuzzleKind/state validation, CLI commands and minigame/planner UI explicitly enumerate recycling/archive. Add mechanics through shared dispatch, not browser-only buttons. |
| More slots / adjustable duration / alternate campaign pacing | Not ready as a configuration-only change | Core slot types are 0–3; scene admission, activity admission and spendSlot assume two discretionary slots. Campaign validation hardcodes 16 weeks and milestones 15/16; ending evaluation, route windows, UI rhythm and tests also embed this schedule. Changing RULES.weeks alone is insufficient. |
| Expansion saves and localization | Existing foundation; unfinished content migration | Versioned envelopes and current-only compatibility policy exist. Added fields/actions need validation and save/resume checks. Later persisted prose is not wholly locale-neutral; English-first migration remains partial. Do not promise old saves survive schedule/content changes. |
| Scalable reachability validation | Partial | Registry checks references, finite graphs and prerequisite/deadline consistency; synthetic campaign tests cover core reuse. These do not prove a collection of individually reachable optional scenes fits all day/night slots and windows. Add route/capacity checks as expansion grows. |

Inspected: engine/types.ts and logic.ts; content/catalog.ts, types.ts, rules.ts, runtime.ts, actions.ts, view.ts, validate.ts, puzzles.ts, assets.ts; ui/RoomPlanner.tsx; scene-localization.ts and current technical contracts. Paths are relative to src/game except the documented contracts.

## The schedule is the expansion bottleneck

There are 16 shared and **32 discretionary** opportunities. A standard triad completion uses 18 discretionary scenes; two preparation sessions make 20. Adding all eight Virág chapters makes 28. Completing all six paid outings would take six more scene slots and their 30 activity points require at least five maximum-reward shifts: **39 discretionary slots before any coffee or rest**. Not all optional content needs to fit one run, but the deficit must be deliberate and communicated, not discovered after writing.

More weeks and more slots are separate design choices. Longer scenes can deepen a 16-week campaign without changing the schedule. More locations can diversify existing dates without adding slot pressure. More selectable activities create competition unless some are short interactions with explicitly designed costs or the schedule changes. Do not silently make everything free or automatically grant missed scenes.

## Recommended implementation sequence

1. **Set the experience budget:** desired first-route depth, intended optional-content tradeoffs and whether the existing 16-week/two-slot rhythm remains. Current tracker G1–G3 remain planned; this audit does not select alternate durations or budgets.
2. **Prepare for the chosen expansion:** centralize campaign milestones and slot descriptors across reducers, validation, UI and CLI if variable pacing is chosen; unify location metadata; introduce activity registration when a third distinct mechanic actually needs it. Retain typed content and the generic-engine/campaign boundary. Avoid a new plugin framework or architecture rewrite without a concrete need.
3. **Prove one vertical slice:** one additional place and one meaningful activity, delivered through browser and CLI with period/cost admission, refusal/continuation paths, explicit staging, save/resume, descriptions and translation. This is a proposed acceptance slice, not new shipped content or a selected location.
4. **Expand and play:** fix the multi-route report's high-priority continuity issues; deepen a complete character route and its shared scenes, then measure played words/time, review choice consequences and rerun affected routes. Only then scale the writing to the rest.

Definition of expansion-ready: adding an ordinary scene/location does not require changing the generic reducer; each new mechanic reaches both clients through shared actions; schedule changes have one coherent configuration rather than scattered constants; save validation rejects incompatible state clearly; route tests prove mandatory progression and intended optional combinations remain feasible. The current engine meets parts of this definition, not all of it.

## Validation

Catalog counts used the assembled SCENES registry and presentLine(..., 'hu', 'Márton'); played counts used observedLines from the eight-route evidence. Word pattern: Unicode letters/numbers with internal apostrophes/hyphens. Existing engine/content suite rerun during this audit: **94 passed, 0 failed**, including the unrelated three-week campaign test. Previous review's 26 CLI tests passed. No expansion fixture, new gameplay implementation, browser review, measured human play duration or full English acceptance is claimed.
