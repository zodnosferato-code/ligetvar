# Castle year, assets and map — 28 October 2026

The user's year-long castle setting supersedes the semester-only presentation. The current implementation now uses the [52 playable weeks](YEAR-CAMPAIGN.md) from October 2026–September 2027, retaining sixteen mandatory story chapters. The weekly expansion supersedes the initial sixteen chapter-date presentation in this document. Witnessed decisions and ending order remain; deadlines and budgets follow the year contract. Full year-specific narrative writing remains outstanding.

`content/calendar.ts` owns deterministic chapter dates, seasons, weather and Christmas. No browser clock or random weather is persisted; browser and CLI derive the same state. Dates run in UTC to avoid device timezone shifts. The expandable calendar displays all 52 week dates and current progress. Weather is illustrative, not a real-world forecast.

The door opens a spatial castle map. All existing locations are visible, with counts drawn exclusively from available scenes. Selecting a place exposes compact portrait meeting buttons, using that scene's actual participants. Empty places explain that no scene is available. Opening the map and choosing a location costs nothing; meeting completion retains the original slot cost. This pass does not relocate authored meetings or invent character schedules.

## Runtime asset contract

`assets.ts` remains the authoritative typed image registry. `backgroundFor(location, lighting, week)` first requests `SEASONAL_BACKGROUNDS[location/season/weather/lighting]`, then existing lighting/base art. `portraitFor(actor, expression, week, outfit?)` requests scene-specific clothing (when specified in `Scene.outfits`) or Christmas/winter/summer clothing, then existing expression/neutral art. Missing variants return `missingVariant`, shown visibly in dialogue and exposed in CLI observations. Player/narrator never receive portraits. Soma's existing transformation rule remains intact.

`AssetImage` handles absent and failed URLs with a readable patterned placeholder. It retries when its file changes. Portraits, room backgrounds, map faces and existing raster UI icons use it. The dialogue's background image now detects failed URLs too. Existing optional animation handling retains its independent fallback contract. Seasonal tints and static rain/snow decoration are illustrative fallbacks, not generated seasonal backgrounds. No new bitmap art is claimed.

## Folder and provenance contract

- Runtime background variants: `assets/backgrounds/<location>/<season>/<weather>/<lighting>.webp`.
- Runtime clothing: `assets/characters/<actor>/outfits/<outfit>/<expression>.webp`.
- Current approved exports keep existing paths to preserve references. Do not move them just to create empty directories.
- Generation sources, original prompts and provider metadata: `assets/generated/<batch>/`; identity references: `assets/references/`.
- `assets/catalog.json` accompanies every existing runtime export with prompt/provenance fields and every planned variant with a positive and negative production brief. The 459 planned entries are a naming/authoring matrix, not an instruction to generate them all or a claim of completed art.

Legacy original prompts are explicitly unverified; replacement briefs are separate fields, never represented as the prompts originally used. Recover exact prompts and source hashes from production records before promotion. New generations must record actual prompts, negative prompts (including an explicitly empty value when the provider has none), model/provider, reference paths, source/output hashes, dimensions, alpha and review state. Integrate reviewed variants in the typed registry only after checking framing, identity and planner hotspots.

Run `npm run assets:audit` to detect uncatalogued/missing exports and incomplete records. The check verifies coverage, not historical provenance or visual quality. Existing legacy records need provenance recovery; seasonal and outfit bitmaps remain unproduced. New icons in the calendar/map are code-native symbols, so they have no AI generation history.

## Validation

After integration with the 52-week schedule, 130 engine/content/CLI tests pass, including year ordering, seasons, Christmas outfits, missing variants and reviewed overrides. Asset audit: 62 existing exports, 459 planned variants, zero coverage errors. Typecheck and production build must pass before publication. Interactive browser/mobile visual acceptance remains open if no Chromium executable is available.
