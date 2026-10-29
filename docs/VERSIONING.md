# Game releases and save compatibility

> **Status:** Active; values reconciled against source on 27 October 2026. | **Purpose:** Release identity, save contract, compatibility decisions and release checks.

## Current contract

| Field | Current value / source | Meaning |
| --- | --- | --- |
| `gameVersion` | `0.9.9`, from `package.json` | Release that wrote the save; displayed on the title screen |
| `saveSchemaVersion` | `4`, in `src/game/release.ts` | Save envelope and state structure |
| `contentCompatibilityVersion` | `13`, in `src/game/release.ts` | Story/progression compatibility epoch |
| `buildId` | Optional; GitHub SHA in CI, Git HEAD plus `-dirty` for modified local builds | Diagnostic identity, never a compatibility gate |
| Storage key | `ligetvar-save` | Stable across subsequent releases |

Saved JSON has metadata above and a `state` property. Gameplay state itself no longer carries a duplicate version field. The shared engine codec serializes the envelope and validates its metadata before interpreting state. Campaign discovery and Hungarian user messages live in `content/saves.ts`; generic engine code knows no Ligetvár IDs.

Both compatibility epochs must exactly match the current release. A different `gameVersion` or `buildId` alone does not invalidate a save. Same-epoch saves still undergo the full current-state validation. There are no migrations, old puzzle implementations, or default-filled missing fields.

## Breaking updates and user messages

- Older schema/content epochs: explain that a breaking update made the save unusable and a new year is required.
- A newer epoch: explain that a matching game release is needed to continue.
- A raw historical save: report its format when known, and say the game release is unknown. Never invent release metadata.
- Corrupt JSON, malformed metadata or invalid current state: report a damaged/incomplete save, rather than blaming a version change.
- Unavailable storage: report the browser storage problem separately.

Unusable Continue is disabled. Load failure never changes stored bytes or automatically starts a game. Starting a new year when any stored save is detected requires an explicit confirmation; cancelling preserves the save. Historical keys are not deleted. If browser storage cannot be written, the existing in-memory-play warning remains visible.

Discovery always checks the stable key first, including when its bytes are empty, corrupt or incompatible. It never falls back from a bad current record to a stale record. Only if that key is absent does it inspect `ligetvar-save-v3`, then v2, then v1, for **detection only**. None can be loaded, even if their contents resemble a current envelope. An existing valid stable-key record takes precedence over all historical records. Future releases continue using the stable key.

The structured codec result is `ok` (state and metadata), `missing`, `unsupported` (reason, saved metadata and current metadata), `invalid`, or `unavailable`. Unsupported reasons are `pre_envelope`, `schema`, `content`, and `newer`. This interface is shared by the implemented CLI and browser.

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

## 0.4.0 — staged dates

Schema remains 4: stage and physical distance are derived from the current authored dialogue node, with no extra mutable save fields. Content epoch increases to 2 because the three date graphs, terminal nodes and optional outing conclusions changed. Saves from 0.3.0/content epoch 1 receive the existing explicit incompatible-save message; no migration or silent restart. CLI protocol remains 1, with additive visible `scene.staging` metadata.

## 0.5.0 — additive reporter scenes and moment presentation

Schema 4 and content epoch 2 remain unchanged. Eight new optional scenes, one actor/location, an independent public-report epilogue and optional line animation metadata do not remove or reinterpret existing saved scene/decision IDs. Compatible older saves remain loadable; passed optional windows do not reopen, and the public report still concludes. Playback position is not serialized. CLI protocol remains 1 with additive moment/coda fields.

## 0.6.0 — revised reporter scenes

Schema stays 4; content epoch becomes 3 because reporter scene graphs and final-decision IDs changed. Saves from content epochs 1/2, including 0.2.0–0.5.0, are incompatible with the current game and require a new year. No migration or silent restart. Read current values from `package.json` and `src/game/release.ts`; older release sections above explain their own historical decisions.

Art availability is tracked in [ART-REGISTER.md](ART-REGISTER.md), not in this save contract.

## 0.6.1 — English-first opening pilot

