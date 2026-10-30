# Redesign and feature tracker

> **Status:** Active tracker. | **Purpose:** Separate implemented redesigns, unfinished gates and future work.

This is the single current design-status tracker. Existing roadmap IDs are retained for traceability.

## Status definitions

| Status | Meaning |
| --- | --- |
| Implemented | The stated scope exists, with linked implementation or recorded validation. Does not imply final creative approval or all possible extensions. |
| Partial | A usable implementation exists, but the stated area has open scope or acceptance gates. |
| Planned | User-requested future work; not implemented for the stated scope. |
| Proposed | Candidate idea or unresolved design choice; not approved for implementation. |
| Blocked | Cannot proceed until the named dependency is resolved; record that dependency explicitly. |

## Side-character one-off events — 30 October 2026

| ID | Status | Scope | Evidence / remaining |
| --- | --- | --- | --- |
| EVENT-SIDE-LILLA | Partial | Optional sensory-reclaiming encounters `lilla_sensory_1` (and planned second). After shared_3 / returned_lilla, weeks 12–40, night. Mutual yes / reconsider / no, aftermath, preferences `sensory-grounding` / `verbal-presence`, gallery `lilla_sensory_cg1`. Intimacy stages + planned moments. | Implemented in `content/side-events.ts`, registered in catalog. Assets unproduced (portrait + text fallback). Content epoch 17. |
| EVENT-SIDE-JULIA | Partial | Optional guided-instruction encounters `julia_guided_1` (and planned second). After shared_4 / timeline, weeks 14–40, night. Same mutual-choice structure, preferences `guided-instruction` / `attire-partial`, gallery `julia_guided_cg1`. | Same module and hooks. Never gates investigation. English source; Hungarian pending. |
| ENGINE-NSFW-HOOKS | Implemented | Generic preference string set and gallery ID list on Effect / GameState; optional risk flag on SceneStage; accumulation in applyEffect. No character names in engine. | Types, logic, initial state updated. Documented in ENGINE.md. |

## Other current priorities

See `docs/design/MASTER-TRACKER.md` for the consolidated SE-* / AS-* list. INT2 connected annual exploration for Rebeka / Boglárka / triad / Virág remains Partial. Optional content never gates the mandatory investigation.
