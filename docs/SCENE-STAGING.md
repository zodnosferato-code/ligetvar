# Scene staging and relationship pacing

> **Status:** First implementation in 0.4.0. | **Purpose:** Authoring contract and progress for the five scene improvements requested on 25 October 2026.

## Implemented

A `Scene` may declare named `stages`. Each stage explicitly specifies a label, location/background, present participants and proximity (`apart`, `beside`, `close`), plus an optional lighting override. A dialogue `Line.stage` selects it. A line without a stage uses the scene defaults: it does not inherit the previously visited node. Set the stage on every node in a staged section, including narration and branch merges. Stage participants must be a subset of the scene's cast; speaking NPCs must be present. Validation rejects missing/unused stages, unknown backgrounds, absent speakers and invalid proximity/lighting.

`sceneStage` and `sceneLighting` resolve presentation for both browser and CLI. Stage transitions cost no extra slot, money or energy; completion retains the existing single activity cost. The saved scene/line cursor determines the stage after reload. Portrait framing increases within the scenery for beside/close; it never overlays the dialogue panel. These are existing clothed portraits, not newly drawn kissing/embracing poses. Narration and player speech still have no portrait.

A choice's `localRequires` lists decision IDs selected earlier in the current scene's pending effects. This lets a later line recall hand-holding without prematurely certifying evidence, journal entries or relationship decisions. All IDs must come from that scene; each menu needs an unconditional fallback. `requires` continues to read only completed, witnessed events. Local availability is checked by the shared reducer, including direct CLI commands, and survives saves because pending effects already persist.

## First authored routes

| Date | Optional quieter stop | Return and goodbye |
| --- | --- | --- |
| Rebeka | Lake → empty, darkened Holdkör screening room after the screening | Walk back toward the lake, goodbye at the promenade |
| Boglárka | Courtyard → empty library reading room before closing | Leave before closing, say goodbye in the courtyard |
| Gréta | Lake → sheltered bench in the empty castle courtyard | Return to the lakeside path junction, go home separately |

These use existing reviewed backgrounds. No parking lot, new room image or physical pose asset is claimed. The screening room stays dark indoors without advancing the calendar from day to night and back. Other lighting follows the saved day/night activity slot.

Accepting a quieter stop does not accept touch. Choosing a slow physical pace earlier in the date keeps the later kiss option unavailable, without reducing bond gains or blocking the romance. Other paths can explicitly request a kiss; the partner answers affirmatively before a brief mutual kiss. Conversation and heading home remain available. Physical choices grant no extra bond reward. A hand-holding callback can accompany the walk; the narration explicitly releases hands on arrival. All branches return to a clear goodbye, including declining the original invitation. The six paid outings also now end with packing up, parting and going home rather than stopping mid-activity.

## Progress and remaining work

- [x] Multi-location stages in a single activity, shared browser/CLI rendering and resumable branches.
- [x] First physical framing pass and optional romantic kisses on the three individual dates.
- [x] Explicit endings on all three individual dates and all six paid outings.
- [x] Same-scene choice memory without early global progression.

The remaining work is tracked centrally as **S1–S5** (broader scene coverage, new locations/art, physical staging, ending review and richer callbacks) and **G1–G3** (pacing design, coordinated scheduling and full route/save verification) in the [current design tracker](design/TRACKER.md); detailed acceptance criteria remain in the [implementation roadmap](IMPLEMENTATION-ROADMAP.md#remaining-scene-improvements-and-adjustable-campaign-length). The earlier roadmap-only limitation is superseded for G1–G3 by the user-approved 52-week year; broader S1–S5 writing/art remains unfinished. The tracker and year contract own current status.

Do not treat being alone as proof of romantic consent or turn privacy into a relationship reward. A private apartment visit should fit the established relationship and include an invitation and an equally valid departure branch. Existing bedroom art should not stand in for an invented living room.

## Verification

`npm test` includes exhaustive save/resume traversal of all expanded romantic branches and complete CLI campaign routes. Targeted date cases verify destination changes, local choice rejection, slow paths, neutral departures, equal bond rewards, one-slot completion and restored staging. `tools/verify-date-staging.cjs` runs real UI transitions at 320/390/1440px, image loading, portrait containment, distance framing and reload. It uses the same Playwright/Chromium environment variables as `verify-leisure.cjs`; screenshots go to `/tmp/ligetvar-date-review` by default. Run after `npm run build`.

## Current intimacy presentation

The user's 27 October clarification keeps intimacy as part of relationship development, presented fade to black for now. Follow the [authoring contract](design/GAME-DESIGN.md#relationship-intimacy--27-october-2026) and INT1 acceptance gate. Privacy is not touch consent; off-screen presentation does not remove the invitation, reconsideration or aftermath. This documentation update does not certify or rewrite every existing branch.

## Calendar update — 28 October 2026

The user-approved year supersedes earlier fixed sixteen-week dates. Existing scene IDs and stage graphs are preserved; actual dates come from [YEAR-CAMPAIGN.md](design/YEAR-CAMPAIGN.md). T7/T8 are nighttime in weeks 50/52. Stage movement remains within one activity.
