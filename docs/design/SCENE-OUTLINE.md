# Scene-by-scene rewrite outline


**Calendar precedence — 28 October:** The approved [52-week year](YEAR-CAMPAIGN.md) supersedes the sixteen-week anchors below. Existing numbered briefs retain chapter coordinates, projected through `content/calendar.ts`; shared_15 occurs in week 51 and shared_16 in 52. Opening weeks 1–3 are unchanged. New scene briefs should specify actual calendar weeks. Narrative rewrites and unresolved proposals remain distinct from this scheduling implementation.
> **Status:** First editorial draft, 28 October 2026; shared_1 pilot implemented; remaining briefs are not implemented or blanket approval. | **Purpose:** Translate the master plot into individual scene briefs for deliberate rewriting.

## Authority and boundaries
Read [master plot](STORY-REVIEW.md), [character voices](CHARACTER-VOICES.md), [visual authority](CHARACTER-VISUALS.md), [workflow](NARRATIVE-WORKFLOW.md), [baseline findings](PLAYTHROUGH-FINDINGS.md) and [runtime inventory](../SCENE-INVENTORY.md). Existing IDs below identify rewrite targets, not unchanged runtime prerequisites. This original draft covers 68 scene IDs; the two additional holiday scene briefs are maintained in [HOLIDAY-EVENTS.md](HOLIDAY-EVENTS.md).

Confirmed anchors: romance first; sixteen weeks; genuine mystical gymnastics; Soma peripheral until late identification; deliberate vampirism, fascination cannot compel affection; victims return exhausted with missing time; week-15 vampire death; week-16 institution then personal aftermath. Keep independent bonds, triad agreement and Virág's independent reporting/casual route. Player name always comes from saved chosen-name variable; use “player” here rather than baking a name into prose.

Editorial proposals: identification in week 13, corroboration/plan in 14; earlier commitment windows; named favourite places for the three main women; clearly marked independent interludes. These elaborate existing recommendations, not new approved runtime rules. Do not add new magic rules, punitive authority consequences, different endings or cast relationships without discussing a material direction change.

## Refined pilot specification: shared_1 — 28 October 2026

User-authorized English-first pilot; supersedes only the draft shared_1 row's level of detail. English source: `locales/opening.en.ts`; Hungarian translation: `locales/opening.hu.ts`. Implementation keeps the assembled 28-node graph, semantic keys and both choice IDs.

- **Purpose/window:** week 1's compulsory shared slot, no prior scene/evidence. Make the workshop a place the player wants to return to and establish three distinct sources of curiosity before the mystery begins.
- **Cast/location:** player (`marton`, teacher/study director, 34), Rebeka (20), Boglárka (19), Gréta (21) in the classroom. Soma briefly arrives with storeroom keys after the exercise and leaves after agreeing to tomorrow's lamp check. No archive destination or suspicious witness reaction.
- **Entry knowledge:** player already practises mystical gymnastics but is teaching it here for the first time. Gréta knows the booking error and faulty lamp; Rebeka knows the leaflet and wants photographic material; Boglárka studies local movement variants and did not write the leaflet. Soma knows the equipment task. Nobody knows about disappearances, a culprit or any vampire rule.
- **Emotional beats/information order:** rainy arrival and player introduction → practical Gréta, challenging Rebeka, precise Boglárka introductions → cable/trip-report/crooked-circle banter → complete response to Rebeka and concrete grounding instruction → chosen demonstration style → shared attempt, distraction noticed and return → ordinary assistant interruption and lamp exchange → three different reasons to linger. Competence becomes playful openness, then warmth; no forced romance or new magical spectacle.
- **Choices:** `demonstrate` invites distraction and then group practice; Rebeka teases the named player, Boglárka jokes about stillness, Gréta times. `observe` permits watching first, honest criticism and a later voluntary attempt; Gréta can remain by the chairs. Reactions describe the immediate setup, never events not yet reached. Both converge on the next round; no bond/effect/decision difference is added.
- **Exit facts:** completion alone witnesses `grounding`, completes shared_1 in week 1 and spends exactly the shared slot. Grounding notices diverted attention, does not restore memories and grants no invulnerability. Everyone retains individual interests; no commitment, new clue or villain knowledge. Later grounding consumers and shared_2 prerequisites are unchanged. The subsequent shared_2 continuation removes the former suspicious Soma material; see its refined brief below.
- **Name/localization:** first-person narration and `{playerName}` in arrival, teasing address and journal; stable `marton` actor/bond IDs. Both choices, reactions, journal/recap and grounding description are bilingual. Literal name interpolation never interprets replacement syntax, HTML or nested variables. Existing proper-name accents stay intact.
- **Departure/callbacks:** no added cross-scene promise or decision. Photograph of the empty circle and request for the movement source leave room for existing first individual meetings; room booking and tomorrow's lamp check retain mundane college continuity.
- **Review gate:** no major story/character departure needed. User literary acceptance remains open; visible magical workshop effects require a separate agreed mechanic and are intentionally unresolved.