Schema remains 4: saved fields still have the same shapes. Content epoch becomes 4: shared_1 reactions and journal now store stable message-reference strings, resolved in the current locale with the chosen player name. This intentionally rejects epoch-3 saves rather than mixing historical persisted prose with the rewritten opening. No migration, key change or default-language change. Scene/line/choice IDs, evidence/effects, information order and semester scheduling are retained. Later prose remains outside this pilot.

## 0.6.2 — opening continuation and natural dialogue

Schema stays 4. Content epoch increases to 5 because shared_2/shared_3 journals and reactions now store message references instead of prose, and their assembled scene/cast presentation has been revised. Reject content epoch 4 and earlier with the existing fresh-semester explanation; do not migrate. Stable scene/line/choice IDs, evidence/effects, schedule and the Hungarian runtime default remain unchanged. Stage labels resolve at presentation time, so switching does not alter state or save bytes.


## 28 October 2026 — automatic arrivals and transition presentation

No release/epoch bump: scene IDs, choices, prerequisites, slot budgets and save structure remain unchanged. Browser orchestration enters the already available mandatory scene on arrival/resume; it does not reinterpret completed story. Transition preferences and playback are presentation-only and outside the save envelope. Current compatible saves retain their exact active line and pending choices.


## One-year campaign — 0.7.0

The 52-week schedule changes completion dates, deadlines and ending evaluation. Content epoch is 6, schema remains 4. Epoch-5 semester saves require a fresh year; no migration. Ordinary-week cursors and the full-year gift history are validated against the injected story dates. See [year contract](design/YEAR-CAMPAIGN.md).

## Optional holidays — 0.8.0

Schema 4/content 6 retained: new optional scenes, derived calendar/event metadata, seasonal admission and presentation add no saved fields or changed dates for existing scenes. Legitimate 0.7.0 saves remain supported; already passed holidays are not replayed. [Validation and limits](design/HOLIDAY-EVENTS.md).


## Seasonal company and timeline dialogue — 0.9.0

Schema 4/content 6 retained. Two optional spring/summer scenes add no saved fields, remove no existing IDs and change no mandatory dates, evidence or relationship effects. shared_4 preserves line_0–6, separate/check choice IDs, prerequisites and completion-only timeline evidence; added response nodes are optional continuations, and old pending effects remain valid. New text references resolve alongside accepted historical plain text. Existing completed journal prose stays as recorded; no migration or retrospective event replay. A real unchanged 0.8.0 week-52 CLI save decodes successfully. Both revised branches and every seasonal branch resume at each node in tests; actual CLI processes also restart on both sides of each new meeting's choice in both languages. See [playtest evidence](design/PLAYTHROUGH-FINDINGS.md#seasonal-expansion-validation--28-october-2026).

## Rebeka first-date rewrite — 0.9.1

