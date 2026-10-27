# Redesign and feature tracker

> **Status:** Active tracker, reconciled 27 October 2026 against main `805b3e0` (game 0.6.0). | **Purpose:** Separate implemented redesigns, unfinished gates and future work.

This is the single current design-status tracker. Existing roadmap IDs are retained for traceability. The baseline uses current source metadata and documented implementation evidence; this documentation change does not claim a fresh gameplay, visual or translation audit.

## Status definitions

| Status | Meaning |
| --- | --- |
| Implemented | The stated scope exists, with linked implementation or recorded validation. Does not imply final creative approval or all possible extensions. |
| Partial | A usable implementation exists, but the stated area has open scope or acceptance gates. |
| Planned | User-requested future work; not implemented for the stated scope. |
| Proposed | Candidate idea or unresolved design choice; not approved for implementation. |
| Blocked | Cannot proceed until the named dependency is resolved; record that dependency explicitly. |

## Current redesign

| ID / area | Status | Implemented scope and evidence | Remaining gate / next step |
| --- | --- | --- | --- |
| CORE — engine/content separation | Implemented | Generic engine, injected campaign rules and single typed [catalog](../../src/game/content/catalog.ts); [engine contract](../../ENGINE.md) | Preserve separation in every addition; not permission to declare the entire redesign complete. |
| SCHEDULE — semester structure | Implemented | Fixed 16 weeks with shared → day → night → recap; [game design](GAME-DESIGN.md), [engine contract](../../ENGINE.md) | Adjustable pacing is G1–G3 below. |
| KNOWLEDGE — prerequisites and decisions | Implemented | Witnessed prerequisites/evidence, distinct bonds and knowledge-aware records; [engine contract](../../ENGINE.md) | Verify new scenes preserve knowledge order and affirmative decisions. |
| ENDINGS — required aftermath | Implemented | Confrontation, institutional aftermath and personal outcomes; [engine contract](../../ENGINE.md) | Continued editorial/route review; new content must preserve ending order. |
| STORY — writing depth | Partial | 27 October: [structural review and English story outline](STORY-REVIEW.md), user-confirmed romance-first direction, 16 weeks and dangerous intervention; no conversation edits. Expanded opening, individual romance and contextual conversations; [voice coverage](CHARACTER-VOICES.md) | Later shared scenes and some triad scenes remain compact; no claim of a complete literary rewrite. |
| UI — hub and dialogue redesign | Partial | Object hubs, labels/outlines, portrait overlays and period-aware backgrounds; [engine reference](../../ENGINE.md), [art register](../ART-REGISTER.md) | Original F3 layout/obsolete-style cleanup and F4 overall acceptance remain open. Recheck mobile and hotspots when changed. |
| ECONOMY — puzzles, outings and gifts | Implemented | Move-limited jobs, money/program points, six outings and personal gift replies; [economy contract](../LEISURE-ECONOMY.md) | Future balance changes require their own scope and evidence. |
| MINI1 — recycling feedback | Implemented | 27 October: generated four-object transparent atlas; swap/return, clearing, gravity/refill, cascade scores and free hints; shared resolver playback in [puzzles.ts](../../src/game/content/puzzles.ts) and [minigames.tsx](../../src/game/ui/minigames.tsx). See [production/validation](../RECYCLING-PRESENTATION.md). | User visual acceptance and browser/mobile playback review remain open; archive-game art is outside this pass. |
| V1–V4 — release/save boundary | Implemented | Version metadata, envelope and restart messages; [versioning](../VERSIONING.md), [detailed gates](../IMPLEMENTATION-ROADMAP.md#phase-1--release-identity-and-incompatible-saves) | Preserve compatibility detection; no save migrations. |
| C1–C6 — playable CLI | Implemented | Shared actions, human/JSON modes, visual observations, transcripts and authored route verification; [CLI contract](../CLI.md) | Reverify affected routes after behavior changes. |
| STAGE — first scene-staging pass | Implemented | Named stages, local choice memory, three expanded dates, kisses and six outing farewells; [staging contract](../SCENE-STAGING.md) | Broader scope is S1–S5 below, not already complete. |
| VR1–VR2 — Virág story | Implemented | Eight optional chapters, independent reporting success and current casual-contact direction; [story contract](../VIRAG-STORY.md) | Editorial/translation work remains distinct from runtime availability. |
| ART — runtime art | Partial | 25 portraits, 14 scene backgrounds, title image and 13 icons present; [art register](../ART-REGISTER.md) | Gréta affectionate missing; earlier reviewed reference masters removed; general final user style acceptance open. |
| VR3 — Virág art | Partial | Five portraits and hallway present; [visual brief](CHARACTER-VISUALS.md) | Historical reviewed identity sheet/source set absent from current main; candidate presence is not recovered approval. |
| AN1–AN2 — moment infrastructure | Implemented | [Animation registry](../../src/game/content/animations.ts), line hooks, poster/pause/reduced-motion contract; [animation plan](../ANIMATION-PLAN.md) | Keep planned and reviewed states honest. |
| AN3–AN4 — moment production | Partial | Four Virág loops and four posters exist and are labelled reviewed in the registry | Older roadmap statements claiming no production clips are superseded. Full frame/seam, 320/390/1440px playback, failure/reload and user pilot-acceptance gates are not re-certified by a metadata audit. |
| DOC2 — legacy foundation review | Implemented | [Document-by-document review](FOUNDATION-REVIEW.md), explicit conflict dispositions and source-checked technical corrections | Preserve archives as history; do not import a recovered idea as a shipped feature. |
| INT1 — relationship intimacy presentation | Partial | User confirmed meaningful intimacy with fade-to-black presentation on 27 October; [authoring contract](GAME-DESIGN.md#relationship-intimacy--27-october-2026) | Audit existing single/triad/Virág branches, adapt any graphic passages, retain invitation/reconsideration/aftermath and verify browser/CLI save/choice parity. No runtime rewrite was performed in this documentation review. |
| AUDIO — optional soundtrack baseline | Implemented | Eight distinct MP3 blobs and UI mood/mute wiring in [audio.ts](../../src/game/audio.ts) | Source/file presence only; listening, seamless-loop quality and device behavior were not reviewed in this task. |
| ART-PROMPTS — character generation preparation | Partial | 27 October: visually reviewed nine neutral portraits and transformed Soma; [English positive/negative prompt pack](CHARACTER-IMAGE-PROMPTS.md), observed details and approved everyday full-body extensions recorded in [visual authority](CHARACTER-VISUALS.md). | User to specify selected appearance revisions; Virág height and supporting full-body outfits unresolved. No generation, runtime change or final art approval claimed. |
| DOC1 — design documentation | Implemented | English design folder, centralized character briefs, this tracker and updated project/contributor entry points | Keep this folder current in the same commit as design changes. |
| F3–F4 — overall completion | Partial | Typed runtime, current art manifest and prior cleanup are in place; [original completion gates](../../Ligetvar-Redesign-Plan.md#10-implementation-sequence-and-completion-gates) | Finish applicable art/UI cleanup, full asset/text resolution, retired-ID checks, supported-save documentation and narrative/runtime acceptance. A build alone is insufficient. |

## Approved future work

These items remain backlog. This documentation task does not authorize starting them or choosing unresolved designs.

| ID | Status | Future scope | Dependency / completion evidence |
| --- | --- | --- | --- |
| L1 | Planned | String inventory, key/glossary convention and localization API | Decide persisted-text/version policy; document shared browser/CLI API. |
| L2 | Planned | Extract active Hungarian text | Preserve behavior and verify interpolation/plural handling. |
| L3 | Planned | English interface, errors, puzzles, economy, journals and asset descriptions | Localization API and extracted strings; complete key coverage. |
| L4 | Planned | English story, choices, replies and endings | Per-scene translation and proofreading coverage, not a blanket completion claim. |
| L5 | Planned | Locale switching and browser/CLI parity | Equivalent locale-neutral outcomes and cross-locale save/reload checks. |
| L6 | Planned | Translation acceptance | Missing-key/placeholder checks, both-language route proofreading and English mobile/desktop review. |
| S1 | Planned | Broader multi-location staging | Extend later individual/shared/triad scenes with explicit cast, arrivals, departures and resumable branches. |
| S2 | Planned | Need-driven location/art expansion; 27 October user direction: each woman has a favourite place enabling distinct dating experiences | [Place and experience brief](STORY-REVIEW.md#favourite-places-and-distinct-dating-experiences); 27 October: Virág's after-hours school document searches confirmed, replacing the café proposal. Exact room and chapter choices, other women's places and night-slot feasibility remain open. No runtime/art/conversation changes. |
| S3 | Planned | Broader character-specific physical staging/art | Virág clips do not complete main-cast coverage. Preserve mutually chosen touch, neutral alternatives, mobile containment and reduced motion. |
| S4 | Planned | Later-scene ending coverage | Audit later romantic/shared/triad meetings; preserve already implemented first-date and paid-outing goodbyes. |
| S5 | Planned | Richer conversation callbacks | Broaden local memory with valid fallbacks and no premature global evidence. |
| G1 | Planned | Design adjustable pacing | Choose profiles and slot budgets while preserving relationship access and ending order. Current baseline stays 16 weeks. |
| G2 | Planned | Coordinated campaign scheduling | G1 first; share scene windows, milestones and labels across browser/CLI. |
| G3 | Planned | Pacing save policy and route acceptance | G2 first; verify every supported duration and route, including refusal, weak preparation and save/resume. |

Detailed acceptance criteria remain in the [implementation roadmap](../IMPLEMENTATION-ROADMAP.md). Use this tracker for their current status.

## Proposals and unresolved decisions

| Idea | Status | Decision needed |
| --- | --- | --- |
| Parking-lot goodbye, covered garden passage, private sitting room | Proposed | Select locations based on authored scene needs; no matching new background is claimed. |
| Short/default/long campaign presets or exact alternative week counts | Proposed | Agree durations, presentation and pacing constraints in G1. |
| Remaining supernatural mechanics explicitly labelled proposed in the original plan | Proposed | Fix specific rules before new scripts depend on them. |
| Extending animated moment production to the other women | Proposed | Choose scene moments and approve the relevant pilot scope before bulk asset production. |

## Recovered ideas awaiting a separate decision

The foundation review did not approve new features. Transcript/backlog replay, skip-read/auto-advance, galleries, coherent author scenario fixtures, optional weather/reciprocal-gift scenes and desktop packaging remain **Proposed**. Audio infrastructure already exists; additional soundtrack production or remastering is not approved merely by rediscovering the old music brief. See [review dispositions](FOUNDATION-REVIEW.md#recovered-ideas-and-open-design-work) before adding any of these to the planned backlog.

## Updating this tracker

For each changed row, record status, implemented scope, remaining gate, evidence link and date. Link actual code, review records or commit/Actions results; avoid duplicating whole logs. A file being generated does not prove review; a passing test does not prove editorial or final user acceptance.

If blocked, state the dependency and the work that can still proceed. When a proposal is approved, record the decision and move it into planned work before describing it as implemented. Preserve existing IDs; assign new IDs to new scope instead of silently expanding a completed row.

## Change record

| Date | Change | Validation / limits |
| --- | --- | --- |
| 27 October 2026 | Created the design authority, migrated current character briefs and reconciled the redesign/future-feature tracker. | Baseline main 805b3e0, package 0.6.0, existing contracts and animation manifest checked. Documentation links checked in this change; no new gameplay or image review claimed. |

| 27 October 2026 | Reviewed legacy foundations/conflicts and recorded the user's fade-to-black intimacy decision; corrected stale release/save/art documentation. | Documentation/source review only; no story rewrite, new asset or fresh visual/listening acceptance claimed. |
