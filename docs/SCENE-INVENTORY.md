# Active scene inventory

> **Status:** Generated snapshot. | **Purpose:** Active metadata from the typed runtime registry.

Regenerate with `node --experimental-strip-types tools/scene-inventory.mjs`. Source: `src/game/content/catalog.ts`, assembled from the story modules. 70 authored scenes, 1039 text nodes across all branches, 152 choices with explicit next-node targets. Node counts include mutually exclusive branches and are not playthrough lengths. “Authored” means text is present; it is not a narrative quality/completion gate.

| Scene ID | Kind | Week window | Location | Scene/decision/evidence prerequisites | Nodes |
| --- | --- | --- | --- | --- | --- |
| `shared_1` | shared | 1–1 | classroom |  | 28 |
| `shared_2` | shared | 2–2 | department | shared_1 | 25 |
| `shared_3` | shared | 3–3 | library | shared_2, grounding, returned_lilla | 30 |
| `shared_4` | shared | 6–6 | library | shared_3, phrase, time_gap | 7 |
| `shared_5` | shared | 10–10 | holdkor | shared_4, grounding, phrase, timeline | 6 |
| `shared_6` | shared | 16–16 | courtyard | shared_5, borrowed_voice | 7 |
| `shared_7` | shared | 28–28 | library | shared_6, pattern | 7 |
| `shared_8` | shared | 32–32 | classroom | shared_7, archive_access, ritual_fragment | 7 |
| `shared_9` | shared | 40–40 | department | shared_8, investigation_plan, timeline | 7 |
| `shared_10` | shared | 43–43 | department | shared_9, identity, ritual_fragment | 7 |
| `shared_11` | shared | 44–44 | courtyard | shared_10, deliberate_transformation, grounding | 6 |
| `shared_12` | shared | 46–46 | library | shared_11, ritual_fragment, fascination_limit | 7 |
| `shared_13` | shared | 48–48 | chamber | shared_12, anchor_rule, completion_date | 7 |
| `shared_14` | shared | 50–50 | classroom | shared_13, chamber_location, anchor_rule | 7 |
| `shared_15` | shared | 51–51 | chamber | shared_14, intervention_plan, borrowed_voice, fascination_limit | 8 |
| `shared_16` | shared | 52–52 | department | shared_15, vampire_dead | 8 |
| `rebeka_1` | relationship | 1–50 | classroom | shared_1 | 26 |
| `boglarka_1` | relationship | 2–50 | library | shared_2 | 27 |
| `greta_1` | relationship | 2–50 | department | shared_2 | 26 |
| `rebeka_2` | relationship | 3–50 | holdkor | rebeka_1, rebeka_interest | 20 |
| `rebeka_3` | relationship | 16–50 | bekas | rebeka_2, rebeka_attraction | 50 |
| `rebeka_4` | relationship | 40–50 | holdkor | rebeka_3, rebeka_invitation | 17 |
| `rebeka_5` | relationship | 48–50 | courtyard | rebeka_4, rebeka_repair, rebeka_invitation, alternative requirements | 18 |
| `rebeka_6` | relationship | 52–52 | courtyard | shared_16, rebeka_5, rebeka_commit, rebeka | 10 |
| `boglarka_2` | relationship | 6–50 | library | boglarka_1, boglarka_interest | 21 |
| `boglarka_3` | relationship | 28–50 | courtyard | boglarka_2, boglarka_attraction | 50 |
| `boglarka_4` | relationship | 43–50 | library | boglarka_3, boglarka_invitation | 18 |
| `boglarka_5` | relationship | 48–50 | courtyard | boglarka_4, boglarka_repair, boglarka_invitation, alternative requirements | 18 |
| `boglarka_6` | relationship | 52–52 | courtyard | shared_16, boglarka_5, boglarka_commit, boglarka | 10 |
| `greta_2` | relationship | 10–50 | courtyard | greta_1, greta_interest | 20 |
| `greta_3` | relationship | 28–50 | bekas | greta_2, greta_attraction | 49 |
| `greta_4` | relationship | 43–50 | courtyard | greta_3, greta_invitation | 17 |
| `greta_5` | relationship | 48–50 | courtyard | greta_4, greta_repair, greta_invitation, alternative requirements | 18 |
| `greta_6` | relationship | 52–52 | bekas | shared_16, greta_5, greta_commit, greta | 10 |
| `triad_1` | relationship | 6–50 | library | shared_4, rebeka_1, boglarka_1 | 6 |
| `triad_2` | relationship | 10–50 | library | triad_1 | 6 |
| `triad_3` | relationship | 28–50 | courtyard | triad_2, shared_7 | 15 |
| `triad_4` | relationship | 32–50 | courtyard | triad_3, shared_8 | 14 |
| `triad_5` | relationship | 44–50 | classroom | triad_4, shared_11, rebeka_4, boglarka_4, rb_rebeka_yes, rb_boglarka_yes, rebeka_repair, boglarka_repair, triad | 6 |
| `triad_6` | relationship | 46–50 | apartment | triad_5, shared_12, triad_separate_talks, triad | 6 |
| `triad_7` | relationship | 50–50 | apartment | triad_6, rebeka_5, boglarka_5, shared_14, triad_marton_yes, triad_rebeka_yes, triad_boglarka_yes, rebeka_commit, boglarka_commit, triad | 36 |
| `triad_8` | relationship | 52–52 | apartment | shared_16, triad_7, rebeka_commit, boglarka_commit, triad_marton_yes, triad_rebeka_yes, triad_boglarka_yes, triad | 24 |
| `prepare_backup` | preparation | 46–50 | department | shared_12 | 5 |
| `prepare_signals` | preparation | 48–50 | classroom | shared_13 | 5 |
| `friendship_after` | relationship | 52–52 | courtyard | shared_16, friendship | 6 |
| `coffee_rebeka_early` | conversation | 1–31 | courtyard | shared_1 | 18 |
| `coffee_boglarka_early` | conversation | 1–31 | courtyard | shared_1 | 19 |
| `coffee_greta_early` | conversation | 1–31 | courtyard | shared_1 | 19 |
| `coffee_rebeka_middle` | conversation | 32–50 | courtyard | shared_8 | 16 |
| `coffee_boglarka_middle` | conversation | 32–50 | courtyard | shared_8 | 17 |
| `coffee_greta_middle` | conversation | 32–50 | courtyard | shared_8 | 18 |
| `coffee_rebeka_late` | conversation | 51–52 | courtyard | shared_15 | 12 |
| `coffee_boglarka_late` | conversation | 51–52 | courtyard | shared_15 | 12 |
| `coffee_greta_late` | conversation | 51–52 | courtyard | shared_15 | 14 |
| `outing_rebeka_1` | conversation | 2–50 | holdkor | rebeka_1 | 9 |
| `outing_rebeka_2` | conversation | 3–50 | courtyard | outing_rebeka_1 | 8 |
| `outing_boglarka_1` | conversation | 2–50 | library | boglarka_1 | 9 |
| `outing_boglarka_2` | conversation | 3–50 | library | outing_boglarka_1 | 8 |
| `outing_greta_1` | conversation | 2–50 | bekas | greta_1 | 9 |
| `outing_greta_2` | conversation | 3–50 | bekas | outing_greta_1 | 8 |
| `virag_1` | conversation | 2–50 | hallway |  | 18 |
| `virag_2` | conversation | 3–50 | courtyard | virag_1 | 9 |
| `virag_3` | conversation | 6–50 | library | virag_2 | 9 |
| `virag_4` | conversation | 16–50 | bekas | virag_3 | 13 |
| `virag_5` | conversation | 32–50 | courtyard | virag_4 | 8 |
| `virag_6` | conversation | 43–50 | library | virag_5 | 9 |
| `virag_7` | conversation | 46–50 | bekas | virag_6 | 8 |
| `virag_8` | conversation | 48–50 | courtyard | virag_7 | 9 |
| `holiday_halloween` | conversation | 5–5 | holdkor | shared_1, event:halloween | 16 |
| `holiday_christmas` | conversation | 13–13 | library | shared_1, event:christmas | 16 |

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
