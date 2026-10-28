# Game engine reference

> **Status:** Active; documentation reconciled 27 October 2026. | **Purpose:** Runtime contracts, scheduling, saves and endings.

Current design authority: [docs/design/README.md](docs/design/README.md). Feature status: [design tracker](docs/design/TRACKER.md). This reference describes implementation contracts; it does not certify narrative quality, image review or final user approval. Historical release statements are not current version values.

## Architecture

| Layer | Active source | Responsibility |
| --- | --- | --- |
| State | `src/game/engine/types.ts`, `content/types.ts` | Generic state and separate required campaign fields |
| Engine | `src/game/engine/logic.ts` | Generic immutable reducers, slots, prerequisites and targeted effects |
| Campaign | `content/rules.ts`, `runtime.ts` | Initial state, 16-week schedule, economy, directions, confrontation and ending rules |
| Story | `content/catalog.ts` | Sole typed registry assembled from shared, relationship, triad, optional, opening, romance, conversation, outing and Virág modules |
| Validation | `content/validate.ts` | References, text, choices, prerequisite/continuation cycles and story reachability |
| Images / moments | `content/assets.ts`, `content/animations.ts` | Runtime selections; detailed availability in the [art register](docs/ART-REGISTER.md) |
| Saves | `engine/save.ts`, `content/saves.ts`, `store.ts` | Generic envelope codec, campaign validation and browser persistence |
| UI | `src/game/ui/` | Castle-romance planning hubs, dialogue, journal, recaps and epilogues |
| Audio | `src/game/audio.ts` | Optional location/mood music; audio failure cannot block story |
| CLI | `src/game/cli/`, `content/actions.ts`, `content/view.ts` | Shared action dispatch and player-visible observations |

Paths beginning `content/` or `engine/` above are relative to `src/game/`. The generic engine does not import campaign content. `RuntimeRules` injects initial state, week count, economy, save discovery and campaign-specific effect/completion/direction/validation behavior. A separate synthetic campaign tests reuse. Epilogue text lives in `content/epilogues.ts`; presentation calls the content runtime rather than encoding plot logic.

## Weekly schedule and object hubs

| Slot | Period | Rule |
| --- | --- | --- |
| 0 | Shared story | Guaranteed weekly scene; uses its authored lighting |
| 1 | Daytime | One discretionary activity; office hub |
| 2 | Nighttime | One discretionary activity; bedroom hub |
| 3 | Recap | Advance only after required story and activity slots are complete |

There are 16 shared and 32 discretionary opportunities, not three free slots plus an invisible workshop. The saved slot selects the planning hub. Opening menus, browsing destinations or changing dialogue lines costs no time. Completing a scene/activity consumes its one slot. Movement inside a staged scene does not add a charge.

`RoomPlanner.tsx` uses an uncropped room image with percentage hotspot coordinates. Outlines and action labels are always visible; no hidden-only hover clues. Missing background objects get labelled fallback icons. Keyboard focus remains visible, mobile targets are at least 44×44px, and hotspot regions must not overlap.

| Object | Actions |
| --- | --- |
| Office desk | Shared story and eligible preparation |
| Door | Destinations and scenes available in the current period |
| Phone | Personal meetings, coffee, paid outings and persistent gift replies |
| Journal/books | Known evidence, journal, relationships and eligible direction |
| Armchair | Rest during day; sleep at night |
| Shelf | Buy/give gifts |
| Bag | Recycling and Archive Pairs daytime jobs |

The door does not bypass time or enable nighttime jobs. The bedroom journal is not a workshop control. Jobs/preparation are daytime only; T7/T8 are nighttime only. Other personal scenes/coffee may support both periods. Preparation appointments require different weeks because there is only one discretionary daytime slot per week.

`RULES.schedule` defines periods and activity gates; optional `Scene.periods` limits scene admission. The shared reducer checks the same gates used by availability menus. Saves validate scene/job period as well. Work may be cancelled only before its first move.

## Costs and availability

Personal scenes cost 8 energy; shared scenes restore 4, a new week restores 24, and rest/sleep restores up to 32. Low energy does not block required story. Supported confrontation costs another 8; weak preparation costs 28. Jobs claim one daytime slot and 12 energy. Exact money, points, gifts and puzzles are owned by [LEISURE-ECONOMY.md](docs/LEISURE-ECONOMY.md).

Earlier personal milestones remain available from their recommended week through week 14, subject to explicit prerequisites. T7 is week 14 only; personal aftermath is week 16 only. Show actual deadlines. Missing an optional meeting never completes it automatically or blocks required investigation.

## Dialogue, presentation and staging

Transparent NPC portraits overlay the location scenery outside the parchment dialogue panel. Preserve proportions and avoid cropping. Márton/player and narrator have no portrait, monogram or empty portrait slot. Unavailable NPC art gets a small labelled placeholder; missing expressions fall back to neutral, not another misleading emotion.

Desktop places the portrait in the scenery beside the text; mobile reserves upper scenery with full-width dialogue/choices below. Portraits must not cover text or controls. Long prose scrolls inside its allocated area. Header/text/control geometry remains stable so short and long lines do not shift the first Continue/choice row; further choices extend below it.

`Choice.next` branches to another authored node. `requires` reads completed witnessed scenes/evidence/decisions; direct reducer calls cannot bypass unavailable options. Effects remain pending until scene completion. Use at most four contextual choices, without a mandatory good/bad answer ladder.

Named `Scene.stages` declare location/background, participants, proximity and optional lighting. Every staged node, including narration and merges, explicitly selects `Line.stage`; unstaged nodes use scene defaults rather than inheriting prior display state. `sceneStage`/`sceneLighting` serve browser and CLI. Save/resume restores staging from the current node. Speakers must be present and stage cast must be within scene participants.

