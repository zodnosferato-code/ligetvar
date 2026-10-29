# Current game design

> **Status:** Active baseline, 27 October 2026. | **Purpose:** Describe the intended current experience without presenting backlog as implemented.

Implementation coverage and unfinished gates belong in the [tracker](TRACKER.md). Detailed contracts are linked below.

## Experience and story

Ligetvár is a Hungarian gothic romance visual novel set during a 52-week year at a castle college. Dating and building relationships with Rebeka, Boglárka, Gréta and Virág is the core experience; the story provides its setting. Disappearances, lost time and supernatural unease support the romance. On 28 October the user extended the campaign to one year, superseding the 27 October 16-week decision. Soma should remain a background character until his late reveal. This supersedes the earlier extended intervention phase after an early identification/confession; intervention remains the climax. See the [story review and revised English outline](STORY-REVIEW.md) for findings and proposed beats (incorporating playtest recommendations: late Soma reveal, less bureaucratic shared scenes, earlier relationship room, light magic for chemistry); the [year campaign](YEAR-CAMPAIGN.md) now owns runtime dates; broader scene rewriting remains incomplete. Keep violence limited and the tone mostly eerie. Márton is the teacher, study director and first-person viewpoint character. Mystical gymnastics is a genuine magical discipline he already knows.

The vampire is Soma, an existing university assistant who deliberately pursues transformation through frustrated ambition and desire. Keep his appearances brief and ordinary for most of the year, with sparse clues that gain meaning retrospectively. Avoid early confession, repeated villain encounters or obvious ominous framing. The older 13–14 proposal used semester coordinates. Current identity corroboration is week 40 and the existing confession is week 43; further reveal rewriting remains unfinished. His power amplifies fascination and ambition, but cannot compel affection. Disappeared people return exhausted with missing time. The main story requires a confrontation ending in the vampire's death, followed by institutional and personal aftermath. Specific supernatural mechanics marked proposed in the original plan remain proposals; do not silently treat them as new canon.

Support three individual romance routes, friendship/withdrawal, and the Rebeka–Boglárka–Márton route. The latter includes a relationship between the two women, separate bonds and affirmative agreement from all three participants. Scores, gifts and repeated conversations do not substitute for witnessed decisions. Preserve the women's distinct [voices](CHARACTER-VOICES.md).

Virág is a separate adult reporter with eight optional chapters, persistent teasing, and sexual activity from the first meeting. She pushes for sexual acts (implied via fade-to-black after mutual choice) both for help and for her own amusement; she keeps initiating after refusals. No professional-only route and no bad ending. Her cases succeed independently of romantic choices and skipped meetings. Refusals change the selected physical action; refused touch never occurs. She does not replace the vampire investigation or interact with the main women. Her full branch contract remains in [VIRAG-STORY.md](../VIRAG-STORY.md).

## Relationship intimacy — 27 October 2026

User decision during the legacy-document review: intimacy belongs in the game because the story follows relationships. Present it with fade-to-black scenes for now. This supersedes requirements for graphic prose, explicit illustrations or a universal escalation ladder in older expansion drafts. Sexual acts are present but implied; language is toned down so explicit scenes can be inserted later into the fade points.

Give intimacy a meaningful narrative place: character-specific attraction and pace, an invitation, mutual choice, a transition off-screen, and a return showing conversation, care or changed closeness. Retain reconsideration, refusal and slower alternatives. Do not remove the relationship beat merely because its physical detail is off-screen, and do not require intimacy to earn commitment, resolve the investigation or receive a valid ending.

This is the current authoring contract, not a claim that every existing branch has been rewritten. INT1 in the [tracker](TRACKER.md) records the remaining branch audit and implementation acceptance.

## Foundations retained from older writing

The shared work gives each woman her own reason to participate: photography/documentation, folklore/source analysis, or organization/records. Each should contribute judgment and pursue goals beyond romance. Everyday college details and quiet decompression after frightening events keep the setting lived-in.

Build conversations through observation, disagreement, a personal preference and a later consequence or callback. Vulnerabilities may recur, but body reassurance, control, shyness or usefulness must not become a character's only subject. Staff can have different motives and levels of knowledge instead of acting as a single hostile group. Required discoveries remain authored and available independently of romance or optional random atmosphere.

These principles preserve compatible foundations from the original plan and legacy documents 03, 07, 24 and 37. Their retired monster rules, route combinations, delayed-romance mandate and numeric intimacy gates are not adopted. See the [document-by-document review](FOUNDATION-REVIEW.md).

## Year and activities

Each of 52 weeks offers one discretionary daytime slot and one discretionary nighttime slot, followed by a recap. On the 16 dates in `content/calendar.ts`, a mandatory shared-story slot comes first. Ordinary weeks start in the daytime planner; no story knowledge is granted for passing time. Scene continuation and movement inside one activity do not spend additional slots; completing the activity does. Required story cannot be displaced by optional play. Keep the confrontation → institutional aftermath → personal follow-ups → ending sequence.

The campaign is fixed at 52 weeks, with confrontation in week 51 and institutional/personal aftermath in week 52. [Year implementation and validation](YEAR-CAMPAIGN.md) distinguish the calendar expansion from the still-partial full-year writing. Alternate duration presets remain future work.

