# Implementation roadmap — versions, CLI, scenes and localisation

> **Status:** Phases 1–2 implemented; first staged-date pass implemented; remaining scene work, campaign pacing and localisation planned. Approved objectives recorded 25 October 2026. | **Purpose:** Ordered implementation tasks, acceptance gates and durable progress tracking for future contributors.

## Scope and authority

Implement these objectives in order:

1. Version the game and its saves. Explain clearly when a breaking change makes a save unusable.
2. Make the complete game playable from the command line, without a browser or graphical UI, for agent gameplay testers and proofreaders. Describe the visual assets in text.
3. Add localisation infrastructure and complete English text alongside Hungarian.

The user explicitly does **not** require backward compatibility. Do not reintroduce old engines, puzzle modes, save migration, or name import. Detecting and explaining an incompatible save is required; loading or converting it is not. Compatible saves from an earlier non-breaking game release should remain usable without migration.

This document is authoritative for these new objectives and supersedes conflicting save-policy guidance. The [redesign plan](../Ligetvar-Redesign-Plan.md) remains authoritative for story canon; [engine reference](../ENGINE.md), [economy](LEISURE-ECONOMY.md) and [character voices](CHARACTER-VOICES.md) define current gameplay. Preserve the separation between generic engine, campaign content and presentation. Do not redesign story or economic balance as part of tooling work.

The outcomes above are user requirements. The phase 1 contract is implemented in [VERSIONING.md](VERSIONING.md), and phase 2 commands are documented in [CLI.md](CLI.md). Phase 3 interfaces below remain proposed defaults. Adjust details when inspection justifies it, record the decision, and preserve the acceptance gates.

The 0.4.0 staged-date work was subsequently prioritized by the user. The remaining scene and campaign-pacing tasks below are backlog only: on 25 October 2026 the user requested documenting the rest, without starting further implementation. Localisation remains in the roadmap; this documentation update does not start or complete any backlog task.

## Verified starting point

