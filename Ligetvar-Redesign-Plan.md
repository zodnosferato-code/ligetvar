# Ligetvár — story and basic art redesign

Planning baseline: main at `f9f72c353b02049e11eabc97786883b9a87f0903`, reviewed 18 October 2026. This document specifies the redesign. The v2 runtime and 45 Hungarian scenes are now implemented; final manga production and the complete art/release gates remain open. See docs/REDESIGN-PROGRESS.md for actual verification. Planning revision: 18 October 2026, following engine review at `9d25ab7f44a4267911cfba8fc0ed24c1b9225949`. The existing engine suite was executed during that review: 27 passed, 0 failed. That result does not validate the new design. Sixteen weeks refers to the in-game semester, not a development deadline.

## 1. Decisions established with Miki

- Romance drives the semester; eerie horror supports it. Disappearances, strange encounters, and little visible violence.
- Keep the castle-college setting, Márton Kelényi's teacher and study-director roles, and the mystical gymnastics workshop. Márton already knows a genuine magical discipline.
- Forbidden relationships are central to the heightened gothic fantasy.
- The antagonist is an unsuccessful follower of dark arts working as a university assistant. They deliberately become a vampire, driven by lust and desire for success. Their power amplifies fascination and ambition but cannot compel affection.
- People who disappear return with missing time and growing exhaustion.
- The final confrontation ends in the vampire's death.
- Support three single romances and a carefully written shared route with Rebeka and Boglárka. Those two also fall in love with each other.
- Each woman has a distinct romantic pace.
- Replace the pixel effect with clean illustrated manga art. Ordinary dialogue uses large expressive portraits beside the text, over reusable backgrounds.
- Preserve recognizable faces, hair, body types, and signature outfits. Remove emphasized belly fat and the pencil in the hair; simplify hairstyles.

Everything more specific below is a design recommendation, open to revision. In particular, the assistant's name and appearance, the magic's exact rules, and the mechanics of the vampire's death remain proposed details.

## 2. What the current repository needs to resolve

The original dating-simulation framework and the later supernatural plot operate beside each other rather than as one causal story.

| Observed issue | Evidence in the reviewed version | Redesign response |
| --- | --- | --- |
| The threat is introduced but does not determine the ending evaluation | `catalog.ts` contains disappearance cases and vampire revelations; `logic.ts::evaluateEnding` resolves relationship, anger, and risk conditions without resolving those investigation flags | An authored confrontation always precedes separate world and relationship epilogues |
| Narrative information can arrive without its supporting discoveries | `weeklyHorrorSummary(week)` selects text by calendar week; horror events use week windows and catch-up selection | Journal and recaps derive from witnessed scenes and known evidence; required discoveries have explicit predecessors |
| Illustrations contradict scene locations | `rebeka_bekas_private` maps to a balcony image; cinema and station use hallway backgrounds | Every scene declares an exact location and art reference; omit unsupported locations from the first version |
| Several sources compete for the story | Hardcoded catalog nodes are merged with JSON dialogue and localization; later scheduling infers behavior from IDs | One authoritative scene definition includes scheduling, prerequisites, localization, and visual metadata |
| Character expression fallbacks can communicate the wrong emotion | Anger can fall back to fluster or blush for characters without an anger portrait | All three receive the same basic expression categories, with neutral as the safe fallback |
| Art instructions conflict internally | The visual documents mix downscaled painting and crisp pixels; one Rebeka prompt says 172 cm while the character canon says 175 cm | One updated visual bible, explicit dimensions, and image references; superseded instructions marked historical |
| Some prose contradicts visual locks | Gréta's ending mentions a pencil in her hair despite the visual lock excluding it | Scene-level continuity checks cover text as well as images |

Visual inspection of the existing backgrounds and clothed portraits also shows differences in rendering, framing, and proportions. Many rooms read as candlelit historical interiors with few signs of a functioning modern college. Preserve their atmosphere, but introduce consistent electric lighting, radiators, laptops, noticeboards, and modern furniture where appropriate.

## 3. New story premise

