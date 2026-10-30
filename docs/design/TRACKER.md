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
| EVENT-SIDE-LILLA | Partial | Optional sensory-reclaiming encounters `lilla_sensory_1` / `lilla_sensory_2`. After shared_3 / returned_lilla, weeks 12–40, night. Mutual yes / reconsider / no, aftermath, preferences `sensory-grounding` / `verbal-presence`, gallery `lilla_sensory_cg1`. Intimacy stages + planned moments. | Implemented in `content/side-events.ts`, registered in catalog. Assets unproduced (portrait + text fallback). Content epoch 17. |
| EVENT-SIDE-JULIA | Partial | Optional guided-instruction encounters `julia_guided_1` / `julia_guided_2`. After shared_4 / timeline, weeks 14–40, night. Same mutual-choice structure, preferences `guided-instruction` / `attire-partial`, gallery `julia_guided_cg1`. | Same module and hooks. Never gates investigation. English source; Hungarian pending. |
| EVENT-SPONT-EXAMPLE | Partial | Small spontaneous pool example: `lilla_spontaneous_touch` and `julia_spontaneous_instruction`. Short, night-only, after the first side-event yes + preference set. Mutual yes/no, brief aftermath, reuses gallery/preference. | Implemented in `content/spontaneous-events.ts`, registered. Assets later (reuse planned moments). Never blocks investigation. |
| ENGINE-NSFW-HOOKS | Implemented | Generic preference string set and gallery ID list on Effect / GameState; optional risk flag on SceneStage; accumulation in applyEffect. No character names in engine. | Types, logic, initial state updated. Documented in ENGINE.md. |
| EVENT-GRETA-INT2 | Partial | Optional later private continuation `greta_private_1`. After `greta_dance_intimate`, weeks 40–48, night, apartment. Mutual yes / reconsider / no, aftermath, preference `precise-presence`, gallery `greta_private_cg1`. Intimacy stages + planned moments. | Implemented in `content/greta-intimacy.ts`, registered in catalog. Assets unproduced (portrait + text fallback). Content epoch 18. Never gates investigation. |

## Other current priorities

See `docs/design/MASTER-TRACKER.md` for the consolidated SE-* / AS-* list. INT2 connected annual exploration for Rebeka / Boglárka / triad / Virág remains Partial. Gréta received one additional optional private continuation using preference/gallery hooks. Optional content never gates the mandatory investigation.

## shared_5 expansion — 30 October 2026

| ID | Status | Scope | Evidence / remaining |
| --- | --- | --- | --- |
| STORY-SHARED5 | Partial | shared_5 expanded English-first (then Hungarian). Added ordinary projector-search setup, Boglárka’s unanswered question, distinct ground/withdraw reactions, Áron arrival confirmation, natural departure. Evidence `borrowed_voice` and prerequisites unchanged. Node count increased. | Implemented in `shared.ts` + `locales/shared5.{en,hu}.ts`. CLI/branch tests still to be extended for the new nodes. Literary acceptance open. Later shared scenes remain sparse. |

## shared_6 expansion — 30 October 2026

| ID | Status | Scope | Evidence / remaining |
| --- | --- | --- | --- |
| STORY-SHARED6 | Partial | shared_6 expanded English-first (then Hungarian). Added courtyard arrival, Dénes’s protected second return, concrete company request from Gréta after others leave, distinct protect/consent reactions. Evidence `pattern` and prerequisites unchanged. | Implemented in `shared.ts` + `locales/shared6.{en,hu}.ts`. Later shared scenes still sparse. |
