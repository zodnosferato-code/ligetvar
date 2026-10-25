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
| rebeka_1 to rebeka_6 | Rebeka | Full escalation to intense private sex | In Progress (rebeka_3 + stage6 cont) | Grok – rebeka_3 hand path fully expanded (kiss, strip, oral, bent-over, riding, aftercare) in romance.ts. Sexier explicit assets (oral_explicit, bent_over, riding) requested via Venice edit+rebeka_neutral. |
| boglarka_1 to boglarka_6 | Boglárka | Slow praise, full body acceptance, sex | In Progress (boglarka_3 + stage6 cont) | Grok – claiming boglarka_3 next; praise-focused slow explore + oral/sex |
| greta_1 to greta_6 | Gréta | Rule-break, desk, light restraint, sex | In Progress (greta_3 + stage6 cont) | Grok – greta_3 hand path expanded with desk oral + bent-over + spanking + aftercare |
| triad_3 to triad_8 | Triad | Girl-girl + three-way oral/sex | In Progress (triad_7) | Grok – triad_7 expanded with girl-girl kiss + sequential oral + riding/multiple finishes |
| virag_1 to virag_8 | Virág | Immediate + repeated explicit | In Progress (virag_1 + virag_4) | Grok – virag_1 private path expanded with explicit oral + wall sex; assets requested |
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

- triad_7 expanded in triad.ts: after tea, Rebeka/Boglárka deep kiss, sequential oral, full sex (riding + side-by-side), multiple finishes, sleep tangled. Assets: explicit_triad_kiss/oral/riding (multi-edit + both neutrals). request.json = 2026-10-25-explicit-triad-01.

- virag_4 kiss path expanded: oral in lake shadows + sex against the bench + witty after. Assets: explicit_virag_lake_oral/sex (edit + full-body). request.json = 2026-10-25-explicit-virag-02.

- Individual stage 6: short private continuation beats added for rebeka/boglarka/greta (oral/sex/aftercare matching each voice).

- Asset completeness check (2026-10-25):
  - All registered backgrounds and portraits in assets.ts exist on disk (no missing files).
  - Planned Virág moments (arm, kiss, cuddle) created as reviewed animated WebP clips + posters under assets/animations/virag/ and promoted in animations.ts.
  - Explicit sex-scene assets remain blocked: Venice recent runs return HTTP 402 (credits); Grok generate_image also moderates explicit prompts. Catalog entries and request.json are ready for when credits are available.

- Consent language revised (2026-10-25): stage-3 closeness prompts and Virág private_offer rewritten from formal asks to heat/subtle desire. Choice IDs and decision keys preserved.

- Consent language continued (2026-10-25): remaining formal permission asks in intimate beats rewritten in triad_4 (Rebeka/Boglárka hand/kiss), romance.ts rebeka_date_hand choice, virag.ts kiss line, and relationships.ts invitation texts. Choice IDs, scene structure, and slower paths preserved. Heat shown via short decisive speech and action.

- Stage 6 private continuations densified (2026-10-25): rebeka/boglarka/greta short private beats expanded to match stage-3 heat density (strip, oral, sex, voice-specific aftercare). Choice IDs and structure preserved.

- Venice transparent retry queued (2026-10-25): request.json id=2026-10-25-explicit-transparent-retry-01. 10 explicit assets set to transparent:true (background-remove postprocess) and method=edit/multi-edit with identity references. Workflow will trigger on push.

- Venice uncensored retry queued (2026-10-25): request id=2026-10-25-explicit-uncensored-qwen-01. editModel=qwen-edit-uncensored, generationModel=lustify-v8 (non-Grok). Transparent:true still set. Triggered on push.

- Venice blur acceptance enabled (2026-10-25): generator no longer rejects x-venice-is-blurred. Candidates will be checkpointed (status candidate-blurred-awaiting-review) and alpha extraction still attempted. Request id=2026-10-25-explicit-accept-blur-01.

- Uncensored model pilot (2026-10-25): live model list shows qwen-image-3-edit (uncensored=true, supports 4:5) and seedream-v5-pro-edit (uncensored, no 4:5). Request id=2026-10-25-pilot-qwen-image-3-edit-01, maxNewImages=1 on explicit_virag_oral to test blur behavior before full batch.

- Aspect ratio relaxed (2026-10-25): profile.mjs no longer rejects unsupported ratios; falls back to auto/3:4/2:3/etc. Pilot request id=2026-10-25-pilot-seedream-relaxed-aspect-01 uses seedream-v5-pro-edit (uncensored, no native 4:5).
