# Narrative rewrite workflow

> **Status:** User-approved workflow, 28 October 2026; shared_1–4 opening implemented; further scene rewrites proceed in reviewed batches. | **Purpose:** Connect the master plot, character guidance, scene specifications and repeated playthrough review.

## User decision and immediate scope
Record problems first. Do not patch dialogue as problems arise during the baseline playthrough. This supersedes the suggestion to rewrite each encountered scene immediately. The user subsequently authorized drafting: [SCENE-OUTLINE.md](SCENE-OUTLINE.md) now provides first briefs and reconciliation notes for all 68 scene IDs. Resolve marked open decisions and refine branch details before implementing narrative changes.

## Writing language — 28 October 2026
English is the canonical source for new and revised dialogue, narration, choices and accompanying text. Hungarian is translated from the reviewed English version. English is also the approved target default player language; runtime migration remains pending under [LOCALIZATION.md](../LOCALIZATION.md). Preserve character names/accents and interpolate the chosen player name. Review Hungarian again whenever its English source changes. This supersedes Hungarian-first authorship, not the findings-first planning/rewrite cycle.

## Required relationship-arc expansion — 29 October 2026

The user's [year-long relationship progression requirement](GAME-DESIGN.md#relationship-progression-across-the-year--29-october-2026) overrides older handoffs that treat polishing six existing meetings as completion. Retain their useful prose and branch repairs, but do not preserve ending-only intimacy as a design constraint.

Before the next relationship rewrite, map the selected route across actual calendar weeks: attraction/date, first optional sexual intimacy around the midpoint, several later-half exploration meetings, ordinary affectionate time, commitment and aftermath. Identify what exists, what must be added, admission/prerequisite changes and dependencies on the independent/triad arcs. Refine this connected plan in SCENE-OUTLINE before implementing one/two-scene batches. Planning the arc does not authorize a bulk rewrite, a new engine architecture or an arbitrary fixed timetable for every woman.

Each later meeting needs a distinct activity or personal development, entry intimacy/pace history, offered physical choices, resulting witnessed memories, aftermath and next callback. Write meaningful alternatives for first-time, already-intimate and slower/no-sex histories as applicable; do not imply that the player accepted an earlier encounter. Character-specific exploration can be emotional, conversational or physical without every meeting ending in sex. English remains canonical, Hungarian its reviewed translation.

Validation must follow a route that chooses midpoint intimacy and at least two later exploration meetings through week52, plus a slower/refusal path that retains the romance and avoids invented sexual history. Check earliest/latest feasible scheduling, skipped optional events, ordinary company, distinct individual/triad agreements, save/restart and locale switching. Verify that the week48–50 commitment gate no longer prevents the planned midpoint opportunity where dependencies change. Keep required plot/ending order and one-slot costs. Record actual coverage and gaps under INT2; a translated six-scene pass or one final fade cannot satisfy this gate.


## Sources and order
1. **Master plot:** [STORY-REVIEW.md](STORY-REVIEW.md) is the maintained overall plot/semester outline. Its confirmed direction and explicitly proposed beats remain distinct; this workflow does not approve every proposed detail. Preserve its source-review findings as context.
2. **Characters:** [CHARACTER-VOICES.md](CHARACTER-VOICES.md) owns personality, motives and speech; [CHARACTER-VISUALS.md](CHARACTER-VISUALS.md) owns appearance. Reconcile contradictions with the master plot explicitly, asking the user about material story/character decisions.
3. **Scene specifications:** refine [the first draft](SCENE-OUTLINE.md) derived from those sources. Do not infer that current runtime dialogue is the intended new plot.
4. **Rewrite one scene at a time:** read its specification, relevant character profiles and connected scenes. Expand, shorten or replace text as needed for naturalness, coherence and pacing; length alone is not a target. Preserve branch, knowledge and scheduling contracts.
5. **Repeated playthroughs:** test revised scenes in complete routes, record new findings, deliberately revise, and rerun affected paths. Keep baseline observations separate from post-change evidence.

## Scene specification fields
Stable scene ID; plot purpose; week/window and prerequisites; participants/location; entry knowledge per character; emotional starting point; concrete beats and revelations; choices/refusal alternatives; resulting knowledge and relationship changes; callbacks; departure and next-scene dependencies. Specify player-name interpolation and localization needs. Mark unresolved decisions rather than inventing approval.