Schema remains 4; content epoch becomes **7**. The assembled `rebeka_3` hand-holding branch removes cursor IDs `romance_closeness_hand_4–7`, and its journal/reactions now use locale-neutral message references. These are incompatible authored graph/persistence assumptions, not a wording-only release. Epoch-6 and earlier saves require a fresh game; no migration, storage-key change or default-language change. Stable scene, remaining choice/effect IDs, date window and slot cost are preserved. [Baseline and validation](design/PLAYTHROUGH-FINDINGS.md#rebeka-first-date-validation--28-october-2026).


## Focused mobile interface — 0.9.2

Schema 4/content 7 retained. Compact chrome, modal task menus, phone categories and automatic job-result presentation change no saved fields, scene IDs, scheduling, puzzle rules or reward semantics. Unclaimed finished boards reopen their result dialog and use the existing shared claim action exactly once. Current 0.9.1 saves remain compatible; no migration or restart is introduced.

## Rebeka commitment and aftermath — 0.9.3

Schema remains 4; content epoch advances to **8** because `rebeka_5`/`rebeka_6` replace assembled cursor graphs and persist new locale-neutral journals/reactions. Original commitment/continuation/withdrawal effects, direction prerequisites, date windows and slot costs remain. Epoch-7 and earlier saves require a fresh year; no migration or storage-key change. Neither a first-date hand choice nor commitment authorizes later physical escalation. [Evidence](design/PLAYTHROUGH-FINDINGS.md#rebeka-commitmentaftermath-validation--28-october-2026).

## Rebeka disagreement — 0.9.4

Schema4/content**9**. `_4`'s assembled graph and locale-neutral journal/reactions replace the imposed off-screen presentation violation with a present photograph/caption disagreement. Stable repair/withdraw effects still witness whether the couple worked through the disagreement; they no longer imply a compulsory past offence. New cursor and decision-context semantics intentionally reject epoch8 and earlier. Admission, rewards and scheduling stay unchanged; no migration. [Evidence](design/PLAYTHROUGH-FINDINGS.md#rebeka-disagreement-validation--28-october-2026).

## Early Rebeka arc — 0.9.5

Schema4/content**10**. `rebeka_1`/`rebeka_2` now have new assembled cursor graphs and locale-neutral journals/reactions; the curious topic recalls witnessed photographs instead of an invented bus conversation. Preserve original interest/attraction/withdrawal and topic-memory effects, admission and slot costs. Epoch9 and earlier require a fresh year, no migration. All six Rebeka main relationship scenes now have an English-first bilingual pass; whole-game localization remains partial. [Evidence](design/PLAYTHROUGH-FINDINGS.md#connected-rebeka-arc-validation--28-october-2026).

The same release also corrects the optional Rebeka aftermath visit to the existing player's suite: room ownership, furniture, departure and indoor lighting now match the reused asset/location. IDs/effects remain unchanged by that continuity correction; the early-arc changes already require epoch10.

## Boglárka date and aftermath — 0.9.6

Schema remains 4; content epoch advances to **11**. `boglarka_3`/`boglarka_6` replace incompatible assembled cursor graphs and persisted prose with localized message references. A kiss no longer authorizes deeper intimacy, and the final continuation decision precedes touch. Stable original invitation/withdrawal/aftermath effects, knowledge, deadlines and one-slot costs remain. Epoch10 and earlier require a fresh year; no migration or storage-key/default-language change. [Baseline and validation](design/PLAYTHROUGH-FINDINGS.md#boglárka-date-and-aftermath-validation--28-october-2026).

## Boglárka disagreement and commitment — 0.9.7

Schema4/content**12**. `_4`/`_5` replace assembled cursor graphs and persisted journals/reactions with bilingual message references; the repair decision now witnesses a present disagreement rather than an invented off-screen offence. Stable admission, repair/commit/withdraw effects, future-memory IDs, triad requirements, schedule and slot costs remain. Epoch11 and earlier require a fresh year; no migration or default-language change. Article submission belongs to `_6`, not an unconditional `_5` postscript.


## Interface visibility — 0.9.8

Presentation-only update: schema 4/content 12 unchanged from 0.9.7. Resource visibility, responsive room navigation, availability badges and motion do not change saved state or story progression.


## Boglárka early meetings — 0.9.9

Schema4 remains; content epoch13 replaces12. The assembled `_1`/`_2` graphs remove old opening/romance cursor nodes and replace persisted prose with locale-neutral message references. Existing epoch12 saves intentionally require a fresh year; no migration or automatic overwrite. Original scene IDs, admission, consequential choices/effects and later quiet/listening memories remain. This is a content compatibility change, not a new state shape. The preceding 0.9.8 UI changes are retained. [Validation](design/PLAYTHROUGH-FINDINGS.md#boglárka-early-arc-validation--29-october-2026).

## Gréta date and aftermath — 0.9.10

Schema4 unchanged; content epoch14 replaces13. Assembled `greta_3`/`greta_6` cursor graphs and persisted journals change incompatibly. Hand-holding no longer authorizes sex, and aftermath continuation/withdrawal precedes physical choices. Original admission, invitation/withdrawal/aftermath effects, date windows, slot costs and three bounded date memories remain. Epoch13 and earlier saves require a fresh year; no migration or default-language change. [Validation](design/PLAYTHROUGH-FINDINGS.md#gréta-dateaftermath-baseline--29-october-2026).

## Gréta disagreement and commitment — 0.9.11

Schema4 retained; content epoch15 replaces14. Assembled `_4`/`_5` graphs and persisted journal/reaction references change, replacing incompatible cursors and the imposed off-screen incident. Epoch14 and earlier require a fresh year; no migration or automatic overwrite. Original admission, repair/withdraw/commit/yes effects, future-memory IDs, dates and one-slot costs remain. This is a coherent bilingual prose repair, not the planned INT2 scene expansion.
