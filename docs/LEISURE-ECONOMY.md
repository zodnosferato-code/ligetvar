# Puzzles, spending and personal gifts

> **Status:** Implemented, 25 October 2026. | **Purpose:** Approved puzzle direction, economy balance, optional outings and gift/save behavior.

## Approved direction

The user chose relaxed puzzles with limited moves, money plus spendable activity points, and full-slot jobs with substantial rewards. The shared → day → night weekly schedule remains. Neither work nor spending is a prerequisite for the investigation or established romance routes.

## Play and rewards

| Activity | Rules | Maximum target |
| --- | --- | --- |
| Újrahasznosítás / Recycling (`recycling`) | Tap two neighbouring pieces to swap; match 3+ in a row or column; gravity/refill and cascades; 12 successful swaps. Invalid swaps are free. | 1,200 score; 10 per cleared tile, cascade multipliers ×2 then ×3 |
| Archívumpárok (`archive`) | Eight pairs on a 4 × 4 board; 18 pair attempts. Two revealed cards remain visible until Next Pair. | Eight matched pairs |

No timers, reflex requirements, drag gestures or timed card hiding. Distinct shapes supplement colors. Touch targets are at least 44px at the tested phone widths; keyboard buttons have visible focus. The only job IDs are `recycling` and `archive`. The retired runner, quiz and group-clearing rules are not supported.

Completion pays **8,000–20,000 Ft and 3–6 programpont**, proportional to score, with a floor even for a poor shift. The player explicitly claims the displayed result. Claiming consumes exactly one daytime slot and 12 energy. The state reducer derives rewards from the saved board; the UI cannot submit an arbitrary payout. Claims outside a completed active puzzle do nothing.

The first move starts the shift. Returning to the planner is available only before play; after starting, the player can return to the title or close the page and resume. Board, seed, moves, score, matched cards and a half-revealed pair persist on each interaction. Reopening does not reset the puzzle. Boards vary deterministically by week and game; starting/cancelling cannot reroll for better rewards. New Recycling boards start without matches and automatically regenerate when no legal swap remains. Cascades resolve atomically, with a 20-wave safety bound followed by a fresh playable board. Recycling has only match-three rules and a 1,200-point reward target.

## Spending balance

| Resource | Amount / use |
| --- | --- |
| New-game spending money | 12,000 Ft |
| Weekly discretionary allowance | 3,000 Ft, replacing 60,000 Ft |
| Gifts | 4,000–9,000 Ft; six items, two suited to each woman |
| First personal outing | 4,000 Ft + 4 programpont |
| Follow-up outing | 6,000 Ft + 6 programpont |

Money represents discretionary spending; no new rent/bills simulation. Activity points are earned only by completed puzzles, never purchased with surplus money. Each paid outing is unique, has an introduction/previous-outing prerequisite, and expires after week 50. Starting charges the displayed cost exactly once, before the saved scene cursor is installed; continuing or reloading does not charge again. Completing the outing uses its day or night slot. The phone shows prices, prerequisites and missing funds before the outing becomes available. Affordable outings also appear at their destination.

One maximum-reward shift buys a first outing and leaves 16,000 Ft plus 2 points; another buys the follow-up and leaves 2 points. A minimum-reward shift still funds a modest gift and makes real progress toward an outing. At 52 weeks, unworked discretionary income totals 165,000 Ft (12,000 initial plus 51 weekly allowances). The player can afford some gifts without work, but cannot buy unlimited weekly presents. Completing every optional outing is not required; spending extra slots on all of them competes with other plans.

## Six optional personal scenes

Each character has a two-part story, branching replies, +3 bond on witnessed completion, and an offered personal favour followed by a keepsake. These decisions never substitute for commitment, repair or anyone's affirmative relationship choices.

- **Rebeka:** a deliberately bad-film/photo evening; she offers and later gives a personal photographic print.
- **Boglárka:** an overlooked fictional character and a shared ending; she lends her annotated book and later writes a personal recommendation.
- **Gréta:** a walk with no task list; she offers access to her quiet place and later gives a hand-drawn map.

An accepted thoughtful gift is recalled on arrival at an optional outing. Only actually delivered gifts supply this callback. Existing compulsory evidence and preparation scenes are unchanged.

## Giving and receiving

The shelf has a recipient, item, personal note and delivery choice. Sending an owned item is separate from buying it. Remote delivery produces a visible portrait reply; a short in-person handoff produces a personal reaction. These small exchanges cost no slot, while longer outings do. The reply receives focus and is scrolled into view. The phone retains the full history, including the note, item, week and delivery mode. Marking replies read removes the new-reply notice without deleting history.

First-time suited gifts give +2 bond; a mismatched or repeated item gives no bond but has an explicit character-specific response. Repeating a gift later in the year is recognized. Expensive gifts do not buy a larger affection bonus. One gift per woman per week remains the limit. The six item reactions and three note styles preserve the established voices; an invitation note is not an automatic commitment or booked date.

## Saves and source boundaries

Current saves use the versioned envelope under the stable `ligetvar-save` key; see [VERSIONING.md](VERSIONING.md). Historical keys are detected only to explain incompatibility. `activityPoints`, `puzzle` and `giftHistory` are required fields. Active jobs must have a valid saved board and occupy the daytime slot; outside a job, `puzzle` must be null. Missing fields are rejected rather than backfilled. There is no migration or name import: earlier versions require a new game.

`content/puzzles.ts`, `gifting.ts` and `outings.ts` contain game-specific rules and writing. `runtime.ts` binds them to the store. The generic engine understands only optional scene costs and a generic points balance, not characters or minigame identities. Gift history is separate from the scene journal so deliveries cannot fabricate witnessed story evidence. New save fields are validated when present.

## Verification

`npm test`, `npm run typecheck`, `npm run build`; focused coverage in `content/leisure.test.ts`. Browser flow script: `node --experimental-strip-types tools/verify-leisure.cjs` after build, with Playwright Chromium installed. `PLAYWRIGHT_MODULE_PATH`, `CHROMIUM_EXECUTABLE_PATH`, and `UI_OUTPUT_DIR` can override the environment. See the progress record for actually executed checks and limitations.
