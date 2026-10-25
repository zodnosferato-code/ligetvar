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
| boglarka_1 to boglarka_6 | Boglárka | Slow praise, full body acceptance, sex | Planned | Cardigan, soft curves |
| greta_1 to greta_6 | Gréta | Rule-break, desk, light restraint, sex | Planned | Half-uniform |
| triad_3 to triad_8 | Triad | Girl-girl + three-way oral/sex | Planned | Independent attraction |
| virag_1 to virag_8 | Virág | Immediate + repeated explicit | Planned | Teasing, non-exclusive |
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
- rebeka_3 hand path fully expanded in romance.ts: deep kiss, dress slide + scar, kneeling oral, bent-over penetration, riding, aftercare. IDs/choices preserved.
- Sexier variants added to catalog: explicit_rebeka_oral_explicit (deeper oral, more exposure), explicit_rebeka_bent_over (visible penetration), explicit_rebeka_riding. All use edit + rebeka_neutral ref, 4:5, STYLE.
- request.json updated to 2026-10-25-explicit-rebeka-03-sexier (maxNewImages 3). Previous kneeling candidate exists; newer runs hit Venice blur filter on explicit edits.
- Next: claim and expand boglarka_3 (or next rebeka node) after assets land or review.