During an autumn semester at Ligetvár, Márton teaches a small elective workshop in a real, little-known magical movement discipline. Rebeka documents it through photography, Boglárka studies its relationship to local folklore, and Gréta organizes its academic administration.

A university assistant who has repeatedly failed to gain recognition discovers a transformation ritual in restricted college material. They choose vampirism to become desirable and professionally indispensable. At first, the apparent results are impressive: confidence, persuasive attention, and unusually successful work. Soon, people start returning from unexplained absences with exhaustion and missing memories.

The workshop's exercises make discrepancies easier to notice. That brings the group into the investigation, while shared work and increasingly personal meetings create three different romantic possibilities. Attraction does not solve the mystery, and helping the investigation does not purchase affection.

The assistant tries to make an unstable transformation permanent using an old service chamber beneath the castle. The group discovers enough to interrupt that attempt. The final confrontation kills the vampire; the epilogue resolves what the survivors reveal, what the college acknowledges, and which relationships continue.

### Tone and boundaries of the fiction

Keep everyday college life present: deadlines, borrowed equipment, awkward corridor encounters, bad coffee, autumn rain. Horror intrudes into familiar routines rather than replacing them with constant crisis. Include an ordinary relationship scene after a major frightening incident, with enough time for decompression.

The forbidden aspect comes from Márton's public role, privacy, conflicting commitments, and possible discovery. Avoid reducing every romantic encounter to discussion of institutional rules. Attraction and refusal remain personal decisions; neither magical discipline creates love.

## 4. Supernatural rules — proposed, fixed before scripting

| Element | Capability | Limit or cost | How the player learns it |
| --- | --- | --- | --- |
| Márton's discipline | Grounding exercises help participants notice altered attention and re-establish their own sense of time | Requires conscious participation and practice; cannot restore every memory or make someone invulnerable | First workshop, then a small repeatable demonstration |
| Vampire fascination | Makes attention linger and magnifies existing desires for recognition, pleasure, or achievement | Cannot create affection, erase a refusal, or make everyone agree | A recipient remains unimpressed; another accepts an opportunity for an understandable personal reason |
| Feeding | Drains vitality; victims experience exhaustion and gaps in memory | The vampire needs increasingly frequent feeding as the transformation destabilizes | Victim accounts, dates, and the assistant's changing behavior |
| Borrowed voice | Repeats a voice heard previously to lure someone out of sight | Cannot improvise indefinitely; familiar phrases repeat unnaturally | A recorded phrase recurs in a later encounter |
| Transformation ritual | Can stabilize the vampire's condition at the old service chamber | Its anchor is vulnerable during completion; an interrupted ritual causes fatal collapse | An incomplete instruction is found early; its missing section is recovered before the finale |

No new power or weakness appears for the first time in the confrontation. Retire unsupported legacy clues such as reflection anomalies or the missing bell clapper unless they receive a defined role in the final rules. The new deliberate transformation replaces the current half-vampire ancestry explanation.

## 5. Sixteen-week plot treatment

Retain the existing calendar for the first rewrite. Each week has one guaranteed shared-story slot and two discretionary slots: 48 total, including 16 shared scenes and 32 optional activities. This replaces the extra automatic workshop scene with a visible time cost. The table describes the proposed shared scenes; a workshop can occur inside them.