Work and preparation are daytime activities; nighttime uses the bedroom hub. The office and bedroom expose labelled clickable objects; the door offers destinations and available scenes. Phone menus arrange personal meetings and paid outings and retain gift replies. Journals, menus and gift browsing do not independently advance the calendar. See [ENGINE.md](../../ENGINE.md) for exact costs, periods and ending rules.

The implemented leisure direction uses relaxed move-limited puzzles, substantial money/program-point rewards for full daytime job slots, optional paid outings and personalized gifts. Recycling uses illustrated bottles/cans and visible swap, match-pop, falling-refill and chain-score feedback, with free optional hints and reduced-motion presentation (27 October 2026 user request). Animation is transient; the complete deterministic move is saved immediately and the CLI shares its outcome. Rewards are resolved by shared game logic; no arbitrary UI reward amounts or duplicate claims. See [LEISURE-ECONOMY.md](../LEISURE-ECONOMY.md) for current balance.

## Favourite places

User direction, 27 October 2026: each of the four women must have a favourite place that enables distinct dating experiences. Use the setting's activities, atmosphere, movement and opportunities for closeness to differentiate routes. Revisit places with shared memories; allow other destinations and dates unrelated to work. Virág's confirmed setting is investigation inside the school at night, searching for documents; this supersedes the café proposal. Her exact favourite room and affected chapter assignments remain open. The [proposed place assignments and experience brief](STORY-REVIEW.md#favourite-places-and-distinct-dating-experiences) await user selection. No conversations, runtime locations or art were changed by this decision.

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


## Automatic arrivals and transitions — 28 October 2026

User direction: mandatory events must take the player there automatically when due, replacing the browser's blocked planning hub/manual door selection. The browser enters the available scheduled shared scene on new game, next week and resume, preserving prerequisites, pending choices and slot costs. Discretionary appointments remain player-selected. The CLI retains explicit scene actions for inspection and automation; both interfaces use the same scene availability and opening reducers.

Browser transitions mark scene entry, changes of location/lighting within scenes, daytime/nighttime slots and weekly recaps/new weeks. Default background mode reveals the destination's existing art with a fade and slow camera movement, then dismisses automatically. Optional story-card mode displays the destination title, week, lighting and location until skipped. A persistent Transitions control selects Backgrounds, Story cards or Off. Skip/Escape dismisses only presentation; it never advances dialogue or time. Reduced motion removes animation and shortens automatic backgrounds. No extra calendar days or story events are introduced into the existing weekly schedule.

## Castle year — user direction, 28 October 2026

The year-long castle setting supersedes the semester-only setting. The 52 playable weeks contain sixteen mandatory story chapters, with ordinary weeks for discretionary activities; actual dates and budgets follow [the year campaign](YEAR-CAMPAIGN.md). Calendar-driven seasons, weather and clothing, map travel and portrait meeting selectors follow [the calendar/asset contract](CALENDAR-ASSETS.md). Existing semester prose still needs coordinated revision; seasonal and clothing generation is outstanding.

## Optional holidays — 0.8.0

Halloween and Christmas provide ordinary shared experiences in weeks 5 and 13, independent of the vampire plot or romance choices. The player can join a story/activity or leave early. [Holiday briefs and engine contract](HOLIDAY-EVENTS.md) define calendar conditions, costumes, decorated backgrounds, callbacks and validation. These two bilingual meetings are implemented; new seasonal/holiday bitmap production remains open.

## Focused interface — 28 October 2026

User direction: reduce redundant mobile information and separate tasks instead of extending one page. The date and current activity appear once in a compact bar. Its status control opens energy, money, activity points, week progress and the annual calendar. The journal is available from room objects while planning and from the bar during other activities. Settings contains language, text size, sound, transitions and presentation notices.

The room title and labelled illustration lead the planner. Weekly steps, instructions and upcoming nighttime activities are under an expandable help section. Room objects open modal menus; the phone separates meetings, paid outings and reply history. Browsing remains free. New gift replies appear in a popup and remain in phone history after reading.

Both job puzzles open a result dialog automatically when complete, after recycling playback ends. It shows the final score and earned reward. Collecting the reward closes the job and returns to the nighttime room through the existing shared action; no result button is appended below the board. An unclaimed completed job remains saved and reopens its result on resume. Escape cannot discard an unclaimed result. Other dialogs support Escape/backdrop dismissal, trapped focus, scrollable content, and focus restoration to their opener.

## Visible essentials — 29 October 2026

The [interface review](UI-REVIEW.md) refines the earlier focused-interface rules: resources remain visible in a compact icon strip, the journal is always in the play bar, and nighttime opportunities are outside Help. Available-scene counts identify active room menus without revealing locked content. At widths up to 700px, labelled object controls move into an inlaid rail beneath the uncropped room artwork to prevent overlapping targets; desktop keeps outlined objects in the illustration. This responsive presentation supersedes the requirement for on-image objects on every screen size. Brief entrance/hover motion respects reduced motion. Detailed menus, the annual calendar and tutorial remain on demand.