`Choice.localRequires` reads decision IDs pending within this scene only. It supports callbacks without certifying global evidence early; include an unconditional alternative. Privacy is separate from touch. Slower physical pace retains romantic progress; refusal remains a distinct action. The current design includes meaningful fade-to-black intimacy: [game design](docs/design/GAME-DESIGN.md#relationship-intimacy--27-october-2026). Documentation review does not certify every existing branch against that newly clarified presentation rule.

The first three expanded dates have optional quieter locations, mutually chosen kisses and clear departures. Six paid outings also have endings. Current broader scope is in the [tracker](docs/design/TRACKER.md), with authoring details in [SCENE-STAGING.md](docs/SCENE-STAGING.md).

## Knowledge, bonds and witnessed decisions

A scene cursor stores pending effects. Only the final completion commits `completed`, `evidence`, `decisions` and journal changes. Journals/recaps derive from witnessed state, never calendar-only future revelations. Effects name their target bond rather than inheriting the previous speaker.

Week-8 direction is intent, not commitment. After an affirmative personal commitment, the planner does not silently rewrite direction; withdrawal is handled in authored follow-up. The triad tracks the two Márton bonds and the women's independent bond, separate conversations, all three affirmative decisions, and individual repair/commitment. Declined T5/T6 can lead to a mutually wanted single route or friendship. Gifts, repeated coffee and numeric scores cannot substitute.

Nine contextual coffee scenes cover early (weeks 1–7), middle (8–14) and late (15–16) periods for each main woman. Each is once per character/period and costs one discretionary slot/8 energy. Completed earlier topics unlock callbacks. Coffee grants no romance commitment or indispensable evidence. The old repeatable `talk` activity is retired.

## Confrontation and aftermath

Week 15 always interrupts the ritual and kills the vampire on a completed campaign. Backup and signal preparation together support the intervention; without them helpers still act, with more exhaustion/evidence loss. Week 16 handles public/limited/internal disclosure and institutional acknowledgment, partial explanation or suppression. Romance is not required.

Two discretionary slots remain after the institutional scene. T8 combines both individual aftermath resolutions with the shared aftermath in one slot. Final relationship evaluation waits until the player actually closes the semester from week-16 recap. Single, triad, friendship, unresolved and estranged outcomes remain distinct. Relationship exposure is separate from supernatural preparation/danger.

## Saves and CLI

Current baseline: package release 0.6.0, schema 4, content epoch 3; read `package.json`/`src/game/release.ts` rather than relying on this snapshot after future changes. Stable browser key: `ligetvar-save`. Exact metadata, discovery precedence and restart policy are in [VERSIONING.md](docs/VERSIONING.md).

No migration, name import or alternate legacy gameplay. Reject incompatible versions, malformed JSON/state, unknown scene cursors, forged evidence origins and invalid pending effects. Failed loading never overwrites the stored save with a fresh game. Mid-scene saves retain cursor and pending effects. Browser write failures are visible while in-memory play may continue.

The CLI uses the same action/query surface and save envelope, with atomic writes to an explicitly selected file and exclusive ownership. Observations hide unrevealed cards and unearned evidence; omniscient proofreading requires author mode. Asset descriptions describe actual visible assets and neutral fallback. Transcripts/findings do not modify story text. See [CLI.md](docs/CLI.md).

## Lighting, moments and audio

`backgroundFor` uses exact lighting, then another evening/night variant, then base art. It never substitutes a late-day image for day. Non-shared scenes in saved nighttime slots resolve to night, including scenes without explicit period metadata. Shared scenes retain authored light. Baked-lighting variants bypass duplicate CSS tint; office night art is for dialogue, not a rearrangement of planner hotspots.

`Line.moment` refers to optional GIF/WebP metadata. Reviewed clips need separate posters; planned clips have null files. Pause/reduced motion substitutes the poster. Load failure falls back to poster/description without blocking choices. Animation drives no reducer effects, and playback position is not saved. Four Virág loops and four posters currently exist; their availability is not proof every playback/visual acceptance gate passed anew.

Audio is optional UI presentation with eight registered mood tracks, source files under `music/`, and mute persistence. Source/file checks establish presence, not listening quality or seam review. Current design and optional recovery ideas are documented in the [foundation review](docs/design/FOUNDATION-REVIEW.md).

## Verification

`npm test` runs engine/content and CLI suites; `test:engine`/`test:headless` are engine/content aliases; `test:cli` runs CLI processes/routes. `npm run typecheck` checks TypeScript; `npm run build` builds Vite. Browser layout scripts remain separate. Report only executed results.

Retired `src/core/`, JSON merge adapters and old test entry points are not runtime architecture. Historical narrative/localization under `docs/archive/legacy-narrative/` is inactive provenance. See the [progress log](docs/REDESIGN-PROGRESS.md) for dated checks and the [tracker](docs/design/TRACKER.md) for current unfinished gates.


## Browser automatic arrivals and transition presentation

The browser store normalizes new/action/resumed states through `content/flow.ts:enterMandatoryScene`. Only an available shared scene at planner slot 0 opens automatically; no completion, evidence, pending choice or extra slot is granted. Availability and opening still use the common runtime reducers. CLI scene selection remains explicit.

`ui/Transition.tsx` observes destination identity (week, slot, phase, scene, stage location/background and lighting), rather than every dialogue line. It uses existing period-aware art. Background mode auto-dismisses after 1.8 seconds (250 ms under reduced motion); story-card mode waits for Skip/Escape. Underlying gameplay is inert while displayed. Preferences use the separate optional `ligetvar-transitions` key. Animation state is never saved, so reloading cannot strand or advance a scene. Off disables presentation without disabling mandatory arrival.