## Refined continuation briefs: shared_2 and shared_3

Authorized continuation of the English-first pilot, 28 October 2026. Canonical English first, Hungarian translated afterward. Preserve scene/line/choice IDs, completion-only evidence, effects and schedule; current unresolved later clue/timing proposals are outside this batch.

### shared_2 — A Missing Evening

- **Purpose/window:** week 2 shared slot, after shared_1. Warm workshop acquaintances become worried about a familiar college colleague; practical help replaces interrogation preparation.
- **Cast/entry:** player, Rebeka, Boglárka and Gréta at the department, joined by Dénes for a private update. They know the first exercise and each other's interests; no disappearances, culprit or supernatural cause is established yet. Soma is only mentioned as having completed the ordinary lamp check promised in shared_1, without moving that promise to a different week. He is not physically present, so neither dialogue nor a transformed portrait spotlights him.
- **Beats:** imperfect-circle photograph banter and Gréta's room readiness → Dénes arrives, office door closes → Rebeka asks about Lilla's visibly difficult return → Dénes gives the limited account Lilla asked him to relay → player chooses how soon to offer company → concrete immediate action → one common next-morning message arranging next week's library meeting.
- **Branches:** `ask` sends the player's number through Dénes now; `space` leaves the invitation until tomorrow. Both are ordinary care, not competing moral answers. Reactions stay in the present. Branches do not narrate the future reply; the common exit does so exactly once.
- **Exit/dependencies:** only `returned_lilla` is earned; exhausted return and missing evening established, no link to Soma. No recovered memories or promised cure. Same shared slot and unchanged shared_3 prerequisites. Journal/knowledge/reactions are locale-resolved references; chosen name remains literal. Scheduling of the next meeting is explicitly next week, not an immediate scene disguised as a new weekly activity.

### shared_3 — Ten Minutes, No Recording

- **Purpose/window:** week 3 shared slot, after shared_2 with grounding/returned_lilla. Give Lilla a personhood beyond testimony while establishing the existing repeated phrase and missing time.
- **Cast/entry:** player, Lilla, Rebeka, Boglárka and Gréta in the library at the arranged meeting. Lilla knows her own partial account; the others know only the limited shared_2 update. No known voice owner or culprit.
- **Beats:** Lilla sets ten minutes/no recording once → Rebeka puts camera away → Lilla chooses door-side chair and Gréta moves hers → notes and Lilla's dislike of a label → player chooses narrative or timeline starting point → one connected account with two hearings of the same phrase → existing card-log times, unresolved gap → Lilla ends meeting → coffee and a quiet wait for Dénes rather than a second privacy speech.
- **Branches:** `listen` starts with returning a book, broken scanner and tape detail; `timeline` corrects the date to Wednesday and starts from a remembered ordinary library action. Both lead into the same invitation account without retelling an already narrated staircase encounter. Preserve unknown speaker and no invented clue.
- **Exit/dependencies:** only completion witnesses `phrase` and `time_gap`; quote and 20:34/06:12 remain available to shared_4. No identity, pattern or extra evidence. Notes use Lilla's requested initial; she edits them by action. No repeat permission questions. Chosen-player-name address, reactions, journal and relevant knowledge render in both languages. Later shared_4's photograph/time discrepancy remains unmodified and is tested as a continuity boundary.

## Shared-scene briefs
All shared scenes occupy their fixed week's guaranteed slot. Cast lists describe intended focus; final authoring must explicitly resolve entrances/exits and every speaker. Knowledge listed is witnessed campaign information, never guessed from a skipped optional scene.

