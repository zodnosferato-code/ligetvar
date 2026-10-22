# Redesign implementation record

> **Status:** Active implementation record. | **Purpose:** Verified work, remaining gates, and workflow results.

Baseline checked: main `84e01edbc809e727cbc095ff4d522784a4557232`, with no newer changes before implementation. Authority: [redesign plan](../Ligetvar-Redesign-Plan.md), section 10. Implementation was published directly to main as [37f6458](https://github.com/zodnosferato-code/ligetvar/commit/37f64586a506dfb402f1bb7ba056ab8033327172). No branch or pull request was created; no force-push was used. Concurrent Venice tooling commits through 50c8d0b were inspected and preserved, including their script, package command, .gitignore and README/AGENT guidance; the unrelated authenticated smoke test was not run.

## Implemented phases and remaining gates

| Phase | Actual status |
| --- | --- |
| A: inventory / authority | Complete. Numbered legacy documents marked historical; replacements listed below. New scene inventory and art register generated from runtime metadata. |
| B: prerequisites | Implemented: guaranteed shared slot + two discretionary slots, explicit prerequisites, witnessed decisions/evidence, atomic scene completion, independent bonds, ordered endings, v2 save boundary, optional jobs/gifts without work gates. Synthetic foundation tests ran before bulk writing in the initial workspace. |
| C: opening | Weeks 1–3, all introductions and Rebeka foundation 1 authored and verified. Responsive composition inspected. Combined final manga style sample remains pending; functional work uses the user-authorized clothed transitional/placeholder option. |
| D: story / relationships | Playable skeleton, writing pass incomplete. Original 45 Hungarian scenes: 16 shared; 18 individual foundations (six per single); eight additional triad scenes; two preparation activities; friendship aftermath. All supported paths reach week 16. T8 combines both personal aftermaths in one slot. |
| E: basic art | **Open.** Final 31 manga assets, identity/reference sheets, architecture sheet and style approval are not produced. Existing images are transitional, missing images explicitly labelled. No image generation invoked; no explicit artwork generated. See ART-REGISTER.md. |
| F: retirement / release | Replaced core, adapters, old route rules, calendar summaries, illustration aliases and broken Jest entry retired after useful checks migrated. Runtime/content tests, builds and representative browser paths pass. Full art/release gates remain open; do not call the entire redesign complete. |

## Inventory / keep–replace–retire map

| Baseline area | Replacement / disposition | Verification |
| --- | --- | --- |
| src/game/engine/{types,logic}.ts | Keep immutable reducer approach, clamp, salary, optional jobs/gifts; replace incompatible scheduling, fatigue/work gates, derived commitments and endings | npm test |
| catalog.ts + part1.ts / later.ts / dialogueLoader.ts | One typed catalog with local Hungarian text, explicit metadata/prerequisites; merged JSON loaders deleted | Registry, reference, knowledge and route tests |
| src/core/*, src/scripts/part1-kozos.ts | No active consumers except old test entry; max-four-choice, targeted immutable effects and useful coverage migrated; prototype deleted | Import scan, typecheck, tests |
| src/tests/dialogue.test.ts and old Jest commands/dependencies | One Node headless suite; npm test and test:headless delegate to it; Jest/ts-jest removed, explicit Node types added | Clean npm ci; npm test |
| dialogues/part{1,2,3}/*.json, locales/*.json | Moved unchanged to docs/archive/legacy-narrative/ with path/hash inventory; zero active runtime imports; old localization keys no longer active | Source scan, scene-local text validation |
| Old scene / route IDs and horror clues | Legacy ancestry, two pair routes and R/B incompatibility rule retired. Active IDs/deadlines/evidence enumerated in SCENE-INVENTORY.md | No retired IDs reachable, full route simulations |
| State / save fields | version, name, week, slot, phase, scene, minigame, money, energy, exposure, bonds, direction, decisions, evidence, completed, preparation, disclosure, inventory, giftsWeek, jobsWeek, journal, confrontation, institution, lastNote | Save schema/reference tests and save/resume at every required-scene line |
| Old v1 girl flags / route / milestones / workShifts / strain / invite / serialized node | Preserve original v1 bytes under old key; new v2 restart, explicit optional name-only import | Legacy preservation, unsupported/malformed/forged save tests |
| GameApp.tsx and stage.css | Replace conflicting cascade/pixel CSS with explicit portraits, backgrounds, mobile header, text scaling and knowledge journal | Actual desktop/mobile/browser review |
| audio.ts, minigames.tsx, music | Keep working framework; adapt new state, isolate audio failure. Optional runner gets touch jump and fixes offscreen-removal crash; trivia uses current research practices | Build/typecheck; actual runner + full UI paths |
| assets/backgrounds and characters | Explicit transitional manifest, exact locations, safe neutral emotion fallback. Missing assistant/faculty/chamber art labelled | File resolution tests, art register, visual layout review |
| assets/references/intim and old asset logs/locks | Historic source/provenance retained; runtime aliases and public/references symlink removed, no explicit archive shipped | Active import scan; dist/reference exclusion check |
| README / AGENT / ENGINE / numbered docs / workflows | Current runtime documented; old conflicts historical; CI uses npm ci, tests, typecheck, build | Actual local commands and Actions |

Active routes: friendship, rebeka, boglarka, greta, triad. The scene inventory enumerates every active scene, direct prerequisite, actual deadline, location and evidence ID. Hungarian text is scene-local, with zero active old localization keys. Active code remains React + Zustand + Vite; no parallel replacement engine or runtime content adapter remains.

## Provisional creative choices (not previously approved canon)

The separate university assistant is **Végh Soma**, provisionally 32, responsible for archive access/equipment. He deliberately transforms between weeks 1 and 2, seeking recognition and desirability. The plan's proposed grounding, vitality-drain, borrowed-voice and vulnerable-anchor rules are used. The fatal ritual collapse is low-gore and established before the confrontation. The user's 22 October direction specifies short black hair, a thick moustache, a slightly stocky build, and a modestly leaner transformed form with vampire fangs and glowing red eyes; the approved neutral and transformed portraits are recorded as final, with the neutral portrait used in week one and the transformed portrait from week two. The faculty administrator's final portrait now depicts him in his late sixties; Lilla's final portrait reads as an adult in her early thirties. Women-only T3/T4 use an explicitly introduced viewpoint interlude; Márton is absent and does not choose their attraction for them.

## Actual verification

- Initial baseline suite: 27 passed, 0 failed, covering legacy behavior only.
- Initial implementation foundation: five synthetic tests passed before bulk story writing. An executor restart later removed the unpublished local workspace; work was restored from the session, all final code rechecked and then published through GitHub with an expected-head lease. Earlier local commit IDs are not published commits.
- Final clean `npm ci`: succeeded, 72 packages installed after retiring Jest dependencies.
- `npm test` / `npm run test:engine`: **22 passed, 0 failed**. Three single romances; triad; two missed triad appointments recovered; friendship; poor preparation; declined triad → agreed single; late refusal; real deadlines; knowledge order; all required evidence; save boundary/resume; ending order; retired-reference exclusion.
- Triad budget: **18 relationship slots**; with two recovered appointments and both optional preparations, **20 optional slots**, within 32. Minimum energy remains above zero in tested schedules. T7 occurs in week 14; T8 in week 16 and costs one slot.
- `npm run typecheck`: passed. `npm run build`: passed, 42 transformed modules. Missing final art is not treated as a successful art check.
- `tools/verify-ui.cjs`: actual production-build browser paths passed. 1440px desktop, 390px and 320px mobile at 130% text; real save/resume; touch runner + offscreen items; full 16-week friendship and triad paths; aftermath before closure; no horizontal overflow; no page errors. Desktop/mobile portrait and ending screenshots were opened and visually inspected. The script is reusable with Playwright/Chromium; browser binaries are not project dependencies.
- Initial Chromium download failed with a truncated archive. Browser review subsequently ran with an alternate locally installed Chromium package. The failed attempt is not counted as a passed review.
- For implementation commit 37f6458: [Tests](https://github.com/zodnosferato-code/ligetvar/actions/runs/39142460667) **success**, [GitHub Pages deployment](https://github.com/zodnosferato-code/ligetvar/actions/runs/39142460722) **success**. On 19 October 2026, [Tests](https://github.com/zodnosferato-code/ligetvar/actions/runs/39251045132) and [GitHub Pages deployment](https://github.com/zodnosferato-code/ligetvar/actions/runs/39251045245) both succeeded for art-reset commit `fa212f7`. That commit archives all prior character images, prompts and visual locks, and the runtime portrait resolver now returns placeholders. The eight existing backgrounds remain active and were not modified. Legacy numbered design documents and retired intimate reference images were also moved into archives.

## Remaining work

1. Build and approve a combined style sample from the current brief: highly detailed non-pixel anime with crisp cel shading; redraw characters while retaining their key identifiers; preserve the backgrounds' gothic mood with subtle modern college cues; frame backgrounds from the seated player's point of view with a clear natural seat opposite. Confirm the exact per-character identifiers in the sample, then create new production reference sheets and the remaining non-explicit runtime assets. All character portraits currently use placeholders; existing backgrounds remain transitional and active. Explicit illustrations are optional and excluded from required completion gates.
2. Repeat desktop/mobile visual review after new artwork is approved, including character identity and expressions, assistant continuity, background seating/framing, and lighting variants. Current review validates layout, not final art identity/style.
3. The Hungarian story has a playable 16-week skeleton, not a completed narrative production pass. The pre-expansion baseline had 45 scenes and 270 text nodes; stages 2–6 still share a compact template. The follow-up below expands the opening and contextual conversations, but later relationship and shared scenes still need character-specific writing. The user approved TypeScript content modules and the stronger temperament direction on 19 October 2026. Provisional Soma/magic details are not previously approved canon. Technical reachability does not establish narrative richness.
4. Keep F3/F4 and the overall release gate open until final art acceptance and final release review are complete.

## Narrative follow-up — 19 October 2026

The user requires story content and story-specific rules to remain outside the generic engine, reserves implementation decisions, and requests clearly distinct temperaments for the three women. The archive commit did not itself approve a new direction. The user subsequently approved TypeScript content modules and the proposed stronger characterization; see the implementation follow-up below.

Moved nine legacy dialogue JSON files and four localization JSON files into `docs/archive/legacy-narrative/` unchanged. Verified SHA-256 equality for all 13 moves and found no consumers in `src`, `tools`, `.github` or Vite configuration. See the archive inventory. Runtime content and save behavior are unchanged.

Verification for this archive change: `npm test` ran on 19 October 2026: 22 passed, 0 failed. No new UI or narrative behavior was introduced.

## Content/engine separation and opening expansion — 19 October 2026

User-approved direction: separate TypeScript story modules; generic engine; Rebeka provocative/proud/sarcastic, Boglárka observant/quiet/dryly funny, Gréta direct/practical/energetic. Further implementation directions remain the user's decisions. The [character voice reference](CHARACTER-VOICES.md) records these contrasts and actual writing coverage.

- `engine/{types,logic,save}.ts` no longer contains cast/route names, specific milestone IDs, campaign duration, confrontation/institution logic, narrative messages, gifts/job definitions or fixed save keys. `content/rules.ts` supplies campaign policy through `RuntimeRules`; `content/runtime.ts` composes it with the engine. Story types, save bindings and epilogues also live in content. A separate three-week campaign test exercises the same engine with unrelated identifiers and a different ending condition.
- Split the original catalog into shared, individual relationship, triad, optional, knowledge and authoring modules; `catalog.ts` remains the sole assembled registry. No old JSON loader was restored.
- Expanded shared weeks 1–3 and each woman's first relationship scene, preserving original node IDs and original choice effects. Added separate multi-line branches, including an explicit short exit after declining a personal meeting.
- Replaced the status-only coffee action with nine authored contextual conversations, one per woman in each of three periods. Mid-semester callbacks require a witnessed earlier topic and cannot be invoked by a hidden choice ID. Coffee consumes one slot and no romance milestone/bond points.
- Current registry: **54 scenes, 537 text nodes across all branches, 39 choices with explicit next-node targets**. These include mutually exclusive branches and are not a playthrough length estimate. The six expanded scenes contain 25–30 total graph nodes each. Later relationship stages 2–6 and most shared weeks 4–16 are still compact; the entire story is not rewritten.
- Existing v2 save key/schema retained. Core generic validation delegates campaign extension checks to content; new branch cursors save/resume and original `line_*` IDs still exist. Original v1 policy is unchanged.

Verification: clean `npm ci` succeeded (72 packages); `npm test`: **30 passed, 0 failed**; `npm run typecheck` passed; `npm run build` passed (55 modules). Added all-opening-branch traversal with save/resume at each node, coffee/conditional callback/refusal checks, unrelated campaign tests, and a real pre-extraction v2 save fixture with a pending decision. Production browser verification passed desktop, 390/320px at 130% text, real save/resume inside a coffee branch, witnessed week-8 callback, runner, full friendship/triad paths, ending order, no overflow and no page errors. Desktop callback and 320px dialogue screenshots were opened and inspected. Final art gates remain open.

## Venice candidate production — 19 October 2026

The user selected WAI Illustrious + FireRed. The 37-output inventory consists of 32 runtime images and five production references. A live model inventory confirmed the earlier GPT model IDs were unavailable. The first WAI portrait was rejected (chibi reference sheet) and preserved outside runtime. A tagged WAI portrait and FireRed classroom were then generated and refined, with per-version source hashes and files retained.

Actual result: **two candidate images, not a completed art set**. Opaque high-neck clothing, correct-side plum streak and removal of the blocking foreground chair were visually checked; a duplicated beauty mark, head margin and portrait alpha still need final cleanup/acceptance. The assistant and supporting cast designs remain proposals. The first additional neutral portrait request failed with HTTP 402; see ART-REGISTER.md. A separate alpha request failed with HTTP 403. No payment, spending-limit change or automatic paid retry was performed.

The generation catalog has three actual local tests covering runtime actor/location/expression coverage, dependency references, pilot scope and all 37 prompts against the live WAI/FireRed model constraints. All three passed; syntax checks passed. The GitHub 30-test suite and Pages deployment for the latest production-request code succeeded. The art-generation run failed on the provider's HTTP 402, which is not a successful generation or release gate.

## Castle romance UI restoration — 20 October 2026

User direction: restore the medieval castle romance atmosphere and icons; narration must not appear as a character named Ligetvár.

- Restored warm parchment, dark wood/plum and brass colors, serif dialogue typography, decorative borders and arched portrait frames. The title screen uses the existing castle courtyard background.
- Reused the existing book, heart, energy, money, chair, bottle, door, insight and shelf icons for status, activities, navigation and journal controls. Icons are decorative alongside text labels. Sound uses a speaker symbol. No archived character artwork or generated candidates were activated.
- Narration has no portrait or character nameplate. It displays the scene title and prose over the background; named speakers keep their portrait layout. The internal `narrator` identifier and save cursors remain unchanged.
- Existing engine/content tests: 30 passed; TypeScript and production build passed. The first browser pass completed friendship and triad routes, save/resume, contextual callbacks and the runner. Extended title-screen checks then caught a 320px/130% title overflow; responsive type sizing fixed it.
- Final extended browser verification passed: castle title and production icon resolution; narration without a character portrait; 1440px desktop and 390px/320px mobile at 130% text; real save/resume; runner; full friendship and triad routes; aftermath ordering; conditional coffee callback; no overflow or page errors. Opened and inspected the resulting desktop title/narration/dialogue and 320px title/dialogue screenshots. Final artwork and overall release gates remain open.

## Activity recognition — 20 October 2026

User direction: activities must be distinguishable at a glance while keeping the castle romance styling.

- Each activity now has a large emblem, category label, distinct accent/surface and purpose/time information. Shared story is gold, personal meetings rose, preparation blue, coffee amber, rest moss green, recycling teal and office work violet. Emblem shapes and labels distinguish them without relying only on color.
- Coffee uses a cup symbol; rest, recycling and office work are full activity cards with a short explanation rather than similar small buttons. Scene titles and scheduling actions are preserved.
- `npm test`: 30 passed. Typecheck and production build passed. Browser activity screenshots were opened at desktop and 320px/130% text; cards retain their labels and do not overflow.
- Extended browser verification passed category-card distinctions, week-13 preparation, desktop and 390px/320px at 130% text, save/resume, runner, full friendship/triad paths and contextual callbacks, with no overflow or page errors.

## Mobile scenery visibility — 20 October 2026

User direction: the mobile dialogue box obscured almost the entire background.

- Mobile scenes now reserve a separate, unobstructed background view above the parchment dialogue; the image no longer stretches behind the full text panel. The scenery area is 30% of the small viewport height, bounded to 180–280px. Desktop keeps its existing composition.
- Reduced the mobile portrait/header height. Long passages scroll in a keyboard-focusable reading region, with a visible scroll cue when text overflows. Choices stay outside that region. Enlarged text remains supported. Each new line resets text scrolling and keeps the scene in view; focusing the heading no longer jumps past the background.
- 30 engine/content tests, TypeScript and build passed. Extended browser verification passed scenery height/non-overlap, scrollable enlarged passages, save/resume, full friendship/triad routes, runner and callbacks, with no horizontal overflow or page errors. The final scroll-cue revision was checked with the focused desktop/mobile dialogue verification.

## Partner portrait overlay and player viewpoint — 20 October 2026

User direction: layer the person being spoken to over the scene background; the player does not need a picture.

- NPC portraits now live inside the scenery layer, separate from the parchment dialogue. Desktop places them to the left of the text; mobile anchors them inside the upper background view. Approved transparent images will be shown proportionally with `object-fit: contain`, without a frame or opaque portrait panel. Current missing NPC art uses a small labelled placeholder, not an archived or unapproved image.
- Player/Márton lines and narration render no portrait, monogram, empty frame or image placeholder. Player speech keeps its text name. Mobile headings no longer reserve portrait space inside the dialogue panel. No save data or narrative behavior changed.
- This layout rule is recorded in AGENT.md, ENGINE.md and the redesign plan's dialogue-composition section.
- `npm test`: 30 passed; TypeScript and build passed. Opened desktop NPC, 320px NPC overlay and player-reply screenshots. Browser checks cover the overlay staying inside the scenery, absence of a player portrait, enlarged mobile text, background visibility and save/resume.
- Full browser verification also passed friendship/triad playthroughs, runner, conditional callbacks and ending order, with no overflow or page errors.

## Stable dialogue controls — 20 October 2026

User direction: keep dialogue buttons in one place so advancing does not require aiming again as text length changes.

- Reserved consistent heading, scrollable text and scroll-hint rows before the controls. Narrator, partner and player lines use the same panel column and geometry. A hidden/empty scroll hint keeps its row, so appearing or disappearing hints cannot move buttons.
- The first control row stays anchored; extra answer buttons grow below it. Long passages scroll within their reading area at all viewport sizes. No story, save or scheduling changes.
- 30 tests, TypeScript and production build passed. Browser coordinate checks traversed 23 opening dialogue steps on 1440px desktop, 390px mobile and 320px/130% text. Screenshots were opened for visual review.

## Office and personal-room object menus — 20 October 2026

Approved user decisions: everyday planning uses an office and personal room; clickable objects have no permanent markers and an explicit reveal-hints button; the phone arranges in-person meetings.

- Replaced the permanent planner action list with the existing uncropped office/personal-room backgrounds. The desk/book opens shared story and preparation, phone opens available personal meetings and coffee, notebook/books open journal and direction, chair opens rest, shelves open gifts and bag opens optional work. Door and room navigation switch rooms freely.
- Object panels appear only on selection. Hints are off by default. Keyboard focus reveals labels and focus outlines, Enter activates the object, and closing a panel restores focus. Percentage coordinates remain aligned with the complete image; at mobile size each target is at least 44px and targets do not overlap.
- Room choice persists across scene transitions as UI state, not save data. Opening objects, toggling hints and switching rooms do not mutate game state or consume slots. Existing mandatory-story, scene prerequisites, gifts, jobs, saves and route decisions are preserved. Phone selection starts the existing in-person scene at its declared location; no phone-dialogue or future-invitation mechanic was introduced.
- Extracted shared icons/cards and journal components so the planner can open their contextual panels without duplicating story logic. Documented controls in README, AGENT, ENGINE and the redesign plan.
- 30 engine/content tests, TypeScript and production build passed. Full browser verification passed both rooms at desktop, 390px and 320px/130% text, hidden/revealed hints, phone/preparation/rest/work/gift/journal access, non-overlapping touch targets and unchanged game state after browsing. Full 16-week friendship/triad paths, save/resume, runner and conditional callbacks passed with no horizontal overflow or page errors. Desktop room and mobile hints screenshots were opened and inspected.
- Final focused room checks also passed actual Tab/Enter navigation, focus restoration after closing panels, both doors and zero-cost browsing after the final UI revision.

## Permanent interaction cues — 21 October 2026

User direction replaces hidden-by-default hints: users must always see which objects are interactive.

- Every room hotspot, including doors, has a permanent brass outline and visible action label. Removed the hint toggle and its state so cues cannot disappear after navigation or reload.
- Added explicit per-room `fallbacks` metadata for actions without a fitting painted object. The personal room's workshop uses a visible labelled icon button; its actual open book now opens the journal. Ordinary painted objects keep clear outlines without extra icon badges covering them.
- Adjusted mobile label placement to prevent overlapping hints. Updated README, AGENT, ENGINE and the design canon to the new visibility rule.
- `npm ci`, all 30 engine/content tests, TypeScript and production build passed. Focused browser checks passed both rooms at 1440px, 390px and 320px with 130% mobile text: permanent cues without hover, missing-object icon, non-overlapping labels and 44px touch targets, keyboard/door navigation, focus restoration, action panels, unchanged game state after browsing and no horizontal overflow or page errors. Opened and inspected both mobile-room screenshots.

## Bedroom night hub and destination doors — 21 October 2026

User direction: the bedroom serves as the night activity hub, and the door is for leaving for a destination.

- The office is labelled as the daytime planner; the bedroom as the night hub. Bedroom objects offer in-person meeting arrangements, rest, journal and gifts. Workshop/preparation and work controls remain in the office instead of appearing as bedroom hotspots.
- Doors now open “Hová indulsz?” destination panels rather than directly toggling rooms. Office and bedroom planning hubs are always reachable; other destinations come only from currently available scene locations. Selecting a destination offers its actual eligible scenes. Opening destinations or entering a planning hub does not consume a slot or change resources; finishing a scene/activity uses the existing budget.
- These are room roles, not a newly invented hour/day simulation or forced mapping of weekly slots to night. Save format, the guaranteed shared scene plus two optional slots, original scene prerequisites and authored lighting remain unchanged. Rest feedback is now time-neutral.
- Updated README, AGENT, ENGINE and the redesign plan. All 30 engine/content tests, typecheck and build passed. Focused browser checks passed office/bedroom roles, door destinations, starting a shared scene through travel, free browsing, persistent outlines/labels, non-overlapping mobile touch targets, keyboard navigation and focus restoration. Opened mobile bedroom and travel screenshots for visual review.
- Full 16-week friendship/triad browser paths, runner, save/resume and conditional callbacks also passed with no overflow or page errors. Final destination-focus checks passed after making the selected destination and its actions scroll into view.

## Fixed day/night activities — 21 October 2026

Review found that day/night only labelled freely interchangeable rooms: it did not constrain actions or advance time, and opening a room could expose the same activities at any point. The user explicitly selected **fixed day/night slots** rather than a daily simulation or purely thematic room roles. This supersedes the cosmetic timing statements in the previous entry.

- Retained the 16-week budget: guaranteed shared scene → one daytime activity → one nighttime activity → recap. Completion advances one slot; dialogue continuation, menu/destination browsing, journal, gifts and cancelling work do not advance it. The office/bedroom hub derives from the saved slot and restores correctly on reload; removed free hub switching.
- Campaign-supplied schedule data gates new scene/activity admission in the reusable engine. MOHU, paperwork and both preparation scenes are daytime-only. T7/T8 are nighttime-only; other personal meetings and contextual conversations support both periods, preserving catch-up capacity. Rest uses the daytime slot, sleep the nighttime slot, with the existing capped +32 recovery. No mandatory job or fatigue gate was introduced.
- Added a visible four-step weekly rhythm, completion/next-period information on activity cards and a daytime preview of eligible night-only evenings. Destination doors offer the current hub and places with currently playable scenes. Permanent outlined objects, readable hints and keyboard focus remain.
- Flexible meetings use day/evening lighting according to the slot, and T7/T8 explicitly use evening lighting. Neutralized affected optional-scene afternoon/sunlight wording. Existing backgrounds are reused with CSS lighting; no new art was generated.
- Adjusted the demanding route schedule: week 12 backup by day and T6 by night; week 14 signals by day and T7 by night; week 16 T8 by night. The two preparation scenes now require separate weeks. The 18-scene triad route, 20-scene recovery/preparation route and all three single routes still complete; relationship affirmations and deadlines are unchanged.
- Kept v2 save representation and v1 preservation. Existing in-progress scenes/jobs are allowed to finish even if their admission predates the new period restriction. New starts use the new rules. No retroactive save rejection or forced restart.
- Verification: `npm ci`; `npm test` **34 passed, 0 failed**; `npm run typecheck`; `npm run build`; `git diff --check`. Updated `tools/verify-ui.cjs` and ran its full production-browser verification using the available Playwright/Chromium environment. It covers desktop 1440px, mobile 390px/320px at 130% text, real night-hub reload, evening scene lighting, free browsing and job cancellation, permanent non-overlapping 44px targets/labels, runner, save/resume, complete friendship and supported triad routes, nighttime aftermath before closure and contextual callbacks. No horizontal overflow or page errors. Opened and inspected desktop office and 320px bedroom screenshots; shortened the mobile guidance afterward and reran browser verification.
- Updated README, AGENT, ENGINE and the authoritative redesign plan, including its daytime/nighttime budget table. Final character art and later-scene writing remain the previously documented open work.


## First reviewed runtime art batch — 21 October 2026

Reviewed the active character voices, written identity briefs, scene speakers and 32-runtime-image production inventory. Resumed Venice as two one-image requests: Boglárka then Gréta; both generation Actions succeeded. Corrected and extracted three portrait cutouts with built-in imagegen, preserving the original Venice sources. Rebeka has one viewer-right beauty mark, Boglárka's braid is viewer-left, and Gréta no longer inherits Rebeka's marks. Full-resolution masters, source hashes, cleanup summaries and export hashes are recorded separately from public assets.

Registered Rebeka/Boglárka/Gréta neutral portraits and the existing reviewed anime classroom. Neutral is the fallback for unproduced expressions; other NPCs retain labelled placeholders, while Márton and narration have no portrait. The approved hub backgrounds and their hotspot coordinates are preserved. Only lightweight WebP exports enter public runtime paths. `reviewed` describes assistant inspection and integration, not final user approval of the complete visual style.

Verification: `npm ci`; 34 engine/content tests passed; typecheck and production build passed. Focused production-browser checks traversed 23 opening lines at 1440px, 390px and 320px/130% text, decoded all three 640×800 portraits, checked absence of player/narrator portraits, stable controls, no horizontal overflow and no page errors. Opened desktop Gréta, mobile Rebeka and mobile Boglárka screenshots and inspected alpha/background composition. Remaining: twelve main-character expressions, six supporting/transformed portraits, ten backgrounds/lighting variants and five reference sheets. Full art/release acceptance remains open. GitHub integration checks are recorded after publication.

## 22 October 2026 — ChatGPT art replacement batch

User reports exhausted Venice credits and requests gradual ChatGPT generation. Reviewed all ten preserved Venice candidates and the recovered Rebeka amused image. Five location candidates contain unwanted people; Holdkör also fails bust/camera constraints. Built-in imagegen individually repaired library, courtyard and Békás-tó; inspected all outputs before promoting 1280×720 WebP exports. Reviewed recovered Rebeka amused against the cleaned neutral master and promoted its 640×800 alpha WebP. Existing office/bedroom hotspot backgrounds remain intact. Prompts, source/export hashes and next-image checkpoint: CHATGPT-PRODUCTION.md and assets/generated/chatgpt/manifest.json. Eight of 32 runtime images are integrated; 24 and five reference sheets remain pending, plus final user approval.

Validation actually run: `npm ci`; `npm test` (34/34); `npm run typecheck`; `npm run build`. Existing `tools/verify-ui.cjs` with `UI_CONTROLS_ONLY=1` passed at 1440px, 390px and 320px/130% text (23 opening lines each; stable choices). Additional Playwright visual fixtures loaded all three replacement locations and Rebeka amused at 1440px and 390px without overflow or browser errors; screenshots inspected for library mobile and amused desktop. Fixture scenes were injected for visual inspection, not claimed as complete story playthroughs. No Venice calls or paid retries. GitHub Actions results are checked after push.

## 22 October 2026 — second ChatGPT art batch

Following the user's “Folytasd”, generated and visually inspected Holdkör repair, service chamber and Rebeka displeased individually with built-in imagegen. Holdkör removes human busts and the obstructing foreground bench. The new maintenance chamber matches story details: service trench, exactly three anchor fittings, utility cables/pipes and open service-stair exit. Rebeka displeased preserves identity, outfit, scale, side-specific hair/beauty mark and genuine alpha. Full prompts, source/output hashes and runtime paths are in assets/generated/chatgpt/manifest.json. Coverage is now 11/32 runtime images; 21 plus five reference sheets remain open.

Actually ran `npm test` (34/34), `npm run typecheck`, `npm run build`, `git diff --check`. Playwright visual fixtures rendered Holdkör, chamber discovery/finale and Rebeka displeased at 1440px/390px: no failed resources, horizontal overflow or browser errors. Inspected desktop chamber and mobile Holdkör/chamber/Rebeka screenshots. Both authored chamber scenes use their existing daytime setting; no dedicated chamber-night artwork is claimed. Office/bedroom hotspot backgrounds remain unchanged.

Verified previous commit ed72ccd: GitHub Tests 39785805351 and Pages 39785805963 both successful. Second-batch Actions results checked after publishing. No Venice API calls or paid retries.

## 22 October 2026 — ChatGPT lighting batch

- Added classroom dusk, courtyard night and library evening as individual built-in imagegen edits from reviewed masters. Visually compared architecture, furniture, empty seating and lighting. Full prompts and SHA-256 provenance are in `assets/generated/chatgpt/`; 1280×720 WebP exports enter runtime.
- `backgroundFor` selects by effective scene lighting, including flexible night-slot conversations; courtyard evening/night share the night image. Dedicated variants bypass duplicate CSS background tint. Day assets, planning hotspots, engine and saves are unchanged.
- Art coverage: 14/32 runtime requirements reviewed/integrated; 18 pending (ten expressions, six supporting-cast/transformation portraits, two planning backgrounds), plus five reference sheets. Final user style acceptance remains open. No Venice calls or paid retries.
- Executed `npm ci`, `npm test` (35 passed, 0 failed), `npm run typecheck`, `npm run build`, and `git diff --check` successfully.
- Executed `tools/verify-ui.cjs` with `UI_CONTROLS_ONLY=1` using Playwright and Chromium: stable controls across all 23 opening lines at 1440px, 390px and 320px/130% text. A temporary focused browser check loaded real saved night-slot scenes `rebeka_1`, `coffee_rebeka_early` and `boglarka_1` at 1440px and 390px; all three variants loaded, with no horizontal overflow, page errors or duplicate mobile tint. Inspected resulting desktop/mobile screenshots.
- Browser setup: Playwright's standard browser download returned a truncated archive; a temporary npm-distributed Chromium supplied the successful checks. No browser dependency was added to the project.

## 22 October 2026 — night travel fix and accelerated expression batch

- Reproduced the coverage gap: Békás-tó and department night meetings still used sunny base images with CSS tint. Generated real night variants; preserved existing composition, empty seats and office objects. Free scenes in the saved night slot now use `night`; shared story scenes keep their authored time. Evening/night variants may substitute for each other; day lookup is unchanged. All seven reachable night destinations resolve to late-day/night art, and already-night apartment/Holdkör no longer receive an extra background tint. Corrected the misleading daytime-office destination label at night.
- Following the user's updated workflow, generated ten independent main-woman expression edits concurrently from cleaned neutral masters, then inspected the completed batch. All five expressions for each main woman now have distinct exports. Compared all fifteen portraits on a neutral-grey sheet for identity, expression and crop; checked true alpha extrema 0/255 for each new master; exported 640×800 WebP with alpha.
- New night backgrounds: lake 1280×720 WebP; department 1168×784 WebP to preserve the original aspect ratio. The office night variant retains the transitional source style and does not count as the planned anime planner restyle. Runtime totals: 24/32 original requirements plus two additional night variants. Eight original images and five reference sheets remain; final user acceptance open. No Venice requests.
- Executed `npm test`: 36 passed, 0 failed. The new regression walks a complete triad campaign and checks every available night destination for night lighting and baked late-day artwork, covering all seven locations. `npm run typecheck`, `npm run build` and `git diff --check` succeeded after fixing test-fixture slot typing.
- Executed `tools/verify-ui.cjs` with `UI_CONTROLS_ONLY=1`: stable controls across 23 opening lines at desktop 1440px, mobile 390px and 320px/130% text. Temporary Playwright night-travel check followed actual home hub → door → destination → scene for office, lake, classroom and library at 1440px and 390px; correct image, unchanged saved night slot, no horizontal overflow/page errors, no duplicate mobile tint. Inspected office desktop and lake mobile screenshots. Browser test initially selected Gréta's week-2 meeting in week 1; corrected the fixture to week 2 and all eight cases passed.
- All full prompts, source/master/export hashes and review states are in `assets/generated/chatgpt/{prompts,manifest}.json`. No unreviewed generated expression was used as an identity source.

## Full-body reference sheets — 22 October 2026

Added three 1536×1024 clothed identity sheets (Rebeka, Boglárka, Gréta), each derived directly from its cleaned neutral portrait. Visually reviewed face identity, characteristic marks/accessories, clothing, full-body framing and visible shoes. Footwear and newly specified garment details remain proposals. No runtime code or active asset selection changed.

Validation: all three PNGs decoded successfully; manifest source/master SHA-256 hashes and dimensions matched local files; git diff --check passed. Runtime tests were not rerun for these non-runtime reference/doc additions. Upload and Actions status are reported in the delivery message.

## Incremental swimsuit delivery — 22 October 2026

Three full-body swimwear costume references saved in assets/generated/chatgpt/swimwear with exact prompts, source references and output hashes. Costume-only references, not active runtime portraits: generated alpha retains a soft surrounding halo, so clean-sprite acceptance remains open. No local tests, typecheck or build run, per explicit user instruction. Upload in small commits and check GitHub Actions after each batch.


## Architecture reference — 22 October 2026

Generated one three-panel reference sheet from the reviewed classroom, courtyard and service-chamber backgrounds. Visually inspected that it contains only environment studies and preserves the project’s Gothic stone/ivy/utility-pipe language. The generated image is saved at `assets/generated/chatgpt/references/architecture-v1.webp`; prompt, source hashes, output hash and dimensions are recorded in the ChatGPT manifest. It is a non-runtime reference, so no game asset manifest changed. Soma's sheet and the final user art approval remain open. No tests or build were run for this non-runtime reference; GitHub Actions are checked after upload.


## Apartment night-hub restyle — 22 October 2026

Generated a detailed anime bedroom from the existing room image, preserving its Gothic window, bed, stone walls and night lighting. Visually checked the door, wall phone, open journal, armchair and shelf against their visible hotspot rectangles; moved only the phone hotspot vertically to align with the illustrated phone. The runtime export is `assets/backgrounds/apartment-anime-v1.webp` at 1168×784; the full-resolution WebP master, exact prompt, source/output hashes and review status are recorded in the ChatGPT manifest. Updated the bedroom art selection and hotspot coordinate. No local tests/build were run; GitHub Actions are checked after upload.


## Department office restyle — 22 October 2026

Generated and refined the anime daytime planning office from the existing image. The final image has no people and exactly one rotary phone; the open journal sits beside it. Visually checked door, desk, phone, journal, chair, shelf and satchel overlays against the existing coordinates. Runtime image: `assets/backgrounds/department-anime-v1.webp` (1168×784). The full-size WebP master, generation and refinement prompts, source/output hashes and review are recorded in the ChatGPT manifest. Existing hotspot coordinates required no change. No local tests/build were run; GitHub Actions are checked after upload.


## Soma semleges portréjának javaslata — 22 October 2026

Generated one adult-human portrait using Dénes only as a style/framing reference. The candidate has transparent alpha and is uploaded to `assets/generated/chatgpt/supporting/soma-neutral-v1.webp`, outside runtime assets. The prompt, source and output hashes, dimensions and candidate status are in the ChatGPT manifest and `supporting/soma-neutral.json`. Its appearance is explicitly not canon; wait for Miki's approval before creating the transformed identity variant or Soma reference sheet. No local tests/build were run; Actions are checked after upload.


## Áron semleges portréjának javaslata — 22 October 2026

Generated one adult faculty-administrator portrait using Dénes only as a style/framing reference. The candidate has transparent alpha and is uploaded at `assets/generated/chatgpt/supporting/aron-neutral-v1.webp`, outside runtime assets. Prompt, source/output hashes, dimensions and review status are recorded in the ChatGPT manifest and `supporting/aron-neutral.json`. This is a proposal pending user review, not canon. No local tests/build were run; GitHub Actions are checked after upload.


## Lilla semleges portréjának javaslata — 22 October 2026

Generated one adult student/witness portrait using Rebeka only as a rendering-style and framing reference. The candidate has transparent alpha and is uploaded at `assets/generated/chatgpt/supporting/lilla-neutral-v1.webp`, outside runtime assets. Prompt, source/output hashes, dimensions and status are in the ChatGPT manifest and `supporting/lilla-neutral.json`. Its appearance is a proposal pending user review, not canon. No local tests/build were run; GitHub Actions are checked after upload.


## Soma semleges portréjának frissített javaslata — 22 October 2026

Updated the portrait to follow the user's direction: an ordinary, less conventionally handsome adult Hungarian man with short black hair, a thick moustache and a slightly stocky build. The new transparent candidate is `assets/generated/chatgpt/supporting/soma-neutral-v2.webp`; the former v1 proposal is superseded. It remains outside runtime assets pending visual review. The prompt, source/output hashes and dimensions are recorded in the ChatGPT manifest and `supporting/soma-neutral-v2.json`. No local tests/build were run; GitHub Actions are checked after upload.

## Soma átváltozott portréjának javaslata — 22 October 2026

Generated the transformed form as a small identity-preserving change to the updated neutral portrait: slightly leaner, with vampire fangs and glowing red eyes, while retaining his black hair, moustache, face and clothing. The transparent candidate is `assets/generated/chatgpt/supporting/soma-transformed-v1.webp`, outside runtime assets. Prompt, source/output hashes, dimensions and review status are recorded in the ChatGPT manifest and `supporting/soma-transformed.json`. No local tests/build were run; GitHub Actions are checked after upload.