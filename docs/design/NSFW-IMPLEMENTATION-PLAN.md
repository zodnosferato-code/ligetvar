# Ligetvár NSFW Explicit Content Implementation Plan

> **Status:** Approved planning document, 30 October 2026. | **Purpose:** Agent-ready plan to expand current mild romance into drawn anime-style explicit scenes, dialogue, spontaneous events and supporting systems.

This plan expands the current mild romance (fade-to-black from midpoint, later-half development) into drawn anime-style explicit content. It stays inside existing contracts: 52-week structure, two discretionary slots, witnessed decisions, no sex-gating of endings or the investigation, distinct character voices, and generic engine/content separation.

**Style constraint**: All new visual assets are detailed non-pixel drawn anime (controlled linework, crisp cel shading, adult proportions) matching current runtime portraits. No photorealism.

**Authority and update rules**
- Current design authority: this folder (`README.md`, `GAME-DESIGN.md`, `CHARACTER-VISUALS.md`, `CHARACTER-VOICES.md`, `SCENE-OUTLINE.md`, `YEAR-CAMPAIGN.md`).
- Status tracking: Update `TRACKER.md` (add/expand INT2 and related rows) and `MASTER-TRACKER.md` in the same commit as any implementation.
- Technical contracts: Update `ENGINE.md`, `docs/SCENE-STAGING.md`, `docs/ART-REGISTER.md`, and relevant content modules together with code.
- English is canonical source for new text; Hungarian is the translation. Content epoch bump required for schema/content changes that invalidate saves (no migrations).
- Generated candidates stay under `assets/generated/`; only reviewed exports enter runtime paths (`assets/characters/`, manifests).
- Optional content never gates the mandatory vampire investigation or required aftermath.
- Preserve browser/CLI parity, knowledge order, and save validation.

**Cross-links summary**
- Engine provides the generic hooks (scene stages, choice effects, optional event admission, gallery flags).
- Events consume those hooks and reference story scene IDs.
- Dialogue/story supplies the text, prerequisites, and aftermath that events and assets illustrate.
- Generated assets are registered only after visual review and are selected by the existing image/animation manifests driven by engine state.

---

## 1. Engine category

**Goal**: Extend the generic engine with the minimum hooks needed for explicit scenes, preference tracking, spontaneous events, and gallery without hard-coding characters or plot.

**Key files**
- `src/game/engine/types.ts`, `logic.ts` (generic reducers)
- `src/game/content/types.ts`, `rules.ts`, `catalog.ts`
- `src/game/content/assets.ts`, `animations.ts`
- `ENGINE.md` (document new contracts)
- Tests in existing engine/content suites

**Required changes**
- Extend scene/line staging to support explicit “intimacy stage” markers (location, lighting, proximity, optional risk flag) while remaining generic. Document in `SCENE-STAGING.md`.
- Add optional per-bond preference flags (string set, e.g. “oral-focus”, “slow-pace”, “clothing-play”) that can be set by witnessed choices and read by scene prerequisites or asset selection. Do not use them as hard gates for romance or endings.
- Add a lightweight optional event pool mechanism: calendar- or state-conditioned scenes that can be offered in discretionary slots or free hub menus without consuming extra time when browsing. Enforce once-per-window or cooldown via existing prerequisite system.
- Gallery support: record unlocked CG IDs (or moment IDs) on scene completion when an explicit effect is present. Expose a simple journal or phone menu entry that lists them without spoiling unplayed content.
- Risk/interruption flag on stages: optional boolean that dialogue can query; does not auto-fail scenes.
- Preserve all existing knowledge, slot, energy, and save contracts. New effects must be pending until scene completion.
- Update content epoch if scene graphs or decision sets change.

**Acceptance**
- New scenes using the hooks pass `npm test`, typecheck, and save-validation tests.
- Browser and CLI both admit and complete the scenes under the same rules.
- No character names or plot outcomes appear in generic engine code.
- Documented in `ENGINE.md` and tracker rows.

**Dependencies**: None (can start immediately). Story and event work depend on these hooks being stable.

---

## 2. Event category

**Goal**: Add spontaneous and location-tied sexual moments that use discretionary slots or free hub opportunities, plus optional mature side content.

**Key files**
- New or extended modules under `src/game/content/` (e.g. `events.ts` or additions to `romance.ts` / `optional.ts`)
- `content/catalog.ts` (registry)
- `docs/design/SCENE-OUTLINE.md` and holiday-style briefs
- Tracker rows under INT2 / new EVENT rows

**Required content**
- Spontaneous pool (6–10 events): nighttime bedroom/hub escalations, favourite-place chance encounters (Holdkör for Rebeka, library alcove for Boglárka, lakeside for Gréta, after-hours records for Virág), weather/rain shelter, post-shared-chapter decompression, phone/gift-triggered quick scenes.
- Each event has explicit prerequisites (relationship state, week window, not recently completed), mutual-choice branch, interruption-risk variant where appropriate, and aftermath that updates preferences or journal.
- Optional mature side routes (1–2 meetings each): Lilla and/or Dr. Sárközi Júlia. Short, experienced, clearly adult, lower commitment. Triggered from existing staff interactions or new optional phone entries.
- Vampire-adjacent flavor (sparse, optional): one or two relief/heightened-desire scenes after key Soma beats. Never compulsion.
- All events respect the two-slot week, energy costs, and “missing optional never blocks required story” rule.