## Findings and validation
Use [PLAYTHROUGH-FINDINGS.md](PLAYTHROUGH-FINDINGS.md) for observations, linked to the tested commit, route and scene/line/choice. Record the problem, consequence and proposed direction; distinguish observed, inferred and untested. A finding is not a patch or an approved plot decision.

Blind agent runs use only public CLI observations, no author inspection or scripted walkthrough. Record actual ending, route, errors, stalls, save/resume, transcript and coverage. A single route does not prove all routes. Browser visuals, animation playback and human enjoyment remain separate checks.

After an approved revision, verify relevant branch/knowledge/name/localization behavior and save/resume, then the affected full route. Preserve mutually chosen intimacy and the confirmed fade-to-black direction. Record checks actually run. [TRACKER.md](TRACKER.md) remains the single feature-status tracker.

## Natural dialogue direction — 28 October 2026 continuation

The user authorized continuing the rewrite/playtest and removing unnatural permission asking. This supersedes repetitive permission/consent/evidence-policy speeches as a dialogue pattern. Ordinary conversation, practical help and harmless transitions should flow without ritual approval questions. Show consideration through actions and specific responses. Keep consequential player decisions, refusal paths, mutually chosen intimacy and control of private information; do not turn them into lectures or remove them by implication. Apply this direction scene by scene and check continuity through the public CLI.

## Next agent brief — individual stories, elapsed time and slow CLI review

**User instruction, 28 October 2026:** continue improving the story and dialogue; expand individual stories and conversations; pay particular attention to the passage of time and consistency with the overall plot and characters. Work slowly and playtest through the CLI. This authorizes deliberate implementation batches, not only another outline. It does not approve unresolved plot/mechanic proposals. Read this brief together with the contributor guide; the tracker remains the sole status record.

### Establish the actual starting point