| Week | Shared story beat | Relationship opportunity |
| --- | --- | --- |
| 1 | Workshop introduction. Meet the assistant as an ordinary, frustrated colleague before the transformation. Establish one grounding exercise. | Distinct introductions: Rebeka challenges a claim, Boglárka asks an unexpectedly precise question, Gréta catches a scheduling mistake. |
| 2 | The assistant misses an appointment, then returns unusually energized. A student comes back from a missing evening, exhausted. | A low-stakes individual meeting establishes interests beyond the mystery. |
| 3 | The missing student agrees to a limited interview. A repeated phrase and an inexplicable time gap emerge. | Rebeka negotiates what she may photograph; Boglárka questions a misleading transcription. |
| 4 | Compare photographs, folklore, and attendance records. Each woman contributes an indispensable observation. | First disagreement between Rebeka and Boglárka; neither is simply wrong. |
| 5 | A voice calls from an empty room. A practiced grounding exercise exposes the repetition. | Márton's expertise earns respect, but he admits what he cannot explain. |
| 6 | The assistant gains a coveted opportunity. Another exhausted person reports accepting an invitation, then losing time. | Quiet scenes develop attraction; one woman may initiate a personal invitation. |
| 7 | Evidence links the incidents to access to restricted materials. The group finds an incomplete ritual description. | Rebeka and Boglárka voluntarily work together without Márton directing them. |
| 8 | Compare the incident dates with the assistant's absence. Decide whom to confide in and establish an investigation plan. | Choose a single romantic direction, a tentative shared-route direction, or friendship. No automatic declaration of love. |
| 9 | The group identifies the likely assistant and checks the theory against independent evidence. | A chosen route receives its first substantial private scene. The other characters remain collaborators. |
| 10 | The assistant offers Márton recognition and discretion in exchange for cooperation. | Romantic tension comes from a personal choice, not a rescue reward. |
| 11 | A supervised encounter confirms that fascination has limits. A refusal is effective even while danger remains. | A route-specific misunderstanding is addressed; gifts cannot bypass it. |
| 12 | The group finds the missing ritual instructions and the intended completion date. | Single routes discuss what they want. Shared route includes a Rebeka–Boglárka scene without Márton present. |
| 13 | Locate the service chamber and establish its relationship to the old castle layout. | Quiet, character-specific date or reconciliation; openly negotiate shared-route expectations. |
| 14 | Assemble the intervention plan, practice signals, and arrange help. The assistant realizes their secret is exposed. | A promise has a concrete cost: time, honesty, or relinquishing control. |
| 15 | Confrontation in the service chamber. The group interrupts completion; the vampire dies when the unstable transformation collapses. | Trust changes who shares responsibility and how people respond afterward, rather than granting supernatural immunity. |
| 16 | Aftermath: victims recover unevenly, evidence is accounted for, and the college must respond. | Separate epilogues for each romance, the triad, friendship, and estrangement. |

The interrupted ritual provides a low-gore death: the assistant's borrowed vitality fails and the body becomes still. Portray the moment briefly. The aftermath carries its emotional weight.

### Reveal and failure structure

Let the player suspect the assistant before the characters can prove it. Identity alone is not the final twist; the central discovery is how the transformation works and what will stop it.

Required evidence cannot be lost behind romance thresholds or random rolls. Optional evidence improves preparation and the aftermath. If the player neglects preparation, supporting staff still help interrupt the ritual, but the outcome brings greater exhaustion, damaged evidence, or institutional denial. The vampire dies in every completed confrontation, as requested. A poor outcome does not secretly preserve them for a sequel.

## 6. Character and relationship rewrites

| Character | Personal goal beyond romance | Romantic pace | Conflict and resolution |
| --- | --- | --- | --- |
| Márton, 34 | Keep a difficult workshop viable while learning where his expertise ends | Shaped by player choices, with a consistent adult voice | His position makes secrecy convenient; growth means accepting commitments and consequences instead of solving every problem by authority |
| Rebeka Dorn, 20 | Produce a photographic essay she respects, beyond the Holdkör's approval | Early verbal provocation; slower emotional openness | She mistakes being admired for being understood. A meaningful scene lets her choose what remains private without surrendering her artistic identity |
| Boglárka Fazekas, 19 | Turn careful research into a piece bearing her own name | Slow attraction, increasingly direct initiative, dry humor | She expects interruption and makes herself small in conversation. Growth is expressing a preference and disagreeing, not becoming a different personality |
| Gréta Váradi, 21 | Be recognized for judgment as well as administrative reliability | Respect first, deliberate private flirting, later spontaneity | She uses usefulness to secure belonging. A turning point lets her leave work unfinished and discover someone still wants her company |

Their existing vulnerabilities can remain, but do not repeat body shame, control, or reassurance as the only topic of every scene. Give each woman preferences, irritating habits, ambitions, and the ability to initiate or decline a meeting.

### Single routes

