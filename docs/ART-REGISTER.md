# Art register — reviewed first batch

> **Status:** Partial runtime integration. | **Purpose:** Exact art coverage, visual review and remaining production work.

On 21 October 2026 the user requested gradual, consistent asset production and integration. The active manifest is `src/game/content/assets.ts`. Four of the 32 required runtime images are now visually reviewed and integrated; 28 remain, plus five production reference sheets. Reviewed means assistant inspection and runtime checks, not final user acceptance of the entire art direction.

## Character review

| Character | Identity and temperament preserved | Cleanup in this batch |
| --- | --- | --- |
| Rebeka, 20 | Proud/direct gothic silhouette, long black hair, viewer-right plum streak, high-neck black dress, silver choker | One viewer-right beauty mark; complete crown; transparent background |
| Boglárka, 19 | Quietly observant adult face, freckles, brown eyes/hair, moss-green cardigan and cream dress | Braid over anatomical right shoulder (viewer left); complete crown; transparent background |
| Gréta, 21 | Practical/direct presence, copper ponytail, rectangular glasses, white shirt and green vest | Removed copied beauty marks; buttoned shirt; matched head-and-shoulders framing; transparent background |

The portraits remain distinct while sharing linework, cel shading and soft neutral light. Neutral portraits are deliberately reused for missing expressions; no amused/affectionate image substitutes for displeasure. Márton is the viewpoint character and has no portrait; narration has none. The five other human NPCs and Soma's transformed portrait remain pending. Their proposed written designs must be reviewed before deriving variants.

## Runtime coverage

| Required asset | Current source or fallback | Status |
| --- | --- | --- |
| rebeka / neutral | characters/rebeka/neutral-v1.webp | Reviewed; integrated |
| rebeka / amused | Own neutral portrait | Variant pending |
| rebeka / displeased | Own neutral portrait | Variant pending |
| rebeka / vulnerable | Own neutral portrait | Variant pending |
| rebeka / affectionate | Own neutral portrait | Variant pending |
| boglarka / neutral | characters/boglarka/neutral-v1.webp | Reviewed; integrated |
| boglarka / amused | Own neutral portrait | Variant pending |
| boglarka / displeased | Own neutral portrait | Variant pending |
| boglarka / vulnerable | Own neutral portrait | Variant pending |
| boglarka / affectionate | Own neutral portrait | Variant pending |
| greta / neutral | characters/greta/neutral-v1.webp | Reviewed; integrated |
| greta / amused | Own neutral portrait | Variant pending |
| greta / displeased | Own neutral portrait | Variant pending |
| greta / vulnerable | Own neutral portrait | Variant pending |
| greta / affectionate | Own neutral portrait | Variant pending |
| soma / neutral | Labelled NPC placeholder | Pending |
| soma / transformed | Labelled NPC placeholder | Pending |
| denes | Labelled NPC placeholder | Pending |
| julia | Labelled NPC placeholder | Pending |
| aron | Labelled NPC placeholder | Pending |
| lilla | Labelled NPC placeholder | Pending |
| classroom | backgrounds/classroom-anime-v1.webp | Reviewed; integrated |
| library | backgrounds/library.jpg | Transitional; replacement pending |
| department | backgrounds/department.jpg | Transitional; replacement pending |
| holdkor | backgrounds/holdkor-night.jpg | Transitional; replacement pending |
| courtyard | backgrounds/courtyard.jpg | Transitional; replacement pending |
| apartment | backgrounds/apartment.jpg | Transitional; replacement pending |
| bekas | backgrounds/bekas-to.jpg | Transitional; replacement pending |
| chamber | Labelled missing room or existing base with CSS lighting | Pending |
| classroom_dusk | Labelled missing room or existing base with CSS lighting | Pending |
| courtyard_night | Labelled missing room or existing base with CSS lighting | Pending |
| library_evening | Labelled missing room or existing base with CSS lighting | Pending |

## Sources and export review

Venice WAI Illustrious/FireRed candidate sources and refinement history remain under `assets/generated/venice/`. The classroom was inspected as an empty daytime college interior with electric desk lamps and an unobstructed foreground table. Its 1280×720 WebP export retains the source composition. Office/bedroom planning art and hotspot alignment are unchanged.

Built-in imagegen performed the three identity cleanups and generated genuine portrait alpha; Venice alpha was not available in the earlier run and was not retested. Full-resolution 1122×1402 PNG cutouts, source hashes and export metadata are in `assets/generated/portrait-cutouts/manifest.json`. Runtime portraits are 640×800 WebP (quality 95, alphaQuality 100), approximately 88–112 KiB each. Full-resolution masters and provenance are not publicly shipped. Alpha was checked numerically and on actual desktop/mobile dialogue backgrounds. Opening controls remain fixed at 1440px, 390px and 320px/130% text.

## Production order and remaining gates

1. Use the cleaned neutral PNG masters for twelve expression edits, one image at a time. Preserve face geometry, outfit, side-specific marks, crop and eye line. The older opaque Venice candidates must not seed expression production without the cleanup.
2. Review Soma, Dénes, Júlia, Áron and Lilla neutral portraits; derive Soma's transformed form from the accepted human master.
3. Review seven remaining base locations, then three lighting variants derived from accepted architecture. Keep the seated player viewpoint and a natural companion seat.
4. Create the five production reference sheets from reviewed masters/locations.

Historical HTTP 402 stopped the 19 October batch; the two 21 October one-image generations succeeded. The previous `/image/background-remove` HTTP 403 remains historical, not a claim about current capability. No payment settings changed and no automatic paid retries are scheduled. All 28 missing runtime records and five reference sheets remain open; this batch does not complete the redesign or final art acceptance. Prior archived character art remains outside runtime.
