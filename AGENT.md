# Ligetvár — contributor guide

> **Status:** Active. | **Purpose:** Contributor rules and authoritative project guidance.

Start with [docs/design/README.md](docs/design/README.md), the current design authority, and [docs/design/TRACKER.md](docs/design/TRACKER.md), the single current implementation/future-feature tracker. Read the relevant design section and tracker row before editing.

**For story-engine and asset-related tasks, work off the [master tracker](docs/design/MASTER-TRACKER.md).** It consolidates the prioritized task list (SE-* and AS-* IDs) for narrative expansion, INT2 arcs, localization, staging, seasonal outfits/backgrounds, character art gaps and related acceptance work. Update the master tracker together with the redesign tracker and owning contracts when those items change.

## Design authority and maintenance

- Explicit user decisions take precedence; record them in the owning design document and state what they supersede.
- [Game design](docs/design/GAME-DESIGN.md) defines the current experience. [Character visuals](docs/design/CHARACTER-VISUALS.md) is the sole written appearance authority; [character voices](docs/design/CHARACTER-VOICES.md) owns temperament and dialogue guidance.
- The tracker distinguishes Implemented, Partial, Planned, Proposed and Blocked. Do not implement an unapproved proposal or describe backlog as shipped. Update status, scope, evidence, remaining gate and date in the same commit as the relevant change.
- Technical contracts such as [ENGINE.md](ENGINE.md), [CLI.md](docs/CLI.md), [versioning](docs/VERSIONING.md), [economy](docs/LEISURE-ECONOMY.md) and [scene staging](docs/SCENE-STAGING.md) remain detailed implementation references. Inspect actual code when a document conflicts with behavior.
- The [original redesign plan](Ligetvar-Redesign-Plan.md) and [implementation roadmap](docs/IMPLEMENTATION-ROADMAP.md) preserve detailed acceptance criteria and history. Their historical status/checklists do not override current design or tracker status. Do not maintain another live feature-status list here or in README.
- The [art register](docs/ART-REGISTER.md) owns exact file coverage; [progress log](docs/REDESIGN-PROGRESS.md) owns execution history. Generated, integrated, assistant-reviewed and user-approved are separate states.
- Consult the [legacy foundation review](docs/design/FOUNDATION-REVIEW.md) before reusing an old idea. Superseded expansion drafts are not active production instructions; recovered ideas remain proposed unless approved.
- Keep new design documentation in English and linked through the [design index](docs/design/README.md). Legacy design/narrative files and production logs do not override current guidance.

## Archives and refactor workflow

Read this section before moving files or refactoring code/content.

| Material | Location | Authority |
| --- | --- | --- |
| Deprecated dialogue trees and localization JSON | [docs/archive/legacy-narrative/](docs/archive/legacy-narrative/README.md) | Historical only; never load into the active runtime |
| Superseded design, UI, art and minigame plans | [docs/archive/legacy-design/](docs/archive/legacy-design/README.md) | Historical only; do not implement as current requirements |
| Archive map and recovered-idea dispositions | [archive index](docs/archive/README.md), [foundation review](docs/design/FOUNDATION-REVIEW.md) | Consult before reusing old ideas; reuse does not imply approval |
| Original redesign, implementation roadmap and production logs | Root redesign plan and linked records in [docs/README.md](docs/README.md) | Detailed historical criteria/evidence; not competing live status or proof of current assets |

No historical asset archive directory is present in the reviewed baseline. Inspect the current tree and art register; do not invent paths or restore old art from historical descriptions.

