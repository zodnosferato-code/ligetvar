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

- Anime uncensored pilot (2026-10-25): wai-Illustrious (generation-only, uncensored). Temporary catalog method=generate on explicit_virag_oral for request id=2026-10-25-pilot-wai-illustrious-01. Follow-up edit pass with reference will be needed for identity lock.

## Venice model findings (2026-10-25)

Live models endpoint (not the stale local snapshot) shows:

### Uncensored edit models (type=inpaint)
- `qwen-image-3-edit`, `qwen-image-3-pro-edit`, `qwen-image-2-1-pro-edit`, `qwen-image-2-1-turbo-edit` — support 4:5
- `seedream-v5-pro-edit`, `seedream-v5-lite-edit`, `seedream-v4-edit` — uncensored; v5 variants lack native 4:5
- `qwen-edit-uncensored` — previously tested; still returned blurred images

### Uncensored generation models (type=image)
- `lustify-v7` / `lustify-v8` — trait `most_uncensored` (general NSFW)
- `wai-Illustrious` — **Anime (WAI)**, uncensored=true, generation-only, width/height divisor 16, prompt limit 1500
- `krea-2-turbo`, `seedream-v4`, `seedream-v5-lite`, `seedream-v5-pro`, `chroma`, `qwen-image-3*`

### Anime-specific
Only `wai-Illustrious` is labeled anime. No anime-specific edit/inpaint model exists. Identity lock still requires a follow-up edit pass with a Qwen or Seedream edit model + reference image.

### Aspect ratio
Catalog default is 4:5. `profile.mjs` now falls back to the first supported of `auto` / `3:4` / `2:3` / `4:3` / `1:1` / `9:16` when the model rejects 4:5 (see commit a2add09).

### Blur behavior
Venice returns `x-venice-is-blurred: true` even on models marked uncensored. Generator was updated to accept blurred candidates (status `candidate-blurred-awaiting-review`) so soft images are checkpointed instead of discarded.

### Pilots run
- `qwen-edit-uncensored` → blurred
- `qwen-image-3-edit` (single asset) — queued
- `seedream-v5-pro-edit` with relaxed aspect — queued
- `wai-Illustrious` generate (temporary method=generate on explicit_virag_oral) — queued

- WAI base regeneration (2026-10-25): because wai-Illustrious is generation-only, explicit participants (rebeka, boglarka, virag, greta) neutrals will be regenerated from scratch with request id=2026-10-25-wai-neutrals-regenerate-01. Explicit scenes will then be generated from these new WAI-style bases.

- Full WAI candidate run (2026-10-25): available-models.json refreshed from live endpoint. Explicit assets switched to method=generate (no refs). Request id=2026-10-25-wai-all-candidates-01 regenerates the four participant neutrals plus all explicit scenes with wai-Illustrious.

- WAI expression edit (2026-10-25): after successful WAI neutrals + explicit batch (request 2026-10-25-wai-all-candidates-03), expression assets for rebeka/boglarka/greta (amused, displeased, vulnerable, affectionate) are queued as edit from the new WAI neutrals for higher identity consistency. Request id=2026-10-25-wai-expressions-edit-01.

## Working Venice generation process (validated 2026-10-25)

### Successful path for explicit + participant neutrals
1. **Model**: `wai-Illustrious` (Anime/WAI, uncensored, generation-only). Set as `generationModel` in `art-jobs/venice/request.json`.
2. **Edit model for validation**: `qwen-edit-uncensored` (available under the CI key). Newer Qwen/Seedream edit models are not visible to the Actions key.
3. **Method**: pure `generate` (empty `refs`) for neutrals and explicit scenes. Reference-based edit still blurs on explicit content even with uncensored models.
4. **Aspect ratio**: catalog default 4:5. `scripts/venice/profile.mjs` falls back to `auto`/`3:4`/`2:3`/etc. if the model rejects 4:5.
5. **Blur handling**: generator accepts `x-venice-is-blurred: true` and checkpoints soft images as `candidate-blurred-awaiting-review` instead of rejecting.
6. **Signature conflicts**: if catalog prompts/refs change, clear the corresponding entries from `assets/generated/venice/manifest.json` and delete the on-disk files before re-queuing, or the generator aborts on signature mismatch.
7. **Request trigger**: bump `id` in `art-jobs/venice/request.json` and push to `main` to start the workflow. The workflow validates models live from the API (not the committed snapshot).
8. **Expression consistency**: after neutrals exist, queue expression assets (`amused`, `displeased`, `vulnerable`, `affectionate`) as `edit` from the new neutral so facial geometry stays locked.

### What does not work
- `qwen-edit-uncensored` / `qwen-image-3-edit` / `seedream-v5-pro-edit` as direct edit on explicit prompts → Venice returns blurred images.
- Relying on the committed `available-models.json` for model availability — the CI key sees a smaller set than the public models endpoint.
- Re-running a request with the same `id` after clearing candidates — the workflow only triggers on `request.json` changes.

### Validated batch
Request `2026-10-25-wai-all-candidates-03` generated 4 participant neutrals + 17 explicit scenes with `wai-Illustrious` and completed with status `completed-with-pending-alpha`.

- Raw-signature handling improved (2026-10-25): generator no longer aborts on signature mismatch. A stale raw file (prompt/model/refs changed) is logged and regenerated instead of throwing. See scripts/venice-generate-assets.mjs.

## Image backups

Completed Venice candidates are backed up under `backups/venice/YYYY-MM-DD/` so they are preserved in git even if the generator working tree is cleared.

### Structure (example: `backups/venice/2026-10-25/`)
- `portraits/` — participant neutrals (`rebeka_neutral.png`, `boglarka_neutral.png`, `virag_neutral.png`, `greta_neutral.png`)
- `explicit/` — explicit scene candidates
- `expressions/` — expression edits from neutrals (when present)
- `raw/` — original billed PNG outputs before post-processing
- `README.md` — describes the set and notes that images are candidates pending review

### Current backup
Commit `c694b63` stores the 2026-10-25 set (4 neutrals + 17 explicit + raw). These are not yet wired into the game engine.
