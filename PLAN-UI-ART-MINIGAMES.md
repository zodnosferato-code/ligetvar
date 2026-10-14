# Plan — UI, Art, Minigames, Dialogue Improvements

**Status: Partially implemented and committed.**

## Completed
- Plan document created.
- Minigames replaced in `src/game/ui/minigames.tsx`:
  - MOHU is now an infinite runner (jump with Space/Up to collect bottles, avoid hazards).
  - Brick/construction replaced with a trivia game dressed as teacher work (correcting quizzes on media/folklore/admin topics). Rewards money on correct answers.
- Office POV skeleton added to GameApp.tsx (hotspots for clock/rest, phone, shop, study; girl portraits overlay). Full visual integration uses the castle office background.
- Docs updated earlier for castle setting.

## Remaining / next
- Full GameApp.tsx replacement with complete office hotspots (local version prepared; binary/size limits on direct push noted).
- Background asset replacement: new castle-themed PNGs generated (classroom, courtyard, office, apartment, library). Upload them to `assets/backgrounds/` and update LOCATION_BG if filenames differ.
- Dialogue expansion in catalog.ts: longer, more natural lines for key nodes (Rebeka intro, photo, Boglárka margin, etc.) while preserving all sexual flags and coded content.
- Test the new minigames and office clicks in the running app.
- Update 12-jatekmenet-akciok.md to describe the new minigames.

All sexual content remains; only writing quality and presentation improved.

Commit these changes and continue local testing.
