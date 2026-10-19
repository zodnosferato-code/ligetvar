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

The separate university assistant is **Végh Soma**, provisionally 32, responsible for archive access/equipment. He deliberately transforms between weeks 1 and 2, seeking recognition and desirability. The plan's proposed grounding, vitality-drain, borrowed-voice and vulnerable-anchor rules are used. The fatal ritual collapse is low-gore and established before the confrontation. No final appearance is invented or approved; his human/transformed art remains a labelled placeholder. Women-only T3/T4 use an explicitly introduced viewpoint interlude; Márton is absent and does not choose their attraction for them.

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
