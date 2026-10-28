# Ligetvár design documentation

> **Status:** Active design authority, established 27 October 2026. | **Purpose:** Define the current game and distinguish shipped redesigns from future work.

Start here before changing gameplay, story, presentation or character design. All maintained design documents in this folder are written in English; this does not mean the game's Hungarian text has been localized.

| Document | Responsibility |
| [Castle year, assets and map](CALENDAR-ASSETS.md) | Year calendar, weather/outfit selection, map meetings, folder and provenance contract |
| --- | --- |
| [Story review and English outline](STORY-REVIEW.md) | Source-based editorial findings, confirmed romance-first direction and revised semester outline (incorporating late Soma reveal, less bureaucratic scenes, earlier relationship room, light magic, and Virág's sexual activity from the start); conversations unchanged |
| [Narrative rewrite workflow](NARRATIVE-WORKFLOW.md) | Approved plot → character/scene specifications → scene rewrites → repeated playthrough cycle; no baseline patching |
| [Playthrough findings](PLAYTHROUGH-FINDINGS.md) | Observed baseline issues and strengths; not applied fixes |
| [Scene-by-scene outline](SCENE-OUTLINE.md) | First editorial draft for all 68 scene IDs; connected plot, character, knowledge and branch briefs; not implemented |
| [Holidays and seasonal events](HOLIDAY-EVENTS.md) | Halloween/Christmas scene briefs and bilingual meetings, engine calendar conditions, clothing/background precedence, validation and unproduced art |
| [One-year campaign](YEAR-CAMPAIGN.md) | Approved 52-week duration, actual chapter dates, ordinary weeks, authoring/save contracts and validation; writing expansion remains partial |
| [Story depth and expansion readiness](EXPANSION-READINESS.md) | Measured route/catalog text, current extension points, schedule/activity constraints and proposed expansion acceptance gates |
| [Eight-route CLI feedback](PLAYTHROUGH-MULTIROUTE-2026-10-28.md) | Eight completed campaigns, 18 prioritized story/dialogue findings, strengths and reproducible public-observation evidence; feedback only |
| [Completed baseline report](PLAYTHROUGH-REPORT-2026-10-28.md) | One autonomous Rebeka-route completion, exact editorial findings and test limits |
| [Game design](GAME-DESIGN.md) | Product direction, current gameplay, story and presentation constraints |
| [Character visuals](CHARACTER-VISUALS.md) | Sole written appearance authority, identity references and approval states for the complete cast |
| [Character image prompts](CHARACTER-IMAGE-PROMPTS.md) | Derived positive/negative production prompts, framing and unresolved visual decisions |
| [Character voices](CHARACTER-VOICES.md) | Temperaments, dialogue patterns and writing coverage |
| [Foundation review](FOUNDATION-REVIEW.md) | Document-by-document assessment of old foundations, conflicts, retained ideas and superseded instructions |
| [Redesign tracker](TRACKER.md) | Current implementation status, evidence, remaining gates and future features |

## Authority

1. Explicit user decisions take precedence. Record new decisions here and identify what they supersede.
2. This folder defines current design. The tracker defines implementation status, while the character visual brief defines appearance.
3. [ENGINE.md](../../ENGINE.md), [CLI](../CLI.md), [versioning](../VERSIONING.md), [economy](../LEISURE-ECONOMY.md), [scene staging](../SCENE-STAGING.md), [Virág's story](../VIRAG-STORY.md) and [animation contract](../ANIMATION-PLAN.md) retain detailed technical/authoring contracts. Update them alongside relevant changes. Code determines actual behavior; a conflict is a discrepancy to resolve, not proof a planned feature exists.
4. The [original redesign plan](../../Ligetvar-Redesign-Plan.md) and [implementation roadmap](../IMPLEMENTATION-ROADMAP.md) retain detailed acceptance criteria, proposals and dated decisions. They do not override newer current decisions or tracker status. Their old checkboxes are historical checkpoints, not a second live tracker.
5. Production logs and archives are historical evidence, never current character or feature authority.

The [art register](../ART-REGISTER.md) remains the detailed file inventory, not another character brief. The [progress log](../REDESIGN-PROGRESS.md) retains execution history, not a competing current status table.

## Contributor workflow

1. Read this index, the relevant design section and tracker row before implementation.
2. Inspect current main and the linked code/contracts. Do not assume a checkbox or proposal proves runtime behavior.
3. For an approved task, implement only its scope. Proposed ideas remain proposals until the user approves them.
4. Update the tracker in the same commit: status, evidence, remaining acceptance criteria and date. Update the owning design/technical contract when behavior changes.
5. Record actual commands, visual review and Actions results honestly. Keep assets-generated, runtime-integrated, assistant-reviewed and user-approved states distinct.

Do not add parallel current trackers to README, AGENT.md or historical plans. Link here instead.
