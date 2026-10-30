# Side-character one-off sexual events — niche fantasies and art presentation

> **Status:** Design brief, 30 October 2026. | **Purpose:** Define short, low-commitment optional encounters with Lilla and Dr. Sárközi Júlia featuring niche fantasies. Assets generated later; this specifies presentation and content structure.

Follows [NSFW-IMPLEMENTATION-PLAN.md](NSFW-IMPLEMENTATION-PLAN.md). Optional content never gates the investigation or endings. English canonical; Hungarian translation later. Preserve distinct voices, mutual choice, reconsideration/refusal, and aftermath. Use existing engine hooks (intimacy stages, preference flags, gallery unlocks, moment clips) once implemented; until then, design against the contracts.

## Characters and niche fantasies

Both are clearly adult. Encounters are one or two meetings each, triggered from existing staff/library interactions or optional phone entries after relevant shared scenes (Lilla after shared_3 knowledge, Júlia after shared_4). Prerequisites: witnessed prior contact, week window (e.g. 10–40), not recently completed, energy available. Mutual invitation + explicit yes required. Refusal ends with ordinary company or polite exit; no penalty.

### Lilla (early 30s)
**Niche: Sensory reclaiming / grounded presence.**
After missing time, she wants deliberate, slow touch that creates strong new body memories and affirms she is here and real. Not performance or spectacle.
- Core fantasy: Player follows her precise requests for temperature contrast (warm hands, cool air), slow mapping of skin, verbal affirmation of presence ("you are here, this is now"), and holding until the blank feels smaller. She stays mostly clothed (cardigan open or half-off); focus on hands, neck, collarbones, quiet breathing.
- Preferences flag example: `sensory-grounding`, `verbal-presence`.
- Aftermath: Quiet check-in, journal note about a recovered sensation, no commitment language.

### Dr. Sárközi Júlia (~48)
**Niche: Experienced instruction / quiet authority.**
Mature professional who enjoys directing with calm precision; the age/experience gap is acknowledged but mutual and non-coercive.
- Core fantasy: She remains partially in professional attire (blazer open, blouse unbuttoned, glasses on). She gives clear, low-voice instructions on position, pace and breath; praises correct form; uses one hand for guidance while the other rests. Focus on oral or manual with her directing the rhythm. She drops the clinical tone only after mutual yes and returns to it lightly in aftermath.
- Preferences flag example: `guided-instruction`, `attire-partial`.
- Aftermath: Practical "that was well done," offer of tea or library quiet, no romance escalation.

Other niches can be added later if desired (e.g. light praise/worship for Lilla, or specific sensory for Júlia); keep them character-specific and non-generic.

## Best way to present the artwork

Current system: NPC portraits overlay location backgrounds; intimacy is fade-to-black; Virág uses short WebP moment loops + static posters.

**Recommended for these one-offs (assets later):**

1. **Primary — Full composition CGs**  
   One main explicit CG per event (960×640 or 1280×720 landscape preferred) plus 1 variant (lighting or slight pose). Show as a large panel that replaces or heavily overlays the background for the duration of the explicit sequence, with dialogue continuing below or as captions. Player-view or intimate close-up (hands visible, face partial or turned) to stay consistent with first-person viewpoint. Anime/cel-shaded matching current portraits. Unlock to gallery on scene completion via effect.

2. **Secondary — Short moment loops**  
   Reuse the existing `Line.moment` / `MOMENT_CLIPS` system. 3–6 keyframe WebP loops (1.5–3 s, <750 KB) for key dynamics (e.g. hands moving across skin, expression shift from focused to soft, gentle hold). Mandatory separate static poster for reduced-motion/pause. Fall back to portrait + text if loop missing.

3. **Expressions and identity**  
   Generate 2–3 additional expressions per character (focused/aroused, soft/post, vulnerable) from current neutral portraits. Identity sheets (clothed → partial) first, as in the NSFW plan. Register only after visual review against CHARACTER-VISUALS.md.

4. **Staging and fallbacks**  
   Use intimacy stage markers (location, lighting, proximity, optional risk=false for private). Until CGs exist: current portrait overlay + detailed but non-graphic narration of the niche act, then fade or moment if available. Honest labelled placeholders for missing art. Gallery entry lists unlocked CGs without spoiling unplayed ones.

5. **Technical notes**  
   - CG IDs planned: `lilla_sensory_cg1`, `julia_guided_cg1` (+ variants).  
   - Preference flags set by witnessed choices; used for asset selection or later dialogue callbacks, never hard gates.  
   - Browser and CLI parity: CLI describes the moment in text; JSON includes moment status.  
   - No new engine knowledge of character names.

## Scene structure sketch (to implement after engine hooks)

- Invitation via phone or in-person after prerequisite.  
- Private location (apartment night, library alcove after hours, or quiet department).  
- Mutual choice branch → explicit sequence referencing CG/moment → aftermath conversation → preference flag + gallery unlock + journal.  
- Cooldown and once-per-window via existing prerequisites.  
- Energy cost similar to other optional meetings.

## Next steps

- Add tracker rows under INT2 / EVENT-SIDE.  
- Write full scene graphs once engine intimacy stages and gallery exist.  
- Produce identity + CG prompts from this brief when generation resumes.  
- Update CHARACTER-VOICES.md with short explicit-sample lines if desired.

This keeps side events optional, niche, and visually consistent with the drawn-anime direction while reusing current presentation contracts.