Baseline: main [`db24833`](https://github.com/zodnosferato-code/ligetvar/commit/db24833dd8b066eac84bd0d6aaab20ef494ab7bd).

| Area | Current implementation | Gap |
| --- | --- | --- |
| Release identity | `package.json` version `0.1.0` | Not a shared runtime release contract or user-visible version |
| Saves | `version: 3`, key `ligetvar-save-v3`; strict current-state validation | No game-release metadata or distinct breaking-content version; old keys are not discovered |
| Save feedback | Missing/unsupported/invalid result and title-screen messages | Cannot explain a breaking change when only an older storage key exists |
| Game logic | Generic `src/game/engine/`; campaign bindings in `content/runtime.ts` | Good shared foundation, but no playable CLI adapter |
| Headless command | `npm run test:headless` runs automated tests | It is not interactive or agent-driven gameplay |
| Assets | `content/assets.ts` resolves backgrounds, variants and portraits with production notes | Notes are not concise descriptions of the screen |
| Language | Hungarian text embedded in content and UI; historic localisation files archived | No active locale system or complete English translation |
| Validation | Last cleanup: 51 tests, typecheck/build, 320/390/1440px browser flows and successful Actions | New objectives need their own evidence; existing passes do not prove them |

## Phase 1 — release identity and incompatible saves

### Contract

Use one game release version, sourced from `package.json`, and expose it to browser, CLI and save metadata. Use semantic release numbering for human-facing releases; record the source commit/build identifier separately for reproducible reports. Do not infer save compatibility from the release number alone.

Define a save envelope with explicitly named metadata, for example:

- `gameVersion`: release that last wrote the save.
- `saveSchemaVersion`: storage/payload structure version.
- `contentCompatibilityVersion`: epoch for story IDs, rules or progression meaning that invalidate existing state.
- `buildId`: exact build when available; optional diagnostic metadata, not a compatibility gate.
- `state`: validated current campaign state.

Compare schema and content epochs exactly against supported current values before interpreting state. A game release change with unchanged epochs is compatible, subject to normal validation. An unknown/newer epoch, an older incompatible epoch, or an unsupported pre-envelope save is not loadable. No migrations or permissive field backfilling. Distinguish malformed data from valid-but-incompatible data, and missing data from both.

A release change is save-breaking when it changes required state shape, scene/choice IDs referenced by saves, evidence/decision semantics, progression assumptions or serialized text representation. Pure translations, spelling corrections and asset replacements normally do not break saves when stable IDs and state semantics remain intact. Every implementation commit must assess whether either epoch changes; record the rationale for releases.

Use a stable save discovery location or a small storage index so later breaking releases still find earlier saves. For existing `ligetvar-save-v1/v2/v3` keys, implement **detection only**, not loaders: report unsupported saves when no current save is available. A valid current save takes precedence. Do not silently choose a stale save when the current one is corrupt or incompatible. Define and test precedence for multiple discovered keys. Older payloads without a game version should say that their release is unknown rather than invent one.

### User experience

Show the game version on the title/help surface. On incompatibility, show the detected save version if known, the current game version, and a plain explanation: “This save is no longer usable after a breaking update. Start a new game.” For a save from a newer unsupported release, explain that a matching release is needed. The same machine-readable reason must be available to the future CLI.

Disable unusable Continue actions. Never silently restart or overwrite on failed load. Keep Start new game explicit; make any replacement of an existing save clear. Preserve existing data until the user explicitly replaces/deletes it. Do not maintain old save formats merely to display their metadata. Exporting the original bytes for diagnosis may be offered, but is not a migration feature.

### Tasks and gate

- [x] **V1** Establish release metadata and independent save/content version constants; define bump rules and update release documentation.
- [x] **V2** Implement current save envelope, stable discovery, detection-only handling of older keys and structured load results.
- [x] **V3** Show versions and actionable incompatible/corrupt-save messages in the browser; remove the remaining ambiguity between missing and unusable saves.
- [x] **V4** Verify current round-trip; same-epoch different-release load; schema/content breaks; newer save; unknown metadata; malformed JSON; missing required fields; multiple-key precedence; failed loads never modify stored bytes. Check title-screen behavior on mobile.

**Exit gate:** Users can identify their game version and understand why an existing save cannot continue. No compatibility engine or migration is introduced. All current gameplay/save tests and relevant browser checks pass. Record the first release and epoch values actually implemented; this roadmap does not assign a future release number.

## Phase 2 — playable command line and proofreading support

### Shared runtime, not a second game

Create a Node entry point, provisionally `npm run play:cli -- ...`, supporting an interactive terminal and a non-interactive line-oriented JSON protocol. Do not require React, Zustand, DOM, localStorage, browser automation, images, audio playback, network services or credentials. Reuse the same campaign reducer bindings, availability checks, scene catalog, puzzles, rewards and save codec as the browser. Extract shared action/query adapters where needed rather than copy rules into CLI code.

Commands must cover a complete 16-week campaign: start/load/save, inspect current view, list available activities/scenes, open a scene, continue/select a choice, choose relationship direction, rest/advance week, start/play/claim puzzles, buy/deliver gifts with note and delivery choices, read replies, view journal/recaps, access paid outings and inspect the ending. Recycling needs indexed selection/swaps; Archive Pairs needs card selection and Next pair. Planner navigation itself must remain free. Display costs, prerequisites and failure reasons consistently with the browser.

Use IDs as stable action inputs, with numbered options as an interactive convenience. Reject invalid, stale or unavailable inputs without advancing time, changing state, paying rewards or consuming inventory. EOF, interruption and restart should leave a valid saved checkpoint. Choose explicit save paths and avoid sharing an implicit mutable save between agent processes; write files atomically and detect conflicting writers or require exclusive ownership. Explicit import/export of the same current envelope should support browser/CLI round-trips.

### Agent protocol and transcripts

Version the CLI protocol separately from game/save versions. A machine-mode response should identify protocol version, game/build versions, command/request ID, success or structured error, current phase, stable scene/line/choice IDs, rendered text, available actions, and visible assets. Include state revision or an equivalent stale-command guard for mutating requests. JSON output belongs on stdout; diagnostics belong on stderr. No ANSI escapes, prompts or interleaved logging in machine mode. Document exit statuses and finite command budgets for scripted runs.

Gameplay observation must not expose hidden cards, unrevealed evidence, future story, private decisions or locked-scene spoilers. A separate, explicitly selected author/proofreading mode may inspect the full catalog and branches, clearly labelled as omniscient; it must not grant gameplay progress or masquerade as a valid playthrough. Deterministic puzzle seeds and action transcripts must reproduce the same outcomes from the same initial state and build.

Provide a transcript/export command with versions, locale, stable content IDs, speakers, expressions, choices, reactions, visible scene descriptions and action outcomes. Let proofreaders attach findings keyed by scene/line/choice or text key, including category, observed text, suggested correction and reproduction commands. Findings are review artifacts: creating a note must not edit canonical story text automatically. Distinguish a branch inventory from a branch actually played and record coverage accordingly.

### Textual visual context

Add concise descriptions to active asset metadata, separate from production/review notes. Each rendered background variant, portrait/expression, transformation and fallback should describe the actual visible image in one or two sentences. Include scene lighting and composition where relevant. Label absent images honestly. Describe only what is visible; do not reveal motives, identities or plot knowledge unavailable to the player. Inspect images when writing descriptions rather than infer their content from filenames alone.

Use the same background/portrait resolution functions as the UI, including night variants, expression fallback and transformation timing. If an expression image falls back to neutral, distinguish the requested expression from the image actually shown. Do not invent a player portrait: Márton and narration currently have none. Keep visual descriptions reusable for future accessibility features and localisation. In machine mode provide asset IDs and description text; in terminal mode show changes without repeating a long description after every line. An `inspect`/`look` command can repeat the current visual context.

### Tasks and gate

- [x] **C1** Shared action/query surface and CLI entry point with human and JSON modes, help, errors and protocol documentation.
- [x] **C2** Full gameplay commands, file saves, current-envelope browser/CLI interchange, atomic writes and interruption handling.
- [x] **C3** Concise, visually checked descriptions for active assets and contextual screen rendering using the existing resolvers.
- [x] **C4** Deterministic transcripts, proofreading findings, separate omniscient inspection and coverage reporting.
- [x] **C5** Script complete friendship, three single-romance and triad playthroughs; include a rejected choice, repair/withdrawal outcome, both puzzles, gifting and paid outings. Compare outcomes and state transitions through the shared browser/CLI adapters. Test midway saves, half-revealed cards, one-time charges/rewards, EOF and incompatible files.
- [x] **C6** Publish a quickstart and replayable examples that a fresh agent can run without guessing commands. Add headless CLI smoke checks to CI; retain browser layout checks separately.

**Exit gate:** An agent can play from a fresh start to an ending, resume interruptions, see the text equivalent of the screen, and produce actionable proofreading reports without a graphical UI. Passing engine unit tests alone is insufficient.

## Phase 3 — localisation and complete English text

Establish a locale-neutral content model and one translation lookup/formatting layer shared by browser and CLI. Hungarian remains the source locale; add English as a complete selectable locale. Keep internal scene, decision, asset, gift and command IDs locale-independent. Localise presentation, never progression rules. Locale switching must not reset progress or change costs, rewards, prerequisite checks or available choices.

Inventory all player-visible strings before extraction: UI/help/errors, dialogue and choices, reactions, titles, journals/recaps, evidence, endings, gifts/notes/replies, puzzle instructions and feedback, activity labels, save incompatibility messages and asset descriptions. Include text generated dynamically by runtime code. Replace cached translated prose in persisted journals/replies/last messages with stable message/content references plus parameters where appropriate; retain player-authored text unchanged. Assess this serialization change against Phase 1 epochs rather than silently converting old payloads.

Use typed or validated keys and interpolation parameters; validate locale key coverage and placeholder parity. Support plural forms where required and locale-aware numbers/dates/currency formatting. Money remains Hungarian forints in English; no exchange-rate conversion. Character names, place names and Hungarian setting remain unless the glossary explicitly provides a translation. Do not import archived localisation files as active content.

Translate for natural dialogue and each character's established voice, not literal sentence matching. Maintain a glossary/style guide for names, institutional terms, relationship language and investigation clues. Preserve the meaning of choices, affirmative decisions, refusal, humour and evidence. Use the CLI to proofread both linear flow and alternative branches with source/target text and stable identifiers. Track translation and editorial review separately: presence of an English string is not proof that it has been reviewed.

Allow locale selection in browser and CLI. Production must not display raw keys or silently ship incomplete English. During development a Hungarian fallback can keep incomplete builds inspectable, but report missing keys clearly; English release gates require complete coverage. Validate language-specific wrapping and touch targets on mobile, plus Unicode terminal output and text-only exports.

### Tasks and gate

- [ ] **L1** String inventory, key convention, shared localisation API, glossary and persisted-text/version decision.
- [ ] **L2** Extract Hungarian into the active locale structure without changing gameplay; verify all interpolation/plural rules.
- [ ] **L3** Translate interface, save/CLI errors, puzzles, economy, journals and visual descriptions into English.
- [ ] **L4** Translate the entire active story, choices, replies and endings. Track translation and proofreading per scene/key batch.
- [ ] **L5** Locale switching, browser/CLI parity and regression tests: identical actions produce identical locale-neutral gameplay outcomes; save and reload work across locale switches.
- [ ] **L6** Complete missing-key/placeholder checks, Hungarian and English route proofreading, and English mobile/desktop visual checks. Publish coverage counts and reviewed/unreviewed batches.

**Exit gate:** Both locales cover every active player-facing string, with no unintended language mixing or raw keys. English is playable through all supported routes in browser and CLI; character voices and decision semantics have been reviewed. No historical archived content needs translation.

## Remaining scene improvements and adjustable campaign length

**Baseline:** [0.4.0 / `6d8af8f`](https://github.com/zodnosferato-code/ligetvar/commit/6d8af8f59a78c2b20a369edc4c3256804b18ceda). The stage resolver, same-scene decision checks, three staged individual dates with optional kisses, and goodbyes for those dates plus six paid outings are already implemented. Do not rebuild these foundations. [SCENE-STAGING.md](SCENE-STAGING.md) describes the actual contract. The unchecked tasks below are future work, not claims about current behavior.

### Scene and conversation expansion

- [ ] **S1 — Broader multi-location scenes.** Extend staging to later individual relationship meetings, the shared/triad route and appropriate shared-story scenes. Author arrivals, movement, character entrances/exits and returns explicitly. A walk or change of room remains part of the same activity; preserve the correct cast, background and day/night context on every branch and reload.
- [ ] **S2 — Additional natural locations and reviewed art.** Plan a small location inventory based on authored needs: park/lakeside path → parking lot for a goodbye; covered garden passage for shelter; a private sitting room or an invited apartment visit once the relationship supports it. These are candidate settings, not existing backgrounds or approved final designs. Add location IDs, matching day/night assets where needed and accurate CLI descriptions only after production and review. Do not reuse bedroom art as a living room or label unrelated scenery as a parking lot.
- [ ] **S3 — Physical staging beyond portrait scaling.** Add character-specific sitting beside one another, leaning closer, hugs and further affectionate moments where the scene calls for them. Produce suitable reviewed pose/composition artwork for hand-holding, embracing and kissing; existing portraits currently only change framing. Preserve mutual willingness, separate privacy from touch, and keep staying at the current distance or stepping back valid. Carry relevant physical details through movement, or narrate their end explicitly. Check mobile containment and reduced-motion behavior.
- [ ] **S4 — Ending coverage beyond the first dates.** Review later romantic meetings, shared/triad evenings and newly expanded scenes for a closing moment, a natural departure and a clear return to the planner. Cover accepted invitations, refusals, early departures and any authored interruption. The three first dates and six paid-outing farewells are already done; verify their continuity when extending them rather than treating them as missing.
- [ ] **S5 — Richer conversational callbacks.** Use existing `localRequires` and pending decisions in additional scenes so later replies reflect the player's earlier topic, pace and destination choices. Add character-specific callbacks and sensible branch reconnections. Keep unconditional alternatives, prevent stale choices, and retain the distinction between local memory and witnessed global decisions/evidence.

**Dependencies and completion gate:** Plan the location/pose inventory (S2/S3) alongside the scene selection (S1); do not block writing in existing settings on unrelated new art. Apply S4/S5 to each expanded scene. Complete a batch only after browser/CLI parity, branch traversal, save/resume, one-slot charging, slow/refusal paths and actual mobile/desktop presentation checks. Record which scenes and art are reviewed; do not mark the whole catalog complete after checking one route.

### Adjustable campaign length

- [ ] **G1 — Define pacing profiles and constraints.** Specify how a shorter/default/longer campaign would change available activity time and story spacing. Exact lengths and player-facing controls remain design decisions; no new duration is chosen by this roadmap. Preserve investigation access without romance, room for required relationship steps, and the confrontation → institutional aftermath → personal aftermath → ending order. Keep the current 16-week campaign as the baseline while designing alternatives.
- [ ] **G2 — Implement coordinated milestone scheduling.** Replace scattered assumptions in campaign rules, scene windows/deadlines, registry validation, ending evaluation and browser/CLI labels with a single campaign schedule. Calculate optional-slot budgets, relationship opportunities and preparation windows together. A `weeks` setting alone is insufficient. Preserve the engine/content boundary and use the shared schedule in both interfaces.
- [ ] **G3 — Save policy and complete route verification.** Persist or otherwise unambiguously identify the chosen pacing configuration; assess schema/content epoch changes and show explicit incompatibility notices when necessary. Verify every supported duration through friendship, all three individual romances, the triad, preparation/no-preparation, slow/refusal paths and missed opportunities. Check that required scenes cannot deadlock and optional activities cannot displace the guaranteed story slot. Validate endings and save/resume in both browser and CLI before advertising adjustable length.

**Dependencies:** G1 → G2 → G3. These tasks are unimplemented; the game still lasts 16 weeks. Their ordering relative to the existing English/localisation backlog should be recorded when implementation resumes, not inferred as authorization to start now.

## Progress tracker and handoff rules

| Milestone | Depends on | Status | Completion commit / evidence |
| --- | --- | --- | --- |
| V1–V4: versions and save incompatibility | Current runtime | Implemented | 0.2.0; 57 tests, typecheck/build, versioning and gameplay browser checks at 320/390/1440px |
| C1–C2: shared CLI gameplay and saves | V1–V4 | Implemented | 0.3.0; shared dispatcher, protocol 1, atomic current-envelope saves |
| C3: asset descriptions | C1 view contract | Implemented | 33 visually inspected usable manifest images; broken Gréta image replaced by neutral fallback |
| C4–C6: proofreading, route coverage and CI | C1–C3 | Implemented | 22 CLI tests including six full external-process routes; guide and replay example |
| S1–S5: expanded staged scenes, physical art, endings and callbacks | 0.4.0 scene foundation; relevant reviewed assets | Planned; not started | Initial three-date implementation remains complete |
| G1–G3: adjustable campaign length | Pacing design → schedule implementation → route/save verification | Planned; not started | Current campaign remains 16 weeks |
| L1–L2: locale infrastructure and extraction | C1–C6 | Not started | — |
| L3–L4: English translation and review | L1–L2 | Not started | — |
| L5–L6: localisation verification and release | L3–L4 | Not started | — |

Work in small reviewable commits directly to `main`, following [AGENT.md](../AGENT.md), without force pushes. Complete one phase's gate before starting dependent work. For every work session:

1. Read latest main and this tracker; record the starting commit and task IDs.
2. Mark tasks in progress, then complete only after their acceptance checks actually pass.
3. Record changed files, release/schema/content/protocol versions affected, executed commands and results, relevant Actions links, blockers and remaining work.
4. End with a concrete next task and reproduction commands. Preserve partially completed translation/asset inventories with counts and review status so a later agent can resume.
5. Never label runtime behavior implemented because it appears in this document. Keep [ENGINE.md](../ENGINE.md) factual and update it only alongside working code.

Use this entry template under the execution log:

```text
Date / task IDs / status:
Starting commit -> completion commit:
Implemented behavior and affected files:
Version changes and compatibility rationale:
Commands actually run and results:
Actions run URLs / conclusions:
Coverage and outstanding review items:
Blockers or decisions:
Next task and exact reproduction command:
```

## Execution log

### 25 October 2026 — roadmap created

Documentation only. Inspected the current runtime, save codec, package commands and asset manifest at `db24833`. Recorded the user's ordered objectives and acceptance gates. No release metadata, save envelope, CLI or localisation feature has been implemented by this planning change. Next task: **V1**, then **V2**; inspect save-discovery behavior before changing storage keys.

### 25 October 2026 — V1–V4 implemented in 0.2.0

Starting commit: `7dd79ae`. Added package-sourced release identity, schema 4/content epoch 1 save envelope, stable storage discovery, historical-key detection without loaders, structured failure results and title-screen messages. New-game replacement now requires an explicit confirmation. Full contract: [VERSIONING.md](VERSIONING.md).

Validation: `npm test` (57 passing), `npm run typecheck`, `npm run build`; `tools/verify-leisure.cjs` passed at 320/390/1440px, covering old/corrupt/newer-save notices, disabled Continue, cancel/confirm restart without unintended writes, both puzzles, save/resume, gifts and outings. Playwright used `CHROMIUM_EXECUTABLE_PATH=/tmp/ligetvar-browser-libs/chromium`, `CHROMIUM_SERVERLESS=1`, and runtime Playwright dependencies. No migration added.

Next task: **C1** — shared action/query adapter and playable CLI protocol. Read `src/game/content/runtime.ts`, `src/game/store.ts`, and `src/game/content/saves.ts`; run `npm test` for the current baseline. CLI and English remain not implemented.

### 25 October 2026 — C1–C6 implemented in 0.3.0

Starting commit: `4a3435d`. Implemented terminal/JSON CLI, shared browser/CLI actions, player-visible observations, atomic file saves and locking, revision guards, deterministic transcripts, author-only inspection, findings and separate played/inspected coverage. Added concise descriptions after viewing 33 usable active image exports. Removed the pre-existing empty Gréta affectionate portrait and used the normal neutral fallback. No story/economy changes or save migrations; schema 4/content epoch 1 remain unchanged.

Validation: 57 engine/content tests plus 22 CLI tests (79 total), strict typecheck, production build; browser flows passed at 320/390/1440px. CLI tests include actual subprocess campaigns for friendship, Rebeka, Boglárka, Gréta, triad and late withdrawal; EOF/SIGINT; file ownership; stale/invalid commands; both puzzles with hidden-card masking; gifts/outings; file interchange and transcript replay. `npm test` and CI include the CLI suite. Branch coverage lists observed IDs, not a claim that every authored branch was proofread. See [CLI.md](CLI.md).

Reproduce: `node tools/cli-playthrough.mjs --route triad --save /tmp/triad-new.json` with a fresh path. Next task: **L1**, string inventory, shared locale API and persisted-text/version decisions. English localisation is not implemented. Findings/transcripts must be explicitly exported before a CLI process exits; they are session-scoped.

### 25 October 2026 — user-prioritized staged scene implementation, 0.4.0

Starting commit: `c631e9d`. The user requested starting the five scene improvements, with natural movement to quieter/private places. This work takes priority over the previously queued localisation phase. Added explicit per-node scene stages, shared browser/CLI location and proximity resolution, same-scene choice memory, three expanded dates with optional quieter stops and romantic kisses, and six paid-outing farewells. [SCENE-STAGING.md](SCENE-STAGING.md) tracks implemented scope and remaining work, including campaign length. Localisation remains unstarted.

Release 0.4.0; save schema 4 unchanged; content epoch 2 because date graph IDs and conclusions changed. Prior content saves receive the incompatible-save message. No migration. CLI protocol 1 retains its commands with additive scene staging metadata.

Validation: `npm ci`; `npm test` (61 engine/content and 22 CLI tests, all passing); `npm run typecheck`; `npm run build`. `tools/verify-date-staging.cjs` passed all three individual dates at 320/390/1440px, including destination backgrounds, distance framing, saved reload and one-slot completion. Inspected the resulting 320px Boglárka and 1440px Rebeka screenshots. The check caught and resolved reduced-motion selector specificity; the rerun passed. Existing asset descriptions and portraits are reused; no new pose artwork was generated. Published as `6d8af8f`; [Tests](https://github.com/zodnosferato-code/ligetvar/actions/runs/40193703111) and [GitHub Pages deployment](https://github.com/zodnosferato-code/ligetvar/actions/runs/40193702917) both succeeded.

Next work: broaden staged writing to later relationship/triad scenes, then design configurable milestone scheduling and route budgets before changing the 16-week campaign. Run `npm test` and `node --experimental-strip-types tools/verify-date-staging.cjs` (with configured Playwright/Chromium) to reproduce this checkpoint.

The existing `tools/verify-leisure.cjs` regression flows also passed at 320/390/1440px: both puzzles, gifts/replies, outing charge-once, save/resume, incompatible/corrupt/newer save messages and explicit restart. Updated its stale release assertions to read canonical release metadata. No browser overflow or page errors were reported.

### 25 October 2026 — remaining improvements recorded only

At the user's request, added S1–S5 and G1–G3 to the roadmap with dependencies and completion gates. Linked the staging document to this canonical backlog. No gameplay, artwork, release number or save epoch changed; localisation tasks remain pending. Reviewed the documentation diff and relative link targets. No local gameplay tests were rerun for this documentation-only change; publication Actions are checked separately.
