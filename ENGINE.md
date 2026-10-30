# Game engine reference

> **Status:** Active. | **Purpose:** Runtime contracts, scheduling, saves and endings.

Current design authority: [docs/design/README.md](docs/design/README.md). Feature status: [design tracker](docs/design/TRACKER.md).

## Architecture

Generic engine in `src/game/engine/` with injected campaign rules. Sole typed scene registry in `content/catalog.ts`. No character names or plot outcomes in engine code.

## Preference flags, gallery and intimacy stage extensions — 30 October 2026

Generic engine support for optional explicit content:

- `Effect.preferences?: string[]` and `Effect.gallery?: string[]` accumulate uniquely into `GameState.preferences` and `GameState.gallery` on scene completion (pending effects first). Used for character-specific flags and CG/moment unlocks; never hard gates for romance or endings.
- `SceneStage.risk?: boolean` optional marker for interruption flavor; dialogue may query it, no automatic failure.
- Initial state includes empty arrays. Content epoch 17. Browser/CLI parity preserved via shared reducers. Planned moment clips fall back to null source + portrait/text.

See `docs/design/SIDE-EVENTS-NSFW.md` and the side-event scenes for usage.

## Weekly schedule and object hubs

16 scheduled shared events and 104 discretionary opportunities across 52 weeks. Completing a scene consumes its slot. Opening menus costs nothing. Optional content never blocks required investigation.

## Dialogue, presentation and staging

Named `Scene.stages` declare location/background, participants, proximity, optional lighting and risk. `Line.moment` refers to optional WebP loops with static posters. Missing art falls back honestly.

## Knowledge, bonds and witnessed decisions

Effects remain pending until scene completion. Knowledge and affirmative decisions require witnessed scene completion.

## Saves and CLI

Current baseline: schema 4, content epoch 17. No migrations. CLI and browser share the same action path.

## Verification

`npm test`, `npm run typecheck`, `npm run build`. Report only executed results.
