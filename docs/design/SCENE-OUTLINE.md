# Scene-by-scene rewrite outline


**Calendar precedence — 28 October:** The approved [52-week year](YEAR-CAMPAIGN.md) supersedes the sixteen-week anchors below. Existing numbered briefs retain chapter coordinates, projected through `content/calendar.ts`; shared_15 occurs in week 51 and shared_16 in 52. Opening weeks 1–3 are unchanged. New scene briefs should specify actual calendar weeks. Narrative rewrites and unresolved proposals remain distinct from this scheduling implementation.
> **Status:** First editorial draft, 28 October 2026; shared_1 pilot implemented; remaining briefs are not implemented or blanket approval. | **Purpose:** Translate the master plot into individual scene briefs for deliberate rewriting.

## Authority and boundaries
Read [master plot](STORY-REVIEW.md), [character voices](CHARACTER-VOICES.md), [visual authority](CHARACTER-VISUALS.md), [workflow](NARRATIVE-WORKFLOW.md), [baseline findings](PLAYTHROUGH-FINDINGS.md) and [runtime inventory](../SCENE-INVENTORY.md). Existing IDs below identify rewrite targets, not unchanged runtime prerequisites. This original draft covers 68 scene IDs; the additional holiday and seasonal scene briefs are maintained in [HOLIDAY-EVENTS.md](HOLIDAY-EVENTS.md).

Confirmed anchors: romance first; sixteen weeks; genuine mystical gymnastics; Soma peripheral until late identification; deliberate vampirism, fascination cannot compel affection; victims return exhausted with missing time; week-15 vampire death; week-16 institution then personal aftermath. Keep independent bonds, triad agreement and Virág's independent reporting/casual route. Player name always comes from saved chosen-name variable; use “player” here rather than baking a name into prose.

Editorial proposals: identification in week 13, corroboration/plan in 14; earlier commitment windows; named favourite places for the three main women; clearly marked independent interludes. These elaborate existing recommendations, not new approved runtime rules. Do not add new magic rules, punitive authority consequences, different endings or cast relationships without discussing a material direction change.

## Required connected relationship briefs — 29 October 2026