| ID / place / focus cast | Entry → concrete beats and emotional turn | Choice / exit and dependency |
| --- | --- | --- |
| shared_1 / classroom / player, Rebeka, Boglárka, Gréta; brief Soma | Strangers → prepare imperfect room, preserve cable/banter, establish each woman's reason to stay; complete understandable workshop instruction. Soma has mundane assistant business. | Demonstrate or observe; both teach grounding and create curiosity. No ominous basement exit, accusation or promised romance. |
| shared_2 / department / player, women, Dénes; brief Soma only if needed | Workshop acquaintances → an ordinary meeting is disrupted by news of Lilla's exhausted return; distinguish today's update from tomorrow's reply. | Ask for meeting or give space; both respect her agency and establish returned victim, not suspect identity. No public confidential disclosure. |
| shared_3 / library / player, Lilla, women | Lilla agrees to talk → let her choose chair and starting point; show one account of invitation, missing time and remembered phrase. | Listen or construct timeline; record only what she shares. Unknown voice remains unknown. End with a human need beyond testimony. |
| shared_4 / library / player, women, Júlia | Accounts incomplete → reconcile one concrete photograph/time discrepancy through an activity, with contrasting reactions. | Decide next practical check; reliable timeline exits, no culpability. Compress record-handling exposition. |
| shared_5 / Holdkör / player, women; Áron arrives later | Familiar place → borrowed voice interrupts ordinary activity. Show Boglárka actually asking the unanswered question. | Ground together or withdraw; witnessed repetition/limit, not new magic immunity. Safety changes how they leave. |
| shared_6 / courtyard → private conversation / player, women, Dénes | First uncanny encounter → second return confirms pattern; establish who leaves before confidential discussion. Give someone a concrete reason to seek company afterward. | Prioritize immediate support or arranging a check; common exhaustion/time-loss pattern, no Soma spotlight. |
| shared_7 / library / player, women, Júlia, Áron | Pattern known → examine damaged transformation source. Its incomplete physical form creates an obstacle; preserve archival access succinctly. | Copy fragment or pursue reference; ritual hypothesis, not identity or proven motive. Remove named loan-history culprit shortcut. |
| shared_8 / classroom / player, women | Dangerous pattern but unknown cause → workshop practice and an ordinary shared task expose different priorities. Discuss a practical information-sharing approach. | Disclosure stance can be recorded without speeches about romance gates. Each participant chooses involvement; optional relationships remain separate. |
| shared_9 / department / player, women, Áron/Dénes | Unexplained pattern → check timing/access detail that admits more than one ordinary explanation. Make it retrospectively meaningful. | Choose next check; uncertainty narrows but identity stays unearned. Existing identity evidence consumers require migration. |
| shared_10 / college shared space / player, women; incidental Soma | No known culprit → a concrete college event enables chemistry and exposes a practical consequence of missing time. Soma remains ordinary background. | Prioritize helping someone or preserving an observation; no confession, bribe or villain conversation. Exact event is an open scene-design detail. |
| shared_11 / workshop / player, women | Known repeated phenomenon → practise established grounding against a safely controlled, understood stimulus; one attempt needs adaptation. | Choose cooperation method; learn an observed limit without a vampire performing a demonstration. No added mind-reading/affection magic. |
| shared_12 / library / player, women, Júlia | Fragment/observations available → connect known limits to existing anchor/completion danger; explain what is supported versus inferred. | Choose practical readiness focus; establish enough danger knowledge for two preparation activities before certainty about culprit. Exact mechanics must match agreed canon. |
| shared_13 / relevant college location / player, women, helpers | Previously planted independent details → fair late identification of Soma, not accusation by intuition. Specify clue sources before dialogue drafting. | Decide immediate safe response; identify culprit/location without giving him five weeks of tolerated access. No dependence on romance or Virág. |
| shared_14 / classroom / player, women, helpers | Corroborated identity/danger → brief motive evidence and concrete evacuation/intervention plan, with actual assignments. | Choose approach with visible later callback; no last-minute magical weakness. Keep preparation optional and weak-preparation path viable. |
| shared_15 / chamber / player, available established helpers | Plan → execute simultaneous tasks, encounter complication, show consequences of preparation and chosen approach. Soma's deliberate motive becomes clear without long monologue. | Actual action choice changes participation/cost, not canonical death. Immediate exhaustion/relief and exit establish aftermath; no instant explanatory flag summary. |
| shared_16 / department / player, women, relevant officials | Vampire dead → disclose what happened and show acknowledgment/limited response/suppression changing people's situation. | Existing disclosure/evidence outcomes remain intelligible; corruption reporting distinguished from supernatural acknowledgment. Unlock personal follow-ups only afterward. |

