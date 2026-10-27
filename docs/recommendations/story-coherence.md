# Playtest and Recommendations: Story Coherence

> **Status:** 27 October 2026 playtest notes and recommendations. | **Purpose:** Diagnose and propose fixes so the gothic romance story makes sense as a setting for relationships, not a bureaucratic or passive investigation.

## Playtest method

- Source analysis of `src/game/content/shared.ts`, `relationships.ts`, `triad.ts`, `romance.ts`, `virag.ts`, `rules.ts`, and existing `docs/design/STORY-REVIEW.md` + `GAME-DESIGN.md` + `TRACKER.md`.
- CLI startup attempted (Node 22 via nvm); full long-route interactive playthrough limited by environment lock/startup latency, so findings emphasize structural and authored-text issues visible in the catalog.
- Focus: does the 16-week semester feel like a coherent place where Márton dates and builds relationships while a vampire investigation unfolds in the background?

## Core story problems that currently undermine sense

1. **Early villain identification creates five weeks of passivity**  
   Shared week 9 establishes identity; week 10 has Soma confess. Confrontation is week 15. The group then spends weeks planning, inspecting, and waiting. This makes the characters look inert and turns the middle of the semester into “we already know who it is.”  
   Aligns with the confirmed 27 October direction (Soma stays background until near the climax).

2. **Shared scenes repeatedly become records, permissions, and verification**  
   Weeks 4–14 foreground corrected clocks, access logs, fact/assumption separation, and institutional process. Sensible safeguards become the dramatic subject. The gothic romance risks feeling like committee minutes instead of lived college life with unease.

3. **Late individual/triad commitments + narrow windows**  
   Commitments open weeks 13–14; T7 is week-14 night only; both preparation tasks are daytime and must be in different weeks. A triad + full preparation path forces tight scheduling and leaves little room for ordinary relationship living before the climax.

4. **Magical workshop under-delivers**  
   Grounding, listening, and attention exercises dominate. Mystical gymnastics is described as a genuine discipline Márton already knows, yet the visible payoff is mostly ordinary mindfulness. The setting’s signature attraction is underused for chemistry or distinctive atmosphere.

5. **Individual routes share the same scaffold**  
   Attraction → invitation → violation/repair → commitment → aftermath. Distinct voices exist, but the emotional turns can still feel like reskins when milestones line up identically.

6. **Viewpoint tension with triad interludes**  
   Design claims first-person Márton viewpoint, yet some triad scenes deliberately show Rebeka–Boglárka without him. This is valuable for their independent relationship but conflicts with a strict viewpoint claim if not clearly framed as interludes.

## Recommended story changes (prioritized)

### High priority — make the investigation support rather than stall the romance

- **Delay Soma’s identification and confession until weeks 13–14.**  
  Keep him an ordinary, briefly present assistant for most of the semester. Plant a few ordinary details (access timing, familiar objects, mundane success) that gain meaning only retrospectively. Reveal close enough to the week-15 confrontation that the group does not spend five weeks knowing the culprit and waiting.  
  Exact week remains a design choice; the principle is “late reveal, background presence.”

- **Rewrite shared mid-semester scenes to change a personal or practical situation, not just a document.**  
  Keep safeguards, but express most through brief action or narration. Each shared activity should leave the characters in a different emotional or practical place (e.g., a workshop exercise that produces a small magical surprise and a reason to stay after; a returned person whose exhaustion changes how the group spends an evening; a quiet recovery that prompts seeking company).  
  Reduce successive speeches about “separating fact from assumption.”

- **Open key relationship decisions earlier or widen the pre-confrontation windows.**  
  Allow commitments and the triad evening to breathe so relationships are lived, not merely unlocked just before the boss scene. Preserve separate affirmative decisions. Do not add weeks; improve flexibility inside the existing 16.

### Medium priority — differentiate routes and use the setting

- **Give each woman a distinct source of attraction, complication, and earned change.**  
  Rebeka: challenges the polished image, photography as choice of what is seen.  
  Boglárka: quiet company and chosen pleasure rather than performed scholarship.  
  Gréta: room for pleasure outside usefulness and organization.  
  Virág: direct pace + instrumental motives that she owns.  
  Avoid identical emotional lessons at the same milestones.

- **Make workshop moments visibly (lightly) magical and useful for chemistry.**  
  Small, clearly magical experiences (a shared grounding that produces a brief shared sensory impression, a movement that reveals a missing detail, a practice that lets someone notice another’s tension). Define limits in advance: magic never creates or compels affection. Use them for playful friction and excuses to spend time together.

- **Frame Rebeka–Boglárka interludes explicitly.**  
  Either clearly label them as interludes the player does not witness, or have Márton learn their story only through what the women choose to share later. Keep unseen information out of his knowledge until shared.

- **Distinguish institutional outcomes clearly.**  
  Virág’s corruption reporting succeeds independently. The college’s response to the supernatural case depends on evidence survival and disclosure. Make the difference visible so suppression of the vampire story does not contradict exposure of financial wrongdoing.

### Retain and strengthen

- Expanded opening details (cable, crooked circle, marked photograph, “perhaps,” Gréta’s map, Lilla choosing the chair by the door).  
- Consent remains explicit at consequential moments.  
- Favourite places as distinct dating experiences (see existing brief in STORY-REVIEW).  
- Romance-first priority: the story is the setting in which dating and relationships happen.

## Suggested next implementation steps

1. Update the shared spine in `shared.ts` (and related localization keys) for delayed identification and less bureaucratic mid-semester scenes.  
2. Adjust windows/prerequisites in `relationships.ts` / `triad.ts` so commitments and the triad evening have room.  
3. Add 1–2 small magical workshop beats that also enable character chemistry.  
4. Audit individual route scaffolds for distinct complications.  
5. Update `STORY-REVIEW.md` and `TRACKER.md` (STORY row) with the new status after the conversation pass.  
6. Re-verify ending order, knowledge prerequisites, and complete-route tests.

These changes keep the confirmed 16-week structure, romance-first experience, and existing canon (Soma’s deliberate transformation, fascination without compelled affection, returning exhausted victims, his death in the confrontation, institutional/personal aftermath).