Each receives six substantial optional scenes across the semester: shared interest, attraction, voluntary personal invitation, disagreement, repair or commitment, and aftermath. Essential relationship milestones require witnessed scenes and mutual choices; proximity points alone cannot substitute.

- Rebeka's ending centers on being wanted outside her performance and deciding what to share publicly.
- Boglárka's ending centers on authorship and choosing an acknowledged relationship in her own words.
- Gréta's ending centers on companionship that does not depend on being useful or faultless.

### Rebeka–Boglárka–Márton route

This route needs eight additional scenes beyond the reusable individual foundations. Show: a dispute over an image caption; a joint correction; a conversation without Márton; independent attraction between the women; separate conversations with Márton; a three-way discussion; an ordinary shared evening; and a shared aftermath.

Track all three bonds. Márton cannot select a triad on behalf of the others. A shared relationship requires each participant's affirmative choice and room to discuss privacy, time, and jealousy. If one declines, continue a mutually wanted single relationship or friendship without treating the refusal as a failure of character.

Retire the two existing shared-route combinations from the first redesign. Their historic IDs and saves need an explicit migration policy; do not silently reinterpret them as the new triad.

### Supporting cast

Keep Dr. Farkas Dénes, Dr. Sárközi Júlia, Dr. Kerekes Áron, and the existing witnesses. Give them stable functions: Dénes helps assess exhaustion, Júlia evaluates folklore, and Áron supplies access and institutional opposition. Lilla's experience starts the current case; the older witnesses establish earlier dark-art experiments, not earlier completed vampire attacks by this newly transformed assistant. Their participation is not a romance reward. The assistant is a separate character unless Miki later selects an existing identity.

## 7. Endings and gameplay coherence

Resolve three independent questions in sequence:

1. **Threat:** the vampire dies. Preparation determines the group's condition, preservation of evidence, and the interruption's cost.
2. **Institution:** the college acknowledges the case, issues an incomplete explanation, or suppresses it, based on evidence and disclosure choices.
3. **Relationships:** a committed single romance, committed triad, unresolved connection, friendship, or estrangement, based on witnessed relationship decisions.

Do not require romance to protect witnesses or complete the plot. Do not reduce danger and reputational exposure to one number. Use preparation flags for supernatural danger and a separate exposure measure for discovery of relationships.

Keep the maximum of four dialogue choices. Propose replacing the current requirement for a very-good/good/bad/very-bad ladder in every scene with context-specific choices: honesty, tact, disclosure, privacy, initiative, and withdrawal. Different choices may be valid for different reasons. Update `AGENT.md` and `09-dialog-es-architektura.md` accordingly before implementation.

Keep money, gifts, and optional jobs modest in scope. Remove the mandatory work-shift gate before dates or shopping. Repeated conversation cannot generate the trust required for a commitment. Preserve the ability to rest without creating a schedule where basic exhaustion management prevents the authored story from occurring.

## 8. Basic art bible

### Shared rendering

Clean 2D manga illustration with consistent adult facial proportions, controlled line weight, two or three principal shading bands, restrained texture, and no pixel effect. Backgrounds may have more texture but must share perspective, lighting, and color treatment. Choose one style sample before producing variants.

Warm amber electric light against slate-blue autumn exteriors; moss and forest green, plum, cream, charcoal, and copper accents. Day scenes must remain visibly daytime. Do not bake candlelight into every portrait.

### Character locks

| Character | Preserve | Simplify or correct |
| --- | --- | --- |
| Rebeka | Angular face, pale skin, long black hair, left plum streak, left-eye beauty mark, berry lips; black high-neck midi dress, silver choker; tall silhouette | Straight, easily repeated hair shape; no extra braids or ornaments |
| Boglárka | Round adult face, freckles, brown eyes and hair; short, fuller figure; moss cardigan and cream dress | Simple loose side braid; remove emphasized belly fat, retaining her distinct overall proportions; no glasses |
| Gréta | Rectangular adult face, copper hair, thin rectangular glasses; slim athletic figure; white shirt, forest-green vest, graphite skirt | Simple ponytail, no elaborate hair arrangement, no pencil in hair |

