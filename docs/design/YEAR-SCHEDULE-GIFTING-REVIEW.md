# Annual schedule and personal-gift review

> **Reviewed:** 29 October 2026 against main `e4b26befa2cf315c79a9d009febd7b020329086f`. **Scope:** source/document review only; no runtime change, fresh playthrough, asset generation or gift-feature approval. Recommendations below are Proposed unless already identified as implemented.

## What the year currently contains

The engine supplies 52 weekly windows, each with one discretionary daytime and one nighttime slot: 104 discretionary activities. Sixteen mandatory chapters occupy separate shared slots. There are 36 weeks without a mandatory chapter. Weekly dates are representative week starts, not a simulation of seven individually playable days. The last week starts 23 September 2027 and runs through 29 September; avoid promising individually playable days through the opening anniversary.

| Weeks / representative dates | Implemented scheduled content | Review |
| --- | --- | --- |
| 1–6 / 1 October–5 November 2026 | Chapters 1, 2, 3 and 4 in weeks 1, 2, 3 and 6; Halloween in week 5 (29 October–4 November), night only | Strongest continuous opening. Halloween is optional ordinary company, not an investigation gate. |
| 7–13 / 12 November–24 December | Chapter 5 in week 10 (3 December); Christmas week 13 (24–30 December), day or night | Three ordinary weeks between chapters 4 and 5; holiday meeting helps but does not supply a winter relationship arc. |
| 14–22 / 31 December–25 February 2027 | Chapter 6 in week 16 (14 January) | No implemented New Year's gathering or February holiday meeting in the inspected seasonal modules. Winter needs ordinary relationship continuity. |
| 23–28 / 4 March–8 April | Spring courtyard gathering, weeks 23–25 (4–24 March), day only; chapter 7 in week 28 | Eleven ordinary weeks lie between chapters 6 and 7 (17–27). The spring scene occupies one slot, not an eleven-week arc. |
| 29–36 / 15 April–3 June | Chapter 8 in week 32 (6 May), including relationship-direction intent | Seven ordinary weeks between chapters 8 and 9 (33–39). Direction must remain intent, not automatic agreement. |
| 37–40 / 10 June–1 July | Summer lakeside gathering, weeks 37–39 (10–30 June), day only; chapter 9 in week 40 | Summer meeting supports companionship; no implemented beach/swimming or clothing-gift activity is established by it. |
| 41–48 / 8 July–26 August | Chapters 10, 11, 12 and 13 in weeks 43, 44, 46 and 48 | Investigation becomes denser. Preserve optional romance time and earned clues; current early identity/confession versus desired late reveal remains a separate STORY issue. |
| 49–52 / 2–23 September | Chapter 14 week 50; confrontation/death week 51; institutional aftermath week 52, then two personal slots and ending | Ending order is implemented. Do not insert mandatory shopping, celebrations or gift requirements into these slots. |

Sources: [calendar](../../src/game/content/calendar.ts), [holiday graphs](../../src/game/content/holidays.ts), [seasonal graphs](../../src/game/content/seasonal.ts), [catalog](../../src/game/content/catalog.ts), [year contract](YEAR-CAMPAIGN.md), [holiday contract](HOLIDAY-EVENTS.md).

All four seasonal meetings are registered runtime scenes, not merely briefs. They have three choices including leaving, require the first workshop, cost one discretionary slot and grant no evidence, commitment or bond bonus. Halloween/Christmas use event admission; spring/summer use season admission plus week windows. Their art remains a separate gap: `EVENT_BACKGROUNDS`, `SEASONAL_BACKGROUNDS` and `OUTFIT_PORTRAITS` are empty in the inspected asset module. Existing art/fallback metadata and atmospheric effects do not constitute finished outfits or seasonal paintings.

Other implemented content can occupy ordinary weeks: individual relationship and triad arcs, nine contextual coffee scenes, six paid outings, eight Virág scenes, two preparation sessions, jobs and rest. These have prerequisites, period restrictions and deadlines; they are not guaranteed new content every ordinary week. Paid outings are unique and expire after week 50. Current wardrobe supports everyday/winter/summer/Christmas/Halloween identities but has no gift-owned clothing selection.

## Schedule findings and recommended priorities

