# One year at Ligetvár

> **User-approved duration:** 28 October 2026 — “extend the game to 1 year.” **Implemented calendar:** 0.7.0, schema 4/content 6. This supersedes the fixed sixteen-week semester, the week-15/16 ending dates and the requirement for a shared scene every calendar week. Character directions, knowledge rules, ending order and the two discretionary periods remain.

## Scope and limits

The campaign now covers **52 playable weeks**, beginning with the existing October opening and ending a year later. Every week provides one daytime and one nighttime opportunity: **104 discretionary slots**. The existing 16 mandatory story chapters are scheduled across the year; their stable IDs are chapter identities, not week numbers. On the other 36 weeks, the player starts directly in the daytime planner. No filler shared scene, automatic evidence, bond or commitment is awarded.

This is the calendar and engine expansion, not a claim that the year has a finished full-length script. There are still 68 authored scenes. Their dialogue volume, existing editorial findings, partial English coverage and missing new seasonal art remain separate work. Once optional scenes are exhausted, the current player can work or rest; more ordinary interactions and activities are needed to make the added time rich. Do not describe the calendar multiplication as a tripling of written story or measured playtime.

The early opening is contiguous so its tomorrow/next-week arrangements remain coherent. Later gaps create space for optional relationships, outings and future writing. The existing clue order remains; the year places identity corroboration in week 40, the existing confession in 43, confrontation in 51, institutional aftermath and personal follow-ups in 52. Further refinement of the late reveal and the multi-route report's continuity issues remains STORY work.

## Required relationship pacing — 29 October 2026