### Knowledge and scheduling migration gate
The current runtime grants identity in shared_9 and transformation in shared_10. Those are current facts, not rewrite targets to preserve accidentally. Before implementation, map every evidence consumer, journal entry, choice, CLI observation and test to the new order. Never keep an early evidence flag merely to satisfy an old prerequisite. Rework shared_11–14 and preparation prerequisites together. Earlier preparation concerns danger, not a known culprit.

Do not silently change duration or add slots. Proposed earlier commitment access must be simulated against day/night constraints, two preparation activities in different weeks and triad requirements before adopting exact windows.

## Individual relationship briefs
Main women and player only unless specified; each optional scene needs its existing preceding witnessed relationship steps. Place assignments below are draft working settings from current profiles; maintain location/prop/stage continuity and do not claim new art exists. Refusal or no escalation must retain a worthwhile scene.

| ID | Purpose, activity and emotional turn | Choices / exit / continuity |
| --- | --- | --- |
| rebeka_1 | Classroom photograph banter; challenge polished self-presentation and establish mutual interest. | Concrete image-based response, not generic praise test; remember only chosen topic. |
| rebeka_2 | Holdkör screening/shared images; let player and Rebeka enjoy something imperfect together. | Preserve “two calm people” callback if witnessed; attraction comes from exchange, not correct answer score. |
| rebeka_3 | Date moving from public lakeside to explicitly chosen quieter place; playful performance gives way to private vulnerability. | Separate hand-holding, moving, kissing and further intimacy invitations; fade if chosen, coherent aftermath. No camera contradiction or location reset. |
| rebeka_4 | Holdkör tension about being seen versus displayed; conflict must arise from witnessed conduct or her own stated worry. | No compulsory invented privacy violation/quotation. Listen, disagree or acknowledge actual action; repair is possible without instant emotional reset. |
| rebeka_5 | Choose ordinary future time together, e.g. a film plan, before confrontation consumes attention. | Personal direct answer and separate commitment/decline; proposed earlier access remains scheduling work. No copied future aftermath text. |
| rebeka_6 | After institutional scene, return to a concrete shared plan changed by what happened. | Continue, reconsider or part; conditional coffee/date callback, never falsely “first meeting.” No automatic intimacy before relationship choice. |
| boglarka_1 | Library encounter: enthusiasm and dry humor emerge through a passage she chooses. | Listen or engage with a concrete idea; she initiates part of exchange, no infantilizing timidity. |
| boglarka_2 | Window alcove reading/bookmark activity becomes pleasure rather than research performance. | Different interpretations remain valid; chosen detail can return later. No investigative evidence reward. |
| boglarka_3 | Deliberately set work aside; quiet mutual desire can become a date. | Ask whether to stay/move/approach separately; quiet companion branch equally coherent; no automatic escalation. |
| boglarka_4 | A specific difference in expectations about sharing or silence becomes speakable. | Ground any callback in played choices; let her disagree precisely, without copying Rebeka's privacy-offence structure. |
| boglarka_5 | She proposes something she wants beyond work; discuss a relationship in concrete terms. | Affirmative commitment or alternative, no requirement to become louder/more extroverted. |
| boglarka_6 | Aftermath in a quiet familiar place; choose what to carry into ordinary life. | Distinct future plan, optional closeness after choice, acknowledges any prior post-climax meeting. |
| greta_1 | Office/map/spare-key exchange reveals competence and abandoned personal plans. | Preserve concrete humor; player notices a desire beyond usefulness. |
| greta_2 | Trail detour or stone-skimming creates enjoyment with no organizational deliverable. | Let her set absurd rules then change them; record specific shared joke. |
| greta_3 | Imperfect lakeside date/picnic; she chooses company over fixing everything. | Player joins activity rather than rescues her; stage private movement/affection separately. |
| greta_4 | Interruptions or practical expectations create a specific tension. | Do not assign unseen player wrongdoing; she can ask for company without becoming administrator of everyone's feelings. |
| greta_5 | Deliberately reserve time for each other; direct admission keeps her energetic voice. | Commitment distinct from helping with duties; widen access only after schedule review. |
| greta_6 | Lakeside return after institution's response; show a changed habit and a feasible future outing. | Continue or part without professional punishment invented by author; no recycled pre-climax exchange. |