1. **P1 — Year density:** expanding the calendar did not proportionally expand writing. Prioritize connected ordinary-life episodes in weeks 17–27 and 33–39, then the November/February gaps. Audit one actual route at a time; total catalog scene count cannot establish a satisfying single-route year.
2. **P1 — Elapsed time:** flexible scene windows can separate connected conversations by months. Use witnessed completion weeks for specific callbacks and otherwise time-neutral language. Avoid “tomorrow,” seasonal assumptions and promises of fixed attendance when the next scene may occur much later.
3. **P1 — Academic continuity:** specify winter closure, spring teaching/exam rhythm and summer campus occupancy before writing new academic events. The dates span a year, but a complete teaching/break timetable is not established by `calendar.ts`. A summer meeting should explain why people are present rather than assume weekly term-time attendance.
4. **P2 — Optional events:** retain the four implemented gatherings. Candidates for discussion are a winter film evening (weeks 17–20), spring reading/walk continuation (26–27), summer free afternoon (33–36), and late-summer personal reflection (41–42). These are proposed episodes, not new holiday records or mandatory chapters.
5. **P2 — Advance visibility:** give event windows and closing dates readable calendar/CLI notices. A one-week holiday costs half that week's optional opportunities; keep it skippable and avoid hidden completion expectations.
6. **P2 — Economy:** yearly income without jobs is 165,000 Ft; the six current gift types total 37,000 Ft and first suited delivery bonuses total only +12 across the three women. Repeated spending adds no bond. Higher income is not automatically a bug, but new expensive clothing must not replace relationship writing or force repetitive jobs.

Do not add every possible holiday simply to fill time. Birthdays need canonical dates; New Year, Valentine's Day, Easter, exams and a year-closing celebration need explicit briefs and scheduling decisions before being represented as planned production. Current approved partial work includes seasonal/event art, assigned outfits, UI appearance and richer narrative coverage in the tracker; it does not approve these specific new events.

## Existing gifts: verified capability and limits

`content/gifting.ts` defines six objects: Rebeka's photo notebook (5,000 Ft) and cult-film postcards (8,000); Boglárka's tea (4,000) and leaf bookmark (6,500); Gréta's pocket notebook (4,500) and thermos (9,000). Buying and delivery are separate. Delivery is available in the planner, costs no activity slot, permits remote or in-person handoff, consumes owned stock, and creates a persistent reply with week, note and delivery mode.

The first suited delivery adds +2 to that woman's bond; repeats/mismatches add zero. One gift per woman per week is enforced. Gifts never supply witnessed plot evidence or affirmative commitment. The three main women are supported recipients; Virág is a separate actor outside `GirlId` and has no current gift recipient/reaction implementation. Reciprocal keepsakes already exist in paid outings as witnessed decisions; do not describe them as a general NPC wardrobe or reciprocal inventory system.

Important extension limits:
- A receipt records delivery, not whether the recipient accepted or declined, ownership after delivery, wearing an item, or returning it. Current gifts are always consumed with a reaction. Intimate gifts need those states distinguished.
- Inventory is item counts; it is not a per-recipient wardrobe. Existing `Outfit` is a small presentation union; a shop gift ID cannot simply become an outfit ID.
- `portraitFor` accepts actor/expression/week/optional outfit and currently has no wardrobe input. Purchases cannot affect it without shared resolver/runtime wiring.
- Reactions, item descriptions and stored receipt prose are currently Hungarian literals. New gifts should use canonical English and Hungarian message keys, including language switching after resume.
- Extending `GirlId` merely to add Virág would affect routes/bonds and is inappropriate. Any later recipient abstraction must preserve her separate story.

## Proposed gift design

| Category | Examples | Narrative availability | Presentation |
| --- | --- | --- | --- |
| Small clothing/accessories | Scarf, gloves, hair accessory appropriate to the character's established haircut | Acquaintance after introduction; recipient taste may be learned in ordinary conversation | Natural short handoff and later callback; accessory need not create a full outfit |
| Everyday clothing | Cardigan, walking layer, film-night top | Prior witnessed preference or choosing it together | Accepted garment can become eligible for appropriate later scenes; never auto-change the current portrait mid-conversation |
| Occasion clothing | Chosen party outfit, summer clothing or swimwear | Relevant outing/event plus character interest | Keep event and weather suitability; ownership is separate from choosing to wear it |
| Private clothing | Sleepwear, robe, lingerie | Adult relationship with witnessed reciprocal romantic/private interest; bond score alone is insufficient | Private handoff, character-specific acceptance/decline; any subsequent intimate scene remains separately chosen and fade to black |
| Other personal/intimate objects | Perfume, personal jewellery, private keepsake; optional adult intimacy accessory only if later approved | Item-specific preference and scene brief; do not assume one intimate interest implies another | Non-graphic item/reaction writing; no automatic use, touch, encounter or commitment |

