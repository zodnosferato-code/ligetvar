# Holiday and seasonal event authoring

> **Authorized scope, 28 October 2026:** support holidays such as Halloween and Christmas, seasons, clothing and backgrounds through the engine. Extend the existing 52-week calendar; keep romance-first direction, refusal paths and the mandatory plot independent of optional celebrations.

## Scene specifications

**holiday_halloween — Lanterns and borrowed shadows.** Week containing 31 October (week 5), nighttime Holdkör, player/Rebeka/Boglárka/Gréta. Entry: first workshop completed; no disappearance or vampire evidence required. Paper costumes, lanterns and deliberately unconvincing ghost stories provide ordinary company. Rebeka directs shadows as if making a terrible film; Boglárka enjoys an absurd invented footnote; Gréta discovers her lantern faces the wrong way. Player chooses a story, shadow-making, or an early departure. Each branch gets a concrete response and farewell. No new magic, villain appearance, evidence, required romance progress or implied physical intimacy. Halloween outfits and decorated backgrounds are requested through shared asset selection. Proposed bitmap production remains separate from functioning calendar/content support.

**holiday_christmas — The sentence in the book.** Week containing 25 December (week 13), either discretionary period, library with the same ensemble. Entry: first workshop completed, independent of romances. Warm clothes, tea, an uneven paper star and folded bookmarks make the meeting distinctive. Player reads an intentionally bad verse, helps with tea, or leaves early. Each participant has a small ordinary want; the closing action leaves room for next week's company without commitment. No obligatory gifts, money, investigation revelations, relationship promises or religious participation. Seasonal/holiday clothing and background metadata remain deterministic on resume.

English is canonical; Hungarian translates it with identical stable choices and consequences. Completion costs one normal slot; starting a scene grants nothing. Each holiday scene is once per campaign, expires with its event week, and can be skipped without blocking any ending. A chosen departure finishes that meeting, not the whole year.

## Technical acceptance

Generic calendar conditions are injected into engine rules, not hardcoded holiday names. Scene and choice admission must enforce them even through direct actions. Current and completed saves must agree with calendar conditions at their witnessed week. Calendar UI and CLI expose identical event identity. Holiday outfits and decorated backgrounds take precedence over seasonal art; absent variants fall back to seasonal/base art with honest metadata. Explicit scene clothing remains authoritative. No generated art is claimed by adding an empty variant registration point.

## Implemented in 0.8.0

- Halloween is the week beginning 29 October 2026 (week 5), Christmas the week beginning 24 December (week 13). Each date belongs to one seven-day window; adjacent weeks do not inherit it. `HOLIDAYS` owns date, symbol and outfit; `holidayWeek` derives the meeting window. `calendarFor` returns both a primary `event` and the event list, plus seasonal clothing.
- The generic `Schedule.calendar(week)` callback injects `{season, events}`. Scene and choice `requires.calendar` accepts `seasons` and/or `events`; values within a list are alternatives, the two lists combine with AND, and `anyOf` keeps its ordinary branching semantics. Without injected context, calendar-gated actions fail closed. The core contains no named holidays or seasons.
- Scene entry, direct choice actions, current scene loading, pending effects and completed witnessed dates check calendar conditions. The campaign registry rejects unknown/empty/impossible conditions and holiday-gated mandatory investigation scenes. The required plot remains available even when both parties are skipped.
- `EVENT_BACKGROUNDS[location/event/lighting]` precedes reviewed seasonal weather art, generic seasonal art and existing lighting/base art. Unreviewed variants are not promoted. `OUTFIT_PORTRAITS` resolves explicit scene clothing first, otherwise event clothing then seasonal clothing; missing expressions fall back to the chosen clothing's neutral portrait. Base portraits remain usable, and `missingVariant` identifies the unmet request. Transition backgrounds and map meeting portraits use the same resolvers and scene outfit overrides as dialogue/CLI.
- Calendar icons and holiday names are localized. Code-native warm lighting decorations distinguish holiday atmosphere without claiming new painted backgrounds. Rain/snow overlays apply only outdoors, avoiding snow falling across indoor Christmas dialogue. Planner hotspot geometry is unchanged.
- The catalog now has 70 scenes. Both meetings contain three branches, including leaving early, ordinary character interaction and a clear goodbye. Completion consumes one normal slot and records the selected event choice; it grants no investigation evidence, romance commitment or bond bonus. Branches do not assume the other holiday was played.

## Art production remains open

No holiday or seasonal bitmap was generated in this change. The typed registration points fall back honestly to existing art; requested outfits are not proof of visible costume production. `assets/catalog.json` now contains 558 explicitly unproduced variant briefs, adding 45 Halloween costume/expression entries and 54 Halloween/Christmas location/lighting entries to the previous matrix. Existing exports and their provenance records are preserved. This is a preparation matrix, not a request to generate every combination. Prioritize the three main women's event costumes, the Halloween Holdkör and Christmas library; review identity, framing, location continuity and hotspots before registering any file as reviewed.