Before a refactor:
1. Read the design index, relevant tracker row and owning technical contract. Explicit user decisions take precedence; approved direction and proposals must remain distinct.
2. Inspect the active implementation and imports. Preserve the typed catalog, generic engine/campaign separation, shared browser/CLI action path and documented knowledge, schedule and save contracts. A structural refactor does not authorize unrelated story, mechanic or architecture changes.
3. For narrative work follow [NARRATIVE-WORKFLOW.md](docs/design/NARRATIVE-WORKFLOW.md): master plot in [STORY-REVIEW.md](docs/design/STORY-REVIEW.md), character guidance, then scene specifications before scene rewrites. A [68-scene editorial draft](docs/design/SCENE-OUTLINE.md) now exists; its marked proposals and unresolved branch details are not implemented or automatically approved.
4. During baseline playthroughs, record issues in [PLAYTHROUGH-FINDINGS.md](docs/design/PLAYTHROUGH-FINDINGS.md) with tested commit and scene/line/choice evidence. Do not patch encountered dialogue opportunistically. Later revisions follow the plot/scene plan and repeated playthrough validation.
5. Before relocating deprecated material, check runtime/build/test/tool/document references. Preserve provenance and update archive indexes and links; do not delete or revive legacy content merely to simplify a refactor.
6. Validate affected behavior with the checks below and relevant route/save tests. Narrative changes need branch/knowledge/continuity review; browser changes need browser checks. Update owning documentation and the single tracker with actual evidence in the same commit. Never equate passing builds with literary, visual or user acceptance.

## English-first writing and localization

The user's 28 October direction supersedes Hungarian-first authoring: English is the canonical source for new/revised game text and the target default player language; Hungarian is its translation. Follow [LOCALIZATION.md](docs/LOCALIZATION.md#english-first-direction--28-october-2026) and the narrative workflow. Current runtime still defaults to Hungarian and has partial English coverage; migrate catalogs, persisted text and defaults deliberately, preserving explicit preferences and live switching. Do not call the migration complete based on this documentation update. Write scenes naturally in English against plot/character/scene guidance, then translate and review Hungarian; preserve choices, knowledge, effects and player-name variables in both.

## Active system