## Triad briefs
Preserve Rebeka–Boglárka as an independent bond, not a reward delivered to the player. Entry requirements include witnessed separate agreements; proposed interlude framing remains an explicit editorial decision. Never copy private interlude knowledge into player's journal until shared.

| ID | Focus cast / purpose and turn | Choice / exit |
| --- | --- | --- |
| triad_1 | Player, Rebeka, Boglárka in library: notice distinct tastes through shared activity, not triangle declaration. | Join or give room; no inferred attraction/commitment from politeness. |
| triad_2 | Same cast: a small disagreement lets the women relate directly. | Respond without speaking for either; leave space for their separate bond. |
| triad_3 | Rebeka and Boglárka: private exchange where each expresses her own interest. | If retained as interlude, label viewpoint; information stays local until communicated. |
| triad_4 | Women continue their own conversation and decide what to share. | Separate affirmative decisions, not one woman's answer standing for both. |
| triad_5 | All three, after individual tensions handled: discuss distinct wishes and uncertainties. | Each speaks separately; no game-rule lecture or assumed consent from route selection. |
| triad_6 | Apartment only with established invitation: negotiate one concrete shared evening and room for separate bonds. | Three independent agreements; uncertainty/refusal has coherent exit without forfeiting unrelated story. |
| triad_7 | Live an ordinary evening with different contributions and playful friction. | Mutually chosen closeness, separate move/escalation decisions, fade and aftermath if chosen; preserve night-only constraint unless separately redesigned. |
| triad_8 | After shared_16: address how all three continue, with differentiated reactions to danger. | One consolidated aftermath supports both personal bonds in available slots; reconsideration does not erase other participants' voices. |

## Preparation and friendship
| ID | Cast / intended scene | Exit and checks |
| --- | --- | --- |
| prepare_backup | Player and relevant helper at department: actually assemble/store a backup and identify who can retrieve it. | Evidence resilience, not affection. Day only; separate week from other preparation. |
| prepare_signals | Player and willing helpers at classroom: show precise signal, missed attempt and adjustment. | Practised coordination; no instant mastery or new supernatural power. Day only, separate week. |
| friendship_after | Player and available friends after shared_16: ordinary future contact without romance. | Distinguish witnessed reunion plans from generic possibility; friendship is worthwhile, not failure consolation. |

## Contextual coffee briefs
Coffee never grants romance commitments. Main cast for each: player plus named woman, normally courtyard unless a later explicit staging choice changes it. Early/middle/late are existing runtime windows, not guarantees a player saw an earlier coffee.

| ID | Concrete focus | Memory / exit |
| --- | --- | --- |
| coffee_rebeka_early | Photograph she would take without judging/competition. | Chosen project topic becomes optional callback. |
| coffee_boglarka_early | Invent a marginal character's ending in a book. | Remember only if discussed; she keeps her own interpretation. |
| coffee_greta_early | Twenty minutes without a task or timer. | Optional detour idea can recur. |
| coffee_rebeka_middle | Unsubmitted small photograph replaces grand plan. | Conditional parking-garage callback; ordinary warm alternative if missed. |
| coffee_boglarka_middle | Second tea; a concert or pleasure beyond scholarship. | Conditional invented-ending callback, not quiz on unseen conversation. |
| coffee_greta_middle | Phone remains in bag while someone else closes office. | Conditional detour; imperfect snack/route lets her choose. |
| coffee_rebeka_late | After danger, put camera aside and complain about something small. | Do not force trauma discussion; set flag for later-meeting chronology. |
| coffee_boglarka_late | A book where a cellar is only a cellar; quiet return to ordinary attention. | Let silence/rest be chosen; no claim all distress is resolved. |
| coffee_greta_late | Someone else has keys; she can sit or walk without checking phone. | Low-pressure company; future aftermath must know whether this meeting happened. |