Rebeka's streak and mole stay on her anatomical left. Boglárka's braid stays over her anatomical right shoulder. Never mirror these assets to change facing. Heights remain 175 / 150 / 168 cm on reference sheets; portrait framing follows a shared eye line rather than literal height.

Márton remains the viewpoint character. A visible portrait is unnecessary for the basic set, and his currently unresolved facial design need not be invented. The assistant's human and vampire forms must use one face and hairstyle; the vampire is recognizable, with subtle pallor, eye, and posture changes rather than a different person.

### Minimum runtime set: 31 assets

| Asset group | Count | Contents |
| --- | ---: | --- |
| Main-character portraits | 15 | Three women × neutral, amused, displeased, vulnerable, affectionate; same crop, outfit, and head proportions |
| Assistant portraits | 2 | Human presentation and transformed presentation, derived from one master |
| Supporting faculty portraits | 3 | Dénes, Júlia, Áron, one neutral each |
| Location backgrounds | 8 | Classroom, library, department office, Holdkör basement, courtyard, Márton's apartment, Békás-tó, service chamber |
| Lighting variants | 3 | Classroom dusk, courtyard night, library evening, edited from approved layouts |
| **Total** | **31** | Static reusable art; no animation or illustration for every dialogue node |

Victims can initially be presented through narrated interviews and existing scene composition. Add dedicated portraits when their dialogue warrants them. Three optional later illustrations—one per single route—raise the set to 34; the triad illustration is a separate later addition. Those illustrations are not prerequisites for a coherent first version.

Production references are additional non-runtime material: three clothed identity sheets, an assistant identity sheet, and a castle architecture/layout sheet. Each identity sheet contains a face close-up and simple full-body view in the same outfit. Do not spend the first batch on elaborate turnarounds, multiple costumes, or pose collections.

### Dialogue composition

Use a 16:9 background with a separate portrait and dialogue panel. Desktop: large portrait beside the text, leaving enough room for four choices. Mobile: portrait beside the speaker/header area above the text and choices; keep expressions readable without burying the background or forcing horizontal scrolling. Support text scaling.

Suggested delivery sizes: backgrounds 1920×1080 PNG/WebP; portrait masters 1024×1280 transparent PNG, with a fixed head-and-shoulders crop and eye-line guide. Derive smaller runtime files from approved masters. Portrait light is soft and neutral enough for several rooms. CSS may add subtle scene tint, not reshape or repaint the face. No pixelated image-rendering rule.

## 9. Image-generation workflow

1. **Freeze the bible.** Resolve the assistant's age, face, hair, outfit, and silhouette. Select one existing clothed face reference per woman as identity evidence. Written locks resolve conflicts; an existing image is not automatically correct in every detail.
2. **Prove one combined scene.** Produce Rebeka's neutral portrait and the classroom background in the proposed manga style. Inspect them together at desktop and phone sizes before expanding the set.
3. **Create the other masters.** Generate Boglárka and Gréta using their identity references plus the approved style sample. Create the assistant and supporting staff in that style.
4. **Derive expressions by editing masters.** Change eyes, eyebrows, and mouth in place; preserve the rest of the image. Reuse the approved identity and style images in every request. Text descriptions or a fixed seed alone are not reliable identity controls.
5. **Lock the castle.** Establish doors, windows, materials, room functions, and relative locations on a small layout sheet. Generate empty backgrounds with room for the UI. Edit time-of-day variants from the approved image without changing its architecture.
6. **Check and export.** Compare variants side by side at final display size. Reject drift rather than hiding it through a different crop. Export transparent portraits without baked scenery or text.
7. **Register every accepted image.** Record asset ID, reference IDs, prompt, generator/model version if available, source dimensions, crop, outfit, expression, location, lighting, and approval status. Keep accepted assets in the repository's `assets/` tree, the canonical runtime source.

### Reusable portrait brief

