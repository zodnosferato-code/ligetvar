# Plan — UI, Art, Minigames, Dialogue Improvements

**Status: The semester screen is the main page again.**

### Hub interaction rule
The main hub (apartment / department office) does **not** use randomly placed floating icons.  
Clickable controls are objects painted into the background itself (door, book, chair, sack, telephone, shelf).  
Each object has a dedicated icon that appears only on hover/focus/open.  
Hotspots are transparent overlays positioned exactly over those objects.

## Fixed
- `GameApp.tsx` no longer opens a menu that only launches minigames. Új félév / Folytatás enters the week planner, scenes, phone, shop, and endings.
- The catalog is the full dialogue set, not the stub.
- Pictures and music resolve through Vite's `public/` folder and `import.meta.env.BASE_URL`, so GitHub Pages (`/ligetvar/`) can load them.
- Title and place names follow the castle notes in `02-koncepcio.md` and `10-vizualis-stilus.md`: the office and the lodging are inside the 19th-century castle, with modern furniture against the old stone.

## Still open
- New castle-specific background paintings. The current PNGs remain the place art.
- Longer multi-turn portrait scenes from `29-bovitett-dialogusok-es-portrek.md`.
- MOHU is the runner and the old brick job is the trivia quiz (`BrickGame` delegates to `TriviaGame`), matching `12-jatekmenet-akciok.md`.