## Paid outing briefs
Player plus named woman. Keep costs/rewards in economy layer; purchasing time never purchases affection. Every outing has arrival, activity and departure and remains enjoyable without escalation.

| ID | Place / activity / change | Choice and continuity |
| --- | --- | --- |
| outing_rebeka_1 | Holdkör bad-film screening, rather than repeating introductory photo judgment. | React to a described film moment; shared joke, natural farewell. |
| outing_rebeka_2 | Photo walk with overlooked castle detail; each chooses a frame. | Concrete visual information supports choice; no public/private image misuse implied offscreen. |
| outing_boglarka_1 | Library passage exchange and playful marginal interpretation. | Disagree kindly, laugh or listen; no academic performance requirement. |
| outing_boglarka_2 | Put books away and listen to rain/read for pleasure. | Choose a shared pause; distinct from first reading exercise. |
| outing_greta_1 | Lakeside walk with invented stone-skimming scoring. | She can change plan without failure; no mandatory perfect outcome. |
| outing_greta_2 | Imperfect picnic/detour, weather only if already authored or approved. | Practical hiccup resolved with humor; no new weather system assumed. |

## Virág's separate eight-chapter track
Each scene: player and Virág, helpers only where already justified. She remains an adult independent reporter, not assessed by player. Her reporting succeeds independently, refusal never causes unwanted touch, and no exclusive commitment selector is added. After-hours school setting is confirmed; exact records-room access and chapter moves below are draft, requiring night-slot feasibility before implementation. Do not relocate all chapters to nighttime blindly.

| ID | Intended chapter turn | Choice / information boundary |
| --- | --- | --- |
| virag_1 | Hallway meeting; direct teasing and a concrete request establish attraction plus instrumental motive. | Help/refuse and intimacy/refuse are separate; no unchosen touch, no automatic access privilege. |
| virag_2 | Establish a legitimate way to share information and the limits of insider help. | Specific agreed help, no manufactured debt payable through intimacy. |
| virag_3 | School document search establishes first discrepancy in corruption case. | Observe actual record and joke; no vampire identity clue, no unearned legal/access assertion. |
| virag_4 | Break away from work at lakeside; show amusement beyond extraction of useful information. | Casual invitation or warm refusal; preserve her direct pace without commitment. |
| virag_5 | Consequence of her approach prompts a concrete accountability conversation. | Negotiate practical conduct, avoid interchangeable boundary lecture or compulsory player guilt. |
| virag_6 | Further after-hours comparison makes report credible through independent corroboration. | Reporting continues regardless of intimacy; school access/night scheduling unresolved. |
| virag_7 | Publication preparation with a personal decompression beat. | Keep source protection concise; no interactions with main women or gate on main investigation. |
| virag_8 | Report handoff/outcome and casual personal continuation, not final date/commitment milestone. | Warm contact, decline or optional private encounter; independent publication established for skipped-route epilogue. |

## Character reconciliation notes
Preserve existing profile authorities rather than creating competing biographies. Rebeka's wit hides exposure without making every exchange hostile; Boglárka has initiative and precise dry humor; Gréta's energy enables pleasure as well as practical care; Virág's direct casual pace remains distinct. Soma needs ordinary background texture, not added villain scenes. Lilla must have preferences beyond providing clues. Dénes/Júlia/Áron have concrete helper functions, not consecutive speeches repeating policy.

Current profiles name favourite places more firmly than the master plot labels their approval. Treat them as draft working assignments until confirmed. Reporter publication names differ between contributor/character material; reconcile the canonical name before dialogue translation, not by silently inventing a new outlet. Player's fixed role remains teacher/study-director; chosen name changes references, not actor IDs or role.

## Before the first scene rewrite
For each row add exact entry knowledge, stage/cast transitions, beats, branch-specific text and exit facts. Select definitive clue chain and magical demonstration within existing limits. Resolve viewpoint framing and material professional stakes with user if changing established direction. Confirm proposed timing and place assignments. Do not treat a brief as implemented code.

Then rewrite one scene with connected callbacks, not isolated lines; verify branches, name rendering, localization, staging, knowledge and save/resume. Re-run relevant complete routes plus contrasting refusal/weak-preparation paths. Findings-only baseline remains intact for comparison. No runtime or translation changes are included in this document commit.
