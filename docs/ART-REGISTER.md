# Art register

> **Status:** Active; repository metadata audit 27 October 2026. | **Purpose:** Current asset coverage, organization and remaining work.

Visual identity lives only in [Character visual reference](CHARACTER-REFERENCES.md). Runtime selection is defined by `src/game/content/assets.ts` and `src/game/content/animations.ts`; file presence and size were checked against main during this audit. Existing review labels are retained from production records; this documentation audit did not perform a new image or animation review.

## Current runtime coverage

| Group | Files | Availability |
| --- | --- | --- |
| Rebeka | 5 portraits | All five expressions |
| Boglárka | 5 portraits | All five expressions |
| Gréta | 5 portraits | Neutral, amused, displeased, vulnerable, affectionate |
| Virág | 5 portraits | All five expressions |
| Soma | 2 portraits | Human and transformed |
| Dénes, Júlia, Áron, Lilla | 4 portraits | One neutral each |
| Backgrounds | 14 WebP files | Nine base locations plus classroom dusk, library evening, courtyard night, lakeside night and department night |
| Title background | 1 JPEG | `assets/backgrounds/courtyard.jpg`; separate from scene courtyard art |
| Virág moments | 4 loops + 4 posters | Wink, arm-link, kiss and cuddle; all labelled reviewed in the animation manifest |
| Icons | 13 PNG files | Planning objects and UI stats/hearts |

All 26 selected portrait files, 14 scene-background files and eight animation/poster files exist and are nonempty. Gréta affectionate portrait added 2026-10-30.

Soma, Áron and Lilla have user-approved final appearances. Other runtime review labels mean assistant review, with overall user style acceptance still open. Do not infer approval of production candidates from these runtime labels.

## Organization findings

The existing category/actor layout is appropriate; no runtime image paths need moving. Keeping these stable preserves manifests, title art, planner hotspots and saves.

Production candidates are separated under `assets/generated/venice/`. At this audit, 37 PNG outputs also have byte-identical raw PNG copies, confirmed by equal Git blob SHAs. These duplicate raw/output pairs are production provenance, not duplicate runtime selections; they were preserved to avoid invalidating production records. Generated candidates and their historical prompts must not override the reviewed identities.

Earlier ChatGPT PNG masters, cleaned-cutout folders, approved-reference sheets and asset archive directories were removed before this audit. Their old links and availability claims have been removed from the active asset guide. Git history may retain prior versions; no recovery or new visual acceptance is claimed here.

## Remaining work

- ~~Produce and review a real Gréta affectionate runtime portrait.~~ Completed 2026-10-30; assistant-reviewed, user acceptance open.
- Recover or recreate reviewed full-body/reference masters if future production requires them. Current Venice full-body files are candidates; Soma has no current sheet.
- Review any future candidate against the canonical brief before integration.
- Keep provenance, current runtime availability and final user acceptance distinct.

## Audit evidence

Checked the recursive Git tree and nonzero blob sizes, all literal portrait/background paths in the runtime manifest, and all moment file/poster paths in the animation manifest. Character descriptions were reconciled with the existing reviewed CLI descriptions and final appearance decisions. No binary payloads were fetched, no new visual inspection was claimed, and runtime code/paths were not changed.

## Recycling collectible art — 27 October 2026

One generated transparent 2×2 atlas contains four runtime collectible illustrations: green glass bottle, blue plastic bottle, copper-colored drink can and purple glass bottle. Runtime export: `assets/minigames/recycling/collectibles.webp` (512×512, 45,614 bytes); full-resolution WebP source, prompt and provenance: `assets/generated/recycling/`. Selected in `src/game/content/assets.ts` and bundled by Vite. Assistant visually inspected source/export and confirmed alpha; user style acceptance and browser/mobile playback review remain open. See [production and validation](RECYCLING-PRESENTATION.md).

## Spatial concept batch — 28 October 2026

[Sixteen drawn first-person location concepts and two measured map sheets](../assets/generated/geography-concepts-2026-10-28/README.md), generated with built-in ChatGPT image generation and independently prompted from the spatial brief. The user rejected realistic treatment; those drafts are superseded and not included in the selected repository batch. Maps are code-native geometry illustrations, not imagegen outputs. [Manifest](../assets/generated/geography-concepts-2026-10-28/manifest.json) records source/export hashes, dimensions, exact prompts and honest review/approval states. Selected WebP candidates and SVG/PNG map exports are separate from current runtime backgrounds. Future architectural consistency, season variants, hotspot/mobile review and user approval remain open.