- React, Zustand and Vite remain the technology stack. UI-independent reducer logic lives in `src/game/engine/` with injected campaign rules.
- One authoritative typed scene registry: `src/game/content/catalog.ts`. Content modules include shared, relationship, triad, optional, opening, conversation, romance and Virág scenes. Never reload archived dialogue/localization JSON into the runtime.
- The engine must not know concrete actors, scene IDs, story milestones or endings. Campaign rules live in `content/rules.ts`, types in `content/types.ts`, epilogues in `content/epilogues.ts`; `content/runtime.ts` connects them to the generic engine.
- The user decides new implementation directions. Preserve the approved TypeScript content approach and [character voices](docs/design/CHARACTER-VOICES.md); do not declare a new architecture or character direction approved.
- The campaign lasts 52 weeks. Each week has one discretionary daytime slot and one discretionary nighttime slot, followed by recap. Sixteen mandatory story chapters occupy a preceding shared slot only on the dates in `content/calendar.ts`; ordinary weeks start at daytime. This user decision supersedes the 16-week semester; follow [YEAR-CAMPAIGN.md](docs/design/YEAR-CAMPAIGN.md). Continuing a scene is free; completing it consumes one slot. No extra automatic workshop.
- The saved period determines the planning hub: daytime office or nighttime bedroom. Bedroom objects expose phone, journal, rest and gifts; work and preparation are daytime only. The door offers destinations and available scenes, not a free room switch. Opening object/destination menus costs no slot. The weekly shared scene cannot be skipped.
- Background objects are clickable with outlines and labels always visible. If the art lacks a suitable object, use a visible labelled icon. Preserve hotspot alignment when changing backgrounds.
- The phone arranges existing in-person meetings/coffee; the later leisure system also supplies persistent gift replies and six paid optional outings. Do not invent a separate phone-conversation system.
- T7/T8 are nighttime only; other personal/coffee meetings may use either discretionary period. Flexible scenes follow saved period lighting. The two preparation sessions must occur in different weeks. See ENGINE.md for exact rules.
- NPC portraits overlay the location background, including on mobile; dialogue and choices remain below. Márton/player and narration have no portrait or portrait placeholder. Missing NPC art gets a small labelled placeholder.
- Holidays/seasons are campaign-owned calendar context injected into the engine. Use `requires.calendar` for scene/choice admission, not UI-only date checks; [holiday contract](docs/design/HOLIDAY-EVENTS.md) owns the Halloween/Christmas meetings, clothing/background precedence and unproduced-art limits. New optional events must never gate the mandatory investigation.
- Relationship arcs must follow [midpoint intimacy and later-half exploration](docs/design/GAME-DESIGN.md#relationship-progression-across-the-year--29-october-2026): plan connected actual-week additions before further small rewrite batches. A completed bilingual six-scene pass or one final fade does not satisfy INT2; preserve meaningful slower/no-sex routes.
- Scenes explicitly identify participants, speaker, location, background, expression, prerequisites and deadlines. Use at most four contextual choices; no compulsory good/bad answer ladder.
- Knowledge and affirmative decisions require witnessed scene completion. Repetition, money and gifts cannot grant commitment.
- Márton–Rebeka, Márton–Boglárka, Rebeka–Boglárka and Márton–Gréta bonds are distinct. The triad needs affirmative agreement from all three participants.
- Required ending order: week-51 confrontation and vampire death → week-52 institutional aftermath → personal follow-ups in two discretionary slots → ending and epilogue. Investigation remains playable without romance and with weak preparation.

## Assets and publication

Follow [ASSET-AGENT-WORKFLOW.md](docs/ASSET-AGENT-WORKFLOW.md), including its executable connector recipe. Use the GitHub connection for remote reads/writes; shell GitHub credentials and git push are unnecessary. Never expose base64, binary patches or image payloads in model context. Transfer bytes programmatically, reuse uploaded blob SHAs, publish images sequentially to main, and checkpoint each successful publication. Verify uploads with remote tree hashes rather than downloading image contents.

Canonical image files live under `assets/`. Runtime images are selected by `src/game/content/assets.ts`; moments by `content/animations.ts`. Generated candidates do not become runtime assets automatically. Keep source/provenance under `assets/generated/` and reviewed exports under the runtime category folders. Use the current neutral runtime portraits where removed PNG masters are unavailable. Check the actual tree before citing a reference file. Do not restore older character art.

Preserve detailed non-pixel anime/cel-shaded character art and gothic castle-college backgrounds. Conversation backgrounds use the player's viewpoint and a natural companion seat. Intimacy is a meaningful relationship beat, presented fade to black for now under the user's 27 October decision. Preserve invitations, mutual choice, reconsideration and aftermath; do not erase the beat or require graphic prose/art. See the [authoring contract](docs/design/GAME-DESIGN.md#relationship-intimacy--27-october-2026).

## Verification and repository workflow

Commit directly to main, without a branch or PR, as requested by the user. Preserve other work; never force-push. Record actual validation and remaining art/release gates. Check the new commit's GitHub Actions results, not an older run.

For implementation changes, use appropriate checks:

```bash
npm ci
npm test
npm run typecheck
npm run build
```

Tests cover scene graphs, prerequisites, knowledge order, saves, decisions, scheduling, complete routes and ending order. Add meaningful cases for new rules. Never claim a successful test or visual review without running it. Upload-only work does not need the full suite repeated for every image; follow the user's request to check Actions for those steps.

## Saves, releases and ordered objectives

Backward compatibility is not required. Support only the current versioned save envelope at the stable `ligetvar-save` key. Detect incompatible historical saves and explain that a fresh game is required; do not migrate or retain old IDs, name imports or alternative rules for them.

Use [the current tracker](docs/design/TRACKER.md) for status and [IMPLEMENTATION-ROADMAP.md](docs/IMPLEMENTATION-ROADMAP.md) for detailed acceptance criteria: game/save versioning, playable agent/proofreader CLI, then localization and complete English text. Runtime release comes from package.json; independent schema/content epochs determine compatibility. [VERSIONING.md](docs/VERSIONING.md) defines release policy. Update the design tracker, evidence and handoffs as work proceeds; historical roadmap checkboxes are not a second current tracker, and proposed APIs are not existing commands.

## CLI and scene staging

Follow [CLI.md](docs/CLI.md). Use `npm run play:cli -- --save PATH`; agents use `npm run --silent play:cli -- --json --save PATH`. Browser and CLI share `content/actions.ts`. Normal observations hide unearned evidence and face-down cards; full catalog inspection requires explicit `--author`. Use separate saves per agent. Proofreader findings do not authorize automatic story changes. `npm test` includes engine/content and CLI process tests; `npm run test:headless` is the engine-only alias.

[SCENE-STAGING.md](docs/SCENE-STAGING.md) governs multi-location scenes, same-scene memory, physical closeness/kissing and natural departures. Use explicit `Line.stage` references and the shared `sceneStage` resolver, not previously rendered lines. `localRequires` reads pending decisions within the active scene and must not certify global evidence early. Moving somewhere quieter and choosing physical closeness are separate choices. Campaign duration is 52 weeks; mandatory dates and milestones are centralized in `content/calendar.ts`. New scenes use actual weeks with `scene()`; existing chapter-coordinate briefs use `chapterScene()`.

## Virág and animation

[VIRAG-STORY.md](docs/VIRAG-STORY.md) governs eight optional reporter scenes in `content/virag.ts`. Virág is a 19-year-old adult reporter, never a student assessed by Márton. She keeps teasing/inviting after refusals, with no professional-only route or bad ending. Refused touch must not occur. Her newsroom resolves all corruption cases independently of romance; she does not interact with the main women or gate the vampire route. Keep main bonds/directions unchanged. Her fictional Szabad Hullám perspective is her own.

The latest story direction allows an immediate mutually chosen private encounter off-screen, with reconsideration/refusal, and no final date or commitment milestone. See the visual reference for appearance instead of repeating it here. Historical 0.6.0 changed content epoch to 3 while keeping schema 4; always read current version metadata before releasing.

[ANIMATION-PLAN.md](docs/ANIMATION-PLAN.md) governs GIF-like WebP/GIF loops derived from a few still frames. `Line.moment` and `MOMENT_CLIPS` make rendering optional; pause/reduced motion use a distinct static poster. Planned assets must remain null and labelled unproduced. All four current Virág loops and their posters are present; the art register supersedes old pending-work statements.

## Provider tooling and historical production

The user switched from Venice to built-in ChatGPT image generation on 22 October after credits ran out. Do not launch Venice requests, balance checks or paid retries as part of routine art work. The latest workflow permits independent generation followed by batch review; never chain an unreviewed output as an identity master. Record actual prompts, source/output hashes, dimensions, alpha and honest review status. Retain planner backgrounds until replacements and hotspot alignment have been checked.

Historical [Venice production](docs/VENICE-PRODUCTION.md) and [ChatGPT production](docs/CHATGPT-PRODUCTION.md) describe dated batches, not current file availability. The initial Venice pair was WAI Illustrious + FireRed; profile parameters live in `scripts/venice/profile.mjs` and requests in `art-jobs/venice/request.json`. Older alpha/billing failures are historical and must not be reported as newly tested capabilities.

For an explicitly authorized future server-side Venice task:
- OpenAI-compatible base URL: https://api.venice.ai/api/v1; historical chat model `zai-org-glm-5-2`.
- Read chat credentials only from `process.env.VENICE_API_KEY`; use GitHub Actions secrets. Image tooling historically uses `IMAGE_GENERATOR_KEY`. Never commit/log credentials or expose them via VITE_* or client code.
- `npm run venice:smoke` requires a trusted Node 22+ environment and an available secret. It sends a minimal non-sensitive chat request and reports HTTP failure without response bodies. Chat connectivity does not validate image endpoints.
- Do not restore old model IDs without checking capability. Generation is not final acceptance; inspect before promotion. Never claim a file was generated or uploaded unless it actually exists.
