# Older documentation: foundations and conflicts

> **Status:** Review completed 27 October 2026; current design decisions recorded below. | **Purpose:** Explain, document by document, what remains useful and what must not be carried forward.

Baseline: main `4c11bc32897161f65e93314ef02af379c21b8235`. Reviewed all 37 numbered legacy plans and the older UI/art/minigame plan in numeric order, then the active contracts, production records and archive indexes listed below. Current design files and AGENT.md were the comparison baseline.

This is a review of design foundations, conflicting authority and documentation correctness—not fresh gameplay acceptance. Archived narrative JSON and locale bodies were not rewritten, old test/art/audio results were not re-certified, and no scene or media asset was generated. Historical originals remain available in their existing folders.

## Confirmed decision

During this review Miki clarified: intimacy should have a place in the game because it follows a relationship; for now, present it fade to black. The [current authoring contract](GAME-DESIGN.md#relationship-intimacy--27-october-2026) retains invitation, mutual choice, reconsideration and aftermath. It supersedes requirements for graphic prose, explicit artwork or a universal escalation ladder. It does not erase intimacy or make it mandatory for a valid relationship/ending.

INT1 in the [tracker](TRACKER.md) is partial: the contract is approved; a branch-by-branch runtime pass remains. This documentation review did not rewrite story scenes.

## What is retained as a foundation

- Limited semester time and authored relationship milestones, with flags/decisions distinct from scores.
- The modernized Hungarian castle-college, in-castle office/home, first-person conversations, readable mobile UI and object-based hubs.
- Three distinct investigative contributions: photography, source/folklore analysis and records/organization.
- Character-specific interests and ambitions, disagreement/repair, independent initiative, nuanced staff motives and ordinary decompression after horror.
- Stable identity references, explicit expressions/poses, honest provenance and a separation between reviewed exports and production candidates.
- UI-independent engine logic, shared browser/CLI actions, witnessed knowledge and explicit scene prerequisites.

These compatible principles are reflected in current design. Specific old plots, assets, prices, schedules, schemas or optional feature suggestions are not adopted wholesale.

## Numbered legacy documents, one by one

“Mixed” means useful principles coexist with retired rules. “Superseded” does not mean deleting the historical file. The conflict column records disposition; it is not an implementation request.

| Document | Verdict | Sound foundation | Conflict / disposition |
| --- | --- | --- | --- |
| [01](../../docs/archive/legacy-design/01-mufaj.md) | Mixed | Finite time, authored scenes, flags distinct from scores, readable VN presentation. | Pixel presentation; single/unromanced play treated as defeat; score-led true/quiet/broken ending ladder; replay/gallery/auto-advance/Tauri are suggestions, not shipped commitments. |
| [02](../../docs/archive/legacy-design/02-koncepcio.md) | Mixed | Autumn semester, castle-college modernization, in-castle office/home, distinct project motives. | 48 freely spendable slots, week-8 numeric lock, retired pair combinations, old economy and pixel UI; protagonist age/surname and departmental detail require comparison with newer canon before promotion. |
| [03](../../docs/archive/legacy-design/03-karakterek.md) | Mixed | Adult ages, canonical heights, signature identities, fears of being reduced to appearance/performance. | Two-thirds desire checklist and old pair exclusions retired; overly fixed shyness/hostility superseded by current voices; missing reference paths cannot be reused. Rebeka's scar is a possible retained identity detail needing current-canon check. |
| [04](../../docs/archive/legacy-design/04-vizualis-biblia.md) | Superseded visual specification | Stable faces, adult proportions, correct-side marks/braid and no pencil. | Mandatory pixel template, hex locks and self-declared authority conflict with non-pixel current brief; do not copy its prompt. |
| [05](../../docs/archive/legacy-design/05-rendszerek.md) | Superseded mechanics with useful principles | Time matters, taste matters more than gift price, dialogue cannot be replaced by money. | Old cash/salary/job values, order/delivery simulation, personal-only gifting, touch thresholds/rewards, week-8 lock and forbidden Rebeka–Boglárka pairing retired. |
| [06](../../docs/archive/legacy-design/06-intim-szotar.md) | Historical taxonomy | Semantic separation of content and engine is useful. | Retired desire/act identifiers, universal touch ladder and intimacy-as-true-ending gate; coded labels are not an active engine contract or permission to add content. |
| [07](../../docs/archive/legacy-design/07-sztori-keret.md) | Mixed story foundation | Photography, folklore research and administration explain recurring contact; distinct interests support conversations. | Workshop described as ambiguous wellness instead of genuine magic; academic errands must not automatically require private apartment access; old desire/flag/date-week gates retired. |
| [08](../../docs/archive/legacy-design/08-jatekmenet-es-vegkimenetek.md) | Superseded progression specification | Gifts do not replace conversation; natural personal outcomes and character-specific reactions matter. | Old pair combinations, anger meter/automatic decay, two-thirds fulfillment, scored touch and mandatory escalation/ending gates retired. |
| [09](../../docs/archive/legacy-design/09-dialog-es-architektura.md) | Mixed architecture foundation | UI-independent, reusable, testable dialogue logic and at most four options. | Three PartRunner scripts/JSON authority/src/core paths retired; every menu containing very_good/good/bad/very_bad directly conflicts with contextual choices. |
| [10](../../docs/archive/legacy-design/10-vizualis-stilus.md) | Superseded rendering specification | Hungarian neo-Gothic castle adapted for college, modern fixtures, player POV. | Pixel grid/native 320×180/64–80px sprites, candle-only emphasis and 172cm Rebeka example superseded by current anime brief and 175cm height. |
| [11](../../docs/archive/legacy-design/11-kepgeneralasi-szabaly.md) | Mixed production foundation | Repository as canonical asset source; stable identities; empty player-view backgrounds and nearby seating; small-frame motion. | Pixel template, old JPG references, clothing-by-trust tiers and blanket one-person-per-image rule cannot govern current triad/scene art. |
| [12](../../docs/archive/legacy-design/12-jatekmenet-akciok.md) | Superseded activity balance | One activity consumes one slot; limited meaningful opportunities and fun jobs. | MOHU runner/trivia and tiny payouts replaced by move-limited puzzles; three discretionary slots, hidden workshop, forced rest/job prerequisites and fixed location gates conflict with current scheduling. |
| [13](../../docs/archive/legacy-design/13-jatek-hurok-es-esemenyek.md) | Mixed event concepts | Scripted versus optional event distinctions; characters can initiate; deterministic testing of any randomness. | Free background workshop, passive anger decay, old pair/escalation chains and random progression not current rules. Weather encounters/reciprocal gifts could be optional future content, not imported automatically. |
| [14](../../docs/archive/legacy-design/14-hangulatok-es-zene.md) | Useful unadopted audio proposal | Quiet instrumental location/mood loops, seamless joins and UI-side playback. | Pixel-style framing and numeric risk/true-ending mapping obsolete; no current approved audio production commitment established. Keep as a proposal pending user choice. |
| [15](../../docs/archive/legacy-design/15-ajandekok.md) | Superseded gift catalogue | Taste-specific reactions and gifts as personal gestures. | Old prices, large catalogue, trust/anger rewards and intimate-gift gates conflict with current six-gift economy; do not replace current balance. |
| [16](../../docs/archive/legacy-design/16-lokalizacio-es-kodolas.md) | Useful future architecture principle | Locale keys separate rendering from engine; one shared text layer. | Claim localization already works is false for current runtime; old paths/act IDs retired; adding a JSON alone is insufficient without plural/interpolation/save/browser-CLI handling. |
| [17](../../docs/archive/legacy-design/17-szakaszinditas.md) | Unapproved testing/replay proposal | Convenient later-scene testing and replay is a valid need. | Starting with max scores/all flags fabricates witnessed evidence and consent. Any future author fixtures must be explicit, coherent and separate from normal gameplay. |
| [18](../../docs/archive/legacy-design/18-megvalositasi-terv.md) | Superseded implementation order | Implement foundations before bulk dependent content. | Retired intimacy/pair/JSON/flag roadmap and old priority order must not override current tracker. |
| [19](../../docs/archive/legacy-design/19-flag-es-eszkalacio.md) | Superseded flag specification | Explicit prerequisite chains rather than calendar-only triggers. | Old pair and act identifiers; gift-gated escalation; contradicts doc03 about Rebeka/Gréta experience. No active canon promotion. |
| [20](../../docs/archive/legacy-design/20-kep-jelenet-lista.md) | Superseded production inventory | Plan art by scene/location and preserve companion seating. | Old asset names, five escalation tiers, retired pair, blanket one-woman rule and generated-file claims are not current inventory. |
| [21](../../docs/archive/legacy-design/21-referencia-turnaround-terv.md) | Mixed production proposal | Clothed front/profile/back sheets anchored to a reviewed identity; small-frame motion. | Pixel A-pose/64–80px sprites, mandatory underwear sheets and claims local examples exist are not current requirements or availability evidence. |
| [22](../../docs/archive/legacy-design/22-arckifejezesek.md) | Useful expression reference with obsolete schema | Express emotion through gaze, posture and face; a back view cannot show facial expression. | Large front/side/back expression taxonomy is unproduced expansion, not runtime IDs; fixed shyness and pixel dependency need current-voice review. |
| [23](../../docs/archive/legacy-design/23-teljes-test-referencia.md) | Mixed identity reference | Heights, stable proportions, side/back continuity and covered distinguishing marks. | Pixel template, required anatomy/undressed sheets, automatic trust-based poses and one-person rule are retired; do not silently promote absent sheets or old costume details. |
| [24](../../docs/archive/legacy-design/24-part1-sztori-es-dialogus.md) | Mixed story foundation | Three investigative skills, gradual unease, institutional self-protection, independent agency and help not purchasing romance. | Antlered voice-mimicking monster, bell weakness and eight-week finale replaced by Soma vampire/16-week required confrontation; legacy JSON/locale ownership retired. |
| [25](../../docs/archive/legacy-design/25-allapotgep.md) | Superseded state-machine proposal | Derive presentation/debug summaries from authoritative state rather than duplicating mutable flags. | Numeric phase inference fabricates introductions/privacy/consent; retired anger/risk gates and pair. Current scene prerequisites/witnessed decisions remain authoritative. |
| [26](../../docs/archive/legacy-design/26-jelenet-felallitas.md) | Mixed UI foundation | Object hubs, first-person view, clear expressions and mobile-readable touch targets. | Hover-only hints, native pixel sizes, old GirlStateMachine/locale assumptions retired; group composition must preserve player POV. |
| [27](../../docs/archive/legacy-design/27-ikonok-es-gombok.md) | Mixed icon inventory | Semantic door/book/chair/bag/phone/shelf groups; labels separate from art. | Mandatory generated bitmaps/no SVG/CSS, pixel sizing, invisible hotspots and obsolete job/gift inventory not current constraints. |
| [28](../../docs/archive/legacy-design/28-kiegeszitok.md) | Mixed accessory ideas | Scene-appropriate props should not obscure identity or become compulsory on every portrait. | Pencil-in-hair directly conflicts with removal; choker/cardigan/freckles/glasses are wrongly mixed with optional accessories. No automatic costume changes from gifts. |
| [29](../../docs/archive/legacy-design/29-bovitett-dialogusok-es-portrek.md) | Historical implementation report | Multi-node conversations, separate continuation label and authored expression changes. | Archived follow_node/reaction/locale paths, scored response ladder and color filters are not current runtime; no proof all later conversations complete. |
| [30](../../docs/archive/legacy-design/30-bovitett-sztori-es-intim-jelenetek.md) | Superseded content roadmap | Distinct romantic pace and character vulnerability can inform non-graphic writing. | Mandatory explicit escalation, old part dates, retired pair and pixel/one-woman production rules conflict with current design; no scene text is imported. |
| [31](../../docs/archive/legacy-design/31-szexuális-jelenetek-terv.md) | Superseded content/asset roadmap | Relationship development can include meaningful intimacy. | Graphic escalation, mandatory art and retired pair/pixel rules superseded by 27 October decision: retain intimacy, present it fade to black. |
| [32](../../docs/archive/legacy-design/32-engine-intim-beepites.md) | Historical integration report | Content can reference art and effects through data. | mergePart1/beat/JSON plus hardcoded registry and old flags are retired; claims intimacy integration is complete cannot certify current narrative. |
| [33](../../docs/archive/legacy-design/33-kepgeneralo-promptok.md) | Superseded prompt collection | Consistent identity references and expressive portraits. | Pixel prefix, obsolete appearance/costume locks and graphic-pose prompts are not current production instructions. |
| [34](../../docs/archive/legacy-design/34-teljes-kepes-sztori-es-dialogus.md) | Mixed scene-writing material | Tie expressions and props to specific conversation beats; maintain distinct voices. | Asset-first imported scenes, unavailable intimate-reference paths, universal good/bad answers and body/control-only characterization conflict with current writing. |
| [35](../../docs/archive/legacy-design/35-dialogus-fa-es-intim-jelenetek.md) | Superseded dialogue template | Follow-up replies should respond to actual player choices. | Copy-to-legacy-JSON instructions, very-good-only followups, old pair and graphic scene requirements retired; no prose imported. |
| [36](../../docs/archive/legacy-design/36-teljes-sztori-narrativa.md) | Superseded narrative outline | Recurring shared interests and differentiated relationship pace. | No causal vampire investigation, retired pair/endings, automatic apartment progression and checklist fulfillment cannot replace current plot. |
| [37](../../docs/archive/legacy-design/37-act1-2-3-sztori-es-tobbszintu-dialogusok.md) | Mixed story foundation | Women contribute independent expertise; nuanced staff motives; witness protection; knowledge-aware reports and multi-layer conversations. | Antlered creature, bell/reflection clues, 19-year-old Lilla, different Júlia identity and romance delayed until final week conflict with current vampire/cast/romantic pacing. |
| [UI/art/minigames plan](../../docs/archive/legacy-design/PLAN-UI-ART-MINIGAMES.md) | Historical UI/minigame checkpoint | Object-based planner and GitHub Pages base-aware asset loading. | Hover-only hints, runner/trivia aliases and old pending art statuses are superseded; not an active implementation plan. |

## Detailed plans, technical contracts and indexes

| Document | Verdict | Sound foundation | Conflict / action |
| --- | --- | --- | --- |
| [Ligetvar-Redesign-Plan.md](../../Ligetvar-Redesign-Plan.md) | Retain detailed baseline | Causal investigation, authorship goals, independent bonds, guaranteed spine and complete aftermath. | Counts, proposed details and old checkboxes are dated. Current design wins; migration/name-import wording is superseded by the current-only save contract. |
| [ENGINE.md](../../ENGINE.md) | Retain; corrected and translated | Generic injected rules, witnessed effects, schedule, staged scenes and ordered endings. | Rewritten in English; removed stale placeholder/60-scene/no-clips claims, current metadata points to source and centralized art inventory. |
| [docs/IMPLEMENTATION-ROADMAP.md](../../docs/IMPLEMENTATION-ROADMAP.md) | Retain task acceptance criteria | V/C/L/S/G task dependencies, route/save validation and scope boundaries. | Historical checkboxes are not a second live tracker. VR3 source availability and AN3/AN4 production status are superseded by current tracker. |
| [docs/LEISURE-ECONOMY.md](../../docs/LEISURE-ECONOMY.md) | Retain active contract | Move-limited puzzles, saved boards, reducer rewards, costs and distinct gift replies. | Supersedes old salary/prices, personal-only gifting, runner/trivia and job gates. No balance change made. |
| [docs/VERSIONING.md](../../docs/VERSIONING.md) | Retain; corrected | Independent epochs, stable key, safe failed loads and no migration. | Top table falsely said 0.4.0/content 2; corrected to package 0.6.0/schema 4/content 3 from source. Kept earlier release decisions historical. |
| [docs/CLI.md](../../docs/CLI.md) | Retain; corrected | Shared actions, deterministic protocol, atomic saves, hidden-information separation and findings. | Removed current compatibility claim for 0.2.0 saves; original 33-image review is explicitly historical, not current coverage. |
| [docs/SCENE-STAGING.md](../../docs/SCENE-STAGING.md) | Retain; clarified | Explicit per-node stages, same-scene memory, separate privacy/touch and natural departures. | Current status points to design tracker; added the confirmed fade-to-black authoring rule without certifying or editing runtime branches. |
| [docs/VIRAG-STORY.md](../../docs/VIRAG-STORY.md) | Retain branch contract | Independent reporter cases, player refusal, personal accountability and successful public outcome. | Read appearances through visual authority and files through art register. Current intimacy presentation applies here too; detailed prose quality is not certified by this review. |
| [docs/ANIMATION-PLAN.md](../../docs/ANIMATION-PLAN.md) | Retain; corrected | Limited-frame loops, separate posters, timing/size budgets, reduced motion and nonblocking actions. | Removed live claims three clips are still planned and PNG masters remain; current four-loop availability is separated from historical pilot/review evidence. |
| [docs/ART-REGISTER.md](../../docs/ART-REGISTER.md) | Retain inventory | Current runtime/provenance distinction and honest missing-master/Gréta gap. | Presence is not approval. No new art review or acceptance was performed. |
| [docs/ASSET-AGENT-WORKFLOW.md](../../docs/ASSET-AGENT-WORKFLOW.md) | Retain operational foundation | Programmatic binary transfer, sequential publication, hashes, lease checks and checkpoints. | Updated direct visual-authority link. This workflow does not authorize paid generation or promote old candidates. |
| [docs/CHATGPT-PRODUCTION.md](../../docs/CHATGPT-PRODUCTION.md) | Keep historical | Production rationale, rejected candidates, repair decisions and dated review provenance. | Old completed counts, supporting-cast proposals and removed source paths are historical only; current-state notice already identifies replacements. |
| [docs/VENICE-PRODUCTION.md](../../docs/VENICE-PRODUCTION.md) | Keep historical | Dependency order, candidate/runtime boundary and provenance requirements. | 37-output counts, model/alpha results and old references are dated; provider pause and current inventory supersede them. |
| [art-jobs/venice/README.md](../../art-jobs/venice/README.md) | Retain tooling reference; clarified pause | Bounded jobs, secrets, no blind retry, candidate checkpointing. | Changed active-production label; existing workflow mechanics are not authorization to dispatch generation. Old capabilities/counts require scoped revalidation. |
| [assets/README.md](../../assets/README.md) | Retain active index | Category/actor organization, hotspot preservation and candidate separation. | Use current design for appearances and art register for coverage; no runtime paths moved. |
| [assets/characters/README.md](../../assets/characters/README.md) | Retain active pointer | Stable actor/expression naming, manifest selection and neutral fallback. | Does not own a duplicate character brief. |
| [assets/animations/README.md](../../assets/animations/README.md) | Retain; corrected | Runtime loop/poster destination and source separation. | Updated first-wink-only status to four loops/four posters. |
| [docs/CHARACTER-REFERENCES.md](../../docs/CHARACTER-REFERENCES.md) | Retain redirect | Backwards links to current visual brief. | Do not restore a second maintained appearance authority. |
| [docs/CHARACTER-VOICES.md](../../docs/CHARACTER-VOICES.md) | Retain redirect | Backwards links to current voice brief. | Do not restore duplicated character guidance. |
| [docs/SCENE-INVENTORY.md](../../docs/SCENE-INVENTORY.md) | Retain generated snapshot | Scene/prerequisite/evidence map, branch counts distinguished from playthrough length. | Not regenerated by this documentation review; numeric snapshot is not evidence of literary completeness or exact current node counts. |
| [docs/REDESIGN-PROGRESS.md](../../docs/REDESIGN-PROGRESS.md) | Retain dated execution log; clarified | Concrete prior commands, workflow URLs and implementation decisions. | Added prominent historical-status notice; old name import, room switching, art placeholders and no-clips reports do not apply now. Prior tests not rerun or re-certified. |
| [docs/EXPLICIT-EXPANSION-PLAN.md](../../docs/EXPLICIT-EXPANSION-PLAN.md) | Superseded draft | Relationship progression needs space for intimacy and aftermath. | Marked historical under the user's 27 October decision. Graphic prose/art and equal-density escalation requirements are not current instructions. |
| [docs/explicit/ASSET-PROMPTS.md](../../docs/explicit/ASSET-PROMPTS.md) | Superseded production draft | Previously recorded production intent remains inspectable. | No requirement to generate 40–50 graphic assets or run provider jobs; marked historical. No prompts executed or promoted. |
| [docs/explicit/SCENE-DRAFTS.md](../../docs/explicit/SCENE-DRAFTS.md) | Superseded working text | Historical route/scene references remain traceable. | Do not copy graphic drafts into runtime. Present intimacy off-screen under current design; narrative coverage is tracked as INT1. |
| [docs/README.md](../../docs/README.md) | Retain current index | Routes contributors to design, contracts and history. | Add this review; keep current status centralized. |
| [docs/archive/README.md](../../docs/archive/README.md) | Retain archive index; corrected | Historical separation and provenance. | Removed link to absent assets/archive; points to current design and this review. |
| [docs/archive/legacy-design/README.md](../../docs/archive/legacy-design/README.md) | Retain inventory; corrected | Enumerates all 38 historical design documents. | Added review/design pointers and corrected documentation-index link; originals unchanged. |
| [docs/archive/legacy-narrative/README.md](../../docs/archive/legacy-narrative/README.md) | Retain provenance inventory | Nine dialogue trees/four locale files, original paths and recorded hashes. | Added current authority pointers. JSON/localization bodies were not line-edited or restored; hashes were not re-certified. |

README.md/AGENT.md and the new design folder were also checked as the current entry points, rather than classified as older foundations. The tracker and authoring contract now record this review and the user's intimacy decision.

## Resolved conflicts

| Old claim | Current rule |
| --- | --- |
| Pixel grid, 320×180 backgrounds and tiny sprites are compulsory | Detailed non-pixel anime, transparent dialogue portraits and current asset specifications |
| Three discretionary slots plus background workshop | One guaranteed shared-story slot, then one daytime and one nighttime slot |
| Boglárka–Gréta or Rebeka–Gréta are the supported pair; Rebeka–Boglárka incompatible | Three singles and the Rebeka–Boglárka–Márton triad, with the women also developing their own bond |
| An antlered creature, bell weakness or ancestry reveal defines the threat | Soma's deliberate vampirism; older mechanics remain retired unless specifically re-established |
| Every menu has very-good/good/bad/very-bad responses | At most four contextual choices, with multiple valid perspectives |
| Trust/affection/gifts or completed desires grant touch or true endings | Explicit witnessed decisions, separate physical invitations and meaningful relationship outcomes |
| Romance starts only in the final week | Character-specific romantic pace throughout the semester; Virág has her distinct early approach |
| An unromanced player has lost | Friendship and investigation-only play are complete valid paths |
| Old save epochs remain loadable or names migrate | Current schema/content epochs only; explicit restart explanation, no migration |
| All portraits are placeholders; physical clips do not exist | Current art register/manifest: four Virág clips present; Gréta affectionate and removed reference masters remain gaps |
| Graphic scenes and images are required | Meaningful relationship intimacy with fade-to-black presentation for now |
| A historical status table is current authority | Design folder and tracker govern current decisions/status; logs retain dated evidence |

## Recovered ideas and open design work

No additional feature is approved merely by being mentioned in an old document.

| Idea | Disposition |
| --- | --- |
| Dialogue backlog, skip-read, auto-advance, more save slots and CG gallery | Proposed conveniences from doc01/02; require scoped design and actual-code check before backlog commitment. Existing CLI transcripts are not equivalent to an in-game gallery/replay system. |
| Later-scene author starts | Doc17's max-stat/all-flag shortcuts are rejected as a normal-game rule. Coherent explicit author/test fixtures could be proposed separately; they must not fabricate witnessed consent/evidence in ordinary saves. |
| Mood-based instrumental soundtrack | Basic infrastructure and eight distinct MP3 files already exist in audio.ts/music. No listening/seam/license-quality assessment was performed; rediscovering doc14 is not a new soundtrack-production authorization. |
| Optional weather encounters and reciprocal gifts | Possible authored content ideas, not a restored random-event system. Required evidence and romance decisions must remain deterministic/witnessed. |
| Tauri/desktop packaging | Historical proposal, not a shipped or newly approved platform. |
| Additional turnarounds, side/back expressions and costume sheets | Need-driven production proposals; current master availability and final review must be checked first. |
| More detailed personal history, including Rebeka's old scar theme | Retain as historical reference, not a new mandatory visual mark or repeated reassurance plot. It is not part of the currently locked visible portrait brief; do not add it silently to new art or replace current characterization with it. |
| Exact borrowed-voice/grounding/ritual-anchor mechanics | Original plan labels specifics proposed; progress log/source use a provisional implementation. That distinction remains explicit. This review does not retroactively declare all supernatural specifics user-approved. |

No additional creative choice is required to preserve these ideas as proposals. If a later task would implement one, resolve its specific design first.

## Evidence and limits

Source-checked `src/game/release.ts`: schema 4/content epoch 3; package baseline is 0.6.0. Read current catalog assembly and audio mood mapping, and checked the repository's eight distinct nonempty music blob entries. Referenced the established image/moment inventory without downloading binary payloads.

Documentation links are checked for changed active documents. Historical logs, generated scene counts, archived hashes, external research links and old gameplay/UI assertions are not revalidated as current acceptance evidence. No paid provider, story edit, asset move or new feature implementation is part of this review.
