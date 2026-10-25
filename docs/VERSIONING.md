# Game releases and save compatibility

> **Status:** Active; current release 0.3.0. | **Purpose:** Release identity, save contract, compatibility decisions and release checks.

## Current contract

| Field | Current value / source | Meaning |
| --- | --- | --- |
| `gameVersion` | `0.3.0`, from `package.json` | Release that wrote the save; displayed on the title screen |
| `saveSchemaVersion` | `4`, in `src/game/release.ts` | Save envelope and state structure |
| `contentCompatibilityVersion` | `1`, in `src/game/release.ts` | Story/progression compatibility epoch |
| `buildId` | Optional; GitHub SHA in CI, Git HEAD plus `-dirty` for modified local builds | Diagnostic identity, never a compatibility gate |
| Storage key | `ligetvar-save` | Stable across subsequent releases |

Saved JSON has metadata above and a `state` property. Gameplay state itself no longer carries a duplicate version field. The shared engine codec serializes the envelope and validates its metadata before interpreting state. Campaign discovery and Hungarian user messages live in `content/saves.ts`; generic engine code knows no Ligetvár IDs.

Both compatibility epochs must exactly match the current release. A different `gameVersion` or `buildId` alone does not invalidate a save. Same-epoch saves still undergo the full current-state validation. There are no migrations, old puzzle implementations, or default-filled missing fields.

## Breaking updates and user messages

- Older schema/content epochs: explain that a breaking update made the save unusable and a new semester is required.
- A newer epoch: explain that a matching game release is needed to continue.
- A raw historical save: report its format when known, and say the game release is unknown. Never invent release metadata.
- Corrupt JSON, malformed metadata or invalid current state: report a damaged/incomplete save, rather than blaming a version change.
- Unavailable storage: report the browser storage problem separately.

Unusable Continue is disabled. Load failure never changes stored bytes or automatically starts a game. Starting a new semester when any stored save is detected requires an explicit confirmation; cancelling preserves the save. Historical keys are not deleted. If browser storage cannot be written, the existing in-memory-play warning remains visible.

Discovery always checks the stable key first, including when its bytes are empty, corrupt or incompatible. It never falls back from a bad current record to a stale record. Only if that key is absent does it inspect `ligetvar-save-v3`, then v2, then v1, for **detection only**. None can be loaded, even if their contents resemble a current envelope. An existing valid stable-key record takes precedence over all historical records. Future releases continue using the stable key.

The structured codec result is `ok` (state and metadata), `missing`, `unsupported` (reason, saved metadata and current metadata), `invalid`, or `unavailable`. Unsupported reasons are `pre_envelope`, `schema`, `content`, and `newer`. This is the interface the future CLI should reuse.

## Release checklist

1. Update `package.json` and matching lockfile version. Keep runtime release strings sourced from the package; do not maintain a second handwritten game version.
2. Assess save structure and semantics. Increase `SAVE_SCHEMA_VERSION` for incompatible envelope/state changes. Increase `CONTENT_COMPATIBILITY_VERSION` for changes to saved scene/choice IDs, evidence/decision semantics or progression assumptions. If both change, increase both. Never reuse an epoch after incompatible changes.
3. For wording, translations or asset replacements that preserve IDs and progression, normally keep epochs unchanged. Record the rationale rather than treating every release as breaking.
4. Document the new version and compatibility decision here and in the implementation log. Keep archived release evidence historical.
5. Run `npm test`, `npm run typecheck`, `npm run build`; run `tools/verify-leisure.cjs` for title/save UI changes with Playwright Chromium configured. Check Actions after publication.
6. Do not claim a new epoch is backward compatible, migrate old saves, or hide unusable saves by changing the storage key.

### 0.2.0 decision

First explicit envelope: schema 4 replaces the former raw version-3 payload. Content epoch 1 establishes the independent story compatibility contract. All pre-envelope saves are unusable; this intentional break follows the user-approved no-migration policy. The game release label moves from the former package-only 0.1.0 to 0.2.0. Gameplay rules and story are unchanged.

The CLI may report a missing build ID when run directly from source: build identity is optional, whereas release and compatibility versions are mandatory. Its command protocol is separately versioned as protocol 1.

### 0.3.0 decision

Playable CLI, shared action dispatch and visual asset descriptions do not change persisted state or story progression. Save schema remains 4 and content epoch remains 1; current-envelope 0.2.0 saves load without migration. The CLI reports the source commit/dirty marker when available, and transcripts carry it separately from the save metadata.
