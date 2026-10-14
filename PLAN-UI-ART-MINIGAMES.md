# Plan — UI, Art, Minigames, Dialogue Improvements

This plan addresses the feedback on visual consistency, main UI, minigames, and dialogue while keeping all sexual/explicit content intact (still using the coded system in 06-intim-szotar.md).

## 1. Art replacement (castle consistency)
- Replace mismatched backgrounds in `assets/backgrounds/` with versions that show 19th-century Hungarian Romantic/Neo-Gothic castle architecture (stone walls, pointed arches, wooden beams) mixed with modern functional elements.
- Player's office and living quarters are inside the castle.
- Priority: office, apartment, classroom, library, courtyard.
- Character portraits remain unchanged.
- Update any path references if needed.

## 2. Main UI → Office POV
- The planner screen becomes a first-person view of Márton's office in the castle.
- Clickable objects trigger actions:
  - Clock / calendar → rest / advance time / spend slot on calm.
  - Door → leave for external activities (minigames, courtyard, dates).
  - Phone → call / invite girls.
  - Desk papers / bookshelf → study / insight / tasks.
  - Window or specific prop → gym / other.
  - Shelf → shop / gifts.
- HUD overlay for week, money, energy, risk, girl meters.
- Scene view (background + portrait + dialogue) remains when a conversation starts.
- Implementation in `src/game/ui/GameApp.tsx` (replace or heavily update Planner).

## 3. Minigames
- **MOHU**: Replace the Pac-Man maze with an infinite runner (side-scrolling or simple dodge). Better controls (tap/hold or left/right), phone-friendly. Rival collector as a hazard. Same reward range.
- **Brick / construction**: Replace with a trivia game dressed up as teacher work (e.g., correcting papers, quiz on media/folklore topics, or administrative questions). Timed questions, correct answers give money. Fits the academic setting better.
- Both stay in `src/game/ui/minigames.tsx` and use the existing job finish flow.

## 4. Dialogue improvements
- Expand key nodes in `src/game/content/catalog.ts` with longer, more character-specific text.
- Deepen personality (Rebeka control/audience, Boglárka slow opening, Gréta precision/rule tension).
- Keep and surface sexual content naturally via existing flags (act_flash, kiss, etc.). Do not remove explicit elements.
- Goal: less simplistic prompt-response, more natural conversation.

## Implementation order
1. Write this plan (done).
2. Replace background assets and commit.
3. Implement office POV UI.
4. Implement new minigames (infinite runner + trivia).
5. Expand selected dialogues.
6. Update related docs (12-jatekmenet-akciok.md, AGENT.md) if needed.
7. Commit all changes.

All changes go to the main branch of zodnosferato-code/ligetvar.