## Save policy and verification

Release 0.8.0 retains schema 4/content epoch 6. Calendar conditions and new scenes are additive; prior legitimate year scenes, dates and saved fields are unchanged. Existing epoch-6 saves load; passing a holiday in an older save does not retroactively replay it. An actual 0.7.0 Rebeka ending save was decoded unchanged. Semester epoch-5 saves remain incompatible as before.

Validation: `npm test` passed **115 engine/content and 28 CLI tests (143 total)**, including all holiday branches with both locales and per-node saves, direct-action/date guards, injected generic calendar/choice conditions, reviewed/unreviewed art precedence and the existing full-year routes. Two actual CLI processes join/leave both holidays and reach week-52 friendship endings; an additional triad run includes both holidays. `npm run typecheck`, `npm run build`, `npm run assets:audit` (62 exports, 558 planned variants, zero errors) and ten server-rendered UI checks pass. Interactive browser/mobile layout and bitmap/visual approval remain open; no local Chromium was available.

Reproduce with `node tools/cli-playthrough.mjs --route friendship --holidays --locale en --save NEW_PATH`, or add `--holiday-choice leave`. Use fresh saves; optional `--transcript NEW_PATH` retains the public observations. Existing route examples keep their behavior unless `--holidays` is supplied.

## Spring and summer expansion briefs — 28 October 2026

The current user request authorizes additional seasonal events. These extend the existing holiday system through ordinary optional scenes and engine-owned season requirements, without inventing new annual holidays or changing their dates.

- **seasonal_spring — Something That Might Grow.** Weeks 23–25 (4–18 March), daytime courtyard, player/Rebeka/Boglárka/Gréta; completed first workshop, spring season. Under the covered arcade, plant a small pot of seeds or invent its label; third choice leaves early. Gréta has brought more pots than planned, Rebeka defends an empty pot's artistic merit, Boglárka counters with dry precision. Each activity gets its own result and farewell. No assumed earlier party, romance, known culprit, new magical effect or future attendance promise.
- **seasonal_summer — The Unofficial Championship.** Weeks 37–39 (10–24 June), daytime Békás lakeside, same ensemble; completed first workshop, summer season. A sheltered picnic and absurd stone-skimming rules give Gréta time away from tasks. Choose skimming, the picnic-table game, or early departure. Concrete reciprocal banter and packing up conclude both activity branches. Text works with calendar rain/clear weather by placing the basket under the existing shelter, without claiming an illustrated new stage.

Both are once per year and cost one daytime slot. Neither charges money/points, gives bond bonuses, introduces investigation evidence, gates another scene, assumes the other event was played, or grants commitment. One locally witnessed activity decision is recorded only on completion. Three-week windows offer flexibility around the mandatory plot. Seasonal clothing/background selection uses existing resolvers and honest missing-art fallbacks; no new art is claimed.

## Hungarian folklore gatherings — 29 October 2026

[Refined briefs and sources](HUNGARIAN-WORLD.md) add Luca preparations in actualweek11/day and Szent Iván company in39/night. These use ordinary optional scenes with exact week windows and season requirements; they do not add `HOLIDAYS` identities, event-specific outfits or calendar badges. They appear as available meetings in the existing planner/map/CLI. Battery lantern and grain are narrated props; new painted art remains unproduced.

## Seasonal drinking nights — 30 October 2026

Four ordinary optional scenes add one casual drinking/party night per season. They use the same contract as the existing seasonal and folklore gatherings: `shared_1` required, season gate, three choices (join a small toast, talk with a soft alternative, or leave early), one slot, no bonds/evidence/commitment, bilingual, early-leave complete. Soft drinks and water are always available; no alcohol is forced. Journals do not claim unchosen activities.

- **drinking_autumn — Fröccs Under the Arcade.** Weeks 7–8 (night), courtyard. Mild October evening; white wine, soda and water. Gréta offers ratios or silence; Rebeka treats the choice as optional. Branches: small toast with eye contact, water and conversation, or early goodbye.
- **drinking_winter — A Small Glass in the Library.** Week 15 (day or night), library alcove. Plum pálinka and tea. Boglárka mentions fogópálinka as the glass for people about to work; the conversation stays on the table afterwards, not the slaughter. Branches: small toast, tea and memory, or leave the quiet.
- **drinking_spring — Wine After the Walk.** Weeks 26–28 (night), courtyard. After a longer walk than planned. Rebeka brings wine; Gréta has soda. Branches: small glass, soda and the argument about the path, or leave.
- **drinking_summer — Glasses by the Lake.** Weeks 35–37 (night), Békás shelter. Cherries and white wine. Gréta offers both, one or neither. Branches: small glass with cherries, cherries and the view only, or early departure.

Implemented in `src/game/content/drinking.ts` and registered in the catalog. Locales in `drinking.en.ts` / `drinking.hu.ts`. No new art, outfits or HOLIDAYS entries. Existing saves remain compatible; the scenes appear only in their season windows after `shared_1`.
