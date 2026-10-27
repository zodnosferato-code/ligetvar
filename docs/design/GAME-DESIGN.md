# Current game design

> **Status:** Active baseline, 27 October 2026. | **Purpose:** Describe the intended current experience without presenting backlog as implemented.

Implementation coverage and unfinished gates belong in the [tracker](TRACKER.md). Detailed contracts are linked below.

## Experience and story

Ligetvár is a Hungarian gothic romance visual novel set during a sixteen-week semester at a castle college. Building relationships is the main player drive; disappearances, lost time and supernatural unease support the romance. Keep violence limited and the tone mostly eerie. Márton is the teacher, study director and first-person viewpoint character. Mystical gymnastics is a genuine magical discipline he already knows.

The vampire is Soma, an existing university assistant who deliberately pursues transformation through frustrated ambition and desire. His power amplifies fascination and ambition, but cannot compel affection. Disappeared people return exhausted with missing time. The main story requires a confrontation ending in the vampire's death, followed by institutional and personal aftermath. Specific supernatural mechanics marked proposed in the original plan remain proposals; do not silently treat them as new canon.

Support three individual romance routes, friendship/withdrawal, and the Rebeka–Boglárka–Márton route. The latter includes a relationship between the two women, separate bonds and affirmative agreement from all three participants. Scores, gifts and repeated conversations do not substitute for witnessed decisions. Preserve the women's distinct [voices](CHARACTER-VOICES.md).

Virág is a separate adult reporter with eight optional chapters, persistent teasing, no professional-only route and no bad ending. Her cases succeed independently of romantic choices and skipped meetings. Refusals change the selected physical action; refused touch never occurs. She does not replace the vampire investigation or interact with the main women. Her full branch contract remains in [VIRAG-STORY.md](../VIRAG-STORY.md).

## Relationship intimacy — 27 October 2026

User decision during the legacy-document review: intimacy belongs in the game because the story follows relationships. Present it with fade-to-black scenes for now. This supersedes requirements for graphic prose, explicit illustrations or a universal escalation ladder in older expansion drafts.

Give intimacy a meaningful narrative place: character-specific attraction and pace, an invitation, mutual choice, a transition off-screen, and a return showing conversation, care or changed closeness. Retain reconsideration, refusal and slower alternatives. Do not remove the relationship beat merely because its physical detail is off-screen, and do not require intimacy to earn commitment, resolve the investigation or receive a valid ending.

This is the current authoring contract, not a claim that every existing branch has been rewritten. INT1 in the [tracker](TRACKER.md) records the remaining branch audit and implementation acceptance.

## Foundations retained from older writing

The shared work gives each woman her own reason to participate: photography/documentation, folklore/source analysis, or organization/records. Each should contribute judgment and pursue goals beyond romance. Everyday college details and quiet decompression after frightening events keep the setting lived-in.

Build conversations through observation, disagreement, a personal preference and a later consequence or callback. Vulnerabilities may recur, but body reassurance, control, shyness or usefulness must not become a character's only subject. Staff can have different motives and levels of knowledge instead of acting as a single hostile group. Required discoveries remain authored and available independently of romance or optional random atmosphere.

These principles preserve compatible foundations from the original plan and legacy documents 03, 07, 24 and 37. Their retired monster rules, route combinations, delayed-romance mandate and numeric intimacy gates are not adopted. See the [document-by-document review](FOUNDATION-REVIEW.md).

## Semester and activities

Each week offers one guaranteed shared-story slot, one discretionary daytime slot and one discretionary nighttime slot, followed by a recap. Scene continuation and movement inside one activity do not spend additional slots; completing the activity does. Required story cannot be displaced by optional play. Keep the confrontation → institutional aftermath → personal follow-ups → ending sequence.

The campaign is currently fixed at 16 weeks. Adjustable length is future work, requiring coordinated story windows, slot budgets, save policy and complete-route verification.

Work and preparation are daytime activities; nighttime uses the bedroom hub. The office and bedroom expose labelled clickable objects; the door offers destinations and available scenes. Phone menus arrange personal meetings and paid outings and retain gift replies. Journals, menus and gift browsing do not independently advance the calendar. See [ENGINE.md](../../ENGINE.md) for exact costs, periods and ending rules.

The implemented leisure direction uses relaxed move-limited puzzles, substantial money/program-point rewards for full daytime job slots, optional paid outings and personalized gifts. Recycling uses illustrated bottles/cans and visible swap, match-pop, falling-refill and chain-score feedback, with free optional hints and reduced-motion presentation (27 October 2026 user request). Animation is transient; the complete deterministic move is saved immediately and the CLI shares its outcome. Rewards are resolved by shared game logic; no arbitrary UI reward amounts or duplicate claims. See [LEISURE-ECONOMY.md](../LEISURE-ECONOMY.md) for current balance.

## Scenes and relationships

Use one authoritative typed scene registry, explicit prerequisites, evidence and witnessed decisions. Journals and recaps must respect what the player actually learned. The generic engine must not encode character names, scene IDs or plot outcomes.

Scenes can use explicit stages for location, cast, lighting and proximity. Same-scene pending decisions can support callbacks without certifying global evidence early. Privacy and touch are separate choices. A date needs arrivals, coherent movement, a closing moment and a natural goodbye on accepted and declined branches.

The first three expanded individual dates and six paid outings have an initial departure pass. Broader staging, physical artwork, later-date endings and richer callbacks remain partial or planned as specified in the [tracker](TRACKER.md). See [SCENE-STAGING.md](../SCENE-STAGING.md) for authoring rules.

## Presentation and assets

Use detailed non-pixel anime art with controlled linework and cel shading. Preserve gothic castle-college settings with subtle modern objects. Backgrounds should feel like the player's viewpoint and provide a natural companion seat. The [character visual brief](CHARACTER-VISUALS.md) is the only written appearance authority.

The speaking NPC's transparent portrait overlays the location background; Márton and narration have none. Keep the background visible on mobile, dialogue controls stable, and clickable hub objects visibly outlined and labelled. If art lacks a suitable object, show a labelled icon. Preserve planner hotspot alignment when replacing backgrounds.

Optional GIF-like WebP/GIF moments use short loops and separate static posters for pause/reduced motion. Four Virág clips are present; this does not establish equivalent coverage for the other characters. Follow the [animation contract](../ANIMATION-PLAN.md) and [asset workflow](../ASSET-AGENT-WORKFLOW.md).

## Platforms, saves and language

Browser and playable CLI share action/query logic and campaign rules. CLI observations describe the visible scene without disclosing hidden knowledge; omniscient proofreading is explicit author mode.

Game releases and saves are versioned. Incompatible schema/content epochs require an explained restart, with no migrations or backward-compatible alternate gameplay. See [VERSIONING.md](../VERSIONING.md).

Active gameplay text is currently Hungarian. English design documentation is complete for this folder; localization infrastructure and a complete English game remain planned. Translation must preserve locale-neutral gameplay, browser/CLI parity and knowledge-aware journals.
