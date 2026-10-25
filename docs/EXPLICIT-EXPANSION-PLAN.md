# Explicit Intimacy Expansion Plan

> **Status:** Active planning draft (English). | **Purpose:** Expand all romance routes with equal explicit sexual content. Update existing scenes and extend them. Other agents continue from the progress table.

This document is the source of truth for the explicit pass. All characters are adults (19+). Content is fully explicit: stripping, deep kissing, oral (fellatio/cunnilingus), penetrative sex, multiple positions, fluids, light bondage/spanking where it fits character desires, etc. No topics are off-limits. Tone stays true to each character's voice (see CHARACTER-VOICES.md). Power/forbidden is erotic, never coercive; consent is always clear and can be withdrawn.

## Principles

- Equal heat across Rebeka, Boglárka, Gréta individual routes, the Rebeka–Boglárka–Márton triad, and Virág side route.
- Expand existing scene IDs first; add optional intimacy branches that cost a normal discretionary slot when needed.
- Physical progression follows the existing trust/week windows but is denser and more frequent.
- Aftercare and character voice remain present after intense scenes.
- Explicit images are required for key beats (see ASSET-PROMPTS.md). Style: crisp cel-shaded anime, adult proportions, matching the redesign art bible (non-pixel).
- Final text will be Hungarian; these drafts are English working versions.

## Progress Tracker

Update the status column as work advances. Agents: claim a row, mark In Progress, then Done when text + assets are integrated.

| Scene ID | Route | Target acts | Status | Notes / Owner |
| --- | --- | --- | --- | --- |
| shared_1 | Shared | Light flashes, almost-touch | Planned | Classroom stretch |
| rebeka_1 to rebeka_6 | Rebeka | Full escalation to intense private sex | In Progress / Implemented (rebeka_3 hand) | Grok – rebeka_3 hand path fully expanded (kiss, strip, oral, bent-over, riding, aftercare) in romance.ts. Sexier explicit assets (oral_explicit, bent_over, riding) requested via Venice edit+rebeka_neutral. |
| boglarka_1 to boglarka_6 | Boglárka | Slow praise, full body acceptance, sex | In Progress (boglarka_3) | Grok – claiming boglarka_3 next; praise-focused slow explore + oral/sex |
| greta_1 to greta_6 | Gréta | Rule-break, desk, light restraint, sex | In Progress (greta_3) | Grok – greta_3 hand path expanded with desk oral + bent-over + spanking + aftercare |
| triad_3 to triad_8 | Triad | Girl-girl + three-way oral/sex | Planned | Independent attraction |
| virag_1 to virag_8 | Virág | Immediate + repeated explicit | In Progress (virag_1) | Grok – virag_1 private path expanded with explicit oral + wall sex; assets requested |
| coffee_* / outing_* | All | Repeat shorter acts | Planned | Optional heat |
| Asset set | All | 40+ explicit pose images | In Progress | explicit_rebeka_oral_kneeling requested; workflow run 40203070117 queued |

Status values: Planned → In Progress → Drafted → Implemented → Assets Done.

## Escalation Bands (equal density)

| Band | Weeks | Acts |
| --- | --- | --- |
| Light | 1–4 | Stripping flashes, closed/open-mouth kisses, over-clothes grinding |
| Medium | 3–8 | Deep tongue kisses, hands under clothes, partial strip, oral start |
| Intimate | 6–12 | Full strip, fellatio/cunnilingus, fingering, first penetration |
| Hard | 9–16 | Full sex (multiple positions), creampie, bondage/spanking where fitting, triad combinations |

## Next Agent Tasks

1. Expand one full individual route (Rebeka recommended first) from the drafts.
2. Generate and integrate the corresponding asset set.
3. Translate finished English to Hungarian and wire into romance.ts / triad.ts / virag.ts.
4. Update this tracker.

See [SCENE-DRAFTS.md](explicit/SCENE-DRAFTS.md) and [ASSET-PROMPTS.md](explicit/ASSET-PROMPTS.md).

## Blockers / progress (2026-10-25, Grok)
- rebeka_3 hand path fully expanded and committed (kiss, strip+scar, oral, bent-over, riding, aftercare). Sexier assets requested; Venice runs may blur explicit edits.
- boglarka_3 claimed and kiss path expanded in romance.ts: cardigan/dress off, continuous praise, oral on her, she returns, missionary + riding, creampie, aftercare with cardigan half on.
- Three boglarka assets added to catalog (undress, oral_on_her, riding) using edit + boglarka_neutral, 4:5, STYLE. request.json set to 2026-10-25-explicit-boglarka-01.
- Next after this commit: monitor Venice, then greta_3 or continue individual routes.


- virag_1 private encounter expanded in virag.ts (oral + wall sex + witty line). Scenes already imported in catalog.ts; portraits + wink already reviewed and used by engine.
- Two generate assets added: explicit_virag_oral, explicit_virag_wall. request.json = 2026-10-25-explicit-virag-01.

- Virág explicit assets switched to edit + full-body reference (assets/references/virag/full-body-v1.webp). Generate script allowlist expanded to permit assets/references and assets/characters as repo: refs.

- greta_3 hand path expanded in romance.ts (desk scene: vest off, skirt up, oral, bent-over, light spanking, finish inside, “Don’t put it in the minutes”). Assets: explicit_greta_desk_oral/bent/after using edit+greta_neutral. request.json = 2026-10-25-explicit-greta-01.