1. Check current main, working-tree changes, package/release metadata and the tracker before assuming the last handoff is current. The preceding writing batch was **0.9.0 / `3f41fb5`**, schema 4/content 6: shared_1–4 have English-first rewrites; spring/summer join Halloween/Christmas as bilingual optional gatherings. Later individual/triad/shared writing and English coverage remain partial. Do not redo completed work blindly or treat earlier test results as new validation.
2. Read [STORY-REVIEW.md](STORY-REVIEW.md), [CHARACTER-VOICES.md](CHARACTER-VOICES.md), the relevant [SCENE-OUTLINE.md](SCENE-OUTLINE.md) briefs, [YEAR-CAMPAIGN.md](YEAR-CAMPAIGN.md), [PLAYTHROUGH-FINDINGS.md](PLAYTHROUGH-FINDINGS.md) and [the multiroute recommendations](PLAYTHROUGH-MULTIROUTE-2026-10-28.md). Read [CLI](../CLI.md), [staging](../SCENE-STAGING.md), [localization](../LOCALIZATION.md) and [save compatibility](../VERSIONING.md) before editing their affected contracts; read [Virág's contract](../VIRAG-STORY.md) for her scenes. Historical reports use the old 16-week campaign: their numbered scenes are not current calendar dates.
3. Follow each target through the **assembled** catalog, including `opening.ts`/`romance.ts` insertions, not just its short base definition. Read its preceding and following personal scenes, intervening mandatory chapters, journal/knowledge text and ending consumers. A polished isolated paragraph can still contradict the route around it.

### Recommended first batch and subsequent order

Start with one complete individual-route baseline through the public CLI; Rebeka is a useful default because the existing report includes both slow-touch and withdrawal evidence. Record current observations before changing anything. Reproduce findings against current main: historical feedback is a lead, not proof a defect still exists.

Prioritize the reported **MR-01–06** continuity/pacing problems before adding length around them: unchosen physical escalation, unconditional intimacy before withdrawal, triad tea turning into an encounter, contradictory props/clothing/location, repeated stage-5/6 milestones, and Gréta's conflicting argument setups. For the first commit choose **one scene, or at most two tightly connected scenes** needed to repair one issue coherently. For example, inspect Rebeka's stage-3 pace branches and stage-6 callbacks before choosing the first repair; do not assume either still has the historical defect. Refine its brief, rewrite it, translate it, read both branches aloud in context, and replay the affected route before moving on. Do not replace every woman's matching milestone with a shared template.

After each passing batch, continue the selected individual's connected arc, then work through Boglárka and Gréta; give Virág her separate contract-led pass. Expand the triad where it intersects these arcs while preserving the independent Rebeka–Boglárka bond. Work toward all individual stories, but do not call a first one/two-scene batch the completed task. Each commit should leave a playable, coherent route and identify its next specific scene.

### Mandatory time and continuity pass for every scene

Before drafting, add a compact continuity block to its owning scene brief:

| Check | Record before writing |
| --- | --- |
| Actual time | Earliest/latest playable **calendar week**, date/season and day/night availability from the current calendar and scene metadata; separately identify any old chapter number. |
| Prior contact | Which preceding meeting must have completed, its possible completion dates, and how short/long the elapsed gap can be. Optional coffees, gifts and seasonal events may have been skipped. |
| Entry knowledge | What each present character witnessed or was actually told; which facts are still unavailable. Include relationship stage, selected pace, refusal history and any unresolved disagreement. |
| Physical state | Location, present cast, arrivals/exits, objects carried or left behind, clothing and current degree of closeness. |
| Change and exit | One concrete personal development, resulting decisions/knowledge, goodbye, any promise and when the next scene can actually occur. |

The campaign is **52 weeks**, not a semester stretched by replacing a number. Derive dates from `src/game/content/calendar.ts`. Its current mandatory chapter weeks are `[1,2,3,6,10,16,28,32,40,43,44,46,48,50,51,52]`. Thus shared_4 occurs in week 6, shared_6 in week 16 and shared_7 in week 28; chapters 6→7 have a twelve-week gap. Do not casually refer to those meetings as yesterday or last week. Confirm these values again if main has changed.

- Check both the earliest and latest legal scheduling of a personal scene. A scene available for several weeks cannot always describe its predecessor as “last night.” If the runtime does not provide a reliable elapsed-time condition, write wording valid throughout its window rather than inventing a new interpolation/clock system. Use supported completion/decision conditions for callbacks with a natural fallback; do not assume a fixed playthrough itinerary.
- Treat waiting as part of the relationship: use an appropriate re-entry after a long gap, show an ongoing personal project changing, or acknowledge an unfinished conversation. Do not invent off-screen dates, exchanged messages, affection, publication, reconciliation or player agreement just to fill the months. Distinguish a character describing her own off-screen activity from falsely assigning shared history to the player.
- Check “tomorrow,” “next week,” “tonight,” birthdays, holidays, term/exam references, seasons, weather, deadlines and promised meetings against actual windows and available slots. Daytime/nighttime are weekly discretionary periods; advancing a line or moving within a scene does not advance a week. No extra mandatory workshop or free activity slots.
- A commitment scene before week 51 must not discuss the vampire's death as already witnessed. Aftermath follows the week-51 confrontation and week-52 institutional resolution. Do not repeat the same personal milestone before and after the confrontation: later dialogue must respond to what has changed, including this route's actual losses and unresolved concerns.
- Optional holiday/seasonal gatherings are not shared memories unless completed. March planting or June picnic attendance never implies a romance. A missed event must not make another scene incoherent or block the investigation.
- Track props, movement and intimacy across **every assembled branch**. A camera left at home cannot reappear for a convenient gesture; going somewhere private is separate from choosing touch; a hand/kiss/slow branch cannot silently become a deeper encounter. Show mutually chosen intimacy through the agreed fade-to-black and retain ordinary aftermath/reconsideration.

### Expand personal stories rather than pad conversations

Give each scene a concrete want, an activity or obstacle, reciprocal conversation, a meaningful change and a natural departure. Add curiosity, attraction, humor, hesitation, mistakes and unresolved feelings where they fit. Let the player contribute to a specific exchange. Two viable approaches should produce different responses or actions, not identical prose plus different reward notices. Some scenes should be enjoyable without research, administration or plot work.

- **Rebeka:** provocative wit, photography/film interests, control over what is seen, slower emotional exposure. Let a joke sometimes fail or reveal a particular insecurity; do not make every response a loyalty test.
- **Boglárka:** precise observation, dry humor, self-authorship and growing initiative. Give her opinions and chosen pleasures; quietness is not passivity or an endless source disclaimer.
- **Gréta:** practical energy, impatience and pleasure beyond being useful. Let her initiate or accept an imperfect afternoon; keep one understandable incident through conflict and repair rather than splicing file/map/group-announcement drafts.
- **Virág:** adult reporter with persistent witty initiative, independent professional success and casual-contact direction. Her attraction may continue after refusal; the player's returned warmth or physical participation must not be invented. Preserve refusal/no-touch alternatives and the separation from the main women's stories.

Use the documented place/activity ideas where consistent with approved scenes and available locations. Favourite-place requirements are confirmed, but unresolved room assignments and new assets remain proposals. Express consideration through behavior and natural speech; remove ritual permission exchanges for harmless actions while retaining consequential invitations, refusal and private-information choices. Do not turn characters into therapy, consent-policy, evidence-policy or engine-rule spokespeople. Preserve romance-first gothic atmosphere and current magical canon.

The late Soma reveal still needs a **coordinated** clue/knowledge migration. Do not remove a name in one scene while later prerequisites, journal facts or dialogue still assume identification/confession. Preserve fair discovery and flag unresolved plot choices in the owning outline. Continue safe individual-scene work that does not depend on settling those choices; do not use the larger unresolved migration as a reason to stop all writing.

### Required playtest loop

1. **Baseline:** use a fresh save and current public CLI observations. Record commit, route, actual completion dates and scene/line/choice IDs in the findings log before editing. Do not patch during the baseline. Distinguish scripted route completions from blind observation-led play; author inspection is useful for editing afterward but is not a blind playtest.
2. **Plan:** refine the scene's beats, continuity block, branches and consequences. Select the relevant MR findings and explain what this batch is intended to fix. Keep English canonical; translate/review Hungarian afterward, including choices, reactions, journal and callbacks. Preserve literal player-name substitution.
3. **Implement one scene at a time:** retain IDs/effects when they still express the intended story. If a correction requires incompatible IDs, pending decisions or progression, follow the documented version/epoch policy; do not keep a broken graph merely to avoid a version change, and do not invent migrations.
4. **Read and replay:** use the actual public CLI to read the revised assembled scene, its predecessor and its next relevant meeting in order. Exercise each changed choice, especially slower/talk-only/departure/refusal branches; check no facts, commitment or touch are granted by implication. Include earliest/latest legal timing where the window permits and an optional-event-skipped path.
5. **Persistence and language:** quit/restart inside a changed scene, including around its choice, compare the public view, and finish the selected branch. Switch English/Hungarian mid-scene, check names and all accompanying text, and confirm the same actions/outcomes. Add focused automated regression cases for the actual continuity/branch defect; tests do not substitute for reading the prose through the CLI.
6. **Route:** finish the affected full individual route to week 52. Replay slower pace and late withdrawal where affected; run triad/friendship or reporter-refusal paths when shared prerequisites/callbacks intersect them. Test weak preparation without making romance necessary for investigation. Do not claim every route was tested from one first-choice completion.
7. **Verify and record:** run `npm test`, `npm run typecheck`, `npm run build` for implementation changes. Update the scene brief, findings, relevant STORY/L4–L6/S1–S5 tracker scope and version rationale with the same commit. Publish to main under the contributor workflow and check that commit's Actions. A passing build is not literary, visual or user acceptance.

Start interactively or use the JSON protocol in [CLI.md](../CLI.md); in JSON mode, read each response and send the newest revision with the next mutation. These examples require **fresh paths**:

```bash
npm ci
npm run --silent play:cli -- --json --locale en --save /tmp/ligetvar-next-rebeka.json
node tools/cli-playthrough.mjs --route rebeka --locale en --save /tmp/ligetvar-next-rebeka-full.json --transcript /tmp/ligetvar-next-rebeka-full-transcript.json
node tools/cli-playthrough.mjs --route withdraw --locale en --save /tmp/ligetvar-next-withdraw.json
```

The example runner follows a predetermined route and generally first choices. To test slower pace, differing dates, particular refusals or every changed branch, deliberately choose the offered public actions; do not label the default runner as coverage of those alternatives. Do not edit saves or inject rewards to manufacture a played result. Use current-envelope save import only for documented resume/interchange tests, and label that evidence separately.

### Commit handoff

For each batch state: exact scenes changed; recommendation IDs addressed and still open; actual calendar/continuity issues resolved; choices/locales/timing extremes played; tested commit/build and ending; save/restart result; tests/Actions; remaining acceptance gaps; and the next specific scene to tackle. Keep transcript evidence reproducible and distinguish committed evidence from ephemeral `/tmp` files. Update the existing tracker rather than creating a competing rewrite checklist. Go slowly enough to understand and verify each character's scene; do not perform a bulk synonym pass or expand the whole catalog without intervening playtests.

### Current continuation after 0.9.4

The next-agent ordering above remains the method. Rebeka `_3` was rewritten in 0.9.1, `_5`/`_6` in 0.9.3, then `_4` in 0.9.4. Do not redo these based solely on historical findings. `_4` no longer imposes presentation misuse; `_5`/`_6` no longer repeat aftermath or force intimacy before withdrawal. See current tracker/evidence. Next connected target is the early Rebeka `_1`/`_2` arc and its elapsed-time/English coverage, then Boglárka, Gréta and contract-led Virág passes. Other women's/triad physical defects and coordinated late-Soma migration remain open.

### Current continuation after 0.9.5

Rebeka `_1`/`_2` now complete her six-scene English-first/Hungarian main relationship pass. Current evidence/limits are in the tracker and the connected-arc findings, not historical MR observations alone. Next: fresh public-CLI Boglárka baseline, then refine `boglarka_3`/`boglarka_6` for MR-01/MR-02 before continuing her individual story. Keep her precise initiative and chosen quiet pleasures; do not copy Rebeka's photograph/film dispute. Gréta, contract-led Virág, triad and coordinated late-Soma migration remain open under the original method.

### Current continuation after 0.9.6

Boglárka `_3`/`_6` now have deliberate English-first/Hungarian passes for MR-01/MR-02, with bounded kiss choices, music/disagreement, continuation before closeness, optional suite visit and fade-to-black/stop/depart alternatives. [Current evidence](PLAYTHROUGH-FINDINGS.md#boglárka-date-and-aftermath-validation--28-october-2026). Next connected batch: fresh CLI review of `_4`/`_5`, remove imposed interruption and invented yesterday-meeting history, give authorship/conflict/commitment distinct present activities without copying Rebeka. Then `_1`/`_2` for the early arc. Preserve witnessed music/concert future decisions consumed by `_6`. The week50 date scheduling limit remains recorded; no schedule redesign is approved. Other outstanding character/triad/shared and late-Soma work remains under the original method.

### Current continuation after 0.9.10

Current main already includes Boglárka `_4`/`_5` (0.9.7) and `_1`/`_2` (0.9.9), completing her six-scene bilingual pass. Gréta `_3`/`_6` now replace the hand-holding escalation and intimacy-before-withdrawal defects with her own imperfect lakeside date and post-crisis tea/suite alternatives. [Current evidence and limits](PLAYTHROUGH-FINDINGS.md#gréta-dateaftermath-baseline--29-october-2026). Next: baseline/refine Gréta `_4`/`_5` together to resolve MR-06's mixed incident and invented yesterday meeting, then `_1`/`_2`. Preserve her energy and chosen pleasures. Do not repeat completed Rebeka/Boglárka or Gréta date work from old handoffs. Virág, triad, yearly density and coordinated late-Soma migration remain open.

### Current continuation after 0.9.11

Gréta `_4`/`_5` now have one coherent present disagreement and a distinct ordinary-time commitment; do not repeat MR-06's old mixed-draft repair. [Connected annual plan and briefs](SCENE-OUTLINE.md#connected-gréta-annual-expansion-plan--29-october-2026) satisfy the INT2 planning prerequisite for this route only; midpoint/later additions are still unimplemented. Next: fresh early-Gréta `_1`/`_2` review within that connected plan, then first optional private/company meeting (actual26–32, date minimum currently28) and separate later exploration batches. Preserve meaningful no-sex/company outcomes and original ending order. [Six-route baseline/eight additional full-year validations](PLAYTHROUGH-FINDINGS.md#annual-rewrite-baseline--29-october-2026) show playable completion, not sufficient yearly density or finished relationships. Coordinated clue migration, triad MR-03, Virág and whole-game English remain open.
