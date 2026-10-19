# Active scene inventory

> **Status:** Generated snapshot. | **Purpose:** Active metadata from the typed runtime registry.

Regenerate with `node --experimental-strip-types tools/scene-inventory.mjs`. Source: `src/game/content/catalog.ts`, assembled from the story modules. 54 authored scenes, 537 text nodes across all branches, 39 choices with explicit next-node targets. Node counts include mutually exclusive branches and are not playthrough lengths. “Authored” means text is present; it is not a narrative quality/completion gate.

| Scene ID | Kind | Week window | Location | Scene/decision/evidence prerequisites | Nodes |
| --- | --- | --- | --- | --- | --- |
| `shared_1` | shared | 1–1 | classroom |  | 28 |
| `shared_2` | shared | 2–2 | department | shared_1 | 25 |
| `shared_3` | shared | 3–3 | library | shared_2, grounding, returned_lilla | 30 |
| `shared_4` | shared | 4–4 | library | shared_3, phrase, time_gap | 7 |
| `shared_5` | shared | 5–5 | holdkor | shared_4, grounding, phrase, timeline | 6 |
| `shared_6` | shared | 6–6 | courtyard | shared_5, borrowed_voice | 7 |
| `shared_7` | shared | 7–7 | library | shared_6, pattern | 7 |
| `shared_8` | shared | 8–8 | classroom | shared_7, archive_access, ritual_fragment | 7 |
| `shared_9` | shared | 9–9 | department | shared_8, investigation_plan, timeline | 7 |
| `shared_10` | shared | 10–10 | department | shared_9, identity, ritual_fragment | 7 |
| `shared_11` | shared | 11–11 | courtyard | shared_10, deliberate_transformation, grounding | 6 |
| `shared_12` | shared | 12–12 | library | shared_11, ritual_fragment, fascination_limit | 7 |
| `shared_13` | shared | 13–13 | chamber | shared_12, anchor_rule, completion_date | 7 |
| `shared_14` | shared | 14–14 | classroom | shared_13, chamber_location, anchor_rule | 7 |
| `shared_15` | shared | 15–15 | chamber | shared_14, intervention_plan, borrowed_voice, fascination_limit | 8 |
| `shared_16` | shared | 16–16 | department | shared_15, vampire_dead | 8 |
| `rebeka_1` | relationship | 1–14 | classroom | shared_1 | 26 |
| `boglarka_1` | relationship | 2–14 | library | shared_2 | 27 |
| `greta_1` | relationship | 2–14 | department | shared_2 | 26 |
| `rebeka_2` | relationship | 3–14 | holdkor | rebeka_1, rebeka_interest | 5 |
| `rebeka_3` | relationship | 6–14 | bekas | rebeka_2, rebeka_attraction | 5 |
| `rebeka_4` | relationship | 9–14 | holdkor | rebeka_3, rebeka_invitation | 5 |
| `rebeka_5` | relationship | 13–14 | courtyard | rebeka_4, rebeka_repair, rebeka_invitation, alternative requirements | 5 |
| `rebeka_6` | relationship | 16–16 | courtyard | shared_16, rebeka_5, rebeka_commit, rebeka | 5 |
| `boglarka_2` | relationship | 4–14 | library | boglarka_1, boglarka_interest | 5 |
| `boglarka_3` | relationship | 7–14 | courtyard | boglarka_2, boglarka_attraction | 5 |
| `boglarka_4` | relationship | 10–14 | library | boglarka_3, boglarka_invitation | 5 |
| `boglarka_5` | relationship | 13–14 | courtyard | boglarka_4, boglarka_repair, boglarka_invitation, alternative requirements | 5 |
| `boglarka_6` | relationship | 16–16 | courtyard | shared_16, boglarka_5, boglarka_commit, boglarka | 5 |
| `greta_2` | relationship | 5–14 | courtyard | greta_1, greta_interest | 5 |
| `greta_3` | relationship | 7–14 | bekas | greta_2, greta_attraction | 5 |
| `greta_4` | relationship | 10–14 | courtyard | greta_3, greta_invitation | 5 |
| `greta_5` | relationship | 13–14 | courtyard | greta_4, greta_repair, greta_invitation, alternative requirements | 5 |
| `greta_6` | relationship | 16–16 | bekas | shared_16, greta_5, greta_commit, greta | 5 |
| `triad_1` | relationship | 4–14 | library | shared_4, rebeka_1, boglarka_1 | 6 |
| `triad_2` | relationship | 5–14 | library | triad_1 | 6 |
| `triad_3` | relationship | 7–14 | courtyard | triad_2, shared_7 | 6 |
| `triad_4` | relationship | 8–14 | courtyard | triad_3, shared_8 | 6 |
| `triad_5` | relationship | 11–14 | classroom | triad_4, shared_11, rebeka_4, boglarka_4, rb_rebeka_yes, rb_boglarka_yes, rebeka_repair, boglarka_repair, triad | 6 |
| `triad_6` | relationship | 12–14 | apartment | triad_5, shared_12, triad_separate_talks, triad | 6 |
| `triad_7` | relationship | 14–14 | apartment | triad_6, rebeka_5, boglarka_5, shared_14, triad_marton_yes, triad_rebeka_yes, triad_boglarka_yes, rebeka_commit, boglarka_commit, triad | 6 |
| `triad_8` | relationship | 16–16 | apartment | shared_16, triad_7, rebeka_commit, boglarka_commit, triad_marton_yes, triad_rebeka_yes, triad_boglarka_yes, triad | 6 |
| `prepare_backup` | preparation | 12–14 | department | shared_12 | 5 |
| `prepare_signals` | preparation | 13–14 | classroom | shared_13 | 5 |
| `friendship_after` | relationship | 16–16 | courtyard | shared_16, friendship | 6 |
| `coffee_rebeka_early` | conversation | 1–7 | courtyard | shared_1 | 18 |
| `coffee_boglarka_early` | conversation | 1–7 | courtyard | shared_1 | 19 |
| `coffee_greta_early` | conversation | 1–7 | courtyard | shared_1 | 19 |
| `coffee_rebeka_middle` | conversation | 8–14 | courtyard | shared_8 | 16 |
| `coffee_boglarka_middle` | conversation | 8–14 | courtyard | shared_8 | 17 |
| `coffee_greta_middle` | conversation | 8–14 | courtyard | shared_8 | 18 |
| `coffee_rebeka_late` | conversation | 15–16 | courtyard | shared_15 | 12 |
| `coffee_boglarka_late` | conversation | 15–16 | courtyard | shared_15 | 12 |
| `coffee_greta_late` | conversation | 15–16 | courtyard | shared_15 | 14 |

## Evidence

| ID | Witnessed source |
| --- | --- |
| `grounding` | `shared_1` |
| `returned_lilla` | `shared_2` |
| `phrase` | `shared_3` |
| `time_gap` | `shared_3` |
| `timeline` | `shared_4` |
| `borrowed_voice` | `shared_5` |
| `pattern` | `shared_6` |
| `ritual_fragment` | `shared_7` |
| `archive_access` | `shared_7` |
| `investigation_plan` | `shared_8` |
| `identity` | `shared_9` |
| `deliberate_transformation` | `shared_10` |
| `fascination_limit` | `shared_11` |
| `anchor_rule` | `shared_12` |
| `completion_date` | `shared_12` |
| `chamber_location` | `shared_13` |
| `intervention_plan` | `shared_14` |
| `vampire_dead` | `shared_15` |
| `aftermath` | `shared_16` |

Historical dialogue trees and localization are preserved under `docs/archive/legacy-narrative/`, with zero active runtime imports. Contextual coffee conversations never grant romance milestones; callback choices require a witnessed earlier topic.
