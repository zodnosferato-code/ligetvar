# Art register — reviewed runtime batches

> **Status:** Partial runtime integration. | **Purpose:** Exact art coverage, visual review and remaining production work.

On 21 October 2026 the user requested gradual, consistent asset production and integration. The active manifest is `src/game/content/assets.ts`. All 32 original required runtime images are now visually reviewed and integrated; no required runtime portraits or backgrounds remain. Soma's reference sheet is still outstanding. Miki has approved Soma's final appearance. Reviewed means assistant inspection and runtime checks, not final user acceptance of the entire art direction.

## Character review

| Character | Identity and temperament preserved | Cleanup in this batch |
| --- | --- | --- |
| Rebeka, 20 | Proud/direct gothic silhouette, long black hair, viewer-right plum streak, high-neck black dress, silver choker | One viewer-right beauty mark; complete crown; transparent background |
| Boglárka, 19 | Quietly observant adult face, freckles, brown eyes/hair, moss-green cardigan and cream dress | Braid over anatomical right shoulder (viewer left); complete crown; transparent background |
| Gréta, 21 | Practical/direct presence, copper ponytail, rectangular glasses, white shirt and green vest | Removed copied beauty marks; buttoned shirt; matched head-and-shoulders framing; transparent background |

The portraits remain distinct while sharing linework, cel shading and soft neutral light. All three main women now have all five distinct expression exports; unknown future expressions still fall back to neutral. Márton is the viewpoint character and has no portrait; narration has none. Dénes and Júlia are reviewed and integrated. Soma's updated appearance and subtle vampire transformation are approved as final by Miki. Both final portraits are integrated, with the transformed portrait selected from week two to match the story's transformation. Áron and Lilla's older portraits are final and integrated; both designs are user-approved.

## Runtime coverage

| Required asset | Current source or fallback | Status |
| --- | --- | --- |
| rebeka / neutral | characters/rebeka/neutral-v1.webp | Reviewed; integrated |
| rebeka / amused | characters/rebeka/amused-v1.webp | Reviewed; integrated 22 October |
| rebeka / displeased | characters/rebeka/displeased-v1.webp | Reviewed; integrated 22 October |
| rebeka / vulnerable | characters/rebeka/vulnerable-v1.webp | Reviewed; integrated 22 October |
| rebeka / affectionate | characters/rebeka/affectionate-v1.webp | Reviewed; integrated 22 October |
| boglarka / neutral | characters/boglarka/neutral-v1.webp | Reviewed; integrated |
| boglarka / amused | characters/boglarka/amused-v1.webp | Reviewed; integrated 22 October |
| boglarka / displeased | characters/boglarka/displeased-v1.webp | Reviewed; integrated 22 October |
| boglarka / vulnerable | characters/boglarka/vulnerable-v1.webp | Reviewed; integrated 22 October |
| boglarka / affectionate | characters/boglarka/affectionate-v1.webp | Reviewed; integrated 22 October |
| greta / neutral | characters/greta/neutral-v1.webp | Reviewed; integrated |
| greta / amused | characters/greta/amused-v1.webp | Reviewed; integrated 22 October |
| greta / displeased | characters/greta/displeased-v1.webp | Reviewed; integrated 22 October |
| greta / vulnerable | characters/greta/vulnerable-v1.webp | Reviewed; integrated 22 October |
| greta / affectionate | characters/greta/affectionate-v1.webp | Reviewed; integrated 22 October |
| soma / neutral | characters/soma/neutral-v1.webp | Final, user-approved; integrated |
| soma / transformed | characters/soma/transformed-v1.webp | Final, user-approved; integrated from week 2 |
| denes | characters/denes/neutral-v1.webp | Reviewed; integrated |
| julia | characters/julia/neutral-v1.webp | Reviewed; integrated |
| aron | characters/aron/neutral-v1.webp | Final, user-approved; integrated |
| lilla | characters/lilla/neutral-v1.webp | Final, user-approved; integrated |
| classroom | backgrounds/classroom-anime-v1.webp | Reviewed; integrated |
| library | backgrounds/library-anime-v1.webp | ChatGPT repair reviewed; integrated 22 October |
| department | backgrounds/department-anime-v1.webp | ChatGPT anime restyle visually reviewed; integrated 22 October |
| holdkor | backgrounds/holdkor-anime-v1.webp | ChatGPT repair reviewed; integrated 22 October |
| courtyard | backgrounds/courtyard-anime-v1.webp | ChatGPT repair reviewed; integrated 22 October |
| apartment | backgrounds/apartment-anime-v1.webp | ChatGPT anime restyle visually reviewed; integrated 22 October |
| bekas | backgrounds/bekas-anime-v1.webp | ChatGPT repair reviewed; integrated 22 October |
| chamber | backgrounds/chamber-anime-v1.webp | ChatGPT generation reviewed; integrated 22 October |
| classroom_dusk | backgrounds/classroom-dusk-anime-v1.webp | Reviewed; integrated 22 October |
| courtyard_night | backgrounds/courtyard-night-anime-v1.webp | Reviewed; integrated 22 October |
| library_evening | backgrounds/library-evening-anime-v1.webp | Reviewed; integrated 22 October |