The [approved year-long progression](GAME-DESIGN.md#relationship-progression-across-the-year--29-october-2026) takes precedence over all older six-scene and ending-only intimacy briefs below. Existing rewritten scenes remain usable foundations, not a complete relationship arc. Before further route implementation, extend its connected brief with actual week windows for first optional sexual intimacy around the midpoint, several distinct later-half exploration meetings and ordinary affection, then commitment/aftermath. Record slower/refusal/already-intimate variants, witnessed memories, independent triad agreements, time gaps and feasible slot/prerequisite changes. Do not merely move `_6` earlier or promise off-screen encounters. Exact new scene IDs/counts and character-specific dates are to be authored; this requirement does not itself change runtime admission. INT2 in TRACKER owns delivery status.


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

## Refined shared_4 brief — 28 October 2026

Current request authorizes a story/dialogue continuation. **Seven Minutes**, week 6 mandatory library meeting; player, Rebeka, Boglárka, Gréta and Júlia. Entry: completed shared_3, phrase/time_gap; no suspect or supernatural cause known. English canonical, Hungarian translation.

Keep stable line_0–6 and separate/check choices, completion-only timeline evidence and existing requirements. Rebeka brings an empty-stair photograph, not a secretly taken Lilla portrait. Its camera time is seven minutes fast; Gréta brings the already established 20:34/06:12 log, independently checked clock. Boglárka uses L. and marks the end of what is known. Júlia contributes one short observation, not a policy lecture. Player either lays the corrected route out together or checks the two clocks first; distinct actions converge on the same bounded result. Never suggest the photograph proves somebody remained after disappearing. End with packing away the papers and ordinary company; no invitation that assumes a romance. Use literal player-name interpolation and bilingual reactions/journal/timeline label. New branch nodes are additive; stable existing cursor IDs and effects remain valid.

## Refined Rebeka first-date brief — 28 October 2026

Owning scene: `rebeka_3`; first implementation batch after shared_1–4. Read with the current baseline in PLAYTHROUGH-FINDINGS. English canonical, Hungarian translation; preserve stable choices/effects, chosen-name rendering and earned callbacks.

| Continuity check | Drafting contract |
| --- | --- |
| Actual time | `calendar.ts`/assembled catalog: weeks 16–50 inclusive, 14 January–9 September 2027, either day or night; winter/spring/summer/autumn possible. Old chapter coordinates 6–14 are not dates. No fixed weather, darkness, current screening or weekday promise. |
| Prior contact | Requires completed `rebeka_2`, attraction and no withdrawal; `_2` can complete from week 3 (15 October 2026). Contact gap can be the same week (the other slot) or up to 47 weeks. Acknowledge returning to the unfinished invitation without inventing dates/messages or previous optional outings. Baseline gap is 18 weeks. |
| Entry knowledge | Attraction is mutual; not yet committed. `rebeka_unpolished` callback only if witnessed. No assumed coffee, holiday, outing or public exhibition. The player has not necessarily kissed/touched her. Investigation knowledge varies across the long window and is not discussed here. |
| Physical state | Lakeside, player and Rebeka only; two coffee cups, no camera. Dispose of cups on the page before hand-holding. Clothed throughout. Optional walk to existing Holdkör; projector stays a room fixture, never a camera carried by Rebeka. Hand-holding is released before chairs; kiss is separately selected and answered. Return to lakeside junction before every farewell. |
| Change and exit | Rebeka discusses her changing photo sequence and the fear of turning herself into a polished story. Player can discuss a deliberately bad film, admit performance anxiety or recall witnessed nervousness. Both can enjoy company without touch. Invitation acceptance is distinct from physical pace; rejection ends without romantic gestures. No automatic deeper encounter. The next film is a possibility, not an invented off-screen date. |

Branches: `yes` → three authored conversation approaches → `hand|slow_touch` → independent destination → gated `kiss|stay_close|head_home` → return/farewell. Original `slow` rejects romance and grants withdrawal. Both physical paces retain identical bond progress. No extra slots or evidence. The personal observation about not having to show everything is spoken before the romantic choice so later `rebeka_4` can refer to it; the later scene's imposed presentation misuse remains an open issue in its own brief and is not newly approved by this batch.

Scope: MR-01/MR-04 only for Rebeka's first date; later MR-02/MR-05 remain next. Remove superseded explicit hand-branch nodes rather than padding them. Content epoch must advance because removed cursor IDs and locale-neutral persisted text change save assumptions; schema remains 4. No compatibility migration.

## Refined Rebeka commitment and aftermath briefs — 28 October 2026

Authorized next connected batch after the first date, addressing MR-02/MR-05 and bounded MR-09/11/12. English source followed by Hungarian translation. Preserve scene admission, original commit/continue/withdraw effects, separate triad agreements and one-slot completion. Replace obsolete graph nodes; increment content epoch, no migration.

| Continuity check | `rebeka_5` | `rebeka_6` |
| --- | --- | --- |
| Actual time | Weeks 48–50, 26 August–9 September 2027; day/night. Old chapters 13–14. Confrontation has NOT happened. | Week 52, 23 September 2027; either discretionary slot, after shared_16. Vampire death and institutional response are witnessed. |
| Prior contact | Requires `_4`, repair/invitation, eligible individual or affirmed triad direction. `_4` can happen in week 40–50; same-week or up to ten-week gap. | Requires `_5` and commitment, individual Rebeka direction only. Commitment gap two–four weeks; optional late coffee might already have happened. Never claim first reunion. |
| Entry knowledge | The presentation dispute has been addressed in `_4`. Do not invent later meetings, messages, exhibition opening or survival. No exclusive promise on triad route. | Actual investigation order is complete; preparation/report outcomes vary. No assumed total recovery, public acknowledgment, or new exhibition. Only witnessed future-plan/late-coffee callbacks admitted. Earlier slow-touch choice was for that date, not permission for future touch. |
| Physical state | Two people in courtyard; Rebeka's own film shortlist provides activity. No touch assumed. Lighting follows saved slot, no fixed weather. | Courtyard, two people, film shortlist revisited without claiming an intervening screening. Optional mutually invited visit to the player’s suite uses existing apartment bedroom art; no invented Rebeka-room or living-room art. Every stage/branch explicit. |
| Change and exit | Discuss wanting ordinary time without performing; distinguish relation from an impressive occasion. Affirm commitment or decline. Commit then choose recurring ordinary company or player's next invitation, with separate witnessed memories. End before danger, naturally parting; no fixed weekday/date/extra activity. | Ask how being together feels after danger, without rehearsing commitment dialogue. Continue or part BEFORE touch. Optional plan/coffee callbacks and neutral conversation. Separately choose private visit, kiss, further intimacy; reconsideration at each point. Fade to black only after mutual affirmative choice; worthwhile quiet visit and departure alternatives. Recovery not cured by romance. |

`_5`'s film list is her own activity, not an invented shared date or a new favourite-location decision. `_6` can return to this witnessed prop regardless of which plan was chosen; choices recall `rebeka_future_ordinary`, `rebeka_future_ask`, or completed late coffee only where earned. All touch follows present choices. Withdrawal leaves without a kiss, private visit or continuation reward. Neither scene grants investigation evidence. Text, choices, reactions, stages and journal are bilingual and use the saved player name literally.

## Refined Rebeka disagreement brief — 28 October 2026

Next individual pass after `_5`/`_6`, addressing MR-09 and the original `_4` imposed-offence finding. `rebeka_4` keeps its stable admission/effects/slot; its `repair` decision now witnesses an honest disagreement and a practical agreement, not an unchosen privacy violation. Scene IDs still identify milestones, not a mandatory wrongdoing template. New graph/persisted text requires content epoch 9.

| Continuity check | Drafting contract |
| --- | --- |
| Actual time | Weeks 40–50, 1 July–9 September 2027, day/night. After `_3` in weeks 16–50; same-week to 34-week gap. Not the old week-9 date. No fixed weather or current screening. |
| Entry knowledge | Both chose the date; only its always-witnessed remark about not showing everything is available. No assumption of hand/kiss, intervening dates, coffee, gifts, exhibition or publication. The investigation varies with date and stays outside this personal conversation. |
| Physical state | Two people in existing Holdkör screening room, projector off; Rebeka's own print and caption draft on table. No carried camera or newly invented room. Explicit table/gate departure. |
| Want and disagreement | Rebeka has been working on her photo sequence herself. She nearly used the player's lakeside remark as a caption, then crossed it out. She wants an honest opinion, but fears that being seen by a partner means being judged like a submission. Player's initial easy reassurance misses the request; she corrects him. Nobody is assigned an off-screen misuse. |
| Choices and change | Engage concretely (`repair`) or end romance (`withdraw`). Engagement branches into examining an actual frame together or the player admitting the urge to sound certain; different reciprocal exchanges, no forced confession of past misconduct. Rebeka chooses a provisional caption herself, still unsettled but willing to meet. Neither a gift nor a kiss repairs the disagreement. |
| Exit/dependency | Put print/draft in her folder and leave Holdkör; part without invented meeting date. Preserve original +8 bond/repair or withdrawal effect and `_5` admission. `_5` no longer refers to an unplayed correction. Full bilingual title/text/choices/reactions/stages/journal, literal chosen name. |

## Refined early Rebeka briefs — 28 October 2026

Connected two-scene early-arc pass after `_3–6`; English canonical/Hungarian translation. `_1` is a concrete choice among first-workshop prints (blurred hand/window/empty circle), not a praise test; `_2` includes a knowingly terrible film moment before attraction is discussed. Preserve original interest/attraction/withdrawal and topic-memory IDs/effects, single-slot cost and existing admission. New graph/persisted strings require content epoch 10.

| Continuity check | `_1` | `_2` |
| --- | --- | --- |
| Actual time | Week1–50 (1 October 2026–9 September 2027), day/night; requires shared_1. Its workshop pictures can be old by the time they are shown. | Week3–50 (15 October 2026–9 September 2027), day/night; requires `_1` interest/no withdrawal. Same-week contact or up to 49 weeks since `_1`; no “last night” or off-screen shared contact. |
| Entry/props | Player/Rebeka only, classroom, physical prints from that first workshop, tea/coffee/holiday/other meetings not assumed. No known culprit/romance assumed. | Two people in existing Holdkör screening room; projector/film belong to this current activity, not an unseen earlier shared date. Camera isn't brought into the exchange. `_1` print choice may differ. |
| Activity/turn | She asks player to choose a frame. Blurred-hand response discusses movement/personhood; window response discusses her own missed moment; she reveals a jury note without player rescuing her. Interest develops through a particular disagreement; leave ends normally. | They watch a brief absurd stairs scene, disagree playfully and let credits finish. Her joking certainty cracks into an honest attraction invitation. Player reciprocates with nervousness (`honest`) or asks what made her curious (`curious`); no invented bus conversation. `friend` declines romance and parts without touching. |
| Change/exit | Keep working title and possible fourth image, her initiative and control of the print; part without invented promised date. `_2` prerequisites unchanged. | Preserve `rebeka_unpolished` and `rebeka_small_moment` only on their selected branches. “Two calm people” and a voluntary next invitation connect to `_3`; no fixed date or physical escalation. Close projector/show departure before farewell. |

Chosen name is literal, first-person narration avoids hardcoded player identity. Both scenes remain worthwhile without romance. No new favourite-location assignment, art, magic, investigation evidence or automatic off-screen event is introduced.

## Refined Boglárka date and aftermath — 28 October 2026

Authorized continuation, bounded to `boglarka_3` and `boglarka_6` for MR-01/MR-02. Canonical English then Hungarian translation; retain admission, one-slot cost, investigation independence, invitation/withdrawal/aftermath effects and distinct triad affirmations. Replace incompatible cursors and increment content epoch; no engine changes.

| Check | `boglarka_3` | `boglarka_6` |
| --- | --- | --- |
| Actual time | Weeks28–50, 8 Apr–9 Sep2027; day/night. Old chapter7 is not week7. | Week52, 23 Sep2027, day/night, after shared_16. |
| Prior contact | `_2` earliest week6, may finish in same week as date; no fixed elapsed gap or assumed concert attendance. | `_5` weeks48–50; optional late coffee may have happened in week51 or earlier slot52. Do not claim first post-danger meeting. |
| Entry knowledge | Mutual attraction, no commitment; quiet-topic callback only with `boglarka_quiet`. Mandatory chapter7 already played. | Commitment and institutional aftermath witnessed; music/invitation future memory only when chosen in `_5`; coffee only when completed. |
| Physical state | Courtyard, two people initially apart; her own book stays in her bag. Optional library window alcove within existing access; no invented closing hour or clothes/weather assumption. | Courtyard, her submission receipt on phone; books remain at home. Optional visit is to player's existing suite, no invented living room or library bed. |
| Change/exit | Show quiet woman enjoying loud music and deliberate invitation; reciprocal nervousness/music choices. Accept date or end romance; kiss or no touch, optional library company, second kiss only after earlier chosen kiss, then return and goodbye. | Submission is not acceptance/publication. Ask for ordinary future company; continue or withdraw before touch. Conditional music/concert/coffee callbacks with fallback. Courtyard or suite; talk/kiss/depart; separately chosen fade, reconsideration and ordinary aftermath. Natural exit without automatic next-day plans. |

Each branch gets a specific response. A no-touch date preserves romantic progress. The final meeting responds to her authorship and chosen pleasures without repeating the commitment speech, inventing a joint concert, or claiming the danger made everything worthwhile. Independent Rebeka–Boglárka content and unresolved late-Soma migration remain unchanged. Next connected pass: `_4`/`_5` conflict and commitment continuity, then `_1`/`_2` English-first arc.

## Refined Boglárka disagreement and commitment — 29 October 2026

Approved continuation of her connected arc, `_4`/`_5`; English first, Hungarian translation. Do not invent a player offence or an off-screen successful repair meeting. Preserve original repair/commit/withdraw effects and triad eligibility. This pass replaces their assembled graphs, not the investigation or schedule.

| Check | `_4` | `_5` |
| --- | --- | --- |
| Actual time | Weeks43–50 (22 July–9 September 2027), either period; old chapter10. | Weeks48–50 (26 August–9 September 2027), either period; old chapter13. |
| Prior contact | `_3` completed, possibly in the same week; may be many weeks earlier. Music was heard on every accepted date; no optional coffee assumed. | `_4` repaired, possibly in the preceding slot; no fixed elapsed gap or subsequent group meeting assumed. |
| Entry | Mutual attraction/invitation, no commitment; her unfinished article and ability to disagree matter. | Repair witnessed, direction chosen, triad affirmations required on that route. No confrontation or submission yet. |
| Physical state | Two drafts at library table, folder and tea; both present, no touch. Papers leave with Boglárka; goodbye at library doorway. | Courtyard, folded draft in her bag. No seasonal clothing/weather assumptions. Goodbye at adjacent gallery entrance, no invented travel. |
| Change/exit | A present disagreement about leading with a story or argument reveals her fear of dismissal and wish to be liked. Player tries two distinct readings; she revises without surrendering authorship. Continuing the relationship is a separate choice from editorial taste. Withdrawal has an ordinary departure. | She names her wish for a relationship without academic excuses. Commit or withdraw; commitment chooses music or a concert invitation, recording original future memories. Plans remain unscheduled, article unfinished; `_6` later supplies submission and actual continuation. |

Retain distinct voices: precise observation, dry tea joke, self-directed revision, reciprocal player admission of procrastination. No forced apology, permission ritual, automatic touch or supernatural clue. `_1`/`_2` remain the next English-first connected writing targets.

## Refined early Boglárka briefs — 29 October 2026

Authorized next connected batch: `_1`/`_2`, canonical English followed by Hungarian translation. Preserve the existing admission, original interest/attraction/refusal effects and `boglarka_quiet`/`boglarka_listening` memories consumed by later dates. No new evidence, third-party scandal resolution, off-screen messages or relationship milestones.

| Check | `boglarka_1` | `boglarka_2` |
| --- | --- | --- |
| Actual time | Weeks2–50, 8Oct2026–9Sep2027; day/night, after shared_2. | Weeks6–50, 5Nov2026–9Sep2027; day/night. |
| Prior contact | Workshop witnessed; no prior private meeting, coffee or source-help assumed. | `_1` interest witnessed, may be same week/preceding slot or many months earlier. No fixed yesterday/last-week claim. |
| Entry knowledge | Her own collection and credited-name grievance are personal work, not vampire evidence. Player knows only what she shows now. | She still owns an unfinished article; the player engaged with either her wording or letter. No presumed chosen first branch or romance. |
| Physical state | East-wing ground-floor library table; folktale transcription, circulated draft, correction-letter drafts, pencil and her folder. Both seated apart; no outfit/weather assumptions. | Two chairs in library window alcove, two cups she brings and her own paperback containing a loose handwritten bookmark. No weather or lake sightline claimed. |
| Change/exit | Read a particular folklore passage before discussing credit. Two approaches: remove apologies from correction letter, or defend the original “perhaps.” She writes one concrete sentence, keeps her papers and initiates the goodbye. Refusal returns requested book and ends normally. No letter sent or dispute resolved on player's behalf. | She invites playful rival interpretations of her own bookmark, then plainly names attraction. Yes leads to quiet/shared-nervousness replies with existing memories; friendship accepts disappointment without touch. Pack away book/cups and part at library door; proposed next invitation has no fixed date. |

Show precision and dry humor without making her permanently defensive. A folktale passage is invented ordinary reading, explicitly unrelated to the disappearance investigation; do not insert a clue, new magical rule or completed off-screen shared encounter. No physical escalation in either scene. Every branch uses the same present props and a natural departure; later `_3` retains the first date/kiss and `_6` the eventual submission.

## Refined Gréta date and aftermath — 29 October 2026

| Continuity | `greta_3` | `greta_6` |
| --- | --- | --- |
| Actual time | Weeks28–50,8 April–9 September2027; day/night. Old chapter7. | Week52,23 September2027; day/night, after shared_16 and commitment. |
| Prior contact | Completed `_2` and attraction; potentially same week or months apart. No assumed coffee, holiday, off-screen date or fixed deadline. | Completed `_5`, mandatory confrontation and institutional response; no claim this is their first meeting since danger. |
| Entry | Her practical initiative and mutual interest; no new clue or relationship guarantee. | Existing commitment; uncertain emotional recovery, institutional outcome not invented. Only chosen future memories become callbacks. |
| Physical state | Two adults at lake; paper bag of rolls, phone silenced. Eat, choose stones or disastrous-walk story; hand-holding distinct from courtyard kiss. Park walk takes roughly12minutes. Bags stay accounted for, clothing unspecified across seasons. | Lake bench, bag/flask/two cups; separate continuation decision before any closeness. Optional suite is player's existing room, reached via17-minute park walk; no office/room teleport. |
| Change and exit | Enjoy failure together instead of making a task succeed. Decline romance, hold hands or walk without touch; courtyard talk/kiss/departure. Goodbye at lake or courtyard; one slot. | Choose relationship continuation/withdrawal, then small outing plan; lake company or suite. Suite conversation, kiss, further intimacy and stop are separate choices. Chosen intimacy fades to black with tea afterwards; natural goodbye. One slot. |

English canonical, Hungarian translation, literal player-name substitution. Stable original invitation/withdrawal/aftermath effects and scheduling retained; hand/slow/kiss memories retain their bounded meanings. No new mystery, favourite-place assignment, seasonal art or authority consequence. Date kiss remains unavailable after choosing no touch. `_4`/`_5` still need their coherent disagreement/commitment pass; do not imply it was completed here.

## Connected Gréta annual expansion plan — 29 October 2026

This selected-route plan implements the INT2 planning prerequisite. Proposed exact windows below are editorial targets within the approved year/relationship direction, **not shipped scenes or a new mechanic**. Retain one slot per completed meeting and independent investigation. Do not gate optional intimacy on week48 commitment or an exclusive direction.

| Phase / actual weeks | Existing / addition | Dependencies and personal development |
| --- | --- | --- |
| Interest2–16, attraction10–24 | `_1`/`_2` exist; bilingual/elapsed-time pass still needed. | Preserve her practical energy, chosen pleasures and interest/attraction effects. Optional coffee/events need not have happened. |
| Date24–30 | `_3` currently opens28; review opening24 when adding midpoint continuation. | Attraction, invitation and bounded hand/kiss/slow history. Retain imperfect picnic; no inferred touch. |
| First private time26–32 | Add one optional meeting after completed date/invitation; no commitment/direction prerequisite. | Shared quiet after an imperfect activity; separate suite invitation, present kiss/further intimacy/stop/company choices, fade and aftermath. Completion-only history must distinguish intimacy from company and refusal; invitation alone is insufficient. |
| Ordinary company33–37 | Add a food/detour meeting after private-time meeting, any physical outcome. | Re-entry without invented off-screen contact. First-time, already-intimate and slower/no-sex branches; choose something neither needs to organize. No obligation to repeat sex. |
| Exploration38–42 | Add a reciprocal personal-choice meeting after company. | Let Gréta ask for something she finds difficult to request; player can express a preference. Separate physical invitation and aftermath; preserve ongoing romance without sex. No new magical power or clue. |
| Disagreement43–50 | `_4`, repaired in this batch. | Current entry remains completed `_3`/invitation; future additions must stay optional so skipped meetings do not block main route. A present conflict over turning leisure into work, no assumed sexual history. |
| Exploration44–47 | Add another meeting after company, independently of `_4` timing. | A different shared activity, own choices, callback to witnessed intimacy/pace only; time together is not a commitment reward. Explicit goodbye and next callback. |
| Commitment48–50 | `_5`, repaired in this batch; existing direction gate retained. | Relationship answer, distinct future ordinary-time/asking memories. No first-intimacy unlock. Do not claim skipped additions occurred. |
| Aftermath52 | Existing `_6`; update when new witnessed histories exist. | Confrontation51→institution52→personal follow-up. Continued/withdrawn relationship precedes physical choice. First-time/private-company/already-intimate histories need distinct wording. |

Implementation dependencies: register new stable scene/decision IDs, bilingual text and journals; inspect decision validation/consumers; keep generic engine unchanged. Existing date minimum28 permits midpoint continuation28–32 without retiming; only widen to24 if earliest/latest itinerary review justifies it. Before additions, validate proposed scenes with 104-slot budget, skipped holidays, late catch-up, no-sex route, locale/restart and compatibility epoch. Triad is independent: no Gréta dependency or assumed Rebeka–Boglárka history. Rebeka/Boglárka/triad/Virág require their own connected plans. INT2 remains Planned until actual additions and midpoint→two later meetings→ending runs pass.

## Refined Gréta disagreement and commitment — 29 October 2026

| Continuity | `greta_4` | `greta_5` |
| --- | --- | --- |
| Actual time | Weeks43–50,22 July–9 September2027; either period, old chapter10. | Weeks48–50,26 August–9 September2027; either period, old chapter13. |
| Prior contact | Completed date/invitation, potentially same week or months earlier; optional coffees/events skipped. | Completed `_4`/repair, direction Gréta; may follow in same week or later. |
| Entry knowledge | Mutual attraction and chosen date only. No assumed kiss, sexual history, announcement or player misconduct. | Present disagreement was worked through. No invented yesterday meeting, off-screen repair or post-confrontation recovery. |
| Physical state | Courtyard bench; Gréta brings her own leisure route card with too many stops. No office file or group-message prop. Both remain apart; no automatic touch. | Courtyard bench; two ordinary rolls in her own bag, no tasks or map required. No season-specific clothes/weather; one existing location. |
| Beats/change | Her plan makes leisure another performance; player honestly dislikes rushing. She hears rejection of her company; clarify without a ritual apology. Choose fewer stops or acknowledge player's own habit of optimizing. She crosses out her own additions; equal participation rather than rescue. | Share lopsided food, each names a want. She asks to keep seeing each other when no one is useful. Choose commitment/refusal, then ordinary-time or asking-before-planning memory; future outing is not falsely completed. |
| Exit/consumers | Repair or withdrawal retains original effects and slot cost; natural goodbye, card stays with her. `_5` can recall this exact witnessed event. | Stable commit/yes/exposure/future memories consumed by `_6`. No exclusivity promise beyond existing direction contract; no sex implied. Goodbye, no tomorrow guarantee. |

English canonical, Hungarian translated; literal player-name placeholder at commitment. Preserve original `repair`/`withdraw`, `commit`/`withdraw`, `ritual`/`open` and repair `ask`/`own` IDs/effects where applicable. This batch repairs continuity inside the annual plan; it adds no midpoint encounter and cannot complete INT2.

## Refined early Gréta briefs — 29 October 2026

Next two-scene batch within the connected annual plan above. English canonical, Hungarian translation. Existing actual admission remains `_1` weeks2–50 and `_2` weeks10–50, either period; the plan's preferred early windows are not new hard deadlines. Preserve interest/attraction/withdrawal and `greta_no_plan`/`greta_shared_habit` effects, one-slot costs and subsequent date admission.

| Continuity | `greta_1` | `greta_2` |
| --- | --- | --- |
| Date/prior contact | 8Oct2026–9Sep2027, after shared_2; no prior private meeting assumed. | 3Dec2026–9Sep2027, after `_1` interest; same-week or months later; optional coffee/events skipped. |
| Place/props | First-floor department office, two adults, room key, finished booking sheet and her annotated lake map. No physical trip to lake, invented bridges or weather. | Main courtyard bench, two adults, her bag and a roll in paper. No rain/clothing assumption across seasons. |
| Beats | Key handover finishes work before personal interest. Her annotated map reveals a favourite stopping place rather than administrative competence. Compare shortest route with preferred stop, or discuss her comically poor stone-skimming; player contributes a preference. | Share an ordinary snack, joke about its lopsided cut, then name attraction. Reciprocate through accepting imperfect company or admitting the temptation to hide invitations inside work; no invented prior joint meeting. |
| Change/exit | Original interest branches remain distinct; no work-for-affection exchange. She packs map, player leaves with key. Refusal gets a full goodbye. | Preserve original topic memories; no automatic touch or fixed next appointment. Pack wrapper/bag, part at adjacent gallery entrance without starting an unseen lake outing. Refusal is disappointed but complete. |

Both scenes remain separate from the investigation. Neither grants commitment, touch or intimate history. Later picnic/conflict/commitment can build on her appetite, initiative and tendency to organize without claiming that she has already solved that habit. Midpoint and later exploration additions remain the next implementation phase; this early pass cannot satisfy INT2.

## Gréta midpoint and ordinary-company briefs — 29 October 2026

Refines two additions from the connected annual plan. Neither is mandatory for `_4`, commitment, investigation or ending. Existing `_1–6` and their gates are retained. New scenes use actual weeks, not chapter projection; no engine change or exclusive-direction requirement.

| Continuity | `greta_private` | `greta_company` |
| --- | --- | --- |
| Window | 28–32, 8 April–6 May2027; either period. Date28 can occupy day, new meeting night; late date32 can do the same. | 33–37,13 May–10 June2027; either period. |
| Entry | Completed `_3`, witnessed invitation, no withdrawal. No assumed kiss, sex, coffee or fixed appointment. | Completed private meeting, any outcome, no withdrawal; no assumed intervening contact. |
| Place/props | Lakeside bench, Gréta's paper boat made from her own scrap paper, bag; chosen suite visit takes17 minutes via park/castle stairs. Boat collected before leaving, no litter. | Courtyard bench, her own food parcel with crushed cheese rolls and sliced apple; no new assets or weather claims. |
| Beats | A failed paper boat; choose a repair or make an ungainly boat together. Gréta admits she wanted more time, not a successful activity. Separate private visit from kiss and further intimacy. A yes leads to fade, water and laughing afterward. Company, reconsideration and leaving remain complete warm alternatives. | Re-entry with food; player may recall actual intimacy, quiet suite company, stopping after a kiss or staying outside. Unconditional present-tense alternative for every history. Choose food or a ridiculous menu, then ordinary company or a separately offered hand. Gréta lets the player contribute rather than organizing both halves. |
| Memory | Completion-only `greta_private_visit`, `greta_private_kiss`, `greta_midpoint_intimate`, `greta_private_company`, `greta_private_stopped`, `greta_private_outside` or `greta_private_declined` as actually chosen. Invitation/kiss never imply sex. No bond/commitment/evidence reward for sexual choice. | Completion-only `greta_company_savour` or `greta_company_menu`, optional `greta_company_hand`. History callbacks require witnessed decisions. Any private outcome admits this meeting. No obligation to repeat sex. |
| Exit/next | Natural lake/suite goodbye. No tomorrow promise or completed future date. Future company33–37 can recall the actual outcome. | Pack food and say goodbye in courtyard; no fixed next date. Further exploration38–42 and44–47 remains unimplemented, so INT2 cannot be complete. |

English canonical, Hungarian translation, literal player-name interpolation. Both scenes cost exactly one slot on completion including departures. Additive IDs and decisions do not reinterpret existing saves; assess compatibility with actual validation rather than forcing a restart for every content addition. Existing final meeting does not assert first intimacy and remains valid for all histories; a richer final callback pass belongs with the remaining annual additions.

## Gréta later exploration briefs — 29 October 2026

Two additive meetings under the connected annual plan; English canonical, Hungarian translation. No new location, magic, clue, wardrobe, inventory or minigame. Completion spends one discretionary slot. Both require completed `greta_company`, witnessed invitation and no withdrawal, with no commitment/direction prerequisite; the second does not require the first. `_4` remains independently timed and can still be skipped until its existing deadline.

| Continuity | `greta_dance` | `greta_sketch` |
| --- | --- | --- |
| Actual time | Weeks38–42, 17June–15July2027, either period. Company33–37 may be1–9 weeks earlier. | Weeks44–47, 29July–19August2027, either period. Company33–37 may be7–14 weeks earlier; dance may be skipped. |
| Entry/history | Any midpoint outcome including declined invitation; recall intimacy, quiet suite company or simply the shared snack only when witnessed. No assumed intervening dates. | Any company outcome. Optional memories of dance, its intimacy, or midpoint intimacy; unconditional present-time branch. No assumption `_4` is completed or resolved. |
| Place/props | Sheltered courtyard arcade, Gréta's bag. She hums a tune; no audible music asset promised. Optional suite visit explicitly takes about5 minutes by gallery/stairs. | Lake bench under willow, her own paper/pencil and bag. No weather/sunlight claim, no nighttime visual distance task. Draw the nearby bench/each other, visible close at hand. |
| Beats | Gréta admits wanting to learn a dance without being responsible for teaching it. Player offers a clumsy partnered step or taps a rhythm beside her without touch. Reciprocal embarrassment and humor; she can enjoy not being competent. Separate suite invitation, kiss and further intimacy, including first-time or repeated fade, stop/talk/depart. | Draw ridiculous portraits or an imaginary bench with room for their bags. Player contributes a personal pleasure; Gréta describes her own impatience with unfinished hobbies. They choose whether to exchange drawings or leave them with her, with separate hand/company/departure options. This is ordinary closeness, not another sexual encounter or commitment speech. |
| Memories | `greta_dance_steps` or `greta_dance_rhythm`; optional visit/kiss; `greta_dance_intimate`, company, stopped or declined according to actual choices. Present history choices distinguish earlier intimacy without treating it as current consent. | `greta_sketch_portraits` or `greta_sketch_bench`; `greta_sketch_exchange` or `greta_sketch_keep`; optional hand. Drawing is narrative memory, not a shop/inventory item. |
| Exit/next | Return bag, goodbye at arcade/suite door; no tomorrow/date promise. Sketch can recall this meeting, including nonsexual rhythm. | Paper packed by its chosen owner, explicit lake-path goodbye. No completed future outing. `_5` and `_6` keep their existing admission; richer final callbacks remain next work. |

All decisions become global only on completion. Sex grants no extra bond/evidence/reward and is never required for the romance. Skipping either meeting preserves the original main arc. Validate midpoint→company→both exploration meetings→ending plus no-touch/no-sex, first-time-later, declined/reconsidered, latest windows and skipped-dance paths. Existing portraits/background fallbacks remain; no visual acceptance claim.

## Gréta history-aware final meeting brief — 29 October 2026

Focused completion of the connected annual plan; only `greta_6`, English canonical/Hungarian translation. Actual week52,23September2027, either discretionary period, after confrontation51 and institution52. Commitment48–50 is required; annual meetings may all be skipped. Do not infer dates or encounters between completed meetings.

The lake bench, bag, flask and two cups remain. Continuation/withdrawal stays before closeness; withdrawal must never tour romantic memories or enter the suite. On continuation, retain existing future choices and add one optional annual-memory menu after completed company (its food memory provides the always-available fallback): imperfect drawings after completed sketch, the courtyard tune after partnered steps or no-touch rhythm, private time after witnessed midpoint/dance intimacy, and ordinary food after completed company. Each answer gets a specific reciprocal exchange and rejoins tea pouring; no carried drawing, paper ownership, unseen dance or touch is assumed. Four choices maximum per menu; the existing picnic is the unconditional alternative when additions were skipped.

A suite invitation still takes17 minutes and grants no touch. After a present kiss, first-time and already-intimate answers are mutually exclusive, using witnessed midpoint/dance decisions; both retain a fresh yes, fade, tea and departure. Stop/talk/leave stay available for either history. Existing scene/line/choice IDs, journals, consequential effects, original gates and one-slot costs remain; new recall/repeat branches have no effects. Assess compatible active cursors as well as complete routes before retaining epochs. Other routes and the larger annual-density/clue migration remain separate.
