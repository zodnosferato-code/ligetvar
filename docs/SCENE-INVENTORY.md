# Active scene inventory

> **Status:** Generated snapshot. | **Purpose:** Active scene metadata from the typed runtime registry.

Generated from the sole typed registry, not a parallel scene source. 45 authored scenes: 16 shared, 18 individual foundations, 8 triad scenes, 2 optional preparation scenes, 1 friendship aftermath. Every scene declares Hungarian dialogue, participants, explicit speakers/expressions, location/background, prerequisites and completion records.

| Scene ID | Kind | Week window | Location | Direct scene/decision prerequisites |
| --- | --- | --- | --- | --- |
| `shared_1` | shared | 1–1 | classroom |  |
| `shared_2` | shared | 2–2 | department | shared_1 |
| `shared_3` | shared | 3–3 | library | shared_2 |
| `shared_4` | shared | 4–4 | library | shared_3 |
| `shared_5` | shared | 5–5 | holdkor | shared_4 |
| `shared_6` | shared | 6–6 | courtyard | shared_5 |
| `shared_7` | shared | 7–7 | library | shared_6 |
| `shared_8` | shared | 8–8 | classroom | shared_7 |
| `shared_9` | shared | 9–9 | department | shared_8 |
| `shared_10` | shared | 10–10 | department | shared_9 |
| `shared_11` | shared | 11–11 | courtyard | shared_10 |
| `shared_12` | shared | 12–12 | library | shared_11 |
| `shared_13` | shared | 13–13 | chamber | shared_12 |
| `shared_14` | shared | 14–14 | classroom | shared_13 |
| `shared_15` | shared | 15–15 | chamber | shared_14 |
| `shared_16` | shared | 16–16 | department | shared_15 |
| `rebeka_1` | relationship | 1–14 | classroom | shared_1 |
| `boglarka_1` | relationship | 2–14 | library | shared_2 |
| `greta_1` | relationship | 2–14 | department | shared_2 |
| `rebeka_2` | relationship | 3–14 | holdkor | rebeka_1, rebeka_interest |
| `rebeka_3` | relationship | 6–14 | bekas | rebeka_2, rebeka_attraction |
| `rebeka_4` | relationship | 9–14 | holdkor | rebeka_3, rebeka_invitation |
| `rebeka_5` | relationship | 13–14 | courtyard | rebeka_4, rebeka_repair, rebeka_invitation |
| `rebeka_6` | relationship | 16–16 | courtyard | shared_16, rebeka_5, rebeka_commit |
| `boglarka_2` | relationship | 4–14 | library | boglarka_1, boglarka_interest |
| `boglarka_3` | relationship | 7–14 | courtyard | boglarka_2, boglarka_attraction |
| `boglarka_4` | relationship | 10–14 | library | boglarka_3, boglarka_invitation |
| `boglarka_5` | relationship | 13–14 | courtyard | boglarka_4, boglarka_repair, boglarka_invitation |
| `boglarka_6` | relationship | 16–16 | courtyard | shared_16, boglarka_5, boglarka_commit |
| `greta_2` | relationship | 5–14 | courtyard | greta_1, greta_interest |
| `greta_3` | relationship | 7–14 | bekas | greta_2, greta_attraction |
| `greta_4` | relationship | 10–14 | courtyard | greta_3, greta_invitation |
| `greta_5` | relationship | 13–14 | courtyard | greta_4, greta_repair, greta_invitation |
| `greta_6` | relationship | 16–16 | bekas | shared_16, greta_5, greta_commit |
| `triad_1` | relationship | 4–14 | library | shared_4, rebeka_1, boglarka_1 |
| `triad_2` | relationship | 5–14 | library | triad_1 |
| `triad_3` | relationship | 7–14 | courtyard | triad_2, shared_7 |
| `triad_4` | relationship | 8–14 | courtyard | triad_3, shared_8 |
| `triad_5` | relationship | 11–14 | classroom | triad_4, shared_11, rebeka_4, boglarka_4, rb_rebeka_yes, rb_boglarka_yes, rebeka_repair, boglarka_repair |
| `triad_6` | relationship | 12–14 | apartment | triad_5, shared_12, triad_separate_talks |
| `triad_7` | relationship | 14–14 | apartment | triad_6, rebeka_5, boglarka_5, shared_14, triad_marton_yes, triad_rebeka_yes, triad_boglarka_yes, rebeka_commit, boglarka_commit |
| `triad_8` | relationship | 16–16 | apartment | shared_16, triad_7, rebeka_commit, boglarka_commit, triad_marton_yes, triad_rebeka_yes, triad_boglarka_yes |
| `prepare_backup` | preparation | 12–14 | department | shared_12 |
| `prepare_signals` | preparation | 13–14 | classroom | shared_13 |
| `friendship_after` | relationship | 16–16 | courtyard | shared_16 |

Evidence IDs: `grounding`, `returned_lilla`, `phrase`, `time_gap`, `timeline`, `borrowed_voice`, `pattern`, `ritual_fragment`, `archive_access`, `investigation_plan`, `identity`, `deliberate_transformation`, `fascination_limit`, `anchor_rule`, `completion_date`, `chamber_location`, `intervention_plan`, `vampire_dead`, `aftermath`.

Routes: friendship, rebeka, boglarka, greta, triad. The old boglarka_greta and rebeka_greta IDs are historical only and never migrated. Localization is Hungarian scene-local text; zero active legacy localization keys. Historical dialogues/part1–3 and locales/*.json have zero active runtime imports.