> Edit the attached approved [CHARACTER] portrait in the approved clean manga style. Preserve the exact adult face, hair silhouette and color, anatomical left/right identity marks, body proportions, signature outfit, crop, eye line, and soft neutral lighting. Change only the expression to [EXPRESSION], expressed through [SPECIFIC EYE/BROW/MOUTH CHANGES]. Head-and-shoulders portrait, transparent background, no text or scenery, no pixel effect. Match the supplied style reference. Do not mirror the image.

### Reusable background brief

> Clean illustrated manga background matching the approved Ligetvár style reference and architecture sheet. A modern college inside a nineteenth-century Hungarian Romantic/Neo-Gothic castle. [ROOM AND FUNCTION], [FIXED DOOR/WINDOW POSITIONS], [MODERN FURNISHINGS], [TIME AND LIGHT]. Empty of people. Consistent eye-level perspective, clear dialogue-overlay area, no embedded text, no pixel effect. Preserve the approved room layout when making a lighting variant.

### Acceptance checks

- The neutral portrait and every expression read as the same person in an overlay comparison.
- Correct hair colors, identity marks, glasses, and outfit; no pencil or emphasized belly fat.
- Vulnerability is not rendered automatically as seductive or smiling; displeasure remains readable.
- Every background belongs to the same modernized castle, with consistent geography.
- Scene text, location, outfit, lighting, and art agree. A lake scene never receives balcony art.
- All expressions remain legible at phone size, with clean alpha edges and no facial cropping.

## 10. Implementation sequence and completion gates

| Phase | Deliverable | Gate before proceeding |
| --- | --- | --- |
| A. Canon and cleanup inventory | Canonical documentation, creative decisions, scene inventory, explicit keep/replace/retire list | Conflicts have a named replacement; no active content is deleted merely because it is old |
| B. Engine prerequisites | Typed scenes and prerequisites, guaranteed weekly scheduler, relationship bonds and decisions, ordered endings, versioned saves | Synthetic single, triad, friendship, and poor-preparation paths reach week 16; required evidence cannot be missed |
| C. Opening prototype | Weeks 1–3, all introductions, one complete optional relationship scene, one combined manga scene | Real content runs through the new scheduler and save format; clues are causal; desktop and phone composition is readable |
| D. Shared plot and relationships | Sixteen shared scenes, knowledge-aware journal, single and triad scenes, epilogues | The slot budget below is playable; commitments are witnessed; the women develop an independent bond |
| E. Basic art | 31 runtime assets, reference sheets, asset register | Identity, expression, location, and mobile-readability checks pass |
| F. Retirement and release verification | Remove superseded runtime paths and assets; finalize documentation | Reference checks, build, engine/content tests, full route simulations, and manual UI review pass |

Phase B precedes bulk writing. Phase C validates art early; phase E completes production after the scene list is stable. Phase F verifies integration rather than introducing the scheduler or ending model for the first time. Keep the current engine and UI framework; extend their data model and rules.

### Cleanup checklist and retirement gates

Unchecked items below are implementation work, not claims of completion.

- [x] **A1 — Documentation authority:** this plan governs the redesign. `ENGINE.md` describes the current runtime until updated alongside implementation. Mark conflicting numbered story/art documents historical and link their replacements; do not use an old draft to override this plan. Preserve non-conflicting character identity details and asset provenance.
- [x] **A2 — Inventory:** enumerate imports, content loaders, scene IDs, route IDs, localization keys, save fields, asset references, and test entry points. Classify each as keep, replace, or retire, recording its replacement and verification command.
- [x] **B1 — Single scene source:** migrate hardcoded/JSON-merged scene definitions into one typed registry. Validate unique IDs, localization and art references, next-scene links, prerequisites, and cycles. Retain adapters only during migration, with an explicit removal task.
- [x] **B2 — Save boundary:** introduce a new save version and key. Keep the original v1 save intact; explain that redesigned story progress requires a restart. Import only an explicitly allowed player name if requested. Never translate old pair routes or milestone flags into new commitments. Reject unsupported versions safely.
- [x] **F1 — Legacy engine:** retire `src/core/`, `src/scripts/part1-kozos.ts`, and their legacy test entry after checking consumers. `src/tests/dialogue.test.ts` currently imports that engine: migrate any useful coverage before deleting it. Update package scripts and documentation together; no broken imports or test commands may remain.
- [x] **F2 — Legacy narrative:** remove the two retired pair routes, incompatibility penalty for Rebeka/Boglárka, ancestry reveal, obsolete clue chains, old ending branches, calendar-only summaries, and migrated content adapters after replacement coverage passes.
- [ ] **F3 — Art and UI:** switch active scenes to the reviewed manifest, remove obsolete aliases and pixel CSS, and consolidate overridden scene-layout rules. Remove unreferenced runtime assets only after checking code, content, styles, and reference/provenance uses. Historical references must not enter the active runtime manifest.
- [ ] **F4 — Completion:** verify no retired ID is reachable, all supported save behavior is documented, all active scenes resolve their assets/text, and README/AGENT/ENGINE describe the appropriate implemented state. Record actual command results; do not equate a clean build with narrative correctness.

