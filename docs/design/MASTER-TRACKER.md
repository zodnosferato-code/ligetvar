# Ligetvár Master Tracker — Story Engine & Assets

**Repository:** [zodnosferato-code/ligetvar](https://github.com/zodnosferato-code/ligetvar)  
**Created:** 2026-10-30  
**Source of truth:** Synthesized from `docs/design/TRACKER.md`, `ENGINE.md`, `docs/ART-REGISTER.md`, `AGENT.md`, and related design docs.  
**Status legend:** Partial / Planned / Proposed (as in the official tracker). Engine core is Implemented; remaining work is content, acceptance, and assets.

This is the single consolidated master tracker for story-engine-supported narrative work and all asset-related tasks. Agents working on these areas must use this list as the prioritized working set. Update this file and the official `docs/design/TRACKER.md` (and owning contracts) in the same commit as any implementation.

---

## 1. Story Engine Tasks

The generic engine, 52-week schedule, knowledge/witnessed decisions, endings, and catalog are **Implemented**. Remaining work fills the year, deepens relationships, and completes English-first authoring while preserving contracts.

| ID | Priority | Status | Task | Acceptance / Remaining Gate | Dependency / Notes |
|----|----------|--------|------|-----------------------------|--------------------|
| SE-01 | P0 | Partial | **Complete story writing depth (STORY)** | English-first rewrites + Hungarian translations for remaining shared chapters, individual romance, triad, and early identity/confession scenes. Broader literary/user acceptance. | Follow `SCENE-OUTLINE.md`, `NARRATIVE-WORKFLOW.md`, `CHARACTER-VOICES.md`. CLI validation + playthrough findings first. |
| SE-02 | P0 | Partial | **INT2 — connected annual relationship exploration** | Rebeka, Boglárka, triad, and Virág get connected midpoint → later-half meetings → ending (model after Gréta 0.9.11–0.9.16). Preserve no-sex routes, witnessed history, mutual choice. | Gréta already CLI-validated. Do not claim whole-game completion. |
| SE-03 | P1 | Partial | **Localization completion (L1–L6 range)** | Full English catalog as canonical source / target default; complete Hungarian translation. Persist language preference; content epoch bump for cross-locale saves. | Runtime still Hungarian-first. Extract remaining UI/CLI/journals/scenes. |
| SE-04 | P1 | Planned | **Scene staging expansions (S1–S5)** | Multi-location staging, character-specific physical beats, later-scene endings/goodbyes, richer callbacks. Preserve mutual touch, reduced motion, mobile layout. | `SCENE-STAGING.md`. 0.9.1 fixed `rebeka_3` only. |
| SE-05 | P1 | Implemented (maintain) | **Knowledge & save integrity** | Every new scene preserves witnessed prerequisites, distinct bonds, decision order, and save-history validation. | `ENGINE.md`, `VERSIONING.md`. Tests must cover new branches. |
| SE-06 | P2 | Partial | **Optional world / folklore density** | Additional witnessed customs, Virág/Soma foundations, regional callbacks without gating the investigation. | `HUNGARIAN-WORLD.md`, `HOLIDAY-EVENTS.md`. Art/audio still open. |
| SE-07 | P2 | Planned | **Favourite-place dating experiences (S2)** | Distinct favourite locations for each woman with matching art and night-slot feasibility. | User direction recorded; exact rooms still open. No runtime changes yet. |

---

## 2. Asset Tasks

Runtime art is **Partial** (25 portraits, 14 backgrounds, 4 Virág loops + posters, icons). Keep generated / integrated / assistant-reviewed / user-approved states distinct. Follow `ASSET-AGENT-WORKFLOW.md` and `docs/ART-REGISTER.md`.

| ID | Priority | Status | Task | Acceptance / Remaining Gate | Dependency / Notes |
|----|----------|--------|------|-----------------------------|--------------------|
| AS-01 | P0 | Implemented | **Gréta affectionate portrait** | Produced, assistant-reviewed and integrated real affectionate expression; no longer falls back to neutral. | Integrated 2026-10-30; user style acceptance remains open as for other portraits. |
| AS-02 | P1 | Partial | **Seasonal / event character outfits (YEAR-UI-03)** | Per-character coverage matrix: default → seasonal → event → scene override. Precedence + honest fallbacks. Identity consistent across dialogue & map. | `CHARACTER-VISUALS.md` owns appearance. Most bitmaps unproduced. |
| AS-03 | P1 | Partial | **Seasonal backgrounds & atmosphere (YEAR-UI-04)** | Day/night, weather, season, and event variants for actually-used locations. Preserve viewpoint, seating, architecture, hotspot alignment. | Existing resolver + concept candidates. Do not treat tints as finished art. |
| AS-04 | P1 | Partial | **Visual identity updates (ART-PROMPTS)** | Update Virág to 160 cm green pixie cut; apply distinguishing clothing details for supporting cast; resolve full-body outfits. | Prompt pack exists; matching runtime art unproduced. |
| AS-05 | P2 | Partial | **Virág moment acceptance (AN3–AN4)** | Full frame/seam, 320/390/1440 px playback, failure/reload, reduced-motion, and user pilot-acceptance for existing 4 loops + posters. | Infrastructure Implemented; clips labelled reviewed but not re-certified. |
| AS-06 | P2 | Planned | **Coherent gothic icon set (UI-02)** | Inventory controls, replace muddy icons, distinguishable by shape + label, ≥44 px targets, provenance recorded. | Existing raster icons usable. |
| AS-07 | P2 | Partial | **Art register & provenance hygiene** | Update register, manifests (`assets.ts`, `animations.ts`), and provenance for every new asset. Recover/recreate reference masters only if required for future production. | Earlier masters removed; do not restore old art. |
| AS-08 | P3 | Proposed | **Additional moment clips / map art** | Only after core outfits/backgrounds and user direction. | Animation plan and geography concepts exist as candidates. |

---

## 3. Suggested Execution Order

1. ~~**AS-01** (Gréta affectionate)~~ — completed 2026-10-30.  
2. **SE-01 + SE-02** in small connected batches (one character or shared chapter at a time) with CLI validation.  
3. **AS-02 + AS-04** (outfits + identity updates) once character visuals are locked.  
4. **AS-03** (backgrounds) in parallel with staging work.  
5. **SE-03** localization as scenes are rewritten.  
6. Acceptance passes (AS-05, UI device checks) after assets land.

---

## 4. Cross-Cutting Rules

- English is the canonical source for new/revised text; Hungarian is the translation.  
- Update this master tracker, `docs/design/TRACKER.md` and the owning design/technical contract in the same commit.  
- Generated candidates stay under `assets/generated/`; only reviewed exports go into runtime folders.  
- Venice production is paused; use current ChatGPT / built-in generation path.  
- No save migrations; content epoch bumps require a new year.  
- Optional content must never gate the mandatory vampire investigation.

**Next recommended action:** Pick a concrete SE-01/SE-02 batch (or AS-02) and implement it with the corresponding tracker + contract update.