## Sources and export review

Venice WAI Illustrious/FireRed candidate sources and refinement history remain under `assets/generated/venice/`. The classroom was inspected as an empty daytime college interior with electric desk lamps and an unobstructed foreground table. Its 1280×720 WebP export retains the source composition. Office/bedroom planning art and hotspot alignment are unchanged.

Built-in imagegen performed the three identity cleanups and generated genuine portrait alpha; Venice alpha was not available in the earlier run and was not retested. Full-resolution 1122×1402 PNG cutouts, source hashes and export metadata are in `assets/generated/portrait-cutouts/manifest.json`. Runtime portraits are 640×800 WebP (quality 95, alphaQuality 100), approximately 88–112 KiB each. Full-resolution masters and provenance are not publicly shipped. Alpha was checked numerically and on actual desktop/mobile dialogue backgrounds. Opening controls remain fixed at 1440px, 390px and 320px/130% text.

## Production order and remaining gates

Current provider and batch checkpoint: [ChatGPT production](CHATGPT-PRODUCTION.md). Venice is paused per user instruction. Three repaired location masters and Rebeka amused are recorded in `assets/generated/chatgpt/manifest.json`. The original candidate files remain preserved.


1. Completed: all fifteen main-woman expression portraits. Continue deriving any future edits from the cleaned neutral masters, preserving face geometry, outfit, marks, crop and eye line.
2. Completed: Soma, Dénes, Júlia, Áron and Lilla neutral portraits; Soma's transformed portrait is also integrated.
3. Replace the two transitional planning backgrounds only after matching their clickable objects and verifying hotspot alignment. All three planned lighting variants are integrated; other unmatched location/lighting combinations retain CSS fallback.
4. Completed: three main-woman reference sheets and the architecture sheet are complete. Create Soma's sheet after his neutral design is approved.

Historical HTTP 402 stopped the 19 October batch; the two 21 October one-image generations succeeded. The previous `/image/background-remove` HTTP 403 remains historical, not a claim about current capability. No payment settings changed and no automatic paid retries are scheduled. All 8 missing original runtime records and two reference sheets remain open; this batch does not complete the redesign or final art acceptance. Prior archived character art remains outside runtime.

Second 22 October batch adds Holdkör, the service chamber and Rebeka displeased. The chamber has exactly three anchor fittings, utility cables/pipes, a service trench and an open service-stair exit; no figures. Holdkör removes the candidate busts and obstructing bench, retains the projector and supplies a seated viewpoint. Rebeka displeased preserves the neutral master geometry, one viewer-right beauty mark/plum streak and useful alpha. All source/output hashes and prompts are in the ChatGPT manifest.

Third 22 October batch: classroom dusk, courtyard night and library evening were derived individually from reviewed masters. Layout, furniture and empty companion seats were visually compared. `backgroundFor` selects them by effective scene lighting (courtyard night also serves evening-labelled night-slot visits). The dedicated variants bypass the extra evening/night background tint. Daytime images and planner hotspots remain unchanged.

## Accelerated batch and nighttime correction — 22 October 2026

Ten independent expression edits were generated from cleaned neutral masters, then reviewed together as requested. All fifteen main-character portraits now resolve to distinct 640×800 transparent WebP exports. Night variants for Békás-tó and the department were added beyond the original 32-image plan: total reviewed coverage is 24/32 original requirements plus two additional night images. The department night image deliberately retains the transitional base style and object geometry; it does not close the planned anime office restyle. Its export preserves the original 1168×784 aspect ratio.

All seven locations reachable through the night hub resolve to an evening/night image. All 32 required runtime images are integrated. Remaining art item: Soma's reference sheet; overall art direction can still receive further user feedback.

## Full-body references — 22 October 2026

Three clothed face/full-body sheets for Rebeka, Boglárka and Gréta were generated from the approved neutral identity masters, then visually reviewed. See [character references](CHARACTER-REFERENCES.md) for images, canonical heights and proposed footwear/clothing details. Source/output hashes and prompts are recorded; the sheets have no runtime export. Three of five planned references are complete; Soma and architecture remain. Final user approval stays open.

## CLI description audit — 25 October 2026

The 33 usable files resolved by the active background/portrait manifest were visually inspected as contact sheets for `src/game/content/asset-descriptions.ts`. Descriptions cover appearance, lighting, expressions and visible transformations without hidden plot facts. The existing `characters/greta/affectionate-v1.webp` was zero bytes in main: it has been removed from the manifest and repository. Gréta's affectionate requests now honestly use the neutral portrait fallback. A real affectionate replacement remains outstanding; no new art was generated in this task.

## Virág and moments — pending, 25 October 2026

Missing: Virág adult identity sheet, neutral/amused/displeased/vulnerable/affectionate portraits, hallway day background, arm-link/kiss/shoulder-cuddle animated WebP loops plus three static posters. None has been generated or reviewed. Runtime uses explicitly marked placeholders and planned moment IDs. [Character brief](VIRAG-STORY.md), [production plan](ANIMATION-PLAN.md).