### Engine prerequisites: acceptance contract

- **Scheduler:** each week has one guaranteed shared-story slot and two discretionary slots. Replace the extra automatic workshop with a shared scene where appropriate. Required scenes cannot be blocked by fatigue, romance, money, random encounters, or missed optional clues. Scene continuations consume no additional slot; finishing the scene consumes exactly one. Week advancement cannot skip the shared scene.
- **Prerequisites and knowledge:** declare required scenes/decisions/evidence explicitly. Record discoveries only on witnessed completion and derive journal/recaps from those records. Optional atmosphere cannot deliver future revelations. Validate both graph structure and reachable playthroughs.
- **Relationships:** store the Márton–Rebeka, Márton–Boglárka, and Rebeka–Boglárka bonds separately, plus Gréta's individual progression. Record each participant's affirmative decisions and repair milestones; numerical trust cannot replace them. Week 8 chooses a tentative direction, not final consent or commitment. A declined triad permits an agreed single route or friendship.
- **Scene composition:** participants and speaker are distinct fields; support faculty and the assistant without romance stats. Each scene declares location, expression, and artwork. Multi-speaker dialogue must not inherit the previous speaker's expression or apply effects to the wrong relationship.
- **Endings:** complete the week-15 confrontation before resolving week-16 aftermath, institutional outcome, and relationship epilogues. Preparation changes costs and evidence, not whether the vampire dies. Friendship and poor preparation remain complete story paths.
- **Economy:** remove mandatory job gates for dates/shopping; balance recovery inside the discretionary budget. Repeated interactions cannot grant commitment milestones. Preserve optional jobs and gifts without making them required for story access.
- **Verification before bulk writing:** use small fixture scenes to exercise all 16 weeks, blocked prerequisites, refusals, missed optional scenes, save/resume, and ending order. These are new tests to implement; the current 27 tests cover the old rules and some expectations must change deliberately.

### Sixteen-week discretionary slot budget

The shared-story slot uses the corresponding beat in section 5. This table budgets only the other two slots, showing a demanding triad path. A numbered foundation is one substantial individual scene: shared interest, attraction, invitation, disagreement, repair/commitment, aftermath. On the triad path, commitment means agreeing to that relationship's terms, not promising exclusivity. The eight additional scenes are T1–T8. The runtime now implements this budget; the authored triad simulation and two-appointment recovery test verify it. Final art remains transitional.

| Week | Discretionary slot A | Discretionary slot B |
| --- | --- | --- |
| 1 | Rebeka foundation 1 | Free / rest |
| 2 | Boglárka foundation 1 | Free / rest |
| 3 | Rebeka foundation 2 | Free / catch-up |
| 4 | T1: image-caption dispute | Boglárka foundation 2 |
| 5 | T2: joint correction | Free / rest |
| 6 | Rebeka foundation 3 | Free / catch-up |
| 7 | Boglárka foundation 3 | T3: conversation without Márton |
| 8 | T4: independent attraction | Free / tentative direction |
| 9 | Rebeka foundation 4 | Free / rest |
| 10 | Boglárka foundation 4 | Free / catch-up |
| 11 | T5: separate conversations with Márton | Free / rest |
| 12 | T6: three-way discussion | Free / catch-up |
| 13 | Rebeka foundation 5 | Boglárka foundation 5 |
| 14 | T7: ordinary shared evening | Free / preparation or rest |
| 15 | Free / recovery after confrontation | Free / catch-up |
| 16 | T8: shared aftermath, including both foundation-6 resolutions | Free / closing activity |