The [approved relationship structure](GAME-DESIGN.md#relationship-progression-across-the-year--29-october-2026) requires an optional sexual-intimacy opportunity around the midpoint of the 52-week campaign, followed by several later-half exploration meetings and ordinary affectionate time. A first encounter confined to week52 (or one triad encounter in 50) does not satisfy it. The current commitment windows and six-meeting scaffold are implementation limitations to review, not a mandated wait until the ending. Exact per-route weeks/prerequisites remain to be planned; keep 104 discretionary slots, mandatory chapter dates and ending order. Slower/refusal paths must remain feasible and meaningful. This documentation decision adds no scenes or runtime schedule changes; INT2 tracks the missing expansion.


## Authoritative schedule

`src/game/content/calendar.ts` owns total weeks, story dates and milestones. It also supplies 52 UTC presentation dates from 1 October 2026 to the week beginning 23 September 2027, seasons, illustrative weather and Christmas clothing. The existing calendar/map/asset work from commit `945171b1940fc714e114870771a02af10ad6ca41` is preserved and integrated with the playable weeks. No alternate duration selector or legacy 16-week runtime is retained.

| Stable chapter | Calendar week | Existing purpose |
| --- | ---: | --- |
| shared_1 | 1 | First workshop |
| shared_2 | 2 | Lilla's return |
| shared_3 | 3 | Lilla's account |
| shared_4 | 6 | Corrected timeline |
| shared_5 | 10 | Borrowed voice |
| shared_6 | 16 | Pattern and ambition |
| shared_7 | 28 | Incomplete ritual record |
| shared_8 | 32 | Investigation/disclosure plan; relationship-direction intent |
| shared_9 | 40 | Independent identity corroboration |
| shared_10 | 43 | Existing confession and offer |
| shared_11 | 44 | Witnessed limits of fascination |
| shared_12 | 46 | Anchor rule and completion date |
| shared_13 | 48 | Chamber inspection |
| shared_14 | 50 | Intervention plan; final pre-confrontation meeting deadline |
| shared_15 | 51 | Confrontation and vampire death |
| shared_16 | 52 | Institutional aftermath, then two personal slots and ending |

Established personal, triad, preparation, outing and Virág scene windows project their existing chapter coordinates through this table. For example, T7 is nighttime in week 50, T8 nighttime in 52, preparation begins in 46/48 and expires in 50, and personal aftermath is week 52 only. First personal scenes still begin in weeks 1–2. Early coffee is weeks 1–31, middle coffee 32–50, late coffee 51–52, with witnessed shared prerequisites. Earlier personal milestones can be caught up through week 50. A direction remains intent, never another participant's agreement.

## Engine and authoring contract

- `Schedule.storyWeeks` injects mandatory-event dates into the generic engine. If absent, the prior generic contract (one required shared scene each week) remains, as verified by the unrelated three-week campaign. This is generic reuse, not a supported legacy Ligetvár campaign.
- `nextWeek` enters slot 0 only when a mandatory event is due; otherwise it enters slot 1. It still requires both discretionary slots to be spent and blocks if the next required event is missing. Required scenes cannot be replaced by rest or a job.
- Save validation follows the same injected dates: all earlier required scenes must be witnessed; ordinary weeks cannot contain a phantom shared slot; scene cursors, day/night restrictions and pending effects still validate. Browser automatic arrivals apply only to due scenes; CLI keeps explicit event actions.
- The standard `scene()` authoring helper now accepts **actual calendar weeks**, including any week through 52. `chapterScene()` is an explicit adapter for existing chapter-coordinate briefs. New standalone scenes should use `scene()`; never assume a chapter number is a week or apply the projection twice. `shared()` preserves the existing chapter IDs and their dependency chain.
- Add a future mandatory scene by coordinating `calendar.ts`, the typed catalog, plot brief and regression expectations. Optional scenes can use ordinary weeks without changing the generic reducer. New mechanics and locations still require the registrations documented in the expansion audit.
- Public observations expose `totalWeeks` and scheduled story-week numbers, which contain calendar information, not hidden clues or future dialogue. The example CLI agent uses these dates and offered actions rather than manufacturing shared_N for every week.
- The browser progress display uses the configured total. Its weekly rhythm omits the shared step on ordinary weeks; final recap ends the year instead of offering week 53. Audio tension follows the final milestones. UI/save prompts refer to the year in both locales.

The 3,000 Ft weekly allowance is retained: unworked yearly funds total **165,000 Ft** (12,000 initial plus 51 allowances). Gift prices, puzzle rewards, outing costs and one-gift-per-woman-per-week limits are unchanged. Gift-history validation now permits the full 156 possible weekly deliveries instead of a hidden 48-delivery limit. Gifts still cannot create commitment. This larger income/content balance needs further play review as activities grow.

## Save and release policy

0.7.0 uses schema 4 and **content compatibility epoch 6** because completion weeks, deadlines and ending dates changed. Semester-era saves require a new game; they are rejected before state interpretation and never migrated or overwritten by loading. The browser key remains `ligetvar-save`.

## Validation and handoff

- `npm ci` passed. `npm test`: **104 engine/content + 26 CLI tests passed (130 total)**. `npm run typecheck`, `npm run build`, `npm run assets:audit` (62 existing exports, 459 planned variants, zero errors) and the six-check UI markup smoke passed. Local interactive Chromium was unavailable, so no browser/mobile layout acceptance is claimed.
- Six actual JSON-CLI subprocess routes reach week 52: friendship, Rebeka, Boglárka, Gréta, triad and late withdrawal/estranged. Existing branch/save/knowledge/slow-pace tests traverse intervening ordinary weeks through a test-only helper, while dedicated calendar and CLI tests exercise all 52 weeks directly.
- Calendar tests count 104 discretionary slots, 16 mandatory scenes and 36 ordinary weeks; verify exact ending order, ordinary-week and mid-scene save/resume, missing mandatory-event guards, incompatible saves and 156 legitimately funded gift deliveries.
- A combined itinerary earns five job rewards and completes triad, all eight Virág chapters, six outings, both preparations, Gréta's introduction and all nine coffees: **49 discretionary activities**, with the supported confrontation and triad ending. It respects the first Virág meeting's daytime restriction and T7/T8 nighttime restriction. It proves this specific combination fits; it is not proof every arbitrary ordering does.
- New-content regression adds an optional scene in ordinary week 4 and verifies opening, completion and current save validation; another fixture checks actual week-20/27 authoring. The generic engine separately tests sparse required dates in an unrelated campaign.
- `node tools/verify-year-ui.mjs` checks server-rendered English/Hungarian progress and three/four-step weekly rhythms, final-year recap and epilogue. This verifies markup, not interactive layout, transitions, touch or mobile rendering. No installed local Chromium was available for browser review.

Next narrative work should fill ordinary weeks deliberately under the master plot and refined character/scene briefs. Preserve first-person name handling, English-first authoring with Hungarian translation, distinct voices, mutually chosen fade-to-black intimacy and the existing refusal/knowledge constraints. New places and activity mechanics are not claimed shipped by this calendar change.
