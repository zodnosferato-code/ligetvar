# Interface visibility review — 29 October 2026

> **Status:** Active review and presentation contract. Implementation status belongs in [TRACKER.md](TRACKER.md).

## Direction

The user requests a distinctive, illustrated, animated gothic interface that stays readable and compact. This refines the 28 October decluttering direction: essential resources and available opportunities must not disappear into secondary menus. Keep the castle artwork, warm brass borders, plum surfaces, parchment dialogue and existing illustrated icons. Do not introduce dashboard panels or continuously moving decorations.

## Findings and response

Review baseline: `835ae33`, `GameApp.tsx`, `RoomPlanner.tsx`, `stage.css`, `CastleMap.tsx`, `calendar-map.css`, controls and modal behavior.

| Finding | Player consequence | Response in this revision |
| --- | --- | --- |
| Energy, money and activity points existed only behind the date button | Players could not judge their resources before opening activities | A compact, wrapping, icon-supported resource strip remains visible during play |
| The date looked like passive metadata | Status/calendar navigation was easy to miss | Bordered date/activity button, explicit Calendar label where space permits, persistent chevron |
| No room-level indication of available scenes | Players had to repeatedly open the phone and door | Counts derived from the same `availableScenes` result as menus; no locked-scene or unearned-clue exposure |
| Narrow screens retained percentage-positioned labels and 44px objects on a shrinking image | Labels and touch targets competed with the artwork | Below 700px, the same controls become a labelled icon rail below the uncropped illustration; desktop retains object interaction |
| Upcoming nighttime scenes were nested inside Help | Time-sensitive opportunities were easy to overlook | A compact tonight preview outside Help; weekly tutorial stays collapsed |
| Journal moved between navigation and room objects depending on phase | Navigation was inconsistent | Journal remains available in the play bar and on the room's book |
| Static planner offered little response beyond color changes | Interaction felt disconnected from the illustrated setting | Brief room/dialog/badge entrance and hover glow; reduced-motion preference disables new animations |

Menus retain native dialog semantics, Escape dismissal, focus restoration and free browsing. No scene, price, resource balance, availability condition or save semantics change. Existing graphics are reused; this revision does not claim newly generated artwork.

## Remaining scope

- The current destination selector is a schematic, not the measured estate map. A geography-accurate illustrated map and its interaction design need a separate pass against CASTLE-GEOGRAPHY.md.
- Seasonal/holiday backgrounds and outfits still have documented missing variants. The UI must continue showing honest fallbacks.
- Existing small raster icons vary in clarity. A coherent replacement illustration set can improve them; do not silently claim the existing files were redrawn.
- Dialogue retains its existing portrait, scrolling text and stable choice layout. This revision does not establish complete dialogue accessibility or every scene's visual acceptance.
- Real-device Safari, screen-reader review and user aesthetic acceptance remain open.

## Verification

203 engine/content/CLI tests pass; TypeScript and production build pass (existing bundle-size warning remains). `tools/verify-leisure.cjs` checks resource visibility, live availability counts, minimum touch targets, mobile non-overlap and reduced motion alongside existing save/resume, both completed puzzles, reward claims, gifts and paid outings. Chromium checks and screenshot review pass at 320, 390 and 1440px, including Hungarian and English menus and 130% text. The final revision incorporates concurrent story commit `cce4409`; its schema/content epochs are retained. Tests do not establish user aesthetic approval.