This path costs **18 distinct optional slots**, including 12 individual milestones (two resolved within T8) and eight additional triad scenes. It leaves **14 flexible slots**. T5 contains two sequential conversations within one authored scene and one slot. T8 deliberately combines the two personal aftermath resolutions with the shared aftermath; do not charge three separate slots for that content. T4 can begin within week 8's shared beat, but its substantive relationship scene is budgeted separately. The women-only scene opportunity in week 12 may reprise T3/T4 rather than adding an unbudgeted mandatory scene.

For a single route, reserve its six scenes in weeks 2, 5, 7, 10, 13, and 16; this leaves 26 flexible slots. Adapt the emotional pace and invitations to the character. Friendship has no mandatory romance slots. Introductions and indispensable contributions by all three women occur in shared scenes, so this budget does not require separate introduction visits.

**Recovery and timing rules:** optional relationship scenes remain available after their suggested week until their actual narrative deadline. Earlier prerequisites are offered before later scenes, without advancing commitment automatically. Permit at least two missed optional appointments to be recovered using the flexible slots in a triad simulation. Consequences may change an outcome when the player declines or misses its real deadline, but never block the core investigation. Confirm the fatigue balance leaves those recovery slots usable. Schedule T7 before the confrontation; week-15 catch-up cannot replay pre-confrontation danger as if it were current. Week 16 must offer its aftermath activities before ending evaluation closes the run. Display meaningful deadlines to the player.

**Calendar gate:** keep 16 weeks unless a playable simulation demonstrates insufficient room after removing mandatory work gates and balancing rest. If it fails, first combine redundant scenes or reduce optional prerequisites; extending the semester requires an explicit pacing decision. This table proves a proposed capacity budget, not tested runtime reachability or a real-world delivery estimate.

### Targeted code and documentation changes

- Move the new authoritative narrative out of mixed hardcoded/merged definitions into explicit scene records. Retain the working engine where useful rather than rebuilding it wholesale.
- Each scene declares ID, participants, speaker, location, week window, prerequisites, effects, next scene, portrait expression, and background/illustration ID. Use typed metadata rather than substring tests for romance or art.
- Replace randomized delivery of required horror scenes with the weekly authored spine. Keep randomness for optional atmosphere only.
- Generate summaries from recorded discoveries, not the week number alone.
- Resolve the confrontation before evaluating relationship epilogues.
- Add the service chamber to location types. Remove unsupported date destinations from the first-version menu rather than assigning unrelated backgrounds.
- Introduce a new save version and an explicit restart/import policy; old relationship flags cannot silently count as new milestones.
- Update `AGENT.md`, README, the story documents, and visual instructions to point to the new canon. Mark contradictory old drafts as superseded.
- Remove old illustration aliases and pixel-specific CSS as new assets replace them. Keep historical files out of the active manifest until reviewed.

### Verification to run during implementation

Run the repository's actual build and engine tests; report their results only after execution. Add targeted checks for missing localization/art IDs, unresolved next-scene links, prerequisite cycles, correct expression fallbacks, and required-story reachability. Simulate single, triad, friendship, and poor-preparation paths through week 16. Confirm the vampire dies on each completed path and knowledge never appears early in the journal. Manually review desktop and mobile scene composition.

## 11. Remaining creative decisions for the next review

The plan can proceed to detailed scene outlining without another broad direction survey. Before generating final reference art or writing the confrontation verbatim, review:

1. The assistant's name, age, appearance, and ordinary working relationship with the cast.
2. The proposed vitality-draining, voice-repetition, and ritual-anchor rules.
3. A single combined manga portrait/background sample to lock linework and shading.

First production milestone: a coherent opening and one convincing relationship scene, supported by a tested visual style. That is the foundation for rewriting the rest of the game consistently.
