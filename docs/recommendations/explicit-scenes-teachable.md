# Playtest and Recommendations: Explicit Scenes as Teachable Moments

> **Status:** 27 October 2026 playtest notes and recommendations. | **Purpose:** Align intimate scenes with the confirmed fade-to-black authoring contract while making them teachable vehicles for consent, communication, desire, boundaries, and aftercare.

## Playtest method

- Direct inspection of graphic passages in `src/game/content/romance.ts` (Rebeka, Boglárka, Gréta date and private continuations), `virag.ts` (private encounter, lake, etc.), and triad evening material.  
- Cross-checked against the 27 October user decision in `docs/design/GAME-DESIGN.md#relationship-intimacy--27-october-2026` and the INT1 row in `TRACKER.md`.  
- Current code contains explicit narrator descriptions (oral, penetration, orgasm, visible scars, clothing removal, “kneels without you asking,” etc.). The design contract requires fade-to-black for now, with invitation, mutual choice, reconsideration, refusal, and aftermath preserved.

## Current state vs. contract

The authored intimacy is currently graphic rather than fade-to-black. Some good consent language exists (“Én… engedek,” slow-touch alternatives, Virág’s explicit “Most. Csókolj meg.” with yes/no), but other lines undermine teachability (“Térdre ereszkedik anélkül, hogy kérnéd,” sudden escalation without clear ongoing check-in, limited aftercare beyond “maradj”).

INT1 remains Partial: audit existing branches, adapt graphic passages, retain invitation/reconsideration/aftermath, and verify browser/CLI parity. No runtime rewrite has been performed yet.

## What “teachable” means here

Intimate scenes should model and teach (through play, not lecture):

- Clear invitation and mutual affirmative choice.  
- Ongoing communication of desires and limits.  
- Right to slow down, refuse, or reconsider at any point.  
- Individual pacing and character-specific attraction.  
- Aftercare, vulnerability, and changed closeness afterward.  
- That intimacy is a meaningful relationship beat, not a reward, gate, or requirement for commitment or a valid ending.

They should not rely on graphic prose for impact, and they should not erase the beat merely because physical detail moves off-screen.

## Recommendations by character / branch

### Shared principles for all intimate scenes

- Replace graphic narrator blocks with a short transition to black (or equivalent soft cut) after the mutual decision.  
- Keep the invitation, the character’s specific desire or vulnerability, the player’s choice (including slow/refuse options), and a return that shows conversation, care, or changed closeness.  
- Add or strengthen one explicit check-in or expression of desire before escalation.  
- Ensure refusal or slowing never triggers the graphic path and is acknowledged without punishment.  
- Preserve visible character details (e.g., Rebeka’s scar as a moment of not hiding, not as sexual spectacle) in the pre- or post-scene conversation.  
- Aftermath should be character-voiced and relational, not merely “stay until the light comes back.”

### Rebeka

Current graphic path (hand choice): deep kiss → clothing removal → “kneels without you asking” → oral → penetration → “you set the pace” → orgasm → stay.  
**Teachable rewrite direction:**  
- Invitation around not performing / not needing a joke.  
- Explicit mutual “I want this / I want to slow” choice.  
- Fade after the decision to undress or continue.  
- Return with her scar still visible if she chooses not to cover it, and a short exchange about staying without needing to be entertaining.  
- Keep the slow-walk alternative fully viable and warm.

### Boglárka

Current path includes watching her blush, mutual oral, praise of body, multiple orgasms, cardigan half-on.  
**Teachable rewrite direction:**  
- Emphasize her choosing quiet company and pleasure rather than performance.  
- Clear ask about what she wants after the kiss or touch.  
- Fade after mutual yes.  
- Aftermath that returns to the book/concert/alibi joke or a new shared quiet, showing she can put the performance down.

### Gréta

Current path: vest off, oral at the table, light impact, penetration, short laugh after.  
**Teachable rewrite direction:**  
- Lean into her desire for something outside usefulness/organization.  
- Explicit check that the table/position is wanted.  
- Fade after the yes.  
- Aftermath that keeps the phone in the bag and the moment out of any “minutes,” reinforcing that this is not work.

### Virág

Current: quick private encounter in alcove/hallway or lakeside with immediate oral/sex, “Now. Kiss me,” and independent success of her reporting.  
**Teachable rewrite direction:**  
- Preserve her direct style and the yes/no on the kiss.  
- Add a brief mutual confirmation before the off-screen part (especially given her age and outsider status).  
- Fade after the choice.  
- Aftermath that distinguishes the personal closeness from the instrumental/reporting motive, and that refusals change the physical action without ending the teasing or the story.  
- Keep refused touch from ever occurring.

### Triad evenings

Current evening material is warmer and less graphic; preserve and extend the ordinary closeness, separate bonds, and “nobody has to be equally tired or talkative.”  
Any future physical escalation should follow the same fade + mutual three-party agreement rules.

## Implementation notes

- Author the fade as a short narrator line or dedicated stage/moment that the UI can treat as a soft cut (consistent with existing `Line.moment` / animation infrastructure if desired, or simple text).  
- Ensure choices that select “slow,” “refuse,” or “not tonight” branch cleanly and set appropriate memories/decisions.  
- Update journals/recaps so they reflect the witnessed decision and emotional aftermath, not the off-screen physical detail.  
- Keep browser and CLI observation parity (no hidden graphic text in ordinary view).  
- After the rewrite, mark INT1 progress in the tracker and re-run relevant route and choice tests.

## Suggested acceptance for the next pass

- No graphic physical descriptions remain in active scenes.  
- Every intimate beat has an invitation, a mutual choice (including slower/refusal options), a fade, and an aftermath that advances character or closeness.  
- Refusal or slowing is always available and acknowledged.  
- Scenes remain worthwhile and characterful without the physical escalation.  
- Story sense is preserved: intimacy supports the relationship, does not gate the investigation or ending, and fits each woman’s voice and favourite-place experiences.

These changes implement the confirmed 27 October intimacy contract while making the scenes actively teachable about consent, communication, and relational care.