**Acceptance**
- Events appear only when prerequisites are met; browsing menus does not consume slots.
- CLI and browser show identical availability and outcomes.
- Playthrough notes recorded in `PLAYTHROUGH-FINDINGS.md` style.
- Tracker updated with scene IDs and validation evidence.

**Dependencies**: Engine hooks (section 1). Story briefs (section 3) supply the text and exact prerequisites. Assets (section 4) illustrate the CGs.

---

## 3. Dialogue and story category

**Goal**: Write the explicit dialogue, scene graphs, and connected arcs that replace or expand current fades, while preserving voices and the mid-to-late progression contract.

**Key files**
- `src/game/content/romance.ts`, `conversations.ts`, and new event modules
- `docs/design/CHARACTER-VOICES.md` (add explicit dialogue samples)
- `docs/design/SCENE-OUTLINE.md` (new briefs)
- `docs/design/GAME-DESIGN.md` (confirm INT2 expansion)
- Localization files / English-first source

**Required writing**
- Per main route (Rebeka, Boglárka, Gréta): one midpoint first explicit scene + 3–4 later-half meetings. Each has invitation, mutual choice, explicit sequence (referenced CG), character-specific preferences, reconsideration/refusal branch, and aftermath conversation.
  - Rebeka: control of pace/gaze, clothing/choker play, sarcasm drops.
  - Boglárka: mutual oral focus, deliberate requests, quiet aftercare.
  - Gréta: practical checks, playful energy, laughter, phone-away.
- Virág: expand existing early/repeated fades into fully explicit versions; keep independent of the other women.
- Triad: group scenes only after individual explicit development and present three-way agreement; later half only.
- Explicit dialogue stays in established voices. No generic dirty talk. English canonical; Hungarian translation in the same pass where localization infrastructure allows.
- Update character fantasy notes in `CHARACTER-VOICES.md` with concrete samples.

**Acceptance**
- Connected arcs playable via CLI (model after existing Gréta INT2 validation).
- Refusal paths retain romance progress and do not invent off-screen history.
- Knowledge and decision order preserved.
- Tracker INT2 rows updated with scene IDs, validation commits, and remaining gates.
- Bilingual text present for new scenes or clearly marked as English-only pending translation.

**Dependencies**: Engine hooks. Can proceed in parallel with asset generation once briefs exist. Events reference these scene IDs.

---

## 4. Generated asset category

**Goal**: Produce consistent drawn anime explicit CGs, expression variants, and optional short loops using the existing Venice pipeline (anime models only).

**Key files**
- `art-jobs/venice/` (request.json, catalog prompts)
- `assets/generated/venice/` (candidates)
- `src/game/content/assets.ts`, `animations.ts`
- `docs/ART-REGISTER.md`, `docs/design/CHARACTER-VISUALS.md`, `CHARACTER-IMAGE-PROMPTS.md`
- `.github/workflows/venice-assets.yml`

**Required production**
- Identity sheets first: clothed, partial-undress, and nude/partial variants for Rebeka, Boglárka, Gréta, Virág (and Lilla/Júlia if side routes are approved). Use current neutral portraits as references. Anime models only (WAI Illustrious or current equivalent). Fixed seeds + style references.
- Scene CGs: one primary explicit CG per new midpoint and later-half meeting, plus 1–2 variants (location, preference, risk). Backgrounds can composite existing location art where possible.
- Optional short looped WebP moments for 2–3 key acts per character (poster + reduced-motion fallback), following the existing Virág animation contract.
- Register only after visual review against `CHARACTER-VISUALS.md`. Update art register with generated / reviewed / integrated states.
- Resume Venice production under existing secret and workflow rules; do not switch to photoreal models.

**Acceptance**
- Identity consistent across expressions and CGs (hair, marks, freckles, glasses, body type).
- Assets load via existing manifests; missing variants fall back honestly.
- Provenance recorded. No unreviewed candidates in runtime paths.
- Tracker ART rows updated.

**Dependencies**: Character visual authority and scene briefs (for pose/location needs). Can start identity sheets immediately. Full CG production follows approved briefs.

---

## Implementation sequence and linking

1. **Engine hooks** (section 1) — unblocks everything else. Update `ENGINE.md` + trackers.
2. **Story briefs and sample dialogue** (section 3, design docs first) — define exact scene IDs, prerequisites, and preference flags.
3. **Identity asset sheets** (section 4) in parallel once briefs exist.
4. **Full scene writing + event pool** (sections 3 + 2) using the hooks and referencing planned CG IDs.
5. **CG production and registration** (section 4) against the written scenes.
6. **Integration, CLI validation, tracker updates, content epoch bump**.
7. **Optional loops, mature side routes, and spontaneous pool expansion**.

**Tracker actions for the implementing agent**
- Add or expand rows in `docs/design/TRACKER.md` under INT2 (and new EVENT / ART-NSFW rows).
- Mirror priorities in `docs/design/MASTER-TRACKER.md`.
- Record scene IDs, commit hashes, test results, and remaining acceptance gates in the same commit as the code/docs.

**Ready-to-work checklist**
- Engine section can be started now.
- Story and event sections require the engine hooks or can begin with design-doc briefs.
- Asset section can begin identity sheets immediately using existing portraits and `CHARACTER-IMAGE-PROMPTS.md`.
- All sections must update the two trackers and owning contracts before claiming completion.

This plan is self-contained for agent hand-off. Follow the existing contributor workflow in `AGENT.md` and `docs/design/README.md`.
