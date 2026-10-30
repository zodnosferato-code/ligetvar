# Ligetvár Master Tracker — Story Engine & Assets

**Repository:** [zodnosferato-code/ligetvar](https://github.com/zodnosferato-code/ligetvar)  
**Created:** 2026-10-30  
**Status legend:** Partial / Planned / Proposed (as in the official tracker). Engine core is Implemented; remaining work is content, acceptance, and assets.

This is the single consolidated master tracker for story-engine-supported narrative work and all asset-related tasks. Agents working on these areas must use this list as the prioritized working set. Update this file and the official `docs/design/TRACKER.md` (and owning contracts) in the same commit as any implementation.

---

## 1. Story Engine Tasks

| ID | Priority | Status | Task | Acceptance / Remaining Gate | Dependency / Notes |
|----|----------|--------|------|-----------------------------|--------------------|
| SE-01 | P0 | Partial | **Complete story writing depth (STORY)** — shared_5–7 expanded 30 Oct | English-first rewrites + Hungarian translations for remaining shared chapters, individual romance, triad, and early identity/confession scenes. Broader literary/user acceptance. | Follow `SCENE-OUTLINE.md`, `NARRATIVE-WORKFLOW.md`, `CHARACTER-VOICES.md`. CLI validation + playthrough findings first. |
| SE-02 | P0 | Partial | **INT2 — connected annual relationship exploration** | Rebeka, Boglárka, triad, and Virág get connected midpoint → later-half meetings → ending (model after Gréta). Preserve no-sex routes, witnessed history, mutual choice. | Gréta already CLI-validated; additional optional private continuation `greta_private_1` added with preference/gallery hooks. Do not claim whole-game completion. |
| SE-03 | P1 | Partial | **Localization completion** | Full English catalog as canonical source / target default; complete Hungarian translation. | Runtime still Hungarian-first. |
| SE-04 | P1 | Planned | **Scene staging expansions (S1–S5)** | Multi-location staging, character-specific physical beats, later-scene endings/goodbyes, richer callbacks. | `SCENE-STAGING.md`. |
| SE-05 | P1 | Implemented (maintain) | **Knowledge & save integrity** | Every new scene preserves witnessed prerequisites, distinct bonds, decision order, and save-history validation. | `ENGINE.md`, `VERSIONING.md`. |
| SE-06 | P2 | Partial | **Optional world / folklore density** | Additional witnessed customs, Virág/Soma foundations, regional callbacks without gating the investigation. | `HUNGARIAN-WORLD.md`. |
| SE-07 | P2 | Planned | **Favourite-place dating experiences (S2)** | Distinct favourite locations for each woman with matching art and night-slot feasibility. | User direction recorded. |
| SE-08 | P1 | Partial | **Side-character one-off NSFW events** | Lilla sensory reclaiming and Júlia guided instruction (two each) plus a small spontaneous pool example (`lilla_spontaneous_touch`, `julia_spontaneous_instruction`). Mutual choice, preferences, gallery, intimacy stages. Assets later. | Structure in `side-events.ts` and `spontaneous-events.ts`; engine hooks ready. See SIDE-EVENTS-NSFW.md. |

---

## 2. Asset Tasks

| ID | Priority | Status | Task | Acceptance / Remaining Gate | Dependency / Notes |
|----|----------|--------|------|-----------------------------|--------------------|
| AS-01 | P0 | Implemented | **Gréta affectionate portrait** | Produced, assistant-reviewed and integrated. | User style acceptance remains open. |
| AS-02 | P1 | Partial | **Seasonal / event character outfits** | Per-character coverage matrix. | Most bitmaps unproduced. |
| AS-03 | P1 | Partial | **Seasonal backgrounds & atmosphere** | Day/night, weather, season, and event variants. | Existing resolver + concept candidates. |
| AS-04 | P1 | Partial | **Visual identity updates** | Update Virág to 160 cm green pixie cut; supporting cast details. | Prompt pack exists; runtime art unproduced. |
| AS-05 | P2 | Partial | **Virág moment acceptance** | Full playback, reduced-motion, and user pilot-acceptance for existing 4 loops. | Infrastructure Implemented. |
| AS-06 | P2 | Planned | **Coherent gothic icon set** | Distinguishable by shape + label, ≥44 px targets. | Existing raster icons usable. |
| AS-07 | P2 | Partial | **Art register & provenance hygiene** | Update register and manifests for every new asset. | Do not restore old art. |
| AS-08 | P3 | Proposed | **Additional moment clips / map art** | Only after core outfits/backgrounds. | Animation plan exists. |

---

## 3. Suggested Execution Order

1. SE-01 + SE-02 in small connected batches with CLI validation.  
2. SE-08 side events (structure done; assets pending).  
3. AS-02 + AS-04 once character visuals are locked.  
4. Localization as scenes are rewritten.  

---

## 4. Cross-Cutting Rules

- English is the canonical source for new/revised text; Hungarian is the translation.  
- Update this master tracker, `docs/design/TRACKER.md` and the owning design/technical contract in the same commit.  
- Generated candidates stay under `assets/generated/`; only reviewed exports go into runtime folders.  
- Optional content must never gate the mandatory vampire investigation.  
- No save migrations; content epoch bumps require a new year.

**Next recommended action:** Expand remaining main-route INT2 explicit scenes (Rebeka / Boglárka) using the preference/gallery hooks, or produce identity/CG assets for the side, spontaneous, and Gréta private events.