These are possibilities for approval, not approved items, prices, outfit designs or a new shop. Start with one low-cost accessory and one everyday garment for a single character; evaluate visible value and art cost before a large catalogue. Lingerie and other adult private items should be a later authored pilot, with no explicit prose/art required.

Character fit, proposed rather than new canon:
- **Rebeka:** a striking film-night garment or deliberately ridiculous accessory; let her choose how she looks and whether a photograph stays private. Sarcasm can express delight, but never interpret a refusal as acceptance.
- **Boglárka:** a comfortable reading layer or subtle accessory connected to an actually witnessed preference. Her quieter voice should still make her taste and initiative clear.
- **Gréta:** useful walking clothing that leads to leisure rather than another task; an unhurried shared choice can be more meaningful than expensive equipment.
- **Virág:** possible separate later support, maintaining her direct invitations and independent investigation. A gift must never purchase reporting access or bypass a refused interaction.

Offer ordinary gifts normally. For a private item, one contextual invitation such as “Choose something together?” can establish interest without repetitive permission dialogue. A refusal should finish naturally, preserve the relationship and avoid repeated prompts. Do not punish choosing friendship or spending less. Triad gifts require separate recipients' choices and must not certify the Rebeka–Boglárka bond or agreement.

## Proposed technical contract and implementation gates

1. **Catalogue and availability:** stable gift IDs, message keys, recipient eligibility, category, learned preferences and optional scene/calendar requirements. Validate purchase and direct delivery in the shared action path; UI hiding alone is insufficient. Keep generic engine code free of specific recipients/items.
2. **Separate offer from acceptance:** model purchased stock, offered/accepted/declined outcomes and accepted recipient ownership. For a declined pilot item, return it to player inventory without bond loss; prevent repeat-offer farming and count the weekly offer consistently. Decide resale/refunds separately rather than inventing a shop economy.
3. **Wardrobe:** represent accepted clothing independently from gift history and global romance decisions. Selection priority should preserve an explicit scene outfit, then an event outfit; consider an accepted, context-compatible gifted garment before the ordinary seasonal/base choice. Do not replace a winter coat with an unsuitable summer gift. This insertion is a proposal requiring approval alongside the existing precedence contract.
4. **Delivery and scenes:** keep short handoffs free like current gifts. A longer shopping/date scene consumes a normal slot. Clearly label cost, date window and period; do not double-charge on resume or direct actions. No gift should open a private encounter by itself.
5. **Art scope:** reuse base art with an honest text-only clothing callback until a reviewed variant exists. Do not label the fallback as visibly wearing the gift. Define positive/negative prompts from CHARACTER-VISUALS, maintain identity/hair/body/signature details, and produce only used combinations. A neutral variant with expression fallback is a sensible first production target.
6. **Shared presentation:** browser dialogue, map portraits, transitions and CLI must resolve the same selected garment and missing-art metadata. Save mid-scene selection deterministically; handle changing scenes/seasons without rewriting an earlier witnessed gift.
7. **Save/localization policy:** new persistent wardrobe or receipt outcomes require validated fields and an explicit compatibility decision under VERSIONING. No silent migration/backfill. Store locale-neutral item/outcome references for new history and resolve both languages at display time.
8. **Validation:** meaningful cases cover wrong recipient/context, duplicate weekly offers, insufficient funds, declined-item ownership, first/repeat bonuses, direct-action guards, no commitment/evidence effects, cold-weather/event precedence, missing-art fallback, save/resume and live locale switching. Then CLI playtest the affected relationship and one refusal/friendship run. Browser review is needed for actual wardrobe UI/art, not for this document.

Recommended next decision is whether to proceed with the small accessory/everyday-clothing pilot. Approving that would not automatically approve private items, new holidays, Virág gifting or wardrobe expansion for every character.

## Review evidence and limits

Read contributor rules, design index/tracker, YEAR-CAMPAIGN, HOLIDAY-EVENTS, LEISURE-ECONOMY and CHARACTER-VOICES, and inspected calendar, catalog, seasonal/holiday graphs, gifts, types, outings and asset resolver. Date rows were calculated from the 1 October 2026 weekly origin; ordinary-week gaps from STORY_WEEKS. This review does not repeat historical test counts as new verification. Runtime files and compatibility metadata are unchanged. Publication Actions are checked separately.
